'use client';

import { Component, ReactNode } from 'react';
import { captureError } from '../lib/errorTracking';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class GameErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error): void {
    captureError(error, { source: 'react_error_boundary' });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#0a3d0a] text-white p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
          <p className="text-white/70 mb-6 max-w-md">
            The game encountered an error. This has been reported automatically.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#1a5c1a] hover:bg-[#2a7c2a] rounded transition-colors"
          >
            Reload Game
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
