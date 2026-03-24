'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { AccordionEngine } from '@/engine/AccordionEngine';
import { dealAccordionGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { cards } = dealAccordionGame(gameNumber);
    return new AccordionEngine(gameNumber, cards);
  },
  getState: (engine: AccordionEngine) => {
    const s = engine.getState();
    const foundations = new Map<Suit, Card[]>([
      [Suit.Spades, []], [Suit.Hearts, []], [Suit.Diamonds, []], [Suit.Clubs, []],
    ]);
    return {
      cascades: s.piles as Card[][],
      foundations,
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: AccordionEngine, i: number) => {
    const s = engine.getState();
    const pile = s.piles[i];
    if (pile.length === 0) return [];
    // Only top card is relevant; show as movable if it has valid targets
    const targets = engine.getValidTargets(i);
    if (targets.length > 0) return [pile[pile.length - 1]];
    return [pile[pile.length - 1]];
  },
  isLegalMove: (engine: AccordionEngine, from: any, to: any) => {
    if (from.type === 'cascade' && to.type === 'cascade') {
      return engine.isLegalMove(from.index, to.index);
    }
    return false;
  },
  executeMove: (engine: AccordionEngine, from: any, to: any) => {
    if (from.type === 'cascade' && to.type === 'cascade') {
      engine.executeMove(from.index, to.index);
    }
  },
  undo: (engine: AccordionEngine) => { engine.undoLastMove(); },
  getHint: (engine: AccordionEngine) => engine.getHint(),
};

export default function AccordionGamePage() {
  return <GenericGamePage gameName="Accordion" gameIcon="🪗" gameHref="/accordion" adapter={adapter} />;
}
