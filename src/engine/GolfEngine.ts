import { Card, Rank } from './Card';
import { MoveHistory } from './MoveHistory';
import { Move } from './FreeCellEngine';

/**
 * Golf Solitaire Engine
 *
 * Layout: 7 tableau columns of 5 cards each (35 cards), all face-up.
 * Remaining 17 cards go to the stock pile.
 * One card is drawn face-up to start the waste pile (16 in stock after).
 *
 * Rules:
 * - Only the bottom (exposed) card of each column can be played
 * - A card can be moved to the waste pile if it is ±1 rank from the waste top
 * - King wraps to Ace and Ace wraps to King (K→A and A→K)
 * - Drawing from stock places the top stock card onto the waste
 * - Score uses a streak system: consecutive plays without drawing increase a multiplier
 * - Win condition: all 35 tableau cards cleared
 * - Lose condition: no available cards match and stock is empty
 */

export interface GolfGameState {
  tableau: Card[][];  // 7 columns of up to 5 cards each
  stock: Card[];
  waste: Card[];
  gameNumber: number;
  moveCount: number;
  score: number;
  streak: number;
  isWon: boolean;
}

export type GolfLocation =
  | { type: 'tableau'; col: number }
  | { type: 'stock' }
  | { type: 'waste' };

export interface GolfMove {
  type: 'play' | 'draw';
  cards: Card[];
  from: GolfLocation[];
  previousScore?: number;
  previousStreak?: number;
}

export class GolfEngine {
  private state: GolfGameState;
  private history: MoveHistory = new MoveHistory();

  constructor(gameNumber: number, tableau: Card[][], stock: Card[], waste: Card[]) {
    this.state = {
      tableau: tableau.map(col => [...col]),
      stock: [...stock],
      waste: [...waste],
      gameNumber,
      moveCount: 0,
      score: 0,
      streak: 0,
      isWon: false,
    };
  }

  public getState(): Readonly<GolfGameState> {
    return this.state;
  }

  public getMoveCount(): number {
    return this.state.moveCount;
  }

  public getHistory(): MoveHistory {
    return this.history;
  }

  /**
   * Get the exposed (bottom) card of a column, or null if empty.
   */
  public getExposedCard(col: number): Card | null {
    const column = this.state.tableau[col];
    if (!column || column.length === 0) return null;
    return column[column.length - 1];
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
   * Get all currently available (exposed) tableau cards
   */
  public getAvailableCards(): { card: Card; col: number }[] {
    const available: { card: Card; col: number }[] = [];
    for (let col = 0; col < 7; col++) {
      const card = this.getExposedCard(col);
      if (card) {
        available.push({ card, col });
      }
    }
    return available;
  }

  /**
   * Play a tableau card to the waste pile
   */
  public playCard(col: number): GolfMove {
    const card = this.getExposedCard(col);
    if (!card) throw new Error('No card in column');
    if (!this.canPlay(card)) throw new Error('Card is not ±1 from waste top');

    const previousScore = this.state.score;
    const previousStreak = this.state.streak;

    this.state.tableau[col].pop();
    this.state.waste.push(card);
    this.state.moveCount++;
    this.state.streak++;
    this.state.score += this.getStreakPoints();

    this.checkWin();

    const move: GolfMove = {
      type: 'play',
      cards: [card],
      from: [{ type: 'tableau', col }],
      previousScore,
      previousStreak,
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Draw from stock to waste (resets streak)
   */
  public drawFromStock(): GolfMove {
    if (this.state.stock.length === 0) throw new Error('No cards in stock');

    const previousScore = this.state.score;
    const previousStreak = this.state.streak;

    const card = this.state.stock.pop()!;
    card.isFaceUp = true;
    this.state.waste.push(card);
    this.state.moveCount++;
    this.state.streak = 0; // drawing resets streak

    const move: GolfMove = {
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
    return this.state.streak;
  }

  /**
   * Undo the last move
   */
  public undoLastMove(): GolfMove | null {
    const entry = this.history.popUndo();
    if (!entry) return null;

    const move = entry.playerMove as unknown as GolfMove;
    this.undoSingleMove(move);
    this.state.moveCount = Math.max(0, this.state.moveCount - 1);
    this.state.isWon = false;
    return move;
  }

  private undoSingleMove(move: GolfMove): void {
    switch (move.type) {
      case 'play': {
        const card = this.state.waste.pop()!;
        const loc = move.from[0] as { type: 'tableau'; col: number };
        this.state.tableau[loc.col].push(card);
        this.state.score = move.previousScore ?? this.state.score;
        this.state.streak = move.previousStreak ?? this.state.streak;
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
   * Check if all tableau cards cleared
   */
  private checkWin(): void {
    for (let col = 0; col < 7; col++) {
      if (this.state.tableau[col].length > 0) return;
    }
    this.state.isWon = true;
  }

  /**
   * Count remaining tableau cards
   */
  public getRemainingCount(): number {
    let count = 0;
    for (let col = 0; col < 7; col++) {
      count += this.state.tableau[col].length;
    }
    return count;
  }

  /**
   * Find a hint (available move or draw suggestion)
   */
  public getHint(): GolfMove | null {
    const wasteTop = this.getWasteTop();
    if (!wasteTop) return null;

    // Check available tableau cards that can be played
    for (let col = 0; col < 7; col++) {
      const card = this.getExposedCard(col);
      if (card && this.canPlay(card)) {
        return {
          type: 'play',
          cards: [card],
          from: [{ type: 'tableau', col }],
        };
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
    for (let col = 0; col < 7; col++) {
      const card = this.getExposedCard(col);
      if (card && this.canPlay(card)) return false;
    }

    // Can still draw
    if (this.state.stock.length > 0) return false;

    return true;
  }
}
