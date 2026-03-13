# Agent Swarm Brief: React/DOM Solitaire Prototype

> Status: Completed on March 8, 2026
> Outcome: The prototype at `/lab/dom-freecell` materially outperformed the current Phaser FreeCell board in hands-on playtesting.
> Decision: Proceed to Phase 2 DOM FreeCell migration while keeping Phaser as the bridge/fallback path.
> Superseded by: `docs/agent-task-dom-migration-phase2.md`

## Outcome Summary
- The swarm delivered a working DOM prototype route at `/lab/dom-freecell`.
- The reusable engine path was preserved, and the prototype was built without replacing the live Phaser gameplay path.
- Hands-on evaluation concluded that the DOM board feels clearly better than the current Phaser board.
- The prototype card presentation is also preferred and must be preserved as a candidate selectable card style during Phase 2.
- The next step is no longer "prove whether DOM is viable." The next step is "productionize DOM FreeCell safely."

## Historical Note
The instructions below are retained as the original prototype-sprint brief for reference only.
They are no longer the active assignment for the team.

## Mission
Build a high-confidence React/DOM prototype of the solitaire board and drag/drop interaction so we can answer one question with evidence:

`Should we keep Phaser for gameplay, or migrate solitaire gameplay to React/DOM?`

This is **not** a full rewrite assignment.

This is a **prototype and decision-quality engineering sprint**.

The team must produce a working, measurable, side-by-side prototype that proves or disproves the claim that a React/DOM implementation can feel smoother, calmer, and cleaner than our current Phaser implementation.

## Explicit Outcome
This assignment is intended to produce **two systems in parallel**:

1. **The current production-path Phaser system remains intact**
   - it may receive limited stabilizing fixes
   - it must not be replaced during this sprint
   - it remains the active gameplay system while evaluation is in progress

2. **A separate React/DOM demo system is created**
   - it lives on a dedicated prototype/lab route
   - it is comparison-focused, not production-swapped
   - it exists to prove or disprove whether React/DOM should become the future direction

The team must not confuse `prototype` with `replacement`.
The purpose is:

- keep the current system usable
- build a separate demo system
- compare them directly
- then make the architecture decision

## Final Recommendation Driving This Assignment
Current recommendation is:

- **Primary path:** Option B — keep Phaser in production for now, but prototype one React/DOM board immediately
- **Backup path:** Option A — continue stabilizing Phaser if the DOM prototype fails or does not materially outperform it
- **Not approved yet:** full migration to React/DOM

The purpose of this swarm is to generate the evidence needed for a final architecture decision.

## What We Already Know

### From code and playtesting
- Our current pain points are mostly:
  - competing motion systems
  - drag/drop conflicts
  - board motion during interaction
  - janky startup/new-game flow
  - card clarity and grab-area issues
- The worst failures are not just "performance"; they are **interaction-model problems**.

### From competitive research
- `playsolitaireonline.com` is a wrapper around `online-solitaire.com`
- The embedded competitor appears to be **React/DOM-style**, not Phaser
- Their smoothness appears to come from:
  - calmer board behavior
  - direct pointer-follow drag
  - single animation ownership
  - crisp card rendering
  - fewer competing effects

### Our conclusion right now
- Do **not** assume Phaser is the right engine just because we already use it
- Do **not** assume React/DOM will automatically fix everything either
- We must test the architecture with a real prototype

## Success Criteria
This swarm is successful only if it delivers all of the following:

1. A real React/DOM solitaire board prototype running in this repo
2. A real side-by-side comparison between:
   - current Phaser board
   - new DOM prototype
3. A concrete verdict on:
   - drag feel
   - drop feel
   - card clarity
   - board calmness
   - engineering complexity
4. A go / no-go rewrite recommendation based on evidence

If the team ships "nice ideas" but not a comparison-ready prototype, the assignment is not complete.

## Hard Constraints

### Do not do these
- Do **not** rewrite the production game wholesale
- Do **not** remove Phaser from the app
- Do **not** break existing gameplay routes
- Do **not** swap the prototype into the production gameplay route during this sprint
- Do **not** spend the whole sprint polishing visuals without proving drag/drop quality
- Do **not** rely on generic framework opinions
- Do **not** produce only documentation

### Do these
- Keep scope to one board prototype first
- Prefer FreeCell first, because we already know its current failure modes well
- Make the prototype measurable and testable
- Keep game rules headless and reusable
- Keep the production Phaser path functioning while the prototype is built
- Separate:
  - game rules
  - board layout
  - interaction control
  - animation

## Primary Deliverable
Build a prototype route in this codebase, behind an internal/dev path if needed, for example:

- `/lab/dom-freecell`
- or `/prototype/dom-freecell`

The route must render a playable or near-playable FreeCell board in React/DOM with:

- stacked overlapping cards
- drag of single cards and valid runs
- clear hit testing
- clean drop zones
- crisp card faces
- calm board behavior during drag
- measurable interaction timing

This prototype route is a **demo system**, not a replacement route.

## Required Comparison Deliverable
The team must also produce a written comparison doc, for example:

- `docs/dom-prototype-evaluation.md`

It must answer:

- Does DOM drag feel better?
- Are cards visually cleaner?
- Is overlap/drop logic simpler?
- Is performance acceptable on desktop?
- Does this justify a wider migration?

## Swarm Structure
Assign these roles in parallel.

### Agent 1: Prototype Lead
Own the prototype end-to-end.

Responsibilities:
- define the prototype route and file structure
- decide the minimum viable board scope
- integrate work from other agents
- keep the prototype runnable at all times
- make final call on what is in or out of the prototype
- ensure no one accidentally repoints production gameplay to the prototype

Expected output:
- working prototype route
- integration notes
- final prototype summary

### Agent 2: Headless Rules Extraction
Own separation of game rules from rendering.

Responsibilities:
- inspect current FreeCell logic under `src/engine/`
- identify what can be reused directly
- expose a clean state shape usable by both Phaser and DOM layers
- avoid UI-specific leakage into rules

Expected output:
- reusable rules/state adapter for DOM prototype
- minimal API for:
  - card lookup
  - pile lookup
  - legal move checks
  - applying moves
  - generating layout-ready state

Important:
- this agent is not building UI
- this agent is creating the simplest usable game-state contract for the prototype

### Agent 3: DOM Interaction Engineer
Own drag/drop feel.

Responsibilities:
- implement direct pointer-follow drag
- keep dragged cards tightly locked to pointer
- ensure there is one motion owner at a time
- implement drop target highlighting and hit testing
- ensure no board jitter during drag

Strict behavior rules:
- during drag, pointer owns the card position
- no layout tween may write to dragged cards
- legal drop should feel like one clean commit
- invalid drop should snap back once, quickly
- no auto-move may fire while a pointer is active

Expected output:
- custom pointer event system for prototype
- clear drag lifecycle
- no dependency on abandoned drag libraries

### Agent 4: Card Rendering and Visual Quality
Own the premium card look.

Responsibilities:
- build cleaner DOM-rendered card components
- improve rank/suit clarity
- tune card sizing, spacing, and shadows
- support at least one clean premium style

Requirements:
- cards must look crisp on high-DPI displays
- rank and suit readability is more important than decorative flair
- visual polish must stay calm, not flashy
- grab areas must be forgiving

Expected output:
- reusable card component
- CSS variables or token-driven card styling
- comparison screenshots vs current Phaser implementation

### Agent 5: Instrumentation and Evaluation
Own proof, not opinions.

Responsibilities:
- add instrumentation to compare prototype feel vs current board
- define what to measure
- run comparison passes
- document the results

Minimum measurements:
- pointerdown to visible drag response
- pointerup to move commit completion
- number of conflicting motion events or dropped frames
- visual clarity observations on desktop

Expected output:
- evaluation writeup
- recommendation based on evidence
- explicit go/no-go rewrite criteria

## Prototype Scope
Keep the scope disciplined.

### Must include
- FreeCell board layout
- 8 cascades
- 4 free cells
- 4 foundations
- card stacking/overlap
- legal single-card drag/drop
- optional valid run drag if feasible in the prototype window
- crisp card rendering
- basic move commit and snapback

### Nice to have, but optional
- keyboard interaction
- theme switching
- animation polish beyond core drag/drop
- auto-move
- mobile optimization

### Explicitly out of scope for this sprint
- full Spider migration
- full app rewrite
- production deployment swap
- wrapper/embed rollout
- multilingual support
- broad design overhaul outside the prototype

## Technical Direction

### State model
Use a normalized state shape for the prototype.

Target shape:
- cards by id
- piles by id
- pile ordered card ids
- interaction state separate from game state

Recommended approach:
- Zustand is acceptable for prototype state
- hot drag coordinates must **not** flow through expensive React render paths if that creates lag

### Rendering model
Use React + DOM.

Recommended structure:
- board container
- pile containers
- absolutely positioned or transform-positioned cards
- CSS transforms for movement
- CSS variables for style tokens

### Interaction model
Use custom pointer events.

Rules:
- `pointerdown`: determine candidate card/run and anchor offset
- `pointermove`: direct card transform updates via one owner
- `pointerup`: resolve target, commit or snapback
- dragged card stack should ignore pointer events while in-flight if needed
- underlying zones should be discoverable for drop logic

### Animation model
Keep it conservative.

Rules:
- no board motion during drag
- no competing tweens
- legal drop should be one motion path
- invalid drop should be one snapback path
- avoid decorative overshoot

### Architecture principle
`Copy the interaction model, not the engine.`

The goal is not "use React because competitors use React."
The goal is to reproduce:
- calm board
- direct drag
- single motion ownership
- crisp cards
- simpler overlap logic

## Required File/Code Suggestions
The exact implementation can vary, but the team should strongly consider adding a prototype area such as:

- `src/app/lab/dom-freecell/page.tsx`
- `src/components/dom-freecell/`
- `src/lib/dom-freecell/`

Suggested internal structure:
- `BoardModel.ts`
- `LayoutEngine.ts`
- `InteractionController.ts`
- `DomCard.tsx`
- `DomPile.tsx`
- `useDomFreecellStore.ts`

Do not force this exact shape if a simpler equivalent is better, but keep concerns separated.

## Required Evaluation Questions
At the end of the sprint, the team must answer these directly:

1. Does the DOM prototype feel better than Phaser during drag?
2. Does the DOM prototype reduce conflicting motion?
3. Are cards cleaner and sharper in DOM?
4. Is overlap hit testing materially simpler?
5. Can the team maintain this architecture comfortably?
6. Is the gain large enough to justify migration?

## Go / No-Go Rewrite Criteria
Only recommend wider migration if most of the following are true:

- DOM prototype drag feels materially better than Phaser
- DOM prototype cards are visibly sharper on real hardware
- overlap/drop logic is simpler and less bug-prone
- prototype performance remains stable on desktop
- implementation complexity is acceptable for the team
- the prototype can be extended without fighting the framework

Do **not** recommend migration if:

- drag still feels laggy or unstable
- React hot-path updates become the new source of jank
- complexity explodes
- the prototype is not clearly better than a stabilized Phaser board

## Review Checkpoints

### Checkpoint 1: End of Day 1
- prototype route exists
- board skeleton renders
- state shape chosen
- no broad rewrite has started

### Checkpoint 2: End of Day 2
- cards render cleanly
- one card can be dragged
- drop targets can be identified

### Checkpoint 3: End of Day 3
- legal drop and snapback work
- board stays calm during drag
- prototype is comparison-ready

### Checkpoint 4: End of Day 4 or 5
- written evaluation complete
- go/no-go recommendation complete
- clear next-step plan produced

## Non-Negotiable Anti-Patterns to Avoid
- Using two systems to write card position at once
- Letting React rerender the full board on every pointermove
- Letting background animations continue during drag
- Building a giant prototype with no measurement
- Conflating wrapper strategy with gameplay engine strategy
- Rewriting production files before the prototype proves anything

## What to Compare Against
Use these current references:

- current Phaser implementation in:
  - `src/game/FreeCellScene.ts`
  - `src/game/SpiderScene.ts`
- competitor behavior reference:
  - `/Users/jonathanfoye/Desktop/Screen Recording 2026-03-07 at 9.33.52 PM.mov`

Compare specifically on:
- drag tightness
- drop smoothness
- card clarity
- board calmness

## Final Output Package
When the swarm finishes, deliver:

1. Prototype route
2. Working code in repo
3. Evaluation doc
4. Rewrite recommendation
5. List of next steps, one of:
   - continue in Phaser
   - continue DOM prototype into Phase 2
   - approve broader migration

At the end of the sprint, the repo should still contain:

- the current Phaser production path
- the separate DOM prototype path

They should coexist until a deliberate migration decision is made.

## Final Instruction to the Team
Your job is **not** to defend Phaser and **not** to force a rewrite.

Your job is to produce enough evidence that the architecture decision becomes obvious.

Build the smallest serious prototype that can answer the question.
