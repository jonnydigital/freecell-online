# FreeCell Online — Feature Backlog
*Ranked by impact × effort. Updated 2026-02-27 (Friday research cycle).*

## 🔴 High Priority (Ship This Week)
1. **Theme system** — felt color picker + card back designs *(Solitaire Bliss has this, gamification gap)*
2. **Share button** — "I solved today's FreeCell in X moves!" with Web Share API *(competitor gap, viral growth)*
3. **SEO: Expand strategy page** — 2000+ words, actionable tips, internal links *(Solitaire Bliss model — they rank for "freecell strategy")*
4. ~~**SEO: Glossary/terminology page**~~ ✅ SHIPPED 02-28 — `/glossary` with 26 terms, letter nav, DefinedTermSet schema, cross-links
5. **Statistics page enhancement** — charts, streaks visualization, detailed history

## 🟡 Medium Priority (Ship This Month)
6. **Numbered game URLs** — `/game/[number]` routes for shareability + SEO *(competitor standard: cardgames.io has 1-50000)*
7. **SEO: FreeCell history page** — Paul Alfille, PLATO, Baker's Game origins *(NEW — Green Felt spark. Unique content, educational backlinks)*
8. **SEO: Solitaire types taxonomy** — classify 10-20 variants, link to our game *(NEW — Solitaire Paradise spark. Hub page for internal linking)*
9. **Leaderboard** — daily challenge times/moves (Vercel KV) *(competitor gap vs solitaired.com)*
10. **Achievements/badges** — "Won 10 games", "5-day streak", etc. *(gamification gap vs MobilityWare)*
11. **Tutorial/onboarding** — first-time player walkthrough *(component exists: Tutorial.tsx — needs activation?)*
12. **Video tutorial** — screen-recorded walkthrough, embed on game page *(NEW — Solitaire Bliss has YouTube embed. Huge for dwell time + rich snippets)*
13. **Ghost mode** — watch the solver play after you win/lose

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

## Priority Rationale (2026-02-27)
- **SEO content pages (glossary, history, types)** — competitors rank for informational queries that funnel into game pages. We have game + basic content pages but lack the hub-and-spoke depth. Low effort, compounding returns.
- **Theme system** — every major competitor offers customization. It's table-stakes for retention.
- **Share button** — zero-cost growth channel. Daily challenge + share = viral loop.
- **GA4 data needed** — can't fully prioritize without user behavior data. Next research cycle MUST get analytics.
