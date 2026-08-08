#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const MINIMUM_NODE = [20, 9, 0];
const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REPO_ROOT = dirname(dirname(SCRIPT_PATH));

function parseVersion(version) {
  return version
    .replace(/^v/, '')
    .split('.')
    .map((part) => Number.parseInt(part, 10) || 0);
}

function isSupportedNode(version = process.versions.node) {
  const actual = parseVersion(version);

  for (let index = 0; index < MINIMUM_NODE.length; index += 1) {
    if ((actual[index] || 0) > MINIMUM_NODE[index]) {
      return true;
    }

    if ((actual[index] || 0) < MINIMUM_NODE[index]) {
      return false;
    }
  }

  return true;
}

function expandHome(path) {
  return path?.replace(/^~(?=$|\/)/, homedir());
}

function getCandidateNodes() {
  return [
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

function getNodeVersion(nodePath) {
  const result = spawnSync(nodePath, ['-p', 'process.versions.node'], {
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    return null;
  }

  return result.stdout.trim();
}

function runWithNode(nodePath, args) {
  const result = spawnSync(nodePath, args, {
    cwd: REPO_ROOT,
    env: {
      ...process.env,
      FREECELL_BUILD_NODE_REEXEC: '1',
    },
    stdio: 'inherit',
  });

  process.exit(result.status ?? 1);
}

if (!isSupportedNode()) {
  for (const candidate of getCandidateNodes()) {
    if (!existsSync(candidate) || candidate === process.execPath) {
      continue;
    }

    const version = getNodeVersion(candidate);
    if (version && isSupportedNode(version)) {
      console.log(`Using Node ${version} for Next.js build (${candidate})`);
      runWithNode(candidate, [SCRIPT_PATH]);
    }
  }

  console.error(
    `Next.js requires Node >=${MINIMUM_NODE.join('.')}; current Node is ${process.versions.node}.`,
  );
  console.error('Install Node 20.9+ or set FREECELL_BUILD_NODE=/path/to/node before running npm run build.');
  process.exit(1);
}

const nextBin = join(REPO_ROOT, 'node_modules', 'next', 'dist', 'bin', 'next');
runWithNode(process.execPath, [nextBin, 'build']);
