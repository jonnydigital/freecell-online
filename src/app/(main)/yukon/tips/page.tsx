import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Yukon Solitaire Tips & Tricks | Master the No-Stock Challenge",
  description:
    "Essential Yukon Solitaire tips to boost your win rate. Learn to move face-up groups aggressively, uncover hidden cards, manage empty columns, and plan multiple moves ahead in this challenging no-stock variant.",
  keywords: [
    "yukon solitaire tips",
    "yukon solitaire strategy",
    "yukon card game tips",
    "how to win yukon solitaire",
    "yukon solitaire tricks",
    "yukon solitaire help",
    "yukon solitaire winning tips",
    "yukon solitaire beginner tips",
    "tips for yukon solitaire",
    "yukon solitaire advice",
  ],
  openGraph: {
    title: "Yukon Solitaire Tips & Tricks | Master the No-Stock Challenge",
    description:
      "Essential tips for winning more Yukon Solitaire games. Learn to move face-up groups, uncover hidden cards, and master empty column strategy.",
    url: absoluteUrl("/yukon/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What makes Yukon Solitaire different from Klondike?",
    answer:
      "The two biggest differences are: Yukon has no stock pile (all 52 cards are dealt to the tableau at the start), and you can move any face-up card along with all the cards on top of it, regardless of whether those cards form a proper descending sequence. These rules make Yukon more strategic since every card is visible or discoverable and you have much more freedom of movement.",
  },
  {
    question: "Can you move any face-up card in Yukon Solitaire?",
    answer:
      "Yes — this is Yukon\u2019s signature rule. You can pick up any face-up card in the tableau and move it (along with every card stacked on top of it) to another column, as long as the card you\u2019re placing it on follows the standard rule: opposite color and one rank higher. The cards being moved do NOT need to be in sequence. This is completely different from Klondike, where only properly ordered sequences can be moved.",
  },
  {
    question: "What is a good win rate for Yukon Solitaire?",
    answer:
      "Yukon is a challenging variant with roughly a 30% win rate for skilled players. Beginners typically win 10\u201315% of games, intermediate players around 20\u201325%, and experts can reach 30\u201335%. Many deals are mathematically solvable, but the lack of a stock pile means you have to work entirely with the tableau — one wrong move can make a winnable deal impossible.",
  },
  {
    question: "Should I build foundations early or late in Yukon?",
    answer:
      "Generally, delay moving cards to foundations unless doing so uncovers a face-down card or is clearly safe (such as moving Aces and 2s up). Cards in the foundations can\u2019t be retrieved, and you may need them in the tableau to create moves that uncover hidden cards. Focus on uncovering face-down cards first, then build foundations once the tableau is well-organized.",
  },
  {
    question: "When should I give up on a Yukon Solitaire game?",
    answer:
      "Consider restarting when all face-up cards are locked (no valid moves exist), when critical cards are buried behind multiple face-down cards with no way to reach them, or when every empty column is filled and you have no Kings to start new columns. Unlike Klondike, there\u2019s no stock pile to cycle through for new options — if the tableau is stuck, the game is over.",
  },
];

export default function YukonTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Yukon Solitaire", item: absoluteUrl("/yukon") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/yukon/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Yukon Solitaire Tips & Tricks",
        description: "Essential tips for mastering Yukon Solitaire and boosting your win rate.",
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
        title="Yukon Solitaire Tips & Tricks"
        kicker={<><Link href="/yukon" className="hover:text-white transition-colors">Yukon Solitaire</Link> / Tips</>}
        subtitle="Master the no-stock challenge — from moving unsorted groups aggressively to uncovering hidden cards and knowing when a game is stuck."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Yukon Solitaire", href: "/yukon" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">uncover face-down cards at every opportunity</strong>.
          Yukon Solitaire has no stock pile — the only way to access new cards is by flipping
          the hidden ones in the tableau. Every move you make should aim to reveal what&apos;s
          underneath, not just tidy up what&apos;s already visible.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Move Face-Up Groups Regardless of Sequence
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Yukon&apos;s most powerful rule is that you can move any face-up card — along with
          every card stacked on top of it — to a valid destination, even if those cards
          aren&apos;t in proper descending order. This is the single biggest difference from{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike Solitaire
          </Link>{" "}
          and understanding it changes everything about how you play.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          In practice, this means you can grab a red 7 buried under a black 3 and a red King,
          and move that entire pile onto a black 8 — even though the 3 and King above it make
          no sequential sense. The only rule that matters is whether the <em>bottom card</em> of
          the group you&apos;re moving fits on the destination card (opposite color, one rank lower).
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Use this rule aggressively. Don&apos;t think of unsorted
            groups as messy — think of them as opportunities. Moving a &ldquo;messy&rdquo; pile
            to uncover a face-down card is almost always worth it.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Uncover Face-Down Cards as Your Top Priority
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/yukon" className="text-[var(--gold)] hover:text-white transition-colors">
            Yukon Solitaire
          </Link>
          , there is no stock pile. Every card you&apos;ll ever play with is already on the
          tableau — but many of them start face-down and invisible. Flipping these hidden
          cards is how you &ldquo;draw&rdquo; in Yukon. Without new cards, your options dry up fast.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When choosing between two equally valid moves, always prefer the one that reveals
          a face-down card. Even if the other move looks cleaner or builds a nicer sequence,
          the information and options you gain from flipping a hidden card almost always
          outweigh a tidier tableau.
        </p>
        <p className="text-white/70 leading-relaxed">
          Think of each face-down card as a locked door. You don&apos;t know what&apos;s behind
          it, but you <em>do</em> know you can&apos;t win without opening all of them. Every
          move that doesn&apos;t uncover a face-down card should be questioned — is it truly
          necessary, or just comfortable?
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Empty Columns Are for Kings Only
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Yukon Solitaire, only Kings can be placed into empty columns. This makes empty
          columns both valuable and restrictive. Clearing a column is a significant
          achievement, but it&apos;s wasted if you don&apos;t have a King ready to fill it — or
          if filling it doesn&apos;t serve your broader strategy.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before working to empty a column, ask yourself: &ldquo;Do I have a King that
          benefits from being moved here?&rdquo; Ideally, that King should have face-down
          cards beneath it in its current position. Moving it to the empty column frees up
          those hidden cards while giving the King a new home.
        </p>
        <p className="text-white/70 leading-relaxed">
          If you don&apos;t have a useful King available, emptying a column may actually hurt
          you — you&apos;ve reduced your tableau to six working columns with no immediate
          benefit. Patience is key.
        </p>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Build Foundations Carefully — Don&apos;t Rush
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          It&apos;s tempting to move cards to the foundations as soon as possible, but in
          Yukon this can backfire. Cards in the foundations are gone for good — you can&apos;t
          pull them back to the tableau. If you send a card up too early, you might lose a
          crucial intermediate card you need for tableau maneuvering.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Safe foundation moves include: Aces (always move them up — they serve no tableau
          purpose), 2s (rarely needed in the tableau), and any card where all four cards of
          the ranks below it are already on the foundations. Everything else deserves a
          moment of thought.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> If moving a card to the foundation would uncover a
            face-down card, do it. If the card is just sitting on top of a face-up sequence and
            moving it up doesn&apos;t reveal anything new, consider leaving it in the tableau
            where it might still be useful.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Consolidate Columns to Create Opportunities
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Column management is at the heart of Yukon strategy. With seven columns and no
          stock pile, how you organize and consolidate your cards determines whether you
          win or get stuck.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Look for opportunities to stack cards from multiple columns onto a single column,
          even if it creates a tall, messy pile. The goal isn&apos;t neatness — it&apos;s
          freeing up columns so you can access face-down cards elsewhere. A column with 15
          cards on it is fine if it means two other columns now have exposed face-down cards
          ready to flip.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Merge short columns.</strong> If two columns each
            have only a few cards, combining them frees up space.
          </li>
          <li>
            <strong className="text-white/90">Keep at least one column flexible.</strong> Having
            a column with a high-ranking card on top gives you a reliable destination for moves.
          </li>
          <li>
            <strong className="text-white/90">Avoid spreading cards too thin.</strong> Seven
            columns with two or three cards each gives you no room to maneuver.
          </li>
        </ul>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Use the &ldquo;Move Any Face-Up Card&rdquo; Rule Aggressively
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Many players coming from{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          instinctively avoid moving unsorted groups because it &ldquo;feels wrong.&rdquo;
          In Yukon, this hesitation will cost you games. The ability to move any face-up card
          with everything on top of it is your most powerful tool — use it constantly.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Actively scan for face-up cards buried deep in columns that could be moved to
          valid destinations. A red 4 buried under six unsorted cards? If there&apos;s a black
          5 showing somewhere, move the whole pile. Yes, you&apos;re dumping a mess onto another
          column — but you&apos;re also uncovering whatever was beneath that red 4.
        </p>
        <p className="text-white/70 leading-relaxed">
          The messy pile you create can be sorted out later. The face-down card you uncover
          might be exactly what you need. This aggressive style of play is what separates
          Yukon experts from beginners.
        </p>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Plan 3–4 Moves Ahead
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Yukon rewards forward thinking more than almost any other solitaire variant.
          Because all cards are on the tableau (no surprises from a stock pile), you can plan
          multi-step sequences with confidence. Before making a move, trace the consequences:
          &ldquo;If I move this group here, it uncovers card X. Card X can go on column 3,
          which reveals card Y. Card Y is the Queen I need for the foundation.&rdquo;
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Even planning three moves ahead gives you a massive advantage. Four moves ahead
          and you&apos;ll start finding chain reactions that clear entire columns and cascade
          into big foundation-building runs.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Practice drill:</strong> Before every move, say out loud (or think)
            what your <em>next</em> move will be. If you can&apos;t name a follow-up move,
            reconsider whether the first move is actually helping you. This builds the habit
            of thinking in sequences instead of isolated actions.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Know When a Game Is Stuck
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike Klondike, Yukon has no stock pile to cycle through for fresh options. When
          the tableau locks up, the game is truly over. Learning to recognize these dead-end
          states quickly saves you time and frustration.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Signs that a Yukon game is stuck:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            No valid moves remain among any face-up cards on the tableau
          </li>
          <li>
            All face-down cards are trapped behind immovable face-up cards
          </li>
          <li>
            Every column is topped by low-ranking cards with no matching destinations
          </li>
          <li>
            Empty columns exist but no Kings are available to fill them
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t feel bad about restarting.</strong> Yukon is a demanding game
            and even expert players lose the majority of deals. Recognizing a dead game
            early and moving to a fresh deal is a sign of skill, not weakness. The goal is
            to win <em>more games over time</em>, not to solve every deal.
          </p>
        </div>
      </section>

      {/* Yukon vs Klondike comparison */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Yukon vs. Klondike: Key Differences
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Yukon is often described as Klondike&apos;s harder sibling. Both use the same
          foundation-building goal (Aces up to Kings in suit), but the gameplay is
          fundamentally different. Understanding these differences is essential if you&apos;re
          transitioning from{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          to Yukon.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Feature</span>
            <span>Klondike</span>
            <span>Yukon</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Stock Pile</span>
            <span>Yes (24 cards)</span>
            <span className="text-amber-400">None — all cards on tableau</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Group Moves</span>
            <span>Ordered sequences only</span>
            <span className="text-amber-400">Any face-up card + cards above</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Win Rate</span>
            <span>~40–45% (draw-1)</span>
            <span className="text-amber-400">~30% for experts</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3">
            <span>Difficulty</span>
            <span>Medium</span>
            <span className="text-amber-400">Hard</span>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          The lack of a stock pile makes Yukon more strategic — you can see or deduce where
          every card is, but you have fewer second chances. The flexible group-move rule
          compensates by giving you far more movement options on each turn.
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
          Yukon Solitaire is one of the more challenging solitaire variants. Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (where nearly every deal is solvable) or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          (where draw-1 gives decent odds), Yukon&apos;s lack of a stock pile and complex
          tableau interactions make it harder to win consistently.
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
              <span className="text-white/50">Learning the group-move rule</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>Intermediate</span>
              <span>20–25%</span>
              <span className="text-amber-400">Uncovering face-down cards consistently</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3">
              <span>Expert</span>
              <span>30–35%</span>
              <span className="text-emerald-400">Multi-move planning + column management</span>
            </div>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          If you&apos;re consistently below 15%, focus on Tips #1 and #2 above — learning to
          use the group-move rule and prioritizing face-down cards. If you&apos;re in the
          20% range, Tips #5 and #7 (column consolidation and planning ahead) will push you
          into expert territory.
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
              <strong>Move unsorted groups freely.</strong> Any face-up card plus everything
              on top can move to a valid destination.
            </li>
            <li>
              <strong>Uncover face-down cards first.</strong> Flipping hidden cards is how you
              &ldquo;draw&rdquo; in Yukon.
            </li>
            <li>
              <strong>Only Kings fill empty columns.</strong> Don&apos;t empty a column without
              a King ready.
            </li>
            <li>
              <strong>Delay foundation building.</strong> Keep cards in the tableau where they
              can help maneuver.
            </li>
            <li>
              <strong>Consolidate columns.</strong> Tall messy piles are fine if they free up
              other columns.
            </li>
            <li>
              <strong>Move aggressively.</strong> Grab buried face-up cards even if it creates
              disorder.
            </li>
            <li>
              <strong>Plan 3–4 moves ahead.</strong> Trace consequences before every move.
            </li>
            <li>
              <strong>Restart stuck games quickly.</strong> No stock pile means no second
              chances.
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
            <ContentLinkCard href="/yukon" title="Play Yukon Solitaire" description="Put these tips into practice with our free online Yukon game." />
            <ContentLinkCard href="/klondike/tips" title="Klondike Tips" description="Tips and tricks for the classic Klondike Solitaire game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve at Yukon is to play. Apply these tips one at a time and watch your win rate climb."
          primaryLabel="Play Yukon Solitaire"
          primaryHref="/yukon"
          secondaryLabel="How to Play Yukon"
          secondaryHref="/yukon/how-to-play"
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
          More Yukon Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/yukon" title="Play Yukon Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/yukon/how-to-play" title="How to Play Yukon" description="Complete rules and group-move mechanics" />
          <ContentLinkCard href="/klondike/tips" title="Klondike Tips" description="Tips for the classic Klondike Solitaire game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/spider/tips" title="Spider Solitaire Tips" description="Tips for 1-suit, 2-suit, and 4-suit Spider" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
