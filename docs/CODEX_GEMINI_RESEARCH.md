# Combined Research: Codex 5.3 Code Review + Gemini Deep Research
*Date: 2026-02-26*

## Codex 5.3 Code Review Findings

Codex reviewed all 3039 lines of FreeCellScene.ts. Key issues identified:

### 1. 🔴 No `removeEventListener` on scene shutdown
Raw touch/mouse listeners are added to `canvas` but **never removed** when the scene restarts or shuts down. This causes **duplicate listeners** accumulating on each new game, which means:
- Each touchmove fires 2x, 3x, Nx handlers (once per game started)
- Performance degrades over multiple games in same session
**Fix**: Store listener refs and remove in `shutdown()` method.

### 2. 🔴 Lerp in event handler, not game loop
The lerp smoothing runs inside `touchmove`/`mousemove` event handlers, which fire at the browser's input rate (often 60-120Hz on touch). But lerp is frame-rate dependent — the smoothing factor (0.7) produces different results at different input rates.
**Fix**: Store the raw target position in the event handler, then apply lerp in Phaser's `update()` loop where dt is consistent.

### 3. 🔴 No `update()` method at all
The scene has NO Phaser `update()` loop. All drag position updates happen inside event handlers. This means:
- No consistent frame-rate-independent updates
- No spring physics possible (springs need dt-based stepping)
- Card positions update at input event rate, not render rate
**Fix**: Add `update(time, delta)` method that handles drag position lerping and spring physics.

### 4. 🟡 Duplicate state between touch and mouse drag systems
`touchDragCards[]` and `mouseDragCards[]` are separate arrays with identical logic. Same for `touchDragFrom`/`mouseDragFrom`, offsets, etc.
**Fix**: Unify into single drag state (`activeDragCards`, `activeDragFrom`, etc.) with input source tag.

### 5. 🟡 `getCurrentOverlap()` called every touchmove
This method calls `Math.max(...state.cascades.map(c => c.length))` and does multiple Math operations. Called on EVERY touch/mouse move event.
**Fix**: Cache overlap value and only recalculate on state change.

### 6. 🟡 `findDropTarget` cascade check ignores Y position
For cascades, `findDropTarget` only checks X range — any Y position matches. This means dragging near the top row can falsely match a cascade column.
**Fix**: Add Y lower bound check (cascade area starts below top row).

### 7. 🟡 Canvas coordinate scaling computed every event
`getBoundingClientRect()` and scale factors are computed on every single touch/mouse event.
**Fix**: Cache rect and scale factors, update on resize only.

---

## Gemini Deep Research: Spring Physics & Pro Techniques

### Spring Physics Function (Ready to implement)
Parameters for card game: **stiffness=180, damping=25, mass=1**
```typescript
function springUpdate(
  current: number, target: number, velocity: number,
  stiffness = 180, damping = 25, mass = 1, dt = 0.016
): { position: number; velocity: number } {
  const springForce = -stiffness * (current - target);
  const dampingForce = -damping * velocity;
  const acceleration = (springForce + dampingForce) / mass;
  const newVelocity = velocity + acceleration * dt;
  const newPosition = current + newVelocity * dt;
  return { position: newPosition, velocity: newVelocity };
}
```

### getCoalescedEvents() — High-Precision Input
Modern devices send pointer events faster than 60Hz. Using `getCoalescedEvents()` captures every hardware input point:
```typescript
canvas.addEventListener('pointermove', (e: PointerEvent) => {
  const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
  for (const event of events) {
    this.updateDragTarget(event.pageX, event.pageY);
  }
});
```

### `desynchronized: true` on Canvas
Bypasses compositor for **1 frame less input latency** (~16ms improvement). Card feels "glued" to finger.
**NOTE**: Phaser creates the canvas context — need to check if this can be passed as a config option.

### Card Stack Dragging
Use **leader-follower pattern** — top card is leader, following cards maintain fixed Y offset from leader's current position. On invalid drop, each card springs back independently for a "cascading slurp" effect.

### Haptic Patterns
| Action | Pattern (ms) |
|--------|-------------|
| Pickup | `[10]` |
| Place | `[20]` |
| Invalid | `[50, 30, 50]` |
| Win | `[30, 50, 30, 50, 100]` |

---

## Priority Implementation Order

1. **🔴 Add `update()` loop** — move lerp/spring out of event handlers into frame-rate-independent update
2. **🔴 Fix listener leak** — store refs, remove on shutdown
3. **🔴 Replace lerp with spring physics** — springUpdate() in update() loop
4. **🟡 Cache overlap and canvas rect** — eliminate per-event computation
5. **🟡 Unify drag state** — single system for touch + mouse
6. **🟡 Fix findDropTarget Y check** — prevent false cascade matches
7. **🟢 Add getCoalescedEvents** — smoother fast-swipe tracking
8. **🟢 Investigate desynchronized canvas** — 1-frame latency reduction
