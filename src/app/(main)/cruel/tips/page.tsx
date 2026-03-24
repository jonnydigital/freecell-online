import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Cruel Solitaire Tips & Tricks | Beat the Redeal Puzzle",
  description:
    "7 expert tips to win Cruel Solitaire. Master redeal mechanics, same-suit building, foundation timing, and single-card strategy to beat this deceptively tough patience game.",
  keywords: [
    "cruel solitaire tips",
    "cruel solitaire strategy",
    "cruel solitaire tricks",
    "how to win cruel solitaire",
    "cruel solitaire redeal",
    "cruel solitaire help",
    "cruel card game tips",
    "cruel patience strategy",
    "cruel solitaire winning tips",
    "cruel solitaire advice",
    "cruel solitaire guide",
  ],
  openGraph: {
    title: "Cruel Solitaire Tips & Tricks | Beat the Redeal Puzzle",
    description:
      "7 expert tips to win Cruel Solitaire. Master redeal mechanics, same-suit building, and foundation timing to beat the redeal puzzle.",
    url: absoluteUrl("/cruel/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Cruel Solitaire?",
    answer:
      "The best strategy centers on understanding the redeal. When you redeal, cards are gathered from the tableau right-to-left, bottom-to-top, and redistributed into groups of four. This means the order of cards after a redeal is predictable. Plan your moves so that cards you need will end up on top of their piles after the next redeal. Combined with same-suit descending builds and timely foundation plays, this is the key to consistent wins.",
  },
  {
    question: "How does the redeal work in Cruel Solitaire?",
    answer:
      "When you redeal, all tableau cards are gathered into a single stack by picking up each pile from right to left, placing each pile on top of the gathered cards. The gathered stack is then redistributed into groups of four, left to right. No shuffling occurs — the order is entirely deterministic. This means you can predict exactly where every card will land after a redeal if you pay attention to the current layout.",
  },
  {
    question: "How many redeals do you get in Cruel Solitaire?",
    answer:
      "In most versions of Cruel Solitaire, including our online version, you get unlimited redeals. However, since the redeal is deterministic (no shuffling), repeating the same redeal without making any moves in between will produce the exact same layout. You need to move at least one card between redeals for the redistribution to change. Unlimited redeals does not mean unlimited chances — you still need to plan carefully.",
  },
  {
    question: "Is Cruel Solitaire harder than FreeCell?",
    answer:
      "Cruel Solitaire is generally considered harder than FreeCell. FreeCell has a win rate above 99% for solvable deals (roughly 82% of all deals are solvable with perfect play), while Cruel Solitaire has a much lower win rate — typically around 40-50% even with skilled play. The single-card-move restriction combined with the redeal mechanic makes Cruel a more demanding puzzle.",
  },
  {
    question: "What is the difference between Cruel and La Belle Lucie?",
    answer:
      "Both Cruel and La Belle Lucie are fan-based solitaire games with redeals, but they differ in key ways. Cruel uses piles of four cards and unlimited deterministic redeals, while La Belle Lucie uses fans of three cards with only two redeals that include shuffling. La Belle Lucie also features the 'merci' rule allowing one special move. Cruel's deterministic redeal makes it more strategic, while La Belle Lucie's shuffled redeals introduce more luck.",
  },
];

export default function CruelTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Cruel Solitaire", item: absoluteUrl("/cruel") },
          { "@type": "ListItem", position: 3, name: "Tips", item: absoluteUrl("/cruel/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Cruel Solitaire Tips & Tricks",
        description: "7 expert tips for winning more Cruel Solitaire games — master the deterministic redeal and same-suit building.",
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
        title="Cruel Solitaire Tips & Tricks"
        kicker={<><Link href="/cruel" className="hover:text-white transition-colors">Cruel Solitaire</Link> / Tips</>}
        subtitle="Master the deterministic redeal, same-suit building, and foundation timing. These 7 tips will help you turn Cruel's unique mechanics from frustrating obstacles into winning advantages."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cruel Solitaire", href: "/cruel" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">the redeal is deterministic, not random</strong>.
          Cards are gathered right-to-left and redistributed in groups of four without shuffling.
          This means you can predict exactly where every card will land after a redeal. Plan your
          pre-redeal moves so the cards you need end up on top of their new piles. Master this
          single concept and your Cruel win rate will improve dramatically.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Understand the Redeal Mechanics
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The redeal is the defining mechanic of{" "}
          <Link href="/cruel" className="text-[var(--gold)] hover:text-white transition-colors">
            Cruel Solitaire
          </Link>
          , and understanding exactly how it works is the single most important skill you can
          develop. Unlike shuffled redeals in games like{" "}
          <Link href="/la-belle-lucie" className="text-[var(--gold)] hover:text-white transition-colors">
            La Belle Lucie
          </Link>
          , Cruel&apos;s redeal follows a strict, predictable process.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Here is exactly what happens when you click redeal: the game gathers all tableau cards
          into a single stack by picking up each pile from right to left, placing each pile&apos;s
          cards (bottom card first) on top of the gathered stack. Once all cards are collected,
          the gathered stack is dealt back out into groups of four, left to right. No shuffling
          occurs at any point. The order is entirely deterministic.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Cards are gathered right-to-left.</strong> The
            rightmost pile is picked up first, then the next pile to the left, and so on.
          </li>
          <li>
            <strong className="text-white/90">Each pile is stacked bottom-up.</strong> The bottom
            card of each pile goes onto the gathered stack first, so the top card of each pile
            ends up on top of the gathered stack.
          </li>
          <li>
            <strong className="text-white/90">Redistribution is in groups of four.</strong> The
            gathered stack is dealt back out four cards at a time into each tableau pile.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before clicking redeal, mentally trace where key cards
            will end up. Count positions and groups of four. With practice, you can predict
            the post-redeal layout with complete accuracy — and plan your pre-redeal moves
            accordingly.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Build in Same-Suit Descending Order
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Cruel Solitaire requires same-suit descending builds on the tableau. You can only
          place a 7 of Hearts on an 8 of Hearts — not an 8 of Diamonds or an 8 of Clubs.
          This restriction is much stricter than alternating-color games like{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          {" "}and dramatically limits your available moves at any moment.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Because of the same-suit constraint, you need to think in terms of suit-specific
          pipelines. Track where all four cards of each suit are across the tableau. When you
          have a choice between building two different sequences, prioritize the suit where
          you can see the most cards in a connected chain. A continuous same-suit run from
          King down to a low card is the fastest path to clearing the board.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Track suits, not just ranks.</strong> Know where
            each card of a suit is sitting so you can plan consolidation moves.
          </li>
          <li>
            <strong className="text-white/90">Avoid mixing suits on a pile.</strong> Every
            off-suit card on a pile is a blocker you will need to move later.
          </li>
          <li>
            <strong className="text-white/90">Build long same-suit runs.</strong> These can
            be sent to the foundations in rapid succession once the Ace is in place.
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
          Tip #3: Time Your Foundation Plays Carefully
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In many solitaire games, moving cards to the foundations as soon as possible is
          always the right call. Cruel is different. Because only the top card of each pile
          is available and you can only move one card at a time, sending a card to the foundation
          at the wrong moment can leave you worse off than keeping it on the tableau.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          A card on the tableau serves as a potential building spot for other cards. If you
          send a 5 of Spades to the foundation, but the 4 of Spades was sitting behind it
          ready to build, you have removed a useful intermediate step. The 4 now has nowhere
          to go until the foundation is ready for it. Meanwhile, the pile where the 5 sat
          may now expose a card that blocks your plans.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Always send Aces to foundations.</strong> Aces
            have no building value on the tableau — they cannot accept any card on top.
          </li>
          <li>
            <strong className="text-white/90">Twos are almost always safe to send.</strong> Like
            Aces, they rarely serve a useful tableau role.
          </li>
          <li>
            <strong className="text-white/90">For 3s and above, think twice.</strong> Check
            whether the card is currently supporting a useful build before promoting it.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> The question is not &ldquo;Can I move this card to
            the foundation?&rdquo; but &ldquo;Should I move this card to the foundation right
            now?&rdquo; Sometimes the answer is to wait one or two moves so other cards can
            build through it first.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Predict the Post-Redeal Layout
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          This is where Cruel Solitaire becomes a genuine puzzle rather than a card game.
          Because the redeal is deterministic, skilled players can predict exactly where every
          card will land after the next redeal. This lets you make strategic moves before
          redealing to set up a favorable new layout.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The key insight is that a card&apos;s position in the gathered stack determines which
          pile it lands on and whether it ends up on top. Cards near the top of the gathered
          stack get dealt to the first piles (leftmost), and the last card dealt to each pile
          becomes that pile&apos;s top card. By moving cards between piles before redealing, you
          can control which cards end up accessible after the redeal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Start by practicing with one or two key cards. Before redealing, identify a card you
          need on top after the redeal. Trace through the gathering process mentally: which pile
          will it end up in? Will it be on top? If not, can you move it to a different pile
          before redealing so that it lands in a more favorable position?
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> If a card is currently the top card of the rightmost
            pile, it will be placed on the gathered stack last during collection. This means
            it will be dealt out first during redistribution. Understanding this
            right-to-left-then-left-to-right flow is the key to predicting post-redeal layouts.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Remember — Single Card Moves Only
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          One of the most common mistakes new Cruel players make is trying to move a sequence
          of cards at once. In Cruel Solitaire, you can only move one card at a time — the top
          card of any pile. There are no group moves, no matter how neatly a sequence is built.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This constraint has profound implications for strategy. Building a beautiful
          King-through-5 same-suit sequence on the tableau is satisfying, but those cards are
          effectively locked in place. Only the top card (the 5) can move. The 6, 7, 8, and
          all cards below are buried until the cards above them are played to the foundations
          or moved elsewhere.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , there are no free cells to temporarily store cards. Unlike{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          , there are no face-down cards to reveal. Every card is visible from the start, and
          only the top card of each pile is playable. This makes Cruel a pure information game
          where every move matters.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Don&apos;t over-build sequences.</strong> A long
            sequence locks cards in place. Build only as far as you need to.
          </li>
          <li>
            <strong className="text-white/90">Empty piles are gold.</strong> An empty pile
            can accept any single card, giving you temporary working space.
          </li>
          <li>
            <strong className="text-white/90">Use redeals to &ldquo;break up&rdquo; piles.</strong> If
            cards are stuck, a redeal redistributes them into new groupings.
          </li>
        </ul>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Plan Before Each Redeal
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The biggest mistake in Cruel Solitaire is redealing impulsively. When you feel
          stuck, the temptation is to immediately click redeal and hope for a better layout.
          But since the redeal is deterministic, clicking it without preparation is like
          rolling dice that always land on the same number — you get exactly what the current
          layout produces, nothing more.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before every redeal, exhaust all productive moves on the current layout. Move every
          card you can to the foundations. Consolidate same-suit builds where possible. Then,
          before clicking redeal, look at the tableau and consider whether any additional
          single-card moves could improve the post-redeal outcome.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Sometimes a seemingly pointless move — shifting a card from one pile to another that
          doesn&apos;t create an obvious benefit — changes the gathering order just enough to
          put a critical card on top of its post-redeal pile. These &ldquo;setup moves&rdquo;
          are what separate beginners from experts.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Think of each redeal as a puzzle within the puzzle.
            Your goal is not just to make moves on the current layout — it is to arrange the
            tableau so that the redeal produces the most favorable new layout possible. Every
            move before a redeal should be evaluated in terms of its post-redeal consequences.
          </p>
        </div>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Know When Redeals Help vs. Hurt
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Redeals are a double-edged sword. A well-timed redeal can break up logjams, expose
          buried cards, and create new building opportunities. A poorly timed redeal can bury
          cards that were accessible, destroy useful sequences, and leave you worse off than
          before.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Redeals tend to <strong className="text-white/90">help</strong> when your tableau
          has many small piles or empty spaces. The redistribution groups cards into fours,
          so fewer total cards means fewer full piles and potentially more accessible cards.
          Redeals also help when key cards are buried at the bottom of tall piles — the
          redistribution can bring them closer to the surface.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Redeals tend to <strong className="text-white/90">hurt</strong> when you have
          useful same-suit sequences built on the tableau. A redeal breaks all sequences
          apart and regroups cards purely by position. That clean 8-7-6-5 of Diamonds run
          you built? After a redeal, those cards could be scattered across four different piles.
          Only redeal when the benefit of redistributing outweighs the cost of losing your builds.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Redeal when stuck with no productive moves.</strong> If
            no card can go to the foundations or build usefully, a redeal is your only option.
          </li>
          <li>
            <strong className="text-white/90">Avoid redealing after building long sequences.</strong> You
            will lose those sequences and may not be able to rebuild them.
          </li>
          <li>
            <strong className="text-white/90">Send cards to foundations before redealing.</strong> Every
            card on the foundations is safe from the redeal. Promote what you can first.
          </li>
          <li>
            <strong className="text-white/90">Use undo if a redeal goes wrong.</strong> If the
            post-redeal layout is worse than expected, undo and try different pre-redeal moves.
          </li>
        </ul>
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
              <strong>Understand the redeal.</strong> Cards are gathered right-to-left and
              dealt in groups of four — no shuffling.
            </li>
            <li>
              <strong>Build same-suit descending.</strong> Track all four suits and consolidate
              matching cards into clean runs.
            </li>
            <li>
              <strong>Time foundation plays.</strong> Aces and Twos go immediately; higher
              cards deserve a second thought.
            </li>
            <li>
              <strong>Predict post-redeal positions.</strong> Trace key cards through the
              gathering process to know where they will land.
            </li>
            <li>
              <strong>Move one card at a time.</strong> No group moves — empty piles are your
              only temporary storage.
            </li>
            <li>
              <strong>Plan before each redeal.</strong> Make setup moves that improve the
              post-redeal layout.
            </li>
            <li>
              <strong>Know when redeals help vs. hurt.</strong> Redeals break sequences but
              can free buried cards.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/cruel/how-to-play" title="How to Play Cruel" description="Complete rules, setup, and redeal mechanics explained step by step." />
            <ContentLinkCard href="/cruel" title="Play Cruel Solitaire" description="Put these tips into practice with free online Cruel Solitaire." />
            <ContentLinkCard href="/la-belle-lucie/tips" title="La Belle Lucie Tips" description="Tips for another fan-based patience game with redeals." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve at Cruel Solitaire is to play with intention. Apply one tip at a time, pay attention to the redeal mechanics, and watch your win rate climb."
          primaryLabel="Play Cruel Solitaire"
          primaryHref="/cruel"
          secondaryLabel="Learn the Rules"
          secondaryHref="/cruel/how-to-play"
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
          More Cruel Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/cruel" title="Play Cruel Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/cruel/how-to-play" title="How to Play Cruel" description="Complete rules, redeal mechanics, and setup guide" />
          <ContentLinkCard href="/la-belle-lucie" title="La Belle Lucie Solitaire" description="Another fan-based patience game with a different redeal style" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/forty-thieves/tips" title="Forty Thieves Tips" description="Tips for another challenging same-suit building game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
