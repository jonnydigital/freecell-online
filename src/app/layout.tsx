import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: './',
  },
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  keywords: [
    "freecell",
    "freecell online",
    "play freecell",
    "freecell solitaire",
    "free card game",
    "solitaire online",
    "no download",
  ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0a3d0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.appleWebAppTitle} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Blocking theme script — applies CSS vars before first paint to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme-name')||'Classic Green';var m={'Classic Green':{base:'#0e4020',dark:'#0a3310',mid:'#125a2a',accent:'#1f6e22',accentHover:'#2a8a2d',border:'#2a7c2a',panel:'#0d2f0d',felt:'#0a3d0a',feltLight:'#1a5c1a'},'Royal Blue':{base:'#0b1929',dark:'#081428',mid:'#122d52',accent:'#1a3a6e',accentHover:'#25508e',border:'#2a5a9e',panel:'#0e1e38',felt:'#0d1f3d',feltLight:'#1a3a6e'},'Wine Red':{base:'#2e0a14',dark:'#280812',mid:'#521222',accent:'#6e1a30',accentHover:'#8e2545',border:'#9e2a48',panel:'#350c18',felt:'#3d0d1a',feltLight:'#6e1a30'},'Dark Mode':{base:'#141420',dark:'#121220',mid:'#222238',accent:'#2a2a4e',accentHover:'#3a3a6e',border:'#3a3a6e',panel:'#18182c',felt:'#1a1a2e',feltLight:'#2a2a4e'},'Slate':{base:'#232829',dark:'#1e2324',mid:'#383f42',accent:'#4a5154',accentHover:'#5a6366',border:'#5a6366',panel:'#282e30',felt:'#2d3436',feltLight:'#4a5154'}};var c=m[t]||m['Classic Green'];var r=document.documentElement.style;r.setProperty('--theme-base',c.base);r.setProperty('--theme-dark',c.dark);r.setProperty('--theme-mid',c.mid);r.setProperty('--theme-accent',c.accent);r.setProperty('--theme-accent-hover',c.accentHover);r.setProperty('--theme-border',c.border);r.setProperty('--theme-panel',c.panel);r.setProperty('--felt-color',c.felt);r.setProperty('--felt-color-light',c.feltLight);}catch(e){}})()`
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
