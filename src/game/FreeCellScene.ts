/**
 * Main FreeCell Phaser Scene
 * 
 * Renders the game board: 8 cascades, 4 free cells, 4 foundations
 * Handles drag-and-drop card interaction
 */
import * as Phaser from 'phaser';
import { FreeCellEngine, Location, Move } from '../engine/FreeCellEngine';
import { Card, Suit, RANK_NAMES, SUIT_SYMBOLS } from '../engine/Card';
import { MoveHistory, MoveEntry } from '../engine/MoveHistory';
import { GameTimer } from '../engine/GameTimer';
import { gameBridge } from './GameBridge';
import { getAllCardAssets, getCardAssetKey } from './CardAssets';
import { getHint } from '../solver/solver';

// Layout constants
const CARD_RATIO = 1.4; // height/width ratio
const CASCADE_OVERLAP = 0.25; // fraction of card height visible when overlapping
const TOP_MARGIN = 0.08; // fraction of screen height
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

  // Drag state
  private dragCards: CardSprite[] = [];
  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private selectedCard: CardSprite | null = null;

  constructor() {
    super({ key: 'FreeCellScene' });
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

    this.calculateLayout();
    this.createBoard();
    this.dealCards();

    // Listen for resize
    this.scale.on('resize', () => {
      this.calculateLayout();
      this.repositionAllCards();
    });

    // Listen for bridge events
    gameBridge.on('newGame', (gameNum?: unknown) => {
      this.gameNumber = typeof gameNum === 'number' ? gameNum : Math.floor(Math.random() * 9999999) + 1;
      this.startNewGame();
    });

    gameBridge.on('undo', () => this.undoLastMove());
    gameBridge.on('redo', () => this.redoMove());
    gameBridge.on('hint', () => this.showHint());

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

    // 8 columns with gaps
    const usableWidth = w * (1 - 2 * SIDE_MARGIN);
    this.cardWidth = Math.floor((usableWidth - 7 * (w * GAP)) / 8);
    this.cardHeight = Math.floor(this.cardWidth * CARD_RATIO);

    // Clamp card size
    const maxCardHeight = h * 0.18;
    if (this.cardHeight > maxCardHeight) {
      this.cardHeight = Math.floor(maxCardHeight);
      this.cardWidth = Math.floor(this.cardHeight / CARD_RATIO);
    }

    this.boardOffsetX = Math.floor(
      (w - (8 * this.cardWidth + 7 * (w * GAP))) / 2
    );
    this.boardOffsetY = Math.floor(h * TOP_MARGIN);
  }

  private getColumnX(col: number): number {
    return (
      this.boardOffsetX +
      col * (this.cardWidth + this.scale.width * GAP)
    );
  }

  private getFreeCellPosition(index: number): { x: number; y: number } {
    return {
      x: this.getColumnX(index),
      y: this.boardOffsetY,
    };
  }

  private getFoundationPosition(index: number): { x: number; y: number } {
    return {
      x: this.getColumnX(index + 4),
      y: this.boardOffsetY,
    };
  }

  private getCascadeCardPosition(
    col: number,
    row: number
  ): { x: number; y: number } {
    const topRow = this.boardOffsetY + this.cardHeight + this.scale.height * 0.02;
    const availableHeight = this.scale.height - topRow - 10; // leave 10px bottom margin
    
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
    const w = this.scale.width;

    // Free cell slots (top-left 4)
    for (let i = 0; i < 4; i++) {
      const pos = this.getFreeCellPosition(i);
      this.createSlot(pos.x, pos.y, 'free');
    }

    // Foundation slots (top-right 4)
    const suitSymbols = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
    for (let i = 0; i < 4; i++) {
      const pos = this.getFoundationPosition(i);
      this.createSlot(pos.x, pos.y, 'foundation', SUIT_SYMBOLS[suitSymbols[i]]);
    }
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

    // Make interactive
    container.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.cardWidth, this.cardHeight),
      Phaser.Geom.Rectangle.Contains
    );

    this.input.setDraggable(container);
    container.on('pointerdown', () => this.onCardClick(container));

    this.cardSprites.set(card.id, container);
    return container;
  }

  private dealCards(): void {
    const state = this.engine.getState();

    for (let col = 0; col < 8; col++) {
      const cascade = state.cascades[col];
      for (let row = 0; row < cascade.length; row++) {
        const card = cascade[row];
        const pos = this.getCascadeCardPosition(col, row);
        const sprite = this.createCardSprite(card, pos.x, pos.y);
        sprite.sourceLocation = { type: 'cascade', index: col, cardIndex: row };
        sprite.setDepth(row + 10);
      }
    }

    // Set up drag handlers
    this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: CardSprite, dragX: number, dragY: number) => {
      if (this.dragCards.length === 0) return;
      const offsetX = dragX - this.dragStartX;
      const offsetY = dragY - this.dragStartY;

      this.dragCards.forEach((card, i) => {
        card.x = this.dragStartX + offsetX;
        card.y = this.dragStartY + offsetY + i * Math.floor(this.cardHeight * CASCADE_OVERLAP);
      });
    });

    this.input.on('dragstart', (_pointer: Phaser.Input.Pointer, gameObject: CardSprite) => {
      this.startDrag(gameObject);
    });

    this.input.on('dragend', (_pointer: Phaser.Input.Pointer, gameObject: CardSprite) => {
      this.endDrag(gameObject);
    });
  }

  private onCardClick(sprite: CardSprite): void {
    // Double-click to auto-move to foundation
    if (this.selectedCard === sprite) {
      this.tryAutoMoveCard(sprite);
      this.selectedCard = null;
      return;
    }

    if (this.selectedCard) {
      // Try to move selected card to this card's location
      this.tryMoveSelectedTo(sprite);
      this.selectedCard = null;
    } else {
      this.selectedCard = sprite;
    }
  }

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
    } else {
      this.dragCards = [sprite];
      sprite.setDepth(1000);
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
      const state = this.engine.getState();
      const cascade = state.cascades[col];
      const row = Math.max(0, cascade.length - 1);
      const pos =
        cascade.length === 0
          ? this.getCascadeCardPosition(col, 0)
          : this.getCascadeCardPosition(col, row);

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
    }

    if (!this.engine.hasLegalMoves() && !this.engine.getState().isWon) {
      gameBridge.emit('deadlock');
    }
  }

  private performAutoMoves(): void {
    // Auto-moves are already executed in executeMoveAndAnimate
    // This just triggers repositioning
    this.repositionAllCards();
  }

  private tryAutoMoveCard(sprite: CardSprite): void {
    const location = this.findCardLocation(sprite.cardData);
    if (!location) return;

    const card = sprite.cardData;
    const foundationTarget: Location = { type: 'foundation', suit: card.suit };

    if (this.engine.isLegalMove(location, foundationTarget)) {
      this.executeMoveAndAnimate(location, foundationTarget);
    }
  }

  private tryMoveSelectedTo(targetSprite: CardSprite): void {
    if (!this.selectedCard) return;

    const from = this.findCardLocation(this.selectedCard.cardData);
    const targetLoc = this.findCardLocation(targetSprite.cardData);
    if (!from || !targetLoc) return;

    // Move to the cascade containing the target card
    if (targetLoc.type === 'cascade') {
      const to: Location = { type: 'cascade', index: targetLoc.index };
      if (this.engine.isLegalMove(from, to)) {
        this.dragCards = [this.selectedCard];
        this.executeMoveAndAnimate(from, to);
        this.dragCards = [];
      }
    }
  }

  private findCardLocation(card: Card): Location | null {
    const state = this.engine.getState();

    // Check cascades
    for (let i = 0; i < 8; i++) {
      const idx = state.cascades[i].findIndex((c) => c.equals(card));
      if (idx !== -1) {
        return { type: 'cascade', index: i, cardIndex: idx };
      }
    }

    // Check free cells
    for (let i = 0; i < 4; i++) {
      if (state.freeCells[i]?.equals(card)) {
        return { type: 'freecell', index: i };
      }
    }

    // Check foundations
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

  private repositionAllCards(): void {
    const state = this.engine.getState();

    // Position cascade cards
    for (let col = 0; col < 8; col++) {
      const cascade = state.cascades[col];
      for (let row = 0; row < cascade.length; row++) {
        const sprite = this.cardSprites.get(cascade[row].id);
        if (sprite) {
          const pos = this.getCascadeCardPosition(col, row);
          this.tweens.add({
            targets: sprite,
            x: pos.x,
            y: pos.y,
            duration: 150,
            ease: 'Power2',
          });
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
          this.tweens.add({
            targets: sprite,
            x: pos.x,
            y: pos.y,
            duration: 150,
            ease: 'Power2',
          });
          sprite.setDepth(5);
          sprite.sourceLocation = { type: 'freecell', index: i };
        }
      }
    }

    // Position foundation cards (only top visible)
    for (const [suit, pile] of state.foundations) {
      if (pile.length > 0) {
        const topCard = pile[pile.length - 1];
        const sprite = this.cardSprites.get(topCard.id);
        const suits = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
        const idx = suits.indexOf(suit);
        if (sprite) {
          const pos = this.getFoundationPosition(idx);
          this.tweens.add({
            targets: sprite,
            x: pos.x,
            y: pos.y,
            duration: 150,
            ease: 'Power2',
          });
          sprite.setDepth(5 + pile.length);
          sprite.sourceLocation = { type: 'foundation', suit };
        }
      }
    }
  }

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
      // Flash highlight effect
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

  private startNewGame(): void {
    // Clear all sprites
    this.cardSprites.forEach((sprite) => sprite.destroy());
    this.cardSprites.clear();

    // Reset engine
    this.engine = new FreeCellEngine(this.gameNumber);
    this.history.clear();
    this.timer.reset();

    // Redeal
    this.dealCards();
    gameBridge.emit('gameReady', { gameNumber: this.gameNumber });
  }
}
