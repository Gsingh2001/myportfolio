'use client';

import { motion } from 'framer-motion';

export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line bg-surface/60">
      <motion.div
        className="flex w-max gap-12 py-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-12 text-xs font-medium uppercase tracking-[0.22em] text-ink-secondary">
            {item}
            <span className="text-accent" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
