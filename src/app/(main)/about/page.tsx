import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";

export const metadata: Metadata = {
  title: "About PlayFreeCellOnline.com | Free Online Card Games",
  description:
    "Learn about PlayFreeCellOnline.com — a free, modern FreeCell Solitaire experience with faithful Microsoft deal numbering, multiple game modes, and no downloads required.",
  keywords: [
    "about playfreecellonline",
    "free freecell online",
    "freecell solitaire website",
    "online card games",
    "freecell no download",
    "microsoft freecell online",
    "freecell game modes",
    "play freecell free",
  ],
  openGraph: {
    title: "About PlayFreeCellOnline.com | Free Online Card Games",
    description:
      "The story behind PlayFreeCellOnline.com — a clean, modern FreeCell experience with faithful Microsoft deal numbering and multiple game modes.",
    url: absoluteUrl("/about"),
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

/* ── Game data ── */

const games = [
  {
    name: "FreeCell",
    href: "/",
    description:
      "The classic game that started it all. All 52 cards dealt face-up, four free cells for temporary storage, and nearly every deal is solvable. Pure strategy with zero luck.",
  },
  {
    name: "Spider Solitaire",
    href: "/spider",
    description:
      "Two decks, ten columns, and the challenge of building complete same-suit runs from King to Ace. Available in one-suit, two-suit, and four-suit difficulty levels.",
  },
  {
    name: "Baker's Game",
    href: "/bakers-game",
    description:
      "FreeCell's stricter cousin. Same layout and free cells, but you must build by suit instead of alternating color. Significantly harder, with a win rate around 75%.",
  },
  {
    name: "Eight Off",
    href: "/eight-off",
    description:
      "Eight free cells instead of four, but building is by suit only. A fascinating middle ground between FreeCell and Baker's Game that rewards patient planning.",
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function AboutPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.url,
      description:
        "Play FreeCell Solitaire online for free. No download, no signup. Classic Microsoft FreeCell deals, multiple game modes, and a clean modern experience.",
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.privacyEmail,
        contactType: "customer support",
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
          name: "About",
          item: absoluteUrl("/about"),
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
          About This Site
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          A passion project built for FreeCell lovers who want a clean, modern
          experience without the clutter.
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
        {/* The Story */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Our Origin" id="story" icon={"\u2665"}>
              The Story Behind {siteConfig.siteName}
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                If you grew up with a Windows PC in the 1990s or 2000s, chances
                are you spent countless hours playing Microsoft FreeCell. It was
                the perfect coffee-break game &mdash; a quick mental challenge
                that rewarded careful thinking over blind luck. Every card was
                visible from the start, and nearly every deal was solvable. All
                you needed was patience and a plan.
              </p>
              <p>
                When we went looking for that same experience online, we were
                disappointed. Most FreeCell sites were bloated with intrusive
                ads, slow to load, and riddled with pop-ups. Many used Flash
                (now extinct) or required downloads. The ones that did work on
                modern browsers felt like an afterthought &mdash; tiny game
                boards, clunky controls, and no mobile support. The charm of the
                original was lost.
              </p>
              <p>
                So we built {siteConfig.siteName}. The goal was simple: recreate
                the experience of classic Microsoft FreeCell in a modern web
                browser, with smooth animations, responsive design that works on
                any screen size, and a clean interface that lets you focus on the
                game. No downloads, no sign-ups, no bloated ad walls. Just
                FreeCell, the way it should be.
              </p>
              <p>
                We kept the original Microsoft deal numbering system &mdash;
                deals 1 through 32,000 &mdash; so veterans can revisit their
                favorite (or most hated) deals. If you remember struggling with
                deal #11982 back in the day, you can struggle with it here too.
                It&apos;s the same algorithm, the same cards, the same challenge.
                Some things are worth preserving exactly as they were.
              </p>
              <p>
                What started as a FreeCell project grew into something broader.
                We added{" "}
                <Link href="/spider" className="text-[#D4AF37] hover:underline">
                  Spider Solitaire
                </Link>
                ,{" "}
                <Link
                  href="/bakers-game"
                  className="text-[#D4AF37] hover:underline"
                >
                  Baker&apos;s Game
                </Link>
                , and{" "}
                <Link
                  href="/eight-off"
                  className="text-[#D4AF37] hover:underline"
                >
                  Eight Off
                </Link>{" "}
                &mdash; all built with the same attention to quality. We
                introduced a{" "}
                <Link href="/streak" className="text-[#D4AF37] hover:underline">
                  Daily Challenge with streaks
                </Link>
                , a timed{" "}
                <Link href="/storm" className="text-[#D4AF37] hover:underline">
                  Storm mode
                </Link>
                , and a{" "}
                <Link href="/solver" className="text-[#D4AF37] hover:underline">
                  FreeCell solver
                </Link>{" "}
                for those impossible deals. Every feature was added because we
                wanted it ourselves.
              </p>
            </div>
          </div>
        </section>

        <AdUnit />

        {/* What Makes Us Different */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Why Choose Us"
              id="different"
              icon={"\u2660"}
            >
              What Makes Us Different
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-3"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    No Download Required
                  </h3>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    Play instantly in any modern browser &mdash; Chrome, Safari,
                    Firefox, Edge. No app to install, no Flash plugin, no Java
                    applet. Just open the page and start playing. Works on
                    desktop, tablet, and phone.
                  </p>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-3"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    Faithful Deal Numbering
                  </h3>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    We use the original Microsoft FreeCell deal-generation
                    algorithm. Deals 1&ndash;32,000 produce exactly the same
                    card layouts as the classic Windows game. Compare your
                    solutions with decades of community knowledge.
                  </p>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-3"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    Multiple Game Modes
                  </h3>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    Beyond classic FreeCell, we offer a{" "}
                    <Link
                      href="/streak"
                      className="text-[#D4AF37] hover:underline"
                    >
                      Daily Challenge
                    </Link>{" "}
                    with streak tracking, a fast-paced{" "}
                    <Link
                      href="/storm"
                      className="text-[#D4AF37] hover:underline"
                    >
                      Storm mode
                    </Link>{" "}
                    with five timed games, and a{" "}
                    <Link
                      href="/solver"
                      className="text-[#D4AF37] hover:underline"
                    >
                      solver
                    </Link>{" "}
                    to check any deal&apos;s solution.
                  </p>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-3"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    Multiple Solitaire Variants
                  </h3>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    Love solitaire card games? We offer{" "}
                    <Link
                      href="/spider"
                      className="text-[#D4AF37] hover:underline"
                    >
                      Spider Solitaire
                    </Link>
                    ,{" "}
                    <Link
                      href="/bakers-game"
                      className="text-[#D4AF37] hover:underline"
                    >
                      Baker&apos;s Game
                    </Link>
                    , and{" "}
                    <Link
                      href="/eight-off"
                      className="text-[#D4AF37] hover:underline"
                    >
                      Eight Off
                    </Link>{" "}
                    &mdash; each with unique rules and their own strategic depth.
                  </p>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-3"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    Works on Any Device
                  </h3>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    Responsive design adapts to any screen size &mdash; from
                    large desktop monitors to small phone screens. Touch controls
                    feel natural on mobile, and keyboard shortcuts are available
                    on desktop. Play wherever you are.
                  </p>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-3"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    Clean, Modern Experience
                  </h3>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    No pop-ups, no mandatory sign-ups, no dark patterns. The
                    interface is designed to stay out of your way so you can
                    focus on what matters &mdash; the cards. Smooth animations
                    and thoughtful design throughout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Games */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="What We Offer" id="games" icon={"\u2666"}>
              Our Games
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-6">
              {games.map((game) => (
                <div key={game.name}>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                    <Link
                      href={game.href}
                      className="text-[#D4AF37] hover:underline"
                    >
                      {game.name}
                    </Link>
                  </h3>
                  <p className="text-[#444444] leading-relaxed">
                    {game.description}
                  </p>
                </div>
              ))}

              <div className="card-inset rounded-lg p-5 mt-4">
                <h3
                  className="font-medium text-[#2a2522] mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  Special Game Modes
                </h3>
                <ul className="space-y-2 text-[#444444] text-sm leading-relaxed">
                  <li>
                    <strong>
                      <Link
                        href="/streak"
                        className="text-[#D4AF37] hover:underline"
                      >
                        Daily Challenge &amp; Streak
                      </Link>
                    </strong>{" "}
                    &mdash; A new deal every day, the same for all players
                    worldwide. Build consecutive winning streaks and compete on
                    time and moves.
                  </li>
                  <li>
                    <strong>
                      <Link
                        href="/storm"
                        className="text-[#D4AF37] hover:underline"
                      >
                        Storm Mode
                      </Link>
                    </strong>{" "}
                    &mdash; Five games, timed. How many can you win before the
                    clock runs out? A fast-paced test of speed and accuracy.
                  </li>
                  <li>
                    <strong>
                      <Link
                        href="/solver"
                        className="text-[#D4AF37] hover:underline"
                      >
                        FreeCell Solver
                      </Link>
                    </strong>{" "}
                    &mdash; Enter any deal number and get a step-by-step
                    solution. Perfect for learning strategy or checking whether a
                    deal is solvable.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <AdUnit />

        {/* Technical Details */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Under the Hood"
              id="technical"
              icon={"\u2663"}
            >
              Technical Details
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                {siteConfig.siteName} is built as a modern progressive web
                application using Next.js and React. The game engine runs
                entirely in your browser &mdash; no server round-trips for
                gameplay, which means fast, responsive interaction even on
                slower connections.
              </p>
              <p>
                The site works offline once loaded. You can add it to your home
                screen on mobile devices and play it like a native app. Game
                state and statistics are saved locally in your browser, so your
                progress persists between sessions without needing an account.
              </p>
              <p>
                We take privacy seriously. We don&apos;t require registration,
                we don&apos;t collect personal information, and we don&apos;t
                sell data to third parties. Your game statistics stay on your
                device. You can read our full{" "}
                <Link
                  href="/privacy"
                  className="text-[#D4AF37] hover:underline"
                >
                  privacy policy
                </Link>{" "}
                for complete details.
              </p>
              <p>
                The deal-generation algorithm faithfully reproduces
                Microsoft&apos;s original linear congruential generator, so
                deals 1&ndash;32,000 match the classic Windows FreeCell exactly.
                We also support extended deals beyond 32,000 using the same
                mathematical approach, giving you millions of unique puzzles to
                solve.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Get in Touch" id="contact" icon={"\u2665"}>
              Contact Us
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                Have a question, found a bug, or just want to share your best
                win streak? We&apos;d love to hear from you. Reach us at{" "}
                <a
                  href={`mailto:${siteConfig.privacyEmail}`}
                  className="text-[#D4AF37] hover:underline"
                >
                  {siteConfig.privacyEmail}
                </a>
                .
              </p>
              <p>
                We read every email and do our best to respond promptly. Whether
                it&apos;s a feature request, accessibility concern, or just a
                note saying you enjoy the site &mdash; it all helps us make the
                experience better for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
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
                Ready to Play?
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                Jump into a game of FreeCell right now. No sign-up, no
                download &mdash; just pure card game strategy.
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
                  Play FreeCell Now
                </Link>
                <Link
                  href="/how-to-play"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  How to Play
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-[#6B7280]">
                <Link
                  href="/strategy"
                  className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline"
                >
                  Strategy Guide
                </Link>
                <Link
                  href="/spider"
                  className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline"
                >
                  Spider Solitaire
                </Link>
                <Link
                  href="/solver"
                  className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline"
                >
                  FreeCell Solver
                </Link>
                <Link
                  href="/streak"
                  className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline"
                >
                  Daily Streak
                </Link>
                <Link
                  href="/storm"
                  className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline"
                >
                  Storm Mode
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
