/**
 * Procedural card back designs — 8 designs rendered via Canvas 2D API
 * Each generates a texture at the given card dimensions and registers it with Phaser.
 */

export interface CardBackDesign {
  id: string;
  name: string;
  /** Generate a thumbnail canvas at small size for the settings picker */
  renderToCanvas(width: number, height: number): HTMLCanvasElement;
}

const CARD_BACK_STORAGE_KEY = 'freecell-card-back';
const DEFAULT_CARD_BACK = 'classic-blue';

export function getSelectedCardBack(): string {
  if (typeof window === 'undefined') return DEFAULT_CARD_BACK;
  return localStorage.getItem(CARD_BACK_STORAGE_KEY) || DEFAULT_CARD_BACK;
}

export function setSelectedCardBack(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CARD_BACK_STORAGE_KEY, id);
}

// ── Helper drawing functions ──

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function createCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  return [canvas, ctx];
}

function drawBase(ctx: CanvasRenderingContext2D, w: number, h: number, bgColor: string) {
  const r = Math.max(4, w * 0.06);
  drawRoundedRect(ctx, 0, 0, w, h, r);
  ctx.fillStyle = bgColor;
  ctx.fill();
  ctx.clip();
}

function drawBorder(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, inset: number = 3) {
  const r = Math.max(3, w * 0.05);
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, w * 0.02);
  drawRoundedRect(ctx, inset, inset, w - inset * 2, h - inset * 2, r);
  ctx.stroke();
}

// ── 1. Classic Blue ──

function renderClassicBlue(w: number, h: number): HTMLCanvasElement {
  const [canvas, ctx] = createCanvas(w, h);
  drawBase(ctx, w, h, '#1a3a8a');

  // Cross-hatch pattern
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = Math.max(1, w * 0.015);
  const step = Math.max(6, w * 0.1);
  for (let i = -h; i < w + h; i += step) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + h, h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(i, h); ctx.lineTo(i + h, 0); ctx.stroke();
  }

  // Inner border
  drawBorder(ctx, w, h, 'rgba(255,255,255,0.25)');
  // Outer border
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = Math.max(1, w * 0.02);
  drawRoundedRect(ctx, 0, 0, w, h, Math.max(4, w * 0.06));
  ctx.stroke();
  return canvas;
}

// ── 2. Casino Red ──

function renderCasinoRed(w: number, h: number): HTMLCanvasElement {
  const [canvas, ctx] = createCanvas(w, h);
  drawBase(ctx, w, h, '#8b1a1a');

  // Diamond pattern
  const dSize = Math.max(8, w * 0.15);
  ctx.fillStyle = 'rgba(255,215,0,0.08)';
  ctx.strokeStyle = 'rgba(255,215,0,0.15)';
  ctx.lineWidth = Math.max(0.5, w * 0.01);
  for (let y = 0; y < h + dSize; y += dSize) {
    for (let x = 0; x < w + dSize; x += dSize) {
      const ox = (Math.floor(y / dSize) % 2) * (dSize / 2);
      ctx.beginPath();
      ctx.moveTo(x + ox, y - dSize / 2);
      ctx.lineTo(x + ox + dSize / 2, y);
      ctx.lineTo(x + ox, y + dSize / 2);
      ctx.lineTo(x + ox - dSize / 2, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  // Gold border
  drawBorder(ctx, w, h, 'rgba(255,215,0,0.5)');
  drawBorder(ctx, w, h, 'rgba(255,215,0,0.25)', 6);
  return canvas;
}

// ── 3. Forest Green ──

function renderForestGreen(w: number, h: number): HTMLCanvasElement {
  const [canvas, ctx] = createCanvas(w, h);
  drawBase(ctx, w, h, '#1a4a2a');

  // Vine/leaf pattern — diagonal curving lines with small leaves
  ctx.strokeStyle = 'rgba(100,200,100,0.15)';
  ctx.lineWidth = Math.max(1, w * 0.02);
  const vStep = Math.max(10, w * 0.2);
  for (let i = -h; i < w + h; i += vStep) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    for (let y = 0; y < h; y += 10) {
      ctx.lineTo(i + Math.sin(y * 0.05) * w * 0.08, y);
    }
    ctx.stroke();
  }

  // Small leaf dots
  ctx.fillStyle = 'rgba(80,180,80,0.12)';
  const leafStep = Math.max(8, w * 0.12);
  for (let y = leafStep / 2; y < h; y += leafStep) {
    for (let x = leafStep / 2; x < w; x += leafStep) {
      const ox = (Math.floor(y / leafStep) % 2) * (leafStep / 2);
      ctx.beginPath();
      ctx.ellipse(x + ox, y, w * 0.04, w * 0.025, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawBorder(ctx, w, h, 'rgba(100,200,100,0.3)');
  return canvas;
}

// ── 4. Midnight ──

function renderMidnight(w: number, h: number): HTMLCanvasElement {
  const [canvas, ctx] = createCanvas(w, h);
  drawBase(ctx, w, h, '#0a0e2a');

  // Gradient overlay
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(20,30,80,0.5)');
  grad.addColorStop(1, 'rgba(5,5,20,0.5)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Star constellation pattern (deterministic pseudo-random)
  ctx.fillStyle = 'rgba(200,210,255,0.6)';
  const starPositions = [
    [0.2, 0.15], [0.7, 0.1], [0.4, 0.3], [0.8, 0.35], [0.15, 0.5],
    [0.6, 0.45], [0.35, 0.65], [0.85, 0.6], [0.5, 0.8], [0.2, 0.85],
    [0.75, 0.78], [0.45, 0.12], [0.9, 0.9], [0.1, 0.7], [0.55, 0.55],
    [0.3, 0.42], [0.65, 0.72], [0.82, 0.18], [0.12, 0.32], [0.48, 0.92],
  ];
  for (const [sx, sy] of starPositions) {
    const size = Math.max(1, w * 0.012);
    ctx.beginPath();
    ctx.arc(sx * w, sy * h, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Connect some stars with faint lines
  ctx.strokeStyle = 'rgba(150,170,255,0.1)';
  ctx.lineWidth = Math.max(0.5, w * 0.008);
  const connections = [[0, 2], [2, 5], [5, 3], [1, 3], [4, 8], [8, 10], [6, 9], [7, 10], [14, 5]];
  for (const [a, b] of connections) {
    ctx.beginPath();
    ctx.moveTo(starPositions[a][0] * w, starPositions[a][1] * h);
    ctx.lineTo(starPositions[b][0] * w, starPositions[b][1] * h);
    ctx.stroke();
  }

  drawBorder(ctx, w, h, 'rgba(150,170,255,0.25)');
  return canvas;
}

// ── 5. Royal Purple ──

function renderRoyalPurple(w: number, h: number): HTMLCanvasElement {
  const [canvas, ctx] = createCanvas(w, h);
  drawBase(ctx, w, h, '#2a1048');

  // Damask-style ornate pattern — overlapping circles/ovals
  ctx.strokeStyle = 'rgba(200,170,255,0.1)';
  ctx.lineWidth = Math.max(0.5, w * 0.012);
  const cellW = Math.max(10, w * 0.2);
  const cellH = Math.max(14, h * 0.14);
  for (let row = 0; row < h / cellH + 1; row++) {
    for (let col = 0; col < w / cellW + 1; col++) {
      const cx = col * cellW + (row % 2 ? cellW / 2 : 0);
      const cy = row * cellH;
      // Ornate oval
      ctx.beginPath();
      ctx.ellipse(cx, cy, cellW * 0.4, cellH * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Inner diamond
      ctx.beginPath();
      ctx.moveTo(cx, cy - cellH * 0.2);
      ctx.lineTo(cx + cellW * 0.15, cy);
      ctx.lineTo(cx, cy + cellH * 0.2);
      ctx.lineTo(cx - cellW * 0.15, cy);
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Gold accent border
  drawBorder(ctx, w, h, 'rgba(255,215,0,0.35)');
  drawBorder(ctx, w, h, 'rgba(200,170,255,0.2)', 6);
  return canvas;
}

// ── 6. Sunset Orange ──

function renderSunsetOrange(w: number, h: number): HTMLCanvasElement {
  const [canvas, ctx] = createCanvas(w, h);
  drawBase(ctx, w, h, '#c04020');

  // Warm gradient overlay
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(255,180,50,0.3)');
  grad.addColorStop(0.5, 'rgba(200,60,20,0.1)');
  grad.addColorStop(1, 'rgba(120,20,40,0.3)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Geometric pattern — concentric circles
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = Math.max(0.5, w * 0.01);
  const cxc = w / 2, cyc = h / 2;
  const maxR = Math.max(w, h) * 0.7;
  const rStep = Math.max(6, w * 0.08);
  for (let r = rStep; r < maxR; r += rStep) {
    ctx.beginPath();
    ctx.arc(cxc, cyc, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Radial lines
  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
    ctx.beginPath();
    ctx.moveTo(cxc, cyc);
    ctx.lineTo(cxc + Math.cos(angle) * maxR, cyc + Math.sin(angle) * maxR);
    ctx.stroke();
  }

  drawBorder(ctx, w, h, 'rgba(255,220,150,0.4)');
  return canvas;
}

// ── 7. Ocean Wave ──

function renderOceanWave(w: number, h: number): HTMLCanvasElement {
  const [canvas, ctx] = createCanvas(w, h);
  drawBase(ctx, w, h, '#0a3050');

  // Gradient: deep to teal
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(10,80,120,0.5)');
  grad.addColorStop(1, 'rgba(10,50,80,0.5)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Wave pattern
  const waveStep = Math.max(8, h * 0.08);
  for (let waveY = 0; waveY < h + waveStep; waveY += waveStep) {
    ctx.strokeStyle = `rgba(80,200,220,${0.08 + (waveY / h) * 0.06})`;
    ctx.lineWidth = Math.max(1, w * 0.018);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 2) {
      const amp = w * 0.06;
      const freq = 0.04 + (waveY * 0.0001);
      const y = waveY + Math.sin(x * freq + waveY * 0.3) * amp;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  drawBorder(ctx, w, h, 'rgba(80,200,220,0.3)');
  return canvas;
}

// ── 8. Carbon Fiber ──

function renderCarbonFiber(w: number, h: number): HTMLCanvasElement {
  const [canvas, ctx] = createCanvas(w, h);
  drawBase(ctx, w, h, '#1a1a1a');

  // Subtle diagonal weave pattern
  const step = Math.max(4, w * 0.05);
  // Light diagonal lines (one direction)
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = Math.max(1, w * 0.02);
  for (let i = -h; i < w + h; i += step * 2) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + h, h); ctx.stroke();
  }
  // Slightly different shade (other direction)
  ctx.strokeStyle = 'rgba(255,255,255,0.035)';
  for (let i = -h; i < w + h; i += step * 2) {
    ctx.beginPath(); ctx.moveTo(i + step, 0); ctx.lineTo(i + step + h, h); ctx.stroke();
  }
  // Cross weave
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  for (let i = -h; i < w + h; i += step * 2) {
    ctx.beginPath(); ctx.moveTo(i, h); ctx.lineTo(i + h, 0); ctx.stroke();
  }

  // Subtle gradient sheen
  const sheen = ctx.createLinearGradient(0, 0, w, h);
  sheen.addColorStop(0, 'rgba(255,255,255,0.03)');
  sheen.addColorStop(0.5, 'rgba(255,255,255,0.0)');
  sheen.addColorStop(1, 'rgba(255,255,255,0.02)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, w, h);

  drawBorder(ctx, w, h, 'rgba(255,255,255,0.12)');
  return canvas;
}

// ── Registry ──

export const cardBackDesigns: CardBackDesign[] = [
  { id: 'classic-blue', name: 'Classic Blue', renderToCanvas: renderClassicBlue },
  { id: 'casino-red', name: 'Casino Red', renderToCanvas: renderCasinoRed },
  { id: 'forest-green', name: 'Forest Green', renderToCanvas: renderForestGreen },
  { id: 'midnight', name: 'Midnight', renderToCanvas: renderMidnight },
  { id: 'royal-purple', name: 'Royal Purple', renderToCanvas: renderRoyalPurple },
  { id: 'sunset-orange', name: 'Sunset Orange', renderToCanvas: renderSunsetOrange },
  { id: 'ocean-wave', name: 'Ocean Wave', renderToCanvas: renderOceanWave },
  { id: 'carbon-fiber', name: 'Carbon Fiber', renderToCanvas: renderCarbonFiber },
];

export function getCardBackById(id: string): CardBackDesign {
  return cardBackDesigns.find(d => d.id === id) || cardBackDesigns[0];
}

/**
 * Generate (or regenerate) the selected card back texture in a Phaser scene.
 * Registers it under the key 'card_back_custom'.
 */
export function generateCardBackTexture(
  scene: Phaser.Scene,
  cardWidth: number,
  cardHeight: number,
  designId?: string,
): void {
  const id = designId || getSelectedCardBack();
  const design = getCardBackById(id);
  const canvas = design.renderToCanvas(cardWidth, cardHeight);

  // Remove old texture if it exists
  if (scene.textures.exists('card_back_custom')) {
    scene.textures.remove('card_back_custom');
  }
  scene.textures.addCanvas('card_back_custom', canvas);
}
