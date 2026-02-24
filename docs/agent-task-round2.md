# Agent Task Round 2: Council-Approved Features

## Context
FreeCell solitaire web app (Next.js 14 + Phaser 3.87). Just shipped mobile UX, analytics, feedback, and visual polish. Now implementing the highest-impact retention features identified by the AI council review.

## Priority 1: Daily Challenge System
- Generate a deterministic seed from today's date (e.g., hash of "2026-02-24" → game number)
- Add a "Daily Challenge" button/section on the main screen
- Calendar UI showing completed days with crown/checkmark icons
- Track daily challenge completion in LocalStorage
- Streak tracking: current streak, longest streak for daily challenges specifically
- Share button: "I solved today's FreeCell challenge in X moves / Y seconds!"

## Priority 2: Auto-Complete Detection
- After each move, check if all remaining cards in cascades are face-up AND in descending order within their columns
- When the game is mathematically solved (all cards exposed, no hidden cards), show a prominent "Auto-Finish" button
- Clicking auto-finish animates all remaining cards flying to foundations rapidly (50ms stagger per card)
- Count these as moves but don't penalize the player's score

## Priority 3: Bottom Navigation Bar (Mobile)
- On mobile (< 768px), move Undo, Redo, Hint, New Game to a sticky bottom bar
- Top bar on mobile: only show Timer, Move count, Game number
- Bottom bar: large touch-friendly buttons with proper icons (use Lucide React icons, not emojis)
- Desktop: keep current top bar layout but also replace emojis with Lucide icons

## Priority 4: Smart Double-Tap
- Double-tap a card: auto-move to foundation if legal, else to best available free cell or cascade
- Priority order: Foundation > empty cascade (if strategic) > compatible cascade > free cell
- Visual feedback: brief highlight on the card before it moves
- Add haptic feedback on mobile (navigator.vibrate(10))

## Priority 5: PWA Support
- Add web app manifest (manifest.json) with proper icons, theme color, etc.
- Add a basic service worker for offline caching
- Meta tags for "Add to Home Screen" prompt
- App should work offline once cached

## Priority 6: Guaranteed Solvable Deals + Game Numbers
- Use the existing solver to verify deals before presenting them
- Show game number prominently (e.g., "Game #24587")
- Allow entering a specific game number to replay
- Pre-generate and cache a list of known-solvable seeds

## Priority 7: Replace Emoji Icons with Lucide
- Install lucide-react
- Replace all Unicode emoji in TopBar, buttons, etc. with proper SVG icons
- Undo → RotateCcw, Redo → RotateCw, Hint → Lightbulb, Stats → BarChart3
- New Game → Shuffle, Feedback → MessageSquare, Settings → Settings

## Technical Notes
- Game logic: src/engine/, Phaser rendering: src/game/
- React ↔ Phaser bridge: src/game/GameBridge.ts
- Stats: src/lib/stats.ts + LocalStorage
- Currently auto-deploys to Vercel on push to main

## When Done
- npm run build (verify no errors)
- Commit each priority separately with descriptive messages
- Push to main
