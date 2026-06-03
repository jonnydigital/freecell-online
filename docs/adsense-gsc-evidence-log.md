# AdSense / GSC Evidence Log - solitairestack.com

Created: 2026-06-01

Use this file to record the external evidence that cannot be proven from the repo. Update it after the remediation deploy, after Search Console re-reads the sitemap, and again when the AdSense review request is submitted.

## Baseline

| Date | Source | Metric | Value | Notes |
| --- | --- | --- | --- | --- |
| 2026-05-31 | Search Console | Indexed pages | 28 | Baseline from the rejection investigation. |
| 2026-05-31 | Search Console | Sitemap last read | 2026-04-18 | Stale by about six weeks at the time of investigation. |
| 2026-06-01 | Local build | Sitemap URLs after remediation | About 121 | Hub detail triads removed from sitemap; trust-policy pages included. |
| 2026-06-01 | Local build | FreeCell deal-data asset | Not listed as a sitemap page | Adds `/freecell-unsolvable-deals.json` as a second JSON data download linked from `/solitaire-win-rates` and its Dataset schema. Sitemap page count remains about 121. |

## Production Deploy Evidence

| Date/time | Check | Result | Evidence |
| --- | --- | --- | --- |
| 2026-06-01 09:28 EDT | `npm run adsense:prod-check` | PASS | `PASS: https://solitairestack.com satisfies the production AdSense recovery checks.` |
| 2026-06-01 09:28 EDT | Production sitemap URL count | 121 | `curl -s https://solitairestack.com/sitemap.xml \| rg -c '<url>'` |
| 2026-06-01 09:28 EDT | `/accordion/how-to-play` robots header | PASS | `HTTP/2 200`; `x-robots-tag: noindex, follow` |
| 2026-06-01 09:28 EDT | `/solitaire-win-rates.json` | PASS | `HTTP/2 200`; `content-type: application/json; charset=utf-8`; `entries` length = 17 |
| 2026-06-01 09:28 EDT | Hub ad loader suppression | PASS | Homepage source does not contain `pagead2.googlesyndication.com` before approval. |
| 2026-06-01 10:09 EDT | Follow-up production deploy | PASS | Deployment `dpl_euYwizTx73c1fdvmzxMgv9a9qkb4`; production recovery check passed against `https://solitairestack.com`. |
| 2026-06-01 10:09 EDT | `/freecell-unsolvable-deals.json` | PASS | `HTTP/2 200`; `content-type: application/json; charset=utf-8`; `entries` length = 8; first deal `11982`; last deal `781948`; solvability percent `99.9992`. |
| 2026-06-01 10:09 EDT | `/solitaire-win-rates` deal-level section | PASS | Live HTML includes Dataset `DataDownload` for `/freecell-unsolvable-deals.json` and the visible 99.9992% FreeCell deal-data section. |

## Search Console Evidence

Fill this in from the URL-prefix property `https://solitairestack.com/`.

| Date | Search Console screen | Value | Notes |
| --- | --- | --- | --- |
| 2026-06-01 | Sitemaps -> Last read | 2026-06-01 | Post-remediation sitemap re-submitted successfully at about 09:40 EDT. |
| 2026-06-01 | Sitemaps -> Discovered pages | 121 | Search Console now matches the production sitemap footprint. |
| 2026-06-01 | Pages -> Indexed | 27 | Last update: 2026-05-28; effectively unchanged from the 28-page baseline. |
| 2026-06-01 | Pages -> Not indexed | 15 | 4 `Page with redirect`; 11 `Crawled - currently not indexed`. |

## URL Inspection Queue

Request indexing only for high-value indexable pages.

| URL | Request indexing date | Inspection status | Notes |
| --- | --- | --- | --- |
| `https://solitairestack.com/` | 2026-06-02 | Indexed | Homepage is on Google but still showed old FAQ enhancement issues (`FAQ 2 invalid items detected`) at inspection time; fresh recrawl request accepted. |
| `https://solitairestack.com/games` | TBD | Indexed | Main games directory. |
| `https://solitairestack.com/solitaire-games-guide` | TBD | Indexed | High-value guide. |
| `https://solitairestack.com/solitaire-types` | 2026-06-01 | Not indexed: Discovered - currently not indexed | First attempt failed with Search Console's transient "problem submitting your indexing request" message; retry later on 2026-06-01 succeeded and added the URL to the priority crawl queue. |
| `https://solitairestack.com/solitaire-strategy` | 2026-06-02 | Indexed | Fresh recrawl request accepted for the indexed strategy pillar after cleanup. |
| `https://solitairestack.com/solitaire-difficulty-ranking` | 2026-06-01 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue on retry. |
| `https://solitairestack.com/solitaire-history` | 2026-06-01 | Not indexed: Crawled - currently not indexed | Batch automation advanced past this URL before the daily quota error, meaning GSC accepted the request or treated it as already handled. Verify after quota resets. |
| `https://solitairestack.com/freecell-vs-spider` | 2026-06-02 | Not indexed: URL is unknown to Google | Retry after the 2026-06-01 quota block succeeded and added the URL to the priority crawl queue. |
| `https://solitairestack.com/freecell-vs-klondike` | 2026-06-02 | Not indexed: URL is unknown to Google | Added to the priority crawl queue. |
| `https://solitairestack.com/patience-solitaire` | 2026-06-01 | Not indexed: Discovered - currently not indexed | Batch automation advanced past this URL before the daily quota error, meaning GSC accepted the request or treated it as already handled. Verify after quota resets. |
| `https://solitairestack.com/solitaire-win-rates` | 2026-06-01 | Not indexed: Discovered - currently not indexed | Batch automation advanced past this URL before the daily quota error, meaning GSC accepted the request or treated it as already handled. Verify after quota resets. |
| `https://solitairestack.com/freecell` | 2026-06-02 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue; GSC showed sitemap and `https://www.solitairestack.com/` as referring sources. |
| `https://solitairestack.com/how-to-play` | 2026-06-02 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue; sitemap detected, no referring page detected. |
| `https://solitairestack.com/strategy` | 2026-06-02 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue; GSC showed sitemap and `https://www.solitairestack.com/strategy` as referring sources. |
| `https://solitairestack.com/tips` | 2026-06-02 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue; GSC showed sitemap and `https://www.solitairestack.com/tips` as referring sources. |
| `https://solitairestack.com/glossary` | 2026-06-02 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue; GSC showed `https://www.solitairestack.com/glossary` as a referring page. |
| `https://solitairestack.com/history` | 2026-06-02 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue; sitemap detected, no referring page detected. |
| `https://solitairestack.com/how-we-test-solitaire-games` | 2026-06-02 | Not indexed: URL is unknown to Google | Added to the priority crawl queue; no sitemap or referring page detected by URL Inspection. |
| `https://solitairestack.com/our-solitaire-methodology` | 2026-06-03 | Not indexed: URL is unknown to Google | Retry after the 2026-06-02 quota block succeeded and added the URL to the priority crawl queue. |
| `https://solitairestack.com/solitaire-for-every-mood` | 2026-06-03 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue. |
| `https://solitairestack.com/how-solitaire-changed-windows` | 2026-06-03 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue. |
| `https://solitairestack.com/editorial-standards` | 2026-06-03 | Not indexed: URL is unknown to Google | Added to the priority crawl queue. |
| `https://solitairestack.com/popular-solitaire-by-state` | 2026-06-03 | Not indexed: URL is unknown to Google | Added to the priority crawl queue. |
| `https://solitairestack.com/solitaire-game-finder` | 2026-06-03 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue. |
| `https://solitairestack.com/authors` | 2026-06-03 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue. |
| `https://solitairestack.com/authors/j-foye` | 2026-06-03 | Not indexed: URL is unknown to Google | Added to the priority crawl queue. |
| `https://solitairestack.com/freecell-vs-bakers-game` | 2026-06-03 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue. |
| `https://solitairestack.com/freecell-vs-eight-off` | 2026-06-03 | Not indexed: Discovered - currently not indexed | Added to the priority crawl queue. |
| `https://solitairestack.com/about` | 2026-06-03 | Not indexed: URL is unknown to Google | Added to the priority crawl queue. |
| `https://solitairestack.com/solitaire-rules-by-country` | 2026-06-03 inspected | Indexed | Already on Google; request skipped. |
| `https://solitairestack.com/freecell-no-ads` | 2026-06-03 quota blocked | Not indexed: Discovered - currently not indexed | Search Console returned `Quota Exceeded`: "Sorry--we couldn't process this request because you've exceeded your daily quota. Please try submitting this again tomorrow." Retry after the quota resets. |

Do not request indexing for intentionally noindexed detail pages such as `/accordion/how-to-play`, `/bisley/strategy`, or `/cruel/tips`.

## AdSense Review Attempt

| Date | Action | Result | Notes |
| --- | --- | --- | --- |
| 2026-06-01 | Checked AdSense site detail | Needs attention: Low value content | Opened under `jonnydigital1@gmail.com` for `pub-3083538874906149`; `solitairestack.com` has `ads.txt` Authorized and last updated 2026-05-31 12:16 AM EDT. |
| TBD | Submitted AdSense re-review | TBD | Use `docs/adsense-review-submission-package.md` for the review note. |
| TBD | AdSense decision | TBD | Paste the exact policy message if rejected again. |
