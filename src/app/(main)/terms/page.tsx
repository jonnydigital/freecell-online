import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title: "Terms of Service | PlayFreeCellOnline.com",
  description: "Terms of Service for PlayFreeCellOnline.com",
};

export default function TermsPage() {
  const lastUpdated = "February 23, 2026";

  return (
    <ContentLayout variant="dark">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: absoluteUrl('/terms') },
          ],
        }}
      />

      {/* ── Hero ── */}
      <ContentHero
        title="Terms of Service"
        subtitle="The formal agreement governing your use of our platform."
      />

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <CardSection>
          <SectionHeading sub={`Last Updated: ${lastUpdated}`}>
            Terms of Service
          </SectionHeading>

          <ContentBody className="space-y-8">
            {/* Key Points Summary */}
            <div className="card-inset rounded-lg p-5">
              <h3
                className="font-medium text-[#2a2522] text-lg mb-3"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                Key Points
              </h3>
              <ul className="space-y-2 text-[#444444] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#B8860B] shrink-0">{"\u2713"}</span>
                  <span>
                    Using the site means you accept these terms
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8860B] shrink-0">{"\u2713"}</span>
                  <span>
                    Free for personal, non-commercial use
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8860B] shrink-0">{"\u2713"}</span>
                  <span>
                    FreeCell rules are public domain; our design and code are
                    not
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8860B] shrink-0">{"\u2713"}</span>
                  <span>
                    Service provided as-is with no guarantee of uptime
                  </span>
                </li>
              </ul>
            </div>

            {/* Term sections in card-inset boxes */}
            <div className="card-inset rounded-lg p-5">
              <h3
                className="text-lg font-semibold text-[#2a2522] mb-3"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                01. Acceptance
              </h3>
              <p className="text-[#444444] leading-relaxed">
                By accessing PlayFreeCellOnline.com, you agree to these
                terms. If you do not agree, please stop using the service
                immediately.
              </p>
            </div>

            <div className="card-inset rounded-lg p-5">
              <h3
                className="text-lg font-semibold text-[#2a2522] mb-3"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                02. Usage License
              </h3>
              <p className="text-[#444444] leading-relaxed">
                We grant you a personal, non-exclusive license to play
                FreeCell in your browser for entertainment purposes. No
                commercial use or data scraping is permitted.
              </p>
            </div>

            <div className="card-inset rounded-lg p-5">
              <h3
                className="text-lg font-semibold text-[#2a2522] mb-3"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                03. Intellectual Property
              </h3>
              <p className="text-[#444444] leading-relaxed">
                The game mechanics of FreeCell are public domain. However,
                our specific design, code, and professional assets are owned
                by PlayFreeCellOnline.com.
              </p>
            </div>

            <div className="card-inset rounded-lg p-5">
              <h3
                className="text-lg font-semibold text-[#2a2522] mb-3"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                04. Limitation of Liability
              </h3>
              <p className="text-[#444444] leading-relaxed">
                The service is provided &ldquo;as is.&rdquo; We are not
                liable for any lost game data or interruptions.
              </p>
            </div>
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
