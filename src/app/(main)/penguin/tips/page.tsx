import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Penguin Solitaire Tips & Tricks | Master the Wrapping Foundation Game",
  description:
    "Master Penguin Solitaire with expert tips on beak rank analysis, same-suit sequence building, flipper cell management, empty column strategy, and wrapping foundations. Achieve the 90-95% win rate.",
  keywords: [
    "penguin solitaire tips",
    "penguin solitaire strategy",
    "penguin solitaire tricks",
    "penguin solitaire tips and tricks",
    "how to win penguin solitaire",
    "penguin solitaire help",
    "penguin card game tips",
    "penguin solitaire winning tips",
    "penguin solitaire advice",
    "tips for penguin solitaire",
    "penguin solitaire guide",
  ],
  openGraph: {
    title: "Penguin Solitaire Tips & Tricks | Master the Wrapping Foundation Game",
    description:
      "Expert tips to master Penguin Solitaire. Learn beak rank analysis, same-suit sequence building, flipper cell management, and how to achieve the 90-95% win rate.",
    url: absoluteUrl("/penguin/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Penguin Solitaire?",
    answer:
      "Study the beak rank immediately and trace the full foundation sequence before making any moves. Since foundations build up by suit from the beak rank and wrap from King through Ace, knowing the exact 13-card sequence for each suit lets you plan which cards to prioritize uncovering and when to feed them to foundations.",
  },
  {
    question: "How should I use the flipper cell in Penguin Solitaire?",
    answer:
      "Treat the flipper cell as a last resort, not a convenience. With only one temporary storage slot, placing a card there means you cannot use it again until that card moves to a foundation or tableau column. The best use is to briefly hold a card that immediately unblocks a critical sequence or foundation play on your very next move.",
  },
  {
    question: "What win rate can I expect in Penguin Solitaire?",
    answer:
      "Penguin Solitaire has one of the highest win rates of any solitaire variant — experienced players can achieve 90-95% with careful play. The combination of same-suit sequence moves, a known beak rank, and flexible empty column rules makes the vast majority of deals solvable. If you're winning less than 80%, focus on the tips in this guide.",
  },
  {
    question: "How does wrapping work in Penguin Solitaire?",
    answer:
      "Wrapping applies to both foundations and tableau. On foundations, after placing a King you continue with Ace, then 2, 3, and so on until you reach one rank below the beak. On the tableau, you can place a King on an Ace of the same suit when building down. For example, if the beak rank is 7, the foundation sequence is 7-8-9-10-J-Q-K-A-2-3-4-5-6, and on the tableau you can build 2-A-K-Q and so on.",
  },
  {
    question: "Why are empty columns so important in Penguin Solitaire?",
    answer:
      "Empty columns are your primary maneuvering space in Penguin Solitaire. Any card or same-suit descending sequence can fill an empty column, giving you enormous flexibility to reorganize the tableau. With seven columns and only one flipper cell, empty columns effectively multiply your temporary storage — each empty column lets you park an entire sequence while you work on uncovering buried cards.",
  },
];

export default function PenguinTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Penguin Solitaire", item: absoluteUrl("/penguin") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/penguin/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Penguin Solitaire Tips & Tricks",
        description: "Expert tips for mastering Penguin Solitaire's wrapping foundations, same-suit sequences, and flipper cell strategy.",
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
        title="Penguin Solitaire Tips & Tricks"
        kicker={<><Link href="/penguin" className="hover:text-white transition-colors">Penguin Solitaire</Link> / Tips</>}
        subtitle="Expert strategies for mastering wrapping foundations — from beak rank analysis and same-suit sequence building to flipper cell management, empty column tactics, and achieving the 90-95% win rate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Penguin Solitaire", href: "/penguin" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">study the beak rank and trace the full wrapping sequence before moving a single card</strong>.
          Penguin Solitaire is one of the most winnable solitaire games (90-95% with expert play), but only
          if you understand the wrapping foundation order and plan your same-suit sequences accordingly.
          Guard the single flipper cell, create empty columns early, and move sequences — not individual cards — whenever possible.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Study the Beak Rank First — Trace the Full Foundation Sequence
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/penguin" className="text-[var(--gold)] hover:text-white transition-colors">
            Penguin Solitaire
          </Link>
          , a random &ldquo;beak&rdquo; card is chosen at the start, and all four cards of that rank are
          immediately placed on the foundations. Every strategic decision flows from this starting rank,
          so understanding the full foundation sequence is your first and most important task.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Foundations build up by suit from the beak rank, wrapping from King through Ace. If the beak
          rank is 7, each foundation builds: 7 &rarr; 8 &rarr; 9 &rarr; 10 &rarr; J &rarr; Q &rarr; K
          &rarr; A &rarr; 2 &rarr; 3 &rarr; 4 &rarr; 5 &rarr; 6. The final card on each foundation
          will always be one rank below the beak.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before touching any tableau card, mentally walk through the sequence for each suit. Identify
          which cards are immediately playable, which are buried deep in columns, and which are sitting
          in accessible positions. This initial scan takes 30 seconds but saves minutes of backtracking.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Identify blockers:</strong> Which high-priority foundation
            cards are buried under other cards?
          </li>
          <li>
            <strong className="text-white/90">Spot free plays:</strong> Which foundation cards are
            already on top of their columns and can move immediately?
          </li>
          <li>
            <strong className="text-white/90">Note the endgame rank:</strong> The rank just below the
            beak is the last card needed on each foundation — know where all four of those cards are
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> If the beak rank is high (J, Q, K), the wrapping portion is short
            and most of the sequence is straightforward ascending. If the beak rank is low (A, 2, 3),
            you&apos;ll spend most of the game in familiar ascending territory before wrapping near the end.
            Mid-range beaks (6-9) require the most careful tracking since wrapping happens mid-sequence.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Build Long Same-Suit Descending Sequences
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Penguin Solitaire&apos;s tableau builds down by same suit, and crucially, you can move
          entire same-suit descending sequences as a group. This is one of the game&apos;s most
          powerful mechanics — a well-built sequence of five or six cards can be relocated in a single
          move, dramatically reorganizing the tableau.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Prioritize building on existing sequences.</strong> If you
          have a column running Q&hearts; &rarr; J&hearts; &rarr; 10&hearts;, adding the 9&hearts;
          creates a four-card movable unit. This is far more valuable than starting a new sequence
          elsewhere because it consolidates cards and frees up column space.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Avoid breaking established sequences unless absolutely necessary. Moving one card out of a
          sequence to make a different play splits your movable unit and often creates more problems
          than it solves. Instead, look for ways to build onto sequences from the bottom while feeding
          cards off the top to foundations.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Since tableau building is same-suit only, each suit effectively
            has its own independent sequence. This means you&apos;re managing four parallel building
            tracks in the tableau alongside four foundation tracks. Keep the suits mentally separated
            to avoid confusion about which cards belong where.
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
          Tip #3: Guard the Flipper Cell Carefully
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          with its four free cells, or{" "}
          <Link href="/seahaven" className="text-[var(--gold)] hover:text-white transition-colors">
            Seahaven Towers
          </Link>{" "}
          with its three, Penguin Solitaire gives you just one flipper cell. This single temporary
          storage slot is your most precious resource — use it wisely and it enables critical plays;
          waste it and you&apos;ll find yourself stuck with no room to maneuver.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">The ideal flipper cell use:</strong> Temporarily hold a card
          that will move to a foundation or tableau column on your very next move. The flipper cell
          should be a revolving door — cards go in and come out almost immediately. If a card sits in
          the flipper cell for more than one or two moves, you&apos;ve likely made an error.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Remember that the game starts with one card already in the flipper cell (the 48th card after
          dealing to the tableau). Your first priority should be finding a home for this card — either
          on a foundation if it&apos;s the next card in sequence, or onto a matching tableau column.
          Until the flipper cell is cleared, you have zero temporary storage.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Clear it immediately:</strong> Always prioritize emptying
            the flipper cell before making other moves
          </li>
          <li>
            <strong className="text-white/90">Plan before filling:</strong> Never place a card in the
            flipper cell without knowing exactly where it will go next
          </li>
          <li>
            <strong className="text-white/90">Use it for foundation plays:</strong> The best use is
            removing a card that blocks a foundation play, making the foundation move, then placing
            the flipper card back
          </li>
        </ul>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Create Empty Columns Early
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Empty columns are your secret weapon in{" "}
          <Link href="/penguin" className="text-[var(--gold)] hover:text-white transition-colors">
            Penguin Solitaire
          </Link>
          . Any card or same-suit descending sequence can be placed into an empty column, making each
          empty column effectively a super-powered free cell that can hold entire sequences rather than
          just single cards.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          With seven tableau columns and only one flipper cell, your maneuvering space comes almost
          entirely from empty columns. Two empty columns give you the flexibility to completely
          reorganize your tableau — you can park a sequence in one empty column, access buried cards,
          then rebuild in the second empty column.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Target the shortest columns first.</strong> Two of the
          seven columns start with only six cards instead of seven. These shorter columns are your
          best candidates for early emptying. Feed their cards to foundations or consolidate them
          onto matching sequences in other columns to free up the space quickly.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Once you have an empty column, resist the urge to fill it
            immediately. An empty column is often worth more as maneuvering space than as a home
            for a card. Only fill it when you have a specific multi-step plan that requires it, and
            ideally when doing so will empty a different column in return.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Understand Wrapping in Both Foundations and Tableau
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Wrapping is the mechanic that makes Penguin Solitaire unique. It applies to both foundations
          (building up) and the tableau (building down), and mastering it is essential for consistent wins.
          Many beginners forget that the King-to-Ace wrap works in both directions.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">On foundations:</strong> After placing a King, continue with
          the Ace of the same suit, then 2, 3, and so on until you reach the rank just below the beak.
          This means every foundation will contain all 13 ranks (minus the starting beak card that was
          pre-placed), regardless of where the sequence started.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">On the tableau:</strong> You can place a King on an Ace of
          the same suit when building down, creating sequences that wrap around. For example, 3&spades;
          &rarr; 2&spades; &rarr; A&spades; &rarr; K&spades; &rarr; Q&spades; is a perfectly valid
          same-suit descending sequence that can be moved as a group.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Foundation wrapping:</strong> K &rarr; A &rarr; 2 &rarr; 3
            (building up through the wrap)
          </li>
          <li>
            <strong className="text-white/90">Tableau wrapping:</strong> A &rarr; K &rarr; Q &rarr; J
            (building down through the wrap)
          </li>
          <li>
            <strong className="text-white/90">Both wrap the same gap:</strong> The K-A boundary is the
            only wrapping point — learn to see it as seamless rather than as an interruption
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Wrapping sequences on the tableau are especially powerful
            because they let you build longer movable groups than would otherwise be possible. A
            sequence that wraps around K-A can contain all 12 non-beak cards of a suit, giving you
            enormous flexibility in reorganizing the board.
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
          Tip #6: Feed Foundations Evenly
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          A common mistake in Penguin Solitaire is racing one foundation far ahead of the others. While
          it feels satisfying to stack six or seven cards on a single foundation, this creates an
          imbalance that can lock up the tableau. Cards you need for the lagging foundations may be
          buried under cards you&apos;ve been saving for the leading one.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Keep all four foundations within two or three cards of
          each other.</strong> This balanced approach ensures that you&apos;re clearing cards from the
          tableau at a steady rate across all suits, preventing any single suit from clogging up
          column space.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          There is one exception: if advancing a foundation frees up a critical empty column or
          unblocks a deeply buried card, it&apos;s worth pushing that foundation ahead temporarily.
          The key is doing it deliberately as part of a plan, not just because the cards happen to
          be available.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before sending a card to a foundation, ask: &ldquo;Will I need
            this card on the tableau to build a sequence for another suit?&rdquo; Since tableau building
            is same-suit only, the answer is usually no — but checking prevents the rare situation
            where you foundation a card you still needed as a tableau base.
          </p>
        </div>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Use Sequence Moves to Maximum Effect
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The ability to move entire same-suit descending sequences is what separates Penguin Solitaire
          from more restrictive games like{" "}
          <Link href="/beleaguered-castle" className="text-[var(--gold)] hover:text-white transition-colors">
            Beleaguered Castle
          </Link>
          , where you can only move one card at a time. Sequence moves let you accomplish in one action
          what would take multiple moves (or be impossible) in other solitaire variants.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Think in sequences, not individual cards.</strong> When
          scanning the tableau, train yourself to see groups of same-suit descending cards as single
          units. A column containing K&clubs; &rarr; Q&clubs; &rarr; J&clubs; isn&apos;t three
          separate cards — it&apos;s one movable block that needs a target with an A&clubs; on top
          (via wrapping) or can fill an empty column.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Sequence moves are also your primary tool for uncovering buried cards. Instead of laboriously
          moving cards one at a time to dig through a column, move an entire sequence to an empty column
          or onto a matching card elsewhere. This is why empty columns and long sequences complement
          each other so powerfully — sequences need empty columns to relocate, and relocating sequences
          creates access to buried cards.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Build before moving:</strong> If you can add one more card
            to a sequence before relocating it, do so — longer sequences are more valuable
          </li>
          <li>
            <strong className="text-white/90">Split strategically:</strong> Sometimes it&apos;s correct
            to move part of a sequence to access a card in the middle — but only when that card
            unlocks a foundation play or creates an empty column
          </li>
          <li>
            <strong className="text-white/90">Combine sequences:</strong> Moving one same-suit sequence
            onto another same-suit sequence creates an even longer movable group, consolidating column space
          </li>
        </ul>
      </section>

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Aim for Near-Perfect Win Rate (90-95%)
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Penguin Solitaire has one of the highest win rates of any{" "}
          <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
            solitaire variant
          </Link>
          . Expert players report winning 90-95% of deals — a dramatic contrast to games like{" "}
          <Link href="/accordion" className="text-[var(--gold)] hover:text-white transition-colors">
            Accordion
          </Link>{" "}
          (~2%) or even{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          (~80%). This high win rate means that when you lose, it&apos;s almost always because of a
          strategic error rather than an impossible deal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The generous win rate comes from Penguin&apos;s combination of powerful mechanics: same-suit
          sequence moves, wrapping in both directions, flexible empty column filling, and the fact that
          four cards start on foundations immediately. Together, these give you enough tools to untangle
          nearly any starting position.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          If your current win rate is below 80%, focus on three fundamentals: always clear the flipper
          cell as quickly as possible, create at least one empty column in your first few moves, and
          never fill an empty column without a multi-step plan. These three habits alone will push your
          win rate above 85%.
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t give up too early.</strong> Because the win rate is so high, most deals
            that look hopeless can still be won with enough rearrangement. Before restarting, make sure
            you&apos;ve truly exhausted all sequence moves and empty column combinations. Undo
            liberally — backtracking to try a different approach is how expert players push past 90%.
          </p>
        </div>
      </section>

      {/* Win rate context */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Sequences, Space, and Strategy
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Penguin Solitaire rewards three interconnected skills: building long same-suit sequences,
          managing column space, and planning multi-step maneuvers. These skills reinforce each other —
          long sequences consolidate space, space enables sequence relocation, and planning ties
          everything together into winning plays.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Over time, you&apos;ll develop an instinct for which moves create space and which consume it.
          You&apos;ll learn to see the tableau as a system of interconnected suits rather than a jumble
          of individual cards. And you&apos;ll start spotting multi-move combinations that unlock
          seemingly impossible positions.
        </p>
        <p className="text-white/70 leading-relaxed">
          The beauty of Penguin Solitaire is that its high win rate means your skill genuinely matters.
          Unlike low-win-rate games where luck dominates, Penguin rewards the player who takes time
          to{" "}
          <Link href="/penguin/how-to-play" className="text-[var(--gold)] hover:text-white transition-colors">
            understand the rules deeply
          </Link>{" "}
          and applies them with patience and precision. Every loss is a learning opportunity, and
          every win confirms that your strategy is sound.
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
              <strong>Study the beak rank first.</strong> Trace the full 13-card wrapping sequence
              for each suit before making any moves.
            </li>
            <li>
              <strong>Build long same-suit sequences.</strong> Longer sequences are more flexible
              and consolidate column space.
            </li>
            <li>
              <strong>Guard the flipper cell.</strong> One slot means every use must have a clear
              exit plan — never park a card without knowing its next destination.
            </li>
            <li>
              <strong>Create empty columns early.</strong> Target the two shorter columns first
              and resist filling empties without a multi-step plan.
            </li>
            <li>
              <strong>Master wrapping.</strong> K &rarr; A works in both foundations (up) and
              tableau (down) — treat it as seamless, not as an edge case.
            </li>
            <li>
              <strong>Feed foundations evenly.</strong> Keep all four within two or three cards
              of each other to prevent tableau congestion.
            </li>
            <li>
              <strong>Move sequences, not single cards.</strong> Think in groups — every same-suit
              descending run is a single movable unit.
            </li>
            <li>
              <strong>Expect to win.</strong> At 90-95% win rate, losses usually mean a missed
              combination — use undo to find it.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/penguin/how-to-play" title="How to Play Penguin Solitaire" description="Complete rules, setup, beak rank mechanics, and wrapping explained." />
            <ContentLinkCard href="/penguin" title="Play Penguin Solitaire" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="With a 90-95% win rate, Penguin Solitaire rewards strategy over luck. Apply these tips one at a time and watch your win rate climb."
          primaryLabel="Play Penguin Solitaire"
          primaryHref="/penguin"
          secondaryLabel="Learn the Rules"
          secondaryHref="/penguin/how-to-play"
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
          More Penguin Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/penguin" title="Play Penguin Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/penguin/how-to-play" title="How to Play Penguin Solitaire" description="Complete rules, setup, and wrapping mechanics explained" />
          <ContentLinkCard href="/seahaven/tips" title="Seahaven Towers Tips" description="Tips for another cell-based solitaire variant" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
