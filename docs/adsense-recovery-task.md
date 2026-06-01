# Goal Task — solitairestack.com AdSense "Low Value Content" Recovery

**Owner handoff:** Created 2026-06-01. For the follow-up agent team to (a) verify the work already done and (b) drive this to a passing AdSense review.

---

## 🎯 Mission
Get **solitairestack.com** approved for Google AdSense (currently rejected for **"Low value content"**) and get its pages indexed in Google. Do this without introducing deceptive/fabricated signals.

**Definition of done:**
1. solitairestack.com passes AdSense review (ads serving).
2. The majority of the ~170 sitemap URLs are "Indexed" in Search Console.
3. No fabricated social proof / fake structured data anywhere in the codebase.

---

## 📌 Context / diagnosis (already established — don't re-derive from scratch)
The site is **NOT failing on content volume** (homepage ~4,500 words, interiors 1,200–3,500w, valid sitemap, correct robots/ads.txt/canonicals, SSR content, healthy internal linking). "Low value content" here is a catch-all driven by THREE things:

1. **Trust/quality landmines** — fabricated ratings & testimonials with fake schema. ✅ FIXED (PR #3).
2. **Scaled/templated + doorway footprint** — ~70 copy-pasted-template variant pages (accordion/bisley/cruel/… each with how-to-play/strategy/tips), 4 domains off one codebase, Spider/Klondike 301-redirect off the hub. ⏳ NOT addressed (owner chose to defer).
3. **Brand-new domain** — created 2026-03-07 (~3 months), no backlinks, low crawl budget → only 28 pages indexed. ⏳ Time + authority + the actions below.

Full detail lives in the memory file `project_adsense_low_value_rejection.md`.

---

## ✅ What was already done (verify this first)
1. **PR #3 merged to `main`** (commit `c97d14d`): deleted `StarRatingWidget.tsx` (hardcoded "4.8★/3,241 ratings" + `AggregateRating` microdata) and `PlayerTestimonials.tsx` (invented reviewers + `schema.org/Review`); removed from FreecellBelowFold/KlondikeBelowFold/SpiderBelowFold. 322 deletions, typecheck clean.
2. **Google Search Console** (property type = **URL-prefix** `https://solitairestack.com/`, under jonnydigital1@gmail.com):
   - Resubmitted `/sitemap.xml` on 2026-05-31 (it was last read Apr 18 — 6 weeks stale; this forces a re-read of all 170 URLs).
   - Requested Indexing (priority crawl queue) on `/games` and `/solitaire-games-guide`.

---

## 🔍 CHECK-UP TASKS (verify my work)
- [ ] **Deploy landed:** `curl -s https://solitairestack.com/freecell | grep -i "AggregateRating\|3,241\|StarRating"` returns **nothing**. Also confirm no "What Players Say" testimonials block on the FreeCell/Spider/Klondike homepages. (If still present, the Vercel deploy of `main`@`c97d14d` hasn't shipped — check Vercel.)
- [ ] **No regressions:** `grep -rn "StarRatingWidget\|PlayerTestimonials" src` → none. `npx tsc --noEmit` clean. Site builds & homepages render.
- [ ] **GSC sitemap:** Sitemaps page shows `/sitemap.xml` "Last read" advancing past Apr 18 and "Discovered pages" climbing toward ~170.
- [ ] **GSC Pages report:** "Indexed" count trending **up** from the 28 baseline (2026-05-31). Note the "Not indexed" reasons — 3 "Page with redirect" are EXPECTED (spoke-owned pages 301 off the hub); ignore those.
- [ ] **Priority pages crawled:** URL-inspect `/games` and `/solitaire-games-guide` — should move from "Discovered/unknown" toward "Crawled"/"Indexed" over the coming days.

---

## 📋 REMAINING WORK (to actually solve it)

### A. Finish the indexing push (low effort, do now)
- [ ] In GSC URL Inspection → Request Indexing for the remaining **high-quality** pages (NOT the thin variant pages): `/solitaire-types`, `/solitaire-strategy`, `/solitaire-difficulty-ranking`, `/solitaire-history`, `/freecell-vs-spider`, `/freecell-vs-klondike`, `/patience-solitaire`, `/`. (Daily quota ~10–12 URLs; spread over days.) *(Started but interrupted by a flaky browser extension — `/solitaire-types` was inspected but the request click didn't confirm.)*
- [ ] Earn **2–4 real backlinks** (directory listing, relevant forum/community mention, the embeddable-widget play). This is the lever that raises crawl budget — the single biggest driver of broader indexing for a young domain.

### B. Reduce scaled/templated footprint (owner deferred — get explicit go-ahead before doing)
- [ ] Kill the "Madlib" tells: the swapped-variable FAQs ("What makes [Game] different from other solitaire games?" / "Is [Game] harder than FreeCell?") repeated across ~33 variant pages.
- [ ] Either **collapse** the obscure-variant how-to-play/strategy/tips triads into one rich page each, OR `noindex` the thinnest sub-pages at launch — cutting ~70 near-identical pages to ~17. Worklist: see `ROUTE_OWNERSHIP` HUB_ONLY game entries in `src/lib/routeOwnership.ts`.
- [ ] De-emphasize the cross-network "From Our Network" block (`src/components/NetworkCrossLinks.tsx`) on thin hub pages.

### C. Add genuinely original value (the real differentiator for a young domain)
- [ ] Use the existing solver to publish an **original solvability/win-rate dataset** (run 100k+ deals per variant, show methodology) + an interactive **"is this deal winnable?"** tool. This is content no competitor has — exactly what flips a "low value" reviewer.

### D. Authorship / E-E-A-T (needs owner decision)
- [ ] A real author (`j-foye`) already exists in `src/lib/authors.ts` alongside the faceless "Strategy Desk/History Desk" personas. Decide whether to attribute key editorial pages to the real named author. **Do NOT invent fake authors** (that recreates the original trust problem).

---

## 🚦 RE-REVIEW GATE (when to click "Request review" in AdSense)
Do **NOT** request review until ALL of:
1. PR #3 deploy is live (no fabricated ratings/testimonials on the site).
2. GSC "Indexed" count is materially up (target: well over half of sitemap URLs) AND homepage + top pages reliably appear for `site:solitairestack.com`.
3. (Strongly recommended) at least Section B done, so the site doesn't read as a 170-page template farm.

Premature re-requests just re-reject. There's no published penalty for multiple requests, but each wasted cycle delays approval.

## ⛔ Guardrails
- Never add fabricated reviews, ratings, testimonials, or `AggregateRating`/`Review` schema without a real underlying review system.
- Don't remove the `99.999%` FreeCell solvability stat — it's legitimate and explained (deal #11982).
- Don't change the Spider/Klondike off-hub 301 redirects without explicit owner sign-off (core multi-domain architecture; owner chose to leave as-is).
