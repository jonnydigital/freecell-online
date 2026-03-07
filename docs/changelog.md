# FreeCell Online — Changelog

## 2026-03-07 (Saturday Overnight Build)
### Shipped
- **🧠 FreeCell Solver page** (`/solver`) — Interactive solver widget + 2000+ word SEO content page. Users enter a game number (1-1,000,000) and watch the solver find a solution in real-time via web worker. Shows move count, solve time, step-by-step solution with move descriptions. Handles unsolvable deals gracefully with info about the 8 known impossible deals. Rich content covers: how solvers work (DFS + heuristics), mathematics of FreeCell (52! permutations, 99.999% solvability), solver algorithms compared (DFS/BFS/A*/IDA*), famous unsolvable deals with game links, using solvers to improve play. 8-question FAQPage schema JSON-LD. AdUnit placements between sections. Cross-links to /statistics, /strategy, /tips, /deals, /game/11982, /history. Added to SiteFooter Explore column and sitemap. Targets "freecell solver", "freecell solution finder" keywords. (839 lines across page.tsx + SolverWidget.tsx)
- **🔍 Deal Explorer page** (`/deals`) — Browsable interface for discovering FreeCell game numbers. Search/jump-to-game input (1-1,000,000), 4 curated collections (Famous Deals with impossibles, Beginner Friendly, Expert Challenge, Community Favorites), Browse by Range with expandable grids (7 ranges covering 1-100k), Random Deal button, 5-question FAQ section. FAQPage schema JSON-LD. AdUnit placements between sections. Cross-links to /winning-deals, /statistics, /strategy. Targets "freecell game numbers", "freecell deals" keywords. Added to SiteFooter Explore column and sitemap.
- **🏷️ WebApplication JSON-LD structured data** — Added Schema.org WebApplication markup to root layout for rich search results. Includes GameApplication category, free pricing offer, platform info, and organization author. Applies site-wide for improved search appearance.

---

## 2026-03-06 (Friday Overnight Build)
### Shipped
- **📊 FreeCell Statistics & Win Rates page** (`/statistics`) — Comprehensive 2000+ word SEO content page targeting high-value keywords ("freecell win rate", "freecell statistics", "freecell solvability"). 8 content sections: solvability statistics (99.999% rate, all 8 known unsolvable deals with game links), average game statistics with win rate tiers and progress bars, difficulty tier breakdowns, solitaire comparison table (FreeCell vs Klondike vs Spider vs Baker's Game), mathematical analysis (deal permutations, supermove formula), famous game numbers (#11982, #1, #617), improving your win rate tips, and 8-question FAQ. Article + FAQPage schema.org JSON-LD for rich snippets. AdUnit placements between sections. Cross-links to 8+ internal pages. Added to sitemap and SiteFooter Learn column. Directly addresses keyword gaps identified in 03-01 research synthesis.

---

## 2026-03-05 (Thursday Overnight Build)
### Shipped
- **🖼️ Dynamic OG Images + Twitter Cards** — Every page now generates rich social preview images when shared on social media, Discord, Reddit, Telegram, etc. Default OG image (1200x630) features dark green felt gradient, 4 playing card icons, "FreeCell Online" title, gold accents, and domain branding. Dynamic per-game OG images for `/game/[number]` routes show "FreeCell Game #[number] — Can you solve this deal?" Added `summary_large_image` Twitter card metadata to root layout + 6 content pages. Added `metadataBase` for proper URL resolution. Previously, sharing any page showed no image preview — a major gap for social acquisition.

---

## 2026-03-04 (Wednesday Overnight Build)
### Shipped
- **🗺️ Dynamic Sitemap.xml** — Next.js App Router sitemap generation covering all 19 content pages + 24 notable game number routes (including famous deals like #11982). The `robots.txt` already referenced `/sitemap.xml` but it didn't exist — Google can now properly discover and index all our pages.
- **⚔️ FreeCell vs Spider Solitaire comparison page** (`/freecell-vs-spider`) — 1000+ line SEO content page targeting "freecell vs spider solitaire" and related comparison keywords. Includes side-by-side comparison table (10 attributes), detailed strategy analysis, difficulty breakdown with win rate stats, player-type recommendation panels, FAQPage schema JSON-LD (6 questions), and internal cross-links to 8 other pages. AdUnit placements between sections.
- **🎨 Card Shadow Depth Layering** — Cards deeper in cascades now have subtler shadows (0.04 alpha, 1px offset) while top cards get more pronounced shadows (0.18 alpha, 3px offset). Free cell and foundation cards use a flat minimal shadow. Creates a visual depth effect that makes card stacks feel like real overlapping cards rather than flat sprites.
- **⌨️ Keyboard Shortcuts (Desktop)** — Full keyboard control for power users: 1-8 for cascade columns, Q/W/E/R for free cells, H for hint, N for new game, Space for auto-move/finish, Esc to deselect, Ctrl+Z/Ctrl+Shift+Z for undo/redo. Shortcuts reference visible in Settings panel (desktop only). No competitor has this level of keyboard support.
- **✨ Smooth Resize Transitions** — Cards now animate to their new positions during window/orientation resize instead of snapping instantly. Completes the entire fluidity improvements list (12/12 shipped).
- **🎲 Eight Off Variant** (`/eight-off`) — New solitaire variant with 8 free cells (vs FreeCell's 4). 48 cards dealt to 8 cascades (6 each), 4 remaining cards start in free cells. Same-suit stacking (like Baker's Game). Engine supports dynamic free cell count, scene layout adapts top row for 12 slots (8 free cells + 4 foundations). Full SEO page with rules, strategy, and comparison content. Added to home overlay menu, sitemap, and site footer.
- **🐛 Fix GA4 Analytics (zero data for 8+ days!)** — The Analytics component was using Next.js Script children syntax which caused a timing issue with gtag.js initialization. Data was pushed to dataLayer but never sent to Google's servers. Fixed by switching to `dangerouslySetInnerHTML`, removing deprecated `page_path`, and adding explicit `send_page_view: true`. We've been flying blind since launch.
- **🕸️ Spider in Game Menu + Site-Wide Footer Nav** — Spider Solitaire now accessible from the HomeOverlay game mode grid (was playable at /spider but hidden from the menu). Added explore links row (Leaderboard, History, Glossary, Tips, Solitaire Types, Winning Deals). Created site-wide SiteFooter with 4-column navigation (Play/Learn/Explore/More) visible on all content pages — major SEO win for internal link equity across 20+ pages that were previously orphaned.

---

## 2026-03-03 (Tuesday Overnight Build)
### Shipped
- **👻 Ghost Mode** — Watch the AI solver play any deal from start to finish, mid-game. Ghost button (👻) added to desktop toolbar + Settings panel for mobile access. Uses separate solver instance running in a web worker so it doesn't block gameplay. Player's game state is saved and restored when exiting ghost mode. Ghost Mode replay shows a distinct 👻 header and simplified stats (just solver moves, no "Your moves" comparison). No competitor has this feature.
- **⚡ Instant Foundation Auto-Moves** — Foundation auto-moves now 80ms with 40ms stagger between cards (was 250-600ms). Creates a satisfying overlapping cascade effect during auto-moves and auto-finish.
- **🎵 Sound Pitch Variation** — Cards placed on foundation now play at varying pitch based on rank. Ace = 0.7x (low), King = 1.3x (high). Creates an ascending melody during auto-complete sequences.
- **🫨 Micro-Bounce on Invalid** — Invalid moves now trigger a horizontal shake (4 half-cycles, 152ms) in addition to the existing red flash and haptic feedback. More satisfying rejection feedback.

---

## 2026-03-02 (Monday Overnight Build)
### Shipped
- **🔴 P0 Fix: Mobile card rendering** — Cards were showing as blank dark green rectangles on mobile after any viewport resize (address bar toggle, orientation change). Root cause: `recreateAllCardSprites()` tried to use pre-loaded PNG card images that were never loaded, resulting in empty containers. Fixed by using the same procedural rendering (white base + rank text + suit icons + shadow) as the initial card creation. Game is now playable on mobile again.

---

## 2026-03-01 (Sunday Build)
### Shipped
- **SEO: Strategy page expansion** — Expanded from 103 lines to 800+ lines (~2500 words). 7 comprehensive sections: Three Laws, Beginner Fundamentals, Intermediate Tactics, Advanced Techniques, Common Mistakes, Practice Drills, FAQ. Article + FAQPage schema.org JSON-LD for rich snippets. Internal links to glossary, tips, streak, how-to-play, history, and numbered games. Table of contents navigation. AdUnit placements between sections.
- **Theme system** — 5 built-in felt themes (Classic Green, Royal Blue, Wine Red, Dark Mode, Slate). Theme picker in toolbar with color swatches. CSS variables bridge React↔Phaser. Persists to localStorage. Smooth transitions.
- **Fix:** Footer variant prop type error (pre-existing build break)

## 2026-03-01 (Overnight Build Cycle)
### Shipped
- **Streak milestone celebrations** — Animated toast notifications at win streak milestones (3, 5, 7, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 365). Each milestone has unique emoji, title, and motivational message. Spring animations with flame icons, auto-dismisses after 5s. Duolingo-inspired engagement mechanic.

---

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
