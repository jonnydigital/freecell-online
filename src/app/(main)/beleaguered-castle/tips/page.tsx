import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Beleaguered Castle Tips & Tricks | Conquer the No-Free-Cell Challenge",
  description:
    "7 expert tips to win Beleaguered Castle Solitaire. Master empty column tactics, rank-only building, foundation order planning, and ace strategies to beat this brutal no-free-cell variant.",
  keywords: [
    "beleaguered castle tips",
    "beleaguered castle strategy",
    "beleaguered castle solitaire tips",
    "beleaguered castle tricks",
    "how to win beleaguered castle",
    "beleaguered castle solitaire strategy",
    "beleaguered castle help",
    "beleaguered castle advice",
    "beleaguered castle winning tips",
    "beleaguered castle card game strategy",
    "no free cell solitaire tips",
  ],
  openGraph: {
    title: "Beleaguered Castle Tips & Tricks | Conquer the No-Free-Cell Challenge",
    description:
      "7 expert tips to win Beleaguered Castle Solitaire. Master empty columns, rank-only building, and foundation order to conquer this punishing variant.",
    url: absoluteUrl("/beleaguered-castle/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Beleaguered Castle Solitaire?",
    answer:
      "The best strategy centers on three priorities: (1) expose and build low cards to the foundations as quickly as possible, (2) create empty tableau columns for temporary storage since there are no free cells, and (3) plan your foundation building order carefully so you don't block yourself. Every move should be evaluated against these priorities. Empty columns are your only working space in this game.",
  },
  {
    question: "What is the win rate for Beleaguered Castle?",
    answer:
      "Beleaguered Castle has a win rate of roughly 30% with skilled play, though casual players may win only 10-15% of games. This makes it significantly harder than standard FreeCell (~82%) but more forgiving than Forty Thieves (~10%). The difficulty comes from having no free cells — your only temporary storage is empty tableau columns.",
  },
  {
    question: "How is Beleaguered Castle different from FreeCell?",
    answer:
      "The biggest difference is that Beleaguered Castle has no free cells at all. In FreeCell, you have four free cells for temporary card storage. In Beleaguered Castle, empty tableau columns are your only workspace. Additionally, Aces start pre-placed on the foundations, tableau building is by rank only (any suit on any suit), and all cards are dealt face-up from the start.",
  },
  {
    question: "Can you build with any suit in Beleaguered Castle?",
    answer:
      "Yes. Unlike FreeCell or Klondike where you must alternate colors, Beleaguered Castle uses rank-only building on the tableau. You can place any card of a given rank on any card one rank higher, regardless of suit or color. For example, any 7 can go on any 8. This gives you more building options but the lack of free cells more than compensates for this flexibility.",
  },
  {
    question: "Why are empty columns so important in Beleaguered Castle?",
    answer:
      "Empty columns are critical because Beleaguered Castle has no free cells. Without empty columns, you can only move one card at a time to another tableau column or a foundation. Each empty column effectively acts as a free cell, giving you temporary storage to rearrange cards. With zero empty columns and no valid moves, the game is over — so protecting and creating empty columns is the core skill of the game.",
  },
];

export default function BeleagueredCastleTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Beleaguered Castle", item: absoluteUrl("/beleaguered-castle") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/beleaguered-castle/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Beleaguered Castle Tips & Tricks",
        description: "7 expert tips for winning more Beleaguered Castle Solitaire games — the no-free-cell variant that demands perfect planning.",
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
        title="Beleaguered Castle Tips & Tricks"
        kicker={<><Link href="/beleaguered-castle" className="hover:text-white transition-colors">Beleaguered Castle</Link> / Tips</>}
        subtitle="Master the hardest FreeCell variant — one with zero free cells. From foundation order planning to empty column tactics, these 7 tips will help you push your win rate toward 30%."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Beleaguered Castle", href: "/beleaguered-castle" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">empty columns are your only free cells</strong>.
          Beleaguered Castle strips away the four free cells that make standard FreeCell
          manageable. Your only temporary storage is an empty tableau column. Every
          decision should be filtered through one question: &ldquo;Does this move help
          me create, protect, or use an empty column?&rdquo;
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Use Your Pre-Placed Aces Wisely
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/beleaguered-castle" className="text-[var(--gold)] hover:text-white transition-colors">
            Beleaguered Castle
          </Link>
          , all four Aces start pre-placed on the foundations. This is the game&apos;s
          one concession to the player — you never have to dig for Aces. But this
          advantage only matters if you capitalize on it immediately by building Twos
          and Threes onto those foundations as fast as possible.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          At the start of every game, scan the tableau for exposed Twos. Any Two sitting
          at the end of a row can go straight to its matching foundation. Then look for
          Threes that will become exposed once those Twos are moved. Building the
          foundations from the very first move creates momentum and frees tableau space
          before the board gets congested.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Scan for Twos immediately.</strong> Before
            any other move, locate all four Twos and plan how to reach them.
          </li>
          <li>
            <strong className="text-white/90">Chain low cards.</strong> If moving a Two
            exposes a Three of another suit, you&apos;ve just unlocked a double foundation build.
          </li>
          <li>
            <strong className="text-white/90">Prioritize suits with accessible low cards.</strong> If
            one suit has 2, 3, and 4 all reachable, build that foundation first.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Pre-placed Aces mean you effectively start with
            4 of 52 cards already home. That&apos;s a 7.7% head start — but only if you
            immediately follow up with Twos and Threes. A pre-placed Ace with a buried
            Two is wasted potential.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Embrace Rank-Only Building
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          where you must alternate red and black cards, Beleaguered Castle uses
          rank-only building on the tableau. Any card can go on any card that is
          exactly one rank higher — a 5 of Hearts on a 6 of Clubs, a Jack of
          Diamonds on a Queen of Spades, anything goes as long as the rank is correct.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This flexibility is powerful and you should exploit it aggressively. With
          four possible target cards for every move instead of two, you have roughly
          double the building options compared to alternating-color games. Use this
          freedom to consolidate cards, shorten rows, and expose buried cards that
          you need for the foundations.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Don&apos;t think in colors.</strong> Train
            yourself to see only ranks. A 9 can go on any 10, period.
          </li>
          <li>
            <strong className="text-white/90">Use rank flexibility to unstack.</strong> If
            a key card is buried three deep, rank-only building gives you more places
            to park the cards above it.
          </li>
          <li>
            <strong className="text-white/90">Watch for rank bottlenecks.</strong> If all
            four 8s are buried, you have no place to put any 7 — regardless of suit freedom.
          </li>
        </ul>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Empty Columns Are Everything
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          This cannot be overstated: empty tableau columns are the most critical
          resource in Beleaguered Castle. With zero free cells, an empty column is
          your only place to temporarily park a card while rearranging the board.
          Without at least one empty column, you are limited to direct moves — card
          to foundation or card to another tableau column where it fits by rank.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Creating your first empty column should be a top priority from the very
          first move. Look for the shortest row on the tableau — often one with
          only 5 or 6 cards — and focus on moving its cards elsewhere. Build them
          onto other rows, send low cards to the foundations, do whatever it takes
          to clear that column completely.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Once you have one empty column, guard it fiercely. Only fill it when you
          have a clear plan to empty it again within 2-3 moves. Two empty columns
          give you enormous flexibility — you can rearrange sequences, dig deep
          into rows, and recover from difficult positions. Three empty columns
          makes most remaining positions solvable.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> In standard{" "}
            <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
              FreeCell
            </Link>
            , you start with 4 free cells plus potential empty columns. In Beleaguered
            Castle, you start with zero free cells and zero empty columns. You must earn
            every bit of working space from scratch — that&apos;s what makes this variant
            so demanding.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Expose Low Cards Early
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The foundation building order in Beleaguered Castle goes Ace (already
          placed), Two, Three, Four, and so on up to King. You cannot skip ranks.
          If the 3 of Spades is buried under four other cards, the entire Spades
          foundation stalls at 2 until you dig it out.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          At the start of every game, identify where the Twos, Threes, Fours, and
          Fives are located. These low cards are the bottleneck for foundation
          progress. A buried Two is more damaging than a buried King because
          the Two blocks 11 subsequent cards from reaching the foundation.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Map the low cards.</strong> Before your first
            move, mentally note the position of every 2, 3, 4, and 5 on the tableau.
          </li>
          <li>
            <strong className="text-white/90">Prioritize uncovering deeply buried low cards.</strong> A
            Two buried 5 cards deep needs urgent attention — that suit is frozen until
            you reach it.
          </li>
          <li>
            <strong className="text-white/90">Accept short-term pain for long-term gain.</strong> Sometimes
            you need to fill an empty column or make an awkward move to expose a critical
            low card. The foundation progress is worth it.
          </li>
        </ul>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Plan Your Foundation Order Carefully
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Not all four foundations should be built at the same pace. In Beleaguered
          Castle, the order in which you build foundations can make or break a game.
          If you rush one suit to the foundations while neglecting others, you can
          create imbalances that lock up the tableau.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The ideal approach is to keep all four foundations within 2-3 ranks of
          each other. If Spades is at 6, you want Hearts, Diamonds, and Clubs at
          4 or higher. When one foundation falls far behind, the low cards of that
          suit become obstacles — they block cards of other suits that you need to
          move, and they cannot go to the foundation because the cards below them
          haven&apos;t been placed yet.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before sending a card to the foundation, ask: &ldquo;Will I need this card
          as a building spot on the tableau?&rdquo; A 9 of Hearts on the tableau
          can hold any 8. Once it goes to the foundation, that building spot
          disappears. In the mid-game, keeping a few higher cards on the tableau
          as &ldquo;landing pads&rdquo; is sometimes better than rushing them home.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> In the early game, send everything possible to
            the foundations. In the mid-game, be more selective — sometimes a card
            is more useful as a tableau building target than as foundation progress.
            In the late game, rush everything home.
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
          Tip #6: Build Long Descending Sequences
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Since Beleaguered Castle allows rank-only building (no suit or color
          constraints), you can stack long descending sequences on the tableau.
          A column running King-Queen-Jack-10-9-8-7 is a powerful structure — it
          consolidates seven cards into one column, freeing space everywhere else.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Long sequences also serve as &ldquo;absorption columns&rdquo; — they can
          accept any card of the next lower rank. A column topped by a 7 can take
          any 6 from anywhere on the board. The longer your sequence, the more
          cards it can potentially absorb as you rearrange other columns.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Start sequences with Kings.</strong> A King
            at the base of a column gives the maximum possible sequence length of 12 cards
            (King down to Two, then the Two goes to the foundation).
          </li>
          <li>
            <strong className="text-white/90">Avoid gaps in sequences.</strong> A column with
            K-Q-J-9 has a gap at 10. Until you find a 10 to fill it, the 9 and everything
            below it are effectively trapped.
          </li>
          <li>
            <strong className="text-white/90">Consolidate when possible.</strong> If two
            columns have partial sequences that connect, merge them to free up a column.
          </li>
        </ul>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Know the Win Rate — And When to Restart
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Beleaguered Castle has a win rate of approximately 30% with skilled play.
          That means even experienced players lose about 7 out of every 10 games.
          This is significantly harder than{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (~82% win rate) but more forgiving than{" "}
          <Link href="/forty-thieves" className="text-[var(--gold)] hover:text-white transition-colors">
            Forty Thieves
          </Link>{" "}
          (~10%). Understanding these odds helps you stay motivated and recognize
          when to cut your losses.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Signs that a game is probably unwinnable:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            All eight tableau rows are long with no empty columns and no way to create one
          </li>
          <li>
            Critical low cards (Twos and Threes) are buried at the far ends of rows
          </li>
          <li>
            Multiple suits have their low cards trapped behind high cards of the same suit
          </li>
          <li>
            You have no valid moves that don&apos;t make the position worse
          </li>
          <li>
            Kings are blocking access to everything useful in multiple columns
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t grind unwinnable games.</strong> If you recognize a dead
            position within the first 10-15 moves, restart immediately. Your time is
            better spent on a fresh deal with a solvable layout. The best players
            have high win rates partly because they quickly abandon hopeless deals.
          </p>
        </div>
      </section>

      {/* Win rate comparison */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Win Rate Comparison
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Understanding where Beleaguered Castle sits in the difficulty spectrum helps
          set realistic expectations. Here&apos;s how it compares to other popular
          solitaire variants:
        </p>
        <div className="overflow-x-auto mb-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
              <span>Game</span>
              <span>Win Rate</span>
              <span>Free Cells / Storage</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span><Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">FreeCell</Link></span>
              <span>~82%</span>
              <span className="text-white/50">4 free cells</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span><Link href="/seahaven" className="text-[var(--gold)] hover:text-white transition-colors">Seahaven Towers</Link></span>
              <span>~75%</span>
              <span className="text-white/50">4 free cells (Kings-only empty cols)</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span><Link href="/eight-off" className="text-[var(--gold)] hover:text-white transition-colors">Eight Off</Link></span>
              <span>~70%</span>
              <span className="text-white/50">8 free cells (same-suit building)</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span className="text-[var(--gold)] font-semibold">Beleaguered Castle</span>
              <span className="text-[var(--gold)] font-semibold">~30%</span>
              <span className="text-amber-400">0 free cells</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3">
              <span><Link href="/forty-thieves" className="text-[var(--gold)] hover:text-white transition-colors">Forty Thieves</Link></span>
              <span>~10%</span>
              <span className="text-white/50">No free cells, 2 decks</span>
            </div>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          Beleaguered Castle&apos;s ~30% win rate reflects the fundamental tension of
          the game: rank-only building gives you flexibility, but zero free cells
          takes it all away. The pre-placed Aces help, but not enough to offset
          the storage disadvantage.
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
              <strong>Build on your pre-placed Aces immediately.</strong> Send Twos
              and Threes to the foundations from the very first move.
            </li>
            <li>
              <strong>Exploit rank-only building.</strong> Any card on any card of the
              next higher rank — use this freedom aggressively.
            </li>
            <li>
              <strong>Create empty columns at all costs.</strong> They are your only
              free cells — protect them fiercely.
            </li>
            <li>
              <strong>Expose low cards early.</strong> Buried Twos and Threes freeze
              entire foundation suits.
            </li>
            <li>
              <strong>Balance foundation progress.</strong> Keep all four suits within
              2-3 ranks of each other.
            </li>
            <li>
              <strong>Build long descending sequences.</strong> Consolidate cards into
              King-down runs to free columns.
            </li>
            <li>
              <strong>Restart hopeless games quickly.</strong> Expect ~30% win rate —
              abandon dead positions early.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/beleaguered-castle/how-to-play" title="How to Play Beleaguered Castle" description="Complete rules, setup, and gameplay mechanics explained step by step." />
            <ContentLinkCard href="/beleaguered-castle" title="Play Beleaguered Castle" description="Put these tips into practice with free online Beleaguered Castle." />
            <ContentLinkCard href="/seahaven/tips" title="Seahaven Towers Tips" description="Tips for Seahaven — another FreeCell variant with unique constraints." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve at Beleaguered Castle is to play. Apply these tips one at a time — start with empty column management and foundation order, then layer in the rest."
          primaryLabel="Play Beleaguered Castle"
          primaryHref="/beleaguered-castle"
          secondaryLabel="Learn the Rules"
          secondaryHref="/beleaguered-castle/how-to-play"
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
          More Beleaguered Castle Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/beleaguered-castle" title="Play Beleaguered Castle" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/beleaguered-castle/how-to-play" title="How to Play Beleaguered Castle" description="Complete rules, setup, and strategy guide" />
          <ContentLinkCard href="/seahaven/tips" title="Seahaven Towers Tips" description="Tips for another FreeCell variant with free cells" />
          <ContentLinkCard href="/eight-off" title="Eight Off Solitaire" description="FreeCell variant with 8 reserve cells and same-suit building" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
