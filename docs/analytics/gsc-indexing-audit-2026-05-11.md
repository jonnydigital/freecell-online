# GSC Indexing Audit — 2026-05-11

## Trigger

GSC email alert (2026-05-09): *"New reason preventing your pages from being indexed: Page with redirect"* — solitairestack.com property.

## Live network-wide indexing state (pulled 2026-05-11 via Chrome MCP)

| Property | Indexed | Not indexed | Reasons |
|---|---|---|---|
| solitairestack.com | 22 | 14 | Page with redirect (1) · Crawled - not indexed (12) · Duplicate canonical (1) |
| playfreecellonline.com | 18 | 85 | 404 (1) · Discovered - not indexed (81) · Duplicate canonical (2) · Crawled - not indexed (1) |
| playklondikeonline.com | 12 | 18* | Discovered - not indexed (18) — header conflict |
| playspidersolitaireonline.com | 9 | 3 | 404 (1) · Crawled - not indexed (2) |

## Page with redirect — single URL

- **Property:** solitairestack.com
- **URL:** `https://solitairestack.com/download`
- **First detected:** 5/9/26
- **Verified:** `curl -I` returns 301 → `https://playfreecellonline.com/download`

## Root cause

`/download` is owned by `FREECELL_ONLY` in `src/lib/routeOwnership.ts`. The proxy in `src/proxy.ts` correctly 301-redirects when the request lands on solitairestack.com. The redirect itself is intentional.

The **leak**: hub-rendered pages contained relative `<Link href="/download">` (and many similar cross-domain hrefs). When Googlebot crawled those pages on solitairestack.com, it saw the relative link, requested `solitairestack.com/download`, and logged the 301 as a "Page with redirect" reason.

Confirmed leak sources (greppable):
- `src/app/(main)/freecell-no-ads/page.tsx` — "Read Next" card row
- `src/app/(main)/sitemap/page.tsx` — explore links array
- `src/app/(main)/solitaire-games-guide/page.tsx` — ~30 cross-spoke links
- Many others (full audit found 241 files importing next/link)

## FreeCell unindexed deep dive

### Reason: Discovered — currently not indexed (81 pages)

Google found these URLs but hasn't crawled them yet — normal for a new spoke with limited authority.

| Cluster | Count | Examples |
|---|---|---|
| Dynamic deal pages `/game/[n]` | 24 | /game/1, /11982, /50, /617, /5000, /146692 |
| FreeCell pillar/strategy pages | ~30 | /freecell-mastery, /microsoft-freecell, /freecell-world-records |
| FreeCell family variants | 12 | /bakers-game/*, /eight-off/*, /penguin/*, /seahaven/* |
| FreeCell sub-routes | 6 | /freecell/1-cell, /freecell/how-to-play, /freecell/strategy |
| Tools / functional | 9 | /achievements, /leaderboard, /statistics, /stats, /storm, /deals |

Spot-checked `/freecell-mastery` → live, HTTP 200. URLs are real, just uncrawled.

### Reason: Not found (404) — 1 page

- `/bristol` → actually 301s today; GSC entry is stale (last crawled 3/28/26, before route ownership shipped). Self-resolves on next crawl.

### Reason: Duplicate canonical — 2 pages

- `/clock/tips`, `/monte-carlo/how-to-play` → both 301 to hub today; stale GSC entries. Self-resolves on next crawl.

### Reason: Crawled, not indexed — 1 page

- `/how-to-play` → 301s to hub today; stale.

## Fix shipped 2026-05-11

### Code changes

1. **`src/lib/siteConfig.ts`** — added `crossDomainHref(path)` helper that returns the relative path for same-site routes and the absolute canonical URL for cross-site routes.

2. **`src/components/NetworkLink.tsx`** — new drop-in replacement for `next/link`'s `<Link>` that applies `crossDomainHref` to its `href` automatically.

3. **`src/components/content/ContentLinkCard.tsx`** — switched import to NetworkLink.

4. **Bulk import swap** — 241 files: `import Link from 'next/link'` → `import Link from '@/components/NetworkLink'` (only the wrapper itself still imports from `next/link`).

### Why this works

- For same-site links (e.g., FreeCell page → another FreeCell route), NetworkLink emits a relative href — Next.js client-side routing preserved, behavior unchanged.
- For cross-site links (e.g., hub page → /download), NetworkLink emits the absolute canonical URL — Googlebot never visits the 301 redirect, link equity flows directly to the canonical, GSC "Page with redirect" stops accumulating.

### Typecheck

`npx tsc --noEmit` exits 0.

## What this doesn't solve

The **81 "Discovered - not indexed" FreeCell pages** are a separate issue (crawl budget / authority, not redirects). Expected to drain naturally over 4–6 weeks as Google works through the sitemap; can be accelerated via:

- GSC URL Inspection → "Request Indexing" for top 10 priority pages (quota ~10/day)
- Adding inline hub→spoke editorial links from high-traffic hub pages (e.g., `/solitaire-history` → `/microsoft-freecell`)
- Auditing `/game/[number]` pages for thin-content risk

## GSC follow-up actions (user-side)

After deploy:

1. **solitairestack.com → Pages → Page with redirect** → click **VALIDATE FIX**
2. (Optional) **solitairestack.com → Pages → Duplicate canonical** → VALIDATE FIX (entry is stale)
3. (Optional) **playfreecellonline.com → Pages → Not found (404)** → VALIDATE FIX (for /bristol — stale)
4. (Optional) **playfreecellonline.com → Pages → Duplicate canonical** → VALIDATE FIX (clock/tips, monte-carlo/how-to-play — stale)
5. (Optional) **playfreecellonline.com → URL Inspection** → request indexing for 5–10 priority pages from the Discovered list

Validation tests typically complete in 2–4 weeks.
