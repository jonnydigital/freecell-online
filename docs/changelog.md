# FreeCell Online — Changelog

## 2026-02-24 (Day 1 — Launch Day)
### Shipped
- **Core game** — Full FreeCell engine, Phaser rendering, drag-and-drop
- **Mobile responsive** — Portrait + landscape modes, orientation change handling
- **Touch precision** — priorityID depth sorting, tap-to-select state machine, visual feedback
- **Card rendering** — Canvas-generated card faces with proper suits, ranks, J/Q/K bands
- **Daily challenges** — Seeded daily game, calendar UI, streak tracking
- **Auto-complete** — Detects solved state, Auto-Finish button
- **Bottom nav bar** — Mobile-friendly with Lucide icons
- **Smart double-tap** — Auto-move to foundation/best destination
- **PWA** — Service worker, offline caching, Add to Home Screen
- **Solvable deals** — Game numbers, skips unsolvable seeds
- **GA4 analytics** — Custom game events (start, win, abandon, hints, undos)
- **Feedback system** — In-game modal with context capture
- **Visual polish** — Radial gradient, vignette, felt texture, animations
- **SEO pages** — How-to-play, strategy, FAQ, privacy, terms
- **CI pipeline** — GitHub Actions lint + build

### Metrics
- Visitors: 0 (just launched)
- Games played: testing only
- Bugs found: orientation change, touch precision, 4-column portrait (all fixed)

### AI Reviews
- Gemini 3 Flash: code-level UI review
- Gemini 3.1 Pro: visual UI review via AI Studio + CLI
- Council review: Gemini + Claude alignment on priorities
