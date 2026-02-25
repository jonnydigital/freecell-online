# FreeCell Online — Feature Backlog
*Ranked by impact × effort. Updated 2026-02-25.*

## 🔴 High Priority (Ship This Week)
1. **Theme system** — felt color picker + card back designs
2. **Share button** — "I solved today's FreeCell in X moves!" with Web Share API
3. **Keyboard shortcuts overlay** — modal showing all hotkeys
4. **Statistics page enhancement** — charts, streaks visualization, detailed history

## 🟡 Medium Priority (Ship This Month)
5. **Leaderboard** — daily challenge times/moves (needs backend — Vercel KV?)
6. **Achievements/badges** — "Won 10 games", "5-day streak", etc.
7. **Tutorial/onboarding** — first-time player walkthrough
8. **Ghost mode** — watch the solver play after you win/lose

## 🟢 Nice to Have
9. **Multiplayer daily challenge** — compete on same seed
10. **Offline mode polish** — better offline UX
11. **i18n** — multi-language
12. **Accessibility** — screen reader, high contrast

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
