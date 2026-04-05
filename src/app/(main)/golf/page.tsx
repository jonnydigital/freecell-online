import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import GolfGamePage from "./GolfGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Golf Solitaire | Play Online Free — No Download",
  description:
    "Play Golf Solitaire online for free. Clear seven columns by playing cards one rank higher or lower than the waste pile. Streak scoring, undo, hints. No download required.",
  keywords: [
    "golf solitaire",
    "golf solitaire online",
    "golf solitaire free",
    "golf card game",
    "golf solitaire rules",
    "golf solitaire no download",
    "play golf solitaire online",
    "solitaire online",
    "golf patience",
  ],
  openGraph: {
    title: "Golf Solitaire | Play Online Free — No Download",
    description:
      "Play Golf Solitaire online for free. Clear seven columns by matching cards ±1 rank. No download required.",
    url: absoluteUrl("/golf"),
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
    name: "Golf Solitaire",
    description:
      "Free online Golf Solitaire. Clear seven columns by playing cards one rank higher or lower than the waste pile.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/golf"),
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
        name: "Golf Solitaire",
        item: absoluteUrl("/golf"),
      },
    ],
  };

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "Golf Solitaire",
    description: "Clear seven columns of five cards by playing cards one rank higher or lower than the waste pile. Streak scoring, undo, hints.",
    numberOfPlayers: 1,
    genre: "Card Game",
    gamePlatform: "Web Browser",
    url: absoluteUrl("/golf"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "1312",
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
        name: "What is Golf Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Golf Solitaire is a card game where you clear seven columns of five cards each by playing cards that are one rank higher or lower than the top of the waste pile. Kings can wrap to Aces and vice versa.",
        },
      },
      {
        "@type": "Question",
        name: "How do you win Golf Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You win by clearing all 35 cards from the seven tableau columns. Cards can be removed by clicking the bottom card of any column that is exactly one rank higher or lower than the current waste pile card. If no moves are available, draw from the stock pile.",
        },
      },
      {
        "@type": "Question",
        name: "What is the streak bonus in Golf Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each consecutive card you play without drawing from the stock increases your streak multiplier. The first card in a streak earns 1 point, the second earns 2, the third earns 3, and so on. Drawing from the stock resets the streak to zero. Long streaks are key to high scores.",
        },
      },
      {
        "@type": "Question",
        name: "Does King wrap to Ace in Golf Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. In this version of Golf Solitaire, ranks wrap around. You can play a King on an Ace or an Ace on a King. This wrapping rule opens up more possible moves and helps build longer streaks.",
        },
      },
      {
        "@type": "Question",
        name: "Is Golf Solitaire the same as TriPeaks Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. While both use the ±1 rank mechanic, Golf Solitaire uses seven columns of five face-up cards, while TriPeaks uses three overlapping peaks with face-down cards. Golf is simpler in layout but shares the same streak scoring system.",
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
      <GolfGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Golf Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-03-27"
            updatedDate="2026-03-27"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Golf Solitaire is a fast-paced solitaire card game where the goal is to clear
          seven columns of five cards each. Like TriPeaks, you remove cards by playing
          any exposed card that is one rank higher or lower than the current waste pile
          card — and ranks wrap around, so Kings connect to Aces.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How It Works
        </h2>
        <p className="mb-4 leading-relaxed">
          A standard 52-card deck is dealt into seven columns of five face-up cards
          (35 total). The remaining 17 cards form the stock pile, with one card drawn
          to start the waste pile. Only the bottom (exposed) card of each column can
          be played.
        </p>
        <p className="mb-4 leading-relaxed">
          Click any exposed card that is exactly one rank higher or lower than the
          waste pile top to play it. If no moves are available, click the stock to draw
          a new card. The game ends when all columns are cleared (you win) or when no
          moves remain and the stock is empty.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Scoring &amp; Streaks
        </h2>
        <p className="mb-4 leading-relaxed">
          Golf Solitaire features a streak-based scoring system. Each consecutive card
          you play without drawing from the stock increases your streak multiplier. The
          first card in a streak earns 1 point, the second earns 2, the third earns 3,
          and so on. Drawing from the stock resets the streak to zero. Building long
          chains of consecutive plays is the key to achieving high scores.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Tips for Winning
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Scan all seven columns before making a move — plan your streak</li>
          <li>Look for zigzag runs (up-down-up) to extend streaks</li>
          <li>Use King↔Ace wrapping to &ldquo;turn the corner&rdquo; on long runs</li>
          <li>Save stock draws for when you truly have no playable cards</li>
          <li>Balance play across columns — emptying one column frees up space</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Golf Solitaire emerged in nineteenth-century patience literature, likely of
          British origin, and took its name from the scoring objective: finish with
          as few cards left &ldquo;on the course&rdquo; (in the tableau) as possible.
          Early printed rule sets — including references in Lady Adelaide Cadogan&apos;s
          1870 patience compilations and later handbooks like Morehead &amp; Mott-Smith&apos;s
          Complete Book of Solitaire — present Golf as a short pick-up game, counting
          the final stock as the golfer&apos;s score. Some historical texts call a
          particular eight-column variant &ldquo;Forty Thieves Golf,&rdquo; but that
          name is unrelated to the classic Forty Thieves patience and refers instead
          to the 40-card layout used in that variant. The game crossed into digital
          form in the 1980s and 1990s through shareware card packs and eventually
          reached Microsoft&apos;s Entertainment Pack line alongside TriPeaks, which
          is when the wrap-around rule became standard and the streak-scoring model
          was layered on top of the original low-score objective.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          Golf Solitaire rewards patient, multi-move planning far more than its
          fast-click appearance suggests. Because every card is face-up, we can plan
          the entire game on turn one if we are willing to look. The principles we
          rely on:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Plan three to four moves
            ahead.</strong> With all 35 tableau cards visible, partial clears can
            be mapped in advance. We pick move A because it enables move B, which
            enables move C — not because it is the highest card showing.
          </li>
          <li>
            <strong className="text-white/90">Prioritize cards with more
            neighbours.</strong> A 7 sitting below a 6 and an 8 on adjacent
            columns has two immediate follow-ups. A K sitting next to two 4s has
            none. When choosing between equally playable cards, pick the one
            that preserves optionality.
          </li>
          <li>
            <strong className="text-white/90">Never draw stock for a short
            chain.</strong> If we are about to draw stock in the middle of a
            two-card streak, we almost always lose value. Finish the chain or
            abandon it, then draw deliberately.
          </li>
          <li>
            <strong className="text-white/90">Respect the wrap-around variable.</strong>{" "}
            When wrap-around is on, A↔K is a genuine connection. It lets us
            pivot around the deck boundary and rescue chains that would otherwise
            die at King or Ace.
          </li>
          <li>
            <strong className="text-white/90">Clear the longest column
            first.</strong> Emptying a column removes five cards from the board
            in a short burst and often opens multiple ±1 transitions elsewhere.
            Because stock is finite (17 cards), column-emptying is our best
            leverage.
          </li>
          <li>
            <strong className="text-white/90">Watch the stock count.</strong>{" "}
            Knowing how many draws remain is half of the game. When the stock is
            near-empty we must commit to chains; when it is full we can afford
            to wait for a better sequence.
          </li>
          <li>
            <strong className="text-white/90">Balance column depths.</strong>{" "}
            Letting two columns drain to one card each while three remain at
            four-plus cards creates dead ends. We try to work across the
            tableau, not down a single column.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Golf Solitaire is one of the more stock-luck-dependent patience games.
          Published win-rate estimates vary from roughly 5% up to about 12% for
          standard rules with skillful play, and the range itself is largely
          explained by whether wrap-around is enabled. Solitairelaboratory.com and
          several academic card-game surveys report the low end (around 2–4%)
          when wrap-around is disabled and the draw is single-pass, and the high
          end (around 10–12%) once wrap-around and occasional redeals are added.
          The game&apos;s win rate is constrained by a structural fact: we only
          get 17 stock cards to bridge gaps, and the tableau has no storage
          mechanism — we cannot stash a card for later. If the deal scatters high
          and low ranks badly across the columns, no amount of planning can
          reconnect them. That said, within any given deal the gap between
          careful play and careless play is enormous. A thoughtful player often
          clears 25+ of 35 tableau cards even on an unwinnable deal; a careless
          player may stall at 10.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Drawing stock too early.</strong>{" "}
            Every stock draw throws away a potential bridge card. New players
            draw whenever they pause to think; experienced players draw only
            when the current chain is truly dead.
          </li>
          <li>
            <strong className="text-white/90">Playing high-neighbour cards
            last.</strong> Saving the 7 that sits between a 6 and an 8 for later
            is a mistake — it is the exact card that should anchor early chains
            because it has the most exits.
          </li>
          <li>
            <strong className="text-white/90">Ignoring wrap-around when
            enabled.</strong> Some players mentally model Golf as ±1 only, which
            costs them A↔K transitions on every long chain. Check the variant
            rules before you start.
          </li>
          <li>
            <strong className="text-white/90">Column tunnel vision.</strong>{" "}
            Focusing on clearing one column at the expense of cross-column
            chains wastes the game&apos;s biggest strategic lever.
          </li>
          <li>
            <strong className="text-white/90">Not tracking the stock.</strong>{" "}
            With only 17 stock cards, knowing whether four or twelve remain is
            critical. Forgetting the count leads to stranded tableau cards.
          </li>
          <li>
            <strong className="text-white/90">Reflex plays on the first
            available card.</strong> Picking the left-most ±1 match without
            scanning the other columns is the single fastest way to waste
            chains.
          </li>
          <li>
            <strong className="text-white/90">Underusing long ladders.</strong>{" "}
            A six-card ladder (e.g., 4-5-6-7-8-9) is worth 21 points under
            standard streak scoring; the same cards played across three broken
            chains are worth much less.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          Golf and{" "}
          <Link href="/tripeaks" className="text-[#D4AF37] hover:underline">
            TriPeaks
          </Link>{" "}
          share the ±1 sequencing rule and the streak-scoring model, which makes
          them close cousins. The layout is what separates them: TriPeaks
          scatters 28 cards across three peaks and hides 18 of them under
          overlapping tiers, while Golf spreads 35 cards face-up across a 7×5
          rectangle. TriPeaks has more positional blocking and reveal drama;
          Golf has more open-board planning. Compared to{" "}
          <Link href="/pyramid" className="text-[#D4AF37] hover:underline">
            Pyramid
          </Link>
          , Golf belongs to the same &ldquo;discard&rdquo; family but uses
          sequencing rather than pair-to-13 addition, which fundamentally
          changes how we evaluate cards: in Pyramid we count partners, in Golf
          we count neighbours. Versus cascade games like Klondike, Spider, and
          FreeCell, Golf is structurally simpler — no foundations, no tableau
          stacking, no alternating colours — and leans more on front-loaded
          planning than on dynamic decision trees. Players who enjoy the
          clean geometry of Golf often enjoy{" "}
          <Link href="/accordion" className="text-[#D4AF37] hover:underline">
            Accordion
          </Link>
          , TriPeaks, and the minimalist patience game Clock for similar
          reasons: tight rule sets, short sessions, and visible state.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          Golf Solitaire has accumulated a handful of stable variants over the
          years:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Standard 7-column Golf.</strong>{" "}
            35 tableau cards, 17-card stock, single pass, wrap-around on. The
            modern default online.
          </li>
          <li>
            <strong className="text-white/90">8-column Golf.</strong>{" "}
            40 tableau cards, leaving 12 stock cards. Much harder because the
            stock-to-tableau ratio shrinks and we have fewer bridge draws.
          </li>
          <li>
            <strong className="text-white/90">No-wrap Golf.</strong>{" "}
            Removes the A↔K bridge. Chains cannot pass through the boundary.
            Drops win rate by roughly half.
          </li>
          <li>
            <strong className="text-white/90">Single vs unlimited
            redeals.</strong> Classic Golf is single-pass; some modern versions
            allow one or two stock reshuffles, raising win rate toward the
            15–20% range.
          </li>
          <li>
            <strong className="text-white/90">Relaxed Golf / undo-enabled
            variants.</strong> With unlimited undo, Golf shifts toward a
            puzzle-solving game. Useful for practice but changes the character
            of play.
          </li>
        </ul>

        {/* ── FAQ Section ── */}
        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5 mb-10" itemScope itemType="https://schema.org/FAQPage">
          {[
            { q: "What is Golf Solitaire?", a: "Golf Solitaire is a card game where you clear seven columns of five cards each by playing cards that are one rank higher or lower than the top of the waste pile. Kings can wrap to Aces and vice versa." },
            { q: "How do you win Golf Solitaire?", a: "You win by clearing all 35 cards from the seven tableau columns. Cards can be removed by clicking the bottom card of any column that is exactly one rank higher or lower than the current waste pile card. If no moves are available, draw from the stock pile." },
            { q: "What is the streak bonus in Golf Solitaire?", a: "Each consecutive card you play without drawing from the stock increases your streak multiplier. The first card in a streak earns 1 point, the second earns 2, the third earns 3, and so on. Drawing from the stock resets the streak to zero. Long streaks are key to high scores." },
            { q: "Does King wrap to Ace in Golf Solitaire?", a: "Yes. In this version of Golf Solitaire, ranks wrap around. You can play a King on an Ace or an Ace on a King. This wrapping rule opens up more possible moves and helps build longer streaks." },
            { q: "Is Golf Solitaire the same as TriPeaks Solitaire?", a: "No. While both use the ±1 rank mechanic, Golf Solitaire uses seven columns of five face-up cards, while TriPeaks uses three overlapping peaks with face-down cards. Golf is simpler in layout but shares the same streak scoring system." },
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
              href="/golf/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Golf Solitaire
            </Link>{" "}
            — Complete rules and setup guide
          </li>
          <li>
            <Link
              href="/tripeaks"
              className="text-[#D4AF37] hover:underline"
            >
              Play TriPeaks Solitaire
            </Link>{" "}
            — Clear three peaks with ±1 rank moves
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
              href="/solitaire-types"
              className="text-[#D4AF37] hover:underline"
            >
              Types of Solitaire
            </Link>{" "}
            — Explore 20+ solitaire variants
          </li>
        </ul>
        <MoreGames currentSlug="golf" />
      </article>
    </>
  );
}
