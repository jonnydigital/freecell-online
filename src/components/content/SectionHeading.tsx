interface SectionHeadingProps {
  children: React.ReactNode;
  id?: string;
  sub?: string;
  icon?: string;
  variant?: "felt" | "dark";
}

export default function SectionHeading({
  children,
  id,
  sub,
  icon,
  variant = "felt",
}: SectionHeadingProps) {
  if (variant === "dark") {
    return (
      <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-0">
        {sub && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 mb-1.5 block">
            {sub}
          </span>
        )}
        <h2
          id={id}
          className="text-2xl sm:text-3xl font-bold text-white scroll-mt-6"
        >
          {icon && <span className="mr-2 text-[#c9a84c]">{icon}</span>}
          {children}
        </h2>
        <div className="mt-4 h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative z-[11] px-8 sm:px-10 md:px-12 pt-8 sm:pt-10 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7a5c12] mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-[#2a2522] scroll-mt-6"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {icon && <span className="mr-2 text-[#8B6914]">{icon}</span>}
        {children}
      </h2>
      <div className="card-title-separator mt-4" />
    </div>
  );
}
