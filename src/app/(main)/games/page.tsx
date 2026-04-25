import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Free Solitaire Games Online | Play 28+ Card Games for Free",
  description:
    "Play the best free solitaire games online — FreeCell, Spider Solitaire, Klondike, Pyramid, Baker's Game, Eight Off, and more. No download, no sign-up. Choose your game and start playing instantly.",
  keywords: [
    "solitaire games online free",
    "free card games online",
    "play solitaire online",
    "free solitaire games",
    "online solitaire collection",
    "solitaire card games",
    "freecell online",
    "spider solitaire online",
    "klondike solitaire free",
    "pyramid solitaire online",
    "card games no download",
    "best solitaire games",
  ],
  openGraph: {
    title: "Free Solitaire Games Online | 28+ Card Games to Play Now",
    description:
      "FreeCell, Spider, Klondike, Pyramid, and more — all free, no download required. Pick a game and start playing.",
    url: absoluteUrl("/games"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: canonicalUrlFor("/games"),
  },
};

const games = [
  {
    name: "FreeCell",
    href: "/",
    emoji: "♠",
    difficulty: "Medium",
    difficultyColor: "text-amber-400",
    description:
      "The classic strategic solitaire game. Use four free cells as temporary storage to move cards between eight cascading columns. Build foundation piles from Ace to King by suit.",
    stats: "Win rate: ~82% · 4 free cells · 8 columns",
    winRate: "~82%",
    columns: 8,
    freeCells: 4,
    stackingRule: "Alternating color",
  },
  {
    name: "Baker's Game",
    href: "/bakers-game",
    emoji: "♦",
    difficulty: "Hard",
    difficultyColor: "text-red-400",
    description:
      "FreeCell's tougher cousin. Same layout, same four free cells — but you must build tableau columns by suit instead of alternating colors. Far fewer moves are available at any given time.",
    stats: "Win rate: ~75% · Same-suit stacking · 4 free cells",
    winRate: "~75%",
    columns: 8,
    freeCells: 4,
    stackingRule: "Same suit",
  },
  {
    name: "Eight Off",
    href: "/eight-off",
    emoji: "♣",
    difficulty: "Hard",
    difficultyColor: "text-red-400",
    description:
      "Eight free cells instead of four — but you need them, because stacking is same-suit only. The unique layout deals cards into eight columns of six, with four cards going directly to the reserve.",
    stats: "Win rate: ~70% · 8 free cells · Same-suit stacking",
    winRate: "~70%",
    columns: 8,
    freeCells: 8,
    stackingRule: "Same suit",
  },
  {
    name: "Spider Solitaire",
    href: "/spider",
    emoji: "🕷",
    difficulty: "Easy–Hard",
    difficultyColor: "text-amber-400",
    description:
      "Build complete King-to-Ace sequences in suit across ten columns. Choose 1-suit (beginner), 2-suit (intermediate), or 4-suit (expert) mode. One of the most popular solitaire games ever made.",
    stats: "1-suit: ~90% · 2-suit: ~50% · 4-suit: ~33%",
    winRate: "33–90%",
    columns: 10,
    freeCells: 0,
    stackingRule: "Any (in-suit to move)",
  },
  {
    name: "Klondike Solitaire",
    href: "/klondike",
    emoji: "♥",
    difficulty: "Medium",
    difficultyColor: "text-amber-400",
    description:
      "The game most people call \"Solitaire.\" Deal from a stock pile onto seven cascading columns, building down in alternating colors. Move Aces to foundations and work up to Kings. Draw 1 or Draw 3 modes.",
    stats: "Draw 1: ~82% · Draw 3: ~62% · 7 columns",
    winRate: "62–82%",
    columns: 7,
    freeCells: 0,
    stackingRule: "Alternating color",
  },
  {
    name: "Pyramid Solitaire",
    href: "/pyramid",
    emoji: "🔺",
    difficulty: "Hard",
    difficultyColor: "text-red-400",
    description:
      "A completely different solitaire experience. Cards are dealt in a pyramid shape — pair exposed cards that add up to 13 to remove them. Kings are removed solo. Clear the entire pyramid to win.",
    stats: "Win rate: ~30% · Pair-matching · 28-card pyramid",
    winRate: "~30%",
    columns: 7,
    freeCells: 0,
    stackingRule: "Pair to 13",
  },
  {
    name: "TriPeaks Solitaire",
    href: "/tripeaks",
    emoji: "⛰",
    difficulty: "Medium",
    difficultyColor: "text-amber-400",
    description:
      "Clear three overlapping peaks by moving cards that are ±1 rank from the waste pile top. Kings wrap to Aces and vice versa. Build streaks of consecutive moves for bonus points — the longer your streak, the higher your score.",
    stats: "Win rate: ~90% · Streak scoring · 3 peaks",
    winRate: "~90%",
    columns: 10,
    freeCells: 0,
    stackingRule: "±1 rank (wrapping)",
  },
  {
    name: "Golf Solitaire",
    href: "/golf",
    emoji: "⛳",
    difficulty: "Easy–Medium",
    difficultyColor: "text-emerald-400",
    description:
      "The fastest solitaire game — clear seven columns by playing cards ±1 rank to the waste pile. Lower score is better, just like the sport. Wrapping enabled (K↔A). Quick games, streak scoring, and satisfying chain reactions.",
    stats: "Win rate: ~90% · Streak scoring · 7 columns × 5 cards",
    winRate: "~90%",
    columns: 7,
    freeCells: 0,
    stackingRule: "±1 rank (wrapping)",
  },
  {
    name: "Yukon Solitaire",
    href: "/yukon",
    emoji: "🏔",
    difficulty: "Medium–Hard",
    difficultyColor: "text-amber-400",
    description:
      "A Klondike variant where all 52 cards are dealt and any face-up card can be moved regardless of sequence. No stock pile — every card is in play from the start. Deep strategy required.",
    stats: "Win rate: ~30% · No stock pile · 7 columns",
    winRate: "~30%",
    columns: 7,
    freeCells: 0,
    stackingRule: "Alternating color",
  },
  {
    name: "Canfield Solitaire",
    href: "/canfield",
    emoji: "🎰",
    difficulty: "Hard",
    difficultyColor: "text-red-400",
    description:
      "A casino-origin solitaire game where foundations build up from a randomly determined base rank with wrapping. Features a 13-card reserve pile, four compact tableau columns, and draw-three stock with unlimited redeals.",
    stats: "Win rate: ~10% · Random base rank · 4 columns + reserve",
    winRate: "~10%",
    columns: 4,
    freeCells: 0,
    stackingRule: "Alternating color (wrapping)",
  },
  {
    name: "Forty Thieves",
    href: "/forty-thieves",
    emoji: "🏴‍☠️",
    difficulty: "Very Hard",
    difficultyColor: "text-red-400",
    description:
      "Two decks, ten columns, same-suit building, and single-card moves only. Also known as Napoleon at St. Helena. One of the hardest solitaire games with a win rate around 10%.",
    stats: "Win rate: ~10% · 2 decks · 10 columns · Same-suit stacking",
    winRate: "~10%",
    columns: 10,
    freeCells: 0,
    stackingRule: "Same suit",
  },
  {
    name: "Scorpion Solitaire",
    href: "/scorpion",
    emoji: "🦂",
    difficulty: "Hard",
    difficultyColor: "text-orange-400",
    description:
      "Move any face-up card and everything below it — no sequence required. Build same-suit runs from King to Ace. Completed runs vanish from the tableau.",
    stats: "Win rate: ~50% · 1 deck · 7 columns · Same-suit stacking",
    winRate: "~50%",
    columns: 7,
    freeCells: 0,
    stackingRule: "Same suit",
  },
  {
    name: "Seahaven Towers",
    href: "/seahaven",
    emoji: "\u{1f3f0}",
    difficulty: "Hard",
    difficultyColor: "text-red-400",
    description:
      "Same-suit stacking with 10 columns and 4 free cells (2 start occupied). Single-card moves only, Kings-only empty columns. A precise, deeply strategic FreeCell relative.",
    stats: "Win rate: ~85\u201390% \u00b7 1 deck \u00b7 10 columns \u00b7 4 free cells",
    winRate: "~85\u201390%",
    columns: 10,
    freeCells: 4,
    stackingRule: "Same suit",
  },
  {
    name: "Beleaguered Castle",
    href: "/beleaguered-castle",
    emoji: "\u{1f3f0}",
    difficulty: "Very Hard",
    difficultyColor: "text-red-500",
    description:
      "Zero free cells. Aces pre-placed on foundations, 48 cards in 8 cascades. Build up by suit with descending-rank stacking regardless of suit. One of the hardest single-deck solitaire games.",
    stats: "Win rate: ~25% \u00b7 1 deck \u00b7 8 columns \u00b7 0 free cells",
    winRate: "~25%",
    columns: 8,
    freeCells: 0,
    stackingRule: "Down, any suit",
  },
  {
    name: "Penguin Solitaire",
    href: "/penguin",
    emoji: "\uD83D\uDC27",
    difficulty: "Medium",
    difficultyColor: "text-amber-400",
    description:
      "A random beak card sets the foundation base rank for all four suits. Build up by suit with wrapping (K\u2192A\u21922), build tableau down by same suit, and manage a single flipper cell. Every deal is unique.",
    stats: "Win rate: ~90\u201395% \u00b7 1 deck \u00b7 7 columns \u00b7 1 flipper cell",
    winRate: "~90\u201395%",
    columns: 7,
    freeCells: 1,
    stackingRule: "Same suit (wrapping)",
  },
  {
    name: "Cruel Solitaire",
    href: "/cruel",
    emoji: "\u267B",
    difficulty: "Hard",
    difficultyColor: "text-red-400",
    description:
      "12 piles of 4 cards, same-suit building, and a unique redeal mechanic. Gather all tableau cards and re-deal in groups of 4 without shuffling. Aces pre-placed, unlimited redeals.",
    stats: "Win rate: ~25\u201330% \u00b7 1 deck \u00b7 12 piles \u00b7 Unlimited redeals",
    winRate: "~25\u201330%",
    columns: 12,
    freeCells: 0,
    stackingRule: "Same suit",
  },
  {
    name: "Clock Solitaire",
    href: "/clock",
    emoji: "\u{1f552}",
    difficulty: "Luck",
    difficultyColor: "text-sky-400",
    description:
      "Deal 52 cards face-down into a clock face. Flip cards and place them under matching rank piles. No decisions — pure chance with a ~1% win rate. One of the oldest patience games.",
    stats: "Win rate: ~1% \u00b7 1 deck \u00b7 13 piles \u00b7 No decisions",
    winRate: "~1%",
    columns: 13,
    freeCells: 0,
    stackingRule: "None (auto-placed)",
  },
  {
    name: "Accordion Solitaire",
    href: "/accordion",
    emoji: "\uD83C\uDFB5",
    difficulty: "Very Hard",
    difficultyColor: "text-red-500",
    description:
      "52 cards in a row. Move cards onto their left neighbor (1 or 3 positions) when they match by rank or suit. Compress the entire row into a single pile to win. One of the hardest solitaire games at ~1-2% win rate.",
    stats: "Win rate: ~1\u20132% \u00b7 1 deck \u00b7 52 positions \u00b7 Rank or suit matching",
    winRate: "~1\u20132%",
    columns: 52,
    freeCells: 0,
    stackingRule: "Rank or suit match",
  },
  {
    name: "La Belle Lucie",
    href: "/la-belle-lucie",
    emoji: "\uD83C\uDF3C",
    difficulty: "Hard",
    difficultyColor: "text-orange-500",
    description:
      "52 cards dealt into 18 fans of 3 (plus 1 of 1). Same-suit descending stacking, top card only. 2 shuffled redeals allowed. On the final deal, the Merci rule lets you draw one buried card. An elegant classic.",
    stats: "Win rate: ~15\u201320% \u00b7 1 deck \u00b7 18 fans \u00b7 Same suit descending",
    winRate: "~15\u201320%",
    columns: 18,
    freeCells: 0,
    stackingRule: "Same suit descending",
  },
  {
    name: "Bisley Solitaire",
    href: "/bisley",
    emoji: "\u2195\uFE0F",
    difficulty: "Medium",
    difficultyColor: "text-yellow-400",
    description:
      "Dual-direction foundations \u2014 aces build up while kings build down, meeting in the middle. 48 cards dealt into 13 columns with flexible same-suit up-or-down stacking. Only top cards move, empty columns stay empty. A rewarding patience game.",
    stats: "Win rate: ~70\u201380% \u00b7 1 deck \u00b7 13 columns \u00b7 Same suit up/down",
    winRate: "~70\u201380%",
    columns: 13,
    freeCells: 0,
    stackingRule: "Same suit up or down",
  },
  {
    name: "Baker's Dozen",
    href: "/bakers-dozen",
    emoji: "🃏",
    difficulty: "Medium",
    difficultyColor: "text-yellow-400",
    description:
      "All 52 cards dealt face-up into 13 columns of 4. Kings are moved to the bottom of their columns before play begins. Build down regardless of suit, single cards only. Empty columns can't be filled. A classic patience game with perfect information.",
    stats: "Win rate: ~65\u201375% \u00b7 1 deck \u00b7 13 columns \u00b7 Any suit descending",
    winRate: "~65\u201375%",
    columns: 13,
    freeCells: 0,
    stackingRule: "Any suit descending",
  },
  {
    name: "Gaps (Montana)",
    href: "/gaps",
    emoji: "🔲",
    difficulty: "Hard",
    difficultyColor: "text-red-400",
    description:
      "All 52 cards dealt face-up into a 4×13 grid. Remove the Aces to create gaps, then slide cards into gaps — each must be one rank higher and the same suit as the card to its left. 2 redeals allowed. A challenging grid-based patience puzzle.",
    stats: "Win rate: ~10\u201320% \u00b7 1 deck \u00b7 4×13 grid \u00b7 Same suit ascending",
    winRate: "~10\u201320%",
    columns: 13,
    freeCells: 0,
    stackingRule: "Same suit ascending",
  },
  {
    name: "Calculation",
    href: "/calculation",
    emoji: "🔢",
    difficulty: "Medium",
    difficultyColor: "text-yellow-400",
    description:
      "A math-based solitaire where suit doesn't matter — only rank. Build four foundations using counting intervals of 1, 2, 3, and 4, wrapping around from King to Ace. Strategic waste pile management is the key to winning.",
    stats: "Win rate: ~30\u201340% \u00b7 1 deck \u00b7 4 foundations \u00b7 Rank only (no suit)",
    winRate: "~30\u201340%",
    columns: 4,
    freeCells: 0,
    stackingRule: "Rank only (intervals)",
  },
  {
    name: "Easy FreeCell",
    href: "/easy-freecell",
    emoji: "🌟",
    difficulty: "Easy",
    difficultyColor: "text-emerald-400",
    description:
      "Perfect for beginners. Aces and 2s are pre-placed on the foundations, giving you a massive head start. Learn FreeCell fundamentals without the frustration of getting stuck early.",
    stats: "Win rate: ~95% · Pre-placed aces/2s · Beginner-friendly",
    winRate: "~95%",
    columns: 8,
    freeCells: 4,
    stackingRule: "Alternating color",
  },
  {
    name: "Monte Carlo",
    href: "/monte-carlo",
    emoji: "🎲",
    difficulty: "Easy",
    difficultyColor: "text-emerald-400",
    description:
      "A pair-matching patience game on a 5×5 grid. Remove pairs of equal-rank cards that touch horizontally, vertically, or diagonally. When you stall, consolidate the layout and deal fresh cards. Clear all 52 to win.",
    stats: "Win rate: ~50% · 1 deck · 5×5 grid · Pair to same rank",
    winRate: "~50%",
    columns: 5,
    freeCells: 0,
    stackingRule: "Match same rank",
  },
  {
    name: "Aces Up",
    href: "/aces-up",
    emoji: "🅰️",
    difficulty: "Hard",
    difficultyColor: "text-red-400",
    description:
      "Also known as Idiot's Delight. Deal four cards at a time onto four piles and remove the lower-ranked card whenever two same-suit cards share the top. Win by reducing the deck to just four Aces. Pure tactical discarding — no foundations, no stacking.",
    stats: "Win rate: ~10% · 1 deck · 4 piles · Discard same-suit lows",
    winRate: "~10%",
    columns: 4,
    freeCells: 0,
    stackingRule: "Discard lower same-suit",
  },
  {
    name: "Bristol",
    href: "/bristol",
    emoji: "🌉",
    difficulty: "Medium",
    difficultyColor: "text-amber-400",
    description:
      "Eight fans of three cards plus three reserve piles. Build foundations Ace through King by suit, with tableau building down by any suit. Kings can never move from the tableau to another column. A flexible single-deck patience that rewards careful sequencing.",
    stats: "Win rate: ~25–35% · 1 deck · 8 fans + 3 reserves · Down, any suit",
    winRate: "~25–35%",
    columns: 8,
    freeCells: 3,
    stackingRule: "Down, any suit",
  },
  {
    name: "Flower Garden",
    href: "/flower-garden",
    emoji: "🌷",
    difficulty: "Medium",
    difficultyColor: "text-amber-400",
    description:
      "A 16-card open reserve called the bouquet — every reserve card is playable any time — paired with six tableau columns. Build foundations up by suit and tableau down regardless of suit. Empty columns can be filled with any card. Strategic and forgiving.",
    stats: "Win rate: ~70–80% · 1 deck · 6 columns · 16-card reserve",
    winRate: "~70–80%",
    columns: 6,
    freeCells: 16,
    stackingRule: "Down, any suit",
  },
];

const faqs = [
  {
    question: "Which solitaire game is easiest for beginners?",
    answer:
      "Easy FreeCell is the most beginner-friendly option — aces and 2s are pre-placed on the foundations, so you start with a head start. Klondike (Draw 1) is also a gentle introduction, and 1-suit Spider Solitaire is forgiving because every build is automatically in suit. If you're brand new to solitaire, start with Easy FreeCell and graduate to standard FreeCell once you're winning consistently.",
  },
  {
    question: "What is the hardest solitaire game?",
    answer:
      "4-suit Spider Solitaire and Baker's Game are the hardest games in our collection. 4-suit Spider has a win rate around 33% even for experienced players, while Baker's Game's same-suit stacking rule makes it significantly harder than FreeCell despite sharing the same layout. Pyramid Solitaire is also challenging because many deals are mathematically unsolvable.",
  },
  {
    question: "Are these solitaire games really free?",
    answer:
      "Yes, every game on this site is 100% free to play. No download, no sign-up, no hidden fees. Just pick a game and start playing in your browser. The site is supported by ads, which is what keeps everything free.",
  },
  {
    question: "Can I play these solitaire games on my phone?",
    answer:
      "Yes. Every game is fully responsive and works on phones, tablets, and desktop browsers. The games auto-detect your screen size and adjust the layout accordingly. No app install is needed — just open the site in your mobile browser.",
  },
  {
    question: "What's the difference between FreeCell and Klondike?",
    answer:
      "FreeCell deals all 52 cards face-up, so there's no hidden information — every game is a pure puzzle of skill. Klondike starts with most cards face-down, so luck plays a bigger role in which cards you can access. FreeCell has a higher skill ceiling, while Klondike is more familiar to casual players. Both use alternating-color stacking.",
  },
  {
    question: "Do I need to create an account to play?",
    answer:
      "No account is needed. You can play every game immediately without signing up. Your statistics and progress are saved locally in your browser, so they persist between sessions on the same device without requiring any login.",
  },
];

export default function GamesPage() {
  if (!isOwnedBy("/games", siteConfig.key)) {
    notFound();
  }

  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Games", item: absoluteUrl("/games") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Free Solitaire Games Online",
        description: "Play 13+ free solitaire card games online — FreeCell, Spider, Klondike, Pyramid, TriPeaks, Golf, and more.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-19",
        dateModified: "2026-03-19",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />

      <ContentHero
        title="Free Solitaire Games Online"
        kicker={<>All Games</>}
        subtitle="Thirteen playable solitaire games plus competitive modes — all free, no download required. From beginner-friendly Easy FreeCell to the brutal 4-suit Spider challenge."
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />

      {/* Intro */}
      <div className="max-w-3xl mx-auto mb-10">
        <p className="text-white/70 leading-relaxed mb-4">
          Whether you&apos;re a solitaire veteran or picking up cards for the first time,
          we&apos;ve got a game for you. Each game below is playable right in your browser
          with full undo, auto-complete, keyboard shortcuts, and mobile support. Pick a
          game, learn the rules, and start playing — no account required.
        </p>
      </div>

      {/* Game Cards Grid */}
      <section className="max-w-5xl mx-auto mb-12 px-2">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6 text-center"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Choose Your Game
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <Link
              key={game.name}
              href={game.href}
              className="group bg-white/[0.04] border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl" role="img" aria-label={game.name}>
                  {game.emoji}
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider ${game.difficultyColor}`}>
                  {game.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--gold)] transition-colors">
                {game.name}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                {game.description}
              </p>
              <p className="text-white/40 text-xs font-mono">
                {game.stats}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Game Modes */}
      <section className="max-w-3xl mx-auto mb-12">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Competitive Game Modes
        </h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Beyond the core games, we offer competitive modes that add time pressure,
          streaks, and daily challenges to the classic FreeCell experience.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2">
              <Link href="/streak" className="hover:text-[var(--gold)] transition-colors">
                ⚡ Streak Mode
              </Link>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Win consecutive games to build your streak. One loss and you&apos;re back
              to zero. How many can you chain together?
            </p>
          </div>
          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2">
              <Link href="/storm" className="hover:text-[var(--gold)] transition-colors">
                🌪 Storm Mode
              </Link>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Race the clock to complete as many games as possible. Speed and accuracy
              both matter — every second and every move counts.
            </p>
          </div>
          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2">
              <Link href="/daily-freecell" className="hover:text-[var(--gold)] transition-colors">
                📅 Daily Challenge
              </Link>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              A new deal every day, same for everyone. Compare your solve time and move
              count with players worldwide on the{" "}
              <Link href="/leaderboard" className="text-[var(--gold)] hover:text-white transition-colors">
                leaderboard
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-5xl mx-auto mb-12 px-2">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Game Comparison Table
        </h2>
        <p className="text-white/70 leading-relaxed mb-6 max-w-3xl">
          Not sure which game to try? This side-by-side comparison shows the key
          differences between every solitaire game on the site.
        </p>
        <div className="overflow-x-auto">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden min-w-[640px]">
            <div className="grid grid-cols-6 text-xs font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
              <span>Game</span>
              <span>Columns</span>
              <span>Free Cells</span>
              <span>Stacking</span>
              <span>Win Rate</span>
              <span>Difficulty</span>
            </div>
            {games.map((game, i) => (
              <div
                key={game.name}
                className={`grid grid-cols-6 text-white/70 text-sm px-4 py-3 ${
                  i < games.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <Link href={game.href} className="text-white font-semibold hover:text-[var(--gold)] transition-colors">
                  {game.name}
                </Link>
                <span>{game.columns}</span>
                <span>{game.freeCells || "—"}</span>
                <span className="text-white/50">{game.stackingRule}</span>
                <span>{game.winRate}</span>
                <span className={game.difficultyColor}>{game.difficulty}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Which Game Should You Play */}
      <section className="max-w-3xl mx-auto mb-12">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Which Solitaire Game Should You Play?
        </h2>
        <p className="text-white/70 leading-relaxed mb-6">
          The best game for you depends on what you&apos;re looking for. Here are our
          recommendations based on experience level and play style.
        </p>

        <div className="space-y-4">
          <div className="bg-emerald-900/10 border border-emerald-500/15 rounded-xl p-5">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              Brand New to Solitaire
            </h3>
            <p className="text-white/70 leading-relaxed">
              Start with <Link href="/easy-freecell" className="text-emerald-400 hover:text-white transition-colors font-semibold">Easy FreeCell</Link> or{" "}
              <Link href="/klondike" className="text-emerald-400 hover:text-white transition-colors font-semibold">Klondike (Draw 1)</Link>.
              Easy FreeCell removes the early-game struggle by pre-placing low cards on
              the foundations. Klondike is the most familiar solitaire game — if you&apos;ve ever
              played &ldquo;Solitaire&rdquo; on a computer, this is the one. Both games teach
              core solitaire concepts without overwhelming you.
            </p>
          </div>

          <div className="bg-amber-900/10 border border-amber-500/15 rounded-xl p-5">
            <h3 className="text-lg font-bold text-amber-400 mb-2">
              Comfortable With Solitaire
            </h3>
            <p className="text-white/70 leading-relaxed">
              Move to <Link href="/" className="text-amber-400 hover:text-white transition-colors font-semibold">FreeCell</Link> or{" "}
              <Link href="/spider" className="text-amber-400 hover:text-white transition-colors font-semibold">2-suit Spider</Link>.
              Standard FreeCell is a pure skill game — all cards face-up, no luck involved.
              It&apos;s the gold standard of strategic solitaire. Two-suit Spider adds the
              challenge of managing mixed-suit builds while still being approachable.
            </p>
          </div>

          <div className="bg-red-900/10 border border-red-500/15 rounded-xl p-5">
            <h3 className="text-lg font-bold text-red-400 mb-2">
              Looking for a Serious Challenge
            </h3>
            <p className="text-white/70 leading-relaxed">
              Try <Link href="/bakers-game" className="text-red-400 hover:text-white transition-colors font-semibold">Baker&apos;s Game</Link>,{" "}
              <Link href="/eight-off" className="text-red-400 hover:text-white transition-colors font-semibold">Eight Off</Link>, or{" "}
              <Link href="/spider" className="text-red-400 hover:text-white transition-colors font-semibold">4-suit Spider</Link>.
              Baker&apos;s Game uses the FreeCell layout but requires same-suit stacking, making
              it dramatically harder. Eight Off gives you double the free cells but the same
              suit restriction. Four-suit Spider is arguably the hardest mainstream solitaire
              game — a 33% win rate is genuinely impressive.
            </p>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/15 rounded-xl p-5">
            <h3 className="text-lg font-bold text-purple-400 mb-2">
              Want Something Different
            </h3>
            <p className="text-white/70 leading-relaxed">
              <Link href="/pyramid" className="text-purple-400 hover:text-white transition-colors font-semibold">Pyramid Solitaire</Link> breaks
              the mold entirely. Instead of stacking cards, you pair them to total 13. The
              pyramid layout, the matching mechanic, and the stock pile management are all
              unlike any other solitaire game. It&apos;s a refreshing change of pace if
              you&apos;ve been playing column-based games exclusively.
            </p>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Improve Your Game">Learn to Play</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/how-to-play" title="How to Play FreeCell" description="Complete rules and setup for the classic game." />
            <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Expert strategies to win more games." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and their rules." />
          </ContentBody>
        </CardSection>
      </div>

      {/* Game-Specific Guides */}
      <section className="max-w-3xl mx-auto mb-10">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Guides by Game
        </h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Each game has dedicated strategy guides, tips, and rules pages to help you
          master the specific mechanics and improve your win rate.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Practical tips to win more FreeCell games" />
          <ContentLinkCard href="/spider/tips" title="Spider Tips" description="Tips for 1-suit, 2-suit, and 4-suit modes" />
          <ContentLinkCard href="/pyramid/tips" title="Pyramid Tips" description="Pair-matching strategy and stock pile management" />
          <ContentLinkCard href="/klondike/tips" title="Klondike Tips" description="Tips for Draw 1 and Draw 3 Klondike" />
          <ContentLinkCard href="/spider/strategy" title="Spider Strategy" description="Advanced Spider Solitaire techniques" />
          <ContentLinkCard href="/pyramid/strategy" title="Pyramid Strategy" description="Expert-level Pyramid Solitaire play" />
          <ContentLinkCard href="/bakers-game/strategy" title="Baker's Game Strategy" description="Same-suit stacking tactics and planning" />
          <ContentLinkCard href="/eight-off/strategy" title="Eight Off Strategy" description="Managing 8 free cells effectively" />
        </div>
      </section>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Play?"
          body="Pick any game above and start playing for free — no download, no sign-up, just cards."
          primaryLabel="Play FreeCell"
          primaryHref="/"
          secondaryLabel="Try Spider Solitaire"
          secondaryHref="/spider"
        />
      </div>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* FAQ */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="px-5 py-4 cursor-pointer text-white/90 font-semibold hover:text-[var(--gold)] transition-colors list-none flex items-center justify-between">
                {faq.question}
                <span className="text-white/30 group-open:rotate-180 transition-transform ml-2">
                  ▾
                </span>
              </summary>
              <div className="px-5 pb-4 text-white/60 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </ContentLayout>
  );
}
