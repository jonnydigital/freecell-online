import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title: "FreeCell Glossary | Card Game Terms & Definitions",
  description:
    "Complete glossary of FreeCell and Solitaire terms. Learn what tableau, cascade, foundation, free cell, stock, waste pile, and more mean.",
  keywords: [
    "freecell glossary",
    "solitaire terms",
    "card game terminology",
    "tableau definition",
    "cascade cards",
    "foundation pile",
    "free cell meaning",
    "solitaire glossary",
  ],
  openGraph: {
    title: "FreeCell Glossary | Card Game Terms & Definitions",
    description:
      "Complete glossary of FreeCell and Solitaire card game terms with clear definitions.",
    url: absoluteUrl('/glossary'),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/* ── Glossary data ── */

interface Term {
  term: string;
  id: string;
  definition: React.ReactNode;
}

const GLOSSARY: Term[] = [
  {
    term: "Ascending Order",
    id: "ascending-order",
    definition: (
      <>
        Cards arranged from lowest to highest rank: Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King.{" "}
        <Link href="/how-to-play" className="text-[#8B6914] hover:underline">Foundation piles</Link> are always built in ascending order, starting with the Ace and ending with the King.
      </>
    ),
  },
  {
    term: "Auto-Complete",
    id: "auto-complete",
    definition: (
      <>
        A feature that automatically moves cards to the foundation piles when no other useful moves remain. In our game, auto-complete activates when all remaining cards can be sent to the foundations in sequence. It saves you from clicking through the final moves of an already-won game.
      </>
    ),
  },
  {
    term: "Build (Building)",
    id: "build",
    definition: (
      <>
        The act of placing cards on top of each other in a valid sequence. In FreeCell, you build <em>down</em> by alternating colors in the tableau (e.g., a black 7 on a red 8) and <em>up</em> by suit on the{" "}
        <Link href="/how-to-play" className="text-[#8B6914] hover:underline">foundations</Link>. Building efficiently is the core of{" "}
        <Link href="/strategy" className="text-[#8B6914] hover:underline">FreeCell strategy</Link>.
      </>
    ),
  },
  {
    term: "Cascade",
    id: "cascade",
    definition: (
      <>
        The overlapping column of face-up cards in the tableau. FreeCell starts with eight cascades. Only the bottom (exposed) card of each cascade can be moved individually, though{" "}
        <a href="#supermove" className="text-[#8B6914] hover:underline">supermoves</a> allow moving ordered sequences if enough empty spaces exist.
      </>
    ),
  },
  {
    term: "Column",
    id: "column",
    definition: (
      <>
        Another name for a <a href="#cascade" className="text-[#8B6914] hover:underline">cascade</a>. FreeCell has eight columns where cards are dealt at the start of the game. An empty column is extremely valuable — it functions like an extra free cell that can hold an entire sequence of cards. See our{" "}
        <Link href="/strategy" className="text-[#8B6914] hover:underline">strategy guide</Link> for tips on using empty columns.
      </>
    ),
  },
  {
    term: "Daily Challenge",
    id: "daily-challenge",
    definition: (
      <>
        A specific FreeCell deal that changes every day and is the same for all players. Daily challenges let you compete with others on the same board, track your streak, and compare solve times. Try today&apos;s{" "}
        <Link href="/" className="text-[#8B6914] hover:underline">daily challenge</Link> and see how you stack up.
      </>
    ),
  },
  {
    term: "Deal",
    id: "deal",
    definition: (
      <>
        The initial layout of cards on the board. In FreeCell, all 52 cards are dealt face-up into eight columns at the start — there are no hidden cards. Each unique deal is identified by a{" "}
        <a href="#game-number" className="text-[#8B6914] hover:underline">game number</a> (seed). Nearly all FreeCell deals are solvable, with only a handful of exceptions among the classic 32,000 deals.
      </>
    ),
  },
  {
    term: "Descending Order",
    id: "descending-order",
    definition: (
      <>
        Cards arranged from highest to lowest rank: King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3, 2, Ace. In FreeCell&apos;s tableau, you build cascades in descending order with alternating colors.
      </>
    ),
  },
  {
    term: "Foundation",
    id: "foundation",
    definition: (
      <>
        The four piles in the upper-right corner where you build each suit in ascending order from Ace to King. Moving all 52 cards to the foundations is the goal of the game. Also called{" "}
        <a href="#home-cell" className="text-[#8B6914] hover:underline">home cells</a>. Learn the basics in our{" "}
        <Link href="/how-to-play" className="text-[#8B6914] hover:underline">how to play guide</Link>.
      </>
    ),
  },
  {
    term: "Free Cell",
    id: "free-cell",
    definition: (
      <>
        One of four temporary storage spaces in the upper-left corner of the board. Each free cell can hold exactly one card at a time. Free cells give FreeCell its name and its unique strategic depth — they&apos;re your most valuable resource. Keeping them empty is{" "}
        <Link href="/strategy" className="text-[#8B6914] hover:underline">strategy tip #1</Link> for beginners.
      </>
    ),
  },
  {
    term: "Game Number (Seed)",
    id: "game-number",
    definition: (
      <>
        A unique number that identifies a specific card arrangement. Entering the same game number always produces the same deal, making it possible to share challenges, replay boards, and compare strategies with other players. See also{" "}
        <a href="#seed" className="text-[#8B6914] hover:underline">seed</a>.
      </>
    ),
  },
  {
    term: "Hint",
    id: "hint",
    definition: (
      <>
        An in-game feature that suggests a good next move when you&apos;re stuck. Our hint system uses a heuristic solver to find productive moves — it won&apos;t just show any legal move, it tries to show a <em>useful</em> one. Using hints is a great way to learn{" "}
        <Link href="/strategy" className="text-[#8B6914] hover:underline">strategy patterns</Link>.
      </>
    ),
  },
  {
    term: "Home Cell",
    id: "home-cell",
    definition: (
      <>
        Another name for a <a href="#foundation" className="text-[#8B6914] hover:underline">foundation</a> pile. The term &quot;home cell&quot; emphasizes that these piles are where cards ultimately belong — their &quot;home.&quot; Used interchangeably with foundation in most FreeCell documentation.
      </>
    ),
  },
  {
    term: "In-Suit Sequence",
    id: "in-suit-sequence",
    definition: (
      <>
        A run of cards that are both in order and share the same suit (e.g., 9♠ 8♠ 7♠). In-suit sequences are more valuable than mixed-color sequences because they can move directly to the{" "}
        <a href="#foundation" className="text-[#8B6914] hover:underline">foundation</a> without being taken apart. Building in-suit when possible is an{" "}
        <Link href="/strategy#intermediate" className="text-[#8B6914] hover:underline">intermediate strategy</Link>.
      </>
    ),
  },
  {
    term: "Move",
    id: "move",
    definition: (
      <>
        The act of transferring one or more cards from one location to another. In FreeCell, valid moves include: placing a card on a cascade (descending, alternating color), moving a card to a free cell, moving a card to a foundation, or using a{" "}
        <a href="#supermove" className="text-[#8B6914] hover:underline">supermove</a> to transfer a sequence. Your total move count is tracked as a measure of efficiency.
      </>
    ),
  },
  {
    term: "Pile",
    id: "pile",
    definition: (
      <>
        A general term for any stack of cards on the board. In FreeCell, you work with three types of piles: <a href="#cascade" className="text-[#8B6914] hover:underline">cascades</a> (the main columns), <a href="#foundation" className="text-[#8B6914] hover:underline">foundations</a> (the goal piles), and <a href="#free-cell" className="text-[#8B6914] hover:underline">free cells</a> (single-card temporary storage).
      </>
    ),
  },
  {
    term: "Rank",
    id: "rank",
    definition: (
      <>
        The value of a card: Ace (low), 2 through 10, Jack, Queen, King (high). Rank determines where a card can be placed — cascades are built by descending rank, foundations by ascending rank. There are 13 ranks in a standard deck, with four cards of each rank (one per suit).
      </>
    ),
  },
  {
    term: "Seed",
    id: "seed",
    definition: (
      <>
        See <a href="#game-number" className="text-[#8B6914] hover:underline">Game Number</a>. The seed is the number used by the random number generator to produce a specific deal. Same seed always equals the same card layout.
      </>
    ),
  },
  {
    term: "Sequence",
    id: "sequence",
    definition: (
      <>
        A series of cards arranged in consecutive rank order. In FreeCell cascades, valid sequences alternate colors and descend in rank (e.g., red 9, black 8, red 7). An{" "}
        <a href="#in-suit-sequence" className="text-[#8B6914] hover:underline">in-suit sequence</a> is the same concept but with all cards sharing one suit.
      </>
    ),
  },
  {
    term: "Stock",
    id: "stock",
    definition: (
      <>
        In many solitaire games, the stock is the face-down pile of undealt cards that you draw from during play. FreeCell does <em>not</em> have a stock — all 52 cards are dealt face-up at the start, which is what makes it a game of pure skill rather than luck.
      </>
    ),
  },
  {
    term: "Suit",
    id: "suit",
    definition: (
      <>
        One of four categories in a standard deck: Spades (♠), Hearts (♥), Diamonds (♦), and Clubs (♣). Spades and clubs are black; hearts and diamonds are red. Each{" "}
        <a href="#foundation" className="text-[#8B6914] hover:underline">foundation</a> pile collects one complete suit from Ace to King.
      </>
    ),
  },
  {
    term: "Supermove",
    id: "supermove",
    definition: (
      <>
        A convenience feature that lets you move an entire ordered sequence of cards in one action, rather than moving them one at a time through free cells and empty columns. The number of cards you can supermove equals (1 + empty free cells) × 2<sup>empty columns</sup>. Understanding supermoves is key to{" "}
        <Link href="/strategy#advanced" className="text-[#8B6914] hover:underline">advanced play</Link>.
      </>
    ),
  },
  {
    term: "Tableau",
    id: "tableau",
    definition: (
      <>
        The main playing area consisting of all eight <a href="#cascade" className="text-[#8B6914] hover:underline">cascades</a> (columns). The tableau is where most of the action happens — you rearrange cards here to uncover buried low cards and build sequences. In FreeCell, the entire tableau is visible from the start, giving you complete information to plan your{" "}
        <Link href="/strategy" className="text-[#8B6914] hover:underline">strategy</Link>.
      </>
    ),
  },
  {
    term: "Undo",
    id: "undo",
    definition: (
      <>
        A feature that reverses your last move, letting you take back mistakes and try different approaches. In FreeCell, unlimited undo is standard and encouraged — it&apos;s not cheating, it&apos;s{" "}
        <Link href="/strategy#beginner" className="text-[#8B6914] hover:underline">one of the best learning tools</Link> available. Exploring and undoing multiple paths builds the intuition that separates beginners from experts.
      </>
    ),
  },
  {
    term: "Waste Pile",
    id: "waste-pile",
    definition: (
      <>
        In solitaire games with a <a href="#stock" className="text-[#8B6914] hover:underline">stock</a>, the waste pile is where drawn cards land face-up. FreeCell does not have a waste pile since all cards are dealt to the tableau at the start. You may encounter this term in other solitaire variants like Klondike.
      </>
    ),
  },
  {
    term: "Win Rate",
    id: "win-rate",
    definition: (
      <>
        The percentage of games you win out of total games played. Since nearly every FreeCell deal is solvable, win rate is a direct measure of skill. Beginners typically win 30–50%, while experts reach 90%+. Check our{" "}
        <Link href="/strategy#benchmarks" className="text-[#8B6914] hover:underline">win rate benchmarks</Link> to see where you stand.
      </>
    ),
  },
];

/* Group terms by first letter */
function groupByLetter(terms: Term[]): Map<string, Term[]> {
  const map = new Map<string, Term[]>();
  for (const t of terms) {
    const letter = t.term[0].toUpperCase();
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(t);
  }
  return map;
}

export default function GlossaryPage() {
  const grouped = groupByLetter(GLOSSARY);
  const letters = Array.from(grouped.keys()).sort();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "Glossary", item: absoluteUrl('/glossary') },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "FreeCell & Solitaire Glossary",
    description:
      "Complete glossary of FreeCell and Solitaire card game terms and definitions.",
    url: absoluteUrl('/glossary'),
    hasDefinedTerm: GLOSSARY.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: absoluteUrl(`/glossary#${t.id}`),
    })),
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="FreeCell Glossary"
        subtitle="Every card game term you need to know, from Ace to Win Rate. Clear definitions with links to strategy and rules."
      />

      {/* ── Letter Navigation ── */}
      <nav className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-transparent text-sm font-bold text-[#8B6914] flex items-center justify-center transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50"
            >
              {letter}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        {letters.map((letter) => (
          <CardSection key={letter} id={`letter-${letter}`}>
            {/* Letter heading */}
            <div className="px-6 sm:px-8 md:px-10 pt-8 pb-0">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#8B6914]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {letter}
              </h2>
              <div className="card-title-separator mt-4" />
            </div>

            <div className="px-6 sm:px-8 md:px-10 py-6 space-y-6">
              {grouped.get(letter)!.map((t) => (
                <div key={t.id} id={t.id} className="scroll-mt-20">
                  <h3
                    className="text-lg font-semibold text-[#2a2522] mb-1.5"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {t.term}
                  </h3>
                  <p className="text-[#444444] leading-relaxed">{t.definition}</p>
                </div>
              ))}
            </div>
          </CardSection>
        ))}

        {/* ── CTA ── */}
        <CtaSection
          body={
            <>
              Now that you know the terminology, put your knowledge to work.
              Every term here comes alive once you&apos;re at the table.
            </>
          }
          secondaryLabel="Learn Strategy"
          secondaryHref="/strategy"
        />

      </main>
    </ContentLayout>
  );
}
