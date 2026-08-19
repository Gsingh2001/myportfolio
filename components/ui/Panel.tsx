import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type PanelPadding = 'sm' | 'md' | 'lg';

type PanelProps = {
  as?: ElementType;
  interactive?: boolean;
  padding?: PanelPadding;
  className?: string;
  children: ReactNode;
};

const paddingClasses: Record<PanelPadding, string> = {
  sm: 'p-5',
  md: 'p-7 md:p-8',
  lg: 'p-8 md:p-12',
};

/**
 * Flat bordered container — the sitewide replacement for the old ad hoc
 * `rounded-3xl border ...` card markup. No shadow by default; pass
 * `interactive` for the hard-offset "stamp" hover effect on clickable cards.
 */
export default function Panel({ as: Tag = 'div', interactive, padding = 'md', className, children }: PanelProps) {
  return (
    <Tag
      className={cn(
        'rounded border border-line bg-surface',
        paddingClasses[padding],
        interactive && 'stamp-shadow',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
