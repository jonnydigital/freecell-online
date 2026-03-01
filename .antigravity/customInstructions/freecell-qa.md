---
name: FreeCell QA
description: Run the full QA test suite for FreeCell Online
activation:
  - "run QA"
  - "test freecell"
  - "QA the game"
  - "playtest"
  - "test the site"
---

# FreeCell Online — QA Test Suite

You are testing a FreeCell solitaire card game at **http://localhost:3000**.
Built with Next.js 14 + Phaser 3.87. The game renders on a `<canvas>` element.

## Test Bridge API

The game exposes `window.__FREECELL_TEST` in dev mode with these methods:

| Method | Returns | Purpose |
|--------|---------|---------|
| `getGameState()` | Game state object | Cascades, free cells, foundations, move count, isWon |
| `getCardPositions()` | Array of card positions | Page coordinates for every card sprite |
| `getClickableCards()` | Array of clickable cards | Bottom-of-cascade + free cell cards with page coords |
| `getCanvasBounds()` | DOMRect | Canvas position/size on page |
| `newGame(seed?)` | void | Start new game (optional specific seed) |
| `undo()` | void | Undo last move |
| `autoFinish()` | void | Auto-complete to foundations |
| `getStats()` | Stats object | Player statistics from localStorage |
| `healthCheck()` | Status object | Scene active, engine loaded, canvas present |

### Using the Bridge

```javascript
// In browser console or via execute_browser_javascript:
const state = window.__FREECELL_TEST.getGameState();
const clickable = window.__FREECELL_TEST.getClickableCards();
const bounds = window.__FREECELL_TEST.getCanvasBounds();
```

## Pre-Flight

1. Ensure dev server is running: `npm run dev` in terminal
2. Open browser to http://localhost:3000
3. Wait for game to load (canvas should be visible)
4. Run: `window.__FREECELL_TEST.healthCheck()` — verify all fields are true
5. Take initial screenshot

## Test Suite

### T1: Page Load & First Impressions
- Navigate to http://localhost:3000
- Screenshot the landing page
- **Evaluate**: Would a new visitor understand what this is? Is it inviting?
- Check console for errors/warnings
- Verify page title and meta description are present

### T2: Game State Verification
- Run `window.__FREECELL_TEST.getGameState()`
- Verify: 8 cascades with 52 total cards, 4 empty free cells, 4 empty foundations
- Verify: moveCount is 0, isWon is false

### T3: Card Interaction — Single Tap
- Get clickable cards: `window.__FREECELL_TEST.getClickableCards()`
- Click a bottom-of-cascade card (use pageX/pageY coordinates)
- Verify the card moves (to foundation, another cascade, or free cell)
- Check game state updated (moveCount increased)
- Screenshot after move

### T4: Card Interaction — Drag and Drop
- Get a card position from `window.__FREECELL_TEST.getCardPositions()`
- Drag it to a valid destination
- Verify state change
- Screenshot

### T5: Free Cell Usage
- Click a card to move it to a free cell
- Verify free cell is now occupied in game state
- Click the free cell card to move it back
- Verify free cell is empty again

### T6: Undo
- Note current state
- Make a move
- Run `window.__FREECELL_TEST.undo()`
- Verify state reverted to previous

### T7: New Game
- Run `window.__FREECELL_TEST.newGame(12345)`
- Verify gameNumber is 12345
- Verify fresh deal (moveCount 0)
- Screenshot

### T8: Console Error Sweep
- Navigate through all pages, capture console logs on each:
  - http://localhost:3000/
  - http://localhost:3000/how-to-play
  - http://localhost:3000/strategy
  - http://localhost:3000/glossary
  - http://localhost:3000/history
  - http://localhost:3000/solitaire-types
  - http://localhost:3000/tips
  - http://localhost:3000/winning-deals
  - http://localhost:3000/faq
  - http://localhost:3000/game/12345
- Report ALL errors and warnings

### T9: Content Page Audit
For each content page above:
- Screenshot at desktop width
- Check: headings hierarchy (single H1, logical H2/H3)
- Check: internal links work (click a few)
- Check: no broken images or missing content
- Check: readable typography, good spacing
- Rate content quality 1-10

### T10: Responsive Design
- Resize browser to 375px width (mobile)
- Navigate to home/game page — screenshot
- Navigate to 2-3 content pages — screenshot
- Check: no horizontal overflow, readable text, tappable nav
- Resize to 768px (tablet) — screenshot game page
- Report layout issues

### T11: Navigation Flow
- Test all nav links from every page
- Verify no 404s
- Check back button behavior
- Test the game number input (if present)

### T12: Share Button
- Play until a win (or use autoFinish if available)
- Test the share button
- Verify share text includes game number and move count

### T13: Daily Challenge
- Check if daily challenge is prominent
- Verify it loads a specific game number
- Check streak tracking

### T14: SEO Spot Check
For each page, run JS to extract:
```javascript
({
  title: document.title,
  metaDesc: document.querySelector('meta[name="description"]')?.content,
  h1: document.querySelector('h1')?.textContent,
  canonical: document.querySelector('link[rel="canonical"]')?.href,
  ogTitle: document.querySelector('meta[property="og:title"]')?.content,
  jsonLd: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => JSON.parse(s.textContent))
})
```
Report missing or weak meta tags.

### T15: Performance Quick Check
Run in console:
```javascript
const nav = performance.getEntriesByType('navigation')[0];
({ domContentLoaded: nav.domContentLoadedEventEnd, loadComplete: nav.loadEventEnd, transferSize: nav.transferSize })
```
Report load times.

## Output

Create `docs/PLAYTEST_REPORT.md` with:

1. **Executive Summary** — Top 5 issues, overall site grade (A-F)
2. **Test Results Table** — T1-T15, PASS/FAIL/WARN, notes
3. **Content Audit** — Per-page quality scores and issues
4. **Game UX Findings** — From actual play interaction
5. **Mobile Issues** — Screenshots and descriptions
6. **Console Errors** — Complete list
7. **SEO Audit** — Missing tags, weak descriptions, schema issues
8. **Engagement Gaps** — What's missing vs competitors
9. **Priority Action Items** — Ranked by impact × effort, with estimated difficulty (S/M/L)

**Be brutally honest.** We want to be the best FreeCell site on the internet.

**DO NOT auto-fix issues.** Document everything in the report. Fixes require human approval.
