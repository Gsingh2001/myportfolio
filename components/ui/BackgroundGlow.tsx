'use client';

import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Fixed backdrop. The colour fields move with scroll so the page has depth.
 * /singh keeps its own plain background.
 */
export default function BackgroundGlow() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const yA = useTransform(scrollY, [0, 1400], [0, -220]);
  const yB = useTransform(scrollY, [0, 1400], [0, 160]);
  const yC = useTransform(scrollY, [0, 1400], [0, -90]);
  const xA = useTransform(scrollY, [0, 1400], [0, 80]);

  if (pathname?.startsWith('/singh')) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div style={{ y: yA, x: xA }} className="aurora-orb aurora-orb-a" />
      <motion.div style={{ y: yB }} className="aurora-orb aurora-orb-b" />
      <motion.div style={{ y: yC }} className="aurora-orb aurora-orb-c" />
      <div className="grid-texture absolute inset-0 opacity-[0.35]" />
      <div className="grain absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-paper/30 via-transparent to-paper" />
    </div>
  );
}
