/**
 * PageMetaStamp — subtle "Published / Updated" date stamp.
 *
 * Used on pages that don't warrant a full author byline but still need a
 * visible E-E-A-T freshness signal for readers (and crawlers).
 */

interface PageMetaStampProps {
  publishedDate: string; // ISO date
  updatedDate?: string; // ISO date
  variant?: "inline" | "standalone";
}

// timeZone MUST be pinned: date-only ISO strings parse as UTC midnight, and
// formatting them in the runtime's local zone makes the server (UTC) render a
// different day than clients west of UTC — a hydration text mismatch (React
// #418) that forces a client re-render and duplicated JSON-LD scripts.
const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return DATE_FORMATTER.format(parsed);
}

export default function PageMetaStamp({
  publishedDate,
  updatedDate,
  variant = "inline",
}: PageMetaStampProps) {
  const publishedIso = publishedDate;
  const updatedIso = updatedDate;
  const showUpdated =
    Boolean(updatedIso) && updatedIso !== publishedIso;

  const baseClass =
    "text-xs text-white/50 leading-relaxed flex flex-wrap items-center gap-1.5";
  const wrapperClass =
    variant === "standalone"
      ? `${baseClass} py-2`
      : baseClass;

  return (
    <p className={wrapperClass}>
      <span>
        Published{" "}
        <time dateTime={publishedIso}>{formatDate(publishedIso)}</time>
      </span>
      {showUpdated && updatedIso && (
        <>
          <span aria-hidden="true" className="text-white/30">
            ·
          </span>
          <span>
            Updated <time dateTime={updatedIso}>{formatDate(updatedIso)}</time>
          </span>
        </>
      )}
    </p>
  );
}
