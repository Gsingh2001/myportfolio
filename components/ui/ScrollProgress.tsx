'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * Thin solid progress bar fixed to the top of the viewport, filling as the
 * visitor scrolls down the page. No gradient, no glow — a plain accent-
 * colour bar in keeping with the "Drafting Table" system.
 */
export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // /singh is Gurmanpreet's separate, unlinked personal portfolio — keep it
  // free of the 24xDev branding touches.
  if (pathname?.startsWith('/singh')) return null;

  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-accent" />;
}
