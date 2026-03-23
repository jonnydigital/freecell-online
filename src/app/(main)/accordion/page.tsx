import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AccordionGamePage from "./AccordionGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Accordion Solitaire | Play Online Free — Compress-the-Row Card Game",
  description:
    "Play Accordion Solitaire online for free. Compress 52 face-up cards into a single pile by matching rank or suit. Move cards 1 or 3 positions left. No download required.",
  keywords: [
    "accordion solitaire",
    "accordion solitaire online",
    "accordion card game",
    "play accordion solitaire",
    "accordion solitaire free",
    "accordion solitaire no download",
    "compress solitaire",
    "idle year solitaire",
  ],
  openGraph: {
    title: "Accordion Solitaire | Play Online Free — Compress-the-Row Card Game",
    description:
      "Play Accordion Solitaire online for free. Compress 52 cards into one pile by matching rank or suit. A classic patience game.",
    url: absoluteUrl("/accordion"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Accordion Solitaire?",
    answer:
      "Accordion Solitaire is a patience card game where all 52 cards are dealt face-up in a single row. You can move a card onto the card immediately to its left or 3 positions to its left, as long as the cards match by rank or suit. When a card is moved, the row compresses to close the gap. The goal is to compress all 52 cards into a single pile.",
  },
  {
    question: "How do you win Accordion Solitaire?",
    answer:
      "You win by compressing all 52 cards into a single pile. This requires moving every card onto another by matching rank or suit, moving 1 or 3 positions to the left each time. The win rate is extremely low — approximately 1-2% of deals are winnable with perfect play.",
  },
  {
    question: "What is the win rate for Accordion Solitaire?",
    answer:
      "Accordion Solitaire has one of the lowest win rates of any solitaire game, estimated at approximately 1-2% with skilled play. Most deals are unwinnable regardless of strategy, making each victory a notable achievement.",
  },
  {
    question: "Why is it called Accordion Solitaire?",
    answer:
      "The game is called Accordion because the row of cards compresses like an accordion as you make moves. Each successful move removes a position from the row, gradually squeezing the 52-card spread into fewer and fewer piles until (ideally) only one remains.",
  },
  {
    question: "Can I move cards to the right in Accordion?",
    answer:
      "No. Cards can only be moved to the LEFT — specifically 1 position left or 3 positions left. You cannot move cards to the right. This directional constraint is what makes the game so challenging.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Accordion Solitaire",
    description:
      "Free online Accordion Solitaire. Compress 52 face-up cards into a single pile by matching rank or suit.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/accordion"),
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
        name: "Accordion Solitaire",
        item: absoluteUrl("/accordion"),
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
      <AccordionGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Accordion Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Accordion Solitaire (also known as Idle Year or Methuselah) is one of the
          most challenging patience card games. All 52 cards are dealt face-up in a
          single row, and your goal is to compress the entire row into a single pile
          by matching cards by <strong>rank</strong> or <strong>suit</strong>. With a
          win rate of just 1-2%, every successful game is a real accomplishment.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Accordion Solitaire Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal all 52 cards face-up in a row from left to right. Each card (or the
          top card of a pile) can be moved onto the card immediately to its left, or
          3 positions to its left, if the two cards share the same{" "}
          <strong>rank</strong> or the same <strong>suit</strong>. When a card is moved,
          it goes on top of the target, and the row compresses to close the gap.
          Continue until you either win (one pile remaining) or run out of moves.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Compression Mechanic
        </h3>
        <p className="mb-4 leading-relaxed">
          The key to Accordion is the compression: every move reduces the number of
          positions in the row. When you move a card from position 5 to position 2,
          position 5 is removed and positions 6, 7, 8... all shift left. This means
          a move can create new opportunities as cards that were far apart suddenly
          become neighbors. Planning ahead for these chain reactions is the heart of
          Accordion strategy.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/accordion/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Accordion Solitaire
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/cruel"
              className="text-[#D4AF37] hover:underline"
            >
              Play Cruel Solitaire
            </Link>{" "}
            — Another challenging patience variant with redeals
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
        <MoreGames currentSlug="accordion" />
      </article>
    </>
  );
}
