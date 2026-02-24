/**
 * Main FreeCell Phaser Scene
 *
 * Renders the game board: 8 cascades, 4 free cells, 4 foundations
 * Handles drag-and-drop and smart click-to-move interaction
 */
import * as Phaser from 'phaser';
import { FreeCellEngine, Location, Move } from '../engine/FreeCellEngine';
import { Card, Suit, RANK_NAMES, SUIT_SYMBOLS } from '../engine/Card';
import { MoveHistory, MoveEntry } from '../engine/MoveHistory';
import { GameTimer } from '../engine/GameTimer';
import { gameBridge } from './GameBridge';
import { getAllCardAssets, getCardAssetKey } from './CardAssets';
import { getHint } from '../solver/solver';
import { getRandomSolvableGame } from '../lib/solvableDeals';

// Layout constants
const CARD_RATIO = 1.4; // height/width ratio
const CASCADE_OVERLAP = 0.25; // fraction of card height visible when overlapping
const TOP_MARGIN_LANDSCAPE = 0.08;
const TOP_MARGIN_PORTRAIT = 0.02;
const SIDE_MARGIN = 0.02;
const GAP = 0.01;

interface CardSprite extends Phaser.GameObjects.Container {
  cardData: Card;
  sourceLocation: Location;
}

export class FreeCellScene extends Phaser.Scene {
  private engine!: FreeCellEngine;
  private history!: MoveHistory;
  private timer!: GameTimer;
  private cardSprites: Map<string, CardSprite> = new Map();
  private gameNumber: number = 1;

  // Layout measurements (recalculated on resize)
  private cardWidth: number = 0;
  private cardHeight: number = 0;
  private boardOffsetX: number = 0;
  private boardOffsetY: number = 0;
  private isPortrait: boolean = false;
  private topRowHeight: number = 0; // Height used by free cells + foundations area

  // Drag state
  private dragCards: CardSprite[] = [];
  private dragStartX: number = 0;
  private dragStartY: number = 0;

  // Click-to-move state
  private selectedCard: CardSprite | null = null;
  private selectionGlow: Phaser.GameObjects.Graphics | null = null;
  private highlightGraphics: Phaser.GameObjects.Graphics[] = [];

  // Double-tap detection
  private lastTapCard: CardSprite | null = null;
  private lastTapTime: number = 0;

  // Board slot graphics (for redraw on resize)
  private slotGraphics: Phaser.GameObjects.GameObject[] = [];

  // Visual effects
  private vignette: Phaser.GameObjects.Graphics | null = null;
  private feltNoise: Phaser.GameObjects.Graphics | null = null;

  constructor() {
    super({ key: 'FreeCellScene' });
  }

  private drawBackgroundEffects(): void {
    const w = this.scale.width;
    const h = this.scale.height;

    // Clean up old effects
    if (this.vignette) { this.vignette.destroy(); this.vignette = null; }
    if (this.feltNoise) { this.feltNoise.destroy(); this.feltNoise = null; }

    // Vignette: radial darkening around edges
    this.vignette = this.add.graphics();
    this.vignette.setDepth(0);
    // Draw concentric semi-transparent dark rects from edge inward
    const steps = 8;
    for (let i = 0; i < steps; i++) {
      const alpha = 0.12 * (1 - i / steps);
      const inset = (i / steps) * Math.min(w, h) * 0.35;
      this.vignette.fillStyle(0x000000, alpha);
      this.vignette.fillRect(0, 0, w, inset); // top
      this.vignette.fillRect(0, h - inset, w, inset); // bottom
      this.vignette.fillRect(0, 0, inset, h); // left
      this.vignette.fillRect(w - inset, 0, inset, h); // right
    }

    // Felt noise texture: scattered subtle dark/light specks
    this.feltNoise = this.add.graphics();
    this.feltNoise.setDepth(1);
    const noiseCount = Math.floor((w * h) / 800); // Density scales with screen
    for (let i = 0; i < noiseCount; i++) {
      const nx = Math.random() * w;
      const ny = Math.random() * h;
      const bright = Math.random() > 0.5;
      this.feltNoise.fillStyle(bright ? 0x1a5c1a : 0x062e06, Math.random() * 0.15);
      this.feltNoise.fillRect(nx, ny, 1 + Math.random(), 1 + Math.random());
    }
  }

  preload(): void {
    // Load all card images
    const assets = getAllCardAssets();
    for (const asset of assets) {
      this.load.image(asset.key, asset.path);
    }
  }

  create(): void {
    this.engine = new FreeCellEngine(this.gameNumber);
    this.history = new MoveHistory();
    this.timer = new GameTimer();

    this.drawBackgroundEffects();
    this.calculateLayout();
    this.createBoard();
    this.dealCards(true); // staggered deal on first load

    // Listen for resize
    this.scale.on('resize', () => {
      this.calculateLayout();
      this.drawBackgroundEffects();
      this.rebuildBoard();
      this.repositionAllCards(false);
    });

    // Listen for bridge events
    gameBridge.on('newGame', (gameNum?: unknown) => {
      this.gameNumber = typeof gameNum === 'number' ? gameNum : getRandomSolvableGame();
      this.startNewGame();
    });

    gameBridge.on('undo', () => this.undoLastMove());
    gameBridge.on('redo', () => this.redoMove());
    gameBridge.on('hint', () => this.showHint());
    gameBridge.on('autoFinish', () => this.performAutoFinish());

    // Tap on empty areas to deselect or complete move
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Small delay to let card clicks fire first
      this.time.delayedCall(50, () => {
        if (this.selectedCard && this.dragCards.length === 0) {
          this.handleBoardTap(pointer.x, pointer.y);
        }
      });
    });

    // Notify UI that game is ready
    gameBridge.emit('gameReady', { gameNumber: this.gameNumber });

    // Run auto-moves after deal
    this.time.delayedCall(500, () => {
      this.performAutoMoves();
    });
  }

  private calculateLayout(): void {
    const w = this.scale.width;
    const h = this.scale.height;
    this.isPortrait = h > w * 1.1; // Portrait if significantly taller than wide

    const topMargin = this.isPortrait ? TOP_MARGIN_PORTRAIT : TOP_MARGIN_LANDSCAPE;

    if (this.isPortrait) {
      // Portrait: 2 rows of 4 at top (free cells row, then foundations row)
      // Cards need to be sized for 8 cascade columns
      const usableWidth = w * (1 - 2 * SIDE_MARGIN);
      this.cardWidth = Math.floor((usableWidth - 7 * (w * GAP)) / 8);
      this.cardHeight = Math.floor(this.cardWidth * CARD_RATIO);

      // Cap card size for portrait
      const maxCardHeight = h * 0.12;
      if (this.cardHeight > maxCardHeight) {
        this.cardHeight = Math.floor(maxCardHeight);
        this.cardWidth = Math.floor(this.cardHeight / CARD_RATIO);
      }

      this.boardOffsetX = Math.floor(
        (w - (8 * this.cardWidth + 7 * (w * GAP))) / 2
      );
      this.boardOffsetY = Math.floor(h * topMargin);

      // Two rows: free cells then foundations
      const rowGap = Math.floor(h * 0.008);
      this.topRowHeight = this.cardHeight * 2 + rowGap;
    } else {
      // Landscape: classic single row with 4 free cells + 4 foundations
      const usableWidth = w * (1 - 2 * SIDE_MARGIN);
      this.cardWidth = Math.floor((usableWidth - 7 * (w * GAP)) / 8);
      this.cardHeight = Math.floor(this.cardWidth * CARD_RATIO);

      const maxCardHeight = h * 0.18;
      if (this.cardHeight > maxCardHeight) {
        this.cardHeight = Math.floor(maxCardHeight);
        this.cardWidth = Math.floor(this.cardHeight / CARD_RATIO);
      }

      this.boardOffsetX = Math.floor(
        (w - (8 * this.cardWidth + 7 * (w * GAP))) / 2
      );
      this.boardOffsetY = Math.floor(h * topMargin);
      this.topRowHeight = this.cardHeight;
    }
  }

  private getColumnX(col: number): number {
    return (
      this.boardOffsetX +
      col * (this.cardWidth + this.scale.width * GAP)
    );
  }

  private getFreeCellPosition(index: number): { x: number; y: number } {
    if (this.isPortrait) {
      // Portrait: free cells centered in first row, columns 0-3 offset to center
      const totalWidth = 4 * this.cardWidth + 3 * (this.scale.width * GAP);
      const startX = Math.floor((this.scale.width - totalWidth) / 2);
      return {
        x: startX + index * (this.cardWidth + this.scale.width * GAP),
        y: this.boardOffsetY,
      };
    }
    return {
      x: this.getColumnX(index),
      y: this.boardOffsetY,
    };
  }

  private getFoundationPosition(index: number): { x: number; y: number } {
    if (this.isPortrait) {
      // Portrait: foundations centered in second row
      const rowGap = Math.floor(this.scale.height * 0.008);
      const totalWidth = 4 * this.cardWidth + 3 * (this.scale.width * GAP);
      const startX = Math.floor((this.scale.width - totalWidth) / 2);
      return {
        x: startX + index * (this.cardWidth + this.scale.width * GAP),
        y: this.boardOffsetY + this.cardHeight + rowGap,
      };
    }
    return {
      x: this.getColumnX(index + 4),
      y: this.boardOffsetY,
    };
  }

  private getCascadeCardPosition(
    col: number,
    row: number
  ): { x: number; y: number } {
    const cascadeGap = this.scale.height * 0.02;
    const topRow = this.boardOffsetY + this.topRowHeight + cascadeGap;
    const availableHeight = this.scale.height - topRow - 10;

    // Find the longest cascade to calculate dynamic overlap
    const state = this.engine.getState();
    const maxCascadeLength = Math.max(...state.cascades.map(c => c.length), 1);

    // Calculate overlap: use default, but shrink if cascade would exceed available space
    const defaultOverlap = Math.floor(this.cardHeight * CASCADE_OVERLAP);
    const maxOverlap = maxCascadeLength > 1
      ? Math.floor((availableHeight - this.cardHeight) / (maxCascadeLength - 1))
      : defaultOverlap;
    const overlap = Math.min(defaultOverlap, maxOverlap);

    return {
      x: this.getColumnX(col),
      y: topRow + row * overlap,
    };
  }

  private createBoard(): void {
    this.drawSlots();
  }

  private drawSlots(): void {
    // Clear old slots
    this.slotGraphics.forEach(g => g.destroy());
    this.slotGraphics = [];

    // Free cell slots
    for (let i = 0; i < 4; i++) {
      const pos = this.getFreeCellPosition(i);
      this.createSlot(pos.x, pos.y, 'free');
    }

    // Foundation slots
    const suitSymbols = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
    for (let i = 0; i < 4; i++) {
      const pos = this.getFoundationPosition(i);
      this.createSlot(pos.x, pos.y, 'foundation', SUIT_SYMBOLS[suitSymbols[i]]);
    }
  }

  private rebuildBoard(): void {
    this.drawSlots();
  }

  private createSlot(
    x: number,
    y: number,
    type: 'free' | 'foundation',
    label?: string
  ): void {
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0x1a5c1a, 0.8);
    graphics.strokeRoundedRect(x, y, this.cardWidth, this.cardHeight, 6);
    this.slotGraphics.push(graphics);

    if (label) {
      const text = this.add.text(
        x + this.cardWidth / 2,
        y + this.cardHeight / 2,
        label,
        {
          fontSize: `${Math.floor(this.cardWidth * 0.4)}px`,
          color: '#1a5c1a',
          fontFamily: 'serif',
        }
      );
      text.setOrigin(0.5);
      this.slotGraphics.push(text);
    }
  }

  private createCardSprite(card: Card, x: number, y: number): CardSprite {
    const container = this.add.container(x, y) as CardSprite;
    container.setSize(this.cardWidth, this.cardHeight);
    container.cardData = card;

    // Use image sprite if available, fall back to text rendering
    const assetKey = getCardAssetKey(card.suit, card.rank);
    if (this.textures.exists(assetKey)) {
      const img = this.add.image(this.cardWidth / 2, this.cardHeight / 2, assetKey);
      img.setDisplaySize(this.cardWidth, this.cardHeight);
      container.add(img);
    } else {
      // Fallback: text-based card
      const bg = this.add.graphics();
      bg.fillStyle(0xffffff, 1);
      bg.fillRoundedRect(0, 0, this.cardWidth, this.cardHeight, 6);
      bg.lineStyle(1, 0x999999, 1);
      bg.strokeRoundedRect(0, 0, this.cardWidth, this.cardHeight, 6);
      container.add(bg);

      const isRed = card.suit === Suit.Hearts || card.suit === Suit.Diamonds;
      const color = isRed ? '#cc0000' : '#000000';
      const fontSize = Math.floor(this.cardWidth * 0.22);

      const topText = this.add.text(4, 2, `${RANK_NAMES[card.rank]}\n${SUIT_SYMBOLS[card.suit]}`, {
        fontSize: `${fontSize}px`,
        color,
        fontFamily: 'Arial, sans-serif',
        lineSpacing: -2,
      });
      container.add(topText);

      const centerSuit = this.add.text(
        this.cardWidth / 2,
        this.cardHeight / 2,
        SUIT_SYMBOLS[card.suit],
        {
          fontSize: `${Math.floor(this.cardWidth * 0.45)}px`,
          color,
          fontFamily: 'serif',
        }
      );
      centerSuit.setOrigin(0.5);
      container.add(centerSuit);
    }

    // Add subtle drop shadow
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.15);
    shadow.fillRoundedRect(2, 2, this.cardWidth, this.cardHeight, 6);
    container.addAt(shadow, 0); // Behind the card

    // Make interactive - ensure minimum 44px touch target
    const hitWidth = Math.max(this.cardWidth, 44);
    const hitHeight = Math.max(this.cardHeight, 44);
    const hitOffsetX = (hitWidth - this.cardWidth) / 2;
    const hitOffsetY = (hitHeight - this.cardHeight) / 2;
    container.setInteractive(
      new Phaser.Geom.Rectangle(-hitOffsetX, -hitOffsetY, hitWidth, hitHeight),
      Phaser.Geom.Rectangle.Contains
    );

    this.input.setDraggable(container);
    container.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.onCardClick(container, pointer);
    });

    this.cardSprites.set(card.id, container);
    return container;
  }

  private dealCards(staggered: boolean = false): void {
    const state = this.engine.getState();
    const w = this.scale.width;

    let dealIndex = 0;
    for (let col = 0; col < 8; col++) {
      const cascade = state.cascades[col];
      for (let row = 0; row < cascade.length; row++) {
        const card = cascade[row];
        const pos = this.getCascadeCardPosition(col, row);

        if (staggered) {
          // Start cards off-screen at top-center, animate to position
          const sprite = this.createCardSprite(card, w / 2 - this.cardWidth / 2, -this.cardHeight);
          sprite.sourceLocation = { type: 'cascade', index: col, cardIndex: row };
          sprite.setDepth(500 + dealIndex);
          sprite.alpha = 0.7;

          const delay = dealIndex * 30;
          this.tweens.add({
            targets: sprite,
            x: pos.x,
            y: pos.y,
            alpha: 1,
            duration: 250,
            delay,
            ease: 'Back.easeOut',
            onComplete: () => {
              sprite.setDepth(row + 10);
            },
          });
          dealIndex++;
        } else {
          const sprite = this.createCardSprite(card, pos.x, pos.y);
          sprite.sourceLocation = { type: 'cascade', index: col, cardIndex: row };
          sprite.setDepth(row + 10);
        }
      }
    }

    // Set up drag handlers
    this.input.on('drag', (_pointer: Phaser.Input.Pointer, _gameObject: CardSprite, dragX: number, dragY: number) => {
      if (this.dragCards.length === 0) return;
      const offsetX = dragX - this.dragStartX;
      const offsetY = dragY - this.dragStartY;

      this.dragCards.forEach((card, i) => {
        card.x = this.dragStartX + offsetX;
        card.y = this.dragStartY + offsetY + i * Math.floor(this.cardHeight * CASCADE_OVERLAP);
      });
    });

    this.input.on('dragstart', (_pointer: Phaser.Input.Pointer, gameObject: CardSprite) => {
      this.clearSelection();
      this.startDrag(gameObject);
    });

    this.input.on('dragend', (_pointer: Phaser.Input.Pointer, gameObject: CardSprite) => {
      this.endDrag(gameObject);
    });
  }

  // ── Click-to-Move System ──────────────────────────────────

  private onCardClick(sprite: CardSprite, pointer: Phaser.Input.Pointer): void {
    // Don't process click if we're dragging
    if (this.dragCards.length > 0) return;

    if (!this.timer.isRunning) {
      this.timer.start();
    }

    const now = Date.now();
    const isDoubleTap = this.lastTapCard === sprite && (now - this.lastTapTime) < 400;
    this.lastTapCard = sprite;
    this.lastTapTime = now;

    // Double-tap: smart auto-move with priority
    if (isDoubleTap) {
      this.lastTapCard = null; // Reset to prevent triple-tap
      this.clearSelection();
      this.smartAutoMove(sprite);
      return;
    }

    // If this card is already selected, try smart auto-move
    if (this.selectedCard === sprite) {
      this.clearSelection();
      this.smartAutoMove(sprite);
      return;
    }

    // If we have a selected card and tap another card
    if (this.selectedCard) {
      const moved = this.tryMoveSelectedTo(sprite);
      if (!moved) {
        this.clearSelection();
        this.selectCard(sprite);
      }
      return;
    }

    // No card selected - select this one and show destinations
    this.selectCard(sprite);
  }

  private selectCard(sprite: CardSprite): void {
    const location = this.findCardLocation(sprite.cardData);
    if (!location) return;

    // Only allow selecting cards that can actually move
    if (location.type === 'cascade') {
      const state = this.engine.getState();
      const cascade = state.cascades[location.index];
      const cardIdx = cascade.findIndex(c => c.equals(sprite.cardData));
      if (cardIdx === -1) return;
      // Check if this card starts a valid run to the bottom
      const run = this.engine.getValidRun(location.index);
      const runStart = cascade.length - run.length;
      if (cardIdx < runStart) return; // Can't move cards buried in the middle
    } else if (location.type === 'foundation') {
      return; // Don't select foundation cards
    }

    this.selectedCard = sprite;

    // Show selection glow
    this.showSelectionGlow(sprite);

    // Find and highlight valid destinations
    const destinations = this.getValidDestinations(sprite);

    if (destinations.length === 1) {
      // Only one legal destination - move immediately
      const from = this.findCardLocation(sprite.cardData);
      if (from) {
        this.clearSelection();
        this.dragCards = [sprite];
        // For sequence moves, gather all cards in the run
        if (from.type === 'cascade') {
          const state = this.engine.getState();
          const cascade = state.cascades[from.index];
          const cardIdx = cascade.findIndex(c => c.equals(sprite.cardData));
          if (cardIdx < cascade.length - 1) {
            this.dragCards = [];
            for (let i = cardIdx; i < cascade.length; i++) {
              const cs = this.cardSprites.get(cascade[i].id);
              if (cs) this.dragCards.push(cs);
            }
            from.cardIndex = cardIdx;
          }
        }
        this.executeMoveAndAnimate(from, destinations[0]);
        this.dragCards = [];
        this.vibrate();
      }
    } else if (destinations.length > 1) {
      // Multiple destinations - highlight them
      this.showDestinationHighlights(destinations);
    }
    // If no destinations, card stays selected (user can double-tap for foundation or tap elsewhere to deselect)
  }

  private getValidDestinations(sprite: CardSprite): Location[] {
    const from = this.findCardLocation(sprite.cardData);
    if (!from) return [];

    const destinations: Location[] = [];
    const state = this.engine.getState();

    // If it's a cascade card, figure out the cardIndex for sequence moves
    let moveFrom = { ...from };
    if (from.type === 'cascade') {
      const cascade = state.cascades[from.index];
      const cardIdx = cascade.findIndex(c => c.equals(sprite.cardData));
      moveFrom = { type: 'cascade', index: from.index, cardIndex: cardIdx };
    }

    // Check foundations
    const foundationTo: Location = { type: 'foundation', suit: sprite.cardData.suit };
    if (this.engine.isLegalMove(moveFrom, foundationTo)) {
      destinations.push(foundationTo);
    }

    // Check cascades (non-empty first for better prioritization)
    for (let j = 0; j < 8; j++) {
      if (from.type === 'cascade' && from.index === j) continue;
      const to: Location = { type: 'cascade', index: j };
      if (state.cascades[j].length > 0 && this.engine.isLegalMove(moveFrom, to)) {
        destinations.push(to);
      }
    }

    // Check empty cascades (lower priority)
    for (let j = 0; j < 8; j++) {
      if (from.type === 'cascade' && from.index === j) continue;
      const to: Location = { type: 'cascade', index: j };
      if (state.cascades[j].length === 0 && this.engine.isLegalMove(moveFrom, to)) {
        destinations.push(to);
      }
    }

    // Check free cells
    for (let j = 0; j < 4; j++) {
      const to: Location = { type: 'freecell', index: j };
      if (this.engine.isLegalMove(moveFrom, to)) {
        destinations.push(to);
      }
    }

    return destinations;
  }

  private showSelectionGlow(sprite: CardSprite): void {
    this.clearSelectionGlow();
    this.selectionGlow = this.add.graphics();
    this.selectionGlow.lineStyle(3, 0xffd700, 0.9);
    this.selectionGlow.strokeRoundedRect(
      sprite.x - 2, sprite.y - 2,
      this.cardWidth + 4, this.cardHeight + 4,
      8
    );
    this.selectionGlow.setDepth(999);

    // Subtle pulse animation
    this.tweens.add({
      targets: this.selectionGlow,
      alpha: 0.5,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private showDestinationHighlights(destinations: Location[]): void {
    this.clearHighlights();

    for (const dest of destinations) {
      const pos = this.getDestinationPosition(dest);
      const gfx = this.add.graphics();
      gfx.lineStyle(3, 0x00ff88, 0.8);
      gfx.fillStyle(0x00ff88, 0.15);
      gfx.fillRoundedRect(pos.x, pos.y, this.cardWidth, this.cardHeight, 6);
      gfx.strokeRoundedRect(pos.x, pos.y, this.cardWidth, this.cardHeight, 6);
      gfx.setDepth(998);

      // Pulse animation
      this.tweens.add({
        targets: gfx,
        alpha: 0.4,
        duration: 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });

      this.highlightGraphics.push(gfx);
    }
  }

  private getDestinationPosition(location: Location): { x: number; y: number } {
    const state = this.engine.getState();
    switch (location.type) {
      case 'freecell':
        return this.getFreeCellPosition(location.index);
      case 'foundation': {
        const suits = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
        const idx = suits.indexOf(location.suit);
        return this.getFoundationPosition(idx);
      }
      case 'cascade': {
        const cascade = state.cascades[location.index];
        const row = cascade.length; // Position where new card would go
        return this.getCascadeCardPosition(location.index, Math.max(0, row === 0 ? 0 : row));
      }
    }
  }

  private clearSelection(): void {
    this.selectedCard = null;
    this.clearSelectionGlow();
    this.clearHighlights();
  }

  private clearSelectionGlow(): void {
    if (this.selectionGlow) {
      this.tweens.killTweensOf(this.selectionGlow);
      this.selectionGlow.destroy();
      this.selectionGlow = null;
    }
  }

  private clearHighlights(): void {
    for (const gfx of this.highlightGraphics) {
      this.tweens.killTweensOf(gfx);
      gfx.destroy();
    }
    this.highlightGraphics = [];
  }

  private handleBoardTap(x: number, y: number): void {
    if (!this.selectedCard) return;

    // Check if tapped on a highlighted destination
    const from = this.findCardLocation(this.selectedCard.cardData);
    if (!from) {
      this.clearSelection();
      return;
    }

    const destinations = this.getValidDestinations(this.selectedCard);
    const target = this.findTapTarget(x, y, destinations);

    if (target) {
      let moveFrom = { ...from };
      if (from.type === 'cascade') {
        const state = this.engine.getState();
        const cascade = state.cascades[from.index];
        const cardIdx = cascade.findIndex(c => c.equals(this.selectedCard!.cardData));
        moveFrom = { type: 'cascade', index: from.index, cardIndex: cardIdx };

        // Gather run cards for sequence move
        this.dragCards = [];
        for (let i = cardIdx; i < cascade.length; i++) {
          const cs = this.cardSprites.get(cascade[i].id);
          if (cs) this.dragCards.push(cs);
        }
      } else {
        this.dragCards = [this.selectedCard];
      }

      this.clearSelection();
      this.executeMoveAndAnimate(moveFrom, target);
      this.dragCards = [];
      this.vibrate();
    } else {
      this.clearSelection();
    }
  }

  private findTapTarget(x: number, y: number, destinations: Location[]): Location | null {
    for (const dest of destinations) {
      const pos = this.getDestinationPosition(dest);
      if (this.isInBounds(x, y, pos.x, pos.y)) {
        return dest;
      }
    }

    // Also check if tap is in a cascade column header area (for empty cascades)
    for (const dest of destinations) {
      if (dest.type === 'cascade') {
        const colX = this.getColumnX(dest.index);
        if (x >= colX - this.cardWidth * 0.3 && x <= colX + this.cardWidth * 1.3) {
          return dest;
        }
      }
    }

    return null;
  }

  private tryMoveSelectedTo(targetSprite: CardSprite): boolean {
    if (!this.selectedCard) return false;

    const from = this.findCardLocation(this.selectedCard.cardData);
    const targetLoc = this.findCardLocation(targetSprite.cardData);
    if (!from || !targetLoc) return false;

    // Determine the move destination
    let to: Location | null = null;
    if (targetLoc.type === 'cascade') {
      to = { type: 'cascade', index: targetLoc.index };
    } else if (targetLoc.type === 'freecell') {
      to = { type: 'freecell', index: targetLoc.index };
    } else if (targetLoc.type === 'foundation') {
      to = { type: 'foundation', suit: targetLoc.suit };
    }

    if (!to) return false;

    // Set up the from location with cardIndex for sequence moves
    let moveFrom = { ...from };
    if (from.type === 'cascade') {
      const state = this.engine.getState();
      const cascade = state.cascades[from.index];
      const cardIdx = cascade.findIndex(c => c.equals(this.selectedCard!.cardData));
      moveFrom = { type: 'cascade', index: from.index, cardIndex: cardIdx };

      // Gather run cards
      this.dragCards = [];
      for (let i = cardIdx; i < cascade.length; i++) {
        const cs = this.cardSprites.get(cascade[i].id);
        if (cs) this.dragCards.push(cs);
      }
    } else {
      this.dragCards = [this.selectedCard];
    }

    if (this.engine.isLegalMove(moveFrom, to)) {
      this.clearSelection();
      this.executeMoveAndAnimate(moveFrom, to);
      this.dragCards = [];
      this.vibrate();
      return true;
    }

    this.dragCards = [];
    return false;
  }

  private vibrate(): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(10); } catch { /* ignore */ }
    }
  }

  // ── Drag and Drop ─────────────────────────────────────────

  private startDrag(sprite: CardSprite): void {
    const location = this.findCardLocation(sprite.cardData);
    if (!location) return;

    if (location.type === 'cascade') {
      const state = this.engine.getState();
      const cascade = state.cascades[location.index];
      const cardIdx = cascade.findIndex((c) => c.equals(sprite.cardData));
      if (cardIdx === -1) return;

      // Pick up the run from this card
      this.dragCards = [];
      for (let i = cardIdx; i < cascade.length; i++) {
        const cs = this.cardSprites.get(cascade[i].id);
        if (cs) {
          this.dragCards.push(cs);
          cs.setDepth(1000 + i);
        }
      }
    } else if (location.type === 'freecell') {
      this.dragCards = [sprite];
      sprite.setDepth(1000);
    } else {
      return; // Can't drag from foundation
    }

    this.dragStartX = sprite.x;
    this.dragStartY = sprite.y;

    if (!this.timer.isRunning) {
      this.timer.start();
    }
  }

  private endDrag(_sprite: CardSprite): void {
    if (this.dragCards.length === 0) return;

    const dropCard = this.dragCards[0];
    const from = this.findCardLocation(dropCard.cardData);
    if (!from) {
      this.snapCardsBack();
      return;
    }

    // Find drop target based on position
    const target = this.findDropTarget(dropCard.x, dropCard.y);
    if (target && this.engine.isLegalMove(from, target)) {
      this.executeMoveAndAnimate(from, target);
      this.vibrate();
    } else {
      this.snapCardsBack();
    }

    this.dragCards = [];
  }

  private findDropTarget(x: number, y: number): Location | null {
    // Check free cells
    for (let i = 0; i < 4; i++) {
      const pos = this.getFreeCellPosition(i);
      if (this.isInBounds(x, y, pos.x, pos.y)) {
        return { type: 'freecell', index: i };
      }
    }

    // Check foundations
    const suits = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
    for (let i = 0; i < 4; i++) {
      const pos = this.getFoundationPosition(i);
      if (this.isInBounds(x, y, pos.x, pos.y)) {
        return { type: 'foundation', suit: suits[i] };
      }
    }

    // Check cascades
    for (let col = 0; col < 8; col++) {
      if (
        x >= this.getColumnX(col) - this.cardWidth * 0.3 &&
        x <= this.getColumnX(col) + this.cardWidth * 1.3
      ) {
        return { type: 'cascade', index: col };
      }
    }

    return null;
  }

  private isInBounds(
    x: number,
    y: number,
    slotX: number,
    slotY: number
  ): boolean {
    return (
      x >= slotX - this.cardWidth * 0.3 &&
      x <= slotX + this.cardWidth * 1.3 &&
      y >= slotY - this.cardHeight * 0.3 &&
      y <= slotY + this.cardHeight * 1.3
    );
  }

  // ── Move Execution ────────────────────────────────────────

  private executeMoveAndAnimate(from: Location, to: Location): void {
    // Adjust from location for sequence moves
    if (from.type === 'cascade' && this.dragCards.length > 1) {
      const state = this.engine.getState();
      const cascade = state.cascades[from.index];
      const cardIdx = cascade.findIndex((c) => c.equals(this.dragCards[0].cardData));
      from = { type: 'cascade', index: from.index, cardIndex: cardIdx };
    }

    const move = this.engine.executeMove(from, to);
    const autoMoves = this.engine.autoMoveToFoundations();
    this.history.push(move, autoMoves);

    this.repositionAllCards();
    this.performAutoMoves();

    gameBridge.emit('moveExecuted', {
      moveCount: this.engine.getState().moveCount,
      gameNumber: this.gameNumber,
    });

    if (this.engine.getState().isWon) {
      gameBridge.emit('gameWon', {
        time: this.timer.seconds,
        moves: this.engine.getState().moveCount,
      });
      this.timer.stop();
      this.time.delayedCall(400, () => this.winCelebration());
    }

    if (!this.engine.hasLegalMoves() && !this.engine.getState().isWon) {
      gameBridge.emit('deadlock');
    }

    // Check if game is auto-completable
    if (!this.engine.getState().isWon && this.engine.isAutoCompletable()) {
      gameBridge.emit('autoCompletable', { completable: true });
    }
  }

  private performAutoMoves(): void {
    this.repositionAllCards();
  }

  /**
   * Auto-finish: rapidly move all remaining cards to foundations
   * with a 50ms stagger animation per card.
   */
  private performAutoFinish(): void {
    if (!this.engine.isAutoCompletable()) return;

    const moveCards = () => {
      // Find the lowest-rank card that can go to a foundation
      let bestCard: { from: Location; suit: Suit } | null = null;
      let bestRank = 14;

      for (let col = 0; col < 8; col++) {
        const cascade = this.engine.getState().cascades[col];
        if (cascade.length === 0) continue;
        const card = cascade[cascade.length - 1];
        const foundationTarget: Location = { type: 'foundation', suit: card.suit };
        if (this.engine.isLegalMove({ type: 'cascade', index: col }, foundationTarget) && card.rank < bestRank) {
          bestRank = card.rank;
          bestCard = { from: { type: 'cascade', index: col }, suit: card.suit };
        }
      }

      if (bestCard) {
        const move = this.engine.executeMove(bestCard.from, { type: 'foundation', suit: bestCard.suit });
        this.history.push(move, []);
        this.repositionAllCards();

        gameBridge.emit('moveExecuted', {
          moveCount: this.engine.getState().moveCount,
          gameNumber: this.gameNumber,
        });

        if (this.engine.getState().isWon) {
          gameBridge.emit('autoCompletable', { completable: false });
          gameBridge.emit('gameWon', {
            time: this.timer.seconds,
            moves: this.engine.getState().moveCount,
          });
          this.timer.stop();
          this.time.delayedCall(400, () => this.winCelebration());
        } else {
          this.time.delayedCall(50, moveCards);
        }
      }
    };

    moveCards();
  }

  /**
   * Smart auto-move: double-tap moves card to best destination.
   * Priority: Foundation > compatible cascade > empty cascade > free cell
   * Shows a brief highlight before moving.
   */
  private smartAutoMove(sprite: CardSprite): void {
    const from = this.findCardLocation(sprite.cardData);
    if (!from) return;

    // Don't move from foundation
    if (from.type === 'foundation') return;

    // Can only move top cards or valid runs
    if (from.type === 'cascade') {
      const state = this.engine.getState();
      const cascade = state.cascades[from.index];
      const cardIdx = cascade.findIndex(c => c.equals(sprite.cardData));
      if (cardIdx === -1) return;
      const run = this.engine.getValidRun(from.index);
      const runStart = cascade.length - run.length;
      if (cardIdx < runStart) return;
    }

    const destinations = this.getValidDestinations(sprite);
    if (destinations.length === 0) return;

    // Priority-based destination selection
    let best: Location | null = null;

    // 1. Foundation
    best = destinations.find(d => d.type === 'foundation') || null;

    // 2. Compatible non-empty cascade (building on existing cards)
    if (!best) {
      const state = this.engine.getState();
      best = destinations.find(d =>
        d.type === 'cascade' && state.cascades[d.index].length > 0
      ) || null;
    }

    // 3. Empty cascade (strategic: only for Kings or if no other option)
    if (!best) {
      best = destinations.find(d => {
        if (d.type !== 'cascade') return false;
        const state = this.engine.getState();
        return state.cascades[d.index].length === 0;
      }) || null;
    }

    // 4. Free cell
    if (!best) {
      best = destinations.find(d => d.type === 'freecell') || null;
    }

    if (!best) return;

    // Visual feedback: brief highlight flash
    const highlightGfx = this.add.graphics();
    highlightGfx.fillStyle(0xffd700, 0.3);
    highlightGfx.fillRoundedRect(sprite.x, sprite.y, this.cardWidth, this.cardHeight, 6);
    highlightGfx.setDepth(999);

    // Set up cards for move
    let moveFrom = { ...from };
    if (from.type === 'cascade') {
      const state = this.engine.getState();
      const cascade = state.cascades[from.index];
      const cardIdx = cascade.findIndex(c => c.equals(sprite.cardData));
      moveFrom = { type: 'cascade', index: from.index, cardIndex: cardIdx };

      this.dragCards = [];
      for (let i = cardIdx; i < cascade.length; i++) {
        const cs = this.cardSprites.get(cascade[i].id);
        if (cs) this.dragCards.push(cs);
      }
    } else {
      this.dragCards = [sprite];
    }

    // Brief delay for visual feedback, then move
    this.time.delayedCall(80, () => {
      highlightGfx.destroy();
      this.executeMoveAndAnimate(moveFrom, best!);
      this.dragCards = [];
      this.vibrate();
    });
  }

  // ── Card Location Helpers ─────────────────────────────────

  private findCardLocation(card: Card): Location | null {
    const state = this.engine.getState();

    for (let i = 0; i < 8; i++) {
      const idx = state.cascades[i].findIndex((c) => c.equals(card));
      if (idx !== -1) {
        return { type: 'cascade', index: i, cardIndex: idx };
      }
    }

    for (let i = 0; i < 4; i++) {
      if (state.freeCells[i]?.equals(card)) {
        return { type: 'freecell', index: i };
      }
    }

    for (const [suit, pile] of state.foundations) {
      if (pile.length > 0 && pile[pile.length - 1].equals(card)) {
        return { type: 'foundation', suit };
      }
    }

    return null;
  }

  private snapCardsBack(): void {
    this.dragCards.forEach((card) => {
      const location = this.findCardLocation(card.cardData);
      if (location) {
        const pos = this.getLocationPosition(location);
        this.tweens.add({
          targets: card,
          x: pos.x,
          y: pos.y,
          duration: 150,
          ease: 'Power2',
        });
      }
    });
    this.dragCards = [];
  }

  private getLocationPosition(location: Location): { x: number; y: number } {
    const state = this.engine.getState();

    switch (location.type) {
      case 'freecell':
        return this.getFreeCellPosition(location.index);
      case 'foundation': {
        const suits = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
        const idx = suits.indexOf(location.suit);
        return this.getFoundationPosition(idx);
      }
      case 'cascade': {
        const row = location.cardIndex ?? state.cascades[location.index].length - 1;
        return this.getCascadeCardPosition(location.index, Math.max(0, row));
      }
    }
  }

  // ── Reposition / Animate ──────────────────────────────────

  private getMoveDuration(sprite: CardSprite, targetX: number, targetY: number): number {
    const dx = targetX - sprite.x;
    const dy = targetY - sprite.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // Variable speed: 100ms base + scaled by distance, capped at 300ms
    return Math.min(300, Math.max(100, distance * 0.4));
  }

  private repositionAllCards(animate: boolean = true): void {
    const state = this.engine.getState();

    // Position cascade cards
    for (let col = 0; col < 8; col++) {
      const cascade = state.cascades[col];
      for (let row = 0; row < cascade.length; row++) {
        const sprite = this.cardSprites.get(cascade[row].id);
        if (sprite) {
          const pos = this.getCascadeCardPosition(col, row);
          if (animate) {
            this.tweens.add({
              targets: sprite,
              x: pos.x,
              y: pos.y,
              duration: this.getMoveDuration(sprite, pos.x, pos.y),
              ease: 'Power2',
            });
          } else {
            sprite.x = pos.x;
            sprite.y = pos.y;
          }
          sprite.setDepth(row + 10);
          sprite.sourceLocation = {
            type: 'cascade',
            index: col,
            cardIndex: row,
          };
        }
      }
    }

    // Position free cell cards
    for (let i = 0; i < 4; i++) {
      const card = state.freeCells[i];
      if (card) {
        const sprite = this.cardSprites.get(card.id);
        if (sprite) {
          const pos = this.getFreeCellPosition(i);
          if (animate) {
            this.tweens.add({
              targets: sprite,
              x: pos.x,
              y: pos.y,
              duration: this.getMoveDuration(sprite, pos.x, pos.y),
              ease: 'Power2',
            });
          } else {
            sprite.x = pos.x;
            sprite.y = pos.y;
          }
          sprite.setDepth(5);
          sprite.sourceLocation = { type: 'freecell', index: i };
        }
      }
    }

    // Position foundation cards (only top visible) with bloom effect
    for (const [suit, pile] of state.foundations) {
      if (pile.length > 0) {
        const topCard = pile[pile.length - 1];
        const sprite = this.cardSprites.get(topCard.id);
        const suits = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
        const idx = suits.indexOf(suit);
        if (sprite) {
          const pos = this.getFoundationPosition(idx);
          const isMovingToFoundation = animate && (
            Math.abs(sprite.x - pos.x) > 5 || Math.abs(sprite.y - pos.y) > 5
          );
          if (animate) {
            this.tweens.add({
              targets: sprite,
              x: pos.x,
              y: pos.y,
              duration: this.getMoveDuration(sprite, pos.x, pos.y),
              ease: 'Power2',
              onComplete: isMovingToFoundation ? () => {
                this.foundationBloom(sprite);
              } : undefined,
            });
          } else {
            sprite.x = pos.x;
            sprite.y = pos.y;
          }
          sprite.setDepth(5 + pile.length);
          sprite.sourceLocation = { type: 'foundation', suit };
        }
      }
    }
  }

  private foundationBloom(sprite: CardSprite): void {
    // Scale-up "bloom" when card reaches foundation
    this.tweens.add({
      targets: sprite,
      scaleX: 1.08,
      scaleY: 1.08,
      duration: 120,
      yoyo: true,
      ease: 'Quad.easeOut',
    });
  }

  // ── Undo / Redo ───────────────────────────────────────────

  private undoLastMove(): void {
    const entry = this.history.popUndo();
    if (!entry) return;

    // Undo auto-moves in reverse
    for (let i = entry.autoMoves.length - 1; i >= 0; i--) {
      this.engine.undoMove(entry.autoMoves[i]);
    }
    // Undo player move
    this.engine.undoMove(entry.playerMove);

    this.repositionAllCards();
    gameBridge.emit('moveExecuted', {
      moveCount: this.engine.getState().moveCount,
      gameNumber: this.gameNumber,
    });
  }

  private redoMove(): void {
    const entry = this.history.popRedo();
    if (!entry) return;

    this.engine.executeMove(entry.playerMove.from, entry.playerMove.to);
    for (const autoMove of entry.autoMoves) {
      this.engine.executeMove(autoMove.from, autoMove.to);
    }

    this.repositionAllCards();
  }

  // ── Hint ──────────────────────────────────────────────────

  private showHint(): void {
    const hint = getHint(this.engine);
    if (!hint) {
      gameBridge.emit('hintResult', { hint: null, reason: 'No moves available' });
      return;
    }

    // Highlight the card(s) to move
    const card = hint.cards[0];
    const sprite = this.cardSprites.get(card.id);
    if (sprite) {
      this.tweens.add({
        targets: sprite,
        alpha: 0.5,
        duration: 200,
        yoyo: true,
        repeat: 2,
      });
    }

    gameBridge.emit('hintResult', {
      hint: { from: hint.from, to: hint.to, reason: hint.reason },
    });
  }

  // ── Win Celebration ────────────────────────────────────────

  private winCelebration(): void {
    const w = this.scale.width;
    const h = this.scale.height;

    // Cascade all cards off screen with physics-like animation
    let delay = 0;
    const allSprites = Array.from(this.cardSprites.values());

    // Shuffle the sprites for visual variety
    for (let i = allSprites.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allSprites[i], allSprites[j]] = [allSprites[j], allSprites[i]];
    }

    for (const sprite of allSprites) {
      const targetX = sprite.x + (Math.random() - 0.5) * w * 0.8;
      const targetY = h + this.cardHeight + Math.random() * 200;
      const rotation = (Math.random() - 0.5) * 3;

      sprite.setDepth(2000 + delay);

      this.tweens.add({
        targets: sprite,
        x: targetX,
        y: targetY,
        angle: rotation * 57.3, // radians to degrees
        duration: 600 + Math.random() * 400,
        delay,
        ease: 'Quad.easeIn',
      });
      delay += 25;
    }

    // Particle burst effect using graphics
    for (let burst = 0; burst < 5; burst++) {
      this.time.delayedCall(burst * 300, () => {
        const cx = Math.random() * w;
        const cy = Math.random() * h * 0.5;
        this.createParticleBurst(cx, cy);
      });
    }
  }

  private createParticleBurst(cx: number, cy: number): void {
    const colors = [0xffd700, 0xff4444, 0x44ff44, 0x4444ff, 0xff44ff, 0xffaa00];
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      const gfx = this.add.graphics();
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 3 + Math.random() * 5;
      gfx.fillStyle(color, 1);
      gfx.fillCircle(0, 0, size);
      gfx.setPosition(cx, cy);
      gfx.setDepth(3000);

      const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.5;
      const speed = 80 + Math.random() * 120;
      const targetX = cx + Math.cos(angle) * speed;
      const targetY = cy + Math.sin(angle) * speed;

      this.tweens.add({
        targets: gfx,
        x: targetX,
        y: targetY + 60, // gravity pull
        alpha: 0,
        scaleX: 0.2,
        scaleY: 0.2,
        duration: 600 + Math.random() * 400,
        ease: 'Quad.easeOut',
        onComplete: () => gfx.destroy(),
      });
    }
  }

  // ── New Game ──────────────────────────────────────────────

  private startNewGame(): void {
    // Clear all sprites
    this.cardSprites.forEach((sprite) => sprite.destroy());
    this.cardSprites.clear();
    this.clearSelection();

    // Reset engine
    this.engine = new FreeCellEngine(this.gameNumber);
    this.history.clear();
    this.timer.reset();

    // Rebuild board and redeal with staggered animation
    this.rebuildBoard();
    this.dealCards(true);
    gameBridge.emit('gameReady', { gameNumber: this.gameNumber });
  }
}
