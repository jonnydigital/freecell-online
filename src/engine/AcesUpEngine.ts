/**
 * Aces Up Solitaire Engine (also known as Idiot's Delight)
 *
 * Standard 52-card deck. 4 tableau piles + stock pile.
 * Deal 1 card to each of the 4 tableau piles from stock.
 * A top card can be REMOVED (discarded) if another pile's top card has the
 * same suit and higher rank. Aces are HIGH (rank 14 effectively).
 * Any top card can be moved to an empty tableau pile.
 * Deal: place 1 card from stock onto each of the 4 tableau piles.
 * Win: only 4 Aces remain (one per pile).
 * Win rate: ~10%.
 */

import { Card, Suit, Rank } from './Card';
import { MoveHistory } from './MoveHistory';
import { Move } from './FreeCellEngine';

export interface AcesUpGameState {
  tableau: Card[][];    // 4 tableau piles
  stock: Card[];        // remaining cards to deal
  discardCount: number; // number of cards discarded
  gameNumber: number;
  moveCount: number;
  isWon: boolean;
}

export type AcesUpMoveType = 'discard' | 'move-to-empty' | 'deal';

export interface AcesUpMove {
  type: AcesUpMoveType;
  fromPile?: number;         // source tableau pile index (for discard/move)
  toPile?: number;           // destination tableau pile index (for move-to-empty)
  card?: Card;               // the card that was discarded or moved
  dealtCards?: Card[];       // cards dealt from stock (for deal moves)
  previousTops?: (Card | null)[];  // top cards before deal (for undo)
}

export class AcesUpEngine {
  private state: AcesUpGameState;
  private history: MoveHistory = new MoveHistory();

  constructor(gameNumber: number, tableau: Card[][], stock: Card[]) {
    this.state = {
      tableau,
      stock,
      discardCount: 0,
      gameNumber,
      moveCount: 0,
      isWon: false,
    };
  }

  public getState(): Readonly<AcesUpGameState> {
    return this.state;
  }

  public getMoveCount(): number {
    return this.state.moveCount;
  }

  public getHistory(): MoveHistory {
    return this.history;
  }

  // ---------------------------------------------------------------
  // Rank comparison (Aces are HIGH in Aces Up)
  // ---------------------------------------------------------------

  private effectiveRank(rank: Rank): number {
    return rank === 1 ? 14 : rank; // Ace = 14 (highest)
  }

  // ---------------------------------------------------------------
  // Discard validation
  // ---------------------------------------------------------------

  /** Check if a top card can be discarded (another pile has same suit, higher rank) */
  public canDiscard(pileIndex: number): boolean {
    const pile = this.state.tableau[pileIndex];
    if (!pile || pile.length === 0) return false;

    const card = pile[pile.length - 1];
    const cardRank = this.effectiveRank(card.rank);

    for (let i = 0; i < 4; i++) {
      if (i === pileIndex) continue;
      const otherPile = this.state.tableau[i];
      if (otherPile.length === 0) continue;

      const otherCard = otherPile[otherPile.length - 1];
      if (otherCard.suit === card.suit && this.effectiveRank(otherCard.rank) > cardRank) {
        return true;
      }
    }
    return false;
  }

  /** Check if a top card can be moved to an empty pile */
  public canMoveToEmpty(pileIndex: number): { canMove: boolean; emptyPiles: number[] } {
    const pile = this.state.tableau[pileIndex];
    if (!pile || pile.length === 0) return { canMove: false, emptyPiles: [] };

    const emptyPiles: number[] = [];
    for (let i = 0; i < 4; i++) {
      if (i === pileIndex) continue;
      if (this.state.tableau[i].length === 0) {
        emptyPiles.push(i);
      }
    }
    return { canMove: emptyPiles.length > 0, emptyPiles };
  }

  /** Check if we can deal from stock */
  public canDeal(): boolean {
    return this.state.stock.length >= 4;
  }

  // ---------------------------------------------------------------
  // Execute moves
  // ---------------------------------------------------------------

  public discardCard(pileIndex: number): AcesUpMove {
    if (!this.canDiscard(pileIndex)) throw new Error('Cannot discard this card');

    const card = this.state.tableau[pileIndex].pop()!;
    this.state.discardCount++;
    this.state.moveCount++;

    const move: AcesUpMove = {
      type: 'discard',
      fromPile: pileIndex,
      card,
    };

    this.history.push(move as unknown as Move);
    this.checkWin();
    return move;
  }

  public moveToEmpty(fromPile: number, toPile: number): AcesUpMove {
    if (fromPile === toPile) throw new Error('Cannot move to same pile');
    if (this.state.tableau[fromPile].length === 0) throw new Error('Source pile is empty');
    if (this.state.tableau[toPile].length !== 0) throw new Error('Target pile is not empty');

    const card = this.state.tableau[fromPile].pop()!;
    this.state.tableau[toPile].push(card);
    this.state.moveCount++;

    const move: AcesUpMove = {
      type: 'move-to-empty',
      fromPile,
      toPile,
      card,
    };

    this.history.push(move as unknown as Move);
    this.checkWin();
    return move;
  }

  public dealFromStock(): AcesUpMove {
    if (!this.canDeal()) throw new Error('Not enough cards in stock to deal');

    const dealtCards: Card[] = [];
    for (let i = 0; i < 4; i++) {
      const card = this.state.stock.pop()!;
      this.state.tableau[i].push(card);
      dealtCards.push(card);
    }
    this.state.moveCount++;

    const move: AcesUpMove = {
      type: 'deal',
      dealtCards,
    };

    this.history.push(move as unknown as Move);
    return move;
  }

  // ---------------------------------------------------------------
  // Undo
  // ---------------------------------------------------------------

  public undoLastMove(): AcesUpMove | null {
    const entry = this.history.popUndo();
    if (!entry) return null;

    const move = entry.playerMove as unknown as AcesUpMove;

    switch (move.type) {
      case 'discard': {
        // Put card back on the pile
        this.state.tableau[move.fromPile!].push(move.card!);
        this.state.discardCount--;
        break;
      }
      case 'move-to-empty': {
        // Move card back from toPile to fromPile
        this.state.tableau[move.toPile!].pop();
        this.state.tableau[move.fromPile!].push(move.card!);
        break;
      }
      case 'deal': {
        // Remove dealt cards from tableau and put back on stock (in reverse)
        for (let i = 3; i >= 0; i--) {
          const card = this.state.tableau[i].pop()!;
          this.state.stock.push(card);
        }
        break;
      }
    }

    this.state.moveCount = Math.max(0, this.state.moveCount - 1);
    this.state.isWon = false;

    return move;
  }

  // ---------------------------------------------------------------
  // Win detection
  // ---------------------------------------------------------------

  private checkWin(): void {
    // Win if exactly 4 cards remain, all Aces
    let totalCards = 0;
    let aceCount = 0;
    for (const pile of this.state.tableau) {
      totalCards += pile.length;
      for (const card of pile) {
        if (card.rank === 1) aceCount++;
      }
    }
    this.state.isWon = totalCards === 4 && aceCount === 4 && this.state.stock.length === 0;
  }

  // ---------------------------------------------------------------
  // Deadlock detection
  // ---------------------------------------------------------------

  public isDeadlocked(): boolean {
    if (this.state.stock.length > 0) return false;

    // Check if any card can be discarded
    for (let i = 0; i < 4; i++) {
      if (this.canDiscard(i)) return false;
    }

    // Check if any move to empty would help (only useful if there are empty piles)
    const hasEmpty = this.state.tableau.some(p => p.length === 0);
    if (hasEmpty) {
      // A move to empty is always possible if there's a non-empty pile
      const hasNonEmpty = this.state.tableau.some(p => p.length > 0);
      if (hasNonEmpty) {
        // Check if moving reveals new discard opportunities
        for (let from = 0; from < 4; from++) {
          if (this.state.tableau[from].length <= 1) continue;
          // Moving top card to empty reveals card underneath - could create new discards
          return false; // Not deadlocked if moves to empty are possible with multi-card piles
        }
      }
    }

    return true;
  }

  // ---------------------------------------------------------------
  // Hint system
  // ---------------------------------------------------------------

  public getHint(): AcesUpMove | null {
    // Priority 1: Discard cards (prefer lower ranks first)
    const discardable: { pile: number; rank: number }[] = [];
    for (let i = 0; i < 4; i++) {
      if (this.canDiscard(i)) {
        const card = this.state.tableau[i][this.state.tableau[i].length - 1];
        discardable.push({ pile: i, rank: this.effectiveRank(card.rank) });
      }
    }
    if (discardable.length > 0) {
      // Discard lowest rank first
      discardable.sort((a, b) => a.rank - b.rank);
      const best = discardable[0];
      const card = this.state.tableau[best.pile][this.state.tableau[best.pile].length - 1];
      return { type: 'discard', fromPile: best.pile, card };
    }

    // Priority 2: Move to empty pile (prefer piles with only 1 card that is an Ace)
    const emptyPiles = this.state.tableau
      .map((p, i) => ({ pile: i, empty: p.length === 0 }))
      .filter(p => p.empty)
      .map(p => p.pile);

    if (emptyPiles.length > 0) {
      // Find a good card to move to empty (prefer moving from piles with >1 card)
      for (let i = 0; i < 4; i++) {
        const pile = this.state.tableau[i];
        if (pile.length > 1) {
          const topCard = pile[pile.length - 1];
          // Move Aces to empty piles (they can never be discarded)
          if (topCard.rank === 1) {
            return { type: 'move-to-empty', fromPile: i, toPile: emptyPiles[0], card: topCard };
          }
        }
      }
      // Move any card from a multi-card pile to empty
      for (let i = 0; i < 4; i++) {
        if (this.state.tableau[i].length > 1) {
          const topCard = this.state.tableau[i][this.state.tableau[i].length - 1];
          return { type: 'move-to-empty', fromPile: i, toPile: emptyPiles[0], card: topCard };
        }
      }
    }

    // Priority 3: Deal from stock
    if (this.canDeal()) {
      return { type: 'deal' };
    }

    return null;
  }

  // ---------------------------------------------------------------
  // Auto-remove all discardable cards
  // ---------------------------------------------------------------

  public autoDiscardAll(): AcesUpMove[] {
    const moves: AcesUpMove[] = [];
    let found = true;
    while (found) {
      found = false;
      for (let i = 0; i < 4; i++) {
        if (this.canDiscard(i)) {
          moves.push(this.discardCard(i));
          found = true;
        }
      }
    }
    return moves;
  }
}
