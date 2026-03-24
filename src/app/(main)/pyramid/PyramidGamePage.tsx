'use client';

import GenericGamePage from '@/components/dom-generic/createGamePage';
import { PyramidEngine } from '@/engine/PyramidEngine';
import { dealPyramidGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

const adapter = {
  createEngine: (gameNumber: number) => {
    const { pyramid, stock } = dealPyramidGame(gameNumber);
    return new PyramidEngine(gameNumber, pyramid, stock);
  },
  getState: (engine: PyramidEngine) => {
    const s = engine.getState();
    // Represent pyramid rows as cascades; filter out nulls but maintain structure
    const cascades: Card[][] = [];
    for (let row = 0; row < s.pyramid.length; row++) {
      const rowCards = s.pyramid[row]
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
  getValidRun: (engine: PyramidEngine, cascadeIdx: number) => {
    const s = engine.getState();
    const row = s.pyramid[cascadeIdx];
    if (!row) return [];
    // Return exposed cards from this row
    const exposed: Card[] = [];
    for (let col = 0; col < row.length; col++) {
      const card = row[col];
      if (card && engine.isExposed(cascadeIdx, col)) {
        exposed.push(card);
      }
    }
    return exposed;
  },
  isLegalMove: (engine: PyramidEngine, from: any, to: any) => {
    // Pyramid: pair two cards that sum to 13
    if (from.type === 'cascade' && to.type === 'cascade') {
      // Find the actual cards at these positions
      const s = engine.getState();
      const fromRow = s.pyramid[from.index];
      const toRow = s.pyramid[to.index];
      if (!fromRow || !toRow) return false;
      // Find first exposed card in each row (simplified)
      for (let fc = 0; fc < fromRow.length; fc++) {
        if (fromRow[fc] && engine.isExposed(from.index, fc)) {
          for (let tc = 0; tc < toRow.length; tc++) {
            if (toRow[tc] && engine.isExposed(to.index, tc)) {
              return engine.canPair(fromRow[fc]!, toRow[tc]!);
            }
          }
        }
      }
    }
    return false;
  },
  executeMove: (engine: PyramidEngine, from: any, to: any) => {
    const s = engine.getState();
    if (from.type === 'cascade' && to.type === 'cascade') {
      // Find exposed cards and pair them
      const fromRow = s.pyramid[from.index];
      const toRow = s.pyramid[to.index];
      for (let fc = 0; fc < fromRow.length; fc++) {
        if (fromRow[fc] && engine.isExposed(from.index, fc)) {
          for (let tc = 0; tc < toRow.length; tc++) {
            if (toRow[tc] && engine.isExposed(to.index, tc)) {
              if (engine.canPair(fromRow[fc]!, toRow[tc]!)) {
                engine.pairPyramidCards(from.index, fc, to.index, tc);
                return;
              }
            }
          }
        }
      }
    }
  },
  drawFromStock: (engine: PyramidEngine) => {
    const s = engine.getState();
    if (s.stock.length > 0) {
      engine.drawFromStock();
    } else {
      engine.recycleWaste();
    }
  },
  undo: (engine: PyramidEngine) => { engine.undoLastMove(); },
  getHint: (engine: PyramidEngine) => engine.getHint(),
  autoPlace: (engine: PyramidEngine, _cardId: string) => {
    // Auto-remove kings
    const s = engine.getState();
    for (let r = 0; r < s.pyramid.length; r++) {
      for (let c = 0; c < s.pyramid[r].length; c++) {
        const card = s.pyramid[r][c];
        if (card && engine.isExposed(r, c) && engine.isKing(card)) {
          engine.removeKing(r, c);
          return true;
        }
      }
    }
    // Try removing waste king
    const wasteTop = s.waste[s.waste.length - 1];
    if (wasteTop && engine.isKing(wasteTop)) {
      engine.removeWasteKing();
      return true;
    }
    return false;
  },
};

export default function PyramidGamePage() {
  return <GenericGamePage gameName="Pyramid" gameIcon="🔺" gameHref="/pyramid" adapter={adapter} />;
}
