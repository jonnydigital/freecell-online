'use client';

import { useEffect, useRef, useState } from 'react';
import { gameBridge } from '../game/GameBridge';

export default function GameShell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const mountedRef = useRef(false); // StrictMode guard
  const [gameNumber, setGameNumber] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    // StrictMode double-mount guard
    if (mountedRef.current) return;
    mountedRef.current = true;

    const initPhaser = async () => {
      if (!containerRef.current || gameRef.current) return;

      const Phaser = await import('phaser');
      const { createPhaserConfig } = await import('../game/PhaserConfig');

      const config = createPhaserConfig(containerRef.current);
      gameRef.current = new Phaser.Game(config);
    };

    initPhaser();

    // Listen for bridge events
    const unsubReady = gameBridge.on('gameReady', (data: unknown) => {
      const d = data as { gameNumber: number };
      setGameNumber(d.gameNumber);
      setMoveCount(0);
      setIsWon(false);
    });

    const unsubMove = gameBridge.on('moveExecuted', (data: unknown) => {
      const d = data as { moveCount: number };
      setMoveCount(d.moveCount);
    });

    const unsubWin = gameBridge.on('gameWon', () => {
      setIsWon(true);
    });

    return () => {
      unsubReady();
      unsubMove();
      unsubWin();
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      mountedRef.current = false;
    };
  }, []);

  const handleNewGame = () => gameBridge.emit('newGame');
  const handleUndo = () => gameBridge.emit('undo');
  const handleRedo = () => gameBridge.emit('redo');

  return (
    <div className="flex flex-col h-screen bg-[#0a3d0a]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#072907] border-b border-[#1a5c1a]/30">
        <div className="flex items-center gap-3">
          <button
            onClick={handleNewGame}
            className="px-3 py-1.5 text-sm bg-[#1a5c1a] hover:bg-[#2a7c2a] text-white rounded transition-colors"
          >
            New Game
          </button>
          <button
            onClick={handleUndo}
            className="px-3 py-1.5 text-sm bg-[#1a5c1a]/60 hover:bg-[#1a5c1a] text-white/80 rounded transition-colors"
          >
            ↩ Undo
          </button>
          <button
            onClick={handleRedo}
            className="px-3 py-1.5 text-sm bg-[#1a5c1a]/60 hover:bg-[#1a5c1a] text-white/80 rounded transition-colors"
          >
            ↪ Redo
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/70">
          {gameNumber && <span>Game #{gameNumber}</span>}
          <span>Moves: {moveCount}</span>
          {isWon && (
            <span className="text-yellow-400 font-bold animate-pulse">
              🎉 You Win!
            </span>
          )}
        </div>
      </div>

      {/* Game Canvas Container */}
      <div ref={containerRef} id="game-container" className="flex-1" />
    </div>
  );
}
