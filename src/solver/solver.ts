/**
 * FreeCell Hint Engine
 * 
 * Provides move suggestions using heuristic analysis.
 * Phase 1: Heuristic-based hints (no external solver)
 * Phase 2: fc-solve WASM integration (future)
 * 
 * The heuristic approach scores each legal move and suggests the best one.
 */

import { FreeCellEngine, Move, Location } from '../engine/FreeCellEngine';
import { Card, Suit, Color } from '../engine/Card';

interface ScoredMove extends Move {
  score: number;
  reason: string;
}

/**
 * Get the best move hint for the current game state
 */
export function getHint(engine: FreeCellEngine): ScoredMove | null {
  const moves = engine.getLegalMoves();
  if (moves.length === 0) return null;

  const scoredMoves: ScoredMove[] = moves.map((move) => ({
    ...move,
    ...scoreMove(engine, move),
  }));

  // Sort by score descending
  scoredMoves.sort((a, b) => b.score - a.score);

  return scoredMoves[0];
}

/**
 * Get all moves ranked by quality
 */
export function getHints(engine: FreeCellEngine, limit: number = 3): ScoredMove[] {
  const moves = engine.getLegalMoves();
  if (moves.length === 0) return [];

  const scoredMoves: ScoredMove[] = moves.map((move) => ({
    ...move,
    ...scoreMove(engine, move),
  }));

  scoredMoves.sort((a, b) => b.score - a.score);
  return scoredMoves.slice(0, limit);
}

function scoreMove(
  engine: FreeCellEngine,
  move: Move
): { score: number; reason: string } {
  let score = 0;
  let reason = '';
  const card = move.cards[0];
  const state = engine.getState();

  // Highest priority: move to foundation
  if (move.to.type === 'foundation') {
    score += 100;
    reason = `Move ${card.toString()} to foundation`;
    // Aces and 2s are always great
    if (card.rank <= 2) score += 50;
    return { score, reason };
  }

  // Move from free cell back to cascade (free up cell)
  if (move.from.type === 'freecell' && move.to.type === 'cascade') {
    score += 40;
    reason = `Free up cell: move ${card.toString()} to cascade`;
  }

  // Move to cascade
  if (move.to.type === 'cascade') {
    const targetCascade = state.cascades[(move.to as { type: 'cascade'; index: number }).index];

    if (targetCascade.length === 0) {
      // Moving to empty column
      if (card.rank === 13) {
        score += 30; // Kings to empty columns is good
        reason = `Move King to empty column`;
      } else {
        score -= 10; // Don't waste empty columns on non-Kings
        reason = `Move ${card.toString()} to empty column (not ideal)`;
      }
    } else {
      // Building on existing cascade
      score += 20;
      reason = `Build ${card.toString()} on cascade`;

      // Bonus for same-suit sequences (easier to move to foundation later)
      const target = targetCascade[targetCascade.length - 1];
      if (card.suit === target.suit) {
        score += 10;
        reason += ' (same suit!)';
      }
    }

    // Bonus for uncovering lower cards
    if (move.from.type === 'cascade') {
      const sourceCascade = state.cascades[(move.from as { type: 'cascade'; index: number }).index];
      const cardIdx = move.from.cardIndex ?? sourceCascade.length - 1;
      if (cardIdx > 0) {
        const uncovered = sourceCascade[cardIdx - 1];
        if (uncovered.rank <= 3) {
          score += 25; // Uncovering low cards is great
          reason += ` (uncovers ${uncovered.toString()})`;
        }
      }
      // Bonus for emptying a column
      if (cardIdx === 0) {
        score += 35;
        reason = `Empty a column by moving ${card.toString()}`;
      }
    }
  }

  // Move to free cell (usually bad, but sometimes necessary)
  if (move.to.type === 'freecell') {
    score -= 5;
    reason = `Park ${card.toString()} in free cell`;

    // Better if it uncovers something useful
    if (move.from.type === 'cascade') {
      const sourceCascade = state.cascades[(move.from as { type: 'cascade'; index: number }).index];
      const cardIdx = sourceCascade.length - 1;
      if (cardIdx > 0) {
        const uncovered = sourceCascade[cardIdx - 1];
        const foundTop = engine.getFoundationTop(uncovered.suit);
        if (uncovered.canMoveToFoundation(foundTop)) {
          score += 60; // Uncovers a card that goes straight to foundation
          reason = `Park ${card.toString()} to uncover ${uncovered.toString()} → foundation`;
        }
      }
    }
  }

  return { score, reason };
}
