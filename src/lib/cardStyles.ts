/**
 * Card style definitions — currently supports procedural rendering only.
 * Future: image-based card styles with custom assets.
 */

export interface CardStyleDefinition {
  id: string;
  name: string;
  renderer: 'procedural' | 'image';
}

export const DEFAULT_CARD_STYLE_ID = 'default';
export const CARD_STYLE_STORAGE_KEY = 'freecell-card-style';

const cardStyles: CardStyleDefinition[] = [
  { id: 'default', name: 'Classic', renderer: 'procedural' },
];

export function getCardStyleById(id: string): CardStyleDefinition {
  return cardStyles.find((s) => s.id === id) || cardStyles[0];
}

export function getAllCardStyles(): CardStyleDefinition[] {
  return cardStyles;
}
