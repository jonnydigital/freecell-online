import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import {
  ContentHero,
  JsonLd,
  CtaSection,
  ContentLinkCard,
  CardSection,
  SectionHeading,
  ContentBody,
} from "@/components/content";
import AdUnit from "@/components/AdUnit";
import AuthorByline from "@/components/content/AuthorByline";

export const metadata: Metadata = {
  title:
    "Best Spider Solitaire Apps & Sites in 2026 | Honest Roundup",
  description:
    "An honest editorial roundup of the best Spider Solitaire apps and websites in 2026. Browser games, mobile apps, and desktop options reviewed for ad load, features, and playability.",
  keywords: [
    "best spider solitaire app",
    "spider solitaire online free",
    "play spider solitaire",
    "spider solitaire app",
    "best spider solitaire game",
    "spider solitaire mobile app",
    "free spider solitaire no download",
    "spider solitaire for iphone",
    "spider solitaire for android",
    "spider solitaire browser game",
    "spider solitaire no ads",
    "spider solitaire 2 suit",
    "spider solitaire 4 suit",
  ],
  openGraph: {
    title:
      "Best Spider Solitaire Apps & Sites in 2026 | Honest Roundup",
    description:
      "Side-by-side comparison of the best Spider Solitaire apps and websites. Find the right game for any device and skill level.",
    url: absoluteUrl("/best-spider-solitaire-apps"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/best-spider-solitaire-apps"),
  },
};

/* -- FAQ data -- */

const faqItems = [
  {
    question: "What is the best free Spider Solitaire app in 2026?",
    answer: `It depends on how you play. For most people, a browser-based option is the most convenient because it works on every device without downloading anything. ${siteConfig.siteName} offers one-suit, two-suit, and four-suit Spider Solitaire with unlimited undo, hints, and statistics tracking — all free with no account required. If you prefer a native mobile app, the Microsoft Solitaire Collection includes a solid Spider Solitaire mode, though you will see ads unless you subscribe to Premium.`,
  },
  {
    question:
      "Can I play Spider Solitaire online without downloading anything?",
    answer: `Yes. Browser-based Spider Solitaire sites run entirely in your web browser. ${siteConfig.siteName}, World of Solitaire, and Solitaired all let you play directly in a browser tab. There is nothing to install or update. This works on desktops, laptops, tablets, and phones alike.`,
  },
  {
    question: "What is the difference between 1-suit, 2-suit, and 4-suit Spider Solitaire?",
    answer:
      "One-suit Spider Solitaire uses only spades, making it the easiest version with a win rate above 90% for experienced players. Two-suit Spider uses spades and hearts, adding a significant layer of complexity. Four-suit Spider uses all four suits and is the hardest standard variant — even skilled players win fewer than 10% of four-suit games. The best apps let you choose your difficulty level so you can work your way up.",
  },
  {
    question:
      "Is there a Spider Solitaire app with no ads?",
    answer: `Several options exist. ${siteConfig.siteName} does not run interstitial video ads between games. Some paid mobile apps in the $2 to $5 range on the App Store and Google Play are also ad-free. The Microsoft Solitaire Collection removes ads with a Premium subscription at $1.99 per month. Many free apps, however, show video ads after every completed game.`,
  },
];

export default function BestSpiderSolitaireAppsPage() {
  const jsonLd = [
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
          name: "Best Spider Solitaire Apps",
          item: absoluteUrl("/best-spider-solitaire-apps"),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Best Spider Solitaire Apps and Sites in 2026",
      description:
        "An honest editorial roundup of the best Spider Solitaire apps and websites available in 2026, covering browser games, mobile apps, and desktop options.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-04-12",
      dateModified: "2026-04-12",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl("/best-spider-solitaire-apps"),
      },
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
          kicker="Roundup"
          title="Best Spider Solitaire Apps and Sites in 2026"
          subtitle="Spider Solitaire is one of the most-played card games in the world, but the quality of apps and sites varies wildly. We tested dozens of options across browsers, phones, and desktops to find the ones that are actually worth your time."
          breadcrumbs={[{ label: "Home", href: "/" }]}
        />

        <div className="max-w-3xl mx-auto">
          <AuthorByline
            authorSlug="editorial-team"
            publishedDate="2026-04-12"
          />
        </div>

        {/* What We Look For */}
        <CardSection id="criteria" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Our Standards"
            id="criteria-heading"
          >
            What We Look For in a Spider Solitaire App
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Spider Solitaire has been a staple of Windows PCs since 1998, and
              today there are hundreds of versions available across app stores
              and the web. Most of them are mediocre. Before reviewing specific
              options, here are the five criteria we used to separate the good
              from the bad.
            </p>
            <div className="space-y-4">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Ad Load
                </h3>
                <p className="text-sm text-white/70">
                  Spider Solitaire games take longer than most card games.
                  A four-suit deal can run 15 to 30 minutes. Sitting through
                  a 30-second video ad after every game — or worse, mid-game
                  pop-ups — ruins the flow. We heavily penalized apps that
                  interrupt gameplay with forced video ads and rewarded those
                  that either skip ads entirely or keep them to a minimal
                  banner.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Difficulty Levels
                </h3>
                <p className="text-sm text-white/70">
                  A proper Spider Solitaire app must offer{" "}
                  <Link
                    href="/spider-for-beginners"
                    className="text-[var(--gold)] hover:text-white transition-colors"
                  >
                    one-suit
                  </Link>
                  , two-suit, and four-suit modes. One-suit is where
                  beginners learn the mechanics. Two-suit is the sweet spot
                  for most players. Four-suit is the real challenge. Any app
                  that only offers one difficulty level is incomplete.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Undo and Hints
                </h3>
                <p className="text-sm text-white/70">
                  Spider Solitaire is a game of long move sequences where a
                  single wrong choice can block you ten moves later. Unlimited
                  undo is essential. Apps that limit undo to one move, or
                  charge coins for extra undos, are not respecting your time.
                  A good hint system is also valuable, especially for players
                  learning to read{" "}
                  <Link
                    href="/spider-column-tactics"
                    className="text-[var(--gold)] hover:text-white transition-colors"
                  >
                    column tactics
                  </Link>
                  .
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Statistics Tracking
                </h3>
                <p className="text-sm text-white/70">
                  One of the most rewarding aspects of Spider Solitaire is
                  watching your skill grow over time. A good app tracks your
                  win rate by suit count, average game time, move count, and
                  streaks. Without statistics, every game exists in isolation
                  and you lose the sense of progression that keeps the game
                  interesting over months and years.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Offline Play
                </h3>
                <p className="text-sm text-white/70">
                  Spider Solitaire is a perfect game for flights, commutes,
                  and waiting rooms. Native mobile apps generally work offline
                  by default. Browser-based options vary — some cache properly
                  and work without a connection, while others require a live
                  internet connection for every session. We noted which options
                  support offline play.
                </p>
              </div>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Browser-Based Options */}
        <CardSection id="browser-options" variant="dark">
          <SectionHeading
            variant="dark"
            sub="No Download Required"
            id="browser-options-heading"
          >
            Browser-Based Options
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Browser-based games are the most accessible way to play Spider
              Solitaire. You open a URL and start playing. Nothing to install,
              no storage consumed, no app updates. The same link works on your
              desktop, tablet, and phone. Here are the browser options worth
              considering.
            </p>

            <h3
              className="text-xl font-bold text-white pt-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {siteConfig.siteName}
            </h3>
            <p>
              Full disclosure — this is our site. We built it because the
              existing options left us frustrated, and we think the result
              is strong, but we will let you judge for yourself.{" "}
              <Link
                href="/spider"
                className="text-[var(--gold)] hover:text-white transition-colors"
              >
                Our Spider Solitaire
              </Link>{" "}
              runs in any modern browser and offers all three difficulty
              levels: one-suit, two-suit, and four-suit. The feature set
              includes unlimited undo, a contextual hint system, detailed
              statistics broken down by suit count, and a dark theme
              that is easy on the eyes during long sessions.
            </p>
            <p>
              Beyond standard Spider, the site offers{" "}
              <Link
                href="/spider-variants"
                className="text-[var(--gold)] hover:text-white transition-colors"
              >
                Spider variants
              </Link>{" "}
              and a library of other solitaire games if you want variety.
              There is no account required and no download. Your progress
              saves automatically in your browser. The controls work
              equally well with a mouse on desktop or touch on mobile.
            </p>
            <p>
              Where it falls short: the site requires an internet connection
              for the initial load (though it works offline after that in
              most browsers), and it does not yet have a dedicated mobile
              app with push notification reminders — which some players
              prefer for building a daily habit.
            </p>

            <h3
              className="text-xl font-bold text-white pt-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              World of Solitaire
            </h3>
            <p>
              World of Solitaire has been around for years and offers a
              massive collection of solitaire variants, Spider included.
              The interface is clean and functional. It supports one-suit,
              two-suit, and four-suit Spider with undo and basic statistics.
              The card designs are classic and readable, and the site loads
              quickly. It is ad-supported but keeps advertising relatively
              unobtrusive compared to many alternatives. The main limitation
              is that the Spider experience is one game among many, so it
              lacks dedicated Spider-specific features like suit-specific
              stats or strategy content.
            </p>

            <h3
              className="text-xl font-bold text-white pt-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Solitaired
            </h3>
            <p>
              Solitaired is a polished browser-based solitaire site with a
              modern design. Their Spider Solitaire implementation is solid,
              with all three suit modes, undo, and clean visuals. They also
              publish educational content about solitaire strategy, which
              is useful for newer players. The site runs ads, including some
              video placements, but they are not as aggressive as what you
              see on many free game sites. Statistics tracking is available
              if you create a free account.
            </p>

            <h3
              className="text-xl font-bold text-white pt-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              247 Spider Solitaire
            </h3>
            <p>
              Part of the 247 Games network, this is one of the
              highest-traffic Spider Solitaire sites on the web. The game
              itself is functional and offers multiple suit modes. However,
              the ad load is heavy. You will encounter large display ads
              surrounding the game area and occasional video ads between
              games. The core gameplay works, but the experience is cluttered.
              If ads bother you, look elsewhere.
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h4 className="text-white font-semibold mb-2">
                Browser Options at a Glance
              </h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>
                  <strong className="text-white">{siteConfig.siteName}</strong>{" "}
                  — All 3 suit modes, unlimited undo, detailed stats, no
                  interstitial ads
                </li>
                <li>
                  <strong className="text-white">World of Solitaire</strong>{" "}
                  — Huge game library, clean interface, light ads
                </li>
                <li>
                  <strong className="text-white">Solitaired</strong>{" "}
                  — Modern design, strategy content, account-based stats
                </li>
                <li>
                  <strong className="text-white">247 Spider Solitaire</strong>{" "}
                  — High traffic, functional game, heavy ad load
                </li>
              </ul>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Mobile Apps */}
        <CardSection id="mobile-apps" variant="dark">
          <SectionHeading
            variant="dark"
            sub="iOS and Android"
            id="mobile-apps-heading"
          >
            Mobile Apps
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              If you prefer a native app on your phone or tablet, the mobile
              landscape for Spider Solitaire is dominated by a few major
              publishers. Quality varies, and ads are a constant issue, but
              there are some decent options.
            </p>

            <h3
              className="text-xl font-bold text-white pt-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Microsoft Solitaire Collection
            </h3>
            <p>
              Available on iOS, Android, and Windows, the Microsoft Solitaire
              Collection is the most recognized solitaire app in the world.
              It includes Spider Solitaire alongside Klondike, FreeCell,
              Pyramid, and TriPeaks. The Spider implementation is well-made
              — smooth animations, all three suit modes, and daily challenges
              that give you structured goals. Xbox achievements add
              gamification if you are invested in that ecosystem.
            </p>
            <p>
              The catch is advertising. The free version shows video ads
              between games and banner ads during gameplay. After every
              completed game, you wait through an ad before starting the next
              one. Removing ads costs $1.99 per month or $14.99 per year for
              a Premium subscription. The gameplay is good, but the ad
              experience in the free tier is frustrating during a long Spider
              session.
            </p>

            <h3
              className="text-xl font-bold text-white pt-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              MobilityWare Spider Solitaire
            </h3>
            <p>
              MobilityWare has been making solitaire apps since the early
              days of the App Store. Their Spider Solitaire app is
              well-designed with intuitive touch controls, all three suit
              modes, and reliable offline play. The interface is clean and
              the cards are easy to read on smaller screens. Statistics
              tracking covers the basics — win rate, games played, and
              streaks.
            </p>
            <p>
              Like most free mobile games, ads are part of the package.
              MobilityWare uses a mix of banner ads and occasional video
              ads. There is an option to remove ads through a one-time
              purchase, which is a better deal than a recurring subscription.
              If you want a dedicated Spider app on your phone and are
              willing to pay a few dollars to remove ads, this is one of
              the better options.
            </p>

            <h3
              className="text-xl font-bold text-white pt-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Brainium Spider Solitaire
            </h3>
            <p>
              Brainium makes a clean, visually appealing Spider Solitaire
              app for both iOS and Android. The design is more modern than
              most competitors, with customizable card backs and backgrounds.
              It supports all three suit modes and tracks statistics across
              games. The app works offline and has responsive touch controls.
            </p>
            <p>
              The free version includes ads, with a subscription option to
              remove them. Brainium tends to be less aggressive with ad
              frequency than some competitors, though your experience may
              vary depending on your region and device.
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h4 className="text-white font-semibold mb-2">
                Tips for Choosing a Mobile Spider App
              </h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>
                  Verify it offers one-suit, two-suit, and four-suit modes
                </li>
                <li>
                  Read recent reviews — ad frequency changes with updates
                </li>
                <li>
                  Check that undo is truly unlimited, not limited to 3 per game
                </li>
                <li>
                  Prefer a one-time ad-removal purchase over a subscription
                </li>
                <li>
                  Test that it works offline if you play during commutes
                </li>
                <li>
                  Consider using a browser bookmark instead — same gameplay,
                  no install
                </li>
              </ul>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Desktop Options */}
        <CardSection id="desktop-options" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Windows, Mac, and Linux"
            id="desktop-options-heading"
          >
            Desktop Options
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              If you play primarily on a desktop or laptop computer, you have
              a few paths to Spider Solitaire beyond browser-based sites.
            </p>

            <h3
              className="text-xl font-bold text-white pt-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Windows Built-In
            </h3>
            <p>
              Spider Solitaire shipped as a standalone game in Windows XP,
              Vista, and 7. It was simple, fast, and distraction-free — green
              felt, clean cards, no ads. In Windows 10 and 11, it was folded
              into the Microsoft Solitaire Collection app, which comes
              pre-installed but runs ads in the free tier.
            </p>
            <p>
              If you still have access to a Windows 7 machine or a virtual
              machine running an older version of Windows, the original
              standalone Spider Solitaire is arguably the cleanest desktop
              experience ever made for the game. But it lacks modern features
              like detailed statistics, hints, and deal selection. For most
              people in 2026, a browser-based option offers a better feature
              set with the same convenience.
            </p>

            <h3
              className="text-xl font-bold text-white pt-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Mac and Linux
            </h3>
            <p>
              macOS has never shipped with Spider Solitaire. Mac users can
              find Spider Solitaire apps on the Mac App Store, though the
              selection is smaller than on iOS and quality is inconsistent.
              Linux users can play through GNOME AisleRiot, which includes
              Spider Solitaire among its collection of card games. AisleRiot
              is free, open source, and ad-free, though the interface is
              utilitarian rather than polished.
            </p>
            <p>
              For both Mac and Linux users, a browser-based Spider Solitaire
              site is usually the most practical option. You get a modern
              interface, proper statistics, and no need to hunt for a native
              app that may or may not be well-maintained.
            </p>
          </ContentBody>
        </CardSection>

        {/* What to Avoid */}
        <CardSection id="what-to-avoid" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Red Flags"
            id="what-to-avoid-heading"
          >
            What to Avoid
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Not every Spider Solitaire app deserves your time. Here are the
              warning signs that an app or site is not worth installing or
              bookmarking.
            </p>
            <p>
              <strong>Forced video ads after every game.</strong> Some apps
              show a 30-second unskippable video ad every time you finish
              or restart a game. Over a session of 8 to 10 Spider games, you
              can spend several minutes just watching ads. This is a dealbreaker
              for any game meant to be relaxing.
            </p>
            <p>
              <strong>Fake &ldquo;free&rdquo; models.</strong> Watch out for
              apps that advertise as free but lock basic features behind a
              paywall. Common tactics include limiting undo to 3 per game
              unless you buy a pack, locking two-suit and four-suit modes
              behind a premium tier, or requiring a daily ad watch to
              &ldquo;unlock&rdquo; your games for the day. A truly free
              Spider Solitaire app gives you all suit modes and unlimited
              undo without restrictions.
            </p>
            <p>
              <strong>Excessive permissions.</strong> A Spider Solitaire app
              does not need access to your contacts, camera, microphone, or
              precise location. If an app requests permissions that have
              nothing to do with playing cards, it is likely harvesting data
              for advertising networks. Check the permission list before
              installing.
            </p>
            <p>
              <strong>Outdated, unmaintained apps.</strong> Some Spider
              Solitaire apps in the app stores have not been updated in two
              or three years. These may crash on newer OS versions, contain
              security vulnerabilities, or display broken ad placements.
              Check the &ldquo;last updated&rdquo; date and recent reviews
              before downloading.
            </p>
            <p>
              <strong>Clone spam.</strong> Search &ldquo;Spider Solitaire&rdquo;
              on the App Store or Google Play and you will find dozens of
              nearly identical apps with generic names and stock card art.
              Most are low-effort clones built from the same template,
              differentiated only by their ad network. Stick with
              established publishers or browser-based options where you can
              evaluate the experience before committing.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Our Recommendation */}
        <CardSection id="recommendation" variant="dark">
          <SectionHeading
            variant="dark"
            sub="The Bottom Line"
            id="recommendation-heading"
          >
            Our Recommendation
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              For most Spider Solitaire players in 2026, a browser-based
              option is the best choice. You avoid app store clutter, forced
              video ads between games, subscription upsells, and platform
              lock-in. One bookmark works on every device you own.
            </p>
            <p>
              We built{" "}
              <Link
                href="/spider"
                className="text-[var(--gold)] hover:text-white transition-colors"
              >
                {siteConfig.siteName}
              </Link>{" "}
              to be the Spider Solitaire experience we wanted for ourselves
              — all three suit modes, unlimited undo, a hint system that
              helps without spoiling, statistics that track your progress
              by difficulty level, and a clean dark interface that lets you
              focus on the cards. It is free, requires no download, and
              works on any device. We think it is the strongest overall
              option, but we are biased, so we encourage you to try
              several options from this list and decide for yourself.
            </p>
            <p>
              If you are committed to a native mobile app, the Microsoft
              Solitaire Collection is the safest bet thanks to its polish
              and wide platform support, though you will likely want to
              budget for the Premium subscription to remove ads.
              MobilityWare is a solid alternative on iOS and Android,
              especially if you prefer a one-time purchase over a
              subscription.
            </p>
            <p>
              Whatever you choose, make sure it offers all three suit modes,
              unlimited undo, and statistics tracking. Those three features
              are what transform Spider Solitaire from a casual distraction
              into a game you can improve at over time. If you are new to
              the game, our{" "}
              <Link
                href="/spider-for-beginners"
                className="text-[var(--gold)] hover:text-white transition-colors"
              >
                Spider Solitaire beginner&apos;s guide
              </Link>{" "}
              will get you started with the fundamentals, and our{" "}
              <Link
                href="/spider-opening-strategy"
                className="text-[var(--gold)] hover:text-white transition-colors"
              >
                opening strategy guide
              </Link>{" "}
              will help you build good habits from your very first deal.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related Guides */}
        <CardSection id="related-guides" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Learn More"
            id="related-guides-heading"
          >
            Related Guides
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard
                href="/spider"
                title="Play Spider Solitaire"
                description="Jump straight into a game — free, no download, works on any device."
                icon="&#9824;"
              />
              <ContentLinkCard
                href="/spider-for-beginners"
                title="Spider for Beginners"
                description="Learn the rules and basic strategy from scratch."
                icon="&#9829;"
              />
              <ContentLinkCard
                href="/spider-column-tactics"
                title="Column Tactics"
                description="Master the art of managing your tableau columns."
                icon="&#9830;"
              />
            </div>
          </ContentBody>
        </CardSection>

        {/* CTA */}
        <CtaSection
          heading="Ready to Play Spider Solitaire?"
          body="Free, instant, and works on every device. Choose 1-suit, 2-suit, or 4-suit difficulty and start playing right now."
          primaryLabel="Play Spider Solitaire"
          primaryHref="/spider"
          secondaryLabel="Learn the Rules"
          secondaryHref="/spider-for-beginners"
        />

        <AdUnit className="-my-1" />

        {/* FAQ */}
        <CardSection id="faq" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Common Questions"
            id="faq-heading"
          >
            Frequently Asked Questions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            {faqItems.map((faq) => (
              <details
                key={faq.question}
                className="bg-white/[0.05] border border-white/[0.07] rounded-xl group"
              >
                <summary className="p-5 cursor-pointer list-none flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">
                    {faq.question}
                  </h3>
                  <span className="text-[#D4AF37] text-xl flex-shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-sm leading-7 text-white/70">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </ContentBody>
        </CardSection>

        {/* More Resources */}
        <CardSection id="more-resources" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Keep Exploring"
            id="more-resources-heading"
          >
            More Resources
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ContentLinkCard
                href="/spider-opening-strategy"
                title="Opening Strategy"
                description="How to play the first 10 moves of any Spider deal for maximum advantage."
                icon="&#9824;"
              />
              <ContentLinkCard
                href="/spider-suit-strategy"
                title="Suit Strategy"
                description="Techniques for managing multiple suits in 2-suit and 4-suit games."
                icon="&#9829;"
              />
              <ContentLinkCard
                href="/spider-endgame-strategy"
                title="Endgame Strategy"
                description="How to close out a Spider deal once the stock is empty."
                icon="&#9830;"
              />
              <ContentLinkCard
                href="/spider-mistakes-to-avoid"
                title="Mistakes to Avoid"
                description="Common errors that cost you winnable Spider games."
                icon="&#9827;"
              />
              <ContentLinkCard
                href="/spider-winnability"
                title="Spider Winnability"
                description="What percentage of Spider deals are actually solvable?"
                icon="&#9824;"
              />
              <ContentLinkCard
                href="/spider-cheat-sheet"
                title="Cheat Sheet"
                description="A quick-reference card for Spider Solitaire rules and tips."
                icon="&#9829;"
              />
            </div>
          </ContentBody>
        </CardSection>
      </main>
    </ContentLayout>
  );
}
