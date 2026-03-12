/**
 * DragOverlay — optional visual overlay for DOM FreeCell drag.
 *
 * In the primary drag approach (useDrag.ts) we manipulate the original
 * card elements directly, so a separate overlay is not strictly required.
 *
 * This component exists as a lightweight fallback / debug aid.  When drag
 * is active it renders a semi-transparent "ghost" of the dragged cards
 * that tracks the pointer via a rAF loop reading the store's non-reactive
 * drag position.
 *
 * Usage:
 *   <DragOverlay cardRenderer={renderCardById} />
 *
 * Mount this at the board level (NOT inside a pile).
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { domFreecellStore, useDomFreecellStore } from '@/lib/dom-freecell/useDomFreecellStore';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DragOverlayProps {
  /**
   * A render function that, given a card ID, returns the visual element for
   * that card.  The overlay will call this for each card in the drag group.
   * If omitted the overlay renders simple placeholder boxes.
   */
  cardRenderer?: (cardId: string) => React.ReactNode;
  /**
   * Vertical overlap in px between cards in a run inside the overlay.
   * Should match the cascade card overlap used in the board layout.
   * @default 28
   */
  cardOverlap?: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const DragOverlay: React.FC<DragOverlayProps> = ({
  cardRenderer,
  cardOverlap = 28,
}) => {
  const dragState = useDomFreecellStore((s) => s.dragState);
  const containerRef = useRef<HTMLDivElement>(null);

  // rAF loop: read non-reactive drag position and apply to container transform.
  useEffect(() => {
    if (!dragState) return;

    let rafId: number;

    function tick() {
      const { currentX, currentY } = domFreecellStore.getState().getDragPosition();
      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [dragState]);

  if (!dragState) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 10000,
        willChange: 'transform',
      }}
    >
      {dragState.cardIds.map((id, i) => (
        <div
          key={id}
          style={{
            position: i === 0 ? 'relative' : 'absolute',
            top: i === 0 ? 0 : i * cardOverlap,
            left: 0,
            opacity: 0.85,
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
          }}
        >
          {cardRenderer ? (
            cardRenderer(id)
          ) : (
            <div
              style={{
                width: 72,
                height: 100,
                borderRadius: 6,
                background: '#1a5c1a',
                border: '2px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 12,
                fontFamily: 'monospace',
              }}
            >
              {id}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
