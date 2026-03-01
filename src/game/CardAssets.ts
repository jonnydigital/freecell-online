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
  1: 'Ace',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'Jack',
  12: 'Queen',
  13: 'King',
};

/**
 * Get the file path for a card image
 */
export function getCardAssetPath(suit: Suit, rank: Rank): string {
  return `/cards/${SUIT_FILE_NAMES[suit]}${RANK_FILE_NAMES[rank]}.png`;
}

export function getAllCardAssets(): Array<{ key: string; path: string }> {
  const assets: Array<{ key: string; path: string }> = [];

  // Procedural assets
  assets.push({ key: 'card_base', path: '/cards/procedural/base.png' });
  assets.push({ key: 'suit_heart', path: '/cards/procedural/heart.png' });
  assets.push({ key: 'suit_spade', path: '/cards/procedural/spade.png' });
  assets.push({ key: 'suit_diamond', path: '/cards/procedural/diamond.png' });
  assets.push({ key: 'suit_club', path: '/cards/procedural/club.png' });

  // Card back
  assets.push({ key: 'card_back', path: '/cards/back.png' });

  return assets;
}
