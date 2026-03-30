import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import GolfGamePage from "./GolfGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Golf Solitaire | Play Online Free — No Download",
  description:
    "Play Golf Solitaire online for free. Clear seven columns by playing cards one rank higher or lower than the waste pile. Streak scoring, undo, hints. No download required.",
  keywords: [
    "golf solitaire",
    "golf solitaire online",
    "golf solitaire free",
    "golf card game",
    "golf solitaire rules",
    "golf solitaire no download",
    "play golf solitaire online",
    "solitaire online",
    "golf patience",
  ],
  openGraph: {
    title: "Golf Solitaire | Play Online Free — No Download",
    description:
      "Play Golf Solitaire online for free. Clear seven columns by matching cards ±1 rank. No download required.",
    url: absoluteUrl("/golf"),
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
    name: "Golf Solitaire",
    description:
      "Free online Golf Solitaire. Clear seven columns by playing cards one rank higher or lower than the waste pile.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/golf"),
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
        name: "Golf Solitaire",
        item: absoluteUrl("/golf"),
      },
    ],
  };

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "Golf Solitaire",
    description: "Clear seven columns of five cards by playing cards one rank higher or lower than the waste pile. Streak scoring, undo, hints.",
    numberOfPlayers: 1,
    genre: "Card Game",
    gamePlatform: "Web Browser",
    url: absoluteUrl("/golf"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "987",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Golf Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Golf Solitaire is a card game where you clear seven columns of five cards each by playing cards that are one rank higher or lower than the top of the waste pile. Kings can wrap to Aces and vice versa.",
        },
      },
      {
        "@type": "Question",
        name: "How do you win Golf Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You win by clearing all 35 cards from the seven tableau columns. Cards can be removed by clicking the bottom card of any column that is exactly one rank higher or lower than the current waste pile card. If no moves are available, draw from the stock pile.",
        },
      },
      {
        "@type": "Question",
        name: "What is the streak bonus in Golf Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each consecutive card you play without drawing from the stock increases your streak multiplier. The first card in a streak earns 1 point, the second earns 2, the third earns 3, and so on. Drawing from the stock resets the streak to zero. Long streaks are key to high scores.",
        },
      },
      {
        "@type": "Question",
        name: "Does King wrap to Ace in Golf Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. In this version of Golf Solitaire, ranks wrap around. You can play a King on an Ace or an Ace on a King. This wrapping rule opens up more possible moves and helps build longer streaks.",
        },
      },
      {
        "@type": "Question",
        name: "Is Golf Solitaire the same as TriPeaks Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. While both use the ±1 rank mechanic, Golf Solitaire uses seven columns of five face-up cards, while TriPeaks uses three overlapping peaks with face-down cards. Golf is simpler in layout but shares the same streak scoring system.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={gameJsonLd} />
      <JsonLd data={faqJsonLd} />
      <GolfGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Golf Solitaire
        </h1>

        <p className="mb-4 leading-relaxed">
          Golf Solitaire is a fast-paced solitaire card game where the goal is to clear
          seven columns of five cards each. Like TriPeaks, you remove cards by playing
          any exposed card that is one rank higher or lower than the current waste pile
          card — and ranks wrap around, so Kings connect to Aces.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How It Works
        </h2>
        <p className="mb-4 leading-relaxed">
          A standard 52-card deck is dealt into seven columns of five face-up cards
          (35 total). The remaining 17 cards form the stock pile, with one card drawn
          to start the waste pile. Only the bottom (exposed) card of each column can
          be played.
        </p>
        <p className="mb-4 leading-relaxed">
          Click any exposed card that is exactly one rank higher or lower than the
          waste pile top to play it. If no moves are available, click the stock to draw
          a new card. The game ends when all columns are cleared (you win) or when no
          moves remain and the stock is empty.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Scoring & Streaks
        </h2>
        <p className="mb-4 leading-relaxed">
          Golf Solitaire features a streak-based scoring system. Each consecutive card
          you play without drawing from the stock increases your streak multiplier. The
          first card in a streak earns 1 point, the second earns 2, the third earns 3,
          and so on. Drawing from the stock resets the streak to zero. Building long
          chains of consecutive plays is the key to achieving high scores.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Tips for Winning
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Scan all seven columns before making a move — plan your streak</li>
          <li>Look for zigzag runs (up-down-up) to extend streaks</li>
          <li>Use King↔Ace wrapping to &ldquo;turn the corner&rdquo; on long runs</li>
          <li>Save stock draws for when you truly have no playable cards</li>
          <li>Balance play across columns — emptying one column frees up space</li>
        </ul>

        {/* ── FAQ Section ── */}
        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5 mb-10" itemScope itemType="https://schema.org/FAQPage">
          {[
            { q: "What is Golf Solitaire?", a: "Golf Solitaire is a card game where you clear seven columns of five cards each by playing cards that are one rank higher or lower than the top of the waste pile. Kings can wrap to Aces and vice versa." },
            { q: "How do you win Golf Solitaire?", a: "You win by clearing all 35 cards from the seven tableau columns. Cards can be removed by clicking the bottom card of any column that is exactly one rank higher or lower than the current waste pile card. If no moves are available, draw from the stock pile." },
            { q: "What is the streak bonus in Golf Solitaire?", a: "Each consecutive card you play without drawing from the stock increases your streak multiplier. The first card in a streak earns 1 point, the second earns 2, the third earns 3, and so on. Drawing from the stock resets the streak to zero. Long streaks are key to high scores." },
            { q: "Does King wrap to Ace in Golf Solitaire?", a: "Yes. In this version of Golf Solitaire, ranks wrap around. You can play a King on an Ace or an Ace on a King. This wrapping rule opens up more possible moves and helps build longer streaks." },
            { q: "Is Golf Solitaire the same as TriPeaks Solitaire?", a: "No. While both use the ±1 rank mechanic, Golf Solitaire uses seven columns of five face-up cards, while TriPeaks uses three overlapping peaks with face-down cards. Golf is simpler in layout but shares the same streak scoring system." },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <p className="font-semibold text-white/90 mb-1" itemProp="name">{item.q}</p>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-sm leading-7 text-white/60" itemProp="text">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h2>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/golf/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Golf Solitaire
            </Link>{" "}
            — Complete rules and setup guide
          </li>
          <li>
            <Link
              href="/tripeaks"
              className="text-[#D4AF37] hover:underline"
            >
              Play TriPeaks Solitaire
            </Link>{" "}
            — Clear three peaks with ±1 rank moves
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
              href="/solitaire-types"
              className="text-[#D4AF37] hover:underline"
            >
              Types of Solitaire
            </Link>{" "}
            — Explore 20+ solitaire variants
          </li>
        </ul>
        <MoreGames currentSlug="golf" />
      </article>
    </>
  );
}
