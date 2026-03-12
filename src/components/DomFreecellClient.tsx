'use client';

/**
 * Placeholder for future DOM-based FreeCell engine.
 * Currently unused — shouldUseDomEngine() returns false.
 */
export default function DomFreecellClient({ initialGameNumber }: { initialGameNumber?: number }) {
  return (
    <div className="flex items-center justify-center min-h-[400px] text-white/60">
      <p>DOM engine not yet available. Please refresh.</p>
    </div>
  );
}
