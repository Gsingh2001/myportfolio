'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import Button from '@/components/ui/Button';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
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
    <header className="sticky top-0 z-50 border-b border-line bg-paper transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded border-2 border-ink font-mono text-base font-black text-ink">
            24
          </span>
          <span className="font-display text-2xl font-semibold text-ink">
            x<span className="text-accent">Dev</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-mono text-xs font-semibold uppercase tracking-wider text-ink-secondary transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE: THEME TOGGLE + CTA + MOBILE TOGGLE */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Button href="/contact" variant="primary" size="sm" className="hidden sm:inline-flex">
            Get a Quote
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded border border-line text-ink lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {open && (
        <div className="border-t border-line bg-paper px-6 py-6 transition-colors duration-300 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-3 font-mono text-sm font-semibold uppercase tracking-wide text-ink hover:bg-surface-alt"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button href="/contact" variant="primary" size="md" className="mt-4 w-full" onClick={() => setOpen(false)}>
            Get a Quote
          </Button>
        </div>
      )}
    </header>
  );
}
