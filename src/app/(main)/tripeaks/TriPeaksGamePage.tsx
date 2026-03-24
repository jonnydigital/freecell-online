'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { TriPeaksEngine } from '@/engine/TriPeaksEngine';
import { dealTriPeaksGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { tableau, stock, waste } = dealTriPeaksGame(gameNumber);
    return new TriPeaksEngine(gameNumber, tableau, stock, waste);
  },
  getState: (engine: TriPeaksEngine) => {
    const s = engine.getState();
    // Represent rows as cascades; filter nulls
    const cascades: Card[][] = [];
    for (let row = 0; row < s.tableau.length; row++) {
      const rowCards = (s.tableau[row] as (Card | null)[])
        .filter((c): c is Card => c !== null);
      cascades.push(rowCards);
    }
    const foundations = new Map<Suit, Card[]>([
      [Suit.Spades, []], [Suit.Hearts, []], [Suit.Diamonds, []], [Suit.Clubs, []],
    ]);
    return {
      cascades,
      foundations,
      stock: s.stock as Card[],
      waste: s.waste as Card[],
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: TriPeaksEngine, cascadeIdx: number) => {
    const s = engine.getState();
    const row = s.tableau[cascadeIdx];
    if (!row) return [];
    const available: Card[] = [];
    for (let col = 0; col < row.length; col++) {
      const card = row[col];
      if (card && engine.isAvailable(cascadeIdx, col)) {
        available.push(card);
      }
    }
    return available;
  },
  isLegalMove: (engine: TriPeaksEngine, from: any, _to: any) => {
    // TriPeaks: click a card to play it to waste if ±1 rank
    if (from.type !== 'cascade') return false;
    const s = engine.getState();
    const row = s.tableau[from.index];
    if (!row) return false;
    for (let col = 0; col < row.length; col++) {
      const card = row[col];
      if (card && engine.isAvailable(from.index, col) && engine.canPlay(card)) {
        return true;
      }
    }
    return false;
  },
  executeMove: (engine: TriPeaksEngine, from: any, _to: any) => {
    if (from.type !== 'cascade') return;
    const s = engine.getState();
    const row = s.tableau[from.index];
    if (!row) return;
    for (let col = 0; col < row.length; col++) {
      const card = row[col];
      if (card && engine.isAvailable(from.index, col) && engine.canPlay(card)) {
        engine.playCard(from.index, col);
        return;
      }
    }
  },
  drawFromStock: (engine: TriPeaksEngine) => { engine.drawFromStock(); },
  undo: (engine: TriPeaksEngine) => { engine.undoLastMove(); },
  getHint: (engine: TriPeaksEngine) => engine.getHint(),
};

export default function TriPeaksGamePage() {
  return <GenericGamePage gameName="TriPeaks" gameIcon="⛰️" gameHref="/tripeaks" adapter={adapter} />;
}
