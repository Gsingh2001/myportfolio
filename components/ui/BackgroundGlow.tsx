'use client';

import { usePathname } from 'next/navigation';

export default function BackgroundGlow() {
  const pathname = usePathname();

  // /singh is Gurmanpreet's separate, unlinked personal portfolio — it uses
  // a plain white background, not the 24xDev cyan grid/glow treatment.
  if (pathname?.startsWith('/singh')) return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-cyan-600/10 to-blue-600/5 blur-[130px]" />
    </>
  );
}
