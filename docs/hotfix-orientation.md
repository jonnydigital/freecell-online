# HOTFIX: Orientation Change Bug

## Bug 1: Only 4 of 8 cascades visible in portrait
- Phone is ~390px wide, only left 4 columns show

## Bug 2: Portrait → Landscape → Portrait breaks layout  
- Rotating to landscape works fine
- Rotating BACK to portrait doesn't recalculate properly
- Cards end up mispositioned or off-screen

## Root Cause Candidates:
1. Phaser scale manager may not be firing resize on orientation change
2. calculateLayout() might cache values that don't update
3. The canvas might not resize to match the new viewport dimensions
4. iOS/Android viewport quirks with orientation change (address bar appearing/disappearing changes available height)

## Fix Requirements:
- Force recalculate on orientation change AND resize
- Add `window.addEventListener('orientationchange', ...)` as backup
- Debounce resize handler (orientation change fires multiple resize events)
- After recalculate, force full board redraw
- Test: portrait start → landscape → portrait should show all 8 columns correctly

## Bug 3: Touch/tap doesn't work on mobile
- User cannot select cards by tapping on phone
- Likely same root cause as Bug 1: if canvas coordinates are wrong, hit areas won't align with visible card positions
- MUST test touch interaction after fixing portrait layout
- Verify: tap card → card highlights/selects, tap destination → card moves
- Verify: drag card works on mobile too
