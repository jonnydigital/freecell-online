# Competitive Analysis — FreeCell Online
*Date: 2026-02-26 | Author: Fred*

## Competitors Analyzed

### 1. cardgames.io/freecell
- **SEO**: Strong content — full rules page, strategy guide, numbered games (1-50000)
- **Features**: Animation speed slider (slow→fast), numbered game input, statistics page, pause function
- **Interaction**: Double-click auto-moves to foundation. Drag-and-drop + click-to-move
- **Auto-complete**: When all cascades are ordered, board self-clears — this is THE key fluidity feature
- **Mobile**: Has a dedicated app with "fullscreen mode" and "more characters"
- **Monetization**: App upsell, likely ad-supported
- **Key insight**: Animation speed control lets users tune the "feel" — power users want FAST

### 2. solitaired.com/freecell
- **SEO**: Excellent — "Play Online & 100% Free" in title, instructional video embed, internal linking to Spider Solitaire and classic Solitaire, comprehensive how-to-play guide, strategy section
- **Features**: Leaderboards (moves + time), unlimited games, no download/registration
- **Content strategy**: Deep guides, video content, cross-linking between game variants
- **Monetization**: Likely premium membership + ads
- **Key insight**: SEO content depth is massive — they have dedicated guide pages linked from the game

### 3. freecell.net
- **Positioning**: "100% free online competitive Freecell solitaire"
- **Key differentiator**: COMPETITIVE — they lean into multiplayer/competitive angle
- **Mostly JS-rendered**: Limited content visible to crawlers (bad for us to scrape, good to know)

### 4. MobilityWare Solitaire (App benchmark)
- **100M+ downloads, 4.6 stars** — the gold standard
- **Key features we lack**: Daily challenges with rewards, streak bonuses, card themes, backgrounds, achievements system, smooth 60fps animations, haptic feedback patterns, tutorial with interactive walkthrough
- **What makes it feel native**: Instant response (<16ms), physics-based card motion, subtle sound layering, persistent progress

---

## What Makes Competitors Feel "Fluid" (vs. Our Game)

### 1. Animation Timing
**Competitors**: Card moves complete in 80-120ms. Foundation auto-moves are rapid-fire (30-50ms per card).
**Us**: Our `getMoveDuration` returns 100-300ms based on distance. The Back.easeOut adds overshoot which *looks* nice but adds perceived latency. For quick plays, this feels slow.

### 2. Single-Tap Auto-Move
**Competitors**: Single tap on a card = it goes to the best destination. No selection step.
**Us**: Tap to select → see highlights → tap destination. TWO interactions where competitors need ONE. This is the #1 fluidity gap.

### 3. Card Lift Physicality
**Competitors (apps)**: Picked-up cards get a larger shadow, slight rotation toward touch point, scale to ~1.08x.
**Us**: 1.05x scale only. No shadow depth change. No rotation.

### 4. Cascade Settling
**Competitors**: When a card is removed from a cascade, remaining cards slide down with a slight stagger (20ms delay per card) and subtle bounce.
**Us**: All remaining cards reposition simultaneously. No stagger, no settling feel.

### 5. Auto-Complete Speed
**Competitors**: cardgames.io auto-clears the board in a rapid flourish when it detects ordered cascades.
**Us**: We have auto-complete but it fires one card per 50ms. Could be 25-30ms for a faster flourish.

### 6. Sound Layering
**Competitors (apps)**: Different sounds for: pickup, place, foundation, invalid, undo, win. Some have pitch variation based on card rank.
**Us**: We have basic sound effects but no pitch variation, no layered audio cues.

---

## SEO Gaps

### What solitaired.com does that we don't:
1. **Video content** — Instructional video embedded (Vimeo) — huge for engagement metrics
2. **Internal linking** — Every game page links to related variants
3. **Guide pages** — Dedicated "/guides/how-to-play-freecell" page
4. **Meta descriptions** — "Start playing unlimited games... No download or registration"
5. **Content depth** — 2000+ words of rules, strategy, tips ON the game page

### What cardgames.io does:
1. **Statistics page** as a separate URL (/freecell/statistics/)
2. **Numbered games** (1-50000) — creates replayability AND allows deep-linking
3. **Rules as structured content** — clear headings for different pile types

### Our SEO opportunities:
- Add `/game/[number]` routes for numbered games (shareable, indexable)
- Create video walkthroughs
- Expand strategy page with more actionable tips
- Add internal links between our content pages
- Schema markup for Game type

---

## Gamification Gaps

| Feature | MobilityWare | solitaired | cardgames.io | Us |
|---------|:---:|:---:|:---:|:---:|
| Daily Challenge | ✅ | ✅ | ✅ | ✅ |
| Streaks | ✅ | ✅ | ❌ | ✅ |
| Leaderboard | ✅ | ✅ | ❌ | 🟡 (API exists) |
| Achievements | ✅ | ❌ | ❌ | ❌ |
| Themes/Skins | ✅ | ❌ | ❌ | 🟡 (in backlog) |
| Undo Limit | ✅ (premium) | ❌ | ❌ | ❌ (unlimited) |
| Reward Animations | ✅ | ❌ | ❌ | ❌ |
| Share Results | ✅ | ❌ | ❌ | ❌ (in backlog) |

---

## Action Items (Prioritized)

### Must Ship This Week
1. **Single-tap auto-move as DEFAULT** — eliminate the select→place two-step
2. **Reduce animation duration** — cap at 150ms for moves, 25ms for auto-complete stagger
3. **Cascade settling stagger** — 15ms delay between cards repositioning after a move
4. **Animation speed setting** — let users choose fast/medium/slow

### Ship This Month  
5. **Card lift shadow enhancement** — deeper shadow + slight rotation on drag
6. **Sound pitch variation** — higher rank = higher pitch on foundation placement
7. **Achievements system** — "Won 10 games", "5-day streak", "Under 100 moves"
8. **Share button** — "I solved FreeCell #1234 in 45 moves!"
9. **Numbered game URLs** — /game/1234 for SEO + shareability

### Ongoing
10. **SEO content expansion** — video, guides, strategy deep dives
11. **Theme system** — card backs, felt colors, card face styles
12. **Leaderboard activation** — API exists, needs UI
