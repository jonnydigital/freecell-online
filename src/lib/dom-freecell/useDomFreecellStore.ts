/**
 * Zustand store wrapping FreeCellEngine for DOM-based FreeCell prototype.
 *
 * Key design choice: drag position (currentX/currentY) lives in a plain
 * mutable ref outside the store so that 60fps pointer-move updates never
 * trigger React re-renders.
 */

import { create } from 'zustand';
import { FreeCellEngine, GameState, GameVariant, Location, Move } from '@/engine/FreeCellEngine';
import { Card, Suit } from '@/engine/Card';
import type { SolverMove } from '@/solver/FreeCellSolver';

// ---------------------------------------------------------------------------
// Drag state – only source + card ids live in Zustand (change = 1 render).
// Hot coordinates live in a plain object accessed via getDragPosition().
// ---------------------------------------------------------------------------

export interface DragState {
  cardIds: string[];
  sourceLocation: Location;
}

interface DragPosition {
  currentX: number;
  currentY: number;
}

// Mutable ref – never triggers React renders
const _dragPos: DragPosition = { currentX: 0, currentY: 0 };

// ---------------------------------------------------------------------------
// Redo group: a manual move + its trailing auto-moves
// ---------------------------------------------------------------------------

interface UndoGroup {
  manualMove: Move;
  autoMoves: Move[];
}

// ---------------------------------------------------------------------------
// Store shape
// ---------------------------------------------------------------------------

export interface DomFreecellState {
  // Game state (mirrors engine)
  cascades: Card[][];
  freeCells: (Card | null)[];
  foundations: Map<Suit, Card[]>;
  gameNumber: number;
  moveCount: number;
  isWon: boolean;

  // Timer
  timerStarted: boolean;
  timerSeconds: number;

  // Deadlock
  noMovesAvailable: boolean;

  // Interaction
  dragState: DragState | null;
  selection: { cardIds: string[]; sourceLocation: Location } | null;

  // Move history for undo
  moveHistory: Move[];

  // Redo stack
  redoStack: UndoGroup[];

  // Actions
  newGame: (gameNumber?: number) => void;
  restart: () => void;
  tryMove: (from: Location, to: Location) => boolean;
  autoPlace: (cardId: string) => boolean;
  undo: () => void;
  redo: () => void;
  tickTimer: () => void;
  selectCards: (cardIds: string[], source: Location) => void;
  clearSelection: () => void;
  startDrag: (cardIds: string[], source: Location) => void;
  updateDragPosition: (x: number, y: number) => void;
  endDrag: () => void;
  getDragPosition: () => DragPosition;

  // Variant
  variant: GameVariant;
  setVariant: (variant: GameVariant) => void;

  // Expose engine for advanced queries (e.g. getValidRun, hasLegalMoves)
  getEngine: () => FreeCellEngine;

  // Replay / Ghost Mode
  replayMode: boolean;
  replayMoves: SolverMove[];
  replayIndex: number;
  preReplayGameNumber: number | null;
  startReplay: (moves: SolverMove[]) => void;
  replayNext: () => boolean;
  replayPrev: () => void;
  stopReplay: () => void;
}

// ---------------------------------------------------------------------------
// Engine instance – kept outside store to avoid serialisation issues
// ---------------------------------------------------------------------------

let _variant: GameVariant = 'freecell';
let _engine: FreeCellEngine = new FreeCellEngine(1, _variant);

function snapshotEngine(engine: FreeCellEngine): Pick<
  DomFreecellState,
  'cascades' | 'freeCells' | 'foundations' | 'gameNumber' | 'moveCount' | 'isWon'
> {
  const s = engine.getState();
  return {
    cascades: s.cascades,
    freeCells: s.freeCells,
    foundations: s.foundations,
    gameNumber: s.gameNumber,
    moveCount: s.moveCount,
    isWon: s.isWon,
  };
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const domFreecellStore = create<DomFreecellState>()((set, get) => ({
  // Initial snapshot
  ...snapshotEngine(_engine),

  timerStarted: false,
  timerSeconds: 0,
  noMovesAvailable: false,

  dragState: null,
  selection: null,
  moveHistory: [],
  redoStack: [],

  variant: _variant,

  // ------- Actions -------

  setVariant: (variant: GameVariant) => {
    _variant = variant;
    const num = Math.floor(Math.random() * 1_000_000) + 1;
    _engine = new FreeCellEngine(num, _variant);
    set({
      ...snapshotEngine(_engine),
      variant: _variant,
      dragState: null,
      selection: null,
      moveHistory: [],
      redoStack: [],
      timerStarted: false,
      timerSeconds: 0,
      noMovesAvailable: false,
    });
  },

  newGame: (gameNumber?: number) => {
    const num = gameNumber ?? Math.floor(Math.random() * 1_000_000) + 1;
    _engine = new FreeCellEngine(num, _variant);
    set({
      ...snapshotEngine(_engine),
      dragState: null,
      selection: null,
      moveHistory: [],
      redoStack: [],
      timerStarted: false,
      timerSeconds: 0,
      noMovesAvailable: false,
    });
  },

  restart: () => {
    const num = get().gameNumber;
    _engine = new FreeCellEngine(num, _variant);
    set({
      ...snapshotEngine(_engine),
      dragState: null,
      selection: null,
      moveHistory: [],
      redoStack: [],
      timerStarted: false,
      timerSeconds: 0,
      noMovesAvailable: false,
    });
  },

  tryMove: (from: Location, to: Location): boolean => {
    if (!_engine.isLegalMove(from, to)) return false;

    const move = _engine.executeMove(from, to);
    const autoMoves = _engine.autoMoveToFoundations();

    // Record all moves for undo (manual move + auto-moves)
    const history = get().moveHistory;
    const snapshot = snapshotEngine(_engine);

    // Deadlock detection: check if any legal moves remain (only if not won)
    const noMoves = !snapshot.isWon && !_engine.hasLegalMoves();

    set({
      ...snapshot,
      moveHistory: [...history, move, ...autoMoves],
      redoStack: [], // Clear redo on new manual move
      timerStarted: true,
      noMovesAvailable: noMoves,
    });

    return true;
  },

  autoPlace: (cardId: string): boolean => {
    const state = _engine.getState();

    // Find where this card lives
    let from: Location | null = null;

    // Check free cells
    for (let i = 0; i < state.freeCells.length; i++) {
      if (state.freeCells[i]?.id === cardId) {
        from = { type: 'freecell', index: i };
        break;
      }
    }

    // Check cascades (only top card or valid run start)
    if (!from) {
      for (let col = 0; col < state.cascades.length; col++) {
        const cascade = state.cascades[col];
        const idx = cascade.findIndex((c) => c.id === cardId);
        if (idx === -1) continue;

        // Must be part of a valid run from bottom
        const run = _engine.getValidRun(col);
        const runStart = cascade.length - run.length;
        if (idx < runStart) return false; // Buried card, can't move

        from = { type: 'cascade', index: col, cardIndex: idx };
        break;
      }
    }

    if (!from) return false;

    // Priority 1: Foundation
    const card = _engine.getCardAt(from);
    if (card) {
      const foundationDest: Location = { type: 'foundation', suit: card.suit };
      if (_engine.isLegalMove(from, foundationDest)) {
        return get().tryMove(from, foundationDest);
      }
    }

    // Priority 2: Non-empty cascade (pick best — prefer same-suit sequences)
    if (card) {
      let bestCascade: Location | null = null;
      let bestScore = -Infinity;
      for (let j = 0; j < 8; j++) {
        if (from.type === 'cascade' && from.index === j) continue;
        if (state.cascades[j].length === 0) continue;
        const dest: Location = { type: 'cascade', index: j };
        if (!_engine.isLegalMove(from, dest)) continue;
        // Score this cascade: same suit > different suit, longer runs > shorter
        const topCard = state.cascades[j][state.cascades[j].length - 1];
        let score = 0;
        if (topCard.suit === card.suit) score += 10; // Same suit — builds toward foundation
        if (topCard.rank === card.rank + 1) score += 5; // Direct stack (always true for legal move)
        // Prefer cascades with longer existing runs (more organized)
        score += Math.min(state.cascades[j].length, 5);
        if (score > bestScore) {
          bestScore = score;
          bestCascade = dest;
        }
      }
      if (bestCascade) {
        return get().tryMove(from, bestCascade);
      }
    }

    // Priority 3: Empty free cell
    for (let j = 0; j < state.freeCells.length; j++) {
      if (state.freeCells[j] === null) {
        const dest: Location = { type: 'freecell', index: j };
        if (_engine.isLegalMove(from, dest)) {
          return get().tryMove(from, dest);
        }
      }
    }

    // Priority 4: Empty cascade (lowest priority)
    for (let j = 0; j < 8; j++) {
      if (from.type === 'cascade' && from.index === j) continue;
      if (state.cascades[j].length > 0) continue;
      const dest: Location = { type: 'cascade', index: j };
      if (_engine.isLegalMove(from, dest)) {
        return get().tryMove(from, dest);
      }
    }

    return false;
  },

  undo: () => {
    const history = get().moveHistory;
    if (history.length === 0) return;

    // Undo auto-moves first (they sit after the manual move), then the manual move.
    // Walk backwards until we hit the first non-auto move, undoing everything.
    // Collect the undone moves into an UndoGroup for the redo stack.
    const newHistory = [...history];
    const undoneAutoMoves: Move[] = [];

    // Undo trailing auto-moves
    while (newHistory.length > 0 && newHistory[newHistory.length - 1].isAutoMove) {
      const m = newHistory.pop()!;
      _engine.undoMove(m);
      undoneAutoMoves.unshift(m); // preserve order
    }
    // Undo the manual move
    let undoneManual: Move | null = null;
    if (newHistory.length > 0) {
      undoneManual = newHistory.pop()!;
      _engine.undoMove(undoneManual);
    }

    const redoStack = get().redoStack;
    const newRedoStack = undoneManual
      ? [...redoStack, { manualMove: undoneManual, autoMoves: undoneAutoMoves }]
      : redoStack;

    set({
      ...snapshotEngine(_engine),
      moveHistory: newHistory,
      redoStack: newRedoStack,
      noMovesAvailable: false, // undoing always opens up moves
    });
  },

  redo: () => {
    const redoStack = get().redoStack;
    if (redoStack.length === 0) return;

    const newRedoStack = [...redoStack];
    const group = newRedoStack.pop()!;

    // Re-execute the manual move
    const move = _engine.executeMove(group.manualMove.from, group.manualMove.to);

    // Re-execute auto-moves
    const autoMoves = _engine.autoMoveToFoundations();

    const history = get().moveHistory;
    const snapshot = snapshotEngine(_engine);
    const noMoves = !snapshot.isWon && !_engine.hasLegalMoves();

    set({
      ...snapshot,
      moveHistory: [...history, move, ...autoMoves],
      redoStack: newRedoStack,
      timerStarted: true,
      noMovesAvailable: noMoves,
    });
  },

  tickTimer: () => {
    const { timerStarted, isWon } = get();
    if (timerStarted && !isWon) {
      set({ timerSeconds: get().timerSeconds + 1 });
    }
  },

  selectCards: (cardIds: string[], source: Location) => {
    set({ selection: { cardIds, sourceLocation: source } });
  },

  clearSelection: () => {
    set({ selection: null });
  },

  startDrag: (cardIds: string[], source: Location) => {
    _dragPos.currentX = 0;
    _dragPos.currentY = 0;
    set({ dragState: { cardIds, sourceLocation: source }, selection: null });
  },

  // CRITICAL: writes to plain ref, does NOT call set()
  updateDragPosition: (x: number, y: number) => {
    _dragPos.currentX = x;
    _dragPos.currentY = y;
  },

  endDrag: () => {
    set({ dragState: null });
  },

  // Non-reactive getter – read from the mutable ref
  getDragPosition: () => ({ currentX: _dragPos.currentX, currentY: _dragPos.currentY }),

  getEngine: () => _engine,

  // ── Replay / Ghost Mode ──

  replayMode: false,
  replayMoves: [],
  replayIndex: 0,
  preReplayGameNumber: null,

  startReplay: (moves: SolverMove[]) => {
    const gameNum = get().gameNumber;
    // Reset the engine to the initial deal
    _engine = new FreeCellEngine(gameNum, _variant);
    set({
      ...snapshotEngine(_engine),
      replayMode: true,
      replayMoves: moves,
      replayIndex: 0,
      preReplayGameNumber: gameNum,
      dragState: null,
      moveHistory: [],
      redoStack: [],
      timerStarted: false,
      timerSeconds: 0,
      noMovesAvailable: false,
    });
  },

  replayNext: (): boolean => {
    const { replayMoves, replayIndex, replayMode } = get();
    if (!replayMode || replayIndex >= replayMoves.length) return false;

    const solverMove = replayMoves[replayIndex];
    const engineState = _engine.getState();

    // Convert SolverMove to engine Locations
    const SUIT_ORDER = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];

    let from: Location;
    if (solverMove.fromType === 'cascade') {
      const cascade = engineState.cascades[solverMove.fromIndex];
      from = {
        type: 'cascade',
        index: solverMove.fromIndex,
        cardIndex: solverMove.cardCount > 1 ? cascade.length - solverMove.cardCount : undefined,
      };
    } else {
      from = { type: 'freecell', index: solverMove.fromIndex };
    }

    let to: Location;
    if (solverMove.toType === 'foundation') {
      to = { type: 'foundation', suit: SUIT_ORDER[solverMove.toIndex] };
    } else if (solverMove.toType === 'freecell') {
      to = { type: 'freecell', index: solverMove.toIndex };
    } else {
      to = { type: 'cascade', index: solverMove.toIndex };
    }

    // Execute the move on the engine
    if (!_engine.isLegalMove(from, to)) return false;
    const move = _engine.executeMove(from, to);
    const autoMoves = _engine.autoMoveToFoundations();

    set({
      ...snapshotEngine(_engine),
      replayIndex: replayIndex + 1,
      moveHistory: [...get().moveHistory, move, ...autoMoves],
    });
    return true;
  },

  replayPrev: () => {
    const { replayMoves, replayIndex, replayMode, preReplayGameNumber } = get();
    if (!replayMode || replayIndex <= 0 || preReplayGameNumber === null) return;

    // Rebuild from scratch up to replayIndex - 1
    const targetIndex = replayIndex - 1;
    _engine = new FreeCellEngine(preReplayGameNumber, _variant);

    const SUIT_ORDER = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
    const allMoves: Move[] = [];

    for (let i = 0; i < targetIndex; i++) {
      const sm = replayMoves[i];
      const es = _engine.getState();

      let from: Location;
      if (sm.fromType === 'cascade') {
        const cascade = es.cascades[sm.fromIndex];
        from = {
          type: 'cascade',
          index: sm.fromIndex,
          cardIndex: sm.cardCount > 1 ? cascade.length - sm.cardCount : undefined,
        };
      } else {
        from = { type: 'freecell', index: sm.fromIndex };
      }

      let to: Location;
      if (sm.toType === 'foundation') {
        to = { type: 'foundation', suit: SUIT_ORDER[sm.toIndex] };
      } else if (sm.toType === 'freecell') {
        to = { type: 'freecell', index: sm.toIndex };
      } else {
        to = { type: 'cascade', index: sm.toIndex };
      }

      const move = _engine.executeMove(from, to);
      const autoMoves = _engine.autoMoveToFoundations();
      allMoves.push(move, ...autoMoves);
    }

    set({
      ...snapshotEngine(_engine),
      replayIndex: targetIndex,
      moveHistory: allMoves,
    });
  },

  stopReplay: () => {
    // Restore the game to the current game number (fresh deal)
    const gameNum = get().gameNumber;
    _engine = new FreeCellEngine(gameNum, _variant);
    set({
      ...snapshotEngine(_engine),
      replayMode: false,
      replayMoves: [],
      replayIndex: 0,
      preReplayGameNumber: null,
      dragState: null,
      moveHistory: [],
      redoStack: [],
      timerStarted: false,
      timerSeconds: 0,
      noMovesAvailable: false,
    });
  },
}));

// React hook (default import style)
export const useDomFreecellStore = domFreecellStore;
