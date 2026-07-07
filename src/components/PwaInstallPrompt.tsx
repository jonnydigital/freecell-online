'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, Plus, Smartphone, X } from 'lucide-react';
import {
  trackPwaInstallCtaView,
  trackPwaInstallDismiss,
  trackPwaInstallPromptOpen,
  trackPwaInstallResult,
} from '@/lib/analytics';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export interface PwaInstallCopy {
  title: string;
  description: string;
  button: string;
  iosTitle: string;
  iosDescription: string;
  iosButton: string;
  dismissLabel: string;
}

interface PwaInstallPromptProps {
  copy: PwaInstallCopy;
  surface: 'sidebar' | 'home-overlay';
  className?: string;
}

const DISMISS_KEY = 'pwa_install_cta_dismissed_at';
const DISMISS_DAYS = 14;

function isStandaloneDisplay(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function isIosSafariLike(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const isTouchMac = platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;
  return /iPad|iPhone|iPod/.test(ua) || isTouchMac;
}

function isRecentlyDismissed(): boolean {
  try {
    const dismissedAt = Number(window.localStorage.getItem(DISMISS_KEY) || 0);
    if (!dismissedAt) return false;
    return Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export default function PwaInstallPrompt({ copy, surface, className = '' }: PwaInstallPromptProps) {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [prompting, setPrompting] = useState(false);

  useEffect(() => {
    if (isStandaloneDisplay() || isRecentlyDismissed()) return;

    setDismissed(false);
    setShowIosHelp(isIosSafariLike());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setShowIosHelp(false);
      setDismissed(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const mode = installEvent ? 'prompt' : showIosHelp ? 'ios-help' : 'hidden';
  const visible = !dismissed && (installEvent || showIosHelp);

  useEffect(() => {
    if (visible) trackPwaInstallCtaView(surface, mode);
  }, [mode, surface, visible]);

  const cardCopy = useMemo(() => {
    if (showIosHelp && !installEvent) {
      return {
        title: copy.iosTitle,
        description: copy.iosDescription,
        button: copy.iosButton,
        icon: <Smartphone size={18} />,
      };
    }

    return {
      title: copy.title,
      description: copy.description,
      button: copy.button,
      icon: <Download size={18} />,
    };
  }, [copy, installEvent, showIosHelp]);

  if (!visible) return null;

  const handleInstall = async () => {
    if (!installEvent) return;
    setPrompting(true);
    trackPwaInstallPromptOpen(surface, mode);

    try {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      trackPwaInstallResult(surface, mode, choice.outcome);
      setInstallEvent(null);
      if (choice.outcome === 'accepted') setDismissed(true);
    } finally {
      setPrompting(false);
    }
  };

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // Ignore storage failures; dismissal can still work for this session.
    }
    trackPwaInstallDismiss(surface, mode);
    setDismissed(true);
  };

  return (
    <div
      className={`rounded-[18px] border border-[#D4AF37]/25 bg-[#D4AF37]/10 p-3 shadow-[0_16px_32px_rgba(0,0,0,0.18)] ${className}`}
      role="region"
      aria-label={cardCopy.title}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#103615]">
          {cardCopy.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold text-[#f2d36a]">{cardCopy.title}</h3>
            <button
              type="button"
              onClick={handleDismiss}
              className="-mr-1 -mt-1 rounded-full p-1 text-white/35 transition-colors hover:bg-white/10 hover:text-white/70"
              aria-label={copy.dismissLabel}
            >
              <X size={14} />
            </button>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-white/58">{cardCopy.description}</p>
          {installEvent ? (
            <button
              type="button"
              onClick={handleInstall}
              disabled={prompting}
              className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#103615] transition-colors hover:bg-[#e7c65b] disabled:cursor-wait disabled:opacity-70"
            >
              <Download size={14} />
              {cardCopy.button}
            </button>
          ) : (
            <div className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white/68">
              <Plus size={14} />
              {cardCopy.button}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
