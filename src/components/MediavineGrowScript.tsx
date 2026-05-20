'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GROW_SITE_ID = process.env.NEXT_PUBLIC_MEDIAVINE_GROW_ID;
const CONSENT_KEY = 'cookie_consent';

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

/**
 * Mediavine Grow loader. Renders nothing unless NEXT_PUBLIC_MEDIAVINE_GROW_ID
 * is set in the deployment's environment. Once installed and 30 days of Grow
 * data has accumulated, the site qualifies to apply for Mediavine Journey.
 */
export default function MediavineGrowScript() {
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

  if (!GROW_SITE_ID || !enabled) return null;

  return (
    <Script
      id="mediavine-grow"
      strategy="afterInteractive"
      src={`https://scripts.mediavine.com/tags/${GROW_SITE_ID}.js`}
      data-noptimize="1"
      data-cfasync="false"
    />
  );
}
