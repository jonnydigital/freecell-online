/**
 * Card asset mapping
 * Maps our Card model to SVG-cards PNG filenames
 */
import { Suit, Rank, RANK_NAMES } from '../engine/Card';

const SUIT_FILE_NAMES: Record<Suit, string> = {
  [Suit.Clubs]: 'club',
  [Suit.Diamonds]: 'diamond',
  [Suit.Hearts]: 'heart',
  [Suit.Spades]: 'spade',
};

/**
 * Get the asset key for a card (used as Phaser texture key)
 */
export function getCardAssetKey(suit: Suit, rank: Rank): string {
  return `${SUIT_FILE_NAMES[suit]}_${rank}`;
}

const RANK_FILE_NAMES: Record<number, string> = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'jack',
  12: 'queen',
  13: 'king',
};

/**
 * Get the file path for a card image
 */
export function getCardAssetPath(suit: Suit, rank: Rank): string {
  return `/cards/${SUIT_FILE_NAMES[suit]}_${RANK_FILE_NAMES[rank]}.png`;
}

/**
 * Get all card asset entries for preloading
 */
export function getAllCardAssets(): Array<{ key: string; path: string }> {
  const assets: Array<{ key: string; path: string }> = [];
  
  const suits = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
  for (const suit of suits) {
    for (let rank = 1; rank <= 13; rank++) {
      assets.push({
        key: getCardAssetKey(suit, rank as Rank),
        path: getCardAssetPath(suit, rank as Rank),
      });
    }
  }
  
  // Card back
  assets.push({ key: 'card_back', path: '/cards/back.png' });
  
  return assets;
}
