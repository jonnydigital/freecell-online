import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import PenguinGamePage from "./PenguinGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Penguin Solitaire | Play Online Free — Dynamic Foundation Base",
  description:
    "Play Penguin Solitaire online for free. A unique FreeCell variant with a random beak card that sets the foundation base rank. Build up by suit with wrapping, same-suit tableau stacking, and a single flipper cell. No download required.",
  keywords: [
    "penguin solitaire",
    "penguin solitaire online",
    "penguin card game",
    "penguin solitaire free",
    "play penguin solitaire",
    "penguin solitaire no download",
    "penguin solitaire rules",
    "solitaire with wrapping foundations",
  ],
  openGraph: {
    title: "Penguin Solitaire | Play Online Free — Dynamic Foundation Base",
    description:
      "Play Penguin Solitaire online for free. Random beak card determines the foundation base, same-suit building with wrapping, and a single flipper cell.",
    url: absoluteUrl("/penguin"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Penguin Solitaire?",
    answer:
      "Penguin Solitaire is a single-deck card game where a randomly chosen 'beak' card determines the foundation base rank. All four cards of that rank are placed on foundations immediately. The remaining 48 cards are dealt into 7 tableau columns and 1 flipper cell. You build foundations up by suit with wrapping (e.g., K\u2192A\u21922 if base is not Ace) and build tableau down by same suit.",
  },
  {
    question: "How does the beak card work?",
    answer:
      "The beak card is the first card dealt. Its rank becomes the foundation base for all four suits. All four cards of that rank are automatically placed on the four foundation piles. For example, if the beak is a 7, all four 7s go to foundations and you build 7\u21928\u21929\u2192...\u2192K\u2192A\u21922\u2192...\u21926.",
  },
  {
    question: "What is foundation wrapping?",
    answer:
      "Foundation wrapping means that after King, the sequence continues with Ace, then 2, 3, and so on until you reach the rank just below the base. For example, with a base of 5, the foundation order is 5\u21926\u21927\u2192...\u2192K\u2192A\u21922\u21923\u21924. Each foundation pile ends up with all 13 cards of its suit.",
  },
  {
    question: "What is the flipper cell?",
    answer:
      "The flipper cell is a single temporary storage space, similar to a free cell in FreeCell but limited to just one card. You can place any single card in the flipper and retrieve it later. Strategic use of the flipper is essential since you only have one.",
  },
  {
    question: "How does tableau building work in Penguin?",
    answer:
      "Tableau columns are built down by same suit with wrapping. For example, you can place the 5 of Hearts on the 6 of Hearts. Wrapping means a King can be placed on an Ace of the same suit. Sequences of same-suit cards can be moved as a group.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Penguin Solitaire",
    description:
      "Free online Penguin Solitaire. Random beak card sets the foundation base, same-suit building with wrapping, single flipper cell.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/penguin"),
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
        name: "Penguin Solitaire",
        item: absoluteUrl("/penguin"),
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
      <PenguinGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Penguin Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Penguin Solitaire is a fascinating variant that introduces a dynamic twist to
          traditional{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          . A randomly chosen &ldquo;beak&rdquo; card determines the foundation base rank for
          every game, meaning foundations build up by suit from that rank with wrapping
          (King wraps to Ace). Combined with same-suit tableau building and a single
          &ldquo;flipper&rdquo; reserve cell, every deal presents a unique puzzle.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Penguin Works
        </h3>
        <p className="mb-4 leading-relaxed">
          At the start, a random card is chosen as the beak. All four cards of that rank
          are placed on the four foundation piles. The remaining 48 cards are dealt
          face-up into 7 tableau columns, with one card going to the flipper cell.
          Build foundations up by suit with wrapping. Build tableau columns down by
          same suit. Move sequences of same-suit cards as a group. Any card can fill
          an empty column.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Why It&apos;s Special
        </h3>
        <p className="mb-4 leading-relaxed">
          The dynamic foundation base means no two games feel the same. When the base
          rank is 7, you need to wrap through King, Ace, and back to 6. This wrapping
          mechanic adds a layer of planning that other solitaire games lack. The single
          flipper cell forces careful resource management &mdash; every move counts when
          you only have one temporary storage spot.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/penguin/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Penguin Solitaire
            </Link>{" "}
            &mdash; Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/canfield"
              className="text-[#D4AF37] hover:underline"
            >
              Play Canfield Solitaire
            </Link>{" "}
            &mdash; Another game with a random foundation base
          </li>
          <li>
            <Link
              href="/"
              className="text-[#D4AF37] hover:underline"
            >
              Play FreeCell
            </Link>{" "}
            &mdash; The classic free cell solitaire
          </li>
          <li>
            <Link
              href="/solitaire-types"
              className="text-[#D4AF37] hover:underline"
            >
              Types of Solitaire
            </Link>{" "}
            &mdash; Explore 20+ solitaire variants
          </li>
        </ul>
        <MoreGames currentSlug="penguin" />
      </article>
    </>
  );
}
