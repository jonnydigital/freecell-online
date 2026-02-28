# FreeCell Online — Changelog

## 2026-02-28 (Morning — Fluidity #5 & #8)
### Shipped
- **Enhanced card lift effect** — Cards scale to 1.08x on drag with deeper shadow (4px offset, 0.5 alpha) and -3px lift. Animated return on drop.
- **Touch responsiveness** — Switched to pointerdown for card selection (was pointerup). Eliminates ~50-100ms perceived input lag on mobile.
- **Glossary page** (`/glossary`) — 26 FreeCell/solitaire terms with clear definitions, alphabetical grouping, letter navigation, internal cross-links to strategy/rules/FAQ pages, DefinedTermSet schema markup.
- **Footer navigation** — Added Glossary link to site-wide footer

---

## 2026-02-27 (Overnight — Fluidity Sprint)
### Shipped
- **Single-tap auto-move** — Bottom card of cascade auto-moves on single tap (foundation > cascade > empty > freecell). Mid-run taps still show selection UI.
- **Faster animations** — Move duration tightened to 60-180ms (was 100-300ms), Power3.easeOut default (Back.easeOut reserved for foundation/win)
- **Auto-complete acceleration** — Starts at 40ms between cards, accelerates to 15ms as it goes
- **Cascade settling stagger** — 12ms per-card delay for physical settling feel after card removal

---

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
