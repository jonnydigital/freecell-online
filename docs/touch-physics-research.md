# Touch & Drag Physics Research
*Date: 2026-02-26 | Sources: Gemini deep research, MDN Touch Events, game dev best practices*

## Core Principles

### 1. Lerp Smoothing (not raw position)
Raw touch sensor data is jittery. Instead of `card.x = finger.x`, use:
```typescript
card.x = card.x + (targetX - card.x) * LERP_FACTOR;
```
- **Touch**: LERP = 0.7 (more smoothing needed for finger noise)
- **Mouse**: LERP = 0.75 (less jitter, can be more responsive)
- **1.0 = raw position, 0.5 = very smooth/laggy**

### 2. Velocity-Based Trailing Rotation
Cards should rotate slightly in the direction of movement — gives physical "weight":
```typescript
const velocityX = card.x - previousX;
const targetRotation = clamp(velocityX * 0.3, -8, 8);
card.angle = lerp(card.angle, targetRotation, 0.3);
```
- Max ±8 degrees on touch, ±6 on mouse
- Reset to 0 on drop/snap-back

### 3. GPU Compositing
- Canvas must have `touch-action: none` CSS
- Phaser uses WebGL renderer — already GPU composited
- For any DOM overlays, use `transform: translate3d()` + `will-change: transform`

### 4. Event Pipeline
**DO**: Raw touch/mouse events → direct position set → bypass engine input pipeline
**DON'T**: Phaser input manager → hit test → drag event → position update

### 5. Animation Easing Curves
- **Placement (card landing)**: `Power3.easeOut` or Quintic Out `cubic-bezier(0.23, 1, 0.32, 1)`
- **Snap-back (invalid)**: `Power3.easeOut`, 120ms
- **Foundation landing**: `Back.easeOut` with slight overshoot — satisfying "click into place"
- **Spring physics** > fixed-duration tweens for native feel (consider implementing)

### 6. Ideal Durations
- Card drag: 0ms (direct tracking)
- Card placement: 80-150ms
- Snap-back: 100-120ms
- Foundation auto-move: 60-80ms per card
- Win auto-complete: 25-30ms per card (accelerating)

### 7. Haptic Feedback Patterns
- **Pickup**: 10ms light vibrate
- **Placement**: 10ms medium vibrate
- **Invalid**: 10ms vibrate + horizontal shake
- **Foundation**: 15ms vibrate
- **Win**: Pattern: [50, 30, 50, 30, 100]

### 8. Open Source References
- react-beautiful-dnd docs on "Physics-based movement" — gold standard
- Framer Motion spring physics (mass, stiffness, damping model)
- MobilityWare Solitaire (benchmark: 100M+ downloads)

## Implementation Status
- [x] Raw touch events (bypass Phaser)
- [x] Raw mouse events (bypass Phaser)
- [x] Lerp smoothing on both paths
- [x] Velocity-based trailing rotation
- [x] touch-action: none on canvas
- [x] Haptic on pickup/place/invalid
- [ ] Spring physics for snap-to-target (currently using fixed tweens)
- [ ] Enhanced shadow during drag (depth-based)
- [ ] Sound pitch variation based on card rank
- [ ] Deceleration easing on card release (momentum)
