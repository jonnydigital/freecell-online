import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';
import { SectionHeading, CardSection, ContentBody, CtaSection, ContentLinkCard, JsonLd } from '@/components/content';

export const metadata: Metadata = {
  title: 'FreeCell World Records: Fastest Times, Longest Streaks, and Community Feats',
  description:
    'Explore reported FreeCell world records — fastest completion times, longest win streaks, the history of Deal #11982, and how the community tracks its greatest achievements.',
  keywords: [
    'freecell world records',
    'freecell fastest time',
    'freecell longest win streak',
    'freecell speed record',
    'freecell 11982',
    'freecell community records',
  ],
  openGraph: {
    title: 'FreeCell World Records: Fastest Times, Longest Streaks, and Community Feats',
    description:
      'A look at the fastest FreeCell completions, longest win streaks, and notable community achievements — with honest context about how records are tracked.',
    url: absoluteUrl('/freecell-world-records'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
};


const faqs = [
  {
    question: 'What is the fastest FreeCell completion time ever recorded?',
    answer:
      'There is no official governing body that tracks FreeCell speed records. Community reports suggest some players have completed deals in under 30 seconds, but these times depend heavily on the specific deal, the interface used, and whether auto-moves were enabled. Verified sub-minute completions are well documented in online forums.',
  },
  {
    question: 'What is the longest FreeCell win streak on record?',
    answer:
      'Community records suggest win streaks of several thousand consecutive games. Some players have reported streaks exceeding 10,000 wins. However, these numbers are difficult to verify independently and depend on whether the player used undo, restarts, or only played deals known to be solvable.',
  },
  {
    question: 'Is there an official FreeCell world record organization?',
    answer:
      'No. Unlike competitive sports, FreeCell has no governing body that certifies records. Records are tracked informally through online communities, forums, and leaderboards. This makes verification challenging and is why most record claims use hedging language.',
  },
  {
    question: 'Why is FreeCell Deal #11982 famous?',
    answer:
      'Deal #11982 is the best-known unsolvable deal among the original 32,000 Microsoft FreeCell deals. It became famous as players collectively tried and failed to solve it, eventually prompting computer analysis that confirmed it has no solution.',
  },
  {
    question: 'Can FreeCell records be compared across different apps?',
    answer:
      'Not easily. Different apps have different auto-move rules, interface speeds, and deal numbering systems. A fast time on one app may not be directly comparable to a time on another. The fairest comparisons happen within the same platform and deal set.',
  },
  {
    question: 'How can I start tracking my own FreeCell records?',
    answer:
      'Most FreeCell apps track your win rate, best time, and current streak automatically. You can monitor your personal bests on the statistics page. For community competition, streak modes and timed challenges offer structured ways to measure progress.',
  },
];


export default function FreecellWorldRecordsPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'FreeCell World Records: Fastest Times, Longest Streaks, and Community Feats',
      description:
        'A look at the reported FreeCell world records — fastest completions, longest win streaks, the Deal #11982 saga, and how the community tracks its greatest achievements.',
      author: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: '2026-03-07',
      dateModified: '2026-03-07',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/freecell-world-records'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'FreeCell World Records',
          item: absoluteUrl('/freecell-world-records'),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        <CardSection variant="dark">
            <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 block mb-3">
                Community Achievements
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-white leading-tight"
              >
                FreeCell World Records
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
                FreeCell has no governing body, no official tournament circuit, and no certified
                record book. That has not stopped players from pushing the game to extraordinary
                limits. The records that matter most are tracked by the community itself — on
                forums, leaderboards, and through decades of shared obsession.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.15fr,0.85fr]">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60 mb-3">
                    Important context
                  </div>
                  <p className="text-white leading-7">
                    Because there is no central authority, nearly all FreeCell records are
                    self-reported or tracked by individual platforms. We use hedging language
                    throughout this page — &quot;reported,&quot; &quot;community records suggest,&quot;
                    &quot;as of&quot; — because honest framing matters more than false precision.
                  </p>
                </div>

                <div className="rounded-xl bg-[#072907] p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                    Record categories
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-white/75">
                    <li>Fastest single-deal completion times</li>
                    <li>Longest consecutive win streaks</li>
                    <li>The Deal #11982 saga</li>
                    <li>Community-wide solvability projects</li>
                  </ul>
                </div>
              </div>
            </div>
        </CardSection>

        <CardSection id="speed-records" variant="dark">
            <SectionHeading variant="dark" sub="Against The Clock">Fastest FreeCell Completion Times</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Speed is the most visible FreeCell record category. Players compete to clear deals
                as fast as possible, and reported times have dropped dramatically as interfaces
                have improved. But comparing times across different apps is tricky because
                auto-move behavior, drag mechanics, and deal difficulty all vary.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Sub-minute completions</h3>
                  <p className="text-sm leading-7">
                    Experienced players regularly complete favorable deals in under 60 seconds.
                    Community reports suggest that times in the 30 to 45 second range are
                    achievable on deals with early foundation access and natural cascading.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">The auto-move factor</h3>
                  <p className="text-sm leading-7">
                    Many fast times rely heavily on auto-move features that send cards to
                    foundations automatically. This means the player is not manually placing every
                    card — the interface is doing much of the late-game work.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Deal selection matters</h3>
                  <p className="text-sm leading-7">
                    Not all deals are created equal for speed. Some deals cascade beautifully once
                    the first few moves are made. Speed records almost always come from
                    cherry-picked deals, not random ones.
                  </p>
                </div>
              </div>
              <p>
                As of 2026, the most credible speed claims come from platforms with built-in
                leaderboards that track times server-side. Self-reported times without replay
                verification are interesting but harder to confirm.
              </p>
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        <CardSection id="win-streaks" variant="dark">
            <SectionHeading variant="dark" sub="Never Losing">Longest Win Streaks</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Win streaks are FreeCell&apos;s endurance record. Because nearly every deal is
                solvable, a skilled and patient player can theoretically win indefinitely. The
                question is not whether it is possible but how long someone can maintain perfect
                focus.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/[0.07] p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Reported mega-streaks</h3>
                  <p className="text-white/70 text-sm leading-7">
                    Online communities have documented players claiming win streaks of several
                    thousand games. Some reports go as high as 10,000 or more consecutive wins.
                    These numbers are plausible given FreeCell&apos;s high solvability rate, but
                    they raise questions about undo usage, restarts, and deal filtering.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.07] p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">What counts as a &quot;win&quot;?</h3>
                  <p className="text-white/70 text-sm leading-7">
                    This is the central debate. Does a win streak break if you restart a deal? If
                    you use unlimited undo? If you skip a deal you cannot solve? Different
                    platforms define streaks differently, which makes cross-platform comparison
                    almost impossible.
                  </p>
                </div>
              </div>
              <p>
                The most impressive streaks are those played under strict rules: no restarts, no
                deal selection, limited or no undo. Under those conditions, community records
                suggest that streaks in the hundreds are a significant achievement, and streaks
                above a thousand are exceptional. Try building your own streak in{' '}
                <Link href="/streak" className="text-[#D4AF37] hover:underline">
                  Streak Mode
                </Link>
                .
              </p>
            </ContentBody>
        </CardSection>

        <CardSection id="deal-11982" variant="dark">
            <SectionHeading variant="dark" sub="The Famous Exception">The Deal #11982 Story</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                No discussion of FreeCell records is complete without{' '}
                <Link href="/game/11982" className="text-[#D4AF37] hover:underline">
                  Deal #11982
                </Link>
                . It is the most famous individual FreeCell deal in history — not because someone
                won it, but because nobody can.
              </p>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">The timeline</h3>
                <ul className="space-y-3 text-sm leading-7">
                  <li>
                    <strong>Early 1990s:</strong> Microsoft ships FreeCell with Windows, including
                    32,000 numbered deals. Players begin systematically attempting every one.
                  </li>
                  <li>
                    <strong>Mid-1990s:</strong> Internet communities form around the challenge of
                    solving all 32,000 deals. Most are cleared quickly, but a handful resist all
                    attempts.
                  </li>
                  <li>
                    <strong>Late 1990s:</strong> Deal #11982 emerges as the most stubbornly
                    unsolvable game. Thousands of players try and fail.
                  </li>
                  <li>
                    <strong>Computer confirmation:</strong> Solver programs eventually prove that
                    Deal #11982 has no valid solution. It is mathematically{' '}
                    <Link href="/is-every-freecell-game-winnable" className="text-[#D4AF37] hover:underline">
                      impossible to win
                    </Link>
                    .
                  </li>
                </ul>
              </div>
              <p>
                The Deal #11982 story matters because it proved that FreeCell is not trivially
                solvable. The game sits in a fascinating sweet spot: almost every deal has a
                solution, but finding it requires genuine skill and planning. That balance is what
                keeps players coming back decades later. Read the full story on our dedicated{' '}
                <Link href="/freecell-game-11982" className="text-[#D4AF37] hover:underline">
                  Game #11982
                </Link>{' '}
                page, or explore other notable deals in our{' '}
                <Link href="/famous-freecell-deals" className="text-[#D4AF37] hover:underline">
                  famous FreeCell deals
                </Link>{' '}
                guide.
              </p>
            </ContentBody>
        </CardSection>

        <CardSection id="community-projects" variant="dark">
            <SectionHeading variant="dark" sub="Collective Effort">Community Solvability Projects</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Some of the most impressive FreeCell achievements are not individual records but
                community-wide projects. Groups of players have systematically worked through
                massive deal sets to determine which deals are solvable and which are not.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">The 32,000 project</h3>
                  <p className="text-sm leading-7 text-white/70">
                    The original Microsoft FreeCell shipped with 32,000 numbered deals. The
                    community collectively solved all but a tiny handful, establishing that
                    FreeCell&apos;s solvability rate in that set is above 99.99%.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Million-deal analyses</h3>
                  <p className="text-sm leading-7 text-white/70">
                    Solver programs have been run on deal sets of one million or more. These
                    large-scale analyses confirm that roughly 99.999% of random FreeCell deals are
                    solvable — an extraordinary number for a card game. Learn more on our{' '}
                    <Link href="/winning-deals" className="text-[#D4AF37] hover:underline">
                      winning deals
                    </Link>{' '}
                    page.
                  </p>
                </div>
              </div>
              <p>
                These projects are a testament to the FreeCell community&apos;s dedication. They
                transformed a casual Windows game into one of the most thoroughly analyzed puzzles
                in recreational mathematics.
              </p>
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        <CardSection id="your-records" variant="dark">
            <SectionHeading variant="dark" sub="Start Tracking">Building Your Own Records</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                You do not need to chase world records to enjoy the competitive side of FreeCell.
                Personal bests are just as satisfying. Here are the records worth tracking in your
                own play.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <ContentLinkCard href="/statistics" title="Win rate over time" description="Track your win percentage across all games. A rising win rate is the clearest sign of improvement. Check your stats on the statistics page." />
                <ContentLinkCard href="/streak" title="Current win streak" description="See how many consecutive games you can win. Streak mode is designed for exactly this kind of focused practice." />
                <ContentLinkCard href="/storm" title="Best timed session" description="Storm mode lets you play under time pressure. Your fastest session is a personal speed record with built-in accountability." />
              </div>
            </ContentBody>
        </CardSection>

        <CardSection id="faq" variant="dark">
            <SectionHeading variant="dark" sub="Common Questions">FreeCell World Records FAQ</SectionHeading>
            <ContentBody variant="dark" className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={faq.question}>
                  <h3 className="font-medium text-white text-lg mb-2">{faq.question}</h3>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                  {index < faqs.length - 1 && <div className="mt-6 border-b border-white/[0.07]" />}
                </div>
              ))}
            </ContentBody>
        </CardSection>        <CtaSection
          heading="Start Building Your Own Record"
          body="Every record starts with a single game. Play a deal, beat your best time, extend your streak, and track your progress."
          primaryLabel="Play Streak Mode"
          primaryHref="/streak"
          secondaryLabel="Try Storm Mode"
          secondaryHref="/storm"
        />
      </main>
    </ContentLayout>
  );
}
