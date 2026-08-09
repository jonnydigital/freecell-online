#!/usr/bin/env node
/**
 * Save a dated mobile viewport QA artifact without hand-typing the output path.
 *
 * Defaults to production and the broad phone-all preset because this command is
 * meant for overnight post-ship confidence checks. Pass through any
 * mobile-viewport-audit flags after `--` to focus a route, change the base URL,
 * or capture screenshots.
 */

import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIR, '..');
const AUDIT_SCRIPT = resolve(SCRIPT_DIR, 'mobile-viewport-audit.mjs');
const SCRIPT_PATH = fileURLToPath(import.meta.url);
const DEFAULT_BASE = process.env.FREECELL_QA_BASE || 'https://playfreecellonline.com';
const DEFAULT_PRESET = process.env.FREECELL_QA_PRESET || 'phone-all';
const ARTIFACT_DIR = process.env.FREECELL_QA_ARTIFACT_DIR || 'docs/analytics/mobile-viewport-audits';

function expandHome(path) {
  return path?.replace(/^~(?=$|\/)/, homedir());
}

function getCandidateNodes() {
  return [
    process.env.FREECELL_QA_NODE,
    process.env.FREECELL_BUILD_NODE,
    process.env.NVM_BIN ? join(process.env.NVM_BIN, 'node') : null,
    '~/.nvm/versions/node/v22.19.0/bin/node',
    '~/.nvm/versions/node/v22.18.0/bin/node',
    '/opt/homebrew/bin/node',
    '/usr/local/bin/node',
  ]
    .filter(Boolean)
    .map(expandHome)
    .filter((candidate, index, candidates) => candidates.indexOf(candidate) === index);
}

function supportsAuditRuntime(nodePath) {
  const result = spawnSync(nodePath, ['-p', "typeof WebSocket === 'function'"], {
    encoding: 'utf8',
  });
  return result.status === 0 && result.stdout.trim() === 'true';
}

function reexecWithSupportedNode() {
  if (typeof WebSocket === 'function' || process.env.FREECELL_QA_NODE_REEXEC === '1') {
    return;
  }

  for (const candidate of getCandidateNodes()) {
    if (!existsSync(candidate) || candidate === process.execPath) {
      continue;
    }

    if (supportsAuditRuntime(candidate)) {
      const version = spawnSync(candidate, ['-p', 'process.versions.node'], { encoding: 'utf8' }).stdout.trim();
      console.log(`Using Node ${version} for mobile viewport audit (${candidate})`);
      const result = spawnSync(candidate, [SCRIPT_PATH, ...process.argv.slice(2)], {
        cwd: PROJECT_ROOT,
        env: {
          ...process.env,
          FREECELL_QA_NODE_REEXEC: '1',
        },
        stdio: 'inherit',
      });
      process.exit(result.status ?? 1);
    }
  }

  console.error('Mobile viewport audit requires a Node runtime with global WebSocket.');
  console.error('Install Node 22+ or set FREECELL_QA_NODE=/path/to/node before running npm run qa:mobile:nightly.');
  process.exit(1);
}

function todayInNewYork() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const byType = new Map(parts.map((part) => [part.type, part.value]));
  return `${byType.get('year')}-${byType.get('month')}-${byType.get('day')}`;
}

function hasFlag(args, flagName) {
  return args.some((arg) => arg === flagName || arg.startsWith(`${flagName}=`));
}

reexecWithSupportedNode();

const forwardedArgs = process.argv.slice(2);
const date = process.env.FREECELL_QA_DATE || todayInNewYork();
const outputPath = `${ARTIFACT_DIR}/${date}-nightly-mobile.json`;
const auditArgs = [];

if (!hasFlag(forwardedArgs, '--base')) {
  auditArgs.push(`--base=${DEFAULT_BASE}`);
}
if (!hasFlag(forwardedArgs, '--preset') && !hasFlag(forwardedArgs, '--widths') && !hasFlag(forwardedArgs, '--viewports')) {
  auditArgs.push(`--preset=${DEFAULT_PRESET}`);
}
if (!hasFlag(forwardedArgs, '--out')) {
  auditArgs.push(`--out=${outputPath}`);
}
auditArgs.push(...forwardedArgs);

const child = spawn(process.execPath, [AUDIT_SCRIPT, ...auditArgs], {
  cwd: PROJECT_ROOT,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exitCode = code ?? 1;
});
