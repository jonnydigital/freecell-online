#!/usr/bin/env node
/**
 * Summarize localized FreeCell route visibility from the latest analytics data.
 *
 * Usage:
 *   npm run analytics:locales
 *   npm run analytics:locales -- --metrics=docs/analytics/google-metrics-2026-07-13.json
 */

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const ANALYTICS_DIR = resolve(ROOT, 'docs/analytics');
const OUT_DIR = resolve(ANALYTICS_DIR, 'localized-route-audits');
const REPORT_TIME_ZONE = 'America/New_York';
const DECISION_THRESHOLDS = {
  deepenOrExpandViews: 50,
  deepenOrExpandLocales: 3,
  collectButPrioritizeViews: 15,
};

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

const LOCALES = [
  {
    code: 'en',
    label: 'English',
    guidePath: '/freecell/how-to-play',
    playPath: '/',
    titleNeedles: ['Play FreeCell Online', 'How to Play FreeCell', 'FreeCell Rules'],
  },
  {
    code: 'es',
    label: 'Spanish',
    guidePath: '/freecell-en-espanol',
    playPath: '/freecell-en-espanol/jugar',
    titleNeedles: ['FreeCell en Espanol', 'Jugar FreeCell en Espanol'],
  },
  {
    code: 'fr',
    label: 'French',
    guidePath: '/freecell-en-francais',
    playPath: '/freecell-en-francais/jouer',
    titleNeedles: ['FreeCell en Francais', 'Jouer FreeCell en Francais'],
  },
  {
    code: 'de',
    label: 'German',
    guidePath: '/freecell-auf-deutsch',
    playPath: '/freecell-auf-deutsch/spielen',
    titleNeedles: ['FreeCell auf Deutsch'],
  },
  {
    code: 'it',
    label: 'Italian',
    guidePath: '/freecell-in-italiano',
    playPath: '/freecell-in-italiano/gioca',
    titleNeedles: ['FreeCell in Italiano', 'Gioca FreeCell'],
  },
  {
    code: 'pt',
    label: 'Portuguese',
    guidePath: '/freecell-em-portugues',
    playPath: '/freecell-em-portugues/jogar',
    titleNeedles: ['FreeCell em Portugues', 'Jogar FreeCell em Portugues'],
  },
];

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

function hasNeedle(haystack, needles) {
  const normalized = String(haystack || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  return needles.some((needle) =>
    normalized.includes(needle.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()),
  );
}

function classifyByPath(path) {
  return LOCALES.find((locale) => path === locale.guidePath || path === locale.playPath);
}

function classifyByTitle(title) {
  return LOCALES.find((locale) => hasNeedle(title, locale.titleNeedles));
}

function addSignal(bucket, locale, source, row) {
  if (!locale) return;
  const views = numberValue(row.screenPageViews ?? row.views ?? row.pageViews);
  const users = numberValue(row.activeUsers);
  const sessions = numberValue(row.sessions);
  bucket[locale.code].views += views;
  bucket[locale.code].users += users;
  bucket[locale.code].sessions += sessions;
  bucket[locale.code].sources.push({
    source,
    path: row.pagePath || null,
    title: row.pageTitle || row.title || row.page || null,
    views,
    users,
    sessions,
  });
}

function buildAudit({ dailyMetrics, googleMetrics }) {
  const bucket = Object.fromEntries(
    LOCALES.map((locale) => [
      locale.code,
      {
        code: locale.code,
        label: locale.label,
        guidePath: locale.guidePath,
        playPath: locale.playPath,
        views: 0,
        users: 0,
        sessions: 0,
        sources: [],
      },
    ]),
  );

  const localizedRoutes = googleMetrics?.ga4?.playfreecellonline?.localized_routes || [];
  for (const row of localizedRoutes) {
    addSignal(bucket, classifyByPath(row.pagePath), 'google-metrics.localized_routes', row);
  }

  const topPages = dailyMetrics?.ga4_home?.last7Days?.topPages || [];
  for (const row of topPages) {
    addSignal(bucket, classifyByTitle(row.title), 'daily-metrics.ga4_home.topPages', row);
  }

  const locales = Object.values(bucket);
  const nonEnglish = locales.filter((locale) => locale.code !== 'en');
  const nonEnglishViews = nonEnglish.reduce((sum, locale) => sum + locale.views, 0);
  const visibleNonEnglishLocales = nonEnglish.filter((locale) => locale.views > 0).length;
  const missingLocales = nonEnglish.filter((locale) => locale.views === 0).map((locale) => locale.code);
  const topNonEnglishLocale = [...nonEnglish].sort((a, b) => b.views - a.views)[0] || null;
  const viewsUntilExpansion = Math.max(0, DECISION_THRESHOLDS.deepenOrExpandViews - nonEnglishViews);
  const localesUntilExpansion = Math.max(
    0,
    DECISION_THRESHOLDS.deepenOrExpandLocales - visibleNonEnglishLocales,
  );

  let recommendation = 'hold_i18n_expansion';
  let nextAction = 'Do not build another locale yet. Re-run this audit after the next fresh GA4/GSC pull.';
  if (nonEnglishViews >= 50 && visibleNonEnglishLocales >= 3) {
    recommendation = 'review_next_language_or_deepen_top_locale';
    nextAction =
      'Review whether to deepen the strongest existing locale or add the next language, using query/page evidence before building.';
  } else if (nonEnglishViews >= 15) {
    recommendation = 'keep_collecting_prioritize_top_existing_locale';
    nextAction =
      'Keep collecting data, but consider a small content/internal-linking lift for the strongest visible locale.';
  }

  return {
    generatedAt: new Date().toISOString(),
    reportDate: localDateStamp(),
    reportTimeZone: REPORT_TIME_ZONE,
    window: googleMetrics?.window || dailyMetrics?.ga4_home?.headlinePeriod || 'latest available',
    inputs: {
      dailyMetricsDate: dailyMetrics?.date || null,
      googleMetricsPulledAt: googleMetrics?.pulled_at || null,
      googleMetricsErrors: googleMetrics?.errors || [],
    },
    summary: {
      nonEnglishViews,
      visibleNonEnglishLocales,
      missingLocales,
      thresholds: DECISION_THRESHOLDS,
      shortfall: {
        viewsUntilExpansion,
        localesUntilExpansion,
      },
      topNonEnglishLocale:
        topNonEnglishLocale && topNonEnglishLocale.views > 0
          ? {
              code: topNonEnglishLocale.code,
              label: topNonEnglishLocale.label,
              views: topNonEnglishLocale.views,
              users: topNonEnglishLocale.users,
              sessions: topNonEnglishLocale.sessions,
            }
          : null,
      recommendation,
      nextAction,
      rationale:
        recommendation === 'hold_i18n_expansion'
          ? `Localized visibility is still too thin to justify adding another language route: needs ${DECISION_THRESHOLDS.deepenOrExpandViews}+ non-English localized views and ${DECISION_THRESHOLDS.deepenOrExpandLocales}+ visible non-English locales.`
          : 'Localized visibility is broad enough to inspect a deeper content or routing move.',
    },
    locales,
  };
}

function renderMarkdown(audit) {
  const lines = [
    `# Localized Route Analytics Audit — ${audit.reportDate}`,
    '',
    `Generated: ${audit.generatedAt} (${audit.reportTimeZone} report date)`,
    '',
    `Window: ${audit.window}`,
    '',
    '## Decision',
    '',
    `- Recommendation: \`${audit.summary.recommendation}\``,
    `- Non-English localized views found: ${audit.summary.nonEnglishViews}`,
    `- Visible non-English locales: ${audit.summary.visibleNonEnglishLocales}`,
    `- Expansion gate: ${audit.summary.thresholds.deepenOrExpandViews}+ non-English views and ${audit.summary.thresholds.deepenOrExpandLocales}+ visible non-English locales`,
    `- Gate shortfall: ${audit.summary.shortfall.viewsUntilExpansion} views, ${audit.summary.shortfall.localesUntilExpansion} locales`,
    `- Top non-English locale: ${
      audit.summary.topNonEnglishLocale
        ? `${audit.summary.topNonEnglishLocale.label} (${audit.summary.topNonEnglishLocale.code}) — ${audit.summary.topNonEnglishLocale.views} views`
        : 'none yet'
    }`,
    `- Missing non-English locales: ${audit.summary.missingLocales.join(', ') || 'none'}`,
    `- Rationale: ${audit.summary.rationale}`,
    `- Next action: ${audit.summary.nextAction}`,
    '',
    '## Locale Signals',
    '',
    '| Locale | Views | Users | Sessions | Guide | Play |',
    '| --- | ---: | ---: | ---: | --- | --- |',
  ];

  for (const locale of audit.locales) {
    lines.push(
      `| ${locale.label} (${locale.code}) | ${locale.views} | ${locale.users} | ${locale.sessions} | ${locale.guidePath} | ${locale.playPath} |`,
    );
  }

  lines.push('', '## Source Rows', '');
  for (const locale of audit.locales) {
    if (locale.sources.length === 0) continue;
    lines.push(`### ${locale.label}`, '');
    for (const source of locale.sources) {
      lines.push(
        `- ${source.source}: ${source.views} views, ${source.users} users, ${source.sessions} sessions — ${source.path || source.title || 'unknown row'}`,
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const dailyMetrics = await readJsonIfExists(resolve(ANALYTICS_DIR, 'daily-metrics.json'));
  const googlePath = args.metrics || await latestGoogleMetricsPath();
  const googleMetrics = await readJsonIfExists(googlePath);
  const audit = buildAudit({ dailyMetrics, googleMetrics });
  const stamp = audit.reportDate;
  const jsonPath = resolve(args.outDir, `${stamp}.json`);
  const mdPath = resolve(args.outDir, `${stamp}.md`);

  await mkdir(dirname(jsonPath), { recursive: true });
  await writeFile(jsonPath, JSON.stringify(audit, null, 2) + '\n');
  await writeFile(mdPath, renderMarkdown(audit) + '\n');

  console.log(`Localized route audit: ${audit.summary.recommendation}`);
  console.log(`Non-English views: ${audit.summary.nonEnglishViews}`);
  console.log(`Visible non-English locales: ${audit.summary.visibleNonEnglishLocales}`);
  console.log(`Wrote: ${jsonPath}`);
  console.log(`Wrote: ${mdPath}`);
}

main().catch((err) => {
  console.error('localized route audit failed:', err);
  process.exit(1);
});
