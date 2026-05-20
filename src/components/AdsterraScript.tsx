'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const ADSTERRA_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSTERRA_PUBLISHER_ID;
const CONSENT_KEY = 'cookie_consent';

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

/**
 * Adsterra display-banner loader. Renders nothing unless
 * NEXT_PUBLIC_ADSTERRA_PUBLISHER_ID is set in the deployment environment.
 * Display-only by design — the 65+ solitaire audience bounces hard on
 * popunder / push / interstitial formats. Display-only is the only format
 * that should be enabled for these sites.
 */
export default function AdsterraScript() {
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

  if (!ADSTERRA_PUBLISHER_ID || !enabled) return null;

  return (
    <Script
      id="adsterra-display"
      strategy="afterInteractive"
      src={`https://www.profitabledisplaynetwork.com/${ADSTERRA_PUBLISHER_ID}/invoke.js`}
    />
  );
}
