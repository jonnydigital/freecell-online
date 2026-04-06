'use client';

/**
 * AuthorByline — small inline attribution rendered at the top of articles.
 *
 * Displays author name, publication/update dates, and optional reviewer.
 * Links to the author profile page only when the hub owns the author route
 * (i.e. only on solitairestack.com). On spoke domains the name renders as
 * plain text so we don't cross-link to a 404.
 */

import Link from "next/link";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/siteConfig";
import { isOwnedBy } from "@/lib/routeOwnership";

interface AuthorBylineProps {
  authorSlug: string;
  publishedDate?: string;
  updatedDate?: string;
  reviewedBySlug?: string;
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

function initialsFor(name: string): string {
  const words = name.trim().split(/\s+/).slice(0, 2);
  return words.map((word) => word.charAt(0).toUpperCase()).join("") || "?";
}

interface AvatarProps {
  name: string;
  avatarUrl: string;
}

function Avatar({ name, avatarUrl }: AvatarProps) {
  // Images don't exist yet on disk — render initial fallback by default,
  // layered with an <img> that will cover the initials IF the file loads.
  return (
    <span
      className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D4AF37]/20 text-[10px] font-semibold text-[#D4AF37]"
      aria-hidden="true"
    >
      <span>{initialsFor(name)}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatarUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    </span>
  );
}

export default function AuthorByline({
  authorSlug,
  publishedDate,
  updatedDate,
  reviewedBySlug,
}: AuthorBylineProps) {
  const author = getAuthor(authorSlug);
  if (!author) return null;

  const reviewer = reviewedBySlug ? getAuthor(reviewedBySlug) : undefined;

  const authorHref = `/authors/${author.slug}`;
  const canLinkAuthor = isOwnedBy(authorHref, siteConfig.key);
  const reviewerHref = reviewer ? `/authors/${reviewer.slug}` : undefined;
  const canLinkReviewer =
    reviewerHref !== undefined && isOwnedBy(reviewerHref, siteConfig.key);

  const publishedLabel = publishedDate ? formatDate(publishedDate) : undefined;
  const updatedLabel =
    updatedDate && updatedDate !== publishedDate
      ? formatDate(updatedDate)
      : undefined;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/60 leading-relaxed">
      <Avatar name={author.name} avatarUrl={author.avatarUrl} />
      <span>
        By{" "}
        {canLinkAuthor ? (
          <Link
            href={authorHref}
            className="font-medium text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
          >
            {author.name}
          </Link>
        ) : (
          <span className="font-medium text-white/75">{author.name}</span>
        )}
      </span>

      {publishedLabel && (
        <>
          <span aria-hidden="true" className="text-white/30">·</span>
          <span>
            Published <time dateTime={publishedDate}>{publishedLabel}</time>
          </span>
        </>
      )}

      {updatedLabel && updatedDate && (
        <>
          <span aria-hidden="true" className="text-white/30">·</span>
          <span>
            Updated <time dateTime={updatedDate}>{updatedLabel}</time>
          </span>
        </>
      )}

      {reviewer && reviewerHref && (
        <>
          <span aria-hidden="true" className="text-white/30">·</span>
          <span>
            Reviewed by{" "}
            {canLinkReviewer ? (
              <Link
                href={reviewerHref}
                className="font-medium text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                {reviewer.name}
              </Link>
            ) : (
              <span className="font-medium text-white/75">{reviewer.name}</span>
            )}
          </span>
        </>
      )}
    </div>
  );
}
