/**
 * useHint — hook for providing move hints in the DOM FreeCell board.
 *
 * Uses the heuristic hint engine from src/solver/solver.ts (getHint)
 * which scores all legal moves on the current FreeCellEngine and
 * returns the best one. Synchronous and fast — no worker needed.
 */

'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import { useDomFreecellStore } from '@/lib/dom-freecell/useDomFreecellStore';
import { getHint } from '@/solver/solver';
import type { Location } from '@/engine/FreeCellEngine';

export interface HintHighlight {
  /** Card IDs that should pulse / glow as the "source" */
  sourceCardIds: string[];
  /** The destination location */
  targetLocation: Location;
  /** Human-readable reason */
  reason: string;
}

/**
 * Returns the current hint (if active) and a trigger function.
 * The hint auto-clears after `durationMs` or on any move.
 */
export function useHint(durationMs = 3000) {
  const [hint, setHint] = useState<HintHighlight | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moveCount = useDomFreecellStore((s) => s.moveCount);
  const getEngine = useDomFreecellStore((s) => s.getEngine);

  // Clear hint whenever a move is made
  useEffect(() => {
    setHint(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [moveCount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const requestHint = useCallback((): boolean => {
    const engine = getEngine();
    const best = getHint(engine);
    if (!best) {
      setHint(null);
      return false;
    }

    const cardIds = best.cards.map((c) => c.id);
    setHint({
      sourceCardIds: cardIds,
      targetLocation: best.to,
      reason: best.reason,
    });

    // Auto-clear after duration
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setHint(null), durationMs);
    return true;
  }, [getEngine, durationMs]);

  const clearHint = useCallback(() => {
    setHint(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return { hint, requestHint, clearHint };
}
