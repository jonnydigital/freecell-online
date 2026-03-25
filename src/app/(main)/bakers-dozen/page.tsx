import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import BakersDozenGamePage from "./BakersDozenGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Baker's Dozen Solitaire | Play Online Free — 13-Column Patience Card Game",
  description:
    "Play Baker's Dozen Solitaire online for free. A classic patience card game with 13 columns, Kings-to-bottom setup rule, and no free cells. Build down regardless of suit. No download required.",
  keywords: [
    "bakers dozen solitaire",
    "bakers dozen solitaire online",
    "bakers dozen card game",
    "bakers dozen patience",
    "play bakers dozen solitaire",
    "bakers dozen solitaire free",
    "bakers dozen solitaire no download",
    "kings to bottom solitaire",
    "13 column solitaire",
  ],
  openGraph: {
    title: "Baker's Dozen Solitaire | Play Online Free — 13-Column Patience Card Game",
    description:
      "Play Baker's Dozen Solitaire online for free. 13 columns, Kings buried to the bottom, build down regardless of suit. A classic patience game.",
    url: absoluteUrl("/bakers-dozen"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Baker's Dozen Solitaire?",
    answer:
      "Baker's Dozen is a patience card game where all 52 cards are dealt face-up into 13 columns of 4 cards each. Before play begins, any Kings are moved to the bottom of their columns. You build tableau columns down regardless of suit, and build foundations up by suit from Ace to King. There are no free cells, no stock pile, and empty columns cannot be filled.",
  },
  {
    question: "Why are Kings moved to the bottom in Baker's Dozen?",
    answer:
      "Moving Kings to the bottom of their columns is the defining mechanic of Baker's Dozen. Since you build down on the tableau and Kings are the highest rank, a King on top of a column would block all cards beneath it with no way to move it (there's no card higher to place it on, and empty columns can't be filled). Burying Kings at the bottom ensures every card has a chance to be played.",
  },
  {
    question: "What is the win rate for Baker's Dozen Solitaire?",
    answer:
      "Baker's Dozen has an estimated win rate of approximately 65-75% with skilled play. The Kings-to-bottom rule and any-suit building make it more accessible than same-suit games like Cruel, but the inability to fill empty columns adds strategic depth that prevents it from being too easy.",
  },
  {
    question: "Can I fill empty columns in Baker's Dozen?",
    answer:
      "No. Empty columns cannot be filled with any card. Once a column is emptied, it stays empty for the rest of the game. This is a critical rule that makes Baker's Dozen challenging — you must carefully manage which columns you empty and when.",
  },
  {
    question: "How is Baker's Dozen different from Baker's Game?",
    answer:
      "Despite similar names, these are very different games. Baker's Game has 8 columns, 4 free cells, and builds down by SUIT on the tableau. Baker's Dozen has 13 columns, NO free cells, builds down REGARDLESS of suit, has the Kings-to-bottom setup rule, and empty columns can't be filled. Baker's Game is essentially same-suit FreeCell, while Baker's Dozen is its own unique patience variant.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Baker's Dozen Solitaire",
    description:
      "Free online Baker's Dozen Solitaire. 13 columns with Kings buried to the bottom. Build down regardless of suit, foundations up by suit. A classic patience game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/bakers-dozen"),
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
        name: "Baker's Dozen Solitaire",
        item: absoluteUrl("/bakers-dozen"),
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
      <BakersDozenGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Baker&apos;s Dozen Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Baker&apos;s Dozen is a classic patience card game with a unique twist: before
          play begins, all <strong>Kings are moved to the bottom</strong> of their
          columns. With 13 columns of 4 cards each, all face-up, you build{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            tableau
          </Link>{" "}
          columns down regardless of suit and{" "}
          <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
            foundations
          </Link>{" "}
          up by suit from Ace to King.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Baker&apos;s Dozen Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal all 52 cards face-up into 13 columns of 4 cards each. Move any Kings
          to the bottom of their columns. Build tableau columns{" "}
          <strong>down regardless of suit</strong> — place a 5&hearts; on a 6&spades;,
          a 3&clubs; on a 4&diams;, etc. Only the top card of each column can move.
          Build foundations up by suit from Ace to King. Empty columns cannot be filled.
          Win by moving all 52 cards to the four foundations.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Kings-to-Bottom Rule
        </h3>
        <p className="mb-4 leading-relaxed">
          The signature mechanic of Baker&apos;s Dozen is the Kings-to-bottom setup rule.
          After dealing, any King found in the tableau is moved to the bottom of its column.
          This prevents Kings from blocking other cards — since you build down, a King on
          top would be permanently stuck (there&apos;s no higher card to place it on, and
          empty columns can&apos;t be filled). Kings naturally work their way to foundations
          last, so burying them at the bottom keeps the game flowing.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/bakers-dozen/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Baker&apos;s Dozen
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/bakers-game"
              className="text-[#D4AF37] hover:underline"
            >
              Play Baker&apos;s Game
            </Link>{" "}
            — Same-suit FreeCell variant (different from Baker&apos;s Dozen)
          </li>
          <li>
            <Link
              href="/cruel"
              className="text-[#D4AF37] hover:underline"
            >
              Play Cruel Solitaire
            </Link>{" "}
            — Same-suit building with unlimited redeals
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
        <MoreGames currentSlug="bakers-dozen" />
      </article>
    </>
  );
}
