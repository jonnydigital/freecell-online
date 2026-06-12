import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import AdSenseScript from "@/components/AdSenseScript";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const metadataKeywords =
  siteConfig.key === "playklondikeonline"
    ? [
        "klondike",
        "klondike solitaire",
        "klondike online",
        "play klondike",
        "classic solitaire",
        "solitaire online",
        "no download",
      ]
    : siteConfig.key === "playspidersolitaireonline"
      ? [
          "spider solitaire",
          "spider solitaire online",
          "play spider solitaire",
          "1 suit spider solitaire",
          "4 suit spider solitaire",
          "solitaire online",
          "no download",
        ]
      : siteConfig.key === "solitairestack"
        ? [
            "solitaire",
            "solitaire games",
            "solitaire online",
            "free solitaire",
            "card games",
            "no download",
          ]
        : [
            "freecell",
            "freecell online",
            "play freecell",
            "freecell solitaire",
            "free card game",
            "solitaire online",
            "no download",
          ];

// Use Next's Viewport API instead of a manual <meta name="viewport"> tag.
// With a manual tag, Next 13+ ALSO injects its default viewport meta
// (width=device-width, initial-scale=1) after ours; the later tag wins and
// silently drops viewport-fit=cover, breaking safe-area-inset-* CSS on
// notched iPhones. Found in QA 2026-06-12 (duplicate viewport tags in SSR).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a3d0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  // Self-referential canonical: the relative './' is resolved by Next.js
  // per-page against metadataBase + pathname, so each page that inherits this
  // default gets its OWN URL as canonical (e.g. /strategy -> host/strategy).
  // Never hard-code an absolute root URL here — that points every inheriting
  // page at the homepage and collapses the site to its root in Google's index.
  // Guarded by scripts/audit-canonicals.mjs (root layout check); see QA report
  // 2026-05-21. Pages needing a cross-domain owner canonical set their own.
  alternates: {
    canonical: './',
  },
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  keywords: metadataKeywords,
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.siteName,
  url: siteConfig.url,
  foundingDate: "2026-01-15",
  founder: {
    "@type": "Person",
    name: "J. Foye",
    url: `${siteConfig.url}/authors/j-foye`,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Editorial",
    email: siteConfig.privacyEmail,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.appleWebAppTitle} />
        <meta name="google-adsense-account" content="ca-pub-3083538874906149" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Blocking theme script — applies CSS vars before first paint to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme-name')||'Classic Green';var m={'Classic Green':{base:'#0e4020',dark:'#0a3310',mid:'#125a2a',accent:'#1f6e22',accentHover:'#2a8a2d',border:'#2a7c2a',panel:'#0d2f0d',felt:'#0a3d0a',feltLight:'#1a5c1a'},'Royal Blue':{base:'#0b1929',dark:'#081428',mid:'#122d52',accent:'#1a3a6e',accentHover:'#25508e',border:'#2a5a9e',panel:'#0e1e38',felt:'#0d1f3d',feltLight:'#1a3a6e'},'Wine Red':{base:'#2e0a14',dark:'#280812',mid:'#521222',accent:'#6e1a30',accentHover:'#8e2545',border:'#9e2a48',panel:'#350c18',felt:'#3d0d1a',feltLight:'#6e1a30'},'Dark Mode':{base:'#141420',dark:'#121220',mid:'#222238',accent:'#2a2a4e',accentHover:'#3a3a6e',border:'#3a3a6e',panel:'#18182c',felt:'#1a1a2e',feltLight:'#2a2a4e'},'Slate':{base:'#232829',dark:'#1e2324',mid:'#383f42',accent:'#4a5154',accentHover:'#5a6366',border:'#5a6366',panel:'#282e30',felt:'#2d3436',feltLight:'#4a5154'}};var c=m[t]||m['Classic Green'];var r=document.documentElement.style;r.setProperty('--theme-base',c.base);r.setProperty('--theme-dark',c.dark);r.setProperty('--theme-mid',c.mid);r.setProperty('--theme-accent',c.accent);r.setProperty('--theme-accent-hover',c.accentHover);r.setProperty('--theme-border',c.border);r.setProperty('--theme-panel',c.panel);r.setProperty('--felt-color',c.felt);r.setProperty('--felt-color-light',c.feltLight);}catch(e){}})()`
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className}`}>
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
