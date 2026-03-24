'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { AcesUpEngine } from '@/engine/AcesUpEngine';
import { dealAcesUpGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau, stock } = dealAcesUpGame(gameNumber);
    return new AcesUpEngine(gameNumber, tableau, stock);
  },
  getState: (engine: AcesUpEngine) => {
    const s = engine.getState();
    const foundations = new Map<Suit, Card[]>([
      [Suit.Spades, []], [Suit.Hearts, []], [Suit.Diamonds, []], [Suit.Clubs, []],
    ]);
    return {
      cascades: s.tableau as Card[][],
      foundations,
      stock: s.stock as Card[],
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: AcesUpEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    return [col[col.length - 1]];
  },
  isLegalMove: (engine: AcesUpEngine, from: any, to: any) => {
    if (from.type === 'cascade' && to.type === 'cascade') {
      // Move to empty pile
      const { canMove } = engine.canMoveToEmpty(from.index);
      if (canMove) {
        const s = engine.getState();
        return s.tableau[to.index].length === 0;
      }
    }
    return false;
  },
  executeMove: (engine: AcesUpEngine, from: any, to: any) => {
    if (from.type === 'cascade' && to.type === 'cascade') {
      engine.moveToEmpty(from.index, to.index);
    }
  },
  drawFromStock: (engine: AcesUpEngine) => { engine.dealFromStock(); },
  undo: (engine: AcesUpEngine) => { engine.undoLastMove(); },
  getHint: (engine: AcesUpEngine) => engine.getHint(),
  autoPlace: (engine: AcesUpEngine, _cardId: string) => {
    // Auto-discard: find a card that can be discarded
    const moves = engine.autoDiscardAll();
    return moves.length > 0;
  },
};

export default function AcesUpGamePage() {
  return <GenericGamePage gameName="Aces Up" gameIcon="🂡" gameHref="/aces-up" adapter={adapter} />;
}
