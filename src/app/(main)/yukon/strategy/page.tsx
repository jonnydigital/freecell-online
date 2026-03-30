import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Yukon Solitaire Strategy Guide | Advanced Winning Techniques",
  description:
    "Master Yukon Solitaire with advanced strategies for face-down card liberation, King placement optimization, column clearing sequences, and multi-move planning. Win more games with proven methods.",
  keywords: [
    "yukon solitaire strategy",
    "yukon solitaire winning strategy",
    "yukon solitaire advanced techniques",
    "how to win yukon solitaire",
    "yukon solitaire strategy guide",
    "yukon column clearing strategy",
    "yukon king placement",
    "yukon solitaire face down cards",
    "yukon solitaire expert guide",
    "yukon vs klondike strategy",
    "yukon solitaire planning",
  ],
  alternates: {
    canonical: absoluteUrl("/yukon/strategy"),
  },
  openGraph: {
    title: "Yukon Solitaire Strategy Guide | Advanced Winning Techniques",
    description:
      "Advanced strategies for Yukon Solitaire: face-down card liberation, King placement, column clearing, multi-move planning, and foundation timing.",
    url: absoluteUrl("/yukon/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most effective strategy for Yukon Solitaire?",
    answer:
      "The most effective strategy centers on information advantage. Since Yukon has no stock pile, every card is either visible or face-down in the tableau. Prioritize uncovering face-down cards above all else, use the group-move rule to excavate deep into columns, and plan 3-4 move sequences before touching any card. King placement into empty columns should always serve the broader goal of revealing hidden cards, not just tidying the board.",
  },
  {
    question: "How does Yukon strategy differ from Klondike strategy?",
    answer:
      "Yukon strategy is fundamentally different because there is no stock pile and you can move any face-up card with all cards above it, regardless of sequence. In Klondike, you wait for the stock to deliver cards; in Yukon, every card is already on the board and your job is to uncover and reorganize. The group-move rule means your tactical options per turn are vastly greater than Klondike, but every move is irreversible — there are no second passes through a stock pile.",
  },
  {
    question: "Should I create empty columns aggressively in Yukon?",
    answer:
      "Empty columns are valuable but only if you have a King ready to fill them — only Kings can go in empty spaces. Creating an empty column without a King wastes the effort, and an empty column with no King to fill it actually reduces your working tableau. The ideal scenario is to clear a column and immediately fill it with a King that was sitting on top of face-down cards, achieving both column reorganization and card revelation in one sequence.",
  },
  {
    question: "When should I move cards to the foundations in Yukon?",
    answer:
      "Move Aces and Twos to foundations immediately — they serve no tableau purpose. For all other cards, only move them to foundations when doing so uncovers a face-down card or when all four cards of the ranks below are already on foundations (meaning the card can never be needed for tableau building). Premature foundation moves remove cards from the tableau that might be needed as intermediate landing spots for group moves.",
  },
  {
    question: "What win rate should I expect with optimal Yukon strategy?",
    answer:
      "Expert Yukon players achieve a 30-35% win rate. This is lower than FreeCell (82%) or Klondike draw-1 (40-45%) because Yukon has no stock pile and many deals are mathematically unsolvable regardless of play quality. If you are consistently above 25%, you are playing at an advanced level. The key is not winning every game but recognizing winnable deals quickly and playing those optimally.",
  },
];

export default function YukonStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Yukon Solitaire", item: absoluteUrl("/yukon") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/yukon/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Yukon Solitaire Strategy Guide",
        description: "Advanced strategies for Yukon Solitaire covering face-down card liberation, King placement, column clearing, and multi-move planning.",
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
        title="Yukon Solitaire Strategy Guide"
        kicker={<><Link href="/yukon" className="hover:text-white transition-colors">Yukon Solitaire</Link> / Strategy</>}
        subtitle="Advanced strategies for the no-stock solitaire variant — from face-down card liberation to King placement optimization and multi-move sequence planning."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Yukon Solitaire", href: "/yukon" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Yukon Solitaire strategy rests on three pillars: <strong className="text-white">liberate face-down cards at every opportunity</strong>,{" "}
          <strong className="text-white">place Kings purposefully to maximize column utility</strong>, and{" "}
          <strong className="text-white">plan multi-move sequences before touching any card</strong>.
          With no stock pile to deliver new cards, the tableau is your entire universe. Every face-down
          card is a locked resource, every King placement reshapes the board, and every unplanned move
          is a potential dead end.
        </p>
      </div>

      {/* Section 1: Information Advantage */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          The Information Advantage: Why Face-Down Cards Are Everything
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          <Link href="/yukon" className="text-[var(--gold)] hover:text-white transition-colors">
            Yukon Solitaire
          </Link>{" "}
          deals all 52 cards to the tableau at the start — no stock pile, no waste pile, no reserves.
          But 21 of those cards start face-down, hidden across the first six columns. These hidden
          cards represent the information gap between you and a solution. Closing that gap is the
          single most important strategic objective in Yukon.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Every face-down card you reveal transforms your decision tree. A revealed Ace means a
          foundation starter. A revealed King means a column-filler. A revealed mid-range card might
          bridge two partial sequences you could not connect before. The value of revealing a hidden
          card is not just the card itself — it is the <em>possibilities</em> that card creates
          across the entire board. This is why face-down card liberation must take priority over
          every other consideration, including building clean sequences or moving cards to foundations.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Count face-down cards at the start.</strong> Seven columns
            have 0, 1, 1, 2, 2, 3, and 3 face-down cards respectively (21 total). Track this count
            as cards are revealed.
          </li>
          <li>
            <strong className="text-white/90">Target columns with the most hidden cards.</strong> Columns
            with three face-down cards are the highest priority because they conceal the most information
            and are hardest to excavate.
          </li>
          <li>
            <strong className="text-white/90">Accept tactical retreat for strategic gain.</strong> Moving
            a useful face-up card away from a clean sequence is worth it if the move reveals a hidden card.
            Sequences can be rebuilt; information cannot be un-hidden.
          </li>
          <li>
            <strong className="text-white/90">Track what you still need.</strong> As cards are revealed,
            note which ranks and suits remain hidden. If you need a red 9 and both are still face-down,
            you know where to focus your excavation efforts.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Unlike{" "}
            <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
              Klondike
            </Link>
            {" "}where the stock pile delivers a steady stream of new cards, Yukon gives you everything
            upfront but hides nearly half of it. The game is not about waiting for the right card to
            appear — it is about uncovering the cards that are already there.
          </p>
        </div>
      </section>

      {/* Section 2: The Group-Move Calculus */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          The Group-Move Calculus: When to Move Unsorted Piles
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Yukon&apos;s signature rule — move any face-up card along with everything stacked on top,
          regardless of sequence — is both the game&apos;s greatest freedom and its most dangerous trap.
          New players either underuse this rule (playing too conservatively, as if it were{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          ) or overuse it (shuffling cards aimlessly, creating chaos without progress). Advanced play
          requires a disciplined calculus for when group moves are worthwhile.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Every group move should pass at least one of three tests. First, does it reveal a face-down
          card? This is the strongest justification for any move. Second, does it consolidate cards
          in a way that creates future opportunities — placing a card where it extends a same-color
          descending sequence, or positioning a King for an empty column move? Third, does it clear
          a path for a specific multi-move sequence you have already planned?
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Moves that reveal face-down cards</strong> are almost
            always correct. The disorder you create on the destination column is a temporary problem;
            the information you gain is permanent.
          </li>
          <li>
            <strong className="text-white/90">Moves that consolidate without revealing</strong> are
            situational. They are worth making only if they clearly set up a future revealing move
            within 2-3 turns.
          </li>
          <li>
            <strong className="text-white/90">Moves that just rearrange</strong> without revealing
            or consolidating are usually wasteful. They burn options and can create tangles that are
            difficult to undo without empty columns.
          </li>
          <li>
            <strong className="text-white/90">Large group moves deserve extra scrutiny.</strong> Moving
            8 cards onto another column creates a massive pile. Ask: is the revealed card worth
            this investment? Is there a smaller move that achieves the same goal?
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Advanced technique:</strong> When a face-up card deep in a column matches a
            destination on another column, trace the entire chain before moving. How many cards
            will pile onto the destination? Will that pile block any critical cards at the bottom
            of the destination column? Sometimes the shortest move is not the most buried card —
            a shallower move achieves 80% of the benefit with half the disruption.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: King Placement Strategy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          King Placement Strategy: The Column-Shaping Decision
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Yukon, only Kings can fill empty tableau columns. This makes every King placement a
          high-stakes decision that shapes the board for the rest of the game. A well-placed King
          anchors a productive column where sequences can build and cards can flow. A poorly placed
          King wastes an empty column and may block access to face-down cards for dozens of moves.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The ideal King placement meets multiple criteria simultaneously. The King itself should be
          moving away from face-down cards (revealing hidden information). The column it enters should
          be one where the King&apos;s color enables useful builds — a red King anchors black-Queen,
          red-Jack, black-10 sequences, while a black King anchors the reverse. And the resulting
          board state should leave you with at least one other accessible column for maneuvering.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Kings sitting on face-down cards</strong> are the highest
            priority for relocation. Moving them reveals hidden cards and the King gets a productive home.
          </li>
          <li>
            <strong className="text-white/90">Kings with long tails of cards</strong> bring those cards
            along. This can be advantageous (consolidating many cards into one column) or dangerous
            (creating an enormous pile that buries cards at the bottom).
          </li>
          <li>
            <strong className="text-white/90">Color matters for King placement.</strong> Consider which
            Queens are available. If you have a black Queen exposed, placing a red King in the empty
            column gives it an immediate building partner.
          </li>
          <li>
            <strong className="text-white/90">Do not rush to fill empty columns.</strong> An empty
            column with no King available is not wasted — it is waiting. Filling it with the wrong
            King is worse than leaving it open temporarily.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> In{" "}
            <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
              FreeCell
            </Link>
            , empty columns are flexible holding spaces for any card. In Yukon, they are King-only
            slots. This means each empty column is simultaneously more valuable (it permanently
            reorganizes the board) and more constrained (you need a specific card to use it).
            Treat empty columns as strategic investments, not temporary storage.
          </p>
        </div>
      </section>

      {/* Section 4: Column Clearing Sequences */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Column Clearing Sequences: Engineering Empty Spaces
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Creating empty columns is one of the most powerful actions in Yukon, but it rarely happens
          in a single move. Most column clears require a precise sequence of 3-5 moves that
          systematically relocate every card in a column to valid destinations across the tableau.
          Planning these sequences before executing the first move is what separates intermediate
          play from expert play.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Start by identifying the column you want to clear. Ideally, it has few cards and those
          cards have obvious destinations elsewhere. Then trace the moves in reverse: the last card
          to leave the column must have a destination. The second-to-last card must have a destination
          that does not depend on the last card being present. Work backward until you have a
          complete sequence from first move to empty column.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The most common mistake is starting to clear a column without verifying the complete
          sequence. After moving two cards, you discover the third card has nowhere to go — and
          now the two cards you already moved are in suboptimal positions. Always verify the full
          chain before executing the first move.
        </p>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Column State</span>
            <span>Clearing Difficulty</span>
            <span>Recommended Action</span>
          </div>
          {[
            ["1-2 face-up cards, no face-down", "Easy", "Clear immediately if a King is available"],
            ["3-4 mixed cards, no face-down", "Medium", "Plan the full sequence, then execute"],
            ["Cards with face-down underneath", "Hard", "Reveal face-down cards first, then reassess"],
            ["Large unsorted pile", "Very Hard", "Usually not worth clearing — consolidate elsewhere"],
          ].map(([state, difficulty, action], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{state}</span>
              <span className={
                difficulty === "Easy" ? "text-emerald-400" :
                difficulty === "Medium" ? "text-amber-400" :
                difficulty === "Hard" ? "text-orange-400" :
                "text-red-400"
              }>{difficulty}</span>
              <span>{action}</span>
            </div>
          ))}
        </div>

        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Watch out:</strong> Do not clear a column just because you can. If clearing it
            requires dumping cards onto other columns in ways that bury critical cards, the cure is
            worse than the disease. The column clear must produce a net benefit — revealed face-down
            cards, a well-placed King, or a meaningful board simplification.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Foundation Timing */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Foundation Timing: When to Build Up vs. Keep Cards in Play
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Foundation timing in Yukon is more nuanced than in most solitaire variants. In{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , moving cards to foundations is usually safe because the open information lets you verify
          nothing is blocked. In Yukon, with 21 face-down cards obscuring the picture, premature
          foundation moves can strand you by removing intermediate cards needed for group moves.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The foundation timing question comes down to utility. A card on the foundation is gone
          permanently — it cannot be used as a landing spot for group moves, it cannot help build
          tableau sequences, and it cannot serve as an intermediate step in a column-clearing
          sequence. A card on the tableau might do all of those things. The question is: does this
          specific card have remaining tableau utility, or has it served its purpose?
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Aces and Twos</strong> always go to foundations immediately.
            They cannot anchor any useful tableau sequence and have zero group-move utility.
          </li>
          <li>
            <strong className="text-white/90">Threes through Sixes</strong> should go to foundations only
            when the move reveals a face-down card or when their alternating-color partner of the same
            rank is already on a foundation (ensuring no group move needs them).
          </li>
          <li>
            <strong className="text-white/90">Sevens through Tens</strong> are the most dangerous cards
            to send to foundations early. These mid-range cards are frequently needed as group-move
            landing spots. Hold them unless the board is clearly transitioning to endgame.
          </li>
          <li>
            <strong className="text-white/90">In the endgame</strong> (most face-down cards revealed,
            board largely organized), shift to aggressive foundation building. The time for caution
            has passed — now speed matters.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Rule of thumb:</strong> If a face-up card is sitting alone at the bottom of
            a column (no cards beneath it) and is not part of a useful sequence, it is safe to
            send to the foundation. If it is part of a multi-card column or serves as a landing
            spot for potential group moves, leave it in play until the board clarifies.
          </p>
        </div>
      </section>

      {/* Section 6: Yukon vs Klondike Strategic Differences */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Yukon vs Klondike: Why Your Klondike Strategy Will Fail
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Players transitioning from{" "}
          <Link href="/klondike/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          bring habits that actively hurt their Yukon play. The two games share foundations (Ace to
          King in suit) and alternating-color tableau building, but the strategic DNA is completely
          different. Understanding these differences at a deep level is essential for Yukon mastery.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          In Klondike, patience is rewarded. You cycle through the stock, wait for needed cards, and
          build incrementally. In Yukon, aggression is rewarded. Every card is already in the tableau —
          there is nothing to wait for. Passive play leads to stagnation because no new cards will
          appear. The group-move rule compensates for the lack of a stock pile by giving you vastly
          more movement options per turn, but those options must be used aggressively.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Strategic Element</span>
            <span>Klondike</span>
            <span>Yukon</span>
          </div>
          {[
            ["New card source", "Stock pile (24 cards)", "None — must reveal face-down cards"],
            ["Move flexibility", "Only ordered sequences move", "Any face-up card + everything above"],
            ["Information model", "Stock is unknown until drawn", "All cards present but 21 hidden"],
            ["Primary objective", "Cycle stock, build incrementally", "Excavate face-down cards aggressively"],
            ["Empty columns", "Only Kings (same as Yukon)", "Only Kings — but more critical since no stock"],
            ["Optimal pace", "Patient, methodical", "Aggressive, forward-planning"],
          ].map(([element, klondike, yukon], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{element}</span>
              <span>{klondike}</span>
              <span>{yukon}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed">
          The hardest mental shift for Klondike players is accepting disorder. In Klondike, a tidy
          tableau with well-ordered columns is a sign of progress. In Yukon, a messy tableau with
          most face-down cards revealed is far better than a clean tableau with 15 hidden cards.
          Embrace the chaos — it means you are winning.
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
              <strong>Reveal face-down cards above all else.</strong> Every hidden card is a locked
              resource — unlocking them is your primary objective.
            </li>
            <li>
              <strong>Apply the group-move test.</strong> Does the move reveal, consolidate, or enable
              a planned sequence? If none, skip it.
            </li>
            <li>
              <strong>Place Kings with purpose.</strong> Empty columns are for Kings that uncover hidden
              cards or anchor productive sequences, not for tidiness.
            </li>
            <li>
              <strong>Plan column clears completely.</strong> Trace the full sequence of moves in your
              head before executing the first one.
            </li>
            <li>
              <strong>Delay mid-range foundation moves.</strong> Cards ranked 4-10 often have remaining
              tableau utility. Send them up only when the board is clear.
            </li>
            <li>
              <strong>Play aggressively, not passively.</strong> There is no stock pile coming to save
              you. Initiate, excavate, and create opportunities.
            </li>
            <li>
              <strong>Embrace messy boards.</strong> Disorder with revealed cards beats neatness with
              hidden cards every time.
            </li>
            <li>
              <strong>Restart lost causes early.</strong> Many Yukon deals are unsolvable. Recognize
              dead boards and move to fresh deals.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/yukon/how-to-play" title="How to Play Yukon" description="Complete rules, setup, and group-move mechanics explained." />
            <ContentLinkCard href="/yukon/tips" title="Yukon Tips & Tricks" description="Quick, practical tips for improving your Yukon game." />
            <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" description="Strategy guide for the world's most popular solitaire." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Yukon knowledge to the test. Play free online Yukon Solitaire with unlimited undo and instant new deals."
          primaryLabel="Play Yukon Solitaire"
          primaryHref="/yukon"
          secondaryLabel="Learn the Rules"
          secondaryHref="/yukon/how-to-play"
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
          More Yukon Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/yukon" title="Play Yukon Solitaire" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/yukon/how-to-play" title="How to Play Yukon" description="Complete rules and group-move mechanics" />
          <ContentLinkCard href="/yukon/tips" title="Yukon Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" description="Strategy for the world's most popular solitaire" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
