import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Baker's Dozen Strategy Guide | Winning Techniques & Expert Tips",
  description:
    "Master Baker's Dozen Solitaire: foundation order, tableau management, King-on-bottom mechanics, and card access optimization for higher win rates.",
  keywords: [
    "bakers dozen strategy",
    "bakers dozen solitaire strategy",
    "bakers dozen winning strategy",
    "how to win bakers dozen",
    "bakers dozen strategy guide",
    "bakers dozen advanced techniques",
    "bakers dozen foundation order",
    "bakers dozen tableau management",
    "bakers dozen vs freecell",
    "bakers dozen solitaire win rate",
    "bakers dozen expert tips",
  ],
  alternates: {
    canonical: absoluteUrl("/bakers-dozen/strategy"),
  },
  openGraph: {
    title: "Baker's Dozen Strategy Guide | Winning Techniques & Expert Tips",
    description:
      "Advanced strategies for Baker's Dozen: foundation sequencing, tableau management, King-on-bottom mechanics, card access planning, and expert techniques for higher win rates.",
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
    question: "What is the best strategy for Baker's Dozen Solitaire?",
    answer:
      "The best strategy is to build foundations evenly while keeping as many tableau columns accessible as possible. Start by promoting any free Aces and Twos, then focus on the suit whose low cards (3, 4, 5) are most accessible. Avoid building long descending sequences on the tableau — they trap cards you will need later. Since Kings are always at the bottom of columns and cannot be moved, plan around them rather than trying to work with them. The game has a high win rate (around 75-80%) when played with discipline.",
  },
  {
    question: "How does Baker's Dozen differ from FreeCell strategically?",
    answer:
      "Baker's Dozen is simpler than FreeCell in some ways but harder in others. Baker's Dozen has no free cells and no empty column moves — you can only move the top card of each column to a foundation or onto another column's top card of one higher rank (regardless of suit). Kings are permanently placed at the bottom of columns during setup and can never be moved. FreeCell offers free cells for temporary storage and allows any card in empty columns. Baker's Dozen compensates with 13 columns (vs 8 in FreeCell) and all cards face-up, giving you more options per move despite fewer mechanics.",
  },
  {
    question: "What win rate should I expect in Baker's Dozen?",
    answer:
      "Baker's Dozen is one of the more winnable solitaire variants. Skilled players achieve roughly 75-80% win rate, and some estimate that over 90% of deals are theoretically solvable with perfect play. This is significantly higher than Beleaguered Castle (30-40%) or Forty Thieves (10-15%), and comparable to standard FreeCell (99.99% solvable but requires more complex planning). Baker's Dozen's high win rate comes from 13 columns, all-visible cards, and the King-on-bottom rule that prevents Kings from blocking other cards.",
  },
  {
    question: "Why are Kings placed at the bottom of columns in Baker's Dozen?",
    answer:
      "The King-on-bottom rule is Baker's Dozen's defining mechanic. During setup, any King found in a column is moved to the bottom before play begins. This prevents Kings from sitting on top of useful lower-rank cards and blocking access — a problem that plagues many other solitaire variants. Strategically, this means you never need to worry about 'King management' the way you do in FreeCell or Beleaguered Castle. Kings are permanently out of the way, and you can focus entirely on sequencing the remaining 48 cards (Ace through Queen) into the foundations.",
  },
  {
    question: "Should I create empty columns in Baker's Dozen?",
    answer:
      "Unlike FreeCell or Beleaguered Castle, empty columns in Baker's Dozen cannot receive any cards — they are simply dead space. This is a critical rule that many players miss. You cannot place any card into an empty column, which means emptying a column provides no strategic benefit and wastes the resources spent clearing it. Instead of aiming for empty columns, focus on keeping all 13 columns active and accessible by avoiding deep sequences that bury important cards.",
  },
];

export default function BakersDozenStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Baker's Dozen", item: absoluteUrl("/bakers-dozen") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/bakers-dozen/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Baker's Dozen Solitaire Strategy Guide",
        description: "Advanced strategies for Baker's Dozen covering foundation building order, tableau management, King-on-bottom mechanics, card access optimization, and expert techniques.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-30",
        dateModified: "2026-03-30",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />

      <ContentHero
        title="Baker&apos;s Dozen Strategy Guide"
        kicker={<><Link href="/bakers-dozen" className="hover:text-white transition-colors">Baker&apos;s Dozen</Link> / Strategy</>}
        subtitle="Expert strategies for one of solitaire's most winnable variants — 13 columns, Kings locked at the bottom, and pure skill determining every outcome."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Baker's Dozen", href: "/bakers-dozen" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Baker&apos;s Dozen strategy revolves around three principles: <strong className="text-white">build
          foundations evenly across all four suits to prevent bottlenecks</strong>,{" "}
          <strong className="text-white">keep tableau columns shallow so that buried cards remain accessible
          within 1-2 moves</strong>, and{" "}
          <strong className="text-white">use the 13-column spread to distribute cards widely rather than
          stacking deeply</strong>. With Kings permanently locked at column bottoms, the game eliminates
          the King-management problem that plagues other variants, letting you focus on pure sequencing
          and foundation building.
        </p>
      </div>

      {/* Section 1: Foundation Building Order */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Foundation Building Order: The Key to Unlocking Every Deal
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          <Link href="/bakers-dozen" className="text-[var(--gold)] hover:text-white transition-colors">
            Baker&apos;s Dozen
          </Link>{" "}
          requires building four foundations from Ace to King. Since the game has no stock pile, no reserve,
          and no ability to place cards in empty columns, foundation building is your <em>only</em> way to
          remove cards from the tableau. Every card that reaches a foundation is one less card blocking other
          cards below it. This makes foundation-building order the most consequential strategic decision
          in the game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The optimal approach is to keep all four foundations as even as possible — ideally within 2 ranks
          of each other at all times. When one foundation races ahead (say Hearts at 8) while another lags
          (Clubs at 3), the lagging suit&apos;s cards accumulate across the tableau with nowhere to go. They
          block access to cards from other suits that need to reach their own foundations. This creates a
          cascading gridlock that is difficult to resolve.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Start each game by scanning the tableau for Aces. Any Ace sitting on top of a column should be
          promoted immediately — there is never a reason to keep an Ace in the tableau. After Aces, promote
          Twos the moment they become accessible. For ranks 3 and above, evaluate each promotion against
          the current board state before acting.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Promote Aces and Twos on sight.</strong> They have no useful
            function in the tableau — nothing strategically benefits from sitting on top of a Two. Get
            them to foundations immediately.
          </li>
          <li>
            <strong className="text-white/90">Prioritize the most &quot;ready&quot; suit.</strong> If the
            Ace, 2, 3, and 4 of Diamonds are all accessible (on top of columns or one card deep), that
            suit can be rapidly advanced. Build it up to create momentum and free tableau space.
          </li>
          <li>
            <strong className="text-white/90">Check what a promotion exposes.</strong> Before promoting a
            card, look at what sits beneath it in the column. If promoting the 5 of Hearts reveals the
            3 of Clubs (which the Clubs foundation needs next), the promotion has double value.
          </li>
          <li>
            <strong className="text-white/90">Avoid promoting if it breaks a useful sequence.</strong> A
            5 sitting on a 6 on a 7 is a ready-made sequence heading to the foundation. Promoting the 5
            first means the 6 has no base and the 7 is stranded. Wait until you can promote the 5, 6,
            and 7 in rapid succession.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Foundation building in Baker&apos;s Dozen is a balancing act,
            not a race. The player who builds four suits evenly to rank 7 is in a far better position
            than the player who has one suit at King and three at rank 3. Balance creates options;
            imbalance creates deadlocks.
          </p>
        </div>
      </section>

      {/* Section 2: King-on-Bottom Mechanics */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          King-on-Bottom Mechanics: Understanding the Defining Rule
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Baker&apos;s Dozen&apos;s most distinctive rule is that Kings are placed at the bottom of their
          respective columns during setup. Before the first move, any King found within a column is
          relocated to the bottom position. This is not a strategic choice — it happens automatically as
          part of the deal. The result is that Kings never block access to other cards, which is why
          Baker&apos;s Dozen has a much higher win rate than variants where Kings cause problems (like{" "}
          <Link href="/beleaguered-castle" className="text-[var(--gold)] hover:text-white transition-colors">
            Beleaguered Castle
          </Link>
          ).
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Strategically, the King-on-bottom rule means you can almost forget about Kings during gameplay.
          They sit at the bottom of their columns, only becoming relevant when the entire column above
          them has been cleared to foundations. At that point, the King itself goes to the foundation
          (assuming its suit is built to Queen), completing the suit. You do not need to plan King
          placements, King relocations, or King conflicts — a luxury that most solitaire variants deny you.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          However, the King-on-bottom rule has a subtle secondary effect: the number of Kings in a column
          determines its effective depth. A column with two Kings at the bottom has only 2 playable cards
          above them (since each column starts with 4 cards and Kings are moved to the bottom). This means
          some columns are shallower than others from the start, which creates natural targets for early
          foundation building.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Columns with multiple Kings are shallower.</strong> A column
            with 2 Kings at the bottom only has 2 non-King cards. These are often the easiest columns
            to clear first, creating early foundation momentum.
          </li>
          <li>
            <strong className="text-white/90">Kings are the last card promoted per column.</strong> Plan
            your foundation building knowing that each column&apos;s King will only leave when its suit
            reaches Queen. Structure your play so that suits are completed in an order that does not
            create late-game bottlenecks.
          </li>
          <li>
            <strong className="text-white/90">A column down to just its King(s) is dead space.</strong>{" "}
            Unlike other variants where empty columns are valuable, in Baker&apos;s Dozen a column
            containing only Kings cannot receive new cards and cannot contribute until those suits reach
            Queen. These &quot;King-only columns&quot; are neither helpful nor harmful — just static.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Strategic implication:</strong> Because Kings take care of themselves, your entire
            mental energy can focus on the Ace-through-Queen sequencing. This is what makes Baker&apos;s
            Dozen an excellent &quot;pure strategy&quot; solitaire — no King management, no hidden cards,
            no stock pile. Just you versus the visible tableau.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Tableau Column Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tableau Column Management: Width Over Depth
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Baker&apos;s Dozen gives you 13 columns — more than any other mainstream solitaire variant.
          This generous column count is the game&apos;s primary source of maneuverability, compensating for
          the lack of free cells, stock piles, and empty-column plays. With 13 columns, you always have
          multiple legal destinations for any card you want to move. The strategic challenge is choosing
          the <em>best</em> destination, not just any legal one.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The cardinal rule of tableau management: keep columns shallow. Since only top cards are accessible
          and you cannot move groups, every card stacked on top of another card is a card that blocks the
          one below it. A column five cards deep means the bottom card requires four prerequisite moves to
          access — each of which requires its own valid destination. In a game with no free cells and no
          empty column plays, those prerequisite moves can easily cascade into impossible situations.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The 13-column layout naturally encourages shallow columns (each starts with only 4 cards, Kings
          excluded). Maintain this shallowness by distributing cards across many columns rather than
          consolidating them into fewer deep columns. When you move a card from one column to another,
          you are making one column shallower and another deeper — make sure the trade-off is worthwhile.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Never stack more than 3 cards on a column voluntarily.</strong>{" "}
            If a column already has 3 non-King cards, adding a fourth should only happen if that fourth card
            is about to be promoted to the foundation on the next move.
          </li>
          <li>
            <strong className="text-white/90">Prefer placing cards on columns where they will leave soon.</strong>{" "}
            A 6 placed on a 7 is useful if the foundation is at 5 and the 6 will be promoted shortly. A 6
            placed on a 7 when the foundation is at 2 is a card trapped for many turns.
          </li>
          <li>
            <strong className="text-white/90">Use all 13 columns.</strong> Do not let 3-4 columns go unused
            while others grow deep. Spread cards across the full width of the tableau to maintain maximum
            access to all cards.
          </li>
          <li>
            <strong className="text-white/90">Watch for &quot;cascade-ready&quot; columns.</strong> A column
            reading 8-7-6 (with Kings below) is primed for a rapid foundation cascade once the suit reaches
            5. These columns are assets — protect their structure.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Think of your 13 columns as 13 slots in a sorting machine. You
            are sorting 48 cards (Ace through Queen, four suits) into four foundations. The more slots you
            keep accessible, the faster and more flexibly you can sort. Columns that grow too deep are
            jammed slots that slow the entire machine.
          </p>
        </div>
      </section>

      {/* Section 4: Card Access and Sequencing */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Card Access and Sequencing: Planning Multi-Move Chains
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Since all cards are visible from the start in Baker&apos;s Dozen, you can (and should) plan
          multi-move sequences before executing any single move. The difference between a 75% win rate
          and a 90%+ win rate is the depth of your planning — how many moves ahead you can see and
          whether you can identify chains of promotions that cascade through the tableau.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          A cascade happens when promoting one card exposes the next card needed by another foundation,
          which when promoted exposes the next card for a third foundation, and so on. These chains are
          the most efficient way to clear the tableau because each promotion enables the next without
          requiring any tableau rearrangement. Identifying potential cascades and engineering the board
          state to trigger them is the hallmark of expert play.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before each move, look at the card beneath the one you plan to move. Is it useful? Can it be
          promoted or does it enable a promotion elsewhere? If moving a card exposes something useless
          (or worse, something that blocks another suit), consider whether a different move might expose
          a more useful card instead.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Look for natural cascades.</strong> Scan columns for
            descending same-suit cards stacked in promotable order. A column with 5♠-4♠-3♠ is a three-card
            cascade waiting to happen once the Spades foundation reaches 2.
          </li>
          <li>
            <strong className="text-white/90">Create artificial cascades with tableau moves.</strong> If the
            6 of Hearts is on column A and the 7 of Hearts is on column B (with the foundation at 5),
            moving the 6 on top of the 7 creates a 7-6 cascade for later. But only do this if it does not
            bury something important on column B.
          </li>
          <li>
            <strong className="text-white/90">Count the &quot;distance&quot; of each suit.</strong> For
            each suit, how many moves separate the current foundation rank from the next promotable card?
            A suit with distance 1 (next card is accessible) is easy to advance. A suit with distance 4
            (next card is buried under 3 others) needs planning.
          </li>
          <li>
            <strong className="text-white/90">Prioritize moves that reduce total distance.</strong> The
            best moves are those that bring the hardest-to-reach cards closer to accessibility. Moving a
            card that sits on top of a needed Ace or Two is almost always correct, even if it creates a
            slightly deeper column elsewhere.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Making moves that look productive but do not advance any
            foundation. Moving a 9 onto a 10 &quot;because it&apos;s legal&quot; might feel like progress
            but accomplishes nothing if neither card is close to being promoted. Every move should either
            directly promote a card or expose a card that will be promoted soon.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Common Mistakes */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Common Mistakes and How to Avoid Them
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Baker&apos;s Dozen is one of the more forgiving solitaire variants, but several recurring
          mistakes consistently lower win rates even among experienced players. Identifying and correcting
          these habits can boost your success rate from average to expert.
        </p>

        <div className="space-y-4 mb-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-white/90 font-bold mb-2">Mistake #1: Building Deep Tableau Sequences</h3>
            <p className="text-white/70 leading-relaxed">
              The no-suit building rule makes it tempting to stack long descending sequences: Q-J-10-9-8-7
              across different suits. This looks organized but traps cards you need for other foundations.
              A 10 of Clubs buried under a Jack of Hearts and Queen of Spades requires moving both off-suit
              cards before the 10 is accessible — and those displaced cards need valid destinations too.
              Keep sequences to 2-3 cards maximum unless they are headed to the foundation immediately.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-white/90 font-bold mb-2">Mistake #2: Neglecting Foundation Balance</h3>
            <p className="text-white/70 leading-relaxed">
              Racing one suit to Queen while neglecting others creates a board where 75% of the cards
              belong to lagging suits with nowhere to go. The tableau fills up with blocked cards, and
              the game stalls. Even if the leading suit completes, the remaining three suits may be
              hopelessly tangled. Build all four suits in parallel, advancing whichever has the most
              accessible next card.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-white/90 font-bold mb-2">Mistake #3: Trying to Create Empty Columns</h3>
            <p className="text-white/70 leading-relaxed">
              Players coming from{" "}
              <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
                FreeCell
              </Link>{" "}
              or{" "}
              <Link href="/beleaguered-castle" className="text-[var(--gold)] hover:text-white transition-colors">
                Beleaguered Castle
              </Link>{" "}
              instinctively try to empty columns for temporary storage. In Baker&apos;s Dozen, empty
              columns cannot receive any cards — they are useless dead space. The effort spent clearing
              a column is completely wasted. Focus instead on keeping all 13 columns active and shallow.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-white/90 font-bold mb-2">Mistake #4: Ignoring Card Exposure</h3>
            <p className="text-white/70 leading-relaxed">
              Every move in Baker&apos;s Dozen either exposes a new top card or buries one. Players who
              focus only on where the moved card is going — and not on what it reveals — miss half the
              strategic picture. Before every move, check: what card sits beneath the one I&apos;m about
              to move? Is it useful? If it&apos;s not useful, is there a different move that exposes
              something better?
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Baker's Dozen vs Similar Variants */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Baker&apos;s Dozen vs Similar Variants: Strategic Differences
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Baker&apos;s Dozen occupies a unique spot in the solitaire landscape: highly winnable, fully
          open information, no free cells, no empty column play. Understanding how it compares to
          similar variants helps you calibrate your strategy and avoid importing habits that do not
          apply.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Feature</span>
            <span>Baker&apos;s Dozen</span>
            <span>Other Variants</span>
          </div>
          {[
            ["Columns", "13", "8 (FreeCell, Beleaguered Castle)"],
            ["Free cells", "None", "4 (FreeCell), 0 (Beleaguered Castle)"],
            ["Empty column play", "Not allowed", "Any card (FreeCell), any card (Beleaguered Castle)"],
            ["Tableau building", "Any suit, rank only", "Alternating color (FreeCell), any suit (Beleaguered Castle)"],
            ["King handling", "Auto-placed at column bottom", "Must be managed manually"],
            ["Win rate (skilled)", "75-80%", "99.99% (FreeCell), 30-40% (Beleaguered Castle)"],
            ["Primary challenge", "Foundation sequencing", "Card maneuvering (FreeCell), Ace liberation (Beleaguered Castle)"],
          ].map(([feature, bd, others], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{feature}</span>
              <span>{bd}</span>
              <span>{others}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed mb-4">
          Compared to{" "}
          <Link href="/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , Baker&apos;s Dozen trades maneuvering complexity for sequencing depth. FreeCell asks
          &quot;how do I move these cards around with limited temporary storage?&quot; Baker&apos;s Dozen
          asks &quot;in what order should I build foundations to avoid gridlock?&quot; The skills are
          different: FreeCell rewards spatial reasoning and move-sequence planning; Baker&apos;s Dozen
          rewards pattern recognition and priority assessment.
        </p>
        <p className="text-white/70 leading-relaxed">
          Compared to{" "}
          <Link href="/beleaguered-castle/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Beleaguered Castle
          </Link>
          , Baker&apos;s Dozen is significantly more forgiving. The 13 columns (vs 8), automatic King
          placement, and higher percentage of solvable deals mean that Baker&apos;s Dozen tolerates
          imperfect play much better. If Beleaguered Castle is a tightrope walk, Baker&apos;s Dozen
          is a wide bridge — both require attention, but the margin for error is generous.
        </p>
      </section>

      {/* Quick Reference Cheat Sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Strategy Cheat Sheet
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Promote Aces and Twos immediately.</strong> They have no tableau value. Get them
              to foundations without hesitation.
            </li>
            <li>
              <strong>Build foundations evenly.</strong> Keep all four suits within 2 ranks of each
              other. Balance prevents gridlock.
            </li>
            <li>
              <strong>Keep columns shallow.</strong> Never stack more than 3 non-King cards voluntarily.
              Use all 13 columns to spread the load.
            </li>
            <li>
              <strong>Do not try to empty columns.</strong> Empty columns cannot receive cards in
              Baker&apos;s Dozen. Clearing a column wastes effort.
            </li>
            <li>
              <strong>Check what each move exposes.</strong> The card beneath the one you move is half
              the strategic value of the move itself.
            </li>
            <li>
              <strong>Look for cascade chains.</strong> Sequences of same-suit cards in promotable
              order are your best friends. Protect and create them.
            </li>
            <li>
              <strong>Ignore the Kings.</strong> They handle themselves. Focus all mental energy on
              sequencing Aces through Queens.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/bakers-dozen/how-to-play" title="How to Play Baker's Dozen" description="Complete rules, setup, and valid moves for Baker's Dozen." />
            <ContentLinkCard href="/bakers-dozen/tips" title="Baker's Dozen Tips" description="Quick, practical tips for improving your game." />
            <ContentLinkCard href="/bakers-dozen" title="Play Baker's Dozen" description="Put these strategies into practice — play free online." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Baker's Dozen knowledge to the test. Play free online with unlimited undo and instant new deals."
          primaryLabel="Play Baker's Dozen"
          primaryHref="/bakers-dozen"
          secondaryLabel="Learn the Rules"
          secondaryHref="/bakers-dozen/how-to-play"
        />
      </div>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* FAQ Section */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="px-5 py-4 cursor-pointer text-white/90 font-semibold hover:text-[var(--gold)] transition-colors list-none flex items-center justify-between">
                {faq.question}
                <span className="text-white/30 group-open:rotate-180 transition-transform ml-2">
                  ▾
                </span>
              </summary>
              <div className="px-5 pb-4 text-white/60 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* More resources */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More Baker&apos;s Dozen Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/bakers-dozen" title="Play Baker's Dozen" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/bakers-dozen/how-to-play" title="How to Play" description="Complete rules, setup, and move guide" />
          <ContentLinkCard href="/bakers-dozen/tips" title="Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/beleaguered-castle/strategy" title="Beleaguered Castle Strategy" description="Strategy for a much harder no-free-cell variant" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
