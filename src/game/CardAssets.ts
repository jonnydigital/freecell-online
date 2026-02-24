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

/**
 * Get the file path for a card image
 */
export function getCardAssetPath(suit: Suit, rank: Rank): string {
  return `/cards/${SUIT_FILE_NAMES[suit]}_${rank}.png`;
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
