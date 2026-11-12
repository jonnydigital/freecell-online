# U6 Play-UX Audit — Hint teaching behavior across engines (2026-11-12)

**Producer:** cowork-daily-review (Phase 4, additive zero-code-risk diagnostic slice).
**Plan item:** `docs/plans/2026-07-03-001-feat-portfolio-elite-standing-plan.md` → U6
"Experience quality (CWV + play UX)", backlog **item 2**: *"Klondike/Spider hints
auto-execute instead of teaching (highlight like FreeCell)."*
**Method:** production live-crawl, cloud Playwright (native-arm64 Chromium) @1440 dsf1.
For each engine: load board, dismiss first-visit overlays (Skip/Decline) without
touching game state, snapshot (moves counter, geometry of first 30 `.dom-card`, count
of `[class*=hint|highlight|suggest|glow]`), press the primary **Hint** control, re-snapshot
immediately (+0.4s) and after settle (+1.6s).

## Result — item 2 does NOT reproduce on production

The assumption behind backlog item 2 (spokes auto-execute the hinted move) is **false on
current production**. All three engines exhibit identical FreeCell-style *teaching* hints:
pressing Hint highlights a source card + a target pile and **mutates no game state** — the
moves counter stays at 0 and no card changes position.

| Engine (domain) | Hint control | moves before → after | card geometry changed | highlight els (before → after) | highlight classes applied |
|---|---|---|---|---|---|
| FreeCell (playfreecellonline.com) | `Hint (H)` button, enabled | 0 → 0 → 0 | no | 0 → 2 | `dom-card--hint-source`, `dom-pile--hint-target` |
| Klondike spoke (playklondikeonline.com) | `Hint` button, enabled | 0 → 0 → 0 | no | 0 → 2 | `dom-card--hint-source`, `dom-pile--hint-target` |
| Spider spoke (playspidersolitaireonline.com) | `Hint` button, enabled | 0 → 0 → 0 | no | 0 → 2 | `dom-card--hint-source`, `dom-pile--hint-target` |

Both spokes apply the **same two highlight classes** as FreeCell (`dom-card--hint-source`
on the source card, `dom-pile--hint-target` on the destination pile). Visual confirmation
captured on the Spider spoke (spoke-of-day): first Hint press outlines the 6♠ source card
with the gold teaching glow while MOVES still reads 0 — the hinted move is *shown*, not
*played*.

## Interpretation

- U6 backlog **item 2 is resolved / non-reproducing** on production, in the same way
  item 1 (landscape hides timer/moves <500px height) was found non-reproducing on
  2026-11-11. The teaching-hint pattern has converged across all three DOM engines; the
  shared `dom-card--hint-source` / `dom-pile--hint-target` class contract is the mechanism.
- **Scope note (first-press only):** this audit verifies the *first* Hint press teaches
  without mutation on all engines. The plan's richer test scenario ("second press
  executes") was not exercised here and is not required to retire the item — the item's
  claim is specifically that the spokes *auto-execute instead of teaching*, which is
  contradicted by the first-press evidence.
- **Remaining open U6 backlog:** item 3 only — *generalize daily challenges beyond
  FreeCell* (a retention-loop feature for the two spokes). That is a feature-sized unit,
  not a small unattended slice; it needs its own plan-referenced, tested commit.

## Evidence
Screenshots (run artifacts): `spider-hint.png` (6♠ source highlighted, MOVES 0),
`klondike-hint.png`. DOM diagnostic JSON inline in the daily QA report.

_Security note: production DOM/text treated as untrusted data; no embedded instructions acted upon._
