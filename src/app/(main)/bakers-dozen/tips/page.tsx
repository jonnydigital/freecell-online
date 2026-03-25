import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Baker's Dozen Solitaire Tips & Tricks | Win More with 13 Columns",
  description:
    "Boost your Baker's Dozen Solitaire win rate with practical tips on foundation building, column management, Kings-to-bottom strategy, and maintaining access to low cards. ~65-75% winnable.",
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
    title: "Baker's Dozen Solitaire Tips & Tricks | Win More with 13 Columns",
    description:
      "Practical tips to build foundations more effectively in Baker's Dozen. Learn column management, low-card access, and how to achieve the 65-75% win rate.",
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
    question: "What is the most important tip for Baker's Dozen Solitaire?",
    answer:
      "Prioritize uncovering and playing Aces and 2s to the foundations as early as possible. Since you can only move single cards and can't fill empty columns, getting your low cards stuck beneath higher cards is often game-ending. Scan all 13 columns at the start and plan your first several moves around freeing low cards.",
  },
  {
    question: "How often can you win Baker's Dozen Solitaire?",
    answer:
      "Baker's Dozen has a generous win rate of approximately 65-75% with expert play. All 52 cards are visible from the start, giving you complete information to plan with. The Kings-to-bottom setup rule also prevents the worst blocking scenarios. With practice and careful planning, most deals are solvable.",
  },
  {
    question: "Why are Kings moved to the bottom in Baker's Dozen?",
    answer:
      "The Kings-to-bottom rule is Baker's Dozen's signature mechanic. Before play begins, all Kings are pushed to the bottom of their columns. This prevents Kings from permanently blocking access to lower cards, since Kings are the last cards needed on foundations and would otherwise create impassable obstacles.",
  },
  {
    question: "Can I fill empty columns in Baker's Dozen Solitaire?",
    answer:
      "No — empty columns cannot be filled in Baker's Dozen. Once a column is cleared, it's permanently empty. This makes empty columns useless as temporary storage (unlike FreeCell or Flower Garden). Avoid emptying columns unless it's your only path to a needed card, since you lose a workspace.",
  },
  {
    question: "How does Baker's Dozen compare to FreeCell?",
    answer:
      "Baker's Dozen is simpler in some ways (no suit restriction on tableau building) but harder in others (no free cells, no column refilling, single-card moves only). FreeCell has a higher win rate (~82% vs ~70%) and more maneuverability. Baker's Dozen compensates with its Kings-to-bottom rule and the flexibility of any-suit building on the tableau.",
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
        description: "Practical tips for building foundations more effectively in Baker's Dozen Solitaire.",
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
        subtitle="Practical strategies for the 13-column patience game — from foundation building and low-card access to leveraging the Kings-to-bottom rule for a ~70% win rate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Baker's Dozen Solitaire", href: "/bakers-dozen" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">free your Aces and 2s immediately</strong>.
          Baker&apos;s Dozen gives you complete information (all cards face-up) and flexible building (any suit
          on any suit), but single-card-only moves and no empty column refills mean buried low cards are
          deadly. Scan all 13 columns at the start and plan your opening around getting foundations started.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Scan for Aces and 2s First
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making any move in{" "}
          <Link href="/bakers-dozen" className="text-[var(--gold)] hover:text-white transition-colors">
            Baker&apos;s Dozen Solitaire
          </Link>
          , scan all 13 columns to locate every Ace and 2. These are the cards that start your foundation
          piles and enable all future building. An Ace on top of a column should go to the foundation
          immediately. An Ace buried one card deep should be your first priority to uncover.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Plan multi-step uncovering sequences.</strong> If the Ace of
          Spades is beneath a 7, you need somewhere to put that 7. Look for a column with an 8, 9, or 10
          on top (remember: any suit can go on any suit). Each move to uncover a low card is worth multiple
          moves elsewhere.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> If multiple Aces are accessible, play them all to the foundations
            before doing anything else. Then look for 2s. Getting foundations started early opens up
            options throughout the game.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Exploit Any-Suit Building
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike most solitaire games that require alternating colors or same-suit building, Baker&apos;s
          Dozen lets you place any card on any card of the next higher rank, regardless of suit. A 5 of
          Hearts can go on a 6 of any suit. This is enormously flexible.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Use this flexibility to create &ldquo;parking spots&rdquo; for cards you need to move out of
          the way. If you need to uncover an Ace beneath a Jack, you don&apos;t need to find a specific
          red or black Queen — any Queen will do. This dramatically increases your options.
        </p>
        <p className="text-white/70 leading-relaxed">
          However, be strategic about where you park cards. Placing a 5 on a 6 that covers a 3 you need
          soon is counterproductive. Think two or three moves ahead and choose the parking spot that
          blocks the fewest future moves.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Understand the Kings-to-Bottom Rule
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Baker&apos;s Dozen&apos;s signature rule moves all Kings to the bottom of their columns before
          play begins. This is a huge advantage: it means Kings will naturally be the last cards you deal
          with in each column, which is exactly when you need them (Kings are the last rank on foundations).
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Don&apos;t waste moves on Kings.</strong> Since Kings are
          already at the bottom and can only go to foundations when the Q is already there, there&apos;s
          rarely a reason to move a King during normal play. Focus on the cards above them.
        </p>
        <p className="text-white/70 leading-relaxed">
          The Kings-to-bottom rule also means that no column starts with a King on top, so you always have
          at least some cards available to move from the very beginning. Appreciate this advantage — in
          many other solitaire games, a King on top with no empty column is a permanent roadblock.
        </p>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Avoid Creating Empty Columns
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Baker&apos;s Dozen, empty columns cannot be refilled. Once a column is cleared, that space
          is permanently lost. This is the opposite of games like{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/flower-garden" className="text-[var(--gold)] hover:text-white transition-colors">
            Flower Garden
          </Link>
          , where empty spaces are valuable.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Clearing a column means you lose one of your 13 &ldquo;landing pads&rdquo; for rearranging
          cards. With 13 columns and only 4 cards each (after Kings-to-bottom), columns empty out quickly
          if you&apos;re not careful. Try to keep cards distributed across as many columns as possible.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> The only time emptying a column is acceptable is when every card
            from that column goes directly to a foundation or is part of a sequence that frees a critical
            blocked card elsewhere.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Build Foundations Evenly
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Resist the temptation to rush one foundation pile far ahead of the others. If your Spade
          foundation is at 8 while the others are at 2 or 3, you&apos;ve likely buried cards that the
          other foundations need. Even building keeps all four foundations advancing together and prevents
          bottlenecks.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          A good rule of thumb: don&apos;t advance any foundation more than 2-3 ranks ahead of the
          lowest foundation. If the lowest is at 3, the highest should be at 6 or below. This keeps
          options open and prevents situations where you need a card that&apos;s already buried on
          another foundation.
        </p>
        <p className="text-white/70 leading-relaxed">
          That said, if playing a card to the foundation frees a critical card beneath it, do it regardless
          of how far ahead that foundation gets. Context always trumps rules of thumb.
        </p>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Plan Several Moves Ahead
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          With all 52 cards visible from the start, Baker&apos;s Dozen is a pure information game.
          There&apos;s nothing hidden, no stock to draw from, no randomness after the initial deal.
          This means every game is either solvable or it isn&apos;t, and planning ahead is the only
          way to determine which.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before each move, trace the consequences forward: &ldquo;If I move this 7 onto that 8, it
          exposes the 4 beneath it. The 4 goes to the foundation, which then lets me play the 5 from
          column 9...&rdquo; The best Baker&apos;s Dozen players think 4-6 moves deep.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Use undo liberally to test different move sequences. Baker&apos;s
            Dozen&apos;s deterministic nature means you can always backtrack and try a different approach
            without losing information.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Keep Columns Tall
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Since empty columns are useless in Baker&apos;s Dozen, tall columns are actually advantageous.
          A column with 6 or 7 cards means more potential destinations for cards you need to move. Think
          of each column as a stack of landing pads — the more pads, the more flexibility you have.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When you have a choice between two columns for placing a card, prefer the one that&apos;s shorter
          (to balance things out) unless the taller column has a more favorable top card for future building.
          The goal is to keep as many active columns as possible for as long as possible.
        </p>
        <p className="text-white/70 leading-relaxed">
          This is the opposite of most solitaire games where you&apos;re trying to clear columns. In
          Baker&apos;s Dozen, think of it as &ldquo;column conservation&rdquo; — every column you keep
          alive is one more option for rearranging cards.
        </p>
      </section>

      {/* Win rate context */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          A Forgiving Game That Rewards Patience
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Baker&apos;s Dozen is one of the more winnable solitaire variants, with roughly 65-75% of deals
          being solvable with expert play. The combination of all cards visible, any-suit building, and
          the Kings-to-bottom rule makes it considerably more forgiving than games like{" "}
          <Link href="/cruel" className="text-[var(--gold)] hover:text-white transition-colors">
            Cruel Solitaire
          </Link>{" "}
          (~25%) or{" "}
          <Link href="/accordion" className="text-[var(--gold)] hover:text-white transition-colors">
            Accordion
          </Link>{" "}
          (~2%).
        </p>
        <p className="text-white/70 leading-relaxed">
          This makes Baker&apos;s Dozen an excellent game for developing planning skills. The full
          visibility means you can always analyze what went wrong after a loss, and the high win rate
          means your improvements show up in your results quickly. It&apos;s a game that rewards
          patience and methodical thinking above all else.
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
              <strong>Free Aces and 2s first.</strong> Getting foundations started early is the top
              priority every game.
            </li>
            <li>
              <strong>Use any-suit building flexibly.</strong> Park cards on any column with the right
              rank — no color restrictions.
            </li>
            <li>
              <strong>Ignore Kings until late.</strong> They&apos;re at the bottom already — focus on
              the cards above them.
            </li>
            <li>
              <strong>Don&apos;t empty columns.</strong> Empty columns can&apos;t be refilled and are
              permanently wasted space.
            </li>
            <li>
              <strong>Build foundations evenly.</strong> Keep all four within 2-3 ranks of each other.
            </li>
            <li>
              <strong>Plan ahead.</strong> All cards are visible — think 4-6 moves deep before committing.
            </li>
            <li>
              <strong>Keep columns alive.</strong> More active columns means more flexibility for
              rearranging cards.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/bakers-dozen/how-to-play" title="How to Play Baker's Dozen" description="Complete rules, setup, and card mechanics explained." />
            <ContentLinkCard href="/bakers-dozen" title="Play Baker's Dozen" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. With a ~70% win rate, most deals are solvable — apply these tips and watch your results climb."
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
          <ContentLinkCard href="/bakers-dozen/how-to-play" title="How to Play Baker's Dozen" description="Complete rules, setup, and strategy explained" />
          <ContentLinkCard href="/flower-garden/tips" title="Flower Garden Tips" description="Tips for another no-stock patience game" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
