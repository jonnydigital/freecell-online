/**
 * IndexNow client — pings Bing/Yandex/Seznam to (re)crawl URLs instantly.
 *
 * Spec: https://www.indexnow.org/documentation
 *
 * Why we care: we do NOT have Bing Webmaster Tools verified (deferred by
 * Jonathan). IndexNow requires ONLY a key file served at the site root, no
 * Webmaster account. This gives us a backdoor to Bing indexation that would
 * otherwise be closed.
 */

export const INDEXNOW_KEY = '75622f7c3eade87b0d7df27ff6087255';

/** Maximum URLs per submission per the IndexNow spec. */
const BATCH_SIZE = 10_000;

export type IndexNowResult = {
  host: string;
  status: number;
  submitted: number;
  batches: number;
  ok: boolean;
  errors: string[];
};

/**
 * Submits URLs to IndexNow for a single host. All URLs MUST be on the same
 * host (that's an IndexNow rule — cross-host submissions get rejected).
 */
export async function submitUrls(
  urls: string[],
  host: string,
): Promise<IndexNowResult> {
  const errors: string[] = [];
  let lastStatus = 0;
  let batches = 0;
  let submitted = 0;

  const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;

  // Sanity: every URL should be on `host`.
  const filtered = urls.filter((u) => {
    try {
      return new URL(u).host === host;
    } catch {
      return false;
    }
  });

  if (filtered.length !== urls.length) {
    errors.push(
      `${urls.length - filtered.length} URL(s) skipped — wrong host or invalid`,
    );
  }

  for (let i = 0; i < filtered.length; i += BATCH_SIZE) {
    const batch = filtered.slice(i, i + BATCH_SIZE);
    batches += 1;

    try {
      const res = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host,
          key: INDEXNOW_KEY,
          keyLocation,
          urlList: batch,
        }),
      });
      lastStatus = res.status;
      // 200, 202 are success per spec. 422 = some URLs invalid but others accepted.
      // 429 = too many requests. 403 = key file missing or mismatch.
      if (res.status >= 200 && res.status < 300) {
        submitted += batch.length;
      } else {
        errors.push(
          `batch ${batches}: HTTP ${res.status} — ${await res.text().catch(() => '')}`,
        );
      }
    } catch (err) {
      errors.push(`batch ${batches}: ${(err as Error).message}`);
    }
  }

  return {
    host,
    status: lastStatus,
    submitted,
    batches,
    ok: errors.length === 0 && submitted === filtered.length,
    errors,
  };
}

/**
 * Groups mixed URLs by host and submits each group. Returns per-host results.
 */
export async function submitMixedUrls(urls: string[]): Promise<IndexNowResult[]> {
  const byHost: Record<string, string[]> = {};
  for (const u of urls) {
    try {
      const host = new URL(u).host;
      byHost[host] ??= [];
      byHost[host].push(u);
    } catch {
      // skip invalid
    }
  }

  const results: IndexNowResult[] = [];
  for (const [host, hostUrls] of Object.entries(byHost)) {
    results.push(await submitUrls(hostUrls, host));
  }
  return results;
}
