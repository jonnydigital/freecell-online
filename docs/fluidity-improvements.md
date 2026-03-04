# Fluidity Improvements — Prioritized Code Changes
*Date: 2026-02-26 | Based on competitive analysis + code review of FreeCellScene.ts*

## 🔴 Critical (Ship Today/Tomorrow) — ✅ ALL SHIPPED 2026-02-27

### 1. Single-Tap Auto-Move (Effort: M) ✅
**Problem**: Users must tap to select, then tap destination — 2 interactions where competitors need 1.
**Fix**: Make single tap trigger `smartAutoMove()` directly instead of `selectCard()`. Keep selection as fallback only when tap is on a card that's part of a multi-card run (where user might want to choose how many cards to move).
**File**: `FreeCellScene.ts` → `handleCascadeSelection()` and `onCardClick()`
**Specifically**:
- Single tap on bottom card → auto-move (foundation > cascade > empty > freecell)
- Single tap on mid-run card → select that card + show run highlight
- Double tap → same as current (redundant but harmless)

### 2. Faster Animation Timing (Effort: S)
**Problem**: `getMoveDuration()` returns 100-300ms. Back.easeOut adds ~100ms of perceived overshoot. Total perceived time: 200-400ms per move. Competitors: 80-120ms.
**Fix**:
```typescript
// Current
private getMoveDuration(...): number {
  return Math.min(300, Math.max(100, distance * 0.4));
}

// New: tighter, snappier
private getMoveDuration(...): number {
  return Math.min(180, Math.max(60, distance * 0.25));
}
```
Also change `Back.easeOut` to `Power3.easeOut` for snappier settle without overshoot on normal moves. Reserve `Back.easeOut` for special moments (deal, win, foundation placement).

### 3. Auto-Complete Speed (Effort: S)
**Problem**: `performAutoFinish()` uses 50ms delay between cards. Feels slow when you have 30+ cards to auto-complete.
**Fix**: Reduce to 25ms. Consider accelerating (start at 40ms, decrease to 15ms as it goes).
```typescript
// In performAutoFinish, replace fixed 50ms:
const delay = Math.max(15, 40 - launchCount * 2);
this.time.delayedCall(delay, moveCards);
```

### 4. Cascade Settling Stagger (Effort: M)
**Problem**: After removing a card from a cascade, all remaining cards snap to new positions simultaneously. No physical "settling" feel.
**Fix**: In `repositionAllCards()`, add per-card delay within each cascade:
```typescript
// For each card in cascade, add stagger:
const staggerDelay = row * 12; // 12ms per card position
this.tweens.add({
  targets: sprite,
  x: pos.x,
  y: pos.y,
  duration: moveDuration,
  delay: staggerDelay,
  ease: 'Power3.easeOut',
});
```

---

## 🟡 Important (Ship This Week)

### 5. Enhanced Card Lift Effect (Effort: S)
**Problem**: Drag only scales to 1.05x. No shadow depth change.
**Fix**: On drag start:
- Scale to 1.08x
- Increase shadow blur/offset (change shadow from fillRoundedRect(2,2,...) to (4,6,...) with alpha 0.5)
- Add slight y-offset (-3px) to "lift" above the board
- On drag end, animate all back

### 6. Instant Foundation Auto-Move (Effort: S) ✅ SHIPPED 2026-03-03
**Problem**: `performAutoMoves()` runs synchronously but visual repositioning still takes 100-300ms per card. Safe auto-moves should feel instant.
**Fix**: Foundation auto-moves now 80ms with 40ms stagger between cards.

### 7. Animation Speed Setting (Effort: M)
**Problem**: No user control over animation speed. Power users want everything instant.
**Fix**: Add `animationSpeed` multiplier (0.5x = fast, 1x = normal, 2x = slow). Apply to all `duration` values. Store in localStorage. Expose in settings UI.

### 8. Touch Responsiveness (Effort: S)
**Problem**: `pointerup` event handling means there's a natural delay. Cards don't respond until finger lifts.
**Fix**: Switch to `pointerdown` for selection (immediate response). Keep `pointerup` for placement confirmation. This eliminates ~50-100ms of perceived input lag on mobile.

---

## 🟢 Polish (This Month)

### 9. Sound Pitch Variation (Effort: S) ✅ SHIPPED 2026-03-03
Rank-based pitch: Ace=0.7x → King=1.3x on foundation placement. Ascending melody during auto-complete.

### 10. Micro-Bounce on Invalid (Effort: S) ✅ SHIPPED 2026-03-03
Horizontal shake (4 half-cycles, 152ms) on invalid moves. Complements existing red flash + haptic.

### 11. Card Shadow Depth Layering (Effort: M)
Cards deeper in cascades should have less shadow. Top cards have more. Creates visual depth.

### 12. Smooth Resize Transitions (Effort: M)
Current resize snaps everything instantly. Animate card positions during resize for a polished feel.

---

## Implementation Order (Recommended)

1. **#2 Faster Animation** — smallest change, biggest feel improvement
2. **#1 Single-Tap Auto-Move** — biggest UX improvement
3. **#4 Cascade Settling** — most noticeable "juice" add
4. **#3 Auto-Complete Speed** — quick win
5. **#8 Touch Responsiveness** — mobile feel improvement
6. **#5 Card Lift Effect** — visual polish
7. **#6 Instant Foundation Auto-Move** — smooths flow
8. **#7 Animation Speed Setting** — user empowerment
