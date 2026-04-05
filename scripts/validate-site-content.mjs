#!/usr/bin/env node
/**
 * validate-site-content.mjs
 * ------------------------------------------------------------------
 * Wave 1-E — multi-site content guard.
 *
 * Scans committed source (src/app, src/components) for foreign-brand
 * string literals and fails the build if a cross-domain leak exists.
 *
 * Why this exists:
 *   Google AdSense rejected solitairestack.com partly because pages
 *   rendered hard-coded references like "PlayFreeCellOnline.com offers
 *   both FreeCell and Spider Solitaire..." on all 4 domains — including
 *   solitairestack.com.
 *
 * What it catches:
 *   LITERAL hard-coded brand strings (inside "...", '...' or `...`)
 *   that reference ANOTHER domain in the network.
 *
 * What it ignores:
 *   - Comments (line and block)
 *   - Import / export paths
 *   - Runtime-dynamic references like {siteConfig.siteName}
 *   - Whitelisted files (canonical configs, NetworkCrossLinks, etc.)
 *   - Blog MDX (handled separately by Wave 11)
 *   - Lines tagged with // allow-foreign-brand:<reason>
 *
 * Usage:
 *   node scripts/validate-site-content.mjs --site=solitairestack
 *   node scripts/validate-site-content.mjs --all
 *   node scripts/validate-site-content.mjs --site=solitairestack --json
 *
 * Exit code: 0 if clean, 1 if violations found.
 * ------------------------------------------------------------------
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

// ------------------------------------------------------------------
// Config
// ------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

/** All brand string variants per site. Detection is case-sensitive. */
const BRAND_STRINGS = {
  playfreecellonline: [
    'playfreecellonline.com',
    'PlayFreeCellOnline.com',
    'PlayFreeCellOnline',
  ],
  solitairestack: [
    'solitairestack.com',
    'SolitaireStack.com',
    'SolitaireStack',
    'Solitaire Stack',
  ],
  playklondikeonline: [
    'playklondikeonline.com',
    'PlayKlondikeOnline.com',
    'PlayKlondikeOnline',
  ],
  playspidersolitaireonline: [
    'playspidersolitaireonline.com',
    'PlaySpiderSolitaireOnline.com',
    'PlaySpiderSolitaireOnline',
  ],
};

const ALL_SITES = Object.keys(BRAND_STRINGS);

/** Files that are allowed to mention multiple brands. */
const WHITELIST_PATHS = [
  'src/lib/siteConfig.ts',
  'src/lib/routeOwnership.ts',
  'src/lib/siteCopy.ts',
  'src/components/NetworkCrossLinks.tsx',
  'src/components/Analytics.tsx',
  'src/components/SolitaireHubHome.tsx', // hub-only component (renders iff isHubSite)
  'src/components/MoreGames.tsx', // cross-domain promotion (marked allow-foreign-brand inline)
  'src/app/(main)/daily-freecell/share/[date]/opengraph-image.tsx',
];

/** Path prefix patterns that bypass the scan entirely. */
const WHITELIST_PATH_PATTERNS = [
  /^src\/content\/blog\//,
  /^src\/content\/authors\//,
  // Hub-only routes — all are runtime-gated via isOwnedBy(path, siteConfig.key)
  // or isHubSite and will notFound() on any spoke domain. Brand references
  // inside them cannot leak at render time.
  /^src\/app\/\(main\)\/authors(\/|$)/,
  /^src\/app\/\(main\)\/contact(\/|$)/,
  /^src\/app\/\(main\)\/editorial-standards(\/|$)/,
  /^src\/app\/\(main\)\/fact-checking-policy(\/|$)/,
  /^src\/app\/\(main\)\/correction-policy(\/|$)/,
  /^src\/app\/\(main\)\/how-we-test-solitaire-games(\/|$)/,
  /^src\/app\/\(main\)\/our-solitaire-methodology(\/|$)/,
];

/** Inline comment directive that suppresses a single line. */
const INLINE_DIRECTIVE = 'allow-foreign-brand';

/** Directories to walk (relative to repo root). */
const SCAN_ROOTS = ['src/app', 'src/components'];

/** File extensions to scan. */
const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.mdx']);

// ------------------------------------------------------------------
// CLI arg parsing
// ------------------------------------------------------------------

function parseArgs(argv) {
  const args = { site: null, all: false, json: false, help: false };
  for (const arg of argv.slice(2)) {
    if (arg === '--all') args.all = true;
    else if (arg === '--json') args.json = true;
    else if (arg === '--help' || arg === '-h') args.help = true;
    else if (arg.startsWith('--site=')) args.site = arg.slice('--site='.length);
    else {
      console.error(`Unknown argument: ${arg}`);
      args.help = true;
    }
  }
  return args;
}

function printHelp() {
  const help = [
    'Usage:',
    '  node scripts/validate-site-content.mjs --site=<site-key>',
    '  node scripts/validate-site-content.mjs --all',
    '  node scripts/validate-site-content.mjs --site=<site-key> --json',
    '',
    'Valid site keys:',
    ...ALL_SITES.map((s) => `  - ${s}`),
    '',
    'Flags:',
    '  --site=<key>  Check a single site.',
    '  --all         Check every site in the network.',
    '  --json        Emit machine-readable JSON instead of formatted text.',
    '  --help, -h    Show this help.',
  ].join('\n');
  console.log(help);
}

// ------------------------------------------------------------------
// File discovery
// ------------------------------------------------------------------

/**
 * Recursively walk a directory and yield absolute file paths that
 * match SCAN_EXTENSIONS.
 */
function* walkDir(absDir) {
  let entries;
  try {
    entries = fs.readdirSync(absDir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    // Skip dotfiles and node_modules defensively.
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const absPath = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(absPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (SCAN_EXTENSIONS.has(ext)) yield absPath;
    }
  }
}

function toRepoRelative(absPath) {
  return path.relative(REPO_ROOT, absPath).split(path.sep).join('/');
}

function isWhitelistedPath(relPath) {
  if (WHITELIST_PATHS.includes(relPath)) return true;
  return WHITELIST_PATH_PATTERNS.some((pat) => pat.test(relPath));
}

// ------------------------------------------------------------------
// Source preprocessing (strip comments)
// ------------------------------------------------------------------

/**
 * Replace every character inside line and block comments with a
 * space, preserving line breaks. This leaves column/line numbers
 * identical between the original and stripped source.
 *
 * Runs a small state machine so string quotes inside comments (and
 * comment-like sequences inside strings) don't confuse it.
 *
 * States: 'code' | 'line-comment' | 'block-comment' | 'string'
 */
function stripComments(source) {
  const out = new Array(source.length);
  let state = 'code';
  let stringChar = '';

  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    const next = i + 1 < source.length ? source[i + 1] : '';

    if (state === 'code') {
      if (ch === '/' && next === '/') {
        state = 'line-comment';
        out[i] = ' ';
        out[i + 1] = ' ';
        i++;
        continue;
      }
      if (ch === '/' && next === '*') {
        state = 'block-comment';
        out[i] = ' ';
        out[i + 1] = ' ';
        i++;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') {
        state = 'string';
        stringChar = ch;
        out[i] = ch;
        continue;
      }
      out[i] = ch;
      continue;
    }

    if (state === 'line-comment') {
      if (ch === '\n') {
        state = 'code';
        out[i] = ch; // keep newline
        continue;
      }
      out[i] = ' ';
      continue;
    }

    if (state === 'block-comment') {
      if (ch === '*' && next === '/') {
        state = 'code';
        out[i] = ' ';
        out[i + 1] = ' ';
        i++;
        continue;
      }
      out[i] = ch === '\n' ? '\n' : ' ';
      continue;
    }

    if (state === 'string') {
      // Escape sequence — copy both chars verbatim.
      if (ch === '\\' && next !== '') {
        out[i] = ch;
        out[i + 1] = next;
        i++;
        continue;
      }
      if (ch === stringChar) {
        state = 'code';
        stringChar = '';
        out[i] = ch;
        continue;
      }
      out[i] = ch;
      continue;
    }
  }

  return out.join('');
}

// ------------------------------------------------------------------
// Violation detection
// ------------------------------------------------------------------

/**
 * Determine whether the character at `index` in `line` sits inside
 * a string literal. We scan the line from the start tracking the
 * active quote character. Template-literal ${...} interpolations are
 * treated conservatively: anything inside a backtick is still "in
 * a string" for our purposes — we're fine with false positives on
 * a brand string that survives the interpolation.
 */
function isIndexInsideStringLiteral(line, index) {
  let inString = false;
  let quote = '';
  for (let i = 0; i < index; i++) {
    const ch = line[i];
    if (!inString) {
      if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        quote = ch;
      }
    } else {
      if (ch === '\\') {
        // Skip escaped char.
        i++;
        continue;
      }
      if (ch === quote) {
        inString = false;
        quote = '';
      }
    }
  }
  return inString;
}

/**
 * Scan one file's (comment-stripped) source for occurrences of every
 * brand string in `foreignBrands`. Returns an array of violations.
 */
function scanFile(relPath, originalSource, foreignBrandMap) {
  const violations = [];
  const strippedSource = stripComments(originalSource);
  const originalLines = originalSource.split('\n');
  const strippedLines = strippedSource.split('\n');

  for (let lineIdx = 0; lineIdx < strippedLines.length; lineIdx++) {
    const strippedLine = strippedLines[lineIdx];
    const originalLine = originalLines[lineIdx] ?? '';

    // Per-line suppression directive.
    if (originalLine.includes(INLINE_DIRECTIVE)) continue;

    for (const [foreignSite, variants] of Object.entries(foreignBrandMap)) {
      for (const variant of variants) {
        let fromIndex = 0;
        while (true) {
          const found = strippedLine.indexOf(variant, fromIndex);
          if (found === -1) break;

          if (isIndexInsideStringLiteral(strippedLine, found)) {
            violations.push({
              file: relPath,
              line: lineIdx + 1,
              column: found + 1,
              match: variant,
              foreignSite,
              context: originalLine.trim().slice(0, 160),
            });
          }
          fromIndex = found + variant.length;
        }
      }
    }
  }

  return violations;
}

// ------------------------------------------------------------------
// Per-site orchestration
// ------------------------------------------------------------------

function buildForeignBrandMap(siteKey) {
  const map = {};
  for (const otherSite of ALL_SITES) {
    if (otherSite === siteKey) continue;
    map[otherSite] = BRAND_STRINGS[otherSite];
  }
  return map;
}

function runSite(siteKey) {
  const foreignBrandMap = buildForeignBrandMap(siteKey);

  const scanned = [];
  const whitelisted = [];
  const violations = [];

  for (const rootRel of SCAN_ROOTS) {
    const rootAbs = path.join(REPO_ROOT, rootRel);
    for (const absPath of walkDir(rootAbs)) {
      const relPath = toRepoRelative(absPath);
      if (isWhitelistedPath(relPath)) {
        whitelisted.push(relPath);
        continue;
      }
      scanned.push(relPath);
      let source;
      try {
        source = fs.readFileSync(absPath, 'utf8');
      } catch (err) {
        console.error(`Could not read ${relPath}: ${err.message}`);
        continue;
      }
      const fileViolations = scanFile(relPath, source, foreignBrandMap);
      violations.push(...fileViolations);
    }
  }

  return {
    site: siteKey,
    filesChecked: scanned.length,
    filesWhitelisted: whitelisted.length,
    scanRoots: SCAN_ROOTS,
    violations,
  };
}

// ------------------------------------------------------------------
// Reporting
// ------------------------------------------------------------------

function printTextReport(result) {
  console.log(`Validating content for site: ${result.site}`);
  console.log(`Scanning: ${result.scanRoots.join(', ')}`);
  console.log(`Files checked: ${result.filesChecked}`);
  console.log(
    `Files whitelisted: ${result.filesWhitelisted} (blog MDX, author bios, siteConfig, etc.)`,
  );
  console.log('');

  if (result.violations.length === 0) {
    console.log(`PASS: no foreign-brand leaks found for site '${result.site}'`);
    return;
  }

  console.log(`VIOLATIONS (${result.violations.length}):`);
  for (const v of result.violations) {
    console.log(`  ${v.file}:${v.line}`);
    console.log(
      `    Contains foreign brand "${v.match}" (${v.foreignSite} site)`,
    );
    console.log(`    Context: "${v.context}"`);
    console.log(
      `    Fix: Replace with {siteConfig.siteName} or a siteCopy token, ` +
        `or add // allow-foreign-brand:<reason> if the reference is intentional`,
    );
    console.log('');
  }

  console.log(
    `FAIL: ${result.violations.length} violation${
      result.violations.length === 1 ? '' : 's'
    } found for site '${result.site}'`,
  );
}

function printJsonReport(results) {
  const totalViolations = results.reduce(
    (acc, r) => acc + r.violations.length,
    0,
  );
  const payload = {
    ok: totalViolations === 0,
    totalViolations,
    results,
  };
  console.log(JSON.stringify(payload, null, 2));
}

// ------------------------------------------------------------------
// Main
// ------------------------------------------------------------------

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.site && !args.all) {
    console.error('Error: must pass --site=<key> or --all');
    console.error('');
    printHelp();
    process.exit(2);
  }

  let targets;
  if (args.all) {
    targets = ALL_SITES;
  } else {
    if (!ALL_SITES.includes(args.site)) {
      console.error(
        `Error: unknown site '${args.site}'. Valid keys: ${ALL_SITES.join(', ')}`,
      );
      process.exit(2);
    }
    targets = [args.site];
  }

  const results = targets.map(runSite);
  const totalViolations = results.reduce(
    (acc, r) => acc + r.violations.length,
    0,
  );

  if (args.json) {
    printJsonReport(results);
  } else {
    results.forEach((result, idx) => {
      if (idx > 0) console.log('\n' + '-'.repeat(60) + '\n');
      printTextReport(result);
    });
    if (args.all) {
      console.log('');
      console.log(
        `Network total: ${totalViolations} violation${
          totalViolations === 1 ? '' : 's'
        } across ${targets.length} sites`,
      );
    }
  }

  process.exit(totalViolations > 0 ? 1 : 0);
}

main();
