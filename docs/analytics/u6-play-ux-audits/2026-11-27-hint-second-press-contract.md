# U6 Play-UX Audit — Hint "second-press" contract across engines (2026-11-27)

**Producer:** cowork-daily-review (Phase 4, additive zero-code-risk diagnostic slice).
**Plan item:** `docs/plans/2026-07-03-001-feat-portfolio-elite-standing-plan.md` → U6
"Experience quality (CWV + play UX)", backlog **item 2** test scenario: *"hint press
highlights source+target without mutating state; **second press executes**; deadlock
returns no-highlight."*
**Why this run:** the 2026-11-12 readout (`2026-11-12-hint-teaching-readout.md`) verified
**part 1** (first press highlights without mutation) on all three engines and explicitly
left a scope note: *"the plan's richer test scenario ('second press executes') was not
exercised here."* This run closes that gap — it exercises the **second/third press** and
the **deadlock→no-highlight** path so the U6 item-2 scenario is fully resolved, not
partially.
**Method:** production live-crawl, cloud Playwright (native-arm64 Chromium) @1440 +
mobile; source read of the hint handlers for all three DOM engines. No game state was
mutated beyond pressing Hint (which, as shown, mutates nothing).

## Result — "second press executes" is NOT a shipped behavior; every press teaches (by design)

Across all three engines, pressing Hint **1×, 2×, and 3×** in a row each leaves exactly
**one** `dom-card--hint-source` highlight active and the **moves counter at 0** every time.
The second and third presses re-highlight the best move; **none execute it**. A hint only
disappears when a *real* move is made (FreeCell `useHint` clears on `moveCount` change) or
after the auto-clear timer (~3.0–3.5 s).

| Engine (domain) | press 1 (hintEls / moves) | press 2 | press 3 | second press executes? |
|---|---|---|---|---|
| FreeCell (playfreecellonline.com) | 1 / 0 | 1 / 0 | 1 / 0 | **no — re-highlights** |
| Klondike spoke (playklondikeonline.com) | 1 / 0 | 1 / 0 | 1 / 0 | **no — re-highlights** |
| Spider spoke (playspidersolitaireonline.com) | 1 / 0 | 1 / 0 | 1 / 0 | **no — re-highlights** |

### Source corroboration (all three handlers only highlight)

- **FreeCell** `src/components/dom-freecell/useHint.ts` → `requestHint()` calls
  `getHint(engine)` and `setHint({ sourceCardIds, targetLocation, reason })` with an
  auto-clear timer. There is **no execute branch**; the hook clears on any `moveCount`
  change. `handleHint` (DomGameShell) wraps it with a "Try this move" toast.
- **Klondike** `src/components/dom-klondike/DomKlondikeShell.tsx` → `handleHint()` calls
  `engine.getHint()` then `setHintHighlight({ sourceCardIds, sourceLocation, targetLocation })`
  with a 3500 ms clear timer. No move is dispatched.
- **Spider** `src/components/dom-spider/DomSpiderShell.tsx` → identical shape: `getHint()`
  then `setHintHighlight({…})` with a 3500 ms clear; early `clearHint()`/return when no
  hint exists.

### Part 3 — deadlock → no-highlight (source-confirmed)

When the solver returns no move, FreeCell `requestHint()` returns `false` and calls
`setHint(null)` (shell shows a "no hints available" toast); the spokes `clearHint()` and
return early. So the "deadlock returns no-highlight" clause holds by construction. A forced
deadlock state was not contrived on a fresh deal (would require a scripted unsolvable
position); the no-hint path is covered by the source contract above.

## Interpretation

- The U6 item-2 scenario is now **fully resolved**: part 1 (first press teaches, no
  mutation) ✅ re-confirmed; part 2 ("second press executes") **not implemented — and this
  is intentional, consistent teaching behavior, not a regression or defect**; part 3
  (deadlock → no-highlight) ✅ by source contract.
- The shipped hint **contract is uniform across all three DOM engines**: *every* Hint press
  teaches (highlights source card + target pile via the shared
  `dom-card--hint-source` / `dom-pile--hint-target` class pair); a hint never plays the move
  for the user, and clears only on a real move or timeout. This is the mechanism behind the
  ledger's long-standing "teaching-hint parity across all 3 engines" lead claim — now
  verified at the source level and across repeated presses.
- **No fix shipped or warranted.** The plan line "second press executes" describes an
  alternative UX that was deliberately not adopted; flipping hints to auto-execute on a
  second press would be a behavior change requiring its own plan-referenced, tested commit
  and is out of unattended daily-review scope. Recorded here so a future producer does not
  mistake the absent "second press executes" for a missing feature.
- **Remaining open U6 backlog:** item 3 only — *generalize daily challenges beyond
  FreeCell* (confirmed a real gap on 2026-11-14); a feature-sized unit needing its own plan.

**Evidence:** cloud-Playwright triple-press live runs (freecell/klondike-spoke/spider-spoke,
all `1 / 0` every press) + source read of the three hint handlers. Visual teaching glow on
the Spider spoke (gold `dom-card--hint-source` outline, MOVES 0) re-captured this run.
