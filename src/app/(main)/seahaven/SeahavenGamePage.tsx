'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { SeahavenEngine } from '@/engine/SeahavenEngine';
import { dealSeahavenGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau, freeCellCards } = dealSeahavenGame(gameNumber);
    return new SeahavenEngine(gameNumber, tableau, freeCellCards);
  },
  getState: (engine: SeahavenEngine) => {
    const s = engine.getState();
    return {
      cascades: s.tableau as Card[][],
      foundations: s.foundations as Map<Suit, Card[]>,
      freeCells: s.freeCells as (Card | null)[],
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: SeahavenEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    // Seahaven: single card moves only
    return [col[col.length - 1]];
  },
  isLegalMove: (engine: SeahavenEngine, from: any, to: any) => engine.isLegalMove(from, to),
  executeMove: (engine: SeahavenEngine, from: any, to: any) => { engine.executeMove(from, to); },
  undo: (engine: SeahavenEngine) => { engine.undoLastMove(); },
  getHint: (engine: SeahavenEngine) => engine.getHint(),
  autoPlace: (engine: SeahavenEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    return moves.length > 0;
  },
};

export default function SeahavenGamePage() {
  return <GenericGamePage gameName="Seahaven Towers" gameIcon="🗼" gameHref="/seahaven" adapter={adapter} />;
}
