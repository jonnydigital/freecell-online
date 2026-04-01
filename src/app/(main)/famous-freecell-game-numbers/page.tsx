import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title:
    "Famous FreeCell Game Numbers | Legendary Deals Every Player Should Know",
  description:
    "The most famous FreeCell game numbers explained \u2014 Deal #11982 (the impossible one), #617 (the easiest), the Microsoft 32,000 set, and the deal numbers that made FreeCell history.",
  keywords: [
    "famous freecell game numbers",
    "freecell deal 11982",
    "freecell game number 11982",
    "freecell impossible deal",
    "hardest freecell games",
    "easiest freecell deal",
    "microsoft freecell deals",
    "freecell deal numbers",
    "freecell game 617",
    "freecell numbered games",
    "freecell 32000 deals",
    "freecell legendary deals",
  ],
  openGraph: {
    title:
      "Famous FreeCell Game Numbers | Legendary Deals Every Player Should Know",
    description:
      "From the impossible Deal #11982 to the easiest deals in the set \u2014 the stories behind FreeCell\u2019s most legendary game numbers.",
    url: absoluteUrl("/famous-freecell-game-numbers"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/* ── FAQ data ── */

const faqs = [
  {
    question: "What is FreeCell Deal #11982?",
    answer:
      "Deal #11982 is the most famous FreeCell game number in history. It\u2019s the only deal out of the original 32,000 Microsoft FreeCell games that has been proven mathematically impossible to solve. No sequence of legal moves can get all 52 cards onto the foundations. It was the last deal standing after the internet FreeCell community systematically solved all 32,000 deals in the mid-1990s, and its impossibility was confirmed by exhaustive computer search.",
  },
  {
    question: "What is the easiest FreeCell deal number?",
    answer:
      "Several deals in the Microsoft set are considered exceptionally easy, but Deal #617 is often cited as one of the easiest. It can be solved in under 50 moves with straightforward play. Deals where aces and low cards start near the tops of columns tend to be the easiest because foundation building can begin immediately. The site\u2019s deal explorer lets you browse and try specific deal numbers.",
  },
  {
    question: "How many of the 32,000 Microsoft FreeCell deals are unsolvable?",
    answer:
      "Exactly one: Deal #11982. The other 31,999 deals have all been solved by a combination of human players and computer solvers. When the set was later extended to 1,000,000 deals, only 8 additional unsolvable deals were found (#146692, #186216, #455889, #495505, #512118, #517776, #781948, #875865), confirming FreeCell\u2019s extraordinary solvability rate of approximately 99.999%.",
  },
  {
    question: "Can I play specific FreeCell deal numbers on this site?",
    answer:
      "Yes. PlayFreeCellOnline.com supports numbered deals \u2014 you can enter any game number to play that specific deal. Use the deal explorer to browse notable deals, or enter a number directly to challenge a specific arrangement. Every numbered deal generates the same card layout every time, so you can retry, compare strategies, or compete with friends on the same deal.",
  },
  {
    question: "Are FreeCell deal numbers the same across different versions?",
    answer:
      "The original Microsoft FreeCell deal numbering system (deals 1\u201332,000 and later 1\u20131,000,000) uses a specific pseudorandom number generator (PRNG) algorithm. Our site implements the same algorithm for deals in that range, so Deal #11982 here is the same impossible deal as in Windows FreeCell. However, other FreeCell implementations may use different PRNG algorithms, so the same number might produce a different card layout on a different site.",
  },
  {
    question: "What are the hardest solvable FreeCell deals?",
    answer:
      "Among the original 32,000 Microsoft deals, some of the hardest solvable deals include #169, #178, #258, #454, #617 (ironically also one of the easiest by some metrics), and #1941. These deals require the most moves to solve and have the fewest possible solution paths. Computer solvers classify difficulty by the number of backtracks needed to find a solution \u2014 hard deals require extensive search even for AI.",
  },
];

/* ── Famous deals data ── */

const famousDeals = [
  {
    number: "#11982",
    title: "The Impossible One",
    difficulty: "Impossible",
    color: "text-red-600",
    description:
      "The most famous FreeCell deal in history. Proven mathematically impossible to solve \u2014 no sequence of legal moves leads to a win. It was the last deal standing when the internet community solved all 32,000 Microsoft deals in the 1990s.",
  },
  {
    number: "#617",
    title: "The Easy Classic",
    difficulty: "Very Easy",
    color: "text-green-600",
    description:
      "Often cited as one of the easiest deals in the Microsoft set. Low cards are accessible early, and the deal flows naturally toward a solution with minimal use of free cells.",
  },
  {
    number: "#1",
    title: "The First Deal",
    difficulty: "Medium",
    color: "text-[#B8860B]",
    description:
      "The very first deal in the Microsoft FreeCell numbering system. A moderately challenging game that most experienced players can solve. It\u2019s the deal that millions of Windows users played first.",
  },
  {
    number: "#169",
    title: "The Marathon",
    difficulty: "Very Hard",
    color: "text-orange-600",
    description:
      "One of the hardest solvable deals in the original set. Requires an exceptionally long solution path with careful free cell management. A genuine test of expert-level play.",
  },
  {
    number: "#146692",
    title: "First Extended Impossible",
    difficulty: "Impossible",
    color: "text-red-600",
    description:
      "The first unsolvable deal found in the extended 1,000,000 deal set. Discovered when solvers expanded beyond the original 32,000 deals. Confirmed impossible through exhaustive computer search.",
  },
  {
    number: "#32000",
    title: "The Finish Line",
    difficulty: "Medium",
    color: "text-[#B8860B]",
    description:
      "The last deal in the original Microsoft FreeCell set. Solving this deal meant completing the entire original game \u2014 a feat first achieved by the collaborative internet community.",
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function FamousFreecellGameNumbersPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Famous FreeCell Game Numbers: Legendary Deals Every Player Should Know",
      description:
        "The stories behind FreeCell\u2019s most famous deal numbers \u2014 from the impossible #11982 to the easiest deals in the Microsoft set.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-03-31",
      dateModified: "2026-03-31",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl("/famous-freecell-game-numbers"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Famous FreeCell Game Numbers",
          item: absoluteUrl("/famous-freecell-game-numbers"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="Famous FreeCell Game Numbers"
        subtitle={
          <>
            Every FreeCell deal has a number, but some numbers have become
            legendary. From the one impossible deal to the easiest wins,
            these are the game numbers that made FreeCell history.
          </>
        }
      />

      {/* ── Main content wrapper ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* ── The Hall of Fame ── */}
        <CardSection id="hall-of-fame">
          <SectionHeading
            sub="Legendary Deals"
            id="hall-of-fame-heading"
            icon={"\ud83c\udfc6"}
          >
            The Hall of Fame
          </SectionHeading>

          <ContentBody className="space-y-4">
            {famousDeals.map((deal) => (
              <div
                key={deal.number}
                className="p-4 rounded-lg border border-[#B8860B]/10 bg-[#B8860B]/[0.02]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-mono font-bold text-[#2a2522]">
                    {deal.number}
                  </span>
                  <span className="text-sm font-medium text-[#666]">
                    {deal.title}
                  </span>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${deal.color}`}>
                    {deal.difficulty}
                  </span>
                </div>
                <p className="text-[#444444] text-sm leading-relaxed">
                  {deal.description}
                </p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── The 11982 Story ── */}
        <CardSection id="deal-11982">
          <SectionHeading
            sub="The Impossible Deal"
            id="deal-11982-heading"
            icon={"\u274c"}
          >
            Deal #11982: The One That Can&apos;t Be Won
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              In the early days of Windows FreeCell, the game shipped with
              32,000 numbered deals. Players quickly realized that almost
              every deal could be solved with enough patience and skill.
              Internet communities formed to collaboratively tackle the
              entire set, with players claiming specific deal ranges and
              reporting their results.
            </p>
            <p>
              By the mid-1990s, all 32,000 deals had been attempted. One
              by one, players solved even the most difficult configurations.
              Eventually, only a single deal remained: #11982. No human
              player could find a solution, and suspicion grew that it might
              be mathematically impossible.
            </p>
            <p>
              Computer solvers confirmed the suspicion. Using exhaustive
              search algorithms that tested every possible sequence of legal
              moves, multiple independent programs proved that Deal #11982
              has no solution. The cards create an unavoidable circular
              dependency where key low-value cards are trapped beneath
              cards that can&apos;t be moved without accessing those same
              low cards.
            </p>
            <p>
              Deal #11982 became famous in the gaming community &mdash; a
              testament to both the near-perfect design of FreeCell and the
              determination of the players who solved the other 31,999 deals.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── The Microsoft 32,000 ── */}
        <CardSection id="microsoft-32000">
          <SectionHeading
            sub="The Original Set"
            id="microsoft-32000-heading"
            icon={"\ud83d\udcbb"}
          >
            The Microsoft 32,000: How FreeCell Numbering Works
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Microsoft FreeCell uses a pseudorandom number generator (PRNG)
              to convert a deal number into a specific card arrangement. The
              algorithm takes the deal number as a seed, then shuffles the
              deck using a deterministic process. This means the same deal
              number always produces the same card layout.
            </p>
            <p>
              The original Windows 3.1 FreeCell (1991) included 32,000 deals
              numbered 1 through 32,000. Later versions expanded this to
              1,000,000 deals using the same PRNG algorithm. The numbering
              system became a shared language among FreeCell players &mdash;
              you could say &quot;try Deal #617&quot; and anyone running
              Microsoft FreeCell would get the same arrangement.
            </p>
            <p>
              This reproducibility is what made the community&apos;s
              systematic solving possible. Players could verify each
              other&apos;s claims, and the collective project of solving
              all 32,000 deals became one of the earliest examples of
              crowdsourced computational problem-solving.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── The Extended Million ── */}
        <CardSection id="million">
          <SectionHeading
            sub="Beyond 32,000"
            id="million-heading"
            icon={"\ud83d\udd22"}
          >
            The Extended Set: 1,000,000 Deals
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              When Microsoft expanded the deal set to 1,000,000, the FreeCell
              community naturally extended their solving project. Among the
              968,000 new deals, computer solvers found exactly 8 more
              unsolvable configurations:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#B8860B]/30">
                    <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Deal #</th>
                    <th className="py-2 pl-4 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[11982, 146692, 186216, 455889, 495505, 512118, 517776, 781948, 875865].map((num, i) => (
                    <tr key={num} className={i % 2 === 0 ? "bg-[#B8860B]/[0.03]" : ""}>
                      <td className="py-2 pr-4 text-sm font-mono font-medium text-[#2a2522]">
                        #{num.toLocaleString()}
                      </td>
                      <td className="py-2 pl-4 text-sm text-red-600 font-medium">
                        Proven Unsolvable
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              That&apos;s 9 unsolvable deals out of 1,000,000 &mdash; an
              unsolvability rate of 0.0009%. This aligns with the estimated
              rate from random sampling of approximately 1 in 78,000 deals.
              The{" "}
              <Link href="/why-freecell-is-almost-always-solvable" className="text-[#B8860B] hover:underline">
                mathematical reasons for this extraordinary solvability
              </Link>{" "}
              lie in FreeCell&apos;s design principles.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Play These Deals ── */}
        <CardSection id="try-them">
          <SectionHeading
            sub="Challenge Yourself"
            id="try-them-heading"
            icon={"\ud83c\udccf"}
          >
            Try These Famous Deals
          </SectionHeading>

          <ContentBody className="space-y-4">
            <p>
              You can play any numbered deal on PlayFreeCellOnline.com. Here
              are some to start with:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                href="/game/1"
                className="p-3 rounded-lg border border-[#B8860B]/20 hover:bg-[#B8860B]/5 transition-colors"
              >
                <span className="font-mono font-bold text-[#2a2522]">#1</span>
                <span className="text-sm text-[#666] ml-2">The classic first deal</span>
              </Link>
              <Link
                href="/game/617"
                className="p-3 rounded-lg border border-[#B8860B]/20 hover:bg-[#B8860B]/5 transition-colors"
              >
                <span className="font-mono font-bold text-[#2a2522]">#617</span>
                <span className="text-sm text-[#666] ml-2">The easy one</span>
              </Link>
              <Link
                href="/game/169"
                className="p-3 rounded-lg border border-[#B8860B]/20 hover:bg-[#B8860B]/5 transition-colors"
              >
                <span className="font-mono font-bold text-[#2a2522]">#169</span>
                <span className="text-sm text-[#666] ml-2">Expert challenge</span>
              </Link>
              <Link
                href="/game/11982"
                className="p-3 rounded-lg border border-[#B8860B]/20 hover:bg-[#B8860B]/5 transition-colors"
              >
                <span className="font-mono font-bold text-red-600">#11982</span>
                <span className="text-sm text-[#666] ml-2">The impossible deal</span>
              </Link>
            </div>
            <p className="text-sm text-[#666]">
              Want to explore more? Use the{" "}
              <Link href="/deals" className="text-[#B8860B] hover:underline">
                Deal Explorer
              </Link>{" "}
              to browse and search all deal numbers.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── FAQ ── */}
        <CardSection id="faq">
          <SectionHeading sub="Common Questions" id="faq-heading" icon={"\u2753"}>
            Frequently Asked Questions
          </SectionHeading>

          <ContentBody className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-[#2a2522] text-base mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Related Pages ── */}
        <CardSection id="related">
          <SectionHeading sub="Explore More" id="related-heading" icon={"\ud83d\udcda"}>
            Related Guides
          </SectionHeading>

          <ContentBody>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li>
                <Link href="/why-freecell-is-almost-always-solvable" className="text-[#B8860B] hover:underline text-sm">
                  Why FreeCell Is Almost Always Solvable &rarr;
                </Link>
              </li>
              <li>
                <Link href="/is-every-freecell-game-winnable" className="text-[#B8860B] hover:underline text-sm">
                  Is Every FreeCell Game Winnable? &rarr;
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-[#B8860B] hover:underline text-sm">
                  Deal Explorer &rarr;
                </Link>
              </li>
              <li>
                <Link href="/hard-freecell-games" className="text-[#B8860B] hover:underline text-sm">
                  Hard FreeCell Games &rarr;
                </Link>
              </li>
              <li>
                <Link href="/how-freecell-supermoves-work" className="text-[#B8860B] hover:underline text-sm">
                  How Supermoves Work &rarr;
                </Link>
              </li>
              <li>
                <Link href="/microsoft-freecell" className="text-[#B8860B] hover:underline text-sm">
                  Microsoft FreeCell History &rarr;
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-[#B8860B] hover:underline text-sm">
                  History of FreeCell &rarr;
                </Link>
              </li>
              <li>
                <Link href="/solver" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Solver &rarr;
                </Link>
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          heading="Play a Famous Deal"
          body="Try the impossible Deal #11982 for yourself, or start with the classic Deal #1."
          primaryLabel="Play FreeCell Now"
          primaryHref="/"
        />

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
