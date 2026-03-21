import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import FortyThievesGamePage from "./FortyThievesGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Forty Thieves Solitaire | Play Online Free — 2-Deck Challenge",
  description:
    "Play Forty Thieves Solitaire online for free. The classic 2-deck patience game also known as Napoleon at St Helena. Same-suit building, 10 columns, 8 foundations. No download required.",
  keywords: [
    "forty thieves solitaire",
    "forty thieves card game",
    "forty thieves online",
    "forty thieves solitaire free",
    "play forty thieves",
    "2 deck solitaire",
    "napoleon at st helena",
  ],
  openGraph: {
    title: "Forty Thieves Solitaire | Play Online Free — 2-Deck Challenge",
    description:
      "Play Forty Thieves Solitaire online for free. The classic 2-deck patience game with same-suit building. No download required.",
    url: absoluteUrl("/forty-thieves"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Forty Thieves Solitaire?",
    answer:
      "Forty Thieves is a challenging solitaire card game played with two standard 52-card decks (104 cards total). It uses 10 tableau columns with 4 cards each, 8 foundation piles, and a stock pile. It is also known as Napoleon at St Helena, Big Forty, or Roosevelt at San Juan.",
  },
  {
    question: "How many decks does Forty Thieves use?",
    answer:
      "Forty Thieves uses two standard 52-card decks shuffled together, for a total of 104 cards. This means there are two of every card — two Ace of Spades, two King of Hearts, etc. All 8 foundation piles must be completed to win.",
  },
  {
    question: "Why is Forty Thieves so hard?",
    answer:
      "Forty Thieves is considered one of the hardest solitaire games because tableau building is restricted to same-suit only (not alternating colors), you can only move one card at a time (no group moves), and the stock has no recycling. These constraints make it extremely difficult to create useful sequences and free up buried cards.",
  },
  {
    question: "What is the win rate for Forty Thieves?",
    answer:
      "The win rate for Forty Thieves is estimated at around 10% or less with perfect play. Most casual players win fewer than 5% of their games. This makes it one of the most difficult mainstream solitaire variants, far harder than Klondike or FreeCell.",
  },
  {
    question: "Can you move multiple cards at once in Forty Thieves?",
    answer:
      "No. In standard Forty Thieves rules, you can only move one card at a time. You cannot pick up and move an entire sequence of cards. This is one of the key rules that makes the game so challenging — building long sequences requires moving cards one by one and having enough empty columns to work with.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Forty Thieves Solitaire",
    description:
      "Free online Forty Thieves Solitaire. The classic 2-deck patience game with same-suit building and 10 tableau columns.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/forty-thieves"),
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
        name: "Forty Thieves Solitaire",
        item: absoluteUrl("/forty-thieves"),
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
      <FortyThievesGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Forty Thieves Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Forty Thieves is one of the most challenging solitaire card games ever
          devised. Played with two full decks (104 cards), it features 10
          tableau columns, 8 foundation piles, and a brutally restrictive
          same-suit building rule. Also known as <strong>Napoleon at St
          Helena</strong>, <strong>Big Forty</strong>, or <strong>Roosevelt at
          San Juan</strong>, this game has humbled card players for centuries.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Forty Thieves Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal 4 cards face-up to each of 10 tableau columns — that&apos;s the
          40 cards that give the game its name. The remaining 64 cards form the
          stock pile. Build 8 foundation piles from Ace to King, one for each
          suit across both decks.
        </p>
        <p className="mb-4 leading-relaxed">
          On the tableau, you build <strong>down in the same suit</strong> — a 9
          of Spades on a 10 of Spades, a 5 of Hearts on a 6 of Hearts. Only one
          card can be moved at a time. Draw one card from the stock to the waste
          pile when you need more options. There is no recycling of the stock —
          once you&apos;ve gone through it, those cards are gone.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Why It&apos;s So Hard
        </h3>
        <p className="mb-4 leading-relaxed">
          Three rules combine to make Forty Thieves exceptionally difficult.
          First, <strong>same-suit building</strong> means you can&apos;t mix
          colors on the tableau — far more restrictive than alternating-color
          games like{" "}
          <Link href="/klondike" className="text-[#D4AF37] hover:underline">
            Klondike
          </Link>
          . Second, <strong>single-card moves</strong> mean you can never pick
          up a sequence — every card must be moved individually. Third, the
          stock offers <strong>no second chances</strong> — once you draw through
          all 64 cards, you&apos;re done. Win rates hover around 5-10% even for
          experienced players.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/forty-thieves/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Forty Thieves
            </Link>{" "}
            — Complete rules and setup guide
          </li>
          <li>
            <Link
              href="/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Solitaire Strategy Guide
            </Link>{" "}
            — Tips to win more games
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
          <li>
            <Link
              href="/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play FreeCell
            </Link>{" "}
            — Learn the classic open-information solitaire
          </li>
          <li>
            <Link
              href="/spider"
              className="text-[#D4AF37] hover:underline"
            >
              Play Spider Solitaire
            </Link>{" "}
            — Another multi-deck solitaire challenge
          </li>
        </ul>
        <MoreGames currentSlug="forty-thieves" />
      </article>
    </>
  );
}
