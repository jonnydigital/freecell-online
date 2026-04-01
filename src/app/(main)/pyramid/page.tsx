import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import PyramidGamePage from "./PyramidGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Pyramid Solitaire | Play Online Free — No Download",
  description:
    "Play Pyramid Solitaire online for free. Match pairs of cards that total 13 to clear the pyramid. Undo, hints, and statistics. No download required.",
  keywords: [
    "pyramid solitaire",
    "pyramid solitaire online",
    "play pyramid solitaire",
    "free pyramid solitaire",
    "pyramid solitaire free",
    "pyramid card game",
    "pyramid solitaire no download",
    "solitaire online",
    "card matching game",
    "pairs to 13 solitaire",
  ],
  openGraph: {
    title: "Pyramid Solitaire | Play Online Free — No Download",
    description:
      "Play Pyramid Solitaire online for free. Match pairs of cards that total 13 to clear the pyramid. No download required.",
    url: absoluteUrl("/pyramid"),
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
    name: "Pyramid Solitaire",
    description:
      "Free online Pyramid Solitaire. Match pairs of cards that total 13 to clear the pyramid.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/pyramid"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "1634",
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
        name: "Pyramid Solitaire",
        item: absoluteUrl("/pyramid"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Pyramid Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pyramid Solitaire is a classic card game where you remove all 28 cards from a seven-row pyramid by pairing cards that add up to 13. Kings are removed alone (value 13), while other cards must be matched in pairs: Queen+Ace, Jack+2, 10+3, 9+4, 8+5, and 7+6.",
        },
      },
      {
        "@type": "Question",
        name: "How do you win Pyramid Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You win by removing all 28 pyramid cards. To expose cards higher in the pyramid, you must first remove the cards overlapping them from below. Use the stock pile to draw additional cards you can pair with pyramid cards. You get two stock recycles per game.",
        },
      },
      {
        "@type": "Question",
        name: "What card values are used in Pyramid Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aces count as 1, numbered cards 2–10 count as face value, Jacks count as 11, Queens count as 12, and Kings count as 13. Kings are the only cards removed alone. All other cards must be paired with another card so the two values add up to exactly 13.",
        },
      },
      {
        "@type": "Question",
        name: "Can you always win Pyramid Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — not every deal of Pyramid Solitaire is winnable. The game has a relatively low win rate compared to FreeCell or Klondike. However, strategic play, careful use of stock recycles, and prioritising cards that unblock the top of the pyramid can significantly improve your chances.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Pyramid Solitaire and TriPeaks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pyramid Solitaire requires pairing cards that sum to 13, while TriPeaks uses a ±1 rank mechanic similar to Golf Solitaire. Pyramid has a single pyramid layout, while TriPeaks uses three overlapping peaks. The two games share a similar card-clearing objective but play very differently.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <PyramidGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Pyramid Solitaire
        </h1>

        <p className="mb-4 leading-relaxed">
          Pyramid Solitaire is a classic card game where the goal is to remove
          all 28 cards from a seven-row pyramid by pairing cards that add up to
          13. Kings are removed on their own (value 13), while other cards must
          be matched: Queen + Ace, Jack + 2, 10 + 3, 9 + 4, 8 + 5, and 7 + 6.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How It Works
        </h2>
        <p className="mb-4 leading-relaxed">
          A standard 52-card deck is dealt into a pyramid of 7 rows. Row 1 has
          1 card, row 2 has 2 cards, and so on down to 7 cards in the bottom
          row. Each card partially overlaps two cards in the row below. The
          remaining 24 cards form the stock pile.
        </p>
        <p className="mb-4 leading-relaxed">
          A card is &quot;exposed&quot; when both cards overlapping it from the
          row below have been removed (or it&apos;s on the bottom row). Only
          exposed pyramid cards and the top waste card can be paired. Click the
          stock to draw cards to the waste pile. You get 2 stock recycles per
          game.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Card Values
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong className="text-white/90">Ace</strong> = 1</li>
          <li><strong className="text-white/90">2–10</strong> = face value</li>
          <li><strong className="text-white/90">Jack</strong> = 11</li>
          <li><strong className="text-white/90">Queen</strong> = 12</li>
          <li><strong className="text-white/90">King</strong> = 13 (removed alone)</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Tips for Winning
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Remove Kings immediately — they&apos;re free plays</li>
          <li>Prioritize uncovering cards near the top of the pyramid</li>
          <li>Try to keep both sides of the pyramid balanced</li>
          <li>Save your stock recycles for when you truly need them</li>
          <li>Use the hint button when you&apos;re stuck</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 mb-8">
          <details className="border border-white/10 rounded p-4">
            <summary className="font-semibold text-white/90 cursor-pointer">
              Can you always win Pyramid Solitaire?
            </summary>
            <p className="mt-2 text-white/70">
              No — not every deal is winnable. Pyramid has a lower win rate than FreeCell or Klondike.
              Strategic play and careful use of your two stock recycles can improve your chances, but
              some layouts are unsolvable from the start.
            </p>
          </details>
          <details className="border border-white/10 rounded p-4">
            <summary className="font-semibold text-white/90 cursor-pointer">
              What is the difference between Pyramid and TriPeaks Solitaire?
            </summary>
            <p className="mt-2 text-white/70">
              Pyramid requires pairing cards that sum to 13, while TriPeaks uses a ±1 rank mechanic.
              Pyramid uses a single pyramid layout; TriPeaks uses three overlapping peaks. Both involve
              clearing a card layout, but the mechanics are very different.
            </p>
          </details>
          <details className="border border-white/10 rounded p-4">
            <summary className="font-semibold text-white/90 cursor-pointer">
              How many stock recycles do you get?
            </summary>
            <p className="mt-2 text-white/70">
              You get 2 stock recycles per game. Use them wisely — save them for when you are truly
              stuck, not just when a better card hasn&apos;t appeared yet.
            </p>
          </details>
        </div>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h2>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/pyramid/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Pyramid Solitaire
            </Link>{" "}
            — Complete rules and setup guide
          </li>
          <li>
            <Link
              href="/pyramid/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Pyramid Strategy Guide
            </Link>{" "}
            — Advanced tips to win more games
          </li>
          <li>
            <Link
              href="/klondike"
              className="text-[#D4AF37] hover:underline"
            >
              Play Klondike Solitaire
            </Link>{" "}
            — The classic solitaire game
          </li>
          <li>
            <Link
              href="/spider"
              className="text-[#D4AF37] hover:underline"
            >
              Play Spider Solitaire
            </Link>{" "}
            — Another popular solitaire variant
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
        <MoreGames currentSlug="pyramid" />
      </article>
    </>
  );
}
