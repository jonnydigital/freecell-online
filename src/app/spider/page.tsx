import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import SpiderGamePage from "./SpiderGamePage";

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

export default function Page() {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SpiderGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Spider Solitaire
        </h2>

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

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Spider Solitaire Works
        </h3>
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

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Three Difficulty Levels
        </h3>
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

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Spider vs FreeCell
        </h3>
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

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
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
              href="/solitaire-types"
              className="text-[#D4AF37] hover:underline"
            >
              Types of Solitaire
            </Link>{" "}
            — Explore 20+ solitaire variants
          </li>
        </ul>
      </article>
    </>
  );
}
