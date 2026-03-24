'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { FreeCellEngine } from '@/engine/FreeCellEngine';
import { Card, Suit } from '@/engine/Card';

const moveHistory: any[] = [];

const adapter = {
  createEngine: (gameNumber: number) => {
    moveHistory.length = 0;
    return new FreeCellEngine(gameNumber, 'freecell');
  },
  getState: (engine: FreeCellEngine) => {
    const s = engine.getState();
    return {
      cascades: s.cascades as Card[][],
      foundations: s.foundations as Map<Suit, Card[]>,
      freeCells: s.freeCells as (Card | null)[],
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: FreeCellEngine, i: number) => engine.getValidRun(i),
  isLegalMove: (engine: FreeCellEngine, from: any, to: any) => engine.isLegalMove(from, to),
  executeMove: (engine: FreeCellEngine, from: any, to: any) => {
    const move = engine.executeMove(from, to);
    moveHistory.push(move);
  },
  undo: (engine: FreeCellEngine) => {
    const move = moveHistory.pop();
    if (move) engine.undoMove(move);
  },
  autoPlace: (engine: FreeCellEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    moveHistory.push(...moves);
    return moves.length > 0;
  },
};

export default function StormPage() {
  return <GenericGamePage gameName="Puzzle Storm" gameIcon="⚡" gameHref="/storm" adapter={adapter} />;
}
