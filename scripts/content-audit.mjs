#!/usr/bin/env node
/**
 * content-audit.mjs — rough word-count audit for TSX content pages.
 *
 * Purpose
 * -------
 * Google AdSense flagged the hub site for "low value content." This script
 * walks the repo, extracts visible prose from TSX files, and reports which
 * pages fall under a word-count threshold so we know what to expand.
 *
 * Extraction approach (regex-based, not an AST)
 * ---------------------------------------------
 * 1. Strip import/export statements and comments.
 * 2. Pull JSX text nodes — sequences of characters between `>` and `<`.
 * 3. Pull template-literal contents (`...`) and regular string literals
 *    assigned to common content prop names (title, description, body,
 *    answer, q, a, subtitle, heading, text, content, label when long).
 * 4. Drop obvious non-prose: URLs, className/style-like tokens, all-symbol
 *    runs, hex colors, Tailwind utility classes.
 * 5. Collapse whitespace, split on \s+, count tokens that contain at least
 *    one alphabetic character.
 *
 * Known limitations
 * -----------------
 * - This is NOT a precise count — no AST parsing.
 * - May miss dynamically rendered content (data from imports/constants in
 *   sibling files) and over-count identifiers that look like words.
 * - Good enough for a rough triage of thin vs. substantial pages.
 *
 * Usage
 * -----
 *   node scripts/content-audit.mjs
 *   node scripts/content-audit.mjs --min=1500
 *   node scripts/content-audit.mjs --path="src/app/(main)/[game]/page.tsx" --min=1500
 *   node scripts/content-audit.mjs --json
 *   node scripts/content-audit.mjs --fail-under=500
 */

import { readFileSync, statSync, readdirSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import process from 'node:process';

// ---------------------------------------------------------------------------
// CLI arg parsing
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const opts = {
  paths: [],
  min: 500,
  json: false,
  failUnder: null,
};

for (const arg of args) {
  if (arg.startsWith('--min=')) {
    opts.min = parseInt(arg.slice('--min='.length), 10) || 500;
  } else if (arg.startsWith('--path=')) {
    opts.paths.push(arg.slice('--path='.length));
  } else if (arg === '--json') {
    opts.json = true;
  } else if (arg.startsWith('--fail-under=')) {
    opts.failUnder = parseInt(arg.slice('--fail-under='.length), 10);
  } else if (arg === '--help' || arg === '-h') {
    console.log(
      [
        'Usage: node scripts/content-audit.mjs [options]',
        '',
        '  --min=N           Threshold word count (default 500)',
        '  --path=GLOB       Path/glob to scan (repeatable; default:',
        '                      src/app/(main)/**/page.tsx and src/components/**/*.tsx)',
        '  --json            Emit machine-readable JSON',
        '  --fail-under=N    Exit 1 if any file has fewer than N words',
        '  -h, --help        Show this help',
      ].join('\n'),
    );
    process.exit(0);
  }
}

if (opts.paths.length === 0) {
  opts.paths = ['src/app/(main)/**/page.tsx', 'src/components/**/*.tsx'];
}

const repoRoot = resolve(process.cwd());

// ---------------------------------------------------------------------------
// Minimal glob matcher + recursive walker
// ---------------------------------------------------------------------------
// Supports: **, *, literal segments. Good enough for the patterns we use.
function globToRegex(pattern) {
  // Normalize separators to forward slash for matching.
  const p = pattern.replace(/\\/g, '/');
  let re = '^';
  let i = 0;
  while (i < p.length) {
    const c = p[i];
    if (c === '*' && p[i + 1] === '*') {
      // ** — match any number of path segments (including zero).
      // Consume trailing slash if present so "a/**/b" also matches "a/b".
      if (p[i + 2] === '/') {
        re += '(?:.*/)?';
        i += 3;
      } else {
        re += '.*';
        i += 2;
      }
    } else if (c === '*') {
      re += '[^/]*';
      i += 1;
    } else if (c === '?') {
      re += '[^/]';
      i += 1;
    } else if ('.+^$|()[]{}\\'.includes(c)) {
      re += '\\' + c;
      i += 1;
    } else {
      re += c;
      i += 1;
    }
  }
  re += '$';
  return new RegExp(re);
}

function walk(dir, acc = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    // Skip noise dirs early.
    if (
      entry.name === 'node_modules' ||
      entry.name === '.next' ||
      entry.name === '.git' ||
      entry.name === 'dist' ||
      entry.name === 'build' ||
      entry.name.startsWith('.playwright-mcp')
    ) {
      continue;
    }
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
    } else if (entry.isFile()) {
      acc.push(full);
    }
  }
  return acc;
}

function matchFiles(patterns) {
  const regexes = patterns.map(globToRegex);
  const allFiles = walk(repoRoot);
  const matched = new Set();
  for (const abs of allFiles) {
    const rel = relative(repoRoot, abs).split(sep).join('/');
    for (const re of regexes) {
      if (re.test(rel)) {
        matched.add(abs);
        break;
      }
    }
  }
  return [...matched].sort();
}

// ---------------------------------------------------------------------------
// Text extraction from TSX source
// ---------------------------------------------------------------------------
const CONTENT_PROP_NAMES = new Set([
  'title',
  'description',
  'body',
  'answer',
  'q',
  'a',
  'question',
  'subtitle',
  'heading',
  'subheading',
  'headline',
  'text',
  'content',
  'summary',
  'intro',
  'caption',
  'blurb',
  'tagline',
  'excerpt',
  'paragraph',
  'quote',
  'ogDescription',
]);

// Tokens we explicitly do NOT count as prose words.
const TAILWIND_RE =
  /^-?(?:sm:|md:|lg:|xl:|2xl:|hover:|focus:|active:|disabled:|dark:|group-hover:|peer-|motion-)?(?:flex|grid|block|inline|hidden|absolute|relative|fixed|sticky|static|bg-|text-|font-|tracking-|leading-|m[trblxy]?-|p[trblxy]?-|w-|h-|min-|max-|gap-|space-|rounded|border|shadow|ring|opacity|z-|top-|left-|right-|bottom-|items-|justify-|content-|self-|col-|row-|cursor-|select-|overflow-|whitespace-|truncate|uppercase|lowercase|capitalize|italic|underline|no-underline|pointer-events-|transition|duration-|ease-|delay-|animate-|scale-|translate-|rotate-|skew-|origin-|object-|fill-|stroke-|backdrop-|blur-|aspect-|divide-|outline-|placeholder-|appearance-|resize|list-|table-|align-)/;

function looksLikeProseWord(token) {
  if (token.length < 2) return false;
  if (!/[a-zA-Z]/.test(token)) return false; // must contain a letter
  if (/^https?:\/\//i.test(token)) return false;
  if (/^#[0-9a-fA-F]{3,8}$/.test(token)) return false; // hex color
  if (/^[0-9]+(?:px|rem|em|vh|vw|%)?$/.test(token)) return false;
  if (/^--[a-z-]+$/.test(token)) return false; // css vars
  if (TAILWIND_RE.test(token)) return false;
  return true;
}

function countWords(text) {
  if (!text) return 0;
  const tokens = text.split(/\s+/).filter(Boolean);
  let n = 0;
  for (const t of tokens) {
    // strip surrounding punctuation
    const cleaned = t.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '');
    if (!cleaned) continue;
    if (looksLikeProseWord(cleaned)) n += 1;
  }
  return n;
}

function stripCommentsAndImports(src) {
  let s = src;
  // Block comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, ' ');
  // Line comments (but don't eat URLs inside strings — we keep it simple:
  // only strip comments starting the line or following whitespace + //)
  s = s.replace(/(^|[\s;{},()])\/\/[^\n]*/g, '$1 ');
  // import/export statements
  s = s.replace(/^[ \t]*import[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, ' ');
  s = s.replace(/^[ \t]*import\s+['"][^'"]+['"];?\s*$/gm, ' ');
  s = s.replace(/^[ \t]*export\s+(?:type|interface)[^\n]*\n[\s\S]*?^}[ \t]*\n/gm, ' ');
  return s;
}

function extractJsxTextNodes(src) {
  // Simple capture: text between a `>` that closes a tag and the next `<`.
  // This will also grab JSX expressions {...}, which we scrub below.
  const chunks = [];
  const re = />([^<]+)</g;
  let m;
  while ((m = re.exec(src)) !== null) {
    let chunk = m[1];
    // Remove JSX expressions {…} that ended up in the slice.
    chunk = chunk.replace(/\{[^}]*\}/g, ' ');
    // Drop entity placeholders we don't care about.
    chunk = chunk.replace(/&[a-z]+;/gi, ' ');
    if (chunk.trim()) chunks.push(chunk);
  }
  return chunks.join(' ');
}

function extractTemplateLiterals(src) {
  // Back-ticked template literals. Strip ${…} interpolations.
  const chunks = [];
  const re = /`([^`\\]*(?:\\.[^`\\]*)*)`/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    let chunk = m[1].replace(/\$\{[^}]*\}/g, ' ');
    if (chunk.trim()) chunks.push(chunk);
  }
  return chunks.join(' ');
}

function extractContentPropStrings(src) {
  // Find occurrences of `propName: "…"` or `propName: '…'` where propName
  // is one of our known content-bearing keys. Handles escaped quotes.
  const chunks = [];
  const propAlt = [...CONTENT_PROP_NAMES].join('|');
  const re = new RegExp(
    `\\b(${propAlt})\\s*:\\s*(?:"((?:[^"\\\\]|\\\\.)*)"|'((?:[^'\\\\]|\\\\.)*)')`,
    'g',
  );
  let m;
  while ((m = re.exec(src)) !== null) {
    const raw = (m[2] ?? m[3] ?? '').replace(/\\(["'\\])/g, '$1');
    if (raw.trim()) chunks.push(raw);
  }
  return chunks.join(' ');
}

function extractProse(src) {
  const cleaned = stripCommentsAndImports(src);
  const parts = [
    extractJsxTextNodes(cleaned),
    extractTemplateLiterals(cleaned),
    extractContentPropStrings(cleaned),
  ];
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

// ---------------------------------------------------------------------------
// Audit runner
// ---------------------------------------------------------------------------
function audit(files) {
  const results = [];
  for (const abs of files) {
    let src = '';
    try {
      src = readFileSync(abs, 'utf8');
    } catch {
      continue;
    }
    // Skip empty or tiny non-content files quickly.
    try {
      const size = statSync(abs).size;
      if (size === 0) continue;
    } catch {
      /* ignore */
    }
    const prose = extractProse(src);
    const words = countWords(prose);
    results.push({
      path: relative(repoRoot, abs).split(sep).join('/'),
      words,
      status: words < opts.min ? 'under' : 'over',
    });
  }
  return results;
}

function formatInt(n) {
  return n.toLocaleString('en-US');
}

function pad(str, width) {
  if (str.length >= width) return str;
  return str + ' '.repeat(width - str.length);
}

function printHuman(results) {
  const under = results.filter(r => r.status === 'under').sort((a, b) => a.words - b.words);
  const over = results.filter(r => r.status === 'over').sort((a, b) => a.words - b.words);
  const total = results.length;

  console.log(`Content Audit — threshold: ${formatInt(opts.min)} words`);
  console.log(`Scanning: ${opts.paths.join(', ')}`);
  console.log(`Files scanned: ${total}`);
  console.log('');

  const widest = Math.max(
    0,
    ...results.map(r => r.path.length),
  );
  const nameWidth = Math.min(widest + 2, 72);

  console.log(`UNDER THRESHOLD (${under.length}):`);
  if (under.length === 0) {
    console.log('  (none)');
  } else {
    for (const r of under) {
      console.log(`  ${pad(r.path, nameWidth)}${formatInt(r.words).padStart(7)} words`);
    }
  }
  console.log('');

  console.log(`OVER THRESHOLD (${over.length}):`);
  if (over.length === 0) {
    console.log('  (none)');
  } else {
    for (const r of over) {
      console.log(`  ${pad(r.path, nameWidth)}${formatInt(r.words).padStart(7)} words`);
    }
  }
  console.log('');

  const pct = total === 0 ? 0 : Math.round((under.length / total) * 100);
  console.log(`Summary: ${under.length}/${total} files under threshold (${pct}%)`);
}

function printJson(results) {
  const summary = {
    under: results.filter(r => r.status === 'under').length,
    over: results.filter(r => r.status === 'over').length,
    total: results.length,
  };
  const payload = {
    threshold: opts.min,
    pattern: opts.paths.join(','),
    scanned: results.length,
    results: results.sort((a, b) => a.words - b.words),
    summary,
  };
  console.log(JSON.stringify(payload, null, 2));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const files = matchFiles(opts.paths);
const results = audit(files);

if (opts.json) {
  printJson(results);
} else {
  printHuman(results);
}

if (opts.failUnder != null) {
  const anyUnder = results.some(r => r.words < opts.failUnder);
  process.exit(anyUnder ? 1 : 0);
}
process.exit(0);
