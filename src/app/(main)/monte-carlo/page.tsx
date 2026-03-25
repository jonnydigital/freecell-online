import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import MonteCarloGamePage from "./MonteCarloGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Monte Carlo Solitaire | Play Online Free — 5x5 Grid Pair-Matching Game",
  description:
    "Play Monte Carlo Solitaire online for free. Match and remove adjacent pairs of same-rank cards from a 5x5 grid. Consolidate and deal new cards to clear all 52. No download required.",
  keywords: [
    "monte carlo solitaire",
    "monte carlo solitaire online",
    "monte carlo card game",
    "pair matching solitaire",
    "monte carlo patience",
    "play monte carlo solitaire",
    "monte carlo solitaire free",
    "grid solitaire game",
    "weddings solitaire",
  ],
  openGraph: {
    title: "Monte Carlo Solitaire | Play Online Free — 5x5 Grid Pair-Matching Game",
    description:
      "Play Monte Carlo Solitaire online for free. Remove adjacent same-rank pairs from a 5x5 grid. Consolidate and deal until all 52 cards are cleared.",
    url: absoluteUrl("/monte-carlo"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Monte Carlo Solitaire?",
    answer:
      "Monte Carlo Solitaire is a pair-matching patience game played on a 5x5 grid. You remove pairs of same-rank cards that are adjacent horizontally, vertically, or diagonally. After removing pairs, remaining cards consolidate (shift left and up) and new cards are dealt from the stock. The goal is to remove all 52 cards.",
  },
  {
    question: "How do I play Monte Carlo Solitaire?",
    answer:
      "Deal 25 cards into a 5x5 grid. Click two adjacent cards of the same rank to remove them. When no more pairs are available, click 'Consolidate & Deal' to shift remaining cards together and fill empty spaces from the stock. Keep matching until all cards are removed or no moves remain.",
  },
  {
    question: "What counts as adjacent in Monte Carlo Solitaire?",
    answer:
      "Cards are adjacent if they are next to each other horizontally (left/right), vertically (up/down), or diagonally. This means each card can be adjacent to up to 8 surrounding cards. Only same-rank pairs that are adjacent can be removed.",
  },
  {
    question: "What is the win rate for Monte Carlo Solitaire?",
    answer:
      "Monte Carlo Solitaire has an estimated win rate of about 5-10% with skilled play. The randomness of card placement makes many deals unwinnable, but careful pair selection and strategic use of consolidation can significantly improve your odds compared to random play.",
  },
  {
    question: "Is Monte Carlo Solitaire the same as Weddings?",
    answer:
      "Yes, Monte Carlo Solitaire is also known as Weddings or Double and Quits. All names refer to the same game: removing adjacent same-rank pairs from a 5x5 grid with consolidation and redealing from a stock pile.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Monte Carlo Solitaire",
    description:
      "Free online Monte Carlo Solitaire. Match and remove adjacent pairs of same-rank cards from a 5x5 grid. A classic pair-matching patience game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/monte-carlo"),
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
        name: "Monte Carlo Solitaire",
        item: absoluteUrl("/monte-carlo"),
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
      <MonteCarloGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Monte Carlo Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Monte Carlo (also known as Weddings or Double and Quits) is a classic pair-matching
          solitaire played on a <strong>5&times;5 grid</strong>. Deal 25 cards face-up, then
          remove pairs of same-rank cards that sit next to each other &mdash; horizontally,
          vertically, or diagonally. After removing all available pairs, consolidate the
          remaining cards and deal fresh ones from the stock to fill the gaps.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Monte Carlo Works
        </h3>
        <p className="mb-4 leading-relaxed">
          The game starts with 25 cards in a 5&times;5 grid and 27 cards in the stock. Scan
          the grid for adjacent same-rank pairs and click both cards to remove them. When no
          more pairs exist, hit &ldquo;Consolidate &amp; Deal&rdquo; to pack remaining cards
          together (shifting left and up) and fill empty spots from the stock. Repeat until
          all 52 cards are matched and removed, or until you&apos;re stuck with no pairs.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategy Tips
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-6 text-white/70">
          <li>Look for pairs near the edges first &mdash; they have fewer adjacency options after consolidation.</li>
          <li>When multiple pairs exist, prioritize removing those that will bring other same-rank cards closer together.</li>
          <li>Think ahead about what consolidation will do &mdash; sometimes waiting creates better adjacencies.</li>
          <li>Track which ranks still have un-removed cards to avoid dead ends.</li>
          <li>Remove pairs that free up the most space for new stock cards.</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/monte-carlo/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Monte Carlo
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/pyramid"
              className="text-[#D4AF37] hover:underline"
            >
              Play Pyramid Solitaire
            </Link>{" "}
            — Another pair-matching solitaire (cards sum to 13)
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
        <MoreGames currentSlug="monte-carlo" />
      </article>
    </>
  );
}
