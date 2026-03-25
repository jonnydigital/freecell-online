'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { BakersDozenEngine } from '@/engine/BakersDozenEngine';
import { dealBakersDozenGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau } = dealBakersDozenGame(gameNumber);
    return new BakersDozenEngine(gameNumber, tableau);
  },
  getState: (engine: BakersDozenEngine) => {
    const s = engine.getState();
    return {
      cascades: s.tableau as Card[][],
      foundations: s.foundations as Map<Suit, Card[]>,
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: BakersDozenEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    return [col[col.length - 1]];
  },
  isLegalMove: (engine: BakersDozenEngine, from: any, to: any) => {
    return engine.isLegalMove(from, to);
  },
  executeMove: (engine: BakersDozenEngine, from: any, to: any) => {
    engine.executeMove(from, to);
  },
  undo: (engine: BakersDozenEngine) => { engine.undoLastMove(); },
  getHint: (engine: BakersDozenEngine) => engine.getHint(),
  autoPlace: (engine: BakersDozenEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    return moves.length > 0;
  },
};

export default function BakersDozenGamePage() {
  return <GenericGamePage gameName="Baker's Dozen" gameIcon="🃏" gameHref="/bakers-dozen" adapter={adapter} />;
}
