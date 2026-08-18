'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'Why Us' },
  { href: '/tech', label: 'Tech Stack' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // /singh is Gurmanpreet's separate, unlinked personal portfolio — it has
  // its own self-contained nav/footer and must never show the 24xDev
  // business chrome.
  if (pathname?.startsWith('/singh')) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 dark:border-slate-800/80 dark:bg-[#07080c]/80 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 font-mono text-lg font-black text-black shadow-lg shadow-cyan-500/20">
            24
          </span>
          <span className="text-slate-900 dark:text-white transition-colors">
            x<span className="text-cyan-600 dark:text-cyan-400">Dev</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-slate-600 hover:text-cyan-600 dark:text-slate-300 transition-colors dark:hover:text-cyan-400"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE: THEME TOGGLE + CTA + MOBILE TOGGLE */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/contact"
            className="group relative hidden items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white dark:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 sm:inline-flex"
          >
            <span>Get a Quote</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-6 dark:border-slate-800 dark:bg-[#07080c] lg:hidden transition-colors duration-300">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white dark:text-black"
          >
            Get a Quote <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
