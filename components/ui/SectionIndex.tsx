import { cn } from '@/lib/cn';

type SectionIndexProps = {
  index: number;
  total: number;
  label?: string;
  className?: string;
};

/**
 * The "01 / 06" drafting-sheet running index used at the top of every major
 * page section — a recurring structural motif for the "Drafting Table"
 * visual system. Purely presentational, no state.
 */
export default function SectionIndex({ index, total, label, className }: SectionIndexProps) {
  const num = String(index).padStart(2, '0');
  const of = String(total).padStart(2, '0');

  return (
    <div className={cn('mb-4 flex items-center gap-3', className)}>
      <span className="whitespace-nowrap font-mono text-xs tracking-widest text-ink-secondary">
        {num} / {of}
        {label ? ` — ${label}` : ''}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
