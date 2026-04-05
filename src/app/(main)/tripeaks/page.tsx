import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import TriPeaksGamePage from "./TriPeaksGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "TriPeaks Solitaire | Play Online Free — No Download",
  description:
    "Play TriPeaks Solitaire online for free. Clear three peaks by playing cards one rank higher or lower than the waste pile. Streak scoring, undo, hints. No download required.",
  keywords: [
    "tripeaks solitaire",
    "tripeaks solitaire online",
    "tripeaks solitaire free",
    "tri peaks solitaire",
    "triple peaks solitaire",
    "tripeaks card game",
    "tripeaks solitaire no download",
    "play tripeaks online",
    "solitaire online",
    "three peaks card game",
  ],
  openGraph: {
    title: "TriPeaks Solitaire | Play Online Free — No Download",
    description:
      "Play TriPeaks Solitaire online for free. Clear three peaks by matching cards ±1 rank. No download required.",
    url: absoluteUrl("/tripeaks"),
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
    name: "TriPeaks Solitaire",
    description:
      "Free online TriPeaks Solitaire. Clear three peaks by playing cards one rank higher or lower than the waste pile.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/tripeaks"),
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
        name: "TriPeaks Solitaire",
        item: absoluteUrl("/tripeaks"),
      },
    ],
  };

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "TriPeaks Solitaire",
    description: "Clear three overlapping peaks by playing cards one rank higher or lower than the waste pile. Streak scoring, undo, hints.",
    numberOfPlayers: 1,
    genre: "Card Game",
    gamePlatform: "Web Browser",
    url: absoluteUrl("/tripeaks"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "1478",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is TriPeaks Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TriPeaks Solitaire (also called Tri Peaks or Triple Peaks) is a card game where you clear three overlapping peaks of cards by playing cards that are one rank higher or lower than the top of the waste pile. Kings can wrap to Aces and vice versa.",
        },
      },
      {
        "@type": "Question",
        name: "How do you win TriPeaks Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You win by clearing all 28 cards from the three peaks. Cards can be removed by clicking any available card that is exactly one rank higher or lower than the current waste pile card. If no moves are available, draw from the stock pile.",
        },
      },
      {
        "@type": "Question",
        name: "What is the streak bonus in TriPeaks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each consecutive card you play without drawing from the stock increases your streak multiplier. The first card in a streak earns 1 point, the second earns 2, the third earns 3, and so on. Drawing from the stock resets the streak to zero. Long streaks are key to high scores.",
        },
      },
      {
        "@type": "Question",
        name: "Does King wrap to Ace in TriPeaks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. In TriPeaks Solitaire, ranks wrap around. You can play a King on an Ace or an Ace on a King. This wrapping rule opens up more possible moves and is part of what makes TriPeaks faster-paced than many other solitaire variants.",
        },
      },
      {
        "@type": "Question",
        name: "Is TriPeaks Solitaire the same as Pyramid Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. While both feature pyramid-shaped card layouts, the mechanics are different. Pyramid Solitaire removes pairs of cards that sum to 13, while TriPeaks removes single cards that are ±1 rank from the waste pile top. TriPeaks uses three smaller peaks instead of one large pyramid.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={gameJsonLd} />
      <JsonLd data={faqJsonLd} />
      <TriPeaksGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          TriPeaks Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-03-27"
            updatedDate="2026-03-27"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          TriPeaks Solitaire (also known as Tri Peaks or Triple Peaks) is a fast-paced
          solitaire card game where the goal is to clear three overlapping peaks of
          cards. Unlike Pyramid Solitaire which pairs cards to 13, TriPeaks lets you
          remove any available card that is one rank higher or lower than the current
          waste pile card — and ranks wrap around, so Kings connect to Aces.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How It Works
        </h2>
        <p className="mb-4 leading-relaxed">
          A standard 52-card deck is dealt into three peaks. The peaks share a base
          row of 10 face-up cards. Above the base, 18 cards are dealt face-down in
          three pyramid formations. Cards flip face-up when both cards covering them
          are removed. The remaining cards form the stock pile, with one card drawn
          to start the waste pile.
        </p>
        <p className="mb-4 leading-relaxed">
          Click any available face-up card that is exactly one rank higher or lower
          than the waste pile top to play it. If no moves are available, click the
          stock to draw a new card. The game ends when all peaks are cleared (you win)
          or when no moves remain and the stock is empty.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Scoring &amp; Streaks
        </h2>
        <p className="mb-4 leading-relaxed">
          TriPeaks features a streak-based scoring system. Each consecutive card you
          play without drawing from the stock increases your streak multiplier. The
          first card in a streak earns 1 point, the second earns 2, the third earns 3,
          and so on. Drawing from the stock resets the streak to zero. Building long
          chains of consecutive plays is the key to achieving high scores.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Tips for Winning
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Plan runs of cards to build long streaks for maximum points</li>
          <li>Prioritize uncovering peak tops — clearing a peak opens many cards</li>
          <li>Look for paths that alternate up and down through available cards</li>
          <li>Save stock draws for when you truly have no playable cards</li>
          <li>Remember that Kings and Aces connect — use wrapping to extend streaks</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          TriPeaks is one of the few widely-played solitaire variants with a known
          designer and birth year. Robert Hogue created it in 1989 for US Gold, and
          it entered mainstream computing when Microsoft bundled it with the
          Entertainment Pack series in the early 1990s. That bundle was the first
          time millions of office workers encountered a solitaire game that was not
          Klondike, and the streak-scoring hook made TriPeaks stick. Structurally, it
          borrows the peak-and-base silhouette from Pyramid and the ±1 sequencing
          rule from Golf Solitaire, then adds face-down tiers that flip as their
          covering cards are removed. That hybrid pedigree — a visible Golf-style
          discard rule married to Pyramid-style positional blocking and a point
          multiplier — is what distinguishes it from every older patience game, and
          explains why it feels faster and more arcade-like than its siblings.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          Good TriPeaks play is chain-construction, not card-matching. We are not
          chasing individual removals — we are building the longest streak the board
          will allow. The principles we apply each game:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Build long descending (or
            ascending) ladders.</strong> A 5-6-7-8-9 chain that runs across the
            base row scores 1+2+3+4+5 = 15, versus five separate single-card
            plays worth 5. We mentally scan for ladders before drawing stock.
          </li>
          <li>
            <strong className="text-white/90">Track what the stock still owes
            us.</strong> Twenty-four cards will pass through the waste over the
            course of the game. Knowing which ranks are already gone tells us
            which ladders are still reachable and which are dead.
          </li>
          <li>
            <strong className="text-white/90">Sacrifice short chains that block
            long ones.</strong> A two-card chain that forces us to draw stock is
            often worse than pausing, drawing once, and starting a five-card
            chain from a better anchor rank.
          </li>
          <li>
            <strong className="text-white/90">Clear the middle peak early.</strong>{" "}
            The centre peak sits on base cards shared with both outer peaks.
            Removing its tier-one cards unlocks two or three covered cards on
            the flanks, multiplying downstream options.
          </li>
          <li>
            <strong className="text-white/90">Respect the base row as a
            bridge.</strong> The ten base cards connect the peaks laterally.
            They are the only cards that can enable a chain that walks across
            all three peaks, so we try to leave at least one playable base card
            in reserve.
          </li>
          <li>
            <strong className="text-white/90">Use wrap-around deliberately.</strong>{" "}
            King-to-Ace and Ace-to-King are the most-missed connections because
            they feel unnatural. We keep them on the mental menu alongside the
            normal ±1 options.
          </li>
          <li>
            <strong className="text-white/90">Reserve the final stock draws.</strong>{" "}
            The last two stock cards often decide the game. We avoid burning
            them on low-value chains when a partially-cleared peak still has
            options we have not explored.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          TriPeaks is a forgiving solitaire. Published estimates put the win rate
          between roughly 45% and 60% with competent play — meaning most deals are
          clearable, and the game&apos;s skill ceiling sits mostly in how high a
          score we post rather than whether we finish. Hobbyist analyses on
          solitairelaboratory.com and card-game databases such as Pagat generally
          cluster in the same range, with wrap-around rules nudging the rate
          upward because they double the number of legal neighbours for Kings and
          Aces. The skill-to-luck balance is genuinely even: luck determines which
          face-down cards sit under which peaks, but skill determines whether we
          convert a 6-card ladder into a 14-card streak and whether we spot the
          wrap-around that keeps a chain alive. High-score play has a much lower
          effective win rate — clearing all 28 cards with a single streak is rare
          and depends heavily on deal quality.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Clearing peaks in the wrong
            order.</strong> New players finish one outer peak completely before
            touching the middle. That often strands base cards and kills lateral
            chains. Work across peaks, not down one at a time.
          </li>
          <li>
            <strong className="text-white/90">Hoarding short chains.</strong>{" "}
            Taking a two-card streak just because it is available burns a
            playable card that could have anchored a longer sequence after one
            more stock draw.
          </li>
          <li>
            <strong className="text-white/90">Drawing without a plan.</strong>{" "}
            Stock draws should end chains we have already extracted full value
            from. Drawing &ldquo;to see what comes next&rdquo; resets our multiplier
            for no reason.
          </li>
          <li>
            <strong className="text-white/90">Forgetting to peek ahead.</strong>{" "}
            Many versions show the next stock card. Ignoring that preview leaves
            guaranteed plays on the table.
          </li>
          <li>
            <strong className="text-white/90">Treating wrap-around as an
            afterthought.</strong> The King-Ace bridge is where the longest
            streaks get built. Skipping it ends chains at 11 or 12 cards when
            14+ was reachable.
          </li>
          <li>
            <strong className="text-white/90">Ignoring peak symmetry.</strong>{" "}
            Each peak tip has two parent cards. Clearing them unevenly can strand
            the tip card under a single blocker and waste stock reveals.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          TriPeaks and{" "}
          <Link href="/golf" className="text-[#D4AF37] hover:underline">
            Golf Solitaire
          </Link>{" "}
          share the same removal rule — any ±1 rank from the waste — but differ
          in layout and pacing. TriPeaks stacks 28 cards across three peaks with
          18 face-down tier cards, creating positional blocking and surprise
          reveals. Golf lays out all 35 cards face-up in a flat 7-column
          rectangle, removing the discovery element and rewarding
          whole-board planning. Both games use streak scoring, but TriPeaks
          tends to produce longer chains because of the shared base row that
          bridges the three peaks. Compared to{" "}
          <Link href="/pyramid" className="text-[#D4AF37] hover:underline">
            Pyramid
          </Link>
          , TriPeaks shares a visual family (pyramid shapes, overlapping tiers)
          but plays completely differently: Pyramid pairs to 13, TriPeaks
          sequences by ±1. TriPeaks is closer in feel to Golf than to Pyramid
          despite sharing Pyramid&apos;s silhouette. If we enjoy TriPeaks for
          its chain-building, we typically enjoy Golf and Monte Carlo for
          similar reasons; if we enjoy it for the peak-reveal element, we tend
          to gravitate toward Pyramid and TriPeaks&apos;s own five-peak
          extensions.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          A handful of TriPeaks variants have become common in digital
          implementations:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Standard 3-Peak.</strong>{" "}
            28 cards, 18 face-down, wrap-around on. The default everywhere.
          </li>
          <li>
            <strong className="text-white/90">5-Peak Extended.</strong>{" "}
            Five peaks, 50+ cards, requires near-continuous streaks for a full
            clear. Popular in mobile implementations because it doubles session
            length.
          </li>
          <li>
            <strong className="text-white/90">No-wrap TriPeaks.</strong>{" "}
            Removes the King↔Ace bridge. Shortens most streaks by 10–20% and
            lowers win rate noticeably.
          </li>
          <li>
            <strong className="text-white/90">Redeal variants.</strong>{" "}
            Some versions let us reshuffle unused stock once or twice, pushing
            win rates higher but devaluing careful stock management.
          </li>
          <li>
            <strong className="text-white/90">Power-card versions.</strong>{" "}
            Casino-app TriPeaks typically adds wild cards and boosters that
            change the scoring economy dramatically without altering the core
            removal rule.
          </li>
        </ul>

        {/* ── FAQ Section ── */}
        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5 mb-10" itemScope itemType="https://schema.org/FAQPage">
          {[
            { q: "What is TriPeaks Solitaire?", a: "TriPeaks Solitaire (also called Tri Peaks or Triple Peaks) is a card game where you clear three overlapping peaks of cards by playing cards that are one rank higher or lower than the top of the waste pile. Kings can wrap to Aces and vice versa." },
            { q: "How do you win TriPeaks Solitaire?", a: "You win by clearing all 28 cards from the three peaks. Cards can be removed by clicking any available card that is exactly one rank higher or lower than the current waste pile card. If no moves are available, draw from the stock pile." },
            { q: "What is the streak bonus in TriPeaks?", a: "Each consecutive card you play without drawing from the stock increases your streak multiplier. The first card earns 1 point, the second earns 2, the third earns 3, and so on. Drawing from the stock resets the streak to zero. Long streaks are key to high scores." },
            { q: "Does King wrap to Ace in TriPeaks?", a: "Yes. In TriPeaks Solitaire, ranks wrap around. You can play a King on an Ace or an Ace on a King. This wrapping rule opens up more possible moves and is part of what makes TriPeaks faster-paced than many other solitaire variants." },
            { q: "Is TriPeaks Solitaire the same as Pyramid Solitaire?", a: "No. While both feature pyramid-shaped card layouts, the mechanics are different. Pyramid Solitaire removes pairs of cards that sum to 13, while TriPeaks removes single cards that are ±1 rank from the waste pile top. TriPeaks uses three smaller peaks instead of one large pyramid." },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <p className="font-semibold text-white/90 mb-1" itemProp="name">{item.q}</p>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-sm leading-7 text-white/60" itemProp="text">{item.a}</p>
              </div>
            </div>
          ))}
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
              href="/tripeaks/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play TriPeaks Solitaire
            </Link>{" "}
            — Complete rules and setup guide
          </li>
          <li>
            <Link
              href="/pyramid"
              className="text-[#D4AF37] hover:underline"
            >
              Play Pyramid Solitaire
            </Link>{" "}
            — Pair cards that sum to 13
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
        <MoreGames currentSlug="tripeaks" />
      </article>
    </>
  );
}
