# Tasks: PlayFreeCellOnline.com MVP

*Generated from: `docs/PRD.md` (Phase 1 — MVP)*
*Refined with Gemini 3.1 Pro review (2026-02-23)*
*Refined with Claude Opus review (2026-02-23)*

## Relevant Files

- `package.json` — Project dependencies and scripts
- `next.config.js` — Next.js configuration (Phaser.js dynamic import, headers, etc.)
- `tsconfig.json` — TypeScript configuration
- `tailwind.config.ts` — Tailwind CSS configuration
- `public/manifest.json` — PWA manifest stub
- `public/sitemap.xml` — SEO sitemap
- `src/app/layout.tsx` — Root layout (meta tags, Open Graph, global styles)
- `src/app/page.tsx` — Homepage (game + SEO content)
- `src/app/not-found.tsx` — Custom 404 page
- `src/app/how-to-play/page.tsx` — Rules page
- `src/app/strategy/page.tsx` — Strategy guide page
- `src/app/faq/page.tsx` — FAQ page with JSON-LD schema
- `src/app/privacy/page.tsx` — Privacy Policy
- `src/app/terms/page.tsx` — Terms of Service
- `src/components/GameShell.tsx` — React wrapper that mounts Phaser canvas
- `src/components/GameShell.test.tsx` — Tests for GameShell
- `src/components/ErrorBoundary.tsx` — Catch Phaser/WASM crashes, show fallback UI
- `src/components/TopBar.tsx` — Game controls (New Game, Undo, Redo, Hint, Restart, Settings)
- `src/components/TopBar.test.tsx` — Tests for TopBar
- `src/components/StatsPanel.tsx` — Stats display (win %, games, times)
- `src/components/StatsPanel.test.tsx` — Tests for StatsPanel
- `src/components/NewGameModal.tsx` — New game options (random, winnable, game number, difficulty)
- `src/components/NewGameModal.test.tsx` — Tests for NewGameModal
- `src/components/SettingsModal.tsx` — Settings (sound, animations, view mode)
- `src/components/AdSlot.tsx` — Reusable ad placement component
- `src/game/FreeCellScene.ts` — Main Phaser scene (board layout, card sprites, animations)
- `src/game/FreeCellScene.test.ts` — Tests for FreeCellScene
- `src/game/PhaserConfig.ts` — Phaser game configuration
- `src/game/GameBridge.ts` — React ↔ Phaser communication layer (EventEmitter)
- `src/game/GameBridge.test.ts` — Tests for GameBridge
- `src/game/CardSprite.ts` — Card sprite class (render, drag, animate)
- `src/game/CardSprite.test.ts` — Tests for CardSprite
- `src/game/animations.ts` — Animation helpers (deal, move, flip, win celebration, auto-move)
- `src/engine/FreeCellEngine.ts` — Core game logic (rules, legal moves, win detection)
- `src/engine/FreeCellEngine.test.ts` — Tests for FreeCellEngine (critical — all rule edge cases)
- `src/engine/Card.ts` — Card model (suit, rank, color, comparisons)
- `src/engine/Card.test.ts` — Tests for Card model
- `src/engine/Deck.ts` — Deck generation with seeded PRNG
- `src/engine/Deck.test.ts` — Tests for Deck (verify deal reproducibility by game number)
- `src/engine/MoveHistory.ts` — Undo/redo stack implementation
- `src/engine/MoveHistory.test.ts` — Tests for MoveHistory
- `src/engine/GameTimer.ts` — Timer (start on first move, pause on blur, stop on win)
- `src/engine/GameTimer.test.ts` — Tests for GameTimer
- `src/solver/solver.ts` — fc-solve WASM wrapper (hint, winnable check)
- `src/solver/solver.test.ts` — Tests for solver integration
- `src/solver/fc-solve.wasm` — Compiled fc-solve WebAssembly binary
- `src/lib/stats.ts` — Stats tracking logic (calculate win %, streaks, times)
- `src/lib/stats.test.ts` — Tests for stats
- `src/lib/storage.ts` — LocalStorage persistence (stats, settings, in-progress game)
- `src/lib/storage.test.ts` — Tests for storage
- `src/lib/analytics.ts` — GA4 event tracking wrapper
- `src/lib/supabase.ts` — Supabase client initialization
- `src/lib/auth.ts` — Auth helpers (login, logout, session management)
- `src/lib/auth.test.ts` — Tests for auth
- `src/lib/sync.ts` — Cross-device sync (merge local + server state)
- `src/lib/sync.test.ts` — Tests for sync
- `public/cards/` — Card face/back sprite assets
- `public/og-image.png` — Open Graph share image
- `public/favicon.ico` — Favicon
- `public/icons/` — PWA icon set (192x192, 512x512, apple-touch-icon)
- `public/sounds/` — Audio assets (deal, move, illegal, win)
- `.github/workflows/ci.yml` — GitHub Actions CI (lint, test, build, Lighthouse)
- `docs/decisions/` — Architecture Decision Records

### Notes
- Unit tests should be placed alongside their source files.
- Use `npx jest [optional/path]` to run tests.
- Phaser.js must be dynamically imported (no SSR) — use `next/dynamic` with `ssr: false`.
- fc-solve WASM requires async initialization; lazy-load on first hint/winnable request.
- React 18 StrictMode double-mounts components in dev — GameShell must use a ref guard to prevent duplicate Phaser instances.
- ARIA labels should be added alongside each component (not bolted on at the end).
- Performance budget: <500KB initial JS, <1MB total with lazy chunks.

---

## Tasks

- [ ] 0.0 Spikes & Prototypes (DO FIRST — de-risk before building)
  - [ ] 0.1 **(SPIKE)** Time-box 8 hours to compile fc-solve C library to WebAssembly via Emscripten. Create a build script and a simple HTML test page that calls `getHint()` on a sample game state. **Measure the WASM binary size.** If >2MB, prototype a lightweight heuristic hint fallback. Document the build process and results. **This is the highest technical risk.**
  - [ ] 0.2 **(PROTOTYPE)** Create a minimal `GameShell.tsx` that dynamically loads a basic Phaser scene via `next/dynamic` with `ssr: false`. Verify: scene renders, resizes with window, and unmounts cleanly without memory leaks. **Test with React 18 StrictMode double-mount — use a ref guard.** Proves the Phaser + Next.js integration pattern.
  - [ ] 0.3 **(DECISION)** Finalize card asset strategy — purchase from marketplace, use open-source set (e.g., svg-cards), or commission custom designs. This blocks all rendering work. Document decision in `docs/decisions/card-assets.md`.
  - [ ] 0.4 **(SPIKE)** Measure Phaser.js + fc-solve WASM combined bundle size. Test lazy-loading both behind dynamic imports. Establish performance budget: <500KB initial JS, <1MB total with lazy chunks. If fc-solve WASM exceeds 2MB, prototype a lightweight heuristic hint fallback.
  - [ ] 0.5 **(DECISION)** Choose Phaser version (3.80+ vs 4.x). Pin in `package.json`. Document rationale in `docs/decisions/phaser-version.md`.
  - [ ] 0.6 **(DECISION)** MS FreeCell deal compatibility: will game #1-32000 match Microsoft FreeCell's classic deals? Research the MS dealing algorithm (well-documented MSLCG). If yes, implement MS-compatible PRNG. If no, document why. **Getting this wrong will bounce the purist audience.** Document in `docs/decisions/deal-algorithm.md`.
  - [ ] 0.7 **(DESIGN)** Create wireframes/mockups for: desktop board layout, mobile portrait layout, TopBar, win screen, new game modal. Can be low-fi (Excalidraw/Figma). Blocks UI implementation.

- [ ] 1.0 Project Scaffolding & Infrastructure
  - [ ] 1.1 Initialize Next.js 14+ project with TypeScript, Tailwind CSS, and App Router (`npx create-next-app@latest freecell-online --typescript --tailwind --app`)
  - [ ] 1.2 Configure ESLint and Prettier with consistent rules; add lint/format scripts to `package.json`
  - [ ] 1.3 Set up Jest + React Testing Library for unit tests; configure `jest.config.ts` with TypeScript support and path aliases
  - [ ] 1.4 Install Phaser.js (pinned version from decision 0.5) and configure `next.config.js` to handle dynamic import (no SSR for game component)
  - [ ] 1.5 Create `public/manifest.json` PWA manifest with proper icon set (192x192, 512x512), theme color, display: standalone
  - [ ] 1.6 Set up `.github/workflows/ci.yml` — lint, test, build, Lighthouse CI (Performance >90, A11y >90, SEO >95) on push/PR to `main`
  - [ ] 1.7 Configure Vercel project and connect to `jonnydigital/freecell-online` repo for auto-deploy on push
  - [ ] 1.8 Create base `src/app/layout.tsx` with global meta tags, fonts, Tailwind styles, favicon, and apple-touch-icon
  - [ ] 1.9 Add `.gitignore`, `.env.example` (Supabase keys placeholder), and update `README.md` with dev setup instructions
  - [ ] 1.10 Set up GA4 property and Sentry.io project (free tier) early — wire into infrastructure so all preview deploys have analytics/error monitoring from day one

- [ ] 2.0 Game Engine Core (FreeCell Logic)
  - [ ] 2.1 Create `src/engine/Card.ts` — Card class with suit (♠♥♦♣), rank (A-K), color (red/black), and comparison methods (`canStackOnCascade`, `canMoveToFoundation`)
  - [ ] 2.2 Write comprehensive tests for Card model covering all rank/suit/color combinations and stacking rules
  - [ ] 2.3 Create `src/engine/Deck.ts` — 52-card deck generation using PRNG per decision 0.6 (MS-compatible or custom). Given a game number (1–9,999,999), always produce the same deal. Include `dealToTableau()` returning 8 cascades.
  - [ ] 2.4 Write tests for Deck — verify same seed = same deal, different seed = different deal, all 52 cards present, correct cascade distribution (4 cascades of 7, 4 of 6). If MS-compatible, verify deal #1 matches known MS FreeCell deal #1.
  - [ ] 2.5 Create `src/engine/FreeCellEngine.ts` — Game state manager: 8 cascades, 4 free cells, 4 foundations. Methods: `getLegalMoves()`, `executeMove(from, to)`, `isWon()`, `canAutoMove()`, `getMaxMovableCards(emptyFreeCells, emptyCascades)`, `hasLegalMoves()` (deadlock detection)
  - [ ] 2.6 Implement sequence-aware move logic:
    - [ ] 2.6.1 Implement `calculateMaxMovableCards(emptyFreeCells, emptyCascades)` based on standard FreeCell rules (formula: (1 + emptyFreeCells) * 2^emptyCascades)
    - [ ] 2.6.2 Update `executeMove` to handle sequence moves — validate via `calculateMaxMovableCards`, then generate the list of intermediate "parking" moves required
    - [ ] 2.6.3 Write specific unit tests for `calculateMaxMovableCards` and sequence-move execution with various free cell/empty cascade combinations
  - [ ] 2.7 Implement auto-move to foundations — after each player move, check if any card can safely go to a foundation (safe = both cards of opposite color with rank-1 are already on foundations)
  - [ ] 2.8 Write extensive tests for FreeCellEngine — legal moves, illegal moves, sequence moves, auto-move, win detection, deadlock detection, edge cases (empty cascades, full free cells)
  - [ ] 2.9 Create `src/engine/MoveHistory.ts` — stack-based undo/redo system. Each entry stores: move type, source, destination, cards moved, any auto-moves triggered. Support unlimited undo. **(Moved here from section 4 — undo/redo is core engine logic.)**
  - [ ] 2.10 Write tests for MoveHistory — undo single move, undo sequence move (reverses all intermediate), redo, undo past auto-moves, empty stack behavior
  - [ ] 2.11 Create `src/engine/GameTimer.ts` — start on first move, pause on `visibilitychange` (tab blur), resume on focus, stop on win/resign. Expose elapsed seconds. Persist timer state to LocalStorage for resume.
  - [ ] 2.12 Implement deadlock detection — after each move, check if any legal moves remain. If none, emit 'deadlock' event. (Separate from solver — this is just "are there zero legal moves right now?")

- [ ] 3.0 Card Rendering, Drag-and-Drop & Animations
  - [ ] 3.0.1 **(ARCHITECTURE)** Design React ↔ Phaser communication bridge. Create `src/game/GameBridge.ts` — EventEmitter pattern. Define message types: UI→Game (newGame, undo, redo, hint, restart, settings), Game→UI (moveExecuted, gameWon, timerTick, deadlock, statsUpdate). **All React↔Phaser communication goes through this — no direct Phaser scene access from React.** Document in `docs/decisions/react-phaser-bridge.md`.
  - [ ] 3.1 Implement card assets per decision from task 0.3 — 52 card faces + card back, optimized for web (SVG or compressed PNG sprite sheet). Save to `public/cards/`. Include multiple card back designs for future customization.
  - [ ] 3.2 Create `src/game/PhaserConfig.ts` — Phaser game config (`type: Phaser.AUTO` — WebGL with Canvas fallback, responsive scaling, transparent background for CSS integration). Set `touch-action: none` on canvas to prevent scroll/zoom conflicts on mobile.
  - [ ] 3.3 Create `src/game/CardSprite.ts` — Phaser sprite wrapper: render card at position, flip animation, highlight states (valid target, selected), z-index management for overlapping cascades
  - [ ] 3.4 Implement a loading screen/skeleton displayed while Phaser assets and WASM module initialize
  - [ ] 3.5 Create `src/game/FreeCellScene.ts` — Main Phaser scene: `preload()` card assets, `create()` layout (cascade positions, free cell positions, foundation positions), handle game state rendering. Handle `webglcontextlost`/`webglcontextrestored` events — show "Restoring game..." overlay, rebuild scene on restore.
  - [ ] 3.6 Implement drag-and-drop in FreeCellScene — on drag start: validate card is top of cascade or in free cell; on drag: move sprite with pointer (0-latency pickup); on drop: check if target is valid via engine, animate to position or snap back
  - [ ] 3.7 Implement sequence-aware drag — when dragging a card that's part of a valid run, visually pick up the entire sub-stack; if dropped on valid target, engine executes intermediate moves with sequential animations
  - [ ] 3.8 Create `src/game/animations.ts` — deal animation (cards fly to cascades with stagger delay), move animation (card slides to target, ~150ms ease), auto-move animation (card arcs to foundation), win celebration (cards cascade/bounce off screen)
  - [ ] 3.9 Create an animation queue/manager in FreeCellScene to execute a series of moves sequentially (needed for sequence moves and auto-finish)
  - [ ] 3.10 Implement responsive layout system:
    - [ ] 3.10.1 Define breakpoints: Compact (<640px portrait), Normal (640-1200px), Wide (>1200px). Card width = floor((viewport_width - margins) / 8 columns).
    - [ ] 3.10.2 Handle deep cascades: dynamically increase card overlap when cascade exceeds available height. Never scroll the board.
    - [ ] 3.10.3 Landscape vs portrait on mobile — different layouts, not just resized
    - [ ] 3.10.4 Define and test minimum playable viewport (320px width?)
  - [ ] 3.11 Add click-to-move as alternative to drag — tap a card to select it, tap a valid destination to move. Mobile-friendly fallback.
  - [ ] 3.12 Implement double-click / double-tap to auto-send card to foundation (user-initiated, distinct from auto-move system)
  - [ ] 3.13 Implement keyboard controls for game interaction: arrow keys to navigate cascades/cells, Enter to pick up/place card, Esc to cancel selection
  - [ ] 3.14 Add sound effects: card deal swoosh, card place thud, illegal move buzz, win fanfare. Source or create audio files in `public/sounds/`. Respect sound on/off setting.
  - [ ] 3.15 Performance benchmark: profile deal animation, 20-card cascade drag, and win celebration on low-end device (Chrome DevTools throttled 4x CPU). Target: no frame drops below 50fps. Fix any violations.
  - [ ] 3.16 Write tests for GameBridge, CardSprite, and animation utilities

- [ ] 4.0 Solver & Advanced Controls
  - [ ] 4.1 Productionize spike 0.1 output — move build script to project, integrate compiled WASM into `src/solver/`, create proper TypeScript types for the solver API. (Don't redo the spike work.)
  - [ ] 4.2 Test solver integration — verify hints return legal moves, winnable check matches known solvable/unsolvable deal numbers
  - [ ] 4.3 Implement "Winnable Only" toggle — before dealing, run solver on generated deal; if unsolvable, increment seed and retry (cap at N attempts, then deal anyway with warning)
  - [ ] 4.4 Implement auto-finish — when solver confirms remaining position is trivially winnable (all cards in sequence on cascades), animate all cards moving to foundations automatically via animation queue
  - [ ] 4.5 Implement "Restart This Deal" — reset to initial deal state, clear move history, restart timer. Confirm dialog: "Restart this deal? Your progress will be lost."
  - [ ] 4.6 Implement "Give Up / Resign" action — ends game as a loss, breaks streak, updates stats. Confirm dialog.
  - [ ] 4.7 Implement game number display in TopBar (show current deal #) and "Share this deal" action (copy URL with `?game=N` to clipboard, or share via Web Share API on mobile)

- [ ] 5.0 Stats, Storage & UI Shell
  - [ ] 5.1 Create `src/lib/stats.ts` — track per-session and all-time stats: games played, games won, win %, current streak, longest streak, best time, average time, least moves
  - [ ] 5.2 Create `src/lib/storage.ts` — LocalStorage wrapper: save/load stats, settings, and in-progress game state (auto-save after each move for resume on page reload)
  - [ ] 5.3 Write tests for stats calculations and storage persistence
  - [ ] 5.4 Create `src/components/ErrorBoundary.tsx` — catch Phaser/WASM crashes, show "Something went wrong — Reload" fallback UI instead of white screen
  - [ ] 5.5 Create `src/components/GameShell.tsx` — React component that loads Phaser via `next/dynamic` (`ssr: false`), communicates exclusively through GameBridge (task 3.0.1), handles mounting/unmounting with ref guard for StrictMode
  - [ ] 5.6 Create `src/components/TopBar.tsx` — control strip: New Game, Restart, Undo, Redo, Hint, Auto-finish, Share, Settings gear. Compact, non-intrusive. Disabled states when actions unavailable. Game number display. ARIA labels on all buttons.
  - [ ] 5.7 Create `src/components/NewGameModal.tsx` — options: Random deal, Winnable only (toggle), Enter game number (input), view mode selector. Start button.
  - [ ] 5.8 Create `src/components/StatsPanel.tsx` — slide-out or modal showing all tracked stats. Clean layout with key metrics prominent.
  - [ ] 5.9 Create `src/components/SettingsModal.tsx` — sound on/off, animation speed, view mode (Normal/Wide/Compact), auto-move toggle, card back selection (future)
  - [ ] 5.10 Write tests for React components (GameShell mount/unmount, TopBar button states, NewGameModal form)

- [ ] 6.0 SEO & Content
  - [ ] 6.1 Build homepage `src/app/page.tsx` — game embedded above the fold, SEO content below: brief intro ("Play FreeCell Online for Free — no download, no signup"), rules summary, internal links to content pages
  - [ ] 6.2 Create `src/app/how-to-play/page.tsx` — comprehensive FreeCell rules with diagrams/screenshots. Target "how to play freecell" keyword. HowTo schema markup.
  - [ ] 6.3 Create `src/app/strategy/page.tsx` — FreeCell strategy guide. Target long-tail keywords.
  - [ ] 6.4 Create `src/app/faq/page.tsx` — structured FAQ with JSON-LD schema.
  - [ ] 6.5 **(CONTENT)** Write and populate actual content for all pages — not just shells. This is required for both SEO rankings and AdSense approval.
  - [ ] 6.6 Configure meta tags, Open Graph image, canonical URLs, and `robots.txt` in layout and per-page
  - [ ] 6.7 Generate `public/sitemap.xml` (static for now, dynamic later)
  - [ ] 6.8 Create `src/app/not-found.tsx` — styled 404 page with link back to game
  - [ ] 6.9 Create favicon + PWA icon set (16x16, 32x32, 180x180 apple-touch-icon, 192x192, 512x512). Update manifest.json and layout.tsx `<head>`.

- [ ] 7.0 Legal & Compliance (MUST complete before AdSense application)
  - [ ] 7.1 Create `/privacy` and `/terms` pages with proper legal content (Privacy Policy covering analytics, ads, Supabase data; Terms of Service)
  - [ ] 7.2 Integrate cookie consent banner (e.g., `react-cookie-consent`) that blocks analytics/ad scripts until user consents (GDPR compliance). Consider TCF 2.0 for contextual ads without consent.
  - [ ] 7.3 Add links to Privacy Policy and Terms in site footer on all pages

- [ ] 8.0 Monetization
  - [ ] 8.1 Create `src/components/AdSlot.tsx` — reusable component for ad placements. Props: position (sidebar, footer, interstitial), size. Lazy-loaded to not block game rendering.
  - [ ] 8.2 Integrate Google AdSense — sidebar banners flanking game board (desktop), footer banner (mobile), interstitial between games (post-win only). **Measure LCP and TBT before/after ad injection. Ad scripts must not increase TBT by more than 200ms. Ads must lazy-load below fold.**
  - [ ] 8.3 NOTE: AdSense approval requires content pages (6.5) + legal pages (7.1) to be live. Plan for 2-4 week approval delay after launch.

- [ ] 9.0 Analytics & Monitoring
  - [ ] 9.1 Create `src/lib/analytics.ts` — wrapper service for GA4 event tracking, respecting cookie consent state
  - [ ] 9.2 Implement tracking for core game events: `game_start` (game_number, is_winnable), `game_win` (time_seconds, moves, used_hints, used_undo), `game_lose`, `game_resign`, `hint_used`, `undo_used`, `deal_shared`
  - [ ] 9.3 Integrate Sentry SDK into `next.config.js`, configure source maps upload for production builds

- [ ] 10.0 Authentication & Cross-Device Sync (POST-MVP — ship without this first)
  - [ ] 10.1 Set up Supabase project — create tables: `profiles`, `game_stats`, `saved_games`. **Configure Row Level Security (RLS) policies — users can only read/write their own data. Test with a second account.**
  - [ ] 10.2 Create `src/lib/supabase.ts` — initialize Supabase client with env vars
  - [ ] 10.3 Create `src/lib/auth.ts` — `signInWithGoogle()`, `signInWithApple()`, `signOut()`, `getSession()`, `onAuthStateChange()` wrapper
  - [ ] 10.4 Add login/signup UI — subtle "Sign in to save progress" prompt (not blocking). Google and Apple OAuth buttons. Show user avatar/name when logged in.
  - [ ] 10.5 Create `src/lib/sync.ts` — on login: merge LocalStorage stats with server stats. **Define explicit merge rules**: best_time = min(local, server), games_played = max(local, server), current_streak = server (authoritative), settings = last-modified-wins. Document in `docs/decisions/sync-merge-strategy.md`.
  - [ ] 10.6 Implement saved game sync — if user closes browser mid-game and reopens on another device, resume from saved state
  - [ ] 10.7 Write tests for auth flow, sync merge logic (conflict resolution), and saved game persistence

- [ ] 11.0 Pre-Launch Checklist
  - [ ] 11.1 Configure DNS for playfreecellonline.com → Vercel. Verify SSL cert auto-provisioning.
  - [ ] 11.2 Run Lighthouse audit — targets: Performance >90, Accessibility >90, SEO >95. Fix any failures.
  - [ ] 11.3 Cross-browser test on: Chrome/Safari/Firefox desktop, iOS Safari, Android Chrome, Samsung Internet. File bugs for anything broken.
  - [ ] 11.4 E2E smoke test (Playwright): deal → play moves → win → stats update → new game. Verify stats save, reload resumes game, ads don't break layout.
  - [ ] 11.5 Submit sitemap to Google Search Console. Verify indexing.
  - [ ] 11.6 Apply for Google AdSense (after content + legal pages are live).
  - [ ] 11.7 Final smoke test: play a full game start-to-finish on mobile and desktop.

---

## Technical Risks (Reference)

| Risk | Severity | Mitigation |
|------|----------|------------|
| fc-solve WASM binary size (could be 2-5MB) | HIGH | Spike 0.1 + 0.4. Fallback: heuristic hint engine. |
| Phaser + WASM combined bundle >3MB | HIGH | Aggressive lazy-loading, code splitting, performance budget in CI. |
| React 18 StrictMode double-mount creating 2 Phaser instances | MEDIUM | Ref guard in GameShell (test in spike 0.2). |
| Mobile Safari WebGL context loss under memory pressure | MEDIUM | Handle `webglcontextlost`/`webglcontextrestored`, rebuild scene. |
| Touch event conflicts (Phaser input vs browser scroll/zoom) | MEDIUM | `touch-action: none` on canvas, proper Phaser input config. |
| AdSense approval delay (2-4 weeks, requires content) | MEDIUM | Content + legal pages must ship before applying. Revenue lags launch. |
| PRNG reproducibility across environments | LOW | Cross-environment test suite for chosen PRNG. |
| Cookie consent blocking EU ad revenue (30-60% never consent) | LOW | Consider TCF 2.0 for contextual ads. Model into projections. |
| fc-solve licensing | LOW | MIT — clean. Verify Emscripten output during spike. |
