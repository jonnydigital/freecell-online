import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Flower Garden Solitaire Tips & Tricks | Master the 16-Card Bouquet",
  description:
    "Improve your Flower Garden Solitaire win rate with practical tips on bouquet management, empty column creation, foundation building, and strategic reserve deployment. ~30-40% winnable.",
  keywords: [
    "flower garden solitaire tips",
    "flower garden solitaire strategy",
    "flower garden solitaire tricks",
    "flower garden tips and tricks",
    "how to win flower garden solitaire",
    "flower garden solitaire help",
    "flower garden card game tips",
    "flower garden solitaire winning tips",
    "flower garden solitaire advice",
    "tips for flower garden solitaire",
    "flower garden solitaire guide",
  ],
  openGraph: {
    title: "Flower Garden Solitaire Tips & Tricks | Master the 16-Card Bouquet",
    description:
      "Practical tips to leverage the 16-card bouquet effectively in Flower Garden Solitaire. Learn reserve deployment, empty column strategy, and foundation building.",
    url: absoluteUrl("/flower-garden/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Flower Garden Solitaire?",
    answer:
      "Use your bouquet strategically rather than impulsively. The 16-card reserve gives you enormous flexibility, but each card you play from it is one fewer option for later. Prioritize playing bouquet cards that start foundation piles (Aces, then 2s) or that create empty columns. Save the rest for moments when they unlock critical sequences.",
  },
  {
    question: "How often can you win Flower Garden Solitaire?",
    answer:
      "Flower Garden has a win rate of approximately 30-40% with expert play. Despite having a generous 16-card reserve (more than FreeCell's 4 free cells), the single-card-only movement rule and any-suit building create tangling challenges. Strategic bouquet deployment is what separates winning players from average ones.",
  },
  {
    question: "How does the bouquet work in Flower Garden Solitaire?",
    answer:
      "The bouquet is a 16-card reserve where every card is visible and individually playable at any time. You can play any bouquet card to a foundation or to the top of any tableau column. Unlike tableau cards, bouquet cards are all available simultaneously — you don't need to uncover them. Think of it as having 16 pre-loaded free cells.",
  },
  {
    question: "Should I empty columns in Flower Garden Solitaire?",
    answer:
      "Yes — empty columns are very valuable in Flower Garden because any card (from the tableau or bouquet) can fill them. An empty column functions like an additional storage space. Creating empty columns early gives you flexibility to rearrange cards and build foundation sequences. They're worth sacrificing short-term progress to create.",
  },
  {
    question: "Why is Flower Garden harder than FreeCell despite having more reserve cards?",
    answer:
      "Flower Garden's difficulty comes from two key restrictions: single-card-only moves (you can't move sequences) and any-suit building (cards tangle more easily than with alternating-color rules). FreeCell compensates for fewer free cells with sequence moves and alternating-color organization. Flower Garden's generous bouquet is balanced by tighter movement rules.",
  },
];

export default function FlowerGardenTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Flower Garden Solitaire", item: absoluteUrl("/flower-garden") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/flower-garden/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Flower Garden Solitaire Tips & Tricks",
        description: "Practical tips for leveraging the 16-card bouquet in Flower Garden Solitaire.",
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
        title="Flower Garden Solitaire Tips & Tricks"
        kicker={<><Link href="/flower-garden" className="hover:text-white transition-colors">Flower Garden Solitaire</Link> / Tips</>}
        subtitle="Practical strategies for the bouquet game — from strategic reserve deployment and empty column creation to foundation building and managing the ~35% win rate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Flower Garden Solitaire", href: "/flower-garden" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">deploy bouquet cards strategically, not impulsively</strong>.
          Your 16-card bouquet is the largest reserve in any standard solitaire game, but each card you play
          is one fewer option for later. Prioritize Aces and low cards from the bouquet for foundations,
          create empty columns for maneuvering room, and save bouquet cards for moments that unlock
          multi-card sequences.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Play Aces and Low Cards From the Bouquet First
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/flower-garden" className="text-[var(--gold)] hover:text-white transition-colors">
            Flower Garden Solitaire
          </Link>
          , any card in the bouquet can be played to a foundation or tableau at any time. Your first priority
          should be scanning the bouquet for Aces and 2s. Play any Aces directly to foundations, then
          follow with 2s that match existing foundation piles.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Getting foundations started from the bouquet is essentially &ldquo;free&rdquo; — you don&apos;t
          need to uncover these cards or move anything out of the way. Every Ace played from the bouquet
          is a foundation you don&apos;t have to dig for in the tableau.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> After playing bouquet Aces, check if any bouquet 2s, 3s, or 4s
            can immediately follow. Building a foundation to 3 or 4 from the bouquet alone gives you
            a massive head start.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Create Empty Columns Early
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Empty columns in Flower Garden are extremely valuable because any card — from the tableau or
          the bouquet — can fill them. An empty column functions like extra storage, giving you space
          to reorganize cards and build sequences.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Target the shortest column.</strong> Look for a column with
          only 2-3 cards where most of the cards can go to foundations or other columns. Clearing even
          one column early creates a workspace that pays dividends throughout the game.
        </p>
        <p className="text-white/70 leading-relaxed">
          Use bouquet cards to help clear columns. If a column&apos;s top card is a 7 and you have an 8
          in the bouquet, playing the bouquet 8 to another column and then moving the 7 onto it frees
          up that column. The bouquet gives you the flexibility to engineer these column-clearing sequences.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Save Bouquet Cards for Critical Moments
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          It&apos;s tempting to play bouquet cards aggressively — after all, they&apos;re all available
          and each one placed on the tableau is progress. But the bouquet is a finite resource. Every
          card you play from it is one fewer option when you need to bridge a gap later.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The best times to use bouquet cards are:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Starting foundations:</strong> Aces and low cards — always
            good to play immediately
          </li>
          <li>
            <strong className="text-white/90">Clearing columns:</strong> When a bouquet card is the
            missing piece to empty a column
          </li>
          <li>
            <strong className="text-white/90">Unlocking blocked cards:</strong> When playing a bouquet
            card to the tableau lets you uncover and play a critical card to a foundation
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> In the mid-game, count your remaining bouquet cards. If you
            have 8+ left, you still have good flexibility. Below 4, you need to be very selective
            about when you deploy them. An empty bouquet means you&apos;ve lost your safety net.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Build Long Descending Sequences
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Flower Garden&apos;s tableau builds down regardless of suit — any card can go on any card of
          the next higher rank. Use this flexibility to consolidate cards into long descending sequences.
          A column running K-Q-J-10-9-8-7 concentrates seven cards into one column, freeing up space
          elsewhere.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">But remember: single-card moves only.</strong> You can&apos;t
          pick up a sequence and move it as a unit. If you build K-Q-J on a column, you can only move
          the J (top card). The Q and K stay put. Plan your sequences so that you&apos;ll be able to
          peel cards off the top to foundations in order.
        </p>
        <p className="text-white/70 leading-relaxed">
          The ideal column is one where the top card is the next card needed on a foundation. Build
          sequences that match your foundation needs, not just any descending run.
        </p>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Don&apos;t Bury Low Cards Under High Cards
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          One of the most common mistakes in Flower Garden is placing a high card on top of a column
          where low cards are buried deep. If you put a King on a column that has a 3 four cards down,
          you&apos;ll need to move the King, Queen, Jack, and 10 before reaching the 3 — and with
          single-card-only moves, that requires four separate empty destinations.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before placing a card on a column, check what&apos;s underneath. If there are low cards
          (especially Aces, 2s, and 3s) that you&apos;ll need for foundations, think twice. Find a
          different column or use an empty column to avoid creating a deep burial.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Scan all six columns at the start to identify buried Aces and 2s.
            Plan your first several moves around uncovering these critical cards. A buried Ace is a
            foundation that hasn&apos;t started — and every turn it stays buried delays your progress.
          </p>
        </div>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Use Empty Columns as Temporary Storage
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Once you&apos;ve created an empty column, use it as temporary storage to rearrange the tableau.
          Move a blocking card to the empty column, play the card underneath to a foundation, then move
          the blocking card back. This &ldquo;column cycling&rdquo; technique is essential for navigating
          the mid-game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Multiple empty columns are even more powerful. With two empty columns, you can swap cards between
          columns and perform multi-step rearrangements that would be impossible with just one. Three empty
          columns essentially means you can reorganize at will.
        </p>
        <p className="text-white/70 leading-relaxed">
          Think of empty columns as your &ldquo;working memory&rdquo; — they let you hold cards
          temporarily while you execute a sequence of moves. The more working memory you have, the
          more complex sequences you can pull off.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Balance Tableau Work and Foundation Building
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          It&apos;s tempting to rush cards to foundations, but advancing one foundation too far ahead
          can cause problems. If your Spade foundation is at 8 while others are at 2, you may have
          buried cards that other foundations need under the tall Spade stack.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Keep all four foundations advancing roughly together. A good rule of thumb: don&apos;t push
          any foundation more than 3 ranks ahead of the lowest. This keeps your options open and prevents
          foundation imbalance from blocking your game.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Flower Garden is won in the mid-game, not the opening.
            The opening is about setting up your workspace (creating empty columns, playing bouquet Aces).
            The mid-game is where careful foundation building and tableau management determine the outcome.
          </p>
        </div>
      </section>

      {/* Win rate context */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          A Unique Challenge Despite Generous Resources
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Flower Garden&apos;s ~35% win rate might seem low for a game with 16 reserve cards, but the
          single-card-only movement rule creates bottlenecks that even a large bouquet can&apos;t always
          solve. Compare this to{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (~82% with only 4 free cells but sequence moves) and you can see how movement rules matter
          as much as reserve size.
        </p>
        <p className="text-white/70 leading-relaxed">
          Flower Garden rewards a specific skill: knowing when to deploy bouquet cards and when to
          hold them. Expert players treat the bouquet like a strategic reserve, deploying cards only
          for maximum impact. This resource management skill transfers well to other{" "}
          <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
            solitaire variants
          </Link>{" "}
          and card games in general.
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
              <strong>Play bouquet Aces and low cards first.</strong> Start foundations from the reserve
              for free.
            </li>
            <li>
              <strong>Create empty columns early.</strong> Target the shortest column and clear it for
              workspace.
            </li>
            <li>
              <strong>Save bouquet cards for critical moments.</strong> Don&apos;t deplete your reserve
              without purpose.
            </li>
            <li>
              <strong>Build long descending sequences.</strong> Consolidate cards to free up columns,
              but remember single-card moves only.
            </li>
            <li>
              <strong>Don&apos;t bury low cards.</strong> Avoid placing high cards on columns with
              buried Aces and 2s.
            </li>
            <li>
              <strong>Use empty columns as temp storage.</strong> Cycle cards through empty columns to
              access buried foundations needs.
            </li>
            <li>
              <strong>Build foundations evenly.</strong> Keep all four within 3 ranks of each other.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/flower-garden/how-to-play" title="How to Play Flower Garden" description="Complete rules, bouquet mechanics, and setup explained." />
            <ContentLinkCard href="/flower-garden" title="Play Flower Garden" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="Your 16-card bouquet is a powerful resource. Deploy it wisely and watch your Flower Garden win rate climb."
          primaryLabel="Play Flower Garden"
          primaryHref="/flower-garden"
          secondaryLabel="Learn the Rules"
          secondaryHref="/flower-garden/how-to-play"
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
          More Flower Garden Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/flower-garden" title="Play Flower Garden" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/flower-garden/how-to-play" title="How to Play Flower Garden" description="Complete rules, bouquet mechanics, and setup explained" />
          <ContentLinkCard href="/bakers-dozen/tips" title="Baker's Dozen Tips" description="Tips for another no-stock patience game" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
