#!/usr/bin/env node
/**
 * Run the full mobile next-action analytics decision loop for cron.
 *
 * The loop is intentionally tolerant of missing Google credentials: it still
 * writes setup dry-run and audit artifacts so the nightly cycle has a dated
 * decision record instead of stopping before documentation.
 *
 * Usage:
 *   npm run analytics:next-action-cycle
 */

import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), '..');
const REPORT_TIME_ZONE = 'America/New_York';
const OUT_DIR = resolve(ROOT, 'docs/analytics/next-action-cycles');

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

function runStep(name, script, args = []) {
  const startedAt = new Date().toISOString();
  const result = spawnSync(process.execPath, [resolve(ROOT, script), ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  return {
    name,
    script,
    args,
    startedAt,
    finishedAt: new Date().toISOString(),
    status: result.status === 0 ? 'passed' : 'failed',
    exitCode: result.status,
    stdout: result.stdout.trim(),
    stderr: result.stderr.trim(),
  };
}

function credentialUnavailable(step) {
  return /No Google token available|could not load the default credentials/i.test(
    `${step.stderr}\n${step.stdout}`,
  );
}

function renderMarkdown(report) {
  const lines = [
    `# Next-Action Analytics Cycle — ${report.reportDate}`,
    '',
    `Generated: ${report.generatedAt} (${report.reportTimeZone} report date)`,
    '',
    `Status: \`${report.status}\``,
    `Recommendation: ${report.recommendation}`,
    '',
    '## Steps',
    '',
    '| Step | Status | Exit |',
    '| --- | --- | ---: |',
    ...report.steps.map((step) => `| ${step.name} | ${step.status} | ${step.exitCode ?? ''} |`),
    '',
    '## Notes',
    '',
    ...report.notes.map((note) => `- ${note}`),
  ];

  for (const step of report.steps) {
    lines.push('', `## ${step.name}`, '');
    if (step.stdout) lines.push('stdout:', '', '```text', step.stdout, '```');
    if (step.stderr) lines.push('stderr:', '', '```text', step.stderr, '```');
    if (!step.stdout && !step.stderr) lines.push('No output.');
  }

  return lines.join('\n');
}

async function writeReport(report) {
  const jsonPath = resolve(OUT_DIR, `${report.reportDate}.json`);
  const mdPath = resolve(OUT_DIR, `${report.reportDate}.md`);
  await mkdir(dirname(jsonPath), { recursive: true });
  await writeFile(jsonPath, JSON.stringify(report, null, 2) + '\n');
  await writeFile(mdPath, renderMarkdown(report) + '\n');
  console.log(`Wrote: ${jsonPath}`);
  console.log(`Wrote: ${mdPath}`);
}

async function main() {
  const steps = [];
  const notes = [];

  const setup = runStep('ensure GA4 dimensions', 'scripts/setup-next-action-dimensions.mjs');
  steps.push(setup);

  if (setup.status === 'failed' && credentialUnavailable(setup)) {
    notes.push('Google credentials were unavailable, so dimension setup was recorded as a dry-run.');
    steps.push(
      runStep('record dimension setup dry-run', 'scripts/setup-next-action-dimensions.mjs', [
        '--dry-run',
      ]),
    );
  }

  const metrics = runStep('pull Google metrics', 'scripts/pull-google-metrics.mjs');
  steps.push(metrics);
  if (metrics.status === 'failed' && credentialUnavailable(metrics)) {
    notes.push('Google metrics pull was skipped by missing credentials; audit used the latest saved metrics artifact.');
  }

  const audit = runStep('audit next-action taps', 'scripts/next-action-audit.mjs');
  steps.push(audit);

  const requiredFailed = steps.some(
    (step) =>
      step.status === 'failed' &&
      step.name !== 'ensure GA4 dimensions' &&
      step.name !== 'pull Google metrics',
  );
  const credentialBlocked = steps.some(
    (step) => step.status === 'failed' && credentialUnavailable(step),
  );

  let status = 'complete';
  let recommendation =
    'Review the latest next-action audit and wait for 25+ panel taps before changing panel priority.';

  if (requiredFailed) {
    status = 'failed';
    recommendation = 'Fix the failed local analytics step before using this cycle for UX decisions.';
  } else if (credentialBlocked) {
    status = 'credential_blocked_with_artifacts';
    recommendation =
      'Install GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_OAUTH_ACCESS_TOKEN, then rerun this cycle for fresh GA4 setup and metrics.';
  }

  if (notes.length === 0) notes.push('All analytics-cycle steps completed without credential fallback.');

  const report = {
    generatedAt: new Date().toISOString(),
    reportDate: localDateStamp(),
    reportTimeZone: REPORT_TIME_ZONE,
    status,
    recommendation,
    notes,
    steps,
  };

  await writeReport(report);

  console.log(`Next-action cycle: ${status}`);
  console.log(recommendation);

  if (requiredFailed) process.exitCode = 1;
}

main().catch((err) => {
  console.error('next-action cycle failed:', err);
  process.exit(1);
});
