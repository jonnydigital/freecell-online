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
    "Download FreeCell — Play Free on Any Device | No App Store Needed",
  description:
    "Download FreeCell as a free web app on any device — PC, Mac, iPhone, Android. Install in seconds, play offline, no app store required. Always updated, zero storage bloat.",
  keywords: [
    "freecell download",
    "freecell app",
    "free freecell download",
    "freecell for pc",
    "freecell game download",
    "download freecell free",
    "freecell for mac",
    "freecell for iphone",
    "freecell for android",
    "freecell offline",
    "freecell install",
    "freecell pwa",
    "freecell no download",
    "freecell web app",
    "play freecell offline",
  ],
  openGraph: {
    title:
      "Download FreeCell — Play Free on Any Device | No App Store Needed",
    description:
      "Install FreeCell as a free web app in seconds. Works offline on PC, Mac, iPhone, and Android — no app store, no storage bloat, always up to date.",
    url: absoluteUrl("/download"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/download"),
  },
};

/* ── FAQ data ── */

const faqItems = [
  {
    question: "Do I need to download anything to play FreeCell?",
    answer: `No. You can play FreeCell instantly in your browser at ${siteConfig.siteName} with no download required. However, if you want an app-like experience with offline play and a home screen icon, you can install our free web app in about 10 seconds using your browser's install feature. It works on Chrome, Safari, Edge, and Firefox across all platforms.`,
  },
  {
    question: "Is this FreeCell app really free?",
    answer:
      "Yes, completely free — no trial period, no premium tier, no in-app purchases. Our FreeCell web app includes all features: five game modes, daily challenges, achievements, a built-in solver, statistics tracking, and offline play. There are no video ads interrupting gameplay and no subscription required to remove them.",
  },
  {
    question: "Can I play FreeCell offline after installing?",
    answer:
      "Yes. Once you install the web app, it caches everything needed to play offline. You can open it from your home screen or desktop without an internet connection. Your games, statistics, and achievements are stored locally on your device. When you reconnect, the app silently checks for updates in the background.",
  },
  {
    question: "How much storage does the FreeCell app use?",
    answer:
      "Our FreeCell web app uses less than 5 MB of storage — far less than typical app store games, which often require 50–200 MB. Because it runs as a progressive web app, there are no bulky assets to download. Updates happen automatically in the background without increasing the app's footprint.",
  },
  {
    question: "How do I uninstall the FreeCell web app?",
    answer:
      "Uninstalling is simple. On desktop (Chrome/Edge), right-click the app icon and select 'Uninstall.' On iPhone or iPad, long-press the icon on your home screen and tap 'Delete Bookmark' or 'Remove from Home Screen.' On Android, long-press the icon and drag it to 'Uninstall' or go to Settings → Apps → FreeCell → Uninstall. No leftover files, no registry entries, no residual data.",
  },
];

export default function DownloadFreecellPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Download FreeCell — Play Free on Any Device",
      description:
        "Install FreeCell as a free web app on any device. Works offline, auto-updates, no app store required.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-03-17",
      dateModified: "2026-03-17",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl("/download"),
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
          name: "Download FreeCell",
          item: absoluteUrl("/download"),
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
          kicker="Free Web App"
          title="Download FreeCell — Play Free on Any Device"
          subtitle="No app store. No signup. No storage bloat. Install our free FreeCell web app in seconds and play on your PC, Mac, iPhone, or Android — even offline."
        />

        {/* Why Our FreeCell Is Different */}
        <CardSection id="why-different" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Not Your Typical Download"
            id="why-different-heading"
          >
            Why Our FreeCell Is Different
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Most &ldquo;free FreeCell download&rdquo; results lead to the same
              place: an app store listing for a game that&apos;s technically free
              but stuffed with banner ads, video interruptions, and a subscription
              upsell to make them go away. Others require you to download an
              installer, grant permissions, and hope it&apos;s not bundled with
              toolbar software from 2009.
            </p>
            <p>
              {siteConfig.siteName} takes a different approach. Our FreeCell is a{" "}
              <strong>progressive web app (PWA)</strong> — a modern technology
              that lets you install a website as a standalone app on any device.
              It looks and feels like a native app: it has its own icon on your
              home screen or desktop, opens in its own window (no browser toolbar),
              and works completely offline. But unlike an app store download, it
              installs in seconds, uses almost no storage, and updates itself
              automatically every time you open it.
            </p>
            <p>
              There&apos;s no installer to run, no account to create, and no
              permissions to grant beyond what a normal website uses. You get a
              full-featured FreeCell game —{" "}
              <Link
                href="/freecell-variants"
                className="text-[#D4AF37] hover:underline"
              >
                five game modes
              </Link>
              ,{" "}
              <Link
                href="/daily-freecell"
                className="text-[#D4AF37] hover:underline"
              >
                daily challenges
              </Link>
              ,{" "}
              <Link
                href="/achievements"
                className="text-[#D4AF37] hover:underline"
              >
                achievements
              </Link>
              , a{" "}
              <Link
                href="/solver"
                className="text-[#D4AF37] hover:underline"
              >
                built-in solver
              </Link>
              , and detailed statistics — without any of the baggage that comes
              with traditional downloads.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* How to Install */}
        <CardSection id="how-to-install" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Step-by-Step Instructions"
            id="install-heading"
          >
            How to Install FreeCell on Your Device
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-6">
            {/* Chrome / Edge Desktop */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Windows or Mac (Chrome / Edge)
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-white/70 text-sm leading-7">
                <li>
                  Open{" "}
                  <Link href="/" className="text-[#D4AF37] hover:underline">
                    {siteConfig.siteName}
                  </Link>{" "}
                  in Chrome or Microsoft Edge.
                </li>
                <li>
                  Look for the <strong>install icon</strong> in the address bar — it
                  looks like a monitor with a down arrow, or a &ldquo;+&rdquo;
                  icon on the right side.
                </li>
                <li>
                  Click it and confirm by selecting <strong>&ldquo;Install&rdquo;</strong>.
                </li>
                <li>
                  FreeCell now appears as a desktop app — find it in your Start menu
                  (Windows) or Applications folder (Mac). It opens in its own window
                  with no browser chrome.
                </li>
              </ol>
            </div>

            {/* iPhone / iPad */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                iPhone or iPad (Safari)
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-white/70 text-sm leading-7">
                <li>
                  Open{" "}
                  <Link href="/" className="text-[#D4AF37] hover:underline">
                    {siteConfig.siteName}
                  </Link>{" "}
                  in Safari (this only works in Safari on iOS).
                </li>
                <li>
                  Tap the <strong>Share button</strong> (the square with an upward
                  arrow) at the bottom of the screen.
                </li>
                <li>
                  Scroll down and tap{" "}
                  <strong>&ldquo;Add to Home Screen.&rdquo;</strong>
                </li>
                <li>
                  Tap <strong>&ldquo;Add&rdquo;</strong> in the top-right corner.
                </li>
                <li>
                  The FreeCell icon now appears on your home screen. Tap it to launch
                  the app in full-screen mode — it looks and feels like a native iOS
                  app.
                </li>
              </ol>
            </div>

            {/* Android */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Android (Chrome)
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-white/70 text-sm leading-7">
                <li>
                  Open{" "}
                  <Link href="/" className="text-[#D4AF37] hover:underline">
                    {siteConfig.siteName}
                  </Link>{" "}
                  in Chrome on your Android device.
                </li>
                <li>
                  Chrome may show an <strong>&ldquo;Install app&rdquo;</strong>{" "}
                  banner at the bottom of the screen. If so, tap{" "}
                  <strong>&ldquo;Install.&rdquo;</strong>
                </li>
                <li>
                  If no banner appears, tap the <strong>three-dot menu</strong> in the
                  top-right corner and select{" "}
                  <strong>&ldquo;Add to Home screen&rdquo;</strong> or{" "}
                  <strong>&ldquo;Install app.&rdquo;</strong>
                </li>
                <li>
                  Confirm the installation. The FreeCell icon appears in your app
                  drawer and on your home screen, just like any other Android app.
                </li>
              </ol>
            </div>

            <p className="text-white/70 text-sm leading-7">
              On all platforms, the installed app receives updates automatically
              whenever you open it with an internet connection. No manual updating,
              no app store notifications — it just stays current.
            </p>
          </ContentBody>
        </CardSection>

        {/* Features Included */}
        <CardSection id="features" variant="dark">
          <SectionHeading
            variant="dark"
            sub="Everything You Get for Free"
            id="features-heading"
          >
            Features Included in the FreeCell App
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              This isn&apos;t a stripped-down demo. You get the full game with every
              feature unlocked from the start — no paywalls, no premium tiers.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 text-sm text-white/70 leading-7">
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">♠</span>
                <span>
                  <strong className="text-white">Classic FreeCell</strong> — all
                  32,000 original{" "}
                  <Link
                    href="/microsoft-freecell"
                    className="text-[#D4AF37] hover:underline"
                  >
                    Microsoft deal numbers
                  </Link>
                  , plus over a million extended deals
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">♥</span>
                <span>
                  <strong className="text-white">5 Game Modes</strong> — Classic,{" "}
                  <Link
                    href="/daily-freecell"
                    className="text-[#D4AF37] hover:underline"
                  >
                    Daily Challenge
                  </Link>
                  , Streak, Storm, and{" "}
                  <Link
                    href="/freecell-variants"
                    className="text-[#D4AF37] hover:underline"
                  >
                    reduced-cell variants
                  </Link>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">♦</span>
                <span>
                  <strong className="text-white">Unlimited Undo</strong> — step
                  back as many moves as you need, no restrictions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">♣</span>
                <span>
                  <strong className="text-white">Smart Hints</strong> — get
                  suggested moves when you&apos;re stuck
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">♠</span>
                <span>
                  <strong className="text-white">
                    <Link
                      href="/achievements"
                      className="text-[#D4AF37] hover:underline"
                    >
                      Achievements
                    </Link>
                  </strong>{" "}
                  — unlock milestones as you play and track your progress
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">♥</span>
                <span>
                  <strong className="text-white">
                    <Link
                      href="/solver"
                      className="text-[#D4AF37] hover:underline"
                    >
                      Built-in Solver
                    </Link>
                  </strong>{" "}
                  — verify whether a deal is solvable or watch the solution play out
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">♦</span>
                <span>
                  <strong className="text-white">Detailed Statistics</strong> —
                  win rate, average time, move counts, streaks, and historical
                  performance
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">♣</span>
                <span>
                  <strong className="text-white">Offline Play</strong> — works
                  without an internet connection after installation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">♠</span>
                <span>
                  <strong className="text-white">Multiple Themes</strong> —
                  customize the look with different card faces and table colors
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">♥</span>
                <span>
                  <strong className="text-white">Auto-Complete</strong> — when
                  a game is clearly won, cards fly to the foundations automatically
                </span>
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Comparison Table */}
        <CardSection id="comparison" variant="dark">
          <SectionHeading
            variant="dark"
            sub="See the Difference"
            id="comparison-heading"
          >
            FreeCell Web App vs App Store Downloads
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Wondering whether to grab a FreeCell app from the App Store or Google
              Play, or just use our web app? Here&apos;s how they compare:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 font-semibold text-[#D4AF37]">
                      Feature
                    </th>
                    <th className="py-3 px-4 font-semibold text-[#D4AF37]">
                      App Store FreeCell
                    </th>
                    <th className="py-3 pl-4 font-semibold text-[#D4AF37]">
                      {siteConfig.siteName}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Price
                    </td>
                    <td className="py-3 px-4">
                      Free with ads, or $2–5 to remove
                    </td>
                    <td className="py-3 pl-4">✅ Free forever</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Ads During Gameplay
                    </td>
                    <td className="py-3 px-4">
                      Video ads between games, banners during play
                    </td>
                    <td className="py-3 pl-4">
                      ✅ No ads interrupting gameplay
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Storage Required
                    </td>
                    <td className="py-3 px-4">50–200 MB typical</td>
                    <td className="py-3 pl-4">✅ Under 5 MB</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Updates
                    </td>
                    <td className="py-3 px-4">
                      Manual via app store
                    </td>
                    <td className="py-3 pl-4">✅ Automatic, instant</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Works on All Platforms
                    </td>
                    <td className="py-3 px-4">
                      Separate apps per platform
                    </td>
                    <td className="py-3 pl-4">
                      ✅ One app — PC, Mac, iPhone, Android
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Offline Play
                    </td>
                    <td className="py-3 px-4">✅ Yes</td>
                    <td className="py-3 pl-4">✅ Yes</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Account Required
                    </td>
                    <td className="py-3 px-4">Often yes (Apple/Google ID)</td>
                    <td className="py-3 pl-4">✅ No account needed</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Install Time
                    </td>
                    <td className="py-3 px-4">1–3 minutes</td>
                    <td className="py-3 pl-4">✅ Under 10 seconds</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      Permissions Required
                    </td>
                    <td className="py-3 px-4">
                      Storage, network, sometimes contacts/photos
                    </td>
                    <td className="py-3 pl-4">✅ None</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">
                      Microsoft Deal Numbers
                    </td>
                    <td className="py-3 px-4">Rarely</td>
                    <td className="py-3 pl-4">
                      ✅ All 32,000 original deals
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* CTA */}
        <CtaSection
          heading="Ready to Play FreeCell?"
          body="No download page. No app store. No waiting. Just click and play — or install the web app for offline access on any device."
          primaryLabel="Play FreeCell Now"
          secondaryLabel="Learn How to Play"
          secondaryHref="/how-to-play"
        />

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
          <SectionHeading variant="dark" sub="Keep Exploring" id="related-heading">
            Related Pages
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-2">
              <ContentLinkCard
                href="/how-to-play"
                title="How to Play FreeCell"
                description="Learn the rules of FreeCell from scratch — takes about 3 minutes."
              />
              <ContentLinkCard
                href="/daily-freecell"
                title="Daily FreeCell Challenge"
                description="A new deal every day — same deal for every player worldwide."
              />
              <ContentLinkCard
                href="/achievements"
                title="Achievements"
                description="Unlock milestones and track your FreeCell mastery over time."
              />
              <ContentLinkCard
                href="/microsoft-freecell"
                title="Microsoft FreeCell"
                description="The story of the classic Windows game and how to play the same deals online."
              />
              <ContentLinkCard
                href="/solver"
                title="FreeCell Solver"
                description="Check if any deal is solvable and watch the step-by-step solution."
              />
              <ContentLinkCard
                href="/freecell-variants"
                title="FreeCell Variants"
                description="9+ ways to play FreeCell — from beginner-friendly to expert-only."
              />
            </div>
          </ContentBody>
        </CardSection>

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
