interface ContentPillProps {
  href: string;
  icon?: string;
  children: React.ReactNode;
  active?: boolean;
}

export default function ContentPill({
  href,
  icon,
  children,
  active,
}: ContentPillProps) {
  const isRedSuit = icon === "\u2665" || icon === "\u2666"; // heart or diamond

  return (
    <a
      href={href}
      className={`min-h-[38px] px-5 py-2 text-sm rounded-full border border-[#D4AF37]/30 bg-transparent text-[#D4AF37] tracking-wide flex items-center gap-2 transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 whitespace-nowrap shrink-0${
        active ? " bg-[#D4AF37]/10 border-[#D4AF37]/50" : ""
      }`}
    >
      {icon && (
        <span className={`text-sm${isRedSuit ? " text-red-400" : ""}`}>
          {icon}
        </span>
      )}
      {children}
    </a>
  );
}
