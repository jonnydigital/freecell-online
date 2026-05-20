'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const CONSENT_KEY = 'cookie_consent';
const ADSENSE_CLIENT_ID = 'ca-pub-3083538874906149';

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

export default function AdSenseScript() {
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

  if (!enabled) return null;

  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
