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
};

/**
 * Scroll-triggered fade + slide-in wrapper, used to give every page the same
 * dynamic, "alive" feel as the homepage without duplicating framer-motion
 * boilerplate everywhere.
 */
export default function Reveal({ children, delay = 0, y = 24, className, scale = false }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
