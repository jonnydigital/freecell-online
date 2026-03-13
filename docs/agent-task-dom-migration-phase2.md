# Agent Swarm Brief: Phase 2 DOM FreeCell Migration

## Status
Active as of March 8, 2026.

This document replaces the prototype-only brief in `docs/agent-task-dom-prototype-swarm.md`.

## Mission
Take the successful DOM FreeCell prototype and turn it into a production-ready FreeCell gameplay path.

This is a **targeted migration sprint**, not a full portfolio rewrite.

The goal is to move from:
- "the DOM prototype feels much better"

to:
- "the DOM FreeCell implementation is good enough to replace the current Phaser FreeCell gameplay path when we choose to cut over"

## Why This Sprint Exists
We already have the evidence the prototype sprint was supposed to produce:

- `/lab/dom-freecell` feels materially better than the current Phaser board
- the DOM drag/drop model is calmer and simpler
- the DOM cards are preferred visually
- the current Phaser FreeCell path still has real seating and motion-quality problems

That means the question is no longer:

- "Should we build a DOM prototype?"

The question is now:

- "How do we productionize DOM FreeCell safely, quickly, and without breaking the live site?"

## Explicit Outcome
This sprint must produce **two usable systems in parallel**:

1. **The DOM FreeCell implementation becomes production-ready**
   - feature-complete enough for cutover review
   - integrated enough to behave like a real app feature, not a lab toy
   - still allowed to live on a non-primary route until cutover is approved

2. **The current Phaser FreeCell path remains available as a bridge/fallback**
   - do not delete it during this sprint
   - do not spend major polish effort there beyond severe bug fixes
   - keep it usable until DOM cutover is deliberate and verified

This sprint is successful when the team can say:

- "DOM FreeCell is ready for cutover review"

not merely:

- "the prototype still feels promising"

## Non-Negotiable Direction
- DOM/React is now the primary FreeCell path.
- Phaser is now the bridge/fallback FreeCell path.
- FreeCell is the only game approved for migration in this sprint.
- Spider, Klondike, and the rest of the portfolio are out of scope.

## Critical Product Requirement: Preserve the New Card Look
The DOM prototype cards are not throwaway prototype art.

The user feedback is clear:
- the cards in the DOM demo look better
- they should be preserved
- they should become a real selectable card option

That means:
- do **not** discard the prototype card styling during cleanup
- do **not** replace it with generic cards without preserving it
- do create a named card style option that captures the prototype DOM look
- do make room for this style to live alongside existing and future card styles

Recommended naming is flexible, but it should be something deliberate such as:
- `dom-classic`
- `prototype-clean`
- `studio`

The exact name matters less than preserving the visual language and making it reusable.

## Hard Constraints

### Do not do these
- Do **not** rewrite Spider during this sprint
- Do **not** do a broad multi-game architecture migration
- Do **not** cut over the main production route before the readiness gates pass
- Do **not** remove the existing Phaser FreeCell implementation yet
- Do **not** leave the DOM path dependent on lab-only hacks
- Do **not** keep hot drag coordinates flowing through expensive React rerenders
- Do **not** lose the preferred DOM prototype card design
- Do **not** optimize for theory over shipping

### Do these
- Keep the headless game logic reusable
- Move the DOM board from prototype to product
- Reach practical feature parity for FreeCell
- Preserve the better card design as a real option
- Add the missing hooks for analytics, stats, and user-facing app behavior
- Define a cutover checklist before any route swap

## Success Criteria
This sprint is successful only if all of the following are true:

1. A production-quality DOM FreeCell implementation exists in the repo
2. The DOM path supports the core features users expect from the current FreeCell experience
3. The prototype card look is preserved as a real card-style option
4. Desktop drag/drop remains as good as or better than the current prototype
5. Touch behavior is acceptable enough for broader QA
6. The team can make a clear go/no-go cutover recommendation

If the team only adds more prototype polish without making the implementation cutover-ready, the sprint is not complete.

## Phase 2 Deliverables

### Deliverable 1: Production-Ready DOM FreeCell Path
Build the DOM path into a complete gameplay implementation suitable for production cutover review.

Minimum expectations:
- stable board rendering
- legal single-card moves
- legal multi-card or valid-run moves where applicable
- new game flow
- undo support
- win detection and win-state handling
- move count and game-state display
- no broken seating or stale drag offset after legal drop

### Deliverable 2: Card Style Preservation and Integration
The DOM prototype card style must be captured as a real option, not a temporary CSS experiment.

Minimum expectations:
- identify the exact DOM prototype card styling source of truth
- preserve it under a named style
- make it selectable in a sane way
- ensure future refactors do not accidentally erase it
- document the style briefly so other contributors know it is intentional

### Deliverable 3: Integration Hooks
The DOM path must be integrated with the application systems that matter for a production game.

Examples:
- stats/streak plumbing
- analytics events
- daily challenge or seeded-game compatibility where feasible
- theme/card-style compatibility
- route/readiness integration

### Deliverable 4: Cutover Package
When the sprint ends, the team must deliver:
- the production-ready DOM path
- a list of known gaps
- a cutover checklist
- a fallback plan
- a recommendation:
  - cut over now
  - cut over after one more polish pass
  - hold on Phaser longer

## Swarm Structure
Assign these roles in parallel.

### Agent 1: DOM FreeCell Migration Lead
Own the Phase 2 effort end-to-end.

Responsibilities:
- define the production target scope
- keep the DOM path moving from lab quality to product quality
- integrate work from the other agents
- prevent scope creep into other games
- keep the cutover decision grounded in real readiness

Expected output:
- integrated DOM FreeCell implementation
- migration summary
- cutover recommendation

### Agent 2: Gameplay Parity and Rules Integration
Own gameplay completeness.

Responsibilities:
- reuse the existing headless engine where it is already clean
- close the gap between the lab route and expected FreeCell behavior
- implement or finish:
  - undo
  - new game
  - win detection/handling
  - move counters and basic game-state UI
  - any missing legal move behavior needed for parity
- ensure state transitions stay deterministic and debuggable

Important:
- do not rebuild the rules engine unnecessarily
- do not couple rules logic to DOM rendering details

Expected output:
- parity-focused engine/store improvements
- clear list of completed vs missing gameplay behaviors

### Agent 3: Interaction, Mobile, and Feel Polish
Own input quality.

Responsibilities:
- keep desktop drag/drop as strong as the current prototype
- refine pointer capture, drag thresholds, drop targeting, and snapback
- improve touch behavior without regressing desktop feel
- ensure legal drops seat perfectly into the destination stack
- ensure invalid drops reject cleanly and once
- eliminate any remaining motion conflict or double-commit path

Strict behavior rules:
- pointer owns dragged-card position during drag
- no background board motion during active drag
- commit path is single-owner and deterministic
- snapback is fast and non-bouncy
- no click/drag ambiguity that causes surprise auto-moves

Expected output:
- production-grade drag/drop behavior
- touch-readiness notes
- list of remaining feel issues, if any

### Agent 4: Card System, Theme Integration, and Visual Quality
Own the cards and presentation layer.

Responsibilities:
- preserve the DOM prototype card design as a real named card style
- define how DOM card styles fit into the broader app card-style system
- improve or normalize the DOM board's spacing, shadows, rank/suit clarity, and states
- make sure the preferred DOM cards can survive refactors and future theming work
- evaluate whether the DOM card style should become the default FreeCell DOM style

Requirements:
- do not regress card readability
- do not over-design the cards into something flashy
- preserve the crispness and calmness that made the prototype feel good
- keep the card-style model extensible enough for future options

Expected output:
- stable DOM card styling system
- preserved named prototype-derived card style
- screenshots or notes comparing available card looks

### Agent 5: Platform Integration, QA, and Cutover Readiness
Own the "is this actually ready?" question.

Responsibilities:
- connect the DOM path to real app concerns
- verify stats/analytics hooks or identify exactly what is missing
- run comparison and QA passes
- document bugs, risks, and cutover blockers
- produce the final readiness checklist

Minimum QA areas:
- desktop Chrome or equivalent
- desktop Safari if available
- one touch/mobile pass
- new game
- undo
- repeated drag/drop
- win state
- resize behavior
- card-style switching if implemented during this sprint

Expected output:
- QA report
- blocker list
- cutover checklist
- final readiness recommendation

## Required Scope

### Must include
- DOM FreeCell route that is more than a lab demo
- stable legal drag/drop
- proper post-drop seating into final layout
- undo
- new game
- win-state handling
- game-state UI sufficient for real use
- preserved DOM prototype card style as a real option
- clear instrumentation or QA notes for readiness

### Strongly recommended
- hint support if the underlying engine path allows it cleanly
- auto-move or auto-finish behavior if already supported by the engine
- keyboard support
- touch-specific polish
- route strategy for eventual cutover

### Explicitly out of scope for this sprint
- Spider migration
- Klondike migration
- broad hub/game-network refactor
- portfolio-wide wrapper strategy
- full design system rewrite
- perfectionist animation flourishes

## Technical Direction

### State model
- keep game rules and game state reusable
- keep hot drag state out of expensive rerender paths
- prefer clear selectors and isolated subscriptions
- preserve deterministic move application

### Rendering model
- React + DOM remains the target
- keep the board calm and legible
- use DOM strengths for hit testing, stacking, and card clarity
- avoid clever abstractions that make the board harder to reason about

### Interaction model
- pointer capture or equivalent direct ownership during drag
- one position owner at a time
- one drop resolution path
- no surprise motion during active interaction

### Card-style model
- the prototype card look must become a first-class style, not incidental CSS
- align the DOM card-style model with the broader application theme/card-style approach where practical
- keep the style definitions readable and intentional

### Architecture principle
`Move FreeCell to DOM because it is better for this product, not because React is fashionable.`

## Suggested File Areas
Exact implementation can vary, but the work will likely center on:

- `src/app/lab/dom-freecell/`
- `src/components/dom-freecell/`
- `src/lib/dom-freecell/`
- shared card-style/theme files such as:
  - `src/lib/cardStyles.ts`
  - `src/lib/ThemeContext.tsx`
  - `src/components/ThemeSelector.tsx`

If a production-ready route is introduced before full cutover, keep it explicit and reversible.

## Required Evaluation Questions
At the end of this sprint, the team must answer these directly:

1. Is DOM FreeCell now production-ready enough for cutover review?
2. What meaningful features are still missing versus current FreeCell expectations?
3. Is the preferred DOM card design preserved as a real card-style option?
4. Does desktop gameplay still feel clearly better than Phaser?
5. Is touch behavior good enough for broader rollout, or does it need one more sprint?
6. What exactly blocks route cutover, if anything?

## Cutover Gates
Do not recommend production cutover unless most or all of the following are true:

- DOM gameplay is stable across repeated manual playtesting
- no major seating, drag, or drop bugs remain
- core FreeCell features expected by users are present
- the better DOM card style is preserved and selectable or defaulted intentionally
- analytics/stats integration is not broken
- QA does not show major desktop or mobile regressions
- the fallback plan is documented

## Review Checkpoints

### Checkpoint 1
- DOM scope for Phase 2 is locked
- agent responsibilities are assigned
- production fallback strategy is explicit

### Checkpoint 2
- gameplay parity work is underway
- card-style preservation plan is defined
- no one is drifting into other-game migration

### Checkpoint 3
- core DOM FreeCell path is feature-complete enough for real playtesting
- major integration hooks are in place or clearly blocked
- card style option is preserved

### Checkpoint 4
- QA and cutover review package is complete
- recommendation is explicit
- known gaps are documented

## Non-Negotiable Anti-Patterns to Avoid
- treating the DOM card design as disposable prototype styling
- rerendering the full board on every pointermove
- migrating other games before FreeCell is proven in production
- deleting Phaser before the DOM path is ready
- mixing two sources of truth for move resolution
- adding lots of visual motion that makes the calm prototype feel worse
- calling the migration done without a cutover checklist

## Final Output Package
When the swarm finishes, deliver:

1. Production-ready DOM FreeCell code path
2. Preserved named DOM card style option
3. QA and readiness report
4. Known-gap list
5. Cutover checklist
6. Final recommendation:
   - cut over now
   - cut over after a short polish pass
   - hold the cutover and address blockers

## Final Instruction to the Team
The prototype already answered the architecture question.

Your job now is not to debate whether DOM is interesting.

Your job is to make DOM FreeCell real enough that the cutover decision becomes operational instead of theoretical.
