# U6 Landscape Readout Audit — 2026-11-11

**Backlog item under test (U6 play-UX, item 1):** "landscape mobile hides
timer/moves below 500px height."

**Method:** synthetic cloud Playwright (native-arm64 Chromium), `isMobile:true`,
two landscape phone viewports with height < 500px: **740×360** and **844×390**.
Live production, all three play engines. Screenshots eyeballed per cell;
readout visibility judged from the rendered screenshot (a text-node rect
heuristic was discarded as unreliable — it matched zero-size label nodes).

## Result: item does NOT reproduce on current production

| Engine | Viewport | Timer visible | Moves visible | Extra readout | Cards | hScroll | Console errs |
|--------|----------|---------------|---------------|---------------|-------|---------|--------------|
| FreeCell | 740×360 | ✅ `00:00` (top-center `#1 00:00 0 moves`) | ✅ | — | 52 | no | 0 |
| FreeCell | 844×390 | ✅ | ✅ | — | 52 | no | 0 |
| Klondike | 740×360 | ✅ `TIME 00:00` (top-right) | ✅ `MOVES 0` | `GAME #` | 29 | no | 0 |
| Klondike | 844×390 | ✅ | ✅ | `GAME #` | 29 | no | 0 |
| Spider | 740×360 | ✅ `TIME 00:00` (top-right) | ✅ `MOVES 0` | `SUITS 0/8` | 63 | no | 0 |
| Spider | 844×390 | ✅ | ✅ | `SUITS 0/8` | 63 | no | 0 |

All three engines render the full top readout (timer + moves, plus Game# for
Klondike and Suits for Spider) and an intact toolbar in landscape at both sub-500px
heights. Full card counts (52/29/63), no horizontal scroll, zero console errors.
First-visit Welcome modal / cookie banner overlay the board but do not remove the
readout (board renders intact beneath).

## Interpretation

The current responsive top bar keeps the timer/moves readout pinned and visible in
landscape at phone heights down to 360px, so the original U6 concern (readout hidden
below 500px height) is not observable on production today. The item can be marked
**resolved / non-reproducing** in the U6 backlog rather than carried as an open fix.

**Separate, still-open U6 signal (not this item):** Spider landscape shows notable
unused vertical green space between the toolbar and the tableau (the known
"dead-space / unused-vertical" layout signal prior runs flagged). That is a
distinct density item, not the readout-visibility item, and remains open.

**Not field data:** synthetic single-run lab observation (Playwright viewport
emulation), not CrUX. CrUX/field landscape behavior still depends on the pending
PageSpeed/GSC wiring flagged in the 2026-11-10 CWV lab baseline.
