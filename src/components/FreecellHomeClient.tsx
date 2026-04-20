'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from './GameErrorBoundary';
import StaticBoardPlaceholder from './StaticBoardPlaceholder';

const GameShell = dynamic(() => import('./GameShell'), {
  ssr: false,
  loading: () => <StaticBoardPlaceholder />,
});

export default function FreecellHomeClient() {
  return (
    <GameErrorBoundary>
      <GameShell />
    </GameErrorBoundary>
  );
}
