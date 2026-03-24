'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { CanfieldEngine } from '@/engine/CanfieldEngine';
import { dealCanfieldGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

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

const adapter = {
  createEngine: (gameNumber: number) => {
    const deal = dealCanfieldGame(gameNumber);
    return new CanfieldEngine(
      gameNumber, deal.tableau, deal.foundations, deal.reserve,
      deal.stock, [], deal.foundationBaseRank,
    );
  },
  getState: (engine: CanfieldEngine) => {
    const s = engine.getState();
    return {
      cascades: s.tableau as Card[][],
      foundations: foundationsToMap(s.foundations as Card[][]),
      stock: s.stock as Card[],
      waste: s.waste as Card[],
      reserve: s.reserve as Card[],
      gameNumber: s.gameNumber,
      moveCount: s.moveCount,
      isWon: s.isWon,
    };
  },
  getValidRun: (engine: CanfieldEngine, i: number) => {
    const s = engine.getState();
    const col = s.tableau[i];
    if (col.length === 0) return [];
    // Build down in alternating color sequence from bottom
    const run: Card[] = [col[col.length - 1]];
    for (let j = col.length - 2; j >= 0; j--) {
      const lower = col[j + 1];
      const upper = col[j];
      if (!upper.isFaceUp) break;
      if (upper.color === lower.color) break;
      const expectedRank = upper.rank === 1 ? 13 : upper.rank - 1;
      if (lower.rank !== expectedRank) break;
      run.unshift(upper);
    }
    return run;
  },
  isLegalMove: (engine: CanfieldEngine, from: any, to: any) => {
    try {
      const s = engine.getState();
      if (from.type === 'waste') {
        const card = s.waste[s.waste.length - 1];
        if (!card) return false;
        if (to.type === 'cascade') return engine.canPlayToTableau(card, to.index);
        if (to.type === 'foundation') {
          for (let p = 0; p < 4; p++) {
            if (engine.canPlayToFoundation(card, p)) return true;
          }
        }
      }
      if (from.type === 'reserve') {
        const card = engine.getReserveTop();
        if (!card) return false;
        if (to.type === 'cascade') return engine.canPlayToTableau(card, to.index);
        if (to.type === 'foundation') {
          for (let p = 0; p < 4; p++) {
            if (engine.canPlayToFoundation(card, p)) return true;
          }
        }
      }
      if (from.type === 'cascade' && to.type === 'cascade') {
        const fromCol = s.tableau[from.index];
        if (fromCol.length === 0) return false;
        return engine.canPlayToTableau(fromCol[fromCol.length - 1], to.index);
      }
      if (from.type === 'cascade' && to.type === 'foundation') {
        const fromCol = s.tableau[from.index];
        if (fromCol.length === 0) return false;
        const card = fromCol[fromCol.length - 1];
        for (let p = 0; p < 4; p++) {
          if (engine.canPlayToFoundation(card, p)) return true;
        }
      }
      return false;
    } catch { return false; }
  },
  executeMove: (engine: CanfieldEngine, from: any, to: any) => {
    const s = engine.getState();
    if (from.type === 'waste') {
      if (to.type === 'foundation') {
        const card = s.waste[s.waste.length - 1];
        const pile = engine.findFoundationTarget(card);
        if (pile >= 0) engine.playWasteCard({ type: 'foundation', pile });
      } else {
        engine.playWasteCard({ type: 'tableau', col: to.index });
      }
    } else if (from.type === 'reserve') {
      if (to.type === 'foundation') {
        const card = engine.getReserveTop()!;
        const pile = engine.findFoundationTarget(card);
        if (pile >= 0) engine.playReserveCard({ type: 'foundation', pile });
      } else {
        engine.playReserveCard({ type: 'tableau', col: to.index });
      }
    } else if (from.type === 'cascade') {
      if (to.type === 'foundation') {
        const fromCol = s.tableau[from.index];
        const card = fromCol[fromCol.length - 1];
        const pile = engine.findFoundationTarget(card);
        if (pile >= 0) engine.playTableauToFoundation(from.index, pile);
      } else {
        engine.moveTableauCards(from.index, to.index, 1);
      }
    }
  },
  drawFromStock: (engine: CanfieldEngine) => {
    const s = engine.getState();
    if (s.stock.length > 0) {
      engine.drawFromStock();
    } else {
      engine.recycleWaste();
    }
  },
  undo: (engine: CanfieldEngine) => { engine.undoLastMove(); },
  getHint: (engine: CanfieldEngine) => engine.getHint(),
  autoPlace: (engine: CanfieldEngine, _cardId: string) => {
    // Try auto-placing from waste, reserve, and tableau tops
    const s = engine.getState();
    const tryAutoPlace = (card: Card | null | undefined, source: string, idx?: number): boolean => {
      if (!card) return false;
      const pile = engine.findFoundationTarget(card);
      if (pile < 0) return false;
      try {
        if (source === 'waste') engine.playWasteCard({ type: 'foundation', pile });
        else if (source === 'reserve') engine.playReserveCard({ type: 'foundation', pile });
        else if (source === 'tableau') engine.playTableauToFoundation(idx!, pile);
        return true;
      } catch { return false; }
    };
    if (tryAutoPlace(s.waste[s.waste.length - 1], 'waste')) return true;
    if (tryAutoPlace(engine.getReserveTop(), 'reserve')) return true;
    for (let i = 0; i < s.tableau.length; i++) {
      const col = s.tableau[i];
      if (col.length > 0 && tryAutoPlace(col[col.length - 1], 'tableau', i)) return true;
    }
    return false;
  },
};

export default function CanfieldGamePage() {
  return <GenericGamePage gameName="Canfield" gameIcon="🎰" gameHref="/canfield" adapter={adapter} />;
}
