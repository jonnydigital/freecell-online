'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { PenguinEngine } from '@/engine/PenguinEngine';
import { dealPenguinGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const mapLoc = (loc: any) => {
  if (loc.type === 'cascade') return { type: 'tableau' as const, index: loc.index, cardIndex: loc.cardIndex };
  if (loc.type === 'foundation') return { type: 'foundation' as const, suit: loc.suit };
  if (loc.type === 'freecell') return { type: 'flipper' as const };
  return loc;
};

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau, flipper, beakRank, foundationCards } = dealPenguinGame(gameNumber);
    return new PenguinEngine(gameNumber, tableau, flipper, foundationCards, beakRank);
  },
  getState: (engine: PenguinEngine) => {
    const s = engine.getState();
    return {
      cascades: s.tableau as Card[][],
      foundations: s.foundations as Map<Suit, Card[]>,
      freeCells: [s.flipper] as (Card | null)[],
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: PenguinEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    // Find longest movable same-suit descending sequence from bottom
    for (let j = 0; j < col.length; j++) {
      const seq = engine.getMovableSequence(i, j);
      if (seq && seq.length === col.length - j) return seq;
    }
    return [col[col.length - 1]];
  },
  isLegalMove: (engine: PenguinEngine, from: any, to: any) => engine.isLegalMove(mapLoc(from), mapLoc(to)),
  executeMove: (engine: PenguinEngine, from: any, to: any) => { engine.executeMove(mapLoc(from), mapLoc(to)); },
  undo: (engine: PenguinEngine) => { engine.undoLastMove(); },
  getHint: (engine: PenguinEngine) => engine.getHint(),
  autoPlace: (engine: PenguinEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    return moves.length > 0;
  },
};

export default function PenguinGamePage() {
  return <GenericGamePage gameName="Penguin" gameIcon="🐧" gameHref="/penguin" adapter={adapter} />;
}
