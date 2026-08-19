import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type EyebrowProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * Small mono uppercase section label — replaces the old rounded "eyebrow
 * pill" markup. Plain text, no pill/badge decoration.
 */
export default function Eyebrow({ children, as: Tag = 'p', className }: EyebrowProps) {
  return (
    <Tag className={cn('font-mono text-xs font-bold uppercase tracking-[0.14em] text-accent', className)}>
      {children}
    </Tag>
  );
}
