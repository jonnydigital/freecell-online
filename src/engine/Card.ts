/**
 * Card model for FreeCell
 * Suits, ranks, colors, and stacking rules
 */

export enum Suit {
  Spades = 'S',
  Hearts = 'H',
  Diamonds = 'D',
  Clubs = 'C',
}

export enum Color {
  Red = 'red',
  Black = 'black',
}

// Rank values: Ace=1, 2-10, Jack=11, Queen=12, King=13
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export const RANK_NAMES: Record<Rank, string> = {
  1: 'A',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
};

export const SUIT_SYMBOLS: Record<Suit, string> = {
  [Suit.Spades]: '♠',
  [Suit.Hearts]: '♥',
  [Suit.Diamonds]: '♦',
  [Suit.Clubs]: '♣',
};

export class Card {
  readonly suit: Suit;
  readonly rank: Rank;

  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }

  get color(): Color {
    return this.suit === Suit.Hearts || this.suit === Suit.Diamonds
      ? Color.Red
      : Color.Black;
  }

  get id(): string {
    return `${RANK_NAMES[this.rank]}${this.suit}`;
  }

  get displayName(): string {
    return `${RANK_NAMES[this.rank]}${SUIT_SYMBOLS[this.suit]}`;
  }

  /**
   * Can this card be placed on top of `target` in a cascade (tableau)?
   * Rule: must be opposite color and one rank lower than target
   */
  canStackOnCascade(target: Card): boolean {
    return this.color !== target.color && this.rank === target.rank - 1;
  }

  /**
   * Can this card be moved to a foundation pile?
   * Rule: same suit, one rank higher than current top
   * If foundation is empty, only Ace can go there
   */
  canMoveToFoundation(foundationTop: Card | null): boolean {
    if (foundationTop === null) {
      return this.rank === 1; // Only Ace on empty foundation
    }
    return this.suit === foundationTop.suit && this.rank === foundationTop.rank + 1;
  }

  /**
   * Is it safe to auto-move this card to the foundation?
   * A card is safe to auto-move if both cards of the opposite color
   * with rank-1 are already on their foundations.
   * This prevents auto-moving a card that could still be needed
   * as a cascade target.
   */
  isSafeToAutoMove(foundations: Map<Suit, Rank | 0>): boolean {
    if (this.rank <= 2) return true; // Aces and 2s are always safe

    const neededRank = (this.rank - 1) as Rank;
    const oppositeSuits =
      this.color === Color.Red
        ? [Suit.Spades, Suit.Clubs]
        : [Suit.Hearts, Suit.Diamonds];

    return oppositeSuits.every((suit) => {
      const foundationRank = foundations.get(suit) ?? 0;
      return foundationRank >= neededRank;
    });
  }

  equals(other: Card): boolean {
    return this.suit === other.suit && this.rank === other.rank;
  }

  toString(): string {
    return this.displayName;
  }
}
