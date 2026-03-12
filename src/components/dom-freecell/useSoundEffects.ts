/**
 * useSoundEffects — passive observer that plays sound effects
 * in response to game state changes in the DomFreecell store.
 *
 * Call once inside DomBoard. Does NOT modify the store.
 */

import { useEffect, useRef } from 'react';
import { soundManager } from '@/lib/sounds';
import { domFreecellStore, DomFreecellState } from '@/lib/dom-freecell/useDomFreecellStore';
import { Card, Suit } from '@/engine/Card';

/** Count total cards across all foundation piles. */
function foundationTotal(foundations: Map<Suit, Card[]>): number {
  let total = 0;
  foundations.forEach((pile) => {
    total += pile.length;
  });
  return total;
}

export function useSoundEffects(): void {
  // Track previous values to detect deltas
  const prevRef = useRef<{
    moveCount: number;
    foundationCount: number;
    isWon: boolean;
    gameNumber: number;
    moveHistoryLength: number;
  } | null>(null);

  useEffect(() => {
    // Initialise prev snapshot from current state (no sound on mount)
    const initial = domFreecellStore.getState();
    prevRef.current = {
      moveCount: initial.moveCount,
      foundationCount: foundationTotal(initial.foundations),
      isWon: initial.isWon,
      gameNumber: initial.gameNumber,
      moveHistoryLength: initial.moveHistory.length,
    };

    const unsub = domFreecellStore.subscribe((state: DomFreecellState) => {
      const prev = prevRef.current;
      if (!prev) return;

      const currentFoundationCount = foundationTotal(state.foundations);

      // --- New game started ---
      if (state.gameNumber !== prev.gameNumber) {
        soundManager.deal();
      }

      // --- Win ---
      else if (state.isWon && !prev.isWon) {
        soundManager.winFanfare();
      }

      // --- Undo (move history shrank) ---
      else if (state.moveHistory.length < prev.moveHistoryLength) {
        soundManager.undo();
      }

      // --- Move happened (moveCount increased) ---
      else if (state.moveCount > prev.moveCount) {
        // Did foundation grow? => foundation sound
        if (currentFoundationCount > prev.foundationCount) {
          // Use the highest rank across all foundation piles for ascending pitch
          let maxRank = 1;
          state.foundations.forEach((pile) => {
            if (pile.length > 0) {
              const topRank = pile[pile.length - 1].rank;
              if (topRank > maxRank) maxRank = topRank;
            }
          });
          soundManager.cardToFoundation(maxRank);
        } else {
          // Regular cascade/freecell placement
          soundManager.cardPlace();
        }

        // Track for combo sounds
        soundManager.trackMove();
      }

      // Update prev snapshot
      prevRef.current = {
        moveCount: state.moveCount,
        foundationCount: currentFoundationCount,
        isWon: state.isWon,
        gameNumber: state.gameNumber,
        moveHistoryLength: state.moveHistory.length,
      };
    });

    return unsub;
  }, []);
}

/**
 * Play the error/invalid-move sound.
 * Exported for use by the drag system on snap-back.
 */
export function playInvalidMoveSound(): void {
  soundManager.invalidMove();
}

/**
 * Play the card-select sound.
 * Exported for use by the drag system on drag start.
 */
export function playCardSelectSound(): void {
  soundManager.cardSelect();
}
