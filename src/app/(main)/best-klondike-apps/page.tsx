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
    "Best Klondike Solitaire Apps & Sites in 2026 | Honest Roundup",
  description:
    "Compare the best Klondike Solitaire apps, websites, and desktop options in 2026. Draw 1, Draw 3, mobile, browser — we tested them so you don't have to.",
  keywords: [
    "best klondike solitaire app",
    "klondike solitaire online free",
    "play klondike solitaire",
    "best solitaire app 2026",
    "klondike app no ads",
    "solitaire app iphone",
    "solitaire app android",
    "free solitaire no download",
    "klondike draw 3 app",
    "microsoft solitaire collection",
    "solitaire browser game",
    "best free solitaire game",
  ],
  openGraph: {
    title:
      "Best Klondike Solitaire Apps & Sites in 2026 | Honest Roundup",
    description:
      "Side-by-side comparison of the best Klondike Solitaire apps and websites. Find the right free Klondike game for any device.",
    url: absoluteUrl("/best-klondike-apps"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/best-klondike-apps"),
  },
};

/* ── FAQ data ── */

const faqItems = [
  {
    question: "What is the best free Klondike Solitaire app in 2026?",
    answer: `For most players, a browser-based option like ${siteConfig.siteName} is the best choice. It works on any device without downloading anything, supports both Draw 1 and Draw 3 modes, and includes unlimited undo, hints, and statistics tracking — all completely free with no account required. If you prefer a native app, the Microsoft Solitaire Collection is a solid option on Windows and mobile, though it includes ads unless you pay for Premium.`,
  },
  {
    question: "Is Draw 1 or Draw 3 better for beginners?",
    answer:
      "Draw 1 is significantly easier and better for beginners. In Draw 1 mode, you flip one card at a time from the stock pile, which means you can access every card in the deck. Draw 3 only lets you access every third card on each pass, which restricts your options and requires more planning. Most apps and sites that are worth using support both modes so you can switch as your skills improve.",
  },
  {
    question: "Can I play Klondike Solitaire online without downloading anything?",
    answer: `Yes. Browser-based Klondike sites like ${siteConfig.siteName} run entirely in your web browser. There is nothing to download, install, or update. Just open the website and start playing. Your game progress and statistics are saved automatically in your browser. This works on desktops, laptops, tablets, and phones.`,
  },
  {
    question:
      "What is the difference between Klondike and regular Solitaire?",
    answer:
      "They are the same game. When most people say \"Solitaire\" they mean Klondike — the version with seven tableau columns, a stock pile, and four foundation piles that build up from Ace to King by suit. The name \"Solitaire\" is actually a broader category that includes hundreds of different card games meant for one player, such as FreeCell, Spider, and Pyramid. Klondike just happens to be the most popular variant by a wide margin.",
  },
];

export default function BestKlondikeAppsPage() {
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
          name: "Best Klondike Apps",
          item: absoluteUrl("/best-klondike-apps"),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Best Klondike Solitaire Apps and Sites in 2026",
      description:
        "An honest editorial roundup of the best Klondike Solitaire apps, websites, and desktop options available in 2026.",
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
        "@id": absoluteUrl("/best-klondike-apps"),
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
          title="Best Klondike Solitaire Apps and Sites in 2026"
          subtitle="Klondike is the card game everyone calls Solitaire. There are hundreds of apps and sites competing for your time. We tested the major options and ranked them honestly — including our own."
          breadcrumbs={[{ label: "Home", href: "/" }]}
        />

        {/* Byline */}
        <div className="max-w-3xl mx-auto px-2">
          <AuthorByline
            authorSlug="editorial-team"
            publishedDate="2026-04-12"
          />
        </div>

        {/* What Makes a Good Klondike App */}
        <CardSection id="what-makes-good" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Setting the Bar"
            id="what-makes-good-heading"
          >
            What Makes a Good Klondike App
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Klondike Solitaire is a simple game with simple rules. You deal
              seven columns, flip cards from the stock, and build four
              foundation piles from Ace to King by suit. The rules have not
              changed in over a century. So the difference between a mediocre
              Klondike app and a great one has nothing to do with the game
              itself — it comes down to execution.
            </p>
            <p>
              After testing every major Klondike option we could find across
              browsers, phones, tablets, and desktops, we settled on the
              criteria that actually separate the good from the bad:
            </p>
            <div className="space-y-4">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Draw 1 and Draw 3 Support
                </h3>
                <p className="text-sm text-white/70">
                  A Klondike app that only offers one draw mode is incomplete.{" "}
                  <Link
                    href="/klondike/draw-1-vs-draw-3"
                    className="text-[var(--gold)] hover:text-white transition-colors"
                  >
                    Draw 1 and Draw 3
                  </Link>{" "}
                  are fundamentally different experiences. Draw 1 is more
                  relaxed and beginner-friendly since you can access every card
                  in the stock. Draw 3 is the traditional challenge that
                  rewards planning and sequencing. Any serious Klondike app
                  must let you choose.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Unlimited Undo
                </h3>
                <p className="text-sm text-white/70">
                  Undo is not a cheat — it is how you learn. Experienced
                  Klondike players use undo to explore branching decisions: do
                  I move the black seven onto the red eight, or save it for a
                  different column? Apps that limit undo to one step, or charge
                  coins for extra undos, are hostile to learning. Walk away
                  from those.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Statistics Tracking
                </h3>
                <p className="text-sm text-white/70">
                  Knowing your win rate, average time, and move count gives you
                  something to work toward beyond just finishing the current
                  game. The best apps track these automatically and show trends
                  over time. Watching your Draw 3 win rate climb from 15% to
                  30% is genuinely satisfying.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Ad Quality
                </h3>
                <p className="text-sm text-white/70">
                  There is a massive difference between a small banner ad and a
                  forced 30-second video between every game. Klondike is a
                  thinking game — interruptions break your concentration and
                  ruin the experience. We penalized apps that use aggressive
                  interstitial ads and rewarded those that keep advertising
                  non-intrusive or absent.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Offline Play
                </h3>
                <p className="text-sm text-white/70">
                  Solitaire is the original offline game. It should work on a
                  plane, in a waiting room with no signal, or during an
                  internet outage. Native apps handle this naturally. Browser
                  games vary — some use service workers for offline support,
                  others require an active connection. We noted which options
                  work without internet.
                </p>
              </div>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Browser-Based Options */}
        <CardSection id="browser-based" variant="dark">
          <SectionHeading
            variant="dark"
            sub="No Download Required"
            id="browser-based-heading"
          >
            Browser-Based Options
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Browser-based Klondike is the most accessible way to play. You
              open a URL, the game loads, and you start playing. No app store,
              no installation, no storage consumed. The same URL works on
              Windows, Mac, Linux, iOS, and Android. For a game as simple as
              Klondike, there is no reason to install anything in 2026.
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                {siteConfig.siteName} (Our Site)
              </h3>
              <p className="text-sm text-white/70 mb-3">
                Full disclosure: this is our site. We built it because the
                existing options were either overloaded with ads or lacking in
                features.{" "}
                <Link
                  href="/"
                  className="text-[var(--gold)] hover:text-white transition-colors"
                >
                  {siteConfig.siteName}
                </Link>{" "}
                offers both Draw 1 and Draw 3 modes, unlimited undo, a hint
                system, detailed statistics tracking, and a dark theme that is
                easy on the eyes. No account required. No intrusive ads. Works
                on every device with a modern browser. Your progress saves
                automatically in your browser.
              </p>
              <p className="text-sm text-white/70">
                Beyond classic Klondike, the site includes other solitaire
                variants —{" "}
                <Link
                  href="/klondike/tips"
                  className="text-[var(--gold)] hover:text-white transition-colors"
                >
                  tips
                </Link>
                ,{" "}
                <Link
                  href="/klondike/strategy"
                  className="text-[var(--gold)] hover:text-white transition-colors"
                >
                  strategy guides
                </Link>
                , and editorial content to help you improve. If you are new,
                our{" "}
                <Link
                  href="/klondike-for-beginners"
                  className="text-[var(--gold)] hover:text-white transition-colors"
                >
                  beginner&apos;s guide
                </Link>{" "}
                walks you through everything step by step.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                World of Solitaire
              </h3>
              <p className="text-sm text-white/70">
                World of Solitaire has been around since 2007 and offers an
                enormous selection of solitaire variants — over 100 different
                games. The Klondike implementation is solid and customizable,
                with options for card backs, backgrounds, and table layouts.
                The interface looks dated compared to newer options, but the
                functionality is dependable. It runs on ads but they tend to be
                standard display banners rather than aggressive video
                interstitials. A good choice if you value variety above all
                else and want dozens of different solitaire games in one place.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Solitaired
              </h3>
              <p className="text-sm text-white/70">
                Solitaired is a polished browser-based solitaire site that
                covers Klondike, Spider, FreeCell, and several other variants.
                The Klondike game supports Draw 1 and Draw 3, includes undo
                and hints, and tracks basic statistics. The design is clean and
                modern. It monetizes through display advertising, which is
                generally non-intrusive during gameplay. The site also includes
                how-to-play guides and rule explanations, which is helpful if
                you are learning. A strong competitor in the browser-based
                category.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Solitaire.io and Similar Sites
              </h3>
              <p className="text-sm text-white/70">
                There are dozens of smaller Klondike sites — solitaire.io,
                online-solitaire.com, cardgames.io, and many others. Quality
                varies considerably. Some are well-made with clean interfaces
                and fair ad loads. Others are thinly disguised ad farms that
                prioritize revenue over gameplay. If you explore beyond the
                options listed here, pay attention to how many ads load before
                you can even start a game, whether undo actually works
                properly, and whether the site feels responsive on your device.
              </p>
            </div>
          </ContentBody>
        </CardSection>

        {/* Mobile Apps */}
        <CardSection id="mobile-apps" variant="dark">
          <SectionHeading
            variant="dark"
            sub="App Store and Google Play"
            id="mobile-apps-heading"
          >
            Mobile Apps
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Search &ldquo;Solitaire&rdquo; on the App Store or Google Play
              and you will find thousands of results. The vast majority are
              ad-supported Klondike clones of varying quality. Here are the
              standout options.
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Microsoft Solitaire Collection
              </h3>
              <p className="text-sm text-white/70">
                The official Microsoft offering bundles Klondike with Spider,
                FreeCell, Pyramid, and TriPeaks. Available on Windows, iOS, and
                Android. The Klondike implementation is polished — smooth
                animations, reliable touch controls, both Draw 1 and Draw 3
                modes. Daily challenges and Xbox achievements add structured
                goals. The downside is advertising: the free version shows
                video ads between games and banner ads during play. Removing
                ads costs $1.99 per month or $14.99 per year via Premium. If
                you are already in the Microsoft ecosystem and do not mind the
                ads, it is a dependable choice.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                MobilityWare Solitaire
              </h3>
              <p className="text-sm text-white/70">
                MobilityWare has been making Solitaire apps since the early
                days of the App Store and their Klondike app remains one of the
                most downloaded. It supports Draw 1 and Draw 3, includes
                statistics, daily challenges, and multiple themes. The touch
                controls are responsive and well-designed for phones. The
                ad experience has gotten more aggressive over the years —
                expect interstitial video ads between games and occasional
                pop-ups. There is no one-time purchase to remove ads; the
                ad-free tier is subscription-based. Still, the core gameplay is
                solid and the app works well offline.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Solebon Solitaire
              </h3>
              <p className="text-sm text-white/70">
                Solebon takes a different approach: it is a paid app with no
                ads and no in-app purchases. For a one-time purchase price
                (typically around $5), you get Klondike plus dozens of other
                solitaire variants with clean visuals and reliable offline
                play. The interface is straightforward without being flashy.
                If you specifically want a native app with no advertising at
                all and you do not mind paying once, Solebon is one of the few
                genuinely premium options left in a market dominated by
                ad-supported free-to-play.
              </p>
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
              For millions of people, Solitaire means the game that came with
              Windows. Microsoft bundled Klondike with every version of
              Windows from 3.0 through Windows 7. That standalone, ad-free
              Solitaire no longer ships with modern Windows — it has been
              replaced by the Microsoft Solitaire Collection, which is
              ad-supported.
            </p>
            <p>
              On Windows 10 and 11, the Solitaire Collection is your built-in
              option. On Mac, there is no pre-installed Klondike at all. Linux
              users have access to games like AisleRiot (included with many
              GNOME desktops), which offers a perfectly functional Klondike
              along with dozens of other solitaire variants.
            </p>
            <p>
              The honest recommendation for desktop players in 2026:
              skip native desktop apps entirely and use a browser-based
              Klondike site instead. You get the same game with less friction,
              no installation, and no platform lock-in. Pin the tab or add it
              to your bookmarks bar and the experience is indistinguishable
              from a native app — except it also works on your phone and
              tablet with zero extra setup.
            </p>
          </ContentBody>
        </CardSection>

        {/* Free vs Paid */}
        <CardSection id="free-vs-paid" variant="dark">
          <SectionHeading
            variant="dark"
            sub="What You Actually Get"
            id="free-vs-paid-heading"
          >
            Free vs Paid
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The word &ldquo;free&rdquo; in the solitaire app market
              deserves scrutiny. Here is what you are actually getting at each
              price point:
            </p>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Genuinely Free (Browser-Based)
              </h3>
              <p className="text-sm text-white/70">
                Sites like {siteConfig.siteName} are free with no catches. No
                subscriptions, no limited daily plays, no locked features. The
                trade-off is typically display advertising, which supports the
                site but does not interrupt your gameplay. This is the best
                value proposition for most players.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Free-to-Play with Aggressive Monetization
              </h3>
              <p className="text-sm text-white/70">
                Most mobile Klondike apps fall here. They are free to
                download but show video ads between games, limit undo to a
                handful of free uses per day, lock themes and card backs behind
                paywalls, or introduce &ldquo;energy&rdquo; systems that cap
                how many games you can play per hour. Over time, these costs
                add up to more than a simple paid app would have cost.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Subscription ($1-3/Month)
              </h3>
              <p className="text-sm text-white/70">
                Microsoft Solitaire Collection Premium is the best-known
                example at $1.99 per month. You get ad-free gameplay plus some
                bonus features. The math: $24 per year for a card game. Not
                outrageous, but hard to justify when equally good options exist
                for free.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                One-Time Purchase ($3-7)
              </h3>
              <p className="text-sm text-white/70">
                Apps like Solebon charge once and leave you alone. No ads, no
                subscriptions, no recurring charges. If you specifically want a
                native mobile app, this is the most honest pricing model.
                You pay once and own it. For Klondike Solitaire, expect to pay
                between $3 and $7 for a quality paid app.
              </p>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

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
              Not every Klondike app deserves your time. After testing dozens
              of options, here are the patterns that indicate a poor
              experience:
            </p>
            <p>
              <strong>Video ads after every game.</strong> If you finish a game
              and are forced to watch a 15-to-30-second video before you can
              start the next one, that app does not respect your time. Over a
              20-game session, that is 5 to 10 minutes of your life spent
              watching ads for products you do not want.
            </p>
            <p>
              <strong>Limited undo behind a paywall.</strong> Some apps give
              you three free undos per game and charge coins or real money for
              more. Undo is a basic feature, not a premium add-on. Any app
              that monetizes undo is designed to frustrate you into spending.
            </p>
            <p>
              <strong>Fake &ldquo;winnable&rdquo; claims.</strong> Some apps
              advertise that every deal is winnable. In standard Klondike,
              roughly 79% of Draw 1 deals and a smaller percentage of Draw 3
              deals are theoretically winnable with perfect play. An app that
              claims 100% winnability is either filtering deals (which means
              you are not playing real Klondike) or lying.
            </p>
            <p>
              <strong>Excessive permissions.</strong> A solitaire game does
              not need access to your contacts, photos, microphone, or
              location. If a Klondike app requests permissions beyond basic
              storage, think carefully about whether you trust the developer.
              Read our{" "}
              <Link
                href="/klondike-mistakes-to-avoid"
                className="text-[var(--gold)] hover:text-white transition-colors"
              >
                common Klondike mistakes
              </Link>{" "}
              guide for gameplay pitfalls, too.
            </p>
            <p>
              <strong>Clone spam.</strong> Some publishers release the same
              basic Klondike app under 10 or 15 different names with different
              icons to dominate search results. If the screenshots look
              identical across multiple listings, they are the same app
              repackaged. Pick the original or skip them all.
            </p>
          </ContentBody>
        </CardSection>

        {/* Our Pick */}
        <CardSection id="our-pick" variant="dark">
          <SectionHeading
            variant="dark"
            sub="The Verdict"
            id="our-pick-heading"
          >
            Our Pick
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              We are biased — we built{" "}
              <Link
                href="/"
                className="text-[var(--gold)] hover:text-white transition-colors"
              >
                {siteConfig.siteName}
              </Link>{" "}
              — but we also built it specifically because the existing
              landscape left us unsatisfied. Too many ads, too few features,
              too much friction.
            </p>
            <p>
              For most people, a browser-based Klondike site is the right
              choice. No download, no account, no platform restrictions. It
              works on the device you have right now. Among browser-based
              options, we think our site offers the strongest combination of
              features: both{" "}
              <Link
                href="/klondike/draw-1-vs-draw-3"
                className="text-[var(--gold)] hover:text-white transition-colors"
              >
                Draw 1 and Draw 3 modes
              </Link>
              , unlimited undo, hints, comprehensive statistics,{" "}
              <Link
                href="/klondike/strategy"
                className="text-[var(--gold)] hover:text-white transition-colors"
              >
                strategy content
              </Link>
              , and a clean dark theme. But Solitaired is a respectable
              alternative, and World of Solitaire is hard to beat for sheer
              game variety.
            </p>
            <p>
              If you insist on a native mobile app, Solebon is the best
              option for ad-free play at a one-time cost. Microsoft Solitaire
              Collection is fine if you are already paying for Premium or do
              not mind the ads. MobilityWare is functional but the ad load has
              gotten heavy.
            </p>
            <p>
              Whatever you choose, make sure it supports both draw modes, has
              unlimited undo, and does not make you watch a video ad every
              time you finish a game. Life is too short for bad solitaire
              apps.
            </p>
          </ContentBody>
        </CardSection>

        {/* Feature Comparison Table */}
        <CardSection id="comparison-table" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Side-by-Side"
            id="comparison-table-heading"
          >
            Feature Comparison Table
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Here is how the leading Klondike options stack up across the
              criteria that matter most:
            </p>
            <div className="overflow-x-auto">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 font-semibold text-[#D4AF37]">
                        Feature
                      </th>
                      <th className="py-3 px-4 font-semibold text-[#D4AF37]">
                        {siteConfig.siteName}
                      </th>
                      <th className="py-3 px-4 font-semibold text-[#D4AF37]">
                        MS Solitaire
                      </th>
                      <th className="py-3 px-4 font-semibold text-[#D4AF37]">
                        Solitaired
                      </th>
                      <th className="py-3 px-4 font-semibold text-[#D4AF37]">
                        MobilityWare
                      </th>
                      <th className="py-3 px-4 font-semibold text-[#D4AF37]">
                        Solebon
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-medium text-white">Price</td>
                      <td className="py-3 px-4">Free</td>
                      <td className="py-3 px-4">Free w/ ads</td>
                      <td className="py-3 px-4">Free w/ ads</td>
                      <td className="py-3 px-4">Free w/ ads</td>
                      <td className="py-3 px-4">~$5 once</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-medium text-white">Draw 1 + Draw 3</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-medium text-white">No Intrusive Ads</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">No ($1.99/mo)</td>
                      <td className="py-3 px-4">Moderate</td>
                      <td className="py-3 px-4">No (sub req.)</td>
                      <td className="py-3 px-4">Yes (paid)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-medium text-white">No Download</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">No</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">No</td>
                      <td className="py-3 px-4">No</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-medium text-white">Unlimited Undo</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Limited free</td>
                      <td className="py-3 px-4">Yes</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-medium text-white">Statistics</td>
                      <td className="py-3 px-4">Detailed</td>
                      <td className="py-3 px-4">Basic</td>
                      <td className="py-3 px-4">Basic</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-medium text-white">Offline Play</td>
                      <td className="py-3 px-4">Partial</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">No</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-medium text-white">Hint System</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-medium text-white">Dark Theme</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Limited</td>
                      <td className="py-3 px-4">No</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Multiple</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-white">Cross-Device</td>
                      <td className="py-3 px-4">All devices</td>
                      <td className="py-3 px-4">Win/iOS/And</td>
                      <td className="py-3 px-4">All devices</td>
                      <td className="py-3 px-4">iOS/Android</td>
                      <td className="py-3 px-4">iOS only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
                href="/"
                title="Play Klondike Online"
                description="Jump straight into a game — free, no download, works on any device."
                icon="♠"
              />
              <ContentLinkCard
                href="/klondike-for-beginners"
                title="Klondike for Beginners"
                description="Never played before? This step-by-step guide covers everything."
                icon="♣"
              />
              <ContentLinkCard
                href="/klondike/draw-1-vs-draw-3"
                title="Draw 1 vs Draw 3"
                description="Understand the key difference between the two Klondike modes."
                icon="♦"
              />
            </div>
          </ContentBody>
        </CardSection>

        {/* CTA */}
        <CtaSection
          heading="Ready to Play Klondike?"
          body="Free, instant, and works on every device. Choose Draw 1 or Draw 3, track your stats, and play as many games as you want."
          primaryLabel="Play Klondike Now"
          primaryHref="/"
          secondaryLabel="Learn the Rules"
          secondaryHref="/klondike/how-to-play"
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
                href="/klondike/how-to-play"
                title="How to Play Klondike"
                description="Complete rules and mechanics explained clearly for all skill levels."
                icon="♠"
              />
              <ContentLinkCard
                href="/klondike/strategy"
                title="Klondike Strategy"
                description="Techniques to improve your win rate in both Draw 1 and Draw 3."
                icon="♦"
              />
              <ContentLinkCard
                href="/klondike/tips"
                title="Tips and Tricks"
                description="Practical advice you can apply to your very next game."
                icon="♣"
              />
              <ContentLinkCard
                href="/klondike-probability"
                title="Klondike Probability"
                description="The real math behind win rates, deal solvability, and scoring."
                icon="♥"
              />
              <ContentLinkCard
                href="/klondike-variants"
                title="Klondike Variants"
                description="Vegas, Thoughtful, Westcliff, and other ways to play Klondike."
                icon="♠"
              />
              <ContentLinkCard
                href="/klondike-mastery"
                title="Klondike Mastery"
                description="Advanced concepts for experienced players chasing higher win rates."
                icon="♦"
              />
            </div>
          </ContentBody>
        </CardSection>
      </main>
    </ContentLayout>
  );
}
