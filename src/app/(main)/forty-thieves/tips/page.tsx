import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Forty Thieves Solitaire Tips & Strategy | Win the Hardest Solitaire",
  description:
    "8 practical tips to beat Forty Thieves Solitaire. Master empty column strategy, same-suit building discipline, stock management, and ace priorities to boost your ~10% win rate.",
  keywords: [
    "forty thieves tips",
    "forty thieves strategy",
    "forty thieves solitaire tips",
    "forty thieves solitaire strategy",
    "how to win forty thieves",
    "forty thieves solitaire tricks",
    "forty thieves help",
    "forty thieves solitaire winning tips",
    "forty thieves card game strategy",
    "tips for forty thieves solitaire",
    "forty thieves advice",
  ],
  openGraph: {
    title: "Forty Thieves Solitaire Tips & Strategy | Win the Hardest Solitaire",
    description:
      "8 practical tips to beat Forty Thieves Solitaire. Master empty columns, stock management, and same-suit building to win more games.",
    url: absoluteUrl("/forty-thieves/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Forty Thieves Solitaire?",
    answer:
      "The best strategy revolves around three priorities: (1) move Aces and Twos to the foundations immediately, (2) create and protect empty tableau columns as working space, and (3) manage the stock pile carefully since there is no recycling. Every move should be evaluated against these priorities. Empty columns are your most powerful tool — they let you temporarily park cards while rearranging sequences.",
  },
  {
    question: "How do you win Forty Thieves Solitaire?",
    answer:
      "Winning Forty Thieves requires patience, planning, and a bit of luck. Focus on clearing Aces and low cards to the foundations early. Create empty columns by consolidating cards into same-suit sequences. Use the stock pile strategically — don't just flip through it mindlessly. Avoid burying important cards under others. Accept that many deals are unwinnable and restart early when you recognize a dead end.",
  },
  {
    question: "What is the win rate for Forty Thieves?",
    answer:
      "Forty Thieves has one of the lowest win rates of any mainstream solitaire game — roughly 10% with skilled play, and often below 5% for casual players. This makes it significantly harder than Klondike (~30-40%), FreeCell (~82%), or Spider 1-suit (~80%). The combination of same-suit building, single card moves, and no stock recycling creates an extremely challenging game.",
  },
  {
    question: "Can you move groups of cards in Forty Thieves?",
    answer:
      "No. In standard Forty Thieves rules, you can only move one card at a time. This is one of the game's defining constraints and a major reason it is so difficult. To move a sequence of cards, you need enough empty columns to temporarily hold each card individually. This makes empty columns extremely valuable — they function like the free cells in FreeCell.",
  },
  {
    question: "Is Forty Thieves harder than Spider Solitaire?",
    answer:
      "Yes, Forty Thieves is generally considered harder than Spider Solitaire. While 4-suit Spider is extremely challenging (~5% win rate), standard Spider with 1 or 2 suits is much more forgiving. Forty Thieves has a roughly 10% win rate with expert play, and its single-card-move restriction combined with no stock recycling makes it one of the hardest solitaire variants in common play.",
  },
];

export default function FortyThievesTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Forty Thieves Solitaire", item: absoluteUrl("/forty-thieves") },
          { "@type": "ListItem", position: 3, name: "Tips & Strategy", item: absoluteUrl("/forty-thieves/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Forty Thieves Solitaire Tips & Strategy",
        description: "8 practical tips for winning more Forty Thieves Solitaire games — one of the hardest patience games ever devised.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-22",
        dateModified: "2026-03-22",
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
        title="Forty Thieves Solitaire Tips & Strategy"
        kicker={<><Link href="/forty-thieves" className="hover:text-white transition-colors">Forty Thieves Solitaire</Link> / Tips</>}
        subtitle="Practical advice to beat one of the hardest solitaire games ever made. From empty column strategy to stock management — everything you need to push your win rate above 10%."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Forty Thieves", href: "/forty-thieves" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">protect your empty columns</strong>.
          Forty Thieves is won or lost based on how well you create and use empty tableau
          columns. Since you can only move one card at a time, empty columns are your only
          way to rearrange the board. Every decision should be filtered through one
          question: &ldquo;Does this move help me get or keep an empty column?&rdquo;
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Move Aces and Twos to Foundations Immediately
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/forty-thieves" className="text-[var(--gold)] hover:text-white transition-colors">
            Forty Thieves Solitaire
          </Link>
          , Aces and Twos should go to the foundations the moment they become available.
          There is never a strategic reason to keep an Ace or a Two on the tableau. They
          cannot be built upon in any useful way, and every Ace on the tableau is a wasted
          card taking up valuable space.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          With two decks in play, you have eight Aces and eight Twos to find. Getting these
          16 cards to the foundations early clears space on the tableau and gives you room
          to work. Pay special attention to Aces that are buried under other cards — you
          need a plan to uncover them.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Scan for Aces at the start.</strong> Before
            making any moves, locate all visible Aces and plan how to reach buried ones.
          </li>
          <li>
            <strong className="text-white/90">Prioritize uncovering buried Aces.</strong> If
            an Ace is the second or third card in a column, focus on clearing the cards above it.
          </li>
          <li>
            <strong className="text-white/90">Move Twos right after Aces.</strong> Once an
            Ace is on the foundation, the matching Two should follow immediately.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Remember that Forty Thieves has duplicate suits.
            Both Ace of Spades cards need their own foundation pile. Track which suit
            piles already have an Ace and which still need one.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Create Empty Columns — They&apos;re Your Free Cells
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Empty tableau columns are the single most powerful resource in Forty Thieves.
          Since you can only move one card at a time, empty columns serve the same role
          as free cells in{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          {" "}&mdash; they give you temporary storage to rearrange sequences.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          To move a sequence of 3 cards from one column to another, you need 2 empty
          columns as temporary holding spots. To move 4 cards, you need 3 empty columns.
          The formula is simple: <strong className="text-white/90">you need N-1 empty
          columns to move N cards</strong>.
        </p>
        <p className="text-white/70 leading-relaxed">
          Creating your first empty column is the hardest part. Look for columns with
          only 1 or 2 cards and concentrate your early moves on clearing them. Once you
          have one empty column, use it to create a second, then a third. Momentum builds
          as your working space grows.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Same-Suit Building Discipline
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          or FreeCell where you build with alternating colors, Forty Thieves requires
          same-suit building on the tableau. A 9 of Hearts can only go on a 10 of
          Hearts — not a 10 of Diamonds. This restriction dramatically reduces your
          available moves at any point.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Build same-suit sequences whenever possible, even when it means passing up
          a move that looks convenient. A well-built same-suit run of 5-6 cards can
          be moved to the foundations in sequence, rapidly clearing space. A mixed pile
          that happens to be in descending order is useless — the cards still need to
          be separated by suit eventually.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Never mix suits on a column</strong> unless
            there is absolutely no alternative.
          </li>
          <li>
            <strong className="text-white/90">Consolidate matching suits.</strong> If you
            have a 7 of Clubs on one column and a 6 of Clubs available, bring them together.
          </li>
          <li>
            <strong className="text-white/90">Think ahead by suit.</strong> Track where
            the matching suit cards are for any sequence you are building.
          </li>
        </ul>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Manage the Stock Pile — No Recycling Allowed
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The stock pile in Forty Thieves contains 64 cards — more than half the deck.
          You draw one card at a time to the waste pile, and critically, <strong className="text-white/90">there
          is no recycling</strong>. Once you&apos;ve flipped through all 64 cards, those that
          remain in the waste pile are gone for good.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This no-recycling rule is what makes stock management in Forty Thieves so
          critical. In{" "}
          <Link href="/canfield" className="text-[var(--gold)] hover:text-white transition-colors">
            Canfield
          </Link>{" "}
          or Klondike, you can cycle through the stock multiple times. Here, every draw
          matters.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Don&apos;t draw until you must.</strong> Exhaust
            all useful tableau moves before touching the stock.
          </li>
          <li>
            <strong className="text-white/90">Play stock cards immediately if possible.</strong> When
            a drawn card can go to a foundation or extend a useful tableau sequence, play it
            rather than letting it pile up in the waste.
          </li>
          <li>
            <strong className="text-white/90">Watch the waste pile.</strong> Cards drawn to
            the waste that you can&apos;t immediately play may bury cards you need later.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> The waste pile in Forty Thieves is effectively
            a last-in-first-out stack. If you draw a card you need but can&apos;t play yet,
            it gets buried by the next draw. Time your draws carefully.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Don&apos;t Bury Key Cards
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          One of the most common mistakes in Forty Thieves is placing a card on top of
          another card that you&apos;ll need soon. Because you can only move one card at a
          time and the stock doesn&apos;t recycle, burying the wrong card can make the
          game unwinnable.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making any move, check: will this card block something I need? If you
          place a 7 of Spades on an 8 of Spades, but the Ace of Spades is underneath
          that 8, you&apos;ve just made the Ace even harder to reach. Think vertically
          through each column before adding to it.
        </p>
        <p className="text-white/70 leading-relaxed">
          Pay special attention to cards ranked 3-6. These &ldquo;middle cards&rdquo; are
          often the ones that create logjams. Aces and Twos should go straight to
          foundations. Kings and Queens are less problematic because they sit at the top
          of tableau sequences. But middle-ranked cards can easily trap important cards
          below them.
        </p>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Fill Empty Columns with Kings
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          When you create an empty column, be intentional about what goes into it.
          Any card can fill an empty column in Forty Thieves, but Kings are the ideal
          choice. A King placed in an empty column becomes the start of a potential
          13-card same-suit sequence from King to Ace.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          If you place a non-King card in an empty column, you can still build down on
          it, but the sequence will be shorter and less useful. More importantly, that
          column can never hold a King at its base unless you clear it again — wasting
          the empty column you worked so hard to create.
        </p>
        <p className="text-white/70 leading-relaxed">
          The exception is when you need temporary storage. Using an empty column to
          park a card briefly while rearranging other cards is perfectly valid. Just
          make sure you clear it out again quickly so the column stays available for
          productive use.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Plan Multiple Moves Ahead
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Forty Thieves punishes impulsive play more than almost any other solitaire
          game. Every move has consequences that ripple forward, and since you can&apos;t
          recycle the stock, mistakes are permanent. Before making a move, think 3-5
          moves ahead.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Ask yourself these questions before every move:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">What does this move unlock?</strong> Does it
            reveal a useful card, create an empty column, or extend a foundation sequence?
          </li>
          <li>
            <strong className="text-white/90">What does this move block?</strong> Am I
            burying a card I&apos;ll need, or closing off a column I was building?
          </li>
          <li>
            <strong className="text-white/90">Is there a better order?</strong> Can I achieve
            the same result by moving cards in a different sequence that keeps more options open?
          </li>
          <li>
            <strong className="text-white/90">Am I using undo effectively?</strong> If a
            move doesn&apos;t work out, undo it and try a different approach. Use undo to explore
            possibilities without committing.
          </li>
        </ul>
      </section>

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Know When a Game Is Lost
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Forty Thieves has one of the lowest win rates of any solitaire game. Many
          deals are simply unwinnable regardless of how well you play. Recognizing a
          lost game early saves time and frustration.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Signs that a game is probably unwinnable:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            All 10 tableau columns are full with no valid moves between them
          </li>
          <li>
            The stock is exhausted and the waste pile has cards you need buried deep
          </li>
          <li>
            Key Aces or Twos are buried under long columns with no way to reach them
          </li>
          <li>
            You have no empty columns and no way to create one
          </li>
          <li>
            Same-suit cards are interleaved across columns, making consolidation impossible
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t feel bad about restarting.</strong> Expert Forty Thieves
            players expect to lose 90% of their games. Starting a fresh deal and
            applying these tips to a better layout is far smarter than grinding
            away at an impossible one. The game is called &ldquo;Forty Thieves&rdquo;
            because it steals your chances — that&apos;s the design.
          </p>
        </div>
      </section>

      {/* Forty Thieves vs Spider */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Forty Thieves vs Spider: Key Differences
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Many players compare Forty Thieves to{" "}
          <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider Solitaire
          </Link>{" "}
          since both use multiple decks and same-suit building. But the games play
          very differently and require distinct strategies.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Feature</span>
            <span>Spider</span>
            <span>Forty Thieves</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Card moves</span>
            <span>Group moves allowed</span>
            <span className="text-[var(--gold)]">Single card only</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Tableau building</span>
            <span>Any suit (penalties)</span>
            <span className="text-[var(--gold)]">Same suit only</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Stock dealing</span>
            <span>10 cards at once</span>
            <span className="text-[var(--gold)]">1 card to waste</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Stock recycling</span>
            <span>Not applicable</span>
            <span className="text-[var(--gold)]">No recycling</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3">
            <span>Win rate</span>
            <span>~80% (1-suit)</span>
            <span className="text-[var(--gold)]">~10%</span>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          The single-card-move restriction is the biggest difference. In Spider, you can
          move entire same-suit sequences at once. In Forty Thieves, every card moves
          individually, making empty columns essential as temporary storage.
        </p>
      </section>

      {/* Win rate expectations */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          What Win Rate Should You Expect?
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Forty Thieves is one of the hardest solitaire games in common play. It was
          reportedly a favorite of Napoleon during his exile at St Helena, and its
          difficulty has humbled card players ever since. Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (where nearly every deal is solvable) or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          (where thoughtful play gets you 30-40%), Forty Thieves is designed to be
          nearly impossible.
        </p>
        <div className="overflow-x-auto mb-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
              <span>Skill Level</span>
              <span>Win Rate</span>
              <span>Notes</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>Beginner</span>
              <span>1–3%</span>
              <span className="text-white/50">Learning the same-suit constraint</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>Intermediate</span>
              <span>5–8%</span>
              <span className="text-amber-400">Empty column strategy + stock discipline</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3">
              <span>Expert</span>
              <span>10–15%</span>
              <span className="text-emerald-400">Full forward planning + undo exploration</span>
            </div>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          If you&apos;re consistently below 3%, focus on Tips #1 and #2 — getting Aces to
          foundations and creating empty columns. If you&apos;re in the 5-8% range, Tips
          #4 and #7 (stock management and forward planning) will push you higher.
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
              <strong>Move Aces and Twos to foundations immediately.</strong> They have
              no useful role on the tableau.
            </li>
            <li>
              <strong>Create empty columns.</strong> They are your free cells — N-1 empty
              columns lets you move N cards.
            </li>
            <li>
              <strong>Build same-suit sequences only.</strong> Never mix suits on a column
              unless absolutely forced.
            </li>
            <li>
              <strong>Manage the stock carefully.</strong> No recycling means every draw
              is permanent.
            </li>
            <li>
              <strong>Don&apos;t bury key cards.</strong> Think vertically through each column
              before adding to it.
            </li>
            <li>
              <strong>Fill empty columns with Kings.</strong> Kings start the longest
              possible sequences.
            </li>
            <li>
              <strong>Plan 3-5 moves ahead.</strong> Use undo to explore possibilities
              before committing.
            </li>
            <li>
              <strong>Restart unwinnable games.</strong> Expect to lose 90% of games —
              that&apos;s normal.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/forty-thieves/how-to-play" title="How to Play Forty Thieves" description="Complete rules, setup, and foundation mechanics explained." />
            <ContentLinkCard href="/forty-thieves" title="Play Forty Thieves" description="Put these tips into practice with free online Forty Thieves." />
            <ContentLinkCard href="/spider/tips" title="Spider Solitaire Tips" description="Tips for Spider — another multi-deck solitaire challenge." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Apply these tips one at a time and watch your win rate climb — from 3% to 5% to maybe even 10%."
          primaryLabel="Play Forty Thieves"
          primaryHref="/forty-thieves"
          secondaryLabel="Learn the Rules"
          secondaryHref="/forty-thieves/how-to-play"
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
          More Forty Thieves Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/forty-thieves" title="Play Forty Thieves" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/forty-thieves/how-to-play" title="How to Play Forty Thieves" description="Complete rules, setup, and strategy guide" />
          <ContentLinkCard href="/spider/tips" title="Spider Solitaire Tips" description="Tips for another challenging multi-deck game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/canfield/tips" title="Canfield Solitaire Tips" description="Tips for the casino's favorite solitaire" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
