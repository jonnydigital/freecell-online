# FreeCell Online — Changelog

## 2026-03-17 (Tuesday Overnight Build)
### Shipped
- **🔀 www→non-www Redirect Middleware** (`src/middleware.ts`) — Next.js middleware implementing 301 permanent redirect from `www.playfreecellonline.com` → `playfreecellonline.com`. Prevents page authority dilution caused by Google indexing both www and non-www homepage variants (detected in 03-15 research via `site:playfreecellonline.com`). Preserves full path and query string. Matcher config excludes `_next/static`, `_next/image`, API routes, and static assets for performance. Only triggers when host starts with `www.` — naturally skips localhost/dev. (Spark #30 from 03-15 research)
- **🎯 Wordle-Style Daily Challenge Share Card** (`src/components/ShareResultCard.tsx`) — Beautiful, screenshot-friendly visual results card displayed in the WinScreen after completing a daily challenge. Dark green felt background (#0a3d0a) matching site theme, daily seed number with 🃏 icon, formatted date header, 3-column stats grid (time/moves/hints), emoji performance grid with speed/moves/hints labels (🟩🟨🟥 tiers), 4 suit completion indicators (♠♥♦♣) in green blocks, streak badge for 2+ day streaks, site URL footer. framer-motion entrance animation (scale + fade). "Screenshot this card to share!" hint text below. Inspired by Wordle's viral sharing mechanic (Spark #29 from r/DailySolitaire community research). 138 lines.
- **📱 Daily Challenge Share Landing Page** (`/daily-freecell/share/[date]`) — Dynamic share destination page + OG image endpoint for daily challenge results. Server component with full OG metadata (title, description, dynamic OG image), daily challenge info for any date, suit completion indicators, CTA to play today's challenge. Edge-runtime OG image generation with green felt gradient, daily challenge badge, seed number, formatted date, suit card row, gold accents. Makes shared daily challenge links render beautifully on social media (Twitter Cards, Facebook, iMessage previews). 2 files, 321 lines.
- **WinScreen Enhancement** — Integrated ShareResultCard into WinScreen.tsx, displaying above the stats grid when `isDailyGame` is true. 5 files changed, 506 insertions. (31st consecutive night of shipping)

## 2026-03-16 (Monday Overnight Build)
### Shipped
- **🖥️ Microsoft FreeCell Online page** (`/microsoft-freecell`) — Dedicated SEO content page targeting the "Microsoft FreeCell" keyword that newly appeared in Google's related searches. 669 lines covering: the Windows FreeCell story (Windows 3.1 → XP → Windows 10 Solitaire Collection), deal number compatibility (same PRNG algorithm, games #1–32,000 identical), Game #11982 impossibility deep-dive with Internet FreeCell Project history, what made Microsoft FreeCell special (visible cards, numbered deals, frictionless access), 13-row feature comparison table (Windows FreeCell vs our version), getting started resource cards, 6-question FAQ targeting long-tail keywords. Article + BreadcrumbList + FAQPage JSON-LD schemas. 15 keyword targets. Extensive internal linking to /history, /game/1, /game/11982, /deals, /solver, /daily-freecell, /achievements, /freecell-variants, /tips, /strategy. AdUnit placements + NetworkCrossLinks. Added to sitemap (priority 0.8) and SiteFooter Explore column. 5 files changed, 1033 insertions. (30th consecutive night of shipping)

## 2026-03-15 (Sunday Overnight Build)
### Shipped
- **🎯 FreeCell Variants Hub Page** (`/freecell-variants`) — Comprehensive index page cataloging all 9+ FreeCell variants and game modes. Organized into Classic Modes (FreeCell, Baker's Game, Eight Off), Difficulty Variants (Easy, 3-Cell, 2-Cell, 1-Cell), Competitive Modes (Daily, Streak, Storm), and Other Solitaire Games (Spider, Klondike). Full difficulty comparison table with free cell counts, stacking rules, solvability rates, and difficulty ratings. 5-question FAQ covering easiest/hardest variants, FreeCell vs Baker's Game differences, and solvability. Article + BreadcrumbList + FAQPage JSON-LD. Targets "freecell variants", "types of freecell", "freecell game variations" keywords. Added to sitemap and SiteFooter Explore column. 429 lines, 4 files. (28th consecutive night of shipping)
- **🔗 Cell Variant Footer Links** — Added 1-Cell, 2-Cell, and 3-Cell FreeCell to SiteFooter Play column. Previously these 3 variant pages (226 lines each, full SEO metadata + Game schema) were only discoverable via the game picker dropdown and sitemap — now linked from every page footer for maximum crawlability at the critical post-domain-launch indexing window.

## 2026-03-14 (Saturday Overnight Build)
### Shipped
- **🔲 Large Cards Mode — All Game Modes + SEO Page** — Extended the Large Cards accessibility feature from FreeCell-only to all three game modes. KlondikeScene now scales cards by 1.3x and SpiderScene by 1.2x (smaller due to 10 columns) when Large Cards is toggled in Settings > Accessibility. Both scenes now listen for `updateSettings` events and instantly rebuild layout, board, and card sprites when toggled — no page reload needed. New `/large-cards` SEO content page (472 lines) targeting "large cards freecell", "large cards solitaire", "big cards freecell" keywords — covers accessibility benefits, how to enable, audience-specific tips (seniors, low-vision, tablet users), 5-question FAQPage schema. Article + BreadcrumbList + FAQPage JSON-LD. Cross-linked from `/freecell-for-seniors`. Added to sitemap and SiteFooter Learn column. Competitive response to solitaires-online.com entering SERP top 10 with "Large Cards" as their primary differentiator. 6 files changed, 518 lines. (27th consecutive night of shipping)

## 2026-03-13 (Friday Overnight Build)
### Shipped
- **🔗 SEO Internal Link Infrastructure** — Added 12 orphaned content pages to SiteFooter navigation. Learn section gained 6 links: FreeCell Rules, Cheat Sheet, Beginner Guide, FreeCell for Seniors, Hints Explained, Probability & Math. Explore section gained 6 links: FreeCell vs Klondike, Hard FreeCell Games, Easy FreeCell Games, Famous Deals, World Records, Is Every Game Winnable? Previously, 10+ substantial content pages (400-850 lines each) were only discoverable via sitemap or cross-links — now every content page has footer visibility for maximum crawlability and internal link equity at domain launch. Also fixed pre-existing build break (missing `zustand` dependency for lab/dom-freecell). 2 files changed. (26th consecutive night of shipping)

## 2026-03-12 (Thursday Evening Build)
### Shipped
- **🔀 Klondike Draw 1 vs Draw 3 Comparison** (`/klondike/draw-1-vs-draw-3`) — 811-line SEO content page comparing the two Klondike drawing modes. Win rate deep dive (79-82% Draw 1 vs 10-30% Draw 3), 9-metric comparison table, strategy differences (stock cycling, card access, foundation pacing, empty column value), advanced Draw 3 stock manipulation technique, "Which mode should YOU play?" skill-based decision guide, history and origins. 5-question FAQ. Article + BreadcrumbList + FAQPage JSON-LD. Cross-linked to all Klondike pages + /solitaire-types. Added to sitemap and SiteFooter Learn column. Cross-link added to strategy page. Klondike section now has 6 pages. (25th consecutive night of shipping)

## 2026-03-12 (Thursday Overnight Build)
### Shipped
- **♟️ Klondike Solitaire Strategy Guide** (`/klondike/strategy`) — Comprehensive SEO content page targeting high-volume "solitaire strategy" and "how to win solitaire" keywords. 7 proven strategies: foundation timing (aces/twos always, higher cards conditionally), face-down card exposure priority, Kings-only column rule, draw-1 vs draw-3 odds with comparison table (52% vs 18% AI win rates, skilled human ~43%), foundation safety test, even column distribution, systematic stock pile management. Advanced section: card tracking in stock pile, "Thoughtful Solitaire" approach (81.9% draw-3 win rate when all cards visible). Persi Diaconis quote on Klondike odds being "one of the embarrassments of applied probability." Color-coded tip boxes (green/amber/red), 4-question FAQ. Article + BreadcrumbList + FAQPage JSON-LD schemas. AdUnit placements. Cross-linked to 8+ internal pages. Added to sitemap and SiteFooter Learn column. Strategy CTA added to klondike/how-to-play page. 709 lines, 4 files. (24th consecutive night of shipping)

## 2026-03-11 (Wednesday)
### Shipped
- **🎉 Klondike Polish** — Variant-aware stats (separate `klondike_stats` localStorage key), React timer fallback for win time, bouncing card win celebration with colored trails and confetti (ported from FreeCellScene), Stats page FreeCell/Klondike toggle with history filtered by variant, game history variant field. 5 files, 268 lines.
- **🔍 Phase 1 Search-Surface Expansion** — Massive SEO upgrade: extracted `curatedDeals.ts` as single source of truth, unified sitemap + generateStaticParams for ~98 game URLs, enriched `/game/[number]` with Game + BreadcrumbList schema + curated metadata + below-game content, new `/famous-freecell-deals` landing page (424 lines), new `/freecell-game-11982` dedicated page (484 lines), added beginner/expert deal grids to easy/hard pages, WebSite schema on homepage, Game schema on Baker's Game / Eight Off / Spider, targeted internal links across 5+ existing content pages, fixed unsolvable deal numbers. 17 files, 1,808 lines.
- **🃏♠️ Klondike Solitaire — Full Playable Game** (`/klondike`) — Complete Klondike Solitaire game built from scratch. KlondikeEngine (470 lines): 7 tableau piles, 4 foundations, stock/waste, Draw 1 and Draw 3 modes, full undo system, hint solver, auto-complete detection. KlondikeScene (1,310 lines): Phaser 3 scene with drag-and-drop, touch support, double-tap to foundation, card flip animations, stock cycling. Page includes Draw 1/Draw 3 toggle, SEO content, WebApplication JSON-LD. Integrated into GameBridge, PhaserConfig, HomeOverlay game menu, Footer, and Sitemap. MS-compatible PRNG dealing. 12 files, 2,111 lines. (23rd consecutive night of shipping)
- **🃏 Klondike Solitaire: How to Play** (`/klondike/how-to-play`) — Seeds the entire Klondike content cluster. Targets massive-volume keywords ("how to play solitaire", "klondike rules", "solitaire rules"). Covers naming history (Klondike = "Solitaire"), tableau setup with ASCII diagram, full gameplay rules, Draw 1 vs Draw 3 comparison, Vegas rules, standard + Vegas scoring tables, Klondike vs FreeCell comparison (7 dimensions), 5 beginner tips, 4-question FAQ. Article + BreadcrumbList + FAQPage JSON-LD. Cross-linked to 6+ internal pages. Added to sitemap and footer. 543 lines, 3 files. (22nd consecutive night of shipping)
- **🕷️ Spider Solitaire Tips & Tricks page** (`/spider/tips`) — SEO content page targeting "spider solitaire tips" (higher search volume than FreeCell). 7 practical tips covering empty columns, building in suit, uncovering hidden cards, delaying deals, sequence thinking, suit focus, and undo use. Difficulty-specific tips for 1-suit, 2-suit, and 4-suit. Win rate expectations table. Quick reference cheat sheet. 4-question FAQ with FAQPage schema, Article + BreadcrumbList JSON-LD. Cross-linked to 4 Spider pages + FreeCell vs Spider comparison. Added to sitemap, footer, and strategy page related links. 727 lines, 4 files changed. (21st consecutive night of shipping)
- **📝 FreeCell Mistakes to Avoid page** (`/freecell-mistakes-to-avoid`) — Comprehensive SEO content page covering the 8 most common FreeCell mistakes that cost players games. Covers: moving aces too early, filling free cells too quickly (with supermove formula breakdown), ignoring empty columns, not planning ahead, tunnel vision on one column, neglecting buried low cards, making purposeless moves, and giving up too soon. Includes Adrian Ettlinger's expert strategy quote, practical "the instinct vs the real cost" framing, supermove math table ((N+1)×2^M), 5-question FAQPage schema, Article + BreadcrumbList JSON-LD. Cross-linked to 10+ internal pages. Added to sitemap and SiteFooter Learn section. Targets "freecell mistakes", "why do I keep losing freecell", "freecell beginner mistakes" keywords. 542 lines, 3 files changed. (20th consecutive night of shipping)

## 2026-03-10 (Tuesday Overnight Build)
### Shipped
- **🐛 Fix: Mobile gold rectangle** — The idle auto-hint glow (gold border around suggested card) was triggering after 8 seconds even on fresh game load before any user moves. At 390px mobile viewport, this looked like a rendering bug — a faint gold-bordered rectangle near the bottom-right of the card area. Fixed by gating all auto-hint effects (glow, wiggle, text hint) behind `moveCount > 0`. Also added `focus-visible: none` on `#game-container` to prevent browser focus outlines on the canvas wrapper. 2 files changed, 8 lines. (19th consecutive night of shipping)
- **🌱 Easy FreeCell game mode** (`/easy-freecell`) — New beginner-friendly variant where all Aces and 2s start pre-placed on the foundation piles. Removes 8 cards from the tableau before the first move, giving players significantly more breathing room to learn FreeCell strategy. Same alternating-color stacking rules as standard FreeCell. Added to game menu (HomeOverlay with Sprout icon), site footer, hub home, and sitemap.xml. SEO-optimized page with 1000+ word article, 4-question FAQPage schema, breadcrumb JSON-LD. Cross-linked from existing `/easy-freecell-games` content page (CTA now points to playable game). Competitive response to Solitaired's Easy FreeCell variant. Also fixed `dealCards()` to properly render pre-placed foundation and free-cell card sprites on initial deal. 14 files changed, ~1975 lines. (18th consecutive night of shipping)

## 2026-03-09 (Monday Overnight Build)
### Shipped
- **☕ Relaxed Mode** — Elderly-friendly, pressure-free gameplay option in Settings > Accessibility. Hides the timer display on both desktop (replaced with Coffee icon + gold "Relaxed" label) and mobile (replaced with ☕ emoji). Timer continues running internally for stats tracking — move count remains visible. Gold info banner confirms mode when active ("Timer hidden • No time pressure • Just play"). SettingToggle component enhanced with optional icon support. Validated by Reddit r/balatro research (elderly grandfather who plays FreeCell with shaky hands, no need for timer pressure). 43 lines across 3 files. (17th consecutive night of shipping)

## 2026-03-08 (Sunday Overnight Build)
### Shipped
- **📅 Daily Challenge Calendar page** (`/daily-freecell/calendar`) — Interactive monthly calendar showing daily challenge completion history. Streak stats section (current streak, longest streak, total completed, monthly completion rate) with animated counters. Gold-highlighted completed days with time/moves hover tooltips. Click any past day to replay that daily challenge. Monthly stats panel (best time, avg moves, perfect days). framer-motion animations throughout. BreadcrumbList JSON-LD. AdUnit placements. Added calendar link to daily-freecell hero, SiteFooter Play column, and sitemap. 470 lines across 5 files. (16th consecutive night of shipping)
- **⌨️ Keyboard shortcut system** — Full keyboard controls for power users. 1-8 selects cascade columns, A/S/D/F selects free cells, Q/W/E/R targets foundations, Z undo, H hint, N new game, Escape deselect. Help overlay via `?` key showing all shortcuts. Column number labels (togglable in Settings). Visual highlight on keyboard-selected cards. Added keyboard shortcut section to FAQ and how-to-play pages. 334 lines across 8 files. (15th consecutive night of shipping)

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

## 2026-03-08 (Night 17)

### Added
- **Suit completion celebration** — unique ascending arpeggio sound + 40-particle burst (2.7x normal) when all 13 cards of a suit reach the foundation
- Screen reader announcement for suit completion ("Hearts suit complete!")
- Works across all paths: manual moves, auto-moves, and auto-finish
- Smart skip: doesn't play on 4th suit (win fanfare takes over)
