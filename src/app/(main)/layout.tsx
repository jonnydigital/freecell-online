import { Suspense } from "react";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import ThemeInitializer from "@/components/ThemeInitializer";
import AccessibilityInitializer from "@/components/AccessibilityInitializer";
import FreecellNavigationReload from "@/components/FreecellNavigationReload";
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
      <FreecellNavigationReload />
      <ThemeInitializer />
      <AccessibilityInitializer />
      <Analytics />
      {/* AdSense — use plain script to avoid Next.js data-nscript attribute warning */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3083538874906149"
        crossOrigin="anonymous"
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
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(reg) {
                  // Check for updates every 10 minutes (not 60s — avoids mid-game reloads)
                  setInterval(function() { reg.update(); }, 600000);
                }).catch(function() {});

                // Listen for SW_UPDATED message — defer reload until user is idle
                var updatePending = false;
                navigator.serviceWorker.addEventListener('message', function(event) {
                  if (event.data && event.data.type === 'SW_UPDATED') {
                    updatePending = true;
                    // Only auto-reload on next page navigation or when tab becomes visible after being hidden
                  }
                });
                // Reload on visibility change (user returns to tab) if update is pending
                document.addEventListener('visibilitychange', function() {
                  if (updatePending && document.visibilityState === 'visible') {
                    window.location.reload();
                  }
                });
                // Also reload on New Deal click or route change (natural break points)
                window.__swUpdatePending = function() { return updatePending; };
              });
            }
          `,
        }}
      />
    </>
  );
}
