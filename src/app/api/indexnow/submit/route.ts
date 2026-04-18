import { NextResponse } from 'next/server';
import { submitMixedUrls, submitUrls, type IndexNowResult } from '@/lib/indexnow';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';

/**
 * Admin-gated IndexNow submission endpoint.
 *
 * Auth: `x-indexnow-secret` header must match process.env.INDEXNOW_ADMIN_SECRET.
 *
 * Body shape:
 *   { paths: string[] }        → same-site submission (siteConfig.baseUrl host)
 *   { urls:  string[] }        → absolute URLs, grouped per host
 *
 * Response: per-host IndexNowResult[].
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type SubmitBody = {
  paths?: string[];
  urls?: string[];
};

function unauthorized() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}

export async function POST(req: Request) {
  const adminSecret = process.env.INDEXNOW_ADMIN_SECRET;
  if (!adminSecret) {
    return NextResponse.json(
      { error: 'INDEXNOW_ADMIN_SECRET not configured on this deployment' },
      { status: 500 },
    );
  }

  const provided = req.headers.get('x-indexnow-secret');
  if (provided !== adminSecret) return unauthorized();

  let body: SubmitBody;
  try {
    body = (await req.json()) as SubmitBody;
  } catch {
    return NextResponse.json({ error: 'invalid json body' }, { status: 400 });
  }

  const { paths, urls } = body;

  if (!Array.isArray(paths) && !Array.isArray(urls)) {
    return NextResponse.json(
      { error: 'provide either `paths` or `urls`' },
      { status: 400 },
    );
  }

  const results: IndexNowResult[] = [];

  if (Array.isArray(paths) && paths.length > 0) {
    const host = new URL(siteConfig.url).host;
    const abs = paths.map((p) => absoluteUrl(p));
    results.push(...(await submitUrls(abs, host).then((r) => [r])));
  }

  if (Array.isArray(urls) && urls.length > 0) {
    results.push(...(await submitMixedUrls(urls)));
  }

  const allOk = results.every((r) => r.ok);
  return NextResponse.json(
    { ok: allOk, results },
    { status: allOk ? 200 : 207 },
  );
}

/** Lightweight health/info endpoint. */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/indexnow/submit',
    method: 'POST',
    headers: { 'x-indexnow-secret': '<required>' },
    body: { paths: ['/some/path'], urls: ['https://host/absolute'] },
  });
}
