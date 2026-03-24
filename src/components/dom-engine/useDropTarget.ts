/**
 * Drop target resolution for DOM FreeCell.
 *
 * Cards / pile containers must have these data attributes:
 *   data-pile-type="cascade|freecell|foundation"
 *   data-pile-index="0-7"          (cascades & free cells)
 *   data-pile-suit="S|H|D|C"      (foundations)
 *
 * resolveDropTarget() performs a hit-test at (x, y) and walks the DOM
 * upward until it finds one of those markers, then converts it to a
 * game Location.
 */

import { Location } from '@/engine/FreeCellEngine';
import { Suit } from '@/engine/Card';

const VALID_SUITS = new Set<string>([Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs]);

/**
 * Walk up from `el` until we find an element with `data-pile-type`, or we
 * reach the body / null.
 */
function findPileElement(el: Element | null): Element | null {
  let current = el;
  while (current && current !== document.body) {
    if (current instanceof HTMLElement && current.dataset.pileType) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

/**
 * Hit-test the DOM at (clientX, clientY) and resolve to a game Location.
 *
 * IMPORTANT: call this while dragged cards have `pointer-events: none` so
 * elementFromPoint sees through them to the board underneath.
 */
export function resolveDropTarget(clientX: number, clientY: number): Location | null {
  const hit = document.elementFromPoint(clientX, clientY);
  if (!hit) return null;

  const pile = findPileElement(hit);
  if (!pile || !(pile instanceof HTMLElement)) return null;

  const pileType = pile.dataset.pileType;

  switch (pileType) {
    case 'cascade': {
      const idx = parseInt(pile.dataset.pileIndex ?? '', 10);
      if (Number.isNaN(idx)) return null;
      return { type: 'cascade', index: idx };
    }

    case 'freecell': {
      const idx = parseInt(pile.dataset.pileIndex ?? '', 10);
      if (Number.isNaN(idx)) return null;
      return { type: 'freecell', index: idx };
    }

    case 'foundation': {
      const suit = pile.dataset.pileSuit as string | undefined;
      if (!suit || !VALID_SUITS.has(suit)) return null;
      return { type: 'foundation', suit: suit as Suit };
    }

    default:
      return null;
  }
}
