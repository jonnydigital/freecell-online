/**
 * Monte Carlo Solitaire Engine
 *
 * A 5×5 grid pair-matching game. Remove pairs of same-rank cards that are
 * adjacent (horizontally, vertically, or diagonally). After removing pairs,
 * consolidate remaining cards (shift left and up) and deal new cards from stock.
 * Win by removing all 52 cards.
 */

import { Card } from './Card';
import { MoveHistory } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface MonteCarloPosition {
  row: number;
  col: number;
}

export interface MonteCarloMove {
  pos1: MonteCarloPosition;
  pos2: MonteCarloPosition;
  card1: Card;
  card2: Card;
}

export interface MonteCarloGameState {
  grid: (Card | null)[][];    // 5×5 grid
  stock: Card[];              // remaining cards to deal
  gameNumber: number;
  moveCount: number;
  isWon: boolean;
  isLost: boolean;
}

/** Snapshot for undo support */
interface MonteCarloSnapshot {
  grid: (Card | null)[][];
  stock: Card[];
  moveCount: number;
  isWon: boolean;
  isLost: boolean;
}

export class MonteCarloEngine {
  private state: MonteCarloGameState;
  private history: MoveHistory = new MoveHistory();
  private snapshots: MonteCarloSnapshot[] = [];

  constructor(gameNumber: number, grid: (Card | null)[][], stock: Card[]) {
    this.state = {
      grid: grid.map(row => [...row]),
      stock: [...stock],
      gameNumber,
      moveCount: 0,
      isWon: false,
      isLost: false,
    };
  }

  public getState(): Readonly<MonteCarloGameState> {
    return this.state;
  }

  public getMoveCount(): number {
    return this.state.moveCount;
  }

  public getHistory(): MoveHistory {
    return this.history;
  }

  // ---------------------------------------------------------------
  // Adjacency check
  // ---------------------------------------------------------------

  /** Two positions are adjacent if they differ by at most 1 in both row and col, and are not the same position */
  public static isAdjacent(pos1: MonteCarloPosition, pos2: MonteCarloPosition): boolean {
    if (pos1.row === pos2.row && pos1.col === pos2.col) return false;
    return Math.abs(pos1.row - pos2.row) <= 1 && Math.abs(pos1.col - pos2.col) <= 1;
  }

  // ---------------------------------------------------------------
  // Valid pairs
  // ---------------------------------------------------------------

  /** Get all valid adjacent same-rank pairs */
  public getValidPairs(): MonteCarloMove[] {
    const pairs: MonteCarloMove[] = [];
    const grid = this.state.grid;

    for (let r1 = 0; r1 < 5; r1++) {
      for (let c1 = 0; c1 < 5; c1++) {
        const card1 = grid[r1][c1];
        if (!card1) continue;

        // Check all adjacent cells (only forward to avoid duplicates)
        for (let r2 = r1; r2 < 5; r2++) {
          const startCol = r2 === r1 ? c1 + 1 : 0;
          for (let c2 = startCol; c2 < 5; c2++) {
            const card2 = grid[r2][c2];
            if (!card2) continue;

            if (MonteCarloEngine.isAdjacent({ row: r1, col: c1 }, { row: r2, col: c2 }) &&
                card1.rank === card2.rank) {
              pairs.push({
                pos1: { row: r1, col: c1 },
                pos2: { row: r2, col: c2 },
                card1,
                card2,
              });
            }
          }
        }
      }
    }

    return pairs;
  }

  // ---------------------------------------------------------------
  // Remove pair
  // ---------------------------------------------------------------

  /** Check if two positions form a valid removable pair */
  public canRemovePair(pos1: MonteCarloPosition, pos2: MonteCarloPosition): boolean {
    const card1 = this.state.grid[pos1.row]?.[pos1.col];
    const card2 = this.state.grid[pos2.row]?.[pos2.col];
    if (!card1 || !card2) return false;
    if (!MonteCarloEngine.isAdjacent(pos1, pos2)) return false;
    return card1.rank === card2.rank;
  }

  /** Remove a pair of adjacent same-rank cards */
  public removePair(pos1: MonteCarloPosition, pos2: MonteCarloPosition): MonteCarloMove {
    if (!this.canRemovePair(pos1, pos2)) {
      throw new Error('Invalid pair removal');
    }

    // Save snapshot for undo
    this.saveSnapshot();

    const card1 = this.state.grid[pos1.row][pos1.col]!;
    const card2 = this.state.grid[pos2.row][pos2.col]!;

    this.state.grid[pos1.row][pos1.col] = null;
    this.state.grid[pos2.row][pos2.col] = null;

    this.state.moveCount++;

    const move: MonteCarloMove = { pos1, pos2, card1, card2 };
    this.history.push(move as unknown as Move);

    this.checkWin();
    if (!this.state.isWon) {
      this.checkLoss();
    }

    return move;
  }

  // ---------------------------------------------------------------
  // Consolidate and deal
  // ---------------------------------------------------------------

  /** Consolidate remaining cards (shift left/up) and deal new cards from stock */
  public consolidateAndDeal(): void {
    // Save snapshot for undo
    this.saveSnapshot();

    // Collect all remaining cards in grid order (left to right, top to bottom)
    const remaining: Card[] = [];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (this.state.grid[r][c]) {
          remaining.push(this.state.grid[r][c]!);
        }
      }
    }

    // Clear grid
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        this.state.grid[r][c] = null;
      }
    }

    // Place remaining cards back in order
    let idx = 0;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (idx < remaining.length) {
          this.state.grid[r][c] = remaining[idx++];
        }
      }
    }

    // Fill empty spaces from stock
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (!this.state.grid[r][c] && this.state.stock.length > 0) {
          this.state.grid[r][c] = this.state.stock.pop()!;
        }
      }
    }

    // Record as a move in history (use a dummy move for undo tracking)
    const dummyMove = { pos1: { row: -1, col: -1 }, pos2: { row: -1, col: -1 }, card1: null, card2: null };
    this.history.push(dummyMove as unknown as Move);

    this.checkWin();
    if (!this.state.isWon) {
      this.checkLoss();
    }
  }

  // ---------------------------------------------------------------
  // Undo (snapshot-based)
  // ---------------------------------------------------------------

  private saveSnapshot(): void {
    this.snapshots.push({
      grid: this.state.grid.map(row => [...row]),
      stock: [...this.state.stock],
      moveCount: this.state.moveCount,
      isWon: this.state.isWon,
      isLost: this.state.isLost,
    });
  }

  public undo(): boolean {
    const entry = this.history.popUndo();
    if (!entry) return false;

    const snapshot = this.snapshots.pop();
    if (!snapshot) return false;

    this.state.grid = snapshot.grid;
    this.state.stock = snapshot.stock;
    this.state.moveCount = snapshot.moveCount;
    this.state.isWon = snapshot.isWon;
    this.state.isLost = snapshot.isLost;

    return true;
  }

  // ---------------------------------------------------------------
  // Win / loss detection
  // ---------------------------------------------------------------

  private checkWin(): void {
    // Win if grid is empty and stock is empty
    const hasCards = this.state.grid.some(row => row.some(cell => cell !== null));
    this.state.isWon = !hasCards && this.state.stock.length === 0;
  }

  private checkLoss(): void {
    // Lost if no valid pairs and no stock to consolidate with
    const pairs = this.getValidPairs();
    if (pairs.length > 0) {
      this.state.isLost = false;
      return;
    }

    // If there are gaps in the grid and stock has cards, we can still consolidate
    const hasGaps = this.state.grid.some(row => row.some(cell => cell === null));
    const hasCards = this.state.grid.some(row => row.some(cell => cell !== null));

    if (hasGaps && (this.state.stock.length > 0 || hasCards)) {
      // Can still consolidate — but only if consolidation would change anything
      // Check if consolidation would create new adjacencies
      this.state.isLost = false;
      return;
    }

    // No pairs, no gaps (or no stock), game is lost
    if (hasCards) {
      this.state.isLost = true;
    }
  }

  /** Check if consolidation is possible (there are gaps and cards that could shift) */
  public canConsolidate(): boolean {
    if (this.state.isWon || this.state.isLost) return false;

    let hasGap = false;
    let hasCardAfterGap = false;

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (!this.state.grid[r][c]) {
          hasGap = true;
        } else if (hasGap) {
          hasCardAfterGap = true;
        }
      }
    }

    // Can consolidate if there are gaps with cards after them, OR if stock has cards to deal
    return (hasGap && hasCardAfterGap) || (hasGap && this.state.stock.length > 0);
  }

  public getStockCount(): number {
    return this.state.stock.length;
  }

  public getGridCardCount(): number {
    let count = 0;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (this.state.grid[r][c]) count++;
      }
    }
    return count;
  }

  public isAutoCompletable(): boolean {
    return false;
  }

  public autoMoveToFoundations(): MonteCarloMove[] {
    return [];
  }
}
