# DOM FreeCell Prototype — Evaluation Report

**Date:** 2026-03-08
**Prototype route:** `/lab/dom-freecell`
**Comparison baseline:** Phaser FreeCellScene.ts (production)

---

## What Happened

Built a React/DOM FreeCell prototype at `/lab/dom-freecell` for side-by-side comparison with the existing Phaser implementation. Hands-on testing confirmed the DOM prototype feels significantly better across every evaluation axis.

---

## Why DOM Wins

- **Direct pointer-follow drag.** The pointer owns card position during drag, period. No tween conflicts, no competing animation systems fighting for control.
- **Single motion ownership.** Phaser's drag system and tween system both write to card position, causing jitter and offset drift. DOM approach eliminates this class of bug entirely.
- **Crisp text rendering.** Native DOM text rendering produces visibly sharper rank/suit labels vs canvas bitmap rendering, especially on Retina displays.
- **Simpler hit testing.** `elementFromPoint()` replaces manual coordinate math with overlapping zone calculations. Fewer edge cases, less code.
- **Phaser bugs are architectural.** The core issues (findDropTarget returning wrong column, y-offset drift, tween conflicts) stem from the engine's interaction model. These aren't fixable bugs — they're consequences of canvas-based drag in a tween-driven scene graph.

---

## Go / No-Go Checklist

- [x] **DOM drag feels materially better** — Pointer-locked, no lag, no tween conflicts stealing card position mid-drag
- [x] **DOM cards are visibly sharper** — Native text rendering, clean edges on Retina
- [x] **Overlap/drop logic is simpler** — `elementFromPoint` vs manual coordinate math with overlapping hit zones
- [x] **Performance is stable on desktop** — Zero React rerenders during drag (direct DOM manipulation via fixed positioning + inline styles)
- [x] **Implementation complexity is acceptable** — ~400 LOC vs ~3500 LOC FreeCellScene
- [x] **Prototype can be extended** — Standard React patterns, Zustand store, CSS animations — no framework fights

**Criteria met:** 6 / 6

---

## Verdict

**Go.** Proceed with Phase 2 migration.

Keep Phaser code intact as fallback until the DOM version reaches full production parity.

---

## Next Steps

Phase 2 — productionize DOM FreeCell:
- Auto-move
- Double-click to foundation
- Sound effects
- Mobile touch support
- Statistics integration
- Deal animation
- Swap into production route
