/**
 * Card Texture Generator
 *
 * Generates all 52 card face textures + card back at runtime using Canvas 2D.
 * Produces crisp, scalable card graphics without external image dependencies.
 */
import { Suit, Rank, RANK_NAMES, SUIT_SYMBOLS } from '../engine/Card';
import { getCardAssetKey } from './CardAssets';

const SUITS = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades] as const;

const RED = '#c0392b';
const BLACK = '#1a1a1a';

function suitColor(suit: Suit): string {
  return suit === Suit.Hearts || suit === Suit.Diamonds ? RED : BLACK;
}

/**
 * Draw a rounded rectangle path on a canvas context.
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/**
 * Render a single card face onto a canvas.
 */
function renderCardFace(
  ctx: CanvasRenderingContext2D,
  suit: Suit,
  rank: Rank,
  w: number,
  h: number
): void {
  const radius = Math.round(w * 0.08);
  const color = suitColor(suit);
  const rankStr = RANK_NAMES[rank];
  const suitStr = SUIT_SYMBOLS[suit];

  // White background with rounded corners
  roundRect(ctx, 0, 0, w, h, radius);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Subtle border
  roundRect(ctx, 0, 0, w, h, radius);
  ctx.strokeStyle = '#c8c8c8';
  ctx.lineWidth = 1;
  ctx.stroke();

  // --- Corner indices (top-left) ---
  const cornerFontSize = Math.round(w * 0.22);
  const suitFontSize = Math.round(w * 0.18);
  const cornerX = Math.round(w * 0.1);
  const cornerY = Math.round(h * 0.06);

  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  // Rank
  ctx.font = `bold ${cornerFontSize}px "Segoe UI", Arial, sans-serif`;
  ctx.fillText(rankStr, cornerX, cornerY);

  // Suit symbol below rank
  ctx.font = `${suitFontSize}px serif`;
  ctx.fillText(suitStr, cornerX, cornerY + cornerFontSize * 0.9);

  // --- Bottom-right corner (rotated 180°) ---
  ctx.save();
  ctx.translate(w, h);
  ctx.rotate(Math.PI);
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  ctx.font = `bold ${cornerFontSize}px "Segoe UI", Arial, sans-serif`;
  ctx.fillText(rankStr, cornerX, cornerY);

  ctx.font = `${suitFontSize}px serif`;
  ctx.fillText(suitStr, cornerX, cornerY + cornerFontSize * 0.9);
  ctx.restore();

  // --- Center content ---
  const centerX = w / 2;
  const centerY = h / 2;

  // Face cards (J, Q, K): colored center band with letter
  if (rank >= 11) {
    const bandHeight = Math.round(h * 0.3);
    const bandY = centerY - bandHeight / 2;
    const bandColor = suit === Suit.Hearts || suit === Suit.Diamonds
      ? '#e74c3c'
      : '#2c3e50';

    // Band background
    ctx.fillStyle = bandColor;
    ctx.fillRect(Math.round(w * 0.12), bandY, Math.round(w * 0.76), bandHeight);

    // Face letter
    const faceFontSize = Math.round(w * 0.38);
    ctx.font = `bold ${faceFontSize}px "Segoe UI", Arial, sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(rankStr, centerX, centerY);

    // Small suit symbols flanking the letter
    const flankSize = Math.round(w * 0.14);
    ctx.font = `${flankSize}px serif`;
    ctx.fillText(suitStr, Math.round(w * 0.22), centerY);
    ctx.fillText(suitStr, Math.round(w * 0.78), centerY);
  } else {
    // Number cards and Ace: large suit symbol in center
    const largeSuitSize = Math.round(w * 0.45);
    ctx.font = `${largeSuitSize}px serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(suitStr, centerX, centerY);
  }
}

/**
 * Render the card back design.
 */
function renderCardBack(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): void {
  const radius = Math.round(w * 0.08);

  // Dark green background
  roundRect(ctx, 0, 0, w, h, radius);
  ctx.fillStyle = '#1a472a';
  ctx.fill();

  // Border
  roundRect(ctx, 0, 0, w, h, radius);
  ctx.strokeStyle = '#0d2818';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner border
  const inset = Math.round(w * 0.06);
  roundRect(ctx, inset, inset, w - 2 * inset, h - 2 * inset, radius * 0.6);
  ctx.strokeStyle = '#2d6a4f';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Diamond crosshatch pattern
  ctx.save();
  // Clip to inner area
  roundRect(ctx, inset + 1, inset + 1, w - 2 * inset - 2, h - 2 * inset - 2, radius * 0.6);
  ctx.clip();

  const spacing = Math.round(w * 0.12);
  ctx.strokeStyle = '#2d6a4f';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.5;

  // Diagonal lines (top-left to bottom-right)
  for (let i = -h; i < w + h; i += spacing) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
    ctx.stroke();
  }

  // Diagonal lines (top-right to bottom-left)
  for (let i = -h; i < w + h; i += spacing) {
    ctx.beginPath();
    ctx.moveTo(w - i, 0);
    ctx.lineTo(w - i - h, h);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

/**
 * Generate all card textures and add them to the Phaser texture manager.
 * Call this from the scene's create() method.
 *
 * @param scene The Phaser scene to add textures to
 * @param cardWidth Width of card textures in pixels
 * @param cardHeight Height of card textures in pixels
 */
export function generateCardTextures(
  scene: Phaser.Scene,
  cardWidth: number,
  cardHeight: number
): void {
  // Use higher resolution for crisp rendering on retina displays
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.round(cardWidth * scale);
  const h = Math.round(cardHeight * scale);

  for (const suit of SUITS) {
    for (let rank = 1; rank <= 13; rank++) {
      const key = getCardAssetKey(suit, rank as Rank);

      // Remove existing texture if present (for resize regeneration)
      if (scene.textures.exists(key)) {
        scene.textures.remove(key);
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.scale(scale, scale);

      renderCardFace(ctx, suit, rank as Rank, cardWidth, cardHeight);

      scene.textures.addCanvas(key, canvas);
    }
  }

  // Card back
  const backKey = 'card_back';
  if (scene.textures.exists(backKey)) {
    scene.textures.remove(backKey);
  }
  const backCanvas = document.createElement('canvas');
  backCanvas.width = w;
  backCanvas.height = h;
  const backCtx = backCanvas.getContext('2d')!;
  backCtx.scale(scale, scale);
  renderCardBack(backCtx, cardWidth, cardHeight);
  scene.textures.addCanvas(backKey, backCanvas);
}
