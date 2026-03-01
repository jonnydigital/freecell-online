import ContentHeader from "./ContentHeader";
import Footer from "./Footer";

interface ContentLayoutProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
}

export default function ContentLayout({ children, variant = "dark" }: ContentLayoutProps) {
  const isDark = variant === "dark";

  return (
    <div className={`h-screen overflow-y-auto scroll-smooth ${isDark ? "felt-bg" : "bg-white"}`}>
      <ContentHeader variant={variant} />
      {children}
      <Footer variant={variant} />
    </div>
  );
}
