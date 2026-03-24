'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { CruelEngine } from '@/engine/CruelEngine';
import { dealCruelGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau, aces } = dealCruelGame(gameNumber);
    return new CruelEngine(gameNumber, tableau, aces);
  },
  getState: (engine: CruelEngine) => {
    const s = engine.getState();
    return {
      cascades: s.tableau as Card[][],
      foundations: s.foundations as Map<Suit, Card[]>,
      stock: [1] as any as Card[], // Dummy stock to show redeal button
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: CruelEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    return [col[col.length - 1]];
  },
  isLegalMove: (engine: CruelEngine, from: any, to: any) => engine.isLegalMove(from, to),
  executeMove: (engine: CruelEngine, from: any, to: any) => { engine.executeMove(from, to); },
  drawFromStock: (engine: CruelEngine) => { engine.redeal(); },
  undo: (engine: CruelEngine) => { engine.undoLastMove(); },
  getHint: (engine: CruelEngine) => engine.getHint(),
  autoPlace: (engine: CruelEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    return moves.length > 0;
  },
};

export default function CruelGamePage() {
  return <GenericGamePage gameName="Cruel" gameIcon="😈" gameHref="/cruel" adapter={adapter} />;
}
