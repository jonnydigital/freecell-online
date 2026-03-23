import * as Phaser from 'phaser';
import { ClockEngine, ClockStep } from '../engine/ClockEngine';
import { dealClockGame } from '../engine/Deck';
import { Card, Suit } from '../engine/Card';
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
const NUM_CLOCK_PILES = 12;
const NUM_PILES = 13;
const CENTER_PILE = 12;

interface CardSprite extends Phaser.GameObjects.Container {
  cardData: Card;
  sourcePile: number;
}

export class ClockScene extends Phaser.Scene {
  private engine!: ClockEngine;
  private cardSprites: Map<string, CardSprite> = new Map();
  private gameNumber: number = 1;
  private settings!: GameSettings;
  private currentTheme: ThemeDefinition = themes[0];
  private currentCardStyle: CardStyleDefinition = getCardStyleById(DEFAULT_CARD_STYLE_ID);

  // Layout
  private cardWidth: number = 0;
  private cardHeight: number = 0;
  private centerX: number = 0;
  private centerY: number = 0;
  private clockRadius: number = 0;

  // Auto-play
  private isAutoPlaying: boolean = false;
  private autoPlaySpeed: number = 600; // ms between steps

  // Tracked listeners
  private trackedDomListeners: Array<{ target: EventTarget; type: string; listener: EventListenerOrEventListenerObject; options?: AddEventListenerOptions | boolean }> = [];
  private bridgeUnsubscribers: Array<() => void> = [];
  private scaleResizeHandler: ((gameSize: Phaser.Structs.Size) => void) | null = null;
  private isTouchDevice: boolean = false;

  // Deal animation guard
  private isDealAnimating: boolean = false;
  private pendingResize: boolean = false;
  private isStepAnimating: boolean = false;

  // Visuals
  private vignette: Phaser.GameObjects.Graphics | null = null;
  private feltNoise: Phaser.GameObjects.Graphics | null = null;
  private slotGraphics: Phaser.GameObjects.GameObject[] = [];
  private clockLabels: Phaser.GameObjects.Text[] = [];

  // Auto-play button
  private autoPlayButton: Phaser.GameObjects.Container | null = null;
  private autoPlayHitArea: Phaser.GameObjects.Zone | null = null;

  // Step/tap button
  private stepButton: Phaser.GameObjects.Container | null = null;
  private stepHitArea: Phaser.GameObjects.Zone | null = null;

  // Win celebration
  private winCelebrationActive: boolean = false;
  private winCelebrationObjects: Phaser.GameObjects.GameObject[] = [];

  // Current pile highlight
  private currentPileHighlight: Phaser.GameObjects.Graphics | null = null;

  constructor() {
    super({ key: 'ClockScene' });
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
    const { piles } = dealClockGame(this.gameNumber);
    this.engine = new ClockEngine(this.gameNumber, piles);
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
    this.createBoard();
    this.dealCards(true);

    this.scaleResizeHandler = () => {
      if (this.isDealAnimating) {
        this.pendingResize = true;
        return;
      }
      this.calculateLayout();
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
      // Clock has no choices, but we can highlight the current pile
      this.highlightCurrentPile();
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
        this.drawBackgroundEffects();
        this.rebuildBoard();
        this.recreateAllCardSprites();
        this.repositionAllCards();
      }
    });
    this.bridgeUnsubscribers.push(unsubUpdateSettings);

    // Setup click/tap to advance
    this.setupInput();
  }

  private restartWithNewGame(gameNumber: number): void {
    this.cleanupWinCelebration();
    this.isAutoPlaying = false;
    this.isStepAnimating = false;
    for (const sprite of this.cardSprites.values()) {
      sprite.destroy();
    }
    this.cardSprites.clear();
    this.isDealAnimating = false;
    this.pendingResize = false;

    this.gameNumber = gameNumber;
    const { piles } = dealClockGame(this.gameNumber);
    this.engine = new ClockEngine(this.gameNumber, piles);

    this.rebuildBoard();
    this.dealCards(true);

    gameBridge.emit('gameReady', { gameNumber: this.gameNumber });
  }

  private shutdown(): void {
    this.cleanupWinCelebration();
    this.isAutoPlaying = false;
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
    const largeCardsScale = this.settings?.largeCards ? 1.25 : 1.0;

    // Center of the clock
    this.centerX = w / 2;
    this.centerY = h * 0.46;

    // Card size based on available space
    const minDim = Math.min(w, h);
    this.cardWidth = Math.floor(minDim * 0.085 * largeCardsScale);
    this.cardHeight = Math.floor(this.cardWidth * CARD_RATIO);

    // Clock radius - cards arranged in a circle
    // Need enough room for cards plus labels
    this.clockRadius = Math.min(
      (w / 2) - this.cardWidth - 20,
      (h * 0.46) - this.cardHeight - 10
    );
    this.clockRadius = Math.max(this.clockRadius, minDim * 0.2);
  }

  /**
   * Get the position for a pile on the clock face.
   * Pile 0 (Ace) at 1 o'clock, pile 1 (2) at 2 o'clock, ... pile 11 (Queen) at 12 o'clock.
   * Pile 12 (King) in the center.
   */
  private getPilePosition(pileIndex: number): { x: number; y: number } {
    if (pileIndex === CENTER_PILE) {
      return {
        x: this.centerX - this.cardWidth / 2,
        y: this.centerY - this.cardHeight / 2,
      };
    }

    // Clock positions: 12 o'clock is top, going clockwise
    // Pile 0 (Ace) = 1 o'clock position
    // Pile 11 (Queen) = 12 o'clock position
    // Angle: 12 o'clock = -PI/2, each hour = PI/6 (30 degrees)
    const clockPos = pileIndex + 1; // 1-12
    const angle = -Math.PI / 2 + (clockPos * Math.PI * 2) / 12;

    return {
      x: this.centerX + Math.cos(angle) * this.clockRadius - this.cardWidth / 2,
      y: this.centerY + Math.sin(angle) * this.clockRadius - this.cardHeight / 2,
    };
  }

  /**
   * Get position for a card within a pile (slight offset for stacking).
   */
  private getCardPosition(pileIndex: number, cardIndex: number, totalCards: number): { x: number; y: number } {
    const base = this.getPilePosition(pileIndex);
    // Stack cards with a small offset to show depth
    const maxOffset = Math.min(this.cardHeight * 0.12, 8);
    const offset = totalCards > 1 ? (cardIndex / (totalCards - 1)) * maxOffset : 0;
    return {
      x: base.x + offset * 0.5,
      y: base.y + offset,
    };
  }

  // ===== RENDERING =====

  private createBoard(): void {
    this.drawSlots();
    this.drawClockLabels();
    this.createButtons();
  }

  private rebuildBoard(): void {
    this.drawSlots();
    this.drawClockLabels();
    this.createButtons();
    this.updateCurrentPileHighlight();
  }

  private drawSlots(): void {
    this.slotGraphics.forEach(g => g.destroy());
    this.slotGraphics = [];

    const slotColor = hexToInt(this.currentTheme.feltNoiseLight);

    // Draw slots for all 13 piles
    for (let i = 0; i < NUM_PILES; i++) {
      const pos = this.getPilePosition(i);
      const graphics = this.add.graphics();
      graphics.lineStyle(2, slotColor, i === CENTER_PILE ? 0.9 : 0.6);
      graphics.strokeRoundedRect(pos.x, pos.y, this.cardWidth, this.cardHeight, 6);

      if (i === CENTER_PILE) {
        // Center pile gets a slightly different look
        graphics.lineStyle(1, slotColor, 0.3);
        graphics.strokeCircle(
          pos.x + this.cardWidth / 2,
          pos.y + this.cardHeight / 2,
          Math.min(this.cardWidth, this.cardHeight) * 0.35
        );
      }

      this.slotGraphics.push(graphics);
    }

    // Draw clock circle outline
    const circleGraphics = this.add.graphics();
    circleGraphics.lineStyle(1, slotColor, 0.15);
    circleGraphics.strokeCircle(this.centerX, this.centerY, this.clockRadius);
    circleGraphics.setDepth(0);
    this.slotGraphics.push(circleGraphics);
  }

  private drawClockLabels(): void {
    for (const label of this.clockLabels) {
      label.destroy();
    }
    this.clockLabels = [];

    const labelColor = this.currentTheme.feltNoiseLight;
    const fontSize = Math.floor(this.cardWidth * 0.26);

    for (let i = 0; i < NUM_CLOCK_PILES; i++) {
      const clockPos = i + 1; // 1-12
      const angle = -Math.PI / 2 + (clockPos * Math.PI * 2) / 12;
      const labelRadius = this.clockRadius + this.cardHeight * 0.55 + 8;

      const lx = this.centerX + Math.cos(angle) * labelRadius;
      const ly = this.centerY + Math.sin(angle) * labelRadius;

      const displayNum = clockPos === 12 ? '12' : clockPos.toString();
      const text = this.add.text(lx, ly, displayNum, {
        fontSize: `${fontSize}px`,
        color: labelColor,
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'bold',
      });
      text.setOrigin(0.5);
      text.setDepth(2);
      text.setAlpha(0.5);
      this.clockLabels.push(text);
    }

    // Center label
    const centerPos = this.getPilePosition(CENTER_PILE);
    const centerLabel = this.add.text(
      centerPos.x + this.cardWidth / 2,
      centerPos.y - fontSize * 0.7,
      'K',
      {
        fontSize: `${Math.floor(fontSize * 1.2)}px`,
        color: labelColor,
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'bold',
      }
    );
    centerLabel.setOrigin(0.5);
    centerLabel.setDepth(2);
    centerLabel.setAlpha(0.4);
    this.clockLabels.push(centerLabel);
  }

  private createButtons(): void {
    // Cleanup old buttons
    if (this.stepButton) { this.stepButton.destroy(); this.stepButton = null; }
    if (this.stepHitArea) { this.stepHitArea.destroy(); this.stepHitArea = null; }
    if (this.autoPlayButton) { this.autoPlayButton.destroy(); this.autoPlayButton = null; }
    if (this.autoPlayHitArea) { this.autoPlayHitArea.destroy(); this.autoPlayHitArea = null; }

    const w = this.scale.width;
    const h = this.scale.height;
    const btnW = Math.min(Math.floor(this.cardWidth * 2.2), 120);
    const btnH = Math.floor(btnW * 0.45);
    const labelColor = this.currentTheme.feltNoiseLight;
    const slotColor = hexToInt(this.currentTheme.feltNoiseLight);

    // Step button — bottom left area
    const stepX = w / 2 - btnW - 10;
    const stepY = h - btnH - 16;

    const stepContainer = this.add.container(stepX, stepY);
    stepContainer.setSize(btnW, btnH);
    stepContainer.setDepth(100);

    const stepBg = this.add.graphics();
    stepBg.fillStyle(slotColor, 0.15);
    stepBg.fillRoundedRect(0, 0, btnW, btnH, 6);
    stepBg.lineStyle(2, slotColor, 0.6);
    stepBg.strokeRoundedRect(0, 0, btnW, btnH, 6);
    stepContainer.add(stepBg);

    const stepLabel = this.add.text(btnW / 2, btnH / 2, 'FLIP', {
      fontSize: `${Math.floor(btnW * 0.2)}px`,
      color: labelColor,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
    });
    stepLabel.setOrigin(0.5);
    stepContainer.add(stepLabel);

    const stepHit = this.add.zone(stepX + btnW / 2, stepY + btnH / 2, btnW, btnH);
    stepHit.setInteractive({ useHandCursor: true });
    stepHit.setDepth(101);
    stepHit.on('pointerdown', () => this.handleStep());

    this.stepButton = stepContainer;
    this.stepHitArea = stepHit;
    this.slotGraphics.push(stepContainer, stepHit);

    // Auto-play button — bottom right area
    const autoX = w / 2 + 10;
    const autoY = h - btnH - 16;

    const autoContainer = this.add.container(autoX, autoY);
    autoContainer.setSize(btnW, btnH);
    autoContainer.setDepth(100);

    const autoBg = this.add.graphics();
    autoBg.fillStyle(slotColor, 0.15);
    autoBg.fillRoundedRect(0, 0, btnW, btnH, 6);
    autoBg.lineStyle(2, slotColor, 0.6);
    autoBg.strokeRoundedRect(0, 0, btnW, btnH, 6);
    autoContainer.add(autoBg);

    const autoLabel = this.add.text(btnW / 2, btnH / 2, 'AUTO', {
      fontSize: `${Math.floor(btnW * 0.2)}px`,
      color: labelColor,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'bold',
    });
    autoLabel.setOrigin(0.5);
    autoContainer.add(autoLabel);

    const autoHit = this.add.zone(autoX + btnW / 2, autoY + btnH / 2, btnW, btnH);
    autoHit.setInteractive({ useHandCursor: true });
    autoHit.setDepth(101);
    autoHit.on('pointerdown', () => this.toggleAutoPlay());

    this.autoPlayButton = autoContainer;
    this.autoPlayHitArea = autoHit;
    this.slotGraphics.push(autoContainer, autoHit);
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
      fontStyle: 'bold',
    });
    text.setOrigin(0.5, 0);
    container.add(text);

    const suitMap: Record<string, string> = {
      [Suit.Hearts as string]: 'suit_heart',
      [Suit.Spades as string]: 'suit_spade',
      [Suit.Diamonds as string]: 'suit_diamond',
      [Suit.Clubs as string]: 'suit_club',
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
      newSprite.sourcePile = sprite.sourcePile;
      newSprite.setDepth(sprite.depth);
      sprite.destroy();
    }
  }

  private repositionAllCards(): void {
    const state = this.engine.getState();

    for (let pile = 0; pile < NUM_PILES; pile++) {
      const pileCards = state.piles[pile];
      for (let i = 0; i < pileCards.length; i++) {
        const sprite = this.cardSprites.get(pileCards[i].id);
        if (sprite) {
          const pos = this.getCardPosition(pile, i, pileCards.length);
          sprite.x = pos.x;
          sprite.y = pos.y;
          sprite.sourcePile = pile;
          sprite.setDepth(pile * 10 + i + 10);
        }
      }
    }

    this.updateCurrentPileHighlight();
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

    for (let pile = 0; pile < NUM_PILES; pile++) {
      const pileCards = state.piles[pile];
      for (let i = 0; i < pileCards.length; i++) {
        const card = pileCards[i];
        const pos = this.getCardPosition(pile, i, pileCards.length);

        if (staggered) {
          const sprite = this.createCardSprite(card, w / 2 - this.cardWidth / 2, -this.cardHeight);
          sprite.sourcePile = pile;
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
            duration: 250,
            delay,
            ease: 'Cubic.easeOut',
          });

          this.time.delayedCall(delay + 130, () => {
            soundManager.cardSelect();
            sprite.setDepth(pile * 10 + i + 10);
          });
          dealIndex++;
        } else {
          const sprite = this.createCardSprite(card, pos.x, pos.y);
          sprite.sourcePile = pile;
          sprite.setDepth(pile * 10 + i + 10);
        }
      }
    }

    if (staggered) {
      const totalDealDuration = lastDealDelay + 250 + 50;
      this.time.delayedCall(totalDealDuration, () => {
        this.isDealAnimating = false;
        this.updateCurrentPileHighlight();
        if (this.pendingResize && this.scaleResizeHandler) {
          this.pendingResize = false;
          this.scaleResizeHandler(this.scale.gameSize);
        }
      });
    }
  }

  // ===== GAME LOGIC =====

  private handleStep(): void {
    if (this.isDealAnimating || this.isStepAnimating) return;
    if (this.engine.isGameOver()) return;

    const clockStep = this.engine.step();
    if (!clockStep) return;

    this.animateStep(clockStep);
  }

  private animateStep(clockStep: ClockStep): void {
    this.isStepAnimating = true;
    const card = clockStep.card;
    const sprite = this.cardSprites.get(card.id);
    if (!sprite) {
      this.isStepAnimating = false;
      return;
    }

    // Card is now face-up, recreate sprite to show face
    const oldX = sprite.x;
    const oldY = sprite.y;
    const oldDepth = sprite.depth;
    sprite.destroy();
    this.cardSprites.delete(card.id);

    const newSprite = this.createCardSprite(card, oldX, oldY);
    newSprite.sourcePile = clockStep.toPile;
    newSprite.setDepth(900);
    newSprite.setScale(1.08);

    soundManager.cardSelect();

    // Animate card flip + move to target pile
    const targetPileCards = this.engine.getState().piles[clockStep.toPile];
    const targetPos = this.getCardPosition(clockStep.toPile, 0, targetPileCards.length);

    this.tweens.add({
      targets: newSprite,
      x: targetPos.x,
      y: targetPos.y,
      scaleX: 1,
      scaleY: 1,
      duration: 350,
      delay: 150,
      ease: 'Cubic.easeInOut',
      onComplete: () => {
        soundManager.cardPlace();

        // Rebuild all sprites to reflect new state
        this.time.delayedCall(50, () => {
          this.recreateAllCardSprites();
          this.repositionAllCards();

          gameBridge.emit('moveExecuted', {
            moveCount: this.engine.getStepCount(),
            gameNumber: this.gameNumber,
          });

          this.isStepAnimating = false;

          if (this.engine.getState().isWon) {
            this.handleWin();
          } else if (this.engine.getState().isLost) {
            this.handleLoss();
          } else if (this.isAutoPlaying) {
            this.time.delayedCall(this.autoPlaySpeed, () => {
              if (this.isAutoPlaying && !this.engine.isGameOver()) {
                this.handleStep();
              }
            });
          }
        });
      },
    });
  }

  private toggleAutoPlay(): void {
    if (this.engine.isGameOver()) return;

    this.isAutoPlaying = !this.isAutoPlaying;

    if (this.isAutoPlaying && !this.isStepAnimating) {
      this.handleStep();
    }
  }

  private handleUndo(): void {
    if (this.isStepAnimating || this.isAutoPlaying) {
      this.isAutoPlaying = false;
      return;
    }

    const undone = this.engine.undoLastStep();
    if (!undone) return;

    soundManager.undo();
    this.recreateAllCardSprites();
    this.repositionAllCards();

    gameBridge.emit('moveExecuted', {
      moveCount: this.engine.getStepCount(),
      gameNumber: this.gameNumber,
    });
  }

  private highlightCurrentPile(): void {
    const state = this.engine.getState();
    if (state.isWon || state.isLost) return;

    const pos = this.getPilePosition(state.currentPile);

    // Flash the current pile
    const flash = this.add.graphics();
    flash.fillStyle(0xffd700, 0.3);
    flash.fillRoundedRect(pos.x - 4, pos.y - 4, this.cardWidth + 8, this.cardHeight + 8, 8);
    flash.setDepth(5);

    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 800,
      ease: 'Sine.easeInOut',
      repeat: 2,
      yoyo: true,
      onComplete: () => flash.destroy(),
    });
  }

  private updateCurrentPileHighlight(): void {
    if (this.currentPileHighlight) {
      this.currentPileHighlight.destroy();
      this.currentPileHighlight = null;
    }

    const state = this.engine.getState();
    if (state.isWon || state.isLost || !this.engine.hasStarted()) return;

    const pos = this.getPilePosition(state.currentPile);
    this.currentPileHighlight = this.add.graphics();
    this.currentPileHighlight.lineStyle(3, 0xffd700, 0.6);
    this.currentPileHighlight.strokeRoundedRect(pos.x - 3, pos.y - 3, this.cardWidth + 6, this.cardHeight + 6, 8);
    this.currentPileHighlight.setDepth(4);
  }

  // ===== WIN / LOSS =====

  private handleWin(): void {
    this.isAutoPlaying = false;
    soundManager.winFanfare();
    gameBridge.emit('gameWon', {
      time: 0,
      moves: this.engine.getStepCount(),
    });
    this.time.delayedCall(400, () => this.winCelebration());
  }

  private handleLoss(): void {
    this.isAutoPlaying = false;
    soundManager.invalidMove();
    gameBridge.emit('deadlock', {
      message: `Game over! ${this.engine.getFaceUpCount()} of 52 cards turned (${this.engine.getProgress()}%)`,
    });
  }

  private winCelebration(): void {
    this.winCelebrationActive = true;

    const w = this.scale.width;
    const h = this.scale.height;
    const cw = this.cardWidth;
    const ch = this.cardHeight;

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
    const allSprites = Array.from(this.cardSprites.values());
    let launchIndex = 0;

    const launchTimer = this.time.addEvent({
      delay: 80,
      repeat: Math.min(allSprites.length - 1, 51),
      callback: () => {
        if (launchIndex >= allSprites.length) return;
        const sprite = allSprites[launchIndex];
        if (!sprite) { launchIndex++; return; }

        sprite.setDepth(2000 + launchIndex);

        const launchAngle = -Math.PI * (0.2 + Math.random() * 0.6);
        const speed = 4 + Math.random() * 5;

        activeCards.push({
          sprite,
          x: sprite.x,
          y: sprite.y,
          vx: Math.cos(launchAngle) * speed,
          vy: Math.sin(launchAngle) * speed,
          trailColor: suitColors[sprite.cardData.suit] || 0xffffff,
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

  // ===== INPUT =====

  private setupInput(): void {
    const canvas = this.game.canvas;

    if (this.isTouchDevice) {
      this.trackDomListener(canvas, 'touchstart', ((e: TouchEvent) => {
        e.preventDefault();
        this.handleStep();
      }) as EventListener, { passive: false });
    } else {
      this.trackDomListener(canvas, 'mousedown', (() => {
        // Only advance on canvas click (buttons handled separately via Phaser zones)
      }) as EventListener);
    }
  }

  // Phaser update loop — not much needed for Clock since it's step-based
  update(): void {
    // No continuous drag updates needed
  }
}
