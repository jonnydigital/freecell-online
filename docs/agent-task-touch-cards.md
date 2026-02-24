# Agent Task: Fix Touch Precision + Upgrade Card Graphics

## Context
FreeCell solitaire game (Next.js + Phaser 3.87). Mobile touch is unreliable — cards are hard to tap precisely because overlapping cascade cards have tiny visible strips (~25px).

## Priority 1: Fix Touch/Tap Precision

### The Problem
Cards in cascades overlap heavily. The hit areas overlap and Phaser doesn't reliably detect which card was tapped. Users can't select the card they want.

### The Solution (from research):

1. **Use priorityID for depth sorting**: Each card's `input.priorityID` should be set based on its position in the stack. Higher index = higher priority. This ensures the topmost visible card captures the tap.

```javascript
card.setInteractive();  
card.input.priorityID = stackIndex;
```

2. **Set input.topOnly = true**: Ensures only the highest-priority card at the tap point gets the event.

```javascript
this.input.setTopOnly(true);
```

3. **Tap-to-Select State Machine**: 
   - First tap: select the card (highlight it with glow/tint)
   - Second tap on valid destination: move the card there
   - Second tap on another movable card: switch selection
   - Tap on empty area: deselect
   - Double-tap: auto-move to foundation (already implemented)

4. **Expand hit areas for thin visible strips**: For buried cards where only a thin strip is visible, expand the hit area slightly:
```javascript
card.setInteractive(
    new Phaser.Geom.Rectangle(-5, -5, cardWidth + 10, visibleHeight + 10),
    Phaser.Geom.Rectangle.Contains
);
```

5. **Visual feedback is CRITICAL**: 
   - Selected card: subtle yellow/gold tint or border glow
   - Valid drop targets: highlight with green glow when a card is selected
   - Invalid tap: brief red flash

6. **Tap empty free cell or foundation**: When a card is selected, tapping an empty free cell should move it there. Tapping a foundation should attempt to place it.

## Priority 2: Better Card Rendering

### Current State
Cards are rendered with basic Phaser graphics (rectangles with text). They look like developer placeholders.

### The Fix
Instead of generating cards with basic shapes, render them with proper card faces:

1. Create a card texture atlas at game boot time using Canvas 2D rendering
2. Each card face should have:
   - White background with rounded corners (8px radius)
   - Rank in top-left and bottom-right (rotated) corners
   - Suit symbol in center
   - Red (#c0392b) for hearts/diamonds, black (#1a1a1a) for spades/clubs
   - Clean sans-serif font for ranks (bold, clear at small sizes)
   - Proper suit symbols: ♠ ♥ ♦ ♣ (large, crisp)
   - For face cards (J, Q, K): Add a colored center band with the letter
   
3. Card dimensions: maintain CARD_RATIO (0.714 = 5:7)

4. Card back: Dark green/navy with diamond crosshatch pattern

5. Drop shadow should be subtle (2px blur, slight offset)

## Priority 3: Polish Touch Interactions

1. When dragging a card, show a semi-transparent "ghost" in the original position
2. Snap animation when dropping: card smoothly animates to final position (200ms ease-out)
3. Invalid move: card bounces back to original position with a slight shake
4. Haptic feedback: navigator.vibrate(10) on select, vibrate(5) on move

## Technical Notes
- src/game/FreeCellScene.ts: main Phaser scene
- src/game/PhaserConfig.ts: game config  
- Card creation: look for createCardSprite() method
- The game already has click-to-move partially implemented — improve it

## When Done
- npm run build (verify clean)
- Test by checking that touch interactions make logical sense
- Commit with descriptive message
- Push to main
