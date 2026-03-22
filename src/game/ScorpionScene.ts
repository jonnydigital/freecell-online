import * as Phaser from 'phaser';
import { ScorpionEngine, ScorpionLocation, ScorpionMove } from '../engine/ScorpionEngine';
import { dealScorpionGame } from '../engine/Deck';
import { Card, Suit, Rank, SUIT_SYMBOLS } from '../engine/Card';
import { gameBridge } from './GameBridge';
import { getCardAssetKey, getCardBackAssetKey, getAllCardAssets } from './CardAssets';
import { soundManager } from '../lib/sounds';
import { GameSettings, loadSettings } from '../lib/storage';
import { ThemeDefinition, themes, getThemeById, hexToInt } from '../lib/themes';
import {
  CardStyleDefinition,
  DEFAULT_CARD_STYLE_ID,
  CARD_STYLE_STORAGE_KEY,
  getCardStyleById,
} from '../lib/cardStyles';

const CARD_RATIO = 1.4;
const MIN_CASCADE_OVERLAP_PX = 24;
const MAX_CASCADE_OVERLAP_FRAC = 0.75;
const SIDE_MARGIN = 0.025;
const GAP = 0.015;
const FACEDOWN_OVERLAP_FRAC = 0.22;

interface CardSprite extends Phaser.GameObjects.Container {
  cardData: Card;
  sourceLocation: ScorpionLocation;
}

export class ScorpionScene extends Phaser.Scene {
  private engine!: ScorpionEngine;
  private cardSprites: Map<string, CardSprite> = new Map();
  private gameNumber: number = 1;
  private settings!: GameSettings;
  private currentTheme: ThemeDefinition = themes[0];
  private currentCardStyle: CardStyleDefinition = getCardStyleById(DEFAULT_CARD_STYLE_ID);

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
  private activeDragFrom: ScorpionLocation | null = null;
  private activeDragTarget: { x: number; y: number } | null = null;
  private activeDragOffsets: { x: number; y: number } = { x: 0, y: 0 };
  private isDragging: boolean = false;
  private dragSource: 'touch' | 'mouse' | null = null;
  private activeDragVelocities: { x: number; y: number }[] = [];
  private lastDragPointerPosition: { x: number; y: number } | null = null;
  private settleTargets: { x: number; y: number }[] = [];
  private isSettlingDrag: boolean = false;
  private pendingSettledMove: { from: ScorpionLocation; to: ScorpionLocation } | null = null;

  // Tracked listeners
  private trackedDomListeners: Array<{ target: EventTarget; type: string; listener: EventListenerOrEventListenerObject; options?: AddEventListenerOptions | boolean }> = [];
  private bridgeUnsubscribers: Array<() => void> = [];
  private scaleResizeHandler: ((gameSize: Phaser.Structs.Size) => void) | null = null;
  private isTouchDevice: boolean = false;

  // Deal animation guard
  private isDealAnimating: boolean = false;
  private pendingResize: boolean = false;

  // Visuals
  private vignette: Phaser.GameObjects.Graphics | null = null;
  private feltNoise: Phaser.GameObjects.Graphics | null = null;
  private slotGraphics: Phaser.GameObjects.GameObject[] = [];

  // Reserve indicator objects
  private reserveIndicatorObjects: Phaser.GameObjects.GameObject[] = [];

  constructor() {
    super({ key: 'ScorpionScene' });
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
    const { tableau, reserve } = dealScorpionGame(this.gameNumber);
    this.engine = new ScorpionEngine(this.gameNumber, tableau, reserve);
    this.settings = loadSettings();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);

    const storedThemeId = localStorage.getItem('theme-id');
    if (storedThemeId) {
      this.currentTheme = getThemeById(storedThemeId);
    }
    const storedCardStyleId = localStorage.getItem(CARD_STYLE_STORAGE_KEY);
    if (storedCardStyleId) {
      this.currentCardStyle = getCardStyleById(storedCardStyleId);
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
      if (this.isDealAnimating) {
        this.pendingResize = true;
        return;
      }
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

    // Listen for new game requests
    const unsubNewGame = gameBridge.on('newGame', (data: unknown) => {
      const num = typeof data === 'number' ? data : Math.floor(Math.random() * 9999999) + 1;
      this.restartWithNewGame(num);
    });
    this.bridgeUnsubscribers.push(unsubNewGame);

    // Listen for undo
    const unsubUndo = gameBridge.on('undo', () => {
      this.handleUndo();
    });
    this.bridgeUnsubscribers.push(unsubUndo);

    // Listen for hint
    const unsubHint = gameBridge.on('hint', () => {
      const hint = this.engine.getHint();
      if (hint) {
        if (hint.isReserveDeal) {
          // Hint suggests dealing reserve
          this.handleDealReserve();
        } else {
          gameBridge.emit('hintResult', { hint });
          this.flashHintCards(hint);
        }
      } else {
        soundManager.invalidMove();
      }
    });
    this.bridgeUnsubscribers.push(unsubHint);

    // Listen for auto finish
    const unsubAutoFinish = gameBridge.on('autoFinish', () => {
      this.autoFinish();
    });
    this.bridgeUnsubscribers.push(unsubAutoFinish);

    const unsubThemeChanged = gameBridge.on('themeChanged', (themeData: unknown) => {
      if (
        themeData &&
        typeof themeData === 'object' &&
        'theme' in themeData &&
        'cardStyle' in themeData
      ) {
        const appearance = themeData as { theme: ThemeDefinition; cardStyle: CardStyleDefinition };
        this.currentTheme = appearance.theme;
        this.currentCardStyle = appearance.cardStyle;
      } else {
        this.currentTheme = themeData as ThemeDefinition;
      }
      this.cameras.main.setBackgroundColor(hexToInt(this.currentTheme.feltColor));
      this.drawBackgroundEffects();
      this.rebuildBoard();
      this.recreateAllCardSprites();
      this.repositionAllCards();
    });
    this.bridgeUnsubscribers.push(unsubThemeChanged);

    const unsubUpdateSettings = gameBridge.on('updateSettings', (newSettings: unknown) => {
      const prev = this.settings;
      this.settings = newSettings as GameSettings;
      if (prev?.largeCards !== this.settings.largeCards) {
        this.calculateLayout();
        this.invalidateOverlapCache();
        this.refreshCanvasMetrics();
        this.rebuildBoard();
        this.recreateAllCardSprites();
        this.repositionAllCards();
      }
    });
    this.bridgeUnsubscribers.push(unsubUpdateSettings);

    if (this.isTouchDevice) {
      this.setupTouchInput();
    } else {
      this.setupMouseDrag();
    }
  }

  private restartWithNewGame(gameNumber: number): void {
    this.cleanupWinCelebration();
    for (const sprite of this.cardSprites.values()) {
      sprite.destroy();
    }
    this.cardSprites.clear();
    this.activeDragCards = [];
    this.activeDragFrom = null;
    this.isDragging = false;
    this.isSettlingDrag = false;
    this.pendingSettledMove = null;
    this.isDealAnimating = false;
    this.pendingResize = false;
    this.invalidateOverlapCache();

    this.gameNumber = gameNumber;
    const { tableau, reserve } = dealScorpionGame(this.gameNumber);
    this.engine = new ScorpionEngine(this.gameNumber, tableau, reserve);

    this.rebuildBoard();
    this.dealCards(true);

    gameBridge.emit('gameReady', { gameNumber: this.gameNumber });
  }

  private shutdown(): void {
    this.cleanupWinCelebration();
    this.isDealAnimating = false;
    this.pendingResize = false;
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

    const largeCardsScale = this.settings?.largeCards ? 1.3 : 1.0;

    // 7 columns for Scorpion
    const usableWidth = w * (1 - 2 * SIDE_MARGIN);
    const gapPx = w * GAP;
    const cardWidthFromWidth = Math.floor(((usableWidth - 6 * gapPx) / 7) * largeCardsScale);
    const cardHeightFromWidth = Math.floor(cardWidthFromWidth * CARD_RATIO);

    const topPad = Math.max(Math.floor(h * 0.005), 2);
    this.cascadeGap = Math.floor(h * 0.01);

    const vertBudget = h - topPad - this.cascadeGap - 4;
    const maxCardHeight = Math.floor((vertBudget - 6 * MIN_CASCADE_OVERLAP_PX) / 2);

    if (this.isPortrait) {
      this.cardHeight = cardHeightFromWidth;
      this.cardWidth = cardWidthFromWidth;
    } else {
      this.cardHeight = Math.min(cardHeightFromWidth, maxCardHeight);
      this.cardWidth = this.cardHeight === cardHeightFromWidth ? cardWidthFromWidth : Math.floor(this.cardHeight / CARD_RATIO);
    }

    this.boardOffsetX = Math.floor((w - (7 * this.cardWidth + 6 * gapPx)) / 2);
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
    const maxCascadeLength = Math.max(...state.tableau.map(c => c.length), 1);
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

  private getCardOverlapForRow(card: Card): number {
    if (!card.isFaceUp) {
      return Math.max(MIN_CASCADE_OVERLAP_PX * 0.6, Math.floor(this.cardHeight * FACEDOWN_OVERLAP_FRAC));
    }
    return this.getCurrentOverlap();
  }

  private getCascadeCardY(col: number, row: number): number {
    const state = this.engine.getState();
    const cascade = state.tableau[col];
    let y = this.boardOffsetY + this.topRowHeight + this.cascadeGap;

    for (let i = 0; i < row; i++) {
      y += this.getCardOverlapForRow(cascade[i]);
    }
    return y;
  }

  private getCascadeCardPosition(col: number, row: number): { x: number; y: number } {
    return { x: this.getColumnX(col), y: this.getCascadeCardY(col, row) };
  }

  private getReservePosition(): { x: number; y: number } {
    return { x: this.getColumnX(0), y: this.boardOffsetY };
  }

  // ===== RENDERING =====

  private createBoard(): void { this.drawSlots(); }
  private rebuildBoard(): void { this.drawSlots(); }

  private drawSlots(): void {
    this.slotGraphics.forEach(g => g.destroy());
    this.slotGraphics = [];

    // No foundation slots in Scorpion - just draw the reserve indicator
    this.drawReserveIndicator();
  }

  private drawReserveIndicator(): void {
    // Clear existing reserve indicator objects
    for (const obj of this.reserveIndicatorObjects) {
      if (obj && 'destroy' in obj) {
        try { (obj as Phaser.GameObjects.GameObject).destroy(); } catch { /* already destroyed */ }
      }
    }
    this.reserveIndicatorObjects = [];

    const pos = this.getReservePosition();
    const state = this.engine.getState();
    const reserveCount = state.reserve.length;

    if (reserveCount > 0) {
      // Draw stacked card backs to show reserve
      const stackOffset = 3;
      for (let i = 0; i < Math.min(reserveCount, 3); i++) {
        const backKey = getCardBackAssetKey(this.currentCardStyle.id);
        if (this.textures.exists(backKey)) {
          const shadow = this.add.graphics();
          shadow.fillStyle(0x000000, 0.16);
          shadow.fillRoundedRect(pos.x + i * stackOffset + 3, pos.y + i * stackOffset + 4, this.cardWidth, this.cardHeight, 10);
          shadow.setDepth(4 + i);
          this.reserveIndicatorObjects.push(shadow);

          const img = this.add.image(
            pos.x + i * stackOffset + this.cardWidth / 2,
            pos.y + i * stackOffset + this.cardHeight / 2,
            backKey
          );
          img.setScale(Math.min(this.cardWidth / img.width, this.cardHeight / img.height));
          img.setDepth(5 + i);
          this.reserveIndicatorObjects.push(img);
        } else {
          // Fallback: draw a colored rectangle
          const gfx = this.add.graphics();
          gfx.fillStyle(0x1a3a5c, 1);
          gfx.fillRoundedRect(pos.x + i * stackOffset, pos.y + i * stackOffset, this.cardWidth, this.cardHeight, 10);
          gfx.lineStyle(1.5, 0x000000, 0.12);
          gfx.strokeRoundedRect(pos.x + i * stackOffset, pos.y + i * stackOffset, this.cardWidth, this.cardHeight, 10);
          gfx.setDepth(5 + i);
          this.reserveIndicatorObjects.push(gfx);
        }
      }

      // Count text overlay
      const countText = this.add.text(
        pos.x + this.cardWidth / 2 + (Math.min(reserveCount, 3) - 1) * stackOffset / 2,
        pos.y + this.cardHeight / 2 + (Math.min(reserveCount, 3) - 1) * stackOffset / 2,
        `${reserveCount}`,
        {
          fontSize: `${Math.floor(this.cardWidth * 0.45)}px`,
          color: '#ffffff',
          fontFamily: 'Georgia, ui-serif, serif',
          fontStyle: 'bold',
          stroke: '#000000',
          strokeThickness: 3,
        }
      );
      countText.setOrigin(0.5);
      countText.setDepth(8);
      this.reserveIndicatorObjects.push(countText);
    } else {
      // Empty reserve - draw an empty slot with X
      const slotColor = hexToInt(this.currentTheme.feltNoiseLight);
      const graphics = this.add.graphics();
      graphics.lineStyle(2, slotColor, 0.8);
      graphics.strokeRoundedRect(pos.x, pos.y, this.cardWidth, this.cardHeight, 6);
      this.reserveIndicatorObjects.push(graphics);

      const text = this.add.text(pos.x + this.cardWidth / 2, pos.y + this.cardHeight / 2, '\u00d7', {
        fontSize: `${Math.floor(this.cardWidth * 0.4)}px`,
        color: this.currentTheme.feltNoiseLight,
        fontFamily: 'serif',
      });
      text.setOrigin(0.5);
      this.reserveIndicatorObjects.push(text);
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

  private getCardTextureKey(card: Card): string | null {
    if (!card.isFaceUp) {
      return getCardBackAssetKey(this.currentCardStyle.id);
    }

    if (this.currentCardStyle.renderer === 'image') {
      return getCardAssetKey(card.suit, card.rank, this.currentCardStyle.id);
    }

    return null;
  }

  private createCardSprite(card: Card, x: number, y: number): CardSprite {
    const container = this.add.container(x, y) as CardSprite;
    container.setSize(this.cardWidth, this.cardHeight);
    container.cardData = card;
    this.renderCardSpriteContents(container);

    this.cardSprites.set(card.id, container);
    return container;
  }

  private renderProceduralCardFace(container: CardSprite, card: Card): void {
    const base = this.add.graphics();
    base.fillStyle(0xffffff, 1);
    base.fillRoundedRect(0, 0, this.cardWidth, this.cardHeight, 10);
    base.lineStyle(1.5, 0x000000, 0.12);
    base.strokeRoundedRect(0, 0, this.cardWidth, this.cardHeight, 10);
    container.add(base);

    const isRed = (card.suit === Suit.Hearts || card.suit === Suit.Diamonds);
    const colorStr = isRed ? '#c1121f' : '#111827';
    const rankMap: Record<number, string> = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' };
    const rankStr = rankMap[card.rank] || card.rank.toString();
    const fontSize = Math.floor(this.cardWidth * 0.3);
    const text = this.add.text(this.cardWidth * 0.16, this.cardHeight * 0.05, rankStr, {
      fontSize: `${fontSize}px`,
      color: colorStr,
      fontFamily: 'Georgia, ui-serif, serif',
      fontStyle: 'bold'
    });
    text.setOrigin(0.5, 0);
    container.add(text);

    const suitMap: Record<string, string> = {
      [Suit.Hearts as string]: 'suit_heart',
      [Suit.Spades as string]: 'suit_spade',
      [Suit.Diamonds as string]: 'suit_diamond',
      [Suit.Clubs as string]: 'suit_club'
    };
    const smallSuitSz = this.cardWidth * 0.2;
    const suitY = this.cardHeight * 0.05 + fontSize;
    const smallSuit = this.add.image(this.cardWidth * 0.16, suitY + (smallSuitSz / 2), suitMap[card.suit as string]);
    smallSuit.setDisplaySize(smallSuitSz, smallSuitSz);
    container.add(smallSuit);

    const bigSuitSz = this.cardWidth * 0.48;
    const suitImg = this.add.image(this.cardWidth / 2, this.cardHeight * 0.54, suitMap[card.suit as string]);
    suitImg.setDisplaySize(bigSuitSz, bigSuitSz);
    container.add(suitImg);
  }

  private renderCardSpriteContents(container: CardSprite): void {
    const card = container.cardData;

    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.16);
    shadow.fillRoundedRect(3, 4, this.cardWidth, this.cardHeight, 10);
    container.add(shadow);

    const textureKey = this.getCardTextureKey(card);
    if (textureKey && this.textures.exists(textureKey)) {
      const img = this.add.image(this.cardWidth / 2, this.cardHeight / 2, textureKey);
      img.setScale(Math.min(this.cardWidth / img.width, this.cardHeight / img.height));
      container.add(img);
      return;
    }

    if (!card.isFaceUp) {
      const fallbackBack = getCardBackAssetKey(DEFAULT_CARD_STYLE_ID);
      if (this.textures.exists(fallbackBack)) {
        const img = this.add.image(this.cardWidth / 2, this.cardHeight / 2, fallbackBack);
        img.setScale(Math.min(this.cardWidth / img.width, this.cardHeight / img.height));
        container.add(img);
      }
      return;
    }

    this.renderProceduralCardFace(container, card);
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

    // Tableau cards
    for (let col = 0; col < 7; col++) {
      const cascade = state.tableau[col];
      for (let row = 0; row < cascade.length; row++) {
        const sprite = this.cardSprites.get(cascade[row].id);
        if (sprite) {
          const pos = this.getCascadeCardPosition(col, row);
          sprite.x = pos.x; sprite.y = pos.y;
          sprite.sourceLocation = { type: 'tableau', index: col, cardIndex: row };
          sprite.setDepth(row + 10);
        }
      }
    }

    // Update reserve indicator
    this.drawReserveIndicator();
  }

  private dealCards(staggered: boolean = false): void {
    const state = this.engine.getState();
    const w = this.scale.width;
    let dealIndex = 0;
    let lastDealDelay = 0;
    if (staggered) {
      this.isDealAnimating = true;
      this.pendingResize = false;
    }

    // Deal tableau cards
    for (let col = 0; col < 7; col++) {
      const cascade = state.tableau[col];
      for (let row = 0; row < cascade.length; row++) {
        const card = cascade[row];
        const pos = this.getCascadeCardPosition(col, row);

        if (staggered) {
          const sprite = this.createCardSprite(card, w / 2 - this.cardWidth / 2, -this.cardHeight);
          sprite.sourceLocation = { type: 'tableau', index: col, cardIndex: row };
          sprite.setDepth(500 + dealIndex);
          sprite.setScale(0.94);
          sprite.alpha = 0;

          const delay = dealIndex * 18;
          lastDealDelay = delay;
          this.tweens.add({
            targets: sprite,
            x: pos.x,
            y: pos.y,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            duration: 240,
            delay,
            ease: 'Cubic.easeOut',
          });

          this.time.delayedCall(delay + 150, () => {
            soundManager.cardSelect();
            sprite.setDepth(row + 10);
          });
          dealIndex++;
        } else {
          const sprite = this.createCardSprite(card, pos.x, pos.y);
          sprite.sourceLocation = { type: 'tableau', index: col, cardIndex: row };
          sprite.setDepth(row + 10);
        }
      }
    }

    // Draw reserve indicator
    this.drawReserveIndicator();

    // Clear deal animation flag after all tweens complete
    if (staggered) {
      const totalDealDuration = lastDealDelay + 240 + 50;
      this.time.delayedCall(totalDealDuration, () => {
        this.isDealAnimating = false;
        if (this.pendingResize && this.scaleResizeHandler) {
          this.pendingResize = false;
          this.scaleResizeHandler(this.scale.gameSize);
        }
      });
    }
  }

  private animateDraggedCardsToTargets(
    targets: Array<{ x: number; y: number }>,
    onComplete: () => void
  ): void {
    if (this.activeDragCards.length === 0) {
      onComplete();
      return;
    }

    let completed = 0;
    const total = this.activeDragCards.length;

    for (let i = 0; i < this.activeDragCards.length; i++) {
      const card = this.activeDragCards[i];
      const target = targets[i] ?? targets[targets.length - 1];
      if (!target) continue;

      this.tweens.killTweensOf(card);
      this.tweens.add({
        targets: card,
        x: target.x,
        y: target.y,
        angle: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 135 + i * 10,
        ease: 'Cubic.easeOut',
        onComplete: () => {
          completed++;
          if (completed === total) {
            onComplete();
          }
        }
      });
    }
  }

  private isPointWithinCardBounds(
    x: number,
    y: number,
    left: number,
    top: number,
    width: number,
    height: number,
    padX: number = 10,
    padY: number = 8
  ): boolean {
    return (
      x >= left - padX &&
      x <= left + width + padX &&
      y >= top - padY &&
      y <= top + height + padY
    );
  }

  private getCascadePickupIndexAtPoint(col: number, x: number, y: number): number {
    const cascade = this.engine.getState().tableau[col];
    if (cascade.length === 0) return -1;

    // In Scorpion, any face-up card can be picked up (with all cards below)
    const firstFaceUp = cascade.findIndex(c => c.isFaceUp);
    if (firstFaceUp === -1) return -1;

    for (let i = cascade.length - 1; i >= firstFaceUp; i--) {
      const sprite = this.cardSprites.get(cascade[i].id);
      if (!sprite) continue;

      const overlap = i < cascade.length - 1 ? this.getCardOverlapForRow(cascade[i]) : this.cardHeight;
      const hitHeight = Math.min(this.cardHeight, overlap + 18);

      if (this.isPointWithinCardBounds(x, y, sprite.x, sprite.y, this.cardWidth, hitHeight)) {
        return i;
      }
    }

    return -1;
  }

  // ===== ENGINE INTERACTION & ANIMATION =====

  private handleDealReserve(): void {
    const state = this.engine.getState();
    if (state.reserve.length === 0) {
      soundManager.invalidMove();
      return;
    }

    const move = this.engine.dealReserve();
    if (!move) {
      soundManager.invalidMove();
      return;
    }

    soundManager.cardPlace();
    this.invalidateOverlapCache();

    // Animate the dealt cards from reserve position to their columns
    if (move.reserveCards) {
      const reservePos = this.getReservePosition();
      for (let i = 0; i < move.reserveCards.length; i++) {
        const card = move.reserveCards[i];
        const col = this.engine.getState().tableau[i];
        const row = col.length - 1;
        const targetPos = this.getCascadeCardPosition(i, row);

        // Create sprite at reserve position and animate to target
        const sprite = this.createCardSprite(card, reservePos.x, reservePos.y);
        sprite.sourceLocation = { type: 'tableau', index: i, cardIndex: row };
        sprite.setDepth(500 + i);
        sprite.setScale(0.94);

        this.tweens.add({
          targets: sprite,
          x: targetPos.x,
          y: targetPos.y,
          scaleX: 1,
          scaleY: 1,
          duration: 250,
          delay: i * 80,
          ease: 'Cubic.easeOut',
          onComplete: () => {
            sprite.setDepth(row + 10);
          }
        });

        this.time.delayedCall(i * 80 + 100, () => {
          soundManager.cardSelect();
        });
      }
    }

    // After animation completes, check for completed run and update display
    this.time.delayedCall(400, () => {
      if (move.completedRun) {
        this.animateCompletedRun(move.completedRun.suit, move.completedRun.cards, () => {
          this.recreateAllCardSprites();
          this.repositionAllCards();
          this.checkPostMoveState();
        });
      } else {
        this.recreateAllCardSprites();
        this.repositionAllCards();
        this.checkPostMoveState();
      }

      gameBridge.emit('moveExecuted', {
        moveCount: this.engine.getMoveCount(),
        gameNumber: this.gameNumber,
      });
    });
  }

  private executeMoveAndAnimate(from: ScorpionLocation, to: ScorpionLocation): void {
    try {
      const move = this.engine.executeMove(from, to);
      soundManager.cardPlace();

      this.invalidateOverlapCache();

      if (move.completedRun) {
        // A K->A same-suit run was completed and removed
        this.time.delayedCall(50, () => {
          this.animateCompletedRun(move.completedRun!.suit, move.completedRun!.cards, () => {
            this.recreateAllCardSprites();
            this.repositionAllCards();
            this.checkPostMoveState();
          });

          gameBridge.emit('moveExecuted', {
            moveCount: this.engine.getMoveCount(),
            gameNumber: this.gameNumber,
          });
        });
      } else {
        this.time.delayedCall(50, () => {
          this.recreateAllCardSprites();
          this.repositionAllCards();

          gameBridge.emit('moveExecuted', {
            moveCount: this.engine.getMoveCount(),
            gameNumber: this.gameNumber,
          });

          this.checkPostMoveState();
        });
      }
    } catch (e) {
      console.error("Illegal move execution", e);
    }
  }

  private checkPostMoveState(): void {
    if (this.engine.isAutoCompletable()) {
      gameBridge.emit('autoCompletable', { completable: true });
    }

    if (this.engine.getState().isWon) {
      this.handleWin();
      return;
    }

    if (this.engine.isDeadlocked()) {
      gameBridge.emit('deadlock', {
        gameNumber: this.gameNumber,
        moveCount: this.engine.getMoveCount(),
      });
    }
  }

  private animateCompletedRun(suit: Suit, cards: Card[], onComplete: () => void): void {
    soundManager.cardToFoundation(13);

    const w = this.scale.width;
    const h = this.scale.height;
    const centerX = w / 2;
    const centerY = h / 2;

    const suitSymbol = SUIT_SYMBOLS[suit] || suit;

    // Flash and gather the card sprites
    const runSprites: CardSprite[] = [];
    for (const card of cards) {
      const sprite = this.cardSprites.get(card.id);
      if (sprite) {
        runSprites.push(sprite);
        sprite.setDepth(4000);
      }
    }

    // Phase 1: Flash highlight the cards
    for (const sprite of runSprites) {
      this.tweens.add({
        targets: sprite,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 150,
        yoyo: true,
        ease: 'Sine.easeInOut',
      });
    }

    // Phase 2: Fly cards to center with rotation
    this.time.delayedCall(300, () => {
      let completed = 0;

      for (let i = 0; i < runSprites.length; i++) {
        const sprite = runSprites[i];
        this.tweens.add({
          targets: sprite,
          x: centerX - this.cardWidth / 2,
          y: centerY - this.cardHeight / 2,
          scaleX: 0.5,
          scaleY: 0.5,
          alpha: 0,
          angle: 360 + Math.random() * 180,
          duration: 400,
          delay: i * 25,
          ease: 'Cubic.easeIn',
          onComplete: () => {
            sprite.destroy();
            this.cardSprites.delete(cards[i].id);
            completed++;
            if (completed === runSprites.length) {
              // Phase 3: Show completion text
              this.showRunCompleteText(suitSymbol, centerX, centerY, onComplete);
            }
          }
        });
      }

      // Sparkle effect
      this.spawnRunSparkles(centerX, centerY);
    });
  }

  private showRunCompleteText(suitSymbol: string, cx: number, cy: number, onComplete: () => void): void {
    const text = this.add.text(cx, cy, `${suitSymbol} Complete!`, {
      fontSize: `${Math.floor(this.cardWidth * 0.6)}px`,
      color: '#ffffff',
      fontFamily: 'Georgia, ui-serif, serif',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4,
    });
    text.setOrigin(0.5);
    text.setDepth(5000);
    text.setScale(0.5);
    text.alpha = 0;

    this.tweens.add({
      targets: text,
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      duration: 300,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.tweens.add({
          targets: text,
          alpha: 0,
          scaleX: 1.3,
          scaleY: 1.3,
          duration: 500,
          delay: 600,
          ease: 'Cubic.easeIn',
          onComplete: () => {
            text.destroy();
            onComplete();
          }
        });
      }
    });
  }

  private spawnRunSparkles(cx: number, cy: number): void {
    const sparkleColors = [0xffd700, 0xff4444, 0x44ff44, 0x4444ff, 0xff44ff, 0xffaa00];
    for (let i = 0; i < 20; i++) {
      const gfx = this.add.graphics();
      const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      gfx.fillStyle(color, 1);
      gfx.fillCircle(0, 0, 2 + Math.random() * 3);
      gfx.setPosition(cx, cy);
      gfx.setDepth(4500);

      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 150;
      const targetX = cx + Math.cos(angle) * distance;
      const targetY = cy + Math.sin(angle) * distance;

      this.tweens.add({
        targets: gfx,
        x: targetX,
        y: targetY,
        alpha: 0,
        duration: 600 + Math.random() * 400,
        delay: Math.random() * 200,
        ease: 'Cubic.easeOut',
        onComplete: () => gfx.destroy(),
      });
    }
  }

  private handleUndo(): void {
    const move = this.engine.undoLastMove();
    if (!move) return;

    soundManager.undo();
    this.invalidateOverlapCache();
    this.recreateAllCardSprites();
    this.repositionAllCards();

    gameBridge.emit('moveExecuted', {
      moveCount: this.engine.getMoveCount(),
      gameNumber: this.gameNumber,
    });
  }

  private winCelebrationActive: boolean = false;
  private winCelebrationObjects: Phaser.GameObjects.GameObject[] = [];

  private handleWin(): void {
    soundManager.winFanfare();
    gameBridge.emit('gameWon', {
      time: 0,
      moves: this.engine.getMoveCount(),
    });
    this.time.delayedCall(400, () => this.winCelebration());
  }

  private winCelebration(): void {
    this.winCelebrationActive = true;

    const w = this.scale.width;
    const h = this.scale.height;

    // Show big "YOU WIN!" text
    const winText = this.add.text(w / 2, h / 2, 'YOU WIN!', {
      fontSize: `${Math.floor(w * 0.1)}px`,
      color: '#ffd700',
      fontFamily: 'Georgia, ui-serif, serif',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6,
    });
    winText.setOrigin(0.5);
    winText.setDepth(5000);
    winText.setScale(0);
    winText.alpha = 0;
    this.winCelebrationObjects.push(winText);

    this.tweens.add({
      targets: winText,
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      duration: 500,
      ease: 'Back.easeOut',
    });

    // Pulse the win text
    this.tweens.add({
      targets: winText,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 800,
      yoyo: true,
      repeat: -1,
      delay: 500,
      ease: 'Sine.easeInOut',
    });

    // Spawn confetti
    this.spawnConfetti();
  }

  private spawnConfetti(): void {
    const w = this.scale.width;
    const h = this.scale.height;
    const confettiColors = [0xffd700, 0xff4444, 0x44ff44, 0x4444ff, 0xff44ff, 0xffaa00, 0x00ffff, 0xff8800];

    for (let wave = 0; wave < 4; wave++) {
      this.time.delayedCall(wave * 800, () => {
        if (!this.winCelebrationActive) return;

        for (let i = 0; i < 30; i++) {
          const gfx = this.add.graphics();
          const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
          const pw = 3 + Math.random() * 6;
          const ph = pw * (0.5 + Math.random());
          gfx.fillStyle(color, 1);
          gfx.fillRect(-pw / 2, -ph / 2, pw, ph);

          const startX = Math.random() * w;
          const startY = -10 - Math.random() * 50;
          gfx.setPosition(startX, startY);
          gfx.setDepth(3000);
          this.winCelebrationObjects.push(gfx);

          const drift = (Math.random() - 0.5) * 100;
          const duration = 2000 + Math.random() * 2000;

          this.tweens.add({
            targets: gfx,
            x: startX + drift,
            y: h + 20,
            angle: 360 + Math.random() * 720,
            duration,
            ease: 'Sine.easeIn',
            onComplete: () => gfx.destroy(),
          });
        }
      });
    }
  }

  private cleanupWinCelebration(): void {
    this.winCelebrationActive = false;
    for (const obj of this.winCelebrationObjects) {
      if (obj && 'destroy' in obj) {
        try { (obj as Phaser.GameObjects.GameObject).destroy(); } catch { /* already destroyed */ }
      }
    }
    this.winCelebrationObjects = [];
  }

  private autoFinish(): void {
    // In Scorpion, auto-finish means automatically making moves that complete runs
    // when all cards are face-up and no reserve remains
    if (!this.engine.isAutoCompletable()) return;

    const doStep = () => {
      const state = this.engine.getState();
      if (state.isWon) {
        this.handleWin();
        return;
      }

      // Try to find a move that would complete a run or build toward completion
      let moved = false;
      for (let fromCol = 0; fromCol < 7; fromCol++) {
        const col = state.tableau[fromCol];
        if (col.length === 0) continue;

        for (let cardIdx = 0; cardIdx < col.length; cardIdx++) {
          const card = col[cardIdx];
          if (!card.isFaceUp) continue;

          for (let toCol = 0; toCol < 7; toCol++) {
            if (fromCol === toCol) continue;
            const from: ScorpionLocation = { type: 'tableau', index: fromCol, cardIndex: cardIdx };
            const to: ScorpionLocation = { type: 'tableau', index: toCol };
            if (this.engine.isLegalMove(from, to)) {
              const move = this.engine.executeMove(from, to);
              soundManager.cardPlace();
              moved = true;

              this.invalidateOverlapCache();

              if (move.completedRun) {
                soundManager.cardToFoundation(13);
              }

              this.recreateAllCardSprites();
              this.repositionAllCards();

              gameBridge.emit('moveExecuted', {
                moveCount: this.engine.getMoveCount(),
                gameNumber: this.gameNumber,
              });

              if (this.engine.getState().isWon) {
                this.handleWin();
                return;
              }

              this.time.delayedCall(150, doStep);
              return;
            }
          }
        }
      }

      if (!moved) {
        // No more auto moves available
        if (this.engine.isDeadlocked()) {
          gameBridge.emit('deadlock', {
            gameNumber: this.gameNumber,
            moveCount: this.engine.getMoveCount(),
          });
        }
      }
    };
    doStep();
  }

  private flashHintCards(hint: ScorpionMove): void {
    for (const card of hint.cards) {
      const sprite = this.cardSprites.get(card.id);
      if (sprite) {
        this.tweens.add({
          targets: sprite,
          scaleX: 1.08,
          scaleY: 1.08,
          duration: 200,
          yoyo: true,
          repeat: 1,
          ease: 'Sine.easeInOut',
        });
      }
    }
  }

  // ===== DRAG PHYSICS =====

  update(_time: number, delta: number): void {
    if (this.activeDragCards.length === 0) return;
    const dt = Math.min(delta / 1000, 0.05);

    if (this.isDragging && this.activeDragTarget) {
      const overlap = this.getCurrentOverlap();
      const targetX = this.activeDragTarget.x - this.activeDragOffsets.x;
      const targetY = this.activeDragTarget.y - this.activeDragOffsets.y;
      const lastPointer = this.lastDragPointerPosition ?? this.activeDragTarget;
      const pointerVelocityX = (this.activeDragTarget.x - lastPointer.x) / Math.max(dt, 1 / 120);
      const targetAngle = Phaser.Math.Clamp(pointerVelocityX * 0.012, -4.5, 4.5);

      for (let i = 0; i < this.activeDragCards.length; i++) {
        const card = this.activeDragCards[i];
        card.x = targetX;
        card.y = targetY + i * overlap;
        card.angle = Phaser.Math.Linear(card.angle, targetAngle, Math.min(1, dt * 18));
      }
      this.lastDragPointerPosition = { ...this.activeDragTarget };
      return;
    }
  }

  // ===== INPUT SYSTEMS =====

  private getCascadeColumnAtPoint(x: number, y: number): number {
    const topRow = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    if (y < topRow - 10) return -1;

    for (let col = 0; col < 7; col++) {
      const cx = this.getColumnX(col);
      if (x >= cx - 5 && x <= cx + this.cardWidth + 5) return col;
    }
    return -1;
  }

  private isPointOnReserve(x: number, y: number): boolean {
    const pos = this.getReservePosition();
    return (
      x >= pos.x - 5 && x <= pos.x + this.cardWidth + 15 &&
      y >= pos.y - 5 && y <= pos.y + this.cardHeight + 5
    );
  }

  private tryStartDrag(x: number, y: number): void {
    // Check if clicking on reserve indicator
    if (this.isPointOnReserve(x, y)) {
      // Don't start drag on reserve, handle via tap
      return;
    }

    // Check cascade card drag
    const col = this.getCascadeColumnAtPoint(x, y);
    if (col !== -1) {
      const cascade = this.engine.getState().tableau[col];
      if (cascade.length === 0) return;
      const cardY = this.getCascadePickupIndexAtPoint(col, x, y);
      if (cardY === -1) return;

      for (let i = cardY; i < cascade.length; i++) {
        const sprite = this.cardSprites.get(cascade[i].id);
        if (sprite) {
          this.activeDragCards.push(sprite);
          this.activeDragVelocities.push({ x: 0, y: 0 });
          sprite.setDepth(5000 + i);
          this.tweens.killTweensOf(sprite);
          sprite.setScale(1.04);
        }
      }

      if (this.activeDragCards.length > 0) {
        this.activeDragFrom = { type: 'tableau', index: col, cardIndex: cardY };
        this.activeDragOffsets = { x: x - this.activeDragCards[0].x, y: y - this.activeDragCards[0].y };
        this.activeDragTarget = { x, y };
        this.lastDragPointerPosition = { x, y };
        this.isDragging = true;
        soundManager.cardSelect();
      }
    }
  }

  private tryDropDrag(x: number, y: number): void {
    if (!this.activeDragFrom || this.activeDragCards.length === 0) return;

    // Scorpion has no foundations — only cascade-to-cascade drops
    const col = this.getCascadeColumnAtPoint(x, y);
    if (col !== -1) {
      const to: ScorpionLocation = { type: 'tableau', index: col };
      if (this.engine.isLegalMove(this.activeDragFrom, to)) {
        this.pendingSettledMove = { from: this.activeDragFrom, to };
        this.isDragging = false;
        this.isSettlingDrag = true;
        const tgtRow = this.engine.getState().tableau[col].length;
        this.settleTargets = this.activeDragCards.map((_, i) => this.getCascadeCardPosition(col, tgtRow + i));
        this.lastDragPointerPosition = null;
        this.animateDraggedCardsToTargets(this.settleTargets, () => {
          this.isSettlingDrag = false;
          if (this.pendingSettledMove) {
            this.executeMoveAndAnimate(this.pendingSettledMove.from, this.pendingSettledMove.to);
          }
          this.activeDragCards = [];
          this.pendingSettledMove = null;
        });
        return;
      }
    }

    // Invalid drop, snap back
    soundManager.invalidMove();
    this.isDragging = false;
    this.isSettlingDrag = true;

    if (this.activeDragFrom.type === 'tableau') {
      const tableauFrom = this.activeDragFrom as { type: 'tableau'; index: number; cardIndex: number };
      this.settleTargets = this.activeDragCards.map((_, i) => this.getCascadeCardPosition(tableauFrom.index, (tableauFrom.cardIndex ?? 0) + i));
    } else {
      this.settleTargets = this.activeDragCards.map(c => ({ x: c.x, y: c.y }));
    }

    this.lastDragPointerPosition = null;
    this.animateDraggedCardsToTargets(this.settleTargets, () => {
      this.isSettlingDrag = false;
      this.activeDragCards.forEach((card) => {
        card.setScale(1);
        card.angle = 0;
      });
      this.activeDragCards = [];
      this.pendingSettledMove = null;
    });
  }

  // Tap handling for reserve deal
  private lastTapTime: number = 0;
  private lastTapCardId: string | null = null;

  private handleTapOrDoubleTap(x: number, y: number): void {
    // Check if tapping on reserve indicator
    if (this.isPointOnReserve(x, y)) {
      this.handleDealReserve();
      return;
    }

    // Regular tap — no double-tap-to-foundation in Scorpion
    this.lastTapCardId = null;
    this.lastTapTime = 0;
  }

  private setupMouseDrag(): void {
    const canvas = this.game.canvas;
    let md = false;
    let startX = 0;
    let startY = 0;
    let wasDrag = false;

    this.trackDomListener(canvas, 'mousedown', ((e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      md = true;
      wasDrag = false;
      startX = x;
      startY = y;
      this.tryStartDrag(x, y);
    }) as EventListener);

    this.trackDomListener(canvas, 'mousemove', ((e: MouseEvent) => {
      if (!md || !this.isDragging) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      if (Math.abs(x - startX) > 5 || Math.abs(y - startY) > 5) wasDrag = true;
      this.activeDragTarget = { x, y };
    }) as EventListener);

    this.trackDomListener(canvas, 'mouseup', ((e: MouseEvent) => {
      if (!md) return;
      md = false;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      if (this.isDragging) {
        if (!wasDrag) {
          this.isDragging = false;
          this.activeDragCards.forEach(c => { c.setScale(1); c.angle = 0; });
          this.activeDragCards = [];
          this.activeDragFrom = null;
          this.handleTapOrDoubleTap(x, y);
        } else {
          this.tryDropDrag(x, y);
        }
      } else {
        // Not dragging — could be a click on reserve
        this.handleTapOrDoubleTap(x, y);
      }
    }) as EventListener);
  }

  private setupTouchInput(): void {
    const canvas = this.game.canvas;
    let startX = 0;
    let startY = 0;
    let wasDrag = false;

    this.trackDomListener(canvas, 'touchstart', ((e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.touches[0].clientY - rect.top) * (canvas.height / rect.height);
      startX = x;
      startY = y;
      wasDrag = false;
      this.tryStartDrag(x, y);
    }) as EventListener, { passive: false });

    this.trackDomListener(canvas, 'touchmove', ((e: TouchEvent) => {
      e.preventDefault();
      if (!this.isDragging) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.touches[0].clientY - rect.top) * (canvas.height / rect.height);
      if (Math.abs(x - startX) > 5 || Math.abs(y - startY) > 5) wasDrag = true;
      this.activeDragTarget = { x, y };
    }) as EventListener, { passive: false });

    this.trackDomListener(canvas, 'touchend', ((e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = (e.changedTouches[0].clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.changedTouches[0].clientY - rect.top) * (canvas.height / rect.height);
      if (this.isDragging) {
        if (!wasDrag) {
          this.isDragging = false;
          this.activeDragCards.forEach(c => { c.setScale(1); c.angle = 0; });
          this.activeDragCards = [];
          this.activeDragFrom = null;
          this.handleTapOrDoubleTap(x, y);
        } else {
          this.tryDropDrag(x, y);
        }
      } else {
        // Not dragging — could be a tap on reserve
        this.handleTapOrDoubleTap(x, y);
      }
    }) as EventListener, { passive: false });
  }
}
