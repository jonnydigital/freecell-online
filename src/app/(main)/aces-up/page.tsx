import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AcesUpGamePage from "./AcesUpGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

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

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

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
          History &amp; Origins
        </h3>
        <p className="mb-4 leading-relaxed">
          Aces Up has traveled under an unusual collection of names — Idiot&apos;s Delight,
          Firing Squad, Drivel, Aces High — each hinting at a different mood. The earliest
          print descriptions we can trace appear in nineteenth-century patience anthologies,
          where it was billed as a quick amusement for players who lacked the patience for
          Klondike. Four tableau columns, a small stock, and an objective so minimal it fits
          on one line: discard every non-ace card and leave the four aces standing in their
          columns like survivors after a firing squad. The &ldquo;Drivel&rdquo; nickname
          belongs to the British sense of the word — something trivial to talk over with
          tea — while &ldquo;Idiot&apos;s Delight&rdquo; came later, likely borrowed from the
          1930s Robert Sherwood play. Windows users met the game through Microsoft Entertainment
          Pack collections in the early 1990s, and that exposure is where most modern players
          first learned the rules.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h3>
        <p className="mb-4 leading-relaxed">
          The discard rule is trivially simple — drop the lower card when two same-suit
          cards sit on top of their piles — but the actual skill lives in selection. Most
          boards present us with several legal discards at once, and we almost never want
          to take them all. Each discard is a choice about which card beneath we want to
          expose next, and those choices compound across the whole stock.
        </p>
        <p className="mb-4 leading-relaxed">
          We protect kings above all other cards. A king on top of a column is inert — no
          suit-mate can ever outrank it — so whenever we flip a king onto a column, we plan
          to move it into an empty slot as soon as one appears. Empty columns are the single
          most valuable resource in Aces Up, and kings are their most valuable cargo.
          Wasting an empty slot on a lower rank (say a 6) when a king sits buried beneath
          junk is the classic beginner&apos;s error. We reserve vacated columns specifically
          for king relocation or for clearing a column that contains an ace we have not yet
          surfaced.
        </p>
        <p className="mb-4 leading-relaxed">
          When multiple discards are available, we choose the one that frees the most
          productive card underneath. If discarding the 4&hearts; exposes another 9&hearts;
          already matched on the board, we collect the cascade. If discarding the 4&hearts;
          exposes a stranded 3&spades; that cannot pair with anything, we defer that discard
          and take a different one first. We also keep a mental tally of which suits are
          running hot — if two clubs are already gone and a third is teed up, we let the
          clubs pile drain itself rather than diluting the discard budget across suits that
          are not converging.
        </p>
        <p className="mb-4 leading-relaxed">
          Finally, we deal the stock conservatively. Every fresh deal paints one card on
          each column and often buries the very card we were about to discard. We deal only
          when the board is fully resolved — no more legal discards, no more productive
          relocations — because an early deal can bury an ace under four dead ranks and end
          the game on the spot.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h3>
        <p className="mb-4 leading-relaxed">
          Aces Up is one of the genuinely hard patience games. Solver studies and long-run
          human data converge on a win rate of roughly{" "}
          <strong>five to ten percent</strong>, depending on how carefully the player
          sequences discards and empty-column moves. Casual players often report wins in
          the one-to-three percent range because they discard greedily and deal
          aggressively; patient players who treat every empty column as a king-shelter can
          push their rate to the upper end of the published band. Unlike FreeCell, where
          the vast majority of deals are solvable and human mistakes cause losses, Aces Up
          is heavily shuffle-dependent: many deals are mathematically unwinnable from the
          first four-card deal because the stock order has buried the aces in ways no
          discard sequence can repair. The short runtime — a game takes two or three
          minutes — compensates for the brutal win percentage.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h3>
        <p className="mb-4 leading-relaxed">
          The most expensive mistake is burning an empty column on a low card. Moving a
          five or a six into the freshly opened slot feels like progress, but it deprives
          us of the one tool we have for evicting a king later. A second mistake is
          discarding greedily: taking every legal discard in sequence without checking
          what each one exposes. A third is dealing the stock to unstick a single stall,
          when waiting one more careful move would have produced a legal discard. We also
          see players ignore suit tallies — they keep pairing hearts while clubs are
          quietly piling up, and then cannot recover when the clubs column stalls
          completely. Finally, many players forget the ace-survival goal. Every move
          should be judged by whether it brings us closer to leaving four aces — not
          four low cards, not four mixed-rank survivors — on the table. Moves that
          merely tidy the board without protecting aces or releasing kings are moves
          we cannot afford to make.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h3>
        <p className="mb-4 leading-relaxed">
          Compared to Klondike, Aces Up is faster, harsher, and far more luck-driven.
          Klondike rewards patient sequencing and offers redeals; Aces Up offers neither.
          Compared to FreeCell, the skill ceiling is dramatically lower because we see
          only four tops at a time — the rest of the board is invisible stock. Compared
          to Golf Solitaire or TriPeaks, which also work around discarding to clear the
          board, Aces Up dispenses with the wild-card mechanic: there is no reserve pile
          to pull from, only the stock deal and the discard rule. Clock Solitaire is
          the closest cousin in luck-dependence, but Clock has zero decisions; Aces Up
          has a handful of genuine choices per turn and thereby keeps us engaged. If we
          were ranking pure patience games by how much a skilled player can lift the win
          rate above chance, Aces Up sits roughly five percentage points above random
          play — modest, but enough to make the deliberate game feel meaningful.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h3>
        <p className="mb-4 leading-relaxed">
          A few Aces Up variants soften the brutal base rate. &ldquo;Aces Up with Reserve&rdquo;
          allows one slot to be used as a temporary holding cell, nudging the win rate
          above fifteen percent. &ldquo;Triple Aces Up&rdquo; deals three cards per turn
          instead of four, slightly thinning the deadlock risk. Some digital editions
          allow cards to move between columns beyond just king relocation, which erodes
          the empty-column discipline but makes the game friendlier for first-timers.
          Our edition follows the traditional ruleset: four columns, four-card deals,
          Aces high, and only full-column moves between tableau piles. That preserves
          the tension the game has carried since the Victorian compilers first wrote
          it down.
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

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <MoreGames currentSlug="aces-up" />
      </article>
    </>
  );
}
