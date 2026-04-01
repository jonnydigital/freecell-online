import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import ScorpionGamePage from "./ScorpionGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Scorpion Solitaire | Play Online Free — Strategic Card Game",
  description:
    "Play Scorpion Solitaire online for free. Build same-suit sequences from King to Ace in this challenging 7-column card game. Move any face-up card and all cards below it. No download required.",
  keywords: [
    "scorpion solitaire",
    "scorpion solitaire online",
    "scorpion card game",
    "scorpion solitaire free",
    "play scorpion solitaire",
    "scorpion patience game",
    "scorpion solitaire no download",
  ],
  openGraph: {
    title: "Scorpion Solitaire | Play Online Free — Strategic Card Game",
    description:
      "Play Scorpion Solitaire online for free. Build same-suit sequences from King to Ace. Move any face-up card. No download required.",
    url: absoluteUrl("/scorpion"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Scorpion Solitaire?",
    answer:
      "Scorpion Solitaire is a challenging single-deck card game played with 7 tableau columns of 7 cards each (49 cards) plus a 3-card reserve. The goal is to build four complete King-to-Ace same-suit sequences within the tableau. Unlike Spider Solitaire, you can move any face-up card along with all cards below it, regardless of whether they form a sequence.",
  },
  {
    question: "How is Scorpion different from Spider Solitaire?",
    answer:
      "While both games use same-suit building, the key difference is that Scorpion allows you to move ANY face-up card plus all cards below it, even if they don't form a proper sequence. In Spider, you can only move cards that form a descending same-suit run. Scorpion also uses one deck instead of two, has no stock pile (just a 3-card reserve), and completed sequences are removed from the tableau rather than placed on foundations.",
  },
  {
    question: "What is the win rate for Scorpion Solitaire?",
    answer:
      "Scorpion Solitaire has an estimated win rate of around 50% with skilled play. This makes it moderately difficult — harder than standard FreeCell (~82%) but much easier than Forty Thieves (~10%) or 4-suit Spider (~5%). The ability to move non-sequential groups of cards gives you significant flexibility.",
  },
  {
    question: "Can you move any card in Scorpion Solitaire?",
    answer:
      "You can move any face-up card along with ALL cards below it in the column, regardless of whether those cards form a valid sequence. This is the defining feature of Scorpion Solitaire. However, the card you're moving must still be placed on a card of the same suit that is exactly one rank higher, or into an empty column (Kings only).",
  },
  {
    question: "What happens when you complete a sequence in Scorpion?",
    answer:
      "When you build a complete King-to-Ace same-suit sequence at the bottom of a tableau column, the 13 cards are automatically removed from the game. There are no foundation piles — completed sequences simply disappear. The goal is to complete all four suit sequences to win the game.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Scorpion Solitaire",
    description:
      "Free online Scorpion Solitaire. Build same-suit sequences from King to Ace in this strategic single-deck card game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/scorpion"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "1024",
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
        name: "Scorpion Solitaire",
        item: absoluteUrl("/scorpion"),
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
      <ScorpionGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Scorpion Solitaire
        </h1>

        <p className="mb-4 leading-relaxed">
          Scorpion Solitaire is a strategic single-deck card game that combines the
          same-suit building of{" "}
          <Link href="/spider" className="text-[#D4AF37] hover:underline">
            Spider Solitaire
          </Link>{" "}
          with the flexible card movement of{" "}
          <Link href="/yukon" className="text-[#D4AF37] hover:underline">
            Yukon
          </Link>
          . The result is a deeply tactical game where planning and sequencing matter
          more than luck.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Scorpion Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal 49 cards across 7 columns of 7. The first 4 columns have their top 3
          cards face-down; the last 3 columns are dealt entirely face-up. Three cards
          are set aside as the reserve, which can be dealt (one to each of the first
          three columns) when you need fresh options.
        </p>
        <p className="mb-4 leading-relaxed">
          Build <strong>down in the same suit</strong> on the tableau — a 9 of Hearts
          on a 10 of Hearts. The twist: you can pick up <strong>any face-up card and
          all cards below it</strong>, even if they don&apos;t form a sequence. When
          you build a complete King-to-Ace same-suit run at the bottom of a column,
          those 13 cards are removed. Complete all four suits to win.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Why It&apos;s Special
        </h3>
        <p className="mb-4 leading-relaxed">
          The ability to move non-sequential groups of cards makes Scorpion uniquely
          strategic. You can grab a face-up 7 that has a random assortment of cards
          piled on top of it and move the whole stack to an 8 of the same suit. This
          flexibility opens up creative solutions but also means you need to think
          carefully about which cards you&apos;re dragging along for the ride.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/scorpion/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Scorpion Solitaire
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/scorpion/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Scorpion Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/spider"
              className="text-[#D4AF37] hover:underline"
            >
              Play Spider Solitaire
            </Link>{" "}
            — Same-suit building with two decks
          </li>
          <li>
            <Link
              href="/yukon"
              className="text-[#D4AF37] hover:underline"
            >
              Play Yukon Solitaire
            </Link>{" "}
            — Flexible card movement with alternating colors
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
        <MoreGames currentSlug="scorpion" />
      </article>
    </>
  );
}
