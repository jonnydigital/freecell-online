import { Card, Suit, Rank, Color } from './Card';
import { MoveHistory } from './MoveHistory';
import { Move } from './FreeCellEngine';

/**
 * Canfield Solitaire Engine
 *
 * Deal: 13 cards face-down into a reserve pile (top card face-up).
 * 1 card face-up to start the first foundation.
 * 4 tableau columns with 1 card each from the remaining cards.
 * Rest goes to stock.
 *
 * Foundations: 4 piles. Build UP in suit, wrapping (K→A→2...).
 * Starting rank determined by the first foundation card.
 *
 * Tableau: 4 columns. Build DOWN in alternating color, wrapping (A→K).
 * Any number of cards in proper sequence can be moved.
 * Empty columns are auto-filled from the reserve (if reserve empty, any card can fill).
 *
 * Stock: Draw 3 cards at a time to waste pile. Top of waste is playable.
 * When stock is exhausted, flip waste back to stock (unlimited redeals).
 *
 * Reserve: Top card always playable to tableau or foundations.
 * Auto-reveals next card when played.
 *
 * Win: All 52 cards on foundations.
 */

export interface CanfieldGameState {
  tableau: Card[][];      // 4 columns
  foundations: Card[][];   // 4 piles
  reserve: Card[];         // up to 13 cards, top is face-up
  stock: Card[];
  waste: Card[];
  gameNumber: number;
  moveCount: number;
  foundationBaseRank: Rank; // starting rank for foundations
  isWon: boolean;
}

export type CanfieldLocation =
  | { type: 'tableau'; col: number }
  | { type: 'foundation'; pile: number }
  | { type: 'reserve' }
  | { type: 'stock' }
  | { type: 'waste' };

export interface CanfieldMove {
  type: 'play' | 'draw' | 'recycle';
  cards: Card[];
  from: CanfieldLocation;
  to: CanfieldLocation;
  autoFillCard?: Card;       // card auto-filled from reserve to empty tableau col
  autoFillCol?: number;      // which col was auto-filled
  previousWasteCards?: Card[];  // for undo of recycle
  drawnCards?: Card[];        // cards drawn from stock (for undo)
}

export class CanfieldEngine {
  private state: CanfieldGameState;
  private history: MoveHistory = new MoveHistory();

  constructor(
    gameNumber: number,
    tableau: Card[][],
    foundations: Card[][],
    reserve: Card[],
    stock: Card[],
    waste: Card[],
    foundationBaseRank: Rank,
  ) {
    this.state = {
      tableau: tableau.map(col => [...col]),
      foundations: foundations.map(pile => [...pile]),
      reserve: [...reserve],
      stock: [...stock],
      waste: [...waste],
      gameNumber,
      moveCount: 0,
      foundationBaseRank,
      isWon: false,
    };
  }

  public getState(): Readonly<CanfieldGameState> {
    return this.state;
  }

  public getMoveCount(): number {
    return this.state.moveCount;
  }

  public getHistory(): MoveHistory {
    return this.history;
  }

  // ===== FOUNDATION LOGIC =====

  /**
   * Check if a card can be played to a specific foundation pile.
   * Foundations build UP in suit, wrapping, starting from foundationBaseRank.
   */
  public canPlayToFoundation(card: Card, pile: number): boolean {
    const foundation = this.state.foundations[pile];
    if (foundation.length === 0) {
      // Empty foundation: only the base rank can start it, and suit must match the pile's suit
      // Actually in Canfield, any suit can go to any empty foundation as long as rank matches base
      return card.rank === this.state.foundationBaseRank;
    }
    const top = foundation[foundation.length - 1];
    if (card.suit !== top.suit) return false;
    // Next rank up with wrapping
    const nextRank = top.rank === 13 ? 1 : top.rank + 1;
    return card.rank === nextRank;
  }

  /**
   * Find which foundation pile a card can go to, or -1 if none.
   */
  public findFoundationTarget(card: Card): number {
    for (let i = 0; i < 4; i++) {
      if (this.canPlayToFoundation(card, i)) return i;
    }
    return -1;
  }

  // ===== TABLEAU LOGIC =====

  /**
   * Check if a card can be placed on a tableau column.
   * Build DOWN in alternating color, wrapping (A on top of 2, K on top of A).
   */
  public canPlayToTableau(card: Card, col: number): boolean {
    const column = this.state.tableau[col];
    if (column.length === 0) {
      // Empty column: auto-fill from reserve if available, else any card
      return this.state.reserve.length === 0;
    }
    const top = column[column.length - 1];
    // Alternating color
    if (card.color === top.color) return false;
    // One rank lower, with wrapping (A goes on 2, K goes on A)
    const expectedRank = top.rank === 1 ? 13 : top.rank - 1;
    return card.rank === expectedRank;
  }

  /**
   * Get the length of a valid sequence from the bottom of a tableau column.
   * A valid sequence is built down in alternating color with wrapping.
   */
  private getSequenceLength(col: number): number {
    const column = this.state.tableau[col];
    if (column.length === 0) return 0;
    let len = 1;
    for (let i = column.length - 1; i > 0; i--) {
      const lower = column[i];
      const upper = column[i - 1];
      if (!lower.isFaceUp || !upper.isFaceUp) break;
      if (lower.color === upper.color) break;
      const expectedRank = upper.rank === 1 ? 13 : upper.rank - 1;
      if (lower.rank !== expectedRank) break;
      len++;
    }
    return len;
  }

  // ===== RESERVE =====

  public getReserveTop(): Card | null {
    if (this.state.reserve.length === 0) return null;
    return this.state.reserve[this.state.reserve.length - 1];
  }

  // ===== WASTE =====

  public getWasteTop(): Card | null {
    if (this.state.waste.length === 0) return null;
    return this.state.waste[this.state.waste.length - 1];
  }

  // ===== MOVES =====

  /**
   * Play a card from waste to foundation or tableau.
   */
  public playWasteCard(target: CanfieldLocation): CanfieldMove {
    const card = this.getWasteTop();
    if (!card) throw new Error('No card in waste');

    if (target.type === 'foundation') {
      if (!this.canPlayToFoundation(card, target.pile)) throw new Error('Cannot play to foundation');
      this.state.waste.pop();
      this.state.foundations[target.pile].push(card);
    } else if (target.type === 'tableau') {
      if (!this.canPlayToTableau(card, target.col)) throw new Error('Cannot play to tableau');
      this.state.waste.pop();
      this.state.tableau[target.col].push(card);
    } else {
      throw new Error('Invalid target for waste card');
    }

    this.state.moveCount++;
    this.checkWin();

    const move: CanfieldMove = {
      type: 'play',
      cards: [card],
      from: { type: 'waste' },
      to: target,
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Play the reserve top card to foundation or tableau.
   */
  public playReserveCard(target: CanfieldLocation): CanfieldMove {
    const card = this.getReserveTop();
    if (!card) throw new Error('No card in reserve');

    if (target.type === 'foundation') {
      if (!this.canPlayToFoundation(card, target.pile)) throw new Error('Cannot play to foundation');
      this.state.reserve.pop();
      this.state.foundations[target.pile].push(card);
    } else if (target.type === 'tableau') {
      if (!this.canPlayToTableau(card, target.col)) throw new Error('Cannot play to tableau');
      this.state.reserve.pop();
      this.state.tableau[target.col].push(card);
    } else {
      throw new Error('Invalid target for reserve card');
    }

    // Reveal next reserve card
    if (this.state.reserve.length > 0) {
      this.state.reserve[this.state.reserve.length - 1].isFaceUp = true;
    }

    this.state.moveCount++;
    this.checkWin();

    const move: CanfieldMove = {
      type: 'play',
      cards: [card],
      from: { type: 'reserve' },
      to: target,
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Move cards from one tableau column to another.
   * Can move any valid sequence (built down alternating color).
   */
  public moveTableauCards(fromCol: number, toCol: number, count: number): CanfieldMove {
    const fromColumn = this.state.tableau[fromCol];
    if (count > fromColumn.length) throw new Error('Not enough cards');

    const cards = fromColumn.slice(fromColumn.length - count);
    const bottomCard = cards[0];

    if (!this.canPlayToTableau(bottomCard, toCol)) throw new Error('Cannot play to tableau');

    // Remove cards from source
    this.state.tableau[fromCol].splice(fromColumn.length - count, count);
    // Add to destination
    this.state.tableau[toCol].push(...cards);

    // Auto-fill empty column from reserve
    let autoFillCard: Card | undefined;
    let autoFillCol: number | undefined;
    if (this.state.tableau[fromCol].length === 0 && this.state.reserve.length > 0) {
      const reserveCard = this.state.reserve.pop()!;
      reserveCard.isFaceUp = true;
      this.state.tableau[fromCol].push(reserveCard);
      autoFillCard = reserveCard;
      autoFillCol = fromCol;
      // Reveal next reserve card
      if (this.state.reserve.length > 0) {
        this.state.reserve[this.state.reserve.length - 1].isFaceUp = true;
      }
    }

    this.state.moveCount++;
    this.checkWin();

    const move: CanfieldMove = {
      type: 'play',
      cards,
      from: { type: 'tableau', col: fromCol },
      to: { type: 'tableau', col: toCol },
      autoFillCard,
      autoFillCol,
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Move top card of a tableau column to a foundation.
   */
  public playTableauToFoundation(col: number, pile: number): CanfieldMove {
    const column = this.state.tableau[col];
    if (column.length === 0) throw new Error('No cards in column');
    const card = column[column.length - 1];
    if (!this.canPlayToFoundation(card, pile)) throw new Error('Cannot play to foundation');

    column.pop();
    this.state.foundations[pile].push(card);

    // Auto-fill empty column from reserve
    let autoFillCard: Card | undefined;
    let autoFillCol: number | undefined;
    if (column.length === 0 && this.state.reserve.length > 0) {
      const reserveCard = this.state.reserve.pop()!;
      reserveCard.isFaceUp = true;
      column.push(reserveCard);
      autoFillCard = reserveCard;
      autoFillCol = col;
      if (this.state.reserve.length > 0) {
        this.state.reserve[this.state.reserve.length - 1].isFaceUp = true;
      }
    }

    this.state.moveCount++;
    this.checkWin();

    const move: CanfieldMove = {
      type: 'play',
      cards: [card],
      from: { type: 'tableau', col },
      to: { type: 'foundation', pile },
      autoFillCard,
      autoFillCol,
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Draw 3 cards from stock to waste (or fewer if stock has < 3).
   */
  public drawFromStock(): CanfieldMove {
    if (this.state.stock.length === 0) throw new Error('No cards in stock');

    const count = Math.min(3, this.state.stock.length);
    const drawnCards: Card[] = [];
    for (let i = 0; i < count; i++) {
      const card = this.state.stock.pop()!;
      card.isFaceUp = true;
      this.state.waste.push(card);
      drawnCards.push(card);
    }

    this.state.moveCount++;

    const move: CanfieldMove = {
      type: 'draw',
      cards: drawnCards,
      from: { type: 'stock' },
      to: { type: 'waste' },
      drawnCards,
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Recycle waste back to stock (flip waste over to become stock).
   */
  public recycleWaste(): CanfieldMove {
    if (this.state.stock.length > 0) throw new Error('Stock is not empty');
    if (this.state.waste.length === 0) throw new Error('No cards in waste');

    const previousWasteCards = [...this.state.waste];
    // Reverse waste into stock, face-down
    while (this.state.waste.length > 0) {
      const card = this.state.waste.pop()!;
      card.isFaceUp = false;
      this.state.stock.push(card);
    }

    this.state.moveCount++;

    const move: CanfieldMove = {
      type: 'recycle',
      cards: [],
      from: { type: 'waste' },
      to: { type: 'stock' },
      previousWasteCards,
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  // ===== UNDO =====

  public undoLastMove(): CanfieldMove | null {
    const entry = this.history.popUndo();
    if (!entry) return null;

    const move = entry.playerMove as unknown as CanfieldMove;
    this.undoSingleMove(move);
    this.state.moveCount = Math.max(0, this.state.moveCount - 1);
    this.state.isWon = false;
    return move;
  }

  private undoSingleMove(move: CanfieldMove): void {
    switch (move.type) {
      case 'play': {
        // Undo auto-fill first
        if (move.autoFillCard && move.autoFillCol !== undefined) {
          const col = this.state.tableau[move.autoFillCol];
          col.pop(); // remove auto-filled card
          move.autoFillCard.isFaceUp = true; // it was face-up when on top of reserve
          this.state.reserve.push(move.autoFillCard);
          // The card below in reserve should be face-down again if there are more
          if (this.state.reserve.length > 1) {
            this.state.reserve[this.state.reserve.length - 2].isFaceUp = false;
          }
        }

        // Move cards back to source
        if (move.to.type === 'foundation') {
          const pile = this.state.foundations[(move.to as { type: 'foundation'; pile: number }).pile];
          for (let i = move.cards.length - 1; i >= 0; i--) {
            pile.pop();
          }
        } else if (move.to.type === 'tableau') {
          const col = this.state.tableau[(move.to as { type: 'tableau'; col: number }).col];
          for (let i = 0; i < move.cards.length; i++) {
            col.pop();
          }
        }

        // Put cards back to source
        if (move.from.type === 'tableau') {
          this.state.tableau[(move.from as { type: 'tableau'; col: number }).col].push(...move.cards);
        } else if (move.from.type === 'waste') {
          this.state.waste.push(...move.cards);
        } else if (move.from.type === 'reserve') {
          // Put card back, make it face-up (it was the reserve top)
          move.cards[0].isFaceUp = true;
          this.state.reserve.push(move.cards[0]);
          // Card below should become face-down
          if (this.state.reserve.length > 1) {
            this.state.reserve[this.state.reserve.length - 2].isFaceUp = false;
          }
        }
        break;
      }
      case 'draw': {
        // Put drawn cards back to stock
        const drawnCards = move.drawnCards || move.cards;
        for (let i = drawnCards.length - 1; i >= 0; i--) {
          const card = this.state.waste.pop()!;
          card.isFaceUp = false;
          this.state.stock.push(card);
        }
        break;
      }
      case 'recycle': {
        // Restore waste from stock
        while (this.state.stock.length > 0) {
          const card = this.state.stock.pop()!;
          card.isFaceUp = true;
          this.state.waste.push(card);
        }
        // Reverse to restore original waste order
        this.state.waste.reverse();
        break;
      }
    }
  }

  // ===== WIN/LOSS =====

  private checkWin(): void {
    let total = 0;
    for (const pile of this.state.foundations) {
      total += pile.length;
    }
    if (total === 52) {
      this.state.isWon = true;
    }
  }

  public isDeadlocked(): boolean {
    // Can draw from stock?
    if (this.state.stock.length > 0) return false;
    // Can recycle waste?
    if (this.state.waste.length > 0) return false;

    // Check waste top
    const wasteTop = this.getWasteTop();
    if (wasteTop) {
      for (let i = 0; i < 4; i++) {
        if (this.canPlayToFoundation(wasteTop, i)) return false;
      }
      for (let col = 0; col < 4; col++) {
        if (this.canPlayToTableau(wasteTop, col)) return false;
      }
    }

    // Check reserve top
    const reserveTop = this.getReserveTop();
    if (reserveTop) {
      for (let i = 0; i < 4; i++) {
        if (this.canPlayToFoundation(reserveTop, i)) return false;
      }
      for (let col = 0; col < 4; col++) {
        if (this.canPlayToTableau(reserveTop, col)) return false;
      }
    }

    // Check tableau
    for (let col = 0; col < 4; col++) {
      const column = this.state.tableau[col];
      if (column.length === 0) continue;
      const topCard = column[column.length - 1];
      // Can play to foundation?
      for (let i = 0; i < 4; i++) {
        if (this.canPlayToFoundation(topCard, i)) return false;
      }
      // Can move sequence to another column?
      const seqLen = this.getSequenceLength(col);
      const bottomOfSeq = column[column.length - seqLen];
      for (let toCol = 0; toCol < 4; toCol++) {
        if (toCol === col) continue;
        if (this.canPlayToTableau(bottomOfSeq, toCol)) return false;
      }
    }

    return true;
  }

  // ===== HINTS =====

  public getHint(): CanfieldMove | null {
    // 1. Check if reserve top can go to foundation
    const reserveTop = this.getReserveTop();
    if (reserveTop) {
      const pile = this.findFoundationTarget(reserveTop);
      if (pile >= 0) {
        return { type: 'play', cards: [reserveTop], from: { type: 'reserve' }, to: { type: 'foundation', pile } };
      }
    }

    // 2. Check if waste top can go to foundation
    const wasteTop = this.getWasteTop();
    if (wasteTop) {
      const pile = this.findFoundationTarget(wasteTop);
      if (pile >= 0) {
        return { type: 'play', cards: [wasteTop], from: { type: 'waste' }, to: { type: 'foundation', pile } };
      }
    }

    // 3. Check if tableau tops can go to foundation
    for (let col = 0; col < 4; col++) {
      const column = this.state.tableau[col];
      if (column.length === 0) continue;
      const topCard = column[column.length - 1];
      const pile = this.findFoundationTarget(topCard);
      if (pile >= 0) {
        return { type: 'play', cards: [topCard], from: { type: 'tableau', col }, to: { type: 'foundation', pile } };
      }
    }

    // 4. Check reserve to tableau
    if (reserveTop) {
      for (let col = 0; col < 4; col++) {
        if (this.canPlayToTableau(reserveTop, col)) {
          return { type: 'play', cards: [reserveTop], from: { type: 'reserve' }, to: { type: 'tableau', col } };
        }
      }
    }

    // 5. Check waste to tableau
    if (wasteTop) {
      for (let col = 0; col < 4; col++) {
        if (this.canPlayToTableau(wasteTop, col)) {
          return { type: 'play', cards: [wasteTop], from: { type: 'waste' }, to: { type: 'tableau', col } };
        }
      }
    }

    // 6. Check tableau to tableau moves
    for (let fromCol = 0; fromCol < 4; fromCol++) {
      const column = this.state.tableau[fromCol];
      if (column.length === 0) continue;
      const seqLen = this.getSequenceLength(fromCol);
      const bottomOfSeq = column[column.length - seqLen];
      for (let toCol = 0; toCol < 4; toCol++) {
        if (toCol === fromCol) continue;
        if (this.canPlayToTableau(bottomOfSeq, toCol)) {
          const cards = column.slice(column.length - seqLen);
          return { type: 'play', cards, from: { type: 'tableau', col: fromCol }, to: { type: 'tableau', col: toCol } };
        }
      }
    }

    // 7. Suggest draw/recycle
    if (this.state.stock.length > 0) {
      return { type: 'draw', cards: [], from: { type: 'stock' }, to: { type: 'waste' } };
    }
    if (this.state.waste.length > 0) {
      return { type: 'recycle', cards: [], from: { type: 'waste' }, to: { type: 'stock' } };
    }

    return null;
  }
}
