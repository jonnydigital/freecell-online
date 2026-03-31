import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import GapsGamePage from "./GapsGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Gaps Solitaire (Montana) | Play Online Free — Grid Puzzle Card Game",
  description:
    "Play Gaps Solitaire online for free. Arrange cards in a 4×13 grid — fill the gaps to build suit sequences from 2 to King. Also known as Montana Solitaire. No download required.",
  keywords: [
    "gaps solitaire",
    "gaps solitaire online",
    "gaps card game",
    "montana solitaire",
    "montana solitaire online",
    "gaps patience game",
    "play gaps solitaire",
    "gaps solitaire free",
    "grid solitaire game",
    "card arrangement puzzle",
  ],
  openGraph: {
    title: "Gaps Solitaire (Montana) | Play Online Free — Grid Puzzle Card Game",
    description:
      "Play Gaps Solitaire online for free. Fill gaps in a 4×13 grid to arrange suit sequences from 2 to King.",
    url: absoluteUrl("/gaps"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Gaps Solitaire?",
    answer:
      "Gaps Solitaire (also called Montana) is a patience card game where all 52 cards are dealt face-up into a 4×13 grid. The four Aces are removed to create gaps. You move cards into gaps by matching the suit and placing one rank higher than the card to the left. The goal is to arrange each row as a complete suit sequence from 2 through King.",
  },
  {
    question: "How do I move cards in Gaps Solitaire?",
    answer:
      "A card can move into a gap if it is one rank higher and the same suit as the card immediately to the left of the gap. For example, if the 5 of Hearts is to the left of a gap, only the 6 of Hearts can fill it. Gaps in the leftmost column can be filled by any 2. Gaps to the right of a King or another gap are dead — nothing can be placed there.",
  },
  {
    question: "What is a redeal in Gaps Solitaire?",
    answer:
      "When no more moves are available, you can redeal. Cards that are correctly sequenced from the left of each row (starting with a 2) are locked in place. All other cards are gathered, shuffled, and redealt into the remaining positions. Aces are removed again to create new gaps. You typically get 2 redeals (3 total deals).",
  },
  {
    question: "What is the win rate for Gaps Solitaire?",
    answer:
      "Gaps Solitaire has an estimated win rate of 10-20% with skilled play, making it one of the more challenging patience games. The redeals help, but correct sequencing and strategic gap management are essential. Without redeals, the win rate drops to under 5%.",
  },
  {
    question: "What is the difference between Gaps and Montana Solitaire?",
    answer:
      "Gaps and Montana are essentially the same game. Some variations differ in how redeals work or how many redeals are allowed. Our version follows the most common ruleset: 2 redeals allowed, leftmost column accepts any 2, and correctly sequenced cards lock during redeals.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Gaps Solitaire (Montana)",
    description:
      "Free online Gaps Solitaire. Arrange cards in a 4×13 grid by filling gaps to build suit sequences from 2 to King. A classic patience puzzle.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/gaps"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.4",
      ratingCount: "1289",
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
        name: "Gaps Solitaire",
        item: absoluteUrl("/gaps"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <GapsGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Gaps Solitaire (Montana)
        </h1>

        <p className="mb-4 leading-relaxed">
          Gaps Solitaire — also known as Montana — is a captivating patience card game
          where all 52 cards are dealt face-up into a <strong>4&times;13 grid</strong>.
          After removing the four Aces to create gaps, you slide cards into the empty
          spaces to build complete suit sequences from 2 through King in each row.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Gaps Works
        </h3>
        <p className="mb-4 leading-relaxed">
          A card can move into a gap only if it is <strong>one rank higher</strong> and
          the <strong>same suit</strong> as the card immediately to its left. For instance,
          if the 7&hearts; sits to the left of a gap, only the 8&hearts; can fill it. Gaps
          in the leftmost column accept any 2, since rows must start with a 2. A gap
          to the right of a King or another gap is &ldquo;dead&rdquo; — nothing can go there.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Redeals
        </h3>
        <p className="mb-4 leading-relaxed">
          When you run out of moves, you can <strong>redeal</strong> (up to 2 times).
          Cards that form a correct sequence from the left of their row — starting with a 2 —
          are locked in place. All other cards are gathered, shuffled, and redealt. Aces are
          removed again to create fresh gaps. Use your redeals wisely — they&apos;re limited!
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategy Tips
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-6 text-white/70">
          <li>Prioritize placing 2s in the leftmost column early to start building sequences.</li>
          <li>Avoid creating dead gaps next to Kings — plan moves to keep gaps productive.</li>
          <li>Build sequences from the left side of each row to lock more cards during redeals.</li>
          <li>Save redeals for when you&apos;re truly stuck — sometimes one more move opens up.</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/gaps/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Gaps
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/gaps/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Gaps (Montana) Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/cruel"
              className="text-[#D4AF37] hover:underline"
            >
              Play Cruel Solitaire
            </Link>{" "}
            — Another patience game with redeals
          </li>
          <li>
            <Link
              href="/"
              className="text-[#D4AF37] hover:underline"
            >
              Play FreeCell
            </Link>{" "}
            — The classic free cell solitaire
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
        <MoreGames currentSlug="gaps" />
      </article>
    </>
  );
}
