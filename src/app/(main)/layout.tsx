import { Suspense } from "react";
import Script from "next/script";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import ThemeInitializer from "@/components/ThemeInitializer";
import AccessibilityInitializer from "@/components/AccessibilityInitializer";
import SiteFooter from "@/components/SiteFooter";
import ScrollDebugOverlay from "@/components/ScrollDebugOverlay";
import { siteConfig } from "@/lib/siteConfig";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a href="#game-container" className="skip-to-game">
        Skip to game
      </a>
      <ThemeInitializer />
      <AccessibilityInitializer />
      <Analytics />
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3083538874906149"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
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
      {children}
      <SiteFooter />
      <Suspense fallback={null}><ScrollDebugOverlay /></Suspense>
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
    </>
  );
}
