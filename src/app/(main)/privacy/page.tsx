import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd, ContentLinkCard } from "@/components/content";

export const metadata: Metadata = {
  title: "Privacy Policy | PlayFreeCellOnline.com",
  description: "Privacy Policy for PlayFreeCellOnline.com",
};

export default function PrivacyPage() {
  const lastUpdated = "February 23, 2026";

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
                We collect minimal data to ensure the game works as intended:
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
                    and is never sent to our servers.
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
                    We use Google Analytics to understand basic traffic
                    patterns in an anonymous way. No personally identifiable
                    information is collected.
                  </p>
                </div>
                <div className="card-inset rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#8B6914] font-bold text-lg">
                      {"\u2022"}
                    </span>
                    <h4 className="font-medium text-[#2a2522]">
                      Cloud Sync
                    </h4>
                  </div>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    If you create a profile, we securely store your email
                    and stats via Supabase. You can delete your account at
                    any time.
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
              <p className="text-[#444444] leading-relaxed">
                We use standard ad providers (like Google AdSense) to keep
                the game free. They may use cookies to show relevant ads. You
                can manage these in your browser or via Google&apos;s ad
                settings.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold text-[#2a2522] mb-4"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                03. Security
              </h3>
              <p className="text-[#444444] leading-relaxed mb-4">
                We treat your data with respect. Communication between your
                browser and our servers is encrypted using industry-standard
                protocols.
              </p>
              <div className="card-inset rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#8B6914] font-bold text-lg shrink-0 mt-0.5">
                    {"\u2713"}
                  </span>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    <strong className="text-[#2a2522]">
                      SSL/TLS Encryption:
                    </strong>{" "}
                    All data transmitted between your browser and our servers
                    is protected with SSL/TLS encryption, the same security
                    standard used by banks and financial institutions.
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
                04. Contact
              </h3>
              <p className="text-[#444444] leading-relaxed">
                Questions? Reach out at {siteConfig.privacyEmail}.
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
            <ContentLinkCard variant="felt" href="/about" title="About Us" description="The story behind PlayFreeCellOnline.com and our mission." />
            <ContentLinkCard variant="felt" href="/terms" title="Terms of Service" description="The formal agreement governing your use of our platform." />
            <ContentLinkCard variant="felt" href="/how-to-play" title="How to Play" description="Learn FreeCell rules and start playing right away." />
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          heading="Play FreeCell Now"
          body={
            <>
              Jump into a game of FreeCell — no downloads, no sign-ups, just
              pure strategy.
            </>
          }
          primaryLabel="Play FreeCell Now"
          secondaryLabel="Learn the Rules"
          secondaryHref="/how-to-play"
        />
      </main>
    </ContentLayout>
  );
}
