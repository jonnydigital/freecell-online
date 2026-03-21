import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Canfield Solitaire Tips & Tricks | Beat the Casino's Favorite",
  description:
    "Practical Canfield Solitaire tips to boost your win rate. Learn reserve pile management, foundation base rank strategy, stock cycling discipline, and when to restart.",
  keywords: [
    "canfield solitaire tips",
    "canfield solitaire strategy",
    "canfield card game tips",
    "canfield solitaire tricks",
    "how to win canfield solitaire",
    "canfield solitaire help",
    "canfield solitaire winning tips",
    "canfield solitaire beginner tips",
    "tips for canfield solitaire",
    "canfield solitaire advice",
    "win canfield solitaire more often",
  ],
  openGraph: {
    title: "Canfield Solitaire Tips & Tricks | Beat the Casino's Favorite",
    description:
      "Practical tips for winning more Canfield Solitaire games. Learn reserve pile management, foundation strategy, and stock cycling like a pro.",
    url: absoluteUrl("/canfield/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Canfield Solitaire?",
    answer:
      "Always prioritize playing cards from the reserve pile. The reserve starts with 13 cards and is the biggest obstacle to winning. Every card you move out of the reserve gives you more options and brings you closer to clearing it entirely. If you have a choice between playing a tableau card or a reserve card, choose the reserve card almost every time.",
  },
  {
    question: "Why does the foundation start on a random card in Canfield?",
    answer:
      "In traditional Canfield, the first card dealt to the foundation sets the base rank for all four foundation piles. This is what made it popular as a casino game — the random starting rank adds unpredictability and increases difficulty. You must build all foundations up in suit from whatever rank appears, wrapping from King back through Ace if needed.",
  },
  {
    question: "How often can you win Canfield Solitaire?",
    answer:
      "Canfield is one of the harder solitaire variants. Even experienced players win only about 30–35% of games with optimal play. Many deals are extremely difficult or impossible to solve regardless of skill. Don\u2019t be discouraged by frequent losses — consistent smart play is about maximizing wins over many games.",
  },
  {
    question: "What happens when a tableau column is empty in Canfield?",
    answer:
      "In Canfield, empty tableau columns are automatically filled from the reserve pile. This is a key mechanic — it means emptying a column isn\u2019t as strategically powerful as in other solitaire games because you don\u2019t get to choose what fills the space. However, once the reserve is empty, you can fill empty columns with any card, which gives you much more flexibility.",
  },
  {
    question: "Should I draw from the stock pile quickly or slowly?",
    answer:
      "Take your time with the stock pile. Cards are drawn three at a time, and only the top card of each group is playable. On your first pass, note the positions of key cards you need. On later passes, plan your moves so that the cards you need end up on top of the three-card groups. Rushing through the stock is the most common mistake intermediate players make.",
  },
];

export default function CanfieldTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Canfield Solitaire", item: absoluteUrl("/canfield") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/canfield/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Canfield Solitaire Tips & Tricks",
        description: "Practical tips for winning more Canfield Solitaire games — the casino's favorite patience game.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-21",
        dateModified: "2026-03-21",
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
        title="Canfield Solitaire Tips & Tricks"
        kicker={<><Link href="/canfield" className="hover:text-white transition-colors">Canfield Solitaire</Link> / Tips</>}
        subtitle="Practical advice to beat the casino's favorite solitaire game — from reserve pile management to stock cycling discipline and knowing when to restart."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Canfield Solitaire", href: "/canfield" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">empty the reserve pile</strong>.
          Canfield Solitaire is won or lost based on how quickly and efficiently you
          clear the 13-card reserve. Every decision should be filtered through one
          question: &ldquo;Does this move help me access or play reserve cards?&rdquo;
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Play Reserve Cards First
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The single most important strategy in{" "}
          <Link href="/canfield" className="text-[var(--gold)] hover:text-white transition-colors">
            Canfield Solitaire
          </Link>{" "}
          is prioritizing the reserve pile. The reserve starts with 13 face-up cards
          stacked on top of each other, and only the top card is available at any
          time. Clearing the reserve is essentially the key to winning.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Whenever you have a choice between moving a tableau card or the top reserve
          card to the same destination, choose the reserve card. Every card you pull
          from the reserve reveals a new card underneath and brings you one step
          closer to unlocking the full pile.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Move reserve to foundations</strong> whenever
            the top reserve card can be played directly to a foundation pile.
          </li>
          <li>
            <strong className="text-white/90">Move reserve to tableau</strong> if it creates
            a valid sequence that opens up future plays.
          </li>
          <li>
            <strong className="text-white/90">Track what&apos;s underneath.</strong> As you play
            reserve cards, remember what you&apos;ve seen — it helps you plan ahead.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Think of the reserve as a countdown timer. Each
            card you play from it extends your game. If the reserve stays full while
            your stock pile cycles, you&apos;re headed for a loss.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Understand the Foundation Base Rank
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike most solitaire games where foundations always start with Aces,
          Canfield uses a random base rank. The first card dealt to the foundation
          sets the rank that all four foundation piles must start from. If a 7 is
          dealt, all foundations build up from 7 (7, 8, 9, 10, J, Q, K, A, 2, 3, 4,
          5, 6).
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This wrapping mechanic is what makes Canfield uniquely challenging. You need
          to mentally adjust your entire strategy based on the base rank each game.
          Cards that would normally be &ldquo;high&rdquo; or &ldquo;low&rdquo; have
          different values relative to the foundation base.
        </p>
        <p className="text-white/70 leading-relaxed">
          Pay close attention to which cards are close to the base rank — those are
          your most valuable cards and should be moved to foundations as soon as
          possible. Cards far from the base rank will take many more moves to build
          up to.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Cycle the Stock Pile With Discipline
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Canfield, stock pile cards are drawn three at a time, and only the top
          card of each group of three is playable. This means two-thirds of the stock
          is hidden at any given moment. Disciplined stock cycling is essential to
          accessing the cards you need.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          On your first pass through the stock, take note of which cards appear and
          roughly where they fall. On subsequent passes, plan your tableau moves so
          that the cards you need end up as the top card in their group of three.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Don&apos;t flip mindlessly.</strong> Each draw
            changes which cards are accessible on the next pass.
          </li>
          <li>
            <strong className="text-white/90">Play a card to shift the sequence.</strong> When
            you play the top card of a three-card group, the second card becomes
            available, changing the entire alignment for the rest of the pass.
          </li>
          <li>
            <strong className="text-white/90">Count your passes.</strong> Many Canfield
            variants limit the number of times you can cycle through the stock.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> If you cycle through the entire stock pile
            without playing a single card, it&apos;s usually a sign the game is stalled.
            Look for tableau rearrangements that might unlock new stock pile plays
            before cycling again.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Build Tableau Sequences With Wrapping
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Canfield tableau building follows descending order with alternating colors,
          just like{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          . However, Canfield allows wrapping — an Ace can be placed on a 2, and a
          King can be placed on an Ace. This wrapping gives you more building options
          than most solitaire games.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Use wrapping to your advantage by building longer sequences that would be
          impossible in non-wrapping games. A sequence like 3, 2, A, K, Q is
          perfectly valid and can help you organize cards efficiently.
        </p>
        <p className="text-white/70 leading-relaxed">
          Remember that tableau sequences can be moved as a unit to other columns.
          Building long, well-organized sequences gives you flexibility to
          rearrange the board when new cards become available from the reserve or
          stock.
        </p>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Use Empty Tableau Spaces Wisely
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Canfield, when a tableau column becomes empty, it is automatically filled
          from the reserve pile. This is a critical mechanic that changes how you
          think about empty spaces compared to other solitaire games.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          While the reserve still has cards, emptying a tableau column is essentially
          a way to force a reserve card into play. This can be beneficial — you get
          to see and use a new reserve card — but you don&apos;t get to choose which
          card fills the space.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Once the reserve is empty, the rules change completely. Empty columns can
          now be filled with any card of your choosing, giving you tremendous
          flexibility. This is why clearing the reserve is so important — it
          transforms empty columns from automatic fills into strategic tools.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before the reserve is empty, emptying a column
            is a double-edged sword. You get a new reserve card, but you might
            get an unhelpful one that blocks your plans. Weigh this risk before
            clearing a column.
          </p>
        </div>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Plan Around the Reserve
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The reserve pile isn&apos;t just an obstacle — it&apos;s information. As you
          play cards from the reserve, you learn what&apos;s in it. Use this knowledge
          to plan your tableau moves. If you know the next reserve card is a red 5,
          you can prepare a tableau column with a black 6 ready to receive it.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Think of the reserve as a queue of cards you&apos;ll eventually need to
          process. Your job is to arrange the tableau so each reserve card has
          somewhere productive to go when it appears. If the reserve card can go
          directly to a foundation, even better.
        </p>
        <p className="text-white/70 leading-relaxed">
          Experienced Canfield players will sometimes make seemingly suboptimal
          tableau moves specifically to create landing spots for upcoming reserve
          cards. This forward-thinking approach separates intermediate players from
          experts.
        </p>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Track Which Cards Remain
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          With only four tableau columns, Canfield gives you limited visibility into
          the deck. Card tracking becomes essential for making informed decisions.
          Pay attention to which cards have gone to the foundations, which are in your
          tableau sequences, and which must still be in the stock or reserve.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          You don&apos;t need to memorize every card. Focus on tracking the cards that
          matter most to your current plan. If you need a black 8 to extend a
          tableau sequence, check whether any black 8s have already been played to
          foundations or are visible elsewhere.
        </p>
        <p className="text-white/70 leading-relaxed">
          Card tracking is especially valuable with the stock pile. After one full
          cycle, you should have a rough idea of which cards are in the stock and
          where they fall in the three-card draw order. This knowledge lets you plan
          moves that align with upcoming stock cards.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Know When to Restart
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Canfield Solitaire has a notoriously low win rate, and many deals are
          extremely difficult or impossible to solve. Recognizing a dead game early
          saves time and lets you move on to a more promising deal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Signs that a game is probably lost:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            You&apos;ve cycled through the stock pile multiple times with no plays available
          </li>
          <li>
            The reserve pile is barely shrinking despite multiple stock cycles
          </li>
          <li>
            Key foundation cards are buried deep in the reserve with no way to reach them
          </li>
          <li>
            All four tableau columns are locked with no valid moves between them
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t feel bad about restarting.</strong> Good Canfield players
            restart frequently. The game was designed as a casino game where the
            house expected to win most rounds. Getting a fresh deal and applying
            these tips to a more favorable layout is far smarter than grinding
            away at an impossible one.
          </p>
        </div>
      </section>

      {/* Canfield vs Klondike */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Canfield vs Klondike: Key Differences
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Many players come to Canfield from{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike Solitaire
          </Link>
          {" "}and assume the games are similar. While they share alternating-color
          tableau building, the differences are significant and require a different
          strategic mindset.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Feature</span>
            <span>Klondike</span>
            <span>Canfield</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Foundation base</span>
            <span>Always Aces</span>
            <span className="text-[var(--gold)]">Random rank</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Reserve pile</span>
            <span>None</span>
            <span className="text-[var(--gold)]">13 cards</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Tableau columns</span>
            <span>7 columns</span>
            <span className="text-[var(--gold)]">4 columns</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Wrapping</span>
            <span>Not allowed</span>
            <span className="text-[var(--gold)]">K → A allowed</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3">
            <span>Empty columns</span>
            <span>Kings only</span>
            <span className="text-[var(--gold)]">Auto-fill from reserve</span>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          The random foundation base rank is the biggest adjustment. In Klondike,
          you always know Aces go first. In Canfield, you must recalibrate your
          entire mental model each game based on whatever rank the foundation starts
          with.
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
          Canfield is one of the hardest solitaire variants. It was originally a
          casino game — players would pay $52 for a deck and earn $5 back for each
          card played to the foundations. The house edge tells you everything about
          the difficulty. Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (where nearly every deal is solvable) or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          (where draw-1 gives decent odds), Canfield is designed to be tough.
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
              <span>10–15%</span>
              <span className="text-white/50">Learning the reserve mechanic</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>Intermediate</span>
              <span>20–25%</span>
              <span className="text-amber-400">Reserve management + stock cycling</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3">
              <span>Expert</span>
              <span>30–35%</span>
              <span className="text-emerald-400">Full card tracking + forward planning</span>
            </div>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          These rates assume standard Canfield with unlimited stock passes. If
          you&apos;re consistently below 15%, focus on Tips #1 and #3 above. If you&apos;re
          in the 20% range, Tips #6 and #7 (planning around the reserve and card
          tracking) will push you higher.
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
              <strong>Play reserve cards first.</strong> Every reserve card played is
              progress toward winning.
            </li>
            <li>
              <strong>Know your foundation base rank.</strong> Adjust your entire
              strategy around the starting rank each game.
            </li>
            <li>
              <strong>Cycle the stock with discipline.</strong> Track card positions
              and plan around the three-card draw.
            </li>
            <li>
              <strong>Use wrapping to build longer sequences.</strong> K → A is valid
              in tableau building.
            </li>
            <li>
              <strong>Understand empty column auto-fill.</strong> Columns fill from
              the reserve until it&apos;s empty.
            </li>
            <li>
              <strong>Plan around the reserve.</strong> Prepare tableau landing spots
              for upcoming reserve cards.
            </li>
            <li>
              <strong>Track remaining cards.</strong> Know what&apos;s in the stock vs.
              reserve vs. foundations.
            </li>
            <li>
              <strong>Restart unwinnable games.</strong> Canfield was a casino game —
              many deals are near-impossible.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/canfield/how-to-play" title="How to Play Canfield" description="Complete rules, setup, and foundation mechanics explained." />
            <ContentLinkCard href="/canfield" title="Play Canfield Solitaire" description="Put these tips into practice with free online Canfield." />
            <ContentLinkCard href="/klondike/tips" title="Klondike Tips" description="Tips and tricks for the classic Klondike Solitaire game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Apply these tips one at a time and watch your win rate climb."
          primaryLabel="Play Canfield Solitaire"
          primaryHref="/canfield"
          secondaryLabel="Learn the Rules"
          secondaryHref="/canfield/how-to-play"
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
          More Canfield Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/canfield" title="Play Canfield Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/canfield/how-to-play" title="How to Play Canfield" description="Complete rules and foundation mechanics" />
          <ContentLinkCard href="/klondike/tips" title="Klondike Solitaire Tips" description="Tips for the world's most popular solitaire" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/spider/tips" title="Spider Solitaire Tips" description="Tips for 1-suit, 2-suit, and 4-suit Spider" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
