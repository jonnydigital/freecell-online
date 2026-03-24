import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Seahaven Towers Tips & Tricks | Master the FreeCell Cousin",
  description:
    "7 expert tips and tricks for Seahaven Towers Solitaire. Master free cell management, same-suit building, Kings-only columns, tower strategy, and foundation timing to win more games.",
  keywords: [
    "seahaven towers tips",
    "seahaven towers strategy",
    "seahaven towers tricks",
    "seahaven towers solitaire tips",
    "how to win seahaven towers",
    "seahaven towers help",
    "seahaven towers advice",
    "seahaven towers winning tips",
    "seahaven towers free cell strategy",
    "seahaven towers card game tips",
    "seahaven solitaire strategy",
  ],
  openGraph: {
    title: "Seahaven Towers Tips & Tricks | Master the FreeCell Cousin",
    description:
      "7 expert tips for Seahaven Towers. Master free cell management, same-suit building, and Kings-only empty columns to boost your win rate.",
    url: absoluteUrl("/seahaven/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Seahaven Towers?",
    answer:
      "The best strategy centers on three principles: (1) keep at least one free cell open at all times for flexibility, (2) build same-suit descending sequences on the tableau to move cards efficiently, and (3) only place Kings in empty columns since that is the only card allowed there. Plan several moves ahead and avoid filling free cells without a clear plan to empty them again.",
  },
  {
    question: "How many free cells does Seahaven Towers have?",
    answer:
      "Seahaven Towers has 4 free cells, just like FreeCell. However, the game starts with 2 of those 4 cells already occupied by the two leftover cards from the deal (52 cards minus 50 dealt to 10 columns of 5). This means you begin with only 2 free cells available, making the opening moves more constrained than FreeCell.",
  },
  {
    question: "Can any card go in an empty column in Seahaven Towers?",
    answer:
      "No. In Seahaven Towers, only Kings can be placed in empty tableau columns. This is one of the biggest differences from FreeCell, where any card can fill an empty cascade. The Kings-only restriction means you must plan carefully before clearing a column — if you do not have a King ready, the empty column is wasted space until one becomes available.",
  },
  {
    question: "Is Seahaven Towers harder than FreeCell?",
    answer:
      "Seahaven Towers is generally considered slightly harder than standard FreeCell. While both games have high win rates with expert play (FreeCell ~82%, Seahaven ~85-90%), Seahaven's same-suit building rule, Kings-only empty columns, and starting with 2 occupied free cells create different challenges. Many players find the same-suit restriction the hardest adjustment coming from FreeCell.",
  },
  {
    question: "What is a good win rate for Seahaven Towers?",
    answer:
      "Expert players can achieve an 85-90% win rate in Seahaven Towers. Intermediate players typically win 50-70% of games, while beginners may win 20-40%. The game is more forgiving than Forty Thieves or Spider 4-suit, but the same-suit building and Kings-only column rules mean it demands more precision than standard FreeCell.",
  },
];

export default function SeahavenTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Seahaven Towers", item: absoluteUrl("/seahaven") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/seahaven/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Seahaven Towers Tips & Tricks",
        description: "7 expert tips and tricks for winning more Seahaven Towers Solitaire games — the strategic FreeCell cousin with same-suit building.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-24",
        dateModified: "2026-03-24",
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
        title="Seahaven Towers Tips & Tricks"
        kicker={<><Link href="/seahaven" className="hover:text-white transition-colors">Seahaven Towers</Link> / Tips</>}
        subtitle="Master the FreeCell cousin that demands same-suit precision. From free cell management to Kings-only column strategy — 7 tips to raise your win rate above 85%."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Seahaven Towers", href: "/seahaven" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">always keep at least one free cell open</strong>.
          Seahaven Towers gives you 4 free cells but starts with 2 already occupied. Filling all
          4 cells locks the board completely because only single cards can move and empty columns
          accept only Kings. Every decision should pass one test: &ldquo;Will this move leave me
          with at least one open free cell?&rdquo;
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Guard Your Free Cells — Never Fill All Four
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          <Link href="/seahaven" className="text-[var(--gold)] hover:text-white transition-colors">
            Seahaven Towers
          </Link>{" "}
          gives you 4 free cells, but the deal places 2 leftover cards in them immediately. That
          means you start with only 2 open cells. Filling both remaining cells without a plan to
          empty them is the fastest way to lose a winnable game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Free cells in Seahaven Towers serve the same purpose as in{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          {" "}&mdash; temporary storage that lets you rearrange the tableau. But because Seahaven
          only allows single-card moves (no supermoves), each free cell represents exactly one
          card of flexibility. Lose that flexibility and the game grinds to a halt.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Start by freeing the 2 pre-filled cells.</strong> Your
            first priority should be moving the starting free cell cards to the tableau or foundations.
          </li>
          <li>
            <strong className="text-white/90">Never fill a cell without a clear exit plan.</strong> Before
            parking a card, know exactly how you will empty that cell within 2-3 moves.
          </li>
          <li>
            <strong className="text-white/90">Treat the last open cell as untouchable.</strong> Reserve
            it for emergencies — filling it should only happen when the resulting sequence of moves
            guarantees progress.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Count your open free cells before every move. If you are
            down to one, stop and look for a way to empty a cell before doing anything else.
            This single habit will dramatically reduce your losses.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Build Same-Suit Sequences on the Tableau
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          where you build with alternating colors, Seahaven Towers requires same-suit descending
          sequences on the tableau. A 9 of Hearts can only go on a 10 of Hearts — not a 10 of
          Diamonds or a 10 of Clubs. This restriction cuts your available moves dramatically
          compared to alternating-color games.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The upside of same-suit building is that every tableau sequence you construct is already
          foundation-ready. In FreeCell, you might build a beautiful alternating-color run only
          to disassemble it for foundation play. In Seahaven, a same-suit run from 8 down to 3
          means all 6 cards are ready to march to the foundations in order once the lower cards
          are placed.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Scan for matching suits at the start.</strong> Look
            for cards of the same suit that are already near each other and can be consolidated.
          </li>
          <li>
            <strong className="text-white/90">Avoid mixing suits on a column.</strong> Placing
            an off-suit card on a column just because it fits by rank creates problems later when
            you need to separate them.
          </li>
          <li>
            <strong className="text-white/90">Prioritize long same-suit runs.</strong> A 5-card
            same-suit sequence is far more valuable than five scattered single-card placements.
          </li>
        </ul>
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
          <p className="text-blue-300/80 text-sm">
            <strong>Key difference from FreeCell:</strong> In{" "}
            <Link href="/bakers-game" className="text-[var(--gold)] hover:text-white transition-colors">
              Baker&apos;s Game
            </Link>
            {" "}&mdash; another same-suit variant &mdash; you get 8 columns and supermoves.
            Seahaven gives you 10 columns but no supermoves and Kings-only empty columns,
            creating a different strategic balance.
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
          Tip #3: Empty Columns Are for Kings Only — Plan Accordingly
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          One of Seahaven Towers&apos; defining rules is that only Kings can be placed in empty
          tableau columns. This is a major departure from FreeCell, where any card can fill an
          empty cascade. The Kings-only restriction means clearing a column is only valuable if
          you have a King ready to occupy it — or if clearing the column is a necessary step in
          a longer sequence.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before investing moves to empty a column, ask: &ldquo;Do I have a King that needs a
          home?&rdquo; If the answer is no, those moves might be wasted. An empty column you
          cannot fill sits idle, and the cards you moved to clear it may have been better left
          in place.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Track all four Kings.</strong> Know where every
            King is at all times — which are exposed, which are buried, and which are in free cells.
          </li>
          <li>
            <strong className="text-white/90">Kings in free cells are prime candidates.</strong> Moving
            a King from a free cell to an empty column simultaneously fills the column productively
            and frees a cell.
          </li>
          <li>
            <strong className="text-white/90">Sometimes an empty column is a stepping stone.</strong> Even
            without a King ready, temporarily clearing a column to rearrange other cards can be
            worthwhile — just ensure the column gets filled productively within a few moves.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Kings sitting on top of other cards are blocking those
            cards beneath them. Moving a King to an empty column or free cell often unlocks
            valuable cards underneath. Prioritize freeing Kings that are trapping useful cards.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Manage Your Towers — Free Cells Are a Rotation System
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Think of your free cells not as permanent parking spots but as a rotation system. Cards
          should flow in and out of free cells, spending as few turns there as possible. The
          &ldquo;towers&rdquo; in Seahaven Towers are your free cells, and managing them well is
          the core skill that separates beginners from experts.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          A good rhythm looks like this: move a blocking card to a free cell, rearrange the tableau
          to create a same-suit sequence, then move that free cell card to either the foundations
          or back onto a tableau column where it fits. The free cell was occupied for just 2-3 moves.
          A bad pattern is parking cards in free cells &ldquo;just in case&rdquo; with no plan to
          move them — this gradually chokes the game.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Low cards cycle through fastest.</strong> Aces and
            Twos parked in free cells can go directly to foundations. These are the best candidates
            for temporary cell storage.
          </li>
          <li>
            <strong className="text-white/90">High cards (especially Kings) may need longer stays.</strong> A
            King in a free cell must wait for an empty column. Plan around this delay.
          </li>
          <li>
            <strong className="text-white/90">Mid-range cards are the riskiest.</strong> A 7 or 8
            in a free cell needs a specific card on the tableau to land on. If that card is buried,
            the cell stays occupied indefinitely.
          </li>
        </ul>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Time Your Foundation Moves Carefully
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In many solitaire games, moving cards to the foundations as quickly as possible is
          always correct. Seahaven Towers is different. Because the game uses same-suit tableau
          building, a card on the tableau may be more useful as part of a sequence than sitting
          on a foundation pile.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          For example, if you have a 4 of Spades on the tableau with a 5 and 6 of Spades
          below it, moving the 4 to the foundations breaks up a useful same-suit run. Yes,
          you will eventually need to move the 4 to the foundation — but the timing matters.
          Move it too early and you lose the sequence; move it at the right moment and the 5
          and 6 follow smoothly after.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Aces and Twos always go up immediately.</strong> There
            is never a reason to keep an Ace or Two on the tableau in Seahaven Towers.
          </li>
          <li>
            <strong className="text-white/90">Threes through Sixes — think twice.</strong> Check
            whether the card is part of a useful tableau sequence before sending it to the foundation.
          </li>
          <li>
            <strong className="text-white/90">Sevens and above — usually safe to send up.</strong> Higher
            cards are less likely to be needed for tableau building, so they can go to foundations
            when available.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> When in doubt, ask: &ldquo;Is this card currently helping
            hold a tableau sequence together?&rdquo; If yes, leave it. If the card is sitting
            alone or blocking something, send it to the foundation.
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
          Tip #6: Plan Multiple Moves Ahead — Visualize the Chain
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Seahaven Towers rewards planning more than almost any other solitaire variant. Because
          all cards are face-up from the start, you have complete information about the board.
          There are no hidden cards, no stock pile surprises — just pure strategy. Use this to
          your advantage by thinking 4-6 moves ahead before touching a card.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making any move, trace the chain of consequences. If you move the 8 of Clubs
          to a free cell, which card does that expose? Can that exposed card go somewhere useful?
          Does the resulting board state open up a foundation move or a same-suit consolidation?
          If you cannot trace at least 3 productive moves in a chain, the opening move may not
          be worth making.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Use the undo button liberally.</strong> Try a
            sequence of moves. If it does not lead where you expected, undo and try a different
            approach. Exploration is free.
          </li>
          <li>
            <strong className="text-white/90">Look for cascade opportunities.</strong> The best
            moves trigger a chain reaction: one card moves, which exposes another card, which
            enables a foundation play, which frees a cell.
          </li>
          <li>
            <strong className="text-white/90">Scan all 10 columns before acting.</strong> With
            10 columns on the board, opportunities are easy to miss. Systematically check each
            column before committing to a move.
          </li>
        </ul>
        <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4">
          <p className="text-purple-300/80 text-sm">
            <strong>Mental model:</strong> Think of Seahaven Towers as a puzzle, not a card
            game. Every deal has a specific solution path (or proves unsolvable). Your job is
            to find that path through careful observation and forward planning.
          </p>
        </div>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Understand What Makes Seahaven Unique — Adapt Your FreeCell Instincts
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          If you are coming from{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , your instincts will serve you well — but several key differences require adjustment.
          The alternating-color building in FreeCell gives you roughly twice as many valid
          tableau moves at any given point. Same-suit building in Seahaven cuts those options
          in half, forcing more precise planning.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The Kings-only empty column rule is the other major adjustment. In FreeCell, clearing
          a column is always good because any card can fill it. In Seahaven, an empty column
          without a King to fill it is dead space. This changes your calculation about which
          columns to clear and when. Additionally, the lack of supermoves means every multi-card
          rearrangement must be executed one card at a time through free cells.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          However, Seahaven compensates with 10 columns instead of FreeCell&apos;s 8, giving
          you more tableau space overall. The 5-card columns (versus FreeCell&apos;s 6-7 card
          columns) also mean cards are less deeply buried at the start. Learning to leverage
          these Seahaven-specific advantages is the key to mastering the game.
        </p>
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
          <p className="text-blue-300/80 text-sm">
            <strong>Coming from Baker&apos;s Game?</strong>{" "}
            <Link href="/bakers-game" className="text-[var(--gold)] hover:text-white transition-colors">
              Baker&apos;s Game
            </Link>{" "}
            shares same-suit building with Seahaven but uses 8 columns and allows any card in
            empty columns. Seahaven&apos;s 10 columns plus Kings-only restriction creates a
            different feel — more room to work, but less flexibility with empty spaces.
          </p>
        </div>
      </section>

      {/* Seahaven vs FreeCell comparison */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Seahaven Towers vs FreeCell: Key Differences
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Many players discover Seahaven Towers after playing{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          . While the games share DNA — open information, free cells, single-card moves — the
          rule differences create a fundamentally different strategic experience.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Feature</span>
            <span>FreeCell</span>
            <span>Seahaven Towers</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Tableau columns</span>
            <span>8</span>
            <span className="text-[var(--gold)]">10</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Cards per column</span>
            <span>6 or 7</span>
            <span className="text-[var(--gold)]">5</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Free cells</span>
            <span>4 (all empty)</span>
            <span className="text-[var(--gold)]">4 (2 pre-filled)</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Tableau building</span>
            <span>Alternating colors</span>
            <span className="text-[var(--gold)]">Same suit only</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Empty columns</span>
            <span>Any card</span>
            <span className="text-[var(--gold)]">Kings only</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Supermoves</span>
            <span>Yes</span>
            <span className="text-[var(--gold)]">No (single cards only)</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3">
            <span>Expert win rate</span>
            <span>~82%</span>
            <span className="text-[var(--gold)]">~85-90%</span>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          The combination of same-suit building and Kings-only columns makes Seahaven more
          restrictive per move, but the extra columns and shorter starting stacks compensate.
          Both games reward careful planning and efficient use of temporary storage.
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
              <strong>Never fill all 4 free cells.</strong> Keep at least one open
              at all times for flexibility.
            </li>
            <li>
              <strong>Build same-suit sequences.</strong> Every tableau run you build
              is already foundation-ready.
            </li>
            <li>
              <strong>Empty columns are for Kings only.</strong> Do not clear a column
              unless you have a King to fill it.
            </li>
            <li>
              <strong>Rotate cards through free cells quickly.</strong> Park, rearrange,
              and empty — cells are temporary, not permanent.
            </li>
            <li>
              <strong>Time foundation moves.</strong> Aces and Twos go up immediately;
              mid-range cards may be more useful on the tableau.
            </li>
            <li>
              <strong>Plan 4-6 moves ahead.</strong> All cards are visible — use complete
              information to your advantage.
            </li>
            <li>
              <strong>Adapt your FreeCell instincts.</strong> Same-suit building and
              Kings-only columns change the calculus for every move.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/seahaven/how-to-play" title="How to Play Seahaven" description="Complete rules, setup, and foundation mechanics explained." />
            <ContentLinkCard href="/seahaven" title="Play Seahaven Towers" description="Put these tips into practice with free online Seahaven Towers." />
            <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips for the classic FreeCell game — Seahaven's closest cousin." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve at Seahaven Towers is to play. Apply these tips one at a time — start with free cell management, then layer in foundation timing and forward planning."
          primaryLabel="Play Seahaven Towers"
          primaryHref="/seahaven"
          secondaryLabel="Learn the Rules"
          secondaryHref="/seahaven/how-to-play"
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
          More Seahaven Towers Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/seahaven" title="Play Seahaven Towers" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/seahaven/how-to-play" title="How to Play Seahaven" description="Complete rules, setup, and strategy guide" />
          <ContentLinkCard href="/bakers-game" title="Baker's Game" description="Another same-suit FreeCell variant to test your skills" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips for the original free cell solitaire game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Deep strategy guide for FreeCell players" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
