'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { FortyThievesEngine } from '@/engine/FortyThievesEngine';
import { dealFortyThievesGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

function foundationsToSuitMap(foundations: Map<string, Card[]>): Map<Suit, Card[]> {
  const suitMap: Record<string, Suit> = { S: Suit.Spades, H: Suit.Hearts, D: Suit.Diamonds, C: Suit.Clubs };
  const result = new Map<Suit, Card[]>([
    [Suit.Spades, []], [Suit.Hearts, []], [Suit.Diamonds, []], [Suit.Clubs, []],
  ]);
  // For display: show the pile with more cards for each suit
  for (const [key, pile] of foundations) {
    const suit = suitMap[key[0]];
    const existing = result.get(suit)!;
    if (pile.length > existing.length) result.set(suit, [...pile]);
  }
  return result;
}

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau, stock } = dealFortyThievesGame(gameNumber);
    return new FortyThievesEngine(gameNumber, tableau, stock);
  },
  getState: (engine: FortyThievesEngine) => {
    const s = engine.getState();
    return {
      cascades: s.tableau as Card[][],
      foundations: foundationsToSuitMap(s.foundations as Map<string, Card[]>),
      stock: s.stock as Card[],
      waste: s.waste as Card[],
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: FortyThievesEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    // Single card moves only
    return [col[col.length - 1]];
  },
  isLegalMove: (engine: FortyThievesEngine, from: any, to: any) => engine.isLegalMove(from, to),
  executeMove: (engine: FortyThievesEngine, from: any, to: any) => { engine.executeMove(from, to); },
  drawFromStock: (engine: FortyThievesEngine) => { engine.drawFromStock(); },
  undo: (engine: FortyThievesEngine) => { engine.undoLastMove(); },
  getHint: (engine: FortyThievesEngine) => engine.getHint(),
  autoPlace: (engine: FortyThievesEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    return moves.length > 0;
  },
};

export default function FortyThievesGamePage() {
  return <GenericGamePage gameName="Forty Thieves" gameIcon="🏴‍☠️" gameHref="/forty-thieves" adapter={adapter} />;
}
