import * as Phaser from 'phaser';
import { AccordionEngine, AccordionLocation, AccordionMove } from '../engine/AccordionEngine';
import { dealAccordionGame } from '../engine/Deck';
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
const SIDE_MARGIN = 0.015;
const GAP = 0.01;
const MAX_COLS = 13;
const MIN_CASCADE_OVERLAP_PX = 16;
const MAX_CASCADE_OVERLAP_FRAC = 0.35;

interface CardSprite extends Phaser.GameObjects.Container {
  cardData: Card;
  sourceLocation: AccordionLocation;
}

export class AccordionScene extends Phaser.Scene {
  private engine!: AccordionEngine;
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
  private numCols: number = MAX_COLS;

  // Drag
  private activeDragCards: CardSprite[] = [];
  private activeDragFrom: number = -1;
  private activeDragTarget: { x: number; y: number } | null = null;
  private activeDragOffsets: { x: number; y: number } = { x: 0, y: 0 };
  private isDragging: boolean = false;
  private lastDragPointerPosition: { x: number; y: number } | null = null;
  private isSettlingDrag: boolean = false;

  // Selection
  private selectedPileIndex: number = -1;
  private highlightGraphics: Phaser.GameObjects.Graphics[] = [];

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
    super({ key: 'AccordionScene' });
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
    const { cards } = dealAccordionGame(this.gameNumber);
    this.engine = new AccordionEngine(this.gameNumber, cards);
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
    this.dealCards(true);

    this.scaleResizeHandler = () => {
      if (this.isDealAnimating) {
        this.pendingResize = true;
        return;
      }
      this.calculateLayout();
      this.drawBackgroundEffects();
      this.recreateAllCardSprites();
      this.repositionAllCards();
      this.clearHighlights();
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
      // No auto-finish for Accordion
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
      this.recreateAllCardSprites();
      this.repositionAllCards();
    });
    this.bridgeUnsubscribers.push(unsubThemeChanged);

    const unsubUpdateSettings = gameBridge.on('updateSettings', (newSettings: unknown) => {
      const prev = this.settings;
      this.settings = newSettings as GameSettings;
      if (prev?.largeCards !== this.settings.largeCards) {
        this.calculateLayout();
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
    this.activeDragFrom = -1;
    this.isDragging = false;
    this.isSettlingDrag = false;
    this.isDealAnimating = false;
    this.pendingResize = false;
    this.selectedPileIndex = -1;
    this.clearHighlights();

    this.gameNumber = gameNumber;
    const { cards } = dealAccordionGame(this.gameNumber);
    this.engine = new AccordionEngine(this.gameNumber, cards);

    this.calculateLayout();
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

  private calculateLayout(): void {
    const w = this.scale.width;
    const h = this.scale.height;
    this.isPortrait = h > w * 1.1;

    const largeCardsScale = this.settings?.largeCards ? 1.3 : 1.0;

    // Determine number of columns based on number of piles
    const numPiles = this.engine.getState().piles.length;
    this.numCols = this.isPortrait ? Math.min(7, numPiles) : Math.min(MAX_COLS, numPiles);

    const usableWidth = w * (1 - 2 * SIDE_MARGIN);
    const gapPx = w * GAP;
    const cardWidthFromWidth = Math.floor(((usableWidth - (this.numCols - 1) * gapPx) / this.numCols) * largeCardsScale);
    const cardHeightFromWidth = Math.floor(cardWidthFromWidth * CARD_RATIO);

    const numRows = Math.ceil(numPiles / this.numCols);
    const topPad = Math.max(Math.floor(h * 0.01), 4);
    const rowGap = Math.floor(h * 0.008);

    // Calculate card height to fit vertically
    const maxPileLen = Math.max(...this.engine.getState().piles.map(p => p.length), 1);
    const overlapPerCard = maxPileLen > 1 ? Math.min(MIN_CASCADE_OVERLAP_PX, 12) : 0;
    const pileVisualHeight = cardHeightFromWidth + (maxPileLen - 1) * overlapPerCard;
    const vertBudget = h - topPad - (numRows - 1) * rowGap - 4;
    const maxCardHeightFromVert = Math.floor(vertBudget / numRows - (maxPileLen - 1) * overlapPerCard);

    if (this.isPortrait) {
      this.cardHeight = Math.min(cardHeightFromWidth, Math.max(maxCardHeightFromVert, 40));
      this.cardWidth = Math.floor(this.cardHeight / CARD_RATIO);
    } else {
      this.cardHeight = Math.min(cardHeightFromWidth, Math.max(maxCardHeightFromVert, 40));
      this.cardWidth = Math.min(cardWidthFromWidth, Math.floor(this.cardHeight / CARD_RATIO));
    }

    this.boardOffsetX = Math.floor((w - (this.numCols * this.cardWidth + (this.numCols - 1) * gapPx)) / 2);
    this.boardOffsetY = topPad;
  }

  private getPilePosition(pileIndex: number): { x: number; y: number } {
    const col = pileIndex % this.numCols;
    const row = Math.floor(pileIndex / this.numCols);
    const gapPx = this.scale.width * GAP;
    const rowGap = Math.floor(this.scale.height * 0.008);

    // Calculate pile visual height for row offset
    const maxPileLen = Math.max(...this.engine.getState().piles.map(p => p.length), 1);
    const overlap = this.getPileOverlap();
    const pileVisualHeight = this.cardHeight + Math.max(0, maxPileLen - 1) * overlap;
    const rowHeight = pileVisualHeight + rowGap;

    const x = this.boardOffsetX + col * (this.cardWidth + gapPx);
    const y = this.boardOffsetY + row * rowHeight;
    return { x, y };
  }

  private getPileOverlap(): number {
    const maxPileLen = Math.max(...this.engine.getState().piles.map(p => p.length), 1);
    if (maxPileLen <= 1) return 0;
    const maxOverlap = Math.floor(this.cardHeight * MAX_CASCADE_OVERLAP_FRAC);
    return Math.min(MIN_CASCADE_OVERLAP_PX, maxOverlap);
  }

  private getPileCardPosition(pileIndex: number, cardRow: number): { x: number; y: number } {
    const base = this.getPilePosition(pileIndex);
    const overlap = this.getPileOverlap();
    return { x: base.x, y: base.y + cardRow * overlap };
  }

  // ===== RENDERING =====

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

  private getCardTextureKey(card: Card): string | null {
    if (!card.isFaceUp) {
      return getCardBackAssetKey(this.currentCardStyle.id);
    }

    if (this.currentCardStyle.renderer === 'image') {
      return getCardAssetKey(card.suit, card.rank, this.currentCardStyle.id);
    }

    return null;
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

    for (let pileIdx = 0; pileIdx < state.piles.length; pileIdx++) {
      const pile = state.piles[pileIdx];
      for (let cardRow = 0; cardRow < pile.length; cardRow++) {
        const card = pile[cardRow];
        const sprite = this.cardSprites.get(card.id);
        if (sprite) {
          const pos = this.getPileCardPosition(pileIdx, cardRow);
          sprite.x = pos.x;
          sprite.y = pos.y;
          sprite.sourceLocation = { type: 'pile', index: pileIdx };
          sprite.setDepth(pileIdx * 20 + cardRow + 10);
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

    for (let pileIdx = 0; pileIdx < state.piles.length; pileIdx++) {
      const pile = state.piles[pileIdx];
      for (let cardRow = 0; cardRow < pile.length; cardRow++) {
        const card = pile[cardRow];
        const pos = this.getPileCardPosition(pileIdx, cardRow);

        if (staggered) {
          const sprite = this.createCardSprite(card, w / 2 - this.cardWidth / 2, -this.cardHeight);
          sprite.sourceLocation = { type: 'pile', index: pileIdx };
          sprite.setDepth(500 + dealIndex);
          sprite.setScale(0.94);
          sprite.alpha = 0;

          const delay = dealIndex * 15;
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
            sprite.setDepth(pileIdx * 20 + cardRow + 10);
          });
          dealIndex++;
        } else {
          const sprite = this.createCardSprite(card, pos.x, pos.y);
          sprite.sourceLocation = { type: 'pile', index: pileIdx };
          sprite.setDepth(pileIdx * 20 + cardRow + 10);
        }
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

  // ===== SELECTION & HIGHLIGHTS =====

  private clearHighlights(): void {
    for (const g of this.highlightGraphics) {
      g.destroy();
    }
    this.highlightGraphics = [];
  }

  private drawSelectionHighlight(pileIndex: number): void {
    this.clearHighlights();
    const state = this.engine.getState();
    if (pileIndex < 0 || pileIndex >= state.piles.length) return;

    // Highlight selected pile
    const pile = state.piles[pileIndex];
    const topCardRow = pile.length - 1;
    const pos = this.getPileCardPosition(pileIndex, topCardRow);
    const g = this.add.graphics();
    g.lineStyle(3, 0xffd700, 0.9);
    g.strokeRoundedRect(pos.x - 2, pos.y - 2, this.cardWidth + 4, this.cardHeight + 4, 8);
    g.setDepth(9000);
    this.highlightGraphics.push(g);

    // Highlight valid targets
    const targets = this.engine.getValidTargets(pileIndex);
    for (const tIdx of targets) {
      const tPile = state.piles[tIdx];
      const tTopRow = tPile.length - 1;
      const tPos = this.getPileCardPosition(tIdx, tTopRow);
      const tg = this.add.graphics();
      tg.lineStyle(3, 0x44ff44, 0.8);
      tg.strokeRoundedRect(tPos.x - 2, tPos.y - 2, this.cardWidth + 4, this.cardHeight + 4, 8);
      tg.setDepth(9000);
      this.highlightGraphics.push(tg);
    }
  }

  // ===== ENGINE INTERACTION & ANIMATION =====

  private executeMoveAndAnimate(fromIndex: number, toIndex: number): void {
    try {
      const move = this.engine.executeMove(fromIndex, toIndex);
      soundManager.cardPlace();

      this.selectedPileIndex = -1;
      this.clearHighlights();

      this.calculateLayout();

      this.time.delayedCall(50, () => {
        this.recreateAllCardSprites();
        this.repositionAllCards();

        gameBridge.emit('moveExecuted', {
          moveCount: this.engine.getMoveCount(),
          gameNumber: this.gameNumber,
        });

        if (this.engine.getState().isWon) {
          this.handleWin();
        } else if (this.engine.isDeadlocked()) {
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
    this.selectedPileIndex = -1;
    this.clearHighlights();
    this.calculateLayout();
    this.recreateAllCardSprites();
    this.repositionAllCards();

    gameBridge.emit('moveExecuted', {
      moveCount: this.engine.getMoveCount(),
      gameNumber: this.gameNumber,
    });
  }

  private flashHintCards(hint: AccordionMove): void {
    // Flash the source card
    const state = this.engine.getState();
    const fromPile = state.piles[hint.from.index];
    if (fromPile && fromPile.length > 0) {
      const topCard = fromPile[fromPile.length - 1];
      const sprite = this.cardSprites.get(topCard.id);
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

    // Also flash the target
    const toPile = state.piles[hint.to.index];
    if (toPile && toPile.length > 0) {
      const topCard = toPile[toPile.length - 1];
      const sprite = this.cardSprites.get(topCard.id);
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

  // ===== WIN CELEBRATION =====

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

    // Get all cards from the single remaining pile
    const state = this.engine.getState();
    const pile = state.piles[0];
    if (!pile) return;

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

    // Launch cards from the pile
    const cardQueue = pile.slice().reverse();

    const launchTimer = this.time.addEvent({
      delay: 150,
      repeat: Math.min(cardQueue.length - 1, 51),
      callback: () => {
        if (launchIndex >= cardQueue.length) return;
        const card = cardQueue[launchIndex];
        const pos = this.getPilePosition(0);

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

  private getPileAtPoint(x: number, y: number): number {
    const state = this.engine.getState();

    for (let pileIdx = 0; pileIdx < state.piles.length; pileIdx++) {
      const pile = state.piles[pileIdx];
      const overlap = this.getPileOverlap();
      const basePos = this.getPilePosition(pileIdx);

      // Width check
      if (x < basePos.x - 5 || x > basePos.x + this.cardWidth + 5) continue;

      // Height check: from base to top of last card
      const pileHeight = this.cardHeight + Math.max(0, pile.length - 1) * overlap;
      if (y >= basePos.y - 5 && y <= basePos.y + pileHeight + 5) {
        return pileIdx;
      }
    }
    return -1;
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

  private handleTap(x: number, y: number): void {
    const pileIdx = this.getPileAtPoint(x, y);

    if (pileIdx === -1) {
      // Tapped empty area — deselect
      this.selectedPileIndex = -1;
      this.clearHighlights();
      return;
    }

    if (this.selectedPileIndex === -1) {
      // No selection yet — select this pile
      this.selectedPileIndex = pileIdx;
      this.drawSelectionHighlight(pileIdx);
      soundManager.cardSelect();
      return;
    }

    if (this.selectedPileIndex === pileIdx) {
      // Tapped same pile — deselect
      this.selectedPileIndex = -1;
      this.clearHighlights();
      return;
    }

    // We have a selection and tapped a different pile — try to move
    if (this.engine.isLegalMove(this.selectedPileIndex, pileIdx)) {
      this.executeMoveAndAnimate(this.selectedPileIndex, pileIdx);
    } else {
      // Not a valid target — select the new pile instead
      soundManager.invalidMove();
      this.selectedPileIndex = pileIdx;
      this.drawSelectionHighlight(pileIdx);
    }
  }

  private tryStartDrag(x: number, y: number): void {
    const pileIdx = this.getPileAtPoint(x, y);
    if (pileIdx === -1) return;

    const state = this.engine.getState();
    const pile = state.piles[pileIdx];
    if (pile.length === 0) return;

    // Only drag the top card
    const topCard = pile[pile.length - 1];
    const sprite = this.cardSprites.get(topCard.id);
    if (sprite) {
      this.activeDragCards = [sprite];
      sprite.setDepth(5000);
      this.tweens.killTweensOf(sprite);
      sprite.setScale(1.04);

      this.activeDragFrom = pileIdx;
      this.activeDragOffsets = { x: x - sprite.x, y: y - sprite.y };
      this.activeDragTarget = { x, y };
      this.lastDragPointerPosition = { x, y };
      this.isDragging = true;
      soundManager.cardSelect();
    }
  }

  private tryDropDrag(x: number, y: number): void {
    if (this.activeDragFrom === -1 || this.activeDragCards.length === 0) return;

    const pileIdx = this.getPileAtPoint(x, y);
    if (pileIdx !== -1 && this.engine.isLegalMove(this.activeDragFrom, pileIdx)) {
      // Valid drop
      this.isDragging = false;
      this.isSettlingDrag = true;
      const pos = this.getPileCardPosition(pileIdx, this.engine.getState().piles[pileIdx].length);
      this.animateDraggedCardsToTarget(pos, () => {
        this.isSettlingDrag = false;
        this.executeMoveAndAnimate(this.activeDragFrom, pileIdx);
        this.activeDragCards = [];
        this.activeDragFrom = -1;
      });
      return;
    }

    // Invalid drop — snap back
    soundManager.invalidMove();
    this.isDragging = false;
    this.isSettlingDrag = true;

    const state = this.engine.getState();
    const fromPile = state.piles[this.activeDragFrom];
    const snapRow = Math.max(0, fromPile.length - 1);
    const snapPos = this.getPileCardPosition(this.activeDragFrom, snapRow);

    this.animateDraggedCardsToTarget(snapPos, () => {
      this.isSettlingDrag = false;
      this.activeDragCards.forEach((card) => {
        card.setScale(1);
        card.angle = 0;
      });
      this.activeDragCards = [];
      this.activeDragFrom = -1;
    });
  }

  private animateDraggedCardsToTarget(
    target: { x: number; y: number },
    onComplete: () => void
  ): void {
    if (this.activeDragCards.length === 0) {
      onComplete();
      return;
    }

    const card = this.activeDragCards[0];
    this.tweens.killTweensOf(card);
    this.tweens.add({
      targets: card,
      x: target.x,
      y: target.y,
      angle: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 135,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        onComplete();
      }
    });
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
          this.activeDragFrom = -1;
          this.handleTap(x, y);
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
          this.activeDragFrom = -1;
          this.handleTap(x, y);
        } else {
          this.tryDropDrag(x, y);
        }
      }
    }) as EventListener, { passive: false });
  }
}
