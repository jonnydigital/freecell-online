'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { FlowerGardenEngine } from '@/engine/FlowerGardenEngine';
import { dealFlowerGardenGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const mapLoc = (loc: any) => {
  if (loc.type === 'cascade') return { type: 'tableau' as const, index: loc.index };
  if (loc.type === 'foundation') return { type: 'foundation' as const, suit: loc.suit };
  if (loc.type === 'reserve') return { type: 'bouquet' as const, cardIndex: 0 };
  return loc;
};

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau, bouquet } = dealFlowerGardenGame(gameNumber);
    return new FlowerGardenEngine(gameNumber, tableau, bouquet);
  },
  getState: (engine: FlowerGardenEngine) => {
    const s = engine.getState();
    return {
      cascades: s.tableau as Card[][],
      foundations: s.foundations as Map<Suit, Card[]>,
      reserve: s.bouquet as Card[],
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: FlowerGardenEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    return [col[col.length - 1]];
  },
  isLegalMove: (engine: FlowerGardenEngine, from: any, to: any) => engine.isLegalMove(mapLoc(from), mapLoc(to)),
  executeMove: (engine: FlowerGardenEngine, from: any, to: any) => { engine.executeMove(mapLoc(from), mapLoc(to)); },
  undo: (engine: FlowerGardenEngine) => { engine.undoLastMove(); },
  getHint: (engine: FlowerGardenEngine) => engine.getHint(),
  autoPlace: (engine: FlowerGardenEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    return moves.length > 0;
  },
};

export default function FlowerGardenGamePage() {
  return <GenericGamePage gameName="Flower Garden" gameIcon="🌸" gameHref="/flower-garden" adapter={adapter} />;
}
