import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type TagTone = 'accent' | 'muted' | 'outline';

type TagProps = {
  children: ReactNode;
  tone?: TagTone;
  className?: string;
};

const toneClasses: Record<TagTone, string> = {
  accent: 'border-accent text-accent',
  muted: 'border-accent-soft text-accent-soft',
  outline: 'border-line text-ink-secondary',
};

/**
 * Rectangular "stamped" tag/badge — replaces the old `rounded-full` pill
 * tags used across portfolio/blog/pricing. Deliberately sharp corners: the
 * contrast against the soft-cornered `Panel` is the system's signature.
 */
export default function Tag({ children, tone = 'outline', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-none border px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
