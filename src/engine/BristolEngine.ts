/**
 * Bristol Solitaire Engine
 *
 * 24 cards dealt into 8 fans (columns) of 3 cards face-up.
 * Remaining 28 cards form stock, dealt 3 at a time into 3 reserve piles.
 * 4 foundations build A→K by suit.
 * Tableau builds descending rank, ANY suit. Only top card of each fan/reserve movable.
 * Kings cannot be placed in empty fans. Win by moving all 52 to foundations.
 */

import { Card, Suit } from './Card';
import { MoveHistory } from './MoveHistory';
import { Move } from './FreeCellEngine';

export type BristolLocation =
  | { type: 'fan'; index: number }
  | { type: 'reserve'; index: number }
  | { type: 'foundation'; index: number };

export interface BristolMove {
  from: BristolLocation;
  to: BristolLocation;
  card: Card;
}

export interface BristolGameState {
  fans: Card[][];           // 8 fans (columns)
  reserves: Card[][];       // 3 reserve piles
  foundations: Card[][];    // 4 foundation piles (one per suit, A→K)
  stock: Card[];            // remaining cards to deal
  gameNumber: number;
  moveCount: number;
  isWon: boolean;
  isLost: boolean;
}

/** Snapshot for undo support */
interface BristolSnapshot {
  fans: Card[][];
  reserves: Card[][];
  foundations: Card[][];
  stock: Card[];
  moveCount: number;
  isWon: boolean;
  isLost: boolean;
}

export class BristolEngine {
  private state: BristolGameState;
  private history: MoveHistory = new MoveHistory();
  private snapshots: BristolSnapshot[] = [];

  constructor(gameNumber: number, fans: Card[][], stock: Card[]) {
    this.state = {
      fans: fans.map(f => [...f]),
      reserves: [[], [], []],
      foundations: [[], [], [], []],
      stock: [...stock],
      gameNumber,
      moveCount: 0,
      isWon: false,
      isLost: false,
    };
  }

  public getState(): Readonly<BristolGameState> {
    return this.state;
  }

  public getMoveCount(): number {
    return this.state.moveCount;
  }

  public getHistory(): MoveHistory {
    return this.history;
  }

  // ---------------------------------------------------------------
  // Top card helpers
  // ---------------------------------------------------------------

  private topOfFan(index: number): Card | null {
    const fan = this.state.fans[index];
    return fan.length > 0 ? fan[fan.length - 1] : null;
  }

  private topOfReserve(index: number): Card | null {
    const res = this.state.reserves[index];
    return res.length > 0 ? res[res.length - 1] : null;
  }

  private topOfFoundation(index: number): Card | null {
    const f = this.state.foundations[index];
    return f.length > 0 ? f[f.length - 1] : null;
  }

  // ---------------------------------------------------------------
  // Foundation logic
  // ---------------------------------------------------------------

  /** Find which foundation index accepts this card, or -1 */
  public findFoundationFor(card: Card): number {
    for (let i = 0; i < 4; i++) {
      if (this.canPlayToFoundation(card, i)) return i;
    }
    return -1;
  }

  /** Check if a card can be placed on a specific foundation */
  public canPlayToFoundation(card: Card, foundationIndex: number): boolean {
    const foundation = this.state.foundations[foundationIndex];
    if (foundation.length === 0) {
      // Empty foundation accepts only Aces
      return card.rank === 1;
    }
    const top = foundation[foundation.length - 1];
    return card.suit === top.suit && card.rank === top.rank + 1;
  }

  // ---------------------------------------------------------------
  // Tableau (fan) logic
  // ---------------------------------------------------------------

  /** Check if a card can be placed on a specific fan */
  public canPlayToFan(card: Card, fanIndex: number): boolean {
    const fan = this.state.fans[fanIndex];
    if (fan.length === 0) {
      // Kings cannot go in empty fans
      return card.rank !== 13;
    }
    const top = fan[fan.length - 1];
    // Descending rank, any suit
    return card.rank === top.rank - 1;
  }

  // ---------------------------------------------------------------
  // Move validation
  // ---------------------------------------------------------------

  /** Get all valid moves from a given location */
  public getValidMovesFrom(from: BristolLocation): BristolMove[] {
    const card = this.getCardAt(from);
    if (!card) return [];

    const moves: BristolMove[] = [];

    // Try foundations
    for (let i = 0; i < 4; i++) {
      if (this.canPlayToFoundation(card, i)) {
        moves.push({ from, to: { type: 'foundation', index: i }, card });
      }
    }

    // Try fans
    for (let i = 0; i < 8; i++) {
      if (from.type === 'fan' && from.index === i) continue;
      if (this.canPlayToFan(card, i)) {
        moves.push({ from, to: { type: 'fan', index: i }, card });
      }
    }

    return moves;
  }

  /** Get card at a location (top card only) */
  public getCardAt(loc: BristolLocation): Card | null {
    switch (loc.type) {
      case 'fan': return this.topOfFan(loc.index);
      case 'reserve': return this.topOfReserve(loc.index);
      case 'foundation': return this.topOfFoundation(loc.index);
    }
  }

  // ---------------------------------------------------------------
  // Execute move
  // ---------------------------------------------------------------

  /** Move a card from one location to another */
  public moveCard(from: BristolLocation, to: BristolLocation): BristolMove {
    const card = this.getCardAt(from);
    if (!card) throw new Error('No card at source location');

    // Validate destination
    if (to.type === 'foundation') {
      if (!this.canPlayToFoundation(card, to.index)) {
        throw new Error('Invalid foundation move');
      }
    } else if (to.type === 'fan') {
      if (!this.canPlayToFan(card, to.index)) {
        throw new Error('Invalid fan move');
      }
    } else {
      throw new Error('Cannot move cards to reserve piles');
    }

    // Save snapshot for undo
    this.saveSnapshot();

    // Remove card from source
    this.removeCardFrom(from);

    // Place card at destination
    if (to.type === 'foundation') {
      this.state.foundations[to.index].push(card);
    } else {
      this.state.fans[to.index].push(card);
    }

    this.state.moveCount++;

    const move: BristolMove = { from, to, card };
    this.history.push(move as unknown as Move);

    this.checkWin();
    if (!this.state.isWon) {
      this.checkLoss();
    }

    return move;
  }

  private removeCardFrom(loc: BristolLocation): void {
    switch (loc.type) {
      case 'fan':
        this.state.fans[loc.index].pop();
        break;
      case 'reserve':
        this.state.reserves[loc.index].pop();
        break;
      case 'foundation':
        this.state.foundations[loc.index].pop();
        break;
    }
  }

  // ---------------------------------------------------------------
  // Stock dealing
  // ---------------------------------------------------------------

  /** Deal 3 cards from stock into 3 reserve piles (1 each) */
  public canDealFromStock(): boolean {
    return this.state.stock.length > 0;
  }

  public dealFromStock(): void {
    if (!this.canDealFromStock()) {
      throw new Error('No cards left in stock');
    }

    // Save snapshot for undo
    this.saveSnapshot();

    // Deal up to 3 cards, one to each reserve pile
    for (let i = 0; i < 3 && this.state.stock.length > 0; i++) {
      const card = this.state.stock.pop()!;
      this.state.reserves[i].push(card);
    }

    // Record as a move in history
    const dummyMove = { from: { type: 'stock' }, to: { type: 'reserve' }, card: null };
    this.history.push(dummyMove as unknown as Move);

    this.checkLoss();
  }

  // ---------------------------------------------------------------
  // Auto-move to foundations
  // ---------------------------------------------------------------

  /** Try to auto-move cards to foundations (aces and next-in-sequence) */
  public autoMoveToFoundations(): BristolMove[] {
    const moves: BristolMove[] = [];
    let moved = true;

    while (moved) {
      moved = false;

      // Check all fans
      for (let i = 0; i < 8; i++) {
        const card = this.topOfFan(i);
        if (!card) continue;
        const fi = this.findFoundationFor(card);
        if (fi >= 0 && this.shouldAutoMove(card)) {
          this.saveSnapshot();
          this.state.fans[i].pop();
          this.state.foundations[fi].push(card);
          this.state.moveCount++;
          const move: BristolMove = { from: { type: 'fan', index: i }, to: { type: 'foundation', index: fi }, card };
          this.history.push(move as unknown as Move);
          moves.push(move);
          moved = true;
        }
      }

      // Check all reserves
      for (let i = 0; i < 3; i++) {
        const card = this.topOfReserve(i);
        if (!card) continue;
        const fi = this.findFoundationFor(card);
        if (fi >= 0 && this.shouldAutoMove(card)) {
          this.saveSnapshot();
          this.state.reserves[i].pop();
          this.state.foundations[fi].push(card);
          this.state.moveCount++;
          const move: BristolMove = { from: { type: 'reserve', index: i }, to: { type: 'foundation', index: fi }, card };
          this.history.push(move as unknown as Move);
          moves.push(move);
          moved = true;
        }
      }
    }

    if (moves.length > 0) {
      this.checkWin();
      if (!this.state.isWon) {
        this.checkLoss();
      }
    }

    return moves;
  }

  /** Only auto-move aces and 2s automatically */
  private shouldAutoMove(card: Card): boolean {
    return card.rank <= 2;
  }

  // ---------------------------------------------------------------
  // Hints
  // ---------------------------------------------------------------

  /** Get all currently valid moves */
  public getValidMoves(): BristolMove[] {
    const moves: BristolMove[] = [];

    // From fans
    for (let i = 0; i < 8; i++) {
      moves.push(...this.getValidMovesFrom({ type: 'fan', index: i }));
    }

    // From reserves
    for (let i = 0; i < 3; i++) {
      moves.push(...this.getValidMovesFrom({ type: 'reserve', index: i }));
    }

    return moves;
  }

  // ---------------------------------------------------------------
  // Undo (snapshot-based)
  // ---------------------------------------------------------------

  private saveSnapshot(): void {
    this.snapshots.push({
      fans: this.state.fans.map(f => [...f]),
      reserves: this.state.reserves.map(r => [...r]),
      foundations: this.state.foundations.map(f => [...f]),
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

    this.state.fans = snapshot.fans;
    this.state.reserves = snapshot.reserves;
    this.state.foundations = snapshot.foundations;
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
    const total = this.state.foundations.reduce((sum, f) => sum + f.length, 0);
    this.state.isWon = total === 52;
  }

  private checkLoss(): void {
    // Not lost if there are valid moves
    if (this.getValidMoves().length > 0) {
      this.state.isLost = false;
      return;
    }

    // Not lost if we can still deal from stock
    if (this.canDealFromStock()) {
      this.state.isLost = false;
      return;
    }

    // No moves and no stock = lost (unless already won)
    if (!this.state.isWon) {
      this.state.isLost = true;
    }
  }

  // ---------------------------------------------------------------
  // Utility
  // ---------------------------------------------------------------

  public getStockCount(): number {
    return this.state.stock.length;
  }

  public getFoundationCount(): number {
    return this.state.foundations.reduce((sum, f) => sum + f.length, 0);
  }

  public isAutoCompletable(): boolean {
    // Auto-completable if stock is empty, all reserves are empty,
    // and all fan cards are in descending order within each fan
    if (this.state.stock.length > 0) return false;
    if (this.state.reserves.some(r => r.length > 0)) return false;

    for (const fan of this.state.fans) {
      for (let i = 1; i < fan.length; i++) {
        if (fan[i].rank >= fan[i - 1].rank) return false;
      }
    }

    return true;
  }
}
