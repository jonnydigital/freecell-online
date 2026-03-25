import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Baker's Dozen Solitaire Tips & Tricks | Master the 13-Column Challenge",
  description:
    "8 expert tips to win Baker's Dozen Solitaire. Master Kings-to-bottom strategy, any-suit building, foundation feeding order, and deadlock prevention to reach the 65-75% win rate.",
  keywords: [
    "bakers dozen solitaire tips",
    "bakers dozen solitaire strategy",
    "bakers dozen solitaire tricks",
    "bakers dozen tips and tricks",
    "how to win bakers dozen solitaire",
    "bakers dozen solitaire help",
    "bakers dozen card game tips",
    "bakers dozen solitaire winning tips",
    "bakers dozen solitaire advice",
    "tips for bakers dozen solitaire",
    "bakers dozen solitaire guide",
  ],
  openGraph: {
    title: "Baker's Dozen Solitaire Tips & Tricks | Master the 13-Column Challenge",
    description:
      "8 expert tips to win Baker's Dozen Solitaire. Master Kings-to-bottom, any-suit building, and foundation order to reach the 65-75% win rate.",
    url: absoluteUrl("/bakers-dozen/tips"),
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
      "The best strategy focuses on three priorities: (1) uncover and play Aces and low cards to the foundations as early as possible, (2) use any-suit building flexibility to rearrange the tableau efficiently, and (3) plan your foundation feeds in order so you don't strand cards you need later. Since empty columns cannot be filled, every column you empty is permanently lost as workspace — so avoid emptying columns unless all remaining cards in that column can go straight to the foundations.",
  },
  {
    question: "What is the win rate for Baker's Dozen Solitaire?",
    answer:
      "Baker's Dozen Solitaire has a win rate of approximately 65-75% with expert play, making it one of the more forgiving solitaire variants. Casual players can expect to win around 40-50% of games. The high win rate comes from the combination of all cards being face-up, any-suit building, and the Kings-to-bottom rule that prevents Kings from blocking critical low cards.",
  },
  {
    question: "Why are Kings moved to the bottom of columns in Baker's Dozen?",
    answer:
      "Kings are moved to the bottom of their columns during the deal as a signature rule of Baker's Dozen. This prevents Kings from sitting on top of columns and blocking access to the cards beneath them. Since nothing can be built on top of a King in the tableau (Kings are the highest rank), a King on top would create an immovable obstacle. Placing them at the bottom ensures every column's top card is always playable.",
  },
  {
    question: "Can you move sequences of cards in Baker's Dozen Solitaire?",
    answer:
      "No. Baker's Dozen only allows single card moves — you cannot move a sequence or stack of cards together. Each move involves taking the top card from one column and placing it either on a foundation (building up by suit from Ace to King) or on another column's top card (building down by any suit). This single-card restriction makes planning ahead critical, since you can't rearrange entire sequences at once.",
  },
  {
    question: "What happens when a column is emptied in Baker's Dozen?",
    answer:
      "When a column is emptied in Baker's Dozen Solitaire, it stays empty permanently. Unlike FreeCell or many other solitaire variants, empty columns cannot be filled with any card. This means emptying a column reduces your available workspace. You should only empty a column when every card in it can be played directly to the foundations, never just to create temporary space.",
  },
];

export default function BakersDozenTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Baker's Dozen Solitaire", item: absoluteUrl("/bakers-dozen") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/bakers-dozen/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Baker's Dozen Solitaire Tips & Tricks",
        description: "8 expert tips for winning more Baker's Dozen Solitaire games — the 13-column patience game with Kings-to-bottom and any-suit building.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-25",
        dateModified: "2026-03-25",
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
        title="Baker&apos;s Dozen Solitaire Tips & Tricks"
        kicker={<><Link href="/bakers-dozen" className="hover:text-white transition-colors">Baker&apos;s Dozen Solitaire</Link> / Tips</>}
        subtitle="Master the 13-column challenge with 8 practical tips. From understanding Kings-to-bottom to exploiting any-suit building, these strategies will help you reach the 65-75% expert win rate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Baker's Dozen Solitaire", href: "/bakers-dozen" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">uncover Aces and low cards before anything else</strong>.
          Baker&apos;s Dozen deals all 52 cards face-up across 13 columns with Kings tucked to the bottom.
          Your job is to feed cards to the four foundations in order (Ace through King, by suit). The
          any-suit building rule gives you enormous flexibility on the tableau — use it to dig out
          the low cards that fuel your foundation progress.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Understand the Kings-to-Bottom Rule
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/bakers-dozen" className="text-[var(--gold)] hover:text-white transition-colors">
            Baker&apos;s Dozen Solitaire
          </Link>
          , Kings are automatically moved to the bottom of their columns during the deal. This
          is the game&apos;s signature mechanic and it fundamentally shapes how you approach
          every hand. Understanding why it exists — and how to exploit it — is the foundation
          of strong play.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Why Kings go to the bottom.</strong> In most solitaire
          games, a King sitting on top of a column is a dead weight — nothing can be built on top
          of it in the tableau, so it blocks everything beneath it. By moving Kings to the bottom,
          Baker&apos;s Dozen ensures that every column&apos;s top card is always a playable card,
          not a roadblock.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">How to exploit it.</strong> Since Kings are at the
          bottom, you know that every column has at most 3 non-King cards above the King (in a
          4-card column). This means you never need to dig deep to reach useful cards. Your
          planning horizon is short — focus on the top 2-3 cards of each column and you&apos;ll
          have a clear picture of what&apos;s available.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Kings will be the last cards played to the foundations
            (they&apos;re rank 13 and foundations build A through K). Don&apos;t worry about
            them until the endgame. Focus entirely on the cards above them — the Aces through
            Queens that actually drive your foundation progress.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Prioritize Uncovering Aces and Low Cards
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Foundations build up by suit starting from Ace, so every foundation is stalled until
          its Ace is played. At the start of every game, your first priority should be locating
          all four Aces and planning how to free them. An Ace buried under even one or two
          cards needs immediate attention.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          After the Aces, focus on Twos, Threes, and Fours. These low cards are the pipeline
          that feeds your foundations. A played Ace with a buried Two is wasted progress — the
          foundation stalls at Ace until the Two surfaces. The faster you can chain Ace-Two-Three
          onto a foundation, the more momentum you build.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Scan for all four Aces before your first move.</strong> Know
            exactly where they are and how many cards cover each one.
          </li>
          <li>
            <strong className="text-white/90">Prioritize the most buried Ace.</strong> An Ace
            on top of a column plays itself; an Ace under three cards needs a plan.
          </li>
          <li>
            <strong className="text-white/90">Chain low cards.</strong> If moving a card to
            uncover an Ace also reveals a Two of another suit, that&apos;s a double win.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Because all cards are face-up, you have perfect
            information. Use it. Before your first move, map the locations of every Ace, Two,
            Three, and Four. This 10-second scan sets up your entire game plan.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Never Empty a Column Without Purpose
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          This is one of the most critical rules in Baker&apos;s Dozen: <strong className="text-white/90">empty
          columns cannot be filled</strong>. Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          where empty columns serve as valuable temporary storage, in Baker&apos;s Dozen an
          empty column is dead space — permanently unusable for the rest of the game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This means you should only empty a column when every card in it (including the King
          at the bottom) can be played directly to the foundations. If you empty a column with
          a stranded King that has no foundation home yet, you&apos;ve lost a workspace for
          nothing — that King is stuck with nowhere to go.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          In practice, columns typically empty naturally in the endgame as you feed cards to
          the foundations. If you find yourself emptying columns in the early or mid-game,
          pause and reconsider — you may be making a strategic error that will cost you later.
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Warning:</strong> Every empty column reduces your tableau from 13 active
            columns to 12, then 11, and so on. Fewer columns means fewer places to build
            and fewer options for rearranging cards. Only empty a column when you&apos;re
            certain every card in it is heading straight to a foundation.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Use Any-Suit Building to Your Advantage
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Baker&apos;s Dozen uses any-suit building on the tableau — you can place any card
          on any card of the next higher rank, regardless of suit or color. A 7 of Hearts can
          go on an 8 of Hearts, 8 of Spades, 8 of Diamonds, or 8 of Clubs. This gives you
          four times the building options compared to same-suit games and double the options
          of alternating-color games.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This flexibility is your most powerful tool for rearranging the tableau. When you
          need to move a card off the top of one column, you have up to four potential
          destination columns (any column topped by a card one rank higher). Use this freedom
          to move cards strategically — not just to the first available spot, but to the
          column where they&apos;ll do the most good.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Choose your destination wisely.</strong> If a 5
            can go on any of three different 6s, pick the column where placing it exposes
            the most useful card or sets up a future foundation feed.
          </li>
          <li>
            <strong className="text-white/90">Consolidate strategically.</strong> Use any-suit
            building to stack cards onto columns you plan to feed to the foundations in order,
            keeping other columns clear for different sequences.
          </li>
          <li>
            <strong className="text-white/90">Don&apos;t waste the flexibility.</strong> Just
            because you can place a card somewhere doesn&apos;t mean you should. Every move
            should serve your foundation-building plan.
          </li>
        </ul>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Plan Your Foundation Feeds in Order
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Foundations in Baker&apos;s Dozen build strictly in order: Ace, Two, Three, Four, all
          the way up to King, each by suit. You cannot skip a rank. This means the order in
          which you feed cards matters enormously — sending the wrong card to the tableau when
          the foundation needs it next can stall your progress.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The best approach is to keep all four foundations advancing at roughly the same pace.
          If Hearts is at 6 while Spades is still at Ace, you have an imbalance. Low Spades
          cards are clogging the tableau while high Hearts cards you&apos;ve already played
          are no longer available as building spots. Balanced foundations mean a cleaner tableau.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before playing a card to the foundation, ask: &ldquo;Do I need this card as a
          building target on the tableau?&rdquo; A 10 on the tableau can accept any 9. Once
          it goes to the foundation, that landing pad vanishes. In the mid-game, keeping
          some higher cards on the tableau as building targets can be more valuable than
          rushing them to the foundations.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> In the early game, send everything you can to the
            foundations — Aces, Twos, Threes, and Fours rarely serve as useful building
            targets. In the mid-game, be more selective about cards ranked 7 and above.
            In the endgame, rush everything home.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Build Longer Columns Strategically
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Since you can only move single cards (no sequences), the order of cards within a
          column matters immensely. A column with cards in perfect descending order (like
          Q-J-10-9-8) is a thing of beauty — you can feed those cards to the foundation one
          at a time when their suit&apos;s turn comes, or use them as a reliable chain of
          building targets.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When you have a choice about where to place a card, prefer building onto columns
          that are already in descending order. Adding a 7 to a column topped by an 8 that
          sits above a 9 creates a neat descending run. Adding that same 7 to a column
          topped by an 8 above a 3 creates disorder that will be harder to untangle later.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Favor ordered columns.</strong> Place cards where
            they extend existing descending sequences.
          </li>
          <li>
            <strong className="text-white/90">Avoid burying useful cards.</strong> Placing a
            high card on top of a low card you&apos;ll need soon creates a bottleneck.
          </li>
          <li>
            <strong className="text-white/90">Think about extraction order.</strong> Cards can
            only leave a column from the top, so the card you need soonest should be closest
            to the top.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Because only single cards move in Baker&apos;s Dozen,
            you can&apos;t rearrange a messy column after the fact. Every card placement is
            essentially permanent until that card is played to the foundation. Build your
            columns with intention from the start.
          </p>
        </div>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Watch for Deadlock Patterns Early
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Deadlock in Baker&apos;s Dozen occurs when cards are arranged in a circular dependency
          — each card you need is buried under another card you also need. Because you can&apos;t
          fill empty columns and can only move single cards, deadlocks are often fatal and
          impossible to escape once they form.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The most common deadlock pattern involves two columns where each one&apos;s top card
          needs to go to the foundation, but the next foundation card for each suit is trapped
          in the other column. For example: Column A has 6 of Hearts on top (but foundation
          needs 5 of Hearts, which is in Column B), and Column B has 8 of Spades on top (but
          foundation needs 7 of Spades, which is in Column A).
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          To avoid deadlocks, always ask before making a move: &ldquo;Am I creating a situation
          where two or more columns depend on each other?&rdquo; If moving a card onto Column A
          means Column A now needs Column B to unblock first, and Column B needs Column A — stop.
          Find another path.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Check for circular dependencies.</strong> Before
            placing a card, verify it won&apos;t create a mutual blockage between columns.
          </li>
          <li>
            <strong className="text-white/90">Keep foundation feeds independent.</strong> Ideally,
            each column should be able to feed its cards to the foundations without depending on
            another column to unblock first.
          </li>
          <li>
            <strong className="text-white/90">Use the undo button.</strong> If you spot a deadlock
            forming, undo immediately and try an alternative sequence of moves.
          </li>
        </ul>
      </section>

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Use the High Win Rate to Experiment
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Baker&apos;s Dozen has one of the highest win rates of any{" "}
          <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
            solitaire variant
          </Link>{" "}
          — roughly 65-75% with skilled play. Compare that to{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (~82%),{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          (~80% with draw-1), or{" "}
          <Link href="/forty-thieves" className="text-[var(--gold)] hover:text-white transition-colors">
            Forty Thieves
          </Link>{" "}
          (~10%), and you can see that Baker&apos;s Dozen sits in a comfortable sweet spot —
          challenging enough to be interesting, forgiving enough to be fun.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This high win rate means you can afford to experiment. Try different opening strategies
          — sometimes prioritize one suit&apos;s foundation over balanced building, or try
          aggressively consolidating cards into fewer columns. Because most deals are winnable,
          you have room to learn from mistakes without constant frustration.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Use each game as a laboratory. Try a new approach, see how it plays out, and refine
          your strategy over time. The generous win rate provides enough positive reinforcement
          to keep you motivated while you develop deeper pattern recognition and planning skills.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> If you&apos;re winning less than 50% of your Baker&apos;s
            Dozen games, revisit tips #2 and #3 above. The most common mistakes are ignoring
            buried Aces and carelessly emptying columns. Fixing those two habits alone can
            boost your win rate by 20% or more.
          </p>
        </div>
      </section>

      {/* Strategy and Patience */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Strategy and Patience
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Baker&apos;s Dozen rewards a balanced combination of strategic thinking and patience.
          The strategic element comes from choosing where to place cards, which foundations to
          prioritize, and how to avoid deadlocks. The patience element comes from resisting the
          urge to make the first available move and instead scanning all 13 columns for the
          optimal play.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Because all 52 cards are dealt face-up, Baker&apos;s Dozen is a game of perfect
          information — there are no hidden cards, no luck of the draw, no surprises. Every win
          and every loss is a direct result of your decisions. This makes it an excellent game
          for developing analytical thinking skills that transfer to other{" "}
          <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
            solitaire variants
          </Link>
          .
        </p>
        <p className="text-white/70 leading-relaxed">
          The skills you build in Baker&apos;s Dozen — reading the full tableau, planning
          foundation feeds, and avoiding deadlocks — will make you better at{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          ,{" "}
          <Link href="/beleaguered-castle" className="text-[var(--gold)] hover:text-white transition-colors">
            Beleaguered Castle
          </Link>
          , and any other patience game that rewards careful analysis over quick reflexes.
        </p>
      </section>

      {/* Quick reference cheat sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Tips Cheat Sheet
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Understand Kings-to-bottom.</strong> Kings are at the base of every
              column — ignore them until the endgame and focus on the cards above.
            </li>
            <li>
              <strong>Uncover Aces and low cards first.</strong> Map all Aces, Twos, Threes,
              and Fours before your first move.
            </li>
            <li>
              <strong>Never empty a column carelessly.</strong> Empty columns are dead space
              — only empty them when every card goes straight to a foundation.
            </li>
            <li>
              <strong>Exploit any-suit building.</strong> Four possible targets for every
              card — choose the placement that serves your plan best.
            </li>
            <li>
              <strong>Feed foundations in balanced order.</strong> Keep all four suits within
              2-3 ranks of each other.
            </li>
            <li>
              <strong>Build ordered columns.</strong> Place cards to extend descending
              sequences, not create disorder.
            </li>
            <li>
              <strong>Watch for deadlocks.</strong> Avoid circular dependencies between
              columns — check before every move.
            </li>
            <li>
              <strong>Experiment freely.</strong> The 65-75% win rate gives you room to try
              new strategies without constant frustration.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/bakers-dozen/how-to-play" title="How to Play Baker's Dozen" description="Complete rules, setup, and gameplay mechanics explained step by step." />
            <ContentLinkCard href="/bakers-dozen" title="Play Baker's Dozen" description="Put these tips into practice with free online Baker's Dozen." />
            <ContentLinkCard href="/beleaguered-castle/tips" title="Beleaguered Castle Tips" description="Tips for another challenging no-free-cell solitaire variant." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve at Baker's Dozen is to play. Apply these tips one at a time — start with low-card prioritization and deadlock avoidance, then layer in the rest."
          primaryLabel="Play Baker's Dozen"
          primaryHref="/bakers-dozen"
          secondaryLabel="Learn the Rules"
          secondaryHref="/bakers-dozen/how-to-play"
        />
      </div>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* FAQ */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6"
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
          <ContentLinkCard href="/bakers-dozen" title="Play Baker's Dozen" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/bakers-dozen/how-to-play" title="How to Play Baker's Dozen" description="Complete rules, setup, and strategy guide" />
          <ContentLinkCard href="/beleaguered-castle/tips" title="Beleaguered Castle Tips" description="Tips for another no-free-cell solitaire variant" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
