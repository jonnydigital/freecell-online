# FreeCell Online — Feature Backlog
*Ranked by impact × effort. Updated 2026-07-15.*

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
15. ~~**Leaderboard backend**~~ ✅ LIVE 03-29 — Vercel KV provisioned! API routes (`/api/leaderboard/submit`, `/api/leaderboard/daily`), Vercel KV sorted sets with rate limiting, localStorage fallback, client library, full page UI with today/all-time tabs, nickname editing, auto-submit on daily challenge win, compact widget in WinScreen.
16. ~~**Achievements/badges**~~ ✅ SHIPPED 03-02 — 20 badges across 6 categories with unlock animations
17. ~~**Tutorial/onboarding**~~ ✅ SHIPPED — First-visit walkthrough with spotlight highlights, triggered automatically on first play, replayable from Settings
18. ~~**Video tutorial landing page**~~ ✅ SHIPPED 2026-06-27 — `/freecell-video-tutorial` with chaptered player slot, accessible transcript, practice links, sitemap entry, footer link, and FreeCell route ownership. Final hosted recording can replace the prepared slot later. *(Solitaire Bliss has YouTube embed. Huge for dwell time + rich snippets)*
34. ~~**www→non-www redirect middleware**~~ ✅ SHIPPED 03-17 — Next.js middleware for 301 redirect www.playfreecellonline.com → playfreecellonline.com. Prevents authority dilution from Google indexing both variants. *(Spark #30 from 03-15 research — site: search showed both indexed)*
35. ~~**Wordle-style daily challenge share card**~~ ✅ SHIPPED 03-17 — ShareResultCard component (screenshot-friendly visual card), share landing page + OG image at /daily-freecell/share/[date], integrated into WinScreen for daily challenge wins. Growth mechanic for organic sharing. *(Spark #29 from r/DailySolitaire community research)*
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

## 🟡 Medium Priority (Ship This Month) — Continued
39. ~~**Bristol Solitaire game page**~~ ✅ SHIPPED 03-29 — Playable game page for Bristol, the last variant without one. BristolGamePage DOM adapter (8 fans + 3 reserves), full SEO page with FAQPage + WebApplication + BreadcrumbList schema, 6 FAQs, any-suit building, Kings restriction, stock dealing, auto-place, hints, undo. All 25 variants now playable. *(Gap analysis — Bristol had engine + content but no game page, dead-end links from tips/how-to-play)*

## 🟢 Nice to Have
14. ~~**Multiplayer daily challenge**~~ ✅ SHIPPED 2026-06-30 — `/daily-freecell/room` gives players an inviteable shared daily room with today's seed, play/rank/invite actions, fair scoring rules, sitemap/footer discovery, and daily challenge cross-linking.
15. ~~**Offline mode polish**~~ ✅ SHIPPED 2026-06-25 — friendly `/offline` fallback page, SW navigation fallback, cache bumped to v4
16. ~~**Resume unfinished FreeCell games after reload**~~ ✅ SHIPPED 2026-06-26 — persists game number, variant, move history, move count, and elapsed time; restores by replaying moves, clears saved state on new/restart/win, shows a dismissible resume notice after restore, and now prompts when a different numbered deal has saved progress available
17. **i18n** — multi-language. First slice shipped 2026-07-01 with `/freecell-en-espanol` Spanish rules/play landing page. Playable Spanish UI shipped 2026-07-02 at `/freecell-en-espanol/jugar`; Spanish win-screen/settings polish shipped 2026-07-02 morning; Spanish home overlay date locale shipped 2026-07-02 evening; Spanish secondary route/share polish shipped 2026-07-03. French rules/play landing page shipped 2026-07-03 at `/freecell-en-francais`; playable French UI shipped 2026-07-03 at `/freecell-en-francais/jouer`; visible English/Spanish/French guide language switchers shipped 2026-07-03 evening. German rules/play landing page shipped 2026-07-04 at `/freecell-auf-deutsch` with four-language switchers and sitemap/footer discovery; playable German UI shipped 2026-07-04 at `/freecell-auf-deutsch/spielen`. Locale analytics params (`game_locale`, `page_language`) shipped 2026-07-04 so GA4 can compare localized play routes before GSC data matures. Italian rules/play shipped 2026-07-05 at `/freecell-in-italiano` and `/freecell-in-italiano/gioca`, with reciprocal hreflang and localized game/win-screen copy. Portuguese rules/play shipped 2026-07-05 at `/freecell-em-portugues` and `/freecell-em-portugues/jogar`, closing the competitor's EN/DE/ES/FR/IT/PT language set. Six-language visible guide switcher polish shipped 2026-07-06. Localized `<html lang>` first-paint bootstrap shipped 2026-07-09 for rendered-DOM language signals across the EN/ES/FR/DE/IT/PT FreeCell cluster. Per-language audit automation shipped 2026-07-13; first report found only 6 visible non-English localized views across French and Portuguese, so hold expansion until stronger GA4/GSC signal appears.
18. ~~**Accessibility** — screen reader, high contrast~~ ✅ SHIPPED 03-05 — High contrast mode, screen reader announcements (aria-live), reduced motion toggle, skip-to-game link, focus indicators
19. ~~**Community/forum**~~ ✅ SHIPPED 2026-06-28 — `/community` player hub for sharing daily results, reporting deal-specific issues, and suggesting features. Added route ownership, XML sitemap entry, HTML sitemap entry, footer links, and a post-win community prompt. *(Green Felt model, builds loyalty)*
20. ~~**Pyramid triangular board layout**~~ ✅ SHIPPED 2026-06-29 — replaced the generic cascade rendering on `/pyramid` with a real seven-row Pyramid layout, responsive card sizing, stock/waste/recycle controls, and direct exposed-card pairing. *(Carried QA bug from June research logs)*
21. ~~**TriPeaks canonical three-peak layout**~~ ✅ SHIPPED 2026-06-30 — replaced the generic cascade rendering on `/tripeaks` with a real four-row, three-peak TriPeaks layout, responsive 10-card base sizing, stock/waste controls, score/streak stats, hint, and undo. *(Carried QA bug from June research logs)*
22. ~~**Animation speed setting**~~ ✅ SHIPPED — slow/normal/fast toggle in Settings panel, wired to game engine multiplier *(cardgames.io feature)*
23. ~~**Sound pitch variation**~~ ✅ SHIPPED 03-03 — higher rank = higher pitch on foundation *(polish item from 02-26 analysis)*
24. ~~**Dynamic OG Images + Twitter Cards**~~ ✅ SHIPPED 03-05 — Rich social preview images for all pages + per-game dynamic OG for /game/[number] routes. Twitter summary_large_image cards site-wide.
25. ~~**"Relaxed mode"**~~ ✅ SHIPPED 03-09 — Elderly-friendly option: hides timer display, coffee icon indicator, gold info banner. Settings > Accessibility toggle. *(Reddit r/balatro insight — FreeCell audience skews older, accessibility matters)*
26. ~~**Easy FreeCell variant**~~ ✅ SHIPPED 03-10 — New `/easy-freecell` game mode: aces and 2s start pre-placed on foundations. Beginner-friendly on-ramp, 1000+ word SEO content page, FAQPage schema. *(Solitaired competitive response + "easy freecell" keyword opportunity)*
27. **Submit to solitaireblog.com** — Martin Petroff reviews 80+ solitaire sites with ratings. Backlink + visibility opportunity. Internal submission packet prepared 2026-07-07 at `docs/outreach/solitaireblog-submission-2026-07-07.md`; external submission/contact still needs Jonathan approval. *(Custom domain is live)*
28. ~~**Fix mobile gold rectangle**~~ ✅ FIXED 03-10 — Was idle auto-hint glow (gold border) appearing after 8s even before first move. Now auto-hint effects only trigger after user makes at least 1 move. Also suppressed focus-visible outline on game container.
29. ~~**PWA install CTA / download prominence**~~ ✅ SHIPPED 2026-07-07 — Browser-aware install card in the FreeCell desktop sidebar and mobile menu overlay, with iOS Add to Home Screen guidance, localized EN/ES/FR/DE/IT/PT copy, and install-funnel analytics. *(Competitor gap from repeated online-solitaire.com research: native/PWA download prominence)*
30. ~~**Card-back customization actually repaints DOM hidden cards**~~ ✅ SHIPPED 2026-07-08 — Existing card-back picker now drives CSS variables for face-down DOM cards across Klondike, Spider, and hidden-card generic variants, with first-paint bootstrap support so saved backs render before React hydrates. *(Competitor gap from repeated online-solitaire.com research: deck/background theming)*
31. ~~**FreeCell Phaser input listener cleanup**~~ ✅ SHIPPED 2026-07-08 — Raw canvas touch/mouse drag handlers now use the scene's tracked listener cleanup so restarts, route changes, and remounts do not accumulate stale handlers. *(Fluidity research follow-up: prevent duplicate input work over long sessions)*
32. ~~**FreeCell embed generator SEO/discovery polish**~~ ✅ SHIPPED 2026-07-10 — `/embed-generator` now has direct footer + HTML sitemap discovery, WebApplication + FAQPage JSON-LD, schema-aligned FAQ copy, and generated iframe snippets include `loading="lazy"`. *(Competitor/link-building gap from QA: embed widget marketing)*
33. ~~**Games catalog numbered-deal positioning**~~ ✅ SHIPPED 2026-07-11 — `/games` now surfaces the 32,000 numbered FreeCell deal library alongside the 28-game catalog, with direct discovery cards for `/deals`, `/winning-deals`, famous game numbers, and Daily FreeCell plus matching metadata/FAQ schema. *(Competitor gap from repeated online-solitaire.com research: their "320 games" catalog framing)*
34. ~~**Mobile viewport QA harness for spoke/domain routes**~~ ✅ SHIPPED 2026-07-12 — `npm run qa:mobile` now launches headless Chrome through dependency-free CDP under Node 22, emulates true 375/390/414/768px viewports, and reports card count, face/back card count, card widths, horizontal overflow, clipped cards, control visibility, cascade counts, and unused vertical space for FreeCell, Klondike, Spider, and a generic wide-board route. Live audit artifact saved at `docs/analytics/mobile-viewport-audits/2026-07-12-live.json`; no hard failures found. *(Follow-up from 2026-07-11 iframe QA: make spoke/generic mobile layouts measurable without Playwright/Puppeteer.)*
35. ~~**Per-language analytics review before further i18n expansion**~~ ✅ SHIPPED 2026-07-13 — `npm run analytics:locales` now generates JSON/Markdown locale reports, and authenticated `npm run metrics:google` pulls exact localized route paths for PlayFreeCellOnline. First audit found 6 non-English localized views across French and Portuguese; Spanish/German/Italian remain absent from visible top-page signal. Decision: hold new language expansion until non-English localized demand is broader.
36. ~~**Localized-route signal threshold for next i18n move**~~ ✅ SHIPPED 2026-07-14 — `npm run analytics:locales` now codifies the expansion gate (`50+` non-English localized views and `3+` visible non-English locales), writes shortfall/top-locale/next-action fields to JSON and Markdown, and uses the America/New_York report date so evening heartbeats do not create tomorrow-dated artifacts. Latest audit still says hold i18n expansion: `3` non-English views, `1` visible locale, `47` views and `2` locales short of the gate.
37. ~~**Klondike + Spider compact mobile shell parity**~~ ✅ SHIPPED 2026-07-13 — Phone-width Klondike and Spider now use compact top status strips plus fixed bottom action bars instead of wrapping the desktop toolbar, addressing the U6 mobile/tablet QA observation while leaving FreeCell's measured portrait layout untouched.
38. ~~**Mobile viewport QA regression gate**~~ ✅ SHIPPED 2026-07-14 — `npm run qa:mobile` now enforces default route board-shape expectations for FreeCell, Klondike, Spider, and Forty Thieves, failing on missing/partial card renders, missing face/back cards, or wrong cascade counts instead of only reporting generic page-load health. Local audit artifact saved at `docs/analytics/mobile-viewport-audits/2026-07-14-local.json`. *(Follow-up to the 2026-07-11/12 mobile QA push and 2026-07-13 compact shell fix: make the harness catch regressions automatically.)*
39. ~~**Mobile control occlusion QA gate**~~ ✅ SHIPPED 2026-07-15 — `npm run qa:mobile` now hit-tests every visible enabled button/link center with `elementsFromPoint`, fails when a foreign element covers the tap target, reports blocked-control diagnostics, seeds consent/tutorial/splash state for stable board audits, and keeps Forty Thieves' generic-board expectations route-specific. Local audit artifact saved at `docs/analytics/mobile-viewport-audits/2026-07-15-local.json`. *(Follow-up from 2026-07-14 QA: the spoke stats pill occlusion bug was invisible to card-count/overflow checks.)*
40. ~~**Mobile viewport screenshot audit artifacts**~~ ✅ SHIPPED 2026-07-15 — `npm run qa:mobile -- --screenshots` now captures a PNG for each audited route/width via Chrome DevTools and records the screenshot paths in JSON and Markdown output, so future mobile QA failures have reviewable visual evidence beside the metrics. *(Follow-up to the July mobile QA hardening: turn numeric failures into faster visual diagnosis.)*
41. ~~**Mobile viewport QA runbook**~~ ✅ SHIPPED 2026-07-15 — `docs/mobile-viewport-qa.md` now documents when to run the harness, local/live/screenshot commands, what the audit checks, and how to triage blocked controls, board-shape failures, overflow, clipped cards, and screenshot artifacts.
42. ~~**Mobile viewport Markdown audit reports**~~ ✅ SHIPPED 2026-07-15 — `npm run qa:mobile -- --out=...json` now persists a sibling `.md` report beside each JSON artifact, including screenshot links when enabled, so mobile QA evidence is reviewable from saved files instead of console scrollback.
43. ~~**Mobile viewport layout-stability gate**~~ ✅ SHIPPED 2026-07-15 — `npm run qa:mobile` now takes a post-load stability sample after the board looks ready and fails on delayed board/card movement, catching late responsive shifts that card counts, overflow checks, screenshots, and tap-target hit-tests can miss.

## ⏳ Blocked (Needs Jonathan)
- ~~**Custom domain** — playfreecellonline.com → Vercel DNS~~ ✅ LIVE as of 2026-03-13!
- **AdSense publisher ID** — code ready, needs ca-pub-XXXXXXXXXX
- **Sentry DSN** — error tracking env var
- ~~**Google Search Console** — submit playfreecellonline.com property + sitemap~~ ✅ DONE 2026-03-13 — auto-verified, sitemap processed, 156 pages discovered
- ~~**Vercel KV**~~ ✅ PROVISIONED 03-28 — KV store connected, env vars live in all environments

## 🟡 Medium Priority (Ship This Month)
36. **Solitaire difficulty ranking page** ✅ SHIPPED 03-28 — `/solitaire-difficulty-ranking` comprehensive ranking of all 28 games across 5 difficulty tiers. Internal linking hub + SEO play targeting "solitaire games ranked", "easiest/hardest solitaire" keywords. 758 lines. *(Content gap — no competitor has a comprehensive ranking page)*
37. ~~**Baker's Game tips page**~~ ✅ SHIPPED 03-28 — `/bakers-game/tips` SEO content page: 8 tips for same-suit stacking, FreeCell habit-breaking guide, dead-end recognition, 5 FAQs. Article + BreadcrumbList + FAQPage JSON-LD. 3 AdUnit placements. *(Backlog item — content suite completion)*
38. ~~**Eight Off tips page**~~ ✅ SHIPPED 03-28 — `/eight-off/tips` SEO content page: 8 tips for 8-cell management, supermove math, King placement, FreeCell family comparison, 5 FAQs. Article + BreadcrumbList + FAQPage JSON-LD. 3 AdUnit placements. *(Backlog item — content suite completion)*

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
- [x] Daily Challenge completed-state return loop — countdown to next unlock plus Replay Deal link (shipped 2026-06-27)
- [x] Community page — player hub for daily-result sharing, deal reports, and feature suggestions (shipped 2026-06-28)
- [x] Win-screen community prompt — post-win link to share a result, report a deal, or suggest features (shipped 2026-06-28)
- [x] Pyramid triangular board layout — real 7-row Pyramid play surface with responsive sizing and waste pairing (shipped 2026-06-29)
- [x] TriPeaks canonical three-peak layout — real 4-row TriPeaks play surface with responsive 10-card base, stock/waste controls, score/streak stats, hint, and undo (shipped 2026-06-30)
- [x] Daily FreeCell Room — inviteable shared daily challenge page for competing on today's same seed (shipped 2026-06-30)
- [x] FreeCell en Espanol landing page — first i18n content slice with Spanish rules, vocabulary, FAQ schema, sitemap/footer discovery (shipped 2026-07-01)
- [x] Playable FreeCell en Espanol UI — Spanish game route with translated core game chrome, prompts, share text, mobile controls, settings, sitemap/footer discovery (shipped 2026-07-02)
- [x] Spanish home overlay date locale — localized weekday/month formatting in the Spanish play route (shipped 2026-07-02)
- [x] Spanish play route secondary polish — localized share URLs, Spanish screen-reader new-game announcement, and Spanish hub route from the play overlay (shipped 2026-07-03)
- [x] FreeCell en Francais landing page — French rules, vocabulary, FAQ schema, hreflang, sitemap/footer discovery (shipped 2026-07-03)
- [x] Playable FreeCell en Francais UI — French game route with translated core game chrome, win screen, share text, mobile controls, settings, sitemap/footer discovery (shipped 2026-07-03)
- [x] FreeCell auf Deutsch landing page — German rules, vocabulary, FAQ schema, hreflang, sitemap/footer discovery (shipped 2026-07-04)
- [x] Playable FreeCell auf Deutsch UI — German game route with translated core game chrome, win screen, share text, mobile controls, settings, sitemap/footer discovery (shipped 2026-07-04)
- [x] FreeCell in Italiano landing page — Italian rules, vocabulary, FAQ schema, hreflang, sitemap/footer discovery (shipped 2026-07-05)
- [x] Playable FreeCell in Italiano UI — Italian game route with translated core game chrome, win screen, share text, mobile controls, settings, sitemap/footer discovery (shipped 2026-07-05)
- [x] FreeCell em Portugues landing page — Portuguese rules, vocabulary, FAQ schema, hreflang, sitemap/footer discovery (shipped 2026-07-05)
- [x] Playable FreeCell em Portugues UI — Portuguese game route with translated core game chrome, win screen, share text, mobile controls, settings, sitemap/footer discovery (shipped 2026-07-05)
- [x] FreeCell guide language switcher polish — centralized visible EN/ES/FR/DE/IT/PT guide-page language links so the completed i18n cluster stays consistent (shipped 2026-07-06)
- [x] Mobile FreeCell card glyph polish — raised the smallest mobile suit/slot label floors for tighter true-phone readability (shipped 2026-07-04)
- [x] Mobile haptic feedback — Settings-controlled phone vibration cues for selection, moves, foundation placements, invalid moves, undo, and wins (shipped 2026-07-05)
- [x] Klondike and Spider teaching hints — Klondike no longer auto-plays hints; Spider now has a hint button/shortcut and both games highlight the recommended source and destination (shipped 2026-07-06)
- [x] PWA install CTA — browser-aware install card in the FreeCell desktop sidebar and mobile menu overlay, with iOS guidance and GA4 install-funnel events (shipped 2026-07-07)
- [x] DOM card-back theming — saved card-back choices now repaint face-down CSS cards and load before first paint (shipped 2026-07-08)
- [x] Games catalog numbered-deal positioning — `/games` now highlights 32,000 numbered FreeCell deals and links directly into deal discovery surfaces (shipped 2026-07-11)

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
