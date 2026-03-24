'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { LaBelleLucieEngine } from '@/engine/LaBelleLucieEngine';
import { dealLaBelleLucieGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau } = dealLaBelleLucieGame(gameNumber);
    return new LaBelleLucieEngine(gameNumber, tableau);
  },
  getState: (engine: LaBelleLucieEngine) => {
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
  getValidRun: (engine: LaBelleLucieEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    return [col[col.length - 1]];
  },
  isLegalMove: (engine: LaBelleLucieEngine, from: any, to: any) => engine.isLegalMove(from, to),
  executeMove: (engine: LaBelleLucieEngine, from: any, to: any) => { engine.executeMove(from, to); },
  drawFromStock: (engine: LaBelleLucieEngine) => { engine.redeal(); },
  undo: (engine: LaBelleLucieEngine) => { engine.undoLastMove(); },
  getHint: (engine: LaBelleLucieEngine) => engine.getHint(),
  autoPlace: (engine: LaBelleLucieEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    return moves.length > 0;
  },
};

export default function LaBelleLucieGamePage() {
  return <GenericGamePage gameName="La Belle Lucie" gameIcon="💐" gameHref="/la-belle-lucie" adapter={adapter} />;
}
