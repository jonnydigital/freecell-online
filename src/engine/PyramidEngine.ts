import { Card, Suit, Rank } from './Card';
import { MoveHistory } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface PyramidGameState {
  pyramid: (Card | null)[][]; // 7 rows; null means card removed
  stock: Card[];
  waste: Card[];
  removed: Card[];            // cards removed from play
  gameNumber: number;
  moveCount: number;
  isWon: boolean;
  recyclesRemaining: number;
}

export type PyramidLocation =
  | { type: 'pyramid'; row: number; col: number }
  | { type: 'stock' }
  | { type: 'waste' };

export interface PyramidMove {
  type: 'pair' | 'king' | 'draw' | 'recycle';
  cards: Card[];
  from: PyramidLocation[];
  recycledWaste?: Card[];   // cards that were in waste before recycle
}

export class PyramidEngine {
  private state: PyramidGameState;
  private history: MoveHistory = new MoveHistory();

  constructor(gameNumber: number, pyramid: Card[][], stock: Card[]) {
    this.state = {
      pyramid: pyramid.map(row => [...row]),
      stock: [...stock],
      waste: [],
      removed: [],
      gameNumber,
      moveCount: 0,
      isWon: false,
      recyclesRemaining: 2,
    };
  }

  public getState(): Readonly<PyramidGameState> {
    return this.state;
  }

  public getMoveCount(): number {
    return this.state.moveCount;
  }

  public getHistory(): MoveHistory {
    return this.history;
  }

  /**
   * A pyramid card is exposed if both children in the row below are removed (null).
   * Bottom row (row 6) cards are always exposed if present.
   * Card at (row, col) has children at (row+1, col) and (row+1, col+1).
   */
  public isExposed(row: number, col: number): boolean {
    const card = this.state.pyramid[row]?.[col];
    if (!card) return false; // already removed

    if (row === 6) return true; // bottom row

    const leftChild = this.state.pyramid[row + 1]?.[col];
    const rightChild = this.state.pyramid[row + 1]?.[col + 1];
    return leftChild === null && rightChild === null;
  }

  /**
   * Get card value for pyramid pairing (A=1, J=11, Q=12, K=13)
   */
  public static cardValue(card: Card): number {
    return card.rank as number;
  }

  /**
   * Check if two cards can be paired (sum to 13)
   */
  public canPair(a: Card, b: Card): boolean {
    return PyramidEngine.cardValue(a) + PyramidEngine.cardValue(b) === 13;
  }

  /**
   * Check if a card is a King (can be removed alone)
   */
  public isKing(card: Card): boolean {
    return card.rank === 13;
  }

  /**
   * Get all currently exposed pyramid cards
   */
  public getExposedCards(): { card: Card; row: number; col: number }[] {
    const exposed: { card: Card; row: number; col: number }[] = [];
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col <= row; col++) {
        if (this.isExposed(row, col)) {
          exposed.push({ card: this.state.pyramid[row][col]!, row, col });
        }
      }
    }
    return exposed;
  }

  /**
   * Get the top waste card (available for pairing)
   */
  public getWasteTop(): Card | null {
    return this.state.waste.length > 0 ? this.state.waste[this.state.waste.length - 1] : null;
  }

  /**
   * Remove a King from the pyramid
   */
  public removeKing(row: number, col: number): PyramidMove {
    if (!this.isExposed(row, col)) throw new Error('Card not exposed');
    const card = this.state.pyramid[row][col]!;
    if (!this.isKing(card)) throw new Error('Card is not a King');

    this.state.pyramid[row][col] = null;
    this.state.removed.push(card);
    this.state.moveCount++;
    this.checkWin();

    const move: PyramidMove = {
      type: 'king',
      cards: [card],
      from: [{ type: 'pyramid', row, col }],
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Remove a King from the waste pile
   */
  public removeWasteKing(): PyramidMove {
    const card = this.getWasteTop();
    if (!card || !this.isKing(card)) throw new Error('Waste top is not a King');

    this.state.waste.pop();
    this.state.removed.push(card);
    this.state.moveCount++;

    const move: PyramidMove = {
      type: 'king',
      cards: [card],
      from: [{ type: 'waste' }],
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Pair two pyramid cards
   */
  public pairPyramidCards(
    row1: number, col1: number,
    row2: number, col2: number
  ): PyramidMove {
    if (!this.isExposed(row1, col1) || !this.isExposed(row2, col2)) {
      throw new Error('One or both cards not exposed');
    }
    const card1 = this.state.pyramid[row1][col1]!;
    const card2 = this.state.pyramid[row2][col2]!;
    if (!this.canPair(card1, card2)) throw new Error('Cards do not sum to 13');

    this.state.pyramid[row1][col1] = null;
    this.state.pyramid[row2][col2] = null;
    this.state.removed.push(card1, card2);
    this.state.moveCount++;
    this.checkWin();

    const move: PyramidMove = {
      type: 'pair',
      cards: [card1, card2],
      from: [
        { type: 'pyramid', row: row1, col: col1 },
        { type: 'pyramid', row: row2, col: col2 },
      ],
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Pair a pyramid card with the waste top
   */
  public pairWithWaste(row: number, col: number): PyramidMove {
    if (!this.isExposed(row, col)) throw new Error('Pyramid card not exposed');
    const pyramidCard = this.state.pyramid[row][col]!;
    const wasteCard = this.getWasteTop();
    if (!wasteCard) throw new Error('No waste card');
    if (!this.canPair(pyramidCard, wasteCard)) throw new Error('Cards do not sum to 13');

    this.state.pyramid[row][col] = null;
    this.state.waste.pop();
    this.state.removed.push(pyramidCard, wasteCard);
    this.state.moveCount++;
    this.checkWin();

    const move: PyramidMove = {
      type: 'pair',
      cards: [pyramidCard, wasteCard],
      from: [
        { type: 'pyramid', row, col },
        { type: 'waste' },
      ],
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Draw from stock to waste
   */
  public drawFromStock(): PyramidMove {
    if (this.state.stock.length === 0) {
      throw new Error('No cards in stock');
    }

    const card = this.state.stock.pop()!;
    card.isFaceUp = true;
    this.state.waste.push(card);
    this.state.moveCount++;

    const move: PyramidMove = {
      type: 'draw',
      cards: [card],
      from: [{ type: 'stock' }],
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Recycle waste back to stock
   */
  public recycleWaste(): PyramidMove {
    if (this.state.recyclesRemaining <= 0) throw new Error('No recycles remaining');
    if (this.state.stock.length > 0) throw new Error('Stock is not empty');
    if (this.state.waste.length === 0) throw new Error('Waste is empty');

    const recycledWaste = [...this.state.waste];
    this.state.stock = this.state.waste.reverse();
    this.state.waste = [];
    for (const c of this.state.stock) {
      c.isFaceUp = false;
    }
    this.state.recyclesRemaining--;
    this.state.moveCount++;

    const move: PyramidMove = {
      type: 'recycle',
      cards: [],
      from: [{ type: 'waste' }],
      recycledWaste,
    };
    this.history.push(move as unknown as Move);
    return move;
  }

  /**
   * Undo the last move
   */
  public undoLastMove(): PyramidMove | null {
    const entry = this.history.popUndo();
    if (!entry) return null;

    const move = entry.playerMove as unknown as PyramidMove;
    this.undoSingleMove(move);
    this.state.moveCount = Math.max(0, this.state.moveCount - 1);
    this.state.isWon = false;
    return move;
  }

  private undoSingleMove(move: PyramidMove): void {
    switch (move.type) {
      case 'king': {
        const card = move.cards[0];
        this.state.removed.pop();
        if (move.from[0].type === 'pyramid') {
          const loc = move.from[0] as { type: 'pyramid'; row: number; col: number };
          this.state.pyramid[loc.row][loc.col] = card;
        } else {
          // King was from waste
          this.state.waste.push(card);
        }
        break;
      }
      case 'pair': {
        // Remove both cards from removed pile
        this.state.removed.pop();
        this.state.removed.pop();

        for (let i = move.cards.length - 1; i >= 0; i--) {
          const card = move.cards[i];
          const from = move.from[i];
          if (from.type === 'pyramid') {
            const loc = from as { type: 'pyramid'; row: number; col: number };
            this.state.pyramid[loc.row][loc.col] = card;
          } else if (from.type === 'waste') {
            this.state.waste.push(card);
          }
        }
        break;
      }
      case 'draw': {
        const card = this.state.waste.pop()!;
        card.isFaceUp = false;
        this.state.stock.push(card);
        break;
      }
      case 'recycle': {
        // Undo recycle: stock → waste (in original order)
        if (move.recycledWaste) {
          this.state.waste = [...move.recycledWaste];
          this.state.stock = [];
          for (const c of this.state.waste) {
            c.isFaceUp = true;
          }
          this.state.recyclesRemaining++;
        }
        break;
      }
    }
  }

  /**
   * Check if all 28 pyramid cards have been removed
   */
  private checkWin(): void {
    let remaining = 0;
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col <= row; col++) {
        if (this.state.pyramid[row][col] !== null) remaining++;
      }
    }
    this.state.isWon = remaining === 0;
  }

  /**
   * Count remaining pyramid cards
   */
  public getRemainingCount(): number {
    let count = 0;
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col <= row; col++) {
        if (this.state.pyramid[row][col] !== null) count++;
      }
    }
    return count;
  }

  /**
   * Find available pairs (hint system)
   */
  public getHint(): PyramidMove | null {
    const exposed = this.getExposedCards();
    const wasteTop = this.getWasteTop();

    // 1. Check for Kings in pyramid
    for (const { card, row, col } of exposed) {
      if (this.isKing(card)) {
        return {
          type: 'king',
          cards: [card],
          from: [{ type: 'pyramid', row, col }],
        };
      }
    }

    // 2. Check for King on waste
    if (wasteTop && this.isKing(wasteTop)) {
      return {
        type: 'king',
        cards: [wasteTop],
        from: [{ type: 'waste' }],
      };
    }

    // 3. Check pairs among pyramid cards
    for (let i = 0; i < exposed.length; i++) {
      for (let j = i + 1; j < exposed.length; j++) {
        if (this.canPair(exposed[i].card, exposed[j].card)) {
          return {
            type: 'pair',
            cards: [exposed[i].card, exposed[j].card],
            from: [
              { type: 'pyramid', row: exposed[i].row, col: exposed[i].col },
              { type: 'pyramid', row: exposed[j].row, col: exposed[j].col },
            ],
          };
        }
      }
    }

    // 4. Check pairs of pyramid card + waste
    if (wasteTop) {
      for (const { card, row, col } of exposed) {
        if (this.canPair(card, wasteTop)) {
          return {
            type: 'pair',
            cards: [card, wasteTop],
            from: [
              { type: 'pyramid', row, col },
              { type: 'waste' },
            ],
          };
        }
      }
    }

    // 5. Suggest drawing from stock
    if (this.state.stock.length > 0) {
      return {
        type: 'draw',
        cards: [],
        from: [{ type: 'stock' }],
      };
    }

    // 6. Suggest recycling waste
    if (this.state.waste.length > 0 && this.state.recyclesRemaining > 0) {
      return {
        type: 'recycle',
        cards: [],
        from: [{ type: 'waste' }],
      };
    }

    return null;
  }

  /**
   * Check if the game is unwinnable (no valid moves at all)
   */
  public isUnwinnable(): boolean {
    const exposed = this.getExposedCards();
    const wasteTop = this.getWasteTop();

    // Check for any Kings
    for (const { card } of exposed) {
      if (this.isKing(card)) return false;
    }
    if (wasteTop && this.isKing(wasteTop)) return false;

    // Check for any pairs
    for (let i = 0; i < exposed.length; i++) {
      for (let j = i + 1; j < exposed.length; j++) {
        if (this.canPair(exposed[i].card, exposed[j].card)) return false;
      }
    }
    if (wasteTop) {
      for (const { card } of exposed) {
        if (this.canPair(card, wasteTop)) return false;
      }
    }

    // Can draw
    if (this.state.stock.length > 0) return false;

    // Can recycle
    if (this.state.waste.length > 0 && this.state.recyclesRemaining > 0) return false;

    return true;
  }
}
