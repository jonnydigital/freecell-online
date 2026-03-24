import * as Phaser from 'phaser';
import { BisleyEngine, BisleyLocation, BisleyMove } from '../engine/BisleyEngine';
import { dealBisleyGame } from '../engine/Deck';
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
const NUM_COLS = 13;       // 13 tableau columns
const NUM_ACE_FOUNDATIONS = 4;
const NUM_KING_FOUNDATIONS = 4;

interface CardSprite extends Phaser.GameObjects.Container {
  cardData: Card;
  sourceLocation: BisleyLocation;
}

export class BisleyScene extends Phaser.Scene {
  private engine!: BisleyEngine;
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

  // Drag — single card only
  private activeDragCards: CardSprite[] = [];
  private activeDragFrom: BisleyLocation | null = null;
  private activeDragTarget: { x: number; y: number } | null = null;
  private activeDragOffsets: { x: number; y: number } = { x: 0, y: 0 };
  private isDragging: boolean = false;
  private dragSource: 'touch' | 'mouse' | null = null;
  private activeDragVelocities: { x: number; y: number }[] = [];
  private lastDragPointerPosition: { x: number; y: number } | null = null;
  private settleTargets: { x: number; y: number }[] = [];
  private isSettlingDrag: boolean = false;
  private pendingSettledMove: { from: BisleyLocation; to: BisleyLocation } | null = null;

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
    super({ key: 'BisleyScene' });
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
    const { tableau, aces } = dealBisleyGame(this.gameNumber);
    this.engine = new BisleyEngine(this.gameNumber, tableau, aces);
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
    const { tableau, aces } = dealBisleyGame(this.gameNumber);
    this.engine = new BisleyEngine(this.gameNumber, tableau, aces);

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

    // Layout: 13 columns for tableau, foundations above
    const usableWidth = w * (1 - 2 * SIDE_MARGIN);
    const gapPx = w * GAP;
    const cardWidthFromWidth = Math.floor(((usableWidth - (NUM_COLS - 1) * gapPx) / NUM_COLS) * largeCardsScale);
    const cardHeightFromWidth = Math.floor(cardWidthFromWidth * CARD_RATIO);

    const topPad = Math.max(Math.floor(h * 0.005), 2);
    this.cascadeGap = Math.floor(h * 0.008);

    const vertBudget = h - topPad - this.cascadeGap - 4;
    const maxCardHeight = Math.floor((vertBudget - 6 * MIN_CASCADE_OVERLAP_PX) / 3);

    if (this.isPortrait) {
      this.cardHeight = cardHeightFromWidth;
      this.cardWidth = cardWidthFromWidth;
    } else {
      this.cardHeight = Math.min(cardHeightFromWidth, maxCardHeight);
      this.cardWidth = this.cardHeight === cardHeightFromWidth ? cardWidthFromWidth : Math.floor(this.cardHeight / CARD_RATIO);
    }

    this.boardOffsetX = Math.floor((w - (NUM_COLS * this.cardWidth + (NUM_COLS - 1) * gapPx)) / 2);
    this.boardOffsetY = topPad;
    this.foundationRowHeight = this.cardHeight;
    this.invalidateOverlapCache();
  }

  private getColumnX(col: number): number {
    return this.boardOffsetX + col * (this.cardWidth + this.scale.width * GAP);
  }

  private getCurrentOverlap(): number {
    if (this.cachedOverlap !== null) return this.cachedOverlap;
    const state = this.engine.getState();
    const maxPileLength = Math.max(...state.tableau.map(c => c.length), 1);

    // Tableau starts below king foundations row + gap + ace foundations row + gap
    const tableauStartY = this.getTableauBaseY();
    const availableHeight = this.scale.height - tableauStartY - 4;

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

  // King foundations: top row (centered in first 4 columns area)
  private getKingFoundationPosition(index: number): { x: number; y: number } {
    return { x: this.getColumnX(index), y: this.boardOffsetY };
  }

  // Ace foundations: second row (also first 4 columns area)
  private getAceFoundationPosition(index: number): { x: number; y: number } {
    return { x: this.getColumnX(index), y: this.boardOffsetY + this.foundationRowHeight + this.cascadeGap };
  }

  private getTableauBaseY(): number {
    return this.boardOffsetY + this.foundationRowHeight * 2 + this.cascadeGap * 3;
  }

  private getTableauCardPosition(col: number, row: number): { x: number; y: number } {
    const baseY = this.getTableauBaseY();
    const overlap = this.getCurrentOverlap();
    return { x: this.getColumnX(col), y: baseY + row * overlap };
  }

  // ===== RENDERING =====

  private createBoard(): void { this.drawSlots(); }
  private rebuildBoard(): void { this.drawSlots(); }

  private drawSlots(): void {
    this.slotGraphics.forEach(g => g.destroy());
    this.slotGraphics = [];

    const foundationLabels = ['\u2660', '\u2665', '\u2666', '\u2663'];

    // King foundation slots (top row, columns 0-3)
    for (let i = 0; i < NUM_KING_FOUNDATIONS; i++) {
      const pos = this.getKingFoundationPosition(i);
      this.createSlot(pos.x, pos.y, 'K' + foundationLabels[i]);
    }

    // Ace foundation slots (second row, columns 0-3)
    for (let i = 0; i < NUM_ACE_FOUNDATIONS; i++) {
      const pos = this.getAceFoundationPosition(i);
      this.createSlot(pos.x, pos.y, foundationLabels[i]);
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

    // Tableau cards (13 columns)
    for (let col = 0; col < NUM_COLS; col++) {
      const colCards = state.tableau[col];
      for (let row = 0; row < colCards.length; row++) {
        const sprite = this.cardSprites.get(colCards[row].id);
        if (sprite) {
          const pos = this.getTableauCardPosition(col, row);
          sprite.x = pos.x; sprite.y = pos.y;
          sprite.sourceLocation = { type: 'tableau', index: col };
          sprite.setDepth(col * 10 + row + 10);
        }
      }
    }

    // Ace foundation cards
    for (let i = 0; i < NUM_ACE_FOUNDATIONS; i++) {
      const suit = this.FOUNDATION_SUITS[i];
      const pile = state.aceFoundations.get(suit)!;
      const pos = this.getAceFoundationPosition(i);
      for (let j = 0; j < pile.length; j++) {
        const sprite = this.cardSprites.get(pile[j].id);
        if (sprite) {
          sprite.x = pos.x; sprite.y = pos.y;
          sprite.sourceLocation = { type: 'aceFoundation', suit };
          sprite.setDepth(200 + j);
        }
      }
    }

    // King foundation cards
    for (let i = 0; i < NUM_KING_FOUNDATIONS; i++) {
      const suit = this.FOUNDATION_SUITS[i];
      const pile = state.kingFoundations.get(suit)!;
      const pos = this.getKingFoundationPosition(i);
      for (let j = 0; j < pile.length; j++) {
        const sprite = this.cardSprites.get(pile[j].id);
        if (sprite) {
          sprite.x = pos.x; sprite.y = pos.y;
          sprite.sourceLocation = { type: 'kingFoundation', suit };
          sprite.setDepth(300 + j);
        }
      }
    }

    // Draw meet indicators
    this.drawMeetIndicators();
  }

  private meetIndicatorGraphics: Phaser.GameObjects.GameObject[] = [];

  private drawMeetIndicators(): void {
    for (const g of this.meetIndicatorGraphics) g.destroy();
    this.meetIndicatorGraphics = [];

    for (let i = 0; i < NUM_ACE_FOUNDATIONS; i++) {
      const suit = this.FOUNDATION_SUITS[i];
      if (this.engine.isSuitAboutToMeet(suit)) {
        // Draw a glow between the ace and king foundation
        const acePos = this.getAceFoundationPosition(i);
        const kingPos = this.getKingFoundationPosition(i);
        const glow = this.add.graphics();
        glow.fillStyle(0xffd700, 0.2);
        glow.fillRoundedRect(kingPos.x - 3, kingPos.y - 3, this.cardWidth + 6, this.cardHeight + 6, 8);
        glow.fillRoundedRect(acePos.x - 3, acePos.y - 3, this.cardWidth + 6, this.cardHeight + 6, 8);
        glow.setDepth(5);
        this.meetIndicatorGraphics.push(glow);
      }
      if (this.engine.isSuitComplete(suit)) {
        const acePos = this.getAceFoundationPosition(i);
        const kingPos = this.getKingFoundationPosition(i);
        const glow = this.add.graphics();
        glow.fillStyle(0x00ff00, 0.15);
        glow.fillRoundedRect(kingPos.x - 3, kingPos.y - 3, this.cardWidth + 6, this.cardHeight + 6, 8);
        glow.fillRoundedRect(acePos.x - 3, acePos.y - 3, this.cardWidth + 6, this.cardHeight + 6, 8);
        glow.setDepth(5);
        this.meetIndicatorGraphics.push(glow);
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

    // First: animate aces flying to ace foundations
    for (let i = 0; i < NUM_ACE_FOUNDATIONS; i++) {
      const suit = this.FOUNDATION_SUITS[i];
      const pile = state.aceFoundations.get(suit)!;
      if (pile.length === 0) continue;

      const ace = pile[0];
      const pos = this.getAceFoundationPosition(i);

      if (staggered) {
        const sprite = this.createCardSprite(ace, w / 2 - this.cardWidth / 2, -this.cardHeight);
        sprite.sourceLocation = { type: 'aceFoundation', suit };
        sprite.setDepth(500 + dealIndex);
        sprite.setScale(0.94);
        sprite.alpha = 0;

        const delay = dealIndex * 80;
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
          soundManager.cardToFoundation(1);
          sprite.setDepth(200);
        });
        dealIndex++;
      } else {
        const sprite = this.createCardSprite(ace, pos.x, pos.y);
        sprite.sourceLocation = { type: 'aceFoundation', suit };
        sprite.setDepth(200);
      }
    }

    // Then: deal tableau cards (13 columns)
    const cascadeStartDelay = staggered ? dealIndex * 80 + 200 : 0;
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

          const delay = cascadeStartDelay + (dealIndex - 4) * 18;
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

  private executeMoveAndAnimate(from: BisleyLocation, to: BisleyLocation): void {
    try {
      const move = this.engine.executeMove(from, to);
      soundManager.cardPlace();

      if (move.cards.length > 0 && (to.type === 'aceFoundation' || to.type === 'kingFoundation')) {
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

    // Gather cards from both foundation types
    for (let fi = 0; fi < NUM_ACE_FOUNDATIONS; fi++) {
      const suit = this.FOUNDATION_SUITS[fi];
      const acePile = state.aceFoundations.get(suit)!;
      const pos = this.getAceFoundationPosition(fi);
      for (let rank = acePile.length; rank >= 1; rank--) {
        cardQueue.push({ card: acePile[rank - 1], posX: pos.x, posY: pos.y });
      }
      const kingPile = state.kingFoundations.get(suit)!;
      const kpos = this.getKingFoundationPosition(fi);
      for (let rank = kingPile.length; rank >= 1; rank--) {
        cardQueue.push({ card: kingPile[rank - 1], posX: kpos.x, posY: kpos.y });
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

        for (let i = 0; i < NUM_COLS; i++) {
          const colCards = state.tableau[i];
          if (colCards.length === 0) continue;
          const card = colCards[colCards.length - 1];
          const from: BisleyLocation = { type: 'tableau', index: i };

          // Try ace foundation
          const toAce: BisleyLocation = { type: 'aceFoundation', suit: card.suit };
          if (this.engine.isLegalMove(from, toAce)) {
            this.engine.executeMove(from, toAce);
            moved = true;
            break;
          }

          // Try king foundation
          const toKing: BisleyLocation = { type: 'kingFoundation', suit: card.suit };
          if (this.engine.isLegalMove(from, toKing)) {
            this.engine.executeMove(from, toKing);
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

  private flashHintCards(hint: BisleyMove): void {
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

    for (let col = 0; col < NUM_COLS; col++) {
      const cx = this.getColumnX(col);
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

  private getAceFoundationIndexAtPoint(x: number, y: number): number {
    for (let i = 0; i < NUM_ACE_FOUNDATIONS; i++) {
      const pos = this.getAceFoundationPosition(i);
      if (x >= pos.x - 5 && x <= pos.x + this.cardWidth + 5 &&
        y >= pos.y - 5 && y <= pos.y + this.cardHeight + 5) {
        return i;
      }
    }
    return -1;
  }

  private getKingFoundationIndexAtPoint(x: number, y: number): number {
    for (let i = 0; i < NUM_KING_FOUNDATIONS; i++) {
      const pos = this.getKingFoundationPosition(i);
      if (x >= pos.x - 5 && x <= pos.x + this.cardWidth + 5 &&
        y >= pos.y - 5 && y <= pos.y + this.cardHeight + 5) {
        return i;
      }
    }
    return -1;
  }

  private tryStartDrag(x: number, y: number): void {
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

    // Check ace foundation drop
    const aceIdx = this.getAceFoundationIndexAtPoint(x, y);
    if (aceIdx !== -1) {
      const suit = this.FOUNDATION_SUITS[aceIdx];
      const to: BisleyLocation = { type: 'aceFoundation', suit };
      if (this.engine.isLegalMove(this.activeDragFrom, to)) {
        this.pendingSettledMove = { from: this.activeDragFrom, to };
        this.isDragging = false;
        this.isSettlingDrag = true;
        const pos = this.getAceFoundationPosition(aceIdx);
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

    // Check king foundation drop
    const kingIdx = this.getKingFoundationIndexAtPoint(x, y);
    if (kingIdx !== -1) {
      const suit = this.FOUNDATION_SUITS[kingIdx];
      const to: BisleyLocation = { type: 'kingFoundation', suit };
      if (this.engine.isLegalMove(this.activeDragFrom, to)) {
        this.pendingSettledMove = { from: this.activeDragFrom, to };
        this.isDragging = false;
        this.isSettlingDrag = true;
        const pos = this.getKingFoundationPosition(kingIdx);
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
      const to: BisleyLocation = { type: 'tableau', index: col };
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

    // Invalid drop, snap back
    soundManager.invalidMove();
    this.isDragging = false;
    this.isSettlingDrag = true;

    if (this.activeDragFrom.type === 'tableau') {
      const tableauFrom = this.activeDragFrom as { type: 'tableau'; index: number };
      const fromCol = this.engine.getState().tableau[tableauFrom.index];
      const snapRow = Math.max(0, fromCol.length - 1);
      this.settleTargets = [this.getTableauCardPosition(tableauFrom.index, snapRow)];
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
    let tappedFrom: BisleyLocation | null = null;

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

    if (tappedCardId && tappedFrom && tappedCardId === this.lastTapCardId && now - this.lastTapTime < 400) {
      const colCards = state.tableau[(tappedFrom as { type: 'tableau'; index: number }).index];
      const card = colCards.length > 0 ? colCards[colCards.length - 1] : null;

      if (card) {
        // Try ace foundation first
        const toAce: BisleyLocation = { type: 'aceFoundation', suit: card.suit };
        if (this.engine.isLegalMove(tappedFrom, toAce)) {
          this.executeMoveAndAnimate(tappedFrom, toAce);
          this.lastTapCardId = null;
          this.lastTapTime = 0;
          return;
        }
        // Try king foundation
        const toKing: BisleyLocation = { type: 'kingFoundation', suit: card.suit };
        if (this.engine.isLegalMove(tappedFrom, toKing)) {
          this.executeMoveAndAnimate(tappedFrom, toKing);
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
