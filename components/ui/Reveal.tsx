'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Set true for a subtle scale-in instead of a slide-up */
  scale?: boolean;
  /** Lift a few pixels on hover. Use on cards, not on paragraphs. */
  lift?: boolean;
};

/**
 * Scroll-triggered fade + slide-in. Initial styles are constant so the server
 * HTML matches the first client render. Branching on prefers-reduced-motion
 * here hydrates differently, because that media query is only known in the browser.
 */
export default function Reveal({ children, delay = 0, y = 24, className, scale = false, lift = false }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: scale ? 0.98 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={lift ? { y: -4 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
