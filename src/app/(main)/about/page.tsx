import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

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
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="About This Site"
        subtitle="A passion project built for FreeCell lovers who want a clean, modern experience without the clutter."
      />

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        {/* The Story */}
        <CardSection>
          <SectionHeading sub="Our Origin" id="story" icon={"\u2665"}>
            The Story Behind {siteConfig.siteName}
          </SectionHeading>

          <ContentBody className="space-y-5">
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
              <Link href="/spider" className="text-[#8B6914] hover:underline">
                Spider Solitaire
              </Link>
              ,{" "}
              <Link
                href="/bakers-game"
                className="text-[#8B6914] hover:underline"
              >
                Baker&apos;s Game
              </Link>
              , and{" "}
              <Link
                href="/eight-off"
                className="text-[#8B6914] hover:underline"
              >
                Eight Off
              </Link>{" "}
              &mdash; all built with the same attention to quality. We
              introduced a{" "}
              <Link href="/streak" className="text-[#8B6914] hover:underline">
                Daily Challenge with streaks
              </Link>
              , a timed{" "}
              <Link href="/storm" className="text-[#8B6914] hover:underline">
                Storm mode
              </Link>
              , and a{" "}
              <Link href="/solver" className="text-[#8B6914] hover:underline">
                FreeCell solver
              </Link>{" "}
              for those impossible deals. Every feature was added because we
              wanted it ourselves.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit />

        {/* What Makes Us Different */}
        <CardSection>
          <SectionHeading
            sub="Why Choose Us"
            id="different"
            icon={"\u2660"}
          >
            What Makes Us Different
          </SectionHeading>

          <ContentBody>
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
                    className="text-[#8B6914] hover:underline"
                  >
                    Daily Challenge
                  </Link>{" "}
                  with streak tracking, a fast-paced{" "}
                  <Link
                    href="/storm"
                    className="text-[#8B6914] hover:underline"
                  >
                    Storm mode
                  </Link>{" "}
                  with five timed games, and a{" "}
                  <Link
                    href="/solver"
                    className="text-[#8B6914] hover:underline"
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
                    className="text-[#8B6914] hover:underline"
                  >
                    Spider Solitaire
                  </Link>
                  ,{" "}
                  <Link
                    href="/bakers-game"
                    className="text-[#8B6914] hover:underline"
                  >
                    Baker&apos;s Game
                  </Link>
                  , and{" "}
                  <Link
                    href="/eight-off"
                    className="text-[#8B6914] hover:underline"
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
          </ContentBody>
        </CardSection>

        {/* Our Games */}
        <CardSection>
          <SectionHeading sub="What We Offer" id="games" icon={"\u2666"}>
            Our Games
          </SectionHeading>

          <ContentBody className="space-y-6">
            {games.map((game) => (
              <div key={game.name}>
                <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                  <Link
                    href={game.href}
                    className="text-[#8B6914] hover:underline"
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
                      className="text-[#8B6914] hover:underline"
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
                      className="text-[#8B6914] hover:underline"
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
                      className="text-[#8B6914] hover:underline"
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
          </ContentBody>
        </CardSection>

        <AdUnit />

        {/* Technical Details */}
        <CardSection>
          <SectionHeading
            sub="Under the Hood"
            id="technical"
            icon={"\u2663"}
          >
            Technical Details
          </SectionHeading>

          <ContentBody className="space-y-5">
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
                className="text-[#8B6914] hover:underline"
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
          </ContentBody>
        </CardSection>

        {/* Contact */}
        <CardSection>
          <SectionHeading sub="Get in Touch" id="contact" icon={"\u2665"}>
            Contact Us
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Have a question, found a bug, or just want to share your best
              win streak? We&apos;d love to hear from you. Reach us at{" "}
              <a
                href={`mailto:${siteConfig.privacyEmail}`}
                className="text-[#8B6914] hover:underline"
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
          </ContentBody>
        </CardSection>

        {/* CTA */}
        <CtaSection
          body={
            <>
              Jump into a game of FreeCell right now. No sign-up, no
              download &mdash; just pure card game strategy.
            </>
          }
          secondaryLabel="How to Play"
          secondaryHref="/how-to-play"
        >
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
        </CtaSection>
      </main>
    </ContentLayout>
  );
}
