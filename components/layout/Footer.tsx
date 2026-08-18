'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin } from 'lucide-react';

const columns = [
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'Why Us' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/tech', label: 'Tech Stack' },
    ],
  },
  {
    title: 'Work with us',
    links: [
      { href: '/services', label: 'Services' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/contact', label: 'Get a Quote' },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  // /singh is Gurmanpreet's separate, unlinked personal portfolio — it has
  // its own self-contained nav/footer and must never show the 24xDev
  // business chrome (which itself links back to the business site).
  if (pathname?.startsWith('/singh')) return null;

  return (
    <footer className="relative z-10 border-t border-slate-900 bg-[#050608] px-6 py-16 text-slate-400">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-400 font-mono text-xs font-black text-black">
                24
              </span>
              <span>
                x<span className="text-cyan-400">Dev</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              A Sheffield, UK based software engineering studio building high-performance websites, AI automation
              and custom dashboards for ambitious businesses.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href="mailto:contact@24xdev.co.uk" className="flex items-center gap-2 hover:text-cyan-400">
                <Mail className="h-4 w-4" /> contact@24xdev.co.uk
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Sheffield, South Yorkshire, UK
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">{col.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-cyan-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 text-xs sm:flex-row">
          <p>&copy; {new Date().getFullYear()} 24xDev (24xdev.co.uk). Based in Sheffield, UK. Led by Gurmanpreet Singh.</p>
          <p>Built with Next.js, deployed on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
