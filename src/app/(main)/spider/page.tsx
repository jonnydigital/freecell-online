import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import SpiderGamePage from "./SpiderGamePage";
import MoreGames from '@/components/MoreGames';

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
      ratingCount: "2184",
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
