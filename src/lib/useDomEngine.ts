/**
 * Server-side gate for DOM FreeCell engine.
 *
 * DOM is now the default engine. Set USE_DOM_FREECELL=false
 * to fall back to the Phaser engine if needed.
 */
export function shouldUseDomEngine(): boolean {
  return process.env.USE_DOM_FREECELL !== 'false';
}
