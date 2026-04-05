import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import PyramidGamePage from "./PyramidGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Pyramid Solitaire | Play Online Free — No Download",
  description:
    "Play Pyramid Solitaire online for free. Match pairs of cards that total 13 to clear the pyramid. Undo, hints, and statistics. No download required.",
  keywords: [
    "pyramid solitaire",
    "pyramid solitaire online",
    "play pyramid solitaire",
    "free pyramid solitaire",
    "pyramid solitaire free",
    "pyramid card game",
    "pyramid solitaire no download",
    "solitaire online",
    "card matching game",
    "pairs to 13 solitaire",
  ],
  openGraph: {
    title: "Pyramid Solitaire | Play Online Free — No Download",
    description:
      "Play Pyramid Solitaire online for free. Match pairs of cards that total 13 to clear the pyramid. No download required.",
    url: absoluteUrl("/pyramid"),
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
    name: "Pyramid Solitaire",
    description:
      "Free online Pyramid Solitaire. Match pairs of cards that total 13 to clear the pyramid.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/pyramid"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "1634",
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
        name: "Pyramid Solitaire",
        item: absoluteUrl("/pyramid"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Pyramid Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pyramid Solitaire is a classic card game where you remove all 28 cards from a seven-row pyramid by pairing cards that add up to 13. Kings are removed alone (value 13), while other cards must be matched in pairs: Queen+Ace, Jack+2, 10+3, 9+4, 8+5, and 7+6.",
        },
      },
      {
        "@type": "Question",
        name: "How do you win Pyramid Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You win by removing all 28 pyramid cards. To expose cards higher in the pyramid, you must first remove the cards overlapping them from below. Use the stock pile to draw additional cards you can pair with pyramid cards. You get two stock recycles per game.",
        },
      },
      {
        "@type": "Question",
        name: "What card values are used in Pyramid Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aces count as 1, numbered cards 2–10 count as face value, Jacks count as 11, Queens count as 12, and Kings count as 13. Kings are the only cards removed alone. All other cards must be paired with another card so the two values add up to exactly 13.",
        },
      },
      {
        "@type": "Question",
        name: "Can you always win Pyramid Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — not every deal of Pyramid Solitaire is winnable. The game has a relatively low win rate compared to FreeCell or Klondike. However, strategic play, careful use of stock recycles, and prioritising cards that unblock the top of the pyramid can significantly improve your chances.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Pyramid Solitaire and TriPeaks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pyramid Solitaire requires pairing cards that sum to 13, while TriPeaks uses a ±1 rank mechanic similar to Golf Solitaire. Pyramid has a single pyramid layout, while TriPeaks uses three overlapping peaks. The two games share a similar card-clearing objective but play very differently.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <PyramidGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Pyramid Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-03-27"
            updatedDate="2026-03-27"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Pyramid Solitaire is a classic card game where the goal is to remove
          all 28 cards from a seven-row pyramid by pairing cards that add up to
          13. Kings are removed on their own (value 13), while other cards must
          be matched: Queen + Ace, Jack + 2, 10 + 3, 9 + 4, 8 + 5, and 7 + 6.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How It Works
        </h2>
        <p className="mb-4 leading-relaxed">
          A standard 52-card deck is dealt into a pyramid of 7 rows. Row 1 has
          1 card, row 2 has 2 cards, and so on down to 7 cards in the bottom
          row. Each card partially overlaps two cards in the row below. The
          remaining 24 cards form the stock pile.
        </p>
        <p className="mb-4 leading-relaxed">
          A card is &quot;exposed&quot; when both cards overlapping it from the
          row below have been removed (or it&apos;s on the bottom row). Only
          exposed pyramid cards and the top waste card can be paired. Click the
          stock to draw cards to the waste pile. You get 2 stock recycles per
          game.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Card Values
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong className="text-white/90">Ace</strong> = 1</li>
          <li><strong className="text-white/90">2–10</strong> = face value</li>
          <li><strong className="text-white/90">Jack</strong> = 11</li>
          <li><strong className="text-white/90">Queen</strong> = 12</li>
          <li><strong className="text-white/90">King</strong> = 13 (removed alone)</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Tips for Winning
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Remove Kings immediately — they&apos;re free plays</li>
          <li>Prioritize uncovering cards near the top of the pyramid</li>
          <li>Try to keep both sides of the pyramid balanced</li>
          <li>Save your stock recycles for when you truly need them</li>
          <li>Use the hint button when you&apos;re stuck</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Pyramid is one of the older documented patience games, appearing in
          nineteenth-century collections alongside Klondike and Accordion. Early
          patience compilers grouped it with the &ldquo;addition&rdquo; family
          because its core mechanic — discarding cards whose values sum to a
          fixed target — predates the tableau-builder games that now dominate
          solitaire. The sum-to-thirteen rule is the defining fingerprint, and
          almost every later variant inherits it unchanged. Because the rules
          are so simple, the game travelled easily: we find nearly identical
          layouts in Victorian-era English parlor books, German patience
          manuals, and French recueils under different names. The digital era
          did not reshape Pyramid the way it reshaped Klondike or FreeCell — it
          simply exposed how punishing the math can be once a dealer stops
          reshuffling sympathetically on our behalf.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          Winning Pyramid consistently is less about reflexes and more about
          pacing, triage, and willingness to walk away from a doomed deal. We
          lean on a handful of principles every game:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Prioritize pyramid cards over waste pairs.</strong>{" "}
            Every removal from the pyramid itself unblocks a card above; every
            removal that only involves the waste or stock leaves the structure
            intact. When a choice exists, we pair inside the pyramid first.
          </li>
          <li>
            <strong className="text-white/90">Pair the expensive ranks early.</strong>{" "}
            Jacks, Queens, and Aces have only a single matching rank (2, A, and
            Q respectively). If we let a Queen sit in the waste until the last
            Ace is buried, the game is effectively over. Kings are free removals
            with no partner required, so we clear them the instant they become
            exposed.
          </li>
          <li>
            <strong className="text-white/90">Count remaining value cards.</strong>{" "}
            A quiet mental tally of how many 8s, 5s, and Aces are still live
            tells us when a column is starving the pyramid of matches. If two
            Aces are already buried under the same Queen, we know we need the
            other two.
          </li>
          <li>
            <strong className="text-white/90">Respect the pyramid layer order.</strong>{" "}
            Row 7 blocks row 6 blocks row 5. Clearing a bottom-row card only
            helps if it unlocks one of the two parents above. We choose between
            adjacent options by looking one layer up.
          </li>
          <li>
            <strong className="text-white/90">Bank the stock recycles.</strong>{" "}
            Two recycles is not many. We hold the first recycle until we have
            spent the entire stock and cleared at least one exposed row so the
            second pass sees a genuinely different pyramid state.
          </li>
          <li>
            <strong className="text-white/90">Know when to restart.</strong>{" "}
            Some deals are unwinnable from the first shuffle — for example, when
            four cards of the same rank sit stacked in one column of the
            pyramid. Recognising a lost deal quickly is a skill, not a surrender.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Pyramid is one of the harder mainstream solitaire games. Reported win
          rates cluster between about 0.5% and 3% for standard Pyramid with two
          recycles, which makes it roughly a hundred times harder than FreeCell
          and an order of magnitude harder than Klondike three-card draw.
          Academic and hobbyist solvers — including analyses published on
          solitairelaboratory.com and well-known patience handbooks such as
          David Parlett&apos;s Penguin Book of Patience — report similar ranges,
          with results drifting slightly upward when &ldquo;perfect&rdquo; play
          is allowed and drifting back toward 0.5–1% for human play without
          undo. The game&apos;s difficulty comes from two compounding factors:
          the pyramid creates hard stacking dependencies (each card blocks two
          parents), and the sum-to-thirteen rule leaves no flexibility — there
          is one and only one partner for each non-King rank. Relaxed Pyramid,
          which lets us undo freely, raises win rates dramatically because we
          can recover from exploratory pair choices that would otherwise brick
          the deal.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Delaying King removals.</strong>{" "}
            Kings cost nothing to clear, yet new players often leave them in
            place while chasing a &ldquo;prettier&rdquo; pair. Every turn a King
            sits in the pyramid is a turn we wasted.
          </li>
          <li>
            <strong className="text-white/90">Burning a 6 + 7 just because we can.</strong>{" "}
            Six and seven are the most abundant match in the deck. Using one
            pair from the waste when a better pyramid-clearing pair exists
            wastes a turn and can strand a future 6 with no partner.
          </li>
          <li>
            <strong className="text-white/90">Ignoring the pyramid layer order.</strong>{" "}
            Removing both cards from a bottom-row pair that only unlocks a
            single row-6 card is weaker than removing a pair that unlocks two
            parents. We always read the layer above before committing.
          </li>
          <li>
            <strong className="text-white/90">Spending recycles chasing one card.</strong>{" "}
            Recycling the stock to find a single Queen is almost always a
            mistake when other exposed pairs remain untouched. Recycle only
            after we have exhausted the board.
          </li>
          <li>
            <strong className="text-white/90">Pairing across the stock too eagerly.</strong>{" "}
            If the top of the waste is a 9 and the pyramid contains both a 4 and
            an exposed 4 + 9 pair, pairing the waste 9 with a pyramid 4 may
            strand the remaining pyramid 4 later. We pair pyramid-internal first.
          </li>
          <li>
            <strong className="text-white/90">Forgetting to count Aces.</strong>{" "}
            There are only four Aces and four Queens. If three of either rank
            are buried under a single parent, the fourth becomes a single point
            of failure for the whole deal.
          </li>
          <li>
            <strong className="text-white/90">Misreading exposure.</strong>{" "}
            A card is only exposed when both children below it are gone. On
            mobile layouts this can look ambiguous; clicking the wrong card
            wastes a click but more importantly interrupts our planning.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          Pyramid sits in the &ldquo;discard&rdquo; family of solitaires
          alongside{" "}
          <Link href="/golf" className="text-[#D4AF37] hover:underline">
            Golf
          </Link>
          ,{" "}
          <Link href="/tripeaks" className="text-[#D4AF37] hover:underline">
            TriPeaks
          </Link>
          , and Monte Carlo. These games share the goal of clearing a fixed
          layout directly — there are no foundations to build up and no tableau
          columns to extend. Where they diverge is the removal rule. Pyramid
          uses addition (pairs summing to 13). Golf and TriPeaks use sequencing
          (any ±1 rank). That single difference pushes Pyramid toward
          combinatorial tightness — each non-King has exactly one matching
          partner rank — while Golf and TriPeaks stay loose because most cards
          have two neighbours. Compared to the cascade family
          (Klondike, FreeCell, Spider, Yukon), Pyramid is fundamentally a
          different game: no columns of alternating colours, no foundations from
          Ace to King, no long relocation chains. It rewards discipline with
          high-value cards, not spatial planning across stacks. Players who
          enjoy the endgame compression of Pyramid often enjoy{" "}
          <Link href="/monte-carlo" className="text-[#D4AF37] hover:underline">
            Monte Carlo
          </Link>{" "}
          and{" "}
          <Link href="/accordion" className="text-[#D4AF37] hover:underline">
            Accordion
          </Link>
          , both of which also reward careful partner selection under heavy
          pairing constraints.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          Pyramid has spawned a small ecosystem of rule tweaks that soften or
          sharpen the core challenge:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Relaxed Pyramid.</strong>{" "}
            Unlimited undo and no recycle cap. Win rates climb toward the
            10–15% range because bad pair choices can be rewound. This is the
            variant most app versions default to.
          </li>
          <li>
            <strong className="text-white/90">Giza Pyramid.</strong>{" "}
            Three extra reserve cells let us park awkward cards during the
            endgame. Effectively converts three stock draws into free storage.
          </li>
          <li>
            <strong className="text-white/90">Tut&apos;s Tomb (Double Pyramid).</strong>{" "}
            Two decks, two pyramids, all sums to 13. Longer game, lower
            variance. A good choice once we have the base rules automated.
          </li>
          <li>
            <strong className="text-white/90">Apophis and similar reserve-row
            variants.</strong> Deals a short reserve row alongside the stock to
            give us an extra matching surface each turn.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 mb-8">
          <details className="border border-white/10 rounded p-4">
            <summary className="font-semibold text-white/90 cursor-pointer">
              Can you always win Pyramid Solitaire?
            </summary>
            <p className="mt-2 text-white/70">
              No — not every deal is winnable. Pyramid has a lower win rate than FreeCell or Klondike.
              Strategic play and careful use of your two stock recycles can improve your chances, but
              some layouts are unsolvable from the start.
            </p>
          </details>
          <details className="border border-white/10 rounded p-4">
            <summary className="font-semibold text-white/90 cursor-pointer">
              What is the difference between Pyramid and TriPeaks Solitaire?
            </summary>
            <p className="mt-2 text-white/70">
              Pyramid requires pairing cards that sum to 13, while TriPeaks uses a ±1 rank mechanic.
              Pyramid uses a single pyramid layout; TriPeaks uses three overlapping peaks. Both involve
              clearing a card layout, but the mechanics are very different.
            </p>
          </details>
          <details className="border border-white/10 rounded p-4">
            <summary className="font-semibold text-white/90 cursor-pointer">
              How many stock recycles do you get?
            </summary>
            <p className="mt-2 text-white/70">
              You get 2 stock recycles per game. Use them wisely — save them for when you are truly
              stuck, not just when a better card hasn&apos;t appeared yet.
            </p>
          </details>
        </div>

        <div className="mb-8">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h2>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/pyramid/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Pyramid Solitaire
            </Link>{" "}
            — Complete rules and setup guide
          </li>
          <li>
            <Link
              href="/pyramid/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Pyramid Strategy Guide
            </Link>{" "}
            — Advanced tips to win more games
          </li>
          <li>
            <Link
              href="/klondike"
              className="text-[#D4AF37] hover:underline"
            >
              Play Klondike Solitaire
            </Link>{" "}
            — The classic solitaire game
          </li>
          <li>
            <Link
              href="/spider"
              className="text-[#D4AF37] hover:underline"
            >
              Play Spider Solitaire
            </Link>{" "}
            — Another popular solitaire variant
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
        <MoreGames currentSlug="pyramid" />
      </article>
    </>
  );
}
