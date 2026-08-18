'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

/**
 * Sticky, gently-pulsing "Get a Free Quote" button. Appears once the
 * visitor has scrolled a little way down the page, hidden on /contact
 * (since that page already is the quote form), and dismissible.
 */
export default function FloatingCTA() {
  const pathname = usePathname();
  const [pastFold, setPastFold] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastFold(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // /singh is Gurmanpreet's separate, unlinked personal portfolio — it
  // must never surface the 24xDev "Get a Free Quote" business CTA.
  const hideOnThisPage = pathname === '/contact' || pathname?.startsWith('/singh');
  const visible = pastFold && !dismissed && !hideOnThisPage;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss quote button"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X className="h-3 w-3" />
          </button>
          <Link
            href="/contact"
            className="cta-glow animate-float group flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 px-5 py-3.5 text-sm font-black text-white dark:text-black shadow-xl shadow-cyan-500/30 transition-transform hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" />
            Get a Free Quote
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
