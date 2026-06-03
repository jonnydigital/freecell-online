#!/usr/bin/env node
/**
 * Production-facing AdSense recovery check.
 *
 * Run after the remediation branch is deployed:
 *   npm run adsense:prod-check
 *   ADSENSE_CHECK_BASE_URL=http://localhost:3000 \
 *   ADSENSE_EXPECTED_CANONICAL_BASE_URL=https://solitairestack.com \
 *   ADSENSE_CHECK_FORWARDED_HOST=solitairestack.com \
 *     npm run adsense:prod-check
 */

const BASE_URL = (process.env.ADSENSE_CHECK_BASE_URL || 'https://solitairestack.com').replace(
  /\/$/,
  '',
);
const EXPECTED_CANONICAL_BASE_URL = (
  process.env.ADSENSE_EXPECTED_CANONICAL_BASE_URL || BASE_URL
).replace(/\/$/, '');
const USER_AGENT =
  'Mozilla/5.0 (compatible; SolitaireStack-AdSense-Recovery-Check/1.0; +https://solitairestack.com)';
const FORWARDED_HOST = process.env.ADSENSE_CHECK_FORWARDED_HOST;

function requestHeaders(useForwardedHost = false) {
  return {
    'User-Agent': USER_AGENT,
    ...(useForwardedHost && FORWARDED_HOST ? { 'X-Forwarded-Host': FORWARDED_HOST } : {}),
  };
}

const FORBIDDEN_MARKERS = [
  /AggregateRating/i,
  /["@']@type["@']\s*:\s*["']Review["']/i,
  /schema\.org\/Review\b/i,
  /reviewRating/i,
  /ratingValue/i,
  /bestRating/i,
  /worstRating/i,
  /\b3,241\b/,
  /StarRating/i,
  /What Players Say/i,
];

const REQUIRED_SITEMAP_PATHS = [
  '/',
  '/games',
  '/solitaire-strategy',
  '/freecell',
  '/editorial-standards',
  '/fact-checking-policy',
  '/correction-policy',
  '/authors/j-foye',
  '/solitaire-win-rates',
];

const EXCLUDED_SITEMAP_PATHS = [
  '/accordion/how-to-play',
  '/accordion/strategy',
  '/accordion/tips',
  '/bisley/strategy',
  '/cruel/tips',
  '/flower-garden/how-to-play',
  '/la-belle-lucie/how-to-play',
];

async function fetchText(path, init = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    redirect: init.redirect || 'follow',
    headers: { ...requestHeaders(init.useForwardedHost), ...(init.headers || {}) },
    signal: AbortSignal.timeout(init.timeout || 20000),
  });
  return {
    response,
    text: await response.text(),
  };
}

function record(condition, message, failures) {
  if (!condition) failures.push(message);
}

function absolutePath(path) {
  return `${EXPECTED_CANONICAL_BASE_URL}${path}`;
}

async function checkForbiddenMarkers(failures) {
  for (const path of ['/freecell', '/spider', '/klondike']) {
    const { response, text } = await fetchText(path);
    record(response.ok, `${path} returned HTTP ${response.status}`, failures);
    for (const marker of FORBIDDEN_MARKERS) {
      record(!marker.test(text), `${path} still contains forbidden marker ${marker}`, failures);
    }
  }
}

async function checkIndexingPolicy(failures) {
  const response = await fetch(`${BASE_URL}/accordion/how-to-play`, {
    method: 'HEAD',
    redirect: 'manual',
    headers: requestHeaders(true),
    signal: AbortSignal.timeout(20000),
  });
  const robotsHeader = response.headers.get('x-robots-tag') || '';
  record(
    robotsHeader.toLowerCase() === 'noindex, follow',
    `/accordion/how-to-play returned X-Robots-Tag "${robotsHeader || '(missing)'}"`,
    failures,
  );

  const { response: pageResponse, text } = await fetchText('/accordion/how-to-play', {
    useForwardedHost: true,
  });
  record(pageResponse.ok, `/accordion/how-to-play returned HTTP ${pageResponse.status}`, failures);
  record(!/From Our Network/i.test(text), '/accordion/how-to-play still renders cross-network block', failures);
}

async function checkSitemap(failures) {
  const { response, text } = await fetchText('/sitemap.xml');
  record(response.ok, `/sitemap.xml returned HTTP ${response.status}`, failures);

  const urlCount = (text.match(/<url>/g) || []).length;
  record(
    urlCount >= 115 && urlCount <= 125,
    `/sitemap.xml returned ${urlCount} URLs; expected roughly 121`,
    failures,
  );

  for (const path of REQUIRED_SITEMAP_PATHS) {
    record(text.includes(`<loc>${absolutePath(path)}</loc>`), `/sitemap.xml is missing ${path}`, failures);
  }
  for (const path of EXCLUDED_SITEMAP_PATHS) {
    record(!text.includes(`<loc>${absolutePath(path)}</loc>`), `/sitemap.xml still includes ${path}`, failures);
  }
}

async function checkWinRateDataset(failures) {
  const { response, text } = await fetchText('/solitaire-win-rates.json');
  const contentType = response.headers.get('content-type') || '';
  record(response.ok, `/solitaire-win-rates.json returned HTTP ${response.status}`, failures);
  record(
    contentType.toLowerCase().includes('application/json'),
    `/solitaire-win-rates.json content-type is "${contentType}"`,
    failures,
  );

  try {
    const data = JSON.parse(text);
    record(
      Array.isArray(data.entries) && data.entries.length >= 17,
      `/solitaire-win-rates.json returned ${data.entries?.length ?? 0} entries`,
      failures,
    );
  } catch (error) {
    failures.push(`/solitaire-win-rates.json is not parseable JSON: ${error.message}`);
  }

  const { response: dealsResponse, text: dealsText } = await fetchText('/freecell-unsolvable-deals.json');
  const dealsContentType = dealsResponse.headers.get('content-type') || '';
  record(dealsResponse.ok, `/freecell-unsolvable-deals.json returned HTTP ${dealsResponse.status}`, failures);
  record(
    dealsContentType.toLowerCase().includes('application/json'),
    `/freecell-unsolvable-deals.json content-type is "${dealsContentType}"`,
    failures,
  );

  try {
    const dealsData = JSON.parse(dealsText);
    record(
      Array.isArray(dealsData.entries) && dealsData.entries.length === 8,
      `/freecell-unsolvable-deals.json returned ${dealsData.entries?.length ?? 0} entries`,
      failures,
    );
    record(
      dealsData.population?.solvabilityPercent === 99.9992,
      '/freecell-unsolvable-deals.json does not disclose 99.9992% first-million solvability',
      failures,
    );
  } catch (error) {
    failures.push(`/freecell-unsolvable-deals.json is not parseable JSON: ${error.message}`);
  }
}

async function checkTrustPages(failures) {
  for (const path of ['/editorial-standards', '/fact-checking-policy', '/correction-policy']) {
    const { response, text } = await fetchText(path);
    record(response.ok, `${path} returned HTTP ${response.status}`, failures);
    record(text.includes('J. Foye'), `${path} does not show J. Foye`, failures);
    record(text.includes('/authors/j-foye'), `${path} does not link/schema-reference /authors/j-foye`, failures);
  }

  const { response, text } = await fetchText('/authors/j-foye');
  record(response.ok, '/authors/j-foye is not reachable', failures);
  record(text.includes('Editor &amp; Founder') || text.includes('Editor & Founder'), '/authors/j-foye profile is missing role text', failures);
}

async function checkHubAdsSuppressed(failures) {
  const { response, text } = await fetchText('/');
  record(response.ok, `/ returned HTTP ${response.status}`, failures);
  record(
    !/pagead2\.googlesyndication\.com/i.test(text),
    'Hub homepage still includes the Google AdSense loader before approval',
    failures,
  );
}

async function main() {
  const failures = [];

  await checkForbiddenMarkers(failures);
  await checkIndexingPolicy(failures);
  await checkSitemap(failures);
  await checkWinRateDataset(failures);
  await checkTrustPages(failures);
  await checkHubAdsSuppressed(failures);

  if (failures.length > 0) {
    console.error(`FAIL: ${BASE_URL} is not ready for AdSense re-review evidence.`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`PASS: ${BASE_URL} satisfies the production AdSense recovery checks.`);
}

main().catch((error) => {
  console.error(`FAIL: production check crashed: ${error.stack || error.message}`);
  process.exit(1);
});
