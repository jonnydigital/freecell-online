/**
 * Zustand store wrapping SpiderEngine for DOM-based Spider Solitaire.
 */

import { create } from 'zustand';
import { SpiderEngine, SpiderGameState, SpiderLocation, SpiderMove, SpiderDifficulty } from '@/engine/SpiderEngine';
import { Card, Suit } from '@/engine/Card';

// ---------------------------------------------------------------------------
// Drag state
// ---------------------------------------------------------------------------

export interface DragState {
  cardIds: string[];
  sourceLocation: SpiderLocation;
}

interface DragPosition {
  currentX: number;
  currentY: number;
}

const _dragPos: DragPosition = { currentX: 0, currentY: 0 };

// ---------------------------------------------------------------------------
// Store shape
// ---------------------------------------------------------------------------

export interface DomSpiderState {
  cascades: Card[][];
  stock: Card[];
  foundations: Card[][];
  gameNumber: number;
  moveCount: number;
  isWon: boolean;
  difficulty: SpiderDifficulty;

  timerStarted: boolean;
  timerSeconds: number;

  dragState: DragState | null;
  selection: { cardIds: string[]; sourceLocation: SpiderLocation } | null;

  newGame: (gameNumber?: number) => void;
  restart: () => void;
  setDifficulty: (d: SpiderDifficulty) => void;
  dealFromStock: () => void;
  tryMove: (from: SpiderLocation, to: SpiderLocation) => boolean;
  undo: () => void;
  tickTimer: () => void;
  selectCards: (cardIds: string[], source: SpiderLocation) => void;
  clearSelection: () => void;
  startDrag: (cardIds: string[], source: SpiderLocation) => void;
  updateDragPosition: (x: number, y: number) => void;
  endDrag: () => void;
  getDragPosition: () => DragPosition;
  getEngine: () => SpiderEngine;
}

// ---------------------------------------------------------------------------
// Engine instance
// ---------------------------------------------------------------------------

let _difficulty: SpiderDifficulty = '1-suit';
let _engine: SpiderEngine = new SpiderEngine(1, _difficulty);

function snapshotEngine(engine: SpiderEngine): Pick<
  DomSpiderState,
  'cascades' | 'stock' | 'foundations' | 'gameNumber' | 'moveCount' | 'isWon' | 'difficulty'
> {
  const s = engine.getState();
  return {
    cascades: s.cascades,
    stock: s.stock,
    foundations: s.foundations,
    gameNumber: s.gameNumber,
    moveCount: s.moveCount,
    isWon: s.isWon,
    difficulty: _difficulty,
  };
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const domSpiderStore = create<DomSpiderState>()((set, get) => ({
  ...snapshotEngine(_engine),

  timerStarted: false,
  timerSeconds: 0,
  dragState: null,
  selection: null,

  newGame: (gameNumber?: number) => {
    const num = gameNumber ?? Math.floor(Math.random() * 1_000_000) + 1;
    _engine = new SpiderEngine(num, _difficulty);
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
    _engine = new SpiderEngine(num, _difficulty);
    set({
      ...snapshotEngine(_engine),
      dragState: null,
      selection: null,
      timerStarted: false,
      timerSeconds: 0,
    });
  },

  setDifficulty: (d: SpiderDifficulty) => {
    _difficulty = d;
    const num = Math.floor(Math.random() * 1_000_000) + 1;
    _engine = new SpiderEngine(num, _difficulty);
    set({
      ...snapshotEngine(_engine),
      dragState: null,
      selection: null,
      timerStarted: false,
      timerSeconds: 0,
    });
  },

  dealFromStock: () => {
    const state = _engine.getState();
    if (state.stock.length === 0) return;
    // Check for empty cascades (Spider rule: can't deal if any cascade is empty)
    const hasEmpty = state.cascades.some(c => c.length === 0);
    if (hasEmpty) return; // Can't deal with empty columns
    try {
      _engine.executeMove({ type: 'stock' }, { type: 'cascade', index: 0 });
      set({ ...snapshotEngine(_engine), timerStarted: true });
    } catch {
      // Can't deal
    }
  },

  tryMove: (from: SpiderLocation, to: SpiderLocation) => {
    if (!_engine.isLegalMove(from, to)) return false;
    _engine.executeMove(from, to);
    set({ ...snapshotEngine(_engine), timerStarted: true });
    return true;
  },

  undo: () => {
    // Spider engine doesn't have undo yet - just snapshot
    // TODO: Add undo support
  },

  tickTimer: () => {
    set((s) => ({ timerSeconds: s.timerSeconds + 1 }));
  },

  selectCards: (cardIds: string[], source: SpiderLocation) => {
    set({ selection: { cardIds, sourceLocation: source } });
  },

  clearSelection: () => {
    set({ selection: null });
  },

  startDrag: (cardIds: string[], source: SpiderLocation) => {
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

export const useDomSpiderStore = domSpiderStore;
