# FreeCell Online — Feature Backlog
*Ranked by impact × effort. Updated 2026-02-27 (Friday research cycle).*

## 🔴 High Priority (Ship This Week)
1. **Puzzle modes: Streak + Storm** — Repackage FreeCell engine as Streak (consecutive wins) and Storm (timed speed-solving). 3-4x engagement surface from same core engine. *(Lichess spark — their puzzle variants are massive retention drivers)*
2. **Post-game optimal solution** — Show solver's solution after each game (win or lose). Educational + dwell time. *(Lichess spark — leverages existing solver, low effort)*
3. ~~**Star rating per game**~~ ✅ ALREADY SHIPPED — WinScreen shows 1-3 stars based on moves (≤60=3★, ≤90=2★), with animated reveal, "New Best!" tracking, and star count in share text
4. ~~**Theme system**~~ ✅ SHIPPED 03-01 — 5 felt themes (Classic Green, Royal Blue, Wine Red, Dark Mode, Slate) with CSS variables, localStorage persistence, theme picker in toolbar
5. ~~**Share button**~~ ✅ ALREADY SHIPPED — Web Share API + clipboard fallback on WinScreen, DailyChallenge, Streak, GameShell
6. **SEO: Expand strategy page** — 2000+ words, actionable tips, internal links *(Solitaire Bliss model — they rank for "freecell strategy")*
7. ~~**SEO: Glossary/terminology page**~~ ✅ SHIPPED 02-28 — `/glossary` with 26 terms, letter nav, DefinedTermSet schema, cross-links

## 🟡 Medium Priority (Ship This Month)
8. **Statistics page enhancement** — charts, streaks visualization, detailed history
9. **Multi-modal navigation** — restructure nav into Play / Daily / Learn / Stats sections *(Chess.com spark — each mode serves different user intent)*
10. ~~**Streak milestone celebrations**~~ ✅ SHIPPED 03-01 — Animated toasts at 14 milestone levels (3-365), unique messages, framer-motion animations *(Duolingo spark)*
11. **Numbered game URLs** — `/game/[number]` routes for shareability + SEO *(competitor standard: cardgames.io has 1-50000)*
12. **FreeCell variants** — Baker's Game, Eight Off as separate modes. New daily challenges per variant. *(NYT Games spark — game portfolio as retention moat)*
13. **SEO: FreeCell history page** — Paul Alfille, PLATO, Baker's Game origins *(Green Felt spark. Unique content, educational backlinks)*
14. **SEO: Solitaire types taxonomy** — classify 10-20 variants, link to our game *(Solitaire Paradise spark. Hub page for internal linking)*
15. **Leaderboard** — daily challenge times/moves (Vercel KV) *(competitor gap vs solitaired.com)*
16. **Achievements/badges** — "Won 10 games", "5-day streak", etc. *(gamification gap vs MobilityWare)*
17. **Tutorial/onboarding** — first-time player walkthrough *(component exists: Tutorial.tsx — needs activation?)*
18. **Video tutorial** — screen-recorded walkthrough, embed on game page *(Solitaire Bliss has YouTube embed. Huge for dwell time + rich snippets)*
19. **Ghost mode** — watch the solver play after you win/lose

## 🟢 Nice to Have
14. **Multiplayer daily challenge** — compete on same seed
15. **Offline mode polish** — better offline UX
16. **i18n** — multi-language
17. **Accessibility** — screen reader, high contrast
18. **Community/forum** — user feedback channel *(Green Felt model, builds loyalty)*
19. **Animation speed setting** — let users choose fast/medium/slow *(cardgames.io feature)*
20. **Sound pitch variation** — higher rank = higher pitch on foundation *(polish item from 02-26 analysis)*

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

## Priority Rationale (2026-02-28)
- **Puzzle modes (Streak/Storm)** — Lichess proves repackaging the same core mechanic as multiple modes massively increases engagement surface. We have the engine and solver. This is the single highest-ROI feature we can build.
- **Post-game analysis + star rating** — leverages existing solver to add educational value and replay motivation. Low implementation cost, high user value.
- **Theme system + Share** — table-stakes and growth channel. Still critical.
- **Multi-modal nav** — as we add modes, we need Chess.com-style navigation to surface them.
- **GA4 data STILL needed** — 2 nights without analytics. Flying blind. Must resolve browser access or build API-based analytics pull.
