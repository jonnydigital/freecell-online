'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { ClockEngine } from '@/engine/ClockEngine';
import { dealClockGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { piles } = dealClockGame(gameNumber);
    return new ClockEngine(gameNumber, piles);
  },
  getState: (engine: ClockEngine) => {
    const s = engine.getState();
    const foundations = new Map<Suit, Card[]>([
      [Suit.Spades, []], [Suit.Hearts, []], [Suit.Diamonds, []], [Suit.Clubs, []],
    ]);
    // Use a dummy stock to show the "step" button
    const canStep = engine.canStep();
    return {
      cascades: s.piles as Card[][],
      foundations,
      stock: canStep ? [1] as any as Card[] : undefined,
      gameNumber: s.gameNumber,
      moveCount: s.stepCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (_engine: ClockEngine, _i: number) => {
    // Clock is procedural; no card selection
    return [];
  },
  isLegalMove: (_engine: ClockEngine, _from: any, _to: any) => false,
  executeMove: (_engine: ClockEngine, _from: any, _to: any) => {},
  drawFromStock: (engine: ClockEngine) => { engine.step(); },
  undo: (engine: ClockEngine) => { engine.undoLastStep(); },
};

export default function ClockGamePage() {
  return <GenericGamePage gameName="Clock" gameIcon="🕐" gameHref="/clock" adapter={adapter} />;
}
