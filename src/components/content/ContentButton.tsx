import Link from "next/link";

interface ContentButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASSES = {
  sm: "min-h-[36px] px-4 py-2 text-xs",
  md: "min-h-[44px] px-6 py-2.5 text-sm",
  lg: "min-h-[48px] px-8 py-3 text-base",
} as const;

const BASE =
  "inline-flex items-center justify-center rounded-lg font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]";

export default function ContentButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ContentButtonProps) {
  const sizeClass = SIZE_CLASSES[size];

  if (variant === "primary") {
    return (
      <Link
        href={href}
        className={`${BASE} ${sizeClass} ${className}`}
        style={{
          background:
            "linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)",
          backgroundSize: "200% 100%",
          color: "#1a1a0a",
        }}
      >
        {children}
      </Link>
    );
  }

  if (variant === "secondary") {
    return (
      <Link
        href={href}
        className={`${BASE} ${sizeClass} border border-white/20 text-white/90 hover:bg-white/[0.08] ${className}`}
      >
        {children}
      </Link>
    );
  }

  // outline
  return (
    <Link
      href={href}
      className={`${BASE} ${sizeClass} border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 ${className}`}
    >
      {children}
    </Link>
  );
}
