'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { BeleagueredCastleEngine } from '@/engine/BeleagueredCastleEngine';
import { dealBeleagueredCastleGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau, aces } = dealBeleagueredCastleGame(gameNumber);
    return new BeleagueredCastleEngine(gameNumber, tableau, aces);
  },
  getState: (engine: BeleagueredCastleEngine) => {
    const s = engine.getState();
    return {
      cascades: s.tableau as Card[][],
      foundations: s.foundations as Map<Suit, Card[]>,
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: BeleagueredCastleEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    return [col[col.length - 1]];
  },
  isLegalMove: (engine: BeleagueredCastleEngine, from: any, to: any) => engine.isLegalMove(from, to),
  executeMove: (engine: BeleagueredCastleEngine, from: any, to: any) => { engine.executeMove(from, to); },
  undo: (engine: BeleagueredCastleEngine) => { engine.undoLastMove(); },
  getHint: (engine: BeleagueredCastleEngine) => engine.getHint(),
  autoPlace: (engine: BeleagueredCastleEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    return moves.length > 0;
  },
};

export default function BeleagueredCastleGamePage() {
  return <GenericGamePage gameName="Beleaguered Castle" gameIcon="🏰" gameHref="/beleaguered-castle" adapter={adapter} />;
}
