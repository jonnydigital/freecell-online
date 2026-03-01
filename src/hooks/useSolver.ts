'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { SolverMove } from '@/solver/FreeCellSolver';
import type { SolverWorkerResponse } from '@/solver/solver.worker';

export type SolverStatus = 'idle' | 'solving' | 'solved' | 'failed';

export function useSolver() {
  const [status, setStatus] = useState<SolverStatus>('idle');
  const [moves, setMoves] = useState<SolverMove[]>([]);
  const [totalMoveCount, setTotalMoveCount] = useState(0);
  const workerRef = useRef<Worker | null>(null);

  const solve = useCallback((gameNumber: number) => {
    workerRef.current?.terminate();
    setStatus('solving');
    setMoves([]);
    setTotalMoveCount(0);

    const worker = new Worker(new URL('../solver/solver.worker.ts', import.meta.url));
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent<SolverWorkerResponse>) => {
      const { data } = e;
      if (data.type === 'result') {
        if (data.solved) {
          setStatus('solved');
          setMoves(data.moves ?? []);
          setTotalMoveCount(data.totalMoveCount ?? 0);
        } else {
          setStatus('failed');
        }
        worker.terminate();
      } else if (data.type === 'error') {
        setStatus('failed');
        worker.terminate();
      }
    };

    worker.onerror = () => {
      setStatus('failed');
      worker.terminate();
    };

    worker.postMessage({ type: 'solve', gameNumber });
  }, []);

  useEffect(() => {
    return () => { workerRef.current?.terminate(); };
  }, []);

  const reset = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    setStatus('idle');
    setMoves([]);
    setTotalMoveCount(0);
  }, []);

  return { status, moves, totalMoveCount, solve, reset };
}
