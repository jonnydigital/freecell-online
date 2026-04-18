#!/usr/bin/env node
/**
 * indexnow-submit-sitemap.mjs — pull every URL from each of the 4 live
 * sitemaps and submit each to the IndexNow API. Safe to run anytime — Bing
 * rate-limits unchanged URLs rather than penalising us.
 *
 * Usage: `npm run indexnow:submit`
 *
 * NOTE: this calls the IndexNow API directly and does NOT require the
 * deployed /api/indexnow/submit route (no admin secret needed). The API
 * route is for ad-hoc/cron submissions from inside Vercel.
 */

import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import INDEXNOW_KEY constant from the TS module via a grep-and-parse.
// Keeps the key single-sourced without needing a build step for this script.
const indexnowSrc = await readFile(
  resolve(__dirname, '../src/lib/indexnow.ts'),
  'utf8',
);
const keyMatch = indexnowSrc.match(/INDEXNOW_KEY\s*=\s*['"]([a-f0-9]{32})['"]/i);
if (!keyMatch) {
  console.error('Could not read INDEXNOW_KEY from src/lib/indexnow.ts');
  process.exit(1);
}
const INDEXNOW_KEY = keyMatch[1];

const DOMAINS = [
  'https://playfreecellonline.com',
  'https://solitairestack.com',
  'https://playklondikeonline.com',
  'https://playspidersolitaireonline.com',
];

async function sitemapUrls(base) {
  const res = await fetch(`${base}/sitemap.xml`, {
    headers: { 'User-Agent': 'IndexNowClient/1.0 (+claude metrics)' },
  });
  if (!res.ok) throw new Error(`${base} sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function submit(host, urls) {
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });
  const text = await res.text().catch(() => '');
  return { status: res.status, body: text };
}

async function main() {
  console.log(`IndexNow key: ${INDEXNOW_KEY}`);
  console.log('Submitting sitemap URLs for all 4 domains...\n');

  for (const domain of DOMAINS) {
    const host = new URL(domain).host;
    try {
      const urls = await sitemapUrls(domain);
      console.log(`${host.padEnd(34)} sitemap URLs: ${urls.length}`);
      if (urls.length === 0) continue;

      const result = await submit(host, urls);
      const ok = result.status >= 200 && result.status < 300;
      console.log(
        `${host.padEnd(34)} indexnow:     HTTP ${result.status} ${ok ? '✓' : '✗'}${
          result.body ? ` — ${result.body.slice(0, 120)}` : ''
        }`,
      );
    } catch (err) {
      console.error(`${host} FAILED: ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
