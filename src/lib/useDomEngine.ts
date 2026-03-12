/**
 * Feature flag for DOM-based rendering engine (future).
 * Currently always returns false — Phaser engine is used.
 */
export function shouldUseDomEngine(): boolean {
  return false;
}
