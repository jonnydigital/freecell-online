import * as Phaser from 'phaser';
import { FlowerGardenEngine, FlowerGardenLocation, FlowerGardenMove } from '../engine/FlowerGardenEngine';
import { dealFlowerGardenGame } from '../engine/Deck';
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
const MIN_CASCADE_OVERLAP_PX = 20;
const MAX_CASCADE_OVERLAP_FRAC = 0.55;
const SIDE_MARGIN = 0.01;
const GAP = 0.006;
const NUM_COLS = 6;        // 6 tableau columns
const NUM_FOUNDATIONS = 4;
const BOUQUET_SIZE = 16;

interface CardSprite extends Phaser.GameObjects.Container {
  cardData: Card;
  sourceLocation: FlowerGardenLocation;
}

export class FlowerGardenScene extends Phaser.Scene {
  private engine!: FlowerGardenEngine;
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
  private foundationRowHeight: number = 0;
  private cascadeGap: number = 0;
  private cachedOverlap: number | null = null;
  private cachedCanvasRect: DOMRect | null = null;
  private cachedScaleX: number = 1;
  private cachedScaleY: number = 1;

  // Bouquet layout
  private bouquetCardWidth: number = 0;
  private bouquetCardHeight: number = 0;
  private bouquetY: number = 0;
  private bouquetStartX: number = 0;
  private bouquetOverlap: number = 0;

  // Drag — single card only
  private activeDragCards: CardSprite[] = [];
  private activeDragFrom: FlowerGardenLocation | null = null;
  private activeDragTarget: { x: number; y: number } | null = null;
  private activeDragOffsets: { x: number; y: number } = { x: 0, y: 0 };
  private isDragging: boolean = false;
  private dragSource: 'touch' | 'mouse' | null = null;
  private activeDragVelocities: { x: number; y: number }[] = [];
  private lastDragPointerPosition: { x: number; y: number } | null = null;
  private settleTargets: { x: number; y: number }[] = [];
  private isSettlingDrag: boolean = false;
  private pendingSettledMove: { from: FlowerGardenLocation; to: FlowerGardenLocation } | null = null;

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

  // Foundation suit order
  private readonly FOUNDATION_SUITS: Suit[] = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs];

  constructor() {
    super({ key: 'FlowerGardenScene' });
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
    const { tableau, bouquet } = dealFlowerGardenGame(this.gameNumber);
    this.engine = new FlowerGardenEngine(this.gameNumber, tableau, bouquet);
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

    const unsubNewGame = gameBridge.on('newGame', (data: unknown) => {
      const num = typeof data === 'number' ? data : Math.floor(Math.random() * 9999999) + 1;
      this.restartWithNewGame(num);
    });
    this.bridgeUnsubscribers.push(unsubNewGame);

    const unsubUndo = gameBridge.on('undo', () => {
      this.handleUndo();
    });
    this.bridgeUnsubscribers.push(unsubUndo);

    const unsubHint = gameBridge.on('hint', () => {
      const hint = this.engine.getHint();
      if (hint) {
        gameBridge.emit('hintResult', { hint });
        this.flashHintCards(hint);
      } else {
        soundManager.invalidMove();
      }
    });
    this.bridgeUnsubscribers.push(unsubHint);

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
    const { tableau, bouquet } = dealFlowerGardenGame(this.gameNumber);
    this.engine = new FlowerGardenEngine(this.gameNumber, tableau, bouquet);

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

    // Layout: foundations (4) + gap + tableau (6) = we use 10 columns width for top area
    // But the tableau is 6 columns, foundations are 4 — lay them out across the same row
    const totalTopCols = NUM_COLS + NUM_FOUNDATIONS;
    const usableWidth = w * (1 - 2 * SIDE_MARGIN);
    const gapPx = w * GAP;
    const cardWidthFromWidth = Math.floor(((usableWidth - (totalTopCols - 1) * gapPx) / totalTopCols) * largeCardsScale);
    const cardHeightFromWidth = Math.floor(cardWidthFromWidth * CARD_RATIO);

    const topPad = Math.max(Math.floor(h * 0.005), 2);
    this.cascadeGap = Math.floor(h * 0.008);

    // Reserve space for bouquet at bottom
    const bouquetReserveHeight = cardHeightFromWidth + this.cascadeGap * 2;
    const vertBudget = h - topPad - this.cascadeGap - bouquetReserveHeight - 4;
    const maxCardHeight = Math.floor((vertBudget - 6 * MIN_CASCADE_OVERLAP_PX) / 2.5);

    if (this.isPortrait) {
      this.cardHeight = cardHeightFromWidth;
      this.cardWidth = cardWidthFromWidth;
    } else {
      this.cardHeight = Math.min(cardHeightFromWidth, maxCardHeight);
      this.cardWidth = this.cardHeight === cardHeightFromWidth ? cardWidthFromWidth : Math.floor(this.cardHeight / CARD_RATIO);
    }

    this.boardOffsetX = Math.floor((w - (totalTopCols * this.cardWidth + (totalTopCols - 1) * gapPx)) / 2);
    this.boardOffsetY = topPad;
    this.foundationRowHeight = this.cardHeight;

    // Bouquet layout: smaller cards at bottom, horizontally overlapping
    this.bouquetCardWidth = Math.floor(this.cardWidth * 0.85);
    this.bouquetCardHeight = Math.floor(this.bouquetCardWidth * CARD_RATIO);

    // Position bouquet at bottom
    const bouquetTotalWidth = this.bouquetCardWidth + (BOUQUET_SIZE - 1) * Math.floor(this.bouquetCardWidth * 0.55);
    this.bouquetOverlap = Math.floor(this.bouquetCardWidth * 0.55);

    // If bouquet is too wide, reduce overlap
    if (bouquetTotalWidth > usableWidth) {
      this.bouquetOverlap = Math.floor((usableWidth - this.bouquetCardWidth) / (BOUQUET_SIZE - 1));
    }

    const actualBouquetWidth = this.bouquetCardWidth + (BOUQUET_SIZE - 1) * this.bouquetOverlap;
    this.bouquetStartX = Math.floor((w - actualBouquetWidth) / 2);
    this.bouquetY = h - this.bouquetCardHeight - this.cascadeGap;

    this.invalidateOverlapCache();
  }

  private getColumnX(col: number): number {
    const totalTopCols = NUM_COLS + NUM_FOUNDATIONS;
    return this.boardOffsetX + col * (this.cardWidth + this.scale.width * GAP);
  }

  private getCurrentOverlap(): number {
    if (this.cachedOverlap !== null) return this.cachedOverlap;
    const state = this.engine.getState();
    const maxPileLength = Math.max(...state.tableau.map(c => c.length), 1);

    const tableauStartY = this.getTableauBaseY();
    const availableHeight = this.bouquetY - this.cascadeGap - tableauStartY - 4;

    const targetOverlap = maxPileLength > 1
      ? Math.floor((availableHeight * 0.95 - this.cardHeight) / (maxPileLength - 1))
      : this.cardHeight;
    const maxDesiredOverlap = Math.floor(this.cardHeight * MAX_CASCADE_OVERLAP_FRAC);
    const maxFittingOverlap = maxPileLength > 1
      ? Math.floor((availableHeight - this.cardHeight) / (maxPileLength - 1))
      : this.cardHeight;

    this.cachedOverlap = Math.max(MIN_CASCADE_OVERLAP_PX, Math.min(targetOverlap, maxDesiredOverlap, maxFittingOverlap));
    return this.cachedOverlap;
  }

  // Foundations: first 4 columns in top row
  private getFoundationPosition(index: number): { x: number; y: number } {
    return { x: this.getColumnX(index), y: this.boardOffsetY };
  }

  private getTableauBaseY(): number {
    return this.boardOffsetY + this.foundationRowHeight + this.cascadeGap * 2;
  }

  // Tableau columns: after the 4 foundation columns
  private getTableauColumnX(col: number): number {
    return this.getColumnX(col + NUM_FOUNDATIONS);
  }

  private getTableauCardPosition(col: number, row: number): { x: number; y: number } {
    const baseY = this.getTableauBaseY();
    const overlap = this.getCurrentOverlap();
    return { x: this.getTableauColumnX(col), y: baseY + row * overlap };
  }

  private getBouquetCardPosition(index: number): { x: number; y: number } {
    return {
      x: this.bouquetStartX + index * this.bouquetOverlap,
      y: this.bouquetY,
    };
  }

  // ===== RENDERING =====

  private createBoard(): void { this.drawSlots(); }
  private rebuildBoard(): void { this.drawSlots(); }

  private drawSlots(): void {
    this.slotGraphics.forEach(g => g.destroy());
    this.slotGraphics = [];

    const foundationLabels = ['\u2660', '\u2665', '\u2666', '\u2663'];

    // Foundation slots (top row, first 4 columns)
    for (let i = 0; i < NUM_FOUNDATIONS; i++) {
      const pos = this.getFoundationPosition(i);
      this.createSlot(pos.x, pos.y, foundationLabels[i]);
    }

    // Bouquet area label
    const bouquetLabelX = this.bouquetStartX;
    const bouquetLabelY = this.bouquetY - Math.floor(this.cascadeGap * 1.5);
    const label = this.add.text(bouquetLabelX, bouquetLabelY, 'BOUQUET', {
      fontSize: `${Math.max(10, Math.floor(this.cardWidth * 0.14))}px`,
      color: this.currentTheme.feltNoiseLight,
      fontFamily: 'sans-serif',
      fontStyle: 'bold',
    });
    label.setAlpha(0.6);
    label.setDepth(2);
    this.slotGraphics.push(label);
  }

  private createSlot(x: number, y: number, label: string): void {
    const slotColor = hexToInt(this.currentTheme.feltNoiseLight);
    const graphics = this.add.graphics();
    graphics.lineStyle(2, slotColor, 0.8);
    graphics.strokeRoundedRect(x, y, this.cardWidth, this.cardHeight, 6);
    this.slotGraphics.push(graphics);

    if (label) {
      const text = this.add.text(x + this.cardWidth / 2, y + this.cardHeight / 2, label, {
        fontSize: `${Math.floor(this.cardWidth * 0.25)}px`,
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

  private createCardSprite(card: Card, x: number, y: number, width?: number, height?: number): CardSprite {
    const container = this.add.container(x, y) as CardSprite;
    const cw = width || this.cardWidth;
    const ch = height || this.cardHeight;
    container.setSize(cw, ch);
    container.cardData = card;
    this.renderCardSpriteContents(container, cw, ch);

    this.cardSprites.set(card.id, container);
    return container;
  }

  private renderProceduralCardFace(container: CardSprite, card: Card, cw: number, ch: number): void {
    const base = this.add.graphics();
    base.fillStyle(0xffffff, 1);
    base.fillRoundedRect(0, 0, cw, ch, 10);
    base.lineStyle(1.5, 0x000000, 0.12);
    base.strokeRoundedRect(0, 0, cw, ch, 10);
    container.add(base);

    const isRed = (card.suit === Suit.Hearts || card.suit === Suit.Diamonds);
    const colorStr = isRed ? '#c1121f' : '#111827';
    const rankMap: Record<number, string> = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' };
    const rankStr = rankMap[card.rank] || card.rank.toString();
    const fontSize = Math.floor(cw * 0.3);
    const text = this.add.text(cw * 0.16, ch * 0.05, rankStr, {
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
    const smallSuitSz = cw * 0.2;
    const suitY = ch * 0.05 + fontSize;
    const smallSuit = this.add.image(cw * 0.16, suitY + (smallSuitSz / 2), suitMap[card.suit as string]);
    smallSuit.setDisplaySize(smallSuitSz, smallSuitSz);
    container.add(smallSuit);

    const bigSuitSz = cw * 0.48;
    const suitImg = this.add.image(cw / 2, ch * 0.54, suitMap[card.suit as string]);
    suitImg.setDisplaySize(bigSuitSz, bigSuitSz);
    container.add(suitImg);
  }

  private renderCardSpriteContents(container: CardSprite, cw?: number, ch?: number): void {
    const card = container.cardData;
    const cardW = cw || this.cardWidth;
    const cardH = ch || this.cardHeight;

    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.16);
    shadow.fillRoundedRect(3, 4, cardW, cardH, 10);
    container.add(shadow);

    const textureKey = this.getCardTextureKey(card);
    if (textureKey && this.textures.exists(textureKey)) {
      const img = this.add.image(cardW / 2, cardH / 2, textureKey);
      img.setScale(Math.min(cardW / img.width, cardH / img.height));
      container.add(img);
      return;
    }

    if (!card.isFaceUp) {
      const fallbackBack = getCardBackAssetKey(DEFAULT_CARD_STYLE_ID);
      if (this.textures.exists(fallbackBack)) {
        const img = this.add.image(cardW / 2, cardH / 2, fallbackBack);
        img.setScale(Math.min(cardW / img.width, cardH / img.height));
        container.add(img);
      }
      return;
    }

    this.renderProceduralCardFace(container, card, cardW, cardH);
  }

  private recreateAllCardSprites(): void {
    const oldSprites = Array.from(this.cardSprites.values());
    this.cardSprites.clear();
    for (const sprite of oldSprites) {
      const loc = sprite.sourceLocation;
      const isBouquet = loc && loc.type === 'bouquet';
      const cw = isBouquet ? this.bouquetCardWidth : this.cardWidth;
      const ch = isBouquet ? this.bouquetCardHeight : this.cardHeight;
      const newSprite = this.createCardSprite(sprite.cardData, sprite.x, sprite.y, cw, ch);
      newSprite.sourceLocation = sprite.sourceLocation;
      newSprite.setDepth(sprite.depth);
      sprite.destroy();
    }
  }

  private repositionAllCards(): void {
    const state = this.engine.getState();

    // Tableau cards (6 columns)
    for (let col = 0; col < NUM_COLS; col++) {
      const colCards = state.tableau[col];
      for (let row = 0; row < colCards.length; row++) {
        const sprite = this.cardSprites.get(colCards[row].id);
        if (sprite) {
          const pos = this.getTableauCardPosition(col, row);
          sprite.x = pos.x; sprite.y = pos.y;
          sprite.sourceLocation = { type: 'tableau', index: col };
          sprite.setDepth(col * 10 + row + 10);
          sprite.setSize(this.cardWidth, this.cardHeight);
        }
      }
    }

    // Foundation cards
    for (let i = 0; i < NUM_FOUNDATIONS; i++) {
      const suit = this.FOUNDATION_SUITS[i];
      const pile = state.foundations.get(suit)!;
      const pos = this.getFoundationPosition(i);
      for (let j = 0; j < pile.length; j++) {
        const sprite = this.cardSprites.get(pile[j].id);
        if (sprite) {
          sprite.x = pos.x; sprite.y = pos.y;
          sprite.sourceLocation = { type: 'foundation', suit };
          sprite.setDepth(200 + j);
          sprite.setSize(this.cardWidth, this.cardHeight);
        }
      }
    }

    // Bouquet cards
    for (let i = 0; i < state.bouquet.length; i++) {
      const card = state.bouquet[i];
      const sprite = this.cardSprites.get(card.id);
      if (sprite) {
        const pos = this.getBouquetCardPosition(i);
        sprite.x = pos.x; sprite.y = pos.y;
        sprite.sourceLocation = { type: 'bouquet', cardIndex: i };
        sprite.setDepth(400 + i);
        sprite.setSize(this.bouquetCardWidth, this.bouquetCardHeight);
      }
    }
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

    // Deal tableau cards (6 columns of 6)
    for (let col = 0; col < NUM_COLS; col++) {
      const colCards = state.tableau[col];
      for (let row = 0; row < colCards.length; row++) {
        const card = colCards[row];
        const pos = this.getTableauCardPosition(col, row);

        if (staggered) {
          const sprite = this.createCardSprite(card, w / 2 - this.cardWidth / 2, -this.cardHeight);
          sprite.sourceLocation = { type: 'tableau', index: col };
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
            sprite.setDepth(col * 10 + row + 10);
          });
          dealIndex++;
        } else {
          const sprite = this.createCardSprite(card, pos.x, pos.y);
          sprite.sourceLocation = { type: 'tableau', index: col };
          sprite.setDepth(col * 10 + row + 10);
        }
      }
    }

    // Deal bouquet cards
    const bouquetStartDelay = staggered ? lastDealDelay + 200 : 0;
    for (let i = 0; i < state.bouquet.length; i++) {
      const card = state.bouquet[i];
      const pos = this.getBouquetCardPosition(i);

      if (staggered) {
        const sprite = this.createCardSprite(card, w / 2 - this.bouquetCardWidth / 2, this.scale.height + this.bouquetCardHeight, this.bouquetCardWidth, this.bouquetCardHeight);
        sprite.sourceLocation = { type: 'bouquet', cardIndex: i };
        sprite.setDepth(500 + dealIndex);
        sprite.setScale(0.94);
        sprite.alpha = 0;

        const delay = bouquetStartDelay + i * 40;
        lastDealDelay = delay;
        this.tweens.add({
          targets: sprite,
          x: pos.x,
          y: pos.y,
          scaleX: 1,
          scaleY: 1,
          alpha: 1,
          duration: 300,
          delay,
          ease: 'Cubic.easeOut',
        });

        this.time.delayedCall(delay + 150, () => {
          soundManager.cardSelect();
          sprite.setDepth(400 + i);
        });
        dealIndex++;
      } else {
        const sprite = this.createCardSprite(card, pos.x, pos.y, this.bouquetCardWidth, this.bouquetCardHeight);
        sprite.sourceLocation = { type: 'bouquet', cardIndex: i };
        sprite.setDepth(400 + i);
      }
    }

    // Clear deal animation flag after all tweens complete
    if (staggered) {
      const totalDealDuration = lastDealDelay + 300 + 50;
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

  private getTableauPickupIndexAtPoint(col: number, x: number, y: number): number {
    const colCards = this.engine.getState().tableau[col];
    if (colCards.length === 0) return -1;

    const topIdx = colCards.length - 1;
    const topCard = colCards[topIdx];
    if (!topCard.isFaceUp) return -1;

    const sprite = this.cardSprites.get(topCard.id);
    if (!sprite) return -1;

    if (this.isPointWithinCardBounds(x, y, sprite.x, sprite.y, this.cardWidth, this.cardHeight)) {
      return topIdx;
    }

    return -1;
  }

  // ===== ENGINE INTERACTION & ANIMATION =====

  private executeMoveAndAnimate(from: FlowerGardenLocation, to: FlowerGardenLocation): void {
    try {
      const move = this.engine.executeMove(from, to);
      soundManager.cardPlace();

      if (move.cards.length > 0 && to.type === 'foundation') {
        soundManager.cardToFoundation(move.cards[0].rank);
      }

      this.invalidateOverlapCache();

      this.time.delayedCall(50, () => {
        this.recreateAllCardSprites();
        this.repositionAllCards();

        gameBridge.emit('moveExecuted', {
          moveCount: this.engine.getMoveCount(),
          gameNumber: this.gameNumber,
        });

        if (this.engine.isAutoCompletable()) {
          gameBridge.emit('autoCompletable', { completable: true });
        }

        if (this.engine.getState().isWon) {
          this.handleWin();
        }

        // Auto-move to foundations
        const autoMoves = this.engine.autoMoveToFoundations();
        if (autoMoves.length > 0) {
          this.invalidateOverlapCache();
          this.recreateAllCardSprites();
          this.repositionAllCards();
          gameBridge.emit('moveExecuted', {
            moveCount: this.engine.getMoveCount(),
            gameNumber: this.gameNumber,
          });

          if (this.engine.getState().isWon) {
            this.handleWin();
          }
        }

        // Check deadlock
        if (this.engine.isDeadlocked()) {
          gameBridge.emit('deadlock', {});
        }
      });
    } catch (e) {
      console.error("Illegal move execution", e);
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
    const cw = this.cardWidth;
    const ch = this.cardHeight;

    const state = this.engine.getState();
    const cardQueue: { card: Card; posX: number; posY: number }[] = [];

    for (let fi = 0; fi < NUM_FOUNDATIONS; fi++) {
      const suit = this.FOUNDATION_SUITS[fi];
      const pile = state.foundations.get(suit)!;
      const pos = this.getFoundationPosition(fi);
      for (let rank = pile.length; rank >= 1; rank--) {
        cardQueue.push({ card: pile[rank - 1], posX: pos.x, posY: pos.y });
      }
    }

    const suitColors: Record<string, number> = {
      [Suit.Hearts]: 0xff2222,
      [Suit.Diamonds]: 0xff6622,
      [Suit.Clubs]: 0x2244ff,
      [Suit.Spades]: 0x22cc44,
    };

    const GRAVITY = 0.4;
    const BOUNCE_DAMPING = 0.85;
    const TRAIL_INTERVAL = 2;

    interface BouncingCard {
      sprite: CardSprite;
      x: number;
      y: number;
      vx: number;
      vy: number;
      trailColor: number;
      frameCount: number;
      alive: boolean;
    }

    const activeCards: BouncingCard[] = [];
    let launchIndex = 0;

    const launchTimer = this.time.addEvent({
      delay: 150,
      repeat: cardQueue.length - 1,
      callback: () => {
        if (launchIndex >= cardQueue.length) return;
        const { card, posX, posY } = cardQueue[launchIndex];

        const sprite = this.cardSprites.get(card.id);
        if (!sprite) { launchIndex++; return; }

        sprite.setDepth(2000 + launchIndex);
        sprite.setPosition(posX, posY);

        const launchAngle = -Math.PI * (0.2 + Math.random() * 0.6);
        const speed = 4 + Math.random() * 5;

        activeCards.push({
          sprite,
          x: posX,
          y: posY,
          vx: Math.cos(launchAngle) * speed,
          vy: Math.sin(launchAngle) * speed,
          trailColor: suitColors[card.suit] || 0xffffff,
          frameCount: 0,
          alive: true,
        });

        launchIndex++;
      },
    });
    this.winCelebrationObjects.push(launchTimer as unknown as Phaser.GameObjects.GameObject);

    const updateEvent = this.time.addEvent({
      delay: 16,
      loop: true,
      callback: () => {
        if (!this.winCelebrationActive) {
          updateEvent.destroy();
          return;
        }

        for (const bc of activeCards) {
          if (!bc.alive) continue;

          bc.vy += GRAVITY;
          bc.x += bc.vx;
          bc.y += bc.vy;

          if (bc.x < 0) { bc.x = 0; bc.vx = Math.abs(bc.vx) * BOUNCE_DAMPING; }
          else if (bc.x + cw > w) { bc.x = w - cw; bc.vx = -Math.abs(bc.vx) * BOUNCE_DAMPING; }

          if (bc.y + ch > h) {
            bc.y = h - ch;
            bc.vy = -Math.abs(bc.vy) * BOUNCE_DAMPING;
            if (Math.abs(bc.vy) < 1) bc.alive = false;
          }

          if (bc.y < 0) { bc.y = 0; bc.vy = Math.abs(bc.vy) * BOUNCE_DAMPING; }

          bc.frameCount++;
          if (bc.frameCount % TRAIL_INTERVAL === 0) {
            const trail = this.add.graphics();
            trail.fillStyle(bc.trailColor, 0.5);
            trail.fillRoundedRect(0, 0, cw, ch, 6);
            trail.setPosition(bc.x, bc.y);
            trail.setDepth(1999);
            this.winCelebrationObjects.push(trail);

            this.tweens.add({
              targets: trail,
              alpha: 0,
              duration: 1200,
              ease: 'Power2',
              onComplete: () => trail.destroy(),
            });
          }

          bc.sprite.setPosition(bc.x, bc.y);
        }
      },
    });
    this.winCelebrationObjects.push(updateEvent as unknown as Phaser.GameObjects.GameObject);

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
    const doStep = () => {
      const autoMoves = this.engine.autoMoveToFoundations();
      if (autoMoves.length > 0) {
        this.invalidateOverlapCache();
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
        this.time.delayedCall(100, doStep);
      } else {
        let moved = false;
        const state = this.engine.getState();

        // Try moving any tableau card to foundation
        for (let i = 0; i < NUM_COLS; i++) {
          const colCards = state.tableau[i];
          if (colCards.length === 0) continue;
          const card = colCards[colCards.length - 1];
          const from: FlowerGardenLocation = { type: 'tableau', index: i };
          const to: FlowerGardenLocation = { type: 'foundation', suit: card.suit };

          if (this.engine.isLegalMove(from, to)) {
            this.engine.executeMove(from, to);
            moved = true;
            break;
          }
        }

        // Try bouquet cards
        if (!moved) {
          for (let i = state.bouquet.length - 1; i >= 0; i--) {
            const card = state.bouquet[i];
            const from: FlowerGardenLocation = { type: 'bouquet', cardIndex: i };
            const to: FlowerGardenLocation = { type: 'foundation', suit: card.suit };

            if (this.engine.isLegalMove(from, to)) {
              this.engine.executeMove(from, to);
              moved = true;
              break;
            }
          }
        }

        if (moved) {
          soundManager.cardToFoundation();
          this.invalidateOverlapCache();
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
          this.time.delayedCall(100, doStep);
        }
      }
    };
    doStep();
  }

  private flashHintCards(hint: FlowerGardenMove): void {
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
      const targetX = this.activeDragTarget.x - this.activeDragOffsets.x;
      const targetY = this.activeDragTarget.y - this.activeDragOffsets.y;
      const lastPointer = this.lastDragPointerPosition ?? this.activeDragTarget;
      const pointerVelocityX = (this.activeDragTarget.x - lastPointer.x) / Math.max(dt, 1 / 120);
      const targetAngle = Phaser.Math.Clamp(pointerVelocityX * 0.012, -4.5, 4.5);

      const card = this.activeDragCards[0];
      card.x = targetX;
      card.y = targetY;
      card.angle = Phaser.Math.Linear(card.angle, targetAngle, Math.min(1, dt * 18));

      this.lastDragPointerPosition = { ...this.activeDragTarget };
      return;
    }
  }

  // ===== INPUT SYSTEMS =====

  private getTableauColAtPoint(x: number, y: number): number {
    const tableauBaseY = this.getTableauBaseY();
    if (y < tableauBaseY - 10) return -1;
    if (y > this.bouquetY - this.cascadeGap) return -1; // Below tableau area

    for (let col = 0; col < NUM_COLS; col++) {
      const cx = this.getTableauColumnX(col);
      if (x < cx - 5 || x > cx + this.cardWidth + 5) continue;

      const colCards = this.engine.getState().tableau[col];
      const overlap = this.getCurrentOverlap();
      const pileHeight = colCards.length > 0
        ? this.cardHeight + (colCards.length - 1) * overlap
        : this.cardHeight;
      if (y >= tableauBaseY - 5 && y <= tableauBaseY + pileHeight + 5) {
        return col;
      }
    }
    return -1;
  }

  private getFoundationIndexAtPoint(x: number, y: number): number {
    for (let i = 0; i < NUM_FOUNDATIONS; i++) {
      const pos = this.getFoundationPosition(i);
      if (x >= pos.x - 5 && x <= pos.x + this.cardWidth + 5 &&
        y >= pos.y - 5 && y <= pos.y + this.cardHeight + 5) {
        return i;
      }
    }
    return -1;
  }

  private getBouquetCardIndexAtPoint(x: number, y: number): number {
    const state = this.engine.getState();
    if (state.bouquet.length === 0) return -1;

    // Check from rightmost (top) card to leftmost
    for (let i = state.bouquet.length - 1; i >= 0; i--) {
      const pos = this.getBouquetCardPosition(i);
      if (this.isPointWithinCardBounds(x, y, pos.x, pos.y, this.bouquetCardWidth, this.bouquetCardHeight, 5, 5)) {
        return i;
      }
    }
    return -1;
  }

  private tryStartDrag(x: number, y: number): void {
    // Check bouquet first (bouquet cards are always available)
    const bouquetIdx = this.getBouquetCardIndexAtPoint(x, y);
    if (bouquetIdx !== -1) {
      const card = this.engine.getState().bouquet[bouquetIdx];
      const sprite = this.cardSprites.get(card.id);
      if (sprite) {
        this.activeDragCards = [sprite];
        this.activeDragVelocities = [{ x: 0, y: 0 }];
        sprite.setDepth(5000);
        this.tweens.killTweensOf(sprite);
        sprite.setScale(1.04);

        this.activeDragFrom = { type: 'bouquet', cardIndex: bouquetIdx };
        this.activeDragOffsets = { x: x - sprite.x, y: y - sprite.y };
        this.activeDragTarget = { x, y };
        this.lastDragPointerPosition = { x, y };
        this.isDragging = true;
        soundManager.cardSelect();
        return;
      }
    }

    // Check tableau
    const col = this.getTableauColAtPoint(x, y);
    if (col !== -1) {
      const colCards = this.engine.getState().tableau[col];
      if (colCards.length === 0) return;
      const cardIdx = this.getTableauPickupIndexAtPoint(col, x, y);
      if (cardIdx === -1) return;

      const sprite = this.cardSprites.get(colCards[cardIdx].id);
      if (sprite) {
        this.activeDragCards = [sprite];
        this.activeDragVelocities = [{ x: 0, y: 0 }];
        sprite.setDepth(5000);
        this.tweens.killTweensOf(sprite);
        sprite.setScale(1.04);

        this.activeDragFrom = { type: 'tableau', index: col };
        this.activeDragOffsets = { x: x - sprite.x, y: y - sprite.y };
        this.activeDragTarget = { x, y };
        this.lastDragPointerPosition = { x, y };
        this.isDragging = true;
        soundManager.cardSelect();
      }
    }
  }

  private tryDropDrag(x: number, y: number): void {
    if (!this.activeDragFrom || this.activeDragCards.length === 0) return;

    // Check foundation drop
    const foundIdx = this.getFoundationIndexAtPoint(x, y);
    if (foundIdx !== -1) {
      const suit = this.FOUNDATION_SUITS[foundIdx];
      const to: FlowerGardenLocation = { type: 'foundation', suit };
      if (this.engine.isLegalMove(this.activeDragFrom, to)) {
        this.pendingSettledMove = { from: this.activeDragFrom, to };
        this.isDragging = false;
        this.isSettlingDrag = true;
        const pos = this.getFoundationPosition(foundIdx);
        this.settleTargets = [{ x: pos.x, y: pos.y }];
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

    // Check tableau drop
    const col = this.getTableauColAtPoint(x, y);
    if (col !== -1) {
      const to: FlowerGardenLocation = { type: 'tableau', index: col };
      if (this.engine.isLegalMove(this.activeDragFrom, to)) {
        this.pendingSettledMove = { from: this.activeDragFrom, to };
        this.isDragging = false;
        this.isSettlingDrag = true;
        const tgtRow = this.engine.getState().tableau[col].length;
        this.settleTargets = [this.getTableauCardPosition(col, tgtRow)];
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

    // Also check drop on empty tableau columns by checking the whole column area
    if (col === -1) {
      // Check if drop is in the tableau column area but on an empty column
      const tableauBaseY = this.getTableauBaseY();
      if (y >= tableauBaseY - 10 && y <= this.bouquetY - this.cascadeGap) {
        for (let c = 0; c < NUM_COLS; c++) {
          const cx = this.getTableauColumnX(c);
          if (x >= cx - 5 && x <= cx + this.cardWidth + 5) {
            const to: FlowerGardenLocation = { type: 'tableau', index: c };
            if (this.engine.isLegalMove(this.activeDragFrom, to)) {
              this.pendingSettledMove = { from: this.activeDragFrom, to };
              this.isDragging = false;
              this.isSettlingDrag = true;
              this.settleTargets = [this.getTableauCardPosition(c, 0)];
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
        }
      }
    }

    // Invalid drop, snap back
    soundManager.invalidMove();
    this.isDragging = false;
    this.isSettlingDrag = true;

    if (this.activeDragFrom.type === 'tableau') {
      const tableauFrom = this.activeDragFrom as { type: 'tableau'; index: number };
      const fromCol = this.engine.getState().tableau[tableauFrom.index];
      const snapRow = Math.max(0, fromCol.length - 1);
      this.settleTargets = [this.getTableauCardPosition(tableauFrom.index, snapRow)];
    } else if (this.activeDragFrom.type === 'bouquet') {
      const bouquetFrom = this.activeDragFrom as { type: 'bouquet'; cardIndex: number };
      this.settleTargets = [this.getBouquetCardPosition(bouquetFrom.cardIndex)];
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

  // Single-tap auto-move
  private lastTapTime: number = 0;
  private lastTapCardId: string | null = null;

  private handleTapOrDoubleTap(x: number, y: number): void {
    const now = Date.now();
    const state = this.engine.getState();

    let tappedCardId: string | null = null;
    let tappedFrom: FlowerGardenLocation | null = null;

    // Check bouquet tap
    const bouquetIdx = this.getBouquetCardIndexAtPoint(x, y);
    if (bouquetIdx !== -1) {
      const card = state.bouquet[bouquetIdx];
      tappedCardId = card.id;
      tappedFrom = { type: 'bouquet', cardIndex: bouquetIdx };
    }

    // Check tableau tap
    if (!tappedCardId) {
      const col = this.getTableauColAtPoint(x, y);
      if (col !== -1) {
        const colCards = state.tableau[col];
        if (colCards.length > 0) {
          const topCard = colCards[colCards.length - 1];
          if (topCard.isFaceUp) {
            const sprite = this.cardSprites.get(topCard.id);
            if (sprite && this.isPointWithinCardBounds(x, y, sprite.x, sprite.y, this.cardWidth, this.cardHeight)) {
              tappedCardId = topCard.id;
              tappedFrom = { type: 'tableau', index: col };
            }
          }
        }
      }
    }

    if (tappedCardId && tappedFrom && tappedCardId === this.lastTapCardId && now - this.lastTapTime < 400) {
      const card = this.getCardForLocation(tappedFrom);

      if (card) {
        // Try foundation
        const toFoundation: FlowerGardenLocation = { type: 'foundation', suit: card.suit };
        if (this.engine.isLegalMove(tappedFrom, toFoundation)) {
          this.executeMoveAndAnimate(tappedFrom, toFoundation);
          this.lastTapCardId = null;
          this.lastTapTime = 0;
          return;
        }

        // Try tableau columns (for bouquet cards)
        if (tappedFrom.type === 'bouquet') {
          for (let j = 0; j < NUM_COLS; j++) {
            const toTab: FlowerGardenLocation = { type: 'tableau', index: j };
            if (this.engine.isLegalMove(tappedFrom, toTab)) {
              this.executeMoveAndAnimate(tappedFrom, toTab);
              this.lastTapCardId = null;
              this.lastTapTime = 0;
              return;
            }
          }
        }
      }
    }

    this.lastTapCardId = tappedCardId;
    this.lastTapTime = now;
  }

  private getCardForLocation(loc: FlowerGardenLocation): Card | null {
    const state = this.engine.getState();
    switch (loc.type) {
      case 'tableau': {
        const col = state.tableau[loc.index];
        return col.length > 0 ? col[col.length - 1] : null;
      }
      case 'bouquet':
        return loc.cardIndex >= 0 && loc.cardIndex < state.bouquet.length ? state.bouquet[loc.cardIndex] : null;
      case 'foundation':
        return this.engine.getFoundationTop(loc.suit);
    }
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
      if (this.isDragging) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.changedTouches[0].clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.changedTouches[0].clientY - rect.top) * (canvas.height / rect.height);
        if (!wasDrag) {
          this.isDragging = false;
          this.activeDragCards.forEach(c => { c.setScale(1); c.angle = 0; });
          this.activeDragCards = [];
          this.activeDragFrom = null;
          this.handleTapOrDoubleTap(x, y);
        } else {
          this.tryDropDrag(x, y);
        }
      }
    }) as EventListener, { passive: false });
  }
}
