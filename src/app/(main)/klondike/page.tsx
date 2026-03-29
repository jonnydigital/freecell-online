import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import KlondikeGamePage from "./KlondikeGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Klondike Solitaire | Play Online Free — Draw 1 & Draw 3",
  description:
    "Play Klondike Solitaire online for free. The classic card game everyone calls Solitaire. Choose Draw 1 or Draw 3 mode. Undo, hints, and statistics. No download required.",
  keywords: [
    "klondike solitaire",
    "klondike solitaire online",
    "play klondike solitaire",
    "free klondike solitaire",
    "solitaire online",
    "play solitaire",
    "klondike draw 1",
    "klondike draw 3",
    "classic solitaire",
    "patience card game",
  ],
  openGraph: {
    title: "Klondike Solitaire | Play Online Free — Draw 1 & Draw 3",
    description:
      "Play Klondike Solitaire online for free. The classic card game with Draw 1 and Draw 3 modes. No download required.",
    url: absoluteUrl("/klondike"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqItems = [
  {
    q: "What is Klondike Solitaire?",
    a: "Klondike Solitaire is the classic card game most people simply call 'Solitaire.' You deal 52 cards into seven tableau columns, build four foundation piles from Ace to King by suit, and win by moving all cards to the foundations. It was popularized by Microsoft Windows and remains the most-played solitaire game in the world.",
  },
  {
    q: "What is the difference between Draw 1 and Draw 3?",
    a: "In Draw 1 mode, you flip one card at a time from the stock pile, making it easier and better for beginners. In Draw 3 mode, you flip three cards at once but can only play the top card — this is the traditional competitive mode and is significantly harder.",
  },
  {
    q: "How many Klondike Solitaire games are winnable?",
    a: "About 79–82% of Klondike deals are theoretically winnable given perfect information. With normal play (hidden cards), experienced players win roughly 43–50% of games in Draw 1 and about 15–25% in Draw 3.",
  },
  {
    q: "What can go in an empty column in Klondike?",
    a: "Only Kings (or a sequence starting with a King) can be placed in an empty column. This makes empty columns less flexible than in FreeCell, where any card can go in an empty space.",
  },
  {
    q: "Is Klondike harder than FreeCell?",
    a: "In some ways yes. Klondike has hidden cards, so luck plays a role — some deals are simply unwinnable regardless of skill. FreeCell deals all cards face-up and 99.999% of deals are winnable with perfect play, making it a purer test of strategy.",
  },
  {
    q: "Do I need to create an account to play?",
    a: "No. Klondike Solitaire runs entirely in your browser with no download, no account, and no email required. Your win statistics and settings are saved automatically in your browser.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Klondike Solitaire",
    description:
      "Free online Klondike Solitaire with Draw 1 and Draw 3 modes. The classic patience card game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/klondike"),
  };

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "Klondike Solitaire",
    description: "The classic solitaire card game, free online. Choose Draw 1 or Draw 3 mode.",
    numberOfPlayers: 1,
    genre: "Card Game",
    gamePlatform: "Web Browser",
    url: absoluteUrl("/klondike"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "1876",
      bestRating: "5",
      worstRating: "1",
    },
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
        name: "Klondike Solitaire",
        item: absoluteUrl("/klondike"),
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
      <JsonLd data={appJsonLd} />
      <JsonLd data={gameJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <KlondikeGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Play Klondike Solitaire Online — Free, Draw 1 &amp; Draw 3
        </h1>

        <p className="mb-4 leading-relaxed">
          Klondike is the card game most people simply call &quot;Solitaire.&quot;
          Originally popularized during the Klondike Gold Rush and later made
          famous by Microsoft Windows, it remains the most-played solitaire
          variant in the world. Deal seven tableau columns, build four
          foundation piles from Ace to King, and try to clear the board.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Klondike Works
        </h2>
        <p className="mb-4 leading-relaxed">
          A single 52-card deck is dealt into seven columns. Column 1 gets 1
          card, column 2 gets 2, and so on up to 7 cards in column 7. Only the
          top card of each column is face-up; the rest are hidden. The remaining
          24 cards form the stock pile.
        </p>
        <p className="mb-4 leading-relaxed">
          Build tableau columns in descending order with alternating colors — a
          red 6 on a black 7, a black Queen on a red King. Move Aces to the
          foundations and build up by suit to King. Only Kings can fill empty
          columns. Draw from the stock when you need more options.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Draw 1 vs Draw 3
        </h2>
        <p className="mb-4 leading-relaxed">
          In <strong className="text-white/90">Draw 1</strong> mode, you flip
          one card at a time from the stock — easier and great for beginners.
          In <strong className="text-white/90">Draw 3</strong> mode, you flip
          three cards but can only play the top one — significantly harder and
          the traditional competitive variant. Use the toggle above the game
          to switch between modes.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Klondike vs FreeCell
        </h2>
        <p className="mb-4 leading-relaxed">
          The biggest difference is information. In{" "}
          <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , every card is visible from the start — it&apos;s a pure logic
          puzzle where 99.999% of deals are solvable. In Klondike, 21 cards
          start face-down, so luck plays a larger role. Many Klondike deals
          are genuinely unwinnable regardless of play. For a detailed comparison,
          see our{" "}
          <Link
            href="/freecell-vs-klondike"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell vs Klondike
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
              href="/klondike/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Klondike Solitaire
            </Link>{" "}
            — Complete rules and setup guide
          </li>
          <li>
            <Link
              href="/klondike/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Klondike Strategy Guide
            </Link>{" "}
            — Tips to win more games
          </li>
          <li>
            <Link
              href="/klondike/faq"
              className="text-[#D4AF37] hover:underline"
            >
              Klondike FAQ
            </Link>{" "}
            — Common questions answered
          </li>
          <li>
            <Link
              href="/freecell-vs-klondike"
              className="text-[#D4AF37] hover:underline"
            >
              FreeCell vs Klondike
            </Link>{" "}
            — Head-to-head comparison
          </li>
          <li>
            <Link
              href="/spider"
              className="text-[#D4AF37] hover:underline"
            >
              Play Spider Solitaire
            </Link>{" "}
            — Another classic solitaire variant
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
        <MoreGames currentSlug="klondike" />
      </article>
    </>
  );
}
