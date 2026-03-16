# FreeCell Online — Feature Backlog
*Ranked by impact × effort. Updated 2026-03-12.*

## 🚨 P0: Critical Bug
1. ~~**🔴 Mobile card rendering broken**~~ ✅ FIXED 03-02 — Root cause: `recreateAllCardSprites()` used PNG asset keys that were never loaded. On resize (common on mobile), cards became empty containers. Fixed with procedural rendering matching `createCardSprite()`.

## 🔴 High Priority (Ship This Week)
1. ~~**Puzzle modes: Streak + Storm**~~ ✅ SHIPPED — visible in home overlay menu
2. ~~**Post-game optimal solution**~~ ✅ SHIPPED 03-02 — Animated solution replay with 1x/2x/3x speed controls, Phaser integration, mobile-friendly
3. ~~**Star rating per game**~~ ✅ SHIPPED
4. ~~**Theme system**~~ ✅ SHIPPED 03-01
5. ~~**Share button**~~ ✅ SHIPPED
6. ~~**SEO: Expand strategy page**~~ ✅ SHIPPED 03-01
7. ~~**SEO: Glossary/terminology page**~~ ✅ SHIPPED 02-28

## 🟡 Medium Priority (Ship This Month)
8. ~~**Statistics page enhancement**~~ ✅ SHIPPED 03-03 — tabs, game history, daily stats, mode breakdown
9. ~~**Multi-modal navigation**~~ ✅ SHIPPED 03-04 — Spider added to game menu, explore links row, site-wide footer with Play/Learn/Explore/More columns. Content pages now cross-linked.
10. ~~**Streak milestone celebrations**~~ ✅ SHIPPED 03-01 — Animated toasts at 14 milestone levels (3-365), unique messages, framer-motion animations *(Duolingo spark)*
11. ~~**Numbered game URLs**~~ ✅ SHIPPED 03-02 — `/game/[number]` routes with SEO meta tags + share integration
12. ~~**FreeCell variants** — Eight Off as additional mode.~~ ✅ SHIPPED 03-04 — Eight Off with 8 free cells, same-suit stacking, dynamic engine + scene layout *(NYT Games spark — game portfolio as retention moat)*
13. ~~**SEO: FreeCell history page**~~ ✅ SHIPPED 03-02 — 1600-line rich content page covering Alfille, PLATO, Windows, Game #11982, structured data
14. ~~**SEO: Solitaire types taxonomy**~~ ✅ SHIPPED — `/solitaire-types` page with 20 variants classified, difficulty ratings, internal links
15. ~~**Leaderboard backend**~~ ✅ CODE-COMPLETE — API routes (`/api/leaderboard/submit`, `/api/leaderboard/daily`), Vercel KV sorted sets with rate limiting, localStorage fallback, client library, full page UI with today/all-time tabs, nickname editing, auto-submit on daily challenge win, compact widget in WinScreen. **Needs: Vercel KV provisioned (env: KV_REST_API_URL)** *(blocked on Jonathan)*
16. ~~**Achievements/badges**~~ ✅ SHIPPED 03-02 — 20 badges across 6 categories with unlock animations
17. ~~**Tutorial/onboarding**~~ ✅ SHIPPED — First-visit walkthrough with spotlight highlights, triggered automatically on first play, replayable from Settings
18. **Video tutorial** — screen-recorded walkthrough, embed on game page *(Solitaire Bliss has YouTube embed. Huge for dwell time + rich snippets)*
33. ~~**Microsoft FreeCell page**~~ ✅ SHIPPED 03-16 — `/microsoft-freecell` SEO content page targeting new "Microsoft FreeCell" related search keyword. 669 lines: Windows FreeCell history, deal number compatibility, Game #11982, comparison table, 6-question FAQ. Article + BreadcrumbList + FAQPage schema. 15 keywords. *(Google SERP related search — "Microsoft FreeCell" newly appeared)*
32. ~~**FreeCell Variants hub page**~~ ✅ SHIPPED 03-15 — `/freecell-variants` index page with all 9+ variants cataloged, difficulty comparison table, FAQPage schema. Cell variants (1/2/3-cell) added to SiteFooter. *(Internal linking + "freecell variants" keyword)*
29. ~~**Hard FreeCell Games page**~~ ✅ SHIPPED 03-13 — `/hard-freecell-games` SEO content page: difficulty patterns, hard vs impossible distinction, tactical advice, expert challenge deals grid, FAQPage + Article + BreadcrumbList schema. 413 lines. Added to SiteFooter Explore column. *(Content research brief + Reddit "Blue 9 unsolvable" discussion — targets "hard freecell games" keyword)*
30. ~~**Card size toggle / "Large Cards" mode**~~ ✅ SHIPPED 03-13 — Settings > Accessibility toggle, 1.3x card width multiplier, auto-adjusts cascade overlap, immediate relayout. Targets older demographic. *(solitaires-online.com spark)*
31. ~~**Spider Tips page**~~ ✅ SHIPPED 03-11 — `/spider/tips` SEO content page: 7 practical tips, difficulty-specific tips for 1/2/4-suit, win rate table, quick reference cheat sheet, 4-question FAQ. FAQPage + Article + BreadcrumbList schema. 727 lines. *(Content research brief)*
28. ~~**Klondike Strategy Guide**~~ ✅ SHIPPED 03-12 — `/klondike/strategy` SEO content page: 7 proven strategies with AI win-rate data, draw-1 vs draw-3 comparison table, advanced card tracking + Thoughtful Solitaire, Persi Diaconis quote, 4-question FAQ, FAQPage + Article + BreadcrumbList schema. 709 lines. *(Content research brief — "solitaire strategy" high-volume keyword)*
27. ~~**FreeCell Mistakes to Avoid page**~~ ✅ SHIPPED 03-11 — `/freecell-mistakes-to-avoid` SEO content page: 8 common mistakes with supermove math, expert quotes, 5-question FAQ, FAQPage + Article + BreadcrumbList schema. *(Content research brief — "freecell mistakes" keyword opportunity)*
19. ~~**Ghost mode**~~ ✅ SHIPPED 03-03 — watch the solver play mid-game (👻 button in toolbar + settings)
20. ~~**SEO: FreeCell vs Spider comparison**~~ ✅ SHIPPED 03-04 — 1000+ line comparison page, FAQPage schema, side-by-side table
21. ~~**Dynamic sitemap.xml**~~ ✅ SHIPPED 03-04 — Next.js sitemap covering 19 content pages + 24 game routes
22. ~~**SEO: Statistics & Win Rates page**~~ ✅ SHIPPED 03-06 — 2000+ word content page targeting "freecell win rate", "freecell statistics", "freecell solvability". 8 sections, FAQPage schema, cross-linked to 8+ internal pages.
23. ~~**Deal Explorer page**~~ ✅ SHIPPED 03-07 — Browsable game discovery (/deals) with curated collections, range browsing, search, random deal. FAQPage schema. Targets "freecell game numbers" keywords.
24. ~~**WebApplication JSON-LD**~~ ✅ SHIPPED 03-07 — Schema.org structured data on root layout for rich search results.
25. ~~**FreeCell Solver page**~~ ✅ SHIPPED 03-07 — Interactive solver widget + 2000+ word SEO content. Web worker solver, step-by-step solutions, algorithm explainer, famous unsolvable deals, FAQPage schema.

## 🟢 Nice to Have
14. **Multiplayer daily challenge** — compete on same seed
15. **Offline mode polish** — better offline UX
16. **i18n** — multi-language
17. ~~**Accessibility** — screen reader, high contrast~~ ✅ SHIPPED 03-05 — High contrast mode, screen reader announcements (aria-live), reduced motion toggle, skip-to-game link, focus indicators
18. **Community/forum** — user feedback channel *(Green Felt model, builds loyalty)*
19. ~~**Animation speed setting**~~ ✅ SHIPPED — slow/normal/fast toggle in Settings panel, wired to game engine multiplier *(cardgames.io feature)*
20. ~~**Sound pitch variation**~~ ✅ SHIPPED 03-03 — higher rank = higher pitch on foundation *(polish item from 02-26 analysis)*
21. ~~**Dynamic OG Images + Twitter Cards**~~ ✅ SHIPPED 03-05 — Rich social preview images for all pages + per-game dynamic OG for /game/[number] routes. Twitter summary_large_image cards site-wide.
22. ~~**"Relaxed mode"**~~ ✅ SHIPPED 03-09 — Elderly-friendly option: hides timer display, coffee icon indicator, gold info banner. Settings > Accessibility toggle. *(Reddit r/balatro insight — FreeCell audience skews older, accessibility matters)*
26. ~~**Easy FreeCell variant**~~ ✅ SHIPPED 03-10 — New `/easy-freecell` game mode: aces and 2s start pre-placed on foundations. Beginner-friendly on-ramp, 1000+ word SEO content page, FAQPage schema. *(Solitaired competitive response + "easy freecell" keyword opportunity)*
23. **Submit to solitaireblog.com** — Martin Petroff reviews 80+ solitaire sites with ratings. Backlink + visibility opportunity. *(Wait for custom domain)*
24. ~~**Fix mobile gold rectangle**~~ ✅ FIXED 03-10 — Was idle auto-hint glow (gold border) appearing after 8s even before first move. Now auto-hint effects only trigger after user makes at least 1 move. Also suppressed focus-visible outline on game container.

## ⏳ Blocked (Needs Jonathan)
- ~~**Custom domain** — playfreecellonline.com → Vercel DNS~~ ✅ LIVE as of 2026-03-13!
- **AdSense publisher ID** — code ready, needs ca-pub-XXXXXXXXXX
- **Sentry DSN** — error tracking env var
- ~~**Google Search Console** — submit playfreecellonline.com property + sitemap~~ ✅ DONE 2026-03-13 — auto-verified, sitemap processed, 156 pages discovered
- **Vercel KV** — needed for leaderboard backend (code-complete, waiting on provisioning)

## ✅ Completed
- [x] Core game engine + solvable deals
- [x] Mobile responsive + touch precision + column zones
- [x] Daily challenge system + streaks
- [x] Auto-complete detection
- [x] Smart double-tap + sequence drag
- [x] Sound effects (Web Audio API)
- [x] Windows nostalgia win celebration
- [x] PWA + auto-update system
- [x] GA4 analytics
- [x] Feedback system
- [x] Hint system (heuristic solver)
- [x] Game seed input
- [x] SEO content pages (card-on-felt design, humanized text)
- [x] Home overlay hub (council-designed)
- [x] Daily Challenge banner + notification
- [x] 5-icon mobile nav
- [x] Full AI-generated card deck (52 + back)
- [x] Cookie consent + AdSense loader
- [x] Undo/redo animation
- [x] Easy FreeCell variant (shipped 03-10)
- [x] CI pipeline
- [x] Orientation change fix
- [x] Single-tap auto-move (shipped 02-27)
- [x] Faster animations — 60-180ms (shipped 02-27)
- [x] Auto-complete acceleration (shipped 02-27)
- [x] Cascade settling stagger (shipped 02-27)
- [x] SEO: Glossary/terminology page (shipped 02-28)

---

## Priority Rationale (2026-03-08 — Sunday Synthesis)

### 🚨 THE CRITICAL PATH: Traffic, Not Features (Updated 2026-03-12)
After 4 consecutive weeks of identical GA4 data (1 user = Fred's test) and 30+ content pages published, the diagnosis hasn't changed:

**Phase 1 (Build) is COMPLETE.** We have more features than most competitors:
- 5 game modes (FreeCell, Baker's, Eight Off, Spider, Daily Challenge)
- 3 competitive modes (Streak, Storm, numbered games)
- 20+ content pages with FAQPage/WebApplication schema
- PWA, dynamic sitemap, OG images, accessibility, themes
- Interactive solver, ghost mode, achievements, deal explorer

**Phase 2 (Launch & Grow) is BLOCKED on:**
1. **🔴 Custom domain** — playfreecellonline.com → Vercel DNS. NOTHING else matters.
2. **🔴 Google Search Console** — Can't submit without domain
3. **🟡 AdSense** — Monetization code ready but needs publisher ID
4. **🟡 Backlinks** — solitaireblog.com review, Reddit posts, Product Hunt launch (all waiting for domain)

### What To Build While Waiting
- **Video tutorial** — Can be produced independently and posted to YouTube
- **Leaderboard backend** — Vercel KV integration
- **Mobile gold rectangle fix** — Quick canvas bug
- **"Relaxed mode"** — Elderly-friendly UX (validated by Reddit insight)

### GA4 Status
✅ Successfully accessed FreeCell Online property (ID 525799022) for the first time on 03-08. Browser-based access working through openclaw.

### Monetization Planning
Freestar header bidding delivers +2000% over basic AdSense. Plan for this once traffic justifies (need domain + traffic baseline first).
