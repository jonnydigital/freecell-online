# Goal Task — solitairestack.com AdSense "Low Value Content" Recovery

**Owner handoff:** Created 2026-06-01. For the follow-up agent team to (a) verify the work already done and (b) drive this to a passing AdSense review.

---

## 🎯 Mission
Get **solitairestack.com** approved for Google AdSense (currently rejected for **"Low value content"**) and get its pages indexed in Google. Do this without introducing deceptive/fabricated signals.

**Definition of done:**
1. solitairestack.com passes AdSense review (ads serving).
2. The majority of the current indexable sitemap URLs are "Indexed" in Search Console. After this recovery pass, the hub sitemap should be about 121 URLs because thin variant detail pages are intentionally noindexed while key trust-policy pages are included.
3. No fabricated social proof / fake structured data anywhere in the codebase.

---

## 📌 Context / diagnosis (already established — don't re-derive from scratch)
The site is **NOT failing on content volume** (homepage ~4,500 words, interiors 1,200–3,500w, valid sitemap, correct robots/ads.txt/canonicals, SSR content, healthy internal linking). "Low value content" here is a catch-all driven by THREE things:

1. **Trust/quality landmines** — fabricated ratings & testimonials with fake schema. ✅ FIXED (PR #3).
2. **Scaled/templated + doorway footprint** — ~70 copy-pasted-template variant pages (accordion/bisley/cruel/… each with how-to-play/strategy/tips), 4 domains off one codebase, Spider/Klondike 301-redirect off the hub. ✅ MITIGATED in repo by noindexing hub variant detail triads, removing the most obvious repeated FAQ prompts, and suppressing the hub cross-network block. Spider/Klondike off-hub redirects remain as-is by owner decision.
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

7. **Actions taken** (see next section). Phase 0 shipped (PR #3, merged), sitemap resubmitted, priority indexing requested. A 2026-06-01 retry succeeded for several high-value hub pages before Search Console returned the daily quota limit.

---

## ✅ What was already done (verify this first)
1. **PR #3 merged to `main`** (commit `c97d14d`): deleted `StarRatingWidget.tsx` (hardcoded "4.8★/3,241 ratings" + `AggregateRating` microdata) and `PlayerTestimonials.tsx` (invented reviewers + `schema.org/Review`); removed from FreecellBelowFold/KlondikeBelowFold/SpiderBelowFold. 322 deletions, typecheck clean.
2. **Google Search Console** (property type = **URL-prefix** `https://solitairestack.com/`, under jonnydigital1@gmail.com):
   - Resubmitted `/sitemap.xml` on 2026-05-31 (it was last read Apr 18 — 6 weeks stale; this forces a re-read of all 170 URLs).
   - Requested Indexing (priority crawl queue) on `/games` and `/solitaire-games-guide`.

## ✅ 2026-06-01 Codex remediation pass
1. **Verified PR #3 is live:** production `/freecell`, `/spider`, and `/klondike` return no matches for `AggregateRating`, `3,241`, `StarRating`, or `What Players Say`.
2. **Reduced the scaled-content footprint:** added `src/lib/searchIndexing.ts` as a central search-indexing policy. On `solitairestack.com`, hub-owned variant detail triads (`/[variant]/how-to-play`, `/[variant]/strategy`, `/[variant]/tips`) now stay live for users but return `X-Robots-Tag: noindex, follow` and are excluded from `/sitemap.xml`.
3. **Validated the local hub sitemap behavior:** built app served locally as `solitairestack.com`; `/sitemap.xml` contains about 121 URLs, keeps strong hub pages like `/games`, `/solitaire-strategy`, `/freecell`, and trust-policy pages, and excludes pages like `/accordion/how-to-play`.
4. **Fixed trust-schema drift:** root Organization JSON-LD no longer claims a 2022 founding date; it now uses `2026-01-15` and names `J. Foye` as founder/editor via `Person` schema.
5. **Fixed a broken byline:** `/klondike-cheat-sheet` used `authorSlug="rules-desk"`; corrected to `the-rules-desk`.
6. **Added guardrails:** tests now cover the AdSense recovery indexing policy and invalid `AuthorByline` / `AuthorBio` slug literals; the recovery audit now also fails if fabricated social-proof schema returns (`AggregateRating`, `Review`, `reviewRating`, `ratingValue`, `bestRating`, `worstRating`), if an author exists without a matching profile page, if key trust pages lose real-person attribution, or if variant detail pages reintroduce the generic FAQ prompts.
7. **De-emphasized the cross-network footprint:** `NetworkCrossLinks` now renders nothing on the hub, so thin/detail hub pages no longer show the "From Our Network" external-domain block.
8. **Added a repeatable audit command:** `npm run adsense:audit` checks the core recovery invariants before deploy.
9. **Exposed original data as a dataset:** `/solitaire-win-rates.json` now serves the committed win-rate research JSON with a proper `application/json` content type. `/solitaire-win-rates` links to it and its Dataset JSON-LD `DataDownload` points at the JSON route instead of back at the article.
10. **Suppressed hub monetization/growth loaders until approval:** `AdUnit` already suppressed hub placements; `AdSenseScript`, `AdsterraScript`, and `MediavineGrowScript` now refuse to load on `solitairestack.com` unless `NEXT_PUBLIC_ADSENSE_APPROVED=true`.
11. **Verification run:** `npm run adsense:audit`, `npx jest --runInBand`, `npx tsc --noEmit`, changed-file ESLint, `node scripts/validate-site-content.mjs --site=solitairestack`, and `SITE_KEY=solitairestack NEXT_PUBLIC_SITE_KEY=solitairestack npm run build` all pass. Full-repo `npm run lint` still fails on pre-existing unrelated lint debt.
12. **Local HTTP verification:** built app served as `solitairestack.com` returned about 121 sitemap URLs; `/accordion/how-to-play` returned `X-Robots-Tag: noindex, follow`; `/accordion` remained indexable; `/accordion/how-to-play` rendered no cross-network block; `/solitaire-win-rates.json` returned 17 JSON entries; and a spoke-host request for the JSON route 301 redirected to the hub.
13. **Strengthened real-person trust signal:** added `src/content/authors/j-foye.mdx` so the founder/editor referenced in Organization schema has a substantive public author profile, not only fallback metadata.
14. **Removed the most obvious Madlib FAQ tells:** variant detail pages no longer use the exact repeated prompts `What makes [Game] different from other solitaire games?`, `Is [Game] harder than FreeCell?`, or `Is [Game] easier or harder than FreeCell?`. Legitimate comparison pages can still ask direct FreeCell comparison questions.
15. **Attributed key policy pages to the real editor:** `/editorial-standards`, `/fact-checking-policy`, and `/correction-policy` now show `J. Foye` in the visible byline and Article schema, with updated dates of 2026-06-01.
16. **Prepared re-review tooling and submission package:** `npm run adsense:prod-check` validates the deployed production evidence, and `docs/adsense-review-submission-package.md` contains the exact re-review gate, evidence list, and paste-ready AdSense review note.
17. **Added an external evidence log:** `docs/adsense-gsc-evidence-log.md` tracks production checks, GSC sitemap status, URL Inspection requests, indexed-page movement, and the eventual AdSense review result.
18. **Deployed the remediation to `solitairestack.com`:** production now passes `npm run adsense:prod-check`; live `/sitemap.xml` has 121 URLs; `/accordion/how-to-play` returns `X-Robots-Tag: noindex, follow`; `/solitaire-win-rates.json` serves 17 dataset entries; and the hub homepage source does not contain the Google ad loader before approval.
19. **Checked live AdSense state:** under `jonnydigital1@gmail.com` / `pub-3083538874906149`, `solitairestack.com` is still `Needs attention` for `Low value content`; `ads.txt` is `Authorized`; the "Request review" control is available but should wait for the Search Console gate below.
20. **Re-submitted the remediated sitemap in Search Console:** `/sitemap.xml` now shows Submitted `Jun 1, 2026`, Last read `Jun 1, 2026`, Status `Success`, and `121` discovered pages.
21. **Retried priority URL indexing:** after the first `/solitaire-types` request failed with Search Console's transient "problem submitting your indexing request" message, a later 2026-06-01 retry succeeded. `/solitaire-types` and `/solitaire-difficulty-ranking` were explicitly added to the priority crawl queue. Batch automation then advanced through `/solitaire-win-rates`, `/patience-solitaire`, and `/solitaire-history` before `/freecell-vs-spider` hit Search Console's daily `Quota Exceeded` response.
22. **Added and deployed another crawlable data asset:** `/freecell-unsolvable-deals.json` now publishes the eight known impossible Microsoft-compatible FreeCell deals as machine-readable JSON, and `/solitaire-win-rates` now includes a visible deal-level proof table plus Dataset JSON-LD `DataDownload` for that file. This raises the hub's original-data signal without claiming a first-party exhaustive solver run. Deployed to `solitairestack.com` on 2026-06-01 at about 10:09 EDT (`dpl_euYwizTx73c1fdvmzxMgv9a9qkb4`), then `npm run adsense:prod-check` passed against production.
23. **Used the 2026-06-02 Search Console quota:** request indexing succeeded for `/freecell-vs-spider`, `/freecell-vs-klondike`, `/`, `/solitaire-strategy`, `/freecell`, `/how-to-play`, `/strategy`, `/tips`, `/glossary`, `/history`, and `/how-we-test-solitaire-games`. The next request, `/our-solitaire-methodology`, returned Search Console's daily `Quota Exceeded` response and should be retried after the quota resets.
24. **Used the 2026-06-03 Search Console quota:** request indexing succeeded for `/our-solitaire-methodology`, `/solitaire-for-every-mood`, `/how-solitaire-changed-windows`, `/editorial-standards`, `/popular-solitaire-by-state`, `/solitaire-game-finder`, `/authors`, `/authors/j-foye`, `/freecell-vs-bakers-game`, `/freecell-vs-eight-off`, and `/about`. `/solitaire-rules-by-country` was already indexed and skipped. The next request, `/freecell-no-ads`, returned Search Console's daily `Quota Exceeded` response and should be retried after the quota resets.
25. **Retried after the calendar-day rollover on 2026-06-04:** at about 10:12 EDT, `/freecell-no-ads` still returned Search Console's daily `Quota Exceeded` response. This suggests the request limit is still blocked by a rolling reset window from the prior day's accepted requests, not a midnight local reset.

---

## 🔍 CHECK-UP TASKS (verify my work)
- [x] **Deploy landed:** `curl -s https://solitairestack.com/freecell | grep -i "AggregateRating\|3,241\|StarRating"` returns **nothing**. Also confirmed no matching markers on `/spider` or `/klondike`.
- [x] **No regressions:** `grep -rn "StarRatingWidget\|PlayerTestimonials" src` → none. `npx tsc --noEmit` clean. Hub production build clean.
- [x] **No hub ad loading before approval:** `AdSenseScript`, `AdsterraScript`, `MediavineGrowScript`, and `AdUnit` suppress ad/growth loading or placements on the hub until `NEXT_PUBLIC_ADSENSE_APPROVED=true`.
- [x] **Production recovery check:** 2026-06-01 09:28 EDT `npm run adsense:prod-check` passed against `https://solitairestack.com`; see `docs/adsense-gsc-evidence-log.md`.
- [x] **GSC sitemap:** after this remediation deploy, resubmitted `/sitemap.xml`; Search Console now shows 121 discovered pages instead of the old 170-page footprint.
- [ ] **GSC Pages report:** "Indexed" count trending **up** from the 28 baseline (2026-05-31). Note the "Not indexed" reasons — 3 "Page with redirect" are EXPECTED (spoke-owned pages 301 off the hub); ignore those.
- [ ] **Priority pages crawled:** URL-inspect `/games` and `/solitaire-games-guide` — should move from "Discovered/unknown" toward "Crawled"/"Indexed" over the coming days.

---

## 📋 REMAINING WORK (to actually solve it)

### A. Finish the indexing push (low effort, do now)
- [x] In GSC URL Inspection → Request Indexing for the first remaining **high-quality** pages (NOT the thin variant pages): `/solitaire-strategy`, `/freecell-vs-spider`, `/freecell-vs-klondike`, `/`, `/freecell`, `/how-to-play`, `/strategy`, `/tips`, `/glossary`, `/history`, and `/how-we-test-solitaire-games`. Completed on 2026-06-02 before Search Console returned the daily quota.
- [x] After the 2026-06-02 quota reset, retried `/our-solitaire-methodology`, then continued through `/solitaire-for-every-mood`, `/how-solitaire-changed-windows`, `/editorial-standards`, `/popular-solitaire-by-state`, `/solitaire-game-finder`, `/authors`, `/authors/j-foye`, `/freecell-vs-bakers-game`, `/freecell-vs-eight-off`, and `/about`. Completed on 2026-06-03 before Search Console returned the daily quota. Already requested or advanced through on 2026-06-01: `/solitaire-types`, `/solitaire-difficulty-ranking`, `/solitaire-win-rates`, `/patience-solitaire`, `/solitaire-history`.
- [ ] After the 2026-06-03 quota actually resets, retry `/freecell-no-ads`, then continue with `/games` and `/solitaire-games-guide` if still needed. A 2026-06-04 10:12 EDT retry still returned `Quota Exceeded`.
- [ ] Earn **2–4 real backlinks** (directory listing, relevant forum/community mention, the embeddable-widget play). This is the lever that raises crawl budget — the single biggest driver of broader indexing for a young domain.

### B. Reduce scaled/templated footprint
- [x] Kill the most obvious "Madlib" FAQ tells: the swapped-variable prompts ("What makes [Game] different from other solitaire games?" / "Is [Game] harder than FreeCell?") have been removed from variant detail pages and covered by `npm run adsense:audit`.
- [x] Either **collapse** the obscure-variant how-to-play/strategy/tips triads into one rich page each, OR `noindex` the thinnest sub-pages at launch — cutting ~70 near-identical pages to ~17. Worklist: see `ROUTE_OWNERSHIP` HUB_ONLY game entries in `src/lib/routeOwnership.ts`. Implemented the `noindex, follow` path for hub-owned variant detail triads on 2026-06-01.
- [x] De-emphasize the cross-network "From Our Network" block (`src/components/NetworkCrossLinks.tsx`) on thin hub pages. Implemented by suppressing `NetworkCrossLinks` on the hub.

### C. Add genuinely original value (the real differentiator for a young domain)
- [ ] Use the existing solver to publish an **original solvability/win-rate dataset** (run 100k+ deals per variant, show methodology) + an interactive **"is this deal winnable?"** tool. This is content no competitor has — exactly what flips a "low value" reviewer.
- [x] Publish the existing win-rate research as a machine-readable dataset at `/solitaire-win-rates.json` and wire `/solitaire-win-rates` Dataset schema to that JSON. This is not the full 100k+ solver run yet, but it turns the current research library into a crawlable, citable data asset.
- [x] Publish the known impossible FreeCell deal list as `/freecell-unsolvable-deals.json` and surface it in the `/solitaire-win-rates` methodology page as a deal-level proof table.

### D. Authorship / E-E-A-T (needs owner decision)
- [x] Add a real public profile for `j-foye` at `/authors/j-foye`, matching the founder/editor schema in the root Organization JSON-LD.
- [x] A real author (`j-foye`) already exists in `src/lib/authors.ts` alongside the faceless "Strategy Desk/History Desk" personas. Key trust-policy pages now use that real named author. **Do NOT invent fake authors** (that recreates the original trust problem).

---

## 🚦 RE-REVIEW GATE (when to click "Request review" in AdSense)
Do **NOT** request review until ALL of:
1. PR #3 deploy is live (no fabricated ratings/testimonials on the site).
2. GSC "Indexed" count is materially up (target: well over half of sitemap URLs) AND homepage + top pages reliably appear for `site:solitairestack.com`.
3. (Strongly recommended) at least Section B done, so the site doesn't read as a 170-page template farm.

Premature re-requests just re-reject. There's no published penalty for multiple requests, but each wasted cycle delays approval.

Follow-up checklist: `docs/adsense-review-request-checklist.md`.
Review submission package: `docs/adsense-review-submission-package.md`.
External evidence log: `docs/adsense-gsc-evidence-log.md`.

## ⛔ Guardrails
- Never add fabricated reviews, ratings, testimonials, or `AggregateRating`/`Review` schema without a real underlying review system.
- Don't remove the `99.999%` FreeCell solvability stat — it's legitimate and explained (deal #11982).
- Don't change the Spider/Klondike off-hub 301 redirects without explicit owner sign-off (core multi-domain architecture; owner chose to leave as-is).
