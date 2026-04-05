export type AuthorSlug =
  | 'editorial-team'
  | 'the-strategy-desk'
  | 'the-history-desk'
  | 'the-rules-desk'
  | 'the-research-desk';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Author {
  slug: AuthorSlug;
  name: string;
  shortName: string;
  role: string;
  expertise: string[];
  bioShort: string;
  bioFull: string;
  avatarUrl: string;
  joinedDate: string;
  contactUrl?: string;
  socialLinks?: SocialLink[];
}

export const AUTHORS: Record<AuthorSlug, Author> = {
  'editorial-team': {
    slug: 'editorial-team',
    name: 'Solitaire Stack Editorial Team',
    shortName: 'Editorial Team',
    role: 'Masthead & Founding Editors',
    expertise: [
      'editorial standards',
      'curation',
      'cross-game perspective',
      'content strategy',
    ],
    bioShort:
      'The Solitaire Stack Editorial Team oversees every page in the network. We set editorial standards, coordinate between our Strategy, History, Rules, and Research desks, and make sure every article is researched, tested, and updated as games and player understanding evolve. Our mission is simple: build the clearest, most trustworthy solitaire reference on the open web.',
    bioFull:
      'The Solitaire Stack Editorial Team is the masthead behind the network of solitaire sites we publish, including PlayFreeCellOnline.com, SolitaireStack.com, and our spoke domains. We started the network because the open web was full of surface-level solitaire content: thin how-to pages, copy-paste rule sheets, and strategy advice that had not been tested at the table. We wanted something better for the 100 million people who play solitaire every month. Our job is to coordinate the four specialty desks that do the actual writing and research: the Strategy Desk for tactics and probability, the History Desk for origins and variants, the Rules Desk for teaching and canonical rules, and the Research Desk for simulation and data. We set the house style, commission pieces, fact-check every claim, and revisit articles on a rolling schedule so they stay accurate. Every article you read on the network has been through research, draft, desk review, fact-check, and publication - and then updated when the facts change. Our editorial philosophy is straightforward: no filler, no hype, no SEO-first writing that wastes a reader\'s time. If you find an error, write to us and we will fix it.',
    avatarUrl: '/authors/editorial-team.png',
    joinedDate: '2026-01-15',
    contactUrl: 'mailto:editors@solitairestack.com',
  },
  'the-strategy-desk': {
    slug: 'the-strategy-desk',
    name: 'The Strategy Desk',
    shortName: 'Strategy Desk',
    role: 'Strategy & Tactics Editor',
    expertise: [
      'probability',
      'game theory',
      'endgame technique',
      'opening theory',
      'move-ordering',
    ],
    bioShort:
      'The Strategy Desk analyzes solitaire games the way chess grandmasters analyze positions. We combine thousands of hours of play with simulation data to publish strategy that actually holds up at the table. We cite win-rate sources, explain tradeoffs, and avoid vague advice. Strong on FreeCell supermoves, Klondike draw-3 decision trees, and Spider empty-column valuation.',
    bioFull:
      'The Strategy Desk is the tactics and decision-making arm of the Solitaire Stack network. We cover every game in the portfolio, but our focus is on the choices a player actually makes on a turn-by-turn basis: which card to move first, which column to open, when to commit a foundation play, when to stop and think. Most solitaire strategy content online is either too vague to act on ("plan ahead") or too specific to one deal to generalize. Our job is to close that gap. We work from two sources: deep play across thousands of hands and the simulation data our colleagues at the Research Desk produce. When we say a FreeCell opening move is suboptimal, we can show you the win-rate delta. When we recommend holding a red Jack in Klondike draw-3, we can walk you through the branches. We own the strategy canon on the network: opening principles, the supermove math in FreeCell, empty-column valuation in Spider, the stock-cycling logic in Klondike draw-3, and the endgame technique that separates 60-percent players from 90-percent players. Signature pieces include our FreeCell Opening Moves Ranked By Win Rate, the Klondike Draw-3 Decision Tree, Spider Solitaire Empty Column Valuation, and our endgame series on Reading the Board. We avoid the two failure modes of strategy writing: overclaiming ("always do X") and underclaiming ("it depends"). Reach out if you have a position you want analyzed.',
    avatarUrl: '/authors/strategy-desk.png',
    joinedDate: '2026-01-15',
    contactUrl: 'mailto:strategy@solitairestack.com',
  },
  'the-history-desk': {
    slug: 'the-history-desk',
    name: 'The History Desk',
    shortName: 'History Desk',
    role: 'Solitaire History & Archives Editor',
    expertise: [
      'card game history',
      'patience tradition',
      'Microsoft era',
      'variant genealogy',
    ],
    bioShort:
      'Solitaire is more than two centuries old. The History Desk traces variants back to their French patience origins, documents how games evolved, and preserves the stories behind their names. We cite primary sources where available, note disputed claims, and try hard to keep legend separate from fact.',
    bioFull:
      'The History Desk covers the origins, evolution, and cultural footprint of solitaire. The patience tradition goes back to the late eighteenth century in France and Germany, traveled through nineteenth-century England and Russia, and landed on tens of millions of Windows 3.0 machines in 1990. Most of that history is scattered across out-of-print books, foreign-language archives, and badly-sourced blog posts. Our job is to gather it, verify what we can, flag what we cannot, and publish reference pieces that will still be useful ten years from now. We work from period sources where they exist - Lady Adelaide Cadogan\'s 1870s collections, Dick\'s Games of Patience, early twentieth-century Hoyles - and from modern research where it exists. We try hard to avoid the two traps of game history: repeating folk etymology as fact ("Napoleon invented this on St Helena") and dismissing every legend as fabrication. Some stories are true, some are partly true, and some are invented by card-game publishers in the 1950s. We try to say which is which. Our beats include variant genealogy (how Klondike became the default), regional traditions (German patience versus English patience), the Microsoft era and what it did to the canon, and the slow drift of rules across sources. Signature pieces include Where Klondike Got Its Name, The Microsoft FreeCell Era, A Short History of Patience, and our ongoing Variant Family Trees series. If you have a primary source we should know about, please send it our way.',
    avatarUrl: '/authors/history-desk.png',
    joinedDate: '2026-01-15',
    contactUrl: 'mailto:history@solitairestack.com',
  },
  'the-rules-desk': {
    slug: 'the-rules-desk',
    name: 'The Rules Desk',
    shortName: 'Rules Desk',
    role: 'Rules & Teaching Editor',
    expertise: [
      'rules standardization',
      'beginner onboarding',
      'teaching pedagogy',
      'variant rule differences',
    ],
    bioShort:
      'Solitaire rules vary by source. The Rules Desk documents the canonical rules for every variant we cover, notes where implementations differ, and writes how-to guides that actually teach. We test our explanations on new players, call out common rule confusions, and keep our rules pages aligned with the games we ship.',
    bioFull:
      'The Rules Desk owns the teaching layer of the Solitaire Stack network. Every variant has a canonical rule set on the site, every how-to page is written to help a first-time player finish a game, and every rule we publish has been checked against the implementation that actually runs in the browser. That alignment is harder than it sounds. Solitaire rules are not standardized - historical sources disagree, regional traditions disagree, digital implementations make undocumented choices (King-to-Ace wrapping in Golf, auto-move thresholds in FreeCell, redeal limits in Klondike), and players arrive with opinions from whichever version they grew up on. Our job is to document clearly: here is the canonical rule, here is what varies in the wild, here is what our game does, here is why. Our teaching philosophy comes from classroom pedagogy: show before tell, name every piece of the board, walk through one full example, then generalize. We write for a reader who has never touched the game before. We test our how-to pages on real beginners and rewrite anything that trips them up. We take the common confusions seriously: what counts as a "suit sequence" in Spider, why FreeCell looks unwinnable when it is not, why Klondike draw-3 is a different game than draw-1. Signature pieces include our How to Play FreeCell primer, Spider Solitaire Rules and Variants, Klondike Draw-1 vs Draw-3, and the Rules Glossary that links every game on the network. If a rule on the site is unclear, write and tell us.',
    avatarUrl: '/authors/rules-desk.png',
    joinedDate: '2026-01-15',
    contactUrl: 'mailto:rules@solitairestack.com',
  },
  'the-research-desk': {
    slug: 'the-research-desk',
    name: 'The Research Desk',
    shortName: 'Research Desk',
    role: 'Data & Research Editor',
    expertise: [
      'simulation',
      'statistics',
      'win-rate analysis',
      'solvability',
      'data visualization',
    ],
    bioShort:
      'When we say "FreeCell is solvable 99.999 percent of the time," we have run simulations. The Research Desk builds solvers, runs Monte Carlo analyses, and publishes confidence intervals. When we cite a win rate, we explain the methodology. When we disagree with conventional wisdom, we show the data.',
    bioFull:
      'The Research Desk is the empirical arm of the Solitaire Stack network. Most solitaire statistics that circulate online are either copied from one source of unknown quality or asserted without a methodology. Our job is to replace those numbers with figures we have computed ourselves, show the methodology, and publish the code when it makes sense. We run simulations. We build solvers. We report confidence intervals. We distinguish between "the solver could not finish within a fixed computation budget" and "this deal is genuinely unwinnable." We care about methodology because in solitaire the difference between a 78 percent win rate and an 82 percent win rate often comes down to how the simulation treats auto-moves, redeals, or look-ahead. Our beats include solvability analysis (which deals in FreeCell are unwinnable, and why), simulated win-rates per variant under different skill models, player behavior research (how long an average game takes, where players quit), and data visualization. We work closely with the Strategy Desk: they ask the tactical questions, we run the numbers that answer them. We also publish methodology notes so a reader can decide whether to trust our figures. Signature pieces include The 8 Unsolvable FreeCell Deals, Klondike Win Rates Under Different Play Strategies, and our Monte Carlo Simulations series. When we are wrong, we correct in public. If you see a number on the site that looks off, tell us and we will re-run it.',
    avatarUrl: '/authors/research-desk.png',
    joinedDate: '2026-01-15',
    contactUrl: 'mailto:research@solitairestack.com',
  },
};

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS[slug as AuthorSlug];
}

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS);
}

export function getAuthorsByExpertise(tag: string): Author[] {
  const needle = tag.toLowerCase();
  return getAllAuthors().filter((author) =>
    author.expertise.some((item) => item.toLowerCase() === needle),
  );
}
