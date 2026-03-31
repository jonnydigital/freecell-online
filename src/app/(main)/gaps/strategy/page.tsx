import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Gaps Solitaire Strategy Guide — Master Positional Card Sorting",
  description:
    "In-depth Gaps Solitaire strategy guide. Learn gap management, dead gap avoidance, row completion tactics, reshuffle timing, and advanced multi-move planning for Montana Solitaire.",
  keywords: [
    "gaps solitaire strategy",
    "gaps solitaire tips",
    "how to win gaps solitaire",
    "montana solitaire strategy",
    "spaces solitaire guide",
    "gaps solitaire tactics",
    "gaps card game strategy",
    "gaps solitaire reshuffle",
    "positional solitaire strategy",
    "gaps solitaire winning tips",
  ],
  openGraph: {
    title: "Gaps Solitaire Strategy Guide — Master Positional Card Sorting",
    description:
      "Expert strategies for Gaps Solitaire. Learn gap management, row completion tactics, reshuffle timing, and advanced planning for this positional sorting game.",
    url: absoluteUrl("/gaps/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best opening move in Gaps Solitaire?",
    answer:
      "The best opening move is usually to fill a leftmost gap with a 2 that unlocks the most future moves. Look for a 2 that, once placed, creates a new gap next to a card whose same-suit successor is available to play. Ideally, you want your first move to trigger a chain of two or three follow-up placements. If multiple 2s are available, choose the one in the row where you already have the most cards of that suit in roughly the right order.",
  },
  {
    question: "How many reshuffles do you get in Gaps Solitaire?",
    answer:
      "Most versions of Gaps Solitaire allow 1 to 2 reshuffles per game. A reshuffle picks up all cards that are not yet in their final correct position (placed in proper suit-and-rank order starting from the left of a row), shuffles them, and redeals them into the remaining spaces. Reshuffles are a powerful reset tool, but they are limited, so you should exhaust all productive moves before using one. Using a reshuffle too early wastes it, while waiting until the board is completely locked may not leave enough flexibility for the reshuffle to help.",
  },
  {
    question: "What makes a gap 'dead' in Gaps Solitaire?",
    answer:
      "A gap is considered dead when it appears directly to the right of a King. Since Kings are the highest rank, no card can be one rank higher than a King in the same suit, so nothing can legally fill that space. Dead gaps reduce the number of usable gaps on the board, limiting your options. Managing dead gaps is one of the most important strategic considerations in the game — every dead gap means one fewer tool for rearranging cards.",
  },
  {
    question: "Is Gaps Solitaire mostly luck or skill?",
    answer:
      "Gaps Solitaire has a meaningful skill component, though the initial deal does affect your chances. Skilled players win significantly more often than beginners because the game rewards careful sequencing, forward planning, and smart reshuffle timing. Unlike many solitaire variants where you simply reveal and react, Gaps gives you full information from the start — all cards are face up — so the challenge is purely about making optimal decisions with the moves available to you.",
  },
  {
    question: "How do I avoid getting stuck in Gaps Solitaire?",
    answer:
      "The main causes of getting stuck are creating too many dead gaps (gaps next to Kings) and placing cards out of optimal order. To avoid this, always think two or three moves ahead before filling a gap. Prioritize moves that keep gaps away from Kings, and try to work on one row at a time rather than spreading your effort across all four rows. When you do get stuck, that is usually the right time to use a reshuffle — but only after confirming that no productive moves remain.",
  },
];

export default function GapsStrategyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Gaps Solitaire Strategy Guide — Master Positional Card Sorting",
    description:
      "In-depth strategy guide for Gaps Solitaire. Learn gap management, row completion tactics, reshuffle timing, and advanced multi-move planning.",
    url: absoluteUrl("/gaps/strategy"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
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
        name: "Gaps",
        item: absoluteUrl("/gaps"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy",
        item: absoluteUrl("/gaps/strategy"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Gaps Solitaire Strategy Guide"
        subtitle="Master gap management, row completion tactics, reshuffle timing, and the positional thinking that separates winning players from the rest."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gaps", href: "/gaps" }]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {/* Section 1: Understanding Gaps and Movement Rules */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Understanding How Gaps Work
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Gaps Solitaire &mdash; also known as Montana or Spaces &mdash; is unlike most
                solitaire games you have played. There is no stock, no waste pile, no foundation
                area to build on. Instead, all 52 cards are dealt face-up into four rows of 13
                cards. The four Aces are then removed, creating four gaps. Your job is to rearrange
                all the cards so that each row contains a complete suit running from 2 through King,
                left to right.
              </p>
              <p>
                The movement rule is simple but restrictive: you can only place a card into a gap
                if that card is the same suit and exactly one rank higher than the card immediately
                to the left of the gap. If the gap is in the leftmost position of a row, only a 2
                can fill it. If the gap is immediately to the right of a King, nothing can fill it
                &mdash; that gap is dead.
              </p>
              <p>
                This single rule creates a game that is entirely about sequencing and positional
                thinking. Every move you make creates a new gap somewhere else, and the question is
                always whether that new gap is more useful than the one you just filled. Unlike
                FreeCell or Klondike, there is no hidden information &mdash; you can see every card
                from the start. The challenge is purely strategic: given a fixed set of cards, find
                the right order of moves to sort them all.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Key Movement Rules to Remember
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    A card placed in a gap must be the same suit and one rank higher than the card
                    to the left of the gap (e.g., 7 of Hearts can go to the right of 6 of Hearts)
                  </li>
                  <li>
                    The leftmost position in any row can only be filled with a 2 &mdash; there is
                    no card to the left, so only the lowest playable rank is allowed
                  </li>
                  <li>
                    A gap to the right of a King is permanently dead &mdash; since no card is one
                    rank higher than a King, nothing can ever fill that space
                  </li>
                  <li>
                    Moving a card always creates a new gap where that card was &mdash; so every move
                    shifts the gap, it never eliminates it
                  </li>
                </ul>
              </div>

              <p>
                Understanding these rules deeply is the foundation of all strategy. The rest of this
                guide builds on these mechanics to show you how to think multiple moves ahead and
                avoid the traps that catch most beginners.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* Section 2: Starting Strategy — Which Gaps to Fill First */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Starting Strategy: Which Gaps to Fill First
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                When the Aces are removed and you see your four initial gaps, resist the urge to
                start filling them immediately. Take a moment to survey the entire board. The
                decisions you make in the first five to ten moves often determine whether the deal
                is winnable, so a few seconds of planning pays enormous dividends.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Prioritize Leftmost Gaps
              </h3>
              <p>
                Gaps in the leftmost column are the most valuable because they accept 2s, which
                are the starting cards for every completed row. If you have a gap in the leftmost
                position, look for the 2 that gives you the best chain of follow-up moves. Placing
                a 2 creates a new gap where the 2 was, and ideally that new gap is next to a card
                whose same-suit successor is ready to play. A good opening can chain three, four,
                or even five moves in sequence.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Look for Natural Chains
              </h3>
              <p>
                Before making your first move, trace the chain of consequences. If you fill a gap
                with the 5 of Spades, a new gap opens where the 5 was. Can you fill that new gap
                with another card? And the gap after that? The best opening moves create chains
                of three or more placements. A single isolated move that does not lead anywhere
                is rarely the right choice when a chain-starting alternative exists.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Opening Assessment Checklist
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    Which rows have 2s closest to the left side? These rows are easiest to start
                    building
                  </li>
                  <li>
                    Where are the Kings? Any gap that ends up next to a King becomes dead &mdash;
                    plan to avoid this
                  </li>
                  <li>
                    Which suits have the most cards already in roughly the right order within the
                    same row? These are your best candidates for early completion
                  </li>
                  <li>
                    Are any 2s already in the leftmost position? If so, that row has a head start
                    and may be worth prioritizing
                  </li>
                </ul>
              </div>

              <p>
                A common beginner mistake is to fill every available gap as fast as possible without
                considering the downstream effects. This scattershot approach almost always leads to
                dead gaps forming within the first ten moves. Disciplined players fill gaps
                selectively, always asking: &quot;Where will the new gap appear, and is that a
                useful place for it?&quot;
              </p>
            </div>
          </section>

          {/* Section 3: Managing Dead Gaps */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Managing Dead Gaps: The Kings Problem
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Dead gaps &mdash; gaps that form to the right of a King &mdash; are the single
                biggest obstacle in Gaps Solitaire. Since no card ranks higher than a King, a gap
                in that position can never be filled. It is permanently wasted. And because you
                start with only four gaps total, losing even one to a dead position cuts your
                available moves by 25%.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Why Dead Gaps Are So Dangerous
                </h3>
                <p className="text-sm">
                  Think of your four gaps as your four &quot;workers&quot; &mdash; each one allows
                  you to make a move. When a gap dies next to a King, you lose a worker permanently
                  (until a reshuffle). With three gaps, you have 75% of your original flexibility.
                  With two, you have 50%. If two or more gaps die early in a game, you are almost
                  certainly heading for a dead end unless you have a reshuffle available. This is
                  why preventing dead gaps is often more important than making progress on row
                  completion.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                How to Avoid Dead Gaps
              </h3>
              <p>
                Before every move, look at where the new gap will appear. If the card to the left
                of the new gap position is a King, that gap will be dead on arrival. This is the
                most common way players accidentally kill gaps &mdash; they focus on where they are
                placing a card and forget to check what is next to the space they are vacating.
              </p>
              <p>
                Sometimes creating a dead gap is unavoidable. When it is, try to ensure that the
                move you are making is extremely valuable &mdash; it should complete a significant
                portion of a row or set up a long chain of future moves. Trading a gap for a single
                low-value placement is almost never worth it.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Kings in the Rightmost Column
              </h3>
              <p>
                Kings belong in the rightmost (13th) position of their target row. A King that is
                already in the rightmost column of any row is not immediately dangerous &mdash;
                it is in a position where a gap to its right would be off the board anyway. The
                dangerous Kings are the ones sitting in the middle of a row, because any gap that
                drifts next to them becomes dead. When you see a King in columns 2 through 12,
                be extra cautious about moving cards near it.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Tip: Track the Kings
                </h3>
                <p className="text-sm">
                  At the start of every game, mentally note where all four Kings are. These are
                  your danger zones. As you plan each move, always check: &quot;Will this move
                  create a gap next to a King?&quot; Make this check a habit, and you will avoid
                  the most common cause of lost games. Experienced Gaps players develop an almost
                  automatic awareness of King positions, treating them like obstacles on a
                  navigation map.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 4: Row Completion Strategy */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Row Completion Strategy: Focus vs. Spread
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                One of the key strategic decisions in Gaps Solitaire is whether to focus on
                completing one row at a time or to make incremental progress across multiple rows
                simultaneously. Both approaches have trade-offs, and the right choice depends on
                the specific deal you are playing.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                The Case for Focusing on One Row
              </h3>
              <p>
                When you complete a section of a row &mdash; say, placing the 2 through 7 of
                Hearts in order from the left &mdash; those cards are locked in permanently.
                They will not be disturbed by future moves, and they will survive a reshuffle
                intact. This means every card you lock in reduces the complexity of the remaining
                puzzle. Focusing on one row at a time maximizes the number of locked-in cards
                early, which simplifies everything that follows.
              </p>
              <p>
                Focusing also reduces the number of things you need to track mentally. Instead of
                juggling four partially complete rows, you concentrate on one row and can plan
                moves more deeply for that single objective.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                The Case for Spreading Across Rows
              </h3>
              <p>
                Sometimes the deal does not cooperate with a single-row strategy. If the cards
                for your target suit are scattered across all four rows and buried behind other
                cards, forcing a single-row focus may require too many intermediate moves. In
                these situations, making opportunistic progress on whichever row currently offers
                the easiest placements can be more efficient.
              </p>
              <p>
                The spread approach also helps when you need to avoid dead gaps. If focusing on
                one row would force you to create a dead gap, switching to a different row for a
                few moves can keep all your gaps alive while still making progress.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Hybrid Approach
                </h3>
                <p className="text-sm">
                  Most successful Gaps players use a hybrid strategy: identify the row with the
                  best starting position and make it your primary focus, but stay flexible enough
                  to take easy placements on other rows when they are available at no cost. The key
                  is to avoid &quot;drift&quot; &mdash; randomly making moves on different rows
                  without a clear plan. Every move should either advance your primary row or set up
                  a concrete future move on another row. If a move does neither, it is probably
                  not worth making.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Locking In Cards Before a Reshuffle
              </h3>
              <p>
                If you know a reshuffle is coming, your priority shifts to locking in as many
                cards as possible before triggering it. Remember that correctly placed cards
                &mdash; those in proper suit-and-rank order starting from the leftmost position
                &mdash; are preserved during a reshuffle. Every card you lock in before reshuffling
                is one fewer card in the random redeal, which increases your chances of getting a
                favorable post-reshuffle layout. This is where the focused single-row approach
                really shines: a half-completed row preserves more cards than four rows that are
                each 10% complete.
              </p>
            </div>
          </section>

          {/* Section 5: When to Use Your Reshuffles */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              When to Use Your Reshuffles
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Reshuffles are your lifeline in Gaps Solitaire. Most versions give you one or
                two, and using them at the right moment can turn a losing game into a win. But
                timing is everything &mdash; a poorly timed reshuffle wastes your most powerful
                tool.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  How Reshuffles Work
                </h3>
                <p className="text-sm">
                  When you trigger a reshuffle, all cards that are not in their final correct
                  position are picked up, shuffled randomly, and redealt into the remaining
                  spaces. Cards that are correctly placed &mdash; in proper suit-and-rank order
                  starting from the left of their row &mdash; stay put. The Aces are removed
                  again, creating new gaps. Essentially, you get a fresh start on the unsolved
                  portion of the board while keeping your progress.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                The Right Time to Reshuffle
              </h3>
              <p>
                The right time to reshuffle is when you have exhausted all productive moves but
                still have cards locked in. Specifically, you want to reshuffle when:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  All remaining gaps are dead (next to Kings) and no further moves are possible
                </li>
                <li>
                  You have locked in a meaningful number of cards, so the reshuffle will only
                  affect a reduced set of cards
                </li>
                <li>
                  You have checked multiple times that no productive move remains &mdash; sometimes
                  a useful move is hiding in plain sight
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Common Reshuffle Mistakes
              </h3>
              <p>
                The most common mistake is reshuffling too early, before maximizing your locked-in
                cards. If you reshuffle with only two or three cards locked in, you are essentially
                just redealing the entire board with slightly fewer cards &mdash; the odds of
                getting a better layout are not much better than starting a new game.
              </p>
              <p>
                The second mistake is reshuffling too late &mdash; specifically, saving your
                reshuffle for &quot;later&quot; when you are already in an unrecoverable position.
                If you have been stuck for several moves and have been making sub-optimal plays
                trying to force progress, those sub-optimal plays may have created a worse position
                than if you had reshuffled earlier.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Reshuffle Timing Guideline
                </h3>
                <p className="text-sm">
                  Aim to have at least one-quarter to one-third of your cards locked in before
                  your first reshuffle. With 13 cards per row, that means 13 to 17 cards in their
                  final positions. This gives the reshuffle enough room to work with while ensuring
                  that a significant portion of the puzzle is already solved. If you have two
                  reshuffles, you can use the first a bit earlier (around 10-12 locked cards)
                  since you have a second chance if the first redeal is unfavorable.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 6: Advanced Planning — Thinking Multiple Moves Ahead */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Advanced Planning: Thinking Multiple Moves Ahead
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The difference between a casual Gaps player and an expert comes down to depth of
                planning. Beginners look at the current gaps and find a legal move. Intermediate
                players look one move ahead &mdash; they consider where the new gap will appear.
                Expert players think three, four, or five moves ahead, tracing entire chains of
                consequences before touching a single card.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Tracing Move Chains
              </h3>
              <p>
                Before making any move, mentally trace the chain. &quot;If I place the 6 of Clubs
                here, the gap moves to column 9 of row 3. The card to the left of that new gap is
                the 10 of Diamonds, so I can place the Jack of Diamonds there. That moves the gap
                to column 4 of row 1, where the card to the left is the 3 of Hearts, so I can
                place the 4 of Hearts...&quot; and so on. The longer the chain you can trace, the
                better your move selection will be.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Evaluating Chain Endpoints
              </h3>
              <p>
                A chain eventually ends when the new gap lands in a dead position (next to a King)
                or in a position where no legal card can fill it. When comparing two possible
                opening moves, trace both chains to their endpoints and compare: which chain is
                longer? Which chain locks in more cards? Which chain&apos;s endpoint leaves the
                gap in a more useful position? The move that produces the best endpoint is usually
                the right choice, even if it does not look as attractive on the first step.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Gap Destination Principle
                </h3>
                <p className="text-sm">
                  Every move in Gaps Solitaire is really two decisions: where to place a card, and
                  where to send the gap. Beginners focus on the first decision and ignore the
                  second. Experts give equal weight to both. A &quot;good&quot; move that sends the
                  gap to a dead position is often worse than a &quot;mediocre&quot; move that keeps
                  the gap alive and flexible. Always ask: &quot;Where will my gap end up, and what
                  can I do with it when it gets there?&quot;
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Planning Around Suit Clusters
              </h3>
              <p>
                When multiple cards of the same suit are clustered in the same row, that cluster
                represents either an opportunity or an obstacle, depending on their order. If the
                cards are in ascending order from left to right (e.g., 4-5-6 of Diamonds), they
                may be close to their final positions and can potentially be locked in with
                minimal effort. If they are out of order (e.g., 6-4-5 of Diamonds), untangling
                them will require moving at least one card out and back in, which costs gap
                moves.
              </p>
              <p>
                Advanced players identify these clusters early and plan their gap routing to
                address the out-of-order clusters before they become surrounded by locked-in
                cards that make rearrangement impossible.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Preserving Flexibility
              </h3>
              <p>
                When two moves seem equally good in terms of immediate progress, choose the one
                that preserves more future options. This usually means choosing the move that
                keeps gaps away from Kings, keeps gaps in the middle of rows (where they have
                more potential placements available), and avoids locking cards into positions
                that might need to change later. Flexibility is a form of insurance &mdash; it
                may not pay off on this specific move, but it keeps the door open for solutions
                you have not yet seen.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Practice Exercise
                </h3>
                <p className="text-sm">
                  To build your planning skills, try this exercise: before every move, force
                  yourself to trace the full chain of consequences until the gap dies or reaches
                  a dead end. Do this for every legal move available, then choose the best one.
                  This will be slow at first &mdash; games that normally take five minutes might
                  take twenty. But within a dozen games, you will start seeing chains automatically,
                  and your win rate will improve dramatically.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* FAQ Section */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2
              className="text-2xl font-bold text-white/90 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium text-white/80 text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-white/50 leading-relaxed">{faq.answer}</p>
                  {i < faqs.length - 1 && (
                    <div className="mt-6 border-b border-white/10" />
                  )}
                </div>
              ))}
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* ── Related Guides ── */}
          <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard href="/gaps" title="Play Gaps Solitaire" description="Play online for free, no download required." />
              <ContentLinkCard href="/gaps/how-to-play" title="How to Play Gaps" description="Complete rules and gameplay guide." />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Compare with classic FreeCell tactics." />
            </ContentBody>
          </CardSection>

          <CtaSection
            heading="Ready to Play?"
            body="Put these strategies into practice. Play Gaps Solitaire online for free — no download, no signup."
            primaryLabel="Play Gaps Solitaire"
            primaryHref="/gaps"
          />

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/gaps" title="Play Gaps Solitaire" description="Play online for free, no download" />
              <ContentLinkCard href="/gaps/how-to-play" title="How to Play Gaps" description="Complete rules and gameplay guide" />
              <ContentLinkCard href="/gaps/tips" title="Gaps Tips" description="Quick tips for better play" />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy for classic FreeCell" />
              <ContentLinkCard href="/solitaire-types" title="Types of Solitaire" description="20 solitaire variants compared" />
              <ContentLinkCard href="/" title="Play FreeCell" description="The classic strategic solitaire" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
