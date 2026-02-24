# Agent Task: Mobile UX + Analytics + Feedback System

## Context
This is a FreeCell solitaire web app (Next.js + Phaser.js) deployed on Vercel.
The game works but has critical mobile issues and needs analytics/feedback infrastructure.

## Priority 1: Mobile Responsive Layout Fix
The game doesn't handle portrait/landscape rotation well on phones.

### Requirements:
1. **Portrait Mode (primary mobile experience)**:
   - Move Free Cells and Foundations to a compact 2-row layout at top
   - Dynamically increase CASCADE_OVERLAP so cards don't bleed off-screen
   - Cards must be large enough to tap (minimum 44px touch target)
   - The entire game board must fit without scrolling
   
2. **Landscape Mode**:
   - Use classic layout but more compact
   - UI controls can move to a slim sidebar
   
3. **Orientation Change**:
   - Smooth transition when rotating device
   - Card positions must recalculate correctly
   - No visual glitches during rotation

4. **Click-to-Move (critical for mobile)**:
   - Single tap on a card: if only one legal destination, move immediately
   - If multiple destinations: highlight valid targets with glow, tap destination to complete
   - Double-tap: send to foundation if legal
   - Visual feedback: selected card gets subtle lift/glow
   - Add navigator.vibrate(10) on successful moves (mobile only)

## Priority 2: Analytics & Error Tracking
We need to understand player behavior and catch errors.

### Requirements:
1. **Install Plausible Analytics or Umami** (privacy-friendly, no cookie consent needed)
   - If neither is practical for free tier, use GA4 with the existing setup
   
2. **Custom Game Events to Track**:
   - `game_start` (game_number, difficulty)
   - `game_win` (time_seconds, moves, hints_used, undos_used)
   - `game_abandoned` (move_count, time_played, last_action)
   - `game_restart` (move_count when restarted)
   - `hint_used` (move_count, game_number)
   - `undo_used` (frequency per game)
   - `time_to_first_move` (seconds from deal to first move)
   - `interaction_type` (drag vs tap per session)
   
3. **Error Logging**:
   - Integrate Sentry.io (free tier) for runtime error capture
   - Wrap Phaser scene in error boundary
   - Log WebGL context loss events
   - Capture and report any unhandled promise rejections
   - Include game state context in error reports (game number, move count)

## Priority 3: Feedback System
Allow users to submit feedback directly from the game.

### Requirements:
1. **Feedback Button** in footer or settings
   - Opens a simple modal: text area + optional email + submit
   - Store feedback in a JSON file via API route (or use a free service like Formspree)
   - Include automatic context: browser, screen size, game number, move count
   - Rate limit to prevent spam (1 submission per 5 minutes per IP)

## Priority 4: Visual Polish
1. Add vignette effect to the green felt background (darker edges)
2. Add subtle felt texture/noise overlay
3. Card animation improvements:
   - Variable speed based on distance
   - Small scale-up "bloom" when card reaches foundation
   - Staggered deal animation
4. Win celebration: cards cascade off screen with particle effects

## Technical Notes
- This is a Next.js 14 project with Phaser 3.87
- Game logic is in src/engine/, Phaser rendering in src/game/
- React ↔ Phaser communication uses EventEmitter bridge (src/game/GameBridge.ts)
- Stats are in LocalStorage (src/lib/stats.ts, src/lib/storage.ts)
- Currently deployed at Vercel (auto-deploy on push to main)

## When Done
- Run `npm run build` to verify no build errors
- Commit all changes with descriptive messages
- Push to main
- Run: openclaw system event --text "Done: Mobile UX overhaul + analytics + feedback system for FreeCell" --mode now
