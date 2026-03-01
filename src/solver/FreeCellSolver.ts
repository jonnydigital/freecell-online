/**
 * FreeCell Solver
 *
 * Uses A* search with heuristic scoring to find solutions.
 * Designed to run in a Web Worker to avoid blocking the UI.
 */

import { Card, Suit, Rank, Color } from '../engine/Card';
import { dealGame } from '../engine/Deck';

// ── Compact State Representation ──────────────────────────────

/** Card encoded as a single number: suit * 13 + (rank - 1) */
type CardId = number;

const EMPTY = -1;

function encodeCard(card: Card): CardId {
  const suitIdx = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades].indexOf(card.suit);
  return suitIdx * 13 + (card.rank - 1);
}

function decodeCard(id: CardId): { suit: Suit; rank: Rank; color: Color } {
  const suitIdx = Math.floor(id / 13);
  const rank = (id % 13) + 1 as Rank;
  const suit = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades][suitIdx];
  const color = (suit === Suit.Hearts || suit === Suit.Diamonds) ? Color.Red : Color.Black;
  return { suit, rank, color };
}

function cardColor(id: CardId): Color {
  const suitIdx = Math.floor(id / 13);
  return suitIdx === 1 || suitIdx === 2 ? Color.Red : Color.Black;
}

function cardRank(id: CardId): number {
  return (id % 13) + 1;
}

function cardSuitIdx(id: CardId): number {
  return Math.floor(id / 13);
}

/** Compact game state for efficient cloning and hashing */
interface SolverState {
  cascades: CardId[][];      // 8 columns
  freeCells: CardId[];       // 4 free cells (EMPTY = -1)
  foundations: number[];     // 4 foundation top ranks (0 = empty), indexed by suit
  moveCount: number;
}

export interface SolverMove {
  fromType: 'cascade' | 'freecell';
  fromIndex: number;
  toType: 'cascade' | 'freecell' | 'foundation';
  toIndex: number;
  cardCount: number;         // number of cards moved (1 for single, N for sequence)
}

export interface SolverResult {
  solved: boolean;
  moves: SolverMove[];
  totalMoveCount: number;    // includes auto-moves
  statesExplored: number;
}

// ── State Operations ──────────────────────────────────────────

function cloneState(s: SolverState): SolverState {
  return {
    cascades: s.cascades.map(c => [...c]),
    freeCells: [...s.freeCells],
    foundations: [...s.foundations],
    moveCount: s.moveCount,
  };
}

function hashState(s: SolverState): string {
  // Cascades keep their identity (column order matters)
  const parts: string[] = [];
  for (let i = 0; i < 8; i++) {
    parts.push(s.cascades[i].join(','));
  }
  // Free cells are interchangeable — sort for canonical form
  const fc = [...s.freeCells].sort((a, b) => a - b);
  parts.push(fc.join(','));
  // Foundations
  parts.push(s.foundations.join(','));
  return parts.join('|');
}

function createInitialState(gameNumber: number): SolverState {
  const cascades = dealGame(gameNumber);
  return {
    cascades: cascades.map(col => col.map(c => encodeCard(c))),
    freeCells: [EMPTY, EMPTY, EMPTY, EMPTY],
    foundations: [0, 0, 0, 0], // C, D, H, S
    moveCount: 0,
  };
}

function isWon(s: SolverState): boolean {
  return s.foundations.every(r => r === 13);
}

function canStackOnCascade(cardId: CardId, targetId: CardId): boolean {
  return cardColor(cardId) !== cardColor(targetId) && cardRank(cardId) === cardRank(targetId) - 1;
}

function emptyFreeCells(s: SolverState): number {
  return s.freeCells.filter(c => c === EMPTY).length;
}

function emptyCascades(s: SolverState): number {
  return s.cascades.filter(c => c.length === 0).length;
}

function maxMovable(s: SolverState, toEmptyCascade: boolean): number {
  const fc = emptyFreeCells(s);
  const ec = emptyCascades(s) - (toEmptyCascade ? 1 : 0);
  return (1 + fc) * Math.pow(2, Math.max(0, ec));
}

/** Is it safe to auto-move this card to the foundation? */
function isSafeAutoMove(cardId: CardId, foundations: number[]): boolean {
  const rank = cardRank(cardId);
  if (rank <= 2) return true;

  const neededRank = rank - 1;
  const color = cardColor(cardId);
  // Check opposite color suits
  const oppositeSuits = color === Color.Red ? [0, 3] : [1, 2]; // C,S vs D,H
  return oppositeSuits.every(si => foundations[si] >= neededRank);
}

/** Perform all safe auto-moves. Mutates state. Returns number of moves made. */
function autoMoveToFoundations(s: SolverState): number {
  let totalMoved = 0;
  let moved = true;

  while (moved) {
    moved = false;

    // Check cascade tops
    for (let i = 0; i < 8; i++) {
      const cascade = s.cascades[i];
      if (cascade.length === 0) continue;
      const card = cascade[cascade.length - 1];
      const si = cardSuitIdx(card);
      if (s.foundations[si] === cardRank(card) - 1 && isSafeAutoMove(card, s.foundations)) {
        cascade.pop();
        s.foundations[si]++;
        s.moveCount++;
        totalMoved++;
        moved = true;
        break;
      }
    }
    if (moved) continue;

    // Check free cells
    for (let i = 0; i < 4; i++) {
      if (s.freeCells[i] === EMPTY) continue;
      const card = s.freeCells[i];
      const si = cardSuitIdx(card);
      if (s.foundations[si] === cardRank(card) - 1 && isSafeAutoMove(card, s.foundations)) {
        s.freeCells[i] = EMPTY;
        s.foundations[si]++;
        s.moveCount++;
        totalMoved++;
        moved = true;
        break;
      }
    }
  }

  return totalMoved;
}

// ── Move Generation ───────────────────────────────────────────

function generateMoves(s: SolverState): SolverMove[] {
  const moves: SolverMove[] = [];

  // From cascades
  for (let i = 0; i < 8; i++) {
    const cascade = s.cascades[i];
    if (cascade.length === 0) continue;

    const topCard = cascade[cascade.length - 1];
    const topSi = cardSuitIdx(topCard);

    // To foundation
    if (s.foundations[topSi] === cardRank(topCard) - 1) {
      moves.push({ fromType: 'cascade', fromIndex: i, toType: 'foundation', toIndex: topSi, cardCount: 1 });
    }

    // To free cell
    if (s.freeCells.some(c => c === EMPTY)) {
      const freeIdx = s.freeCells.indexOf(EMPTY);
      moves.push({ fromType: 'cascade', fromIndex: i, toType: 'freecell', toIndex: freeIdx, cardCount: 1 });
    }

    // Single card or sequence to other cascades
    // Find valid run from bottom of cascade
    let runLen = 1;
    for (let j = cascade.length - 2; j >= 0; j--) {
      if (canStackOnCascade(cascade[j + 1], cascade[j])) {
        runLen++;
      } else {
        break;
      }
    }

    for (let size = 1; size <= runLen; size++) {
      const movingCard = cascade[cascade.length - size]; // top of the sequence being moved

      for (let j = 0; j < 8; j++) {
        if (i === j) continue;
        const target = s.cascades[j];
        const toEmpty = target.length === 0;

        if (size > maxMovable(s, toEmpty)) continue;

        if (toEmpty) {
          // Only move to empty cascade if it's a king or we're moving a sequence
          // (pruning: don't move single non-King to empty column pointlessly)
          if (size === 1 && cardRank(movingCard) !== 13 && cascade.length > 1) continue;
          moves.push({ fromType: 'cascade', fromIndex: i, toType: 'cascade', toIndex: j, cardCount: size });
          break; // only need one empty cascade target
        } else {
          const targetTop = target[target.length - 1];
          if (canStackOnCascade(movingCard, targetTop)) {
            moves.push({ fromType: 'cascade', fromIndex: i, toType: 'cascade', toIndex: j, cardCount: size });
          }
        }
      }
    }
  }

  // From free cells
  for (let i = 0; i < 4; i++) {
    if (s.freeCells[i] === EMPTY) continue;
    const card = s.freeCells[i];
    const si = cardSuitIdx(card);

    // To foundation
    if (s.foundations[si] === cardRank(card) - 1) {
      moves.push({ fromType: 'freecell', fromIndex: i, toType: 'foundation', toIndex: si, cardCount: 1 });
    }

    // To cascades
    for (let j = 0; j < 8; j++) {
      const target = s.cascades[j];
      if (target.length === 0) {
        moves.push({ fromType: 'freecell', fromIndex: i, toType: 'cascade', toIndex: j, cardCount: 1 });
        break; // one empty cascade is enough
      } else {
        const targetTop = target[target.length - 1];
        if (canStackOnCascade(card, targetTop)) {
          moves.push({ fromType: 'freecell', fromIndex: i, toType: 'cascade', toIndex: j, cardCount: 1 });
        }
      }
    }
  }

  return moves;
}

function applyMove(s: SolverState, move: SolverMove): void {
  let cards: CardId[];

  // Remove from source
  if (move.fromType === 'cascade') {
    const cascade = s.cascades[move.fromIndex];
    cards = cascade.splice(cascade.length - move.cardCount);
  } else {
    cards = [s.freeCells[move.fromIndex]];
    s.freeCells[move.fromIndex] = EMPTY;
  }

  // Place at destination
  if (move.toType === 'cascade') {
    s.cascades[move.toIndex].push(...cards);
  } else if (move.toType === 'freecell') {
    s.freeCells[move.toIndex] = cards[0];
  } else {
    // foundation — just increment the rank
    s.foundations[move.toIndex]++;
  }

  s.moveCount++;
}

// ── Heuristic Scoring ─────────────────────────────────────────

function heuristic(s: SolverState): number {
  // Lower is better (distance to goal)
  let h = 0;

  // Cards remaining (not on foundation)
  const cardsOnFoundation = s.foundations.reduce((a, b) => a + b, 0);
  h += (52 - cardsOnFoundation) * 2;

  // Penalize used free cells
  h += (4 - emptyFreeCells(s)) * 3;

  // Penalize blocked cards (cards buried under other cards that need to go to foundation sooner)
  for (let i = 0; i < 8; i++) {
    const cascade = s.cascades[i];
    for (let j = 0; j < cascade.length - 1; j++) {
      const card = cascade[j];
      const si = cardSuitIdx(card);
      if (cardRank(card) === s.foundations[si] + 1) {
        // This card should go to foundation next but is buried
        h += (cascade.length - 1 - j) * 2;
      }
    }
  }

  // Bonus for ordered sequences at bottom of cascades
  for (let i = 0; i < 8; i++) {
    const cascade = s.cascades[i];
    for (let j = cascade.length - 1; j > 0; j--) {
      if (canStackOnCascade(cascade[j], cascade[j - 1])) {
        h -= 1;
      } else {
        break;
      }
    }
  }

  return h;
}

function scoreMoveForOrdering(s: SolverState, move: SolverMove): number {
  let score = 0;

  // Foundation moves are best
  if (move.toType === 'foundation') {
    score += 1000;
  }

  // Moving from free cell to cascade (frees up cell)
  if (move.fromType === 'freecell' && move.toType === 'cascade') {
    score += 100;
  }

  // Moving a sequence is generally good
  if (move.cardCount > 1) {
    score += 50;
  }

  // Emptying a cascade column
  if (move.fromType === 'cascade') {
    const cascade = s.cascades[move.fromIndex];
    if (cascade.length === move.cardCount) {
      score += 80;
    }

    // Uncovering a card that can go to foundation
    if (cascade.length > move.cardCount) {
      const uncovered = cascade[cascade.length - move.cardCount - 1];
      const si = cardSuitIdx(uncovered);
      if (cardRank(uncovered) === s.foundations[si] + 1) {
        score += 200;
      }
    }
  }

  // Penalize moving to free cell
  if (move.toType === 'freecell') {
    score -= 50;
  }

  return score;
}

// ── A* Search ─────────────────────────────────────────────────

interface SearchNode {
  state: SolverState;
  moves: SolverMove[];
  g: number; // moves so far
  f: number; // g + heuristic
}

/** Simple binary heap priority queue (min-heap by f) */
class PriorityQueue {
  private heap: SearchNode[] = [];

  get size(): number { return this.heap.length; }

  push(node: SearchNode): void {
    this.heap.push(node);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): SearchNode | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    return top;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[i].f < this.heap[parent].f) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else break;
    }
  }

  private sinkDown(i: number): void {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.heap[left].f < this.heap[smallest].f) smallest = left;
      if (right < n && this.heap[right].f < this.heap[smallest].f) smallest = right;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}

export function solve(
  gameNumber: number,
  maxStates: number = 300000,
  onProgress?: (explored: number) => void,
): SolverResult {
  const initial = createInitialState(gameNumber);
  autoMoveToFoundations(initial);

  if (isWon(initial)) {
    return { solved: true, moves: [], totalMoveCount: initial.moveCount, statesExplored: 1 };
  }

  const visited = new Set<string>();
  visited.add(hashState(initial));

  const pq = new PriorityQueue();
  const h = heuristic(initial);
  pq.push({ state: initial, moves: [], g: 0, f: h });

  let explored = 0;
  let lastProgress = 0;

  while (pq.size > 0) {
    const node = pq.pop()!;
    explored++;

    if (explored > maxStates) break;

    // Progress callback every 10k states
    if (onProgress && explored - lastProgress >= 10000) {
      lastProgress = explored;
      onProgress(explored);
    }

    const legalMoves = generateMoves(node.state);

    // Sort moves by heuristic score for better search order
    const scoredMoves = legalMoves.map(m => ({
      move: m,
      score: scoreMoveForOrdering(node.state, m),
    }));
    scoredMoves.sort((a, b) => b.score - a.score);

    for (const { move } of scoredMoves) {
      const newState = cloneState(node.state);
      applyMove(newState, move);
      autoMoveToFoundations(newState);

      if (isWon(newState)) {
        return {
          solved: true,
          moves: [...node.moves, move],
          totalMoveCount: newState.moveCount,
          statesExplored: explored,
        };
      }

      const stateHash = hashState(newState);
      if (visited.has(stateHash)) continue;
      visited.add(stateHash);

      const g = node.g + 1;
      const f = g + heuristic(newState);
      pq.push({ state: newState, moves: [...node.moves, move], g, f });
    }
  }

  return { solved: false, moves: [], totalMoveCount: 0, statesExplored: explored };
}

// ── Move Description Helpers ──────────────────────────────────

const SUIT_NAMES: Record<number, string> = { 0: 'C', 1: 'D', 2: 'H', 3: 'S' };
const RANK_DISPLAY: Record<number, string> = {
  1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7',
  8: '8', 9: '9', 10: '10', 11: 'J', 12: 'Q', 13: 'K',
};
const SUIT_SYMBOLS: Record<number, string> = { 0: '\u2663', 1: '\u2666', 2: '\u2665', 3: '\u2660' };

export function describeSolverMove(move: SolverMove, state: SolverState): string {
  let cardId: CardId;
  if (move.fromType === 'cascade') {
    const cascade = state.cascades[move.fromIndex];
    cardId = cascade[cascade.length - move.cardCount];
  } else {
    cardId = state.freeCells[move.fromIndex];
  }

  const rank = RANK_DISPLAY[cardRank(cardId)];
  const suit = SUIT_SYMBOLS[cardSuitIdx(cardId)];
  const cardStr = `${rank}${suit}`;

  const fromStr = move.fromType === 'cascade'
    ? `Column ${move.fromIndex + 1}`
    : `Free Cell`;

  let toStr: string;
  if (move.toType === 'foundation') {
    toStr = 'Foundation';
  } else if (move.toType === 'freecell') {
    toStr = 'Free Cell';
  } else {
    toStr = `Column ${move.toIndex + 1}`;
  }

  const countStr = move.cardCount > 1 ? ` (+${move.cardCount - 1})` : '';
  return `${cardStr}${countStr}: ${fromStr} → ${toStr}`;
}

/**
 * Convert a SolverMove to engine-compatible Location objects.
 * Used by the replay system to execute moves on the actual game engine.
 */
export function solverMoveToLocations(
  move: SolverMove,
  state: SolverState,
): { from: { type: string; index: number; cardIndex?: number }; to: { type: string; index: number; suit?: string } } {
  const SUIT_ENUM = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];

  let from: { type: string; index: number; cardIndex?: number };
  if (move.fromType === 'cascade') {
    const cascade = state.cascades[move.fromIndex];
    from = {
      type: 'cascade',
      index: move.fromIndex,
      cardIndex: move.cardCount > 1 ? cascade.length - move.cardCount : undefined,
    };
  } else {
    from = { type: 'freecell', index: move.fromIndex };
  }

  let to: { type: string; index: number; suit?: string };
  if (move.toType === 'foundation') {
    to = { type: 'foundation', index: move.toIndex, suit: SUIT_ENUM[move.toIndex] };
  } else if (move.toType === 'freecell') {
    to = { type: 'freecell', index: move.toIndex };
  } else {
    to = { type: 'cascade', index: move.toIndex };
  }

  return { from, to };
}

/**
 * Replay a solution and return human-readable descriptions for each move.
 * Used by the solution replay UI.
 */
export function describeSolution(gameNumber: number, moves: SolverMove[]): string[] {
  const state = createInitialState(gameNumber);
  autoMoveToFoundations(state);

  const descriptions: string[] = [];
  for (const move of moves) {
    descriptions.push(describeSolverMove(move, state));
    applyMove(state, move);
    autoMoveToFoundations(state);
  }
  return descriptions;
}
