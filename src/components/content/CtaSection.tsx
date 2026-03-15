import { siteConfig } from "@/lib/siteConfig";
import ContentButton from "./ContentButton";

interface CtaSectionProps {
  heading?: string;
  body?: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  children?: React.ReactNode;
}

export default function CtaSection({
  heading = "Ready to Play?",
  body,
  primaryLabel = "Play FreeCell Now",
  primaryHref,
  secondaryLabel,
  secondaryHref,
  children,
}: CtaSectionProps) {
  const resolvedPrimaryHref = primaryHref ?? siteConfig.primaryGamePath;

  return (
    <section>
      <div
        className="rounded-xl bg-white/[0.04] border border-white/[0.07] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)",
        }}
      >
        <div className="p-8 sm:p-10 text-center relative">
          {/* Decorative suit symbols */}
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
            {heading}
          </h2>

          {body && (
            <p className="text-[#6B7280] mb-6 max-w-md mx-auto">{body}</p>
          )}

          {children}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ContentButton
              href={resolvedPrimaryHref}
              variant="primary"
              size="lg"
            >
              {primaryLabel}
            </ContentButton>
            {secondaryLabel && secondaryHref && (
              <ContentButton
                href={secondaryHref}
                variant="secondary"
                size="lg"
              >
                {secondaryLabel}
              </ContentButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
