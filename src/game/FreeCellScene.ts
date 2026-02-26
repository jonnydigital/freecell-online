/**
 * Main FreeCell Phaser Scene
 *
 * Renders the game board: 8 cascades, 4 free cells, 4 foundations
 * Handles drag-and-drop and smart click-to-move interaction
 */
import * as Phaser from 'phaser';
import { FreeCellEngine, Location } from '../engine/FreeCellEngine';
import { Card, Suit, Rank, SUIT_SYMBOLS } from '../engine/Card';
import { MoveHistory } from '../engine/MoveHistory';
import { GameTimer } from '../engine/GameTimer';
import { gameBridge } from './GameBridge';
import { getCardAssetKey, getAllCardAssets } from './CardAssets';
import { getHint } from '../solver/solver';
import { getRandomSolvableGame } from '../lib/solvableDeals';
import { soundManager } from '../lib/sounds';

// Layout constants
const CARD_RATIO = 1.4; // height/width ratio
const MIN_CASCADE_OVERLAP_PX = 24; // minimum pixels visible per card (ensures rank+suit corner is readable)
const MAX_CASCADE_OVERLAP_FRAC = 0.75; // max fraction of card height visible per buried card
const SIDE_MARGIN = 0.015;
const GAP = 0.008;

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
  private cascadeGap: number = 0; // Gap between top row and cascade area

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

  // Track whether a card handled the current pointer event (prevents board tap stealing it)
  private cardTappedThisFrame: boolean = false;

  // Board slot graphics (for redraw on resize)
  private slotGraphics: Phaser.GameObjects.GameObject[] = [];

  // Visual effects
  private vignette: Phaser.GameObjects.Graphics | null = null;
  private feltNoise: Phaser.GameObjects.Graphics | null = null;

  // Juice: inactivity timers and effects
  private lastMoveTime: number = 0;
  private hintGlowGraphics: Phaser.GameObjects.Graphics | null = null;
  private hintGlowTween: Phaser.Tweens.Tween | null = null;
  private idleWiggleTweens: Phaser.Tweens.Tween[] = [];
  private idleCheckTimer: Phaser.Time.TimerEvent | null = null;
  private dragGlowGraphics: Phaser.GameObjects.Graphics[] = [];

  // Touch device detection and zone-based input
  private isTouchDevice: boolean = false;
  private longPressTimer: ReturnType<typeof setTimeout> | null = null;
  private longPressTriggered: boolean = false;
  private longPressPointer: { x: number; y: number } | null = null;
  private tooltipContainer: Phaser.GameObjects.Container | null = null;
  private lastTapCol: number = -1;
  private lastTapColTime: number = 0;

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
    for (const { key, path } of getAllCardAssets()) {
      this.load.image(key, path);
    }
  }

  create(): void {
    this.engine = new FreeCellEngine(this.gameNumber);
    this.history = new MoveHistory();
    this.timer = new GameTimer();

    // Detect touch device
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Desktop: ensure only topmost overlapping card captures taps
    if (!this.isTouchDevice) {
      this.input.setTopOnly(true);
    }

    this.drawBackgroundEffects();
    this.calculateLayout();
    this.createBoard();
    this.dealCards(true); // staggered deal on first load

    // Listen for resize
    this.scale.on('resize', () => {
      this.clearSelection();
      this.calculateLayout();
      this.drawBackgroundEffects();
      this.rebuildBoard();
      this.recreateAllCardSprites();
      this.repositionAllCards(false);
    });

    // Force resize on orientation change (Phaser doesn't always catch it)
    const handleOrientationChange = () => {
      // Delay to let browser finish viewport animation (address bar, etc.)
      setTimeout(() => {
        const parent = this.scale.parent as HTMLElement;
        if (parent) {
          this.scale.resize(parent.clientWidth, parent.clientHeight);
        }
      }, 200);
      // Double-tap: some devices need a second pass after animation settles
      setTimeout(() => {
        const parent = this.scale.parent as HTMLElement;
        if (parent) {
          this.scale.resize(parent.clientWidth, parent.clientHeight);
        }
      }, 500);
    };
    window.addEventListener('orientationchange', handleOrientationChange);
    // Also listen to resize as backup (some browsers fire resize instead)
    let resizeTimeout: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleOrientationChange, 150);
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

    gameBridge.on('requestElementPosition', (elementKey: unknown) => {
      if (typeof elementKey !== 'string') return;

      let rect = { x: 0, y: 0, width: 0, height: 0 };

      switch (elementKey) {
        case 'freecells': {
          const pos0 = this.getFreeCellPosition(0);
          const pos3 = this.getFreeCellPosition(3);
          rect = {
            x: pos0.x,
            y: pos0.y,
            width: (pos3.x + this.cardWidth) - pos0.x,
            height: this.cardHeight,
          };
          break;
        }
        case 'foundations': {
          const pos0 = this.getFoundationPosition(0);
          const pos3 = this.getFoundationPosition(3);
          rect = {
            x: pos0.x,
            y: pos0.y,
            width: (pos3.x + this.cardWidth) - pos0.x,
            height: this.cardHeight,
          };
          break;
        }
        case 'tableau': {
          const pos0 = this.getCascadeCardPosition(0, 0);
          const pos7 = this.getCascadeCardPosition(7, 0);
          rect = {
            x: pos0.x,
            y: pos0.y,
            width: (pos7.x + this.cardWidth) - pos0.x,
            height: this.scale.height - pos0.y,
          };
          break;
        }
      }
      
      // Adjust for canvas offset if the canvas is not at 0,0 of the page
      const canvas = this.game.canvas;
      const canvasRect = canvas.getBoundingClientRect();
      rect.x += canvasRect.left;
      rect.y += canvasRect.top;

      gameBridge.emit('elementPositionResponse', { key: elementKey, rect });
    });

    if (this.isTouchDevice) {
      // Mobile: zone-based tap input (no per-card hit detection)
      this.setupTouchInput();
    } else {
      // Desktop: per-card click-to-move with frame flag to prevent board tap stealing
      this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
        if (this.cardTappedThisFrame) {
          this.cardTappedThisFrame = false;
          return;
        }
        if (this.selectedCard && this.dragCards.length === 0) {
          this.handleBoardTap(pointer.x, pointer.y);
        }
      });
    }

    // Notify UI that game is ready
    gameBridge.emit('gameReady', { gameNumber: this.gameNumber });

    // Run auto-moves after deal
    this.time.delayedCall(500, () => {
      this.performAutoMoves();
    });

    // Juice: start inactivity checker (hint glow at 8s, idle wiggle at 12s)
    this.lastMoveTime = Date.now();
    this.startIdleChecker();
  }

  private calculateLayout(): void {
    const w = this.scale.width;
    const h = this.scale.height;
    this.isPortrait = h > w * 1.1; // Portrait if significantly taller than wide

    // Card width from fitting 8 columns across the screen
    const usableWidth = w * (1 - 2 * SIDE_MARGIN);
    const gapPx = w * GAP;
    const cardWidthFromWidth = Math.floor((usableWidth - 7 * gapPx) / 8);
    const cardHeightFromWidth = Math.floor(cardWidthFromWidth * CARD_RATIO);

    if (this.isPortrait) {
      // Portrait: single row of 8 at top (4 free cells + 4 foundations)
      // This matches competitor layout and maximizes cascade space
      const topMargin = Math.floor(h * 0.005);
      this.cascadeGap = Math.floor(h * 0.01);

      // No artificial card height cap — let width be the constraint
      this.cardHeight = cardHeightFromWidth;
      this.cardWidth = cardWidthFromWidth;

      this.boardOffsetX = Math.floor(
        (w - (8 * this.cardWidth + 7 * gapPx)) / 2
      );
      this.boardOffsetY = topMargin;
      this.topRowHeight = this.cardHeight;
    } else {
      // Landscape: maximize card size within both width and height constraints
      // Single row with 4 free cells + 4 foundations, then 8 cascade columns below
      const topPad = Math.max(Math.floor(h * 0.005), 2);
      this.cascadeGap = Math.floor(h * 0.01);
      const bottomPad = 4;
      const minOverlapsNeeded = 6; // initial deal has max 7-card cascades

      // Max card height that fits: topRow + cascade(1 card + 6 min overlaps)
      const vertBudget = h - topPad - this.cascadeGap - bottomPad;
      const maxCardHeight = Math.floor(
        (vertBudget - minOverlapsNeeded * MIN_CASCADE_OVERLAP_PX) / 2
      );

      this.cardHeight = Math.min(cardHeightFromWidth, maxCardHeight);
      this.cardWidth = this.cardHeight === cardHeightFromWidth
        ? cardWidthFromWidth
        : Math.floor(this.cardHeight / CARD_RATIO);

      this.boardOffsetX = Math.floor(
        (w - (8 * this.cardWidth + 7 * gapPx)) / 2
      );
      this.boardOffsetY = topPad;
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
    // Single row: free cells are columns 0-3
    return {
      x: this.getColumnX(index),
      y: this.boardOffsetY,
    };
  }

  private getFoundationPosition(index: number): { x: number; y: number } {
    // Single row: foundations are columns 4-7
    return {
      x: this.getColumnX(index + 4),
      y: this.boardOffsetY,
    };
  }

  private getCurrentOverlap(): number {
    const state = this.engine.getState();
    const maxCascadeLength = Math.max(...state.cascades.map(c => c.length), 1);
    const topRow = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    const availableHeight = this.scale.height - topRow - 4;

    // Target: fill 95% of available cascade area for a full spread
    const targetOverlap = maxCascadeLength > 1
      ? Math.floor((availableHeight * 0.95 - this.cardHeight) / (maxCascadeLength - 1))
      : this.cardHeight;

    // Cap: don't spread cards more than 65% of card height apart
    const maxDesiredOverlap = Math.floor(this.cardHeight * MAX_CASCADE_OVERLAP_FRAC);

    // Must physically fit in available space
    const maxFittingOverlap = maxCascadeLength > 1
      ? Math.floor((availableHeight - this.cardHeight) / (maxCascadeLength - 1))
      : this.cardHeight;

    return Math.max(
      MIN_CASCADE_OVERLAP_PX,
      Math.min(targetOverlap, maxDesiredOverlap, maxFittingOverlap)
    );
  }

  private getCascadeCardPosition(
    col: number,
    row: number
  ): { x: number; y: number } {
    const topRow = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    const overlap = this.getCurrentOverlap();

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

    const assetKey = getCardAssetKey(card.suit, card.rank);
    const img = this.add.image(this.cardWidth / 2, this.cardHeight / 2, assetKey);
    img.setDisplaySize(this.cardWidth, this.cardHeight);
    container.add(img);

    // Add subtle drop shadow
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.3);
    shadow.fillRoundedRect(2, 2, this.cardWidth, this.cardHeight, 6);
    container.addAt(shadow, 0); // Behind the card

    // Desktop: per-card interactivity for click-to-move and drag
    // Touch devices use zone-based input instead
    if (!this.isTouchDevice) {
      container.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, this.cardWidth, this.cardHeight),
        Phaser.Geom.Rectangle.Contains
      );

      this.input.setDraggable(container);
      container.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        this.cardTappedThisFrame = true;
        this.onCardClick(container, pointer);
      });
    }

    this.cardSprites.set(card.id, container);
    return container;
  }

  /**
   * Update hit areas and input priority for all cards based on their current positions.
   * - Cascade cards get priorityID = row index (higher = on top = wins tap)
   * - Buried cascade cards get expanded hit areas matching their visible strip
   * - Top cascade cards, free cell cards, and foundation cards get full card hit area
   */
  private updateHitAreas(): void {
    if (this.isTouchDevice) return; // Touch devices use zone-based input

    const state = this.engine.getState();

    for (let col = 0; col < 8; col++) {
      const cascade = state.cascades[col];
      for (let row = 0; row < cascade.length; row++) {
        const sprite = this.cardSprites.get(cascade[row].id);
        if (!sprite || !sprite.input) continue;

        const isTop = row === cascade.length - 1;
        if (isTop) {
          // Top (exposed) card: full card size hit area
          sprite.input.hitArea = new Phaser.Geom.Rectangle(
            0, 0, this.cardWidth, this.cardHeight
          );
        } else {
          // Buried card: clickable area is the visible overlap strip
          // Small expansion (4px) for easier clicking without bleeding into card below
          const visibleHeight = this.getCurrentOverlap();
          sprite.input.hitArea = new Phaser.Geom.Rectangle(
            0, 0, this.cardWidth, Math.min(visibleHeight + 4, this.cardHeight)
          );
        }
      }
    }

    // Free cell and foundation cards: full hit area, high priority
    for (let i = 0; i < 4; i++) {
      const card = state.freeCells[i];
      if (card) {
        const sprite = this.cardSprites.get(card.id);
        if (sprite?.input) {
          sprite.input.hitArea = new Phaser.Geom.Rectangle(
            0, 0, this.cardWidth, this.cardHeight
          );
        }
      }
    }

    for (const [, pile] of state.foundations) {
      if (pile.length > 0) {
        const topCard = pile[pile.length - 1];
        const sprite = this.cardSprites.get(topCard.id);
        if (sprite?.input) {
          sprite.input.hitArea = new Phaser.Geom.Rectangle(
            0, 0, this.cardWidth, this.cardHeight
          );
        }
      }
    }
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
          // Start cards off-screen at top-center, animate with bounce into place
          const sprite = this.createCardSprite(card, w / 2 - this.cardWidth / 2, -this.cardHeight);
          sprite.sourceLocation = { type: 'cascade', index: col, cardIndex: row };
          sprite.setDepth(500 + dealIndex);
          sprite.setScale(0.85);
          sprite.alpha = 0;

          const delay = dealIndex * 45;
          // X slides into column
          this.tweens.add({
            targets: sprite,
            x: pos.x,
            duration: 300,
            delay,
            ease: 'Power2',
          });
          // Y bounces into row position
          this.tweens.add({
            targets: sprite,
            y: pos.y,
            duration: 450,
            delay,
            ease: 'Bounce.easeOut',
          });
          // Scale and alpha pop in
          this.tweens.add({
            targets: sprite,
            scaleX: 1,
            scaleY: 1,
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

    // Set up drag handlers (desktop only — touch uses zone-based tapping)
    if (!this.isTouchDevice) {
      this.input.on('drag', (_pointer: Phaser.Input.Pointer, _gameObject: CardSprite, dragX: number, dragY: number) => {
        if (this.dragCards.length === 0) return;
        const offsetX = dragX - this.dragStartX;
        const offsetY = dragY - this.dragStartY;

        this.dragCards.forEach((card, i) => {
          card.x = this.dragStartX + offsetX;
          card.y = this.dragStartY + offsetY + i * this.getCurrentOverlap();
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

    // Initial hit area setup after all cards are placed
    this.updateHitAreas();
  }

  // ── Touch Zone System (Mobile) ───────────────────────────

  private setupTouchInput(): void {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.dismissTooltip();
      this.longPressTriggered = false;
      this.longPressPointer = { x: pointer.x, y: pointer.y };
      // Long-press disabled — not needed in FreeCell (can only move bottom cards)
      // Keeping the timer infrastructure in case we want it for something else later
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.longPressPointer) {
        const dx = pointer.x - this.longPressPointer.x;
        const dy = pointer.y - this.longPressPointer.y;
        if (Math.sqrt(dx * dx + dy * dy) > 10) {
          this.cancelLongPress();
        }
      }
    });

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      this.cancelLongPress();
      if (this.longPressTriggered) {
        this.longPressTriggered = false;
        return;
      }
      this.handleTouchTap(pointer);
    });
  }

  private cancelLongPress(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
    this.longPressPointer = null;
  }

  private handleTouchTap(pointer: Phaser.Input.Pointer): void {
    this.dismissTooltip();

    const { x, y } = pointer;

    // Check top row first (free cells / foundations)
    const topSlot = this.getTopRowSlotAtPoint(x, y);
    if (topSlot) {
      if (this.selectedCard) {
        this.handleTopRowPlacement(topSlot);
      } else if (topSlot.type === 'freecell') {
        this.handleFreeCellTouchSelect(topSlot.index);
      }
      return;
    }

    // Check cascades
    const cascadeCol = this.getCascadeColumnAtPoint(x, y);
    if (cascadeCol !== -1) {
      if (this.selectedCard) {
        this.handleCascadePlacement(cascadeCol, y);
      } else {
        this.handleCascadeSelection(cascadeCol, y);
      }
      return;
    }

    // Tapped nothing — deselect
    this.clearSelection();
  }

  private getCascadeColumnAtPoint(x: number, y: number): number {
    const cascadeTop = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    if (y < cascadeTop - 5) return -1;

    const w = this.scale.width;
    const sideMargin = w * SIDE_MARGIN;
    if (x < sideMargin || x > w - sideMargin) return -1;

    const usableWidth = w - 2 * sideMargin;
    const col = Math.floor((x - sideMargin) / (usableWidth / 8));
    return Math.min(Math.max(col, 0), 7);
  }

  private getTopRowSlotAtPoint(x: number, y: number): { type: 'freecell' | 'foundation'; index: number } | null {
    if (this.isPortrait) {
      const rowGap = Math.floor(this.scale.height * 0.008);
      const freeCellRowTop = this.boardOffsetY;
      const freeCellRowBottom = this.boardOffsetY + this.cardHeight;
      const foundationRowTop = freeCellRowBottom + rowGap;
      const foundationRowBottom = foundationRowTop + this.cardHeight;

      if (y >= freeCellRowTop - 5 && y <= freeCellRowBottom + 5) {
        const pos0 = this.getFreeCellPosition(0);
        const pos3 = this.getFreeCellPosition(3);
        const rowLeft = pos0.x - this.cardWidth * 0.15;
        const rowRight = pos3.x + this.cardWidth * 1.15;
        if (x >= rowLeft && x <= rowRight) {
          const zone = Math.floor((x - rowLeft) / ((rowRight - rowLeft) / 4));
          return { type: 'freecell', index: Math.min(Math.max(zone, 0), 3) };
        }
      }

      if (y >= foundationRowTop - 5 && y <= foundationRowBottom + 5) {
        const pos0 = this.getFoundationPosition(0);
        const pos3 = this.getFoundationPosition(3);
        const rowLeft = pos0.x - this.cardWidth * 0.15;
        const rowRight = pos3.x + this.cardWidth * 1.15;
        if (x >= rowLeft && x <= rowRight) {
          const zone = Math.floor((x - rowLeft) / ((rowRight - rowLeft) / 4));
          return { type: 'foundation', index: Math.min(Math.max(zone, 0), 3) };
        }
      }
    } else {
      // Landscape: single row, zones 0-3 = free cells, 4-7 = foundations
      const topRowTop = this.boardOffsetY;
      const topRowBottom = this.boardOffsetY + this.cardHeight;

      if (y >= topRowTop - 5 && y <= topRowBottom + 10) {
        const w = this.scale.width;
        const sideMargin = w * SIDE_MARGIN;
        if (x >= sideMargin && x <= w - sideMargin) {
          const usableWidth = w - 2 * sideMargin;
          const zone = Math.floor((x - sideMargin) / (usableWidth / 8));
          const idx = Math.min(Math.max(zone, 0), 7);
          if (idx < 4) {
            return { type: 'freecell', index: idx };
          } else {
            return { type: 'foundation', index: idx - 4 };
          }
        }
      }
    }

    return null;
  }

  private handleCascadeSelection(col: number, tapY: number): void {
    const state = this.engine.getState();
    const cascade = state.cascades[col];
    if (cascade.length === 0) return;

    if (!this.timer.isRunning) {
      this.timer.start();
    }

    // Calculate which card was tapped based on Y position
    const cascadeTop = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    const overlap = this.getCurrentOverlap();

    const relativeY = tapY - cascadeTop;
    let cardIndex = Math.floor(relativeY / Math.max(overlap, 1));
    cardIndex = Math.min(Math.max(cardIndex, 0), cascade.length - 1);

    // Snap to valid run start (can't select cards that don't form a valid run)
    const run = this.engine.getValidRun(col);
    const runStart = cascade.length - run.length;
    if (cardIndex < runStart) {
      cardIndex = runStart;
    }

    // Double-tap on column: auto-move bottom card
    const now = Date.now();
    if (this.lastTapCol === col && (now - this.lastTapColTime) < 400) {
      this.lastTapCol = -1;
      const bottomCard = cascade[cascade.length - 1];
      const sprite = this.cardSprites.get(bottomCard.id);
      if (sprite) {
        this.clearSelection();
        this.smartAutoMove(sprite);
      }
      return;
    }
    this.lastTapCol = col;
    this.lastTapColTime = now;

    const card = cascade[cardIndex];
    const sprite = this.cardSprites.get(card.id);
    if (sprite) {
      this.selectCard(sprite);
    }
  }

  private handleCascadePlacement(col: number, tapY: number): void {
    if (!this.selectedCard) return;

    const from = this.findCardLocation(this.selectedCard.cardData);
    if (!from) { this.clearSelection(); return; }

    // Tapping the same cascade = deselect
    if (from.type === 'cascade' && from.index === col) {
      this.clearSelection();
      return;
    }

    const to: Location = { type: 'cascade', index: col };

    let moveFrom = { ...from };
    if (from.type === 'cascade') {
      const state = this.engine.getState();
      const cascade = state.cascades[from.index];
      const cardIdx = cascade.findIndex(c => c.equals(this.selectedCard!.cardData));
      moveFrom = { type: 'cascade', index: from.index, cardIndex: cardIdx };

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
    } else {
      this.dragCards = [];
      this.clearSelection();
      // Try selecting from this column instead
      this.handleCascadeSelection(col, tapY);
    }
  }

  private handleTopRowPlacement(slot: { type: 'freecell' | 'foundation'; index: number }): void {
    if (!this.selectedCard) return;

    const from = this.findCardLocation(this.selectedCard.cardData);
    if (!from) { this.clearSelection(); return; }

    const suits = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
    const to: Location = slot.type === 'freecell'
      ? { type: 'freecell', index: slot.index }
      : { type: 'foundation', suit: suits[slot.index] };

    let moveFrom = { ...from };
    if (from.type === 'cascade') {
      const state = this.engine.getState();
      const cascade = state.cascades[from.index];
      const cardIdx = cascade.findIndex(c => c.equals(this.selectedCard!.cardData));
      moveFrom = { type: 'cascade', index: from.index, cardIndex: cardIdx };

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
    } else {
      this.dragCards = [];
      this.clearSelection();
      // If tapped a free cell with a card, select it
      if (slot.type === 'freecell') {
        this.handleFreeCellTouchSelect(slot.index);
      }
    }
  }

  private handleFreeCellTouchSelect(index: number): void {
    const state = this.engine.getState();
    const card = state.freeCells[index];
    if (!card) return;

    if (!this.timer.isRunning) {
      this.timer.start();
    }

    const sprite = this.cardSprites.get(card.id);
    if (sprite) {
      // Double-tap detection on free cell card
      const now = Date.now();
      if (this.lastTapCard === sprite && (now - this.lastTapTime) < 400) {
        this.lastTapCard = null;
        this.clearSelection();
        this.smartAutoMove(sprite);
        return;
      }
      this.lastTapCard = sprite;
      this.lastTapTime = now;

      this.selectCard(sprite);
    }
  }

  private handleLongPress(pointer: Phaser.Input.Pointer): void {
    const col = this.getCascadeColumnAtPoint(pointer.x, pointer.y);
    if (col === -1) return;

    const state = this.engine.getState();
    const cascade = state.cascades[col];
    if (cascade.length === 0) return;

    this.vibrate();
    this.showColumnTooltip(col, pointer.x, pointer.y);
  }

  private showColumnTooltip(col: number, x: number, _y: number): void {
    this.dismissTooltip();

    const state = this.engine.getState();
    const cascade = state.cascades[col];

    // Calculate tooltip dimensions — show cards at 1.5x or a readable minimum
    const tooltipCardWidth = Math.max(this.cardWidth * 1.5, 60);
    const tooltipCardHeight = tooltipCardWidth * CARD_RATIO;
    const tooltipOverlap = tooltipCardHeight * 0.28;
    const tooltipHeight = tooltipCardHeight + (cascade.length - 1) * tooltipOverlap + 20;
    const tooltipWidth = tooltipCardWidth + 20;

    // Position tooltip avoiding screen edges
    let tooltipX = x - tooltipWidth / 2;
    const cascadeTop = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    let tooltipY = cascadeTop;

    if (tooltipX < 5) tooltipX = 5;
    if (tooltipX + tooltipWidth > this.scale.width - 5) {
      tooltipX = this.scale.width - tooltipWidth - 5;
    }
    if (tooltipY + tooltipHeight > this.scale.height - 5) {
      tooltipY = this.scale.height - tooltipHeight - 5;
    }

    this.tooltipContainer = this.add.container(tooltipX, tooltipY);
    this.tooltipContainer.setDepth(5000);

    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0x1a1a2e, 0.95);
    bg.fillRoundedRect(0, 0, tooltipWidth, tooltipHeight, 10);
    bg.lineStyle(2, 0xffd700, 0.8);
    bg.strokeRoundedRect(0, 0, tooltipWidth, tooltipHeight, 10);
    this.tooltipContainer.add(bg);

    // Render each card in the cascade
    const cardStartX = 10;
    const cardStartY = 10;
    for (let i = 0; i < cascade.length; i++) {
      const card = cascade[i];
      const assetKey = getCardAssetKey(card.suit, card.rank);
      if (this.textures.exists(assetKey)) {
        const img = this.add.image(
          cardStartX + tooltipCardWidth / 2,
          cardStartY + i * tooltipOverlap + tooltipCardHeight / 2,
          assetKey
        );
        img.setDisplaySize(tooltipCardWidth, tooltipCardHeight);
        this.tooltipContainer.add(img);
      }
    }
  }

  private dismissTooltip(): void {
    if (this.tooltipContainer) {
      this.tooltipContainer.destroy(true);
      this.tooltipContainer = null;
    }
  }

  // ── Click-to-Move System (Desktop) ─────────────────────────

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
    // Juice: reset idle effects on any interaction
    this.lastMoveTime = Date.now();
    this.clearHintGlow();
    this.clearIdleWiggles();

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
      if (cardIdx < runStart) {
        // Can't move this card - show brief red flash
        this.flashInvalid(sprite);
        return;
      }
    } else if (location.type === 'foundation') {
      return; // Don't select foundation cards
    }

    // Check if this card has any valid destinations
    const destinations = this.getValidDestinations(sprite);
    if (destinations.length === 0) {
      // No valid moves - show brief red flash
      this.flashInvalid(sprite);
      return;
    }

    this.selectedCard = sprite;

    // Show selection glow
    this.showSelectionGlow(sprite);

    // Highlight valid destinations so user knows where to tap
    this.showDestinationHighlights(destinations);

    // Audio + haptic feedback on select
    soundManager.cardSelect();
    this.vibrate();
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

    // For cascade run selections, extend glow to cover all selected cards
    let glowHeight = this.cardHeight + 4;
    const location = this.findCardLocation(sprite.cardData);
    if (location?.type === 'cascade') {
      const state = this.engine.getState();
      const cascade = state.cascades[location.index];
      const cardIdx = cascade.findIndex(c => c.equals(sprite.cardData));
      if (cardIdx >= 0 && cardIdx < cascade.length - 1) {
        const bottomPos = this.getCascadeCardPosition(location.index, cascade.length - 1);
        glowHeight = (bottomPos.y + this.cardHeight) - sprite.y + 4;
      }
    }

    this.selectionGlow.strokeRoundedRect(
      sprite.x - 2, sprite.y - 2,
      this.cardWidth + 4, glowHeight,
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

    const cascadeTop = this.boardOffsetY + this.topRowHeight + this.cascadeGap;
    const cascadeBottom = this.scale.height;

    for (const dest of destinations) {
      const gfx = this.add.graphics();

      if (this.isTouchDevice && dest.type === 'cascade') {
        // Full column zone highlight for touch devices
        const colX = this.getColumnX(dest.index);
        gfx.fillStyle(0x00ff88, 0.08);
        gfx.fillRoundedRect(colX - 2, cascadeTop, this.cardWidth + 4, cascadeBottom - cascadeTop, 4);
        gfx.lineStyle(2, 0x00ff88, 0.4);
        gfx.strokeRoundedRect(colX - 2, cascadeTop, this.cardWidth + 4, cascadeBottom - cascadeTop, 4);
      } else {
        const pos = this.getDestinationPosition(dest);
        gfx.lineStyle(3, 0x00ff88, 0.8);
        gfx.fillStyle(0x00ff88, 0.15);
        gfx.fillRoundedRect(pos.x, pos.y, this.cardWidth, this.cardHeight, 6);
        gfx.strokeRoundedRect(pos.x, pos.y, this.cardWidth, this.cardHeight, 6);
      }

      gfx.setDepth(998);

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

  private flashInvalid(sprite: CardSprite): void {
    soundManager.invalidMove();
    const gfx = this.add.graphics();
    gfx.fillStyle(0xff0000, 0.3);
    gfx.fillRoundedRect(sprite.x, sprite.y, this.cardWidth, this.cardHeight, 6);
    gfx.setDepth(999);
    this.tweens.add({
      targets: gfx,
      alpha: 0,
      duration: 300,
      ease: 'Power2',
      onComplete: () => gfx.destroy(),
    });
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

      // Only allow dragging from valid run start
      const run = this.engine.getValidRun(location.index);
      const runStart = cascade.length - run.length;
      if (cardIdx < runStart) {
        this.flashInvalid(sprite);
        return;
      }

      // Pick up the run from this card
      this.dragCards = [];
      for (let i = cardIdx; i < cascade.length; i++) {
        const cs = this.cardSprites.get(cascade[i].id);
        if (cs) {
          this.dragCards.push(cs);
          cs.setDepth(1000 + i);
          // Lift effect — slight scale up for dragged cards
          cs.setScale(1.05);
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

    // Juice: show green glow on valid drop targets while dragging
    this.showDragTargetGlow(sprite);

    if (!this.timer.isRunning) {
      this.timer.start();
    }
  }

  private endDrag(_sprite: CardSprite): void {
    // Juice: clear drag target glow
    this.clearDragTargetGlow();

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
      this.dragCards.forEach((c) => c.setScale(1)); // Reset lift effect
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

    // Juice: reset inactivity timer and clear idle effects
    this.lastMoveTime = Date.now();
    this.clearHintGlow();
    this.clearIdleWiggles();

    // Play sound based on destination type
    if (to.type === 'foundation') {
      soundManager.cardToFoundation();
    } else {
      soundManager.cardPlace();
    }

    this.repositionAllCards();
    this.performAutoMoves();

    gameBridge.emit('moveExecuted', {
      moveCount: this.engine.getState().moveCount,
      gameNumber: this.gameNumber,
    });

    if (this.engine.getState().isWon) {
      soundManager.winFanfare();
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
    // Auto-move Aces and safe low cards to foundations
    let moved = true;
    while (moved) {
      moved = false;
      const state = this.engine.getState();
      
      // Check cascades
      for (let col = 0; col < 8; col++) {
        const cascade = state.cascades[col];
        if (cascade.length === 0) continue;
        const card = cascade[cascade.length - 1];
        if (this.isSafeAutoMove(card)) {
          const from: Location = { type: 'cascade', index: col };
          const to: Location = { type: 'foundation', suit: card.suit };
          if (this.engine.isLegalMove(from, to)) {
            const move = this.engine.executeMove(from, to);
            this.history.push(move, []);
            soundManager.cardToFoundation();
            gameBridge.emit('moveExecuted', {
              moveCount: this.engine.getState().moveCount,
              gameNumber: this.gameNumber,
            });
            moved = true;
            break; // restart scan
          }
        }
      }
      if (moved) continue;
      
      // Check free cells
      for (let i = 0; i < 4; i++) {
        const card = state.freeCells[i];
        if (!card) continue;
        if (this.isSafeAutoMove(card)) {
          const from: Location = { type: 'freecell', index: i };
          const to: Location = { type: 'foundation', suit: card.suit };
          if (this.engine.isLegalMove(from, to)) {
            const move = this.engine.executeMove(from, to);
            this.history.push(move, []);
            soundManager.cardToFoundation();
            gameBridge.emit('moveExecuted', {
              moveCount: this.engine.getState().moveCount,
              gameNumber: this.gameNumber,
            });
            moved = true;
            break;
          }
        }
      }
    }
    
    this.repositionAllCards();
    
    // Check win
    if (this.engine.getState().isWon) {
      soundManager.winFanfare();
      gameBridge.emit('gameWon', {
        time: this.timer.seconds,
        moves: this.engine.getState().moveCount,
      });
      this.timer.stop();
      this.time.delayedCall(400, () => this.winCelebration());
    }
    
    // Check auto-completable
    if (this.engine.isAutoCompletable()) {
      gameBridge.emit('autoCompletable', { completable: true });
    }
  }
  
  /**
   * A card is safe to auto-move using the Card's built-in isSafeToAutoMove method.
   */
  private isSafeAutoMove(card: Card): boolean {
    const state = this.engine.getState();
    const foundationRanks = new Map<Suit, Rank | 0>();
    for (const [suit, pile] of state.foundations) {
      foundationRanks.set(suit, pile.length > 0 ? (pile[pile.length - 1].rank as Rank) : 0);
    }
    return card.isSafeToAutoMove(foundationRanks);
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
        soundManager.cardToFoundation();
        this.repositionAllCards();

        gameBridge.emit('moveExecuted', {
          moveCount: this.engine.getState().moveCount,
          gameNumber: this.gameNumber,
        });

        if (this.engine.getState().isWon) {
          soundManager.winFanfare();
          gameBridge.emit('autoCompletable', { completable: false });
          gameBridge.emit('gameWon', {
            time: this.timer.seconds,
            moves: this.engine.getState().moveCount,
          });
          this.timer.stop();
          this.time.delayedCall(400, () => this.winCelebration());
        } else {
          this.time.delayedCall(25, moveCards);
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
      card.setScale(1); // Reset lift effect
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
    return Math.min(180, Math.max(60, distance * 0.25));
  }

  /**
   * Rebuild the visual content of all card sprites after a resize/texture regeneration.
   * Preserves the container + interactivity but replaces the image inside.
   */
  private recreateAllCardSprites(): void {
    for (const [, sprite] of this.cardSprites) {
      // Remove all children (image, shadow, text objects)
      sprite.removeAll(true);

      // Re-add card image
      const assetKey = getCardAssetKey(sprite.cardData.suit, sprite.cardData.rank);
      if (this.textures.exists(assetKey)) {
        const img = this.add.image(this.cardWidth / 2, this.cardHeight / 2, assetKey);
        img.setDisplaySize(this.cardWidth, this.cardHeight);
        sprite.add(img);
      }

      // Re-add shadow behind the card
      const shadow = this.add.graphics();
      shadow.fillStyle(0x000000, 0.3);
      shadow.fillRoundedRect(2, 2, this.cardWidth, this.cardHeight, 6);
      sprite.addAt(shadow, 0);

      // Update container size
      sprite.setSize(this.cardWidth, this.cardHeight);
    }
  }

  private repositionAllCards(animate: boolean = true): void {
    const state = this.engine.getState();

    // Position cascade cards with snappy settle + staggered delay for physical feel
    for (let col = 0; col < 8; col++) {
      const cascade = state.cascades[col];
      for (let row = 0; row < cascade.length; row++) {
        const sprite = this.cardSprites.get(cascade[row].id);
        if (sprite) {
          const pos = this.getCascadeCardPosition(col, row);
          const isMoving = Math.abs(sprite.x - pos.x) > 3 || Math.abs(sprite.y - pos.y) > 3;
          if (animate) {
            this.tweens.add({
              targets: sprite,
              x: pos.x,
              y: pos.y,
              duration: isMoving
                ? Math.min(200, Math.max(80, this.getMoveDuration(sprite, pos.x, pos.y)))
                : this.getMoveDuration(sprite, pos.x, pos.y),
              delay: isMoving ? 0 : row * 12, // Staggered settling for cascade cards
              ease: isMoving ? 'Power3.easeOut' : 'Power2',
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

    // Position free cell cards with snappy move
    for (let i = 0; i < 4; i++) {
      const card = state.freeCells[i];
      if (card) {
        const sprite = this.cardSprites.get(card.id);
        if (sprite) {
          const pos = this.getFreeCellPosition(i);
          const isMoving = Math.abs(sprite.x - pos.x) > 3 || Math.abs(sprite.y - pos.y) > 3;
          if (animate) {
            this.tweens.add({
              targets: sprite,
              x: pos.x,
              y: pos.y,
              duration: isMoving
                ? Math.min(200, Math.max(80, this.getMoveDuration(sprite, pos.x, pos.y)))
                : this.getMoveDuration(sprite, pos.x, pos.y),
              ease: isMoving ? 'Power3.easeOut' : 'Power2',
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

    // Position foundation cards (only top visible) with bloom + particle burst
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
              duration: isMovingToFoundation
                ? Math.min(180, Math.max(80, this.getMoveDuration(sprite, pos.x, pos.y)))
                : this.getMoveDuration(sprite, pos.x, pos.y),
              ease: isMovingToFoundation ? 'Back.easeOut' : 'Power2', // Keep Back.easeOut for foundation — satisfying landing
              onComplete: isMovingToFoundation ? () => {
                this.foundationBloom(sprite);
                this.foundationParticleBurst(pos.x, pos.y);
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

    // Update hit areas and input priority after repositioning
    this.updateHitAreas();
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

    soundManager.undo();

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

  // ── Win Celebration (Windows Solitaire Nostalgia) ──────────

  private winCelebrationActive: boolean = false;
  private winCelebrationObjects: Phaser.GameObjects.GameObject[] = [];

  private winCelebration(): void {
    this.winCelebrationActive = true;

    const w = this.scale.width;
    const h = this.scale.height;
    const cw = this.cardWidth;
    const ch = this.cardHeight;

    // Collect cards from foundations (top card of each pile, then next, etc.)
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

    // Suit trail colors (RGBA tints)
    const suitColors: Record<string, number> = {
      [Suit.Hearts]: 0xff2222,
      [Suit.Diamonds]: 0xff6622,
      [Suit.Clubs]: 0x2244ff,
      [Suit.Spades]: 0x22cc44,
    };

    // Physics-based bouncing card simulation
    const GRAVITY = 0.4;
    const BOUNCE_DAMPING = 0.85;
    const TRAIL_INTERVAL = 2; // leave trail every N frames

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

    // Launch a new card every 150ms
    const launchTimer = this.time.addEvent({
      delay: 150,
      repeat: cardQueue.length - 1,
      callback: () => {
        if (launchIndex >= cardQueue.length) return;
        const { card, foundationIdx } = cardQueue[launchIndex];
        const pos = this.getFoundationPosition(foundationIdx);

        // Get the existing sprite and bring it to celebration depth
        const sprite = this.cardSprites.get(card.id);
        if (!sprite) { launchIndex++; return; }

        sprite.setDepth(2000 + launchIndex);
        sprite.setPosition(pos.x, pos.y);

        // Random launch direction
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

    // Physics update loop
    const updateEvent = this.time.addEvent({
      delay: 16, // ~60fps
      loop: true,
      callback: () => {
        if (!this.winCelebrationActive) {
          updateEvent.destroy();
          return;
        }

        for (const bc of activeCards) {
          if (!bc.alive) continue;

          // Apply gravity
          bc.vy += GRAVITY;

          // Move
          bc.x += bc.vx;
          bc.y += bc.vy;

          // Bounce off left/right walls
          if (bc.x < 0) {
            bc.x = 0;
            bc.vx = Math.abs(bc.vx) * BOUNCE_DAMPING;
          } else if (bc.x + cw > w) {
            bc.x = w - cw;
            bc.vx = -Math.abs(bc.vx) * BOUNCE_DAMPING;
          }

          // Bounce off bottom
          if (bc.y + ch > h) {
            bc.y = h - ch;
            bc.vy = -Math.abs(bc.vy) * BOUNCE_DAMPING;
            // Stop if barely bouncing
            if (Math.abs(bc.vy) < 1) {
              bc.alive = false;
            }
          }

          // Bounce off top
          if (bc.y < 0) {
            bc.y = 0;
            bc.vy = Math.abs(bc.vy) * BOUNCE_DAMPING;
          }

          // Leave colored trail/afterimage
          bc.frameCount++;
          if (bc.frameCount % TRAIL_INTERVAL === 0) {
            const trail = this.add.graphics();
            trail.fillStyle(bc.trailColor, 0.5);
            trail.fillRoundedRect(0, 0, cw, ch, 6);
            trail.setPosition(bc.x, bc.y);
            trail.setDepth(1999);
            this.winCelebrationObjects.push(trail);

            // Fade out trail
            this.tweens.add({
              targets: trail,
              alpha: 0,
              duration: 1200,
              ease: 'Power2',
              onComplete: () => trail.destroy(),
            });
          }

          // Update sprite position
          bc.sprite.setPosition(bc.x, bc.y);
        }
      },
    });
    this.winCelebrationObjects.push(updateEvent as unknown as Phaser.GameObjects.GameObject);

    // Confetti overlay
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
        try { obj.destroy(); } catch { /* already destroyed */ }
      }
    }
    this.winCelebrationObjects = [];
  }

  // ── New Game ──────────────────────────────────────────────

  private startNewGame(): void {
    // Clean up any active celebration
    this.cleanupWinCelebration();

    // Juice: clean up idle effects
    this.clearHintGlow();
    this.clearIdleWiggles();
    this.clearDragTargetGlow();

    // Clear all sprites and touch state
    this.cardSprites.forEach((sprite) => sprite.destroy());
    this.cardSprites.clear();
    this.clearSelection();
    this.dismissTooltip();
    this.cancelLongPress();

    // Reset engine
    this.engine = new FreeCellEngine(this.gameNumber);
    this.history.clear();
    this.timer.reset();

    // Rebuild board and redeal with staggered animation
    this.rebuildBoard();
    this.dealCards(true);
    this.lastMoveTime = Date.now();
    gameBridge.emit('gameReady', { gameNumber: this.gameNumber });
  }

  // ── Juice: Inactivity Effects ────────────────────────────────

  private startIdleChecker(): void {
    if (this.idleCheckTimer) this.idleCheckTimer.destroy();
    this.idleCheckTimer = this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => this.checkIdleEffects(),
    });
  }

  private checkIdleEffects(): void {
    if (this.engine.getState().isWon) return;
    if (!this.engine.hasLegalMoves()) return;

    const idle = (Date.now() - this.lastMoveTime) / 1000;

    // Auto-hint glow after 8 seconds
    if (idle >= 8 && !this.hintGlowGraphics) {
      this.showAutoHintGlow();
    }

    // Idle card wiggle after 12 seconds
    if (idle >= 12 && this.idleWiggleTweens.length === 0) {
      this.showIdleWiggle();
    }
  }

  /** Gently pulse a gold border around the best hint card after 8s idle */
  private showAutoHintGlow(): void {
    this.clearHintGlow();
    const hint = getHint(this.engine);
    if (!hint) return;

    const card = hint.cards[0];
    const sprite = this.cardSprites.get(card.id);
    if (!sprite) return;

    const gfx = this.add.graphics();
    const pad = 4;
    // Soft gold outer glow (two layers for bloom effect)
    gfx.lineStyle(6, 0xffd700, 0.25);
    gfx.strokeRoundedRect(
      sprite.x - pad - 2, sprite.y - pad - 2,
      this.cardWidth + (pad + 2) * 2, this.cardHeight + (pad + 2) * 2, 10
    );
    gfx.lineStyle(3, 0xffd700, 0.7);
    gfx.strokeRoundedRect(
      sprite.x - pad, sprite.y - pad,
      this.cardWidth + pad * 2, this.cardHeight + pad * 2, 8
    );
    gfx.setDepth(997);
    this.hintGlowGraphics = gfx;

    this.hintGlowTween = this.tweens.add({
      targets: gfx,
      alpha: 0.3,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private clearHintGlow(): void {
    if (this.hintGlowTween) {
      this.hintGlowTween.destroy();
      this.hintGlowTween = null;
    }
    if (this.hintGlowGraphics) {
      this.hintGlowGraphics.destroy();
      this.hintGlowGraphics = null;
    }
  }

  /** Subtle breathing scale pulse on playable cards after 12s idle */
  private showIdleWiggle(): void {
    this.clearIdleWiggles();
    const state = this.engine.getState();

    // Gather bottom-of-cascade cards that have legal moves
    const playableIds: string[] = [];
    for (let col = 0; col < 8; col++) {
      const cascade = state.cascades[col];
      if (cascade.length === 0) continue;
      const bottomCard = cascade[cascade.length - 1];
      const sprite = this.cardSprites.get(bottomCard.id);
      if (!sprite) continue;
      const dests = this.getValidDestinations(sprite);
      if (dests.length > 0) playableIds.push(bottomCard.id);
    }
    for (let i = 0; i < 4; i++) {
      const card = state.freeCells[i];
      if (!card) continue;
      const sprite = this.cardSprites.get(card.id);
      if (!sprite) continue;
      const dests = this.getValidDestinations(sprite);
      if (dests.length > 0) playableIds.push(card.id);
    }

    for (const id of playableIds) {
      const sprite = this.cardSprites.get(id);
      if (!sprite) continue;
      const tw = this.tweens.add({
        targets: sprite,
        scaleX: 1.02,
        scaleY: 1.02,
        duration: 1200 + Math.random() * 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: Math.random() * 600,
      });
      this.idleWiggleTweens.push(tw);
    }
  }

  private clearIdleWiggles(): void {
    for (const tw of this.idleWiggleTweens) {
      if (tw.targets && tw.targets.length > 0) {
        const target = tw.targets[0] as CardSprite;
        if (target && target.active !== false) {
          target.setScale(1);
        }
      }
      tw.destroy();
    }
    this.idleWiggleTweens = [];
  }

  // ── Juice: Foundation Particle Burst ───────────────────────────

  /** Emit a small burst of gold particles when a card reaches foundation */
  private foundationParticleBurst(x: number, y: number): void {
    const cx = x + this.cardWidth / 2;
    const cy = y + this.cardHeight / 2;
    const count = 10;
    for (let i = 0; i < count; i++) {
      const particle = this.add.graphics();
      const size = 2 + Math.random() * 4;
      const bright = Math.random() > 0.3;
      particle.fillStyle(bright ? 0xffd700 : 0xffaa00, 1);
      particle.fillCircle(0, 0, size);
      particle.setPosition(cx, cy);
      particle.setDepth(1500);

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const dist = 25 + Math.random() * 40;
      const tx = cx + Math.cos(angle) * dist;
      const ty = cy + Math.sin(angle) * dist;

      this.tweens.add({
        targets: particle,
        x: tx,
        y: ty,
        alpha: 0,
        scaleX: 0.3,
        scaleY: 0.3,
        duration: 400 + Math.random() * 200,
        ease: 'Power2',
        onComplete: () => particle.destroy(),
      });
    }
  }

  // ── Juice: Valid Drop Target Glow (during drag) ────────────────

  /** Show green glow on all valid drop locations while dragging */
  private showDragTargetGlow(sprite: CardSprite): void {
    this.clearDragTargetGlow();
    const destinations = this.getValidDestinations(sprite);

    for (const dest of destinations) {
      const pos = this.getDestinationPosition(dest);
      const gfx = this.add.graphics();
      gfx.fillStyle(0x00ff88, 0.12);
      gfx.fillRoundedRect(pos.x, pos.y, this.cardWidth, this.cardHeight, 6);
      gfx.lineStyle(2, 0x00ff88, 0.5);
      gfx.strokeRoundedRect(pos.x, pos.y, this.cardWidth, this.cardHeight, 6);
      gfx.setDepth(996);

      this.tweens.add({
        targets: gfx,
        alpha: 0.4,
        duration: 600,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });

      this.dragGlowGraphics.push(gfx);
    }
  }

  private clearDragTargetGlow(): void {
    for (const gfx of this.dragGlowGraphics) {
      this.tweens.killTweensOf(gfx);
      gfx.destroy();
    }
    this.dragGlowGraphics = [];
  }
}
