import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Bristol Solitaire Strategy Guide | Winning Techniques & Expert Tips",
  description:
    "Master Bristol Solitaire — stock pile management, tableau optimization, King placement, reserve fan sequencing, and foundation building order.",
  keywords: [
    "bristol solitaire strategy",
    "bristol solitaire winning strategy",
    "bristol solitaire advanced techniques",
    "how to win bristol solitaire",
    "bristol solitaire strategy guide",
    "bristol stock pile management",
    "bristol solitaire reserve fans",
    "bristol solitaire foundation order",
    "bristol solitaire expert tips",
    "bristol vs spider solitaire",
    "bristol solitaire win rate",
  ],
  alternates: {
    canonical: absoluteUrl("/bristol/strategy"),
  },
  openGraph: {
    title: "Bristol Solitaire Strategy Guide | Winning Techniques & Expert Tips",
    description:
      "Advanced strategies for Bristol Solitaire: stock management, tableau optimization, reserve fan sequencing, foundation building order, and King placement techniques.",
    url: absoluteUrl("/bristol/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Bristol Solitaire?",
    answer:
      "The best strategy centers on three principles: keep the reserve fans as shallow as possible by playing from them first whenever valid, prioritize exposing buried tableau cards over building foundations prematurely, and manage Kings carefully since they can only be placed in empty columns or on Aces in the unusual Bristol rules. Always scan all three reserve fans before making a tableau move — a playable reserve card frees future options without costing you anything.",
  },
  {
    question: "How does Bristol Solitaire differ from other solitaire games strategically?",
    answer:
      "Bristol is unique because it uses three reserve fans (waste piles) instead of a single waste pile, and tableau building is done regardless of suit — any card can go on any card one rank higher. This no-suit-restriction rule makes the tableau extremely flexible but creates a false sense of ease. The real challenge is that reserve fans stack up quickly during stock deals, and buried reserve cards become permanently inaccessible unless the cards above them are played first. Strategy revolves around managing this fan depth.",
  },
  {
    question: "What win rate should I expect in Bristol Solitaire?",
    answer:
      "Skilled Bristol players typically achieve a 15-25% win rate. Bristol is considered a moderately difficult solitaire variant — harder than Klondike (around 30-35% for skilled players) but easier than Forty Thieves (10-15%). The low win rate stems from the stock dealing mechanism: three cards dealt simultaneously to three fans can bury critical cards in ways that no amount of skill can overcome. Roughly 60-70% of deals have some path to victory with perfect play, but finding that path requires exceptional planning.",
  },
  {
    question: "Should I build foundations early or late in Bristol Solitaire?",
    answer:
      "Build foundations incrementally rather than aggressively. Moving a card to a foundation is irreversible, and that card might have been useful as a tableau placeholder. The exception is Aces and Twos — always move these to foundations immediately since they have no value as tableau cards. For higher ranks, check whether the card is currently serving as a base for useful tableau sequences before promoting it. A 7 sitting on an 8 in the tableau might be more valuable there than on the foundation.",
  },
  {
    question: "How important are empty tableau columns in Bristol Solitaire?",
    answer:
      "Empty tableau columns are extremely valuable in Bristol because they can receive any single card — they function like free cells in FreeCell. However, Bristol only has eight tableau columns, and creating an empty one requires moving every card from that column to foundations or other columns. Use empty columns as temporary storage for cards blocking important sequences, or to hold Kings that have no other home. Do not fill them impulsively — a well-timed empty column can unlock a chain of 5-6 moves that would otherwise be impossible.",
  },
];

export default function BristolStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Bristol Solitaire", item: absoluteUrl("/bristol") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/bristol/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Bristol Solitaire Strategy Guide",
        description: "Advanced strategies for Bristol Solitaire covering stock management, reserve fan sequencing, tableau optimization, foundation building order, and King placement.",
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
        title="Bristol Solitaire Strategy Guide"
        kicker={<><Link href="/bristol" className="hover:text-white transition-colors">Bristol Solitaire</Link> / Strategy</>}
        subtitle="Advanced strategies for mastering Bristol's unique three-fan reserve system — from stock timing to foundation building order and tableau column management."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Bristol Solitaire", href: "/bristol" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Bristol Solitaire strategy rests on three pillars: <strong className="text-white">minimize reserve fan depth by playing from fans before the tableau</strong>,{" "}
          <strong className="text-white">build foundations incrementally rather than aggressively</strong>, and{" "}
          <strong className="text-white">create and protect empty tableau columns as tactical leverage</strong>.
          Every stock deal adds three cards to the reserve fans simultaneously — if those fans are already
          deep, the new cards become permanently buried. Keeping fans shallow is the single highest-impact
          strategic principle.
        </p>
      </div>

      {/* Section 1: Reserve Fan Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Reserve Fan Management: The Heart of Bristol Strategy
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          <Link href="/bristol" className="text-[var(--gold)] hover:text-white transition-colors">
            Bristol Solitaire
          </Link>{" "}
          deals stock cards three at a time into three separate reserve fans (waste piles). Only the
          top card of each fan is playable at any given time, which means every card dealt on top of
          a fan effectively buries the card beneath it. This is the central constraint that makes
          Bristol strategically rich — and frustrating when mismanaged.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The reserve fans function like a three-lane bottleneck. Each stock deal pushes one card into
          each lane. If a lane already has four cards and receives a fifth, you now need to play through
          five sequential cards to access whatever useful cards might sit at the bottom. This accumulation
          is the primary way games become unwinnable — not through tableau mismanagement, but through
          reserve fan overflow.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Always check fans before making tableau moves.</strong> If
            a reserve fan card can legally move to a foundation or tableau column, play it first. This
            reduces fan depth and potentially exposes a more useful card beneath.
          </li>
          <li>
            <strong className="text-white/90">Play from the deepest fan first.</strong> When multiple fans
            have playable cards, prioritize the deepest fan. Reducing a five-card fan to four is more
            valuable than reducing a two-card fan to one.
          </li>
          <li>
            <strong className="text-white/90">Delay stock deals until all fan plays are exhausted.</strong>{" "}
            Before dealing a new round of three cards, ensure no reserve fan card can be played anywhere.
            Dealing prematurely buries accessible cards under fresh ones.
          </li>
          <li>
            <strong className="text-white/90">Track what gets buried.</strong> When an Ace or Two disappears
            under a stock deal, note which fan it&apos;s in and plan to excavate it. That buried Ace
            represents an entire suit&apos;s foundation that cannot start until it surfaces.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Think of reserve fans as queues with a strict LIFO (last-in,
            first-out) policy. You can only serve the customer at the front of each line. Every stock
            deal adds one customer to the back of each line. Your goal is to keep all three lines as
            short as possible so that stock deals never create impossible backlogs.
          </p>
        </div>
      </section>

      {/* Section 2: Tableau Flexibility */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tableau Flexibility: Exploiting the No-Suit Rule
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bristol&apos;s most distinctive rule is that tableau building ignores suit entirely. Any card
          can be placed on any card that is exactly one rank higher — the 7 of Hearts goes on the 8 of
          Spades just as easily as on the 8 of Hearts. This makes the tableau extremely flexible compared
          to games like{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          , where color alternation or same-suit requirements constrain your options.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          However, this flexibility is deceptive. Because any card can go anywhere (as long as ranks match),
          it is easy to build long tableau sequences that look productive but actually accomplish nothing.
          A column with K-Q-J-10-9-8-7-6-5-4-3-2 spanning all four suits has consumed an entire column
          and half the deck, but those cards are now locked in a rigid stack. The only card that can leave
          is the 2 on top — and only if a 3 is available elsewhere or the foundation is ready.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Smart tableau building keeps columns shallow and varied. Avoid stacking more than 4-5 cards in
          a single column unless those cards are heading to the foundation in sequence. Distribute cards
          across multiple columns to maintain maneuverability. A card that sits alone in a column is a
          card that can move freely; a card buried under five others is trapped.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Prefer wide over deep.</strong> Spread cards across columns
            rather than building tall stacks. Wide distribution preserves options; deep stacks kill them.
          </li>
          <li>
            <strong className="text-white/90">Build toward foundations, not for the sake of building.</strong>{" "}
            Moving a 5 onto a 6 is only useful if you plan to play that 5 to the foundation soon or if
            it frees a more valuable card or column.
          </li>
          <li>
            <strong className="text-white/90">Top-card awareness is everything.</strong> You can only move
            the top card of each tableau column. Before burying a useful card under a less useful one,
            consider whether you might need the buried card sooner.
          </li>
          <li>
            <strong className="text-white/90">Use tableau columns as temporary holding.</strong> Sometimes
            the best move is parking a reserve fan card on a tableau column temporarily, even if it creates
            an off-sequence stack, just to empty the fan slot for future deals.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Strategic trade-off:</strong> Every tableau move that does not directly contribute to
            foundation building or fan clearing is potentially a move wasted. Before placing a card on the
            tableau, ask: does this advance me toward winning, or am I just rearranging the furniture?
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Foundation Building Order */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Foundation Building Order: When to Promote and When to Wait
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Foundation building in Bristol follows standard rules — Ace up to King for each suit. The
          temptation is to move every eligible card to the foundation as soon as possible, but this is
          often a mistake. Moving a card to the foundation is irreversible, and that card may have been
          serving an important role as a tableau base or as a target for reserve fan cards.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The general rule: <strong className="text-white">always promote Aces and Twos immediately</strong>.
          These low-rank cards have virtually no value in the tableau — nothing can be placed on an Ace, and
          a Two only accepts a single card (an Ace that should be on the foundation anyway). Getting them
          to the foundation opens their suit for continued building.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          For cards rank 3 and above, evaluate each promotion individually. A 6 sitting on a 7 in the
          tableau is holding a useful sequence together. Promoting the 6 means the 7 now needs a new
          occupant or becomes a stranded card. Conversely, a 6 sitting alone on the tableau is probably
          better off on the foundation — it frees the column for more productive use.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Keep foundations roughly even.</strong> If Hearts is at 7
            and Clubs is at 2, focus on catching Clubs up. Uneven foundations create bottlenecks — the
            lagging suit will need specific cards that might be trapped in fan stacks.
          </li>
          <li>
            <strong className="text-white/90">Check the reserve fans before promoting.</strong> If
            promoting a tableau card to the foundation exposes a card that can accept a fan card, the
            promotion gains double value — one card to foundation, one card freed from the fans.
          </li>
          <li>
            <strong className="text-white/90">Count the cards in the stock.</strong> Late in the game
            when the stock is empty, promote aggressively. Early in the game when many stock deals
            remain, promote conservatively. The more cards still to be dealt, the more likely you will
            need tableau flexibility.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Foundation building is not the goal — it is the <em>result</em>{" "}
            of good play. Focus on managing the reserve fans and keeping the tableau flexible. Foundations
            will fill naturally as a consequence of correct fan and tableau management.
          </p>
        </div>
      </section>

      {/* Section 4: Stock Deal Preparation */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Stock Deal Preparation: Setting Up Before the Next Three Cards
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Each stock deal in Bristol drops one card onto each of the three reserve fans simultaneously.
          You cannot control which cards come or which fan they land on. What you <em>can</em> control
          is the state of the board before the deal. Preparing your fans and tableau before each deal
          is the highest-leverage strategic action in Bristol.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Ideal pre-deal conditions: all three reserve fans are as shallow as possible (ideally empty,
          though this is rare after the first few deals), the tableau has at least one empty column or
          a column with a high-rank card that can accept a wide range of incoming cards, and the
          foundations have been built to the point where no easy promotions remain.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The worst scenario is dealing into three fans that already hold 3-4 cards each with no
          tableau space to absorb the new arrivals. At this point, you are adding to three gridlocked
          queues, and the chances of the new cards being useful (instead of further burying useful
          cards) drop significantly.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Clear at least one fan before dealing if possible.</strong>{" "}
            An empty fan guarantees that one of the three incoming cards is immediately accessible
            without being buried.
          </li>
          <li>
            <strong className="text-white/90">Create tableau landing spots.</strong> Before dealing, try
            to have tableau columns whose top cards are high-rank (8, 9, 10, J, Q) so they can accept
            a wide range of incoming cards from the fans.
          </li>
          <li>
            <strong className="text-white/90">Promote to foundations pre-deal.</strong> Any card that
            can go to the foundation before the deal should go now — it creates space and potentially
            makes the next foundation card playable from whatever the deal reveals.
          </li>
          <li>
            <strong className="text-white/90">Count remaining stock cards.</strong> As the stock depletes,
            fewer deals remain. The final deal is often the most critical — prepare for it by maximizing
            fan and tableau flexibility in the preceding turns.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Dealing from the stock as soon as you run out of obvious
            moves. Before dealing, look harder — check every fan card against every tableau column and
            foundation. Often there is a non-obvious chain of 2-3 moves hiding in plain sight that
            will reduce fan depth before the next deal adds more cards.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: King Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          King Management: The Column-Killers
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Kings are the most problematic rank in Bristol Solitaire. No card can be placed on top of a
          King in the tableau (since there is no rank above King), which means a King sitting on top
          of a tableau column effectively caps that column — nothing can be added to it. The only
          way to remove a King from the tableau is to promote it to a foundation, which requires the
          entire suit to be built up to Queen first.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This creates a cascading problem. A King on the tableau blocks the column beneath it. If useful
          cards are trapped under the King, they are inaccessible until the King&apos;s entire suit is
          built to Queen in the foundation. In a game with only eight tableau columns, having even two
          columns capped by Kings reduces your working space by 25%.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The strategic response is twofold: first, avoid placing Kings on top of useful tableau cards
          whenever possible. If a King appears in a reserve fan, try to play it to an empty column or
          on top of a column where the buried cards are low-value or already foundation-bound. Second,
          when a King does cap a column, prioritize building that King&apos;s suit in the foundation to
          free the column as quickly as possible.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Empty columns are King dumping grounds.</strong> When you
            create an empty column, consider reserving it specifically for an incoming King rather than
            using it for general card storage.
          </li>
          <li>
            <strong className="text-white/90">Kings in the reserve fans</strong> are especially dangerous.
            A King at the bottom of a deep fan means every card above it must be played before the King
            can go anywhere — and the King itself cannot be placed on anything in the tableau.
          </li>
          <li>
            <strong className="text-white/90">Plan for Kings from the start.</strong> At the beginning of
            the game, note which Kings are visible and which are likely in the stock. Arrange your tableau
            to have dedicated King-receiving columns that sacrifice minimal card access.
          </li>
        </ul>
      </section>

      {/* Section 6: Bristol vs Other Variants */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Bristol vs Other Variants: Strategic Comparisons
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Players coming from other solitaire variants often misapply familiar strategies to Bristol.
          Understanding how Bristol differs from popular games helps calibrate your approach and avoid
          costly tactical errors.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Strategic Element</span>
            <span>Bristol</span>
            <span>Other Variants</span>
          </div>
          {[
            ["Tableau building", "Any suit, rank-only", "Alternating color (Klondike) or same suit (Spider)"],
            ["Reserve/waste", "3 separate fans", "1 waste pile (Klondike) or stock deals to tableau (Spider)"],
            ["Card movement", "Top card only", "Full sequences (Spider, Scorpion) or cascades (FreeCell)"],
            ["Empty columns", "Any single card", "Kings only (Klondike) or any card (Spider)"],
            ["Win rate (skilled)", "15-25%", "30-35% (Klondike), 50% (Scorpion), 80% (Spider 1-suit)"],
            ["Primary bottleneck", "Reserve fan depth", "Hidden cards (Klondike), free cells (FreeCell)"],
          ].map(([element, bristol, others], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{element}</span>
              <span>{bristol}</span>
              <span>{others}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed mb-4">
          The biggest adjustment from{" "}
          <Link href="/spider/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider Solitaire
          </Link>{" "}
          is that Bristol has no concept of same-suit sequence building in the tableau. Spider rewards
          in-suit sequences with the ability to move them as a unit; Bristol moves only single cards.
          From{" "}
          <Link href="/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , the adjustment is that Bristol lacks free cells for temporary storage — your tableau columns
          must serve that purpose, making empty columns far more valuable.
        </p>
        <p className="text-white/70 leading-relaxed">
          The unique three-fan system has no real parallel in other popular solitaire variants. It
          creates a strategic dimension that rewards careful planning around stock deals — a skill that
          does not transfer from any other game. Bristol players must develop this planning instinct
          from scratch, which is why experienced solitaire players sometimes struggle more with Bristol
          than beginners who approach it without preconceptions.
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
              <strong>Play from reserve fans first.</strong> Always check the three fans for legal
              moves before touching the tableau. Reducing fan depth is the top priority.
            </li>
            <li>
              <strong>Promote Aces and Twos immediately.</strong> They have zero tableau value. Get
              them to foundations to open building lanes.
            </li>
            <li>
              <strong>Keep foundations roughly even.</strong> A lagging suit creates bottlenecks that
              compound over time.
            </li>
            <li>
              <strong>Prepare before dealing from stock.</strong> Minimize fan depth and create tableau
              space before adding three new cards to the fans.
            </li>
            <li>
              <strong>Treat Kings as hazards.</strong> They cap columns permanently until their suit
              is built to Queen. Park them in empty columns or on disposable stacks.
            </li>
            <li>
              <strong>Spread cards wide, not deep.</strong> The no-suit tableau rule tempts you into
              tall stacks. Resist — flexibility comes from shallow, spread-out columns.
            </li>
            <li>
              <strong>Protect empty columns.</strong> An empty column is your best tactical tool. Do
              not fill it without a plan for how it will help you win.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/bristol/how-to-play" title="How to Play Bristol" description="Complete rules, setup, and valid moves for Bristol Solitaire." />
            <ContentLinkCard href="/bristol/tips" title="Bristol Tips & Tricks" description="Quick, practical tips for improving your Bristol game." />
            <ContentLinkCard href="/bristol" title="Play Bristol Solitaire" description="Put these strategies into practice — play free online." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Bristol knowledge to the test. Play free online Bristol Solitaire with unlimited undo and instant new deals."
          primaryLabel="Play Bristol Solitaire"
          primaryHref="/bristol"
          secondaryLabel="Learn the Rules"
          secondaryHref="/bristol/how-to-play"
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
          More Bristol Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/bristol" title="Play Bristol Solitaire" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/bristol/how-to-play" title="How to Play Bristol" description="Complete rules, setup, and move guide" />
          <ContentLinkCard href="/bristol/tips" title="Bristol Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" description="Strategy for the most popular solitaire variant" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
