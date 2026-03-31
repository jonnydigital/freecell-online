import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import ClockGamePage from "./ClockGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Clock Solitaire | Play Clock Patience Online Free — Card Game",
  description:
    "Play Clock Solitaire (Clock Patience) online for free. Deal 52 cards into a clock face and flip cards to their matching positions. A classic luck-based patience game. No download required.",
  keywords: [
    "clock solitaire",
    "clock patience",
    "clock solitaire online",
    "clock card game",
    "play clock solitaire",
    "clock solitaire free",
    "clock patience online",
    "clock solitaire no download",
  ],
  openGraph: {
    title: "Clock Solitaire | Play Clock Patience Online Free — Card Game",
    description:
      "Play Clock Patience online for free. Deal cards into a clock face and flip them to matching positions. A classic patience game.",
    url: absoluteUrl("/clock"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Clock Solitaire?",
    answer:
      "Clock Solitaire (also called Clock Patience) is a classic card game where 52 cards are dealt face-down into 13 piles of 4 — 12 arranged in a clock face and 1 in the center. You flip cards and place them under the pile matching their rank. The game plays itself step by step with no decisions to make.",
  },
  {
    question: "How do you win Clock Solitaire?",
    answer:
      "You win Clock Solitaire when all 52 cards are face-up. This happens only if you can turn over every card before the 4th King is flipped. Since the last King ends the game (there are no more face-down cards in the center pile), you need all other piles to be complete first.",
  },
  {
    question: "What is the win rate for Clock Solitaire?",
    answer:
      "Clock Solitaire has a very low win rate of approximately 1% (1 in 100 games). The outcome is entirely determined by the initial deal — there are no decisions to make. This makes each win feel special and exciting.",
  },
  {
    question: "Is Clock Solitaire a game of skill or luck?",
    answer:
      "Clock Solitaire is entirely luck-based. Once the cards are dealt, the outcome is predetermined — there are no choices or decisions to make. The game plays itself automatically, with each step revealing the next card. This makes it a relaxing game to watch unfold.",
  },
  {
    question: "How is Clock Solitaire different from FreeCell?",
    answer:
      "Clock Solitaire and FreeCell are very different games. FreeCell is a strategy game where nearly every deal is winnable with the right moves (~82% win rate). Clock Solitaire has no decisions — the game plays itself with only ~1% of deals being winnable. FreeCell requires planning, while Clock Patience is a relaxing game of pure chance.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Clock Solitaire",
    description:
      "Free online Clock Solitaire (Clock Patience). Deal cards into a clock face and flip them to matching rank positions.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/clock"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      ratingCount: "1678",
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
        name: "Clock Solitaire",
        item: absoluteUrl("/clock"),
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
      <ClockGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Clock Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Clock Solitaire (also known as <strong>Clock Patience</strong>) is one of the
          most well-known patience card games in the world. Fifty-two cards are dealt
          face-down into a clock face pattern — 12 piles around the outside and 1 pile
          in the center. Flip a card, place it under the matching pile, and watch the
          clock come alive. With a win rate of only about 1%, every victory is a
          celebration.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Clock Patience Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal 52 cards face-down into 13 piles of 4 cards each. Arrange 12 piles in a
          clock face (Ace at 1 o&apos;clock through Queen at 12 o&apos;clock) with Kings in the center.
          Start by flipping the top card from the center pile. Place it face-up under the
          pile matching its rank — then flip the top face-down card from that pile.
          Continue until all cards are face-up (you win!) or the 4th King is turned
          (game over).
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          A Game of Pure Chance
        </h3>
        <p className="mb-4 leading-relaxed">
          Unlike{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[#D4AF37] hover:underline">
            Klondike
          </Link>
          , Clock Solitaire involves no decisions whatsoever. The outcome is entirely
          determined by the shuffle. This makes it a wonderfully relaxing game to watch
          unfold — tap to advance each step or use auto-play to let the clock tick on
          its own.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/clock/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Clock Solitaire
            </Link>{" "}
            — Complete rules and history
          </li>
          <li>
            <Link
              href="/cruel"
              className="text-[#D4AF37] hover:underline"
            >
              Play Cruel Solitaire
            </Link>{" "}
            — A patience game with strategic redeals
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
        <MoreGames currentSlug="clock" />
      </article>
    </>
  );
}
