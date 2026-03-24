import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "La Belle Lucie Tips & Tricks | Win the Fan Patience Game",
  description:
    "Expert La Belle Lucie tips to boost your win rate. Master fan mechanics, redeal strategy, the merci rule, foundation timing, and same-suit building to conquer this classic patience game.",
  keywords: [
    "la belle lucie tips",
    "la belle lucie strategy",
    "la belle lucie tricks",
    "how to win la belle lucie",
    "fan patience tips",
    "la belle lucie solitaire tips",
    "la belle lucie merci rule",
    "la belle lucie redeal strategy",
    "la belle lucie winning tips",
    "fan solitaire tips",
    "la belle lucie help",
    "la belle lucie advice",
  ],
  openGraph: {
    title: "La Belle Lucie Tips & Tricks | Win the Fan Patience Game",
    description:
      "Expert tips for winning more La Belle Lucie games. Master fan mechanics, redeals, the merci rule, and same-suit building.",
    url: absoluteUrl("/la-belle-lucie/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the merci rule in La Belle Lucie?",
    answer:
      "The merci rule gives you one special move after your final (second) redeal. You can pull any single buried card from any fan and play it wherever it is legally allowed — to a foundation or onto another fan. This is your last lifeline, so save it for a card that truly unlocks progress. Using the merci carelessly on a minor blockage wastes the most powerful tool in the game.",
  },
  {
    question: "How many redeals do you get in La Belle Lucie?",
    answer:
      "You get exactly two redeals in La Belle Lucie. After the initial deal you play until stuck, then gather all remaining tableau cards, shuffle them, and redeal into fans of three. You can do this a second time. After the second redeal, you may invoke the merci rule once. There are no further redeals — if you cannot finish after the merci, the game is lost.",
  },
  {
    question: "Why is La Belle Lucie so hard to win?",
    answer:
      "La Belle Lucie is difficult because only the top card of each fan is playable, tableau building is same-suit (not alternating color), and you only get two redeals. With 17 fans of three cards plus one single card, most cards are buried under two others. The same-suit building restriction dramatically limits your options compared to games like Klondike or FreeCell. Win rates typically range from 15–25% even for experienced players.",
  },
  {
    question: "Should I move cards to foundations as soon as possible?",
    answer:
      "Not always. In La Belle Lucie, a card on a foundation can never come back, and you might need a mid-rank card to stay in the tableau as a building target. For example, if you send the 7 of spades to the foundation but later need it to place the 6 of spades onto, that sequence is now blocked. Send Aces and Twos immediately, but think carefully about higher-rank cards — especially before a redeal.",
  },
  {
    question: "What win rate should I expect in La Belle Lucie?",
    answer:
      "Experienced players typically win 15–25% of La Belle Lucie games. Some deals are mathematically unsolvable regardless of skill. The two redeals and merci rule help, but the same-suit building restriction and fan mechanics keep the difficulty high. If you are consistently below 10%, focus on redeal timing and foundation restraint — those two areas have the biggest impact on win rate.",
  },
];

export default function LaBelleLucieTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "La Belle Lucie", item: absoluteUrl("/la-belle-lucie") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/la-belle-lucie/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "La Belle Lucie Tips & Tricks",
        description: "Expert tips for winning more La Belle Lucie games — the elegant fan patience classic.",
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
        title="La Belle Lucie Tips & Tricks"
        kicker={<><Link href="/la-belle-lucie" className="hover:text-white transition-colors">La Belle Lucie</Link> / Tips</>}
        subtitle="Master the fan patience game with expert advice on redeal timing, the merci rule, same-suit building, and knowing which cards to free first."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "La Belle Lucie", href: "/la-belle-lucie" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">plan across all three deals</strong>.
          La Belle Lucie gives you the initial deal plus two redeals. Every move you make
          should consider not just what it accomplishes now, but how it sets up the board
          for after the next shuffle. Patience and restraint win more games than speed.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Only the Top Card Is Playable
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The defining constraint of{" "}
          <Link href="/la-belle-lucie" className="text-[var(--gold)] hover:text-white transition-colors">
            La Belle Lucie
          </Link>{" "}
          is that each fan only exposes its top card. The remaining cards in every fan
          are completely locked until the cards above them are moved away. With 17 fans
          of three cards each (plus one single-card fan), that means 34 of the 52 cards
          are buried at the start of every deal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This mechanic forces you to think carefully before every move. Moving the top
          card of a fan reveals the card beneath it — but once that card is gone, you
          cannot undo the decision. Before you move any card, ask yourself what it
          uncovers and whether the newly exposed card helps or hurts your position.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Scan all 18 fans</strong> before making
            your first move. Identify which cards are on top and which are buried.
          </li>
          <li>
            <strong className="text-white/90">Prioritize fans with useful cards underneath.</strong>{" "}
            If moving a top card reveals a card you need for foundations, that move has
            double value.
          </li>
          <li>
            <strong className="text-white/90">Avoid moves that expose unhelpful cards</strong>{" "}
            when you have alternatives — you gain nothing and lose a potential building target.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Memorize the bottom card of each three-card fan
            at the start of the game. Knowing what is buried two layers deep helps you
            decide which fans to work on first and which to leave alone until a redeal.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Use Your Two Redeals Strategically
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          La Belle Lucie grants you exactly two redeals. When you redeal, all remaining
          tableau cards are gathered, shuffled, and redistributed into new fans of three.
          This is enormously powerful — it can break deadlocks and resurface buried cards
          — but you only get two chances, so timing matters.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before triggering a redeal, make absolutely certain you have exhausted every
          possible move in the current layout. Even a single overlooked play could save
          you a redeal for later when you need it more. Play through the entire board
          methodically, checking each fan against every foundation and every other fan.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">First redeal:</strong> Focus on freeing
            Aces and low cards that can start foundation building. Get as many cards to
            foundations as possible before the second redeal.
          </li>
          <li>
            <strong className="text-white/90">Second redeal:</strong> This is your last
            shuffle. After this, the only special move left is the merci. Play
            aggressively and target the foundations hard.
          </li>
          <li>
            <strong className="text-white/90">Fewer remaining cards = better redeals.</strong>{" "}
            The more cards you send to foundations before redealing, the fewer fans you
            deal, giving you better odds of a favorable layout.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> If you have moved fewer than 8 cards to
            foundations before your first redeal, the game is likely very difficult.
            If you have moved 15 or more before the second redeal, you are in strong
            position to finish.
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
          Tip #3: Save the Merci for Maximum Impact
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The merci rule is La Belle Lucie&apos;s ultimate safety net. After your second
          redeal, you may draw one single buried card from any fan and play it to a
          legal destination — either a foundation pile or the top of another fan. This
          is the only time in the entire game you can access a non-top card directly.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Because the merci is a one-time ability, you must use it on the card that
          creates the biggest cascade of further moves. Pulling a buried Ace to start a
          foundation is good, but pulling a mid-rank card that unblocks an entire chain
          of plays can be game-winning.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Don&apos;t use the merci immediately.</strong>{" "}
            Play out every possible move after the second redeal first. You may find
            you don&apos;t need it where you originally thought.
          </li>
          <li>
            <strong className="text-white/90">Look for chain reactions.</strong> The
            best merci target is a card whose removal sets off a sequence of 3 or more
            subsequent plays.
          </li>
          <li>
            <strong className="text-white/90">Consider foundation targets.</strong>{" "}
            Sometimes pulling a buried card directly to a foundation is the highest-value
            play because it permanently removes a blocker.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before using the merci, scan every fan and mentally
            simulate what happens after pulling each candidate card. Pick the one that
            unlocks the longest chain of moves toward the foundations.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Be Cautious With Foundation Timing
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In many solitaire games, sending cards to foundations as quickly as possible is
          the correct approach. La Belle Lucie is different. Because tableau building is
          same-suit and descending, you sometimes need mid-rank cards to remain in the
          tableau as building targets for the cards above them.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          For example, imagine the 8 of hearts is on top of a fan and the 7 of hearts
          is buried in another fan. If you send the 8 to the foundation now, you lose
          the ability to place the 7 onto it later in the tableau. That 7 may then have
          no valid destination and become permanently stuck.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The safe rule: always send Aces and Twos to foundations immediately — they are
          never useful as tableau building targets. For ranks 3 and above, check whether
          the card one rank below in the same suit still needs a tableau home before
          committing.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> If the card one rank below (same suit) is
            already on a foundation or is the top card of a fan with a clear path to the
            foundation, send the higher card up. Otherwise, consider holding it in the
            tableau.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Master Same-Suit Building
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          , where you build tableau sequences with alternating colors, La Belle Lucie
          requires same-suit descending order. You can only place the 9 of clubs onto
          the 10 of clubs — not onto the 10 of diamonds or hearts. This dramatically
          reduces your options at every step.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Because of this restriction, every fan essentially belongs to one suit at a
          time. You cannot interleave suits to create long sequences the way you would
          in alternating-color games. Instead, think in terms of single-suit chains:
          can you build a run of hearts from 9 down to 5, then send them all to the
          foundation in order?
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Track each suit independently.</strong>{" "}
            Know where every card of each suit sits across all fans.
          </li>
          <li>
            <strong className="text-white/90">Build downward to create foundation chains.</strong>{" "}
            A descending same-suit sequence on a fan can be fed to the foundation one
            card at a time from the top.
          </li>
          <li>
            <strong className="text-white/90">Empty fans are gold.</strong> An empty fan
            can receive any single card, giving you a temporary storage spot to
            rearrange sequences.
          </li>
        </ul>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Plan Across All Three Deals
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The strongest La Belle Lucie players think in three phases: the initial deal,
          the first redeal, and the second redeal (plus merci). Each phase has different
          priorities, and moves made in one phase should set up success in the next.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          During the initial deal, focus on sending Aces and low cards to foundations
          while carefully noting which cards are deeply buried. You probably will not
          clear many fans on the first deal — and that is fine. The goal is to reduce
          the total card count and position yourself for a productive first redeal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          After the first redeal, the fans are reshuffled and you get a fresh layout.
          Now push harder toward the foundations. Try to clear entire suits up to their
          current foundation rank. Save the second redeal for when you are truly stuck,
          and remember that the merci comes after it — plan your second-redeal play with
          the merci in mind.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before each redeal, count how many cards remain in
            the tableau. Fewer cards mean fewer fans after the shuffle, which means more
            single-card and two-card fans — these are much easier to work with than
            full three-card fans.
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
          Tip #7: Recognize Unwinnable Games Early
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Not every La Belle Lucie deal is solvable. Some arrangements of cards create
          deadlocks that no amount of skill can overcome. Recognizing these situations
          early saves time and frustration, letting you start a fresh deal with better
          prospects.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Warning signs of an unwinnable game:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            Multiple Aces are buried at the bottom of fans with no way to reach them
            even after a redeal pattern change
          </li>
          <li>
            Key cards of the same suit are stacked in reverse order within a single fan
            (e.g., 5 on top of 7 on top of 9, all spades)
          </li>
          <li>
            After the second redeal, you cannot make any moves without the merci and the
            merci does not unlock a meaningful chain
          </li>
          <li>
            All four suits are blocked at the same rank with no available plays to break
            through
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t feel bad about restarting.</strong> Even expert players lose
            the majority of La Belle Lucie games. The game&apos;s low win rate is part of
            its charm — when you do win, it feels genuinely earned. Start a new deal
            and apply these tips to a more favorable layout.
          </p>
        </div>
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
              <strong>Only the top card is playable.</strong> Scan all fans and think
              before moving — every play reveals a new card.
            </li>
            <li>
              <strong>Use redeals strategically.</strong> Exhaust all moves before
              redealing; fewer remaining cards mean better shuffles.
            </li>
            <li>
              <strong>Save the merci for maximum impact.</strong> Use it on the card
              that triggers the longest chain of follow-up moves.
            </li>
            <li>
              <strong>Don&apos;t rush cards to foundations.</strong> Hold mid-rank cards
              if the card one rank below (same suit) still needs a tableau target.
            </li>
            <li>
              <strong>Build same-suit descending sequences.</strong> Think in single-suit
              chains, not alternating colors.
            </li>
            <li>
              <strong>Plan across all three deals.</strong> Each phase has different
              priorities — reduce card count early, push foundations later.
            </li>
            <li>
              <strong>Recognize unwinnable games.</strong> Some deals cannot be solved —
              restart and apply these tips to a better layout.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/la-belle-lucie/how-to-play" title="How to Play La Belle Lucie" description="Complete rules, fan layout, redeals, and merci rule explained." />
            <ContentLinkCard href="/la-belle-lucie" title="Play La Belle Lucie" description="Put these tips into practice with free online La Belle Lucie." />
            <ContentLinkCard href="/cruel/tips" title="Cruel Solitaire Tips" description="Tips for Cruel — another fan-based patience game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Apply these tips one at a time and watch your win rate climb."
          primaryLabel="Play La Belle Lucie"
          primaryHref="/la-belle-lucie"
          secondaryLabel="Learn the Rules"
          secondaryHref="/la-belle-lucie/how-to-play"
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
          More La Belle Lucie Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/la-belle-lucie" title="Play La Belle Lucie" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/la-belle-lucie/how-to-play" title="How to Play La Belle Lucie" description="Complete rules, fans, redeals, and merci" />
          <ContentLinkCard href="/cruel/tips" title="Cruel Solitaire Tips" description="Tips for the fan-based Cruel patience game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/spider/tips" title="Spider Solitaire Tips" description="Tips for 1-suit, 2-suit, and 4-suit Spider" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
