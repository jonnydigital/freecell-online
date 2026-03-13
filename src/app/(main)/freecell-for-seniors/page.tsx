import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'FreeCell for Seniors — A Perfect Brain-Training Card Game',
  description:
    'FreeCell Solitaire is ideal for seniors: all cards visible, no time pressure, unlimited undo, and real cognitive benefits. Learn why FreeCell is the perfect daily brain exercise.',
  keywords: [
    'freecell for seniors',
    'freecell brain training',
    'card games for seniors',
    'freecell cognitive benefits',
    'solitaire for older adults',
    'freecell mental exercise',
    'brain games for seniors',
    'freecell accessibility',
    'freecell for beginners seniors',
    'best card game for elderly',
  ],
  openGraph: {
    title: 'FreeCell for Seniors — A Perfect Brain-Training Card Game',
    description:
      'Why FreeCell Solitaire is ideal for seniors: perfect information, no time pressure, cognitive benefits, and accessibility features.',
    url: absoluteUrl('/freecell-for-seniors'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const CARD = 'rounded-xl bg-white/[0.04] border border-white/[0.07] overflow-hidden';

function SectionHeading({
  children,
  id,
  sub,
}: {
  children: React.ReactNode;
  id?: string;
  sub?: string;
}) {
  return (
    <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-white scroll-mt-6"
      >
        {children}
      </h2>
      <div className="mt-4 h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
    </div>
  );
}

export default function FreecellForSeniorsPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'FreeCell for Seniors — A Perfect Brain-Training Card Game',
      description:
        'Why FreeCell Solitaire is an ideal brain-training card game for seniors, with practical guidance on getting started, accessibility features, and cognitive benefits.',
      author: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: '2026-03-12',
      dateModified: '2026-03-12',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/freecell-for-seniors'),
      },
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
          name: 'FreeCell for Seniors',
          item: absoluteUrl('/freecell-for-seniors'),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* Hero */}
        <section>
          <div className={CARD}>
            <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 block mb-3">
                Brain Training
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                FreeCell for Seniors
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
                FreeCell Solitaire is one of the best card games for keeping your mind sharp.
                Every card is visible from the start, there is no time pressure, and you can
                undo any move. It rewards planning and patience &mdash; skills that only improve
                with experience.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-white/50 mt-1">Visible Cards</div>
                  <p className="text-xs text-white/40 mt-2">No guessing. Every card is face-up from move one.</p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-white">No</div>
                  <div className="text-sm text-white/50 mt-1">Time Pressure</div>
                  <p className="text-xs text-white/40 mt-2">Play at your own pace. Think as long as you need.</p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-white">&infin;</div>
                  <div className="text-sm text-white/50 mt-1">Unlimited Undo</div>
                  <p className="text-xs text-white/40 mt-2">Take back any move. Explore freely without penalty.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why FreeCell Suits Slower-Paced Play */}
        <section id="why-freecell" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="The Right Fit" id="why-freecell-heading">Why FreeCell Suits a Thoughtful Pace</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                Many digital games reward speed and reflexes. FreeCell rewards the opposite:
                careful observation, patient planning, and the willingness to think several
                moves ahead before committing. There is no countdown timer, no penalty for
                pausing, and no advantage to rushing.
              </p>
              <p>
                This makes FreeCell genuinely well-suited to players who prefer a slower,
                more deliberate style. Whether you spend five minutes or fifty on a single deal,
                the game accommodates you. You set the pace. The puzzle waits.
              </p>
              <p>
                Unlike Klondike Solitaire (the classic &quot;regular Solitaire&quot;), FreeCell
                has no hidden cards and no random draw pile. Every piece of information you need
                is on the board from the start. This eliminates frustrating surprise cards and
                lets you focus entirely on planning your moves. If something goes wrong, it is
                always because of a choice you made &mdash; and you can always undo that choice
                and try a different approach.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* Perfect Information */}
        <section id="perfect-information" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="No Hidden Cards" id="perfect-information-heading">The Full-Information Advantage</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                In FreeCell, all 52 cards are dealt face-up. You can see exactly what you are
                working with from your very first move. This is what game designers call
                &quot;perfect information&quot; &mdash; and it fundamentally changes the experience.
              </p>
              <p>
                With perfect information, there is no luck. Every game is a fair puzzle. When you
                win, it is because you planned well. When you lose, you can trace your steps back
                and see where a different choice would have led to a better outcome. This feedback
                loop is one of the things that makes FreeCell so satisfying and mentally engaging.
              </p>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">What this means in practice</h3>
                <ul className="space-y-3 text-sm leading-7">
                  <li>You can plan your entire approach before making a single move.</li>
                  <li>There are no unpleasant surprises from hidden cards.</li>
                  <li>You can evaluate whether a move is good or bad before committing to it.</li>
                  <li>Wins feel genuinely earned because skill, not luck, determined the result.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Using Undo and Hints */}
        <section id="undo-and-hints" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Learning Tools" id="undo-hints-heading">Using Undo and Hints Effectively</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                Some players feel reluctant to use the undo button or the hint feature, as though
                it diminishes the achievement. It does not. Undo and hints are learning tools,
                not shortcuts. Using them is one of the best ways to improve your understanding
                of the game.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Undo (Z key)</h3>
                  <p className="text-sm leading-7">
                    Take back your last move &mdash; or your last twenty moves. Use undo to explore
                    &quot;what if&quot; scenarios: try one approach, see where it leads, then undo
                    and try another. This is how strong players develop their intuition for good
                    and bad moves.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Hints (H key)</h3>
                  <p className="text-sm leading-7">
                    The hint system highlights a move you may not have noticed. It does not solve
                    the game for you &mdash; it nudges you toward possibilities you might have
                    overlooked. Think of it as a gentle suggestion, not an answer key.
                  </p>
                </div>
              </div>
              <p>
                There is no scoreboard penalty for using either feature. The goal is to enjoy
                the puzzle and keep your mind active, not to prove anything to anyone.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* Playing on a Larger Screen */}
        <section id="larger-screen" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Comfort" id="larger-screen-heading">Playing on a Larger Screen</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                FreeCell works on phones, tablets, and desktop computers. If you find the cards
                difficult to read on a small screen, consider playing on a tablet or laptop.
                Larger screens make the card values and suits easier to distinguish, and clicking
                or tapping is more comfortable when the cards are not tiny.
              </p>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Screen recommendations</h3>
                <ul className="space-y-3 text-sm leading-7">
                  <li><strong className="text-white">Desktop or laptop:</strong> The best experience for extended sessions. Cards are large, columns are well-spaced, and mouse clicks are precise.</li>
                  <li><strong className="text-white">Tablet (iPad, etc.):</strong> Excellent for playing from a comfortable chair. Touch controls work well, and the screen is large enough to see all eight columns clearly.</li>
                  <li><strong className="text-white">Phone:</strong> Fine for a quick game on the go. Landscape mode gives you more room. The game adjusts its layout automatically.</li>
                </ul>
              </div>
              <p>
                Our game is browser-based, so there is nothing to install. Just open it in your
                web browser and start playing. It saves your progress automatically.
              </p>
            </div>
          </div>
        </section>

        {/* Building a Daily Routine */}
        <section id="daily-routine" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Healthy Habit" id="daily-routine-heading">Building a Daily Routine</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                One of the most rewarding aspects of FreeCell is its suitability as a daily
                habit. A single game takes 5 to 15 minutes, making it easy to fit into a
                morning routine with coffee or an evening wind-down before bed.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Daily Challenge</h3>
                  <p className="text-sm leading-7">
                    Every day, there is a new{' '}
                    <Link href="/daily-freecell" className="text-[#D4AF37] hover:underline">
                      daily FreeCell challenge
                    </Link>{' '}
                    &mdash; the same deal for everyone worldwide. It gives you a shared puzzle to
                    work on and a reason to play each day. Many players make it part of their
                    morning routine.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Streak Tracking</h3>
                  <p className="text-sm leading-7">
                    The game tracks your winning streak &mdash; how many games in a row you have
                    won. Building a streak creates a gentle motivation to play thoughtfully and
                    consistently. It is satisfying to watch the number grow over days and weeks.
                  </p>
                </div>
              </div>
              <p>
                Consistency matters more than duration. Playing one thoughtful game each day
                provides more cognitive benefit than binging five games once a week. The planning,
                sequencing, and pattern recognition involved in each game exercise your working
                memory and executive function.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* Accessibility Features */}
        <section id="accessibility" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="For All Players" id="accessibility-heading">Accessibility Features</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                Our FreeCell game includes several features designed to make the experience
                comfortable for all players.
              </p>
              <div className="space-y-4">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Keyboard Shortcuts</h3>
                  <p className="text-sm leading-7">
                    Play entirely with the keyboard. Press 1&ndash;8 to select columns, A/S/D/F
                    for free cells, Q/W/E/R for foundations, Z to undo, H for hints, and N for
                    a new game. Press ? at any time to see the full shortcuts list. This is
                    helpful if using a mouse is uncomfortable.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Screen Reader Support</h3>
                  <p className="text-sm leading-7">
                    Cards and game zones are labeled with ARIA attributes so that screen readers
                    can announce card values, positions, and available moves. This makes the game
                    accessible to visually impaired players.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">No Account Required</h3>
                  <p className="text-sm leading-7">
                    You do not need to create an account, remember a password, or provide any
                    personal information. Just open the page and play. Your game state saves
                    automatically in your browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cognitive Benefits */}
        <section id="cognitive-benefits" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Mental Exercise" id="cognitive-heading">Cognitive Benefits of FreeCell</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                FreeCell engages several cognitive skills simultaneously. While no card game is
                a substitute for medical advice, research on puzzle-based activities suggests
                they can support mental sharpness when practiced regularly.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Planning &amp; Sequencing</h3>
                  <p className="text-sm leading-7">
                    Every FreeCell game requires you to plan a series of moves in advance.
                    Which card needs to move first? What does that enable? Thinking three or four
                    moves ahead exercises the same planning skills used in daily decision-making.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Working Memory</h3>
                  <p className="text-sm leading-7">
                    Keeping track of where key cards are located, which free cells are occupied,
                    and what your next several moves will be exercises working memory &mdash; the
                    mental &quot;scratchpad&quot; you use for short-term information.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Pattern Recognition</h3>
                  <p className="text-sm leading-7">
                    Over time, you start recognizing common board configurations and knowing
                    instinctively whether a position is strong or weak. This pattern-matching
                    ability develops with practice and transfers to other problem-solving tasks.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Flexible Thinking</h3>
                  <p className="text-sm leading-7">
                    When your initial plan does not work, you need to adapt. FreeCell frequently
                    requires you to abandon one approach and find a completely different path to
                    the same goal. This mental flexibility is a core component of cognitive health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* Getting Started */}
        <section id="getting-started" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="First Steps" id="getting-started-heading">Getting Started</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                If you have never played FreeCell before, start with these resources:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Link href="/how-to-play" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white">How to Play</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    A complete tutorial with diagrams, rules, and a step-by-step beginner walkthrough.
                  </p>
                </Link>
                <Link href="/freecell-for-beginners" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white">FreeCell for Beginners</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    A gentler introduction for first-time players, covering the basics without overwhelm.
                  </p>
                </Link>
                <Link href="/tips" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white">Tips &amp; Tricks</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Practical advice for winning more games, one tip at a time.
                  </p>
                </Link>
                <Link href="/daily-freecell" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white">Daily Challenge</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    A new puzzle every day &mdash; the same deal for everyone worldwide.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div
            className={CARD}
            style={{
              background: 'linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)',
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                Start Your First Game
              </h2>
              <p className="text-white/40 mb-6 max-w-2xl mx-auto">
                No download, no account, no time limit. Just open it and play at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)',
                    backgroundSize: '200% 100%',
                    color: '#1a1a0a',
                  }}
                >
                  Play FreeCell Now
                </Link>
                <Link
                  href="/how-to-play"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Learn the Rules First
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
