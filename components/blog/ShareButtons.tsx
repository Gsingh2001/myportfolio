'use client';

import { useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const twitterHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in this browser — the other share
      // options above still work, so fail silently here.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
        <Share2 className="h-3.5 w-3.5" /> Share
      </span>
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-cyan-500/40 dark:hover:text-cyan-400"
      >
        X
      </a>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-cyan-500/40 dark:hover:text-cyan-400"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-cyan-300 hover:text-cyan-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-cyan-500/40 dark:hover:text-cyan-400"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-cyan-500" /> Copied
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5" /> Copy link
          </>
        )}
      </button>
    </div>
  );
}
