'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { List } from 'lucide-react';
import type { TocHeading } from '@/lib/content';

export default function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: [0, 1] },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded border border-line bg-surface p-5 lg:block">
      <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-ink-secondary">
        <List className="h-3.5 w-3.5" /> On this page
      </p>
      <ul className="mt-4 space-y-1 border-l border-line">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={clsx(
                'block border-l-2 py-1.5 text-sm leading-snug transition-colors',
                heading.level === 3 ? 'pl-7' : 'pl-4',
                activeId === heading.id
                  ? '-ml-px border-accent font-semibold text-accent'
                  : '-ml-px border-transparent text-ink-secondary hover:text-ink',
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
