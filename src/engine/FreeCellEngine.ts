/**
 * FreeCell Game Engine
 * 
 * Manages the complete game state: 8 cascades, 4 free cells, 4 foundations.
 * Handles move validation, sequence moves, auto-moves, and win detection.
 */

import { Card, Suit, Rank, Color } from './Card';
import { dealGame } from './Deck';

export interface GameState {
  cascades: Card[][];      // 8 columns
  freeCells: (Card | null)[]; // 4 free cells
  foundations: Map<Suit, Card[]>; // 4 foundation piles (by suit)
  gameNumber: number;
  moveCount: number;
  isWon: boolean;
}

export type Location =
  | { type: 'cascade'; index: number; cardIndex?: number }
  | { type: 'freecell'; index: number }
  | { type: 'foundation'; suit: Suit };

export interface Move {
  from: Location;
  to: Location;
  cards: Card[];
  isAutoMove?: boolean;
}

export class FreeCellEngine {
  private state: GameState;

  constructor(gameNumber: number) {
    const cascades = dealGame(gameNumber);
    this.state = {
      cascades,
      freeCells: [null, null, null, null],
      foundations: new Map([
        [Suit.Spades, []],
        [Suit.Hearts, []],
        [Suit.Diamonds, []],
        [Suit.Clubs, []],
      ]),
      gameNumber,
      moveCount: 0,
      isWon: false,
    };
  }

  getState(): Readonly<GameState> {
    return this.state;
  }

  /**
   * Get the top card of a foundation pile (or null if empty)
   */
  getFoundationTop(suit: Suit): Card | null {
    const pile = this.state.foundations.get(suit)!;
    return pile.length > 0 ? pile[pile.length - 1] : null;
  }

  /**
   * Get the current rank on each foundation (0 if empty)
   */
  getFoundationRanks(): Map<Suit, Rank | 0> {
    const ranks = new Map<Suit, Rank | 0>();
    for (const [suit, pile] of this.state.foundations) {
      ranks.set(suit, pile.length > 0 ? pile[pile.length - 1].rank : 0);
    }
    return ranks;
  }

  /**
   * Count empty free cells
   */
  get emptyFreeCells(): number {
    return this.state.freeCells.filter((c) => c === null).length;
  }

  /**
   * Count empty cascades
   */
  get emptyCascades(): number {
    return this.state.cascades.filter((c) => c.length === 0).length;
  }

  /**
   * Calculate the maximum number of cards that can be moved as a sequence
   * Formula: (1 + emptyFreeCells) * 2^emptyCascades
   * 
   * If moving TO an empty cascade, that cascade doesn't count as empty
   */
  calculateMaxMovable(toEmptyCascade: boolean = false): number {
    const freeCells = this.emptyFreeCells;
    const emptyCasc = this.emptyCascades - (toEmptyCascade ? 1 : 0);
    return (1 + freeCells) * Math.pow(2, Math.max(0, emptyCasc));
  }

  /**
   * Get a valid descending run from the bottom of a cascade
   * Returns the cards that form a valid sequence (alternating colors, descending ranks)
   */
  getValidRun(cascadeIndex: number): Card[] {
    const cascade = this.state.cascades[cascadeIndex];
    if (cascade.length === 0) return [];

    const run: Card[] = [cascade[cascade.length - 1]];
    for (let i = cascade.length - 2; i >= 0; i--) {
      const upper = cascade[i];
      const lower = run[run.length - 1];
      if (lower.canStackOnCascade(upper)) {
        run.push(upper);
      } else {
        break;
      }
    }
    run.reverse();
    return run;
  }

  /**
   * Check if a move is legal
   */
  isLegalMove(from: Location, to: Location): boolean {
    const card = this.getCardAt(from);
    if (!card) return false;

    switch (to.type) {
      case 'foundation': {
        // Only single cards to foundation
        if (from.type === 'cascade') {
          const cascade = this.state.cascades[from.index];
          if (from.cardIndex !== undefined && from.cardIndex !== cascade.length - 1) {
            return false; // Can't move non-top card to foundation
          }
        }
        const top = this.getFoundationTop(to.suit);
        return card.canMoveToFoundation(top);
      }

      case 'freecell': {
        if (this.state.freeCells[to.index] !== null) return false;
        // Only single cards to free cell
        if (from.type === 'cascade' && from.cardIndex !== undefined) {
          const cascade = this.state.cascades[from.index];
          if (from.cardIndex !== cascade.length - 1) return false;
        }
        return true;
      }

      case 'cascade': {
        const targetCascade = this.state.cascades[to.index];
        
        if (from.type === 'freecell' || (from.type === 'cascade' && (from.cardIndex === undefined || from.cardIndex === this.state.cascades[from.index].length - 1))) {
          // Single card move
          if (targetCascade.length === 0) return true; // Any card on empty cascade
          return card.canStackOnCascade(targetCascade[targetCascade.length - 1]);
        }

        // Sequence move from cascade
        if (from.type === 'cascade' && from.cardIndex !== undefined) {
          const sourceCascade = this.state.cascades[from.index];
          const runSize = sourceCascade.length - from.cardIndex;
          
          // Verify it's a valid run
          for (let i = from.cardIndex; i < sourceCascade.length - 1; i++) {
            if (!sourceCascade[i + 1].canStackOnCascade(sourceCascade[i])) {
              return false;
            }
          }

          const toEmpty = targetCascade.length === 0;
          const maxMovable = this.calculateMaxMovable(toEmpty);
          if (runSize > maxMovable) return false;

          if (toEmpty) return true;
          return sourceCascade[from.cardIndex].canStackOnCascade(targetCascade[targetCascade.length - 1]);
        }

        return false;
      }
    }

    return false;
  }

  /**
   * Get the card at a location
   */
  getCardAt(location: Location): Card | null {
    switch (location.type) {
      case 'cascade': {
        const cascade = this.state.cascades[location.index];
        const idx = location.cardIndex ?? cascade.length - 1;
        return cascade[idx] ?? null;
      }
      case 'freecell':
        return this.state.freeCells[location.index];
      case 'foundation':
        return this.getFoundationTop(location.suit);
    }
  }

  /**
   * Execute a move (assumes it's legal — call isLegalMove first)
   * Returns the move that was executed (for undo)
   */
  executeMove(from: Location, to: Location): Move {
    const cards: Card[] = [];

    // Remove cards from source
    switch (from.type) {
      case 'cascade': {
        const cascade = this.state.cascades[from.index];
        const startIdx = from.cardIndex ?? cascade.length - 1;
        cards.push(...cascade.splice(startIdx));
        break;
      }
      case 'freecell': {
        const card = this.state.freeCells[from.index]!;
        cards.push(card);
        this.state.freeCells[from.index] = null;
        break;
      }
      case 'foundation': {
        const pile = this.state.foundations.get(from.suit)!;
        cards.push(pile.pop()!);
        break;
      }
    }

    // Place cards at destination
    switch (to.type) {
      case 'cascade':
        this.state.cascades[to.index].push(...cards);
        break;
      case 'freecell':
        this.state.freeCells[to.index] = cards[0];
        break;
      case 'foundation':
        this.state.foundations.get(to.suit)!.push(cards[0]);
        break;
    }

    this.state.moveCount++;
    this.checkWin();

    return { from, to, cards };
  }

  /**
   * Undo a move (reverses executeMove)
   */
  undoMove(move: Move): void {
    // Remove from destination
    switch (move.to.type) {
      case 'cascade': {
        const cascade = this.state.cascades[move.to.index];
        cascade.splice(cascade.length - move.cards.length);
        break;
      }
      case 'freecell':
        this.state.freeCells[move.to.index] = null;
        break;
      case 'foundation':
        this.state.foundations.get(move.to.suit)!.pop();
        break;
    }

    // Restore to source
    switch (move.from.type) {
      case 'cascade':
        this.state.cascades[move.from.index].push(...move.cards);
        break;
      case 'freecell':
        this.state.freeCells[move.from.index] = move.cards[0];
        break;
      case 'foundation':
        this.state.foundations.get(move.from.suit)!.push(move.cards[0]);
        break;
    }

    this.state.moveCount--;
    this.state.isWon = false;
  }

  /**
   * Perform all safe auto-moves to foundations
   * Returns array of moves made
   */
  autoMoveToFoundations(): Move[] {
    const moves: Move[] = [];
    let moved = true;

    while (moved) {
      moved = false;
      const foundationRanks = this.getFoundationRanks();

      // Check free cells
      for (let i = 0; i < 4; i++) {
        const card = this.state.freeCells[i];
        if (card && card.isSafeToAutoMove(foundationRanks) && card.canMoveToFoundation(this.getFoundationTop(card.suit))) {
          const move = this.executeMove(
            { type: 'freecell', index: i },
            { type: 'foundation', suit: card.suit }
          );
          move.isAutoMove = true;
          moves.push(move);
          moved = true;
          break; // Restart loop since state changed
        }
      }
      if (moved) continue;

      // Check cascade tops
      for (let i = 0; i < 8; i++) {
        const cascade = this.state.cascades[i];
        if (cascade.length === 0) continue;
        const card = cascade[cascade.length - 1];
        if (card.isSafeToAutoMove(foundationRanks) && card.canMoveToFoundation(this.getFoundationTop(card.suit))) {
          const move = this.executeMove(
            { type: 'cascade', index: i },
            { type: 'foundation', suit: card.suit }
          );
          move.isAutoMove = true;
          moves.push(move);
          moved = true;
          break;
        }
      }
    }

    return moves;
  }

  /**
   * Check if the game is won (all foundations complete with Kings)
   */
  private checkWin(): void {
    this.state.isWon = Array.from(this.state.foundations.values()).every(
      (pile) => pile.length === 13
    );
  }

  /**
   * Check if any legal moves remain (deadlock detection)
   */
  hasLegalMoves(): boolean {
    // Check moves from free cells
    for (let i = 0; i < 4; i++) {
      if (!this.state.freeCells[i]) continue;
      const from: Location = { type: 'freecell', index: i };

      // To any cascade
      for (let j = 0; j < 8; j++) {
        if (this.isLegalMove(from, { type: 'cascade', index: j })) return true;
      }
      // To foundation
      const card = this.state.freeCells[i]!;
      if (this.isLegalMove(from, { type: 'foundation', suit: card.suit })) return true;
    }

    // Check moves from cascades
    for (let i = 0; i < 8; i++) {
      const cascade = this.state.cascades[i];
      if (cascade.length === 0) continue;

      const topCard = cascade[cascade.length - 1];
      const from: Location = { type: 'cascade', index: i };

      // Top card to foundation
      if (this.isLegalMove(from, { type: 'foundation', suit: topCard.suit })) return true;

      // Top card to free cell
      for (let j = 0; j < 4; j++) {
        if (this.isLegalMove(from, { type: 'freecell', index: j })) return true;
      }

      // Top card or run to other cascades
      for (let j = 0; j < 8; j++) {
        if (i === j) continue;
        if (this.isLegalMove(from, { type: 'cascade', index: j })) return true;
      }
    }

    return false;
  }

  /**
   * Get all legal moves from the current position
   */
  getLegalMoves(): Move[] {
    const moves: Move[] = [];

    // From free cells
    for (let i = 0; i < 4; i++) {
      const card = this.state.freeCells[i];
      if (!card) continue;
      const from: Location = { type: 'freecell', index: i };

      // To cascades
      for (let j = 0; j < 8; j++) {
        const to: Location = { type: 'cascade', index: j };
        if (this.isLegalMove(from, to)) {
          moves.push({ from, to, cards: [card] });
        }
      }

      // To foundation
      const foundTo: Location = { type: 'foundation', suit: card.suit };
      if (this.isLegalMove(from, foundTo)) {
        moves.push({ from, to: foundTo, cards: [card] });
      }
    }

    // From cascades
    for (let i = 0; i < 8; i++) {
      const cascade = this.state.cascades[i];
      if (cascade.length === 0) continue;

      const topCard = cascade[cascade.length - 1];
      const from: Location = { type: 'cascade', index: i };

      // Top card to foundation
      const foundTo: Location = { type: 'foundation', suit: topCard.suit };
      if (this.isLegalMove(from, foundTo)) {
        moves.push({ from, to: foundTo, cards: [topCard] });
      }

      // Top card to free cell
      for (let j = 0; j < 4; j++) {
        const to: Location = { type: 'freecell', index: j };
        if (this.isLegalMove(from, to)) {
          moves.push({ from, to, cards: [topCard] });
        }
      }

      // Runs to other cascades
      const run = this.getValidRun(i);
      for (let runSize = 1; runSize <= run.length; runSize++) {
        const cardIndex = cascade.length - runSize;
        const seqFrom: Location = { type: 'cascade', index: i, cardIndex };

        for (let j = 0; j < 8; j++) {
          if (i === j) continue;
          const to: Location = { type: 'cascade', index: j };
          if (this.isLegalMove(seqFrom, to)) {
            moves.push({
              from: seqFrom,
              to,
              cards: cascade.slice(cardIndex),
            });
          }
        }
      }
    }

    return moves;
  }
}
