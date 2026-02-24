/**
 * Undo/Redo system for FreeCell
 * Each entry can contain multiple moves (for sequence moves and auto-moves)
 */

import { Move } from './FreeCellEngine';

export interface MoveEntry {
  playerMove: Move;
  autoMoves: Move[]; // Auto-moves that happened after the player move
}

export class MoveHistory {
  private undoStack: MoveEntry[] = [];
  private redoStack: MoveEntry[] = [];

  /**
   * Record a player move and any resulting auto-moves
   */
  push(playerMove: Move, autoMoves: Move[] = []): void {
    this.undoStack.push({ playerMove, autoMoves });
    this.redoStack = []; // Clear redo on new move
  }

  /**
   * Pop the last move entry for undoing
   * Returns null if nothing to undo
   */
  popUndo(): MoveEntry | null {
    const entry = this.undoStack.pop();
    if (!entry) return null;
    this.redoStack.push(entry);
    return entry;
  }

  /**
   * Pop from redo stack
   * Returns null if nothing to redo
   */
  popRedo(): MoveEntry | null {
    const entry = this.redoStack.pop();
    if (!entry) return null;
    this.undoStack.push(entry);
    return entry;
  }

  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  get moveCount(): number {
    return this.undoStack.length;
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }
}
