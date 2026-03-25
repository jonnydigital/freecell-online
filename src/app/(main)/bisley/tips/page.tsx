import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Bisley Solitaire Tips & Tricks | Master Dual-Direction Foundations",
  description:
    "Master Bisley Solitaire with practical tips on dual-direction foundation building, same-suit tableau sequencing, king foundation timing, meeting point planning, and leveraging the 70-80% win rate.",
  keywords: [
    "bisley solitaire tips",
    "bisley solitaire strategy",
    "bisley solitaire tricks",
    "bisley solitaire tips and tricks",
    "how to win bisley solitaire",
    "bisley solitaire help",
    "bisley card game tips",
    "bisley solitaire winning tips",
    "bisley solitaire advice",
    "tips for bisley solitaire",
    "bisley solitaire guide",
  ],
  openGraph: {
    title: "Bisley Solitaire Tips & Tricks | Master Dual-Direction Foundations",
    description:
      "Practical tips for mastering dual-direction foundation building in Bisley Solitaire. Learn king foundation timing, meeting point strategy, same-suit building, and how to leverage the 70-80% win rate.",
    url: absoluteUrl("/bisley/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Bisley Solitaire?",
    answer:
      "Plan the meeting point for each suit from the very beginning. Since ace foundations build up and king foundations build down, the two sequences for each suit will eventually meet at consecutive ranks. Knowing roughly where that meeting point will be — and working both directions toward it — is the key to clearing all four suits efficiently.",
  },
  {
    question: "How often can you win Bisley Solitaire?",
    answer:
      "Bisley Solitaire has a generous win rate of roughly 70-80% with expert play. The combination of all cards being face-up, flexible same-suit tableau building in both directions, and dual-direction foundations gives skilled players many paths to victory. Most losses come from avoidable blocking mistakes rather than unwinnable deals.",
  },
  {
    question: "When should I move Kings to the king foundations in Bisley Solitaire?",
    answer:
      "Move Kings to their foundation slots as early as possible. Kings sitting in the tableau block the cards beneath them, and since king foundations build down by suit, getting Kings onto their foundations immediately opens up those columns and gives you a second direction to build. There is no strategic reason to delay moving a King to its foundation.",
  },
  {
    question: "Can I fill empty columns in Bisley Solitaire?",
    answer:
      "No — empty columns cannot be filled in Bisley Solitaire. Once a column is cleared, it stays empty for the rest of the game. This is a critical constraint that makes column preservation important. Avoid emptying columns unless the cards moving out are going directly to foundations, since you permanently lose that tableau workspace.",
  },
  {
    question: "Should I build up or down on the tableau in Bisley Solitaire?",
    answer:
      "The answer depends on which direction moves cards toward their destination foundation. Since tableau building must follow the same suit, think about whether each card ultimately needs to go to the ace foundation (building up) or the king foundation (building down). Build in the direction that keeps your sequences aligned with their target foundation to avoid needing to reverse later.",
  },
];

export default function BisleyTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Bisley Solitaire", item: absoluteUrl("/bisley") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/bisley/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Bisley Solitaire Tips & Tricks",
        description: "Practical tips for mastering dual-direction foundation building in Bisley Solitaire.",
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
        title="Bisley Solitaire Tips & Tricks"
        kicker={<><Link href="/bisley" className="hover:text-white transition-colors">Bisley Solitaire</Link> / Tips</>}
        subtitle="Practical strategies for mastering dual-direction foundations — from king foundation timing and meeting point planning to same-suit building, column preservation, and leveraging the 70-80% win rate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Bisley Solitaire", href: "/bisley" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">plan where each suit&apos;s ace and king foundations will meet</strong>.
          Bisley Solitaire&apos;s dual-direction foundation building is its defining mechanic. Aces build up,
          Kings build down, and a suit is complete when the two sequences reach consecutive ranks.
          Players who plan these meeting points from the start win far more often than those who build
          reactively. With a 70-80% expert win rate, good strategy goes a long way.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Move Kings to Foundations Early
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/bisley" className="text-[var(--gold)] hover:text-white transition-colors">
            Bisley Solitaire
          </Link>
          , four empty king-foundation slots sit waiting at the start of the game. Your first priority
          should be getting Kings out of the tableau and onto these foundations as quickly as possible.
          Kings sitting in columns block every card beneath them, and since empty columns cannot be
          refilled, a trapped King is a serious liability.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Moving a King to its foundation accomplishes two things simultaneously: it frees the column
          for accessing buried cards, and it opens a second building direction for that suit. With the
          King on its foundation, you can immediately start building down by suit (K, Q, J, 10...)
          while the ace foundation for the same suit builds up (A, 2, 3, 4...).
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Since the four Aces are already pre-placed on their foundations at the start, getting all
          four Kings onto their foundations means you have eight active foundations — two per suit —
          working simultaneously. This dramatically increases your options on every turn.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> If a King is buried under other cards, prioritize uncovering it.
            Move the cards above it to other tableau columns or directly to foundations. Every turn a
            King stays in the tableau is a turn you&apos;re playing with fewer foundation options.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Build from Both Directions Simultaneously
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley&apos;s signature mechanic is dual-direction foundation building. The ace foundations
          build up by suit (A, 2, 3, 4...) while the king foundations build down by suit (K, Q, J,
          10...). Too many beginners focus almost exclusively on the ace foundations, treating the king
          foundations as an afterthought. This is a mistake.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Balance your building between both directions.</strong> If
          you&apos;ve built the ace foundation for Hearts up to the 5, but the king foundation for
          Hearts is still sitting on just the King, you&apos;re leaving half your building power
          unused. Actively look for opportunities to play Queens, Jacks, and 10s onto king foundations
          just as eagerly as you play 2s, 3s, and 4s onto ace foundations.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Building from both directions creates a pincer effect that rapidly clears the tableau. Cards
          in the middle ranks (6, 7, 8, 9) will naturally be the last to find their foundations, but
          the faster you build from both ends, the sooner those middle cards have a home.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> After every move, glance at all eight foundations and ask:
            &ldquo;Can I play the next card onto any of these?&rdquo; It&apos;s easy to tunnel-vision
            on one suit or one direction. A quick scan prevents missed opportunities.
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
          Tip #3: Plan the Meeting Point for Each Suit
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          A suit is complete in Bisley Solitaire when the ace foundation and king foundation for that
          suit reach consecutive ranks — for example, the ace foundation reaches 7 and the king
          foundation reaches 8, or the ace foundation reaches 10 and the king foundation reaches Jack.
          The exact meeting point varies by suit and depends on the card distribution in the tableau.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          At the start of the game, survey the tableau and identify where each suit&apos;s cards are
          positioned. If most of a suit&apos;s low cards (2-6) are accessible but the high cards
          (8-Q) are buried, you&apos;ll likely build the ace foundation further before the king
          foundation catches up — the meeting point will be higher (around 8-9). Conversely, if the
          high cards are accessible, the king foundation will advance faster and meet lower (around
          5-6).
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Low meeting point (4-6):</strong> King foundation does
            most of the work — focus on clearing high cards first
          </li>
          <li>
            <strong className="text-white/90">High meeting point (8-10):</strong> Ace foundation does
            most of the work — focus on clearing low cards first
          </li>
          <li>
            <strong className="text-white/90">Middle meeting point (7):</strong> Balanced building
            from both directions — the ideal scenario
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> You don&apos;t need to predict the exact meeting rank. Just
            having a rough sense of &ldquo;this suit will meet high&rdquo; or &ldquo;this suit will
            meet low&rdquo; is enough to guide your building priorities and avoid wasted moves.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Preserve Your Column Count
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/bisley" className="text-[var(--gold)] hover:text-white transition-colors">
            Bisley Solitaire
          </Link>
          , empty columns cannot be filled. Once a column is cleared, that workspace is gone
          permanently. This makes column preservation one of the most important strategic
          considerations in the game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Every column is a workspace.</strong> With 13 tableau
          columns, you have 13 places to reorganize cards. Each time a column empties, you lose
          flexibility. While clearing columns is sometimes unavoidable (and even necessary to free
          Kings or critical cards), doing so carelessly shrinks your maneuvering room.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The best strategy is to consolidate cards within columns rather than spreading them thin.
          When you move a card from column A to column B, column A gets shorter — one step closer to
          empty. Ask yourself: &ldquo;Do I really need this card on column B, or can I send it
          directly to a foundation instead?&rdquo; Keeping cards out of the tableau entirely (by
          routing them to foundations) is always better than rearranging between columns.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Avoid needless emptying.</strong> Don&apos;t clear a
            column just because you can — only do it when the cards are heading to foundations
          </li>
          <li>
            <strong className="text-white/90">Stack same-suit sequences.</strong> When you must
            rearrange, build neat same-suit runs that you can later move to foundations efficiently
          </li>
          <li>
            <strong className="text-white/90">Count your columns.</strong> If you&apos;re down to
            8-9 active columns, be extra cautious about emptying more
          </li>
        </ul>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Use Flexible Same-Suit Building Wisely
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley&apos;s tableau allows building up or down by the same suit — a rare flexibility among
          solitaire games. A 7 of Spades can go on either a 6 of Spades or an 8 of Spades. This
          two-way building is powerful but requires deliberate decision-making about direction.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Build in the direction of the target foundation.</strong> If
          a card will ultimately go to the ace foundation (building up from Ace), stack it on top of
          the next lower card of the same suit. If it&apos;s heading for the king foundation (building
          down from King), stack it on the next higher card. This way, when you&apos;re ready to move
          cards to the foundation, they&apos;re already in the correct order — you can peel them off
          one by one without needing to reverse the sequence.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Building in the wrong direction creates a problem: you end up with a descending sequence
          that needs to go to an ascending foundation (or vice versa). Since only single cards can
          move, you&apos;d need to disassemble the entire sequence — requiring temporary workspace in
          other columns — before rebuilding in the correct order.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Before placing a card on a tableau column, ask: &ldquo;Which
            foundation is this card heading toward?&rdquo; If the 7 of Hearts will end up on the ace
            foundation (because the ace foundation is already at 5 of Hearts), build it on the 6 of
            Hearts. If it&apos;s heading for the king foundation, build it on the 8 of Hearts.
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
          Tip #6: Focus on the Most Constrained Suits First
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Not all four suits are equally easy to clear in a given deal. Some suits will have their
          cards nicely distributed across accessible positions, while others will have critical cards
          buried deep in columns or blocked by cards from other suits. Identify the most constrained
          suit early and give it priority.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          A suit is &ldquo;constrained&rdquo; when its cards are concentrated in a few columns,
          stacked in an unhelpful order, or blocked by many other cards. These suits are the ones
          most likely to cause a loss if neglected — by the time you get to them, you may not have
          enough column space to maneuver.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Conversely, a suit with accessible cards spread across multiple columns is &ldquo;flexible&rdquo;
          — you can clear it later without difficulty. Leaving flexible suits for later gives you more
          options in the endgame, while tackling constrained suits first removes the biggest threats
          to your win.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> At the start of the game, scan the tableau and rank the four
            suits from most constrained to least. Focus your first 10-15 moves on freeing the most
            constrained suit&apos;s key cards. This front-loaded effort prevents late-game deadlocks.
          </p>
        </div>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Avoid Blocking Cards You Need Soon
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          With only single-card moves and no ability to fill empty columns, blocking is the primary
          way games are lost in{" "}
          <Link href="/bisley" className="text-[var(--gold)] hover:text-white transition-colors">
            Bisley Solitaire
          </Link>
          . A &ldquo;block&rdquo; occurs when you place a card on top of another card that you need
          to access soon — forcing you to move the blocking card again before you can reach the one
          underneath.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before placing any card on a tableau column, check what&apos;s at the bottom of that column
          and ask: &ldquo;Will I need this card in the next few moves?&rdquo; If the next card needed
          for any foundation is sitting at the top of a column, don&apos;t stack something on top of
          it unless you have no other choice.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          A good rule of thumb: look at your eight foundations and identify the next card each one
          needs. Those eight cards are your &ldquo;hot list.&rdquo; Never bury a hot-list card under
          another card unless doing so immediately frees a different hot-list card that&apos;s even
          more critical. This simple check prevents the majority of avoidable losses.
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Moving a card to a column &ldquo;temporarily&rdquo; and
            then forgetting that the card underneath was needed. In Bisley, temporary placements have
            a habit of becoming permanent blocks. Always have a plan for removing any card you place
            on a column.
          </p>
        </div>
      </section>

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Leverage the High Win Rate to Experiment
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley Solitaire has one of the highest win rates among{" "}
          <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
            solitaire variants
          </Link>
          {" "}— roughly 70-80% of deals are winnable with expert play. Compare that to{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          {" "}(~99%), and Bisley is slightly harder, but compare it to{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          {" "}(~30%) or{" "}
          <Link href="/accordion" className="text-[var(--gold)] hover:text-white transition-colors">
            Accordion
          </Link>
          {" "}(~2%), and Bisley is remarkably generous.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This high win rate means you can afford to experiment. If you&apos;re not sure whether to
          build a particular sequence up or down on the tableau, try one direction and see what
          happens. If you hit a dead end, restart the same deal and try the other direction. The fact
          that most deals are winnable means there&apos;s usually a solution waiting to be found — you
          just need to discover the right move order.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Use this generous win rate as a learning opportunity. Each deal is a puzzle with a likely
          solution, and finding that solution teaches you patterns you can apply to future games.
          Over time, you&apos;ll develop an intuition for which building direction to choose, when to
          prioritize king foundations over ace foundations, and how to navigate the mid-game when
          multiple suits are competing for limited column space.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> If you lose a deal, replay it. Unlike low-win-rate games where
            a loss often means an unwinnable deal, a Bisley loss usually means a solvable puzzle you
            haven&apos;t cracked yet. Replaying losses is the fastest way to improve your Bisley
            skills.
          </p>
        </div>
      </section>

      {/* Strategy and Patience */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Strategy and Patience
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley Solitaire rewards strategic thinking over speed. With all 48 tableau cards dealt
          face-up from the start, every piece of information is available to you — there are no
          hidden cards, no luck-of-the-draw moments, no surprises. Victory comes down to planning
          and execution.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The dual-direction foundation system is what makes Bisley special among solitaire games.
          Most variants give you one direction to build (up from Ace). Bisley gives you two, which
          doubles your options but also doubles the decisions you need to make. Take your time with
          each move — a few seconds of thought about which foundation a card is heading toward will
          save you from minutes of frustrating backtracking.
        </p>
        <p className="text-white/70 leading-relaxed">
          This strategic depth transfers to other solitaire games too. The meeting-point planning
          you learn in Bisley applies to any game with multiple foundation types. The column
          preservation skills carry over to games like{" "}
          <Link href="/beleaguered-castle" className="text-[var(--gold)] hover:text-white transition-colors">
            Beleaguered Castle
          </Link>
          {" "}and{" "}
          <Link href="/seahaven" className="text-[var(--gold)] hover:text-white transition-colors">
            Seahaven Towers
          </Link>
          , where empty columns are equally precious. And the discipline of{" "}
          <Link href="/bisley/how-to-play" className="text-[var(--gold)] hover:text-white transition-colors">
            understanding the rules deeply
          </Link>
          {" "}will serve you well in any card game.
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
              <strong>Move Kings to foundations immediately.</strong> Free the columns and open up
              the king-direction building lanes.
            </li>
            <li>
              <strong>Build from both directions.</strong> Balance ace foundations (up) and king
              foundations (down) for maximum efficiency.
            </li>
            <li>
              <strong>Plan the meeting point.</strong> Know roughly where each suit&apos;s two
              foundations will converge.
            </li>
            <li>
              <strong>Preserve column count.</strong> Empty columns can&apos;t be refilled — avoid
              clearing them unnecessarily.
            </li>
            <li>
              <strong>Build toward the target foundation.</strong> Same-suit tableau sequences should
              match the direction of their destination.
            </li>
            <li>
              <strong>Tackle constrained suits first.</strong> Free the hardest suit early before
              column space runs low.
            </li>
            <li>
              <strong>Never bury hot-list cards.</strong> Track the next card each foundation needs
              and keep those cards accessible.
            </li>
            <li>
              <strong>Experiment freely.</strong> With a 70-80% win rate, most deals are solvable —
              replay losses to find the solution.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/bisley/how-to-play" title="How to Play Bisley Solitaire" description="Complete rules, setup, and dual-direction foundation mechanics explained." />
            <ContentLinkCard href="/bisley" title="Play Bisley Solitaire" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Apply these tips one at a time and watch your Bisley win rate climb toward that 70-80% expert level."
          primaryLabel="Play Bisley Solitaire"
          primaryHref="/bisley"
          secondaryLabel="Learn the Rules"
          secondaryHref="/bisley/how-to-play"
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
          More Bisley Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/bisley" title="Play Bisley Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/bisley/how-to-play" title="How to Play Bisley Solitaire" description="Complete rules, setup, and strategy explained" />
          <ContentLinkCard href="/beleaguered-castle/tips" title="Beleaguered Castle Tips" description="Tips for another column-based solitaire with no refills" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
