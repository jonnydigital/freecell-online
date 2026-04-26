/**
 * Catalog truthiness audit.
 *
 * Why this test exists: on 2026-04-25 we shipped a fix that aligned the user-
 * facing catalog count (claimed "26 distinct variants") with the actual
 * `/games` index (which had 24 entries). Two days later we found a stale "26
 * browser-playable variants" line in the FAQ that escaped the rename. Both
 * incidents are the same class of bug: marketing copy claims a number, the
 * underlying inventory drifts, and there is no automated check tying them
 * together.
 *
 * This test reads the source files as text (not as importable modules — the
 * games array is co-located with React components and Next metadata exports
 * that drag in the whole app router) and asserts:
 *
 *   1. The `/games` page array has the canonical catalog size.
 *   2. The hub `featuredGames` array has not silently grown or shrunk.
 *   3. Every user-facing copy string that mentions the catalog count uses
 *      the same canonical number.
 *
 * If any of these drift, this test fails before the regression ships.
 */

import * as fs from 'fs';
import * as path from 'path';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');

// The single source of truth for the catalog size. Update this number AND the
// inventory together, never one without the other — this test exists so that
// updating only one half is impossible.
const CANONICAL_CATALOG_SIZE = 28;

// Hub home featured grid is intentionally a curated subset, not the full
// catalog. Keep this in sync with `featuredGames` in src/lib/hubContent.ts.
const FEATURED_GAMES_SIZE = 5;

function readSourceFile(relPath: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf-8');
}

describe('catalog truthiness audit', () => {
  it('the /games page enumerates the canonical number of games', () => {
    const text = readSourceFile('src/app/(main)/games/page.tsx');
    // Each game entry in the array opens with `name: "..."`. Count those.
    const matches = text.match(/^\s+name:\s*"/gm) ?? [];
    expect(matches.length).toBe(CANONICAL_CATALOG_SIZE);
  });

  it('the hub featuredGames array stays the curated size', () => {
    const text = readSourceFile('src/lib/hubContent.ts');
    // Each featured game entry opens with `href:` after the array literal.
    const matches = text.match(/^\s+href:\s*'/gm) ?? [];
    expect(matches.length).toBe(FEATURED_GAMES_SIZE);
  });

  describe('user-facing catalog count claims agree with the inventory', () => {
    // (file, regex, label) tuples. Every regex must capture a number group.
    const CLAIMS: Array<[string, RegExp, string]> = [
      ['src/lib/siteCopy.ts', /(\d+)\s+solitaire variants live under one roof/, 'hub hubPositioning'],
      ['src/lib/siteCopy.ts', /multi-game hub with (\d+)\s+solitaire variants/, 'hub crossGameAvailability'],
      ['src/lib/siteCopy.ts', /the full (\d+)-game catalogue/, 'spoke crossGameAvailability — full catalogue'],
      ['src/lib/siteCopy.ts', /browse all (\d+) variants on SolitaireStack\.com/, 'spoke crossGameAvailability — browse all'],
      ['src/lib/hubContent.ts', /we cover (\d+)\s+variants with the same editorial depth/, 'hub FAQ — coverage'],
      ['src/lib/hubContent.ts', /left us with the (\d+) distinct variants on the site/, 'hub FAQ — selection'],
      ['src/components/SolitaireHubHome.tsx', /We publish (\d+)\s+distinct/, 'hub home — intro'],
      ['src/components/SolitaireHubHome.tsx', /(\d+)\s+Solitaire Games Under One Roof/, 'hub home — section heading'],
      ['src/components/SolitaireHubHome.tsx', /The full directory of all (\d+) games/, 'hub home — directory link'],
      ['src/app/(main)/games/page.tsx', /Play (\d+)\+ Card Games/, 'games metadata title'],
      ['src/app/(main)/games/page.tsx', /(\d+)\+ Card Games to Play Now/, 'games OG title'],
      ['src/app/(main)/faq/page.tsx', /We host (\d+) browser-playable variants/, 'faq — host count'],
    ];

    for (const [file, regex, label] of CLAIMS) {
      it(`${label} (${file})`, () => {
        const text = readSourceFile(file);
        const match = text.match(regex);
        expect(match).not.toBeNull();
        if (match) {
          expect(Number(match[1])).toBe(CANONICAL_CATALOG_SIZE);
        }
      });
    }
  });

  it('the otherGamesSentence math (3 named + N more) sums to the catalog size', () => {
    // hub copy is "FreeCell, Spider, Klondike, and N more solitaire variants"
    // 3 named games + N more should equal CANONICAL_CATALOG_SIZE.
    const text = readSourceFile('src/lib/siteCopy.ts');
    const match = text.match(/Klondike, and (\d+) more solitaire variants/);
    expect(match).not.toBeNull();
    if (match) {
      const moreCount = Number(match[1]);
      expect(3 + moreCount).toBe(CANONICAL_CATALOG_SIZE);
    }
  });
});
