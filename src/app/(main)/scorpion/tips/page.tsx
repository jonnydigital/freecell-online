import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Scorpion Solitaire Tips & Tricks | Tame the Hardest Spider Variant",
  description:
    "Master Scorpion Solitaire with 7 proven tips. Learn to build in-suit sequences, manage face-down cards, use the reserve deal wisely, and dominate empty columns with Kings-only strategy.",
  keywords: [
    "scorpion solitaire tips",
    "scorpion solitaire tips and tricks",
    "how to win scorpion solitaire",
    "scorpion solitaire strategy tips",
    "scorpion solitaire help",
    "scorpion card game tips",
    "scorpion solitaire winning tips",
    "scorpion solitaire advice",
    "scorpion solitaire face down cards",
    "scorpion solitaire empty columns",
    "scorpion patience tips",
  ],
  openGraph: {
    title: "Scorpion Solitaire Tips & Tricks | Tame the Hardest Spider Variant",
    description:
      "7 proven tips for winning more Scorpion Solitaire games. Master in-suit building, reserve timing, and the Kings-only empty column rule.",
    url: absoluteUrl("/scorpion/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Scorpion Solitaire?",
    answer:
      "Focus on uncovering face-down cards as early as possible. Scorpion starts with 21 hidden cards across the first four columns, and you cannot plan effectively while nearly half the tableau is invisible. Every move should prioritize revealing hidden information, even if it means temporarily disrupting your in-suit sequences.",
  },
  {
    question: "How hard is Scorpion Solitaire compared to Spider?",
    answer:
      "Scorpion is often considered harder than 1-suit Spider but comparable to 2-suit Spider in difficulty. Skilled players can expect a win rate around 50%. The game's challenge comes from the Kings-only empty column rule and the limited 3-card reserve, which gives you far less flexibility than Spider's 50-card stock pile.",
  },
  {
    question: "When should I use the reserve cards in Scorpion Solitaire?",
    answer:
      "Save the reserve for when you've exhausted all productive moves in the tableau. The 3 reserve cards are dealt one each to the first three columns, and once they're gone, you have no more fresh cards. Dealing too early wastes the opportunity to use the reserve as a rescue mechanism when you're truly stuck.",
  },
  {
    question: "Can only Kings go in empty columns in Scorpion Solitaire?",
    answer:
      "Yes. Unlike Spider Solitaire where any card can fill an empty column, Scorpion restricts empty columns to Kings only (along with any cards below them). This makes empty columns less flexible but still extremely valuable — moving a King into an empty space often uncovers hidden cards and reorganizes entire sections of the tableau.",
  },
  {
    question: "Is every Scorpion Solitaire deal winnable?",
    answer:
      "No. Some Scorpion Solitaire deals are mathematically unwinnable regardless of how perfectly you play. Estimates suggest roughly 50% of deals can be won with optimal play. If you've been stuck for a long time with no productive moves remaining, it may be wiser to start a new game rather than continuing a lost cause.",
  },
];

export default function ScorpionTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Scorpion Solitaire", item: absoluteUrl("/scorpion") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/scorpion/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Scorpion Solitaire Tips & Tricks",
        description: "7 proven tips and strategies for winning more Scorpion Solitaire games.",
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
        title="Scorpion Solitaire Tips & Tricks"
        kicker={<><Link href="/scorpion" className="hover:text-white transition-colors">Scorpion Solitaire</Link> / Tips</>}
        subtitle="Seven battle-tested tips to boost your win rate in one of solitaire's most punishing variants — from uncovering hidden cards to timing your reserve deal."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Scorpion Solitaire", href: "/scorpion" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">uncover face-down cards before anything else</strong>.
          Scorpion&apos;s 21 hidden cards are the primary obstacle between you and victory. Every
          move that reveals a hidden card gives you information and options. Master this priority
          and pair it with disciplined in-suit building, and your win rate will climb immediately.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Uncover Face-Down Cards First
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Scorpion Solitaire begins with 21 cards face-down — three hidden cards at the bottom
          of each of the first four columns. That&apos;s nearly half the tableau invisible to you.
          You cannot build effective sequences, plan King moves, or judge whether a deal is
          winnable until those cards are revealed.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When choosing between two otherwise equal moves, always pick the one that exposes a
          hidden card. The information you gain is worth far more than the positional advantage
          of the alternative. Think of each face-down card as a locked door — you need to open
          every one to see the full picture.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Target the deepest columns:</strong> Columns with
            three hidden cards need the most work. Prioritize them over columns with one or two.
          </li>
          <li>
            <strong className="text-white/90">Accept short-term disorder:</strong> It&apos;s fine to
            break a partial sequence if the move reveals a hidden card underneath.
          </li>
          <li>
            <strong className="text-white/90">Track your progress:</strong> Count remaining face-down
            cards regularly. When you get below 10, you&apos;re entering the endgame.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4 mb-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> In the opening moves, look for opportunities to move
            large groups of cards from the first four columns (the ones with hidden cards) onto
            cards in columns five through seven. Even if the move creates an off-suit stack, the
            revealed card is almost always worth it.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Build In-Suit Sequences Relentlessly
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Scorpion Solitaire, you can move any face-up card along with every card below it —
          regardless of whether those cards form a proper sequence. But{" "}
          <strong className="text-white">only complete King-to-Ace same-suit sequences are
          removed from the tableau</strong>. Off-suit groupings are dead weight that clog
          your columns and block progress.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Every move should aim to extend an in-suit run or create conditions for one. If you
          have a choice between placing the 8 of hearts on the 9 of hearts versus the 9 of
          spades, always choose hearts. The compounding value of same-suit building is enormous:
          each in-suit connection you make is one fewer card you&apos;ll need to rearrange later.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike{" "}
          <Link href="/spider/tips" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider Solitaire
          </Link>
          , where off-suit builds are sometimes strategically useful, Scorpion punishes off-suit
          stacking more severely because you have no stock pile to bail you out — just three
          reserve cards. Every off-suit connection is a problem you&apos;ll need to undo later with
          limited resources.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> Before making any move, scan the entire tableau for
            in-suit placements first. Only build off-suit when it directly reveals a face-down
            card or sets up a King move to an empty column. Disciplined in-suit building is what
            separates consistent winners from frustrated restarters.
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
          Tip #3: Use the Reserve Deal Wisely
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Scorpion&apos;s reserve consists of just three cards, dealt one each to the first three
          columns. This is your only source of fresh cards — there&apos;s no stock pile with five
          rounds of deals like{" "}
          <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider
          </Link>
          . Once you deal the reserve, it&apos;s gone forever.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Treat the reserve as an emergency parachute, not an early-game exploration tool.
          Before dealing, make absolutely sure you&apos;ve exhausted every productive move in the
          current tableau. Check every column, every possible card transfer, every potential
          King move. Only when you&apos;re truly stuck should you reach for the reserve.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Organize before dealing:</strong> Tidy up your
            sequences as much as possible so the three new cards land on the best possible foundations.
          </li>
          <li>
            <strong className="text-white/90">Consider column state:</strong> The reserve cards go
            to columns 1, 2, and 3. Make sure those columns are in the best position to absorb
            new cards without burying critical sequences.
          </li>
          <li>
            <strong className="text-white/90">Don&apos;t panic-deal:</strong> Sometimes you feel stuck
            but there&apos;s a three-move combination hiding in plain sight. Take a breath and scan
            the full tableau one more time.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Dealing the reserve within the first dozen moves.
            At that point you&apos;ve barely explored the tableau. Early dealing wastes your only
            lifeline on a situation that probably has hidden solutions. Experienced players
            typically exhaust 30+ moves before touching the reserve.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Empty Columns Are for Kings Only
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          One of Scorpion&apos;s defining rules — and the feature that makes it significantly harder
          than{" "}
          <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider Solitaire
          </Link>{" "}
          — is that <strong className="text-white">only Kings can be placed into empty
          columns</strong>. In Spider, any card can fill an empty space, giving you flexible
          temporary storage. In Scorpion, empty columns serve exactly one purpose: relocating Kings.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This restriction transforms your strategy. Creating an empty column is only valuable
          if you have a King (and ideally a long tail of cards beneath it) ready to move into
          that space. An empty column with no King to fill it is wasted effort — you&apos;ve done
          the hard work of clearing a column for nothing.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before attempting to empty a column, always ask: &ldquo;Which King am I going to move
          here, and what does that King move accomplish?&rdquo; The best King moves are ones that
          simultaneously uncover hidden cards and consolidate in-suit sequences.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Kings that sit on top of face-down cards are high-priority
            targets. Moving them into an empty column reveals hidden cards and frees up column
            space — a double benefit that accelerates your progress dramatically.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Work From Kings Down, Not Aces Up
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In many solitaire games, like{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , you build foundations from Ace up to King. Scorpion works the opposite direction:
          you build descending same-suit sequences from King down to Ace within the tableau.
          This means Kings are your anchors — everything flows downward from them.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Successful Scorpion players think top-down. Locate your Kings first, then trace each
          suit downward: where is the Queen of that suit? The Jack? The 10? Identify the gaps
          and blockers in each suit&apos;s chain, then work to remove those obstacles systematically.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Map each suit&apos;s chain:</strong> Mentally trace
            K-Q-J-10-9-8-7-6-5-4-3-2-A for each suit to identify where the breaks are.
          </li>
          <li>
            <strong className="text-white/90">Fix the highest break first:</strong> A disconnected
            King-Queen is more urgent than a disconnected 3-2 because it blocks more cards.
          </li>
          <li>
            <strong className="text-white/90">Let Aces and 2s take care of themselves:</strong> Low
            cards naturally fall into place once the upper portions of each suit are connected.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> If a King is buried under other cards of a different
            suit, that entire column is effectively frozen until you can dig it out. Identify
            buried Kings early and prioritize freeing them — they&apos;re the bottleneck for their
            entire suit.
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
          Tip #6: Avoid Off-Suit Traps
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Scorpion&apos;s most seductive trap is the off-suit move that looks productive but actually
          makes the game harder. Because you can move any face-up card plus everything below it,
          it&apos;s tempting to shuffle cards around freely. But every off-suit stack you create is
          a tangle you&apos;ll need to undo later.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The danger is compounding: one off-suit move creates a mixed group. Moving that mixed
          group onto another column creates a larger mixed group. Soon you have columns of 10+
          cards with fragments of three different suits, and no amount of clever maneuvering can
          untangle them without empty columns — which require Kings, which might be buried under
          those very mixed stacks.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making any off-suit move, apply a strict test:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>Does this move directly reveal a face-down card? If yes, it&apos;s probably worth it.</li>
          <li>Does this move set up a King placement into an empty column? If yes, proceed.</li>
          <li>Does this move extend an in-suit sequence elsewhere on the board? If yes, consider it.</li>
          <li>Does this move just &ldquo;tidy up&rdquo; the board? If that&apos;s the only reason, <strong className="text-white/90">don&apos;t do it</strong>.</li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Warning sign:</strong> If you find yourself making multiple off-suit moves
            in a row without revealing any face-down cards or completing any in-suit connections,
            stop and reassess. You&apos;re likely making the game harder, not easier. Read our{" "}
            <Link href="/scorpion/how-to-play" className="text-red-300 hover:text-white transition-colors">
              Scorpion rules guide
            </Link>{" "}
            for a refresher on valid moves.
          </p>
        </div>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Know When to Restart
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Not every Scorpion deal is winnable. With an estimated 50% win rate for skilled
          players, roughly half the games you start are either unwinnable from the outset or
          become unwinnable due to the random distribution of face-down cards. Recognizing a
          lost cause early saves time and frustration.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Here are the warning signs that a game may be unrecoverable:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">All four Kings are deeply buried:</strong> If every
            King is trapped under multiple off-suit cards with no path to free them, the game is
            likely lost.
          </li>
          <li>
            <strong className="text-white/90">Reserve is spent with many hidden cards remaining:</strong>{" "}
            If you&apos;ve dealt the reserve but still have 10+ face-down cards, recovery is very
            difficult.
          </li>
          <li>
            <strong className="text-white/90">Circular dependencies:</strong> Card A is blocked by
            card B, which is blocked by card C, which is blocked by card A. These deadlocks are
            often fatal.
          </li>
          <li>
            <strong className="text-white/90">No productive moves remain:</strong> If you&apos;ve dealt
            the reserve and have no moves that reveal hidden cards or extend in-suit sequences,
            the game is over.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Mindset tip:</strong> Restarting isn&apos;t quitting — it&apos;s efficient. Professional
            solitaire players restart freely because they know that time spent on an unwinnable deal
            is time not spent on a winnable one. If the board feels hopeless after 40-50 moves,
            trust your instincts and deal a fresh game.
          </p>
        </div>
      </section>

      {/* Quick reference */}
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
              <strong>Uncover face-down cards first.</strong> Information wins games — dig
              through the first four columns aggressively.
            </li>
            <li>
              <strong>Build in-suit relentlessly.</strong> Only same-suit K-to-A runs get
              removed. Off-suit stacks are dead weight.
            </li>
            <li>
              <strong>Save the reserve for emergencies.</strong> Exhaust every tableau move
              before dealing those three precious cards.
            </li>
            <li>
              <strong>Empty columns are for Kings only.</strong> Plan your King move before
              you clear the column.
            </li>
            <li>
              <strong>Think top-down from Kings.</strong> Trace each suit&apos;s chain downward
              and fix the highest break first.
            </li>
            <li>
              <strong>Reject off-suit moves without purpose.</strong> If it doesn&apos;t reveal
              a card or extend a sequence, skip it.
            </li>
            <li>
              <strong>Restart without guilt.</strong> Half of all deals are unwinnable — spend
              your time on the other half.
            </li>
          </ol>
        </div>
      </section>

      {/* ── Related Guides ── */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/scorpion/how-to-play" title="How to Play Scorpion" description="Complete rules, setup, and valid moves for Scorpion Solitaire." />
            <ContentLinkCard href="/scorpion" title="Play Scorpion Solitaire" description="Put these tips into practice with our free online game." />
            <ContentLinkCard href="/spider/tips" title="Spider Solitaire Tips" description="Tips for Spider — Scorpion's close cousin with different mechanics." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Apply these seven tips and watch your Scorpion Solitaire win rate climb."
          primaryLabel="Play Scorpion Solitaire"
          primaryHref="/scorpion"
          secondaryLabel="Read the Rules"
          secondaryHref="/scorpion/how-to-play"
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

      {/* Related content */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More Scorpion Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/scorpion" title="Play Scorpion Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/scorpion/how-to-play" title="How to Play Scorpion Solitaire" description="Complete rules, setup, and move guide" />
          <ContentLinkCard href="/spider" title="Play Spider Solitaire" description="Try Scorpion's famous cousin with 1, 2, or 4 suits" />
          <ContentLinkCard href="/spider/tips" title="Spider Solitaire Tips" description="Tips for the related Spider variant" />
          <ContentLinkCard href="/" title="Play FreeCell" description="The classic open-information solitaire game" />
          <ContentLinkCard href="/yukon/tips" title="Yukon Solitaire Tips" description="Tips for another challenging tableau-based variant" />
        </div>
      </section>
    </ContentLayout>
  );
}
