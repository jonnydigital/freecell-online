import { Card, Rank } from './Card';
import { MoveHistory } from './MoveHistory';
import { Move } from './FreeCellEngine';

/**
 * TriPeaks Solitaire Engine
 *
 * Layout: 3 overlapping peaks forming a tableau of 28 cards.
 * Peaks share a base row of 10 cards (all face-up).
 * Above that, 18 cards in 3 peaks (initially face-down, flipped when uncovered).
 *
 * Peak layout (positions indexed 0-based):
 *   Row 0 (3 cards):  peaks tops at positions [0], [1], [2] — mapped to cols 0, 3, 6
 *   Row 1 (6 cards):  two cards under each peak top
 *   Row 2 (9 cards):  three cards under each row-1 pair
 *   Row 3 (10 cards): the shared base row, all face-up
 *
 * We store the tableau as a flat map keyed by (row, col).
 * The remaining 24 cards go to stock; the first is drawn to start the waste.
 *
 * Rules:
 * - A card can be moved to the waste pile if it is ±1 rank from the waste top
 * - King wraps to Ace and Ace wraps to King (K→A and A→K)
 * - A card is "available" when it is not covered by any card in the row below
 * - Drawing from stock places the top stock card onto the waste (no pairing needed)
 * - Score uses a streak system: consecutive plays without drawing increase a multiplier
 * - Win condition: all 28 tableau cards cleared
 * - Lose condition: no available cards match and stock is empty
 */

export interface TriPeaksGameState {
  tableau: (Card | null)[][]; // rows 0-3
  stock: Card[];
  waste: Card[];
  removed: Card[];
  gameNumber: number;
  moveCount: number;
  score: number;
  streak: number;
  isWon: boolean;
}

export type TriPeaksLocation =
  | { type: 'tableau'; row: number; col: number }
  | { type: 'stock' }
  | { type: 'waste' };

export interface TriPeaksMove {
  type: 'play' | 'draw';
  cards: Card[];
  from: TriPeaksLocation[];
  previousScore?: number;
  previousStreak?: number;
}

// Layout helpers — which columns exist in each row
// Row 0: 3 peak tops
// Row 1: 6 cards (2 per peak)
// Row 2: 9 cards (3 per peak)
// Row 3: 10 cards (shared base)
//
// Mapping:
// Row 0: cols [0, 3, 6]         (3 cards)
// Row 1: cols [0, 1, 3, 4, 6, 7] (6 cards)
// Row 2: cols [0, 1, 2, 3, 4, 5, 6, 7, 8] (9 cards)
// Row 3: cols [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] (10 cards)
//
// Coverage: card at (r, c) is covered by cards at (r+1, c) and (r+1, c+1)
// For row 0→1: (0,0) covers nothing below itself directly; instead
// we use the standard triangle overlap: parent at (r,c) has children (r+1,c) and (r+1,c+1).
// But our columns are non-contiguous for row 0. We need a custom coverage map.

const ROW_COLS: number[][] = [
  [0, 3, 6],                         // row 0: 3 peak tops
  [0, 1, 3, 4, 6, 7],                // row 1: 6 cards
  [0, 1, 2, 3, 4, 5, 6, 7, 8],       // row 2: 9 cards
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],    // row 3: 10 base cards
];

// For each card, list the cards in the row below that cover it.
// A card at (row, col) is covered by children at (row+1, col) and (row+1, col+1)
// using absolute column indices. If both children are removed (null), the card is exposed.
function getChildren(row: number, col: number): { row: number; col: number }[] {
  if (row >= 3) return []; // base row has no children
  return [
    { row: row + 1, col: col },
    { row: row + 1, col: col + 1 },
  ];
}

export class TriPeaksEngine {
  private state: TriPeaksGameState;
  private history: MoveHistory = new MoveHistory();

  constructor(gameNumber: number, tableau: (Card | null)[][], stock: Card[], waste: Card[]) {
    this.state = {
      tableau: tableau.map(row => [...row]),
      stock: [...stock],
      waste: [...waste],
      removed: [],
      gameNumber,
      moveCount: 0,
      score: 0,
      streak: 0,
      isWon: false,
    };
  }

  public getState(): Readonly<TriPeaksGameState> {
    return this.state;
  }

  public getMoveCount(): number {
    return this.state.moveCount;
  }

  public getHistory(): MoveHistory {
    return this.history;
  }

  /**
   * Check whether a tableau card is available (uncovered).
   * A card is available if both its children in the row below are null (removed).
   * Base row (row 3) cards are always available if present.
   */
  public isAvailable(row: number, col: number): boolean {
    const card = this.getTableauCard(row, col);
    if (!card) return false;

    if (row === 3) return true;

    const children = getChildren(row, col);
    return children.every(c => this.getTableauCard(c.row, c.col) === null);
  }

  private getTableauCard(row: number, col: number): Card | null {
    if (row < 0 || row > 3) return null;
    const rowArr = this.state.tableau[row];
    if (col < 0 || col >= rowArr.length) return null;
    return rowArr[col];
  }

  /**
   * Get waste top card
   */
  public getWasteTop(): Card | null {
    return this.state.waste.length > 0 ? this.state.waste[this.state.waste.length - 1] : null;
  }

  /**
   * Check if a card can be played onto the waste (±1 rank with wrapping)
   */
  public canPlay(card: Card): boolean {
    const wasteTop = this.getWasteTop();
    if (!wasteTop) return false;
    return this.isAdjacentRank(card.rank, wasteTop.rank);
  }

  private isAdjacentRank(a: number, b: number): boolean {
    const diff = Math.abs(a - b);
    return diff === 1 || diff === 12; // wrapping: K(13) and A(1)
  }

  /**
   * Get all currently available tableau cards
   */
  public getAvailableCards(): { card: Card; row: number; col: number }[] {
    const available: { card: Card; row: number; col: number }[] = [];
    for (let row = 0; row < 4; row++) {
      for (let colIdx = 0; colIdx < this.state.tableau[row].length; colIdx++) {
        const actualCol = this.getActualCol(row, colIdx);
        if (this.isAvailable(row, actualCol)) {
          available.push({
            card: this.state.tableau[row][actualCol]!,
            row,
            col: actualCol,
          });
        }
      }
    }
    return available;
  }

  private getActualCol(row: number, index: number): number {
    // Our tableau arrays are stored with absolute column indices
    // so we just iterate through the ROW_COLS mapping
    return ROW_COLS[row][index];
  }

  /**
   * Play a tableau card to the waste pile
   */
  public playCard(row: number, col: number): TriPeaksMove {
    if (!this.isAvailable(row, col)) throw new Error('Card not available');
    const card = this.state.tableau[row][col]!;
    if (!this.canPlay(card)) throw new Error('Card is not ±1 from waste top');

    const previousScore = this.state.score;
    const previousStreak = this.state.streak;

    this.state.tableau[row][col] = null;
    this.state.waste.push(card);
    this.state.removed.push(card);
    this.state.moveCount++;
    this.state.streak++;
    this.state.score += this.getStreakPoints();

    // Flip newly exposed cards
    this.flipExposedCards();
    this.checkWin();

    const move: TriPeaksMove = {
      type: 'play',
      cards: [card],
      from: [{ type: 'tableau', row, col }],
      previousScore,
      previousStreak,
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Draw from stock to waste (resets streak)
   */
  public drawFromStock(): TriPeaksMove {
    if (this.state.stock.length === 0) throw new Error('No cards in stock');

    const previousScore = this.state.score;
    const previousStreak = this.state.streak;

    const card = this.state.stock.pop()!;
    card.isFaceUp = true;
    this.state.waste.push(card);
    this.state.moveCount++;
    this.state.streak = 0; // drawing resets streak

    const move: TriPeaksMove = {
      type: 'draw',
      cards: [card],
      from: [{ type: 'stock' }],
      previousScore,
      previousStreak,
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Streak-based scoring: each consecutive play earns more
   */
  private getStreakPoints(): number {
    // Streak 1 = 1 pt, streak 2 = 2 pts, etc.
    return this.state.streak;
  }

  /**
   * Flip cards that become exposed after a removal
   */
  private flipExposedCards(): void {
    for (let row = 0; row < 3; row++) {
      for (const col of ROW_COLS[row]) {
        const card = this.state.tableau[row][col];
        if (card && !card.isFaceUp && this.isAvailable(row, col)) {
          card.isFaceUp = true;
        }
      }
    }
  }

  /**
   * Undo the last move
   */
  public undoLastMove(): TriPeaksMove | null {
    const entry = this.history.popUndo();
    if (!entry) return null;

    const move = entry.playerMove as unknown as TriPeaksMove;
    this.undoSingleMove(move);
    this.state.moveCount = Math.max(0, this.state.moveCount - 1);
    this.state.isWon = false;
    return move;
  }

  private undoSingleMove(move: TriPeaksMove): void {
    switch (move.type) {
      case 'play': {
        const card = this.state.waste.pop()!;
        const loc = move.from[0] as { type: 'tableau'; row: number; col: number };
        this.state.tableau[loc.row][loc.col] = card;
        this.state.removed.pop();
        this.state.score = move.previousScore ?? this.state.score;
        this.state.streak = move.previousStreak ?? this.state.streak;
        // Un-flip cards that should be face-down again
        this.updateFaceDown();
        break;
      }
      case 'draw': {
        const card = this.state.waste.pop()!;
        card.isFaceUp = false;
        this.state.stock.push(card);
        this.state.score = move.previousScore ?? this.state.score;
        this.state.streak = move.previousStreak ?? this.state.streak;
        break;
      }
    }
  }

  /**
   * After undo, ensure cards that are covered are face-down
   */
  private updateFaceDown(): void {
    for (let row = 0; row < 3; row++) {
      for (const col of ROW_COLS[row]) {
        const card = this.state.tableau[row][col];
        if (card && !this.isAvailable(row, col)) {
          card.isFaceUp = false;
        }
      }
    }
  }

  /**
   * Check if all tableau cards cleared
   */
  private checkWin(): void {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < this.state.tableau[row].length; col++) {
        if (this.state.tableau[row][col] !== null) return;
      }
    }
    this.state.isWon = true;
  }

  /**
   * Count remaining tableau cards
   */
  public getRemainingCount(): number {
    let count = 0;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < this.state.tableau[row].length; col++) {
        if (this.state.tableau[row][col] !== null) count++;
      }
    }
    return count;
  }

  /**
   * Find a hint (available move or draw suggestion)
   */
  public getHint(): TriPeaksMove | null {
    const wasteTop = this.getWasteTop();
    if (!wasteTop) return null;

    // Check available tableau cards that can be played
    for (let row = 0; row < 4; row++) {
      for (const col of ROW_COLS[row]) {
        if (this.isAvailable(row, col)) {
          const card = this.state.tableau[row][col]!;
          if (this.canPlay(card)) {
            return {
              type: 'play',
              cards: [card],
              from: [{ type: 'tableau', row, col }],
            };
          }
        }
      }
    }

    // Suggest drawing from stock
    if (this.state.stock.length > 0) {
      return {
        type: 'draw',
        cards: [],
        from: [{ type: 'stock' }],
      };
    }

    return null;
  }

  /**
   * Check if game is stuck (no moves and no stock)
   */
  public isUnwinnable(): boolean {
    const wasteTop = this.getWasteTop();
    if (!wasteTop) return this.state.stock.length === 0;

    // Check if any available card can be played
    for (let row = 0; row < 4; row++) {
      for (const col of ROW_COLS[row]) {
        if (this.isAvailable(row, col)) {
          const card = this.state.tableau[row][col]!;
          if (this.canPlay(card)) return false;
        }
      }
    }

    // Can still draw
    if (this.state.stock.length > 0) return false;

    return true;
  }
}

export { ROW_COLS };
