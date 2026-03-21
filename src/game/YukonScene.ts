import * as Phaser from 'phaser';
import { YukonEngine, YukonLocation, YukonMove } from '../engine/YukonEngine';
import { dealYukonGame } from '../engine/Deck';
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
  sourceLocation: YukonLocation;
}

export class YukonScene extends Phaser.Scene {
  private engine!: YukonEngine;
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
  private activeDragFrom: YukonLocation | null = null;
  private activeDragTarget: { x: number; y: number } | null = null;
  private activeDragOffsets: { x: number; y: number } = { x: 0, y: 0 };
  private isDragging: boolean = false;
  private dragSource: 'touch' | 'mouse' | null = null;
  private activeDragVelocities: { x: number; y: number }[] = [];
  private lastDragPointerPosition: { x: number; y: number } | null = null;
  private settleTargets: { x: number; y: number }[] = [];
  private isSettlingDrag: boolean = false;
  private pendingSettledMove: { from: YukonLocation; to: YukonLocation } | null = null;

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

  constructor() {
    super({ key: 'YukonScene' });
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
    const { cascades } = dealYukonGame(this.gameNumber);
    this.engine = new YukonEngine(this.gameNumber, cascades);
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
        gameBridge.emit('hintResult', { hint });
        this.flashHintCards(hint);
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
    const { cascades } = dealYukonGame(this.gameNumber);
    this.engine = new YukonEngine(this.gameNumber, cascades);

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

    // 7 columns for Yukon
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

  private getCardOverlapForRow(card: Card): number {
    if (!card.isFaceUp) {
      return Math.max(MIN_CASCADE_OVERLAP_PX * 0.6, Math.floor(this.cardHeight * FACEDOWN_OVERLAP_FRAC));
    }
    return this.getCurrentOverlap();
  }

  private getCascadeCardY(col: number, row: number): number {
    const state = this.engine.getState();
    const cascade = state.cascades[col];
    let y = this.boardOffsetY + this.topRowHeight + this.cascadeGap;

    for (let i = 0; i < row; i++) {
      y += this.getCardOverlapForRow(cascade[i]);
    }
    return y;
  }

  private getCascadeCardPosition(col: number, row: number): { x: number; y: number } {
    return { x: this.getColumnX(col), y: this.getCascadeCardY(col, row) };
  }

  private getFoundationPosition(index: number): { x: number; y: number } {
    // Foundations in the top row: columns 3, 4, 5, 6
    return { x: this.getColumnX(3 + index), y: this.boardOffsetY };
  }

  // ===== RENDERING =====

  private createBoard(): void { this.drawSlots(); }
  private rebuildBoard(): void { this.drawSlots(); }

  private drawSlots(): void {
    this.slotGraphics.forEach(g => g.destroy());
    this.slotGraphics = [];

    // 4 Foundation slots (right side of top row)
    for (let i = 0; i < 4; i++) {
      const pos = this.getFoundationPosition(i);
      const suitSymbols = ['♠', '♥', '♦', '♣'];
      this.createSlot(pos.x, pos.y, suitSymbols[i]);
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

    // Cascade cards
    for (let col = 0; col < 7; col++) {
      const cascade = state.cascades[col];
      for (let row = 0; row < cascade.length; row++) {
        const sprite = this.cardSprites.get(cascade[row].id);
        if (sprite) {
          const pos = this.getCascadeCardPosition(col, row);
          sprite.x = pos.x; sprite.y = pos.y;
          sprite.sourceLocation = { type: 'cascade', index: col, cardIndex: row };
          sprite.setDepth(row + 10);
        }
      }
    }

    // Foundation cards
    const suitOrder = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs];
    for (let i = 0; i < 4; i++) {
      const suit = suitOrder[i];
      const pile = state.foundations.get(suit)!;
      const pos = this.getFoundationPosition(i);
      for (let j = 0; j < pile.length; j++) {
        const sprite = this.cardSprites.get(pile[j].id);
        if (sprite) {
          sprite.x = pos.x; sprite.y = pos.y;
          sprite.sourceLocation = { type: 'foundation', suit };
          sprite.setDepth(60 + j);
        }
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

    // Deal cascade cards
    for (let col = 0; col < 7; col++) {
      const cascade = state.cascades[col];
      for (let row = 0; row < cascade.length; row++) {
        const card = cascade[row];
        const pos = this.getCascadeCardPosition(col, row);

        if (staggered) {
          const sprite = this.createCardSprite(card, w / 2 - this.cardWidth / 2, -this.cardHeight);
          sprite.sourceLocation = { type: 'cascade', index: col, cardIndex: row };
          sprite.setDepth(500 + dealIndex);
          sprite.setScale(0.94);
          sprite.alpha = 0;

          const delay = dealIndex * 18; // Slightly faster since we have 52 cards to deal
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
          sprite.sourceLocation = { type: 'cascade', index: col, cardIndex: row };
          sprite.setDepth(row + 10);
        }
      }
    }

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
    const cascade = this.engine.getState().cascades[col];
    if (cascade.length === 0) return -1;

    // In Yukon, any face-up card can be picked up (not just valid runs)
    // Find the first face-up card index
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

  private executeMoveAndAnimate(from: YukonLocation, to: YukonLocation): void {
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
    const suitOrder = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
    const cardQueue: { card: Card; foundationIdx: number }[] = [];
    for (let rank = 13; rank >= 1; rank--) {
      for (let si = 0; si < 4; si++) {
        const pile = state.foundations.get(suitOrder[si]);
        if (pile && pile.length >= rank) {
          cardQueue.push({ card: pile[rank - 1], foundationIdx: si });
        }
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
        const { card, foundationIdx } = cardQueue[launchIndex];
        const pos = this.getFoundationPosition(foundationIdx);

        const sprite = this.cardSprites.get(card.id);
        if (!sprite) { launchIndex++; return; }

        sprite.setDepth(2000 + launchIndex);
        sprite.setPosition(pos.x, pos.y);

        const launchAngle = -Math.PI * (0.2 + Math.random() * 0.6);
        const speed = 4 + Math.random() * 5;

        activeCards.push({
          sprite,
          x: pos.x,
          y: pos.y,
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
        // Try cascades
        let moved = false;
        const state = this.engine.getState();
        for (let i = 0; i < 7; i++) {
          const cascade = state.cascades[i];
          if (cascade.length === 0) continue;
          const card = cascade[cascade.length - 1];
          if (!card.isFaceUp) continue;
          const from: YukonLocation = { type: 'cascade', index: i };
          const to: YukonLocation = { type: 'foundation', suit: card.suit };
          if (this.engine.isLegalMove(from, to)) {
            this.engine.executeMove(from, to);
            moved = true;
            break;
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

  private flashHintCards(hint: YukonMove): void {
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

  private tryStartDrag(x: number, y: number): void {
    // Check cascade card drag — Yukon has no stock/waste
    const col = this.getCascadeColumnAtPoint(x, y);
    if (col !== -1) {
      const cascade = this.engine.getState().cascades[col];
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
        this.activeDragFrom = { type: 'cascade', index: col, cardIndex: cardY };
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

    // Check foundation drop (single card only)
    if (this.activeDragCards.length === 1) {
      const fIdx = this.getFoundationIndexAtPoint(x, y);
      if (fIdx !== -1) {
        const suitOrder = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs];
        const to: YukonLocation = { type: 'foundation', suit: suitOrder[fIdx] };
        if (this.engine.isLegalMove(this.activeDragFrom, to)) {
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

    // Check cascade drop
    const col = this.getCascadeColumnAtPoint(x, y);
    if (col !== -1) {
      const to: YukonLocation = { type: 'cascade', index: col };
      if (this.engine.isLegalMove(this.activeDragFrom, to)) {
        this.pendingSettledMove = { from: this.activeDragFrom, to };
        this.isDragging = false;
        this.isSettlingDrag = true;
        const tgtRow = this.engine.getState().cascades[col].length;
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

    if (this.activeDragFrom.type === 'cascade') {
      const cascadeFrom = this.activeDragFrom as { type: 'cascade'; index: number; cardIndex: number };
      this.settleTargets = this.activeDragCards.map((_, i) => this.getCascadeCardPosition(cascadeFrom.index, cascadeFrom.cardIndex + i));
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

  // Double-tap to send to foundation
  private lastTapTime: number = 0;
  private lastTapCardId: string | null = null;

  private handleTapOrDoubleTap(x: number, y: number): void {
    const now = Date.now();
    const state = this.engine.getState();

    let tappedCardId: string | null = null;
    let tappedFrom: YukonLocation | null = null;

    // Check cascades
    const col = this.getCascadeColumnAtPoint(x, y);
    if (col !== -1) {
      const cascade = state.cascades[col];
      if (cascade.length > 0) {
        const topCard = cascade[cascade.length - 1];
        if (topCard.isFaceUp) {
          const sprite = this.cardSprites.get(topCard.id);
          if (sprite && this.isPointWithinCardBounds(x, y, sprite.x, sprite.y, this.cardWidth, this.cardHeight)) {
            tappedCardId = topCard.id;
            tappedFrom = { type: 'cascade', index: col };
          }
        }
      }
    }

    if (tappedCardId && tappedFrom && tappedCardId === this.lastTapCardId && now - this.lastTapTime < 400) {
      // Double tap — try to send to foundation
      const to: YukonLocation = { type: 'foundation' };
      if (this.engine.isLegalMove(tappedFrom, to)) {
        this.executeMoveAndAnimate(tappedFrom, to);
        this.lastTapCardId = null;
        this.lastTapTime = 0;
        return;
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
