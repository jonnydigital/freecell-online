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

## 🕰 Back history — how we got here (full narrative)
For the team picking this up: this is the chronological story so you understand *why* each decision was made.

1. **The trigger (2026-05-31).** AdSense reviewed solitairestack.com and returned **"Your site isn't ready to show ads → We found some policy violations → Low value content."** Site ownership was already verified (green check); "Low value content" was the *only* violation. Links in the rejection were the generic boilerplate set (minimum content requirements, unique high-quality content, thin content, webmaster guidelines) — not page-specific findings.

2. **First pass: ruled out the obvious.** Checked the live site and code. Homepage ~4,500 words SSR, interiors 1,200–3,500w, `robots.txt` allow-all, valid 170-URL sitemap, `ads.txt` with correct pub ID, self-referential canonicals, healthy internal linking. Conclusion: **this is NOT a content-quantity/thinness problem** — so "add more words" would have been the wrong fix.

3. **Multi-agent deep dive.** Ran 5 parallel expert agents, each a different lens, each grounded in the live AdSense policy docs + live site:
   - **Policy literalist:** mapped the site against every citable policy clause. Verdict: passes on thinness; at-risk on doorway footprint + scaled content; flagged a possibly-missing persistent nav bar.
   - **Scaled/duplicate-content auditor:** ~80% confidence the rejection is driven by ~70 copy-pasted-template variant pages + a 4-domain network off one codebase. Found the "Madlib" tells (swapped-variable FAQs).
   - **Human-reviewer simulation:** flagged the fabricated social proof and faceless "Desk" bylines and the off-hub redirects as the things a reviewer reacts to; ~60% content/trust, ~25% redirect/doorway, ~15% age.
   - **Domain-maturity auditor:** domain created **2026-03-07 (~85 days)**, zero Wayback history, ~10–15 pages indexed; concluded newness/crawl-budget is a major driver. (Also debunked the "established sibling" idea — playfreecellonline.com is 2026-02-20, also a newborn.)
   - **Competitor reverse-engineer:** approved solitaire competitors (123freecell, world-of-solitaire) are thin but 10–18 yrs old → age is a lever we can't copy; for a young site the path is original data + trust signals + traffic.

4. **Verified the agents' concrete claims in code (didn't take them on faith).** Confirmed REAL: `StarRatingWidget` (hardcoded 4.8★/3,241 fake ratings + `AggregateRating` schema) and `PlayerTestimonials` (invented named reviewers + `Review` schema). Confirmed FALSE ALARMS: the `99.999%` solvability stat is legitimate/explained; `easy-freecell`'s schema is harmless `SoftwareApplication`; GA4 *is* mounted; there *is* a header nav.

5. **Owner decisions.** When offered scope choices, the owner chose **Phase 0 only** (safe trust fixes) for now, and to **leave the Spider/Klondike off-hub 301 redirects as-is**. So the structural/de-template work (Section B below) is deliberately deferred, not forgotten.

6. **Indexing investigation (live GSC, owner pushed to act directly).** Initially suspected GSC wasn't set up — wrong: it's verified as a **URL-prefix property**. Real finding: **28 indexed / 13 benignly not-indexed**, known-pages had fallen from ~200 (March) to ~41, and the **sitemap was last read Apr 18** (6 weeks stale) — key pages showed "Discovered/Crawled – not indexed" and even "URL unknown to Google / no referring sitemaps detected." Root cause = stale sitemap + young-domain crawl budget, **not** a technical bug.

7. **Actions taken** (see next section). Phase 0 shipped (PR #3, merged), sitemap resubmitted, priority indexing requested. Remaining Request-Indexing pages were interrupted by a flaky Chrome extension.

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
