import * as Phaser from 'phaser';
import { TriPeaksEngine, TriPeaksMove, ROW_COLS } from '../engine/TriPeaksEngine';
import { dealTriPeaksGame } from '../engine/Deck';
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
const SIDE_MARGIN = 0.03;

interface CardSprite extends Phaser.GameObjects.Container {
  cardData: Card;
  tableauRow?: number;
  tableauCol?: number;
  locationType: 'tableau' | 'stock' | 'waste' | 'removed';
}

export class TriPeaksScene extends Phaser.Scene {
  private engine!: TriPeaksEngine;
  private cardSprites: Map<string, CardSprite> = new Map();
  private gameNumber: number = 1;
  private settings!: GameSettings;
  private currentTheme: ThemeDefinition = themes[0];
  private currentCardStyle: CardStyleDefinition = getCardStyleById(DEFAULT_CARD_STYLE_ID);

  // Layout
  private cardWidth: number = 0;
  private cardHeight: number = 0;
  private isPortrait: boolean = false;

  // Selection state — TriPeaks doesn't use selection (click to play), but we highlight playable
  private playableHighlights: Phaser.GameObjects.Graphics[] = [];

  // Tracked listeners
  private trackedDomListeners: Array<{ target: EventTarget; type: string; listener: EventListenerOrEventListenerObject; options?: AddEventListenerOptions | boolean }> = [];
  private bridgeUnsubscribers: Array<() => void> = [];
  private scaleResizeHandler: ((gameSize: Phaser.Structs.Size) => void) | null = null;
  private isTouchDevice: boolean = false;

  // Deal animation
  private isDealAnimating: boolean = false;
  private pendingResize: boolean = false;

  // Visuals
  private vignette: Phaser.GameObjects.Graphics | null = null;
  private feltNoise: Phaser.GameObjects.Graphics | null = null;
  private slotGraphics: Phaser.GameObjects.GameObject[] = [];
  private streakText: Phaser.GameObjects.Text | null = null;
  private scoreText: Phaser.GameObjects.Text | null = null;

  // Win celebration
  private winCelebrationActive: boolean = false;
  private winCelebrationObjects: Phaser.GameObjects.GameObject[] = [];

  constructor() {
    super({ key: 'TriPeaksScene' });
  }

  // ===== BACKGROUND =====

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
    const { tableau, stock, waste } = dealTriPeaksGame(this.gameNumber);
    this.engine = new TriPeaksEngine(this.gameNumber, tableau, stock, waste);
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
    this.drawSlots();
    this.dealCards(true);

    this.scaleResizeHandler = () => {
      if (this.isDealAnimating) {
        this.pendingResize = true;
        return;
      }
      this.calculateLayout();
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
        this.drawSlots();
        this.recreateAllCardSprites();
        this.repositionAllCards();
      }
    });
    this.bridgeUnsubscribers.push(unsubUpdateSettings);

    // Input
    if (this.isTouchDevice) {
      this.setupTouchInput();
    } else {
      this.setupMouseInput();
    }
  }

  private restartWithNewGame(gameNumber: number): void {
    this.cleanupWinCelebration();
    this.clearPlayableHighlights();
    for (const sprite of this.cardSprites.values()) {
      sprite.destroy();
    }
    this.cardSprites.clear();
    this.isDealAnimating = false;
    this.pendingResize = false;

    this.gameNumber = gameNumber;
    const { tableau, stock, waste } = dealTriPeaksGame(this.gameNumber);
    this.engine = new TriPeaksEngine(this.gameNumber, tableau, stock, waste);

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

  // ===== LAYOUT =====

  private calculateLayout(): void {
    const w = this.scale.width;
    const h = this.scale.height;
    this.isPortrait = h > w * 1.1;

    const largeCardsScale = this.settings?.largeCards ? 1.3 : 1.0;

    // Base row has 10 cards with gaps
    const usableWidth = w * (1 - 2 * SIDE_MARGIN);
    const gapFrac = 0.08;
    const baseSlots = 10 + 9 * gapFrac;
    const cardWidthFromWidth = Math.floor((usableWidth / baseSlots) * largeCardsScale);
    const cardHeightFromWidth = Math.floor(cardWidthFromWidth * CARD_RATIO);

    // Vertical: 4 rows of overlapping cards + stock/waste row below
    const overlapFrac = 0.35;
    const tableauHeight = cardHeightFromWidth + 3 * (cardHeightFromWidth * overlapFrac);
    const bottomRowHeight = cardHeightFromWidth;
    const paddingTop = Math.max(8, h * 0.02);
    const paddingBottom = Math.max(8, h * 0.02);
    const totalNeededHeight = paddingTop + tableauHeight + h * 0.03 + bottomRowHeight + paddingBottom;

    if (totalNeededHeight > h) {
      const scale = h / totalNeededHeight;
      this.cardWidth = Math.floor(cardWidthFromWidth * scale);
      this.cardHeight = Math.floor(this.cardWidth * CARD_RATIO);
    } else {
      this.cardWidth = cardWidthFromWidth;
      this.cardHeight = cardHeightFromWidth;
    }
  }

  private getRowOverlap(): number {
    return Math.floor(this.cardHeight * 0.35);
  }

  private getCardGap(): number {
    return Math.floor(this.cardWidth * 0.08);
  }

  /**
   * Get the x,y position for a tableau card.
   * The layout uses absolute column indices mapped to screen positions.
   * Row 3 (base) has 10 columns (0-9).
   * We center the base row and align upper rows by matching column positions.
   */
  private getTableauCardPosition(row: number, col: number): { x: number; y: number } {
    const w = this.scale.width;
    const gap = this.getCardGap();

    // Base row (row 3) has 10 cards
    const baseWidth = 10 * this.cardWidth + 9 * gap;
    const baseStartX = (w - baseWidth) / 2;

    // Each column in the base corresponds to a position
    // Upper rows are offset by half a card width to create the pyramid overlap
    // Row 3: col 0-9 -> direct positions
    // Row 2: col 0-8 -> shifted right by half(cardWidth+gap)
    // Row 1: col 0-7 -> shifted right by cardWidth+gap from row 2 start
    // Row 0: col 0,3,6 -> same as row 1 offset

    const rowOffset = (3 - row) * (this.cardWidth + gap) / 2;
    const x = baseStartX + rowOffset + col * (this.cardWidth + gap);

    const paddingTop = Math.max(8, this.scale.height * 0.02);
    const overlap = this.getRowOverlap();
    const y = paddingTop + row * overlap;

    return { x, y };
  }

  private getStockPosition(): { x: number; y: number } {
    const w = this.scale.width;
    const paddingTop = Math.max(8, this.scale.height * 0.02);
    const overlap = this.getRowOverlap();
    const tableauBottom = paddingTop + 3 * overlap + this.cardHeight;
    const y = tableauBottom + Math.max(10, this.scale.height * 0.03);

    const x = Math.max(w * SIDE_MARGIN, (w - 10 * (this.cardWidth + this.getCardGap())) / 2);
    return { x, y };
  }

  private getWastePosition(): { x: number; y: number } {
    const stock = this.getStockPosition();
    return { x: stock.x + this.cardWidth + this.getCardGap() * 2, y: stock.y };
  }

  private getStreakPosition(): { x: number; y: number } {
    const waste = this.getWastePosition();
    return { x: waste.x + this.cardWidth + this.getCardGap() * 3, y: waste.y + this.cardHeight / 2 };
  }

  // ===== RENDERING =====

  private drawSlots(): void {
    this.slotGraphics.forEach(g => g.destroy());
    this.slotGraphics = [];
    if (this.streakText) { this.streakText.destroy(); this.streakText = null; }
    if (this.scoreText) { this.scoreText.destroy(); this.scoreText = null; }

    const slotColor = hexToInt(this.currentTheme.feltNoiseLight);

    // Stock slot
    const stockPos = this.getStockPosition();
    const stockGfx = this.add.graphics();
    stockGfx.lineStyle(2, slotColor, 0.8);
    stockGfx.strokeRoundedRect(stockPos.x, stockPos.y, this.cardWidth, this.cardHeight, 6);
    this.slotGraphics.push(stockGfx);

    const stockLabel = this.add.text(stockPos.x + this.cardWidth / 2, stockPos.y + this.cardHeight / 2, 'STOCK', {
      fontSize: `${Math.floor(this.cardWidth * 0.2)}px`,
      color: this.currentTheme.feltNoiseLight,
      fontFamily: 'serif',
    });
    stockLabel.setOrigin(0.5);
    this.slotGraphics.push(stockLabel);

    // Waste slot
    const wastePos = this.getWastePosition();
    const wasteGfx = this.add.graphics();
    wasteGfx.lineStyle(2, slotColor, 0.8);
    wasteGfx.strokeRoundedRect(wastePos.x, wastePos.y, this.cardWidth, this.cardHeight, 6);
    this.slotGraphics.push(wasteGfx);

    // Streak + Score display
    const streakPos = this.getStreakPosition();
    this.streakText = this.add.text(streakPos.x, streakPos.y - 12, '', {
      fontSize: `${Math.floor(this.cardWidth * 0.22)}px`,
      color: '#FFD700',
      fontFamily: 'sans-serif',
      fontStyle: 'bold',
    });
    this.streakText.setOrigin(0, 0.5);
    this.streakText.setDepth(100);

    this.scoreText = this.add.text(streakPos.x, streakPos.y + 12, '', {
      fontSize: `${Math.floor(this.cardWidth * 0.18)}px`,
      color: this.currentTheme.feltNoiseLight,
      fontFamily: 'sans-serif',
    });
    this.scoreText.setOrigin(0, 0.5);
    this.scoreText.setDepth(100);

    this.updateStreakDisplay();
  }

  private updateStreakDisplay(): void {
    const state = this.engine.getState();
    if (this.streakText) {
      this.streakText.setText(state.streak > 0 ? `Streak: ${state.streak}` : '');
    }
    if (this.scoreText) {
      this.scoreText.setText(`Score: ${state.score}`);
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
    container.locationType = 'tableau';
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
    const oldSprites: CardSprite[] = [];
    this.cardSprites.forEach((sprite) => oldSprites.push(sprite));
    this.cardSprites.clear();
    for (const sprite of oldSprites) {
      const newSprite = this.createCardSprite(sprite.cardData, sprite.x, sprite.y);
      newSprite.locationType = sprite.locationType;
      newSprite.tableauRow = sprite.tableauRow;
      newSprite.tableauCol = sprite.tableauCol;
      newSprite.setDepth(sprite.depth);
      sprite.destroy();
    }
  }

  private repositionAllCards(): void {
    const state = this.engine.getState();
    this.clearPlayableHighlights();

    // Tableau cards
    for (let row = 0; row < 4; row++) {
      for (const col of ROW_COLS[row]) {
        const card = state.tableau[row][col];
        if (card) {
          const sprite = this.cardSprites.get(card.id);
          if (sprite) {
            const pos = this.getTableauCardPosition(row, col);
            sprite.x = pos.x;
            sprite.y = pos.y;
            sprite.locationType = 'tableau';
            sprite.tableauRow = row;
            sprite.tableauCol = col;
            sprite.setDepth(10 + row * 10 + col);
            sprite.setVisible(true);

            const isAvailable = this.engine.isAvailable(row, col);
            sprite.alpha = isAvailable ? 1.0 : 0.7;
          }
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
        sprite.locationType = 'stock';
        sprite.setDepth(200 + i);
        sprite.setVisible(true);
        sprite.alpha = 1;
      }
    }

    // Waste cards
    const wastePos = this.getWastePosition();
    const wasteLen = state.waste.length;
    for (let i = 0; i < wasteLen; i++) {
      const sprite = this.cardSprites.get(state.waste[i].id);
      if (sprite) {
        const isTop = i === wasteLen - 1;
        sprite.x = wastePos.x;
        sprite.y = wastePos.y;
        sprite.locationType = 'waste';
        sprite.setDepth(300 + i);
        sprite.setVisible(isTop || i >= wasteLen - 3);
        sprite.alpha = isTop ? 1.0 : 0.5;
      }
    }

    // Removed cards – hide
    for (const card of state.removed) {
      const sprite = this.cardSprites.get(card.id);
      if (sprite) {
        sprite.setVisible(false);
        sprite.locationType = 'removed';
      }
    }

    this.updateStreakDisplay();
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

    // Tableau cards
    for (let row = 0; row < 4; row++) {
      for (const col of ROW_COLS[row]) {
        const card = state.tableau[row][col];
        if (!card) continue;
        const pos = this.getTableauCardPosition(row, col);

        if (staggered) {
          const sprite = this.createCardSprite(card, w / 2 - this.cardWidth / 2, -this.cardHeight);
          sprite.locationType = 'tableau';
          sprite.tableauRow = row;
          sprite.tableauCol = col;
          sprite.setDepth(500 + dealIndex);
          sprite.setScale(0.94);
          sprite.alpha = 0;

          const delay = dealIndex * 30;
          lastDealDelay = delay;
          this.tweens.add({
            targets: sprite,
            x: pos.x,
            y: pos.y,
            scaleX: 1,
            scaleY: 1,
            alpha: this.engine.isAvailable(row, col) ? 1.0 : 0.7,
            duration: 240,
            delay,
            ease: 'Cubic.easeOut',
          });

          this.time.delayedCall(delay + 150, () => {
            soundManager.cardSelect();
            sprite.setDepth(10 + row * 10 + col);
          });
          dealIndex++;
        } else {
          const sprite = this.createCardSprite(card, pos.x, pos.y);
          sprite.locationType = 'tableau';
          sprite.tableauRow = row;
          sprite.tableauCol = col;
          sprite.setDepth(10 + row * 10 + col);
          sprite.alpha = this.engine.isAvailable(row, col) ? 1.0 : 0.7;
        }
      }
    }

    // Stock cards
    const stockPos = this.getStockPosition();
    for (let i = 0; i < state.stock.length; i++) {
      const card = state.stock[i];
      if (staggered) {
        const sprite = this.createCardSprite(card, w / 2, -this.cardHeight);
        sprite.locationType = 'stock';
        sprite.setDepth(500 + dealIndex);
        sprite.setScale(0.94);
        sprite.alpha = 0;

        const delay = dealIndex * 12;
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
        sprite.locationType = 'stock';
        sprite.setDepth(200 + i);
      }
    }

    // Waste card (initial draw)
    const wastePos = this.getWastePosition();
    for (let i = 0; i < state.waste.length; i++) {
      const card = state.waste[i];
      if (staggered) {
        const sprite = this.createCardSprite(card, w / 2, -this.cardHeight);
        sprite.locationType = 'waste';
        sprite.setDepth(500 + dealIndex);
        sprite.setScale(0.94);
        sprite.alpha = 0;

        const delay = dealIndex * 12;
        lastDealDelay = delay;
        this.tweens.add({
          targets: sprite,
          x: wastePos.x,
          y: wastePos.y,
          scaleX: 1,
          scaleY: 1,
          alpha: 1,
          duration: 200,
          delay,
          ease: 'Cubic.easeOut'
        });
        dealIndex++;
      } else {
        const sprite = this.createCardSprite(card, wastePos.x, wastePos.y);
        sprite.locationType = 'waste';
        sprite.setDepth(300 + i);
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

  // ===== INTERACTION =====

  private clearPlayableHighlights(): void {
    for (const h of this.playableHighlights) h.destroy();
    this.playableHighlights = [];
  }

  private handleClick(x: number, y: number): void {
    if (this.isDealAnimating) return;
    if (this.winCelebrationActive) return;

    const state = this.engine.getState();

    // Check stock click
    const stockPos = this.getStockPosition();
    if (this.isPointInRect(x, y, stockPos.x, stockPos.y, this.cardWidth, this.cardHeight, 10)) {
      if (state.stock.length > 0) {
        try {
          this.engine.drawFromStock();
          soundManager.cardSelect();
          this.recreateAllCardSprites();
          this.repositionAllCards();
          this.emitMoveUpdate();
          this.checkGameEnd();
        } catch {
          soundManager.invalidMove();
        }
      } else {
        soundManager.invalidMove();
      }
      return;
    }

    // Check waste click — no action on waste (waste is just the target)
    // Check tableau card clicks (from bottom row up for correct overlap detection)
    for (let row = 3; row >= 0; row--) {
      const cols = [...ROW_COLS[row]].reverse();
      for (const col of cols) {
        const card = state.tableau[row][col];
        if (!card) continue;
        const pos = this.getTableauCardPosition(row, col);
        if (!this.isPointInRect(x, y, pos.x, pos.y, this.cardWidth, this.cardHeight, 8)) continue;

        if (!this.engine.isAvailable(row, col)) {
          soundManager.invalidMove();
          return;
        }

        if (!this.engine.canPlay(card)) {
          soundManager.invalidMove();
          return;
        }

        // Play this card
        try {
          this.engine.playCard(row, col);
          soundManager.cardToFoundation();
          this.recreateAllCardSprites();
          this.repositionAllCards();
          this.emitMoveUpdate();
          this.checkGameEnd();
        } catch {
          soundManager.invalidMove();
        }
        return;
      }
    }
  }

  private isPointInRect(px: number, py: number, rx: number, ry: number, rw: number, rh: number, pad: number = 0): boolean {
    return px >= rx - pad && px <= rx + rw + pad && py >= ry - pad && py <= ry + rh + pad;
  }

  private emitMoveUpdate(): void {
    const state = this.engine.getState();
    gameBridge.emit('moveExecuted', {
      moveCount: this.engine.getMoveCount(),
      gameNumber: this.gameNumber,
    });
    gameBridge.emit('statsUpdate', {
      score: state.score,
      streak: state.streak,
      remaining: this.engine.getRemainingCount(),
    });
  }

  private checkGameEnd(): void {
    if (this.engine.getState().isWon) {
      this.handleWin();
      return;
    }
    if (this.engine.isUnwinnable()) {
      gameBridge.emit('deadlock', {});
    }
  }

  // ===== UNDO =====

  private handleUndo(): void {
    const move = this.engine.undoLastMove();
    if (!move) return;

    soundManager.undo();
    this.clearPlayableHighlights();
    this.recreateAllCardSprites();
    this.repositionAllCards();
    this.emitMoveUpdate();
  }

  // ===== HINTS =====

  private flashHintCards(hint: TriPeaksMove): void {
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

    // If hint is draw, flash the stock area
    if (hint.type === 'draw') {
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
      score: this.engine.getState().score,
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

  // ===== INPUT =====

  private setupMouseInput(): void {
    const canvas = this.game.canvas;

    this.trackDomListener(canvas, 'click', ((e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      this.handleClick(x, y);
    }) as EventListener);
  }

  private setupTouchInput(): void {
    const canvas = this.game.canvas;

    this.trackDomListener(canvas, 'touchend', ((e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = (e.changedTouches[0].clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.changedTouches[0].clientY - rect.top) * (canvas.height / rect.height);
      this.handleClick(x, y);
    }) as EventListener, { passive: false });
  }
}
