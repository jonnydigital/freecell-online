import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import TriPeaksGamePage from "./TriPeaksGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "TriPeaks Solitaire | Play Online Free — No Download",
  description:
    "Play TriPeaks Solitaire online for free. Clear three peaks by playing cards one rank higher or lower than the waste pile. Streak scoring, undo, hints. No download required.",
  keywords: [
    "tripeaks solitaire",
    "tripeaks solitaire online",
    "tripeaks solitaire free",
    "tri peaks solitaire",
    "triple peaks solitaire",
    "tripeaks card game",
    "tripeaks solitaire no download",
    "play tripeaks online",
    "solitaire online",
    "three peaks card game",
  ],
  openGraph: {
    title: "TriPeaks Solitaire | Play Online Free — No Download",
    description:
      "Play TriPeaks Solitaire online for free. Clear three peaks by matching cards ±1 rank. No download required.",
    url: absoluteUrl("/tripeaks"),
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
    name: "TriPeaks Solitaire",
    description:
      "Free online TriPeaks Solitaire. Clear three peaks by playing cards one rank higher or lower than the waste pile.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/tripeaks"),
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
        name: "TriPeaks Solitaire",
        item: absoluteUrl("/tripeaks"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is TriPeaks Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TriPeaks Solitaire (also called Tri Peaks or Triple Peaks) is a card game where you clear three overlapping peaks of cards by playing cards that are one rank higher or lower than the top of the waste pile. Kings can wrap to Aces and vice versa.",
        },
      },
      {
        "@type": "Question",
        name: "How do you win TriPeaks Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You win by clearing all 28 cards from the three peaks. Cards can be removed by clicking any available card that is exactly one rank higher or lower than the current waste pile card. If no moves are available, draw from the stock pile.",
        },
      },
      {
        "@type": "Question",
        name: "What is the streak bonus in TriPeaks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each consecutive card you play without drawing from the stock increases your streak multiplier. The first card in a streak earns 1 point, the second earns 2, the third earns 3, and so on. Drawing from the stock resets the streak to zero. Long streaks are key to high scores.",
        },
      },
      {
        "@type": "Question",
        name: "Does King wrap to Ace in TriPeaks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. In TriPeaks Solitaire, ranks wrap around. You can play a King on an Ace or an Ace on a King. This wrapping rule opens up more possible moves and is part of what makes TriPeaks faster-paced than many other solitaire variants.",
        },
      },
      {
        "@type": "Question",
        name: "Is TriPeaks Solitaire the same as Pyramid Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. While both feature pyramid-shaped card layouts, the mechanics are different. Pyramid Solitaire removes pairs of cards that sum to 13, while TriPeaks removes single cards that are ±1 rank from the waste pile top. TriPeaks uses three smaller peaks instead of one large pyramid.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <TriPeaksGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          TriPeaks Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          TriPeaks Solitaire (also known as Tri Peaks or Triple Peaks) is a fast-paced
          solitaire card game where the goal is to clear three overlapping peaks of
          cards. Unlike Pyramid Solitaire which pairs cards to 13, TriPeaks lets you
          remove any available card that is one rank higher or lower than the current
          waste pile card — and ranks wrap around, so Kings connect to Aces.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How It Works
        </h3>
        <p className="mb-4 leading-relaxed">
          A standard 52-card deck is dealt into three peaks. The peaks share a base
          row of 10 face-up cards. Above the base, 18 cards are dealt face-down in
          three pyramid formations. Cards flip face-up when both cards covering them
          are removed. The remaining cards form the stock pile, with one card drawn
          to start the waste pile.
        </p>
        <p className="mb-4 leading-relaxed">
          Click any available face-up card that is exactly one rank higher or lower
          than the waste pile top to play it. If no moves are available, click the
          stock to draw a new card. The game ends when all peaks are cleared (you win)
          or when no moves remain and the stock is empty.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Scoring & Streaks
        </h3>
        <p className="mb-4 leading-relaxed">
          TriPeaks features a streak-based scoring system. Each consecutive card you
          play without drawing from the stock increases your streak multiplier. The
          first card in a streak earns 1 point, the second earns 2, the third earns 3,
          and so on. Drawing from the stock resets the streak to zero. Building long
          chains of consecutive plays is the key to achieving high scores.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Tips for Winning
        </h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Plan runs of cards to build long streaks for maximum points</li>
          <li>Prioritize uncovering peak tops — clearing a peak opens many cards</li>
          <li>Look for paths that alternate up and down through available cards</li>
          <li>Save stock draws for when you truly have no playable cards</li>
          <li>Remember that Kings and Aces connect — use wrapping to extend streaks</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/tripeaks/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play TriPeaks Solitaire
            </Link>{" "}
            — Complete rules and setup guide
          </li>
          <li>
            <Link
              href="/pyramid"
              className="text-[#D4AF37] hover:underline"
            >
              Play Pyramid Solitaire
            </Link>{" "}
            — Pair cards that sum to 13
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
        <MoreGames currentSlug="tripeaks" />
      </article>
    </>
  );
}
