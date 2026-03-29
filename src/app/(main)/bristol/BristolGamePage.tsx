'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { BristolEngine, BristolLocation } from '@/engine/BristolEngine';
import { dealBristolGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

/**
 * Bristol Solitaire adapter for the generic DOM game engine.
 *
 * Layout: 8 fan columns (cascades 0-7) + 3 reserve piles (cascades 8-10).
 * Stock deals 3 cards (one to each reserve pile).
 * Only top card of each fan/reserve is movable.
 * Foundations build A→K by suit. Kings cannot fill empty fans.
 */

function foundationsToMap(foundations: Card[][]): Map<Suit, Card[]> {
  const map = new Map<Suit, Card[]>([
    [Suit.Spades, []], [Suit.Hearts, []], [Suit.Diamonds, []], [Suit.Clubs, []],
  ]);
  for (const pile of foundations) {
    if (pile.length > 0) {
      const suit = pile[0].suit;
      map.set(suit, [...pile]);
    }
  }
  return map;
}

function toBristolLoc(generic: any): BristolLocation {
  if (generic.type === 'cascade') {
    const idx = generic.index;
    if (idx < 8) return { type: 'fan', index: idx };
    return { type: 'reserve', index: idx - 8 };
  }
  if (generic.type === 'foundation') {
    // Find which foundation index matches the suit
    return { type: 'foundation', index: 0 }; // resolved dynamically in executeMove
  }
  throw new Error(`Unknown location type: ${generic.type}`);
}

const adapter = {
  createEngine: (gameNumber: number) => {
    const { fans, stock } = dealBristolGame(gameNumber);
    return new BristolEngine(gameNumber, fans, stock);
  },

  getState: (engine: BristolEngine) => {
    const s = engine.getState();
    // Combine 8 fans + 3 reserves into a single cascades array
    const cascades: Card[][] = [
      ...s.fans.map(f => [...f]),
      ...s.reserves.map(r => [...r]),
    ];
    return {
      cascades,
      foundations: foundationsToMap(s.foundations as Card[][]),
      stock: s.stock as Card[], // Show stock pile with deal button
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },

  getValidRun: (engine: BristolEngine, cascadeIndex: number) => {
    const s = engine.getState();
    if (cascadeIndex < 8) {
      // Fan: only top card is movable
      const fan = s.fans[cascadeIndex];
      if (fan.length === 0) return [];
      return [fan[fan.length - 1]];
    }
    // Reserve pile: only top card movable
    const resIdx = cascadeIndex - 8;
    const res = s.reserves[resIdx];
    if (res.length === 0) return [];
    return [res[res.length - 1]];
  },

  isLegalMove: (engine: BristolEngine, from: any, to: any) => {
    try {
      const s = engine.getState();

      // Get source card
      let card: Card | null = null;
      if (from.type === 'cascade') {
        if (from.index < 8) {
          const fan = s.fans[from.index];
          card = fan.length > 0 ? fan[fan.length - 1] : null;
        } else {
          const res = s.reserves[from.index - 8];
          card = res.length > 0 ? res[res.length - 1] : null;
        }
      }
      if (!card) return false;

      // Check destination
      if (to.type === 'cascade') {
        if (to.index < 8) {
          return engine.canPlayToFan(card, to.index);
        }
        // Can't move cards TO reserve piles
        return false;
      }
      if (to.type === 'foundation') {
        // Check all 4 foundation slots
        for (let i = 0; i < 4; i++) {
          if (engine.canPlayToFoundation(card, i)) return true;
        }
        return false;
      }
      return false;
    } catch {
      return false;
    }
  },

  executeMove: (engine: BristolEngine, from: any, to: any) => {
    const s = engine.getState();
    let fromLoc: BristolLocation;

    // Determine source location
    if (from.type === 'cascade') {
      if (from.index < 8) {
        fromLoc = { type: 'fan', index: from.index };
      } else {
        fromLoc = { type: 'reserve', index: from.index - 8 };
      }
    } else {
      return;
    }

    const card = engine.getCardAt(fromLoc);
    if (!card) return;

    // Determine destination
    if (to.type === 'cascade' && to.index < 8) {
      engine.moveCard(fromLoc, { type: 'fan', index: to.index });
    } else if (to.type === 'foundation') {
      const fi = engine.findFoundationFor(card);
      if (fi >= 0) {
        engine.moveCard(fromLoc, { type: 'foundation', index: fi });
      }
    }
  },

  drawFromStock: (engine: BristolEngine) => {
    if (engine.canDealFromStock()) {
      engine.dealFromStock();
    }
  },

  undo: (engine: BristolEngine) => {
    engine.undo();
  },

  getHint: (engine: BristolEngine) => {
    const moves = engine.getValidMoves();
    if (moves.length === 0) return null;
    // Prioritize foundation moves
    const foundationMove = moves.find(m => m.to.type === 'foundation');
    const move = foundationMove || moves[0];
    // Convert to generic format
    const fromIdx = move.from.type === 'fan' ? move.from.index : move.from.index + 8;
    return {
      from: { type: 'cascade', index: fromIdx },
      to: move.to.type === 'foundation'
        ? { type: 'foundation' }
        : { type: 'cascade', index: move.to.type === 'fan' ? move.to.index : move.to.index + 8 },
    };
  },

  autoPlace: (engine: BristolEngine, _cardId: string) => {
    const moves = engine.autoMoveToFoundations();
    return moves.length > 0;
  },
};

export default function BristolGamePage() {
  return <GenericGamePage gameName="Bristol" gameIcon="🏴" gameHref="/bristol" adapter={adapter} />;
}
