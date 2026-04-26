import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd, ContentLinkCard } from "@/components/content";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.siteName}`,
  description: `How ${siteConfig.siteName} handles game data, analytics, advertising cookies, and contact requests.`,
  alternates: {
    canonical: canonicalUrlFor("/privacy"),
  },
};

export default function PrivacyPage() {
  const lastUpdated = "April 26, 2026";

  return (
    <ContentLayout variant="dark">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: absoluteUrl('/privacy') },
          ],
        }}
      />

      {/* ── Hero ── */}
      <ContentHero
        title="Privacy Policy"
        subtitle="Transparent and simple data policies for our players."
      />

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <CardSection>
          <SectionHeading sub={`Last Updated: ${lastUpdated}`}>
            Privacy Policy
          </SectionHeading>

          <ContentBody className="space-y-6">
            <div>
              <h3
                className="text-xl font-semibold text-[#2a2522] mb-4"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                01. Information Collection
              </h3>
              <p className="text-[#444444] leading-relaxed mb-4">
                We collect only the information needed to run the site, improve
                the games, respond to player messages, and support advertising:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="card-inset rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#8B6914] font-bold text-lg">
                      {"\u2022"}
                    </span>
                    <h4 className="font-medium text-[#2a2522]">
                      Local Data
                    </h4>
                  </div>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    Your scores and settings are stored in your
                    browser&apos;s LocalStorage. This stays on your device
                    unless you choose to send feedback or contact us.
                  </p>
                </div>
                <div className="card-inset rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#8B6914] font-bold text-lg">
                      {"\u2022"}
                    </span>
                    <h4 className="font-medium text-[#2a2522]">Analytics</h4>
                  </div>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    We use Google Analytics to understand traffic patterns,
                    popular pages, device types, and site performance. Google
                    may process usage data according to its own policies.
                  </p>
                </div>
                <div className="card-inset rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#8B6914] font-bold text-lg">
                      {"\u2022"}
                    </span>
                    <h4 className="font-medium text-[#2a2522]">
                      Messages
                    </h4>
                  </div>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    If you use a contact or feedback form, we receive the
                    information you submit, such as your name, email address,
                    message, and basic anti-abuse request details.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3
                className="text-xl font-semibold text-[#2a2522] mb-4"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                02. Advertising
              </h3>
              <p className="text-[#444444] leading-relaxed mb-4">
                We use Google AdSense and related Google advertising services to
                keep the games free. Google and its partners may use cookies,
                device identifiers, IP address, browser information, and page
                activity to deliver, limit, and measure ads.
              </p>
              <p className="text-[#444444] leading-relaxed">
                You can manage ad personalization through your browser settings
                and Google&apos;s ad controls at{" "}
                <a
                  href="https://adssettings.google.com/"
                  className="text-[#8B6914] underline underline-offset-2 hover:text-[#5f490f]"
                >
                  adssettings.google.com
                </a>
                . Declining the cookie banner does not remove all technical
                cookies, but it lets us record your preference for this browser.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold text-[#2a2522] mb-4"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                03. Data Use and Sharing
              </h3>
              <p className="text-[#444444] leading-relaxed mb-4">
                We use site data to operate the games, troubleshoot bugs,
                understand which pages are useful, prevent abuse, respond to
                messages, and support advertising. We do not sell personal
                information directly to third parties.
              </p>
              <div className="card-inset rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#8B6914] font-bold text-lg shrink-0 mt-0.5">
                    {"\u2713"}
                  </span>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    <strong className="text-[#2a2522]">
                      Service providers:
                    </strong>{" "}
                    Hosting, analytics, advertising, email, and anti-abuse
                    providers may process data for us or under their own terms
                    when their services appear on the site.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3
                className="text-xl font-semibold text-[#2a2522] mb-4"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                04. Security and Retention
              </h3>
              <p className="text-[#444444] leading-relaxed">
                We use HTTPS to protect data in transit and keep submitted
                messages only as long as needed to answer requests, maintain
                records, and prevent abuse. Browser-stored game data remains on
                your device until you clear it or reset your browser storage.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold text-[#2a2522] mb-4"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                05. Your Choices
              </h3>
              <p className="text-[#444444] leading-relaxed">
                You can clear local game data through your browser storage
                settings, block or delete cookies through your browser, adjust
                Google ad personalization, and contact us to request deletion of
                messages you submitted.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold text-[#2a2522] mb-4"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                06. Children and Contact
              </h3>
              <p className="text-[#444444] leading-relaxed">
                {siteConfig.siteName} is a general-audience card game site and
                is not directed to children under 13. Questions or privacy
                requests can be sent to {siteConfig.privacyEmail}.
              </p>
            </div>
          </ContentBody>
        </CardSection>

        {/* Related Content */}
        <CardSection>
          <SectionHeading sub="Explore" id="related" icon="♠">
            More from {siteConfig.siteName}
          </SectionHeading>
          <ContentBody className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard variant="felt" href="/about" title="About Us" description={`The story behind ${siteConfig.siteName} and our mission.`} />
            <ContentLinkCard variant="felt" href="/terms" title="Terms of Service" description="The formal agreement governing your use of our platform." />
            <ContentLinkCard variant="felt" href="/how-to-play" title="How to Play" description="Learn FreeCell rules and start playing right away." />
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          heading="Play Solitaire Now"
          body={
            <>
              Jump into a game of solitaire with no downloads and no sign-ups.
            </>
          }
          primaryLabel="Play Solitaire Now"
          secondaryLabel="Learn the Rules"
          secondaryHref={siteConfig.primaryGamePath}
        />
      </main>
    </ContentLayout>
  );
}
