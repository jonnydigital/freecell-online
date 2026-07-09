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

// All four network domains. `sameAs` on every site + `parentOrganization` on
// spokes tells Google the properties are one publisher entity (the Solitaire
// Stack network) rather than unrelated look-alike sites.
const NETWORK_URLS = [
  "https://solitairestack.com",
  "https://playfreecellonline.com",
  "https://playklondikeonline.com",
  "https://playspidersolitaireonline.com",
];

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
  sameAs: NETWORK_URLS.filter((url) => url !== siteConfig.url),
  ...(siteConfig.key !== "solitairestack" && {
    parentOrganization: {
      "@type": "Organization",
      name: "Solitaire Stack",
      url: "https://solitairestack.com",
    },
  }),
};

const initialHtmlLangScript = `(function(){try{var p=location.pathname;var lang=p.indexOf('/freecell-en-espanol')===0?'es':p.indexOf('/freecell-en-francais')===0?'fr':p.indexOf('/freecell-auf-deutsch')===0?'de':p.indexOf('/freecell-in-italiano')===0?'it':p.indexOf('/freecell-em-portugues')===0?'pt':'en';document.documentElement.lang=lang;}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="initial-html-lang"
          dangerouslySetInnerHTML={{ __html: initialHtmlLangScript }}
        />
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
            __html: `(function(){try{var themeId=localStorage.getItem('theme-id');var themeName=localStorage.getItem('theme-name');var themes={'classic-green':{base:'#0e4020',dark:'#0a3310',mid:'#125a2a',accent:'#1f6e22',accentHover:'#2a8a2d',border:'#2a7c2a',panel:'#0d2f0d',felt:'#0a3d0a',feltLight:'#1a5c1a'},'royal-blue':{base:'#0b1929',dark:'#081428',mid:'#122d52',accent:'#1a3a6e',accentHover:'#25508e',border:'#2a5a9e',panel:'#0e1e38',felt:'#0d1f3d',feltLight:'#1a3a6e'},'wine-red':{base:'#2e0a14',dark:'#280812',mid:'#521222',accent:'#6e1a30',accentHover:'#8e2545',border:'#9e2a48',panel:'#350c18',felt:'#3d0d1a',feltLight:'#6e1a30'},'dark-mode':{base:'#141420',dark:'#121220',mid:'#222238',accent:'#2a2a4e',accentHover:'#3a3a6e',border:'#3a3a6e',panel:'#18182c',felt:'#1a1a2e',feltLight:'#2a2a4e'},'slate':{base:'#232829',dark:'#1e2324',mid:'#383f42',accent:'#4a5154',accentHover:'#5a6366',border:'#5a6366',panel:'#282e30',felt:'#2d3436',feltLight:'#4a5154'}};var legacy={'Classic Green':'classic-green','Royal Blue':'royal-blue','Wine Red':'wine-red','Dark Mode':'dark-mode','Slate':'slate'};var c=themes[themeId||legacy[themeName]||'classic-green']||themes['classic-green'];var backs={'classic-blue':{bg:'#163a74',pattern:'rgba(255, 255, 255, 0.13)',border:'rgba(255, 255, 255, 0.28)',rimLight:'#f6f4ec',rimDark:'#d8d4c6',sheen:'rgba(255, 255, 255, 0.09)',hi:'rgba(255, 255, 255, 0.1)',lo:'rgba(255, 255, 255, 0.015)'},'casino-red':{bg:'#8b1a1a',pattern:'rgba(255, 215, 0, 0.14)',border:'rgba(255, 215, 0, 0.42)',rimLight:'#fff3d2',rimDark:'#c5a34a',sheen:'rgba(255, 225, 160, 0.12)',hi:'rgba(255, 215, 0, 0.16)',lo:'rgba(120, 25, 20, 0.08)'},'forest-green':{bg:'#1a4a2a',pattern:'rgba(110, 210, 120, 0.13)',border:'rgba(125, 210, 130, 0.32)',rimLight:'#edf7e7',rimDark:'#9fb88d',sheen:'rgba(190, 255, 190, 0.08)',hi:'rgba(140, 220, 145, 0.13)',lo:'rgba(10, 60, 25, 0.08)'},midnight:{bg:'#0a0e2a',pattern:'rgba(185, 200, 255, 0.13)',border:'rgba(150, 170, 255, 0.3)',rimLight:'#ecefff',rimDark:'#7982aa',sheen:'rgba(200, 210, 255, 0.11)',hi:'rgba(185, 200, 255, 0.13)',lo:'rgba(5, 8, 30, 0.08)'},'royal-purple':{bg:'#2a1048',pattern:'rgba(210, 180, 255, 0.13)',border:'rgba(255, 215, 0, 0.34)',rimLight:'#f5edff',rimDark:'#a98ad1',sheen:'rgba(220, 190, 255, 0.1)',hi:'rgba(255, 215, 0, 0.14)',lo:'rgba(40, 16, 70, 0.08)'},'sunset-orange':{bg:'#c04020',pattern:'rgba(255, 230, 170, 0.14)',border:'rgba(255, 220, 150, 0.4)',rimLight:'#fff0d8',rimDark:'#c98955',sheen:'rgba(255, 210, 130, 0.13)',hi:'rgba(255, 230, 170, 0.16)',lo:'rgba(120, 20, 40, 0.08)'},'ocean-wave':{bg:'#0a3050',pattern:'rgba(80, 210, 230, 0.14)',border:'rgba(80, 200, 220, 0.32)',rimLight:'#e7fbff',rimDark:'#7faec0',sheen:'rgba(120, 230, 245, 0.1)',hi:'rgba(90, 210, 230, 0.14)',lo:'rgba(5, 40, 70, 0.08)'},'carbon-fiber':{bg:'#1a1a1a',pattern:'rgba(255, 255, 255, 0.08)',border:'rgba(255, 255, 255, 0.18)',rimLight:'#ededed',rimDark:'#8d8d8d',sheen:'rgba(255, 255, 255, 0.08)',hi:'rgba(255, 255, 255, 0.09)',lo:'rgba(0, 0, 0, 0.12)'}};var b=backs[localStorage.getItem('freecell-card-back')||'classic-blue']||backs['classic-blue'];var r=document.documentElement.style;r.setProperty('--theme-base',c.base);r.setProperty('--theme-dark',c.dark);r.setProperty('--theme-mid',c.mid);r.setProperty('--theme-accent',c.accent);r.setProperty('--theme-accent-hover',c.accentHover);r.setProperty('--theme-border',c.border);r.setProperty('--theme-panel',c.panel);r.setProperty('--felt-color',c.felt);r.setProperty('--felt-color-light',c.feltLight);r.setProperty('--card-back-bg',b.bg);r.setProperty('--card-back-pattern',b.pattern);r.setProperty('--card-back-border',b.border);r.setProperty('--card-back-rim-light',b.rimLight);r.setProperty('--card-back-rim-dark',b.rimDark);r.setProperty('--card-back-sheen',b.sheen);r.setProperty('--card-back-medallion-hi',b.hi);r.setProperty('--card-back-medallion-lo',b.lo);}catch(e){}})()`
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
