#!/usr/bin/env node
/**
 * audit-canonicals.mjs — Wave 13-A of the multi-site solitaire network refactor.
 *
 * Purpose
 * -------
 * Verify that every page.tsx under src/app/(main) declares a canonical URL
 * (inside `alternates.canonical`) that matches the primary-owner domain per
 * src/lib/routeOwnership.ts.
 *
 * Google AdSense rejected solitairestack.com partly because spoke pages
 * (e.g. playfreecellonline.com/freecell-vs-spider) were self-canonicalising
 * instead of pointing at the hub's copy. This audit catches those mismatches.
 *
 * Categories
 * ----------
 *   OK        Canonical is a string literal and matches the expected
 *             canonicalUrlFor(path).
 *   DYNAMIC   Canonical uses canonicalUrlFor(...) — always correct by
 *             construction; flagged for visual review only.
 *   ABSOLUTE  Canonical uses absoluteUrl(...) — resolves to the CURRENT
 *             site's domain at runtime, which is only correct when the
 *             current site is the primary owner. Usually WRONG for hub-
 *             owned routes served from a spoke (or vice-versa).
 *   MISSING   No `alternates.canonical` found in this file's metadata.
 *   MISMATCH  Literal canonical string points to the wrong domain or path.
 *
 * Implementation
 * --------------
 * Pragmatic regex-based. For each page.tsx:
 *   1. Derive the route path from the file path (strip (main) group,
 *      /page.tsx suffix, preserve [param] dynamic segments).
 *   2. Read the file, find the FIRST `alternates: { ... canonical: VALUE }`
 *      occurrence (or `alternates: { canonical: VALUE }` short form).
 *   3. Classify VALUE as canonicalUrlFor(...), absoluteUrl(...), string
 *      literal, or missing.
 *   4. Compare against canonicalUrlFor(routePath) (re-implemented here by
 *      regex-parsing ROUTE_OWNERSHIP out of src/lib/routeOwnership.ts).
 *
 * Usage
 * -----
 *   node scripts/audit-canonicals.mjs              # default report
 *   node scripts/audit-canonicals.mjs --json       # JSON output
 *   node scripts/audit-canonicals.mjs --fix-hints  # suggest exact edits
 *   node scripts/audit-canonicals.mjs --fail-on-issues  # exit 1 on issues
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Paths + config
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const ROUTE_OWNERSHIP_TS = path.join(REPO_ROOT, 'src/lib/routeOwnership.ts');
const APP_MAIN_DIR = path.join(REPO_ROOT, 'src/app/(main)');

const SITE_DOMAINS = {
  solitairestack: 'https://solitairestack.com',
  playfreecellonline: 'https://playfreecellonline.com',
  playklondikeonline: 'https://playklondikeonline.com',
  playspidersolitaireonline: 'https://playspidersolitaireonline.com',
};

// ---------------------------------------------------------------------------
// CLI arg parsing
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const opts = {
  json: false,
  fixHints: false,
  failOnIssues: false,
  help: false,
};
for (const a of args) {
  if (a === '--json') opts.json = true;
  else if (a === '--fix-hints') opts.fixHints = true;
  else if (a === '--fail-on-issues') opts.failOnIssues = true;
  else if (a === '--help' || a === '-h') opts.help = true;
  else {
    console.error(`Unknown argument: ${a}`);
    opts.help = true;
  }
}

if (opts.help) {
  console.log(
    [
      'Usage: node scripts/audit-canonicals.mjs [options]',
      '',
      '  --json            JSON output',
      '  --fix-hints       Suggest exact edits for each mismatch',
      '  --fail-on-issues  Exit 1 if any MISMATCH or MISSING found',
      '  -h, --help        Show this help',
    ].join('\n'),
  );
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Parse routeOwnership.ts via regex
// ---------------------------------------------------------------------------
// We extract the ROUTE_OWNERSHIP object literal as { '<path>': <record> }
// then map each <record> to its primaryOwner by looking up the named
// constants (HUB_ONLY, FREECELL_ONLY, KLONDIKE_ONLY, SPIDER_ONLY) or the
// inline primaryOwner: '...' field.
function parseRouteOwnership() {
  const src = fs.readFileSync(ROUTE_OWNERSHIP_TS, 'utf8');

  // 1. Grab the ROUTE_OWNERSHIP block: from "export const ROUTE_OWNERSHIP" to
  // the matching closing brace + ";". Use a brace counter starting at the
  // first "{" after that declaration.
  const startIdx = src.indexOf('export const ROUTE_OWNERSHIP');
  if (startIdx === -1) {
    throw new Error('Could not locate ROUTE_OWNERSHIP in routeOwnership.ts');
  }
  const firstBrace = src.indexOf('{', startIdx);
  let depth = 0;
  let endIdx = -1;
  for (let i = firstBrace; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }
  if (endIdx === -1) {
    throw new Error('Could not find end of ROUTE_OWNERSHIP block');
  }
  const body = src.slice(firstBrace + 1, endIdx);

  // 2. For each entry '/path': <record>, classify the record.
  // Record types:
  //   (a) Named constant like HUB_ONLY, FREECELL_ONLY, etc.
  //   (b) Inline object literal with primaryOwner: '...'
  const NAMED_CONST_OWNER = {
    HUB_ONLY: 'solitairestack',
    FREECELL_ONLY: 'playfreecellonline',
    KLONDIKE_ONLY: 'playklondikeonline',
    SPIDER_ONLY: 'playspidersolitaireonline',
  };

  const ownership = {};
  // Match: "'/some/path': HUB_ONLY," OR "'/some/path': { ... primaryOwner: 'x' ... },"
  // We walk top-level entries via brace-counting.
  let i = 0;
  while (i < body.length) {
    // Skip whitespace + comments.
    // Skip line comments
    if (body[i] === '/' && body[i + 1] === '/') {
      while (i < body.length && body[i] !== '\n') i++;
      continue;
    }
    // Skip block comments
    if (body[i] === '/' && body[i + 1] === '*') {
      i += 2;
      while (i < body.length && !(body[i] === '*' && body[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    if (/\s/.test(body[i])) {
      i++;
      continue;
    }
    // Expect a quoted key.
    if (body[i] !== "'" && body[i] !== '"') {
      i++;
      continue;
    }
    const quote = body[i];
    const keyStart = i + 1;
    let keyEnd = keyStart;
    while (keyEnd < body.length && body[keyEnd] !== quote) {
      if (body[keyEnd] === '\\') keyEnd += 2;
      else keyEnd++;
    }
    const key = body.slice(keyStart, keyEnd);
    i = keyEnd + 1;
    // Skip whitespace and colon.
    while (i < body.length && /\s/.test(body[i])) i++;
    if (body[i] !== ':') continue;
    i++;
    while (i < body.length && /\s/.test(body[i])) i++;
    // Now read either an identifier or object literal.
    if (body[i] === '{') {
      // Balance braces and capture the inline object.
      let bdepth = 0;
      const oStart = i;
      for (; i < body.length; i++) {
        if (body[i] === '{') bdepth++;
        else if (body[i] === '}') {
          bdepth--;
          if (bdepth === 0) {
            i++;
            break;
          }
        }
      }
      const inline = body.slice(oStart, i);
      const m = /primaryOwner\s*:\s*['"]([a-zA-Z]+)['"]/.exec(inline);
      if (m) ownership[key] = m[1];
    } else {
      // Identifier.
      let idEnd = i;
      while (idEnd < body.length && /[A-Z_]/.test(body[idEnd])) idEnd++;
      const ident = body.slice(i, idEnd);
      i = idEnd;
      if (NAMED_CONST_OWNER[ident]) ownership[key] = NAMED_CONST_OWNER[ident];
    }
    // Advance past trailing comma if present.
    while (i < body.length && /\s/.test(body[i])) i++;
    if (body[i] === ',') i++;
  }

  return ownership;
}

const ROUTE_OWNERSHIP = parseRouteOwnership();

// ---------------------------------------------------------------------------
// Path helpers (mirror routeOwnership.ts behaviour)
// ---------------------------------------------------------------------------
function normalisePath(p) {
  let out = (p || '').trim();
  if (!out.startsWith('/')) out = '/' + out;
  if (out.length > 1 && out.endsWith('/')) out = out.slice(0, -1);
  return out;
}

function patternToRegex(pattern) {
  if (!pattern.includes('[')) return null;
  const escaped = pattern
    .split('/')
    .map((segment) => {
      if (segment.startsWith('[') && segment.endsWith(']')) return '[^/]+';
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');
  return new RegExp('^' + escaped + '$');
}

const DYNAMIC_PATTERNS = Object.entries(ROUTE_OWNERSHIP)
  .map(([pattern, owner]) => {
    const re = patternToRegex(pattern);
    return re ? { pattern, regex: re, owner } : null;
  })
  .filter(Boolean);

function ownerOf(p) {
  const norm = normalisePath(p);
  const exact = ROUTE_OWNERSHIP[norm];
  if (exact) return exact;
  for (const { regex, owner } of DYNAMIC_PATTERNS) {
    if (regex.test(norm)) return owner;
  }
  // Default to hub-only (matches routeOwnership.ts).
  return 'solitairestack';
}

function canonicalUrlFor(p) {
  const owner = ownerOf(p);
  return SITE_DOMAINS[owner] + normalisePath(p);
}

// ---------------------------------------------------------------------------
// Walk src/app/(main) for page.tsx files and derive their route paths
// ---------------------------------------------------------------------------
function* walkPageTsx(absDir) {
  let entries;
  try {
    entries = fs.readdirSync(absDir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const abs = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      yield* walkPageTsx(abs);
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      yield abs;
    }
  }
}

/**
 * Convert an absolute page.tsx file path to its URL path.
 * Strips (main) group, and the /page.tsx suffix. Preserves [param] segments.
 * Route groups like (main) or (auth) are removed per Next.js conventions.
 */
function filePathToRoute(absFile) {
  const rel = path.relative(APP_MAIN_DIR, absFile).split(path.sep).join('/');
  // Drop trailing /page.tsx
  const noFile = rel.replace(/\/?page\.tsx$/, '');
  // Drop route groups like (marketing)
  const segments = noFile
    .split('/')
    .filter((s) => s && !(s.startsWith('(') && s.endsWith(')')));
  return '/' + segments.join('/');
}

// ---------------------------------------------------------------------------
// Extract alternates.canonical value from a page.tsx source
// ---------------------------------------------------------------------------
/**
 * Locate the first occurrence of `alternates:` followed by its object body,
 * then find `canonical:` inside and extract the full expression up to the
 * next top-level `,` or `}` (brace-balanced).
 *
 * Returns:
 *   { raw: string, kind: 'canonicalUrlFor'|'absoluteUrl'|'string'|'other', value: string|null }
 *   or null if no canonical found.
 */
function extractCanonical(src) {
  // Find the FIRST alternates: — this lives in either `metadata` or a
  // generateMetadata return object. We do brace-matching to get its body.
  const altRe = /alternates\s*:\s*\{/g;
  const m = altRe.exec(src);
  if (!m) return null;
  const bodyStart = m.index + m[0].length; // just after the {
  let depth = 1;
  let i = bodyStart;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  const altBody = src.slice(bodyStart, i);
  // Inline form supports: alternates: { canonical: <expr> }
  const canonIdx = altBody.indexOf('canonical');
  if (canonIdx === -1) return null;
  // Find `:` after canonical
  const colonIdx = altBody.indexOf(':', canonIdx);
  if (colonIdx === -1) return null;
  // Now read the expression up to the next top-level `,` or end of body.
  let j = colonIdx + 1;
  // Skip leading whitespace.
  while (j < altBody.length && /\s/.test(altBody[j])) j++;
  // Track nested braces / parens / brackets / strings to skip commas inside.
  let pdepth = 0;
  let bdepth = 0;
  let sdepth = 0;
  let inStr = false;
  let strCh = '';
  const exprStart = j;
  for (; j < altBody.length; j++) {
    const ch = altBody[j];
    if (inStr) {
      if (ch === '\\') {
        j++;
        continue;
      }
      if (ch === strCh) inStr = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inStr = true;
      strCh = ch;
      continue;
    }
    if (ch === '(') pdepth++;
    else if (ch === ')') pdepth--;
    else if (ch === '{') bdepth++;
    else if (ch === '}') bdepth--;
    else if (ch === '[') sdepth++;
    else if (ch === ']') sdepth--;
    else if (
      ch === ',' &&
      pdepth === 0 &&
      bdepth === 0 &&
      sdepth === 0
    ) {
      break;
    }
  }
  const raw = altBody.slice(exprStart, j).trim();

  // Classify.
  // canonicalUrlFor("/path")  or canonicalUrlFor('/path')
  let mm;
  mm = /^canonicalUrlFor\s*\(\s*['"`]([^'"`]*)['"`]\s*\)$/.exec(raw);
  if (mm) {
    return { raw, kind: 'canonicalUrlFor', value: mm[1] };
  }
  // absoluteUrl("/path")
  mm = /^absoluteUrl\s*\(\s*['"`]([^'"`]*)['"`]\s*\)$/.exec(raw);
  if (mm) {
    return { raw, kind: 'absoluteUrl', value: mm[1] };
  }
  // Bare template literal like absoluteUrl(`/blog/${post.slug}`)
  mm = /^absoluteUrl\s*\(\s*`([^`]*)`\s*\)$/.exec(raw);
  if (mm) {
    return { raw, kind: 'absoluteUrl', value: mm[1] };
  }
  mm = /^canonicalUrlFor\s*\(\s*`([^`]*)`\s*\)$/.exec(raw);
  if (mm) {
    return { raw, kind: 'canonicalUrlFor', value: mm[1] };
  }
  // Plain string literal.
  mm = /^['"]([^'"]+)['"]$/.exec(raw);
  if (mm) {
    return { raw, kind: 'string', value: mm[1] };
  }
  // Template literal that we can't fully resolve.
  mm = /^`([^`]*)`$/.exec(raw);
  if (mm) {
    return { raw, kind: 'string', value: mm[1] };
  }
  return { raw, kind: 'other', value: null };
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------
function auditFile(absFile) {
  const relFile = path.relative(REPO_ROOT, absFile).split(path.sep).join('/');
  const route = filePathToRoute(absFile);
  const expected = canonicalUrlFor(route);
  let src;
  try {
    src = fs.readFileSync(absFile, 'utf8');
  } catch (err) {
    return {
      file: relFile,
      route,
      expected,
      status: 'ERROR',
      note: err.message,
    };
  }
  const found = extractCanonical(src);
  if (!found) {
    return { file: relFile, route, expected, status: 'MISSING' };
  }
  if (found.kind === 'canonicalUrlFor') {
    // If the path argument matches the derived route exactly, it's OK —
    // otherwise flag as DYNAMIC for review (could be a deliberate mismatch
    // e.g. blog slug interpolation).
    const exactMatch =
      found.value && normalisePath(found.value) === normalisePath(route);
    return {
      file: relFile,
      route,
      expected,
      status: exactMatch ? 'DYNAMIC' : 'DYNAMIC',
      found: found.raw,
    };
  }
  if (found.kind === 'absoluteUrl') {
    // absoluteUrl resolves to the CURRENT site's domain — incorrect for
    // routes owned by a different site.
    return {
      file: relFile,
      route,
      expected,
      status: 'ABSOLUTE',
      found: found.raw,
    };
  }
  if (found.kind === 'string') {
    const actual = found.value;
    if (actual === expected) {
      return {
        file: relFile,
        route,
        expected,
        status: 'OK',
        found: actual,
      };
    }
    return {
      file: relFile,
      route,
      expected,
      status: 'MISMATCH',
      found: actual,
    };
  }
  // 'other' — unresolved expression.
  return {
    file: relFile,
    route,
    expected,
    status: 'DYNAMIC',
    found: found.raw,
  };
}

const pageFiles = [...walkPageTsx(APP_MAIN_DIR)].sort();
const results = pageFiles.map(auditFile);

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------
const counts = {
  OK: 0,
  DYNAMIC: 0,
  ABSOLUTE: 0,
  MISSING: 0,
  MISMATCH: 0,
  ERROR: 0,
};
for (const r of results) counts[r.status] = (counts[r.status] || 0) + 1;

function printHuman() {
  console.log('Canonical Audit');
  console.log('Scanning: src/app/(main)/**/page.tsx');
  console.log(`Routes in ownership map: ${Object.keys(ROUTE_OWNERSHIP).length}`);
  console.log(`Page files found: ${results.length}`);
  console.log('');
  console.log(`OK: ${counts.OK}`);
  console.log(`DYNAMIC (canonicalUrlFor): ${counts.DYNAMIC}`);
  console.log(`ABSOLUTE (absoluteUrl, needs review): ${counts.ABSOLUTE}`);
  console.log(`MISSING: ${counts.MISSING}`);
  console.log(`MISMATCH: ${counts.MISMATCH}`);
  if (counts.ERROR) console.log(`ERROR: ${counts.ERROR}`);
  console.log('');

  const mismatches = results.filter((r) => r.status === 'MISMATCH');
  if (mismatches.length) {
    console.log('MISMATCHES:');
    for (const r of mismatches) {
      console.log(`   ${r.file}`);
      console.log(`     Expected: ${r.expected}`);
      console.log(`     Found:    ${r.found}`);
    }
    console.log('');
  }

  const missing = results.filter((r) => r.status === 'MISSING');
  if (missing.length) {
    console.log(`MISSING canonical (${missing.length}):`);
    for (const r of missing.slice(0, 30)) {
      console.log(`   ${r.file}`);
    }
    if (missing.length > 30) {
      console.log(`   ... and ${missing.length - 30} more`);
    }
    console.log('');
  }

  const absolutes = results.filter((r) => r.status === 'ABSOLUTE');
  if (absolutes.length) {
    // Split into "hub-owned but absoluteUrl" (risky on spokes) and other.
    const wrongOwner = absolutes.filter(
      (r) => !r.expected.startsWith(r.expected.split('/').slice(0, 3).join('/')),
    );
    // Actually report all of them with their expected owner:
    console.log(
      `ABSOLUTE canonical (${absolutes.length}) — resolves to current site, check ownership:`,
    );
    for (const r of absolutes.slice(0, 30)) {
      console.log(`   ${r.file}`);
      console.log(`     Route:    ${r.route}`);
      console.log(`     Expected: ${r.expected}`);
      console.log(`     Found:    ${r.found}`);
    }
    if (absolutes.length > 30) {
      console.log(`   ... and ${absolutes.length - 30} more`);
    }
    console.log('');
  }

  if (opts.fixHints) {
    const needsFix = results.filter(
      (r) => r.status === 'MISMATCH' || r.status === 'MISSING' || r.status === 'ABSOLUTE',
    );
    if (needsFix.length) {
      console.log('Fix hints:');
      for (const r of needsFix) {
        console.log(`   In ${r.file}:`);
        if (r.status === 'MISSING') {
          console.log(`     Add to metadata.alternates:`);
          console.log(`       canonical: canonicalUrlFor('${r.route}'),`);
          console.log(
            `     (import from '@/lib/routeOwnership'; expected: ${r.expected})`,
          );
        } else if (r.status === 'MISMATCH') {
          console.log(`     Replace:`);
          console.log(`       canonical: '${r.found}'`);
          console.log(`     With:`);
          console.log(`       canonical: canonicalUrlFor('${r.route}'),`);
          console.log(`     (expected ${r.expected})`);
        } else if (r.status === 'ABSOLUTE') {
          console.log(`     Replace:`);
          console.log(`       canonical: ${r.found}`);
          console.log(`     With:`);
          console.log(`       canonical: canonicalUrlFor('${r.route}'),`);
          console.log(`     (expected ${r.expected})`);
        }
        console.log('');
      }
    }
  }
}

if (opts.json) {
  console.log(
    JSON.stringify(
      {
        routesInOwnershipMap: Object.keys(ROUTE_OWNERSHIP).length,
        pageFilesFound: results.length,
        counts,
        results,
      },
      null,
      2,
    ),
  );
} else {
  printHuman();
}

const hasIssues = counts.MISMATCH > 0 || counts.MISSING > 0;
if (opts.failOnIssues && hasIssues) process.exit(1);
process.exit(0);
