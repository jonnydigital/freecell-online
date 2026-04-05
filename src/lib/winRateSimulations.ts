/**
 * winRateSimulations — server-side loader for src/data/winRates.json.
 *
 * The JSON is produced by scripts/run-win-rate-simulations.mjs and is
 * committed to the repo so it is available at build time without a
 * database. This module exposes a typed accessor so page code can
 * consume the payload without hand-rolling casts.
 *
 * Never import this from a client component — the loader uses
 * fs.readFileSync against the repo working directory.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type SimulationMethodology =
  | 'exhaustive'
  | 'monte-carlo'
  | 'published_research'
  | 'estimate'
  | 'community_data';

export interface SimulationEntry {
  key: string;
  game: string;
  winRatePercent: number;
  sampleSize?: number;
  confidenceInterval?: [number, number];
  winRateRange?: [number, number];
  methodology: SimulationMethodology;
  source: string;
  difficulty?: string;
  notes?: string;
}

export interface SimulationRunMeta {
  generatedAt: string;
  methodology: string;
  notes?: string;
  entryCount?: number;
  methodologyBreakdown?: Record<string, number>;
  entries: SimulationEntry[];
}

let cached: SimulationRunMeta | undefined;

/**
 * Loads and memoises the committed win-rate JSON.
 * Safe to call during Next.js server rendering and in metadata exports.
 */
export function loadWinRateSimulations(): SimulationRunMeta {
  if (cached) return cached;
  const dataPath = join(process.cwd(), 'src', 'data', 'winRates.json');
  const raw = readFileSync(dataPath, 'utf8');
  const parsed = JSON.parse(raw) as SimulationRunMeta;
  cached = parsed;
  return parsed;
}

/**
 * Convenience helper — returns the entries array only.
 */
export function getWinRateSimulationEntries(): SimulationEntry[] {
  return loadWinRateSimulations().entries;
}

/**
 * Returns a human-readable label for a methodology enum value.
 */
export function methodologyLabel(m: SimulationMethodology): string {
  switch (m) {
    case 'exhaustive':
      return 'Exhaustive';
    case 'monte-carlo':
      return 'Monte Carlo';
    case 'published_research':
      return 'Published research';
    case 'community_data':
      return 'Community data';
    case 'estimate':
    default:
      return 'Estimate';
  }
}
