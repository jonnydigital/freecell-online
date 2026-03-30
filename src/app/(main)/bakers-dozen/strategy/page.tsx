import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Baker's Dozen Strategy Guide — Win Without Free Cells",
  description:
    "In-depth Baker's Dozen strategy guide covering no-free-cell play, column management, king placement tactics, foundation building, and how to read the board for maximum win rate.",
  keywords: [
    "baker's dozen strategy",
    "baker's dozen solitaire tips",
    "how to win baker's dozen",
    "baker's dozen card game",
    "baker's dozen vs freecell",
    "no free cells solitaire",
    "baker's dozen guide",
    "baker's dozen king rule",
    "baker's dozen column management",
    "baker's dozen winning strategy",
  ],
  openGraph: {
    title: "Baker's Dozen Strategy Guide — Win Without Free Cells",
    description:
      "Expert strategies for Baker's Dozen solitaire. Learn column management, king placement tactics, and how to win without free cells.",
    url: absoluteUrl("/bakers-dozen/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What makes Baker's Dozen different from FreeCell?",
    answer:
      "Baker's Dozen and FreeCell differ in several fundamental ways. Baker's Dozen deals 52 cards into 13 columns of 4 cards each, has no free cells at all, and only allows you to move one card at a time. You build down on the tableau regardless of suit, rather than by alternating colors. Kings are automatically moved to the bottom of each column during setup. FreeCell uses 8 cascades, provides 4 free cells for temporary storage, and requires alternating-color tableau building. The lack of free cells in Baker's Dozen makes column management the central strategic challenge.",
  },
  {
    question: "What percentage of Baker's Dozen games are winnable?",
    answer:
      "Approximately 80% of randomly dealt Baker's Dozen games are solvable. This is lower than FreeCell's near-perfect solvability rate of 99.999%, but significantly higher than many other solitaire variants. The relatively high win rate is partly due to the king-to-bottom rule, which prevents Kings from blocking access to lower-ranked cards. Knowing that roughly 1 in 5 deals is unsolvable is important — if you find yourself completely stuck after careful play, the deal itself may be the problem rather than your strategy.",
  },
  {
    question: "Why are Kings placed at the bottom in Baker's Dozen?",
    answer:
      "Kings are placed at the bottom of each column during setup to prevent them from creating impassable blockages. Since Baker's Dozen has no free cells and only allows single-card moves, a King sitting on top of a needed card would be extremely difficult to deal with — there is no temporary storage to put it in, and no card in the deck ranks higher than a King to stack it on. Moving Kings to the bottom ensures every deal starts with accessible cards on top and keeps the game's 80% solvability rate intact. Without this rule, the win rate would drop dramatically.",
  },
  {
    question: "Is Baker's Dozen easier or harder than FreeCell?",
    answer:
      "Baker's Dozen is generally considered easier to learn but presents a different kind of challenge. The rules are simpler — no free cells to manage, no suit or color restrictions on tableau building, and only single-card moves to think about. However, the absence of free cells means you have zero temporary storage, which requires more careful column management. FreeCell gives you more tools (free cells, supermoves, alternating-color building) but demands you juggle more variables. Many players find Baker's Dozen more relaxing because decisions are more straightforward, even though approximately 20% of deals are unsolvable compared to FreeCell's near-perfect solvability.",
  },
  {
    question: "What is the best opening strategy for Baker's Dozen?",
    answer:
      "The best opening strategy is to scan all 13 columns before making any moves. Look for exposed Aces and Twos that can go directly to foundations. Identify columns where cards are already partially ordered by rank. Check which columns have low cards buried under high cards — these will need the most work. Prioritize uncovering Aces first, then focus on freeing cards that complete foundation sequences. Avoid moving cards to columns that block future progress, and try to create at least one empty column early to use as a staging area for rearranging cards.",
  },
];

export default function BakersDozenStrategyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Baker's Dozen Strategy Guide — Win Without Free Cells",
    description:
      "In-depth strategy guide for Baker's Dozen solitaire. Learn column management, king placement tactics, foundation building, and how to read the board for maximum win rate.",
    url: absoluteUrl("/bakers-dozen/strategy"),
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
        name: "Baker's Dozen",
        item: absoluteUrl("/bakers-dozen"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy",
        item: absoluteUrl("/bakers-dozen/strategy"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Baker&apos;s Dozen Strategy Guide"
        subtitle="Master column management, king placement, and foundation building in the solitaire variant where you have no free cells to fall back on."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Baker's Dozen", href: "/bakers-dozen" }]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {/* Section 1: Understanding Baker's Dozen */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Understanding Baker&apos;s Dozen: No Free Cells, No Problem
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Baker&apos;s Dozen is one of the most distinctive solitaire variants because it
                strips away the safety net that games like FreeCell provide. There are no free
                cells, no reserve piles, no stock to draw from. You have 52 cards dealt face-up
                into 13 columns of 4 cards each, four empty foundation piles, and your wits.
                That&apos;s it.
              </p>
              <p>
                The name comes from the 13 columns &mdash; a &quot;baker&apos;s dozen&quot; &mdash;
                and the game has been played since at least the 19th century. What makes it
                compelling is the tension between simplicity and depth. The rules are among the
                easiest in all of solitaire: move one card at a time, build down on the tableau
                regardless of suit, build up by suit on the foundations. Yet the absence of
                temporary storage means every move carries weight.
              </p>
              <p>
                Unlike FreeCell, where you can stash awkward cards in free cells while you
                rearrange the tableau, Baker&apos;s Dozen forces you to work entirely within the
                13-column layout. Every card you move to a column is a card that might block
                something else. Every column you empty is a column that could serve as temporary
                staging &mdash; but only if you can keep it empty long enough to use it.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Core Constraint
                </h3>
                <p className="text-sm">
                  In FreeCell, you have 4 free cells that act as a buffer &mdash; temporary storage
                  where you can park cards while executing multi-step moves. In Baker&apos;s Dozen,
                  that buffer does not exist. The only places a card can go are: onto another column
                  (on a card of any suit that is one rank higher) or onto a foundation pile (on a card
                  of the same suit that is one rank lower). This means you cannot &quot;undo&quot; a
                  mistake by temporarily moving a card aside. Every placement is semi-permanent unless
                  you can find another column willing to accept that card back.
                </p>
              </div>

              <p>
                The good news is that Baker&apos;s Dozen compensates for the lack of free cells in
                two important ways. First, you have 13 columns instead of FreeCell&apos;s 8, giving
                you more places to move cards. Second, tableau building is unrestricted by suit or
                color &mdash; any card can go on any card that is one rank higher. These two
                features give you significantly more legal moves than you might expect, which is
                why approximately 80% of deals are solvable despite the absence of free cells.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Why Baker&apos;s Dozen Rewards Strategic Thinking
                </h3>
                <p className="text-sm">
                  Because you can only move one card at a time, there are no supermoves in Baker&apos;s
                  Dozen. In FreeCell, experienced players think in terms of multi-card sequences that
                  can be relocated using free cells and empty cascades as intermediary storage. In
                  Baker&apos;s Dozen, every single card movement is explicit. This makes the game more
                  transparent &mdash; you can see exactly what is happening with each move &mdash; but
                  it also means that long-range planning is essential. You need to think 5, 10, even
                  15 moves ahead to set up the sequences that will unlock buried cards and feed
                  the foundations.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* Section 2: The King Rule */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The King Rule: Why It Changes Everything
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Before any cards are played, Baker&apos;s Dozen applies a special setup rule: all
                four Kings are moved to the bottom of whichever column they appear in. This is not
                a cosmetic detail &mdash; it is the single most important design decision in the
                game, and understanding why it exists will fundamentally shape your strategy.
              </p>
              <p>
                Consider what would happen without the King rule. A King is the highest-ranked card
                in the deck. No other card can be placed on top of a King on the tableau (since
                there is no card one rank higher). In a game with no free cells, a King sitting on
                top of a column is an immovable object. It can only go to a foundation pile once
                all 12 lower cards of its suit have been played. If that King is sitting on top of
                an Ace you need, you are stuck &mdash; permanently, irreversibly stuck. The game
                would be over before it started.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  How Kings at the Bottom Affects Column Strategy
                </h3>
                <p className="text-sm">
                  With Kings always at the bottom, you know that every column&apos;s bottom card is
                  either a King or a card that was already below a King in the deal. This has a
                  subtle but important strategic implication: you will never be able to fully empty
                  a column that has a King at its base unless you first build up that King&apos;s
                  entire suit on the foundations. Kings are effectively anchored in place. This means
                  the columns you can realistically empty are the ones where the bottom card is
                  something other than a King &mdash; a card that can potentially be moved to
                  another column or sent to a foundation.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Kings as Foundation Anchors
              </h3>
              <p>
                Since Kings sit at the bottom and cannot be moved until their entire suit is built
                up to the Queen on the foundations, think of each King as an anchor for its column.
                The three cards above the King are the ones you need to work with. Your early
                strategy should focus on freeing those three cards efficiently, either by sending
                them to foundations or relocating them to other columns where they will not cause
                blockages.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                When Multiple Kings Stack in One Column
              </h3>
              <p>
                Occasionally, the deal places two or even three Kings in the same column before
                the King rule rearranges them. After Kings are moved to the bottom, that column
                might have two Kings at its base with only one or two playable cards on top. These
                double-King columns are essentially dead weight for most of the game &mdash; you
                cannot empty them, and their useful cards are limited. Recognize these columns
                early and plan accordingly. Do not invest moves trying to &quot;fix&quot; a column
                with multiple Kings at the bottom. Instead, focus your energy on the columns with
                better potential.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Strategic Takeaway
                </h3>
                <p className="text-sm">
                  The King rule guarantees that you will always have accessible cards to work with
                  at the start of the game. But it also means that Kings themselves are permanently
                  out of play until the endgame. Your strategy should treat King-anchored columns
                  as fixed infrastructure &mdash; useful for stacking cards onto, but not candidates
                  for emptying. Save your column-clearing ambitions for the non-King columns where
                  you can actually achieve an empty space.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Column Management Without Free Cells */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Column Management Without Free Cells
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Column management is the heart of Baker&apos;s Dozen strategy. Without free cells,
                your 13 columns are your entire workspace. How you use them determines whether you
                win or lose. The key insight is that each column serves a dual purpose: it is both
                a storage location and a potential obstacle. Every card you add to a column makes
                the cards beneath it harder to access.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                The Empty Column Advantage
              </h3>
              <p>
                An empty column in Baker&apos;s Dozen is the closest thing you have to a free cell.
                Any single card can be placed into an empty column, giving you temporary breathing
                room to access cards beneath it in other columns. Creating and maintaining empty
                columns is the most powerful tactic available to you. A single empty column can be
                the difference between a winning position and a dead end.
              </p>
              <p>
                To create an empty column, you need to move all of its cards elsewhere &mdash;
                either to foundations or to other columns. Start by identifying the column with the
                fewest obstructions. Look for columns where the top cards can go directly to
                foundations or where they naturally fit on top of other columns without causing
                new problems. Remember that columns with Kings at the bottom cannot be fully
                emptied, so focus on columns where the bottom card is movable.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Cascade Principle
                </h3>
                <p className="text-sm">
                  When you move a card from one column to another, you are not just moving that
                  card &mdash; you are exposing the card beneath it. Think of each move as having
                  two effects: the card you move and the card you reveal. The best moves are ones
                  where both effects are positive &mdash; the moved card lands somewhere useful,
                  and the revealed card is something you need or can immediately play. Before every
                  move, check what card is hiding underneath. If revealing that card creates a
                  bigger problem than the one you are solving, reconsider.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Column Depth and Accessibility
              </h3>
              <p>
                Each column starts with only 4 cards, which is relatively shallow. But as the game
                progresses, some columns will grow to 6, 8, or even 10 cards as you consolidate
                cards from other columns. Long columns are dangerous because the cards at the
                bottom become increasingly difficult to access. Every card you add to a column is
                another layer of obstruction between you and whatever is underneath.
              </p>
              <p>
                A good general principle is to keep columns as short as possible. When you have a
                choice between adding a card to a short column versus a long column, choose the
                short column. When you have a choice between adding a card to a column with useful
                buried cards versus one with cards you do not need yet, choose the column where
                you are not blocking anything important.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Suit-Blind Stacking: A Double-Edged Sword
              </h3>
              <p>
                Baker&apos;s Dozen allows you to stack any card on any card of the next higher
                rank, regardless of suit or color. This freedom is both a blessing and a trap.
                The blessing is obvious: you have far more legal moves available than in games
                like Baker&apos;s Game or FreeCell. The trap is that just because a move is legal
                does not mean it is wise.
              </p>
              <p>
                Consider this scenario: you have the 7 of Hearts exposed, and two columns with
                an 8 on top &mdash; the 8 of Clubs and the 8 of Diamonds. Both are legal targets
                for the 7 of Hearts. But one of those 8s might be sitting on a card you need soon,
                while the other is sitting on a King (which you cannot access anyway). Always
                choose the target where your move causes the least future disruption. Stacking
                on a King-bottomed column is often the safer choice because you are not blocking
                anything you could otherwise reach.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Column Triage: Prioritize Your Workspace
                </h3>
                <p className="text-sm">
                  Not all columns are created equal. At the start of each game, mentally sort
                  your 13 columns into three categories: (1) &quot;Clearable&quot; columns where
                  the bottom card is not a King and the cards can be distributed relatively easily.
                  These are your candidates for creating empty columns. (2) &quot;Working&quot;
                  columns where the cards are in a useful order or can serve as staging areas for
                  other moves. These are your main operational space. (3) &quot;Anchor&quot; columns
                  where Kings sit at the bottom and the column will serve primarily as a dumping
                  ground for cards you need to relocate. This triage helps you allocate your moves
                  more efficiently rather than treating all columns as interchangeable.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 4: Building Foundations Efficiently */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Building Foundations Efficiently
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The goal of Baker&apos;s Dozen is to build all four foundation piles from Ace
                to King, sorted by suit. Foundation building seems straightforward &mdash; when
                you see a card that fits on a foundation, play it. But in practice, the timing
                and order of your foundation plays can make or break a game.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Aces First, Always
              </h3>
              <p>
                Aces should go to foundations immediately, every time, without exception. An Ace
                on the tableau is a dead card &mdash; nothing can be stacked on it (since there is
                no card of rank 0), and it occupies a valuable column position. Playing an Ace to
                a foundation costs you nothing and opens up the position beneath it. If you see an
                exposed Ace and do not play it immediately, you are making a strategic error.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Twos and Threes: Almost Always Safe
              </h3>
              <p>
                Twos can generally be played to foundations as soon as their Ace is in place. A 2
                on the tableau has limited value &mdash; the only card that could stack on it is an
                Ace, which should already be on the foundation. Similarly, 3s are almost always safe
                to play up because the only card that would stack on a 3 is a 2, which should also
                be heading to the foundation. The risk of prematurely playing 2s and 3s is negligible.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Mid-Range Dilemma
                </h3>
                <p className="text-sm">
                  Cards in the 4-8 range require more careful consideration. A 6 on the tableau
                  is a valid stacking target for any 5 in the game. If you play that 6 to the
                  foundation, you remove a potential landing spot that might have helped you
                  rearrange other columns. Before playing a mid-range card to the foundation,
                  ask: &quot;Are there any cards currently stuck that could use this card as a
                  stepping stone?&quot; If the answer is yes, consider leaving it on the tableau
                  until you no longer need it as a stacking target. If all the cards of the next
                  lower rank are already on foundations or in positions where they do not need
                  a tableau target, play the card up freely.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Keep Foundation Levels Balanced
              </h3>
              <p>
                Try to avoid situations where one foundation pile is at 7 while another is still at
                Ace. Highly unbalanced foundations create a problem: the cards between the lowest
                and highest foundation levels are in a no-man&apos;s land where they cannot go to
                foundations (their suit is not ready) but they are taking up valuable tableau space.
                Keeping foundation levels within 2-3 ranks of each other reduces this congestion
                and gives you a smoother path to completion.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                The Endgame Rush
              </h3>
              <p>
                Once all four foundations are at rank 7 or higher, the game often enters an
                &quot;auto-complete&quot; phase where remaining cards can be played to foundations
                in a natural cascade. Getting to this point is the real challenge. If you can
                navigate the midgame well enough to reach a balanced foundation position in the
                7-9 range across all four suits, the endgame usually takes care of itself.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Suit Priority
                </h3>
                <p className="text-sm">
                  When multiple suits have cards ready for the foundation, prioritize the suit
                  where advancing the foundation will unblock the most tableau cards. If playing
                  the 5 of Hearts to the foundation exposes an Ace of Spades in the column beneath
                  it, while playing the 5 of Clubs to the foundation exposes a King (which is stuck
                  at the bottom anyway), the Hearts play is clearly better. Always consider the
                  downstream effects of foundation plays, not just the immediate card.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Reading the Board */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Reading the Board: What to Look for in the Opening
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The most common mistake beginners make in Baker&apos;s Dozen is moving the first
                card they see without surveying the entire board. Because all 52 cards are face-up,
                you have complete information from the very first moment. Take advantage of this.
                Spend 30-60 seconds reading the board before you touch a single card.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Step 1: Locate All Four Aces
              </h3>
              <p>
                Find every Ace on the board. Are they exposed on top of columns, or buried beneath
                other cards? An exposed Ace is an immediate free move. A buried Ace tells you
                which columns need attention first. If an Ace is buried under two cards, those
                two cards need to go somewhere before you can start building that suit&apos;s
                foundation. Make a mental note of the cost (in moves) of reaching each Ace.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Step 2: Trace the Low Cards
              </h3>
              <p>
                After the Aces, locate the 2s and 3s. These are the cards that feed the
                foundations in the early game. If an Ace and its corresponding 2 are both
                exposed, that suit has a strong start. If the 2 is deeply buried, you know
                that suit will stall early. Understanding which suits have accessible low cards
                helps you prioritize which foundation to build first.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Opening Scan Checklist
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    Where are the four Aces? How many moves to reach each one?
                  </li>
                  <li>
                    Which suits have 2s and 3s accessible? Which suits are blocked?
                  </li>
                  <li>
                    Which columns have non-King bottom cards? These are your empty-column candidates.
                  </li>
                  <li>
                    Are any columns already partially ordered (e.g., 9-8-7 top to bottom)?
                  </li>
                  <li>
                    Where are the Queens? Queens on top of Kings are essentially stuck and need
                    to be freed through foundation building.
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Step 3: Identify Problem Columns
              </h3>
              <p>
                Some columns are naturally harder to work with than others. A column with a low
                card at the bottom (like a 3 or 4) beneath higher cards is a problem because you
                need that low card for foundation building but it is blocked by cards that are hard
                to place elsewhere. A column where the four cards are all from different suits in
                random order offers no natural stacking opportunities &mdash; each card has to go
                to a different destination.
              </p>
              <p>
                Conversely, a column where cards are in descending order (regardless of suit) is
                already partially organized. The top card can leave, exposing the next card in
                sequence. These &quot;friendly&quot; columns require less work and should be
                lower on your priority list.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Step 4: Plan Your First Five Moves
              </h3>
              <p>
                Based on your survey, mentally plan your first five moves before touching anything.
                The opening sequence typically follows a pattern: play any exposed Aces to
                foundations, move cards that uncover Aces or 2s, and begin consolidating columns
                toward creating your first empty space. If your planned five moves all work out,
                you have a good foundation (literally and figuratively) for the midgame. If you
                cannot even plan five productive moves, the deal may be difficult or unsolvable.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Reading the Board Gets Faster with Practice
                </h3>
                <p className="text-sm">
                  Your first few games of Baker&apos;s Dozen might require a full minute or more of
                  board analysis before you make a move. That is perfectly normal. As you play more
                  games, pattern recognition develops. You will start seeing opportunities and
                  problems instinctively. Experienced players can scan a Baker&apos;s Dozen layout
                  in 10-15 seconds and have a solid opening plan. The investment in learning to read
                  the board pays dividends in win rate.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 6: Common Mistakes */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Common Baker&apos;s Dozen Mistakes and How to Avoid Them
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Even experienced solitaire players make predictable errors when they start playing
                Baker&apos;s Dozen. Recognizing these common mistakes and understanding why they
                happen will accelerate your improvement and help you avoid the most frequent
                sources of lost games.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Mistake 1: Moving Without a Plan
                  </h3>
                  <p className="text-sm">
                    The most common mistake is making the first legal move you see without
                    thinking about the consequences. Baker&apos;s Dozen&apos;s simple rules make
                    it tempting to play quickly, but impulsive moves often create blockages that
                    take many moves to undo &mdash; or cannot be undone at all. Before every move,
                    ask yourself: &quot;What does this move accomplish? What does it block? Is there
                    a better alternative?&quot; Even a 3-second pause before each move dramatically
                    improves your win rate.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Mistake 2: Filling Empty Columns Carelessly
                  </h3>
                  <p className="text-sm">
                    Creating an empty column is a significant achievement in Baker&apos;s Dozen.
                    Throwing a random card into it without a specific plan is one of the most
                    costly errors you can make. An empty column is a strategic asset &mdash; it
                    gives you flexibility for future moves and lets you temporarily park cards
                    while rearranging other columns. Once you fill it, that flexibility is gone.
                    Only place a card in an empty column when doing so is part of a deliberate
                    sequence that will either create progress toward the foundations or open up
                    another column.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Mistake 3: Ignoring Card Accessibility
                  </h3>
                  <p className="text-sm">
                    New players often focus on the top card of each column without considering
                    what lies beneath. In Baker&apos;s Dozen, the cards beneath the top card are
                    just as important because they represent your future moves. A column might have
                    a useless 10 on top, but beneath it sits an Ace you desperately need. Always
                    think in terms of what a move <em>reveals</em>, not just what it
                    <em> relocates</em>. The best moves accomplish both: they put a card somewhere
                    useful and expose a card you need.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Mistake 4: Building Tall Columns
                  </h3>
                  <p className="text-sm">
                    Because tableau building is suit-independent, it is easy to create long
                    descending sequences by piling cards onto a single column. A column that
                    grows to 8 or 10 cards deep is a liability. Every card stacked on top of
                    that column buries the cards below, making them progressively harder to
                    reach. Distribute cards across multiple columns rather than building towers.
                    A spread-out board gives you more options than a concentrated one.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Mistake 5: Neglecting Foundation Balance
                  </h3>
                  <p className="text-sm">
                    When one suit has several accessible cards, it is tempting to rush that suit
                    up to 6 or 7 on the foundation while the other three suits are stuck at Ace or
                    2. This creates a bottleneck: cards from the lagging suits clog up the tableau
                    while the advanced suit&apos;s remaining cards are buried underneath them. Keep
                    all four foundation piles advancing at a roughly even pace. If one suit pulls
                    ahead by more than 3 ranks, pause and redirect your attention to the
                    trailing suits.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Mistake 6: Not Using Undo
                  </h3>
                  <p className="text-sm">
                    Many digital implementations of Baker&apos;s Dozen include an undo feature.
                    There is no shame in using it. When you make a move and immediately realize
                    it was wrong &mdash; or when you want to test whether a particular line of
                    play leads somewhere productive &mdash; undo is your friend. Experienced
                    players use undo strategically to explore different paths and find the
                    optimal sequence. Think of it as a learning tool, not a crutch.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Patience Principle
                </h3>
                <p className="text-sm">
                  Baker&apos;s Dozen is called &quot;patience&quot; in some traditions for a reason.
                  The game rewards deliberate, careful play over speed. If you find yourself making
                  moves quickly without thinking, slow down. The difference between a 50% win rate
                  and a 75% win rate often comes down to nothing more than taking an extra few
                  seconds before each move to consider all your options. In a game where roughly
                  80% of deals are theoretically solvable, your goal is to solve as many of those
                  winnable deals as possible &mdash; and patience is the most reliable tool for
                  getting there.
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
              <ContentLinkCard href="/bakers-dozen" title="Play Baker's Dozen" description="Play online for free, no download required." />
              <ContentLinkCard href="/bakers-dozen/how-to-play" title="How to Play Baker's Dozen" description="Complete rules and setup guide." />
              <ContentLinkCard href="/bakers-dozen/tips" title="Baker's Dozen Tips" description="Quick tips for improving your win rate." />
            </ContentBody>
          </CardSection>

          <CtaSection
            heading="Ready to Play?"
            body="Put these strategies into practice. Play Baker's Dozen online for free — no download, no signup."
            primaryLabel="Play Baker's Dozen"
            primaryHref="/bakers-dozen"
          />

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/bakers-dozen" title="Play Baker's Dozen" description="Play online for free, no download" />
              <ContentLinkCard href="/bakers-dozen/how-to-play" title="How to Play" description="Complete rules and setup guide" />
              <ContentLinkCard href="/bakers-dozen/tips" title="Baker's Dozen Tips" description="Quick tips to improve your game" />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Compare with FreeCell tactics" />
              <ContentLinkCard href="/bakers-game/strategy" title="Baker's Game Strategy" description="Same-suit building strategy guide" />
              <ContentLinkCard href="/solitaire-types" title="Types of Solitaire" description="20 solitaire variants compared" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
