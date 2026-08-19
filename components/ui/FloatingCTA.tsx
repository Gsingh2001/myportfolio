'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

/**
 * Sticky "Get a Free Quote" button. Appears once the visitor has scrolled a
 * little way down the page, hidden on /contact (since that page already is
 * the quote form), and dismissible.
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss quote button"
            className="flex h-6 w-6 items-center justify-center rounded border border-line bg-surface text-ink-secondary transition-colors hover:text-ink"
          >
            <X className="h-3 w-3" />
          </button>
          <Link
            href="/contact"
            className="stamp-shadow flex items-center gap-2 rounded bg-accent px-5 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-accent-ink transition-colors hover:bg-accent-hover"
          >
            <MessageCircle className="h-4 w-4" />
            Get a Free Quote
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
