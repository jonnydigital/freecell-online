# FreeCell Online — Feature Backlog
*Ranked by impact × effort. Updated 2026-03-06.*

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
15. **Leaderboard backend** — Vercel KV for persistent daily challenge times/moves *(API routes exist, needs KV integration)*
16. ~~**Achievements/badges**~~ ✅ SHIPPED 03-02 — 20 badges across 6 categories with unlock animations
17. ~~**Tutorial/onboarding**~~ ✅ SHIPPED — First-visit walkthrough with spotlight highlights, triggered automatically on first play, replayable from Settings
18. **Video tutorial** — screen-recorded walkthrough, embed on game page *(Solitaire Bliss has YouTube embed. Huge for dwell time + rich snippets)*
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

## ⏳ Blocked (Needs Jonathan)
- **Custom domain** — playfreecellonline.com → Vercel DNS
- **AdSense publisher ID** — code ready, needs ca-pub-XXXXXXXXXX
- **Sentry DSN** — error tracking env var

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
- [x] CI pipeline
- [x] Orientation change fix
- [x] Single-tap auto-move (shipped 02-27)
- [x] Faster animations — 60-180ms (shipped 02-27)
- [x] Auto-complete acceleration (shipped 02-27)
- [x] Cascade settling stagger (shipped 02-27)
- [x] SEO: Glossary/terminology page (shipped 02-28)

---

## Priority Rationale (2026-03-01 — Sunday Synthesis)
- **🚨 Mobile rendering bug is P0** — If cards are invisible on mobile, nothing else matters. Fix first.
- **Post-game analysis** — Still highest-ROI feature. Leverages existing solver, adds educational value + replay motivation.
- **Numbered game URLs** — Standard competitor feature (cardgames.io has 1-50000). SEO + shareability.
- **Video content** — Competitors (Solitaired, Solitaire Bliss) have video tutorials. We have zero. Affects dwell time + rich snippets.
- **FreeCell history page** — Unique content opportunity. Green Felt owns this narrative but we can do it better.
- **GA4 data STILL needed** — 3 nights without analytics. **Critical gap.** Consider GA4 API integration as alternative to browser-based access.
- **Monetization roadmap** — Freestar header bidding delivers +2000% over AdSense. Plan for this once traffic justifies (need domain + AdSense first).
