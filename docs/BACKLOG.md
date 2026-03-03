# FreeCell Online — Feature Backlog
*Ranked by impact × effort. Updated 2026-03-01 (Sunday synthesis).*

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
8. **Statistics page enhancement** — charts, streaks visualization, detailed history
9. **Multi-modal navigation** — restructure nav into Play / Daily / Learn / Stats sections *(Chess.com spark — each mode serves different user intent)*
10. ~~**Streak milestone celebrations**~~ ✅ SHIPPED 03-01 — Animated toasts at 14 milestone levels (3-365), unique messages, framer-motion animations *(Duolingo spark)*
11. ~~**Numbered game URLs**~~ ✅ SHIPPED 03-02 — `/game/[number]` routes with SEO meta tags + share integration
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

## Priority Rationale (2026-03-01 — Sunday Synthesis)
- **🚨 Mobile rendering bug is P0** — If cards are invisible on mobile, nothing else matters. Fix first.
- **Post-game analysis** — Still highest-ROI feature. Leverages existing solver, adds educational value + replay motivation.
- **Numbered game URLs** — Standard competitor feature (cardgames.io has 1-50000). SEO + shareability.
- **Video content** — Competitors (Solitaired, Solitaire Bliss) have video tutorials. We have zero. Affects dwell time + rich snippets.
- **FreeCell history page** — Unique content opportunity. Green Felt owns this narrative but we can do it better.
- **GA4 data STILL needed** — 3 nights without analytics. **Critical gap.** Consider GA4 API integration as alternative to browser-based access.
- **Monetization roadmap** — Freestar header bidding delivers +2000% over AdSense. Plan for this once traffic justifies (need domain + AdSense first).
