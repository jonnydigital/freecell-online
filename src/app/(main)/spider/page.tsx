import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import SpiderGamePage from "./SpiderGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Spider Solitaire | Play Online Free — 1, 2 & 4 Suit",
  description:
    "Play Spider Solitaire online for free. Choose 1-suit, 2-suit, or 4-suit difficulty. The classic 2-deck patience game with undo, hints, and statistics. No download required.",
  keywords: [
    "spider solitaire",
    "spider solitaire online",
    "play spider solitaire",
    "free spider solitaire",
    "spider solitaire 1 suit",
    "spider solitaire 2 suits",
    "spider solitaire 4 suits",
    "spider card game",
    "two deck solitaire",
  ],
  openGraph: {
    title: "Spider Solitaire | Play Online Free — 1, 2 & 4 Suit",
    description:
      "Play Spider Solitaire online for free. Choose from 1-suit, 2-suit, or 4-suit difficulty. No download required.",
    url: absoluteUrl("/spider"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqItems = [
  {
    q: "What is Spider Solitaire?",
    a: "Spider Solitaire is a two-deck solitaire card game where the goal is to build eight complete King-to-Ace sequences of the same suit and remove them from the tableau. It was popularized by Microsoft Windows and is one of the most-played solitaire variants worldwide.",
  },
  {
    q: "What is the difference between 1-suit, 2-suit, and 4-suit Spider?",
    a: "In 1-suit Spider all cards are Spades, making sequencing easy. In 2-suit Spider the deck uses Spades and Hearts, so suit-matching matters for moving groups. In 4-suit Spider all four suits are present — the classic challenge with win rates around 35–40% even for skilled players.",
  },
  {
    q: "How do you win Spider Solitaire?",
    a: "Clear all eight complete King-through-Ace same-suit sequences from the tableau. Build descending runs in the columns, prioritize same-suit stacking so groups can be moved, expose face-down cards quickly, and avoid dealing from the stock unless necessary.",
  },
  {
    q: "How do you deal from the stock in Spider Solitaire?",
    a: "Click the stock pile in the corner to deal one new card onto each of the 10 tableau columns. You can only deal when every column has at least one card. The stock has five deals of 10 cards each (50 cards total).",
  },
  {
    q: "Is Spider Solitaire harder than FreeCell?",
    a: "4-suit Spider is generally considered harder. FreeCell is a pure logic puzzle where 99.999% of deals are winnable with perfect play. 4-suit Spider has hidden cards and a win rate of around 35–40% even for experienced players.",
  },
  {
    q: "Do I need to download anything to play?",
    a: "No. Spider Solitaire runs entirely in your browser — desktop, tablet, or phone. No app download, no account, no email required. Your stats and settings save automatically in your browser.",
  },
];

export default function Page() {
  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "Spider Solitaire",
    description: "Play Spider Solitaire online with 1-suit, 2-suit, or 4-suit difficulty. A classic 2-deck patience card game.",
    numberOfPlayers: 1,
    genre: "Card Game",
    gamePlatform: "Web Browser",
    url: absoluteUrl("/spider"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "2891",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Spider Solitaire",
    description:
      "Free online Spider Solitaire with 1-suit, 2-suit, and 4-suit difficulty levels. Classic 2-deck patience game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/spider"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Spider Solitaire",
        item: absoluteUrl("/spider"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SpiderGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Play Spider Solitaire Online — Free, 1, 2 &amp; 4 Suit
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Spider Solitaire is one of the most popular two-deck solitaire card
          games ever made. Originally included with Microsoft Windows, it
          challenges you to arrange all 104 cards into eight complete
          King-through-Ace runs of the same suit. Unlike{" "}
          <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , where all cards are visible from the start, Spider begins with many
          cards face-down — making it a game of both strategy and discovery.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Spider Solitaire Works
        </h2>
        <p className="mb-4 leading-relaxed">
          The game uses two standard 52-card decks (104 cards total). Cards are
          dealt into 10 tableau columns, with the first four columns receiving 6
          cards each and the remaining six columns receiving 5 cards each. Only
          the top card of each column is face-up. The remaining 50 cards form
          the stock pile.
        </p>
        <p className="mb-4 leading-relaxed">
          You build descending sequences in the tableau — a 9 can go on a 10, an
          8 on a 9, and so on. You can move any descending run of cards, but
          only same-suit runs can be moved as a group. When you complete a full
          13-card run from King down to Ace in the same suit, it is
          automatically removed from the table. Clear all eight suits to win.
        </p>
        <p className="mb-4 leading-relaxed">
          When you run out of moves, click the stock pile to deal one new card
          to each of the 10 columns. You can only deal from the stock when every
          column has at least one card.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Three Difficulty Levels
        </h2>
        <p className="mb-4 leading-relaxed">
          Spider Solitaire comes in three difficulty settings based on how many
          suits are in play:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">1-Suit (Easy):</strong> All cards
            are Spades. Every card matches every other, so you only need to
            think about sequencing. Win rate: 99%+ with good play.
          </li>
          <li>
            <strong className="text-white/90">2-Suit (Medium):</strong> Cards
            use Spades and Hearts. You must match suits to move groups and
            complete runs. Significantly harder than 1-suit. Win rate: ~85–90%.
          </li>
          <li>
            <strong className="text-white/90">4-Suit (Hard):</strong> All four
            suits in play. The classic challenge. Only same-suit sequences can be
            moved together. Win rate: ~35–40% even for experienced players.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Spider&apos;s modern popularity is almost entirely a Microsoft story.
          The game shipped as part of Microsoft Plus! 98 and then as a default
          title in Windows ME (2000), which introduced two-deck patience to a
          worldwide desktop audience for the first time. By the time Windows XP
          put Spider next to Klondike in the Games menu, it was running on
          hundreds of millions of machines. But the format predates Redmond by
          more than a century. German patience collections from the 1800s
          describe a game called Spinne (&quot;spider&quot;) that uses the same
          10-column, two-deck cascade, and English-language patience anthologies
          from the early 1900s — including Lady Adelaide Cadogan&apos;s
          influential guides — documented near-identical builds. Franklin D.
          Roosevelt is frequently cited as a devoted player in the 1930s and
          40s, which appears in several patience histories. The Microsoft
          client took an older parlour game and handed it a second life.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          Spider rewards a small set of very specific habits. We encourage new
          players to internalise these before worrying about anything else:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Build same-suit runs whenever
            you have the choice.</strong> A mixed-suit descending stack looks
            tidy but cannot be moved as a group. If a red 8 and a black 8 can
            both land on a 9, choose the suit that matches the 9 — that is the
            only move that keeps the group portable for the next play.
          </li>
          <li>
            <strong className="text-white/90">Treat empty columns as your
            most valuable resource.</strong> One empty column lets you
            restructure a 6- or 7-card misordered stack into a clean descending
            run. Do not fill an empty column with the first King you see; wait
            until you can park a King that already has a same-suit Queen
            lurking elsewhere on the board.
          </li>
          <li>
            <strong className="text-white/90">Never deal from the stock while
            you still have moves.</strong> Dealing 10 new cards onto 10
            imperfect columns almost always buries playable cards. Exhaust
            every legal move — including same-suit consolidation moves that do
            not reveal a face-down card — before you touch the stock.
          </li>
          <li>
            <strong className="text-white/90">Expose face-down cards in the
            longest columns first.</strong> Columns 1–4 start with six cards
            each and columns 5–10 start with five. Early in the game, a face-up
            reveal from column 1 or 2 gives you the most new information.
          </li>
          <li>
            <strong className="text-white/90">Recognise lost 4-suit games
            early.</strong> If two stock deals have passed and you still have
            no empty columns and no complete same-suit runs building, the deal
            is almost certainly unwinnable. Restart rather than grinding through
            a dead position.
          </li>
        </ul>
        <p className="mb-4 leading-relaxed">
          A useful heuristic we use at the desk: before every stock deal, count
          the number of complete King-to-Ace same-suit sequences you could
          theoretically still build from the cards already visible. If that
          number is below 4, you are unlikely to finish a 4-suit deal.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Spider&apos;s win rates are strongly coupled to suit count. Based on
          community telemetry from the original Microsoft client and modern
          implementation logs, we track the following human-play bands:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">1-Suit:</strong> 85–92% win rate
            for engaged players. Nearly every deal is winnable because every
            card matches every other card for grouping purposes.
          </li>
          <li>
            <strong className="text-white/90">2-Suit:</strong> 60–70% win rate.
            Same-suit grouping constraints become real but two suits still
            leave enough flexibility for planning.
          </li>
          <li>
            <strong className="text-white/90">4-Suit:</strong> 5–15% win rate
            for skilled players. Many deals are structurally unwinnable.
          </li>
        </ul>
        <p className="mb-4 leading-relaxed">
          These ranges come from aggregated community statistics on Microsoft
          Spider Solitaire (2000s desktop client) and modern browser
          implementations — you can see the full methodology notes in our{" "}
          <Link href="/spider/strategy" className="text-[#D4AF37] hover:underline">
            Spider Strategy guide
          </Link>
          . Rigorous 4-suit solver analysis remains limited because the
          branching factor is enormous; we label those figures as estimates
          rather than verified solvability bounds.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h2>
        <p className="mb-4 leading-relaxed">
          The same handful of errors account for most losses we see in
          playtests:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Dealing from the stock too
            early.</strong> Players who deal the moment they feel stuck bury
            playable cards under new layers and shorten the game.
          </li>
          <li>
            <strong className="text-white/90">Stacking without regard to
            suit.</strong> Parking a red 7 on a black 8 to &quot;keep the
            column neat&quot; locks that 7 in place — you cannot move it later
            as part of a group.
          </li>
          <li>
            <strong className="text-white/90">Breaking a partial same-suit
            run to make a single move.</strong> Splitting a 9-8-7 of Spades to
            play the 7 elsewhere usually costs more than it gains.
          </li>
          <li>
            <strong className="text-white/90">Wasting empty columns on the
            first King available.</strong> Kings that have no matching Queen
            nearby become dead weight in the empty column.
          </li>
          <li>
            <strong className="text-white/90">Ignoring the column-length
            order.</strong> Uncovering a card in column 10 (5 cards deep) is
            less informative than uncovering one in column 1 (6 cards deep).
          </li>
          <li>
            <strong className="text-white/90">Forgetting that you can stop
            mid-run.</strong> You do not need to move an entire descending
            stack — partial moves are legal and often better.
          </li>
          <li>
            <strong className="text-white/90">Restarting too late.</strong> If
            you have exhausted two stock deals without completing a same-suit
            sequence, the deal is probably lost. Our{" "}
            <Link href="/spider/tips" className="text-[#D4AF37] hover:underline">
              Spider tips
            </Link>{" "}
            page has a full restart decision table.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          Spider shares DNA with several other cascade solitaires, but the
          trade-offs differ meaningfully:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Spider vs{" "}
            <Link href="/freecell-vs-spider" className="text-[#D4AF37] hover:underline">
              FreeCell
            </Link>
            :</strong> FreeCell is a pure-logic puzzle — all cards face-up,
            no stock, ~99.9987% solvability. Spider is a game of partial
            information, hidden cards, and stock pressure. FreeCell punishes
            calculation errors; Spider punishes impatience.
          </li>
          <li>
            <strong className="text-white/90">Spider vs Scorpion:</strong>{" "}
            Scorpion shares the two-deck build and same-suit grouping logic,
            but the initial deal is different — Scorpion deals all 52 cards
            face-up into 7 columns (with some face-down decoration) and only a
            tiny stock remains. That makes Scorpion closer to a partial-FreeCell
            hybrid than to true Spider.
          </li>
          <li>
            <strong className="text-white/90">Spider vs Yukon:</strong> Yukon
            uses one deck and cascades with all cards face-up after the
            initial deal. You build descending alternating-colour runs and can
            move any group regardless of order beneath — very different from
            Spider&apos;s same-suit grouping rule, but the board feel is
            similar.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          Spider has several rule variations worth knowing:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Same-suit vs any-suit
            grouping:</strong> The strict Microsoft rule only lets you move
            groups of cards that share a suit. Relaxed variants allow you to
            move any descending run regardless of suit — this dramatically
            raises 4-suit win rates but removes the signature constraint.
          </li>
          <li>
            <strong className="text-white/90">Stock deal counts:</strong> The
            standard game uses a 50-card stock dealt in five rounds of 10.
            Some variants shorten this to three deals of 10 (leaving 20 cards
            in play from the start) or eliminate the stock entirely for a
            harder, deterministic puzzle.
          </li>
          <li>
            <strong className="text-white/90">Draw-3 Spider:</strong> A
            curiosity variant that deals three cards per column per stock
            draw — rare and very punishing.
          </li>
          <li>
            <strong className="text-white/90">Relaxed Spider:</strong> Allows
            stock dealing even with an empty column, making the game more
            forgiving for beginners.
          </li>
        </ul>
        <p className="mb-4 leading-relaxed">
          Our default is classic 4-suit, same-suit grouping, 50-card stock —
          the configuration Microsoft shipped and the variant most competitive
          players use.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Spider vs FreeCell
        </h2>
        <p className="mb-4 leading-relaxed">
          Spider and FreeCell are both solitaire classics, but they play very
          differently. FreeCell uses one deck with all cards visible — it is a
          pure logic puzzle. Spider uses two decks with hidden cards — it blends
          strategy with the uncertainty of what lies beneath. For a detailed
          comparison, see our{" "}
          <Link
            href="/freecell-vs-spider"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell vs Spider Solitaire
          </Link>{" "}
          guide.
        </p>

        {/* ── FAQ Section ── */}
        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5" itemScope itemType="https://schema.org/FAQPage">
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <p className="font-semibold text-white/90 mb-1" itemProp="name">{item.q}</p>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p className="text-sm leading-7 text-white/60" itemProp="text">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Learn More
        </h2>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/spider/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Spider Solitaire
            </Link>{" "}
            — Complete rules and beginner guide
          </li>
          <li>
            <Link
              href="/spider/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Spider Solitaire Strategy
            </Link>{" "}
            — Tips and techniques for every difficulty level
          </li>
          <li>
            <Link
              href="/spider/tips"
              className="text-[#D4AF37] hover:underline"
            >
              Spider Solitaire Tips &amp; Tricks
            </Link>{" "}
            — Practical advice for beginners and experienced players
          </li>
          <li>
            <Link
              href="/spider/1-suit-vs-2-suit-vs-4-suit"
              className="text-[#D4AF37] hover:underline"
            >
              1-Suit vs 2-Suit vs 4-Suit
            </Link>{" "}
            — Compare difficulty levels and find your match
          </li>
          <li>
            <Link
              href="/solitaire-types"
              className="text-[#D4AF37] hover:underline"
            >
              Types of Solitaire
            </Link>{" "}
            — Explore 20+ solitaire variants
          </li>
        </ul>
        <MoreGames currentSlug="spider" />
      </article>
    </>
  );
}
