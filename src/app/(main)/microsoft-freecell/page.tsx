import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  ContentLinkCard,
  JsonLd,
} from "@/components/content";

export const metadata: Metadata = {
  title:
    "Microsoft FreeCell Online — Play the Classic Windows Card Game Free",
  description:
    "Play Microsoft FreeCell online for free — same deal numbers as Windows FreeCell, no download required. Features unlimited undo, hints, statistics, achievements, and mobile support. The classic card game you remember, modernized.",
  keywords: [
    "microsoft freecell",
    "microsoft freecell online",
    "play microsoft freecell",
    "windows freecell",
    "freecell windows",
    "microsoft freecell free",
    "freecell online free",
    "classic freecell",
    "windows freecell online",
    "microsoft freecell game",
    "freecell card game",
    "freecell deal numbers",
    "freecell game 11982",
    "play freecell no download",
    "microsoft solitaire freecell",
  ],
  openGraph: {
    title:
      "Microsoft FreeCell Online — Play the Classic Windows Card Game Free",
    description:
      "The same deal numbers, the same strategy — play Microsoft FreeCell in your browser for free. No download, no ads interrupting gameplay. All 32,000 original deals plus modern features.",
    url: absoluteUrl("/microsoft-freecell"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/microsoft-freecell"),
  },
};

/* ── FAQ data ── */

const faqItems = [
  {
    question: "Where can I play Microsoft FreeCell online?",
    answer:
      "You can play Microsoft FreeCell online right here at PlayFreeCellOnline.com — completely free, no download or account required. Our version uses the same deal numbering algorithm as the original Windows FreeCell, so games #1 through #32,000 are identical to the classic version. You get all the nostalgic gameplay plus modern features like unlimited undo, hints, statistics tracking, and mobile support.",
  },
  {
    question: "Are the deal numbers the same as Windows FreeCell?",
    answer:
      "Yes. Our site implements the same pseudorandom number generator and dealing algorithm that Microsoft used in the original Windows FreeCell. Deal #1 here is the same as Deal #1 in Windows FreeCell. Deal #617 is the same. All 32,000 original deals are identical. If you had a favorite deal number from the Windows version, you can play the exact same game here.",
  },
  {
    question: "What happened to FreeCell in Windows 10 and Windows 11?",
    answer:
      "Starting with Windows 8 in 2012, Microsoft removed the standalone FreeCell app and bundled it into the Microsoft Solitaire Collection. The collection is free to download but shows video advertisements between games and displays banner ads during gameplay unless you pay for a Premium subscription ($1.99/month or $14.99/year). Many longtime FreeCell players prefer web-based alternatives that preserve the clean, distraction-free experience of the original.",
  },
  {
    question: "Is Microsoft FreeCell game #11982 really impossible?",
    answer:
      "Yes. Deal #11982 is the only game out of the original 32,000 Microsoft FreeCell deals that has been proven unsolvable. Exhaustive computer analysis has confirmed that every possible sequence of legal moves leads to a dead end. The Internet FreeCell Project, which coordinated thousands of volunteer players from 1994 to 2000, successfully solved all other 31,999 deals but confirmed that #11982 cannot be won.",
  },
  {
    question: "Can I play Microsoft FreeCell on my phone?",
    answer:
      "Yes. PlayFreeCellOnline.com is fully responsive and works on iPhones, Android phones, and tablets. The layout automatically adjusts to your screen size, and touch controls are optimized for mobile play. You get the same experience — including deal number selection, undo, hints, and statistics — on any device with a web browser. No app download needed.",
  },
  {
    question: "Is this the official Microsoft FreeCell?",
    answer:
      "No, this is not an official Microsoft product. PlayFreeCellOnline.com is an independent, fan-built recreation of the classic FreeCell experience. However, we use the same deal numbering algorithm, so the 32,000 original deals are identical to Windows FreeCell. We also add features the original never had — unlimited undo, a hint system, statistics tracking, daily challenges, achievements, and theme customization — while keeping the core gameplay faithful to the version millions grew up playing.",
  },
];

export default function MicrosoftFreecellPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Microsoft FreeCell Online — Play the Classic Windows Card Game Free",
      description:
        "Play Microsoft FreeCell online with the same deal numbers as Windows FreeCell. Free, no download, with modern features like undo, hints, and statistics.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-03-16",
      dateModified: "2026-03-16",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl("/microsoft-freecell"),
      },
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
          name: "Microsoft FreeCell",
          item: absoluteUrl("/microsoft-freecell"),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* Hero */}
        <ContentHero
          kicker="Classic Windows Game"
          title="Play Microsoft FreeCell Online for Free"
          subtitle="The card game that shipped with every copy of Windows — now in your browser. Same deal numbers, same strategic depth, no download required. Pick up right where you left off in 1998."
        />

        {/* The Windows FreeCell Story */}
        <CardSection id="history" variant="dark">
          <SectionHeading
            variant="dark"
            sub="From Windows 3.1 to the Web"
            id="history-heading"
          >
            The Windows FreeCell Story
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              For an entire generation of computer users, FreeCell wasn&apos;t
              something you went looking for. It was just <em>there</em> — sitting in
              the Games folder of every Windows PC, quietly waiting between homework
              assignments and spreadsheet deadlines. No installation, no account, no
              tutorial. You clicked it, you figured it out, and before you knew it
              you&apos;d burned an hour trying to clear deal #617.
            </p>
            <p>
              The story starts in 1978, when medical student{" "}
              <strong>Paul Alfille</strong> created FreeCell on the PLATO educational
              computer system at the University of Illinois. He took an obscure older
              game called Baker&apos;s Game — which required building by suit and was
              brutally difficult — and made one elegant change: allow alternating-color
              stacking instead. That single rule tweak turned a niche puzzle into
              something almost anyone could learn to win.
            </p>
            <p>
              FreeCell might have stayed an academic curiosity if not for{" "}
              <strong>Jim Horne</strong>, a programmer at Microsoft. In 1990, Horne
              wrote his own FreeCell implementation and convinced Microsoft to include
              it with the <strong>Windows Entertainment Pack</strong> for Windows 3.1
              in 1991. Horne&apos;s version introduced the system of{" "}
              <strong>32,000 numbered deals</strong> — a feature that would become
              central to FreeCell culture. Players could share deal numbers, compare
              strategies on the same layout, and systematically work through the
              entire set.
            </p>
            <p>
              With <strong>Windows 95</strong>, FreeCell graduated from optional
              add-on to standard inclusion. It shipped with every copy of Windows 95,
              98, ME, 2000, and XP — appearing on hundreds of millions of computers
              worldwide. The{" "}
              <Link
                href="/history"
                className="text-[#D4AF37] hover:underline"
              >
                golden era of Windows FreeCell
              </Link>{" "}
              was the late &apos;90s and early 2000s, when office workers,
              students, and retirees alike discovered the game through nothing more
              than idle curiosity and a Start menu.
            </p>
            <p>
              <strong>Windows 7</strong> (2009) was the last version to include the
              classic standalone FreeCell. When <strong>Windows 8</strong> arrived in
              2012, Microsoft replaced it — along with the other classic games — with
              the <strong>Microsoft Solitaire Collection</strong>, a free-to-play app
              bundling FreeCell, Klondike, Spider, Pyramid, and TriPeaks. The
              collection works fine, but it introduced something the original never
              had: advertisements. Video ads play between games, banner ads line the
              interface, and removing them requires a monthly subscription. For many
              longtime players, it just wasn&apos;t the same.
            </p>
            <p>
              That&apos;s what this site is for. The same clean, distraction-free
              FreeCell you remember — running in any modern browser, on any device,
              with no ads interrupting your gameplay.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Deal Number Compatibility */}
        <CardSection id="deal-numbers" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Your Old Favorites Still Work"
            id="deal-numbers-heading"
          >
            Same Deal Numbers as Windows FreeCell
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              This isn&apos;t just &ldquo;a FreeCell game.&rdquo; We use the{" "}
              <strong>
                same pseudorandom number generator and dealing algorithm
              </strong>{" "}
              that Jim Horne implemented in the original Microsoft FreeCell. That
              means games #1 through #32,000 on this site produce the{" "}
              <em>exact same card layouts</em> as the Windows version.
            </p>
            <p>
              Had a favorite deal? A nemesis deal? A number you remember beating on
              a rainy afternoon in 2003? Type it in and you&apos;ll get the same
              cards in the same positions. Deal{" "}
              <Link
                href="/game/1"
                className="text-[#D4AF37] hover:underline"
              >
                #1
              </Link>{" "}
              is the same gentle opener. Deal{" "}
              <Link
                href="/game/11982"
                className="text-[#D4AF37] hover:underline"
              >
                #11982
              </Link>{" "}
              is the same impossible puzzle. Every number in between is a
              pixel-perfect recreation of the original layout.
            </p>
            <p>
              You can browse all available deals in the{" "}
              <Link
                href="/deals"
                className="text-[#D4AF37] hover:underline"
              >
                Deal Explorer
              </Link>
              , which lets you search by number, filter by difficulty, and jump
              straight into any game. It&apos;s the &ldquo;Select Game&rdquo;
              dialog from Windows FreeCell, but better.
            </p>
          </ContentBody>
        </CardSection>

        {/* Game #11982 */}
        <CardSection id="game-11982" variant="dark">
          <SectionHeading
            variant="dark"
            sub="The One That Can't Be Won"
            id="game-11982-heading"
          >
            Deal #11982 — The Impossible Game
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Of the original 32,000 Microsoft FreeCell deals, exactly{" "}
              <strong>one</strong> has been proven impossible to solve:{" "}
              <Link
                href="/freecell-game-11982"
                className="text-[#D4AF37] hover:underline"
              >
                Deal #11982
              </Link>
              .
            </p>
            <p>
              The discovery is one of the great collaborative stories of early
              internet culture. In 1994, Dave Ring launched the{" "}
              <strong>Internet FreeCell Project</strong>, coordinating thousands of
              volunteers who systematically worked through all 32,000 deals. By 2000,
              every deal had been solved at least once — except #11982. Exhaustive
              computer analysis later confirmed what the volunteers suspected: no
              sequence of legal moves can clear the board. Every path leads to a dead
              end.
            </p>
            <p>
              Eight other deals (#146, #455, #495, #512, #530, #1941, #6182, #8591)
              were long considered impossible but were eventually cracked using
              advanced solvers. Deal #11982 remains the lone holdout. You can{" "}
              <Link
                href="/game/11982"
                className="text-[#D4AF37] hover:underline"
              >
                try it yourself
              </Link>{" "}
              — just don&apos;t expect to win.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* What Made Microsoft FreeCell Special */}
        <CardSection id="what-made-it-special" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Why Millions Got Hooked"
            id="special-heading"
          >
            What Made Microsoft FreeCell Special
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Most solitaire games involve a fair amount of luck. You flip cards from
              a stock pile and hope for the best. FreeCell is fundamentally different:
              all 52 cards are dealt face-up from the start. There is no hidden
              information, no luck of the draw, no blaming the shuffle. When you lose,
              it&apos;s because of your decisions — and when you win, you earned it.
            </p>
            <p>
              The <strong>four free cells</strong> — temporary parking spaces for
              individual cards — give you just enough room to maneuver without making
              the game trivial. Expert players learn to keep cells empty as long as
              possible, using them as a last resort rather than a first move. The
              tension between needing free cells to execute a plan and needing them
              empty for future flexibility is what gives FreeCell its strategic depth.
            </p>
            <p>
              Then there were the <strong>numbered deals</strong>. That &ldquo;Select
              Game&rdquo; dialog — a simple text field where you typed a number from 1
              to 32,000 — turned FreeCell from a random pastime into a shared
              experience. You could tell a coworker &ldquo;try deal #1941&rdquo; and
              know they&apos;d face the exact same challenge. People kept notebooks of
              beaten deals. Online forums traded strategies for specific numbers.
              Speed records were set and broken on particular deals. No other solitaire
              game created that kind of community around individual puzzles.
            </p>
            <p>
              And it was <em>always there</em>. You didn&apos;t have to install
              anything, buy anything, or sign up for anything. Click Start, click
              Games, click FreeCell. That frictionless accessibility — combined with a
              game that rewarded genuine skill — is why Microsoft FreeCell became one
              of the most-played computer games in history.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Microsoft FreeCell vs Our Version */}
        <CardSection id="comparison" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Everything You Loved — Plus Modern Features"
            id="comparison-heading"
          >
            Microsoft FreeCell vs {siteConfig.siteName}
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              We built this site because we missed the original too. Here&apos;s how
              the two versions compare:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 font-semibold text-[#D4AF37]">
                      Feature
                    </th>
                    <th className="py-3 px-4 font-semibold text-[#D4AF37]">
                      Windows FreeCell
                    </th>
                    <th className="py-3 pl-4 font-semibold text-[#D4AF37]">
                      {siteConfig.siteName}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Deal Numbers #1–32,000
                    </td>
                    <td className="py-3 px-4">✅ Yes</td>
                    <td className="py-3 pl-4">✅ Same algorithm</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Extended Deals (32,001+)
                    </td>
                    <td className="py-3 px-4">❌ No</td>
                    <td className="py-3 pl-4">✅ Over 1 million deals</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Undo
                    </td>
                    <td className="py-3 px-4">Single undo only</td>
                    <td className="py-3 pl-4">✅ Unlimited undo</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Hint System
                    </td>
                    <td className="py-3 px-4">❌ No</td>
                    <td className="py-3 pl-4">
                      ✅{" "}
                      <Link
                        href="/freecell-hints-explained"
                        className="text-[#D4AF37] hover:underline"
                      >
                        Smart hints
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Statistics
                    </td>
                    <td className="py-3 px-4">Win/loss only</td>
                    <td className="py-3 pl-4">
                      ✅{" "}
                      <Link
                        href="/statistics"
                        className="text-[#D4AF37] hover:underline"
                      >
                        Detailed stats
                      </Link>{" "}
                      — time, moves, streaks, win rate
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Achievements
                    </td>
                    <td className="py-3 px-4">❌ No</td>
                    <td className="py-3 pl-4">
                      ✅{" "}
                      <Link
                        href="/achievements"
                        className="text-[#D4AF37] hover:underline"
                      >
                        Full achievement system
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Daily Challenge
                    </td>
                    <td className="py-3 px-4">❌ No</td>
                    <td className="py-3 pl-4">
                      ✅{" "}
                      <Link
                        href="/daily-freecell"
                        className="text-[#D4AF37] hover:underline"
                      >
                        Daily FreeCell
                      </Link>{" "}
                      — same deal worldwide
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Solver
                    </td>
                    <td className="py-3 px-4">❌ No</td>
                    <td className="py-3 pl-4">
                      ✅{" "}
                      <Link
                        href="/solver"
                        className="text-[#D4AF37] hover:underline"
                      >
                        Built-in solver
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Mobile Support
                    </td>
                    <td className="py-3 px-4">❌ Desktop only</td>
                    <td className="py-3 pl-4">
                      ✅ Phone, tablet, desktop
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Themes
                    </td>
                    <td className="py-3 px-4">Classic green only</td>
                    <td className="py-3 pl-4">
                      ✅ Multiple themes
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Auto-Complete
                    </td>
                    <td className="py-3 px-4">✅ Basic</td>
                    <td className="py-3 pl-4">
                      ✅ Smart auto-complete
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Game Variants
                    </td>
                    <td className="py-3 px-4">Classic only</td>
                    <td className="py-3 pl-4">
                      ✅{" "}
                      <Link
                        href="/freecell-variants"
                        className="text-[#D4AF37] hover:underline"
                      >
                        10+ variants
                      </Link>{" "}
                      including reduced-cell modes
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">
                      Price
                    </td>
                    <td className="py-3 px-4">
                      Included with Windows (discontinued)
                    </td>
                    <td className="py-3 pl-4">✅ Free forever</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Getting Started */}
        <CardSection id="getting-started" variant="dark">
          <SectionHeading
            variant="dark"
            sub="New to FreeCell?"
            id="getting-started-heading"
          >
            How to Get Started
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard
                href="/how-to-play"
                title="How to Play"
                description="Learn the rules of FreeCell from scratch — takes about 3 minutes."
                icon="📖"
              />
              <ContentLinkCard
                href="/strategy"
                title="Strategy Guide"
                description="Advanced techniques for winning more games and improving your solve rate."
                icon="🧠"
              />
              <ContentLinkCard
                href="/tips"
                title="Quick Tips"
                description="Practical tips to improve your game right away."
                icon="💡"
              />
            </div>
          </ContentBody>
        </CardSection>

        {/* CTA */}
        <CtaSection
          heading="Ready to Play Microsoft FreeCell?"
          body="Same deals. Same strategy. Better features. Jump into the game you remember — right in your browser, on any device."
          primaryLabel="Play FreeCell Now"
          secondaryLabel="Browse Deal Numbers"
          secondaryHref="/deals"
        />

        <AdUnit className="-my-1" />

        {/* FAQ */}
        <CardSection id="faq" variant="dark">
          <SectionHeading variant="dark" sub="Common Questions" id="faq-heading">
            Frequently Asked Questions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            {faqItems.map((faq) => (
              <div
                key={faq.question}
                className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm leading-7 text-white/70">{faq.answer}</p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* Related Pages */}
        <CardSection id="related" variant="dark">
          <SectionHeading variant="dark" sub="Keep Reading" id="related-heading">
            Related Pages
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-2">
              <ContentLinkCard
                href="/history"
                title="FreeCell History"
                description="The full story of FreeCell — from PLATO in 1978 to the modern web."
              />
              <ContentLinkCard
                href="/freecell-game-11982"
                title="Deal #11982 — The Impossible Game"
                description="Everything you need to know about the one FreeCell deal that can't be won."
              />
              <ContentLinkCard
                href="/freecell-variants"
                title="FreeCell Variants"
                description="9+ ways to play FreeCell — from beginner-friendly to expert-only."
              />
              <ContentLinkCard
                href="/freecell-vs-klondike"
                title="FreeCell vs Klondike"
                description="How FreeCell compares to the world's most popular solitaire game."
              />
            </div>
          </ContentBody>
        </CardSection>

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
