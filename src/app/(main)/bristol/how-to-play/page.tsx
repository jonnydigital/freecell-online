import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "How to Play Bristol Solitaire | Rules & Complete Guide",
  description:
    "Learn how to play Bristol Solitaire with complete rules, fan building, stock dealing, reserve piles, foundation building, Kings restriction, and winning strategies for this classic patience game.",
  keywords: [
    "bristol solitaire rules",
    "how to play bristol solitaire",
    "bristol solitaire strategy",
    "bristol solitaire instructions",
    "bristol solitaire guide",
    "bristol solitaire tips",
    "bristol card game rules",
    "bristol solitaire fans",
    "bristol solitaire reserve piles",
    "bristol solitaire kings",
    "bristol solitaire foundations",
  ],
  openGraph: {
    title: "How to Play Bristol Solitaire | Rules & Complete Guide",
    description:
      "Complete rules, fan building, reserve piles, and strategy for Bristol Solitaire. Learn the Kings restriction, stock dealing, and how to build foundations A to K by suit.",
    url: absoluteUrl("/bristol/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  alternates: {
    canonical: absoluteUrl("/bristol/how-to-play"),
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What makes Bristol Solitaire different from other solitaire games?",
    answer:
      "Bristol Solitaire is unique because tableau building ignores suit and color entirely — you can place any card on any other card as long as it is one rank lower. This makes building sequences much more flexible than games like FreeCell or Klondike. However, Bristol offsets this freedom with a strict Kings restriction: Kings cannot be placed in empty fans, which limits your maneuvering space significantly.",
  },
  {
    question: "Can I move Kings to empty fans in Bristol Solitaire?",
    answer:
      "No. In Bristol Solitaire, Kings cannot be placed in empty fan columns. This is one of the game's defining restrictions. Empty fans can only receive cards ranked Queen or lower. This means you should avoid creating empty fans unless you have a non-King card ready to fill them, and you should try to move Kings to foundations as soon as possible.",
  },
  {
    question: "How does the stock work in Bristol Solitaire?",
    answer:
      "The stock contains the 28 cards not dealt to the fans. When you draw from the stock, 3 cards are dealt face-up — one to each of the 3 reserve piles. Only the top card of each reserve pile is available for play. There is no redeal: once all stock cards have been dealt to the reserves, those are your only remaining resources beyond the fans.",
  },
  {
    question: "Can I move cards between reserve piles?",
    answer:
      "No. Cards in the reserve piles cannot be moved to other reserve piles or to the fans. Reserve pile cards can only be moved to foundations. This makes reserve pile management critical — once a card is buried in a reserve pile, you must play everything above it to foundations before you can access it.",
  },
  {
    question: "What is the win rate for Bristol Solitaire?",
    answer:
      "Bristol Solitaire has an estimated win rate of approximately 5-10% with skilled play. The game is moderately difficult — more forgiving than Accordion or La Belle Lucie but harder than FreeCell or Klondike. The flexible any-suit building rule helps, but the Kings restriction and limited reserve pile access create significant strategic challenges.",
  },
  {
    question: "Is Bristol Solitaire harder than FreeCell?",
    answer:
      "Yes, Bristol is generally harder than FreeCell. FreeCell has a win rate of approximately 82% with skilled play, while Bristol sits around 5-10%. The key difference is that FreeCell gives you 4 free cells for temporary storage and lets you see all cards from the start, while Bristol has hidden information in the stock and more restrictive movement rules for reserve piles.",
  },
  {
    question: "Can I build in any suit on the tableau in Bristol Solitaire?",
    answer:
      "Yes. Unlike FreeCell (alternating colors) or Klondike (alternating colors), Bristol Solitaire allows you to build descending sequences regardless of suit or color. A red 5 can go on a red 6, a black 7 on a black 8, or any other combination. Only the rank matters — each card must be exactly one rank lower than the card beneath it.",
  },
];

export default function BristolHowToPlayPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Bristol Solitaire", item: absoluteUrl("/bristol") },
          { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/bristol/how-to-play") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "How to Play Bristol Solitaire — Rules & Complete Guide",
        description: "Learn the complete rules, fan building, reserve piles, and winning strategies for Bristol Solitaire.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-26",
        dateModified: "2026-03-26",
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
        title="How to Play Bristol Solitaire"
        kicker={<><Link href="/bristol" className="hover:text-white transition-colors">Bristol Solitaire</Link> / How to Play</>}
        subtitle="Complete rules for Bristol Solitaire — 8 fans of 3 cards, a stock dealt 3 at a time into reserve piles, any-suit tableau building, and the crucial Kings restriction that defines the game."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Bristol Solitaire", href: "/bristol" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          Bristol Solitaire uses a standard 52-card deck. <strong className="text-white">24 cards are dealt into 8 fans of 3 cards each</strong>,
          all face-up. The remaining 28 cards form the stock, which is dealt 3 at a time into 3 reserve piles.
          Build 4 foundations from Ace to King by suit. Tableau fans build down by rank in <strong className="text-white">any suit</strong> — but
          Kings cannot be placed in empty fans. Only the top card of each fan and each reserve pile is playable.
        </p>
      </div>

      {/* Setup */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Setup & Deal
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bristol Solitaire begins with a specific deal that creates 8 short columns called &ldquo;fans.&rdquo;
          Understanding the layout is essential before learning the movement rules.
        </p>
        <ol className="list-decimal pl-6 space-y-3 text-white/70 mb-4">
          <li>Use a standard <strong className="text-white/90">52-card deck</strong>.</li>
          <li>Deal <strong className="text-white/90">24 cards</strong> into <strong className="text-white/90">8 fans</strong> (columns) of 3 cards each, all face-up.</li>
          <li>The remaining <strong className="text-white/90">28 cards</strong> form the <strong className="text-white/90">stock</strong> (draw pile).</li>
          <li>Create <strong className="text-white/90">3 empty reserve piles</strong> next to the stock.</li>
          <li>Create <strong className="text-white/90">4 empty foundation piles</strong> — these will build up from Ace to King by suit.</li>
        </ol>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before making any moves, scan all 8 fans for Aces and low cards.
            Identifying which foundations you can start building immediately gives you a roadmap for your
            first few moves.
          </p>
        </div>
      </section>

      {/* Objective */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Objective
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Move all 52 cards to the 4 foundation piles. Each foundation builds from <strong className="text-white/90">Ace up to King</strong>,
          following suit. For example, the Hearts foundation must be built A&#9829;, 2&#9829;, 3&#9829;,
          all the way up to K&#9829;. When all four foundations are complete (13 cards each), you win.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Unlike some solitaire games where partial completion counts as
            a partial win, Bristol Solitaire is all-or-nothing. All 52 cards must reach the foundations.
            Every card left in a fan or reserve pile at the end is a loss.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Rules — Fan Building */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Rules: Fan Building
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The 8 fans are the primary workspace in Bristol Solitaire. Understanding how they work is the
          foundation of all strategy in this game.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Descending rank, any suit.</strong> You can place any card on
            any other card that is exactly one rank higher. A 7 can go on any 8, a Jack on any Queen,
            regardless of suit or color.
          </li>
          <li>
            <strong className="text-white/90">Top card only.</strong> Only the top (last dealt or most
            recently placed) card of each fan is available for play. Cards beneath it are blocked until
            it moves.
          </li>
          <li>
            <strong className="text-white/90">One card at a time.</strong> You cannot move sequences of
            cards. Even if a fan has a perfect descending run, you must move each card individually.
          </li>
          <li>
            <strong className="text-white/90">Empty fans are limited.</strong> When a fan becomes empty,
            any card <em>except</em> a King can be placed there. This is the critical Kings restriction
            that defines Bristol Solitaire.
          </li>
        </ul>
        <p className="text-white/70 leading-relaxed">
          The any-suit building rule makes Bristol more flexible than{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          , where you must alternate colors. In Bristol, a red 5 can go on a red 6, a black 3 on a black 4 —
          any combination works as long as the rank descends by one.
        </p>
      </section>

      {/* Rules — Stock Dealing */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Rules: Stock Dealing & Reserve Piles
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The stock mechanism in Bristol Solitaire is distinctive. Rather than drawing cards one at a time
          to a single waste pile, you deal 3 cards simultaneously into 3 separate reserve piles.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Deal 3 at a time.</strong> Each stock draw places one card
            face-up on each of the 3 reserve piles simultaneously.
          </li>
          <li>
            <strong className="text-white/90">Top card only.</strong> Only the top card of each reserve
            pile is available for play at any time.
          </li>
          <li>
            <strong className="text-white/90">Foundations only.</strong> Reserve pile cards can only be
            moved to foundations — they cannot be moved to fans or to other reserve piles.
          </li>
          <li>
            <strong className="text-white/90">No redeal.</strong> Once all 28 stock cards have been dealt
            (approximately 9 deals of 3, with 1 remaining card on the final deal), the stock is exhausted.
            There is no reshuffling or redeal.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before dealing from the stock, play every possible card to foundations
            first. Each foundation card you play might uncover or enable another move. Dealing too early
            buries cards in reserve piles where they&apos;re harder to access.
          </p>
        </div>
      </section>

      {/* Rules — Foundation Building */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Rules: Foundation Building
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Foundations are the destination for all 52 cards. Each foundation is dedicated to a single suit
          and builds in ascending order from Ace to King.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Ace starts each foundation.</strong> The first card played
            to each foundation must be an Ace. This creates the foundation for that suit.
          </li>
          <li>
            <strong className="text-white/90">Build A, 2, 3 ... Q, K.</strong> Each subsequent card must
            be the next rank in the same suit. No skipping, no mixing suits.
          </li>
          <li>
            <strong className="text-white/90">Cards from fans or reserves.</strong> Foundation cards can
            come from the top of any fan or the top of any reserve pile.
          </li>
          <li>
            <strong className="text-white/90">Permanent placement.</strong> Once a card is placed on a
            foundation, it cannot be removed. Foundation progress is irreversible.
          </li>
        </ul>
        <p className="text-white/70 leading-relaxed">
          Always play cards to foundations when possible. Foundation progress is permanent, reduces
          clutter in the fans and reserves, and can unlock cards that were previously blocked.
        </p>
      </section>

      {/* Rules — Kings Restriction */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Rules: The Kings Restriction
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          This is the rule that makes Bristol Solitaire uniquely challenging. In many solitaire games,
          Kings fill empty columns freely. In Bristol, <strong className="text-white/90">Kings cannot be
          placed in empty fans</strong>. This single restriction fundamentally changes the strategy.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The consequences are significant:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Kings block empty fans.</strong> If a King is the top card
            of a fan, you cannot move it to an empty fan — it can only go to a foundation (if that
            foundation has built up to Queen).
          </li>
          <li>
            <strong className="text-white/90">Empty fans are precious.</strong> Since Kings can&apos;t fill
            them, empty fans serve as temporary storage for non-King cards only. Use them wisely.
          </li>
          <li>
            <strong className="text-white/90">Plan for Kings early.</strong> Identify where your Kings are
            in the initial deal. Kings sitting on top of fans are obstacles that can only be resolved by
            building their suit&apos;s foundation all the way up to Queen first.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> The Kings restriction means you should prioritize building
            foundations in suits where the King is blocking important cards. Getting a King to its
            foundation frees up the fan it was occupying and removes a persistent obstacle.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Strategy Overview */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Strategy Overview
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bristol Solitaire rewards careful planning and patience. The any-suit building rule gives you
          flexibility, but the Kings restriction and limited reserve access demand disciplined play. Here
          are the core strategic principles:
        </p>
        <div className="space-y-4 text-white/70">
          <div>
            <h3 className="font-semibold text-white/90 mb-1">1. Play to Foundations First</h3>
            <p>
              Before every other action, check if any available card can go to a foundation. Foundation
              progress is permanent, removes cards from play, and can trigger chain reactions as blocked
              cards become available.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white/90 mb-1">2. Manage Empty Fans Carefully</h3>
            <p>
              Empty fans are your most valuable resource — they&apos;re temporary holding spaces for
              cards you need to move around. Don&apos;t fill them casually. Use them only when the move
              directly advances your position, and remember that Kings can never go there.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white/90 mb-1">3. Delay Stock Dealing</h3>
            <p>
              Every stock deal adds 3 cards to reserve piles where only the top card is accessible. Exhaust
              all productive fan moves and foundation plays before dealing. Premature dealing buries useful
              cards under inaccessible ones.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white/90 mb-1">4. Watch the Reserve Piles</h3>
            <p>
              Since reserve cards can only go to foundations, you need to build foundations in the right
              order to uncover buried reserve cards. If a critical Ace or 2 is buried under several cards
              in a reserve pile, focus on clearing those cards to foundations first.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white/90 mb-1">5. Avoid Burying Low Cards</h3>
            <p>
              Aces and 2s trapped under higher cards in fans or reserves stall the entire game. Keep low
              cards accessible and play them to foundations as soon as possible. A blocked Ace means an
              entire suit&apos;s foundation cannot begin.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white/90 mb-1">6. Use Undo to Explore</h3>
            <p>
              Bristol Solitaire benefits from experimentation. Try different move sequences and stock
              dealing timings. The undo feature lets you explore without consequences — use it liberally
              to find the optimal path through each deal.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Comparison: Bristol vs FreeCell vs Accordion vs Klondike
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white/70 border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="py-3 pr-4 text-white/90">Feature</th>
                <th className="py-3 pr-4 text-white/90">Bristol</th>
                <th className="py-3 pr-4 text-white/90">FreeCell</th>
                <th className="py-3 pr-4 text-white/90">Accordion</th>
                <th className="py-3 text-white/90">Klondike</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-2.5 pr-4 font-medium">Layout</td>
                <td className="py-2.5 pr-4">8 fans of 3</td>
                <td className="py-2.5 pr-4">8 columns</td>
                <td className="py-2.5 pr-4">Single row</td>
                <td className="py-2.5">7 columns</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 pr-4 font-medium">Building rule</td>
                <td className="py-2.5 pr-4">Any suit, descending</td>
                <td className="py-2.5 pr-4">Alternating color</td>
                <td className="py-2.5 pr-4">Rank or suit match</td>
                <td className="py-2.5">Alternating color</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 pr-4 font-medium">Foundations</td>
                <td className="py-2.5 pr-4">4 (A&rarr;K by suit)</td>
                <td className="py-2.5 pr-4">4 (A&rarr;K by suit)</td>
                <td className="py-2.5 pr-4">None</td>
                <td className="py-2.5">4 (A&rarr;K by suit)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 pr-4 font-medium">Temporary storage</td>
                <td className="py-2.5 pr-4">3 reserve piles</td>
                <td className="py-2.5 pr-4">4 free cells</td>
                <td className="py-2.5 pr-4">None</td>
                <td className="py-2.5">Waste pile</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 pr-4 font-medium">Kings in empty columns</td>
                <td className="py-2.5 pr-4">Not allowed</td>
                <td className="py-2.5 pr-4">Allowed</td>
                <td className="py-2.5 pr-4">N/A</td>
                <td className="py-2.5">Only Kings</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">Win rate</td>
                <td className="py-2.5 pr-4">~5-10%</td>
                <td className="py-2.5 pr-4">~82%</td>
                <td className="py-2.5 pr-4">~1-2%</td>
                <td className="py-2.5">~80%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick reference cheat sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Bristol Solitaire Rules
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Deal 24 cards into 8 fans of 3.</strong> All cards face-up. Remaining 28 form the stock.
            </li>
            <li>
              <strong>Build fans descending, any suit.</strong> A 7 goes on any 8, a Queen on any King.
            </li>
            <li>
              <strong>Kings cannot fill empty fans.</strong> Only non-King cards can occupy empty fan slots.
            </li>
            <li>
              <strong>Deal stock 3 at a time.</strong> One card to each of the 3 reserve piles.
            </li>
            <li>
              <strong>Reserve cards go to foundations only.</strong> No moving reserves to fans or other reserves.
            </li>
            <li>
              <strong>Build foundations A&rarr;K by suit.</strong> Move all 52 cards to foundations to win.
            </li>
            <li>
              <strong>No redeal.</strong> Once the stock is exhausted, play with what remains.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/bristol" title="Play Bristol Solitaire" description="Put these rules into practice online for free." />
            <ContentLinkCard href="/bakers-dozen/how-to-play" title="Baker's Dozen Rules" description="Another fan-based solitaire with Kings buried to the bottom." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Play Bristol Solitaire?"
          body="Now that you know the rules, put them into practice. Build fans, manage reserves, and navigate the Kings restriction to clear all four foundations."
          primaryLabel="Play Bristol Solitaire"
          primaryHref="/bristol"
          secondaryLabel="All Solitaire Games"
          secondaryHref="/solitaire-types"
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
          More Bristol Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/bristol" title="Play Bristol Solitaire" description="Put these rules into practice online for free" />
          <ContentLinkCard href="/bakers-dozen" title="Baker's Dozen Solitaire" description="Another fan-based game with Kings sent to the bottom" />
          <ContentLinkCard href="/beleaguered-castle/how-to-play" title="Beleaguered Castle Rules" description="No-suit building with all cards visible from the start" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
