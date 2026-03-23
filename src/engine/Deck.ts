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
import { SpiderDifficulty } from './SpiderEngine';
import { KlondikeDrawMode } from './KlondikeEngine';


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
/**
 * Create a standard 52-card deck in MS FreeCell order, optionally repeated for multi-deck games.
 * Cards are ordered: AC, AD, AH, AS, 2C, 2D, 2H, 2S, ..., KC, KD, KH, KS
 */
function createOrderedDeck(numDecks: number = 1): Card[] {
  const deck: Card[] = [];
  for (let d = 0; d < numDecks; d++) {
    for (let rank = 1; rank <= 13; rank++) {
      for (const suit of SUITS_MS_ORDER) {
        // deckId is d, all cards face up by default
        deck.push(new Card(suit, rank as Rank, d, true));
      }
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

/**
 * Create a Spider Solitaire deck (104 cards) based on difficulty
 */
function createSpiderDeck(difficulty: SpiderDifficulty): Card[] {
  const deck: Card[] = [];

  // Spider uses 104 cards (8 sequences of 13)
  for (let i = 0; i < 8; i++) {
    for (let rank = 1; rank <= 13; rank++) {
      let suit: Suit;
      if (difficulty === '1-suit') {
        suit = Suit.Spades;
      } else if (difficulty === '2-suit') {
        suit = i % 2 === 0 ? Suit.Spades : Suit.Hearts;
      } else {
        suit = SUITS_MS_ORDER[i % 4];
      }
      deck.push(new Card(suit, rank as Rank, Math.floor(i / 4), false)); // Initially face down
    }
  }
  return deck;
}

/**
 * Deal a Spider Solitaire game
 */
/**
 * Deal an Eight Off game using the MS-compatible PRNG
 *
 * 48 cards are dealt to 8 cascades (6 cards each).
 * The remaining 4 cards go face-up to the first 4 free cells.
 */
export function dealEightOff(gameNumber: number): { cascades: Card[][]; freeCellCards: Card[] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  const dealt: Card[] = [];
  let remaining = deck.length;

  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Deal 48 cards into 8 cascades (6 each)
  const cascades: Card[][] = Array.from({ length: 8 }, () => []);
  for (let i = 0; i < 48; i++) {
    cascades[i % 8].push(dealt[i]);
  }

  // Remaining 4 cards go to free cells
  const freeCellCards = dealt.slice(48);

  return { cascades, freeCellCards };
}

/**
 * Deal a Klondike Solitaire game
 * 7 tableau columns: col 1 gets 1 card, col 2 gets 2, ... col 7 gets 7
 * Only top card of each column is face-up, rest face-down
 * Remaining 24 cards go to stock (face-down)
 */
export function dealKlondikeGame(gameNumber: number): { cascades: Card[][]; stock: Card[] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Deal 28 cards to 7 cascades
  const cascades: Card[][] = Array.from({ length: 7 }, () => []);
  let cardIndex = 0;

  for (let col = 0; col < 7; col++) {
    const numCards = col + 1;
    for (let c = 0; c < numCards; c++) {
      const card = dealt[cardIndex++];
      // Only the top card (last dealt to this column) is face-up
      card.isFaceUp = (c === numCards - 1);
      cascades[col].push(card);
    }
  }

  // Remaining 24 cards go to stock (face-down)
  const stock: Card[] = [];
  for (let i = cardIndex; i < 52; i++) {
    dealt[i].isFaceUp = false;
    stock.push(dealt[i]);
  }

  return { cascades, stock };
}

/**
 * Deal a Pyramid Solitaire game
 * 28 cards dealt in a 7-row pyramid (row 0 has 1 card, row 6 has 7 cards)
 * All pyramid cards are face-up
 * Remaining 24 cards go to stock (face-down)
 */
export function dealPyramidGame(gameNumber: number): { pyramid: Card[][]; stock: Card[] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Deal 28 cards to 7-row pyramid
  const pyramid: Card[][] = [];
  let cardIndex = 0;

  for (let row = 0; row < 7; row++) {
    const rowCards: Card[] = [];
    for (let col = 0; col <= row; col++) {
      const card = dealt[cardIndex++];
      card.isFaceUp = true;
      rowCards.push(card);
    }
    pyramid.push(rowCards);
  }

  // Remaining 24 cards go to stock (face-down)
  const stock: Card[] = [];
  for (let i = cardIndex; i < 52; i++) {
    dealt[i].isFaceUp = false;
    stock.push(dealt[i]);
  }

  return { pyramid, stock };
}

/**
 * Deal a TriPeaks Solitaire game
 * 28 cards dealt in 4 rows forming 3 overlapping peaks:
 *   Row 0: 3 peak tops (cols 0, 3, 6)
 *   Row 1: 6 cards (cols 0, 1, 3, 4, 6, 7)
 *   Row 2: 9 cards (cols 0-8)
 *   Row 3: 10 base cards (cols 0-9), all face-up
 * Rows 0-2 are initially face-down (flipped when uncovered)
 * Remaining 24 cards: 23 to stock (face-down), 1 drawn to start waste (face-up)
 */
export function dealTriPeaksGame(gameNumber: number): { tableau: (Card | null)[][]; stock: Card[]; waste: Card[] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Row layout: which columns exist in each row
  const ROW_COLS = [
    [0, 3, 6],                         // row 0: 3 peak tops
    [0, 1, 3, 4, 6, 7],                // row 1: 6 cards
    [0, 1, 2, 3, 4, 5, 6, 7, 8],       // row 2: 9 cards
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],    // row 3: 10 base cards
  ];

  // Max column count per row for array sizing
  const ROW_MAX_COL = [7, 8, 9, 10];

  const tableau: (Card | null)[][] = ROW_MAX_COL.map(maxCol =>
    Array.from({ length: maxCol }, () => null)
  );

  let cardIndex = 0;

  // Deal tableau cards row by row
  for (let row = 0; row < 4; row++) {
    for (const col of ROW_COLS[row]) {
      const card = dealt[cardIndex++];
      // Row 3 (base) is face-up; rows 0-2 start face-down
      // But cards in rows 0-2 that are immediately available should be face-up
      // In TriPeaks, only base row starts face-up
      card.isFaceUp = (row === 3);
      tableau[row][col] = card;
    }
  }

  // Remaining 24 cards: last one goes to waste (face-up), rest to stock (face-down)
  const stock: Card[] = [];
  for (let i = cardIndex; i < 51; i++) {
    dealt[i].isFaceUp = false;
    stock.push(dealt[i]);
  }

  // First waste card
  const wasteCard = dealt[51];
  wasteCard.isFaceUp = true;
  const waste: Card[] = [wasteCard];

  return { tableau, stock, waste };
}

/**
 * Deal a Golf Solitaire game
 * 7 tableau columns of 5 cards each (35 cards), all face-up.
 * Remaining 17 cards: 16 to stock (face-down), 1 drawn to start waste (face-up).
 */
export function dealGolfGame(gameNumber: number): { tableau: Card[][]; stock: Card[]; waste: Card[] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Deal 35 cards to 7 columns of 5
  const tableau: Card[][] = Array.from({ length: 7 }, () => []);
  let cardIndex = 0;

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 7; col++) {
      const card = dealt[cardIndex++];
      card.isFaceUp = true; // All tableau cards are face-up in Golf
      tableau[col].push(card);
    }
  }

  // Remaining 17 cards: last one goes to waste (face-up), rest to stock (face-down)
  const stock: Card[] = [];
  for (let i = cardIndex; i < 51; i++) {
    dealt[i].isFaceUp = false;
    stock.push(dealt[i]);
  }

  // First waste card
  const wasteCard = dealt[51];
  wasteCard.isFaceUp = true;
  const waste: Card[] = [wasteCard];

  return { tableau, stock, waste };
}

/**
 * Deal a Yukon Solitaire game
 * 7 tableau columns. Column 1: 1 card (face up).
 * Columns 2-7: (col) face-down cards + 5 face-up cards on top,
 * except col 2 which has 1 face-down + 5 face-up = 6 cards.
 * Total: 1+6+7+8+9+10+11 = 52 (all cards dealt, no stock).
 */
export function dealYukonGame(gameNumber: number): { cascades: Card[][] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Deal into 7 cascades
  // Col 0: 1 face-up
  // Col 1: 1 face-down + 5 face-up = 6
  // Col 2: 2 face-down + 5 face-up = 7
  // Col 3: 3 face-down + 5 face-up = 8
  // Col 4: 4 face-down + 5 face-up = 9
  // Col 5: 5 face-down + 5 face-up = 10
  // Col 6: 6 face-down + 5 face-up = 11
  const cascades: Card[][] = Array.from({ length: 7 }, () => []);
  let cardIndex = 0;

  for (let col = 0; col < 7; col++) {
    const faceDownCount = col === 0 ? 0 : col;
    const faceUpCount = col === 0 ? 1 : 5;
    const totalCards = faceDownCount + faceUpCount;

    for (let c = 0; c < totalCards; c++) {
      const card = dealt[cardIndex++];
      card.isFaceUp = c >= faceDownCount;
      cascades[col].push(card);
    }
  }

  return { cascades };
}

/**
 * Deal a Canfield Solitaire game
 * 13 cards to reserve (top face-up, rest face-down).
 * 1 card face-up to start the first foundation (determines base rank).
 * 4 tableau columns with 1 card each (face-up).
 * Rest goes to stock (face-down).
 */
export function dealCanfieldGame(gameNumber: number): {
  reserve: Card[];
  foundations: Card[][];
  tableau: Card[][];
  stock: Card[];
  foundationBaseRank: Rank;
} {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  let cardIndex = 0;

  // 13 cards to reserve (face-down, top face-up)
  const reserve: Card[] = [];
  for (let i = 0; i < 13; i++) {
    const card = dealt[cardIndex++];
    card.isFaceUp = (i === 12); // only top card face-up
    reserve.push(card);
  }

  // 1 card to first foundation (face-up)
  const foundationCard = dealt[cardIndex++];
  foundationCard.isFaceUp = true;
  const foundationBaseRank = foundationCard.rank;
  const foundations: Card[][] = [[foundationCard], [], [], []];

  // 4 tableau columns, 1 card each (face-up)
  const tableau: Card[][] = [];
  for (let col = 0; col < 4; col++) {
    const card = dealt[cardIndex++];
    card.isFaceUp = true;
    tableau.push([card]);
  }

  // Rest to stock (face-down)
  const stock: Card[] = [];
  for (let i = cardIndex; i < 52; i++) {
    dealt[i].isFaceUp = false;
    stock.push(dealt[i]);
  }

  return { reserve, foundations, tableau, stock, foundationBaseRank };
}

export function dealSpiderGame(gameNumber: number, difficulty: SpiderDifficulty) {
  const deck = createSpiderDeck(difficulty);
  const rng = new MSLCG(gameNumber);

  // Shuffle using same algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 104; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Deal 54 cards to 10 cascades
  // First 4 cascades get 6 cards, next 6 get 5
  const cascades: Card[][] = Array.from({ length: 10 }, () => []);
  let cardIndex = 0;

  for (let col = 0; col < 10; col++) {
    const numCards = col < 4 ? 6 : 5;
    for (let c = 0; c < numCards; c++) {
      const card = dealt[cardIndex++];
      // Only the top card is face up
      if (c === numCards - 1) {
        card.isFaceUp = true;
      }
      cascades[col].push(card);
    }
  }

  // Remaining 50 cards go to stock
  const stock = dealt.slice(cardIndex);

  return { cascades, stock };
}

/**
 * Deal a Forty Thieves Solitaire game
 * 2 decks (104 cards). 40 cards dealt face-up to 10 tableau columns (4 each).
 * Remaining 64 cards go to stock (face-down).
 */
/**
 * Deal a Scorpion Solitaire game
 * 7 tableau columns of 7 cards each (49 cards).
 * Cols 0-3: top 3 face-down, bottom 4 face-up
 * Cols 4-6: all 7 face-up
 * Remaining 3 cards form the reserve (face-down)
 */
export function dealScorpionGame(gameNumber: number): { tableau: Card[][]; reserve: Card[] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Deal 49 cards to 7 columns of 7
  const tableau: Card[][] = Array.from({ length: 7 }, () => []);
  let cardIndex = 0;

  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
      const card = dealt[cardIndex++];
      if (col < 4) {
        // Cols 0-3: first 3 rows face-down, rows 3-6 face-up
        card.isFaceUp = row >= 3;
      } else {
        // Cols 4-6: all face-up
        card.isFaceUp = true;
      }
      tableau[col].push(card);
    }
  }

  // Remaining 3 cards form the reserve (face-down)
  const reserve: Card[] = [];
  for (let i = cardIndex; i < 52; i++) {
    dealt[i].isFaceUp = false;
    reserve.push(dealt[i]);
  }

  return { tableau, reserve };
}

/**
 * Deal a Seahaven Towers game
 * 10 tableau columns of 5 cards each (50 cards), all face-up.
 * Remaining 2 cards go to the first 2 free cells (face-up).
 */
export function dealSeahavenGame(gameNumber: number): { tableau: Card[][]; freeCellCards: Card[] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Deal 50 cards to 10 columns of 5
  const tableau: Card[][] = Array.from({ length: 10 }, () => []);
  let cardIndex = 0;

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 10; col++) {
      const card = dealt[cardIndex++];
      card.isFaceUp = true;
      tableau[col].push(card);
    }
  }

  // Remaining 2 cards go to free cells (face-up)
  const freeCellCards: Card[] = [];
  for (let i = cardIndex; i < 52; i++) {
    dealt[i].isFaceUp = true;
    freeCellCards.push(dealt[i]);
  }

  return { tableau, freeCellCards };
}

/**
 * Deal a Beleaguered Castle game
 * Remove all 4 aces and pre-place them on foundations.
 * Remaining 48 cards dealt face-up into 8 columns of 6 cards each.
 */
export function dealBeleagueredCastleGame(gameNumber: number): { tableau: Card[][]; aces: Card[] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Separate aces from the rest
  const aces: Card[] = [];
  const nonAces: Card[] = [];
  for (const card of dealt) {
    card.isFaceUp = true;
    if (card.rank === 1) {
      aces.push(card);
    } else {
      nonAces.push(card);
    }
  }

  // Deal 48 non-ace cards into 8 columns of 6
  const tableau: Card[][] = Array.from({ length: 8 }, () => []);
  for (let i = 0; i < 48; i++) {
    tableau[i % 8].push(nonAces[i]);
  }

  return { tableau, aces };
}

/**
 * Deal a Penguin Solitaire game
 * Pick the first shuffled card's rank as the "beak" rank.
 * Remove all 4 cards of that rank → foundation cards.
 * Remaining 48 cards: 47 dealt to 7 tableau columns (first 5 get 7, last 2 get 6),
 * 1 card to the flipper cell. All face-up.
 */
export function dealPenguinGame(gameNumber: number): {
  tableau: Card[][];
  flipper: Card | null;
  beakRank: Rank;
  foundationCards: Card[];
} {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // First card determines beak rank
  const beakRank = dealt[0].rank;

  // Separate beak-rank cards from the rest
  const foundationCards: Card[] = [];
  const nonBeakCards: Card[] = [];
  for (const card of dealt) {
    card.isFaceUp = true;
    if (card.rank === beakRank) {
      foundationCards.push(card);
    } else {
      nonBeakCards.push(card);
    }
  }

  // Deal 47 cards to 7 columns (first 5 get 7 cards, last 2 get 6)
  const tableau: Card[][] = Array.from({ length: 7 }, () => []);
  let cardIndex = 0;

  for (let row = 0; row < 7; row++) {
    const colsThisRow = row < 6 ? 7 : 5; // row 6 (7th row) only fills first 5 cols
    for (let col = 0; col < colsThisRow; col++) {
      if (cardIndex < nonBeakCards.length) {
        tableau[col].push(nonBeakCards[cardIndex++]);
      }
    }
  }

  // Last card goes to flipper
  const flipper = cardIndex < nonBeakCards.length ? nonBeakCards[cardIndex] : null;

  return { tableau, flipper, beakRank, foundationCards };
}

/**
 * Deal a Cruel Solitaire game
 * Remove all 4 aces and pre-place them on foundations.
 * Remaining 48 cards dealt face-up into 12 piles of 4 cards each.
 */
export function dealCruelGame(gameNumber: number): { tableau: Card[][]; aces: Card[] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Separate aces from the rest
  const aces: Card[] = [];
  const nonAces: Card[] = [];
  for (const card of dealt) {
    card.isFaceUp = true;
    if (card.rank === 1) {
      aces.push(card);
    } else {
      nonAces.push(card);
    }
  }

  // Deal 48 non-ace cards into 12 piles of 4
  const tableau: Card[][] = Array.from({ length: 12 }, () => []);
  for (let i = 0; i < 48; i++) {
    tableau[i % 12].push(nonAces[i]);
  }

  return { tableau, aces };
}

/**
 * Deal a Clock Patience (Clock Solitaire) game
 * 52 cards dealt face-down into 13 piles of 4 cards each.
 * Piles 0-11 = clock positions (A=0, 2=1, 3=2... Q=11), pile 12 = center (Kings).
 */
export function dealClockGame(gameNumber: number): { piles: Card[][] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Deal 52 cards face-down into 13 piles of 4
  const piles: Card[][] = Array.from({ length: 13 }, () => []);
  for (let i = 0; i < 52; i++) {
    const card = dealt[i];
    card.isFaceUp = false;
    piles[i % 13].push(card);
  }

  return { piles };
}

/**
 * Deal an Accordion Solitaire game
 * All 52 cards dealt face-up in a single row (left to right).
 */
export function dealAccordionGame(gameNumber: number): { cards: Card[] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // All cards face-up
  for (const card of dealt) {
    card.isFaceUp = true;
  }

  return { cards: dealt };
}

export function dealFortyThievesGame(gameNumber: number): { tableau: Card[][]; stock: Card[] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck(2); // 2 decks = 104 cards
  const rng = new MSLCG(gameNumber);

  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 104; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // Deal 40 cards to 10 tableau columns (4 each, all face-up)
  const tableau: Card[][] = Array.from({ length: 10 }, () => []);
  let cardIndex = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 10; col++) {
      const card = dealt[cardIndex++];
      card.isFaceUp = true;
      tableau[col].push(card);
    }
  }

  // Remaining 64 cards go to stock (face-down)
  const stock: Card[] = [];
  for (let i = cardIndex; i < 104; i++) {
    dealt[i].isFaceUp = false;
    stock.push(dealt[i]);
  }

  return { tableau, stock };
}

/**
 * Deal a La Belle Lucie (The Fan) game
 * 52 cards dealt face-up into 17 fans of 3 cards + 1 fan of 1 card = 18 piles.
 */
export function dealLaBelleLucieGame(gameNumber: number): { tableau: Card[][] } {
  if (gameNumber < 1 || gameNumber > 9999999 || !Number.isInteger(gameNumber)) {
    throw new Error(`Invalid game number: ${gameNumber}. Must be integer 1-9999999.`);
  }

  const deck = createOrderedDeck();
  const rng = new MSLCG(gameNumber);

  // Shuffle using same MS algorithm
  const dealt: Card[] = [];
  let remaining = deck.length;
  for (let i = 0; i < 52; i++) {
    const j = rng.next() % remaining;
    [deck[j], deck[remaining - 1]] = [deck[remaining - 1], deck[j]];
    dealt.push(deck[remaining - 1]);
    remaining--;
  }

  // All cards face-up
  for (const card of dealt) {
    card.isFaceUp = true;
  }

  // Deal into 18 piles: 17 piles of 3 + 1 pile of 1
  const tableau: Card[][] = Array.from({ length: 18 }, () => []);
  for (let i = 0; i < 52; i++) {
    tableau[Math.floor(i / 3)].push(dealt[i]);
  }

  return { tableau };
}
