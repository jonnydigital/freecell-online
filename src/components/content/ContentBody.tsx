interface ContentBodyProps {
  children: React.ReactNode;
  className?: string;
  variant?: "felt" | "dark";
}

export default function ContentBody({
  children,
  className = "",
  variant = "felt",
}: ContentBodyProps) {
  if (variant === "dark") {
    return (
      <div
        className={`px-8 sm:px-10 md:px-12 pt-4 pb-8 text-white/70 leading-relaxed ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`relative z-[11] px-8 sm:px-10 md:px-12 pt-4 pb-8 text-[#444444] leading-relaxed ${className}`}
    >
      {children}
    </div>
  );
}
