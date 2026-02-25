/**
 * Generate mobile-optimized playing card PNGs
 * 
 * Design goals:
 * - Big, bold corner indices (readable at 40px width)
 * - Clean white face with rounded corners
 * - High contrast red/black on white
 * - Professional look matching top solitaire apps
 * 
 * Output: public/cards/{suit}{Rank}.png (e.g., heartAce.png, spade7.png)
 * Also: public/cards/back.png
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CARD_W = 250;
const CARD_H = 350;
const CORNER_R = 12;

const SUITS = {
  heart: { symbol: '♥', color: '#C0392B', pip: '♥' },
  diamond: { symbol: '♦', color: '#C0392B', pip: '♦' },
  club: { symbol: '♣', color: '#1A1A1A', pip: '♣' },
  spade: { symbol: '♠', color: '#1A1A1A', pip: '♠' },
};

const RANKS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
const RANK_LABELS: Record<string, string> = {
  'Ace': 'A', '2': '2', '3': '3', '4': '4', '5': '5',
  '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
  'Jack': 'J', 'Queen': 'Q', 'King': 'K',
};

// Standard pip layouts for number cards (positions as fractions of card area)
// Each position is [x, y] where 0,0 is top-left of pip area and 1,1 is bottom-right
const PIP_LAYOUTS: Record<number, [number, number, boolean?][]> = {
  1: [[0.5, 0.5]],
  2: [[0.5, 0.18], [0.5, 0.82, true]],
  3: [[0.5, 0.18], [0.5, 0.5], [0.5, 0.82, true]],
  4: [[0.3, 0.18], [0.7, 0.18], [0.3, 0.82, true], [0.7, 0.82, true]],
  5: [[0.3, 0.18], [0.7, 0.18], [0.5, 0.5], [0.3, 0.82, true], [0.7, 0.82, true]],
  6: [[0.3, 0.18], [0.7, 0.18], [0.3, 0.5], [0.7, 0.5], [0.3, 0.82, true], [0.7, 0.82, true]],
  7: [[0.3, 0.18], [0.7, 0.18], [0.5, 0.35], [0.3, 0.5], [0.7, 0.5], [0.3, 0.82, true], [0.7, 0.82, true]],
  8: [[0.3, 0.18], [0.7, 0.18], [0.5, 0.35], [0.3, 0.5], [0.7, 0.5], [0.5, 0.65, true], [0.3, 0.82, true], [0.7, 0.82, true]],
  9: [[0.3, 0.15], [0.7, 0.15], [0.3, 0.38], [0.7, 0.38], [0.5, 0.5], [0.3, 0.62, true], [0.7, 0.62, true], [0.3, 0.85, true], [0.7, 0.85, true]],
  10: [[0.3, 0.15], [0.7, 0.15], [0.5, 0.28], [0.3, 0.38], [0.7, 0.38], [0.3, 0.62, true], [0.7, 0.62, true], [0.5, 0.72, true], [0.3, 0.85, true], [0.7, 0.85, true]],
};

// Face card letters for center
const FACE_LETTERS: Record<string, string> = {
  'Jack': 'J', 'Queen': 'Q', 'King': 'K',
};

function generatePip(symbol: string, color: string, x: number, y: number, size: number, flipped?: boolean): string {
  const transform = flipped ? ` transform="rotate(180 ${x} ${y})"` : '';
  return `<text x="${x}" y="${y}" font-family="Segoe UI Symbol, Apple Color Emoji, Noto Color Emoji, sans-serif" font-size="${size}" fill="${color}" text-anchor="middle" dominant-baseline="central"${transform}>${symbol}</text>`;
}

function generateCard(suit: string, rank: string): string {
  const s = SUITS[suit as keyof typeof SUITS];
  const label = RANK_LABELS[rank];
  const rankNum = parseInt(rank);
  const isFace = ['Jack', 'Queen', 'King'].includes(rank);
  const isAce = rank === 'Ace';

  // Card background
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${CARD_H}" viewBox="0 0 ${CARD_W} ${CARD_H}">`;
  
  // White card with rounded corners and border
  svg += `<rect x="1" y="1" width="${CARD_W - 2}" height="${CARD_H - 2}" rx="${CORNER_R}" ry="${CORNER_R}" fill="white" stroke="#CCCCCC" stroke-width="1"/>`;

  // Corner indices - TOP LEFT
  const indexX = 20;
  const indexY = 28;
  const rankSize = label === '10' ? 28 : 32;
  svg += `<text x="${indexX}" y="${indexY}" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="${rankSize}" font-weight="900" fill="${s.color}" text-anchor="middle" dominant-baseline="central">${label}</text>`;
  svg += `<text x="${indexX}" y="${indexY + 24}" font-family="Segoe UI Symbol, Apple Color Emoji, sans-serif" font-size="22" fill="${s.color}" text-anchor="middle" dominant-baseline="central">${s.symbol}</text>`;

  // Corner indices - BOTTOM RIGHT (rotated 180)
  const brX = CARD_W - indexX;
  const brY = CARD_H - indexY;
  svg += `<g transform="rotate(180 ${brX} ${brY})">`;
  svg += `<text x="${brX}" y="${brY}" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="${rankSize}" font-weight="900" fill="${s.color}" text-anchor="middle" dominant-baseline="central">${label}</text>`;
  svg += `<text x="${brX}" y="${brY + 24}" font-family="Segoe UI Symbol, Apple Color Emoji, sans-serif" font-size="22" fill="${s.color}" text-anchor="middle" dominant-baseline="central">${s.symbol}</text>`;
  svg += `</g>`;

  // Card center content
  const pipArea = { x: 45, y: 65, w: CARD_W - 90, h: CARD_H - 130 };

  if (isAce) {
    // Large center suit symbol for Ace
    svg += `<text x="${CARD_W / 2}" y="${CARD_H / 2}" font-family="Segoe UI Symbol, Apple Color Emoji, sans-serif" font-size="80" fill="${s.color}" text-anchor="middle" dominant-baseline="central">${s.symbol}</text>`;
  } else if (isFace) {
    // Face cards: large letter with decorative border
    const faceLetter = FACE_LETTERS[rank];
    // Decorative frame
    svg += `<rect x="50" y="70" width="${CARD_W - 100}" height="${CARD_H - 140}" rx="8" ry="8" fill="none" stroke="${s.color}" stroke-width="2" opacity="0.3"/>`;
    // Large centered letter
    svg += `<text x="${CARD_W / 2}" y="${CARD_H / 2}" font-family="Georgia, Times New Roman, serif" font-size="90" font-weight="bold" fill="${s.color}" text-anchor="middle" dominant-baseline="central" opacity="0.85">${faceLetter}</text>`;
    // Small suits in corners of frame
    svg += `<text x="62" y="88" font-size="18" fill="${s.color}" font-family="Segoe UI Symbol, sans-serif" text-anchor="middle" dominant-baseline="central">${s.symbol}</text>`;
    svg += `<text x="${CARD_W - 62}" y="${CARD_H - 88}" font-size="18" fill="${s.color}" font-family="Segoe UI Symbol, sans-serif" text-anchor="middle" dominant-baseline="central" transform="rotate(180 ${CARD_W - 62} ${CARD_H - 88})">${s.symbol}</text>`;
  } else {
    // Number cards: standard pip layout
    const numPips = parseInt(rank);
    const layout = PIP_LAYOUTS[numPips];
    if (layout) {
      const pipSize = 32;
      for (const [px, py, flipped] of layout) {
        const x = pipArea.x + px * pipArea.w;
        const y = pipArea.y + py * pipArea.h;
        svg += generatePip(s.pip, s.color, x, y, pipSize, !!flipped);
      }
    }
  }

  svg += `</svg>`;
  return svg;
}

function generateCardBack(): string {
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${CARD_H}" viewBox="0 0 ${CARD_W} ${CARD_H}">`;
  
  // White border
  svg += `<rect x="0" y="0" width="${CARD_W}" height="${CARD_H}" rx="${CORNER_R}" ry="${CORNER_R}" fill="white"/>`;
  
  // Navy inner
  svg += `<rect x="6" y="6" width="${CARD_W - 12}" height="${CARD_H - 12}" rx="8" ry="8" fill="#1B2A4A"/>`;
  
  // Gold diamond crosshatch pattern
  const patternSize = 20;
  for (let x = 16; x < CARD_W - 16; x += patternSize) {
    for (let y = 16; y < CARD_H - 16; y += patternSize) {
      svg += `<polygon points="${x + patternSize / 2},${y} ${x + patternSize},${y + patternSize / 2} ${x + patternSize / 2},${y + patternSize} ${x},${y + patternSize / 2}" fill="none" stroke="#D4AF37" stroke-width="0.5" opacity="0.6"/>`;
    }
  }
  
  // Center emblem
  svg += `<rect x="${CARD_W / 2 - 30}" y="${CARD_H / 2 - 30}" width="60" height="60" rx="6" ry="6" fill="#D4AF37" opacity="0.3"/>`;
  svg += `<text x="${CARD_W / 2}" y="${CARD_H / 2}" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="#D4AF37" text-anchor="middle" dominant-baseline="central">♠</text>`;

  svg += `</svg>`;
  return svg;
}

// Main
const outDir = path.join(__dirname, '..', 'public', 'cards');

console.log('Generating mobile-optimized playing cards...');

let count = 0;
for (const suit of Object.keys(SUITS)) {
  for (const rank of RANKS) {
    const svg = generateCard(suit, rank);
    const filename = `${suit}${rank}.png`;
    const svgPath = `/tmp/card_${filename}.svg`;
    const pngPath = path.join(outDir, filename);
    
    fs.writeFileSync(svgPath, svg);
    execSync(`magick "${svgPath}" -resize ${CARD_W}x${CARD_H} "${pngPath}"`);
    count++;
  }
}

// Card back
const backSvg = generateCardBack();
fs.writeFileSync('/tmp/card_back.svg', backSvg);
execSync(`magick "/tmp/card_back.svg" -resize ${CARD_W}x${CARD_H} "${path.join(outDir, 'back.png')}"`);
count++;

console.log(`Generated ${count} cards in ${outDir}`);
