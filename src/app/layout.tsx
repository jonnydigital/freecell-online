import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Analytics from "../components/Analytics";
import CookieConsent from "../components/CookieConsent";
import ThemeInitializer from "../components/ThemeInitializer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Play FreeCell Online for Free | No Download Required",
  description:
    "Play FreeCell Solitaire online for free. No download, no signup. Classic Microsoft FreeCell deals, hints, undo, and more. Works on desktop and mobile.",
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
    title: "Play FreeCell Online for Free",
    description:
      "The best free FreeCell Solitaire game on the web. Classic deals, smooth gameplay, no signup required.",
    url: "https://playfreecellonline.com",
    siteName: "PlayFreeCellOnline.com",
    type: "website",
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
        <meta name="apple-mobile-web-app-title" content="FreeCell" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className}`}>
        <ThemeInitializer />
        <Analytics />
        {children}
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
