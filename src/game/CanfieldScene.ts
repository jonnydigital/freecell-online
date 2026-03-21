import * as Phaser from 'phaser';
import { CanfieldEngine, CanfieldLocation, CanfieldMove } from '../engine/CanfieldEngine';
import { dealCanfieldGame } from '../engine/Deck';
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

interface CardSprite extends Phaser.GameObjects.Container {
  cardData: Card;
  sourceLocation: CanfieldLocation;
}

export class CanfieldScene extends Phaser.Scene {
  private engine!: CanfieldEngine;
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
  private activeDragFrom: CanfieldLocation | null = null;
  private activeDragTarget: { x: number; y: number } | null = null;
  private activeDragOffsets: { x: number; y: number } = { x: 0, y: 0 };
  private isDragging: boolean = false;
  private dragSource: 'touch' | 'mouse' | null = null;
  private activeDragVelocities: { x: number; y: number }[] = [];
  private lastDragPointerPosition: { x: number; y: number } | null = null;
  private settleTargets: { x: number; y: number }[] = [];
  private isSettlingDrag: boolean = false;
  private pendingSettledMove: { from: CanfieldLocation; to: CanfieldLocation; count?: number } | null = null;

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

  // Win celebration
  private winCelebrationActive: boolean = false;
  private winCelebrationObjects: Phaser.GameObjects.GameObject[] = [];

  constructor() {
    super({ key: 'CanfieldScene' });
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
    const deal = dealCanfieldGame(this.gameNumber);
    this.engine = new CanfieldEngine(
      this.gameNumber,
      deal.tableau,
      deal.foundations,
      deal.reserve,
      deal.stock,
      [],
      deal.foundationBaseRank,
    );
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
    this.drawSlots();
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
      this.drawSlots();
      this.recreateAllCardSprites();
      this.repositionAllCards();
    };
    this.scale.on('resize', this.scaleResizeHandler, this);

    gameBridge.emit('gameReady', { gameNumber: this.gameNumber });

    // Bridge events
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
      this.drawSlots();
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
        this.drawSlots();
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
    const deal = dealCanfieldGame(this.gameNumber);
    this.engine = new CanfieldEngine(
      this.gameNumber,
      deal.tableau,
      deal.foundations,
      deal.reserve,
      deal.stock,
      [],
      deal.foundationBaseRank,
    );

    this.drawSlots();
    this.dealCards(true);

    gameBridge.emit('gameReady', { gameNumber: this.gameNumber });
  }

  private shutdown(): void {
    this.cleanupWinCelebration();
    this.isDealAnimating = false;
    this.pendingResize = false;
    if (this.scaleResizeHandler) this.scale.off('resize', this.scaleResizeHandler, this);
    for (const unsub of this.bridgeUnsubscribers) unsub();
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
  // Layout: Top row = Reserve + 4 Foundations + Stock + Waste (7 slots)
  // Below = 4 tableau columns centered

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

    // 7 columns top row: reserve, 4 foundations, stock, waste
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
    const maxLen = Math.max(...state.tableau.map(c => c.length), 1);
    const topRow = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    const availableHeight = this.scale.height - topRow - 4;

    const targetOverlap = maxLen > 1
      ? Math.floor((availableHeight * 0.95 - this.cardHeight) / (maxLen - 1))
      : this.cardHeight;
    const maxDesiredOverlap = Math.floor(this.cardHeight * MAX_CASCADE_OVERLAP_FRAC);
    const maxFittingOverlap = maxLen > 1
      ? Math.floor((availableHeight - this.cardHeight) / (maxLen - 1))
      : this.cardHeight;

    this.cachedOverlap = Math.max(MIN_CASCADE_OVERLAP_PX, Math.min(targetOverlap, maxDesiredOverlap, maxFittingOverlap));
    return this.cachedOverlap;
  }

  // Reserve position (top-left, col 0)
  private getReservePosition(): { x: number; y: number } {
    return { x: this.getColumnX(0), y: this.boardOffsetY };
  }

  // Foundation positions (cols 1-4)
  private getFoundationPosition(index: number): { x: number; y: number } {
    return { x: this.getColumnX(1 + index), y: this.boardOffsetY };
  }

  // Stock position (col 5)
  private getStockPosition(): { x: number; y: number } {
    return { x: this.getColumnX(5), y: this.boardOffsetY };
  }

  // Waste position (col 6)
  private getWastePosition(): { x: number; y: number } {
    return { x: this.getColumnX(6), y: this.boardOffsetY };
  }

  // Tableau columns: 4 columns centered below the top row
  // Use cols 1-4 for alignment with foundations
  private getTableauCardPosition(col: number, row: number): { x: number; y: number } {
    // Offset: center 4 cols under the 7-col top row
    // Use columns 0,1,2,3 mapped to x positions of top-row cols 1,2,3,4 (under foundations)
    const x = this.getColumnX(col + 1);
    // Below top row area with gap, but we use separate logic for the cascade + reserve counter area
    const topRow = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    const overlap = this.getCurrentOverlap();
    const y = topRow + row * overlap;
    return { x, y };
  }

  // ===== RENDERING =====

  private drawSlots(): void {
    this.slotGraphics.forEach(g => g.destroy());
    this.slotGraphics = [];

    const slotColor = hexToInt(this.currentTheme.feltNoiseLight);

    // Reserve slot
    const reservePos = this.getReservePosition();
    this.createSlot(reservePos.x, reservePos.y, 'RES');

    // 4 Foundation slots
    const suitSymbols = ['♠', '♥', '♦', '♣'];
    for (let i = 0; i < 4; i++) {
      const pos = this.getFoundationPosition(i);
      this.createSlot(pos.x, pos.y, suitSymbols[i]);
    }

    // Stock slot
    const stockPos = this.getStockPosition();
    this.createSlot(stockPos.x, stockPos.y, 'STOCK');

    // Waste slot
    const wastePos = this.getWastePosition();
    this.createSlot(wastePos.x, wastePos.y, '');

    // Reserve count text
    const state = this.engine.getState();
    const countText = this.add.text(
      reservePos.x + this.cardWidth / 2,
      reservePos.y + this.cardHeight + 4,
      `${state.reserve.length}`,
      {
        fontSize: `${Math.floor(this.cardWidth * 0.2)}px`,
        color: this.currentTheme.feltNoiseLight,
        fontFamily: 'sans-serif',
      }
    );
    countText.setOrigin(0.5, 0);
    this.slotGraphics.push(countText);

    // Foundation base rank indicator
    const rankMap: Record<number, string> = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' };
    const baseRankStr = rankMap[state.foundationBaseRank] || state.foundationBaseRank.toString();
    const baseText = this.add.text(
      this.getFoundationPosition(0).x - Math.floor(this.cardWidth * 0.1),
      this.getFoundationPosition(0).y + this.cardHeight + 4,
      `Base: ${baseRankStr}`,
      {
        fontSize: `${Math.floor(this.cardWidth * 0.16)}px`,
        color: '#FFD700',
        fontFamily: 'sans-serif',
      }
    );
    baseText.setOrigin(0, 0);
    this.slotGraphics.push(baseText);
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
    for (let col = 0; col < 4; col++) {
      const column = state.tableau[col];
      for (let row = 0; row < column.length; row++) {
        const card = column[row];
        const sprite = this.cardSprites.get(card.id);
        if (sprite) {
          const pos = this.getTableauCardPosition(col, row);
          sprite.x = pos.x;
          sprite.y = pos.y;
          sprite.sourceLocation = { type: 'tableau', col };
          sprite.setDepth(100 + col * 20 + row);
          sprite.setVisible(true);
          sprite.alpha = 1;
        }
      }
    }

    // Reserve cards (stacked, only top visible as face-up)
    const reservePos = this.getReservePosition();
    for (let i = 0; i < state.reserve.length; i++) {
      const card = state.reserve[i];
      const sprite = this.cardSprites.get(card.id);
      if (sprite) {
        sprite.x = reservePos.x + Math.min(i, 4) * 1;
        sprite.y = reservePos.y;
        sprite.sourceLocation = { type: 'reserve' };
        sprite.setDepth(10 + i);
        sprite.setVisible(i >= state.reserve.length - 1); // only show top
        sprite.alpha = 1;
      }
    }

    // Foundation cards
    for (let i = 0; i < 4; i++) {
      const pile = state.foundations[i];
      const pos = this.getFoundationPosition(i);
      for (let j = 0; j < pile.length; j++) {
        const sprite = this.cardSprites.get(pile[j].id);
        if (sprite) {
          sprite.x = pos.x;
          sprite.y = pos.y;
          sprite.sourceLocation = { type: 'foundation', pile: i };
          sprite.setDepth(60 + j);
          sprite.setVisible(j === pile.length - 1);
        }
      }
    }

    // Stock cards
    const stockPos = this.getStockPosition();
    for (let i = 0; i < state.stock.length; i++) {
      const sprite = this.cardSprites.get(state.stock[i].id);
      if (sprite) {
        sprite.x = stockPos.x + Math.min(i, 4) * 1;
        sprite.y = stockPos.y;
        sprite.sourceLocation = { type: 'stock' };
        sprite.setDepth(5 + i);
        sprite.setVisible(true);
        sprite.alpha = 1;
      }
    }

    // Waste cards (show top 3 fanned)
    const wastePos = this.getWastePosition();
    const wasteLen = state.waste.length;
    const showCount = Math.min(3, wasteLen);
    for (let i = 0; i < wasteLen; i++) {
      const sprite = this.cardSprites.get(state.waste[i].id);
      if (sprite) {
        const fromEnd = wasteLen - 1 - i;
        if (fromEnd < showCount) {
          const fanOffset = (showCount - 1 - fromEnd) * Math.floor(this.cardWidth * 0.25);
          sprite.x = wastePos.x + fanOffset;
          sprite.y = wastePos.y;
          sprite.setDepth(50 + i);
          sprite.setVisible(true);
          sprite.alpha = fromEnd === 0 ? 1 : 0.7;
        } else {
          sprite.x = wastePos.x;
          sprite.y = wastePos.y;
          sprite.setDepth(5 + i);
          sprite.setVisible(false);
        }
        sprite.sourceLocation = { type: 'waste' };
      }
    }

    // Update slot displays (reserve count)
    this.drawSlots();
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

    // Reserve cards
    const reservePos = this.getReservePosition();
    for (let i = 0; i < state.reserve.length; i++) {
      const card = state.reserve[i];
      const isTop = i === state.reserve.length - 1;
      if (staggered) {
        const sprite = this.createCardSprite(card, w / 2 - this.cardWidth / 2, -this.cardHeight);
        sprite.sourceLocation = { type: 'reserve' };
        sprite.setDepth(500 + dealIndex);
        sprite.setScale(0.94);
        sprite.alpha = 0;

        const delay = dealIndex * 18;
        lastDealDelay = delay;
        this.tweens.add({
          targets: sprite,
          x: reservePos.x + Math.min(i, 4) * 1,
          y: reservePos.y,
          scaleX: 1,
          scaleY: 1,
          alpha: 1,
          duration: 200,
          delay,
          ease: 'Cubic.easeOut',
          onComplete: () => {
            sprite.setDepth(10 + i);
            sprite.setVisible(isTop);
          }
        });
        if (i % 4 === 0) this.time.delayedCall(delay + 100, () => soundManager.cardSelect());
        dealIndex++;
      } else {
        const sprite = this.createCardSprite(card, reservePos.x + Math.min(i, 4) * 1, reservePos.y);
        sprite.sourceLocation = { type: 'reserve' };
        sprite.setDepth(10 + i);
        sprite.setVisible(isTop);
      }
    }

    // Foundation card (first one)
    for (let i = 0; i < 4; i++) {
      const pile = state.foundations[i];
      const pos = this.getFoundationPosition(i);
      for (let j = 0; j < pile.length; j++) {
        const card = pile[j];
        if (staggered) {
          const sprite = this.createCardSprite(card, w / 2, -this.cardHeight);
          sprite.sourceLocation = { type: 'foundation', pile: i };
          sprite.setDepth(500 + dealIndex);
          sprite.setScale(0.94);
          sprite.alpha = 0;

          const delay = dealIndex * 25;
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
            soundManager.cardToFoundation();
            sprite.setDepth(60 + j);
          });
          dealIndex++;
        } else {
          const sprite = this.createCardSprite(card, pos.x, pos.y);
          sprite.sourceLocation = { type: 'foundation', pile: i };
          sprite.setDepth(60 + j);
        }
      }
    }

    // Tableau cards (4 columns, 1 each)
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < state.tableau[col].length; row++) {
        const card = state.tableau[col][row];
        const pos = this.getTableauCardPosition(col, row);
        if (staggered) {
          const sprite = this.createCardSprite(card, w / 2 - this.cardWidth / 2, -this.cardHeight);
          sprite.sourceLocation = { type: 'tableau', col };
          sprite.setDepth(500 + dealIndex);
          sprite.setScale(0.94);
          sprite.alpha = 0;

          const delay = dealIndex * 25;
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
            sprite.setDepth(100 + col * 20 + row);
          });
          dealIndex++;
        } else {
          const sprite = this.createCardSprite(card, pos.x, pos.y);
          sprite.sourceLocation = { type: 'tableau', col };
          sprite.setDepth(100 + col * 20 + row);
        }
      }
    }

    // Stock cards
    const stockPos = this.getStockPosition();
    for (let i = 0; i < state.stock.length; i++) {
      const card = state.stock[i];
      if (staggered) {
        const sprite = this.createCardSprite(card, w / 2, -this.cardHeight);
        sprite.sourceLocation = { type: 'stock' };
        sprite.setDepth(500 + dealIndex);
        sprite.setScale(0.94);
        sprite.alpha = 0;

        const delay = dealIndex * 10;
        lastDealDelay = delay;
        this.tweens.add({
          targets: sprite,
          x: stockPos.x + Math.min(i, 4) * 1,
          y: stockPos.y,
          scaleX: 1,
          scaleY: 1,
          alpha: 1,
          duration: 200,
          delay,
          ease: 'Cubic.easeOut'
        });
        dealIndex++;
      } else {
        const sprite = this.createCardSprite(card, stockPos.x + Math.min(i, 4) * 1, stockPos.y);
        sprite.sourceLocation = { type: 'stock' };
        sprite.setDepth(5 + i);
      }
    }

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

  // ===== ENGINE INTERACTION =====

  private executeMoveAndAnimate(from: CanfieldLocation, to: CanfieldLocation, count?: number): void {
    try {
      if (from.type === 'stock') {
        // Draw from stock
        if (this.engine.getState().stock.length > 0) {
          this.engine.drawFromStock();
          soundManager.cardSelect();
        } else if (this.engine.getState().waste.length > 0) {
          this.engine.recycleWaste();
          soundManager.cardSelect();
        }
      } else if (from.type === 'waste' && to.type === 'foundation') {
        this.engine.playWasteCard(to);
        soundManager.cardToFoundation();
      } else if (from.type === 'waste' && to.type === 'tableau') {
        this.engine.playWasteCard(to);
        soundManager.cardPlace();
      } else if (from.type === 'reserve' && to.type === 'foundation') {
        this.engine.playReserveCard(to);
        soundManager.cardToFoundation();
      } else if (from.type === 'reserve' && to.type === 'tableau') {
        this.engine.playReserveCard(to);
        soundManager.cardPlace();
      } else if (from.type === 'tableau' && to.type === 'foundation') {
        const fromCol = (from as { type: 'tableau'; col: number }).col;
        const toPile = (to as { type: 'foundation'; pile: number }).pile;
        this.engine.playTableauToFoundation(fromCol, toPile);
        soundManager.cardToFoundation();
      } else if (from.type === 'tableau' && to.type === 'tableau') {
        const fromCol = (from as { type: 'tableau'; col: number }).col;
        const toCol = (to as { type: 'tableau'; col: number }).col;
        this.engine.moveTableauCards(fromCol, toCol, count || 1);
        soundManager.cardPlace();
      }

      this.invalidateOverlapCache();

      this.time.delayedCall(50, () => {
        this.recreateAllCardSprites();
        this.repositionAllCards();

        gameBridge.emit('moveExecuted', {
          moveCount: this.engine.getMoveCount(),
          gameNumber: this.gameNumber,
        });

        if (this.engine.getState().isWon) {
          this.handleWin();
        }
      });
    } catch (e) {
      soundManager.invalidMove();
    }
  }

  private handleDrawFromStock(): void {
    try {
      const state = this.engine.getState();
      if (state.stock.length > 0) {
        this.engine.drawFromStock();
      } else if (state.waste.length > 0) {
        this.engine.recycleWaste();
      } else {
        soundManager.invalidMove();
        return;
      }
      soundManager.cardSelect();
      this.invalidateOverlapCache();
      this.recreateAllCardSprites();
      this.repositionAllCards();

      gameBridge.emit('moveExecuted', {
        moveCount: this.engine.getMoveCount(),
        gameNumber: this.gameNumber,
      });
    } catch {
      soundManager.invalidMove();
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

  // ===== AUTO-MOVE (single tap) =====

  private tryAutoMove(from: CanfieldLocation): boolean {
    const state = this.engine.getState();
    let card: Card | null = null;

    if (from.type === 'waste') {
      card = this.engine.getWasteTop();
    } else if (from.type === 'reserve') {
      card = this.engine.getReserveTop();
    } else if (from.type === 'tableau') {
      const col = (from as { type: 'tableau'; col: number }).col;
      const column = state.tableau[col];
      if (column.length > 0) card = column[column.length - 1];
    }

    if (!card) return false;

    // Try foundation first
    const fPile = this.engine.findFoundationTarget(card);
    if (fPile >= 0) {
      try {
        if (from.type === 'waste') {
          this.engine.playWasteCard({ type: 'foundation', pile: fPile });
        } else if (from.type === 'reserve') {
          this.engine.playReserveCard({ type: 'foundation', pile: fPile });
        } else if (from.type === 'tableau') {
          const col = (from as { type: 'tableau'; col: number }).col;
          this.engine.playTableauToFoundation(col, fPile);
        }
        soundManager.cardToFoundation();
        this.invalidateOverlapCache();
        this.recreateAllCardSprites();
        this.repositionAllCards();
        this.emitMoveUpdate();
        this.checkGameEnd();
        return true;
      } catch { /* fall through */ }
    }

    // Try tableau
    if (from.type === 'waste' || from.type === 'reserve') {
      for (let col = 0; col < 4; col++) {
        if (this.engine.canPlayToTableau(card, col)) {
          try {
            if (from.type === 'waste') {
              this.engine.playWasteCard({ type: 'tableau', col });
            } else {
              this.engine.playReserveCard({ type: 'tableau', col });
            }
            soundManager.cardPlace();
            this.invalidateOverlapCache();
            this.recreateAllCardSprites();
            this.repositionAllCards();
            this.emitMoveUpdate();
            this.checkGameEnd();
            return true;
          } catch { /* fall through */ }
        }
      }
    }

    return false;
  }

  private emitMoveUpdate(): void {
    gameBridge.emit('moveExecuted', {
      moveCount: this.engine.getMoveCount(),
      gameNumber: this.gameNumber,
    });
  }

  private checkGameEnd(): void {
    if (this.engine.getState().isWon) {
      this.handleWin();
    }
  }

  // ===== HINTS =====

  private flashHintCards(hint: CanfieldMove): void {
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

    // If hint is draw/recycle, flash the stock
    if (hint.type === 'draw' || hint.type === 'recycle') {
      const stockPos = this.getStockPosition();
      const flash = this.add.graphics();
      flash.fillStyle(0xffd700, 0.3);
      flash.fillRoundedRect(stockPos.x - 4, stockPos.y - 4, this.cardWidth + 8, this.cardHeight + 8, 10);
      flash.setDepth(999);
      this.tweens.add({
        targets: flash,
        alpha: 0,
        duration: 800,
        onComplete: () => flash.destroy(),
      });
    }
  }

  // ===== WIN =====

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
    }
  }

  // ===== INPUT SYSTEMS =====

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
          if (completed === total) onComplete();
        }
      });
    }
  }

  private isPointWithinCardBounds(
    x: number, y: number, left: number, top: number,
    width: number, height: number, padX: number = 10, padY: number = 8
  ): boolean {
    return x >= left - padX && x <= left + width + padX &&
      y >= top - padY && y <= top + height + padY;
  }

  private isStockHit(x: number, y: number): boolean {
    const pos = this.getStockPosition();
    return x >= pos.x - 10 && x <= pos.x + this.cardWidth + 10 &&
      y >= pos.y - 10 && y <= pos.y + this.cardHeight + 10;
  }

  private isWasteHit(x: number, y: number): boolean {
    const pos = this.getWastePosition();
    const fanWidth = this.cardWidth + Math.floor(this.cardWidth * 0.5);
    return x >= pos.x - 10 && x <= pos.x + fanWidth + 10 &&
      y >= pos.y - 10 && y <= pos.y + this.cardHeight + 10;
  }

  private isReserveHit(x: number, y: number): boolean {
    const pos = this.getReservePosition();
    return x >= pos.x - 10 && x <= pos.x + this.cardWidth + 10 &&
      y >= pos.y - 10 && y <= pos.y + this.cardHeight + 10;
  }

  private getFoundationIndexAtPoint(x: number, y: number): number {
    for (let i = 0; i < 4; i++) {
      const pos = this.getFoundationPosition(i);
      if (x >= pos.x - 5 && x <= pos.x + this.cardWidth + 5 &&
        y >= pos.y - 5 && y <= pos.y + this.cardHeight + 5) {
        return i;
      }
    }
    return -1;
  }

  private getTableauColumnAtPoint(x: number, y: number): number {
    const topRow = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    if (y < topRow - 10) return -1;

    for (let col = 0; col < 4; col++) {
      const cx = this.getColumnX(col + 1); // tableau uses cols 1-4
      if (x >= cx - 5 && x <= cx + this.cardWidth + 5) return col;
    }
    return -1;
  }

  private getTableauPickupIndexAtPoint(col: number, x: number, y: number): number {
    const state = this.engine.getState();
    const column = state.tableau[col];
    if (column.length === 0) return -1;

    // All face-up, find valid sequence length from bottom
    // Any face-up card in a proper sequence can be picked up
    for (let i = column.length - 1; i >= 0; i--) {
      const card = column[i];
      if (!card.isFaceUp) break;

      const pos = this.getTableauCardPosition(col, i);
      const overlap = i < column.length - 1 ? this.getCurrentOverlap() : this.cardHeight;
      const hitHeight = Math.min(this.cardHeight, overlap + 18);

      if (this.isPointWithinCardBounds(x, y, pos.x, pos.y, this.cardWidth, hitHeight)) {
        // Check if this forms a valid sequence down to the bottom
        let valid = true;
        for (let j = i; j < column.length - 1; j++) {
          const lower = column[j + 1];
          const upper = column[j];
          if (lower.color === upper.color) { valid = false; break; }
          const expectedRank = upper.rank === 1 ? 13 : upper.rank - 1;
          if (lower.rank !== expectedRank) { valid = false; break; }
        }
        if (valid) return i;
      }
    }
    return -1;
  }

  private tryStartDrag(x: number, y: number): void {
    if (this.isDealAnimating || this.winCelebrationActive) return;

    // Check stock click
    if (this.isStockHit(x, y)) {
      this.handleDrawFromStock();
      return;
    }

    // Check waste card drag
    if (this.isWasteHit(x, y)) {
      const state = this.engine.getState();
      if (state.waste.length === 0) return;

      const card = state.waste[state.waste.length - 1];
      const sprite = this.cardSprites.get(card.id);
      if (sprite) {
        this.activeDragCards = [sprite];
        this.activeDragFrom = { type: 'waste' };
        this.activeDragOffsets = { x: x - sprite.x, y: y - sprite.y };
        this.activeDragTarget = { x, y };
        this.lastDragPointerPosition = { x, y };
        this.isDragging = true;
        sprite.setDepth(5000);
        sprite.setScale(1.04);
        this.tweens.killTweensOf(sprite);
        soundManager.cardSelect();
      }
      return;
    }

    // Check reserve card drag
    if (this.isReserveHit(x, y)) {
      const reserveTop = this.engine.getReserveTop();
      if (!reserveTop) return;

      const sprite = this.cardSprites.get(reserveTop.id);
      if (sprite) {
        this.activeDragCards = [sprite];
        this.activeDragFrom = { type: 'reserve' };
        this.activeDragOffsets = { x: x - sprite.x, y: y - sprite.y };
        this.activeDragTarget = { x, y };
        this.lastDragPointerPosition = { x, y };
        this.isDragging = true;
        sprite.setDepth(5000);
        sprite.setScale(1.04);
        this.tweens.killTweensOf(sprite);
        soundManager.cardSelect();
      }
      return;
    }

    // Check tableau card drag
    const col = this.getTableauColumnAtPoint(x, y);
    if (col !== -1) {
      const cardIdx = this.getTableauPickupIndexAtPoint(col, x, y);
      if (cardIdx === -1) return;

      const state = this.engine.getState();
      const column = state.tableau[col];

      for (let i = cardIdx; i < column.length; i++) {
        const sprite = this.cardSprites.get(column[i].id);
        if (sprite) {
          this.activeDragCards.push(sprite);
          this.activeDragVelocities.push({ x: 0, y: 0 });
          sprite.setDepth(5000 + i);
          this.tweens.killTweensOf(sprite);
          sprite.setScale(1.04);
        }
      }

      if (this.activeDragCards.length > 0) {
        this.activeDragFrom = { type: 'tableau', col };
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

    const state = this.engine.getState();

    // Check foundation drop (single card only)
    if (this.activeDragCards.length === 1) {
      const fIdx = this.getFoundationIndexAtPoint(x, y);
      if (fIdx !== -1) {
        const card = this.activeDragCards[0].cardData;
        if (this.engine.canPlayToFoundation(card, fIdx)) {
          const to: CanfieldLocation = { type: 'foundation', pile: fIdx };
          this.pendingSettledMove = { from: this.activeDragFrom, to };
          this.isDragging = false;
          this.isSettlingDrag = true;
          const pos = this.getFoundationPosition(fIdx);
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
    }

    // Check tableau drop
    const col = this.getTableauColumnAtPoint(x, y);
    if (col !== -1) {
      const bottomCard = this.activeDragCards[0].cardData;
      if (this.engine.canPlayToTableau(bottomCard, col)) {
        const to: CanfieldLocation = { type: 'tableau', col };
        const count = this.activeDragCards.length;
        this.pendingSettledMove = { from: this.activeDragFrom, to, count };
        this.isDragging = false;
        this.isSettlingDrag = true;
        const tgtRow = state.tableau[col].length;
        this.settleTargets = this.activeDragCards.map((_, i) => this.getTableauCardPosition(col, tgtRow + i));
        this.lastDragPointerPosition = null;
        this.animateDraggedCardsToTargets(this.settleTargets, () => {
          this.isSettlingDrag = false;
          if (this.pendingSettledMove) {
            this.executeMoveAndAnimate(
              this.pendingSettledMove.from,
              this.pendingSettledMove.to,
              this.pendingSettledMove.count,
            );
          }
          this.activeDragCards = [];
          this.pendingSettledMove = null;
        });
        return;
      }
    }

    // Invalid drop - snap back
    soundManager.invalidMove();
    this.isDragging = false;
    this.isSettlingDrag = true;

    if (this.activeDragFrom.type === 'tableau') {
      const fromCol = (this.activeDragFrom as { type: 'tableau'; col: number }).col;
      const column = state.tableau[fromCol];
      const startIdx = column.length - this.activeDragCards.length;
      this.settleTargets = this.activeDragCards.map((_, i) => this.getTableauCardPosition(fromCol, startIdx + i));
    } else if (this.activeDragFrom.type === 'waste') {
      const wastePos = this.getWastePosition();
      this.settleTargets = [{ x: wastePos.x, y: wastePos.y }];
    } else if (this.activeDragFrom.type === 'reserve') {
      const reservePos = this.getReservePosition();
      this.settleTargets = [{ x: reservePos.x, y: reservePos.y }];
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

  // Double-tap to auto-move
  private lastTapTime: number = 0;
  private lastTapCardId: string | null = null;

  private handleTapOrDoubleTap(x: number, y: number): void {
    if (this.isDealAnimating || this.winCelebrationActive) return;

    const now = Date.now();
    const state = this.engine.getState();

    // Stock tap
    if (this.isStockHit(x, y)) {
      this.handleDrawFromStock();
      return;
    }

    let tappedCardId: string | null = null;
    let tappedFrom: CanfieldLocation | null = null;

    // Waste tap
    if (this.isWasteHit(x, y) && state.waste.length > 0) {
      const card = state.waste[state.waste.length - 1];
      tappedCardId = card.id;
      tappedFrom = { type: 'waste' };
    }

    // Reserve tap
    if (!tappedCardId && this.isReserveHit(x, y)) {
      const reserveTop = this.engine.getReserveTop();
      if (reserveTop) {
        tappedCardId = reserveTop.id;
        tappedFrom = { type: 'reserve' };
      }
    }

    // Tableau tap
    if (!tappedCardId) {
      const col = this.getTableauColumnAtPoint(x, y);
      if (col !== -1) {
        const column = state.tableau[col];
        if (column.length > 0) {
          const topCard = column[column.length - 1];
          const sprite = this.cardSprites.get(topCard.id);
          if (sprite && this.isPointWithinCardBounds(x, y, sprite.x, sprite.y, this.cardWidth, this.cardHeight)) {
            tappedCardId = topCard.id;
            tappedFrom = { type: 'tableau', col };
          }
        }
      }
    }

    if (tappedCardId && tappedFrom) {
      // Double-tap: auto-move to foundation/tableau
      if (tappedCardId === this.lastTapCardId && now - this.lastTapTime < 400) {
        this.tryAutoMove(tappedFrom);
        this.lastTapCardId = null;
        this.lastTapTime = 0;
        return;
      }

      // Single tap: auto-move (simpler UX for mobile)
      if (this.isTouchDevice) {
        if (this.tryAutoMove(tappedFrom)) {
          this.lastTapCardId = null;
          this.lastTapTime = 0;
          return;
        }
      }
    }

    this.lastTapCardId = tappedCardId;
    this.lastTapTime = now;
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
