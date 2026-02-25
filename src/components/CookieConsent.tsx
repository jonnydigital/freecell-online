'use client';

import { useState, useEffect } from 'react';

const CONSENT_KEY = 'cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        requestAnimationFrame(() => setVisible(true));
      } else if (consent === 'accepted') {
        loadAdSense();
      }
    } catch {
      // localStorage blocked
    }
  }, []);

  const handleAccept = () => {
    try { localStorage.setItem(CONSENT_KEY, 'accepted'); } catch {}
    setVisible(false);
    loadAdSense();
  };

  const handleDecline = () => {
    try { localStorage.setItem(CONSENT_KEY, 'declined'); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="mx-2 mb-2 md:mx-4 md:mb-4 bg-[#0d2b0d]/95 backdrop-blur-sm border border-[#1a5c1a]/40 rounded-xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 shadow-2xl">
        <p className="text-white/70 text-xs sm:text-sm flex-1">
          We use cookies to improve your experience and show relevant ads.{' '}
          <a href="/privacy" className="text-[#c9a84c] hover:text-[#D4AF37] underline underline-offset-2">
            Privacy Policy
          </a>
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="text-xs text-white/40 hover:text-white/70 transition-colors px-2 py-1"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 text-xs font-semibold bg-[#D4AF37] text-[#0a3d0a] rounded-lg hover:bg-[#c9a84c] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

function loadAdSense() {
  if (typeof window === 'undefined') return;
  if (document.querySelector('script[src*="adsbygoogle"]')) return;

  const script = document.createElement('script');
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX';
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}
