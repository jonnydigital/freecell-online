#!/usr/bin/env node
/**
 * Register GA4 event-scoped custom dimensions used by the phone next-action panel.
 *
 * Usage:
 *   npm run analytics:setup-next-actions
 *   npm run analytics:setup-next-actions -- --property=531359003
 *
 * Token sources, in order:
 *   - GOOGLE_OAUTH_ACCESS_TOKEN
 *   - `gcloud auth application-default print-access-token`
 *   - GOOGLE_APPLICATION_CREDENTIALS pointing at authorized_user or service_account JSON
 */

import { execFileSync } from 'node:child_process';
import { createSign } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const DEFAULT_PROPERTY_ID = '531359003';
const GOOGLE_SCOPES = ['https://www.googleapis.com/auth/analytics.edit'];
const DIMENSIONS = [
  {
    parameterName: 'action',
    displayName: 'Next action tap action',
    description: 'Button or link action tapped in the mobile next-action panel.',
  },
  {
    parameterName: 'surface',
    displayName: 'Next action tap surface',
    description: 'UI surface that emitted a next_action_tap event.',
  },
  {
    parameterName: 'game_name',
    displayName: 'Next action tap game',
    description: 'Solitaire game shown when the next-action panel was tapped.',
  },
  {
    parameterName: 'game_locale',
    displayName: 'Next action tap locale',
    description: 'Locale of the game route that emitted the next-action panel tap.',
  },
];

function parseArgs(argv) {
  const args = { propertyId: DEFAULT_PROPERTY_ID, dryRun: false };
  for (const arg of argv) {
    if (arg.startsWith('--property=')) args.propertyId = arg.slice('--property='.length);
    else if (arg === '--dry-run') args.dryRun = true;
  }
  return args;
}

function base64Url(value) {
  return Buffer.from(value)
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
}

function signJwt(payload, privateKey) {
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const body = base64Url(JSON.stringify(payload));
  const input = `${header}.${body}`;
  const signature = createSign('RSA-SHA256').update(input).sign(privateKey, 'base64');
  return `${input}.${signature.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')}`;
}

async function oauthTokenRequest(params) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  });

  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(json?.error_description || json?.error || `${res.status} ${res.statusText}`);
  if (!json.access_token) throw new Error('Google OAuth response did not include an access token.');
  return json.access_token;
}

async function tokenFromCredentialsFile(path) {
  const credentials = JSON.parse(await readFile(path, 'utf8'));

  if (credentials.type === 'authorized_user') {
    return oauthTokenRequest({
      grant_type: 'refresh_token',
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      refresh_token: credentials.refresh_token,
    });
  }

  if (credentials.type === 'service_account') {
    const nowSeconds = Math.floor(Date.now() / 1000);
    const assertion = signJwt(
      {
        iss: credentials.client_email,
        scope: GOOGLE_SCOPES.join(' '),
        aud: 'https://oauth2.googleapis.com/token',
        iat: nowSeconds,
        exp: nowSeconds + 3600,
      },
      credentials.private_key,
    );

    return oauthTokenRequest({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    });
  }

  throw new Error(`Unsupported Google credential type: ${credentials.type || 'unknown'}`);
}

async function accessToken() {
  if (process.env.GOOGLE_OAUTH_ACCESS_TOKEN) return process.env.GOOGLE_OAUTH_ACCESS_TOKEN;

  try {
    return execFileSync('gcloud', ['auth', 'application-default', 'print-access-token'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  } catch {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new Error(
        'No Google token available. Install gcloud, set GOOGLE_OAUTH_ACCESS_TOKEN, or set GOOGLE_APPLICATION_CREDENTIALS to an ADC JSON file.',
      );
    }
  }

  return tokenFromCredentialsFile(process.env.GOOGLE_APPLICATION_CREDENTIALS);
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

async function listCustomDimensions(token, propertyId) {
  const dimensions = [];
  let pageToken = '';

  do {
    const params = new URLSearchParams();
    if (pageToken) params.set('pageToken', pageToken);
    const json = await requestJson(
      `https://analyticsadmin.googleapis.com/v1beta/properties/${propertyId}/customDimensions?${params}`,
      token,
    );
    dimensions.push(...(json.customDimensions || []));
    pageToken = json.nextPageToken || '';
  } while (pageToken);

  return dimensions;
}

async function createCustomDimension(token, propertyId, dimension) {
  return requestJson(
    `https://analyticsadmin.googleapis.com/v1beta/properties/${propertyId}/customDimensions`,
    token,
    {
      method: 'POST',
      body: JSON.stringify({
        ...dimension,
        scope: 'EVENT',
      }),
    },
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let token = null;
  try {
    token = await accessToken();
  } catch (err) {
    if (!args.dryRun) throw err;
    console.log(`Would ensure ${DIMENSIONS.length} GA4 custom dimensions for property ${args.propertyId}:`);
    for (const dimension of DIMENSIONS) console.log(`- ${dimension.parameterName}`);
    console.log(`Skipped GA4 lookup in dry-run because credentials are unavailable: ${err.message}`);
    return;
  }

  const existing = await listCustomDimensions(token, args.propertyId);
  const existingEventParams = new Set(
    existing
      .filter((dimension) => dimension.scope === 'EVENT')
      .map((dimension) => dimension.parameterName),
  );
  const missing = DIMENSIONS.filter((dimension) => !existingEventParams.has(dimension.parameterName));

  if (missing.length === 0) {
    console.log(`GA4 next-action dimensions already exist for property ${args.propertyId}.`);
    return;
  }

  if (args.dryRun) {
    console.log(`Would create ${missing.length} GA4 custom dimensions for property ${args.propertyId}:`);
    for (const dimension of missing) console.log(`- ${dimension.parameterName}`);
    return;
  }

  for (const dimension of missing) {
    const created = await createCustomDimension(token, args.propertyId, dimension);
    console.log(`Created ${created.parameterName || dimension.parameterName}: ${created.name || 'ok'}`);
  }
}

main().catch((err) => {
  console.error('setup-next-action-dimensions failed:', err.message);
  if (err.body) console.error(JSON.stringify(err.body, null, 2));
  process.exit(1);
});
