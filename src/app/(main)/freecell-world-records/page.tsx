import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { canonicalUrlFor, isOwnedBy } from '@/lib/routeOwnership';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';
import { SectionHeading, CardSection, ContentBody, CtaSection, ContentLinkCard, JsonLd } from '@/components/content';
import AuthorByline from '@/components/content/AuthorByline';

const PUBLISHED_DATE = '2026-04-05';
const UPDATED_DATE = '2026-04-05';
const ROUTE = '/freecell-world-records';

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
  alternates: {
    canonical: canonicalUrlFor(ROUTE),
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
  if (!isOwnedBy(ROUTE, siteConfig.key)) notFound();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'FreeCell World Records: Fastest Times, Longest Streaks, and Community Feats',
      description:
        'A look at the reported FreeCell world records — fastest completions, longest win streaks, the Deal #11982 saga, and how the community tracks its greatest achievements.',
      author: {
        '@type': 'Organization',
        name: 'Solitaire Stack Editorial Team',
        url: absoluteUrl('/authors/editorial-team'),
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
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
        <div className="flex justify-center">
          <AuthorByline
            authorSlug="editorial-team"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>
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

        {/* Speedrun categories */}
        <CardSection id="speedrun-categories" variant="dark">
            <SectionHeading variant="dark" sub="Speedrun Categories">Speedrun categories worth knowing</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Speedrun play has developed into several
                distinct categories, each with its own
                conventions. Understanding the categories
                helps you read claims critically: a
                forty-second time on a cherry-picked deal is a
                very different achievement from a
                two-minute time on an arbitrary deal.
              </p>
              <p>
                <strong>Specific-deal speedruns</strong> are
                the most visible category. A player picks a
                known deal — often deal #1 or another
                low-numbered favourable board — and optimises
                the completion time. Records in this category
                often dip below thirty seconds because the
                solution is memorised and execution is
                mostly about input speed. Timing typically
                starts on the first move rather than when
                the deal loads.
              </p>
              <p>
                <strong>Random-deal speedruns</strong> are
                the harder category. Here the deal is drawn
                at random at the start of the attempt, and
                the clock runs until the game is won (or
                lost). Times are longer because the player
                cannot rely on memorised lines, and the
                metric depends on consistency rather than
                peak performance. A two-minute random-deal
                average is respectable; a ninety-second
                average approaches tournament class.
              </p>
              <p>
                <strong>Hard-deal speedruns</strong> take a
                known difficult deal (say, #11982&apos;s
                close relatives or the historically hard
                deal list) and measure how quickly it can be
                solved. These are rare because the deals
                genuinely require thought, which is hard to
                combine with speed. The people who post
                times in this category tend to be the
                strongest FreeCell players in the world.
              </p>
              <p>
                <strong>Marathon speedruns</strong> measure
                time across a set of deals (often the first
                hundred from the Microsoft set, or a
                curated mix). This category tests endurance
                as much as tactical speed and is where
                sustained per-deal averages matter more
                than peak performance.
              </p>
              <p>
                A fifth category worth noting is{' '}
                <strong>blindfold-style play</strong>,
                where the player announces their moves
                verbally or by typing and cannot use the
                interface to experiment. This category is
                vanishingly rare but produces
                extraordinary-looking claims when it
                happens, because it requires holding the
                entire game state in memory between
                moves. Treat blindfold claims with
                particular skepticism unless they come
                with recorded video.
              </p>
            </ContentBody>
        </CardSection>

        {/* Fewest moves records */}
        <CardSection id="fewest-moves" variant="dark">
            <SectionHeading variant="dark" sub="Minimum Moves">Fewest-moves records</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                A parallel achievement category measures
                efficiency rather than speed: how few moves
                does it take to clear a deal? FreeCell&apos;s
                move counter increments on every single-card
                action, so a tight solution can finish with
                very few registered moves. Solvers typically
                find optimal or near-optimal move counts as
                part of their normal output, so the
                theoretical minimum for any given deal is
                known even when the fastest human attempt is
                not.
              </p>
              <p>
                For typical deals, the minimum move count
                sits between seventy and ninety registered
                moves. Gentle deals can be cleared in the
                sixties. Harder deals sometimes require well
                over a hundred moves even under optimal
                play. Human players rarely match the solver
                minimum, because finding the truly optimal
                move order requires exhaustive search that
                humans cannot perform in a reasonable time.
                Still, hitting within five or ten moves of
                the optimum is a meaningful achievement and
                a common personal goal.
              </p>
              <p>
                One subtlety: what counts as a
                &ldquo;move&rdquo; differs across
                implementations. Some count every single
                card action, including foundation
                auto-moves. Others count supermoves as a
                single move regardless of how many cards
                were shuffled through cells to execute
                them. Claims about fewest-moves records
                should specify the counting convention, or
                they are not comparable.
              </p>
              <p>
                There is also a less-celebrated category:
                the <strong>most-moves</strong> record,
                which tracks the longest legal completion
                of a given deal. It sounds perverse but
                is a genuine puzzle: how many legal moves
                can you make before the game either wins
                itself or stalls? Researchers studying
                game-tree depth have used this metric to
                characterise FreeCell difficulty, and it
                occasionally resurfaces in community
                discussions as a curiosity. The deals
                with the longest legal move sequences
                tend to be the hardest ones.
              </p>
              <p>
                For most players, the practical takeaway
                is that move count is a useful
                personal-improvement metric even if it
                never becomes a competitive record. A
                move count that drops over time is a
                reliable signal that your play is getting
                cleaner, whether or not you are competing
                for any external recognition.
              </p>
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Tournament formats */}
        <CardSection id="tournament-formats" variant="dark">
            <SectionHeading variant="dark" sub="Competitive Play">Tournament formats</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                FreeCell tournaments are informal but
                established. Several formats have emerged
                over the years, each with different
                emphases.
              </p>
              <p>
                <strong>FreeCell Pro tournaments</strong> are
                organised around a specific software
                implementation that has been popular in
                competitive circles for years. They
                typically use a curated set of hard deals,
                give players long time limits, and track
                cumulative solve rates. Winners are players
                who complete the most deals in the set
                within the allotted time without using
                restarts.
              </p>
              <p>
                <strong>Online leaderboard tournaments</strong>{' '}
                run on specific platforms and track times
                across shared daily deals or fixed deal
                sets. Players compete across time zones on
                the same boards, producing clean
                comparisons. These tournaments tend to
                favour speed over depth because fast
                completion of easy deals is usually the
                winning strategy.
              </p>
              <p>
                <strong>Community challenges</strong> are
                informal but persistent. Someone on a forum
                proposes a challenge (&ldquo;beat deal
                #11982 variants, or solve the entire
                1,000-deal block starting at #10,000&rdquo;)
                and players self-report. These rarely
                produce &ldquo;world records&rdquo; in any
                formal sense but they generate a steady
                stream of collective play and
                record-keeping.
              </p>
              <p>
                None of these formats is sanctioned by a
                central body. Each produces real competition
                and real records, but the records are
                contextual. A FreeCell Pro champion and an
                online-leaderboard top-timer may both be
                world-class players, and comparing them
                directly would require running them on the
                same deal set under the same rules. That
                kind of head-to-head rarely happens.
              </p>
              <p>
                A final format worth knowing:{' '}
                <strong>variant tournaments</strong>. Some
                competitive circles run tournaments in
                harder FreeCell variants — two-cell
                FreeCell, Baker&apos;s Game, or Seahaven
                Towers — precisely because those variants
                punish the speed-focused styles that
                dominate standard FreeCell tournaments.
                The winners of variant tournaments tend
                to be players with exceptional planning
                discipline, because the variants do not
                let aggressive play compensate for poor
                reading of the board.
              </p>
            </ContentBody>
        </CardSection>

        {/* Notable players */}
        <CardSection id="notable-players" variant="dark">
            <SectionHeading variant="dark" sub="The People Behind the Records">Notable players and their strategies</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Because FreeCell has no governing body, the
                &ldquo;best player&rdquo; list is an
                informal one assembled from forum
                reputation, leaderboard rankings, and
                long-running community memory. A few names
                recur in historical discussions.
              </p>
              <p>
                <strong>Michael Keller</strong>, who
                coordinated much of the Internet FreeCell
                Project through the 1990s, is not primarily
                known for competitive play but for his
                exhaustive research on the Microsoft 32,000
                deal set. His work confirmed that every
                deal except #11982 is solvable, and he
                documented many hard-deal solutions that
                remain reference material today.
              </p>
              <p>
                <strong>Dave Ring</strong>, founder of the
                Internet FreeCell Project, organised the
                collective effort that verified the
                Microsoft set and helped establish the
                community norms around deal identification
                and solution sharing that tournaments still
                follow.
              </p>
              <p>
                Modern competitive players are less publicly
                identified because online leaderboards
                typically use screen names. What we can
                observe is their strategy: top players
                consistently report long planning phases on
                unfamiliar deals, strict cell discipline,
                and an explicit habit of counting
                movable-run capacity before every
                multi-card move. They do not rely on
                intuition. They count.
              </p>
              <p>
                A few common habits recur across
                interviews and forum posts from top
                players. They plan first, play later —
                opening moves often come after two or
                three minutes of motionless thought. They
                treat cells as exhaustible resources and
                count before filling. They study solver
                output on deals they lost, looking for
                the moves their own search did not
                consider. And they calibrate aggression
                to difficulty: on gentle deals they play
                fast, on hard deals they play slow, and
                they do not confuse the two.
              </p>
              <p>
                For players chasing their own first
                records, the lesson is clear: the path to
                stronger play runs through counting and
                planning, not through faster clicks or
                clever tricks. Work on the{' '}
                <Link href="/freecell-mastery" className="text-[#D4AF37] hover:underline">
                  mastery guide
                </Link>{' '}
                first; the records will follow.
              </p>
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* How records are verified */}
        <CardSection id="verification" variant="dark">
            <SectionHeading variant="dark" sub="Trust But Verify">How records are verified</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Verification is the hard problem of
                FreeCell records. Without a central
                authority, every claim has to be verified
                some other way, and the community has
                developed a few informal standards.
              </p>
              <p>
                <strong>Server-side timing</strong> is the
                strongest form of verification. A platform
                that records your completion time on its
                own servers, before any client-side claim
                is made, produces a tamper-resistant
                record. Most modern leaderboards work this
                way.
              </p>
              <p>
                <strong>Video recording</strong> is the
                next best thing. A player who records
                their session and publishes it provides
                evidence that the claimed time and move
                count match a real play sequence. Video
                verification has become standard for
                high-stakes speedrun claims in most games,
                and FreeCell is no exception.
              </p>
              <p>
                <strong>Replay files</strong> are the
                traditional verification method. Many
                FreeCell implementations support
                move-by-move export, which allows other
                players to replay and audit a claimed
                solve. Replays are especially useful for
                verifying fewest-moves claims, because
                they show the exact move sequence.
              </p>
              <p>
                <strong>Self-reported claims</strong>{' '}
                without any of the above are treated
                skeptically but not dismissed. They are
                useful as anecdote and as inspiration but
                not as evidence. The Research Desk treats
                any unverified claim as
                &ldquo;community-reported&rdquo; and
                hedges language accordingly throughout this
                page.
              </p>
              <p>
                We also note that different platforms run
                FreeCell differently — auto-move rules,
                supermove handling, drag-and-drop speed,
                undo permissiveness — and these details
                can shift times and move counts in ways
                that make cross-platform comparison
                unreliable. A time set on one site is not
                trivially comparable to a time set on
                another.
              </p>
            </ContentBody>
        </CardSection>

        {/* Context for reading records */}
        <CardSection id="reading-records" variant="dark">
            <SectionHeading variant="dark" sub="Context Matters">Reading FreeCell records skeptically</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                The internet is full of FreeCell record
                claims, and most of them are either
                unverified, out of context, or comparing
                apples to oranges. A healthy skepticism
                makes you a better reader of the
                record-keeping landscape. Here are the
                questions the Research Desk asks before
                taking any FreeCell record claim at face
                value.
              </p>
              <p>
                <strong>Which deal?</strong> A
                thirty-second completion on deal #1 is
                routine. A thirty-second completion on a
                random hard deal is extraordinary. Claims
                that do not specify the deal are not
                claims, they are anecdotes.
              </p>
              <p>
                <strong>Which platform?</strong> Times on
                platforms with aggressive auto-move
                behaviour are systematically faster than
                times on stricter platforms. The claim
                loses meaning without the platform
                context.
              </p>
              <p>
                <strong>Which rules?</strong> Did the
                player use undo? Restarts? Hints? A
                win-streak of ten thousand games means
                something very different if the player
                restarts any deal they fear losing.
              </p>
              <p>
                <strong>How was it verified?</strong> Was
                there server-side timing, video, or
                replay? Or is this a forum post from
                eight years ago?
              </p>
              <p>
                We are not suggesting that every claim is
                false — many FreeCell records are real
                achievements by dedicated players. We are
                suggesting that the record-keeping
                ecosystem lacks the verification
                infrastructure that sports and competitive
                gaming take for granted, and that readers
                should calibrate their credulity
                accordingly. When we make claims on this
                site, we hedge them. When other sites
                do not, you should.
              </p>
              <p>
                The broader point is that FreeCell is
                an unusually democratic competitive
                scene. There is no membership fee, no
                sanctioning body, and no prize circuit.
                Anyone with an internet connection and
                patience can post a time, and anyone
                with the same patience can verify or
                dispute it. That openness produces a
                messy record landscape and also a
                genuinely inclusive community. Take the
                records with skepticism, and take the
                community as it is: decades-deep,
                obsessive in the best way, and still
                arguing about whether deal #617 is
                really that hard.
              </p>
              <p>
                If you want to participate, the path is
                simple. Play many deals, track your
                times and move counts honestly, share
                your results in community spaces, and
                accept correction when your numbers do
                not hold up. Records worth anything
                are the ones verified by a community
                willing to look at them carefully, and
                joining that community is as easy as
                posting your first honest stat, along
                with enough context for anyone else to
                check your work. That is the whole
                bar to entry, and it is a low one by
                design.
              </p>
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
        </CardSection>

        {/* ── Related Guides ── */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/famous-freecell-deals" title="Famous FreeCell Deals" description="Explore the most iconic games in FreeCell history." />
            <ContentLinkCard href="/hard-freecell-games" title="Hard FreeCell Games" description="See the board patterns that make deals difficult and demand cleaner play." />
            <ContentLinkCard href="/freecell-game-11982" title="Deal #11982" description="The full story of the only proven unsolvable FreeCell deal." />
          </ContentBody>
        </CardSection>

        <CtaSection
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
