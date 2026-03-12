/**
 * useDrag — pointer-locked card dragging for DOM FreeCell.
 *
 * Design goals:
 *  1. Dragged cards stay pixel-locked to the pointer with zero lag.
 *  2. ZERO React re-renders during the drag (position updates go straight
 *     to the DOM via element.style.transform).
 *  3. No board jitter — only the dragged elements move.
 *
 * Approach: on pointerdown we "lift" the original card DOM elements by
 * bumping their z-index, switching them to fixed positioning, and then
 * driving their transform every frame.  On drop we either commit the move
 * (React re-renders both source and target piles) or animate a snap-back.
 */

import { useCallback, useRef } from 'react';
import { Location } from '@/engine/FreeCellEngine';
import { domFreecellStore } from '@/lib/dom-freecell/useDomFreecellStore';
import { resolveDropTarget } from './useDropTarget';
import { playCardSelectSound, playInvalidMoveSound } from './useSoundEffects';
import { announceToScreenReader } from '@/lib/accessibility';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UseDragOptions {
  /** Card IDs that will be dragged (single card or contiguous run). */
  cardIds: string[];
  /** Where the cards currently live in the game model. */
  sourceLocation: Location;
  /** Ref to the board container — used only for z-index stacking context. */
  boardRef: React.RefObject<HTMLElement>;
}

export interface UseDragResult {
  /** Attach this to the card element's onPointerDown. */
  onPointerDown: (e: React.PointerEvent) => void;
  /** True while this card (group) is being dragged. */
  isDragging: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** z-index applied to cards while dragging so they float above everything. */
const DRAG_Z = 9999;

/** Duration (ms) of the snap-back animation when a drop is rejected. */
const SNAP_BACK_MS = 180;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve a card ID to its DOM element via data attribute. */
function cardElement(id: string): HTMLElement | null {
  return document.querySelector(`[data-card-id="${id}"]`) as HTMLElement | null;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useDrag({ cardIds, sourceLocation, boardRef }: UseDragOptions): UseDragResult {
  const draggingRef = useRef(false);
  // We store whether we're dragging in a ref so the returned `isDragging`
  // boolean causes a re-render only on drag start/end (via the store's
  // dragState selector), NOT on every pointermove.

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only primary button
      if (e.button !== 0) return;

      // Prevent text selection and other default behaviour.
      e.preventDefault();
      e.stopPropagation();

      // Capture the pointer on the target so we get moves even outside the window.
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      // --- Gather card elements -------------------------------------------
      const els: HTMLElement[] = [];
      for (const id of cardIds) {
        const el = cardElement(id);
        if (el) els.push(el);
      }
      if (els.length === 0) return;

      // --- Compute anchor offset (pointer position relative to first card) --
      const firstRect = els[0].getBoundingClientRect();
      const anchorX = e.clientX - firstRect.left;
      const anchorY = e.clientY - firstRect.top;

      // --- Snapshot each element's current screen rect so we can restore ---
      interface Snapshot {
        el: HTMLElement;
        origPosition: string;
        origZIndex: string;
        origTransform: string;
        origPointerEvents: string;
        origLeft: string;
        origTop: string;
        origWidth: string;
        /** Offset of this card relative to the first card in the run. */
        offsetX: number;
        offsetY: number;
        /** Starting screen position (for snap-back). */
        startLeft: number;
        startTop: number;
      }

      const snapshots: Snapshot[] = els.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          origPosition: el.style.position,
          origZIndex: el.style.zIndex,
          origTransform: el.style.transform,
          origPointerEvents: el.style.pointerEvents,
          origLeft: el.style.left,
          origTop: el.style.top,
          origWidth: el.style.width,
          offsetX: rect.left - firstRect.left,
          offsetY: rect.top - firstRect.top,
          startLeft: rect.left,
          startTop: rect.top,
        };
      });

      // --- Lift cards into fixed positioning --------------------------------
      snapshots.forEach((snap, i) => {
        snap.el.style.position = 'fixed';
        snap.el.style.zIndex = String(DRAG_Z + i);
        snap.el.style.left = `${snap.startLeft}px`;
        snap.el.style.top = `${snap.startTop}px`;
        snap.el.style.width = `${firstRect.width}px`;
        snap.el.style.transform = 'none';
        snap.el.style.pointerEvents = 'none';
        snap.el.style.transition = 'none';
        // Add a lifted shadow
        snap.el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.45)';
      });

      // --- Notify store (one render) ----------------------------------------
      domFreecellStore.getState().startDrag(cardIds, sourceLocation);
      draggingRef.current = true;
      playCardSelectSound();

      // --- rAF-driven position loop ----------------------------------------
      let rafId = 0;
      let lastPointerX = e.clientX;
      let lastPointerY = e.clientY;
      let needsUpdate = false;

      function applyPosition(px: number, py: number) {
        const baseLeft = px - anchorX;
        const baseTop = py - anchorY;
        for (const snap of snapshots) {
          snap.el.style.left = `${baseLeft + snap.offsetX}px`;
          snap.el.style.top = `${baseTop + snap.offsetY}px`;
        }
        // Update store ref (non-reactive) so other systems can query position
        domFreecellStore.getState().updateDragPosition(px, py);
      }

      function rafLoop() {
        if (!draggingRef.current) return;
        if (needsUpdate) {
          applyPosition(lastPointerX, lastPointerY);
          needsUpdate = false;
        }
        rafId = requestAnimationFrame(rafLoop);
      }
      rafId = requestAnimationFrame(rafLoop);

      // Apply the initial position immediately so there's no flicker.
      applyPosition(e.clientX, e.clientY);

      // --- Pointer event handlers ------------------------------------------

      function onMove(ev: PointerEvent) {
        lastPointerX = ev.clientX;
        lastPointerY = ev.clientY;
        needsUpdate = true;
      }

      function restoreElements() {
        snapshots.forEach((snap) => {
          snap.el.style.position = snap.origPosition;
          snap.el.style.zIndex = snap.origZIndex;
          snap.el.style.transform = snap.origTransform;
          snap.el.style.pointerEvents = snap.origPointerEvents;
          snap.el.style.left = snap.origLeft;
          snap.el.style.top = snap.origTop;
          snap.el.style.width = snap.origWidth;
          snap.el.style.boxShadow = '';
          snap.el.style.transition = '';
        });
      }

      function snapBack(): Promise<void> {
        return new Promise((resolve) => {
          snapshots.forEach((snap) => {
            snap.el.style.transition = `left ${SNAP_BACK_MS}ms ease-out, top ${SNAP_BACK_MS}ms ease-out`;
            snap.el.style.left = `${snap.startLeft}px`;
            snap.el.style.top = `${snap.startTop}px`;
          });
          setTimeout(() => {
            restoreElements();
            resolve();
          }, SNAP_BACK_MS);
        });
      }

      function cleanup() {
        draggingRef.current = false;
        cancelAnimationFrame(rafId);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onCancel);
      }

      async function onUp(ev: PointerEvent) {
        cleanup();

        // Hit-test for drop target.  Our cards have pointer-events:none so
        // elementFromPoint will see through them.
        const target = resolveDropTarget(ev.clientX, ev.clientY);

        let moved = false;
        if (target) {
          // Build the source Location, including cardIndex for cascade runs.
          moved = domFreecellStore.getState().tryMove(sourceLocation, target);
        }

        if (moved) {
          // The store re-rendered — cards are now in their new DOM positions.
          // We need to clean up inline styles so React is back in control.
          restoreElements();
          // Announce the move to screen readers
          const state = domFreecellStore.getState();
          if (state.isWon) {
            // Win announcement is handled by DomGameShell
          } else if (target && target.type === 'foundation') {
            announceToScreenReader('Card moved to foundation');
          } else {
            announceToScreenReader('Card moved');
          }
        } else {
          // Invalid move — play error sound and animate back to origin.
          playInvalidMoveSound();
          announceToScreenReader('Invalid move', 'assertive');
          await snapBack();
        }

        domFreecellStore.getState().endDrag();
      }

      function onCancel() {
        cleanup();
        // Fire-and-forget snap back
        snapBack().then(() => {
          domFreecellStore.getState().endDrag();
        });
      }

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onCancel);
    },
    // cardIds and sourceLocation are expected to be stable per-card.
    // boardRef is a ref and never changes identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cardIds, sourceLocation, boardRef],
  );

  // Derive isDragging from the store so React sees start/end transitions.
  const storeDrag = domFreecellStore.getState().dragState;
  const isDragging =
    draggingRef.current &&
    storeDrag !== null &&
    storeDrag.cardIds.length > 0 &&
    storeDrag.cardIds[0] === cardIds[0];

  return { onPointerDown, isDragging };
}
