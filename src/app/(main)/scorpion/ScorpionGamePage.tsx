'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { ScorpionEngine } from '@/engine/ScorpionEngine';
import { dealScorpionGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau, reserve } = dealScorpionGame(gameNumber);
    return new ScorpionEngine(gameNumber, tableau, reserve);
  },
  getState: (engine: ScorpionEngine) => {
    const s = engine.getState();
    // Scorpion has no traditional foundations; use empty map
    const foundations = new Map<Suit, Card[]>([
      [Suit.Spades, []], [Suit.Hearts, []], [Suit.Diamonds, []], [Suit.Clubs, []],
    ]);
    return {
      cascades: s.tableau as Card[][],
      foundations,
      stock: s.reserve.length > 0 ? s.reserve as Card[] : undefined,
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: ScorpionEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    // All face-up cards from the cascade can be moved
    const firstFaceUp = col.findIndex(c => c.isFaceUp);
    if (firstFaceUp === -1) return [];
    return col.slice(firstFaceUp);
  },
  isLegalMove: (engine: ScorpionEngine, from: any, to: any) => engine.isLegalMove(from, to),
  executeMove: (engine: ScorpionEngine, from: any, to: any) => { engine.executeMove(from, to); },
  drawFromStock: (engine: ScorpionEngine) => { engine.dealReserve(); },
  undo: (engine: ScorpionEngine) => { engine.undoLastMove(); },
  getHint: (engine: ScorpionEngine) => engine.getHint(),
};

export default function ScorpionGamePage() {
  return <GenericGamePage gameName="Scorpion" gameIcon="🦂" gameHref="/scorpion" adapter={adapter} />;
}
