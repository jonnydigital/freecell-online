#!/usr/bin/env node
/**
 * Pull authenticated GA4 and AdSense reports into docs/analytics.
 *
 * Requires a Google credential with these scopes:
 *   - https://www.googleapis.com/auth/analytics.readonly
 *   - https://www.googleapis.com/auth/adsense.readonly
 *
 * The current workspace uses `gcloud auth application-default print-access-token`.
 * If this exits with ACCESS_TOKEN_SCOPE_INSUFFICIENT, re-authorize ADC with the
 * scopes above or run the equivalent OAuth flow outside this script.
 */

import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const GA4_PROPERTIES = {
  solitairestack: '525799022',
  playfreecellonline: '531359003',
  playklondikeonline: '531330279',
  playspidersolitaireonline: '531391445',
};

const GA4_GAME_EVENTS = [
  'game_start',
  'game_win',
  'game_abandoned',
  'game_restart',
  'game_deadlock',
  'hint_used',
  'undo_used',
  'time_to_first_move',
  'interaction_type',
];

const PLAYFREECELL_LOCALIZED_PATHS = [
  '/',
  '/freecell/how-to-play',
  '/freecell-en-espanol',
  '/freecell-en-espanol/jugar',
  '/freecell-en-francais',
  '/freecell-en-francais/jouer',
  '/freecell-auf-deutsch',
  '/freecell-auf-deutsch/spielen',
  '/freecell-in-italiano',
  '/freecell-in-italiano/gioca',
  '/freecell-em-portugues',
  '/freecell-em-portugues/jogar',
];

const ADSENSE_METRICS = [
  'ESTIMATED_EARNINGS',
  'PAGE_VIEWS',
  'PAGE_VIEWS_RPM',
  'IMPRESSIONS',
  'IMPRESSIONS_RPM',
  'ACTIVE_VIEW_VIEWABILITY',
  'CLICKS',
  'IMPRESSIONS_CTR',
  'PAGE_VIEWS_CTR',
];

function accessToken() {
  return execFileSync('gcloud', ['auth', 'application-default', 'print-access-token'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

async function requestJson(url, token, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const message = json?.error?.message || `${res.status} ${res.statusText}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

function rowsAsObjects(report) {
  const dimensions = report.dimensionHeaders?.map((h) => h.name) || [];
  const metrics = report.metricHeaders?.map((h) => h.name) || [];
  return (report.rows || []).map((row) => ({
    ...Object.fromEntries(
      dimensions.map((name, index) => [name, row.dimensionValues?.[index]?.value ?? '']),
    ),
    ...Object.fromEntries(
      metrics.map((name, index) => [name, row.metricValues?.[index]?.value ?? '0']),
    ),
  }));
}

async function ga4RunReport(token, propertyId, body) {
  return requestJson(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    token,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );
}

async function pullGa4(token) {
  const out = {};

  for (const [site, propertyId] of Object.entries(GA4_PROPERTIES)) {
    const base = {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
    };

    const reportRequests = [
      ga4RunReport(token, propertyId, {
        ...base,
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'eventCount' },
          { name: 'engagementRate' },
        ],
        limit: 1,
      }),
      ga4RunReport(token, propertyId, {
        ...base,
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
      ga4RunReport(token, propertyId, {
        ...base,
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 20,
      }),
      ga4RunReport(token, propertyId, {
        ...base,
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 20,
      }),
      ga4RunReport(token, propertyId, {
        ...base,
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 10,
      }),
      ga4RunReport(token, propertyId, {
        ...base,
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            inListFilter: { values: GA4_GAME_EVENTS },
          },
        },
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: 20,
      }),
    ];

    if (site === 'playfreecellonline') {
      reportRequests.push(
        ga4RunReport(token, propertyId, {
          ...base,
          dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
          metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }, { name: 'sessions' }],
          dimensionFilter: {
            filter: {
              fieldName: 'pagePath',
              inListFilter: { values: PLAYFREECELL_LOCALIZED_PATHS },
            },
          },
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: PLAYFREECELL_LOCALIZED_PATHS.length,
        }),
      );
    }

    const [summary, channels, pages, countries, devices, events, localizedRoutes] =
      await Promise.all(reportRequests);

    out[site] = {
      property_id: propertyId,
      summary: rowsAsObjects(summary)[0] || {},
      channels: rowsAsObjects(channels),
      top_pages: rowsAsObjects(pages),
      countries: rowsAsObjects(countries),
      devices: rowsAsObjects(devices),
      game_events: rowsAsObjects(events),
      localized_routes: localizedRoutes ? rowsAsObjects(localizedRoutes) : [],
    };
  }

  return out;
}

async function adsenseReport(token, account, dimensions = []) {
  const params = new URLSearchParams({
    dateRange: 'LAST_30_DAYS',
    orderBy: '-ESTIMATED_EARNINGS',
    limit: '50',
  });
  for (const dimension of dimensions) params.append('dimensions', dimension);
  for (const metric of ADSENSE_METRICS) params.append('metrics', metric);

  return requestJson(
    `https://adsense.googleapis.com/v2/${account}/reports:generate?${params.toString()}`,
    token,
  );
}

async function pullAdsense(token) {
  const accounts = await requestJson('https://adsense.googleapis.com/v2/accounts', token);
  const account = accounts.accounts?.[0]?.name;
  if (!account) throw new Error('No AdSense accounts visible to this credential.');

  const [summary, sites, pages, countries, platforms] = await Promise.all([
    adsenseReport(token, account),
    adsenseReport(token, account, ['OWNED_SITE_DOMAIN_NAME']),
    adsenseReport(token, account, ['PAGE_URL']),
    adsenseReport(token, account, ['COUNTRY_NAME']),
    adsenseReport(token, account, ['PLATFORM_TYPE_NAME']),
  ]);

  return {
    account,
    summary,
    sites,
    top_pages: pages,
    countries,
    platforms,
  };
}

async function main() {
  const token = accessToken();
  const now = new Date();
  const outPath = resolve(
    ROOT,
    'docs/analytics',
    `google-metrics-${now.toISOString().slice(0, 10)}.json`,
  );

  const result = {
    pulled_at: now.toISOString(),
    window: 'last 30 days through yesterday',
    ga4: null,
    adsense: null,
    errors: [],
  };

  try {
    result.ga4 = await pullGa4(token);
  } catch (err) {
    result.errors.push({ source: 'ga4', message: err.message, status: err.status, body: err.body });
  }

  try {
    result.adsense = await pullAdsense(token);
  } catch (err) {
    result.errors.push({
      source: 'adsense',
      message: err.message,
      status: err.status,
      body: err.body,
    });
  }

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(result, null, 2) + '\n');

  console.log(`Wrote ${outPath}`);
  if (result.errors.length) {
    console.error(JSON.stringify(result.errors, null, 2));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
