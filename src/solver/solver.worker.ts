/**
 * Web Worker for FreeCell solver.
 * Runs the A* solver off the main thread to keep the UI responsive.
 */

import { solve } from './FreeCellSolver';

export interface SolverWorkerRequest {
  type: 'solve';
  gameNumber: number;
}

export interface SolverWorkerResponse {
  type: 'result' | 'progress' | 'error';
  solved?: boolean;
  moves?: import('./FreeCellSolver').SolverMove[];
  totalMoveCount?: number;
  statesExplored?: number;
  message?: string;
}

self.onmessage = (e: MessageEvent<SolverWorkerRequest>) => {
  const { type, gameNumber } = e.data;

  if (type !== 'solve') return;

  try {
    const result = solve(gameNumber, 300000, (explored) => {
      self.postMessage({
        type: 'progress',
        statesExplored: explored,
      } satisfies SolverWorkerResponse);
    });

    self.postMessage({
      type: 'result',
      solved: result.solved,
      moves: result.moves,
      totalMoveCount: result.totalMoveCount,
      statesExplored: result.statesExplored,
    } satisfies SolverWorkerResponse);
  } catch (err) {
    self.postMessage({
      type: 'error',
      message: err instanceof Error ? err.message : 'Solver failed',
    } satisfies SolverWorkerResponse);
  }
};
