/**
 * UpdateLog — visible "Last updated" stamp with optional expandable changelog.
 *
 * Small content-freshness widget surfaced on rule, strategy, and game pages.
 * Inline variant is a quiet line of text; expandable variant reveals a
 * versioned changelog for readers (and search engines) who want proof that
 * our pages get maintained rather than abandoned.
 */

"use client";

import { useState } from "react";

interface ChangelogEntry {
  date: string; // ISO date
  summary: string;
}

interface UpdateLogProps {
  updatedDate: string; // ISO date
  publishedDate?: string; // ISO date
  changelog?: ChangelogEntry[];
  variant?: "inline" | "expandable";
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function formatDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return DATE_FORMATTER.format(parsed);
}

export default function UpdateLog({
  updatedDate,
  publishedDate,
  changelog,
  variant = "inline",
}: UpdateLogProps) {
  const [open, setOpen] = useState(false);
  const hasChangelog = Array.isArray(changelog) && changelog.length > 0;

  if (variant === "inline" || !hasChangelog) {
    return (
      <p className="text-xs text-white/50 leading-relaxed flex flex-wrap items-center gap-1.5">
        <span>
          Last updated{" "}
          <time dateTime={updatedDate}>{formatDate(updatedDate)}</time>
        </span>
        {publishedDate && publishedDate !== updatedDate && (
          <>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <span>
              Published{" "}
              <time dateTime={publishedDate}>
                {formatDate(publishedDate)}
              </time>
            </span>
          </>
        )}
      </p>
    );
  }

  return (
    <div className="text-xs text-white/60 leading-relaxed">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-white/50">
          Last updated{" "}
          <time dateTime={updatedDate}>{formatDate(updatedDate)}</time>
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="update-log-history"
          className="text-[#D4AF37] hover:text-[#F2D06B] underline decoration-dotted underline-offset-2 transition-colors"
        >
          {open ? "Hide update history" : "View update history"}
        </button>
      </div>
      <div
        id="update-log-history"
        hidden={!open}
        className="mt-3 border-l-2 border-[#D4AF37]/30 pl-3"
      >
        <ol className="space-y-2">
          {changelog!.map((entry) => (
            <li
              key={`${entry.date}-${entry.summary.slice(0, 24)}`}
              className="flex flex-col gap-0.5"
            >
              <time
                dateTime={entry.date}
                className="text-[11px] uppercase tracking-wide text-white/45"
              >
                {formatDate(entry.date)}
              </time>
              <span className="text-white/70">{entry.summary}</span>
            </li>
          ))}
          {publishedDate && (
            <li className="flex flex-col gap-0.5 opacity-75">
              <time
                dateTime={publishedDate}
                className="text-[11px] uppercase tracking-wide text-white/45"
              >
                {formatDate(publishedDate)}
              </time>
              <span className="text-white/70">Originally published.</span>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}
