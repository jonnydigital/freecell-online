import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "La Belle Lucie Strategy Guide | Fan Solitaire Winning Techniques",
  description:
    "Master La Belle Lucie with expert strategies for fan analysis, redeal planning, foundation timing, buried card recovery, and the merci rule. Win more games of this classic fan solitaire.",
  keywords: [
    "la belle lucie strategy",
    "la belle lucie solitaire strategy",
    "la belle lucie winning strategy",
    "fan solitaire strategy guide",
    "la belle lucie tips and tricks",
    "la belle lucie redeal strategy",
    "how to win la belle lucie",
    "la belle lucie merci rule",
    "fan solitaire winning techniques",
    "la belle lucie foundation timing",
    "la belle lucie expert guide",
  ],
  alternates: {
    canonical: absoluteUrl("/la-belle-lucie/strategy"),
  },
  openGraph: {
    title: "La Belle Lucie Strategy Guide | Fan Solitaire Winning Techniques",
    description:
      "Expert strategies for La Belle Lucie: fan analysis, redeal planning, foundation building order, buried card recovery, and mastering the merci draw.",
    url: absoluteUrl("/la-belle-lucie/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for La Belle Lucie?",
    answer:
      "The best strategy combines three elements: careful fan analysis before making any moves, disciplined redeal planning that maximizes the value of your two reshuffles, and precise foundation timing that avoids prematurely sending cards to foundations when they could be more useful as fan tops. Expert players also plan their entire endgame around the merci draw, which lets you pull one buried card after the final redeal.",
  },
  {
    question: "How many redeals do you get in La Belle Lucie?",
    answer:
      "You get exactly two redeals in standard La Belle Lucie. Each redeal gathers all remaining tableau cards, shuffles them randomly, and redeals them into fans of three (with any remainder forming a smaller fan). These redeals are your primary recovery mechanism — use the first to break through initial blockages and the second to set up your endgame. Some versions also include a merci draw after the final redeal.",
  },
  {
    question: "What is the merci rule in La Belle Lucie?",
    answer:
      "The merci (French for mercy) is a special rule in many La Belle Lucie implementations that grants you one free draw after your final redeal. You can pull any single card from anywhere in the tableau — even one buried deep in a fan — and either play it to a foundation or place it on top of another fan. This single draw is extraordinarily powerful and should be planned for from the mid-game onward.",
  },
  {
    question: "How does La Belle Lucie differ from Cruel solitaire?",
    answer:
      "Both are fan-based games with redeals, but the mechanics differ fundamentally. Cruel redeals are deterministic — cards are gathered in order and redealt without shuffling, meaning you can predict the exact result. La Belle Lucie redeals are random shuffles, making them unpredictable but potentially more helpful. Cruel gives unlimited redeals while La Belle Lucie gives only two. This makes Cruel more about calculation and La Belle Lucie more about adaptive strategy.",
  },
  {
    question: "What win rate can I expect in La Belle Lucie?",
    answer:
      "La Belle Lucie is one of the harder solitaire variants. Expert players with the merci rule can expect to win roughly 20-30% of games. Without the merci, the win rate drops to around 5-15%. Many deals are mathematically unsolvable regardless of play quality. Recognizing unwinnable positions early — rather than grinding through them — is itself an important skill that improves your effective win rate over time.",
  },
];

export default function LaBelleLucieStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "La Belle Lucie", item: absoluteUrl("/la-belle-lucie") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/la-belle-lucie/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "La Belle Lucie Strategy Guide",
        description: "Expert strategies for La Belle Lucie covering fan analysis, redeal planning, foundation timing, buried card recovery, and the merci rule.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-30",
        dateModified: "2026-03-30",
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
        title="La Belle Lucie Strategy Guide"
        kicker={<><Link href="/la-belle-lucie" className="hover:text-white transition-colors">La Belle Lucie</Link> / Strategy</>}
        subtitle="Expert strategies for the elegant fan solitaire — from reading the initial layout to mastering redeals, foundation timing, and the decisive merci draw."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "La Belle Lucie", href: "/la-belle-lucie" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          La Belle Lucie strategy rests on three pillars: <strong className="text-white">read every fan before touching a card — the opening layout tells you which suits are viable and which are trapped</strong>,{" "}
          <strong className="text-white">treat your two redeals as strategic resets, not panic buttons</strong>, and{" "}
          <strong className="text-white">plan your endgame around the merci draw from the moment the second redeal lands</strong>.
          Every move should either free a buried card, extend a foundation sequence, or position your tableau for the next redeal. Moves that accomplish none of these waste your limited opportunities.
        </p>
      </div>

      {/* Section 1: Fan Analysis and Reading the Initial Layout */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Fan Analysis: Reading the Initial Layout
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          <Link href="/la-belle-lucie" className="text-[var(--gold)] hover:text-white transition-colors">
            La Belle Lucie
          </Link>{" "}
          begins with all 52 cards dealt face-up into 17 fans of three cards and one fan of a single card.
          Every card is visible from the start — there is no hidden information, no stock pile, no mystery.
          This complete transparency is both the game&apos;s gift and its challenge. Unlike{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          or{" "}
          <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider
          </Link>
          , where hidden cards introduce uncertainty, La Belle Lucie is a puzzle of pure logic —
          and reading the initial layout correctly is the first step toward solving it.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Only the top card of each fan is playable. The two cards beneath it are locked until the card
          above them is moved to a foundation or used to build on another fan top. This means 34 of
          52 cards are immediately inaccessible. Your opening analysis must identify which of the 18
          playable cards (17 fan tops plus the single card) can create useful chains, and which are
          dead ends that will require a redeal to resolve.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Begin every game by scanning for Aces. Any Ace sitting on top of a fan can go straight to a
          foundation. An Ace buried second or third in a fan tells you that fan&apos;s top cards need
          to move before that Ace becomes available. Now look at the cards sitting on top of the Aces —
          can they be played elsewhere? If a 7 of Hearts sits on the Ace of Hearts, and the 8 of Hearts
          is a fan top somewhere, you have an immediate two-move sequence: play the 7 onto the 8, then
          play the Ace to the foundation. These opening chains are the foundation of your first phase.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Locate all four Aces.</strong> Note whether each is on top
            (immediately playable), in the middle (one card to clear), or at the bottom (two cards to
            clear). This tells you the difficulty of starting each suit&apos;s foundation.
          </li>
          <li>
            <strong className="text-white/90">Trace natural sequences.</strong> Look for consecutive
            same-suit cards that happen to be fan tops. A fan-top 5 of Spades and a fan-top 4 of Spades
            mean the 4 can build onto the 5, freeing whatever sat beneath the 4.
          </li>
          <li>
            <strong className="text-white/90">Identify blocked suits.</strong> If a suit&apos;s Ace is
            at the bottom of a fan, and the cards above it cannot be moved anywhere, that suit is blocked
            until a redeal. Knowing this early prevents wasted effort.
          </li>
          <li>
            <strong className="text-white/90">Count available moves.</strong> Before playing anything,
            count every legal move on the board. Games with fewer than 4-5 opening moves are often
            unwinnable and may not be worth pursuing.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> The single-card fan is your most flexible asset. That card can
            be played immediately to a foundation or built onto another fan, and doing so creates an empty
            space. While empty fans in La Belle Lucie cannot receive cards (unlike{" "}
            <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
              FreeCell
            </Link>&apos;s
            free cells), removing the single card still reduces complexity by eliminating one fan from
            the board entirely.
          </p>
        </div>
      </section>

      {/* Section 2: Redeal Planning */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Redeal Planning: Making Your Two Shuffles Count
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The two redeals are La Belle Lucie&apos;s central strategic resource. When you redeal, all
          remaining tableau cards are gathered up, shuffled randomly, and redealt into fresh fans of
          three. Cards already on foundations stay put — only tableau cards are reshuffled. Each redeal
          is a complete reset of the tableau that can transform an impossible position into a solvable
          one, or squander your chances if used carelessly.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The randomness of redeals means you cannot predict the exact outcome, but you can maximize
          their value through preparation. The fewer cards remaining when you redeal, the better your
          odds. If you can move 15-20 cards to foundations before your first redeal, the remaining 32-37
          cards will form only 11-13 fans instead of 18. Fewer fans means fewer trapped cards, more
          accessible Aces, and longer natural sequences on the new layout.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Timing your first redeal is a judgment call between two competing pressures. Redealing too
          early wastes moves you could have made on the current layout — every card sent to a foundation
          before the redeal is one fewer card that needs to be dealt with afterward. But waiting too
          long means you are staring at a board with zero productive moves, spinning your wheels while
          no progress is made. The sweet spot is when you have exhausted every move that sends a card
          to a foundation or creates a new playable sequence, and only &ldquo;shuffling&rdquo; moves
          remain that rearrange fan tops without advancing toward victory.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Maximize foundations before redealing.</strong> Every card
            on a foundation is permanently solved. Push as many cards as possible out of the tableau
            before triggering a redeal.
          </li>
          <li>
            <strong className="text-white/90">Don&apos;t hoard redeals.</strong> Using your first
            redeal after moving only 4-5 cards to foundations is too early, but hoarding it while
            the board is completely stalled is equally wasteful. If no productive move exists, redeal
            immediately.
          </li>
          <li>
            <strong className="text-white/90">The second redeal is your last chance.</strong> After
            the second redeal, you have only the tableau moves (and possibly the merci draw) remaining.
            Make the second redeal count by maximizing foundations between the first and second redeals.
          </li>
          <li>
            <strong className="text-white/90">Track your foundation progress.</strong> A good benchmark:
            8-12 cards to foundations before the first redeal, 20-30 before the second. If you are
            significantly below these numbers, the deal may be unwinnable.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Strategic trade-off:</strong> Sometimes you can make a tableau move that does not
            directly send a card to a foundation but improves the structure for the upcoming redeal.
            For example, building a fan-top card onto another fan frees the card beneath it, giving
            you access to one more card before the redeal. These preparatory moves are often worth
            making — but only if they lead to at least one additional foundation play.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Foundation Building Order and Timing */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Foundation Building Order and Timing
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In most solitaire variants, sending a card to the foundation is always correct — the sooner
          you get cards out of the tableau, the better. La Belle Lucie breaks this rule. Because only
          the top card of each fan is playable, a card sitting on top of a fan has active strategic
          value: it can be used to build on another fan, creating chains that free buried cards. Once
          that card goes to a foundation, it is gone and the card beneath it becomes the new fan top.
          Sometimes the card beneath is more useful exposed — but sometimes it is not, and you have
          traded an active asset for passive progress.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The decision of when to send a card to a foundation depends on what lies beneath it. If a
          Queen of Diamonds is a fan top, and the Jack of Diamonds sits on top of another fan, you
          might want to build the Jack onto the Queen first (creating a Q-J sequence) before sending
          the Queen to a foundation. But if you send the Queen to foundations immediately, the Jack
          loses its building target and becomes a dead card until a King of Diamonds appears as a fan
          top. Sequencing matters enormously.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Foundation priorities should be guided by suit accessibility. If Hearts has the Ace, 2, and 3
          all immediately playable (through a chain of moves), build that suit aggressively — three
          cards removed from the tableau means three fewer cards cluttering the next redeal. But if
          Clubs has only the Ace available and the 2 is buried at the bottom of a fan, sending the Ace
          of Clubs to foundations accomplishes little by itself. Consider waiting if the Ace is serving
          as a useful building surface on the tableau.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Build suits that chain.</strong> If you can send Ace, 2,
            3, and 4 of a suit to foundations in sequence, that is four cards eliminated. Prioritize
            suits where multiple cards are accessible over suits where only the Ace is free.
          </li>
          <li>
            <strong className="text-white/90">Check what is beneath before building.</strong> Before
            sending a fan top to foundations, look at the card beneath it. If that card enables a new
            move or chain, the foundation play is valuable. If the card beneath is blocked or useless,
            the play only helps marginally.
          </li>
          <li>
            <strong className="text-white/90">Low cards to foundations almost always.</strong> Aces
            and 2s have minimal tableau value — they cannot have cards built onto them in the tableau
            (building is downward by suit). Send them to foundations immediately unless you are
            about to redeal and prefer to keep them for structural reasons.
          </li>
          <li>
            <strong className="text-white/90">High cards need more thought.</strong> A King on a fan
            top is a potential building target for a Queen. Sending it to foundations (which you
            cannot do until 12 other cards of that suit are already there) would be the last play
            of that suit — but mid-rank cards like 7s, 8s, and 9s sitting on fan tops are active
            building surfaces. Evaluate before removing them.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Think of foundation building as a funnel. In the early game,
            send low cards freely — they are cheap to lose from the tableau. In the mid-game, evaluate
            each foundation play individually. In the endgame after the final redeal, send everything
            you can — there are no more redeals to bail you out, and every card on a foundation is one
            step closer to victory.
          </p>
        </div>
      </section>

      {/* Section 4: Uncovering Buried Key Cards */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Uncovering Buried Key Cards
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Every fan in La Belle Lucie is a stack of three cards where only the top card is accessible.
          The two buried cards might include Aces you need for foundations, mid-rank cards critical to
          building chains, or cards whose absence blocks an entire suit&apos;s progress. Identifying
          which buried cards are critical — and working systematically to expose them — is the
          difference between winning and watching the game stall out.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Uncovering a buried card requires removing the card(s) above it. The top card of a fan can
          be moved in exactly two ways: played to a foundation (if it continues a foundation sequence)
          or placed on top of another fan whose top card is the same suit and one rank higher. If
          neither option exists for a fan top, that fan is locked — the buried cards beneath it are
          inaccessible until a redeal changes the layout.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Cascading plays are where La Belle Lucie strategy gets interesting. Moving card A from fan 1
          exposes card B. If card B can then be played (to a foundation or another fan), it exposes
          card C. These chains can unlock 3, 4, even 5 cards in sequence from a single initiating move.
          Identifying these cascades before executing them is essential — you need to verify the entire
          chain works before committing to the first move, because partial chains can leave you in a
          worse position than where you started.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Prioritize uncovering Aces.</strong> A buried Ace blocks
            an entire suit from starting its foundation. Freeing an Ace typically opens a cascade:
            Ace to foundation, then the 2 of that suit (if available) follows, then the 3, and so on.
          </li>
          <li>
            <strong className="text-white/90">Trace cascades before executing.</strong> Before moving
            a fan top, follow the chain forward: what does the move expose? Can that card be played?
            What does <em>that</em> expose? Map the full cascade mentally before playing the first card.
          </li>
          <li>
            <strong className="text-white/90">Not all buried cards are equal.</strong> A buried 9 in
            a suit where you already have the 5, 6, 7, and 8 on foundations is critical — it is the
            next card needed. A buried 9 in a suit where the Ace is also buried is low priority —
            you cannot use it anytime soon regardless.
          </li>
          <li>
            <strong className="text-white/90">Use builds to uncover, not just foundations.</strong> If
            a fan top cannot go to foundations but can be built onto another fan, that build still frees
            the card beneath. Building moves that expose critical buried cards are just as valuable as
            foundation plays.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Strategic trade-off:</strong> Sometimes uncovering one buried card requires building
            a fan top onto another fan in a way that <em>buries</em> a different useful card. Before
            making this trade, compare the value of what you&apos;re uncovering versus what you&apos;re
            burying. Uncovering an Ace is almost always worth burying a mid-rank card. Burying a card
            you need within the next 3-4 moves is rarely worth it regardless of what you uncover.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: The Merci Rule */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          The Merci Rule: Your Final Lifeline
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In many implementations of La Belle Lucie, after the final redeal you are granted one
          &ldquo;merci&rdquo; (mercy) draw. This allows you to pull any single card from anywhere in
          the tableau — regardless of its position in a fan — and play it to a foundation or place it
          on top of another fan. This single draw breaks the game&apos;s core constraint that only fan
          tops are playable, and it is powerful enough to determine the outcome of 10-15% of all games.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The merci draw should be thought of as a keystone that your entire endgame is built around.
          After the second redeal, scan the tableau and identify the single most critical blockage —
          the one card whose inaccessibility prevents you from completing the game. That card is your
          merci target. Every move you make after the final redeal should be oriented toward a position
          where pulling that one card with the merci draw unlocks a cascade that reaches the win.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Planning for the merci draw starts before the second redeal. As you play through the
          post-first-redeal phase, keep a mental note of which cards are consistently problematic.
          If the 6 of Clubs has been buried in every layout so far, it will likely be an issue after
          the second redeal too. Building your foundations so that the 6 of Clubs is the critical
          gap — the one card that completes a long chain — positions you to use the merci draw
          with maximum impact.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Save the merci for maximum impact.</strong> Do not use
            the merci draw on the first blockage you encounter. Play out all normal moves first, then
            use the merci on the single card that unlocks the most subsequent plays.
          </li>
          <li>
            <strong className="text-white/90">Target foundation-critical cards.</strong> The best
            merci targets are cards that are next in a foundation sequence and buried behind cards
            that themselves have no legal moves. Pulling such a card can trigger a 5-10 card cascade.
          </li>
          <li>
            <strong className="text-white/90">Consider placing the merci card on a fan.</strong> The
            merci card does not have to go to a foundation. Sometimes placing it on top of a fan creates
            a building chain that ultimately sends more cards to foundations than a direct foundation play.
          </li>
          <li>
            <strong className="text-white/90">Map the cascade before drawing.</strong> Before using
            the merci, trace the full sequence of moves that will follow. If pulling card X lets you
            play Y, then Z, then W to foundations — and that chain ends with the game won — you have
            found the right target.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Using the merci draw impulsively on the first stuck
            position after the final redeal. Patience is essential. Play out every normal move first,
            even seemingly unproductive rearrangements. The merci is your absolute last resort — once
            it is spent, every remaining blockage is permanent. Make it count by ensuring it removes
            the one obstacle that matters most.
          </p>
        </div>
      </section>

      {/* Section 6: La Belle Lucie vs Cruel */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          La Belle Lucie vs Cruel: Two Philosophies of Fan Solitaire
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          La Belle Lucie and{" "}
          <Link href="/cruel" className="text-[var(--gold)] hover:text-white transition-colors">
            Cruel
          </Link>{" "}
          are both fan-based solitaire games built on the same foundation: cards dealt into small fans,
          only fan tops playable, building to foundations by suit. But their redeal mechanics create
          fundamentally different strategic experiences. Understanding these differences is essential
          for players of either game — and especially for players transitioning between them.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Cruel&apos;s redeal is deterministic. Cards are gathered from the fans in order (left to
          right, top to bottom) and redealt into fans of four without shuffling. This means you can
          predict the exact post-redeal layout before triggering it. Skilled Cruel players calculate
          2-3 redeals ahead, choosing precisely which cards to move before redealing so that the
          resulting layout places critical cards on fan tops. Cruel is fundamentally a calculation game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          La Belle Lucie&apos;s redeal is random. You cannot predict where cards will end up after
          reshuffling. This makes La Belle Lucie more about adaptive strategy: maximizing foundation
          progress before each redeal (to reduce the number of cards that need to be dealt with
          afterward) and responding effectively to whatever the new layout presents. Where Cruel
          rewards calculation, La Belle Lucie rewards flexibility and reading ability.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Strategic Element</span>
            <span>La Belle Lucie</span>
            <span>Cruel</span>
          </div>
          {[
            ["Redeal type", "Random shuffle", "Deterministic (ordered, no shuffle)"],
            ["Redeals allowed", "2 total", "Unlimited"],
            ["Fan size", "3 cards per fan", "4 cards per fan"],
            ["Merci draw", "Yes (after final redeal)", "No"],
            ["Planning style", "Adaptive — respond to new layouts", "Calculative — predict exact outcomes"],
            ["Win rate (expert)", "20-30% (with merci)", "30-40%"],
          ].map(([element, lucie, cruel], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{element}</span>
              <span>{lucie}</span>
              <span>{cruel}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed">
          The biggest strategic difference comes down to how you use redeals. In Cruel, a redeal is a
          precision tool — you set up the tableau so the deterministic reshuffle places specific cards
          where you need them. In La Belle Lucie, a redeal is a controlled gamble — you maximize
          foundations to shrink the remaining card pool, then hope the random shuffle gives you
          workable fans. Both games reward deep thinking, but they exercise different strategic muscles.
          Cruel players are architects designing exact outcomes; La Belle Lucie players are improvisers
          making the best of whatever hand they are dealt.
        </p>
      </section>

      {/* Quick Reference Cheat Sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Strategy Cheat Sheet
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Read the full layout first.</strong> Locate all four Aces, trace natural same-suit
              sequences, and count available opening moves before playing a single card.
            </li>
            <li>
              <strong>Play cascading chains.</strong> Moves that trigger 2-3 follow-up plays are far
              more valuable than isolated single moves. Identify and execute chains.
            </li>
            <li>
              <strong>Send low cards to foundations freely.</strong> Aces and 2s have no tableau
              building value — get them out immediately.
            </li>
            <li>
              <strong>Redeal only when stuck.</strong> Exhaust every productive move before using a
              redeal. Every card on a foundation before a redeal shrinks the problem space.
            </li>
            <li>
              <strong>Plan the merci draw early.</strong> From the mid-game onward, identify which
              card will be your merci target and orient your play around it.
            </li>
            <li>
              <strong>Build before foundation when it unlocks.</strong> Sometimes building a fan top
              onto another fan (instead of to foundations) exposes a critical buried card. Evaluate both options.
            </li>
            <li>
              <strong>Recognize unwinnable deals.</strong> If after the second redeal you have no
              productive moves and the merci cannot bridge the gap, restart. Do not grind.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/la-belle-lucie/how-to-play" title="How to Play La Belle Lucie" description="Complete rules, setup, and valid moves for La Belle Lucie solitaire." />
            <ContentLinkCard href="/la-belle-lucie/tips" title="La Belle Lucie Tips & Tricks" description="Quick, practical tips for improving your La Belle Lucie game." />
            <ContentLinkCard href="/cruel/strategy" title="Cruel Strategy Guide" description="Strategy guide for La Belle Lucie's deterministic cousin." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your La Belle Lucie knowledge to the test. Play free online La Belle Lucie solitaire with unlimited undo and instant new deals."
          primaryLabel="Play La Belle Lucie"
          primaryHref="/la-belle-lucie"
          secondaryLabel="Learn the Rules"
          secondaryHref="/la-belle-lucie/how-to-play"
        />
      </div>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* FAQ Section */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
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
          <ContentLinkCard href="/la-belle-lucie" title="Play La Belle Lucie" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/la-belle-lucie/how-to-play" title="How to Play La Belle Lucie" description="Complete rules, setup, and move guide" />
          <ContentLinkCard href="/la-belle-lucie/tips" title="La Belle Lucie Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/cruel/strategy" title="Cruel Strategy Guide" description="Strategy for La Belle Lucie's deterministic cousin" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
