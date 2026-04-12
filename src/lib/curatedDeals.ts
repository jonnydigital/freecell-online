/**
 * Shared curated deal data used by sitemap, static params, game pages, and content pages.
 * Single source of truth for all notable FreeCell deal numbers and metadata.
 */

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Impossible';

export interface DealInfo {
  number: number;
  label: string;
  difficulty?: Difficulty;
}

/* ── Famous deals ── */
export const famousDeals: DealInfo[] = [
  { number: 1, label: 'First MS deal', difficulty: 'Easy' },
  { number: 617, label: 'Windows default', difficulty: 'Easy' },
  { number: 11982, label: 'Proven impossible', difficulty: 'Impossible' },
  { number: 146692, label: 'Impossible deal', difficulty: 'Impossible' },
  { number: 186216, label: 'Impossible deal', difficulty: 'Impossible' },
  { number: 455889, label: 'Impossible deal', difficulty: 'Impossible' },
  { number: 495505, label: 'Impossible deal', difficulty: 'Impossible' },
  { number: 512118, label: 'Impossible deal', difficulty: 'Impossible' },
  { number: 517776, label: 'Impossible deal', difficulty: 'Impossible' },
  { number: 781948, label: 'Impossible deal', difficulty: 'Impossible' },
];

/* ── Beginner-friendly deals ── */
export const beginnerDeals: DealInfo[] = [
  { number: 164, label: 'One of the easiest', difficulty: 'Easy' },
  { number: 278, label: 'Smooth opening', difficulty: 'Easy' },
  { number: 420, label: 'Forgiving layout', difficulty: 'Easy' },
  { number: 1029, label: 'Clear paths', difficulty: 'Easy' },
  { number: 2984, label: 'Natural sequences', difficulty: 'Easy' },
  { number: 3285, label: 'Accessible Aces', difficulty: 'Easy' },
  { number: 7391, label: 'Quick win', difficulty: 'Easy' },
  { number: 10692, label: 'Beginner friendly', difficulty: 'Easy' },
];

/* ── Expert challenge deals ── */
export const expertDeals: DealInfo[] = [
  { number: 169, label: 'Notoriously difficult', difficulty: 'Hard' },
  { number: 178, label: 'Expert challenge', difficulty: 'Hard' },
  { number: 258, label: 'Buried Aces', difficulty: 'Hard' },
  { number: 454, label: 'Tight margins', difficulty: 'Hard' },
  { number: 1689, label: 'Complex extraction', difficulty: 'Hard' },
  { number: 3148, label: 'Deep planning needed', difficulty: 'Hard' },
  { number: 7107, label: 'Advanced only', difficulty: 'Hard' },
  { number: 10613, label: 'Near-impossible', difficulty: 'Hard' },
];

/* ── Community favorites ── */
export const communityDeals: DealInfo[] = [
  { number: 25, label: 'Community classic' },
  { number: 50, label: 'Popular pick' },
  { number: 100, label: 'Round number favorite' },
  { number: 1000, label: 'Milestone deal' },
  { number: 5000, label: 'Mid-range gem' },
  { number: 10000, label: 'Five digits' },
  { number: 25000, label: 'Quarter mark' },
  { number: 32000, label: 'Last MS deal' },
];

/* ── Known unsolvable deals ── */
export const unsolvableDeals = [11982, 146692, 186216, 455889, 495505, 512118, 517776, 781948] as const;

/* ── All curated deals combined ── */
export const allCuratedDeals: DealInfo[] = [
  ...famousDeals,
  ...beginnerDeals,
  ...expertDeals,
  ...communityDeals,
];

/* ── Lookup map by game number ── */
export const dealLookup: Map<number, DealInfo> = new Map(
  allCuratedDeals.map((d) => [d.number, d]),
);

/**
 * Game numbers that appear in the sitemap.
 * Curated deals only — famous (11982, 617), beginner-friendly, expert challenges,
 * and community favorites. ~34 URLs total.
 *
 * History: previously included ~14,000 /game/N URLs targeting "long-tail 'freecell
 * game N' search coverage". That backfired on a new domain — mass thin pages
 * diluted crawl budget, triggering low-quality signals, and 154 pages got stuck
 * in "Discovered - currently not indexed" in Google Search Console. Those
 * programmatic deal numbers have effectively zero search volume anyway.
 * The /game/[number] pages still work for direct navigation and sharing; they're
 * just not advertised to Google via the sitemap.
 */
export const sitemapGameNumbers: number[] = (() => {
  const nums = new Set<number>();
  for (const deal of allCuratedDeals) nums.add(deal.number);
  return Array.from(nums).sort((a, b) => a - b);
})();

/**
 * Game numbers to pre-render as static pages at build time.
 * Curated deals + deals 1–1,000. Higher-numbered /game/N URLs (up to MAX_GAME_NUMBER)
 * are still valid routes — they're server-rendered on demand and cached at the edge —
 * but they're intentionally not listed in the sitemap (see sitemapGameNumbers above).
 */
export const staticGameNumbers: number[] = (() => {
  const nums = new Set<number>();
  for (const deal of allCuratedDeals) nums.add(deal.number);
  for (let n = 1; n <= 1000; n++) nums.add(n);
  return Array.from(nums).sort((a, b) => a - b);
})();

/**
 * Whether a game number is famous or unsolvable (gets higher sitemap priority).
 */
export function isHighPriorityDeal(num: number): boolean {
  const deal = dealLookup.get(num);
  if (!deal) return false;
  return deal.difficulty === 'Impossible' || deal.difficulty === 'Hard' || famousDeals.some(d => d.number === num);
}
