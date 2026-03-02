import Link from "next/link";
import type { Metadata } from "next";
import ContentLayout from "../../components/ContentLayout";

export const metadata: Metadata = {
  title: "Terms of Service | PlayFreeCellOnline.com",
  description: "Terms of Service for PlayFreeCellOnline.com",
};

const CARD = "card-panel";
const CARD_TOP: React.CSSProperties = {
  borderTop: "1px solid rgba(184, 134, 11, 0.08)",
};

function SectionHeading({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="px-6 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        className="text-2xl sm:text-3xl font-bold text-[#2a2522]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {children}
      </h2>
      <div className="card-title-separator mt-5" />
    </div>
  );
}

export default function TermsPage() {
  const lastUpdated = "February 23, 2026";

  return (
    <ContentLayout variant="dark">
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
          Terms of Service
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          The formal agreement governing your use of our platform.
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
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-12">
        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub={`Last Updated: ${lastUpdated}`}>
              Terms of Service
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-8">
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
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
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
                Play FreeCell Now
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                Jump into a game of FreeCell — no downloads, no sign-ups, just
                pure strategy.
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
                  Learn the Rules
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
