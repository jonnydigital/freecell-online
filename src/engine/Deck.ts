/**
 * Deck generation with MS FreeCell-compatible PRNG
 * 
 * Uses the Microsoft Linear Congruential Generator (MSLCG) for deals #1-32000
 * to match classic MS FreeCell deals. Extended range uses the same algorithm
 * with 64-bit seeds for deals > 32000.
 * 
 * Reference: https://rosettacode.org/wiki/Deal_cards_for_FreeCell
 */

import { Card, Suit, Rank } from './Card';

const SUITS_MS_ORDER: Suit[] = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];

/**
 * Microsoft Linear Congruential Generator
 * state = (state * 214013 + 2531011) & 0x7FFFFFFF
 * Returns bits 16-30 of the state (>> 16)
 */
class MSLCG {
  private state: number;

  constructor(seed: number) {
    this.state = seed;
  }

  next(): number {
    this.state = ((this.state * 214013 + 2531011) & 0x7fffffff);
    return (this.state >> 16) & 0x7fff;
  }
}

/**
 * Create a standard 52-card deck in MS FreeCell order
 * Cards are ordered: AC, AD, AH, AS, 2C, 2D, 2H, 2S, ..., KC, KD, KH, KS
 */
function createOrderedDeck(): Card[] {
  const deck: Card[] = [];
  for (let rank = 1; rank <= 13; rank++) {
    for (const suit of SUITS_MS_ORDER) {
      deck.push(new Card(suit, rank as Rank));
    }
  }
  return deck;
}

/**
 * Deal a FreeCell game using the MS FreeCell algorithm
 * 
 * The algorithm:
 * 1. Create ordered deck (AC, AD, AH, AS, 2C, 2D, ... KS)
 * 2. For each card to deal (52 times):
 *    a. Pick random index from remaining cards
 *    b. Swap that card with the last card in the remaining array
 *    c. Deal the card that's now at the end (remove it)
 * 3. Deal cards across 8 columns left-to-right
 * 
 * @param gameNumber - Game number (1 to 9,999,999)
 * @returns Array of 8 cascades (columns), first 4 have 7 cards, last 4 have 6
 */
export function dealGame(gameNumber: number): Card[][] {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // MS FreeCell dealing algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;

  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    // Swap chosen card with last remaining card
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    // Deal the card at the end
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Deal into 8 cascades, one card at a time, left to right
  const cascades: Card[][] = Array.from({ length: 8 }, () => []);
  for (let i = 0; i < 52; i++) {
    cascades[i % 8].push(dealt[i]);
  }

  return cascades;
}

/**
 * Verify a deal has all 52 unique cards
 */
export function verifyDeal(cascades: Card[][]): boolean {
  const seen = new Set<string>();
  for (const cascade of cascades) {
    for (const card of cascade) {
      if (seen.has(card.id)) return false;
      seen.add(card.id);
    }
  }
  return seen.size === 52;
}
