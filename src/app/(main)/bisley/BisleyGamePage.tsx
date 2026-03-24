'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { BisleyEngine } from '@/engine/BisleyEngine';
import { dealBisleyGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

function combinedFoundations(engine: BisleyEngine): Map<Suit, Card[]> {
  const s = engine.getState();
  const result = new Map<Suit, Card[]>();
  for (const suit of [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs]) {
    const aceF = (s.aceFoundations as Map<Suit, Card[]>).get(suit) ?? [];
    const kingF = (s.kingFoundations as Map<Suit, Card[]>).get(suit) ?? [];
    // Show ace foundation progress (building up) for the display
    result.set(suit, [...aceF]);
  }
  return result;
}

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau, aces } = dealBisleyGame(gameNumber);
    return new BisleyEngine(gameNumber, tableau, aces);
  },
  getState: (engine: BisleyEngine) => {
    const s = engine.getState();
    return {
      cascades: s.tableau as Card[][],
      foundations: combinedFoundations(engine),
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: BisleyEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    return [col[col.length - 1]];
  },
  isLegalMove: (engine: BisleyEngine, from: any, to: any) => {
    // Map generic foundation to aceFoundation or kingFoundation
    if (to.type === 'foundation' && from.type === 'cascade') {
      const s = engine.getState();
      const col = s.tableau[from.index];
      if (col.length === 0) return false;
      // Try both ace and king foundations
      try {
        if (engine.isLegalMove(from, { type: 'aceFoundation', suit: to.suit })) return true;
      } catch {}
      try {
        if (engine.isLegalMove(from, { type: 'kingFoundation', suit: to.suit })) return true;
      } catch {}
      return false;
    }
    return engine.isLegalMove(from, to);
  },
  executeMove: (engine: BisleyEngine, from: any, to: any) => {
    if (to.type === 'foundation' && from.type === 'cascade') {
      // Try ace foundation first, then king
      try {
        engine.executeMove(from, { type: 'aceFoundation', suit: to.suit });
        return;
      } catch {}
      engine.executeMove(from, { type: 'kingFoundation', suit: to.suit });
      return;
    }
    engine.executeMove(from, to);
  },
  undo: (engine: BisleyEngine) => { engine.undoLastMove(); },
  getHint: (engine: BisleyEngine) => engine.getHint(),
  autoPlace: (engine: BisleyEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    return moves.length > 0;
  },
};

export default function BisleyGamePage() {
  return <GenericGamePage gameName="Bisley" gameIcon="🎯" gameHref="/bisley" adapter={adapter} />;
}
