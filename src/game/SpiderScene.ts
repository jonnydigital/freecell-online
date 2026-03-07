import * as Phaser from 'phaser';
import { SpiderEngine, SpiderLocation } from '../engine/SpiderEngine';
import { Card, Suit, Rank, SUIT_SYMBOLS } from '../engine/Card';
import { gameBridge } from './GameBridge';
import { getCardAssetKey, getAllCardAssets } from './CardAssets';
import { soundManager } from '../lib/sounds';
import { GameSettings, loadSettings } from '../lib/storage';
import { ThemeDefinition, themes, getThemeById, hexToInt } from '../lib/themes';

const CARD_RATIO = 1.4;
const MIN_CASCADE_OVERLAP_PX = 24;
const MAX_CASCADE_OVERLAP_FRAC = 0.75;
const SIDE_MARGIN = 0.025;
const GAP = 0.015;

interface CardSprite extends Phaser.GameObjects.Container {
  cardData: Card;
  sourceLocation: SpiderLocation;
}

export class SpiderScene extends Phaser.Scene {
  private engine!: SpiderEngine;
  private cardSprites: Map<string, CardSprite> = new Map();
  private gameNumber: number = 1;
  private settings!: GameSettings;
  private currentTheme: ThemeDefinition = themes[0];

  // Layout
  private cardWidth: number = 0;
  private cardHeight: number = 0;
  private boardOffsetX: number = 0;
  private boardOffsetY: number = 0;
  private isPortrait: boolean = false;
  private topRowHeight: number = 0;
  private cascadeGap: number = 0;
  private cachedOverlap: number | null = null;
  private cachedCanvasRect: DOMRect | null = null;
  private cachedScaleX: number = 1;
  private cachedScaleY: number = 1;

  // Drag
  private activeDragCards: CardSprite[] = [];
  private activeDragFrom: SpiderLocation | null = null;
  private activeDragTarget: { x: number; y: number } | null = null;
  private activeDragOffsets: { x: number; y: number } = { x: 0, y: 0 };
  private isDragging: boolean = false;
  private dragSource: 'touch' | 'mouse' | null = null;
  private activeDragVelocities: { x: number; y: number }[] = [];
  private activeDragAngleVelocities: number[] = [];
  private settleTargets: { x: number; y: number }[] = [];
  private isSettlingDrag: boolean = false;
  private pendingSettledMove: { from: SpiderLocation; to: SpiderLocation } | null = null;

  // Tracked listeners
  private trackedDomListeners: Array<{ target: EventTarget; type: string; listener: EventListenerOrEventListenerObject; options?: AddEventListenerOptions | boolean }> = [];
  private bridgeUnsubscribers: Array<() => void> = [];
  private scaleResizeHandler: ((gameSize: Phaser.Structs.Size) => void) | null = null;
  private isTouchDevice: boolean = false;

  // Visuals
  private vignette: Phaser.GameObjects.Graphics | null = null;
  private feltNoise: Phaser.GameObjects.Graphics | null = null;
  private slotGraphics: Phaser.GameObjects.GameObject[] = [];

  constructor() {
    super({ key: 'SpiderScene' });
  }

  // ===== INITIALIZATION & BACKGROUND =====

  private drawBackgroundEffects(): void {
    const w = this.scale.width;
    const h = this.scale.height;
    const t = this.currentTheme;

    if (this.vignette) { this.vignette.destroy(); this.vignette = null; }
    if (this.feltNoise) { this.feltNoise.destroy(); this.feltNoise = null; }

    this.vignette = this.add.graphics();
    this.vignette.setDepth(0);
    const steps = 8;
    for (let i = 0; i < steps; i++) {
      const alpha = t.vignetteAlpha * (1 - i / steps);
      const inset = (i / steps) * Math.min(w, h) * 0.35;
      this.vignette.fillStyle(0x000000, alpha);
      this.vignette.fillRect(0, 0, w, inset);
      this.vignette.fillRect(0, h - inset, w, inset);
      this.vignette.fillRect(0, 0, inset, h);
      this.vignette.fillRect(w - inset, 0, inset, h);
    }

    this.feltNoise = this.add.graphics();
    this.feltNoise.setDepth(1);
    const noiseLightColor = hexToInt(t.feltNoiseLight);
    const noiseDarkColor = hexToInt(t.feltNoiseDark);
    const noiseCount = Math.floor((w * h) / 800);
    for (let i = 0; i < noiseCount; i++) {
      const nx = Math.random() * w;
      const ny = Math.random() * h;
      const bright = Math.random() > 0.5;
      this.feltNoise.fillStyle(bright ? noiseLightColor : noiseDarkColor, Math.random() * 0.15);
      this.feltNoise.fillRect(nx, ny, 1 + Math.random(), 1 + Math.random());
    }
  }

  private createParticleTexture(): void {
    if (!this.textures.exists('gold_sparkle')) {
      const g = this.add.graphics();
      g.fillStyle(0xffd700, 1);
      g.fillCircle(4, 4, 4);
      g.generateTexture('gold_sparkle', 8, 8);
      g.destroy();
    }
  }

  preload(): void {
    for (const { key, path } of getAllCardAssets()) {
      this.load.image(key, path);
    }
  }

  create(): void {
    this.gameNumber = gameBridge.initialGameNumber || 1;
    this.engine = new SpiderEngine(this.gameNumber, gameBridge.spiderDifficulty || '1-suit');
    this.settings = loadSettings();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);

    const storedThemeId = localStorage.getItem('theme-id');
    if (storedThemeId) {
      this.currentTheme = getThemeById(storedThemeId);
    }
    this.cameras.main.setBackgroundColor(hexToInt(this.currentTheme.feltColor));

    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    this.drawBackgroundEffects();
    this.createParticleTexture();
    this.calculateLayout();
    this.refreshCanvasMetrics();
    this.createBoard();
    this.dealCards(true);

    this.scaleResizeHandler = () => {
      this.calculateLayout();
      this.invalidateOverlapCache();
      this.refreshCanvasMetrics();
      this.drawBackgroundEffects();
      this.rebuildBoard();
      this.recreateAllCardSprites();
      this.repositionAllCards();
    };
    this.scale.on('resize', this.scaleResizeHandler, this);

    gameBridge.emit('gameReady', { gameNumber: this.gameNumber });

    // Listen for new game / difficulty change requests
    const unsubNewGame = gameBridge.on('newGame', (data: unknown) => {
      const num = typeof data === 'number' ? data : Math.floor(Math.random() * 9999999) + 1;
      this.restartWithNewGame(num);
    });
    this.bridgeUnsubscribers.push(unsubNewGame);

    if (this.isTouchDevice) {
      this.setupTouchInput();
    } else {
      this.setupMouseDrag();
    }
  }

  private restartWithNewGame(gameNumber: number): void {
    // Clear all existing card sprites
    for (const sprite of this.cardSprites.values()) {
      sprite.destroy();
    }
    this.cardSprites.clear();
    this.activeDragCards = [];
    this.activeDragFrom = null;
    this.isDragging = false;
    this.isSettlingDrag = false;
    this.pendingSettledMove = null;
    this.invalidateOverlapCache();

    // Create new engine with current difficulty
    this.gameNumber = gameNumber;
    this.engine = new SpiderEngine(this.gameNumber, gameBridge.spiderDifficulty || '1-suit');

    // Rebuild and deal
    this.rebuildBoard();
    this.dealCards(true);

    gameBridge.emit('gameReady', { gameNumber: this.gameNumber });
  }

  private shutdown(): void {
    if (this.scaleResizeHandler) this.scale.off('resize', this.scaleResizeHandler, this);
    for (const unsub of this.bridgeUnsubscribers) {
      unsub();
    }
    this.bridgeUnsubscribers = [];
    for (const { target, type, listener, options } of this.trackedDomListeners) {
      target.removeEventListener(type, listener, options);
    }
    this.trackedDomListeners = [];
  }

  private trackDomListener(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions | boolean): void {
    target.addEventListener(type, listener, options);
    this.trackedDomListeners.push({ target, type, listener, options });
  }

  // ===== LAYOUT & POSITIONING =====

  private refreshCanvasMetrics(): void {
    const canvas = this.game.canvas;
    const rect = canvas.getBoundingClientRect();
    this.cachedCanvasRect = rect;
    this.cachedScaleX = rect.width > 0 ? canvas.width / rect.width : 1;
    this.cachedScaleY = rect.height > 0 ? canvas.height / rect.height : 1;
  }

  private invalidateOverlapCache(): void { this.cachedOverlap = null; }

  private calculateLayout(): void {
    const w = this.scale.width;
    const h = this.scale.height;
    this.isPortrait = h > w * 1.1;

    // 10 columns for Spider
    const usableWidth = w * (1 - 2 * SIDE_MARGIN);
    const gapPx = w * GAP;
    const cardWidthFromWidth = Math.floor((usableWidth - 9 * gapPx) / 10);
    const cardHeightFromWidth = Math.floor(cardWidthFromWidth * CARD_RATIO);

    const topPad = Math.max(Math.floor(h * 0.005), 2);
    this.cascadeGap = Math.floor(h * 0.01);

    // Allow more vertical squishing in landscape if needed
    const vertBudget = h - topPad - this.cascadeGap - 4;
    const maxCardHeight = Math.floor((vertBudget - 6 * MIN_CASCADE_OVERLAP_PX) / 2);

    if (this.isPortrait) {
      this.cardHeight = cardHeightFromWidth;
      this.cardWidth = cardWidthFromWidth;
    } else {
      this.cardHeight = Math.min(cardHeightFromWidth, maxCardHeight);
      this.cardWidth = this.cardHeight === cardHeightFromWidth ? cardWidthFromWidth : Math.floor(this.cardHeight / CARD_RATIO);
    }

    this.boardOffsetX = Math.floor((w - (10 * this.cardWidth + 9 * gapPx)) / 2);
    this.boardOffsetY = topPad;
    this.topRowHeight = this.cardHeight;
    this.invalidateOverlapCache();
  }

  private getColumnX(col: number): number {
    return this.boardOffsetX + col * (this.cardWidth + this.scale.width * GAP);
  }

  private getCurrentOverlap(): number {
    if (this.cachedOverlap !== null) return this.cachedOverlap;
    const state = this.engine.getState();
    const maxCascadeLength = Math.max(...state.cascades.map(c => c.length), 1);
    const topRow = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    const availableHeight = this.scale.height - topRow - 4;

    const targetOverlap = maxCascadeLength > 1
      ? Math.floor((availableHeight * 0.95 - this.cardHeight) / (maxCascadeLength - 1))
      : this.cardHeight;
    const maxDesiredOverlap = Math.floor(this.cardHeight * MAX_CASCADE_OVERLAP_FRAC);
    const maxFittingOverlap = maxCascadeLength > 1
      ? Math.floor((availableHeight - this.cardHeight) / (maxCascadeLength - 1))
      : this.cardHeight;

    this.cachedOverlap = Math.max(MIN_CASCADE_OVERLAP_PX, Math.min(targetOverlap, maxDesiredOverlap, maxFittingOverlap));
    return this.cachedOverlap;
  }

  private getCascadeCardPosition(col: number, row: number): { x: number; y: number } {
    return { x: this.getColumnX(col), y: this.boardOffsetY + this.topRowHeight + this.cascadeGap + row * this.getCurrentOverlap() };
  }

  private getStockPosition(): { x: number; y: number } {
    return { x: this.getColumnX(0), y: this.boardOffsetY };
  }

  private getFoundationPosition(index: number): { x: number; y: number } {
    // Top right, aligning rightwards
    return { x: this.getColumnX(9 - index), y: this.boardOffsetY };
  }

  // ===== RENDERING =====

  private createBoard(): void { this.drawSlots(); }
  private rebuildBoard(): void { this.drawSlots(); }

  private drawSlots(): void {
    this.slotGraphics.forEach(g => g.destroy());
    this.slotGraphics = [];

    // Stock slot
    const stockPos = this.getStockPosition();
    this.createSlot(stockPos.x, stockPos.y, 'DEAL');

    // 8 Foundation slots
    for (let i = 0; i < 8; i++) {
      const pos = this.getFoundationPosition(i);
      this.createSlot(pos.x, pos.y, '');
    }
  }

  private createSlot(x: number, y: number, label: string): void {
    const slotColor = hexToInt(this.currentTheme.feltNoiseLight);
    const graphics = this.add.graphics();
    graphics.lineStyle(2, slotColor, 0.8);
    graphics.strokeRoundedRect(x, y, this.cardWidth, this.cardHeight, 6);
    this.slotGraphics.push(graphics);

    if (label) {
      const text = this.add.text(x + this.cardWidth / 2, y + this.cardHeight / 2, label, {
        fontSize: `${Math.floor(this.cardWidth * 0.3)}px`,
        color: this.currentTheme.feltNoiseLight,
        fontFamily: 'serif',
      });
      text.setOrigin(0.5);
      this.slotGraphics.push(text);
    }
  }

  private getCardTextureKey(card: Card): string {
    return card.isFaceUp ? getCardAssetKey(card.suit, card.rank) : 'card_back_premium';
  }

  private createCardSprite(card: Card, x: number, y: number): CardSprite {
    const container = this.add.container(x, y) as CardSprite;
    container.setSize(this.cardWidth, this.cardHeight);
    container.cardData = card;

    if (!card.isFaceUp) {
      const base = this.add.graphics();
      // Premium dark blue background
      base.fillStyle(0x1e293b, 1);
      base.fillRoundedRect(0, 0, this.cardWidth, this.cardHeight, 8);
      base.lineStyle(2, 0x0f172a, 0.8);
      base.strokeRoundedRect(0, 0, this.cardWidth, this.cardHeight, 8);

      // Procedural minimal geometric pattern (diamonds)
      const pattern = this.add.graphics();
      pattern.lineStyle(2, 0x334155, 0.6); // Subtle slate-blue lines

      const cx = this.cardWidth / 2;
      const cy = this.cardHeight / 2;
      const tileSize = this.cardWidth * 0.25;

      // Draw a clean, minimalist nested diamond
      pattern.beginPath();
      pattern.moveTo(cx, cy - tileSize);
      pattern.lineTo(cx + tileSize, cy);
      pattern.lineTo(cx, cy + tileSize);
      pattern.lineTo(cx - tileSize, cy);
      pattern.closePath();
      pattern.strokePath();

      pattern.beginPath();
      pattern.moveTo(cx, cy - tileSize * 0.5);
      pattern.lineTo(cx + tileSize * 0.5, cy);
      pattern.lineTo(cx, cy + tileSize * 0.5);
      pattern.lineTo(cx - tileSize * 0.5, cy);
      pattern.closePath();
      pattern.strokePath();

      container.add([base, pattern]);
    } else {
      const base = this.add.graphics();
      base.fillStyle(0xffffff, 1);
      base.fillRoundedRect(0, 0, this.cardWidth, this.cardHeight, 8);
      base.lineStyle(2, 0x000000, 0.08);
      base.strokeRoundedRect(0, 0, this.cardWidth, this.cardHeight, 8);
      container.add(base);

      const isRed = (card.suit === Suit.Hearts || card.suit === Suit.Diamonds);
      const colorStr = isRed ? '#cc0000' : '#000000';
      const rankMap: Record<number, string> = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' };
      const rankStr = rankMap[card.rank] || card.rank.toString();

      const fontSize = Math.floor(this.cardWidth * 0.28);
      const text = this.add.text(this.cardWidth * 0.15, this.cardHeight * 0.05, rankStr, {
        fontSize: `${fontSize}px`, color: colorStr, fontFamily: 'Inter, system-ui, sans-serif', fontStyle: '900'
      });
      text.setOrigin(0.5, 0);
      container.add(text);

      const suitMap: Record<string, string> = { [Suit.Hearts as string]: 'suit_heart', [Suit.Spades as string]: 'suit_spade', [Suit.Diamonds as string]: 'suit_diamond', [Suit.Clubs as string]: 'suit_club' };
      const smallSuitSz = this.cardWidth * 0.18;
      const suitY = this.cardHeight * 0.05 + fontSize;
      const smallSuit = this.add.image(this.cardWidth * 0.15, suitY + (smallSuitSz / 2), suitMap[card.suit as string]);
      smallSuit.setDisplaySize(smallSuitSz, smallSuitSz);
      container.add(smallSuit);

      const bigSuitSz = this.cardWidth * 0.45;
      const suitImg = this.add.image(this.cardWidth / 2, this.cardHeight * 0.52, suitMap[card.suit as string]);
      suitImg.setDisplaySize(bigSuitSz, bigSuitSz);
      container.add(suitImg);
    }

    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.12);
    shadow.fillRoundedRect(2, 2, this.cardWidth, this.cardHeight, 8);
    container.addAt(shadow, 0);

    this.cardSprites.set(card.id, container);
    return container;
  }

  private recreateAllCardSprites(): void {
    const oldSprites = Array.from(this.cardSprites.values());
    this.cardSprites.clear();
    for (const sprite of oldSprites) {
      const newSprite = this.createCardSprite(sprite.cardData, sprite.x, sprite.y);
      newSprite.sourceLocation = sprite.sourceLocation;
      newSprite.setDepth(sprite.depth);
      sprite.destroy();
    }
  }

  private repositionAllCards(): void {
    const state = this.engine.getState();
    for (let col = 0; col < 10; col++) {
      const cascade = state.cascades[col];
      for (let row = 0; row < cascade.length; row++) {
        const sprite = this.cardSprites.get(cascade[row].id);
        if (sprite) {
          const pos = this.getCascadeCardPosition(col, row);
          sprite.x = pos.x; sprite.y = pos.y;
          sprite.sourceLocation = { type: 'cascade', index: col, cardIndex: row };
        }
      }
    }

    // Position stock cards visually as a deck
    const stockPos = this.getStockPosition();
    for (let i = 0; i < state.stock.length; i++) {
      const sprite = this.cardSprites.get(state.stock[i].id);
      if (sprite) {
        sprite.x = stockPos.x + (i % 5) * 2;
        sprite.y = stockPos.y - Math.floor(i / 5) * 2;
        sprite.sourceLocation = { type: 'stock' };
        sprite.setDepth(10 + i);
      }
    }

    for (let i = 0; i < state.foundations.length; i++) {
      const pos = this.getFoundationPosition(i);
      for (const card of state.foundations[i]) {
        const sprite = this.cardSprites.get(card.id);
        if (sprite) {
          sprite.x = pos.x; sprite.y = pos.y;
          sprite.sourceLocation = { type: 'foundation', index: i };
        }
      }
    }
  }

  private dealCards(staggered: boolean = false): void {
    const state = this.engine.getState();
    const w = this.scale.width;
    let dealIndex = 0;

    for (let col = 0; col < 10; col++) {
      const cascade = state.cascades[col];
      for (let row = 0; row < cascade.length; row++) {
        const card = cascade[row];
        const pos = this.getCascadeCardPosition(col, row);

        if (staggered) {
          const sprite = this.createCardSprite(card, w / 2 - this.cardWidth / 2, -this.cardHeight);
          sprite.sourceLocation = { type: 'cascade', index: col, cardIndex: row };
          sprite.setDepth(500 + dealIndex);
          sprite.alpha = 0;

          const delay = dealIndex * 35;
          this.tweens.add({ targets: sprite, x: pos.x, duration: 300, delay, ease: 'Power2' });
          this.tweens.add({ targets: sprite, y: pos.y, duration: 450, delay, ease: 'Bounce.easeOut' });
          this.tweens.add({ targets: sprite, alpha: 1, duration: 100, delay });

          this.time.delayedCall(delay + 150, () => {
            soundManager.cardSelect();
            sprite.setDepth(row + 10);
          });
          dealIndex++;
        } else {
          const sprite = this.createCardSprite(card, pos.x, pos.y);
          sprite.sourceLocation = { type: 'cascade', index: col, cardIndex: row };
          sprite.setDepth(row + 10);
        }
      }
    }

    // Deal stock to bottom left pile
    const stockPos = this.getStockPosition();
    for (let i = 0; i < state.stock.length; i++) {
      const card = state.stock[i];
      if (staggered) {
        const sprite = this.createCardSprite(card, w / 2, -this.cardHeight);
        sprite.sourceLocation = { type: 'stock' };
        sprite.setDepth(500 + dealIndex);

        const delay = dealIndex * 15;
        this.tweens.add({ targets: sprite, x: stockPos.x + (i % 5) * 2, duration: 300, delay, ease: 'Power2' });
        this.tweens.add({ targets: sprite, y: stockPos.y - Math.floor(i / 5) * 2, duration: 300, delay, ease: 'Power2' });
        dealIndex++;
      } else {
        const sprite = this.createCardSprite(card, stockPos.x + (i % 5) * 2, stockPos.y - Math.floor(i / 5) * 2);
        sprite.sourceLocation = { type: 'stock' };
        sprite.setDepth(10 + i);
      }
    }
  }

  // ===== ENGINE INTERACTION & ANIMATION =====

  private executeMoveAndAnimate(from: SpiderLocation, to: SpiderLocation): void {
    try {
      const move = this.engine.executeMove(from, to);

      if (move.isDeal) {
        // Deal from stock
        soundManager.cardSelect();
        let i = 0;
        for (const c of move.cards) {
          const sprite = this.cardSprites.get(c.id);
          const cascade = this.engine.getState().cascades[i];
          const newRow = cascade.length - 1;
          const targetPos = this.getCascadeCardPosition(i, newRow);

          if (sprite) {
            sprite.sourceLocation = { type: 'cascade', index: i, cardIndex: newRow };
            sprite.setDepth(100 + i); // Over everything temporarily

            // Animate turning over & moving
            this.tweens.add({
              targets: sprite,
              x: targetPos.x,
              y: targetPos.y,
              duration: 350,
              delay: i * 50,
              ease: 'Power3.easeOut',
              onComplete: () => {
                // Re-render completely since face changed
                this.cardSprites.delete(c.id);
                sprite.destroy();
                const newSprite = this.createCardSprite(c, targetPos.x, targetPos.y);
                newSprite.sourceLocation = { type: 'cascade', index: i, cardIndex: newRow };
                newSprite.setDepth(newRow + 10);
              }
            });
          }
          i++;
        }
      } else {
        // Normal move
        soundManager.cardPlace();
        const startZ = 200; // Above other cards
        this.activeDragCards.forEach((sprite, index) => {
          sprite.setDepth(startZ + index);
        });

        // Only need to reposition because the state is already updated.
        // Instead of full reposition, let's just animate the moved cards and re-render the flipped card.

        // We need to re-render the whole board because Spider might complete a run and flip a card underneath
        this.invalidateOverlapCache();

        // Just rebuild all sprites cleanly, animated
        this.time.delayedCall(50, () => {
          this.recreateAllCardSprites();
          this.repositionAllCards();
        });
      }
    } catch (e) {
      console.error("Illegal move execution", e);
    }
  }

  // ===== DRAG PHYSICS (SIMPLIFIED SPRING SYSTEM) ===== //

  update(_time: number, delta: number): void {
    if (this.activeDragCards.length === 0) return;
    const dt = Math.min(delta / 1000, 0.05);

    if (this.isDragging && this.activeDragTarget) {
      const overlap = this.getCurrentOverlap();
      const targetX = this.activeDragTarget.x - this.activeDragOffsets.x;
      const targetY = this.activeDragTarget.y - this.activeDragOffsets.y;

      for (let i = 0; i < this.activeDragCards.length; i++) {
        const card = this.activeDragCards[i];
        const tx = targetX;
        const ty = targetY + i * overlap;

        if (!this.activeDragVelocities[i]) this.activeDragVelocities[i] = { x: 0, y: 0 };
        const vel = this.activeDragVelocities[i];

        // Spring
        const springX = -300 * (card.x - tx) - 28 * vel.x;
        const springY = -300 * (card.y - ty) - 28 * vel.y;
        vel.x += springX * dt; vel.y += springY * dt;
        card.x += vel.x * dt; card.y += vel.y * dt;
      }
      return;
    }

    if (this.isSettlingDrag && this.settleTargets.length === this.activeDragCards.length) {
      let allSettled = true;
      for (let i = 0; i < this.activeDragCards.length; i++) {
        const card = this.activeDragCards[i];
        const target = this.settleTargets[i];
        const vel = this.activeDragVelocities[i] || { x: 0, y: 0 };

        const springX = -180 * (card.x - target.x) - 22 * vel.x;
        const springY = -180 * (card.y - target.y) - 22 * vel.y;
        vel.x += springX * dt; vel.y += springY * dt;
        card.x += vel.x * dt; card.y += vel.y * dt;

        if (Math.abs(card.x - target.x) > 1 || Math.abs(card.y - target.y) > 1 || Math.abs(vel.x) > 10 || Math.abs(vel.y) > 10) {
          allSettled = false;
        }
      }
      if (allSettled) {
        this.isSettlingDrag = false;
        this.activeDragCards.forEach(c => { c.setScale(1); });
        if (this.pendingSettledMove) {
          this.executeMoveAndAnimate(this.pendingSettledMove.from, this.pendingSettledMove.to);
        }
        this.activeDragCards = [];
        this.pendingSettledMove = null;
      }
    }
  }

  // ===== INPUT SYSTEMS ===== //

  private getCascadeColumnAtPoint(x: number, y: number): number {
    const topRow = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    if (y < topRow - 10) return -1;

    for (let col = 0; col < 10; col++) {
      const cx = this.getColumnX(col);
      if (x >= cx - 5 && x <= cx + this.cardWidth + 5) return col;
    }
    return -1;
  }

  private isStockHit(x: number, y: number): boolean {
    const pos = this.getStockPosition();
    return x >= pos.x - 10 && x <= pos.x + this.cardWidth + 10 &&
      y >= pos.y - 10 && y <= pos.y + this.cardHeight + 10;
  }

  private tryStartDrag(x: number, y: number): void {
    if (this.isStockHit(x, y)) {
      // Check if stock is allowed to deal
      if (this.engine.isLegalMove({ type: 'stock' }, { type: 'cascade', index: 0 })) {
        this.executeMoveAndAnimate({ type: 'stock' }, { type: 'cascade', index: 0 });
      } else {
        soundManager.invalidMove();
      }
      return;
    }

    const col = this.getCascadeColumnAtPoint(x, y);
    if (col !== -1) {
      const cascade = this.engine.getState().cascades[col];
      if (cascade.length === 0) return;

      const topRow = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
      const overlap = this.getCurrentOverlap();
      let cardY = Math.floor((y - topRow) / Math.max(overlap, 1));

      const lastTop = topRow + (cascade.length - 1) * overlap;
      if (y > lastTop && y < lastTop + this.cardHeight) cardY = cascade.length - 1;

      cardY = Math.max(0, Math.min(cardY, cascade.length - 1));

      const run = this.engine.getValidRun(col);
      const runStart = cascade.length - run.length;
      if (cardY < runStart) cardY = runStart;

      for (let i = cardY; i < cascade.length; i++) {
        const sprite = this.cardSprites.get(cascade[i].id);
        if (sprite) {
          this.activeDragCards.push(sprite);
          this.activeDragVelocities.push({ x: 0, y: 0 });
          sprite.setDepth(1000 + i);
          sprite.setScale(1.08); // Lift effect
        }
      }

      if (this.activeDragCards.length > 0) {
        this.activeDragFrom = { type: 'cascade', index: col, cardIndex: cardY };
        this.activeDragOffsets = { x: x - this.activeDragCards[0].x, y: y - this.activeDragCards[0].y };
        this.activeDragTarget = { x, y };
        this.isDragging = true;
        soundManager.cardSelect();
      }
    }
  }

  private tryDropDrag(x: number, y: number): void {
    if (!this.activeDragFrom || this.activeDragCards.length === 0) return;

    const col = this.getCascadeColumnAtPoint(x, y);
    if (col !== -1) {
      const to: SpiderLocation = { type: 'cascade', index: col };
      if (this.engine.isLegalMove(this.activeDragFrom, to)) {
        this.pendingSettledMove = { from: this.activeDragFrom, to };
        this.isDragging = false;
        this.isSettlingDrag = true;

        const tgtRow = this.engine.getState().cascades[col].length;
        this.settleTargets = this.activeDragCards.map((_, i) => this.getCascadeCardPosition(col, tgtRow + i));
        return;
      }
    }
    // Invalid drop, snap back
    soundManager.invalidMove();
    this.isDragging = false;
    this.isSettlingDrag = true;
    if (this.activeDragFrom.type === 'cascade') {
      const cascadeStart = this.activeDragFrom as { type: 'cascade'; index: number; cardIndex: number };
      this.settleTargets = this.activeDragCards.map((_, i) => this.getCascadeCardPosition(cascadeStart.index, cascadeStart.cardIndex + i));
    }
  }

  private setupMouseDrag(): void {
    const canvas = this.game.canvas;
    let md = false;

    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      md = true;
      this.tryStartDrag(x, y);
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!md || !this.isDragging) return;
      const rect = canvas.getBoundingClientRect();
      this.activeDragTarget = {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
      };
    });

    canvas.addEventListener('mouseup', (e) => {
      if (!md) return;
      md = false;
      if (this.isDragging) {
        const rect = canvas.getBoundingClientRect();
        this.tryDropDrag(
          (e.clientX - rect.left) * (canvas.width / rect.width),
          (e.clientY - rect.top) * (canvas.height / rect.height)
        );
      }
    });
  }

  private setupTouchInput(): void {
    const canvas = this.game.canvas;

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      this.tryStartDrag(
        (e.touches[0].clientX - rect.left) * (canvas.width / rect.width),
        (e.touches[0].clientY - rect.top) * (canvas.height / rect.height)
      );
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.isDragging) return;
      const rect = canvas.getBoundingClientRect();
      this.activeDragTarget = {
        x: (e.touches[0].clientX - rect.left) * (canvas.width / rect.width),
        y: (e.touches[0].clientY - rect.top) * (canvas.height / rect.height)
      };
    }, { passive: false });

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (this.isDragging) {
        const rect = canvas.getBoundingClientRect();
        this.tryDropDrag(
          (e.changedTouches[0].clientX - rect.left) * (canvas.width / rect.width),
          (e.changedTouches[0].clientY - rect.top) * (canvas.height / rect.height)
        );
      }
    }, { passive: false });
  }
}
