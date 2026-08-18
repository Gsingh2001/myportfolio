'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * Thin gradient progress bar fixed to the top of the viewport, filling as
 * the visitor scrolls down the page. Purely cosmetic, but it's the kind of
 * detail that makes a site feel polished and alive.
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
  // free of the 24xDev cyan branding touches.
  if (pathname?.startsWith('/singh')) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
    />
  );
}
