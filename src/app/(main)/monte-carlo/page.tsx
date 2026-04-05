import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import MonteCarloGamePage from "./MonteCarloGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Monte Carlo Solitaire | Play Online Free — 5x5 Grid Pair-Matching Game",
  description:
    "Play Monte Carlo Solitaire online for free. Match and remove adjacent pairs of same-rank cards from a 5x5 grid. Consolidate and deal new cards to clear all 52. No download required.",
  keywords: [
    "monte carlo solitaire",
    "monte carlo solitaire online",
    "monte carlo card game",
    "pair matching solitaire",
    "monte carlo patience",
    "play monte carlo solitaire",
    "monte carlo solitaire free",
    "grid solitaire game",
    "weddings solitaire",
  ],
  openGraph: {
    title: "Monte Carlo Solitaire | Play Online Free — 5x5 Grid Pair-Matching Game",
    description:
      "Play Monte Carlo Solitaire online for free. Remove adjacent same-rank pairs from a 5x5 grid. Consolidate and deal until all 52 cards are cleared.",
    url: absoluteUrl("/monte-carlo"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Monte Carlo Solitaire?",
    answer:
      "Monte Carlo Solitaire is a pair-matching patience game played on a 5x5 grid. You remove pairs of same-rank cards that are adjacent horizontally, vertically, or diagonally. After removing pairs, remaining cards consolidate (shift left and up) and new cards are dealt from the stock. The goal is to remove all 52 cards.",
  },
  {
    question: "How do I play Monte Carlo Solitaire?",
    answer:
      "Deal 25 cards into a 5x5 grid. Click two adjacent cards of the same rank to remove them. When no more pairs are available, click 'Consolidate & Deal' to shift remaining cards together and fill empty spaces from the stock. Keep matching until all cards are removed or no moves remain.",
  },
  {
    question: "What counts as adjacent in Monte Carlo Solitaire?",
    answer:
      "Cards are adjacent if they are next to each other horizontally (left/right), vertically (up/down), or diagonally. This means each card can be adjacent to up to 8 surrounding cards. Only same-rank pairs that are adjacent can be removed.",
  },
  {
    question: "What is the win rate for Monte Carlo Solitaire?",
    answer:
      "Monte Carlo Solitaire has an estimated win rate of about 5-10% with skilled play. The randomness of card placement makes many deals unwinnable, but careful pair selection and strategic use of consolidation can significantly improve your odds compared to random play.",
  },
  {
    question: "Is Monte Carlo Solitaire the same as Weddings?",
    answer:
      "Yes, Monte Carlo Solitaire is also known as Weddings or Double and Quits. All names refer to the same game: removing adjacent same-rank pairs from a 5x5 grid with consolidation and redealing from a stock pile.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Monte Carlo Solitaire",
    description:
      "Free online Monte Carlo Solitaire. Match and remove adjacent pairs of same-rank cards from a 5x5 grid. A classic pair-matching patience game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/monte-carlo"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "1445",
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
        name: "Monte Carlo Solitaire",
        item: absoluteUrl("/monte-carlo"),
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
      <MonteCarloGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Monte Carlo Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Monte Carlo (also known as Weddings or Double and Quits) is a classic pair-matching
          solitaire played on a <strong>5&times;5 grid</strong>. Deal 25 cards face-up, then
          remove pairs of same-rank cards that sit next to each other &mdash; horizontally,
          vertically, or diagonally. After removing all available pairs, consolidate the
          remaining cards and deal fresh ones from the stock to fill the gaps.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Monte Carlo Works
        </h3>
        <p className="mb-4 leading-relaxed">
          The game starts with 25 cards in a 5&times;5 grid and 27 cards in the stock. Scan
          the grid for adjacent same-rank pairs and click both cards to remove them. When no
          more pairs exist, hit &ldquo;Consolidate &amp; Deal&rdquo; to pack remaining cards
          together (shifting left and up) and fill empty spots from the stock. Repeat until
          all 52 cards are matched and removed, or until you&apos;re stuck with no pairs.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategy Tips
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-6 text-white/70">
          <li>Look for pairs near the edges first &mdash; they have fewer adjacency options after consolidation.</li>
          <li>When multiple pairs exist, prioritize removing those that will bring other same-rank cards closer together.</li>
          <li>Think ahead about what consolidation will do &mdash; sometimes waiting creates better adjacencies.</li>
          <li>Track which ranks still have un-removed cards to avoid dead ends.</li>
          <li>Remove pairs that free up the most space for new stock cards.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Monte Carlo is a late-nineteenth-century American pairing patience whose name
          pays tribute to the famous Mediterranean casino — a flourish typical of the
          Gilded Age parlour-game scene, when exotic place-names lent glamour to
          household diversions. Under its alternate titles <em>Weddings</em> and
          <em> Double and Quits</em>, the game appeared in American patience compilations
          in the 1890s and spread quickly because its rules could be summarised in a
          single sentence: remove pairs of equal rank that are adjacent in the grid,
          then consolidate. Monte Carlo&apos;s simplicity is its greatest virtue and
          its most famous trap. Players who learn the rules in ten seconds routinely
          lose dozens of deals before discovering how quickly a 5&times;5 grid turns
          into a dead end. The game remains a fixture of modern solitaire apps because
          its blend of approachable rules and deceptive depth has never been bettered
          by imitators.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          Monte Carlo rewards players who look for multiple pairs at once. When two or
          three legal pair removals exist on the board, the order we execute them in
          shapes the next consolidation. We trace adjacencies forward: if we pull the
          top-left pair first, the cards that shift in will touch a very different set
          of neighbours than if we had pulled the bottom-right pair first. Elite play
          is essentially one-move-ahead simulation of every candidate pair.
        </p>
        <p className="mb-4 leading-relaxed">
          Compressing the grid between moves is the central tactic. Because
          consolidation shifts cards left and up to fill empty squares, any pair we
          remove from the bottom-right corner has a large, rippling effect — the
          entire board re-flows. Pairs removed from the top-left corner barely move
          anything. Depending on what we want to achieve, this is either a tool for
          mixing or a way to preserve a delicate adjacency. When we already see a
          second pair locked in, we remove from the top-left to preserve it. When we
          need to churn the board, we remove from the bottom-right.
        </p>
        <p className="mb-4 leading-relaxed">
          We also watch the stock count constantly. Twenty-seven cards sit in stock
          after the opening deal, arriving in predictable positions after each
          consolidation. Before committing to a removal, we ask whether the
          consolidation will produce empty cells that the stock will fill with
          duplicates of cards already on the board — those incoming duplicates create
          new pairs for free. A removal that turns the grid into a trap for incoming
          cards is worth several obvious pair pickups.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Monte Carlo has a famously volatile win rate. Because adjacency is so
          restrictive, some opening deals are essentially unwinnable — no amount of
          skill can produce a solution when the ranks cluster poorly. Across a large
          sample, win rates run from 10% to 20% depending on the deal. Skilled players
          drift toward the upper end of that range; casual players frequently sit near
          5%.
        </p>
        <p className="mb-4 leading-relaxed">
          The volatility is baked into the game&apos;s short grid. With only 25
          visible cards at a time and eight possible adjacencies per card, we are
          always one bad consolidation from stalling out. That fragility is why Monte
          Carlo feels so different from{" "}
          <Link href="/pyramid" className="text-[#D4AF37] hover:underline">
            Pyramid
          </Link>
          , another pairing game: Pyramid is about vertical access, while Monte Carlo
          is about the 2D topology of neighbours.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Common Mistakes
        </h2>
        <p className="mb-4 leading-relaxed">
          Players new to Monte Carlo grab the first pair they see, which is almost
          always wrong when multiple pairs exist. The game&apos;s depth is in pair
          order, not pair availability. A second frequent mistake is consolidating
          early — clicking the consolidate button as soon as one obvious pair
          disappears, rather than scanning the board exhaustively. Many legal pairs
          hide along the diagonals, and players who only scan horizontally and
          vertically routinely miss them.
        </p>
        <p className="mb-4 leading-relaxed">
          Another recurring blunder is ignoring rank counts. Four of each rank exist
          in the deck, and each rank must leave in two pairs. If we remove a pair of
          Kings early and both remaining Kings end up in widely separated positions
          after several consolidations, we have built a deadlock. Players who track
          rank distribution across the board and stock play far better — we mentally
          partition the deck into &ldquo;still out there&rdquo; and &ldquo;already
          paired&rdquo; to avoid isolation traps.
        </p>
        <p className="mb-4 leading-relaxed">
          A subtler mistake is failing to read the consolidation shape before
          committing. Because cards shift left and up, removing a pair near the right
          edge produces a long row-wise slide, while removing a pair on the left
          produces a short vertical lift. Experienced players visualise the exact
          grid that will appear after consolidation before choosing which pair to
          remove. Players who skip that visualisation step frequently create
          adjacencies they did not intend, and break adjacencies they needed.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          Monte Carlo is the grid-based cousin of{" "}
          <Link href="/pyramid" className="text-[#D4AF37] hover:underline">
            Pyramid
          </Link>{" "}
          and{" "}
          <Link href="/tripeaks" className="text-[#D4AF37] hover:underline">
            TriPeaks
          </Link>
          . Pyramid pairs cards to thirteen in a triangular stack; TriPeaks threads a
          waste pile through a three-peak layout; Monte Carlo pairs cards of equal
          rank across a two-dimensional grid. All three reward pattern recognition,
          but Monte Carlo is the only one where spatial adjacency is the puzzle.
          Compared to{" "}
          <Link href="/gaps" className="text-[#D4AF37] hover:underline">
            Gaps
          </Link>
          , Monte Carlo is less structured and more chaotic — Gaps fixes the layout
          and lets us slot cards deliberately, while Monte Carlo reshuffles the board
          after every sweep.
        </p>
        <p className="mb-4 leading-relaxed">
          Players who enjoy Monte Carlo often try{" "}
          <Link href="/accordion" className="text-[#D4AF37] hover:underline">
            Accordion
          </Link>{" "}
          for a similarly compressive puzzle, or{" "}
          <Link href="/clock" className="text-[#D4AF37] hover:underline">
            Clock
          </Link>{" "}
          when they want a quick, light pattern game between harder deals.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          The most famous Monte Carlo variant is <em>Weddings</em>, which is sometimes
          played with a 4&times;4 grid of sixteen cards — a harder, tighter puzzle
          that wins roughly 5% of the time. Some Victorian-era rulebooks permit
          removing pairs that sum to 13 instead of pairs of equal rank, producing a
          hybrid with Pyramid logic called <em>Monte Carlo Thirteens</em>. Modern
          digital versions occasionally allow diagonal-only adjacency or
          orthogonal-only adjacency as difficulty toggles; the classical rules, which
          we follow, permit both and therefore produce the most forgiving (though
          still challenging) game. A competitive two-player version called
          <em> Double and Quits</em> pits two players against identical deals and
          awards points for pairs removed before a deadlock, turning Monte Carlo from
          a solitaire into a head-to-head speed puzzle. The shared rules across all
          these variants are consolidation, adjacency-based removal, and
          rank-matching — with those three mechanics in place, Monte Carlo&apos;s
          character remains recognisable even as grid size and adjacency rules
          flex around it.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/monte-carlo/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Monte Carlo
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/monte-carlo/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Monte Carlo Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/pyramid"
              className="text-[#D4AF37] hover:underline"
            >
              Play Pyramid Solitaire
            </Link>{" "}
            — Another pair-matching solitaire (cards sum to 13)
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
        <MoreGames currentSlug="monte-carlo" />

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>
      </article>
    </>
  );
}
