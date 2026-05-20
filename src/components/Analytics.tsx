'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { siteConfig } from '@/lib/siteConfig';

// Use site config first, fall back to env var for backward compatibility
const GA_MEASUREMENT_ID = siteConfig.gaMeasurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CONSENT_KEY = 'cookie_consent';

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

/**
 * Google Analytics 4 script component.
 * Uses the measurement ID from siteConfig (per-site) or NEXT_PUBLIC_GA_MEASUREMENT_ID env var.
 * Each site deployment (playfreecellonline.com, solitairestack.com) can have its own GA4 property.
 */
export default function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasConsent());

    const onConsentChange = () => setEnabled(hasConsent());
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY) setEnabled(hasConsent());
    };

    window.addEventListener('cookie-consent-change', onConsentChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('cookie-consent-change', onConsentChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  if (!GA_MEASUREMENT_ID || !enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}
