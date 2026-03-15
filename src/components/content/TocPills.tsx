import ContentPill from "./ContentPill";

interface TocPillsProps {
  items: Array<{ href: string; icon: string; label: string }>;
}

export default function TocPills({ items }: TocPillsProps) {
  return (
    <nav className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 mb-12">
      <div className="flex md:flex-wrap md:justify-center gap-3 overflow-x-auto no-scrollbar pb-1">
        {items.map((item) => (
          <ContentPill key={item.href} href={item.href} icon={item.icon}>
            {item.label}
          </ContentPill>
        ))}
      </div>
    </nav>
  );
}
