import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Penguin Solitaire Strategy Guide — Master Flippers & Wrapping",
  description:
    "In-depth Penguin Solitaire strategy guide. Learn how to manage 7 free cells, same-suit wrapping sequences, empty column restrictions, and foundation timing to win more Penguin deals.",
  keywords: [
    "penguin solitaire strategy",
    "penguin solitaire tips",
    "how to win penguin solitaire",
    "penguin solitaire guide",
    "penguin freecell variant",
    "penguin solitaire wrapping",
    "penguin solitaire free cells",
    "penguin card game strategy",
    "penguin solitaire rules strategy",
    "penguin solitaire winning tips",
  ],
  openGraph: {
    title: "Penguin Solitaire Strategy Guide — Master Flippers & Wrapping",
    description:
      "Expert strategies for Penguin Solitaire. Learn same-suit wrapping, flipper management, empty column tactics, and foundation timing for this unique FreeCell variant.",
    url: absoluteUrl("/penguin/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "How is Penguin Solitaire different from FreeCell?",
    answer:
      "Penguin Solitaire differs from FreeCell in several fundamental ways. The game begins by removing one rank to seed the foundations, leaving 7 columns of 7 cards instead of FreeCell's 8 columns of 6-7 cards. You get 7 free cells (called flippers) instead of 4, but tableau building must follow same-suit descending order with wrapping allowed (Ace on 2, King on Ace). Empty columns can only be filled by a specific rank — the rank immediately below the foundation's starting rank. These rule changes create a very different strategic landscape despite sharing FreeCell's core DNA.",
  },
  {
    question: "What does wrapping mean in Penguin Solitaire?",
    answer:
      "Wrapping means that sequences can loop around from Ace back to King. If your foundations start on 5s and you are building descending same-suit runs on the tableau, the sequence goes 4-3-2-Ace-King-Queen and so on. This circular ordering is unique to Penguin and means there is no absolute \"lowest\" card in the tableau. Every rank can potentially be placed on another card, which opens up moves that would be impossible in standard FreeCell or Baker's Game.",
  },
  {
    question: "Why do I have 7 free cells but the game still feels hard?",
    answer:
      "Seven free cells sounds generous compared to FreeCell's four, but Penguin compensates with stricter rules. You must build in the same suit (not alternating colors), empty columns can only accept one specific rank, and the reduced tableau (7 columns instead of 8) means fewer legal destinations for cards. The extra flippers help offset these restrictions, but they do not make the game easy — they make it playable. Filling all 7 flippers without a plan is still a fast path to a dead end.",
  },
  {
    question: "Can I put any card in an empty column in Penguin?",
    answer:
      "No — this is one of Penguin's most important restrictions. Empty columns can only be filled by the rank that is one below the foundation's starting rank. For example, if your foundations start on 7s, only 6s can be placed in empty columns. This rule dramatically limits your flexibility compared to FreeCell, where any card (or in some variants, only Kings) can fill an empty cascade. Planning around this restriction is essential to winning.",
  },
  {
    question: "What is the best opening strategy for Penguin Solitaire?",
    answer:
      "Start by surveying the full layout before making any moves. Identify where the cards of the foundation's starting rank are located, since those need to reach the foundations first. Look for same-suit sequences that are already partially formed and note which columns contain cards of the restricted fill rank (the rank below the foundation start). Your opening moves should focus on freeing foundation cards and creating same-suit connections without filling flippers unnecessarily. Avoid filling empty columns with non-qualifying ranks — that move is illegal — and resist the urge to use flippers in the first few moves unless it directly enables a foundation play.",
  },
];

export default function PenguinStrategyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Penguin Solitaire Strategy Guide — Master Flippers & Wrapping",
    description:
      "In-depth strategy guide for Penguin Solitaire. Learn same-suit wrapping, flipper management, empty column tactics, and foundation timing for this unique FreeCell variant.",
    url: absoluteUrl("/penguin/strategy"),
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
        name: "Penguin",
        item: absoluteUrl("/penguin"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy",
        item: absoluteUrl("/penguin/strategy"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Penguin Solitaire Strategy Guide"
        subtitle="Master same-suit wrapping, flipper management, and the unique tactical decisions that make Penguin one of the most interesting FreeCell variants."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Penguin", href: "/penguin" }]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {/* Section 1: Understanding the Penguin Setup */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Understanding the Penguin Setup and Its Unique Rules
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Penguin Solitaire starts differently from any other FreeCell variant. Before you
                play a single card, one rank is selected and three of its four cards are pulled
                from the deck to seed the foundations. The fourth card of that rank stays in the
                tableau as part of the deal. This means your foundations already have a head start,
                but it also means the tableau is built around a gap &mdash; 49 cards spread across
                7 columns of 7 cards each.
              </p>
              <p>
                The foundation&apos;s starting rank defines everything about the game. If the
                foundations start on 7s, you build up from 7 through King, then wrap around through
                Ace, 2, 3, 4, 5, and finally 6. The tableau builds in the opposite direction:
                same-suit descending with wrapping. So in a game starting on 7s, a 6 goes on a 7
                of the same suit, and after reaching Ace, you wrap to King, then Queen, and so on.
              </p>
              <p>
                This wrapping mechanic is what gives Penguin its distinctive character. There is no
                &quot;bottom&quot; of the sequence &mdash; every card can potentially be placed on
                another card of the same suit. An Ace is not stuck at the end of the line; it
                connects to a 2 above and wraps to a King below. This circular nature opens up
                moves that would be impossible in standard FreeCell or Baker&apos;s Game, but it
                also makes the game harder to visualize because you have to think in loops rather
                than in linear descending order.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Foundation Starting Rank Drives Everything
                </h3>
                <p className="text-sm">
                  Before making any moves, identify the foundation starting rank and mentally map
                  out the build order. If foundations start on Jacks, the foundation build order is
                  J-Q-K-A-2-3-4-5-6-7-8-9-10, and the tableau descending order is
                  10-9-8-7-6-5-4-3-2-A-K-Q (same suit). Write this sequence down if it helps.
                  Getting confused about whether a 3 goes on a 4 or whether wrapping applies at a
                  particular point will cost you games. The first few times you play, the wrapping
                  will feel unnatural. After a dozen games it will become second nature.
                </p>
              </div>

              <p>
                The other critical rule to internalize is the empty column restriction. In standard
                FreeCell, any card can fill an empty cascade. In Penguin, only one specific rank
                can fill an empty column &mdash; the rank immediately below the foundation starting
                rank (in the wrapping sense). If foundations start on 7s, only 6s can fill empty
                columns. If foundations start on Aces, only Kings can fill empty columns. This
                restriction dramatically limits your options and forces you to plan column usage
                much more carefully than in FreeCell.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* Section 2: Managing 7 Free Cells */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Managing 7 Free Cells vs. FreeCell&apos;s 4
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Penguin gives you 7 free cells &mdash; called &quot;flippers&quot; &mdash; nearly
                double what standard FreeCell provides. This sounds like an enormous advantage,
                and it is, but not in the way most players expect. The extra flippers exist to
                compensate for Penguin&apos;s stricter rules: same-suit building, wrapping
                sequences, restricted empty columns, and only 7 tableau columns instead of 8.
                Without those extra flippers, the game would be nearly impossible.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Flipper Threshold Rule
                </h3>
                <p className="text-sm">
                  As a general guideline, try to keep at least 3 flippers empty at all times. With
                  7 flippers total, that means you should be uncomfortable once you have 5 occupied
                  and alarmed once you reach 6. Filling all 7 flippers is almost always a losing
                  position unless you are in the final stages of a solve. Each occupied flipper
                  reduces your ability to execute multi-card moves, and in a same-suit game with
                  restricted empty columns, those multi-card moves are your lifeline.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Flippers Are Not a Dumping Ground
              </h3>
              <p>
                The most common beginner mistake in Penguin is treating the 7 flippers like a
                generous storage facility. &quot;I have 7 slots, I can afford to use a few
                carelessly.&quot; This thinking leads to a gradual loss of flexibility. Each card
                in a flipper is a card that needs a same-suit destination to leave. Unlike FreeCell
                where alternating colors give you two potential targets per card, Penguin&apos;s
                same-suit rule means each flipper card has exactly one possible tableau destination
                (the next higher card of the same suit). If that destination is buried or occupied,
                the flipper stays full.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Plan the Exit Before the Entry
              </h3>
              <p>
                Before placing a card in a flipper, identify exactly how and when it will leave.
                Can it go to the foundations soon? Is there a same-suit card one rank higher that
                is exposed or will be exposed in the next few moves? If you cannot answer either
                question with confidence, reconsider the move. A flipper with no exit plan is dead
                weight that will haunt you for the rest of the game.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Using Flippers for Multi-Card Sequences
              </h3>
              <p>
                The supermove formula applies to Penguin just as it does to FreeCell: the number
                of cards you can move as a same-suit sequence equals (1 + number of empty
                flippers) multiplied by 2 raised to the power of empty columns. With 4 empty
                flippers and 1 empty column, you can move a 10-card same-suit sequence in one
                logical operation. With only 1 empty flipper and no empty columns, you can move
                just 2 cards. Since Penguin often requires relocating long wrapping sequences,
                maintaining flipper availability directly determines which moves are possible.
              </p>
            </div>
          </section>

          {/* Section 3: Same-Suit Building and Wrapping */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Same-Suit Building and Wrapping Strategy
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Same-suit building is the rule that makes Penguin genuinely challenging. In
                FreeCell, the 9 of Hearts can go on either the 10 of Spades or the 10 of Clubs.
                In Penguin, the 9 of Hearts can only go on the 10 of Hearts. This restriction
                means that at any given moment, each card has exactly one legal tableau destination
                instead of two. The result is far fewer available moves and a much tighter
                strategic space.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Wrapping Creates Hidden Connections
                </h3>
                <p className="text-sm">
                  The wrapping rule means that the sequence does not end at Ace. In a game where
                  foundations start on 5s, the tableau descending order is
                  4-3-2-A-K-Q-J-10-9-8-7-6-5. Notice how King wraps below Ace and 5 is at the
                  bottom (just above the foundation start). This creates connections that are easy
                  to overlook. When you see a King of Hearts exposed and an Ace of Hearts one card
                  deep, that is a connection &mdash; the King can go on the Ace. Players new to
                  Penguin frequently miss these wrapping opportunities because their brain is trained
                  to see King as the highest card that nothing can be placed on.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Prioritize Long Same-Suit Runs
              </h3>
              <p>
                Survey the tableau for suits where multiple adjacent-rank cards are already
                exposed or near the surface. If the 8, 7, and 6 of Clubs are all accessible,
                connecting them into a 3-card same-suit run should be a high priority. Long
                same-suit runs are powerful because they can be moved as a unit (given enough
                empty flippers and columns), they free up the columns they leave behind, and
                each card in the run is one step closer to being sent to the foundations.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Suit Concentration Strategy
              </h3>
              <p>
                Rather than spreading your attention across all four suits, identify the one or
                two suits where the initial deal is most favorable &mdash; cards already partially
                ordered, key cards near the surface &mdash; and focus your early efforts there.
                Building a long run in one suit creates cascading benefits: it frees up columns,
                sends cards to foundations, and creates space that helps you work on the remaining
                suits later. Trying to make equal progress across four suits simultaneously
                usually means making meaningful progress in none of them.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Watch for Wrapping Traps
              </h3>
              <p>
                Wrapping is powerful but it can also create confusion. When you wrap a sequence
                from Ace down to King and continue descending, it is easy to lose track of which
                direction the sequence is heading and where it will ultimately connect to the
                foundations. A useful mental trick: always think in terms of &quot;distance to
                foundation.&quot; Count how many cards in the descending sequence need to be built
                before a card reaches the foundation. This keeps you focused on progress rather
                than getting lost in the circular ordering.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 4: Empty Column Restrictions */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Empty Column Restrictions and Planning
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                In standard FreeCell, an empty cascade is a versatile tool &mdash; any card can go
                there, and you can use it as temporary storage for any blocking card. Penguin
                removes that flexibility entirely. Empty columns can only be filled by one specific
                rank: the rank immediately below (in the wrapping order) the foundation starting
                rank. This single restriction is responsible for more lost Penguin games than any
                other rule.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Know Your Fill Rank
                </h3>
                <p className="text-sm">
                  Before your first move, identify the fill rank &mdash; the only rank that can
                  go into empty columns. If foundations start on Queens, the fill rank is Jack. If
                  foundations start on 3s, the fill rank is 2. If foundations start on Aces, the
                  fill rank is King (wrapping). Memorize this rank for the current game. Every
                  decision about whether to empty a column or keep it occupied depends on whether
                  you have a fill-rank card available to place there and whether doing so actually
                  advances your position.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Empty Columns Are Less Useful Than in FreeCell
              </h3>
              <p>
                Because only one rank can fill empty columns, creating an empty column in Penguin
                is not the universal tool it is in FreeCell. If you empty a column but have no
                fill-rank card ready to place there, the column sits empty &mdash; useful only
                as part of the supermove calculation. You cannot temporarily stash a random
                blocking card there. This means the traditional FreeCell strategy of &quot;empty
                a column as fast as possible&quot; does not always apply. Sometimes keeping a
                column occupied with a well-ordered same-suit sequence is more valuable than
                emptying it.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Planning Around the Restriction
              </h3>
              <p>
                When you notice a column that could potentially be emptied, immediately check
                two things. First, do you have a fill-rank card that benefits from being placed
                in the empty column? Ideally, it is a fill-rank card that can serve as the base
                of a new same-suit descending sequence. Second, is the act of emptying the column
                itself valuable enough even if you cannot fill it immediately? An empty column
                still contributes to your supermove capacity, which matters when you need to
                relocate a long sequence.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Strategic Use of Fill-Rank Cards
                </h3>
                <p className="text-sm">
                  Fill-rank cards are special in Penguin because they are the only cards that can
                  start new columns. Treat them as strategic assets. Do not bury a fill-rank card
                  deep in a column if you can avoid it. Do not send one to a flipper unless you
                  have a specific plan to retrieve it. And when you do place a fill-rank card in
                  an empty column, think carefully about which same-suit sequence you want to build
                  on top of it. The column you are creating will be one of your primary workspaces
                  for the rest of the game.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Foundation Timing */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Foundation Timing &mdash; When to Build Up
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Penguin&apos;s foundation mechanics add another layer of complexity. Because the
                foundations start on a random rank and build up with wrapping, you need to send
                cards in a specific circular order. The card of the starting rank goes first,
                then the next rank up, continuing through King, wrapping to Ace, and eventually
                reaching the rank just below where you started. Timing these foundation plays
                correctly is critical.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Don&apos;t Rush to the Foundations
              </h3>
              <p>
                It is tempting to send every playable card to the foundations as soon as it
                becomes available. Resist this urge. In Penguin, the same-suit building rule
                means you often need intermediate cards in the tableau as landing spots for
                other cards. Sending the 9 of Hearts to the foundation might feel like progress,
                but if the 8 of Hearts is buried and needs the 9 as a temporary destination
                before it can be routed to the foundation, you have created a problem. Always
                check whether a card is still needed as a tableau stepping stone before promoting
                it.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Safety Threshold for Foundation Plays
                </h3>
                <p className="text-sm">
                  A card is safe to send to the foundation when all cards that might need to land
                  on it in the tableau have already been sent to the foundation themselves. In
                  practice, this means the first 2-3 ranks above the foundation start can usually
                  be promoted safely, because the cards that would land on them are the foundation
                  starting rank (already on the foundation) and the rank just above (which you are
                  about to promote). Beyond that, check carefully. The more ranks you have built
                  on the foundations, the more likely it is that promoting the next card is safe
                  &mdash; but it is never automatic.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Keep Foundations Roughly Even
              </h3>
              <p>
                Try to advance all four foundations at a similar pace. If one foundation is 5
                cards ahead of the others, you have likely been too aggressive with that suit
                and may have stranded cards from other suits that needed those promoted cards
                as tableau landing spots. A good target is to keep all foundations within 2-3
                ranks of each other. When one suit pulls ahead, pause and look for opportunities
                to advance the lagging suits before continuing.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                The Endgame Acceleration
              </h3>
              <p>
                Once you have cleared most of the tableau and have 3 or fewer cards per column
                with plenty of empty flippers, the game shifts into an endgame mode where you
                can typically send cards to foundations rapidly. At this point, the wrapping
                order becomes your primary concern &mdash; make sure you are sending cards in
                the correct sequence. A common late-game mistake is trying to send a card to
                a foundation before its predecessor in the build order has been placed. Stay
                disciplined about the circular ordering even when victory is in sight.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 6: Common Mistakes */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Common Mistakes and How to Avoid Them
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Penguin Solitaire punishes certain habits that players develop in FreeCell and
                other solitaire variants. Understanding these common mistakes will save you
                dozens of lost games.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Forgetting the Empty Column Restriction
                  </h3>
                  <p className="text-sm">
                    The most frequent mistake new Penguin players make is planning a sequence of
                    moves that requires placing a card in an empty column, only to discover that the
                    card is not the correct fill rank. This wastes mental energy and often leaves you
                    in a worse position because you have already committed flippers to the first
                    steps of the plan. Before executing any multi-move sequence, verify that every
                    card you plan to place in an empty column is the correct fill rank. Make this
                    check automatic.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Treating Flippers Like FreeCell Free Cells
                  </h3>
                  <p className="text-sm">
                    In FreeCell, using 2-3 free cells casually is normal because the alternating-color
                    rule provides plenty of legal moves to clear them. In Penguin, same-suit building
                    means each flipper card has only one possible tableau destination. Casually filling
                    5-6 flippers because &quot;you have 7&quot; creates a logjam that is extremely
                    difficult to resolve. The extra flippers are there to compensate for the game&apos;s
                    stricter rules, not to encourage careless storage.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Ignoring Wrapping Opportunities
                  </h3>
                  <p className="text-sm">
                    Players who are new to Penguin often miss wrapping moves entirely. They see an
                    Ace at the bottom of a sequence and assume nothing can be placed on it, forgetting
                    that a King of the same suit can wrap below it. Similarly, they overlook that a
                    2 can accept an Ace of the same suit, which can then accept a King. These missed
                    connections leave cards stranded that could have been part of a productive sequence.
                    Train yourself to check for wrapping moves, especially around the Ace-King boundary.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Building Long Sequences You Cannot Move
                  </h3>
                  <p className="text-sm">
                    Building a beautiful 8-card same-suit sequence feels productive, but if you do not
                    have enough empty flippers and columns to actually move it where it needs to go,
                    you have effectively locked those 8 cards in place. Before extending a sequence,
                    check the supermove math. With 3 empty flippers and 0 empty columns, you can move
                    4 cards. Building a 6-card sequence when you can only move 4 means the bottom 2
                    cards are stuck until conditions improve. Sometimes building a shorter, movable
                    sequence is more strategically sound than building a longer, immovable one.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Promoting Foundation Cards Too Aggressively
                  </h3>
                  <p className="text-sm">
                    Because Penguin&apos;s foundations build with wrapping, the build order can feel
                    unintuitive. Players sometimes rush to promote cards without checking whether
                    those cards are still needed in the tableau as same-suit landing spots. A card
                    on the foundation is gone forever &mdash; you cannot retrieve it. In the middle
                    game, always ask: &quot;Is any card in the tableau currently counting on this card
                    as a potential destination?&quot; If the answer might be yes, hold the promotion
                    until you are certain the card is no longer needed below.
                  </p>
                </div>
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
              <ContentLinkCard href="/penguin" title="Play Penguin Solitaire" description="Play online for free, no download required." />
              <ContentLinkCard href="/bakers-game/strategy" title="Baker's Game Strategy" description="Same-suit building without wrapping." />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Compare with alternating-color FreeCell tactics." />
            </ContentBody>
          </CardSection>

          <CtaSection
            heading="Ready to Play?"
            body="Put these strategies into practice. Play Penguin Solitaire online for free — no download, no signup."
            primaryLabel="Play Penguin Solitaire"
            primaryHref="/penguin"
          />

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/penguin" title="Play Penguin Solitaire" description="Play online for free, no download" />
              <ContentLinkCard href="/penguin/how-to-play" title="Penguin How to Play" description="Rules and setup for Penguin Solitaire" />
              <ContentLinkCard href="/penguin/tips" title="Penguin Tips" description="Quick tips for winning more games" />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy for the classic FreeCell game" />
              <ContentLinkCard href="/solitaire-types" title="Types of Solitaire" description="20 solitaire variants compared" />
              <ContentLinkCard href="/" title="Play FreeCell" description="The classic strategic solitaire" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
