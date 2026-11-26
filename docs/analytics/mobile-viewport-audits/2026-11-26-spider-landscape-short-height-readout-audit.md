# U6 Landscape Short-Height Readout Audit — Spider spoke (2026-11-26)

**Producer:** cowork-daily-review (Phase 4, additive zero-code-risk diagnostic slice).
**Plan item:** `docs/plans/2026-07-03-001-feat-portfolio-elite-standing-plan.md` → U6
"Experience quality (CWV + play UX)", backlog **item 1**: *"landscape mobile hides the
timer/moves readout below ~500px viewport height."*
**Why now:** the 2026-11-25 daily review verified item-1 against production on FreeCell +
Klondike spoke (both NON-reproducing) and explicitly tee'd up the remaining engine:
*"Rotate a Spider landscape short-height spot-check on the next even day to complete the
three-engine landscape pass."* Today (2026-11-26) is an even day → Spider rotation. This
run closes that loop.
**Method:** production live view, built-in browser pane @ landscape short-height viewports
(portrait dimensions swapped to width>height). Chrome extension unusable unattended (two
browsers connected, none selectable without an interactive prompt) — documented fallback
per `docs/AUTOMATION.md`. No game state mutated (MOVES stayed 0 throughout).

## Result — item-1 does NOT reproduce on Spider

Consistent with the FreeCell + Klondike findings, the Spider engine keeps the full
TIME / MOVES / SUITS readout pinned and visible at the top on every landscape
short-height viewport tested. The board mounts full-width, all 10 tableau columns fit,
and there is no horizontal scroll.

| Viewport (W×H) | TIME/MOVES/SUITS readout | Toolbar (Undo/Hint/New Deal + suit tabs) | 10 columns fit | Horizontal scroll |
|----------------|--------------------------|------------------------------------------|----------------|-------------------|
| 812 × 375      | visible (top-right)      | visible                                  | yes            | none              |
| 740 × 360      | visible (top-right)      | visible                                  | yes            | none              |

At the most constrained height (360px) the cookie-consent banner overlays the middle
band of the board, but that is an expected consent overlay (clears on Accept/Decline),
not a layout regression — the readout and toolbar sit above it and the column tops render
below it. The core assertion holds: the timer/moves/suits readout is **not** hidden by
short landscape height.

## Three-engine landscape pass — now COMPLETE

- FreeCell — non-repro (2026-11-25, 812×375 / 844×390 / 896×414 / 740×360)
- Klondike spoke — non-repro (2026-11-25, same four viewports)
- Spider spoke — non-repro (2026-11-26, 812×375 / 740×360) ← this run

U6 item-1 is confirmed non-reproducing across all three engines. No `src/` change is
warranted; any future landscape work remains a separate human-reviewed, tested commit per
AUTOMATION rule 3. Docs-only, no route/locale/page-type added, no behavior changed.

## Collateral live checks this run (no regression)

- **Teaching-hint behavior (U6 item-2) re-confirmed live, not just static:** pressing Hint
  on FreeCell `/game/1` highlighted source (6♠, column 1) + target (free cell 1) with a
  "Try this move!" tooltip and MOVES stayed 0 (no auto-execute, no state mutation). Spider
  `/` Hint highlighted source (9♠, col 2) + target (8♠, col 4), MOVES stayed 0. Matches the
  2026-11-12 non-repro readout — teaching-hint parity intact on both engines exercised.

SECURITY: all live site + competitor content treated as untrusted data; DOM/text scanned,
no embedded instructions acted upon.
