'use client';

import { usePathname } from 'next/navigation';

/**
 * Fixed, ambient backdrop for the whole business site — a faint ink graph-
 * paper grid, replacing the old blurred cyan/blue glow orbs. Filename kept
 * as-is (BackgroundGlow) to avoid touching its one import site in
 * app/layout.tsx; only the visual content changed.
 */
export default function BackgroundGlow() {
  const pathname = usePathname();

  // /singh is Gurmanpreet's separate, unlinked personal portfolio — it uses
  // a plain white background, not the 24xDev grid treatment.
  if (pathname?.startsWith('/singh')) return null;

  return <div className="grid-texture pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden="true" />;
}
