/**
 * Zustand store wrapping KlondikeEngine for DOM-based Klondike.
 */

import { create } from 'zustand';
import { KlondikeEngine, KlondikeGameState, KlondikeLocation, KlondikeMove, KlondikeDrawMode } from '@/engine/KlondikeEngine';
import { dealKlondikeGame } from '@/engine/Deck';
import { Card, Suit } from '@/engine/Card';

// ---------------------------------------------------------------------------
// Drag state
// ---------------------------------------------------------------------------

export interface DragState {
  cardIds: string[];
  sourceLocation: KlondikeLocation;
}

interface DragPosition {
  currentX: number;
  currentY: number;
}

const _dragPos: DragPosition = { currentX: 0, currentY: 0 };

// ---------------------------------------------------------------------------
// Store shape
// ---------------------------------------------------------------------------

export interface DomKlondikeState {
  // Game state
  cascades: Card[][];
  foundations: Map<Suit, Card[]>;
  stock: Card[];
  waste: Card[];
  gameNumber: number;
  moveCount: number;
  isWon: boolean;
  drawMode: KlondikeDrawMode;

  // Timer
  timerStarted: boolean;
  timerSeconds: number;

  // Interaction
  dragState: DragState | null;
  selection: { cardIds: string[]; sourceLocation: KlondikeLocation } | null;

  // Actions
  newGame: (gameNumber?: number) => void;
  restart: () => void;
  setDrawMode: (mode: KlondikeDrawMode) => void;
  drawFromStock: () => void;
  tryMove: (from: KlondikeLocation, to: KlondikeLocation) => boolean;
  autoPlace: (cardId: string) => boolean;
  undo: () => void;
  tickTimer: () => void;
  selectCards: (cardIds: string[], source: KlondikeLocation) => void;
  clearSelection: () => void;
  startDrag: (cardIds: string[], source: KlondikeLocation) => void;
  updateDragPosition: (x: number, y: number) => void;
  endDrag: () => void;
  getDragPosition: () => DragPosition;

  getEngine: () => KlondikeEngine;
}

// ---------------------------------------------------------------------------
// Engine instance
// ---------------------------------------------------------------------------

let _drawMode: KlondikeDrawMode = 1;
let _engine: KlondikeEngine = createEngine(1);

function createEngine(gameNumber: number): KlondikeEngine {
  const deal = dealKlondikeGame(gameNumber);
  return new KlondikeEngine(gameNumber, _drawMode, deal.cascades, deal.stock);
}

function snapshotEngine(engine: KlondikeEngine): Pick<
  DomKlondikeState,
  'cascades' | 'foundations' | 'stock' | 'waste' | 'gameNumber' | 'moveCount' | 'isWon' | 'drawMode'
> {
  const s = engine.getState();
  return {
    cascades: s.cascades,
    foundations: s.foundations,
    stock: s.stock,
    waste: s.waste,
    gameNumber: s.gameNumber,
    moveCount: s.moveCount,
    isWon: s.isWon,
    drawMode: s.drawMode,
  };
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const domKlondikeStore = create<DomKlondikeState>()((set, get) => ({
  ...snapshotEngine(_engine),

  timerStarted: false,
  timerSeconds: 0,
  dragState: null,
  selection: null,

  newGame: (gameNumber?: number) => {
    const num = gameNumber ?? Math.floor(Math.random() * 1_000_000) + 1;
    _engine = createEngine(num);
    set({
      ...snapshotEngine(_engine),
      dragState: null,
      selection: null,
      timerStarted: false,
      timerSeconds: 0,
    });
  },

  restart: () => {
    const num = get().gameNumber;
    _engine = createEngine(num);
    set({
      ...snapshotEngine(_engine),
      dragState: null,
      selection: null,
      timerStarted: false,
      timerSeconds: 0,
    });
  },

  setDrawMode: (mode: KlondikeDrawMode) => {
    _drawMode = mode;
    // Restart with new draw mode
    const num = get().gameNumber;
    _engine = createEngine(num);
    set({
      ...snapshotEngine(_engine),
      dragState: null,
      selection: null,
      timerStarted: false,
      timerSeconds: 0,
    });
  },

  drawFromStock: () => {
    try {
      _engine.drawFromStock();
      set({
        ...snapshotEngine(_engine),
        timerStarted: true,
      });
    } catch {
      // No cards to draw
    }
  },

  tryMove: (from: KlondikeLocation, to: KlondikeLocation) => {
    if (!_engine.isLegalMove(from, to)) return false;
    _engine.executeMove(from, to);
    // Auto-move safe cards to foundations
    _engine.autoMoveToFoundations();
    set({
      ...snapshotEngine(_engine),
      timerStarted: true,
    });
    return true;
  },

  autoPlace: (cardId: string) => {
    const state = _engine.getState();
    
    // Find the card location
    // Check waste
    if (state.waste.length > 0 && state.waste[state.waste.length - 1].id === cardId) {
      const card = state.waste[state.waste.length - 1];
      // Try foundation
      const foundLoc: KlondikeLocation = { type: 'foundation', suit: card.suit };
      if (_engine.isLegalMove({ type: 'waste' }, foundLoc)) {
        _engine.executeMove({ type: 'waste' }, foundLoc);
        _engine.autoMoveToFoundations();
        set({ ...snapshotEngine(_engine), timerStarted: true });
        return true;
      }
      // Try cascades
      for (let i = 0; i < 7; i++) {
        const to: KlondikeLocation = { type: 'cascade', index: i };
        if (_engine.isLegalMove({ type: 'waste' }, to)) {
          _engine.executeMove({ type: 'waste' }, to);
          _engine.autoMoveToFoundations();
          set({ ...snapshotEngine(_engine), timerStarted: true });
          return true;
        }
      }
    }

    // Check cascades
    for (let i = 0; i < 7; i++) {
      const cascade = state.cascades[i];
      if (cascade.length > 0 && cascade[cascade.length - 1].id === cardId) {
        const card = cascade[cascade.length - 1];
        // Try foundation first
        const foundLoc: KlondikeLocation = { type: 'foundation', suit: card.suit };
        if (_engine.isLegalMove({ type: 'cascade', index: i }, foundLoc)) {
          _engine.executeMove({ type: 'cascade', index: i }, foundLoc);
          _engine.autoMoveToFoundations();
          set({ ...snapshotEngine(_engine), timerStarted: true });
          return true;
        }
      }
    }

    return false;
  },

  undo: () => {
    const undone = _engine.undoLastMove();
    if (undone) {
      set({ ...snapshotEngine(_engine) });
    }
  },

  tickTimer: () => {
    set((s) => ({ timerSeconds: s.timerSeconds + 1 }));
  },

  selectCards: (cardIds: string[], source: KlondikeLocation) => {
    set({ selection: { cardIds, sourceLocation: source } });
  },

  clearSelection: () => {
    set({ selection: null });
  },

  startDrag: (cardIds: string[], source: KlondikeLocation) => {
    set({ dragState: { cardIds, sourceLocation: source }, selection: null });
  },

  updateDragPosition: (x: number, y: number) => {
    _dragPos.currentX = x;
    _dragPos.currentY = y;
  },

  endDrag: () => {
    set({ dragState: null });
  },

  getDragPosition: () => _dragPos,

  getEngine: () => _engine,
}));

export const useDomKlondikeStore = domKlondikeStore;
