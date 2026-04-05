#!/usr/bin/env node
/**
 * link-graph.mjs — Wave 13-B of the multi-site solitaire network refactor.
 *
 * Purpose
 * -------
 * Build an internal-link graph across every page.tsx in src/app/(main) and
 * surface pages that are effectively orphans (nothing links to them) or
 * poorly linked (< 2 inbound). Low inbound link count is a thin-content
 * signal both for SEO and for Google AdSense review.
 *
 * Extraction approach (regex, pragmatic)
 * --------------------------------------
 *   1. Walk src/app/(main) for page.tsx.
 *   2. Derive each page's route path from its file location.
 *   3. Scan each file for:
 *        href="/..." | href='/...'   (plain anchor or Next Link)
 *        Link with href={`/...`} | href={'/...'} | href={"/..."}
 *        push('/...'), replace('/...'), redirect('/...')
 *      and capture the literal path target.
 *   4. Normalise each target: strip query string / hash, drop trailing
 *      slashes (except for '/'), skip externals (http(s)://), mailto,
 *      tel:, anchors (#), and non-static interpolations (anything whose
 *      template literal contains ${...}).
 *   5. Build the adjacency list and its reverse.
 *   6. Report orphan pages, low-inbound pages, top hubs.
 *
 * Usage
 * -----
 *   node scripts/link-graph.mjs                  # default report
 *   node scripts/link-graph.mjs --orphans        # only orphan pages
 *   node scripts/link-graph.mjs --json           # JSON output
 *   node scripts/link-graph.mjs --site=solitairestack  # filter to site owner
 *   node scripts/link-graph.mjs --fail-on-issues       # exit 1 if orphans
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

const VALID_SITES = [
  'solitairestack',
  'playfreecellonline',
  'playklondikeonline',
  'playspidersolitaireonline',
];

// ---------------------------------------------------------------------------
// CLI arg parsing
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const opts = {
  orphansOnly: false,
  json: false,
  site: null,
  failOnIssues: false,
  help: false,
};
for (const a of args) {
  if (a === '--orphans') opts.orphansOnly = true;
  else if (a === '--json') opts.json = true;
  else if (a === '--fail-on-issues') opts.failOnIssues = true;
  else if (a === '--help' || a === '-h') opts.help = true;
  else if (a.startsWith('--site=')) opts.site = a.slice('--site='.length);
  else {
    console.error(`Unknown argument: ${a}`);
    opts.help = true;
  }
}

if (opts.help) {
  console.log(
    [
      'Usage: node scripts/link-graph.mjs [options]',
      '',
      '  --orphans         Only list orphan pages (zero inbound)',
      '  --json            JSON output',
      '  --site=<key>      Filter to pages owned by this site',
      '                      (solitairestack | playfreecellonline |',
      '                       playklondikeonline | playspidersolitaireonline)',
      '  --fail-on-issues  Exit 1 if orphans are found',
      '  -h, --help        Show this help',
    ].join('\n'),
  );
  process.exit(0);
}

if (opts.site && !VALID_SITES.includes(opts.site)) {
  console.error(
    `Error: unknown site '${opts.site}'. Valid: ${VALID_SITES.join(', ')}`,
  );
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Parse routeOwnership.ts so we can filter by owning site if requested.
// Identical approach to audit-canonicals.mjs.
// ---------------------------------------------------------------------------
function parseRouteOwnership() {
  const src = fs.readFileSync(ROUTE_OWNERSHIP_TS, 'utf8');
  const startIdx = src.indexOf('export const ROUTE_OWNERSHIP');
  if (startIdx === -1) return { exact: {}, patterns: [] };
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
  const body = src.slice(firstBrace + 1, endIdx);

  const NAMED = {
    HUB_ONLY: { owners: ['solitairestack'], primaryOwner: 'solitairestack' },
    FREECELL_ONLY: {
      owners: ['playfreecellonline'],
      primaryOwner: 'playfreecellonline',
    },
    KLONDIKE_ONLY: {
      owners: ['playklondikeonline'],
      primaryOwner: 'playklondikeonline',
    },
    SPIDER_ONLY: {
      owners: ['playspidersolitaireonline'],
      primaryOwner: 'playspidersolitaireonline',
    },
  };

  const exact = {};
  let i = 0;
  while (i < body.length) {
    if (body[i] === '/' && body[i + 1] === '/') {
      while (i < body.length && body[i] !== '\n') i++;
      continue;
    }
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
    while (i < body.length && /\s/.test(body[i])) i++;
    if (body[i] !== ':') continue;
    i++;
    while (i < body.length && /\s/.test(body[i])) i++;
    if (body[i] === '{') {
      let bd = 0;
      const oStart = i;
      for (; i < body.length; i++) {
        if (body[i] === '{') bd++;
        else if (body[i] === '}') {
          bd--;
          if (bd === 0) {
            i++;
            break;
          }
        }
      }
      const inline = body.slice(oStart, i);
      const po = /primaryOwner\s*:\s*['"]([a-zA-Z]+)['"]/.exec(inline);
      const ownersMatch = /owners\s*:\s*\[([^\]]*)\]/.exec(inline);
      const owners = ownersMatch
        ? [...ownersMatch[1].matchAll(/['"]([a-zA-Z]+)['"]/g)].map((m) => m[1])
        : [];
      if (po) exact[key] = { owners, primaryOwner: po[1] };
    } else {
      let idEnd = i;
      while (idEnd < body.length && /[A-Z_]/.test(body[idEnd])) idEnd++;
      const ident = body.slice(i, idEnd);
      i = idEnd;
      if (NAMED[ident]) exact[key] = NAMED[ident];
    }
    while (i < body.length && /\s/.test(body[i])) i++;
    if (body[i] === ',') i++;
  }
  // Build dynamic pattern list.
  const patterns = Object.entries(exact)
    .filter(([p]) => p.includes('['))
    .map(([pattern, info]) => ({
      pattern,
      regex: patternToRegex(pattern),
      info,
    }))
    .filter((p) => p.regex);
  return { exact, patterns };
}

function patternToRegex(pattern) {
  if (!pattern.includes('[')) return null;
  const escaped = pattern
    .split('/')
    .map((seg) => {
      if (seg.startsWith('[') && seg.endsWith(']')) return '[^/]+';
      return seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');
  return new RegExp('^' + escaped + '$');
}

const OWNERSHIP = parseRouteOwnership();

function ownerOf(p) {
  const norm = normalisePath(p);
  const hit = OWNERSHIP.exact[norm];
  if (hit) return hit;
  for (const { regex, info } of OWNERSHIP.patterns) {
    if (regex.test(norm)) return info;
  }
  return { owners: ['solitairestack'], primaryOwner: 'solitairestack' };
}

function normalisePath(p) {
  if (!p) return p;
  let out = p.trim();
  const qIdx = out.indexOf('?');
  if (qIdx !== -1) out = out.slice(0, qIdx);
  const hIdx = out.indexOf('#');
  if (hIdx !== -1) out = out.slice(0, hIdx);
  if (!out.startsWith('/')) return null;
  if (out.length > 1 && out.endsWith('/')) out = out.slice(0, -1);
  return out;
}

// ---------------------------------------------------------------------------
// Walk + route derivation
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

function filePathToRoute(absFile) {
  const rel = path.relative(APP_MAIN_DIR, absFile).split(path.sep).join('/');
  const noFile = rel.replace(/\/?page\.tsx$/, '');
  const segments = noFile
    .split('/')
    .filter((s) => s && !(s.startsWith('(') && s.endsWith(')')));
  return '/' + segments.join('/');
}

// ---------------------------------------------------------------------------
// Link extraction — strip comments first, then capture href targets.
// ---------------------------------------------------------------------------
function stripCommentsPreserveLines(source) {
  const out = new Array(source.length);
  let state = 'code';
  let sCh = '';
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    const next = i + 1 < source.length ? source[i + 1] : '';
    if (state === 'code') {
      if (ch === '/' && next === '/') {
        state = 'line';
        out[i] = ' ';
        out[i + 1] = ' ';
        i++;
        continue;
      }
      if (ch === '/' && next === '*') {
        state = 'block';
        out[i] = ' ';
        out[i + 1] = ' ';
        i++;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') {
        state = 'str';
        sCh = ch;
        out[i] = ch;
        continue;
      }
      out[i] = ch;
      continue;
    }
    if (state === 'line') {
      if (ch === '\n') {
        state = 'code';
        out[i] = ch;
        continue;
      }
      out[i] = ' ';
      continue;
    }
    if (state === 'block') {
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
    if (state === 'str') {
      if (ch === '\\' && next !== '') {
        out[i] = ch;
        out[i + 1] = next;
        i++;
        continue;
      }
      if (ch === sCh) {
        state = 'code';
        sCh = '';
        out[i] = ch;
        continue;
      }
      out[i] = ch;
      continue;
    }
  }
  return out.join('');
}

/**
 * Extract internal link targets (strings starting with "/") from a source.
 * Patterns matched:
 *    href="/foo"     href='/foo'
 *    href={"/foo"}   href={'/foo'}   href={`/foo`}
 *    push("/foo")    replace("/foo")  redirect("/foo")
 *
 * Skip paths containing ${ (unresolved interpolation).
 */
function extractLinks(source) {
  const targets = new Set();
  const push = (raw) => {
    if (!raw) return;
    if (raw.includes('${')) return; // dynamic — skip
    const norm = normalisePath(raw);
    if (!norm) return;
    targets.add(norm);
  };

  // href="/..." or href='/...'
  let re = /href\s*=\s*["'](\/[^"']*)["']/g;
  let m;
  while ((m = re.exec(source)) !== null) push(m[1]);

  // href={"/..."} or href={'/...'} or href={`/...`}
  re = /href\s*=\s*\{\s*["'`](\/[^"'`]*)["'`]\s*\}/g;
  while ((m = re.exec(source)) !== null) push(m[1]);

  // router.push("/..."), router.replace("/..."), redirect("/...")
  re = /\b(?:push|replace|redirect|permanentRedirect)\s*\(\s*["'`](\/[^"'`]*)["'`]\s*\)/g;
  while ((m = re.exec(source)) !== null) push(m[1]);

  return [...targets];
}

// ---------------------------------------------------------------------------
// Resolve a linked target to a known route in the ownership map OR to a
// discovered page route. Dynamic segments ([slug]) are matched via regex.
// ---------------------------------------------------------------------------
function resolveTarget(target, knownRoutes, dynamicRoutes) {
  const norm = normalisePath(target);
  if (!norm) return null;
  if (knownRoutes.has(norm)) return norm;
  for (const { regex, pattern } of dynamicRoutes) {
    if (regex.test(norm)) return pattern;
  }
  // Unknown target — may be a valid route we haven't scanned, or a 404.
  return null;
}

// ---------------------------------------------------------------------------
// Main scan
// ---------------------------------------------------------------------------
const pageFiles = [...walkPageTsx(APP_MAIN_DIR)].sort();

// Build list of known routes + dynamic routes from the file system.
const knownRoutes = new Set();
const dynamicRoutes = [];
for (const abs of pageFiles) {
  const route = filePathToRoute(abs);
  knownRoutes.add(route);
  if (route.includes('[')) {
    const rx = patternToRegex(route);
    if (rx) dynamicRoutes.push({ pattern: route, regex: rx });
  }
}

// Build adjacency: source route -> array of outbound targets.
const adjacency = new Map(); // route -> Set of resolved targets
const rawOutbound = new Map(); // route -> Set of raw targets (for reporting)
let totalLinks = 0;

for (const abs of pageFiles) {
  const route = filePathToRoute(abs);
  let src;
  try {
    src = fs.readFileSync(abs, 'utf8');
  } catch {
    continue;
  }
  const cleaned = stripCommentsPreserveLines(src);
  const targets = extractLinks(cleaned);
  const outbound = new Set();
  const rawOut = new Set();
  for (const t of targets) {
    rawOut.add(t);
    const resolved = resolveTarget(t, knownRoutes, dynamicRoutes);
    if (resolved && resolved !== route) outbound.add(resolved);
  }
  adjacency.set(route, outbound);
  rawOutbound.set(route, rawOut);
  totalLinks += rawOut.size;
}

// Build reverse adjacency: route -> array of inbound source routes.
const reverse = new Map();
for (const route of knownRoutes) reverse.set(route, new Set());
for (const [src, targets] of adjacency) {
  for (const tgt of targets) {
    if (!reverse.has(tgt)) reverse.set(tgt, new Set());
    reverse.get(tgt).add(src);
  }
}

// Optional: filter to pages owned by a specific site.
function routeMatchesSiteFilter(route) {
  if (!opts.site) return true;
  const info = ownerOf(route);
  return info.owners.includes(opts.site);
}

const filteredRoutes = [...knownRoutes].filter(routeMatchesSiteFilter).sort();

// Compute orphans and low-inbound.
const orphans = [];
const lowInbound = [];
const inboundCounts = new Map(); // route -> count

for (const route of filteredRoutes) {
  const inbound = reverse.get(route) || new Set();
  const count = inbound.size;
  inboundCounts.set(route, count);
  if (count === 0) orphans.push(route);
  else if (count < 2) {
    const src = [...inbound][0];
    lowInbound.push({ route, count, source: src });
  }
}

// Top hubs by inbound count.
const hubs = [...inboundCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([route, count]) => ({ route, count }));

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------
function formatInt(n) {
  return n.toLocaleString('en-US');
}

function printHuman() {
  console.log('Internal Link Graph');
  console.log('Scanning: src/app/(main)/**/page.tsx');
  console.log(`Pages analyzed: ${pageFiles.length}`);
  console.log(`Internal links found: ${formatInt(totalLinks)}`);
  if (opts.site) console.log(`Filter: site=${opts.site}`);
  console.log('');

  if (opts.orphansOnly) {
    console.log(`ORPHAN PAGES (no inbound links, ${orphans.length}):`);
    if (orphans.length === 0) console.log('  (none)');
    else for (const r of orphans) console.log(`  ${r}`);
    return;
  }

  console.log(`ORPHAN PAGES (no inbound links, ${orphans.length}):`);
  if (orphans.length === 0) {
    console.log('  (none)');
  } else {
    for (const r of orphans) console.log(`  ${r}`);
  }
  console.log('');

  console.log(`LOW INBOUND (< 2 inbound links, ${lowInbound.length}):`);
  if (lowInbound.length === 0) {
    console.log('  (none)');
  } else {
    for (const entry of lowInbound) {
      console.log(
        `  ${entry.route} — ${entry.count} inbound (from ${entry.source})`,
      );
    }
  }
  console.log('');

  console.log('TOP HUB PAGES BY INBOUND (10):');
  for (const h of hubs) {
    console.log(`  ${h.route} — ${h.count} inbound`);
  }
  console.log('');

  const wellLinked = filteredRoutes.length - orphans.length - lowInbound.length;
  console.log('SUMMARY:');
  console.log(`  Orphans: ${orphans.length}`);
  console.log(`  Low-linked: ${lowInbound.length}`);
  console.log(`  Well-linked: ${wellLinked}`);
}

function printJson() {
  const adjacencyJson = {};
  for (const [src, tgts] of adjacency) {
    if (!opts.site || routeMatchesSiteFilter(src)) {
      adjacencyJson[src] = [...tgts].sort();
    }
  }
  const reverseJson = {};
  for (const route of filteredRoutes) {
    reverseJson[route] = [...(reverse.get(route) || [])].sort();
  }
  const payload = {
    pagesAnalyzed: pageFiles.length,
    internalLinksFound: totalLinks,
    siteFilter: opts.site,
    orphans,
    lowInbound,
    topHubs: hubs,
    summary: {
      orphans: orphans.length,
      lowLinked: lowInbound.length,
      wellLinked: filteredRoutes.length - orphans.length - lowInbound.length,
    },
    adjacency: adjacencyJson,
    reverseAdjacency: reverseJson,
  };
  console.log(JSON.stringify(payload, null, 2));
}

if (opts.json) printJson();
else printHuman();

if (opts.failOnIssues && orphans.length > 0) process.exit(1);
process.exit(0);
