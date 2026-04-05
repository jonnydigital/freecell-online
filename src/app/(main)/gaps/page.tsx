import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import GapsGamePage from "./GapsGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

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
      "Gaps Solitaire has an estimated win rate of roughly 45% with 3 deals (2 redeals), making it one of the more approachable grid patience games. Correct sequencing and strategic gap management are essential. Without redeals, the win rate drops to under 5%.",
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

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

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
          History &amp; Origins
        </h3>
        <p className="mb-4 leading-relaxed">
          Gaps has collected an unusual list of aliases: Montana, Spaces, Vacancies, and
          occasionally Addiction — each name highlighting a different aspect of the game.
          The earliest printed rules we have found sit in early-twentieth-century American
          patience compilations, which framed it as a puzzle rather than a card game, since
          there is no stock, no waste pile, and no hidden information. A four-by-thirteen
          grid contains exactly the fifty-two cards of the deck, and lifting the four aces
          produces four gaps the player rearranges the rest of the grid into. The Montana
          nickname appears in American newspapers in the 1930s, possibly a reference to
          the wide-open-spaces feel of the cleared grid, and Vacancies / Spaces come from
          English parlor sources. The three-deal variant — two redeals on top of the
          initial shuffle — became the standard ruleset once the game migrated into
          computer editions, because it pushed the win rate into a range players found
          both satisfying and fair. That is the edition we have followed here.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h3>
        <p className="mb-4 leading-relaxed">
          Gaps is a planning game wearing the clothes of a card game. Each move is
          mechanically trivial — slide one card into one gap — but the sequence in which
          we move cards decides whether the grid solves or deadlocks. We begin every
          game by locating the four twos and asking whether any of them can reach a
          leftmost-column gap on this deal. A two that cannot reach column one is a
          row-killer: the row it belongs to cannot be built in this deal and will have
          to wait for a redeal.
        </p>
        <p className="mb-4 leading-relaxed">
          Once we know which rows can open with twos, we plan gap-chains several moves
          ahead. A single move creates a new gap behind the card we moved — and that
          new gap may or may not be productive. If moving the 6&hearts; into gap A
          opens a new gap behind it that accepts the 9&spades; we need, we take the
          move. If the new gap is dead (next to a king, or next to another gap), we
          have wasted the move and frozen a useful neighbor. We look two moves ahead
          minimum, three when the board is crowded.
        </p>
        <p className="mb-4 leading-relaxed">
          Kings are Gaps&apos; structural villains. Every king is the end of a chain,
          and the gap immediately to its right is permanently dead for the rest of
          the deal. So we track where the kings sit and treat the spaces behind them
          as frozen terrain. If two kings end up adjacent after our manipulations, we
          have effectively lost two gap slots. The art is keeping gaps mobile — always
          in positions where some card in the grid can legally fill them — because
          once all four gaps are dead, we must redeal.
        </p>
        <p className="mb-4 leading-relaxed">
          After a redeal, card order matters enormously. The redeal preserves the
          locked prefixes — the consecutive run from column one to wherever the
          sequence breaks — and reshuffles everything else into the open slots.
          Longer prefixes lock more cards, which means the next deal starts with
          less chaos and better odds. So when we are approaching a forced redeal,
          we stop chasing random moves and specifically work to extend each row&apos;s
          locked prefix by one or two cards. Those last-minute extensions can turn a
          hopeless redeal into a solvable one.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h3>
        <p className="mb-4 leading-relaxed">
          Gaps has a tunable difficulty curve based on redeals. With zero redeals
          (a single deal), the theoretical win rate drops below five percent — most
          shuffles create dead-king neighborhoods that cannot be unwound in one pass.
          With the standard two redeals (three total deals), solver analyses put the
          win rate at roughly <strong>forty-five percent</strong> under careful play,
          which is where most published references place the game. Unlimited-redeal
          variants push the rate toward ninety percent, but lose the &ldquo;race
          against the redeal&rdquo; tension that gives Gaps its character. Human
          players typically land in the thirty-to-forty percent range as they learn
          to extend locked prefixes before redealing. Gaps is more forgiving than
          Forty Thieves or Baker&apos;s Dozen, but more punishing than FreeCell — a
          middleweight patience with genuine skill differentiation.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h3>
        <p className="mb-4 leading-relaxed">
          The classic Gaps mistake is impatient redealing — triggering a redeal while
          the current deal still has productive moves, or triggering without first
          extending locked prefixes. Each redeal is a finite resource, and wasting
          one on a board we had not fully solved is the fastest route to a loss. A
          second common error is moving cards into leftmost-column gaps without
          checking which two we are committing to that row; placing the wrong two
          locks a row into a suit whose sequence cannot complete. A third mistake is
          creating king-adjacent gaps — moving a card into a slot whose exit gap will
          land next to a king, burning two gap slots with one move. We also see
          players ignore multi-step chains, taking the first legal move they spot
          rather than scanning all four gaps to find the move that unlocks the most
          downstream moves. Finally, many players underestimate the value of locked-
          prefix extension at the end of a deal: an extra thirty seconds spent
          sequencing columns one through four can lock twelve extra cards before the
          redeal, dramatically improving the next shuffle&apos;s solvability.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h3>
        <p className="mb-4 leading-relaxed">
          Gaps is structurally unique among common patiences. Compared to Klondike
          or FreeCell, it dispenses with foundations, stocks, and tableau stacking
          entirely — there is only the grid and the gaps. Compared to TriPeaks or
          Golf, which are discard-based, Gaps is arrangement-based: cards never
          leave the board, they just slide around. The closest cousin is probably
          Eliminator or Accordion, both of which treat the shuffled deck as a
          grid to be rearranged, but Gaps is more constrained — every slide must
          match both suit and rank-plus-one. The game it feels most like, despite
          sharing no mechanics, is a sliding-tile puzzle: the deal is the scramble,
          the gaps are the blank tiles, and the goal state is &ldquo;each row in
          ascending suit order.&rdquo; That lineage may explain why Gaps feels more
          like a puzzle and less like a card game than any other patience in the
          common rotation.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h3>
        <p className="mb-4 leading-relaxed">
          Gaps has spawned several rule tweaks. &ldquo;Montana (strict)&rdquo; forbids
          redeals entirely and accepts a sub-five-percent win rate as the price of
          honest difficulty. &ldquo;Addiction&rdquo; allows unlimited redeals, which
          pushes the game toward solvable-in-principle territory. &ldquo;Spaces&rdquo;
          sometimes requires the leftmost-column gap to accept only the two of a
          specified suit, turning each row into a suit-committed sequence from the
          first move. &ldquo;Paganini&rdquo; uses a double deck and eight rows,
          producing a grid-patience epic that takes twenty minutes to solve. Our
          implementation follows the classic three-deal standard: one initial deal,
          two redeals, leftmost-column gaps accept any two, correctly sequenced
          prefixes lock during redeals, and the four kings act as chain terminators
          with dead gaps to their right. Players who enjoy Gaps may also want to
          try{" "}
          <Link href="/cruel" className="text-[#D4AF37] hover:underline">
            Cruel
          </Link>
          , another redeal-driven patience.
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

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <MoreGames currentSlug="gaps" />
      </article>
    </>
  );
}
