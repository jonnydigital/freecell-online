import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, SectionHeading, CardSection, ContentBody, TocPills, CtaSection, ContentLinkCard, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title:
    "FreeCell Winning Deals & Statistics | Easiest & Hardest Game Numbers",
  description:
    "FreeCell statistics, win rates, and deal analysis. Discover which game numbers are easiest, which are hardest, and which are unsolvable. Data on the famous 32,000 Microsoft FreeCell deals.",
  keywords: [
    "freecell winnable games",
    "freecell statistics",
    "easiest freecell games",
    "hardest freecell deals",
    "freecell game numbers",
    "freecell win rate",
    "freecell unsolvable deals",
    "freecell deal 11982",
    "freecell solvable percentage",
    "best freecell games",
  ],
  openGraph: {
    title: "FreeCell Winning Deals & Statistics | Easiest & Hardest Games",
    description:
      "Which FreeCell deals are easiest? Which are hardest? Comprehensive statistics on solvability, win rates, and the famous 32,000 Microsoft deals.",
    url: absoluteUrl('/winning-deals'),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/* ── Deal data ── */

interface Deal {
  number: number;
  label: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard" | "Impossible";
}

const easyDeals: Deal[] = [
  { number: 164, label: "One of the easiest deals in the set", description: "Low cards are well-positioned and multiple Aces are near the surface. Most players solve this in under 3 minutes with minimal backtracking.", difficulty: "Easy" },
  { number: 256, label: "Beginner-friendly layout", description: "Natural sequences form quickly, and few cards block the foundations. A great confidence-builder for new players learning the basics.", difficulty: "Easy" },
  { number: 617, label: "Clean opening with accessible Aces", description: "Two Aces start near the top of their columns. The layout practically solves itself once you clear the first few cards.", difficulty: "Easy" },
  { number: 1, label: "The classic first game", description: "Game #1 is the deal most players try first. It's solvable and moderately straightforward — Microsoft likely tested this one more than any other.", difficulty: "Easy" },
  { number: 3, label: "Quick win for practice", description: "Favorable card distribution with natural alternating-color sequences already present. Solvable in around 60 moves with a direct approach.", difficulty: "Easy" },
  { number: 12, label: "Smooth foundation building", description: "Aces and 2s are accessible early, allowing you to start building foundations within the first few moves. The midgame flows naturally from there.", difficulty: "Easy" },
  { number: 25, label: "Forgiving column arrangement", description: "Multiple viable opening strategies all lead to a win. Even suboptimal play has a good chance of succeeding on this deal.", difficulty: "Easy" },
  { number: 100, label: "Satisfying solve with clear paths", description: "Each suit has a relatively clear path to the foundation. Low cards are spread across columns rather than stacked in one, making extraction easy.", difficulty: "Easy" },
];

const hardDeals: Deal[] = [
  { number: 169, label: "Notoriously difficult", description: "One of the hardest solvable deals in the original 32,000. Requires precise free cell management and long-range planning. Many experienced players need multiple attempts.", difficulty: "Very Hard" },
  { number: 178, label: "Expert-level challenge", description: "Deeply buried low cards and poor initial column structure. Solving this deal requires using every free cell and empty column at exactly the right moment.", difficulty: "Very Hard" },
  { number: 1941, label: "Once thought impossible", description: "This deal was believed to be unsolvable for years until an advanced computer solver found a solution. The solution requires over 100 moves with razor-thin margins.", difficulty: "Very Hard" },
  { number: 146, label: "Former 'impossible' deal", description: "Another deal that was long considered unsolvable before computers cracked it. Extremely constrained opening with virtually no room for error.", difficulty: "Very Hard" },
  { number: 455, label: "Near-impossible solvable deal", description: "Requires an extraordinarily precise sequence of moves. Even knowing it's solvable, most human players cannot find the solution without computer assistance.", difficulty: "Very Hard" },
  { number: 495, label: "Brutal card positioning", description: "Aces buried under Kings with no natural sequences. The solution exists but requires creative use of all available space and many intermediate moves.", difficulty: "Very Hard" },
  { number: 512, label: "Maximum difficulty solvable deal", description: "Approaches the theoretical limit of FreeCell difficulty while remaining solvable. Only the most advanced solvers can crack this one.", difficulty: "Very Hard" },
  { number: 11982, label: "The only impossible deal", description: "Mathematically proven to have no solution. Every possible sequence of legal moves leads to a dead end. The most famous unsolvable deal in all of solitaire.", difficulty: "Impossible" },
];

const practiceDeals: Deal[] = [
  { number: 7, label: "Good for practicing free cell management", description: "Requires careful use of free cells in the midgame. A great training exercise for learning when to use cells and when to hold back.", difficulty: "Medium" },
  { number: 15, label: "Column strategy practice", description: "Creating and maintaining empty columns is key to solving this deal. Use it to practice the column management techniques from our tips page.", difficulty: "Medium" },
  { number: 42, label: "Planning ahead challenge", description: "This deal punishes impulsive play but rewards those who plan 5-10 moves ahead. A good test of intermediate strategic thinking.", difficulty: "Medium" },
  { number: 50, label: "Sequence building exercise", description: "Several partial sequences need to be merged into longer runs. Practice building and consolidating alternating-color descending sequences.", difficulty: "Medium" },
  { number: 77, label: "Supermove practice", description: "Winning requires several multi-card supermoves. Good for learning the supermove formula and planning large card transfers.", difficulty: "Medium" },
  { number: 88, label: "Buried Ace extraction", description: "Multiple Aces are buried deep. Practice the technique of systematically uncovering buried low cards without filling all your free cells.", difficulty: "Medium" },
];

/* ── Statistics data ── */

const statistics = [
  { label: "Original Microsoft deals", value: "32,000", detail: "Numbered #1 through #32000, using a specific random seed" },
  { label: "Confirmed solvable", value: "31,999", detail: "Every deal except #11982 has at least one solution" },
  { label: "Proven impossible", value: "1", detail: "Only deal #11982 — confirmed by exhaustive computer search" },
  { label: "Random deal solvability", value: "~99.999%", detail: "Virtually all randomly shuffled FreeCell deals are winnable" },
  { label: "Expert human win rate", value: "90–95%", detail: "Top players win 9 out of 10 games they play" },
  { label: "Average moves per win", value: "45–55", detail: "Efficient solutions typically require 45-55 moves" },
  { label: "Computer solver win rate", value: "~99.99%", detail: "Advanced solvers lose only on deals proven impossible or near-impossible" },
  { label: "Avg. beginner win rate", value: "30–50%", detail: "New players typically win about one-third to one-half of games" },
];

/* ── FAQ data ── */

const dealsFaqs = [
  { question: "What percentage of FreeCell games are winnable?", answer: "Approximately 99.999% of all randomly dealt FreeCell games are winnable. Of the original 32,000 Microsoft FreeCell deals, only one (#11982) is proven impossible. When you lose a FreeCell game, it is almost certainly due to strategy, not an unwinnable deal." },
  { question: "What are the easiest FreeCell game numbers?", answer: "Some of the easiest deals in the original Microsoft set include games #164, #256, #617, #1, #3, #12, #25, and #100. These deals feature accessible Aces, natural card sequences, and forgiving column arrangements that make them good starting points for new players." },
  { question: "What is the hardest FreeCell game that is still solvable?", answer: "Games #169, #178, #1941, #146, #455, #495, and #512 are among the hardest solvable deals. Several of these (#146, #455, #495, #512, #1941) were thought to be impossible for years until advanced computer solvers found solutions. They require over 100 moves and extremely precise play." },
  { question: "How do FreeCell game numbers work?", answer: "Each FreeCell game number is a seed for a random number generator that determines how the 52 cards are dealt. The same number always produces the same deal, allowing players worldwide to attempt identical games and compare results. The original Microsoft FreeCell used numbers 1 through 32,000." },
  { question: "Can I improve by playing specific game numbers?", answer: "Yes. Playing easy deals (#164, #256, #1) builds confidence and reinforces good habits. Medium-difficulty deals (#7, #15, #42, #50) are excellent for practicing specific skills like free cell management or sequence building. Hard deals (#169, #178) test your limits and expose weaknesses in your strategy." },
];

/* ── Helper components ── */

function DealCard({ deal }: { deal: Deal }) {
  const colorMap: Record<string, string> = {
    Easy: "text-green-700 bg-green-50 border-green-200",
    Medium: "text-[#B8860B] bg-[#D4AF37]/10 border-[#D4AF37]/30",
    Hard: "text-orange-700 bg-orange-50 border-orange-200",
    "Very Hard": "text-red-700 bg-red-50 border-red-200",
    Impossible: "text-red-900 bg-red-100 border-red-300",
  };

  return (
    <div className="card-inset rounded-lg p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href={`/game/${deal.number}`}
            className="text-xl font-bold text-[#8B6914] hover:underline"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            #{deal.number}
          </Link>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colorMap[deal.difficulty]}`}
          >
            {deal.difficulty}
          </span>
        </div>
        <Link
          href={`/game/${deal.number}`}
          className="text-sm text-[#8B6914] hover:underline shrink-0"
        >
          Play this deal &rarr;
        </Link>
      </div>
      <p className="text-sm font-medium text-[#2a2522] mb-1">{deal.label}</p>
      <p className="text-sm text-[#444444] leading-relaxed">
        {deal.description}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function WinningDealsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "Winning Deals", item: absoluteUrl('/winning-deals') },
    ],
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "FreeCell Winning Deals & Statistics: Easiest and Hardest Game Numbers",
      description: "Comprehensive FreeCell deal analysis. Which game numbers are easiest, which are hardest, solvability statistics, and the story behind the famous unsolvable deals.",
      author: { "@type": "Organization", name: siteConfig.siteName },
      publisher: { "@type": "Organization", name: siteConfig.siteName },
      mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl('/winning-deals') },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: dealsFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="FreeCell Winning Deals & Statistics"
        subtitle="Not all FreeCell deals are created equal. Some are gentle warm-ups, some are brutal puzzles, and one is literally impossible. Here are the numbers."
      />

      {/* ── Table of Contents ── */}
      <TocPills
        items={[
          { href: "#statistics", icon: "\u2660", label: "Statistics" },
          { href: "#easy-deals", icon: "\u2665", label: "Easy Deals" },
          { href: "#hard-deals", icon: "\u2666", label: "Hard Deals" },
          { href: "#practice", icon: "\u2663", label: "Practice Deals" },
          { href: "#solvability", icon: "\u2660", label: "Solvability" },
          { href: "#faq", icon: "\u2665", label: "FAQ" },
        ]}
      />

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        {/* Statistics Overview */}
        <CardSection id="statistics">
          <SectionHeading sub="By the Numbers" id="statistics-heading" icon={"\u2660"}>
            FreeCell Statistics at a Glance
          </SectionHeading>

          <ContentBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {statistics.map((stat, i) => {
                const suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
                const suit = suits[i % 4];
                const isRed = suit === "\u2665" || suit === "\u2666";
                return (
                  <div key={i} className="card-inset rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <span className={`text-lg shrink-0 mt-0.5 ${isRed ? "text-red-500" : "text-[#B8860B]"}`}>
                        {suit}
                      </span>
                      <div>
                        <div className="text-2xl font-bold text-[#8B6914]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-[#2a2522] mt-0.5">{stat.label}</div>
                        <div className="text-xs text-[#6B7280] mt-1">{stat.detail}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[#444444] leading-relaxed mt-6">
              These statistics come from decades of research by both human
              players and computer solvers. The Internet FreeCell Project
              (1994–2000) coordinated thousands of volunteers to solve all
              32,000 original Microsoft deals, and subsequent computer analysis
              has expanded our understanding to millions of randomly
              generated deals. For more on this history, see our{" "}
              <Link href="/history" className="text-[#8B6914] hover:underline">
                FreeCell History
              </Link>{" "}
              page.
            </p>
          </ContentBody>
        </CardSection>

        {/* Easy Deals */}
        <CardSection id="easy-deals">
          <SectionHeading sub="Best for Beginners" id="easy-deals-heading" icon={"\u2665"}>
            Easiest FreeCell Deals
          </SectionHeading>

          <ContentBody>
            <p className="text-[#444444] leading-relaxed mb-6">
              These deals are excellent starting points for new players or
              for warming up before tackling harder games. They feature
              accessible Aces, natural card sequences, and forgiving
              layouts that allow for some suboptimal play.
            </p>
            <div className="space-y-4">
              {easyDeals.map((deal) => (
                <DealCard key={deal.number} deal={deal} />
              ))}
            </div>
            <p className="text-[#6B7280] text-sm mt-6">
              New to FreeCell?{" "}
              <Link href="/how-to-play" className="text-[#8B6914] hover:underline">
                Learn the rules
              </Link>{" "}
              first, then come back and try deal{" "}
              <Link href="/game/164" className="text-[#8B6914] hover:underline">
                #164
              </Link>{" "}
              for a satisfying first win.
            </p>
          </ContentBody>
        </CardSection>

        {/* Hard Deals */}
        <CardSection id="hard-deals">
          <SectionHeading sub="Expert Challenges" id="hard-deals-heading" icon={"\u2666"}>
            Hardest FreeCell Deals
          </SectionHeading>

          <ContentBody>
            <p className="text-[#444444] leading-relaxed mb-6">
              These deals will test even experienced players. Several were
              thought to be impossible for years before advanced solvers
              cracked them. Deal #11982 remains the only proven
              unsolvable game in the original Microsoft set.
            </p>
            <div className="space-y-4">
              {hardDeals.map((deal) => (
                <DealCard key={deal.number} deal={deal} />
              ))}
            </div>
            <p className="text-[#6B7280] text-sm mt-6">
              Struggling with hard deals? Our{" "}
              <Link href="/strategy" className="text-[#8B6914] hover:underline">
                Strategy Guide
              </Link>{" "}
              covers the advanced techniques you&apos;ll need, and the{" "}
              <Link href="/tips" className="text-[#8B6914] hover:underline">
                Tips & Tricks
              </Link>{" "}
              page offers quick advice for common sticking points.
            </p>
          </ContentBody>
        </CardSection>

        {/* Practice Deals */}
        <CardSection id="practice">
          <SectionHeading sub="Skill Building" id="practice-heading" icon={"\u2663"}>
            Practice Deals for Specific Skills
          </SectionHeading>

          <ContentBody>
            <p className="text-[#444444] leading-relaxed mb-6">
              These medium-difficulty deals are chosen because each one
              emphasizes a specific skill. Use them as training exercises
              to improve targeted aspects of your game.
            </p>
            <div className="space-y-4">
              {practiceDeals.map((deal) => (
                <DealCard key={deal.number} deal={deal} />
              ))}
            </div>
            <p className="text-[#6B7280] text-sm mt-6">
              For more on the skills these deals practice, see our{" "}
              <Link href="/tips" className="text-[#8B6914] hover:underline">
                25 FreeCell Tips
              </Link>{" "}
              page.
            </p>
          </ContentBody>
        </CardSection>

        {/* Solvability Deep Dive */}
        <CardSection id="solvability">
          <SectionHeading sub="The Mathematics" id="solvability-heading" icon={"\u2660"}>
            FreeCell Solvability Explained
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              One of FreeCell&apos;s most remarkable properties is its
              extraordinarily high solvability rate. Unlike{" "}
              <Link href="/solitaire-types#klondike" className="text-[#8B6914] hover:underline">
                Klondike solitaire
              </Link>
              , where roughly 80% of deals are winnable with perfect play
              (and most players win far fewer), FreeCell deals are almost
              universally solvable.
            </p>

            <div className="card-inset rounded-lg p-5">
              <h3 className="font-medium text-[#2a2522] text-lg mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                Why Is FreeCell So Solvable?
              </h3>
              <ul className="space-y-2 text-[#444444]">
                <li className="flex items-start gap-2">
                  <span className="text-[#B8860B] mt-1 shrink-0">{"\u2660"}</span>
                  <span><strong>Complete information</strong> — all cards are visible, so you can always make fully informed decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 shrink-0">{"\u2665"}</span>
                  <span><strong>Flexible storage</strong> — four{" "}<Link href="/glossary#free-cell" className="text-[#8B6914] hover:underline">free cells</Link> provide enough temporary space to untangle most configurations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 shrink-0">{"\u2666"}</span>
                  <span><strong>Alternating-color building</strong> — the lenient building rule (any alternating color, not specific suits) maximizes the number of valid moves</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8860B] mt-1 shrink-0">{"\u2663"}</span>
                  <span><strong>Eight columns</strong> — the wide tableau spreads cards across many columns, reducing the depth of burial for any single card</span>
                </li>
              </ul>
            </div>

            <p>
              The high solvability rate is what makes FreeCell a game of
              skill rather than luck. When 99.999% of deals are winnable,
              your win rate becomes a direct measure of your strategic
              ability. A player winning 50% of games isn&apos;t unlucky —
              they need better{" "}
              <Link href="/strategy" className="text-[#8B6914] hover:underline">
                strategy
              </Link>
              .
            </p>

            <h3 className="font-medium text-[#2a2522] text-lg pt-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              What Makes a Deal Hard?
            </h3>
            <p>
              Even among solvable deals, difficulty varies enormously.
              The factors that make a deal hard include:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-[#B8860B] mt-1">&#x2022;</span>
                <span><strong>Deeply buried Aces</strong> — when Aces are at the bottom of long columns, extracting them requires moving many other cards first</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B8860B] mt-1">&#x2022;</span>
                <span><strong>Kings blocking low cards</strong> — Kings can only go in empty columns, so a King sitting on top of an Ace creates a particularly nasty blockage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B8860B] mt-1">&#x2022;</span>
                <span><strong>No natural sequences</strong> — some deals have no cards in useful order, requiring extensive rearrangement before any progress is possible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B8860B] mt-1">&#x2022;</span>
                <span><strong>Concentrated suits</strong> — when cards of the same suit are clustered in one or two columns, building alternating-color sequences becomes much harder</span>
              </li>
            </ul>

            <p>
              Understanding these difficulty factors helps you assess a
              deal before you start playing. If you spot deeply buried
              Aces and Kings blocking low cards, you know to plan
              carefully from the first move. For more on how to approach
              different deal types, visit our{" "}
              <Link href="/tips" className="text-[#8B6914] hover:underline">
                Tips & Tricks
              </Link>{" "}
              page.
            </p>
          </ContentBody>
        </CardSection>

        {/* FAQ */}
        <CardSection id="faq">
          <SectionHeading sub="Common Questions" id="faq-heading" icon={"\u2665"}>
            Winning Deals FAQ
          </SectionHeading>

          <ContentBody className="space-y-6">
            {dealsFaqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#444444] leading-relaxed">{faq.answer}</p>
                {i < dealsFaqs.length - 1 && (
                  <div className="mt-6 border-b border-[#e5e0d8]" />
                )}
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* ── Related Guides ── */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/easy-freecell-games" title="Easy FreeCell Games" description="Curated list of beginner-friendly deals to build confidence." />
            <ContentLinkCard href="/hard-freecell-games" title="Hard FreeCell Games" description="The toughest solvable deals for experienced players." />
            <ContentLinkCard href="/deals" title="Deal Explorer" description="Browse, search, and play any of the 32,000 classic deals." />
          </ContentBody>
        </CardSection>

        {/* CTA */}
        <CtaSection
          heading="Try a Deal Right Now"
          body={
            <>
              Start with an easy deal to warm up, or jump straight to a
              hard one and test your skills. Every game is a new puzzle.
            </>
          }
          primaryLabel="Easy Deal #164"
          primaryHref="/game/164"
          secondaryLabel="Hard Deal #169"
          secondaryHref="/game/169"
        />

      </main>
    </ContentLayout>
  );
}
