'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { YukonEngine } from '@/engine/YukonEngine';
import { dealYukonGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { cascades } = dealYukonGame(gameNumber);
    return new YukonEngine(gameNumber, cascades);
  },
  getState: (engine: YukonEngine) => {
    const s = engine.getState();
    return {
      cascades: s.cascades as Card[][],
      foundations: s.foundations as Map<Suit, Card[]>,
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: YukonEngine, i: number) => engine.getValidRun(i),
  isLegalMove: (engine: YukonEngine, from: any, to: any) => engine.isLegalMove(from, to),
  executeMove: (engine: YukonEngine, from: any, to: any) => { engine.executeMove(from, to); },
  undo: (engine: YukonEngine) => { engine.undoLastMove(); },
  getHint: (engine: YukonEngine) => engine.getHint(),
  autoPlace: (engine: YukonEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    return moves.length > 0;
  },
};

export default function YukonGamePage() {
  return <GenericGamePage gameName="Yukon" gameIcon="🃏" gameHref="/yukon" adapter={adapter} />;
}
