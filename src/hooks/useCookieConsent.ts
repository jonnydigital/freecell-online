'use client';

import { useSyncExternalStore } from 'react';

const CONSENT_KEY = 'cookie_consent';

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

function subscribe(onStoreChange: () => void): () => void {
  const onConsentChange = () => onStoreChange();
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY) onStoreChange();
  };

  window.addEventListener('cookie-consent-change', onConsentChange);
  window.addEventListener('storage', onStorage);

  return () => {
    window.removeEventListener('cookie-consent-change', onConsentChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function useCookieConsent(): boolean {
  return useSyncExternalStore(subscribe, hasConsent, () => false);
}
