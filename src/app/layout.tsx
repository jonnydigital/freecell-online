import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Analytics from "../components/Analytics";
import CookieConsent from "../components/CookieConsent";
import ThemeInitializer from "../components/ThemeInitializer";
import AccessibilityInitializer from "../components/AccessibilityInitializer";
import SiteFooter from "../components/SiteFooter";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
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
  manifest: "/manifest.json",
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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3083538874906149" crossOrigin="anonymous"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": siteConfig.brandName,
              "url": siteConfig.url,
              "description": siteConfig.defaultDescription,
              "applicationCategory": "GameApplication",
              "operatingSystem": "Any",
              "browserRequirements": "Requires JavaScript",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": siteConfig.siteName
              },
              "genre": "Card Game",
              "gamePlatform": ["Web Browser", "Mobile Browser"]
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className}`}>
        <a href="#game-container" className="skip-to-game">
          Skip to game
        </a>
        <ThemeInitializer />
        <AccessibilityInitializer />
        <Analytics />
        {children}
        <SiteFooter />
        <CookieConsent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    // Check for updates every 60 seconds
                    setInterval(function() { reg.update(); }, 60000);
                  }).catch(function() {});

                  // Listen for SW_UPDATED message — auto-reload when new version lands
                  navigator.serviceWorker.addEventListener('message', function(event) {
                    if (event.data && event.data.type === 'SW_UPDATED') {
                      window.location.reload();
                    }
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
