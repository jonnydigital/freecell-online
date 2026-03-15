interface CardSectionProps {
  id?: string;
  children: React.ReactNode;
  variant?: "felt" | "dark";
  className?: string;
  style?: React.CSSProperties;
}

export default function CardSection({
  id,
  children,
  variant = "felt",
  className = "",
  style,
}: CardSectionProps) {
  const scrollClass = id ? "scroll-mt-6" : "";

  if (variant === "dark") {
    return (
      <section id={id} className={scrollClass}>
        <div
          className={`rounded-xl bg-white/[0.04] border border-white/[0.07] overflow-hidden ${className}`}
          style={style}
        >
          {children}
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={scrollClass}>
      <div
        className={`card-panel ${className}`}
        style={{
          borderTop: "1px solid rgba(184, 134, 11, 0.08)",
          ...style,
        }}
      >
        {children}
      </div>
    </section>
  );
}
