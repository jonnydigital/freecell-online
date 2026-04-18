#!/usr/bin/env node
/**
 * pull-public-metrics.mjs — refresh docs/analytics/daily-metrics.json with
 * everything observable WITHOUT auth: sitemap URL counts, live homepage
 * health, robots.txt reachability, and Google `site:` indexed-page counts
 * (best effort — Google blocks automated scrapers so this is a rough signal,
 * not a source of truth; GSC is still required for real numbers).
 *
 * Usage: `npm run metrics:pull`
 *
 * Blocks this does NOT touch:
 *   - ga4_last_known (requires OAuth creds)
 *   - adsense revenue numbers (requires AdSense API)
 * Those still need a manual pull — we just preserve whatever's there.
 */

import { readFile, writeFile, appendFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const METRICS_PATH = resolve(ROOT, 'docs/analytics/daily-metrics.json');
const HISTORY_PATH = resolve(ROOT, 'docs/analytics/history.jsonl');

const DOMAINS = {
  playfreecellonline: 'https://playfreecellonline.com',
  solitairestack: 'https://solitairestack.com',
  playklondikeonline: 'https://playklondikeonline.com',
  playspidersolitaireonline: 'https://playspidersolitaireonline.com',
};

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 ' +
  '(KHTML, like Gecko) Version/17.0 Safari/605.1.15';

async function fetchText(url, opts = {}) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, ...(opts.headers || {}) },
      signal: AbortSignal.timeout(opts.timeout ?? 15000),
    });
    return { status: res.status, text: res.ok ? await res.text() : '' };
  } catch (err) {
    return { status: 0, text: '', error: err.message };
  }
}

/** Sitemap URL count via <loc> tag count. */
async function sitemapCount(domain) {
  const { status, text } = await fetchText(`${domain}/sitemap.xml`);
  if (status !== 200) return { status, count: 0 };
  return { status, count: (text.match(/<loc>/g) || []).length };
}

/** Quick homepage health: status, title, h1, canonical, noindex presence. */
async function homepageHealth(domain) {
  const { status, text } = await fetchText(domain);
  if (!text) return { status, title: '', h1: '', canonical: '', noindex: null };
  const title = (text.match(/<title[^>]*>([^<]+)<\/title>/i) || [, ''])[1].trim();
  const h1 = (text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, ''])[1]
    .replace(/<[^>]+>/g, '')
    .trim();
  const canonical = (
    text.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i) || [, '']
  )[1];
  const robotsMeta =
    (text.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i) || [, ''])[1] || '';
  const noindex = robotsMeta.toLowerCase().includes('noindex');
  return { status, title, h1, canonical, noindex };
}

/** robots.txt reachability + sitemap directive sanity. */
async function robotsStatus(domain) {
  const { status, text } = await fetchText(`${domain}/robots.txt`);
  return {
    status,
    sitemap_declared: /^\s*Sitemap:\s*https?:\/\//im.test(text),
    allow_all: /User-Agent:\s*\*\s*\n\s*Allow:\s*\//i.test(text),
  };
}

/**
 * Rough Google indexed-page count via `site:` operator. Google actively blocks
 * scrapers so this often returns 0 or a 429 — that's fine, just means we
 * couldn't get a fresh signal. Falls back silently to previous value.
 */
async function googleSiteCount(domain) {
  const host = domain.replace(/^https?:\/\//, '');
  const url = `https://www.google.com/search?q=site%3A${encodeURIComponent(host)}&num=100`;
  const { status, text } = await fetchText(url, { timeout: 10000 });
  if (status !== 200) return { ok: false, status, count: null };
  // "About 1,234 results"
  const m = text.match(/About\s+([\d,]+)\s+result/i);
  if (m) return { ok: true, status, count: parseInt(m[1].replace(/,/g, ''), 10) };
  // Zero-result explicit
  if (/did not match any documents/i.test(text)) return { ok: true, status, count: 0 };
  return { ok: false, status, count: null };
}

async function main() {
  const prev = JSON.parse(await readFile(METRICS_PATH, 'utf8'));

  const now = new Date();
  const todayISO = now.toISOString().slice(0, 10);

  const sitemap = {};
  const health = {};
  const robots = {};
  const indexed = {};

  for (const [key, url] of Object.entries(DOMAINS)) {
    sitemap[key] = await sitemapCount(url);
    health[key] = await homepageHealth(url);
    robots[key] = await robotsStatus(url);
    indexed[key] = await googleSiteCount(url);
  }

  const totalSitemap = Object.values(sitemap).reduce((a, s) => a + (s.count || 0), 0);
  const totalIndexed = Object.values(indexed).reduce(
    (a, s) => a + (s.count ?? 0),
    0,
  );

  const next = {
    ...prev,
    date: todayISO,
    lastPulledBy: 'scripts/pull-public-metrics.mjs',
    last_pull_iso: now.toISOString(),
    sitemap_url_counts_live: {
      ...Object.fromEntries(
        Object.entries(sitemap).map(([k, v]) => [k, v.count]),
      ),
      network_total: totalSitemap,
    },
    google_indexation_live: {
      ...Object.fromEntries(
        Object.entries(indexed).map(([k, v]) => [k, v.count]),
      ),
      network_total: totalIndexed,
      note:
        'Google often rate-limits automated `site:` queries. null = couldn\'t read a count this pull; trust GSC for truth.',
    },
    health_checks_live: Object.fromEntries(
      Object.entries(health).map(([k, v]) => [
        k,
        {
          status: v.status,
          title_ok: !!v.title,
          h1_ok: !!v.h1,
          canonical_ok: !!v.canonical,
          noindex: v.noindex,
        },
      ]),
    ),
    robots_txt_live: robots,
  };

  // Append a compact history row (one line = one pull).
  const histRow = {
    ts: now.toISOString(),
    sitemap: Object.fromEntries(
      Object.entries(sitemap).map(([k, v]) => [k, v.count]),
    ),
    indexed: Object.fromEntries(
      Object.entries(indexed).map(([k, v]) => [k, v.count]),
    ),
  };

  await mkdir(dirname(HISTORY_PATH), { recursive: true });
  await appendFile(HISTORY_PATH, JSON.stringify(histRow) + '\n');
  await writeFile(METRICS_PATH, JSON.stringify(next, null, 2) + '\n');

  // Print a human-readable diff.
  console.log('\nPublic metrics pull complete.\n');
  console.log('Domain                           sitemap   indexed');
  console.log('-------------------------------- -------   -------');
  for (const key of Object.keys(DOMAINS)) {
    const sm = sitemap[key].count.toString().padStart(7);
    const idx = indexed[key].count == null ? '   n/a' : indexed[key].count.toString().padStart(7);
    console.log(`${key.padEnd(32)}  ${sm}   ${idx}`);
  }
  console.log('-------------------------------- -------   -------');
  const idxTotal =
    totalIndexed === 0 && Object.values(indexed).some((i) => i.count == null)
      ? '   n/a'
      : totalIndexed.toString().padStart(7);
  console.log(`${'NETWORK TOTAL'.padEnd(32)}  ${totalSitemap.toString().padStart(7)}   ${idxTotal}`);
  console.log(`\nWrote: ${METRICS_PATH}`);
  console.log(`Appended: ${HISTORY_PATH}`);
}

main().catch((err) => {
  console.error('metrics pull failed:', err);
  process.exit(1);
});
