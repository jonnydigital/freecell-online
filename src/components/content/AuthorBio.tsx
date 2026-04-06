'use client';

/**
 * AuthorBio — larger end-of-article card with the author's short bio.
 *
 * Rendered after the article body to reinforce the E-E-A-T signal. Links
 * to the full profile page only on the hub; on spoke domains the "Read
 * more" link is omitted.
 */

import Link from "next/link";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/siteConfig";
import { isOwnedBy } from "@/lib/routeOwnership";

interface AuthorBioProps {
  authorSlug: string;
  variant?: "default" | "compact";
}

function initialsFor(name: string): string {
  const words = name.trim().split(/\s+/).slice(0, 2);
  return words.map((word) => word.charAt(0).toUpperCase()).join("") || "?";
}

interface AvatarProps {
  name: string;
  avatarUrl: string;
  size: "lg" | "md";
}

function Avatar({ name, avatarUrl, size }: AvatarProps) {
  const sizing =
    size === "lg"
      ? "h-16 w-16 text-lg"
      : "h-12 w-12 text-sm";
  return (
    <span
      className={`relative inline-flex ${sizing} shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D4AF37]/20 font-semibold text-[#D4AF37]`}
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

export default function AuthorBio({
  authorSlug,
  variant = "default",
}: AuthorBioProps) {
  const author = getAuthor(authorSlug);
  if (!author) return null;

  const profileHref = `/authors/${author.slug}`;
  const canLink = isOwnedBy(profileHref, siteConfig.key);
  const isCompact = variant === "compact";

  return (
    <aside
      className={`rounded-xl border border-white/[0.08] bg-white/[0.03] ${
        isCompact ? "p-5" : "p-6 sm:p-7"
      }`}
    >
      <div className="flex items-start gap-4">
        <Avatar
          name={author.name}
          avatarUrl={author.avatarUrl}
          size={isCompact ? "md" : "lg"}
        />
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60">
            About the author
          </div>
          <h3
            className={`mt-1 font-semibold text-white ${
              isCompact ? "text-base" : "text-lg"
            }`}
          >
            {canLink ? (
              <Link
                href={profileHref}
                className="hover:text-[#D4AF37] hover:underline"
              >
                {author.name}
              </Link>
            ) : (
              author.name
            )}
          </h3>
          <div className="mt-0.5 text-xs text-white/60">{author.role}</div>

          {!isCompact && (
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {author.bioShort}
            </p>
          )}

          {author.expertise.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {author.expertise.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.06] px-2.5 py-0.5 text-[11px] text-[#D4AF37]/85"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {canLink && (
            <div className="mt-4">
              <Link
                href={profileHref}
                className="inline-flex items-center gap-1 text-sm font-medium text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                Read more about this desk
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
