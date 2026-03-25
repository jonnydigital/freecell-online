/**
 * Calculation Solitaire Engine
 *
 * A math-based solitaire where suit doesn't matter — only rank.
 * Four foundations build up in different intervals (1s, 2s, 3s, 4s) wrapping at 13.
 * The player draws from a stock and places cards on foundations or 4 waste piles.
 * Strategy lives in waste pile management.
 */

import { Card, Rank, RANK_NAMES } from './Card';
import { MoveHistory } from './MoveHistory';
import { Move } from './FreeCellEngine';

// Foundation sequences: each foundation builds by its interval, wrapping mod 13
// Foundation 0 (A): A,2,3,4,5,6,7,8,9,10,J,Q,K  (by 1)
// Foundation 1 (2): 2,4,6,8,10,Q,A,3,5,7,9,J,K  (by 2)
// Foundation 2 (3): 3,6,9,Q,2,5,8,J,A,4,7,10,K  (by 3)
// Foundation 3 (4): 4,8,Q,3,7,J,2,6,10,A,5,9,K  (by 4)

export type CalculationLocationType = 'foundation' | 'waste' | 'stock' | 'drawn';

export interface CalculationLocation {
  type: CalculationLocationType;
  index: number;
}

export interface CalculationMove {
  from: CalculationLocation;
  to: CalculationLocation;
  card: Card;
}

export interface CalculationGameState {
  foundations: Card[][];   // 4 foundation piles
  waste: Card[][];         // 4 waste piles
  stock: Card[];           // remaining draw pile (face down)
  drawnCard: Card | null;  // currently drawn card from stock
  gameNumber: number;
  moveCount: number;
  isWon: boolean;
}

/** Pre-computed full sequence for each foundation (13 ranks each) */
function buildSequence(startRank: number, interval: number): Rank[] {
  const seq: Rank[] = [];
  let r = startRank;
  for (let i = 0; i < 13; i++) {
    seq.push(r as Rank);
    r = ((r - 1 + interval) % 13) + 1; // 1-based wrapping
  }
  return seq;
}

export const FOUNDATION_SEQUENCES: Rank[][] = [
  buildSequence(1, 1), // A: A,2,3,...,K
  buildSequence(2, 2), // 2: 2,4,6,8,10,Q,A,3,5,7,9,J,K
  buildSequence(3, 3), // 3: 3,6,9,Q,2,5,8,J,A,4,7,10,K
  buildSequence(4, 4), // 4: 4,8,Q,3,7,J,2,6,10,A,5,9,K
];

export class CalculationEngine {
  private state: CalculationGameState;
  private history: MoveHistory = new MoveHistory();

  constructor(gameNumber: number, stock: Card[]) {
    // Remove the base cards (first A, 2, 3, 4 found) from the stock
    const foundations: Card[][] = [[], [], [], []];
    const remaining = [...stock];
    const baseRanks = [1, 2, 3, 4];

    for (let fi = 0; fi < 4; fi++) {
      const idx = remaining.findIndex(c => c.rank === baseRanks[fi]);
      if (idx >= 0) {
        foundations[fi].push(remaining[idx]);
        remaining.splice(idx, 1);
      }
    }

    this.state = {
      foundations,
      waste: [[], [], [], []],
      stock: remaining,
      drawnCard: null,
      gameNumber,
      moveCount: 0,
      isWon: false,
    };
  }

  public getState(): Readonly<CalculationGameState> {
    return this.state;
  }

  public getMoveCount(): number {
    return this.state.moveCount;
  }

  public getHistory(): MoveHistory {
    return this.history;
  }

  // ---------------------------------------------------------------
  // Foundation sequence helpers
  // ---------------------------------------------------------------

  /** Get the next expected rank for a given foundation (0-3) */
  public getNextExpectedRank(foundationIndex: number): Rank | null {
    const pile = this.state.foundations[foundationIndex];
    const seq = FOUNDATION_SEQUENCES[foundationIndex];
    if (pile.length >= 13) return null; // complete
    return seq[pile.length];
  }

  /** Get the full sequence for a foundation */
  public getFoundationSequence(foundationIndex: number): Rank[] {
    return FOUNDATION_SEQUENCES[foundationIndex];
  }

  /** Check if a card can go on a specific foundation */
  public canPlaceOnFoundation(card: Card, foundationIndex: number): boolean {
    const expected = this.getNextExpectedRank(foundationIndex);
    if (expected === null) return false;
    return card.rank === expected;
  }

  // ---------------------------------------------------------------
  // Stock drawing
  // ---------------------------------------------------------------

  /** Draw the next card from the stock */
  public drawFromStock(): Card | null {
    if (this.state.drawnCard !== null) return null; // must play drawn card first
    if (this.state.stock.length === 0) return null;
    this.state.drawnCard = this.state.stock.pop()!;
    return this.state.drawnCard;
  }

  public getStockCount(): number {
    return this.state.stock.length;
  }

  public getDrawnCard(): Card | null {
    return this.state.drawnCard;
  }

  // ---------------------------------------------------------------
  // Move validation
  // ---------------------------------------------------------------

  /** Check if a move from a location to a destination is legal */
  public canMove(from: CalculationLocation, to: CalculationLocation): boolean {
    const card = this.getCardAt(from);
    if (!card) return false;

    if (to.type === 'foundation') {
      return this.canPlaceOnFoundation(card, to.index);
    }

    if (to.type === 'waste') {
      // Can always place on any waste pile (from drawn card or waste top)
      if (from.type === 'drawn') return true;
      if (from.type === 'waste') {
        // Can move from waste to foundation only, not waste to waste
        return false;
      }
      return false;
    }

    return false;
  }

  /** Get the card at a given location (top card for piles) */
  private getCardAt(loc: CalculationLocation): Card | null {
    switch (loc.type) {
      case 'drawn':
        return this.state.drawnCard;
      case 'waste': {
        const pile = this.state.waste[loc.index];
        return pile.length > 0 ? pile[pile.length - 1] : null;
      }
      case 'foundation': {
        const pile = this.state.foundations[loc.index];
        return pile.length > 0 ? pile[pile.length - 1] : null;
      }
      case 'stock':
        return this.state.stock.length > 0 ? this.state.stock[this.state.stock.length - 1] : null;
      default:
        return null;
    }
  }

  /** Get all valid moves for current state */
  public getValidMoves(): CalculationMove[] {
    const moves: CalculationMove[] = [];

    // Moves from drawn card
    if (this.state.drawnCard) {
      const from: CalculationLocation = { type: 'drawn', index: 0 };
      // To foundations
      for (let fi = 0; fi < 4; fi++) {
        const to: CalculationLocation = { type: 'foundation', index: fi };
        if (this.canMove(from, to)) {
          moves.push({ from, to, card: this.state.drawnCard });
        }
      }
      // To waste piles
      for (let wi = 0; wi < 4; wi++) {
        moves.push({
          from,
          to: { type: 'waste', index: wi },
          card: this.state.drawnCard,
        });
      }
    }

    // Moves from waste pile tops to foundations
    for (let wi = 0; wi < 4; wi++) {
      const pile = this.state.waste[wi];
      if (pile.length === 0) continue;
      const card = pile[pile.length - 1];
      const from: CalculationLocation = { type: 'waste', index: wi };
      for (let fi = 0; fi < 4; fi++) {
        const to: CalculationLocation = { type: 'foundation', index: fi };
        if (this.canPlaceOnFoundation(card, fi)) {
          moves.push({ from, to, card });
        }
      }
    }

    return moves;
  }

  // ---------------------------------------------------------------
  // Execute moves
  // ---------------------------------------------------------------

  public applyMove(from: CalculationLocation, to: CalculationLocation): CalculationMove {
    const card = this.getCardAt(from);
    if (!card) throw new Error('No card at source');
    if (!this.canMove(from, to)) throw new Error('Illegal move');

    // Remove from source
    if (from.type === 'drawn') {
      this.state.drawnCard = null;
    } else if (from.type === 'waste') {
      this.state.waste[from.index].pop();
    }

    // Add to destination
    if (to.type === 'foundation') {
      this.state.foundations[to.index].push(card);
    } else if (to.type === 'waste') {
      this.state.waste[to.index].push(card);
    }

    this.state.moveCount++;
    this.checkWin();

    const move: CalculationMove = { from, to, card };
    this.history.push(move as unknown as Move);
    return move;
  }

  // ---------------------------------------------------------------
  // Undo
  // ---------------------------------------------------------------

  public undo(): CalculationMove | null {
    const entry = this.history.popUndo();
    if (!entry) return null;

    const move = entry.playerMove as unknown as CalculationMove;
    this.undoSingleMove(move);
    this.state.moveCount = Math.max(0, this.state.moveCount - 1);
    this.state.isWon = false;
    return move;
  }

  private undoSingleMove(move: CalculationMove): void {
    // Remove from destination
    if (move.to.type === 'foundation') {
      this.state.foundations[move.to.index].pop();
    } else if (move.to.type === 'waste') {
      this.state.waste[move.to.index].pop();
    }

    // Put back at source
    if (move.from.type === 'drawn') {
      this.state.drawnCard = move.card;
    } else if (move.from.type === 'waste') {
      this.state.waste[move.from.index].push(move.card);
    }
  }

  // ---------------------------------------------------------------
  // Win / deadlock detection
  // ---------------------------------------------------------------

  private checkWin(): void {
    this.state.isWon = this.state.foundations.every(f => f.length === 13);
  }

  public isWon(): boolean {
    return this.state.isWon;
  }

  public isDeadlocked(): boolean {
    // Game is stuck when stock is empty, no drawn card, and no waste-to-foundation moves
    if (this.state.drawnCard) return false;
    if (this.state.stock.length > 0) return false;

    // Check if any waste top can go to a foundation
    for (let wi = 0; wi < 4; wi++) {
      const pile = this.state.waste[wi];
      if (pile.length === 0) continue;
      const card = pile[pile.length - 1];
      for (let fi = 0; fi < 4; fi++) {
        if (this.canPlaceOnFoundation(card, fi)) return false;
      }
    }
    return true;
  }

  // ---------------------------------------------------------------
  // Hint
  // ---------------------------------------------------------------

  public getHint(): CalculationMove | null {
    const moves = this.getValidMoves();
    if (moves.length === 0) return null;

    // Priority 1: drawn card to foundation
    const drawnToFound = moves.find(m => m.from.type === 'drawn' && m.to.type === 'foundation');
    if (drawnToFound) return drawnToFound;

    // Priority 2: waste to foundation
    const wasteToFound = moves.find(m => m.from.type === 'waste' && m.to.type === 'foundation');
    if (wasteToFound) return wasteToFound;

    // Priority 3: drawn card to emptiest waste pile
    const wasteMoves = moves.filter(m => m.from.type === 'drawn' && m.to.type === 'waste');
    if (wasteMoves.length > 0) {
      wasteMoves.sort((a, b) => {
        const aLen = this.state.waste[a.to.index].length;
        const bLen = this.state.waste[b.to.index].length;
        return aLen - bLen;
      });
      return wasteMoves[0];
    }

    return moves[0];
  }

  // ---------------------------------------------------------------
  // Display helpers
  // ---------------------------------------------------------------

  public static rankName(rank: Rank): string {
    return RANK_NAMES[rank];
  }

  public static sequenceDisplay(foundationIndex: number): string {
    return FOUNDATION_SEQUENCES[foundationIndex].map(r => RANK_NAMES[r]).join(', ');
  }

  public isAutoCompletable(): boolean {
    return false; // Calculation doesn't auto-complete
  }

  public autoMoveToFoundations(): CalculationMove[] {
    return [];
  }
}
