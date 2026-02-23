# Tasks: PlayFreeCellOnline.com MVP

*Generated from: `docs/PRD.md` (Phase 1 — MVP)*
*Refined with Gemini 3.1 Pro review (2026-02-23)*

## Relevant Files

- `package.json` — Project dependencies and scripts
- `next.config.js` — Next.js configuration (Phaser.js dynamic import, headers, etc.)
- `tsconfig.json` — TypeScript configuration
- `tailwind.config.ts` — Tailwind CSS configuration
- `public/manifest.json` — PWA manifest stub
- `public/sitemap.xml` — SEO sitemap
- `src/app/layout.tsx` — Root layout (meta tags, Open Graph, global styles)
- `src/app/page.tsx` — Homepage (game + SEO content)
- `src/app/how-to-play/page.tsx` — Rules page
- `src/app/strategy/page.tsx` — Strategy guide page
- `src/app/faq/page.tsx` — FAQ page with JSON-LD schema
- `src/components/GameShell.tsx` — React wrapper that mounts Phaser canvas
- `src/components/GameShell.test.tsx` — Tests for GameShell
- `src/components/TopBar.tsx` — Game controls (New Game, Undo, Redo, Hint, Settings)
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
- `src/solver/solver.ts` — fc-solve WASM wrapper (hint, winnable check)
- `src/solver/solver.test.ts` — Tests for solver integration
- `src/solver/fc-solve.wasm` — Compiled fc-solve WebAssembly binary
- `src/lib/stats.ts` — Stats tracking logic (calculate win %, streaks, times)
- `src/lib/stats.test.ts` — Tests for stats
- `src/lib/storage.ts` — LocalStorage persistence (stats, settings, in-progress game)
- `src/lib/storage.test.ts` — Tests for storage
- `src/lib/supabase.ts` — Supabase client initialization
- `src/lib/auth.ts` — Auth helpers (login, logout, session management)
- `src/lib/auth.test.ts` — Tests for auth
- `src/lib/sync.ts` — Cross-device sync (merge local + server state)
- `src/lib/sync.test.ts` — Tests for sync
- `public/cards/` — Card face/back sprite assets
- `public/og-image.png` — Open Graph share image
- `.github/workflows/ci.yml` — GitHub Actions CI (lint, test, deploy)

### Notes
- Unit tests should be placed alongside their source files.
- Use `npx jest [optional/path]` to run tests.
- Phaser.js must be dynamically imported (no SSR) — use `next/dynamic` with `ssr: false`.
- fc-solve WASM requires async initialization; lazy-load on first hint/winnable request.

---

## Tasks

- [ ] 0.0 Spikes & Prototypes (DO FIRST — de-risk before building)
  - [ ] 0.1 **(SPIKE)** Time-box 8 hours to compile fc-solve C library to WebAssembly via Emscripten. Create a build script and a simple HTML test page that calls `getHint()` on a sample game state. Document the build process. **This is the highest technical risk — if it fails, we need an alternative hint strategy.**
  - [ ] 0.2 **(PROTOTYPE)** Create a minimal `GameShell.tsx` that dynamically loads a basic Phaser scene via `next/dynamic` with `ssr: false`. Verify: scene renders, resizes with window, and unmounts cleanly without memory leaks. **Proves the Phaser + Next.js integration pattern before building on it.**
  - [ ] 0.3 **(DECISION)** Finalize card asset strategy — purchase from marketplace, use open-source set (e.g., svg-cards), or commission custom designs. This blocks all rendering work. Document decision in `docs/decisions/card-assets.md`.

- [ ] 1.0 Project Scaffolding & Infrastructure
  - [ ] 1.1 Initialize Next.js 14+ project with TypeScript, Tailwind CSS, and App Router (`npx create-next-app@latest freecell-online --typescript --tailwind --app`)
  - [ ] 1.2 Configure ESLint and Prettier with consistent rules; add lint/format scripts to `package.json`
  - [ ] 1.3 Set up Jest + React Testing Library for unit tests; configure `jest.config.ts` with TypeScript support and path aliases
  - [ ] 1.4 Install Phaser.js (`npm install phaser`) and configure `next.config.js` to handle dynamic import (no SSR for game component)
  - [ ] 1.5 Create `public/manifest.json` PWA stub (name, icons placeholder, theme color, display: standalone)
  - [ ] 1.6 Set up `.github/workflows/ci.yml` — lint, test, build on push/PR to `main`
  - [ ] 1.7 Configure Vercel project and connect to `jonnydigital/freecell-online` repo for auto-deploy on push
  - [ ] 1.8 Create base `src/app/layout.tsx` with global meta tags, fonts, and Tailwind styles
  - [ ] 1.9 Add `.gitignore`, `.env.example` (Supabase keys placeholder), and update `README.md` with dev setup instructions

- [ ] 2.0 Game Engine Core (Phaser.js + FreeCell Logic)
  - [ ] 2.1 Create `src/engine/Card.ts` — Card class with suit (♠♥♦♣), rank (A-K), color (red/black), and comparison methods (`canStackOnCascade`, `canMoveToFoundation`)
  - [ ] 2.2 Write comprehensive tests for Card model covering all rank/suit/color combinations and stacking rules
  - [ ] 2.3 Create `src/engine/Deck.ts` — 52-card deck generation using seeded PRNG (e.g., mulberry32). Given a game number (1–9,999,999), always produce the same deal. Include `dealToTableau()` returning 8 cascades.
  - [ ] 2.4 Write tests for Deck — verify same seed = same deal, different seed = different deal, all 52 cards present, correct cascade distribution (4 cascades of 7, 4 of 6)
  - [ ] 2.5 Create `src/engine/FreeCellEngine.ts` — Game state manager: 8 cascades, 4 free cells, 4 foundations. Methods: `getLegalMoves()`, `executeMove(from, to)`, `isWon()`, `canAutoMove()`, `getMaxMovableCards(emptyFreeCells, emptyCascades)`
  - [ ] 2.6 Implement sequence-aware move logic:
    - [ ] 2.6.1 Implement `calculateMaxMovableCards(emptyFreeCells, emptyCascades)` based on standard FreeCell rules (formula: (1 + emptyFreeCells) * 2^emptyCascades)
    - [ ] 2.6.2 Update `executeMove` to handle sequence moves — validate via `calculateMaxMovableCards`, then generate the list of intermediate "parking" moves required
    - [ ] 2.6.3 Write specific unit tests for `calculateMaxMovableCards` and sequence-move execution with various free cell/empty cascade combinations
  - [ ] 2.7 Implement auto-move to foundations — after each player move, check if any card can safely go to a foundation (safe = both cards of opposite color with rank-1 are already on foundations)
  - [ ] 2.8 Write extensive tests for FreeCellEngine — legal moves, illegal moves, sequence moves, auto-move, win detection, edge cases (empty cascades, full free cells)
  - [ ] 2.9 Create `src/game/PhaserConfig.ts` — Phaser game config (Canvas renderer preferred with WebGL fallback, responsive scaling, transparent background for CSS integration)
  - [ ] 2.10 Create `src/game/FreeCellScene.ts` — Main Phaser scene: `preload()` card assets, `create()` layout (cascade positions, free cell positions, foundation positions), handle game state rendering

- [ ] 3.0 Card Rendering, Drag-and-Drop & Animations
  - [ ] 3.1 Implement card assets per decision from task 0.3 — 52 card faces + card back, optimized for web (SVG or compressed PNG sprite sheet). Save to `public/cards/`. Include multiple card back designs for future customization.
  - [ ] 3.2 Create `src/game/CardSprite.ts` — Phaser sprite wrapper: render card at position, flip animation, highlight states (valid target, selected), z-index management for overlapping cascades
  - [ ] 3.3 Implement drag-and-drop in FreeCellScene — on drag start: validate card is top of cascade or in free cell; on drag: move sprite with pointer (0-latency pickup); on drop: check if target is valid via engine, animate to position or snap back
  - [ ] 3.4 Implement sequence-aware drag — when dragging a card that's part of a valid run, visually pick up the entire sub-stack; if dropped on valid target, engine executes intermediate moves with sequential animations
  - [ ] 3.5 Create `src/game/animations.ts` — deal animation (cards fly to cascades with stagger delay), move animation (card slides to target, ~150ms ease), auto-move animation (card arcs to foundation), win celebration (cards cascade/bounce off screen)
  - [ ] 3.6 Implement responsive layout system — calculate card sizes and positions based on viewport. Three modes: Normal (desktop), Wide (tablet landscape), Compact (mobile portrait). Recalculate on resize.
  - [ ] 3.7 Ensure locked 60fps — profile with Chrome DevTools, avoid layout thrash, use Phaser tweens (not CSS transitions), batch sprite updates
  - [ ] 3.8 Add click-to-move as alternative to drag — tap a card to select it, tap a valid destination to move. Mobile-friendly fallback.
  - [ ] 3.9 Write tests for CardSprite and animation utilities
  - [ ] 3.10 Create an animation queue/manager in FreeCellScene to execute a series of moves sequentially (needed for sequence moves and auto-finish)
  - [ ] 3.11 Implement keyboard controls for game interaction: arrow keys to navigate cascades/cells, Enter to pick up/place card, Esc to cancel selection
  - [ ] 3.12 Implement a loading screen/skeleton displayed while Phaser assets and WASM module initialize

- [ ] 4.0 Player Controls, Solver & Stats
  - [ ] 4.1 Create `src/engine/MoveHistory.ts` — stack-based undo/redo system. Each entry stores: move type, source, destination, cards moved, any auto-moves triggered. Support unlimited undo.
  - [ ] 4.2 Write tests for MoveHistory — undo single move, undo sequence move (reverses all intermediate), redo, undo past auto-moves, empty stack behavior
  - [ ] 4.3 Research and compile fc-solve C library to WebAssembly using Emscripten. Create `src/solver/solver.ts` as async wrapper — `initSolver()`, `getHint(gameState): Move`, `isWinnable(gameState): boolean`
  - [ ] 4.4 Test solver integration — verify hints return legal moves, winnable check matches known solvable/unsolvable deal numbers
  - [ ] 4.5 Implement "Winnable Only" toggle — before dealing, run solver on generated deal; if unsolvable, increment seed and retry (cap at N attempts, then deal anyway with warning)
  - [ ] 4.6 Implement auto-finish — when solver confirms remaining position is trivially winnable (all cards in sequence on cascades), animate all cards moving to foundations automatically
  - [ ] 4.7 Create `src/lib/stats.ts` — track per-session and all-time stats: games played, games won, win %, current streak, longest streak, best time, average time, least moves
  - [ ] 4.8 Create `src/lib/storage.ts` — LocalStorage wrapper: save/load stats, settings, and in-progress game state (auto-save after each move for resume on page reload)
  - [ ] 4.9 Write tests for stats calculations and storage persistence

- [ ] 5.0 UI Shell, SEO & Monetization Foundation
  - [ ] 5.1 Create `src/components/GameShell.tsx` — React component that dynamically imports Phaser game (`next/dynamic`, `ssr: false`), handles mounting/unmounting, and bridges React state ↔ Phaser events (via custom event emitter or shared ref)
  - [ ] 5.2 Create `src/components/TopBar.tsx` — control strip: New Game, Undo, Redo, Hint, Auto-finish, Settings gear. Compact, non-intrusive. Disabled states when actions unavailable.
  - [ ] 5.3 Create `src/components/NewGameModal.tsx` — options: Random deal, Winnable only (toggle), Enter game number (input), view mode selector. Start button.
  - [ ] 5.4 Create `src/components/StatsPanel.tsx` — slide-out or modal showing all tracked stats. Clean layout with key metrics prominent.
  - [ ] 5.5 Create `src/components/SettingsModal.tsx` — sound on/off, animation speed, view mode (Normal/Wide/Compact), auto-move toggle, card back selection (future)
  - [ ] 5.6 Build homepage `src/app/page.tsx` — game embedded above the fold, SEO content below: brief intro ("Play FreeCell Online for Free — no download, no signup"), rules summary, internal links to content pages
  - [ ] 5.7 Create `src/app/how-to-play/page.tsx` — comprehensive FreeCell rules with diagrams/screenshots. Target "how to play freecell" keyword. HowTo schema markup.
  - [ ] 5.8 Create `src/app/strategy/page.tsx` — FreeCell strategy guide. Target long-tail keywords ("freecell strategy tips", "freecell winning strategy").
  - [ ] 5.9 Create `src/app/faq/page.tsx` — structured FAQ with JSON-LD schema. Questions: "Is every FreeCell game winnable?", "What are free cells?", "How is FreeCell scored?", etc.
  - [ ] 5.10 Configure meta tags, Open Graph image, canonical URLs, and `robots.txt` in layout and per-page
  - [ ] 5.11 Generate `public/sitemap.xml` (static for now, dynamic later)
  - [ ] 5.12 Create `src/components/AdSlot.tsx` — reusable component for ad placements. Props: position (sidebar, footer, interstitial), size. Lazy-loaded to not block game rendering.
  - [ ] 5.13 Integrate Google AdSense — sidebar banners flanking game board (desktop), footer banner (mobile), interstitial between games (post-win only). Verify ads don't degrade performance.
  - [ ] 5.14 Write tests for React components (GameShell mount/unmount, TopBar button states, NewGameModal form)
  - [ ] 5.15 Add ARIA labels and roles to all interactive UI elements (buttons, modals, controls). Ensure all non-game UI is keyboard-navigable.
  - [ ] 5.16 (CONTENT) Write and populate the actual content for `/how-to-play`, `/strategy`, and `/faq` pages — not just page shells

- [ ] 6.0 Authentication & Cross-Device Sync
  - [ ] 6.1 Set up Supabase project — create tables: `profiles` (user_id, display_name, created_at), `game_stats` (user_id, games_played, games_won, best_time, avg_time, current_streak, longest_streak), `saved_games` (user_id, game_number, state_json, updated_at)
  - [ ] 6.2 Create `src/lib/supabase.ts` — initialize Supabase client with env vars (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
  - [ ] 6.3 Create `src/lib/auth.ts` — `signInWithGoogle()`, `signInWithApple()`, `signOut()`, `getSession()`, `onAuthStateChange()` wrapper
  - [ ] 6.4 Add login/signup UI — subtle "Sign in to save progress" prompt (not blocking). Google and Apple OAuth buttons. Show user avatar/name when logged in.
  - [ ] 6.5 Create `src/lib/sync.ts` — on login: merge LocalStorage stats with server stats (take higher values for bests, sum for totals). On each game completion: write to both local and server. On load: prefer server if logged in, fallback to local.
  - [ ] 6.6 Implement saved game sync — if user closes browser mid-game and reopens on another device, resume from saved state
  - [ ] 6.7 Write tests for auth flow, sync merge logic (conflict resolution), and saved game persistence

- [ ] 7.0 Legal & Compliance
  - [ ] 7.1 Create `/privacy` and `/terms` pages in Next.js with proper legal content (Privacy Policy covering analytics, ads, Supabase data; Terms of Service)
  - [ ] 7.2 Integrate cookie consent banner (e.g., `react-cookie-consent`) that blocks analytics/ad scripts until user consents (GDPR compliance)
  - [ ] 7.3 Add links to Privacy Policy and Terms in site footer on all pages

- [ ] 8.0 Analytics & Monitoring
  - [ ] 8.1 Set up Google Analytics 4 property for playfreecellonline.com
  - [ ] 8.2 Create `src/lib/analytics.ts` — wrapper service for GA4 event tracking, respecting cookie consent state
  - [ ] 8.3 Implement tracking for core game events: `game_start` (game_number, is_winnable), `game_win` (time_seconds, moves, used_hints, used_undo), `game_lose`, `hint_used`, `undo_used`, `daily_challenge_started`
  - [ ] 8.4 Set up Sentry.io (free tier) for runtime error monitoring — integrate SDK into `next.config.js`, configure source maps upload for production builds
