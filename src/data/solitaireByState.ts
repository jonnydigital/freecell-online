/**
 * solitaireByState.ts — directional estimates of the most-popular solitaire
 * variant in each US state and DC, based on our Research Desk's review of
 * public search-trend data, app-store chart snapshots, and our own network
 * traffic. This is editorial commentary, not peer-reviewed research.
 *
 * Each entry maps a USPS state code to:
 *   - a favoriteGame slug (our five headline variants)
 *   - a secondPlace slug (the runner-up we think is closest)
 *   - a short note summarising the regional pattern
 *
 * See src/app/(main)/popular-solitaire-by-state/page.tsx for methodology.
 */

export type FavoriteGame =
  | 'klondike'
  | 'freecell'
  | 'spider'
  | 'tripeaks'
  | 'pyramid';

export interface StateSolitaireRecord {
  code: string;
  name: string;
  favoriteGame: FavoriteGame;
  secondPlace: FavoriteGame;
  note: string;
}

export const GAME_LABELS: Record<FavoriteGame, string> = {
  klondike: 'Klondike',
  freecell: 'FreeCell',
  spider: 'Spider Solitaire',
  tripeaks: 'TriPeaks',
  pyramid: 'Pyramid',
};

export const GAME_COLORS: Record<FavoriteGame, string> = {
  // Tuned for the dark green canvas; each category stays legible on #072907.
  klondike: '#D4AF37', // gold — classic
  freecell: '#4FB3FF', // sky blue — office/desktop
  spider: '#8BC34A', // leaf green — west/mountain
  tripeaks: '#F08080', // coral — casual mobile
  pyramid: '#C77DFF', // amethyst — southern quick-play
};

export const GAME_HREFS: Record<FavoriteGame, string> = {
  klondike: '/klondike',
  freecell: '/freecell',
  spider: '/spider',
  tripeaks: '/tripeaks',
  pyramid: '/pyramid',
};

/**
 * Regional pattern the Research Desk uses to explain clusters:
 *   - "klondike": conservative, classic-only, low variant exploration
 *   - "freecell": office/federal-worker corridor (Mid-Atlantic, Midwest)
 *   - "spider": tech/outdoor West + Mountain West
 *   - "pyramid": Deep South casual mobile play
 *   - "tripeaks": newer casual mobile adopters scattered across Sun Belt
 */
export const SOLITAIRE_BY_STATE: StateSolitaireRecord[] = [
  // New England — heavily classic
  { code: 'ME', name: 'Maine', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'Classic Klondike dominates; low variant exploration.' },
  { code: 'NH', name: 'New Hampshire', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'New England pattern — Klondike first, FreeCell a distant second.' },
  { code: 'VT', name: 'Vermont', favoriteGame: 'klondike', secondPlace: 'spider', note: 'Small-sample noise, but Klondike leads by a wide margin.' },
  { code: 'MA', name: 'Massachusetts', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'Classic-leaning; Boston-area office culture nudges FreeCell up.' },
  { code: 'RI', name: 'Rhode Island', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'New England classic pattern.' },
  { code: 'CT', name: 'Connecticut', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'Commuter-corridor FreeCell affinity, still Klondike first.' },

  // Mid-Atlantic — FreeCell Belt
  { code: 'NY', name: 'New York', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'The most average state in the country; plays the national mix.' },
  { code: 'NJ', name: 'New Jersey', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'Office-worker corridor pushes FreeCell into first place.' },
  { code: 'PA', name: 'Pennsylvania', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'Classic FreeCell Belt state — strong Windows-era office footprint.' },
  { code: 'DE', name: 'Delaware', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'Mid-Atlantic federal-contractor culture; FreeCell leads narrowly.' },
  { code: 'MD', name: 'Maryland', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'D.C.-metro workforce makes this our strongest FreeCell state.' },
  { code: 'DC', name: 'District of Columbia', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'Federal office culture — FreeCell is the desk-drawer default.' },
  { code: 'VA', name: 'Virginia', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'Second only to Maryland; heavy federal and contractor base.' },
  { code: 'WV', name: 'West Virginia', favoriteGame: 'klondike', secondPlace: 'pyramid', note: 'Appalachian pattern — classic Klondike plus southern pyramid leanings.' },

  // Midwest — FreeCell Belt extends west
  { code: 'OH', name: 'Ohio', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'Rust-belt office population keeps FreeCell above average.' },
  { code: 'MI', name: 'Michigan', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'Automotive-industry desktop workforce favours FreeCell.' },
  { code: 'IN', name: 'Indiana', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'Midwest FreeCell Belt — strategic variant over classic.' },
  { code: 'IL', name: 'Illinois', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'Chicago metro drives FreeCell past Klondike.' },
  { code: 'WI', name: 'Wisconsin', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'Upper-midwest FreeCell affinity; Klondike a close second.' },
  { code: 'MN', name: 'Minnesota', favoriteGame: 'freecell', secondPlace: 'klondike', note: 'Twin Cities office culture nudges FreeCell to the top.' },
  { code: 'IA', name: 'Iowa', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'More classic-leaning than its FreeCell Belt neighbours.' },
  { code: 'MO', name: 'Missouri', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'Splits the difference between Midwest FreeCell and Southern pyramid.' },
  { code: 'ND', name: 'North Dakota', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'Small-state noise; Klondike comfortably first.' },
  { code: 'SD', name: 'South Dakota', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'Classic-first plains pattern.' },
  { code: 'NE', name: 'Nebraska', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'Plains classic-first pattern.' },
  { code: 'KS', name: 'Kansas', favoriteGame: 'klondike', secondPlace: 'freecell', note: 'Classic-first plains pattern.' },

  // South — Pyramid/TriPeaks zone
  { code: 'KY', name: 'Kentucky', favoriteGame: 'pyramid', secondPlace: 'klondike', note: 'Southern quick-play lean — pyramid narrowly leads.' },
  { code: 'TN', name: 'Tennessee', favoriteGame: 'pyramid', secondPlace: 'klondike', note: 'Mobile-first casual play boosts pyramid above average.' },
  { code: 'NC', name: 'North Carolina', favoriteGame: 'klondike', secondPlace: 'spider', note: 'Research Triangle tech moves spider up the ladder.' },
  { code: 'SC', name: 'South Carolina', favoriteGame: 'pyramid', secondPlace: 'klondike', note: 'Southern pyramid/TriPeaks cluster.' },
  { code: 'GA', name: 'Georgia', favoriteGame: 'spider', secondPlace: 'pyramid', note: 'Atlanta-driven spider interest edges out pyramid.' },
  { code: 'FL', name: 'Florida', favoriteGame: 'tripeaks', secondPlace: 'klondike', note: 'Retiree + tourist mobile play pushes TriPeaks to the top.' },
  { code: 'AL', name: 'Alabama', favoriteGame: 'pyramid', secondPlace: 'klondike', note: 'Deep-south pyramid cluster.' },
  { code: 'MS', name: 'Mississippi', favoriteGame: 'pyramid', secondPlace: 'klondike', note: 'Our strongest pyramid state relative to average.' },
  { code: 'LA', name: 'Louisiana', favoriteGame: 'pyramid', secondPlace: 'klondike', note: 'Deep-south pyramid cluster.' },
  { code: 'AR', name: 'Arkansas', favoriteGame: 'pyramid', secondPlace: 'klondike', note: 'Deep-south pyramid cluster.' },
  { code: 'OK', name: 'Oklahoma', favoriteGame: 'pyramid', secondPlace: 'klondike', note: 'Southern-plains pyramid lean.' },
  { code: 'TX', name: 'Texas', favoriteGame: 'spider', secondPlace: 'pyramid', note: 'Metro tech + suburban mobile — spider narrowly leads.' },

  // Mountain — Spider Corridor
  { code: 'MT', name: 'Montana', favoriteGame: 'spider', secondPlace: 'klondike', note: 'Mountain spider cluster begins here.' },
  { code: 'ID', name: 'Idaho', favoriteGame: 'spider', secondPlace: 'klondike', note: 'Mountain spider cluster.' },
  { code: 'WY', name: 'Wyoming', favoriteGame: 'klondike', secondPlace: 'spider', note: 'Noisy sample, but Klondike still leads a thin mountain field.' },
  { code: 'CO', name: 'Colorado', favoriteGame: 'spider', secondPlace: 'freecell', note: 'Front-range tech workforce — strong spider state.' },
  { code: 'UT', name: 'Utah', favoriteGame: 'spider', secondPlace: 'freecell', note: 'Salt Lake metro tech helps spider lead.' },
  { code: 'NV', name: 'Nevada', favoriteGame: 'spider', secondPlace: 'tripeaks', note: 'Las Vegas splits between spider and mobile TriPeaks.' },
  { code: 'AZ', name: 'Arizona', favoriteGame: 'spider', secondPlace: 'tripeaks', note: 'Retiree TriPeaks push versus Phoenix-tech spider.' },
  { code: 'NM', name: 'New Mexico', favoriteGame: 'spider', secondPlace: 'klondike', note: 'Mountain spider cluster extends south.' },

  // West Coast — Spider Corridor continued
  { code: 'CA', name: 'California', favoriteGame: 'spider', secondPlace: 'freecell', note: 'Largest spider-leaning state by volume.' },
  { code: 'OR', name: 'Oregon', favoriteGame: 'spider', secondPlace: 'freecell', note: 'Pacific Northwest spider stronghold.' },
  { code: 'WA', name: 'Washington', favoriteGame: 'spider', secondPlace: 'freecell', note: 'Seattle tech corridor — very strong spider signal.' },
  { code: 'AK', name: 'Alaska', favoriteGame: 'klondike', secondPlace: 'spider', note: 'Highest per-capita solitaire interest we see; long winters.' },
  { code: 'HI', name: 'Hawaii', favoriteGame: 'tripeaks', secondPlace: 'klondike', note: 'Casual mobile lean — TriPeaks narrowly leads.' },
];

export function getStateByCode(code: string): StateSolitaireRecord | undefined {
  return SOLITAIRE_BY_STATE.find((s) => s.code === code.toUpperCase());
}

export function countByGame(): Record<FavoriteGame, number> {
  const counts: Record<FavoriteGame, number> = {
    klondike: 0,
    freecell: 0,
    spider: 0,
    tripeaks: 0,
    pyramid: 0,
  };
  for (const record of SOLITAIRE_BY_STATE) {
    counts[record.favoriteGame] += 1;
  }
  return counts;
}
