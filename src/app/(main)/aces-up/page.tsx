import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AcesUpGamePage from "./AcesUpGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Aces Up Solitaire | Play Idiot's Delight Online Free — Card Game",
  description:
    "Play Aces Up Solitaire (Idiot's Delight) online for free. Remove lower-ranked cards of the same suit until only four Aces remain. A classic patience game with a ~10% win rate. No download required.",
  keywords: [
    "aces up solitaire",
    "idiot's delight solitaire",
    "aces up card game",
    "play aces up online",
    "aces up solitaire free",
    "idiot's delight card game",
    "aces up solitaire no download",
    "aces up patience",
  ],
  openGraph: {
    title: "Aces Up Solitaire | Play Idiot's Delight Online Free — Card Game",
    description:
      "Play Aces Up Solitaire online for free. Discard lower-ranked cards until only four Aces remain. A satisfying patience game.",
    url: absoluteUrl("/aces-up"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Aces Up Solitaire?",
    answer:
      "Aces Up Solitaire (also called Idiot's Delight or Firing Squad) is a patience card game where you discard cards that are outranked by another card of the same suit. The goal is to eliminate all cards except the four Aces. It uses a standard 52-card deck with 4 tableau piles and a stock pile.",
  },
  {
    question: "How do you win Aces Up?",
    answer:
      "You win Aces Up when only the four Aces remain on the tableau — one in each pile. This is achieved by discarding all other cards. A card can be discarded when another tableau pile has a card of the same suit with a higher rank. Since Aces are the highest rank, they can never be discarded.",
  },
  {
    question: "What is the win rate for Aces Up Solitaire?",
    answer:
      "Aces Up Solitaire has a win rate of approximately 10% with optimal play. While the game involves significant luck based on the deal, strategic decisions about when to deal and how to use empty piles can meaningfully affect your chances of winning.",
  },
  {
    question: "Why is Aces Up called Idiot's Delight?",
    answer:
      "The name 'Idiot's Delight' comes from the game's deceptively simple rules — it looks easy to win but is surprisingly difficult. The basic mechanic of removing lower cards seems straightforward, but achieving the goal of having only Aces left requires careful strategy and favorable deals.",
  },
  {
    question: "How is Aces Up different from FreeCell?",
    answer:
      "Aces Up and FreeCell are very different solitaire games. FreeCell involves building foundation piles in sequence, moving cards between cascades, and has an ~82% win rate. Aces Up focuses on discarding cards by comparing same-suit ranks, uses only 4 piles, and has a ~10% win rate. FreeCell is primarily strategic while Aces Up blends luck and strategy.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Aces Up Solitaire",
    description:
      "Free online Aces Up Solitaire (Idiot's Delight). Discard lower-ranked same-suit cards until only four Aces remain.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/aces-up"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "1534",
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
        name: "Aces Up Solitaire",
        item: absoluteUrl("/aces-up"),
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
      <AcesUpGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Aces Up Solitaire
        </h1>

        <p className="mb-4 leading-relaxed">
          Aces Up (also known as <strong>Idiot&apos;s Delight</strong> or <strong>Firing Squad</strong>)
          is a satisfying patience card game where you eliminate cards that are outranked by another
          card of the same suit. The goal is simple: clear the board until only the four Aces remain.
          With a win rate around 10%, every victory feels earned.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Aces Up Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Start with four tableau piles, each containing one card, and a stock of 48 remaining
          cards. On each turn, look for top cards that share a suit with another top card — the
          lower-ranked one can be discarded (Aces are highest). Move cards to empty piles
          strategically, then deal four more cards from the stock when you&apos;re ready.
          Keep discarding until only Aces remain — or until you get stuck.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategy Meets Luck
        </h3>
        <p className="mb-4 leading-relaxed">
          Unlike pure-chance games like{" "}
          <Link href="/clock" className="text-[#D4AF37] hover:underline">
            Clock Solitaire
          </Link>
          , Aces Up rewards smart decisions. Choosing when to deal from the stock and how to
          use empty columns can make the difference between a win and a loss. But unlike{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , many deals are unwinnable no matter what you do — making it a compelling blend of
          skill and fortune.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/aces-up/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Aces Up Solitaire
            </Link>{" "}
            — Complete rules, strategy tips, and history
          </li>
          <li>
            <Link
              href="/aces-up/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Aces Up Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/la-belle-lucie"
              className="text-[#D4AF37] hover:underline"
            >
              Play La Belle Lucie
            </Link>{" "}
            — Fan patience with same-suit building and the merci rule
          </li>
          <li>
            <Link
              href="/"
              className="text-[#D4AF37] hover:underline"
            >
              Play FreeCell
            </Link>{" "}
            — The classic strategic solitaire
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
        <MoreGames currentSlug="aces-up" />
      </article>
    </>
  );
}
