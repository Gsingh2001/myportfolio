'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'cookie-consent-ack';

export default function CookieConsent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (privacy mode, blocked, etc.) — just skip the banner
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore — not critical if this can't persist
    }
    setVisible(false);
  };

  // /singh has its own self-contained chrome and shouldn't show 24xDev's banner.
  if (pathname?.startsWith('/singh')) return null;
  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-3 rounded-2xl border border-slate-800 bg-[#0a0b0f]/95 p-5 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center">
        <Cookie className="h-5 w-5 shrink-0 text-cyan-400" />
        <p className="flex-1 text-sm text-slate-300">
          We use privacy-friendly, cookieless analytics to understand traffic — no ad trackers,
          ever. See our{' '}
          <Link href="/privacy" className="font-semibold text-cyan-400 hover:underline">
            Privacy Policy
          </Link>{' '}
          for details.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-black text-black transition-transform hover:scale-105"
        >
          Got it <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
