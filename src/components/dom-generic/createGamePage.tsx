'use client';

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import GenericSolitaireShell from './GenericSolitaireShell';
import GenericCascadeBoard from './GenericCascadeBoard';
import { Card, Suit } from '@/engine/Card';

interface GameAdapter {
  createEngine: (gameNumber: number) => any;
  getState: (engine: any) => {
    cascades: Card[][];
    foundations: Map<Suit, Card[]>;
    stock?: Card[];
    waste?: Card[];
    reserve?: Card[];
    freeCells?: (Card | null)[];
    gameNumber: number;
    moveCount: number;
    isWon: boolean;
  };
  getValidRun: (engine: any, cascadeIndex: number) => Card[];
  isLegalMove: (engine: any, from: any, to: any) => boolean;
  executeMove: (engine: any, from: any, to: any) => void;
  drawFromStock?: (engine: any) => void;
  autoPlace?: (engine: any, cardId: string) => boolean;
  getHint?: (engine: any) => any | null;
  undo?: (engine: any) => void;
}

interface GenericGameProps {
  gameName: string;
  gameIcon: string;
  gameHref: string;
  adapter: GameAdapter;
  extraToolbar?: React.ReactNode;
}

export default function GenericGamePage({ gameName, gameIcon, gameHref, adapter }: GenericGameProps) {
  const engineRef = useRef<any>(null);
  const [state, setState] = useState<ReturnType<GameAdapter['getState']> | null>(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [selection, setSelection] = useState<{ cardIds: string[]; source: any } | null>(null);

  const refresh = useCallback(() => {
    if (engineRef.current) {
      setState({ ...adapter.getState(engineRef.current) });
    }
  }, [adapter]);

  const newGame = useCallback((num?: number) => {
    const gameNum = num ?? Math.floor(Math.random() * 1_000_000) + 1;
    engineRef.current = adapter.createEngine(gameNum);
    setTimerStarted(false);
    setTimerSeconds(0);
    setSelection(null);
    refresh();
  }, [adapter, refresh]);

  useEffect(() => {
    newGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tryMove = useCallback((from: any, to: any) => {
    if (!engineRef.current) return false;
    try {
      if (!adapter.isLegalMove(engineRef.current, from, to)) return false;
      adapter.executeMove(engineRef.current, from, to);
      setTimerStarted(true);
      refresh();
      return true;
    } catch {
      return false;
    }
  }, [adapter, refresh]);

  const handleCardClick = useCallback((cardId: string, cardIds: string[], source: any) => {
    if (selection) {
      const moved = tryMove(selection.source, source);
      setSelection(null);
      if (moved) return;
    }
    setSelection({ cardIds, source });
  }, [selection, tryMove]);

  const handleDoubleClick = useCallback((cardId: string) => {
    if (!engineRef.current || !adapter.autoPlace) return;
    const placed = adapter.autoPlace(engineRef.current, cardId);
    if (placed) {
      setTimerStarted(true);
      refresh();
    }
  }, [adapter, refresh]);

  const handleEmptyPileClick = useCallback((target: any) => {
    if (!selection) return;
    const moved = tryMove(selection.source, target);
    setSelection(null);
  }, [selection, tryMove]);

  const handleStockClick = useCallback(() => {
    if (!engineRef.current || !adapter.drawFromStock) return;
    adapter.drawFromStock(engineRef.current);
    setTimerStarted(true);
    refresh();
  }, [adapter, refresh]);

  const handleBoardClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setSelection(null);
  }, []);

  const handleUndo = useCallback(() => {
    if (!engineRef.current || !adapter.undo) return;
    adapter.undo(engineRef.current);
    refresh();
  }, [adapter, refresh]);

  const handleHint = useCallback(() => {
    if (!engineRef.current || !adapter.getHint) return;
    const hint = adapter.getHint(engineRef.current);
    if (hint) {
      if (hint.from?.type === 'stock') {
        handleStockClick();
      } else {
        tryMove(hint.from, hint.to);
      }
    }
  }, [adapter, handleStockClick, tryMove]);

  const selectedCardIds = useMemo(() => {
    if (!selection) return new Set<string>();
    return new Set(selection.cardIds);
  }, [selection]);

  const validRuns = useMemo(() => {
    if (!engineRef.current || !state) return [];
    return state.cascades.map((_, i) => adapter.getValidRun(engineRef.current, i));
  }, [adapter, state]);

  if (!state) return <div className="flex items-center justify-center h-screen bg-[#0a3d0a]"><p className="text-white/60">Loading...</p></div>;

  return (
    <GenericSolitaireShell
      gameName={gameName}
      gameIcon={gameIcon}
      gameHref={gameHref}
      gameNumber={state.gameNumber}
      moveCount={state.moveCount}
      isWon={state.isWon}
      timerSeconds={timerSeconds}
      timerStarted={timerStarted}
      onNewGame={newGame}
      onUndo={adapter.undo ? handleUndo : undefined}
      onHint={adapter.getHint ? handleHint : undefined}
      onTickTimer={() => setTimerSeconds(s => s + 1)}
    >
      <GenericCascadeBoard
        cascades={state.cascades}
        foundations={state.foundations}
        stock={state.stock}
        waste={state.waste}
        reserve={state.reserve}
        freeCells={state.freeCells}
        validRuns={validRuns}
        selectedCardIds={selectedCardIds}
        onCardClick={handleCardClick}
        onDoubleClick={handleDoubleClick}
        onEmptyPileClick={handleEmptyPileClick}
        onStockClick={state.stock && state.stock.length > 0 ? handleStockClick : undefined}
        onBoardClick={handleBoardClick}
      />
    </GenericSolitaireShell>
  );
}
