import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Bisley Solitaire Tips & Tricks | Master Dual-Direction Foundations",
  description:
    "Master Bisley Solitaire with practical tips on dual-direction foundation building, meeting-point planning, flexible tableau building, and King foundation timing. ~70-80% winnable.",
  keywords: [
    "bisley solitaire tips",
    "bisley solitaire strategy",
    "bisley solitaire tricks",
    "bisley tips and tricks",
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
      "Practical tips for coordinating ascending and descending foundations in Bisley Solitaire. Learn meeting-point planning and flexible tableau building.",
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
      "Coordinate both directions of your foundations from the start. Bisley's unique mechanic has Ace foundations building up and King foundations building down, meeting in the middle. Plan early where each suit's ascending and descending piles will meet — this 'meeting point' determines your strategy for that suit. Cards near the meeting rank should be prioritized for whichever direction reaches them first.",
  },
  {
    question: "How often can you win Bisley Solitaire?",
    answer:
      "Bisley has a generous win rate of approximately 70-80% with expert play. The flexible tableau building (up or down by suit) and dual-direction foundations give you lots of options. All cards are visible from the start, so you can plan ahead with complete information. With practice, most deals are solvable.",
  },
  {
    question: "Can I build up AND down on the tableau in Bisley?",
    answer:
      "Yes — this is one of Bisley's most powerful features. Tableau columns can build either up or down by same suit. This means a column can have ascending sequences, descending sequences, or a mix. This flexibility is essential for maneuvering cards toward the correct foundation direction without getting stuck.",
  },
  {
    question: "When should I start the King foundations in Bisley?",
    answer:
      "Move Kings to the King foundations as soon as they become available. Early King placement opens up the descending direction for each suit, giving you twice as many foundation destinations. Don't hold Kings on the tableau hoping to use them for building — their highest value is on the foundation.",
  },
  {
    question: "What happens when the ascending and descending piles meet in Bisley?",
    answer:
      "When the ascending (from Ace) and descending (from King) foundation piles of the same suit have consecutive ranks — for example, the ascending pile reaches 7 and the descending pile reaches 8 — that suit is complete. The two piles effectively merge. Planning where this meeting point falls is a core strategic decision.",
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
        description: "Practical tips for coordinating dual-direction foundations in Bisley Solitaire.",
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
        subtitle="Practical strategies for dual-direction foundations — from meeting-point planning and flexible tableau building to King timing and empty column management."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Bisley Solitaire", href: "/bisley" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">plan where each suit&apos;s foundations will meet</strong>.
          Bisley&apos;s signature mechanic — Aces building up and Kings building down — means you need to
          think in both directions simultaneously. The players who win most often are the ones who identify
          the optimal meeting rank for each suit early and route cards accordingly.
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
          , the Ace foundations are pre-placed, but King foundations only appear when you move a King there.
          Every King sitting on the tableau is a suit whose descending foundation isn&apos;t active yet —
          that&apos;s half your building capacity for that suit being wasted.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Prioritize exposing and playing Kings.</strong> As soon as a
          King is available on top of a column, move it to create a King foundation. This immediately
          lets you start building down (Q, J, 10...) from the top, giving you a second destination for
          that suit&apos;s cards.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> If a King is buried just one card deep, uncover it before
            working on other suits. Having all four King foundations active early transforms the game
            from a single-direction to a dual-direction puzzle, dramatically increasing your options.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Plan the Meeting Point for Each Suit
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley is won when each suit&apos;s ascending pile (from Ace) and descending pile (from King)
          meet with consecutive ranks. For example, if Spades go up to 7 and down to 8, that suit is
          complete. The rank where they meet is flexible — it could be anywhere from 4 to 10.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Look at where cards are positioned.</strong> If most low
          Spades are accessible but high Spades are buried, plan for the ascending pile to go further
          (say to 8 or 9) while the descending pile stays short (K-Q-J-10-9). Adapt the meeting point
          to the cards available.
        </p>
        <p className="text-white/70 leading-relaxed">
          Don&apos;t commit rigidly to a meeting point. As the game evolves, you might discover that
          a different split works better. The key is to always be thinking about both directions for
          each suit rather than focusing on just one.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Exploit Flexible Tableau Building
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley&apos;s tableau allows building up OR down by same suit on columns. This is incredibly
          powerful. A column can hold the 5-6-7 of Hearts (ascending) or the 10-9-8 of Hearts
          (descending), and you can even have sequences that change direction within the same column.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Use this to create &ldquo;staging areas&rdquo; where you consolidate a suit&apos;s cards
          before sending them to foundations. If you build a run of 4-5-6-7 of Clubs on the tableau,
          you can then feed them to the Ace foundation in sequence.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Building up:</strong> Creates ascending runs ready for
            the Ace foundation
          </li>
          <li>
            <strong className="text-white/90">Building down:</strong> Creates descending runs ready
            for the King foundation
          </li>
          <li>
            <strong className="text-white/90">Mixed direction:</strong> Useful for temporary parking
            when you need to move cards out of the way
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Remember that tableau building is same-suit only. You can&apos;t
            mix suits in a column. This means each column is effectively dedicated to one suit at a time,
            making column allocation an important decision.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Preserve Empty Columns
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Empty columns cannot be refilled in Bisley — once a column is cleared, it&apos;s gone forever.
          With only 13 columns to start and no free cells, every column is a precious workspace. Clearing
          a column means permanently losing a place to maneuver cards.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Only clear a column when every card in it goes directly to a foundation or when it&apos;s the
          only way to access a critical blocked card. Even then, consider whether moving cards between
          other columns might achieve the same goal without the permanent loss.
        </p>
        <p className="text-white/70 leading-relaxed">
          Late in the game, when most cards are on foundations and few remain on the tableau, empty columns
          matter less. But in the early and middle game, treat column count as a vital resource.
        </p>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Advance Both Foundation Directions Simultaneously
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Don&apos;t neglect one direction in favor of the other. If you only build Ace foundations up
          without working on King foundations down, you&apos;ll eventually hit cards that need to go on
          the descending piles and have nowhere to put them.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          After each move, glance at both the ascending and descending foundations. Is there a card on
          the tableau that can extend either direction? Keeping both sides progressing prevents the
          common mistake of running out of moves because one direction stalled.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Middle-rank cards (6, 7, 8) are the most flexible — they could go
            to either the ascending or descending foundation depending on which reaches them first.
            Keep these cards accessible rather than burying them, since you&apos;ll need them for
            whichever direction is running behind.
          </p>
        </div>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Consolidate Same-Suit Cards on Columns
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Since tableau building is same-suit only, try to group cards of the same suit together on
          columns. A column with Hearts 4-5-6-7 is far more useful than four scattered Hearts across
          four different columns — the consolidated run can be fed to a foundation in sequence.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When you have a choice of where to build, prefer columns that already have cards of the same
          suit. This naturally creates organized runs that accelerate your foundation building when
          the time comes.
        </p>
        <p className="text-white/70 leading-relaxed">
          Be careful not to create overly long runs that block access to cards underneath, though.
          If a column has 8 cards of one suit, the bottom cards are effectively trapped until you
          work through the entire sequence. Balance consolidation with accessibility.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Use Undo to Test Foundation Routing
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley&apos;s dual-direction system means many cards could theoretically go to either the
          ascending or descending foundation. Use undo to test both paths and see which one leads to
          a better board state.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          For example, the 7 of Diamonds might fit on both the ascending pile (at 6) and the descending
          pile (at 8). Playing it on the ascending side means the ascending pile now reaches 7 and needs
          only the 8 to meet the descending pile. Playing it on the descending side means the descending
          pile goes to 7 and needs only the 6 from the ascending side. Which path frees more cards?
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Watch out:</strong> Once a card goes to a foundation in Bisley, it&apos;s permanent.
            There&apos;s no moving cards back from foundations. Make sure you&apos;re sending each card
            in the right direction before committing.
          </p>
        </div>
      </section>

      {/* Win rate context */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          A Strategic Game with Generous Win Rates
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley is one of the more winnable solitaire variants at approximately 70-80% with expert play.
          The combination of dual-direction foundations, flexible same-suit tableau building, and complete
          visibility makes it deeply strategic while remaining achievable. Compare that to{" "}
          <Link href="/calculation" className="text-[var(--gold)] hover:text-white transition-colors">
            Calculation
          </Link>{" "}
          (~35%) or{" "}
          <Link href="/gaps" className="text-[var(--gold)] hover:text-white transition-colors">
            Gaps
          </Link>{" "}
          (~15%) and you can see why Bisley is a favorite among solitaire enthusiasts who enjoy
          strategic depth without brutal difficulty.
        </p>
        <p className="text-white/70 leading-relaxed">
          The dual-direction mechanic gives Bisley a unique rhythm. Early game focuses on activating
          King foundations. Mid-game is about routing cards efficiently to both directions. Late game
          becomes a satisfying convergence as ascending and descending piles close in on each other.
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
              <strong>Play Kings to foundations immediately.</strong> Activate descending building for
              each suit as early as possible.
            </li>
            <li>
              <strong>Plan meeting points.</strong> Decide where each suit&apos;s ascending and
              descending piles will converge.
            </li>
            <li>
              <strong>Build up or down by suit on tableau.</strong> Use same-suit flexibility to create
              organized runs.
            </li>
            <li>
              <strong>Preserve columns.</strong> Empty columns can&apos;t be refilled — don&apos;t clear
              them unnecessarily.
            </li>
            <li>
              <strong>Advance both directions.</strong> Don&apos;t neglect ascending or descending
              foundations.
            </li>
            <li>
              <strong>Consolidate suits.</strong> Group same-suit cards on columns for efficient
              foundation feeding.
            </li>
            <li>
              <strong>Test with undo.</strong> Try both foundation directions for ambiguous cards to
              find the better path.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/bisley/how-to-play" title="How to Play Bisley" description="Complete rules, setup, and card mechanics explained." />
            <ContentLinkCard href="/bisley" title="Play Bisley Solitaire" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. With ~75% of deals winnable, Bisley rewards patience and dual-direction planning."
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
          <ContentLinkCard href="/bisley/how-to-play" title="How to Play Bisley" description="Complete rules, setup, and strategy explained" />
          <ContentLinkCard href="/beleaguered-castle/tips" title="Beleaguered Castle Tips" description="Tips for another open-information solitaire" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
