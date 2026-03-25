'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import GenericSolitaireShell from '@/components/dom-generic/GenericSolitaireShell';
import DomCard from '@/components/dom-freecell/DomCard';
import '@/components/dom-freecell/dom-card-styles.css';
import { CalculationEngine, FOUNDATION_SEQUENCES } from '@/engine/CalculationEngine';
import { dealCalculationGame } from '@/engine/Deck';
import { Card, RANK_NAMES, Rank } from '@/engine/Card';
import { soundManager } from '@/lib/sounds';

export default function CalculationGamePage() {
  const engineRef = useRef<CalculationEngine | null>(null);
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []]);
  const [waste, setWaste] = useState<Card[][]>([[], [], [], []]);
  const [stockCount, setStockCount] = useState(0);
  const [drawnCard, setDrawnCard] = useState<Card | null>(null);
  const [gameNumber, setGameNumber] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showSequence, setShowSequence] = useState<number | null>(null);

  const refresh = useCallback(() => {
    if (!engineRef.current) return;
    const s = engineRef.current.getState();
    setFoundations(s.foundations.map(f => [...f]));
    setWaste(s.waste.map(w => [...w]));
    setStockCount(s.stock.length);
    setDrawnCard(s.drawnCard);
    setGameNumber(s.gameNumber);
    setMoveCount(s.moveCount);
    setIsWon(s.isWon);
  }, []);

  const newGame = useCallback((num?: number) => {
    const gameNum = num ?? Math.floor(Math.random() * 1_000_000) + 1;
    const { stock } = dealCalculationGame(gameNum);
    engineRef.current = new CalculationEngine(gameNum, stock);
    setTimerStarted(false);
    setTimerSeconds(0);
    setShowSequence(null);
    refresh();
  }, [refresh]);

  useEffect(() => {
    newGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrawFromStock = useCallback(() => {
    if (!engineRef.current) return;
    if (engineRef.current.getDrawnCard()) return; // already have a drawn card
    const card = engineRef.current.drawFromStock();
    if (card) {
      setTimerStarted(true);
      soundManager.cardPlace();
      refresh();
    }
  }, [refresh]);

  const handlePlaceOnFoundation = useCallback((fi: number) => {
    if (!engineRef.current) return;
    const engine = engineRef.current;

    // Try drawn card first
    if (engine.getDrawnCard()) {
      const from = { type: 'drawn' as const, index: 0 };
      const to = { type: 'foundation' as const, index: fi };
      if (engine.canMove(from, to)) {
        engine.applyMove(from, to);
        setTimerStarted(true);
        soundManager.cardPlace();
        refresh();

        // Auto-play waste tops to foundations after placing
        autoPlayWaste();
        return;
      }
    }

    // Try waste tops
    for (let wi = 0; wi < 4; wi++) {
      const pile = engine.getState().waste[wi];
      if (pile.length === 0) continue;
      const from = { type: 'waste' as const, index: wi };
      const to = { type: 'foundation' as const, index: fi };
      if (engine.canMove(from, to)) {
        engine.applyMove(from, to);
        setTimerStarted(true);
        soundManager.cardPlace();
        refresh();
        autoPlayWaste();
        return;
      }
    }
  }, [refresh]);

  const handlePlaceOnWaste = useCallback((wi: number) => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    if (!engine.getDrawnCard()) return;

    // Try foundation first (auto-play to foundation if valid)
    const from = { type: 'drawn' as const, index: 0 };
    const to = { type: 'waste' as const, index: wi };
    if (engine.canMove(from, to)) {
      engine.applyMove(from, to);
      setTimerStarted(true);
      soundManager.cardPlace();
      refresh();
    }
  }, [refresh]);

  const handleWasteToFoundation = useCallback((wi: number) => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    const pile = engine.getState().waste[wi];
    if (pile.length === 0) return;

    const card = pile[pile.length - 1];
    const from = { type: 'waste' as const, index: wi };
    for (let fi = 0; fi < 4; fi++) {
      if (engine.canPlaceOnFoundation(card, fi)) {
        engine.applyMove(from, { type: 'foundation' as const, index: fi });
        setTimerStarted(true);
        soundManager.cardPlace();
        refresh();
        autoPlayWaste();
        return;
      }
    }
  }, [refresh]);

  const autoPlayWaste = useCallback(() => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    let moved = true;
    while (moved) {
      moved = false;
      for (let wi = 0; wi < 4; wi++) {
        const pile = engine.getState().waste[wi];
        if (pile.length === 0) continue;
        const card = pile[pile.length - 1];
        for (let fi = 0; fi < 4; fi++) {
          if (engine.canPlaceOnFoundation(card, fi)) {
            engine.applyMove(
              { type: 'waste', index: wi },
              { type: 'foundation', index: fi }
            );
            soundManager.cardPlace();
            moved = true;
            break;
          }
        }
        if (moved) break;
      }
    }
    refresh();
  }, [refresh]);

  const handleUndo = useCallback(() => {
    if (!engineRef.current) return;
    engineRef.current.undo();
    refresh();
  }, [refresh]);

  const handleHint = useCallback(() => {
    if (!engineRef.current) return;
    const engine = engineRef.current;

    // If no drawn card, draw one first
    if (!engine.getDrawnCard() && engine.getStockCount() > 0) {
      engine.drawFromStock();
      setTimerStarted(true);
      soundManager.cardPlace();
      refresh();
      return;
    }

    const hint = engine.getHint();
    if (hint) {
      engine.applyMove(hint.from, hint.to);
      setTimerStarted(true);
      soundManager.cardPlace();
      refresh();
      if (hint.to.type === 'foundation') {
        autoPlayWaste();
      }
    }
  }, [refresh, autoPlayWaste]);

  const handleDrawnCardClick = useCallback(() => {
    if (!engineRef.current || !drawnCard) return;
    const engine = engineRef.current;

    // Auto-play to foundation if possible
    for (let fi = 0; fi < 4; fi++) {
      if (engine.canPlaceOnFoundation(drawnCard, fi)) {
        engine.applyMove(
          { type: 'drawn', index: 0 },
          { type: 'foundation', index: fi }
        );
        setTimerStarted(true);
        soundManager.cardPlace();
        refresh();
        autoPlayWaste();
        return;
      }
    }
  }, [drawnCard, refresh, autoPlayWaste]);

  if (!engineRef.current) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a3d0a' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Loading...</p>
      </div>
    );
  }

  const cardWidth = 'clamp(48px, 12vw, 80px)';
  const cardStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '5/7',
    fontSize: 'clamp(10px, 2.5vw, 16px)',
    cursor: 'pointer',
  };

  const slotStyle: React.CSSProperties = {
    width: cardWidth,
    aspectRatio: '5/7',
    borderRadius: 'clamp(3px, 0.8vw, 8px)',
    border: '1px dashed rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.03)',
    boxSizing: 'border-box',
    flexShrink: 0,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const stockInfo = (
    <span
      style={{
        padding: '4px 10px',
        borderRadius: 8,
        background: 'rgba(255,255,255,0.06)',
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      Stock: {stockCount}
    </span>
  );

  return (
    <GenericSolitaireShell
      gameName="Calculation"
      gameIcon="🔢"
      gameHref="/calculation"
      gameNumber={gameNumber}
      moveCount={moveCount}
      isWon={isWon}
      timerSeconds={timerSeconds}
      timerStarted={timerStarted}
      onNewGame={newGame}
      onUndo={handleUndo}
      onHint={handleHint}
      onTickTimer={() => setTimerSeconds(s => s + 1)}
      extraStats={stockInfo}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          padding: '12px 8px',
          gap: '12px',
          minHeight: 0,
          background: 'var(--felt-color, #0a3d0a)',
          borderRadius: 12,
        }}
      >
        {/* Foundations row */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {foundations.map((pile, fi) => {
            const topCard = pile.length > 0 ? pile[pile.length - 1] : null;
            const nextRank = engineRef.current?.getNextExpectedRank(fi);
            const seq = FOUNDATION_SEQUENCES[fi];
            const baseLabel = ['A', '2', '3', '4'][fi];
            const intervalLabel = [`+1`, `+2`, `+3`, `+4`][fi];

            return (
              <div
                key={`f-${fi}`}
                onClick={() => handlePlaceOnFoundation(fi)}
                onMouseEnter={() => setShowSequence(fi)}
                onMouseLeave={() => setShowSequence(null)}
                style={{ position: 'relative' }}
              >
                <div style={{
                  ...slotStyle,
                  border: nextRank ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(34,197,94,0.4)',
                  background: pile.length === 13 ? 'rgba(34,197,94,0.1)' : 'rgba(212,175,55,0.05)',
                  cursor: 'pointer',
                }}>
                  {topCard ? (
                    <div style={{ width: '100%' }}>
                      <DomCard card={topCard} style={cardStyle} />
                    </div>
                  ) : (
                    <span style={{ color: 'rgba(212,175,55,0.4)', fontSize: 'clamp(14px, 3vw, 22px)', fontWeight: 700 }}>
                      {baseLabel}
                    </span>
                  )}
                </div>
                {/* Next expected indicator */}
                <div style={{
                  textAlign: 'center',
                  marginTop: 4,
                  fontSize: 'clamp(9px, 2vw, 12px)',
                  color: pile.length === 13 ? 'rgba(34,197,94,0.7)' : 'rgba(212,175,55,0.6)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}>
                  {pile.length === 13 ? 'DONE' : `Next: ${nextRank ? RANK_NAMES[nextRank] : '—'}`}
                </div>
                <div style={{
                  textAlign: 'center',
                  fontSize: 'clamp(8px, 1.5vw, 10px)',
                  color: 'rgba(255,255,255,0.3)',
                  marginTop: 1,
                }}>
                  {intervalLabel} · {pile.length}/13
                </div>

                {/* Sequence tooltip */}
                {showSequence === fi && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: 8,
                    padding: '8px 12px',
                    background: 'rgba(0,0,0,0.9)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    borderRadius: 8,
                    zIndex: 100,
                    whiteSpace: 'nowrap',
                    fontSize: 'clamp(9px, 1.8vw, 12px)',
                    color: 'rgba(255,255,255,0.8)',
                    pointerEvents: 'none',
                  }}>
                    <div style={{ color: 'rgba(212,175,55,0.8)', fontWeight: 700, marginBottom: 4 }}>
                      Foundation {fi + 1} (by {fi + 1}s)
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {seq.map((r, idx) => (
                        <span
                          key={idx}
                          style={{
                            color: idx < pile.length
                              ? 'rgba(34,197,94,0.7)'
                              : idx === pile.length
                                ? '#D4AF37'
                                : 'rgba(255,255,255,0.4)',
                            fontWeight: idx === pile.length ? 800 : 400,
                          }}
                        >
                          {RANK_NAMES[r]}{idx < 12 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stock + Drawn card row */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
          {/* Stock pile */}
          <div
            onClick={handleDrawFromStock}
            style={{
              ...slotStyle,
              cursor: stockCount > 0 && !drawnCard ? 'pointer' : 'default',
              border: stockCount > 0 && !drawnCard
                ? '2px solid rgba(212,175,55,0.4)'
                : '1px dashed rgba(255,255,255,0.1)',
              background: stockCount > 0
                ? 'rgba(212,175,55,0.08)'
                : 'rgba(255,255,255,0.02)',
            }}
          >
            {stockCount > 0 ? (
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: 'clamp(3px, 0.8vw, 8px)',
                background: 'linear-gradient(135deg, #1a4a1a 0%, #0d2d0d 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <span style={{
                  color: 'rgba(212,175,55,0.6)',
                  fontSize: 'clamp(12px, 3vw, 18px)',
                  fontWeight: 800,
                }}>
                  {stockCount}
                </span>
              </div>
            ) : (
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 'clamp(8px, 2vw, 11px)' }}>
                Empty
              </span>
            )}
          </div>

          {/* Drawn card */}
          <div
            onClick={handleDrawnCardClick}
            style={{
              ...slotStyle,
              border: drawnCard
                ? '2px solid rgba(212,175,55,0.5)'
                : '1px dashed rgba(255,255,255,0.08)',
            }}
          >
            {drawnCard ? (
              <div style={{ width: '100%' }}>
                <DomCard card={drawnCard} style={cardStyle} />
              </div>
            ) : (
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 'clamp(8px, 2vw, 11px)' }}>
                Draw
              </span>
            )}
          </div>
        </div>

        {/* Waste piles row */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {waste.map((pile, wi) => {
            const topCard = pile.length > 0 ? pile[pile.length - 1] : null;

            return (
              <div key={`w-${wi}`} style={{ position: 'relative' }}>
                <div
                  onClick={() => drawnCard ? handlePlaceOnWaste(wi) : handleWasteToFoundation(wi)}
                  onDoubleClick={() => handleWasteToFoundation(wi)}
                  style={{
                    ...slotStyle,
                    cursor: 'pointer',
                    border: drawnCard
                      ? '1px solid rgba(212,175,55,0.2)'
                      : topCard
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px dashed rgba(255,255,255,0.1)',
                  }}
                >
                  {topCard ? (
                    <div style={{ width: '100%' }}>
                      <DomCard card={topCard} style={cardStyle} />
                    </div>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 'clamp(8px, 2vw, 11px)' }}>
                      Waste {wi + 1}
                    </span>
                  )}
                </div>
                {/* Pile count */}
                <div style={{
                  textAlign: 'center',
                  marginTop: 3,
                  fontSize: 'clamp(8px, 1.5vw, 10px)',
                  color: 'rgba(255,255,255,0.3)',
                }}>
                  {pile.length} card{pile.length !== 1 ? 's' : ''}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deadlock indicator */}
        {!isWon && !drawnCard && stockCount === 0 && engineRef.current?.isDeadlocked() && (
          <div style={{
            padding: '8px 16px',
            borderRadius: 10,
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: 'rgba(239,68,68,0.9)',
            fontSize: 13,
            fontWeight: 600,
            textAlign: 'center',
          }}>
            No more moves — game over. Try a new game!
          </div>
        )}
      </div>
    </GenericSolitaireShell>
  );
}
