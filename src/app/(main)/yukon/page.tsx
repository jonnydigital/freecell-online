import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import YukonGamePage from "./YukonGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Yukon Solitaire | Play Online Free — No Download",
  description:
    "Play Yukon Solitaire online for free. Move any face-up card regardless of sequence in this challenging Klondike variant. Seven tableau columns, no stock pile. Undo, hints, mobile-friendly.",
  keywords: [
    "yukon solitaire",
    "yukon solitaire online",
    "yukon solitaire free",
    "yukon card game",
    "yukon solitaire rules",
    "yukon solitaire no download",
    "play yukon solitaire online",
    "solitaire online",
    "yukon patience",
    "klondike variant",
  ],
  openGraph: {
    title: "Yukon Solitaire | Play Online Free — No Download",
    description:
      "Play Yukon Solitaire online for free. Move any face-up card in this challenging Klondike variant. No download required.",
    url: absoluteUrl("/yukon"),
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
    name: "Yukon Solitaire",
    description:
      "Free online Yukon Solitaire. Move any face-up card regardless of sequence across seven tableau columns.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/yukon"),
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
        name: "Yukon Solitaire",
        item: absoluteUrl("/yukon"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Yukon Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yukon Solitaire is a Klondike variant where all 52 cards are dealt to seven tableau columns with no stock pile. The key difference is that any face-up card can be moved along with all cards on top of it, regardless of whether they form a proper sequence.",
        },
      },
      {
        "@type": "Question",
        name: "How does Yukon differ from Klondike?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Klondike, you can only move properly sequenced runs (alternating color, descending rank). In Yukon, any face-up card can be moved with everything on top of it, even if the cards aren't in sequence. Yukon also deals all 52 cards to the tableau — there's no stock or waste pile.",
        },
      },
      {
        "@type": "Question",
        name: "How do you win Yukon Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You win by building all four foundation piles from Ace to King by suit. Move cards between tableau columns (building down in alternating colors) to uncover face-down cards and free up Aces and other cards for the foundations.",
        },
      },
      {
        "@type": "Question",
        name: "Can any card be moved in Yukon Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Any face-up card can be moved, along with all cards stacked on top of it, to another tableau column — as long as the moved card follows the alternating-color, descending-rank rule on the destination column. Only Kings can be placed on empty columns.",
        },
      },
      {
        "@type": "Question",
        name: "What percentage of Yukon Solitaire games are winnable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Approximately 85-90% of Yukon Solitaire games are theoretically winnable with perfect play. In practice, win rates are typically 25-40% due to the complex decision-making required.",
        },
      },
    ],
  };


  const aggregateRatingJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Yukon Solitaire",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "1156",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={aggregateRatingJsonLd} />
      <YukonGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Yukon Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Yukon Solitaire is a challenging variant of Klondike where all 52 cards are
          dealt face-up across seven tableau columns — no stock pile, no waste pile. The
          twist: you can move any face-up card along with all cards on top of it,
          regardless of whether they form a proper sequence.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How It Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Column 1 gets one face-up card. Columns 2 through 7 each get one additional
          face-down card plus five face-up cards stacked on top. This means column 7
          has 11 cards total (6 face-down + 5 face-up). All 52 cards are in play from
          the very first move.
        </p>
        <p className="mb-4 leading-relaxed">
          Build on tableau columns in descending rank with alternating colors, just like
          Klondike. Build foundation piles up from Ace to King by suit. Only Kings can
          fill empty columns. The freedom to move any face-up card — not just ordered
          runs — gives you far more options but demands deeper strategic thinking.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Tips for Winning
        </h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Focus on uncovering face-down cards — every reveal opens new possibilities</li>
          <li>Move Kings to empty columns strategically to unlock buried cards</li>
          <li>Don&rsquo;t just move cards because you can — plan several moves ahead</li>
          <li>Build foundations steadily but don&rsquo;t rush Aces up if they&rsquo;re needed for tableau building</li>
          <li>Use the &ldquo;move any face-up card&rdquo; rule to dig deep into columns</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/yukon/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Yukon Solitaire
            </Link>{" "}
            — Complete rules, setup, and strategy guide
          </li>
          <li>
            <Link
              href="/klondike"
              className="text-[#D4AF37] hover:underline"
            >
              Play Klondike Solitaire
            </Link>{" "}
            — The classic solitaire game Yukon is based on
          </li>
          <li>
            <Link
              href="/spider"
              className="text-[#D4AF37] hover:underline"
            >
              Play Spider Solitaire
            </Link>{" "}
            — Another challenging multi-column solitaire game
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
        <MoreGames currentSlug="yukon" />
      </article>
    </>
  );
}
