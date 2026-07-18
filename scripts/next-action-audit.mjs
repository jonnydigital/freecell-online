#!/usr/bin/env node
/**
 * Summarize mobile next-action panel engagement from the latest analytics data.
 *
 * Usage:
 *   npm run analytics:next-actions
 *   npm run analytics:next-actions -- --metrics=docs/analytics/google-metrics-2026-07-18.json
 */

import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const ANALYTICS_DIR = resolve(ROOT, 'docs/analytics');
const OUT_DIR = resolve(ANALYTICS_DIR, 'next-action-audits');
const REPORT_TIME_ZONE = 'America/New_York';

function localDateStamp(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: REPORT_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function parseArgs(argv) {
  const args = { metrics: null, outDir: OUT_DIR };
  for (const arg of argv) {
    if (arg.startsWith('--metrics=')) args.metrics = resolve(ROOT, arg.slice('--metrics='.length));
    else if (arg.startsWith('--out-dir=')) args.outDir = resolve(ROOT, arg.slice('--out-dir='.length));
  }
  return args;
}

async function latestGoogleMetricsPath() {
  const files = await readdir(ANALYTICS_DIR);
  const metricsFiles = files
    .filter((file) => /^google-metrics-\d{4}-\d{2}-\d{2}\.json$/.test(file))
    .sort();
  const latest = metricsFiles.at(-1);
  return latest ? resolve(ANALYTICS_DIR, latest) : null;
}

async function readJsonIfExists(path) {
  if (!path || !existsSync(path)) return null;
  return JSON.parse(await readFile(path, 'utf8'));
}

function numberValue(value) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function addBucket(map, key, row) {
  if (!key) return;
  const previous = map.get(key) || { key, eventCount: 0, activeUsers: 0 };
  previous.eventCount += numberValue(row.eventCount);
  previous.activeUsers += numberValue(row.activeUsers);
  map.set(key, previous);
}

function rankBuckets(map) {
  return [...map.values()].sort((a, b) => b.eventCount - a.eventCount || b.activeUsers - a.activeUsers);
}

function buildAudit(googleMetrics) {
  const site = googleMetrics?.ga4?.playfreecellonline || {};
  const nextActionRows = site.next_action_events || [];
  const eventFallback = (site.game_events || []).find((row) => row.eventName === 'next_action_tap');
  const totalTapsFromDetails = nextActionRows.reduce((sum, row) => sum + numberValue(row.eventCount), 0);
  const totalTaps = totalTapsFromDetails || numberValue(eventFallback?.eventCount);
  const actionMap = new Map();
  const surfaceMap = new Map();
  const gameMap = new Map();
  const localeMap = new Map();

  for (const row of nextActionRows) {
    addBucket(actionMap, row['customEvent:action'] || 'unknown', row);
    addBucket(surfaceMap, row['customEvent:surface'] || 'unknown', row);
    addBucket(gameMap, row['customEvent:game_name'] || 'unknown', row);
    addBucket(localeMap, row['customEvent:game_locale'] || 'unknown', row);
  }

  const actions = rankBuckets(actionMap);
  const surfaces = rankBuckets(surfaceMap);
  const games = rankBuckets(gameMap);
  const locales = rankBuckets(localeMap);
  const topAction = actions[0] || null;

  let recommendation = 'keep_collecting';
  let nextAction = 'Keep the phone next-action panel as-is until GA4 collects enough taps by action.';
  if (site.next_action_error) {
    recommendation = 'register_custom_dimensions';
    nextAction =
      'GA4 has next_action_tap counts, but action/surface breakdowns need custom dimensions registered before this report can choose panel priorities.';
  } else if (totalTaps >= 25 && topAction) {
    recommendation = 'promote_top_action';
    nextAction = `Review whether ${topAction.key} should be visually prioritized on phone after ${topAction.eventCount} taps.`;
  } else if (totalTaps === 0) {
    recommendation = 'wait_for_data';
    nextAction = 'Re-run after the next GA4 refresh; no next-action taps are visible yet.';
  }

  return {
    generatedAt: new Date().toISOString(),
    reportDate: localDateStamp(),
    reportTimeZone: REPORT_TIME_ZONE,
    window: googleMetrics?.window || 'latest available',
    inputs: {
      googleMetricsPulledAt: googleMetrics?.pulled_at || null,
      googleMetricsErrors: googleMetrics?.errors || [],
      nextActionError: site.next_action_error || null,
    },
    summary: {
      totalTaps,
      detailedRows: nextActionRows.length,
      topAction,
      recommendation,
      nextAction,
    },
    breakdowns: {
      actions,
      surfaces,
      games,
      locales,
    },
  };
}

function renderBucketTable(rows, label) {
  if (rows.length === 0) return [`No ${label} detail rows yet.`];
  return [
    '| Value | Taps | Users |',
    '| --- | ---: | ---: |',
    ...rows.map((row) => `| ${row.key} | ${row.eventCount} | ${row.activeUsers} |`),
  ];
}

function renderMarkdown(audit) {
  const lines = [
    `# Next-Action Analytics Audit — ${audit.reportDate}`,
    '',
    `Generated: ${audit.generatedAt} (${audit.reportTimeZone} report date)`,
    '',
    `Window: ${audit.window}`,
    '',
    '## Decision',
    '',
    `- Recommendation: \`${audit.summary.recommendation}\``,
    `- Total next-action taps: ${audit.summary.totalTaps}`,
    `- Detailed GA4 rows: ${audit.summary.detailedRows}`,
    `- Top action: ${
      audit.summary.topAction
        ? `${audit.summary.topAction.key} (${audit.summary.topAction.eventCount} taps)`
        : 'none yet'
    }`,
    `- Next action: ${audit.summary.nextAction}`,
    '',
    '## Actions',
    '',
    ...renderBucketTable(audit.breakdowns.actions, 'action'),
    '',
    '## Surfaces',
    '',
    ...renderBucketTable(audit.breakdowns.surfaces, 'surface'),
    '',
    '## Games',
    '',
    ...renderBucketTable(audit.breakdowns.games, 'game'),
    '',
    '## Locales',
    '',
    ...renderBucketTable(audit.breakdowns.locales, 'locale'),
  ];

  if (audit.inputs.nextActionError) {
    lines.push(
      '',
      '## GA4 Detail Error',
      '',
      `- ${audit.inputs.nextActionError.message}`,
    );
  }

  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const googlePath = args.metrics || await latestGoogleMetricsPath();
  const googleMetrics = await readJsonIfExists(googlePath);
  const audit = buildAudit(googleMetrics);
  const stamp = audit.reportDate;
  const jsonPath = resolve(args.outDir, `${stamp}.json`);
  const mdPath = resolve(args.outDir, `${stamp}.md`);

  await mkdir(dirname(jsonPath), { recursive: true });
  await writeFile(jsonPath, JSON.stringify(audit, null, 2) + '\n');
  await writeFile(mdPath, renderMarkdown(audit) + '\n');

  console.log(`Next-action audit: ${audit.summary.recommendation}`);
  console.log(`Total taps: ${audit.summary.totalTaps}`);
  console.log(`Wrote: ${jsonPath}`);
  console.log(`Wrote: ${mdPath}`);
}

main().catch((err) => {
  console.error('next-action audit failed:', err);
  process.exit(1);
});
