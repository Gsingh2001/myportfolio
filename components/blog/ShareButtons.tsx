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
      <span className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink-secondary">
        <Share2 className="h-3.5 w-3.5" /> Share
      </span>
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded border border-line px-4 py-1.5 font-mono text-xs font-bold text-ink-secondary transition-colors hover:border-accent hover:text-accent"
      >
        X
      </a>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded border border-line px-4 py-1.5 font-mono text-xs font-bold text-ink-secondary transition-colors hover:border-accent hover:text-accent"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1.5 rounded border border-line px-4 py-1.5 font-mono text-xs font-bold text-ink-secondary transition-colors hover:border-accent hover:text-accent"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-accent" /> Copied
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
