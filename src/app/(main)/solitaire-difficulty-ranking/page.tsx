import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { canonicalUrlFor, isOwnedBy } from '@/lib/routeOwnership';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, ContentLinkCard, JsonLd } from '@/components/content';

export const metadata: Metadata = {
  title: 'Every Solitaire Game Ranked by Difficulty (2026) | Easiest to Hardest',
  description:
    'All 28 solitaire games ranked from easiest to hardest. Difficulty tiers, win rates, and what makes each game challenging. Find the right solitaire game for your skill level.',
  keywords: [
    'solitaire games ranked by difficulty',
    'easiest solitaire games',
    'hardest solitaire games',
    'solitaire difficulty ranking',
    'which solitaire game is easiest',
    'most difficult solitaire game',
    'solitaire games for beginners',
    'solitaire win rates',
    'solitaire difficulty chart',
  ],
  openGraph: {
    title: 'Every Solitaire Game Ranked by Difficulty | Easiest to Hardest',
    description:
      'All 28 solitaire games ranked from beginner-friendly to brutally hard. Win rates, difficulty tiers, and what makes each game unique.',
    url: absoluteUrl('/solitaire-difficulty-ranking'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: canonicalUrlFor('/solitaire-difficulty-ranking'),
  },
};

/* -- Game data -- */

interface RankedGame {
  rank: number;
  name: string;
  href: string;
  winRate: string;
  tier: 'beginner' | 'easy' | 'intermediate' | 'advanced' | 'expert';
  skillVsLuck: 'Mostly Luck' | 'Luck-Heavy' | 'Balanced' | 'Skill-Heavy' | 'Pure Skill';
  decks: 1 | 2;
  description: string;
  keyTrait: string;
}

const games: RankedGame[] = [
  {
    rank: 1,
    name: 'Clock Solitaire',
    href: '/clock',
    winRate: '~1%',
    tier: 'beginner',
    skillVsLuck: 'Mostly Luck',
    decks: 1,
    description:
      'Zero decisions. Cards are dealt into a clock face and you flip them mechanically until you win or lose. The outcome is determined entirely by the deal. Perfect for unwinding when you want cards moving without any thinking.',
    keyTrait: 'No decisions at all',
  },
  {
    rank: 2,
    name: 'TriPeaks',
    href: '/tripeaks',
    winRate: '~90%',
    tier: 'beginner',
    skillVsLuck: 'Luck-Heavy',
    decks: 1,
    description:
      'Three overlapping peaks of cards, and you remove them one rank up or down from the waste pile. The chain-combo mechanic is satisfying and the rules click in under a minute. A great first solitaire game after Klondike.',
    keyTrait: 'Chain combos, very high win rate',
  },
  {
    rank: 3,
    name: 'Aces Up',
    href: '/aces-up',
    winRate: '~10%',
    tier: 'beginner',
    skillVsLuck: 'Luck-Heavy',
    decks: 1,
    description:
      'Deal four cards, discard any card that shares a suit with a higher-ranked card on the board, repeat. The rules are so simple you can teach them in one sentence. The low win rate keeps it from being boring.',
    keyTrait: 'Simplest rules of any solitaire game',
  },
  {
    rank: 4,
    name: 'Golf Solitaire',
    href: '/golf',
    winRate: '~20%',
    tier: 'beginner',
    skillVsLuck: 'Luck-Heavy',
    decks: 1,
    description:
      'Seven columns, and you clear cards that are one rank above or below the waste pile top. Named "golf" because you are trying to get the lowest score. Fast rounds and minimal decision-making make it an ideal coffee-break game.',
    keyTrait: 'Quick rounds, score-based',
  },
  {
    rank: 5,
    name: 'Monte Carlo',
    href: '/monte-carlo',
    winRate: '~30%',
    tier: 'beginner',
    skillVsLuck: 'Luck-Heavy',
    decks: 1,
    description:
      'A 5x5 grid of cards. Remove adjacent pairs of the same rank, then consolidate and redeal. The spatial matching is intuitive, and the grid layout feels different from column-based games. Good for visual thinkers.',
    keyTrait: 'Grid-based pair matching',
  },
  {
    rank: 6,
    name: 'Accordion',
    href: '/accordion',
    winRate: '~5%',
    tier: 'easy',
    skillVsLuck: 'Luck-Heavy',
    decks: 1,
    description:
      'All 52 cards in a single row. Stack cards onto matching cards 1 or 3 positions to the left. The row compresses like an accordion. Simple rules, but the win rate is punishingly low and most deals are unwinnable no matter what you do.',
    keyTrait: 'Single-row compression mechanic',
  },
  {
    rank: 7,
    name: 'Pyramid Solitaire',
    href: '/pyramid',
    winRate: '~10%',
    tier: 'easy',
    skillVsLuck: 'Luck-Heavy',
    decks: 1,
    description:
      'Twenty-eight cards arranged in a pyramid. Pair exposed cards that add up to 13 to remove them. Kings go alone. The arithmetic adds a thin layer of decision-making, but luck dominates. It is the game that makes you say "just one more deal."',
    keyTrait: 'Pair-to-13 arithmetic',
  },
  {
    rank: 8,
    name: 'Easy FreeCell',
    href: '/easy-freecell',
    winRate: '~95%',
    tier: 'easy',
    skillVsLuck: 'Balanced',
    decks: 1,
    description:
      'FreeCell with training wheels. Deals are pre-screened to be more forgiving, with aces and low cards near the surface. An excellent way to learn FreeCell mechanics before tackling the full game.',
    keyTrait: 'Curated beginner-friendly deals',
  },
  {
    rank: 9,
    name: 'Klondike Solitaire',
    href: '/klondike',
    winRate: '~30%',
    tier: 'easy',
    skillVsLuck: 'Luck-Heavy',
    decks: 1,
    description:
      'The solitaire game. Seven tableau columns with hidden cards, a stock pile you flip through, and alternating-color builds. Klondike is easy to learn but hard to win consistently because so many cards start face-down. Everyone knows this game even if they do not know its name.',
    keyTrait: 'The most popular card game in the world',
  },
  {
    rank: 10,
    name: 'Gaps (Montana)',
    href: '/gaps',
    winRate: '~15%',
    tier: 'intermediate',
    skillVsLuck: 'Balanced',
    decks: 1,
    description:
      'Four rows of 13 cards with the aces removed to create gaps. Slide cards into gaps to build ascending suit sequences from left to right. The spatial puzzle feels completely different from other solitaire games. Redeals give you a second chance.',
    keyTrait: 'Grid rearrangement puzzle',
  },
  {
    rank: 11,
    name: 'Canfield',
    href: '/canfield',
    winRate: '~10%',
    tier: 'intermediate',
    skillVsLuck: 'Luck-Heavy',
    decks: 1,
    description:
      'Originally a casino gambling game where you paid $52 for a deck and earned $5 per card moved to the foundations. A 13-card reserve pile and a random starting foundation rank give every deal a unique flavor. Fast, tense, and stingy with wins.',
    keyTrait: 'Casino origins, reserve pile mechanic',
  },
  {
    rank: 12,
    name: 'Calculation',
    href: '/calculation',
    winRate: '~20%',
    tier: 'intermediate',
    skillVsLuck: 'Skill-Heavy',
    decks: 1,
    description:
      'Four foundations build by different intervals (1s, 2s, 3s, 4s) wrapping at King. The entire game is deciding which of four waste piles to place each drawn card on. One of the most skill-intensive solitaire games despite having simple rules.',
    keyTrait: 'Arithmetic intervals, waste pile strategy',
  },
  {
    rank: 13,
    name: "Baker's Dozen",
    href: '/bakers-dozen',
    winRate: '~70%',
    tier: 'intermediate',
    skillVsLuck: 'Skill-Heavy',
    decks: 1,
    description:
      'Thirteen columns of four face-up cards, Kings moved to the bottom. No free cells, no stock, no empty column tricks. What you see is what you get. The high win rate rewards planning, and the constraints force you to think several moves ahead.',
    keyTrait: 'No hidden information, no safety nets',
  },
  {
    rank: 14,
    name: 'FreeCell',
    href: '/',
    winRate: '~82%',
    tier: 'intermediate',
    skillVsLuck: 'Pure Skill',
    decks: 1,
    description:
      'All 52 cards dealt face-up. Four free cells for temporary storage. Build down by alternating colors, foundations up by suit. Nearly every deal is solvable, so when you lose, it is your fault. The gold standard for strategic solitaire.',
    keyTrait: 'Complete information, highest skill ceiling',
  },
  {
    rank: 15,
    name: 'La Belle Lucie',
    href: '/la-belle-lucie',
    winRate: '~15%',
    tier: 'advanced',
    skillVsLuck: 'Balanced',
    decks: 1,
    description:
      'Eighteen fans of three cards. Only the top card of each fan is playable, and building is same-suit descending. Two redeals shuffle everything and give you fresh chances. The tension between conserving redeals and making progress is the heart of the game.',
    keyTrait: 'Fan layout, two redeals',
  },
  {
    rank: 16,
    name: 'Bisley',
    href: '/bisley',
    winRate: '~20%',
    tier: 'advanced',
    skillVsLuck: 'Skill-Heavy',
    decks: 1,
    description:
      'Aces start in the foundations immediately, and Kings get their own foundation row building downward. You are working both ends toward the middle simultaneously. No stock pile, no redeals, just pure tableau management with a unique dual-direction mechanic.',
    keyTrait: 'Simultaneous up and down foundations',
  },
  {
    rank: 17,
    name: 'Bristol',
    href: '/bristol',
    winRate: '~10%',
    tier: 'advanced',
    skillVsLuck: 'Balanced',
    decks: 1,
    description:
      'Eight fans of three cards plus a stock that deals to three reserve piles. Building is regardless of suit, which sounds lenient until you realize how quickly the fans lock up. The reserve piles add a layer of timing strategy.',
    keyTrait: 'Fan patience with reserve piles',
  },
  {
    rank: 18,
    name: 'Yukon',
    href: '/yukon',
    winRate: '~25%',
    tier: 'advanced',
    skillVsLuck: 'Balanced',
    decks: 1,
    description:
      'Klondike without a stock pile. All cards are dealt to the tableau, and you can move any face-up card along with everything on top of it, even if the group is not in sequence. This wild freedom makes Yukon feel chaotic, but strong players learn to weaponize it.',
    keyTrait: 'Move any face-up card freely',
  },
  {
    rank: 19,
    name: "Baker's Game",
    href: '/bakers-game',
    winRate: '~75%',
    tier: 'advanced',
    skillVsLuck: 'Pure Skill',
    decks: 1,
    description:
      'FreeCell with same-suit building instead of alternating colors. That one rule change cuts the number of legal moves dramatically. If you can win Baker\'s Game consistently, you have genuinely mastered the FreeCell family.',
    keyTrait: 'Same-suit FreeCell variant',
  },
  {
    rank: 20,
    name: 'Eight Off',
    href: '/eight-off',
    winRate: '~90%',
    tier: 'advanced',
    skillVsLuck: 'Pure Skill',
    decks: 1,
    description:
      'Eight free cells sounds generous, but same-suit building and Kings-only empty columns mean you need every one of them. The expanded reserve creates long tactical chains that reward deep calculation. High win rate, but only if you plan carefully.',
    keyTrait: '8 free cells, same-suit constraint',
  },
  {
    rank: 21,
    name: 'Seahaven Towers',
    href: '/seahaven',
    winRate: '~89%',
    tier: 'advanced',
    skillVsLuck: 'Pure Skill',
    decks: 1,
    description:
      'Ten columns of five cards, four free cells, same-suit building, Kings-only column fills. Every card is visible from the start. The combination of complete information and tight constraints makes it a puzzle lover\'s dream.',
    keyTrait: 'Complete information, tight constraints',
  },
  {
    rank: 22,
    name: 'Penguin',
    href: '/penguin',
    winRate: '~90%',
    tier: 'advanced',
    skillVsLuck: 'Pure Skill',
    decks: 1,
    description:
      'Seven columns plus seven free cells called "the flipper." The foundation starting rank is determined by the first card dealt, and same-rank cards begin on the foundations. Complex setup rules, but a very high win rate for players who stick with it.',
    keyTrait: 'Dynamic foundation start, 7 free cells',
  },
  {
    rank: 23,
    name: 'Cruel',
    href: '/cruel',
    winRate: '~10%',
    tier: 'expert',
    skillVsLuck: 'Balanced',
    decks: 1,
    description:
      'Twelve piles of four cards, same-suit building, unlimited redeals that preserve pile order. The redeals sound forgiving but they are a trap. Cards shift position in predictable but hard-to-visualize ways, and a careless redeal can destroy a winning position.',
    keyTrait: 'Order-preserving redeals',
  },
  {
    rank: 24,
    name: 'Flower Garden',
    href: '/flower-garden',
    winRate: '~5%',
    tier: 'expert',
    skillVsLuck: 'Skill-Heavy',
    decks: 1,
    description:
      'Six columns of six cards (the "garden") plus a 16-card reserve (the "bouquet") that is fully accessible. Building is regardless of suit, but the tight column count and lack of free cells make every move consequential. Deceptively brutal.',
    keyTrait: 'Bouquet reserve, tight columns',
  },
  {
    rank: 25,
    name: 'Beleaguered Castle',
    href: '/beleaguered-castle',
    winRate: '~10%',
    tier: 'expert',
    skillVsLuck: 'Skill-Heavy',
    decks: 1,
    description:
      'All 52 cards dealt face-up in eight rows flanking four foundation piles. No free cells, no stock pile, no safety net. Building is regardless of suit, but only the end card of each row can move. Sometimes called "FreeCell without the free cells" and it earns that name.',
    keyTrait: 'No free cells, no forgiveness',
  },
  {
    rank: 26,
    name: 'Spider Solitaire',
    href: '/spider',
    winRate: '~30%',
    tier: 'expert',
    skillVsLuck: 'Balanced',
    decks: 2,
    description:
      'Two full decks across ten columns. Build same-suit King-to-Ace sequences to remove them. The 4-suit version is one of the most strategically demanding solitaire games ever created. Deals from the stock can destroy carefully built sequences in an instant.',
    keyTrait: 'Two decks, same-suit sequences',
  },
  {
    rank: 27,
    name: 'Scorpion',
    href: '/scorpion',
    winRate: '~5%',
    tier: 'expert',
    skillVsLuck: 'Balanced',
    decks: 1,
    description:
      'Seven columns with hidden cards. Like Spider, you build same-suit King-to-Ace runs, but you can move any face-up card with its entire pile. Three reserve cards arrive late in the game and can either save you or seal your fate. Volatile and punishing.',
    keyTrait: 'Spider variant with group moves',
  },
  {
    rank: 28,
    name: 'Forty Thieves',
    href: '/forty-thieves',
    winRate: '~10%',
    tier: 'expert',
    skillVsLuck: 'Balanced',
    decks: 2,
    description:
      'Two decks, ten columns of four, same-suit building, single-card moves only. Also called "Napoleon at St. Helena" because legend says Napoleon played it in exile. The combination of two decks, strict suit rules, and no group moves makes this arguably the hardest mainstream solitaire game.',
    keyTrait: 'Two decks, single-card moves, same-suit only',
  },
];

const tiers = [
  {
    id: 'beginner',
    label: 'Beginner',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/20',
    description: 'Simple rules, few or no meaningful decisions. Great for relaxing or learning how solitaire works.',
  },
  {
    id: 'easy',
    label: 'Easy',
    color: 'text-green-400',
    bgColor: 'bg-green-500/15',
    borderColor: 'border-green-500/20',
    description: 'Familiar mechanics with a thin layer of strategy. You will win often enough to stay engaged.',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/15',
    borderColor: 'border-amber-500/20',
    description: 'Real decisions that affect outcomes. Skill starts to separate winners from casual players.',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/15',
    borderColor: 'border-orange-500/20',
    description: 'Multiple constraints, deep calculation, and tight margins. These games demand attention and patience.',
  },
  {
    id: 'expert',
    label: 'Expert',
    color: 'text-red-400',
    bgColor: 'bg-red-500/15',
    borderColor: 'border-red-500/20',
    description: 'Punishing win rates, complex mechanics, or both. Only experienced solitaire players will enjoy these consistently.',
  },
];

/* -- FAQ data -- */

const faqs = [
  {
    question: 'What is the easiest solitaire game?',
    answer:
      'Clock Solitaire is the easiest to learn because it requires zero decisions. For a game that is both easy and satisfying, TriPeaks has a ~90% win rate and simple chain-matching rules that anyone can pick up immediately.',
  },
  {
    question: 'What is the hardest solitaire game?',
    answer:
      'Forty Thieves is widely considered the hardest mainstream solitaire game. It uses two decks, requires same-suit building, only allows single-card moves, and has a win rate around 10%. Scorpion and Flower Garden are close runners-up.',
  },
  {
    question: 'Which solitaire game requires the most skill?',
    answer:
      'FreeCell is the purest test of skill because all 52 cards are visible from the start, removing luck entirely. Nearly every deal is solvable, so losses are always the player\'s fault. Baker\'s Game and Seahaven Towers are similarly skill-dependent.',
  },
  {
    question: 'Does a high win rate mean a game is easy?',
    answer:
      'Not necessarily. Games like Eight Off (~90% win rate) and Penguin (~90%) have high win rates but demand careful planning and deep calculation. A high win rate combined with pure skill means the game rewards expertise, not that it plays itself.',
  },
  {
    question: 'What solitaire game should a beginner start with?',
    answer:
      'Start with Klondike (the classic) to learn basic solitaire mechanics. Then try TriPeaks for a faster, more forgiving experience. When you are ready for strategy, move to Easy FreeCell before graduating to full FreeCell.',
  },
  {
    question: 'Is FreeCell harder than Klondike?',
    answer:
      'FreeCell is strategically deeper but has a much higher win rate (~82% vs ~30%). Klondike is "harder" in the sense that luck frequently makes deals unwinnable. FreeCell is harder in the sense that every loss is a mistake you could have avoided.',
  },
  {
    question: 'What is the difference between difficulty and win rate?',
    answer:
      'Win rate measures how often you can finish a game successfully. Difficulty reflects the mental effort required. Clock Solitaire has a ~1% win rate but zero difficulty because you make no decisions. FreeCell has an ~82% win rate but is genuinely challenging because every move matters.',
  },
  {
    question: 'Are two-deck solitaire games harder than one-deck?',
    answer:
      'Generally yes. Two-deck games like Spider and Forty Thieves have more cards to manage, more duplicate ranks to track, and more ways for the board to lock up. Spider 4-suit and Forty Thieves are among the hardest solitaire games.',
  },
];

/* -- Page -- */

export default function SolitaireDifficultyRankingPage() {
  if (!isOwnedBy('/solitaire-difficulty-ranking', siteConfig.key)) {
    notFound();
  }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Every Solitaire Game Ranked by Difficulty: Easiest to Hardest',
      description:
        'A comprehensive ranking of 28 solitaire card games organized by difficulty tier, with win rates, skill-vs-luck analysis, and recommendations for every skill level.',
      author: { '@type': 'Organization', name: siteConfig.siteName },
      publisher: { '@type': 'Organization', name: siteConfig.siteName },
      datePublished: '2026-03-28',
      dateModified: '2026-03-28',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/solitaire-difficulty-ranking'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Solitaire Difficulty Ranking', item: absoluteUrl('/solitaire-difficulty-ranking') },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <ContentHero
        title="Every Solitaire Game Ranked by Difficulty"
        subtitle={
          <>
            28 solitaire games organized into five difficulty tiers, from
            zero-decision card flipping to two-deck brain burners. Win rates,
            skill-vs-luck ratings, and honest descriptions to help you pick
            your next game.
          </>
        }
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* Overview */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Ranking" id="overview">
            How We Ranked These Games
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Difficulty in solitaire is not just about win rates. A game with a 1% win rate
              can be trivially easy to play (Clock Solitaire requires zero decisions), while
              a game with a 90% win rate can demand deep calculation (Eight Off punishes
              sloppy play despite being almost always winnable).
            </p>
            <p>
              Our ranking considers three factors: <strong>how many meaningful decisions</strong> you
              make per game, <strong>how much those decisions affect the outcome</strong> (skill
              vs. luck), and <strong>how punishing mistakes are</strong>. Games where one wrong move
              can ruin an otherwise winnable deal rank higher in difficulty than games where
              luck decides everything.
            </p>
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-[#D4AF37] mb-1">28</div>
                <div className="text-sm text-white/60">Games Ranked</div>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-[#D4AF37] mb-1">5</div>
                <div className="text-sm text-white/60">Difficulty Tiers</div>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-[#D4AF37] mb-1">1-95%</div>
                <div className="text-sm text-white/60">Win Rate Range</div>
              </div>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Difficulty tiers */}
        {tiers.map((tier) => {
          const tierGames = games.filter((g) => g.tier === tier.id);
          return (
            <CardSection key={tier.id} id={`tier-${tier.id}`} variant="dark">
              <SectionHeading variant="dark" sub={`${tierGames.length} games`} id={`${tier.id}-heading`}>
                <span className={tier.color}>{tier.label}</span> Tier
              </SectionHeading>
              <ContentBody variant="dark">
                <p className="mb-6 text-white/70">{tier.description}</p>
                <div className="space-y-4">
                  {tierGames.map((game) => (
                    <div
                      key={game.rank}
                      className={`rounded-xl border ${tier.borderColor} ${tier.bgColor} p-5 sm:p-6 ${
                        game.href === '/' ? 'ring-2 ring-[#D4AF37]/40' : ''
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <h3 className="font-semibold text-white text-lg flex items-center gap-3">
                          <span className="text-sm font-bold text-white/40">#{game.rank}</span>
                          <Link href={game.href} className="hover:text-[#D4AF37] transition-colors">
                            {game.name}
                          </Link>
                          {game.href === '/' && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8B6914] bg-[#D4AF37]/15 px-2 py-0.5 rounded-full">
                              Our Game
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-white/50 shrink-0">
                          <span>Win: {game.winRate}</span>
                          <span className="text-white/20">|</span>
                          <span>{game.skillVsLuck}</span>
                          <span className="text-white/20">|</span>
                          <span>{game.decks === 1 ? '1 Deck' : '2 Decks'}</span>
                        </div>
                      </div>
                      <p className="text-white/70 leading-relaxed mb-3">{game.description}</p>
                      <div className="text-sm text-white/50 border-t border-white/[0.07] pt-3 mt-1">
                        <strong className="text-white/70">Key trait:</strong> {game.keyTrait}
                      </div>
                    </div>
                  ))}
                </div>
              </ContentBody>
            </CardSection>
          );
        })}

        <AdUnit className="-my-1" />

        {/* Comparison table */}
        <CardSection id="comparison" variant="dark">
          <SectionHeading variant="dark" sub="At a Glance" id="comparison-heading">
            Full Ranking Table
          </SectionHeading>
          <div className="px-4 sm:px-10 md:px-12 py-8 overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-white/10">
                  <th className="text-left py-3 px-2 text-white font-semibold">#</th>
                  <th className="text-left py-3 px-2 text-white font-semibold">Game</th>
                  <th className="text-center py-3 px-2 text-white font-semibold">Win Rate</th>
                  <th className="text-center py-3 px-2 text-white font-semibold">Skill vs Luck</th>
                  <th className="text-center py-3 px-2 text-white font-semibold">Tier</th>
                  <th className="text-center py-3 px-2 text-white font-semibold">Decks</th>
                </tr>
              </thead>
              <tbody>
                {games.map((g) => {
                  const tier = tiers.find((t) => t.id === g.tier)!;
                  return (
                    <tr
                      key={g.rank}
                      className={`border-b border-white/[0.05] ${g.href === '/' ? 'bg-[#D4AF37]/[0.06]' : ''}`}
                    >
                      <td className="py-2.5 px-2 text-white/40 font-medium">{g.rank}</td>
                      <td className="py-2.5 px-2">
                        <Link href={g.href} className="text-white font-medium hover:text-[#D4AF37] transition-colors">
                          {g.name}
                        </Link>
                      </td>
                      <td className="text-center py-2.5 px-2 text-white/60">{g.winRate}</td>
                      <td className="text-center py-2.5 px-2 text-white/60">{g.skillVsLuck}</td>
                      <td className="text-center py-2.5 px-2">
                        <span className={`${tier.color} text-xs font-medium`}>{tier.label}</span>
                      </td>
                      <td className="text-center py-2.5 px-2 text-white/60">{g.decks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardSection>

        {/* What makes a game difficult */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Understanding Difficulty" id="what-makes-difficult">
            What Makes a Solitaire Game Difficult?
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Not all difficulty is created equal. Some games are hard because of luck, others
              because of strategy, and a few because they combine both. Understanding what
              kind of difficulty a game offers helps you pick the right challenge.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Skill-based difficulty</h3>
                <p className="text-white/70 text-sm leading-7">
                  Games like FreeCell, Baker&apos;s Game, and Calculation give you complete or near-complete
                  information. The challenge is finding the right sequence of moves. Losses feel earned
                  because you can always trace them to a specific mistake.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Luck-based difficulty</h3>
                <p className="text-white/70 text-sm leading-7">
                  Games like Clock Solitaire, Accordion, and Canfield have outcomes largely determined
                  by the deal. You can play perfectly and still lose. The difficulty is in accepting
                  that some deals are simply unwinnable.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Number of decisions</h3>
                <p className="text-white/70 text-sm leading-7">
                  More decisions per game generally means more complexity. Clock Solitaire has
                  zero decisions. Klondike has a moderate number. Spider Solitaire can have
                  hundreds of meaningful choices across a single two-deck deal.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Error tolerance</h3>
                <p className="text-white/70 text-sm leading-7">
                  Some games forgive a few suboptimal moves. Others punish a single mistake with
                  a guaranteed loss. Beleaguered Castle and Forty Thieves have razor-thin margins
                  where one wasted move can lock the entire board.
                </p>
              </div>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* FAQ */}
        <CardSection id="faq" variant="dark">
          <SectionHeading variant="dark" sub="Common Questions" id="faq-heading">
            Solitaire Difficulty FAQ
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.question}>
                <h3 className="font-medium text-white text-lg mb-2">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                {index < faqs.length - 1 && <div className="mt-6 border-b border-white/[0.07]" />}
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* Related links */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Keep Exploring">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/solitaire-types" title="Solitaire Types" description="Explore 20 solitaire variants organized by category with full rules and strategy notes." />
            <ContentLinkCard href="/games" title="All Games" description="Browse the full collection and start playing any solitaire game instantly." />
            <ContentLinkCard href="/solitaire-for-beginners" title="Solitaire for Beginners" description="New to solitaire? Start here for a guided introduction to the basics." />
          </ContentBody>
        </CardSection>

        {/* CTA */}
        <CtaSection
          heading="Ready to Test Your Skill?"
          body="FreeCell is the ultimate skill-based solitaire game. No luck, no hidden cards. Just you against 52 face-up cards."
          primaryLabel="Play FreeCell Now"
          secondaryLabel="Learn the Rules"
          secondaryHref="/how-to-play"
        />
      </main>
    </ContentLayout>
  );
}
