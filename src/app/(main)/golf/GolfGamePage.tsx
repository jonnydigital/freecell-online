'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { GolfEngine } from '@/engine/GolfEngine';
import { dealGolfGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau, stock, waste } = dealGolfGame(gameNumber);
    return new GolfEngine(gameNumber, tableau, stock, waste);
  },
  getState: (engine: GolfEngine) => {
    const s = engine.getState();
    // Golf has no foundations; waste pile serves as the target
    const foundations = new Map<Suit, Card[]>([
      [Suit.Spades, []], [Suit.Hearts, []], [Suit.Diamonds, []], [Suit.Clubs, []],
    ]);
    return {
      cascades: s.tableau as Card[][],
      foundations,
      stock: s.stock as Card[],
      waste: s.waste as Card[],
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: GolfEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    // Only the bottom (exposed) card can be played
    const card = col[col.length - 1];
    if (engine.canPlay(card)) return [card];
    return [card]; // Still show as selectable
  },
  isLegalMove: (engine: GolfEngine, from: any, to: any) => {
    // Golf: cards move from cascade to waste only
    if (from.type === 'cascade') {
      const card = engine.getExposedCard(from.index);
      return card !== null && engine.canPlay(card);
    }
    return false;
  },
  executeMove: (engine: GolfEngine, from: any, _to: any) => {
    if (from.type === 'cascade') {
      engine.playCard(from.index);
    }
  },
  drawFromStock: (engine: GolfEngine) => { engine.drawFromStock(); },
  undo: (engine: GolfEngine) => { engine.undoLastMove(); },
  getHint: (engine: GolfEngine) => engine.getHint(),
};

export default function GolfGamePage() {
  return <GenericGamePage gameName="Golf" gameIcon="⛳" gameHref="/golf" adapter={adapter} />;
}
