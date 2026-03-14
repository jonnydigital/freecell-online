/**
 * useDrag — pointer-locked card dragging + click-to-select for DOM FreeCell.
 *
 * Design goals:
 *  1. Dragged cards stay pixel-locked to the pointer with zero lag.
 *  2. ZERO React re-renders during the drag (position updates go straight
 *     to the DOM via element.style.transform).
 *  3. No board jitter — only the dragged elements move.
 *  4. Click-to-select: short taps (< threshold movement) select cards
 *     instead of dragging, enabling tap-to-move on mobile.
 *
 * Approach: on pointerdown we record the start position. If the pointer moves
 * beyond DRAG_THRESHOLD we "lift" the cards and begin dragging. If the pointer
 * is released without crossing the threshold, it's treated as a click for
 * the select-and-place system.
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

/** Minimum pointer movement (px) before a pointerdown becomes a drag. */
const DRAG_THRESHOLD = 5;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve a card ID to its DOM element via data attribute. */
function cardElement(id: string): HTMLElement | null {
  return document.querySelector(`[data-card-id="${id}"]`) as HTMLElement | null;
}

/** Check if two Locations refer to the same pile. */
function samePile(a: Location, b: Location): boolean {
  if (a.type !== b.type) return false;
  if (a.type === 'foundation' && b.type === 'foundation') return a.suit === b.suit;
  if ('index' in a && 'index' in b) return a.index === b.index;
  return false;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useDrag({ cardIds, sourceLocation, boardRef }: UseDragOptions): UseDragResult {
  const draggingRef = useRef(false);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only primary button
      if (e.button !== 0) return;

      // Prevent text selection and other default behaviour.
      e.preventDefault();
      e.stopPropagation();

      // Capture the pointer on the target so we get moves even outside the window.
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      const startX = e.clientX;
      const startY = e.clientY;
      let dragStarted = false;

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
        offsetX: number;
        offsetY: number;
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

      // --- Drag helpers (only used once threshold is crossed) ---------------

      let rafId = 0;
      let lastPointerX = e.clientX;
      let lastPointerY = e.clientY;
      let needsUpdate = false;

      function liftCards() {
        snapshots.forEach((snap, i) => {
          snap.el.style.position = 'fixed';
          snap.el.style.zIndex = String(DRAG_Z + i);
          snap.el.style.left = `${snap.startLeft}px`;
          snap.el.style.top = `${snap.startTop}px`;
          snap.el.style.width = `${firstRect.width}px`;
          snap.el.style.transform = 'none';
          snap.el.style.pointerEvents = 'none';
          snap.el.style.transition = 'none';
          snap.el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.45)';
        });
      }

      function applyPosition(px: number, py: number) {
        const baseLeft = px - anchorX;
        const baseTop = py - anchorY;
        for (const snap of snapshots) {
          snap.el.style.left = `${baseLeft + snap.offsetX}px`;
          snap.el.style.top = `${baseTop + snap.offsetY}px`;
        }
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

      function beginDrag() {
        dragStarted = true;
        liftCards();
        domFreecellStore.getState().startDrag(cardIds, sourceLocation);
        draggingRef.current = true;
        playCardSelectSound();
        applyPosition(lastPointerX, lastPointerY);
        rafId = requestAnimationFrame(rafLoop);
      }

      // --- Click-to-select handler -----------------------------------------

      function handleClick() {
        const store = domFreecellStore.getState();
        const selection = store.selection;

        if (selection) {
          // There's a current selection — try to move it to this card's pile
          if (samePile(selection.sourceLocation, sourceLocation)) {
            // Clicked the same pile — deselect
            store.clearSelection();
          } else {
            // Try to move selection to the pile we clicked on
            const targetLoc: Location =
              sourceLocation.type === 'cascade'
                ? { type: 'cascade', index: sourceLocation.index }
                : sourceLocation;
            const moved = store.tryMove(selection.sourceLocation, targetLoc);
            if (moved) {
              store.clearSelection();
              announceToScreenReader('Card moved');
            } else {
              // Move failed — select the new card instead
              playInvalidMoveSound();
              store.selectCards(cardIds, sourceLocation);
              playCardSelectSound();
            }
          }
        } else {
          // No selection — select this card/run
          store.selectCards(cardIds, sourceLocation);
          playCardSelectSound();
        }
      }

      // --- Pointer event handlers ------------------------------------------

      function cleanup() {
        draggingRef.current = false;
        cancelAnimationFrame(rafId);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onCancel);
      }

      function onMove(ev: PointerEvent) {
        lastPointerX = ev.clientX;
        lastPointerY = ev.clientY;

        if (!dragStarted) {
          const dx = ev.clientX - startX;
          const dy = ev.clientY - startY;
          if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
            beginDrag();
          }
          return;
        }

        needsUpdate = true;
      }

      async function onUp(ev: PointerEvent) {
        cleanup();

        if (!dragStarted) {
          // Pointer didn't move enough — treat as click
          handleClick();
          return;
        }

        // --- Drag ended: resolve drop target ---
        const target = resolveDropTarget(ev.clientX, ev.clientY);

        let moved = false;
        if (target) {
          moved = domFreecellStore.getState().tryMove(sourceLocation, target);
        }

        if (moved) {
          restoreElements();
          const state = domFreecellStore.getState();
          if (state.isWon) {
            // Win announcement is handled by DomGameShell
          } else if (target && target.type === 'foundation') {
            announceToScreenReader('Card moved to foundation');
          } else {
            announceToScreenReader('Card moved');
          }
        } else {
          playInvalidMoveSound();
          announceToScreenReader('Invalid move', 'assertive');
          await snapBack();
        }

        domFreecellStore.getState().endDrag();
      }

      function onCancel() {
        cleanup();
        if (dragStarted) {
          snapBack().then(() => {
            domFreecellStore.getState().endDrag();
          });
        }
      }

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onCancel);
    },
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
