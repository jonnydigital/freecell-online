import Link from "next/link";

interface ContentLinkCardProps {
  href: string;
  title: string;
  description?: string;
  icon?: string;
  variant?: "felt" | "dark";
}

export default function ContentLinkCard({
  href,
  title,
  description,
  icon,
  variant = "dark",
}: ContentLinkCardProps) {
  if (variant === "felt") {
    return (
      <Link
        href={href}
        className="rounded-xl border border-[#e5e0d8] bg-[#faf6f0] p-5 hover:border-[#D4AF37]/30 transition-colors block group"
      >
        <div className="flex items-start gap-3">
          {icon && <span className="text-xl shrink-0">{icon}</span>}
          <div>
            <div className="text-lg font-semibold text-[#2a2522] group-hover:text-[#D4AF37]">
              {title}
            </div>
            {description && (
              <p className="mt-2 text-sm leading-7 text-[#444444]">
                {description}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 hover:border-[#D4AF37]/25 hover:bg-white/[0.06] transition-colors block group"
    >
      <div className="flex items-start gap-3">
        {icon && <span className="text-xl shrink-0">{icon}</span>}
        <div>
          <div className="text-lg font-semibold text-white">{title}</div>
          {description && (
            <p className="mt-2 text-sm leading-7 text-white/70">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
