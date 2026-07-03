#!/usr/bin/env node
/**
 * property-scorecard.mjs — weekly health scorecard for the 4-domain network.
 *
 * Usage: `npm run scorecard` (no deps, Node 18+; uses global fetch)
 *
 * Checks per domain: sitemap URL counts (with deltas vs the previous run),
 * canary pages (HTTP status, self-canonical, H1 present, hreflang where
 * expected, no stray noindex), robots.txt sitemap line. Network-wide: one
 * cross-domain blog 301 and ads.txt on the AdSense-approved domain.
 *
 * Output:
 *   docs/analytics/scorecards/YYYY-MM-DD.md  (human report, committed)
 *   docs/analytics/scorecards/latest.json    (machine state for deltas)
 *
 * Always exits 0 — the report is the artifact; FAILED sections are the
 * signal. A fetch outage marks the section FAILED without killing the run.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../docs/analytics/scorecards');
const UA = { 'User-Agent': 'PropertyScorecard/1.0 (+internal health check)' };

/** Canary spec: path + which assertions apply. `hreflang` lists expected langs. */
const DOMAINS = [
  {
    key: 'playfreecellonline',
    base: 'https://playfreecellonline.com',
    canaries: [
      { path: '/', h1: true },
      { path: '/freecell/how-to-play', h1: true, selfCanonical: true, hreflang: ['es'] },
      { path: '/blog', selfCanonical: true, h1: true },
      { path: '/daily-freecell', h1: true },
    ],
  },
  {
    key: 'solitairestack',
    base: 'https://solitairestack.com',
    canaries: [
      { path: '/', h1: true },
      { path: '/games', h1: true },
      { path: '/blog', selfCanonical: true, h1: true },
      { path: '/solitaire-win-rates', h1: true, selfCanonical: true },
    ],
  },
  {
    key: 'playklondikeonline',
    base: 'https://playklondikeonline.com',
    canaries: [
      { path: '/', h1: true },
      { path: '/klondike/how-to-play', h1: true, selfCanonical: true },
      { path: '/blog/klondike-which-column-to-dig-first', selfCanonical: true, h1: true },
    ],
  },
  {
    key: 'playspidersolitaireonline',
    base: 'https://playspidersolitaireonline.com',
    canaries: [
      { path: '/', h1: true },
      { path: '/spider/how-to-play', h1: true, selfCanonical: true },
      { path: '/blog/spider-solitaire-when-to-deal', selfCanonical: true, h1: true },
    ],
  },
];

/** A spoke-owned post requested on a non-owner domain must 301/308 to the owner. */
const CROSS_DOMAIN_REDIRECT = {
  from: 'https://playfreecellonline.com/blog/spider-solitaire-when-to-deal',
  toHost: 'playspidersolitaireonline.com',
};

const ADS_TXT_DOMAIN = 'https://playfreecellonline.com';

const results = []; // { section, check, ok, detail }
function record(section, check, ok, detail = '') {
  results.push({ section, check, ok, detail });
}

async function fetchText(url, opts = {}) {
  const res = await fetch(url, { headers: UA, redirect: 'follow', ...opts });
  return { status: res.status, url: res.url, text: await res.text() };
}

async function checkSitemap(domain) {
  try {
    const { status, text } = await fetchText(`${domain.base}/sitemap.xml`);
    if (status !== 200) {
      record(domain.key, 'sitemap.xml fetch', false, `HTTP ${status}`);
      return null;
    }
    const urls = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const foreign = urls.filter((u) => !u.startsWith(domain.base));
    const blog = urls.filter((u) => u.includes('/blog/'));
    record(domain.key, 'sitemap.xml fetch', true, `${urls.length} URLs, ${blog.length} blog`);
    record(domain.key, 'sitemap has only own-domain URLs', foreign.length === 0,
      foreign.length ? `${foreign.length} foreign: ${foreign[0]}` : '');
    return { sitemapUrls: urls.length, blogUrls: blog.length };
  } catch (err) {
    record(domain.key, 'sitemap.xml fetch', false, `FAILED: ${err.message}`);
    return null;
  }
}

async function checkCanary(domain, canary) {
  const url = `${domain.base}${canary.path}`;
  const label = `canary ${canary.path}`;
  try {
    const { status, text } = await fetchText(url);
    if (status !== 200) {
      record(domain.key, label, false, `HTTP ${status}`);
      return;
    }
    const problems = [];
    if (canary.h1 && !/<h1[\s>]/i.test(text)) problems.push('missing <h1>');
    if (canary.selfCanonical) {
      const m = text.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)
        ?? text.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
      const canonical = m?.[1]?.replace(/\/$/, '');
      const expected = url.replace(/\/$/, '');
      if (!canonical) problems.push('missing canonical');
      else if (canonical !== expected) problems.push(`canonical points at ${canonical}`);
    }
    for (const lang of canary.hreflang ?? []) {
      if (!new RegExp(`hreflang="${lang}"`, 'i').test(text)) problems.push(`missing hreflang=${lang}`);
    }
    if (/<meta[^>]+name="robots"[^>]+noindex/i.test(text)) problems.push('unexpected noindex');
    record(domain.key, label, problems.length === 0, problems.join('; '));
  } catch (err) {
    record(domain.key, label, false, `FAILED: ${err.message}`);
  }
}

async function checkRobots(domain) {
  try {
    const { status, text } = await fetchText(`${domain.base}/robots.txt`);
    record(domain.key, 'robots.txt has Sitemap line',
      status === 200 && /Sitemap:/i.test(text), status !== 200 ? `HTTP ${status}` : '');
  } catch (err) {
    record(domain.key, 'robots.txt has Sitemap line', false, `FAILED: ${err.message}`);
  }
}

async function checkCrossDomainRedirect() {
  try {
    const res = await fetch(CROSS_DOMAIN_REDIRECT.from, { headers: UA, redirect: 'manual' });
    const loc = res.headers.get('location') ?? '';
    const ok = [301, 308].includes(res.status) && loc.includes(CROSS_DOMAIN_REDIRECT.toHost);
    record('network', 'cross-domain blog 301 to owner', ok, `HTTP ${res.status} → ${loc || '(none)'}`);
  } catch (err) {
    record('network', 'cross-domain blog 301 to owner', false, `FAILED: ${err.message}`);
  }
}

async function checkAdsTxt() {
  try {
    const { status, text } = await fetchText(`${ADS_TXT_DOMAIN}/ads.txt`);
    record('network', 'ads.txt serves google line',
      status === 200 && /google\.com/.test(text), status !== 200 ? `HTTP ${status}` : '');
  } catch (err) {
    record('network', 'ads.txt serves google line', false, `FAILED: ${err.message}`);
  }
}

function fmtDelta(now, prev) {
  if (prev === undefined || prev === null) return '';
  const d = now - prev;
  return d === 0 ? ' (±0)' : ` (${d > 0 ? '+' : ''}${d})`;
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  await mkdir(OUT_DIR, { recursive: true });

  let previous = null;
  try {
    previous = JSON.parse(await readFile(resolve(OUT_DIR, 'latest.json'), 'utf8'));
  } catch { /* first run */ }

  const counts = {};
  for (const domain of DOMAINS) {
    const sm = await checkSitemap(domain);
    if (sm) counts[domain.key] = sm;
    await checkRobots(domain);
    for (const canary of domain.canaries) await checkCanary(domain, canary);
  }
  await checkCrossDomainRedirect();
  await checkAdsTxt();

  const failed = results.filter((r) => !r.ok);
  const lines = [
    `# Property Scorecard — ${today}`,
    '',
    `**${results.length - failed.length}/${results.length} checks passing.**` +
      (failed.length ? ` ${failed.length} FAILING — triage below.` : ' All green.'),
    '',
    '## Sitemap footprint',
    '',
    '| Domain | URLs | Blog URLs |',
    '|--------|------|-----------|',
    ...DOMAINS.map((d) => {
      const c = counts[d.key];
      const p = previous?.domains?.[d.key];
      return c
        ? `| ${d.base.replace('https://', '')} | ${c.sitemapUrls}${fmtDelta(c.sitemapUrls, p?.sitemapUrls)} | ${c.blogUrls}${fmtDelta(c.blogUrls, p?.blogUrls)} |`
        : `| ${d.base.replace('https://', '')} | FETCH FAILED | — |`;
    }),
    '',
    '## Checks',
    '',
  ];
  let section = '';
  for (const r of results) {
    if (r.section !== section) {
      section = r.section;
      lines.push(`### ${section}`, '');
    }
    lines.push(`- ${r.ok ? '✅' : '❌'} ${r.check}${r.detail ? ` — ${r.detail}` : ''}`);
  }
  lines.push('', '## Notes for the next producer run', '');
  lines.push(
    failed.length
      ? failed.map((f) => `- FIX: [${f.section}] ${f.check}${f.detail ? ` — ${f.detail}` : ''}`).join('\n')
      : '- No regressions. Next lever: content cadence + off-site placements (see docs/plans/2026-07-03-001).'
  );
  lines.push('');

  await writeFile(resolve(OUT_DIR, `${today}.md`), lines.join('\n'));
  await writeFile(
    resolve(OUT_DIR, 'latest.json'),
    JSON.stringify({ date: today, domains: counts }, null, 2) + '\n'
  );

  console.log(lines.slice(0, 16).join('\n'));
  console.log(`\nReport: docs/analytics/scorecards/${today}.md`);
  if (failed.length) console.log(`FAILING (${failed.length}): ${failed.map((f) => `[${f.section}] ${f.check}`).join(' | ')}`);
}

main();
