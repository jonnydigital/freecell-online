# SEO Actions — Jonathan's Checklist

Last updated: 2026-04-17 (lands with commit wave that includes IndexNow + sitemap expansion + embed analytics)

This is the short list of things that only you can do because they require logging into external dashboards. Each item includes the exact steps.

---

## 1. Verify the 3 remaining domains in Google Search Console

Only `playfreecellonline.com` is verified (verification file `public/googleebfa99c499db897b.html` is checked in). The other 3 domains are invisible to GSC.

**Priority:** HIGH — this unblocks the striking-distance SEO pass and lets us measure real impressions, clicks, and positions.

**Steps for each of `solitairestack.com`, `playklondikeonline.com`, `playspidersolitaireonline.com`:**

1. Go to <https://search.google.com/search-console>.
2. Click "Add property" → **URL prefix** (not Domain — simpler, no DNS required).
3. Enter the full URL (e.g., `https://solitairestack.com/`).
4. Pick verification method: **HTML file**.
5. Google gives you a file name like `googleXXXXXXXXXXXXXXXX.html`.
6. Download the file. Rename it to keep the original filename.
7. Send Jonathan Claude the file (or just the filename + its single-line content). Claude will drop it into `public/` and push a commit so it deploys.
8. After deploy, click "Verify" in GSC.
9. In the verified property: **Sitemaps → Add new sitemap → `/sitemap.xml` → Submit**.

After step 9, wait ~48 hours and check the Coverage report — you should see indexed URL counts start rising.

---

## 2. Pull fresh GA4 + AdSense numbers

**Priority:** MEDIUM — the `ga4_last_known` block in `docs/analytics/daily-metrics.json` is from March 26. Everything else in that file was just refreshed today via `npm run metrics:pull`, but GA4 and AdSense require dashboard access.

**Steps:**

1. GA4: <https://analytics.google.com/> → each of the 4 properties.
2. For each domain, pull 7-day numbers for: `active users`, `new users`, `sessions`, `pageviews`, `game_start` event count, top 10 pages by views, sessions by channel (direct/organic/referral).
3. Tell Claude: "Update `ga4_last_known` in `docs/analytics/daily-metrics.json` with these numbers." Claude will edit the file and commit.
4. AdSense: <https://www.google.com/adsense/> → Home → pull today's RPM, yesterday's revenue, last 7 days revenue, last 28 days revenue.
5. Add an `adsense_last_known` block alongside `ga4_last_known` using the same pattern.

---

## 3. Deferred by Jonathan on 2026-04-17

Tracked for awareness; do not act on these without further instruction.

- **Bing Webmaster Tools verification** — deferred. Claude has shipped an IndexNow key + API route which gives us Bing/Yandex indexation without Webmaster Tools. See `src/lib/indexnow.ts` and `scripts/indexnow-submit-sitemap.mjs`.
- **Outreach Wave 1 send** — deferred. Tracker at `docs/outreach-wave-1-tracking.md` has 3 self-submissions + 4 email pitches ready.
- **Mediavine Grow install** — deferred until AdSense produces meaningful income.
- **Striking-distance SEO pass** — blocked on GSC verification (see §1).

---

## 4. After GSC verification lands

Once the 3 properties above are verified and their sitemaps are submitted, come back and ask Claude to:

1. Run the metrics pull script and record the new `indexed` counts
2. Do the striking-distance pass (find queries ranking 5–20 and optimize title/H1/intro)
3. Trigger a fresh IndexNow submission for the newly added orphan pages (`npm run indexnow:submit`)

---

## Quick reference: the full current state

```
Domain                           Sitemap  Indexed  GSC-verified  GA4
-------------------------------- -------  -------  ------------  -----------------
playfreecellonline.com              96*      1       yes          G-8N85JJPLED
solitairestack.com                 149*      4       NO           G-988ZBJSKVJ
playklondikeonline.com              20*      1       NO           G-9MJ1PYWNRR
playspidersolitaireonline.com       16*      0       NO           G-WZX8LMFDP8
```

\* Projected counts after commit `0959cde` (sitemap expansion) deploys. Fresh numbers via `npm run metrics:pull`.

Spider spoke gets a further +4 once the pillar-page content ships (this deploy wave).

---

## Useful commands Claude can run

```bash
npm run metrics:pull       # refresh sitemap/indexation counts + homepage health, all 4 domains
npm run indexnow:submit    # ping Bing/Yandex to recrawl every URL in every sitemap
NEXT_PUBLIC_SITE_KEY=<key> npm run build   # verify a single site key builds clean
```
