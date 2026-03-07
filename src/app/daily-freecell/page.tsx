import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "../../components/AdUnit";
import ContentLayout from "../../components/ContentLayout";

export const metadata: Metadata = {
  title: "Daily FreeCell Challenge | A New Puzzle Every Day",
  description:
    "Play today's Daily FreeCell Challenge — the same deal for every player worldwide. Build your winning streak, compete on time and moves, and sharpen your card game skills with a fresh puzzle every day.",
  keywords: [
    "daily freecell",
    "freecell daily challenge",
    "freecell puzzle of the day",
    "daily freecell game",
    "freecell today",
    "daily solitaire challenge",
    "freecell streak",
    "freecell daily puzzle",
    "play daily freecell",
    "freecell of the day",
  ],
  openGraph: {
    title: "Daily FreeCell Challenge | A New Puzzle Every Day",
    description:
      "A fresh FreeCell puzzle every day, the same deal for every player worldwide. Build streaks, compete on time, and track your improvement.",
    url: absoluteUrl("/daily-freecell"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const CARD = "card-panel";
const CARD_TOP: React.CSSProperties = {
  borderTop: "1px solid rgba(184, 134, 11, 0.08)",
};

/* ── FAQ data ── */

const faqs = [
  {
    question: "What is the Daily FreeCell Challenge?",
    answer:
      "The Daily FreeCell Challenge is a single FreeCell deal that changes every day at midnight UTC. Every player around the world receives the exact same deal on any given day, creating a fair playing field where you can compare your time and moves against other players. It's the same concept as a daily crossword puzzle — one new challenge per day, shared by everyone.",
  },
  {
    question: "When does the daily deal reset?",
    answer:
      "The daily deal resets at midnight UTC (Coordinated Universal Time) every day. That's 7:00 PM Eastern, 4:00 PM Pacific, midnight in London, and 8:00 AM in Tokyo. When the clock hits midnight UTC, a brand new deal is generated and your chance to play today's challenge begins. You have a full 24 hours to complete each day's puzzle.",
  },
  {
    question: "Is every daily FreeCell deal solvable?",
    answer:
      "Yes. Every Daily FreeCell Challenge deal is verified to be solvable before it's published. We only select deals from the pool of known-solvable Microsoft FreeCell deal numbers, so you'll never face an impossible puzzle. If you can't solve it, the solution exists — you just need to find the right sequence of moves.",
  },
  {
    question: "How do FreeCell streaks work?",
    answer:
      "Your streak counts the number of consecutive days you've successfully completed the Daily Challenge. Win today's deal, and your streak increases by one. Miss a day or fail to complete a deal, and your streak resets to zero. Your longest streak is saved permanently so you can always see your personal best. Many dedicated players maintain streaks of 30, 60, or even 100+ consecutive days.",
  },
  {
    question: "Can I play the daily challenge more than once?",
    answer:
      "You can replay today's daily deal as many times as you want, but only your first successful completion counts for your streak and leaderboard position. This means you can practice and explore different approaches, but your initial winning time and move count are what matter for competitive purposes.",
  },
  {
    question: "What's the difference between Daily Challenge and Storm mode?",
    answer:
      "The Daily Challenge gives you one deal per day with no time pressure — it's about consistency and building a streak over weeks and months. Storm mode is a completely different experience: you play five consecutive FreeCell games against a running timer, testing speed and accuracy under pressure. Think of the Daily Challenge as a marathon (endurance over time) and Storm as a sprint (intensity in a single session).",
  },
  {
    question: "Do I need an account to play the daily FreeCell challenge?",
    answer:
      "No account is needed. Your streak, statistics, and game history are all stored locally in your browser. You can start playing immediately with no sign-up, no email, and no password. The only downside is that your data is tied to your browser — if you clear your browser data or switch devices, your streak history won't transfer.",
  },
  {
    question: "How can I improve my daily FreeCell win rate?",
    answer:
      "Start by reading our strategy guide and tips page for fundamental techniques. For the daily challenge specifically: scan the entire board before your first move, keep free cells empty as long as possible, prioritize uncovering Aces and low cards, and create empty columns whenever you can. Playing daily is itself one of the best ways to improve — pattern recognition develops naturally with consistent practice.",
  },
];

/* ── Helper components ── */

function SectionHeading({
  children,
  id,
  sub,
  icon,
}: {
  children: React.ReactNode;
  id?: string;
  sub?: string;
  icon?: string;
}) {
  return (
    <div className="px-6 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-[#2a2522]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {icon && <span className="mr-2 text-[#c9a84c]">{icon}</span>}
        {children}
      </h2>
      <div className="card-title-separator mt-5" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function DailyFreecellPage() {
  const jsonLd = [
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
          name: "Daily FreeCell",
          item: absoluteUrl("/daily-freecell"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <header className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-6 text-center overflow-hidden">
        <div
          className="absolute top-10 left-[10%] text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2663"}
        </div>
        <div
          className="absolute top-16 right-[8%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2666"}
        </div>
        <div
          className="absolute bottom-4 left-[18%] text-5xl sm:text-6xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2660"}
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Daily FreeCell Challenge
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          A fresh FreeCell puzzle every day. The same deal for every player
          worldwide. Build your streak, sharpen your skills, and see how you
          compare.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">
            {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-12">
        {/* Play Today's CTA */}
        <section className="scroll-mt-6">
          <div
            className={CARD}
            style={{
              ...CARD_TOP,
              background:
                "linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)",
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <div
                className="absolute top-4 left-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2663"}
              </div>
              <div
                className="absolute bottom-4 right-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2660"}
              </div>

              <h2
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Today&apos;s Challenge Is Waiting
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                Every player in the world gets the same deal today. Can you
                solve it? Jump in and find out.
              </p>

              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)",
                  backgroundSize: "200% 100%",
                  color: "#1a1a0a",
                }}
              >
                Play Today&apos;s Daily FreeCell
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="The Concept"
              id="how-it-works"
              icon={"\u2660"}
            >
              How the Daily Challenge Works
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                Every day at midnight UTC, a new FreeCell deal is generated from
                our curated pool of solvable puzzles. This deal is identical for
                every player who visits the site that day &mdash; whether
                you&apos;re playing in New York, London, Tokyo, or Sydney, you
                get exactly the same 52-card layout.
              </p>
              <p>
                This universal deal system creates something special: a shared
                experience. When you solve today&apos;s daily FreeCell
                challenge, you know that thousands of other players faced the
                same puzzle. You can compare your time and move count against
                the global community, knowing the playing field was perfectly
                level.
              </p>
              <p>
                The daily format also eliminates selection bias. In free play,
                it&apos;s tempting to restart difficult deals or cherry-pick
                easy ones. The Daily Challenge removes that option &mdash; you
                get one deal, and your job is to solve it. This forces you to
                develop strategies for every type of layout, not just the ones
                you&apos;re comfortable with.
              </p>
              <p>
                Each daily deal is drawn from the classic Microsoft FreeCell
                deal numbering system and verified to be solvable before
                publication. You never face an impossible puzzle. If you&apos;re
                stuck, the answer exists &mdash; you just need to find it. This
                guarantee makes the Daily Challenge a pure test of skill: if you
                lose, it&apos;s a strategic mistake, not bad luck.
              </p>
            </div>
          </div>
        </section>

        <AdUnit />

        {/* The Streak System */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Consistency Rewarded"
              id="streaks"
              icon={"\u2665"}
            >
              The Streak System
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                The streak system is simple: win today&apos;s daily deal, and
                your streak increases by one. Miss a day or fail to complete the
                puzzle, and your streak resets to zero. Your longest-ever streak
                is permanently recorded so you can always see your personal
                best.
              </p>
              <p>
                Streaks transform FreeCell from a casual pastime into a daily
                ritual. There&apos;s a unique satisfaction in watching your
                streak number climb &mdash; 7 days, 14 days, 30 days, 100 days.
                Each day adds a tiny bit of pressure: you don&apos;t just want
                to play, you <em>need</em> to play because your streak is on
                the line. That healthy pressure keeps you coming back and keeps
                your skills sharp.
              </p>
              <p>
                The streak system also serves as a long-term skill tracker. If
                your longest streak keeps growing, it means you&apos;re getting
                better at handling diverse deal types consistently. A player
                with a 50-day streak has proven they can solve 50 different
                random layouts without a single failure &mdash; that&apos;s a
                meaningful achievement.
              </p>

              <div className="card-inset rounded-lg p-5">
                <h3
                  className="font-medium text-[#2a2522] mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  Streak Milestones
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#D4AF37]">7</div>
                    <div className="text-xs text-[#6B7280]">First week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#D4AF37]">30</div>
                    <div className="text-xs text-[#6B7280]">Full month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#D4AF37]">100</div>
                    <div className="text-xs text-[#6B7280]">Century club</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#D4AF37]">365</div>
                    <div className="text-xs text-[#6B7280]">Perfect year</div>
                  </div>
                </div>
              </div>

              <p>
                Your streak statistics are tracked locally in your browser, so
                they persist between sessions without requiring an account. View
                your current streak, longest streak, and overall daily challenge
                completion rate on the{" "}
                <Link href="/streak" className="text-[#D4AF37] hover:underline">
                  Streak page
                </Link>{" "}
                or the{" "}
                <Link href="/stats" className="text-[#D4AF37] hover:underline">
                  statistics page
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Storm Mode */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Speed Challenge"
              id="storm"
              icon={"\u2666"}
            >
              Storm Mode: The Timed Challenge
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                If the Daily Challenge is a marathon, Storm mode is a sprint.
                In{" "}
                <Link href="/storm" className="text-[#D4AF37] hover:underline">
                  Storm mode
                </Link>
                , you face five consecutive FreeCell games against a running
                clock. The goal is to win as many of the five games as possible,
                as quickly as possible. Your total time across all five games is
                your Storm score.
              </p>
              <p>
                Storm mode tests a completely different set of skills than the
                Daily Challenge. Where the daily puzzle rewards patient analysis
                and careful planning, Storm rewards quick pattern recognition,
                decisive action, and the ability to rapidly assess whether a
                deal is going well or heading toward a dead end. You don&apos;t
                have time to contemplate every possibility &mdash; you need
                instinct.
              </p>
              <p>
                Many players find that alternating between the Daily Challenge
                and Storm mode creates the best overall improvement. The daily
                puzzle builds deep strategic understanding, while Storm
                sharpens your speed and pattern recognition. Together, they
                develop the complete FreeCell skill set.
              </p>
            </div>
          </div>
        </section>

        <AdUnit />

        {/* Daily Leaderboard */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Compete"
              id="leaderboard"
              icon={"\u2663"}
            >
              Daily Leaderboard
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                Every daily deal generates a fresh leaderboard where players
                compete on two metrics: completion time and total moves. The
                fastest solvers and the most efficient solvers both earn
                recognition &mdash; because speed and efficiency are different
                skills that deserve separate acknowledgment.
              </p>
              <p>
                The leaderboard resets daily along with the deal, so every day
                is a fresh start. Yesterday&apos;s champion has no advantage
                today. This daily reset keeps the competition accessible:
                whether you&apos;ve been playing for years or just started this
                week, today&apos;s leaderboard is equally open to you.
              </p>
              <p>
                Competing on the{" "}
                <Link
                  href="/leaderboard"
                  className="text-[#D4AF37] hover:underline"
                >
                  leaderboard
                </Link>{" "}
                adds a social dimension to what&apos;s traditionally a solo
                game. You&apos;re not just solving a puzzle in isolation
                &mdash; you&apos;re testing yourself against a community of
                dedicated FreeCell players. Seeing where your time and move
                count rank against others provides concrete motivation to
                improve.
              </p>
              <p>
                Check your{" "}
                <Link href="/stats" className="text-[#D4AF37] hover:underline">
                  personal statistics
                </Link>{" "}
                to track your improvement over time. Your average completion
                time, win rate, and best performances are all recorded so you
                can see exactly how your skills develop with practice.
              </p>
            </div>
          </div>
        </section>

        {/* Why Play Daily */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Benefits"
              id="why-daily"
              icon={"\u2660"}
            >
              Why Play FreeCell Every Day?
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                Daily FreeCell isn&apos;t just a game &mdash; it&apos;s a
                mental exercise with real cognitive benefits. Research on card
                games and puzzle-solving consistently shows that regular
                strategic thinking exercises help maintain mental sharpness,
                particularly in areas like working memory, planning, and
                sequential reasoning.
              </p>
              <p>
                FreeCell is uniquely suited for daily mental exercise because
                every game is a self-contained logic puzzle with a known
                solution. Unlike games with luck elements, your performance in
                FreeCell directly reflects the quality of your thinking. This
                makes it an honest daily benchmark: if you solve today&apos;s
                deal faster than yesterday&apos;s, you genuinely thought better
                today.
              </p>

              <div className="card-inset rounded-lg p-5">
                <h3
                  className="font-medium text-[#2a2522] mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  Benefits of a Daily FreeCell Habit
                </h3>
                <ul className="space-y-2 text-sm text-[#444444]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] shrink-0">{"\u2713"}</span>
                    <span>
                      <strong>Mental sharpness</strong> &mdash; Strategic
                      planning and sequential reasoning keep your mind active
                      and engaged throughout the day.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] shrink-0">{"\u2713"}</span>
                    <span>
                      <strong>Pattern recognition</strong> &mdash; Over time,
                      you start recognizing common card configurations
                      instantly, a skill that transfers to other problem-solving
                      contexts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] shrink-0">{"\u2713"}</span>
                    <span>
                      <strong>Stress relief</strong> &mdash; A focused,
                      absorbing puzzle provides a genuine break from daily
                      worries. Many players describe their daily FreeCell
                      session as meditative.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] shrink-0">{"\u2713"}</span>
                    <span>
                      <strong>Measurable improvement</strong> &mdash; Unlike
                      many hobbies, FreeCell gives you clear metrics (win rate,
                      time, moves) so you can objectively see yourself getting
                      better.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] shrink-0">{"\u2713"}</span>
                    <span>
                      <strong>Healthy routine</strong> &mdash; A short daily
                      puzzle creates positive structure in your day without
                      demanding a large time commitment. Most daily deals take
                      5&ndash;15 minutes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] shrink-0">{"\u2713"}</span>
                    <span>
                      <strong>Community connection</strong> &mdash; Knowing
                      thousands of other players are solving the same puzzle
                      today creates a shared experience, even in a solo game.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The best part? It only takes a few minutes. A single daily
                FreeCell game is a tiny time investment with outsized returns
                for your mental fitness and enjoyment. Whether you play during
                your morning coffee, on your lunch break, or as a wind-down
                ritual before bed, it fits easily into any schedule.
              </p>
            </div>
          </div>
        </section>

        {/* Tips for Daily Players */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Improve Your Game"
              id="tips"
              icon={"\u2665"}
            >
              Tips for Daily FreeCell Players
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                Dedicated daily players develop habits that casual players
                don&apos;t. Here are strategies specifically tuned for the
                daily challenge format:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                      Scan before you move
                    </h3>
                    <p>
                      Spend at least 30 seconds studying the full layout before
                      touching a card. Find where all four Aces are buried,
                      identify natural sequences already in place, and form a
                      rough plan. This single habit separates winning daily
                      players from struggling ones.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                      Don&apos;t panic on tough layouts
                    </h3>
                    <p>
                      Some daily deals look intimidating at first glance &mdash;
                      Aces buried deep, Kings blocking everything. Remember:
                      every daily deal is solvable. Take your time, try
                      different opening approaches, and use undo liberally. The
                      solution is always there.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                      Play at the same time each day
                    </h3>
                    <p>
                      Building a consistent play time &mdash; morning coffee,
                      lunch break, evening wind-down &mdash; makes it much
                      easier to maintain your streak. It becomes an automatic
                      part of your routine rather than something you might
                      forget.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base shadow-md">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                      Review your losses
                    </h3>
                    <p>
                      When you lose a daily deal and break your streak, take a
                      moment to think about what went wrong. Did you fill free
                      cells too early? Miss a key sequence? Learning from daily
                      losses is the fastest path to longer streaks.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                For comprehensive strategy advice, visit our{" "}
                <Link
                  href="/how-to-play"
                  className="text-[#D4AF37] hover:underline"
                >
                  How to Play guide
                </Link>{" "}
                and{" "}
                <Link
                  href="/strategy"
                  className="text-[#D4AF37] hover:underline"
                >
                  Strategy page
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <AdUnit />

        {/* FAQ */}
        <section id="faq" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Common Questions"
              id="faq-heading"
              icon={"\u2666"}
            >
              Daily FreeCell FAQ
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[#444444] leading-relaxed">{faq.answer}</p>
                  {i < faqs.length - 1 && (
                    <div className="mt-6 border-b border-[#e5e0d8]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div
            className={CARD}
            style={{
              ...CARD_TOP,
              background:
                "linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)",
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <div
                className="absolute top-4 left-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2663"}
              </div>
              <div
                className="absolute bottom-4 right-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2660"}
              </div>

              <h2
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Start Your Streak Today
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                Every long streak starts with Day 1. Play today&apos;s
                Daily FreeCell Challenge and begin building yours.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)",
                    backgroundSize: "200% 100%",
                    color: "#1a1a0a",
                  }}
                >
                  Play Today&apos;s Challenge
                </Link>
                <Link
                  href="/streak"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  View Your Streak
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-[#6B7280]">
                <Link
                  href="/storm"
                  className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline"
                >
                  Storm Mode
                </Link>
                <Link
                  href="/stats"
                  className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline"
                >
                  Your Stats
                </Link>
                <Link
                  href="/leaderboard"
                  className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline"
                >
                  Leaderboard
                </Link>
                <Link
                  href="/how-to-play"
                  className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline"
                >
                  How to Play
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
