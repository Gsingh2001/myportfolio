'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/singh#about', label: 'About' },
  { href: '/singh#skills', label: 'Skills' },
  { href: '/singh#projects', label: 'Projects' },
  { href: '/singh#experience', label: 'Experience' },
  { href: '/singh#education', label: 'Education' },
  { href: '/singh#contact', label: 'Contact' },
];

export default function SinghNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onHome = pathname === '/singh';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || !onHome
          ? 'bg-white/80 backdrop-blur-md border-b border-[#eeeef0]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <Link
          href="/singh"
          className="flex items-center gap-2 font-semibold tracking-tight text-[#1a1a1f]"
          onClick={() => setOpen(false)}
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#1a1a1f] text-white text-sm">
            G
          </span>
          <span className="hidden sm:inline">Gurmanpreet Singh</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#5a5a66] hover:text-[#1a1a1f] transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/singh#contact"
          className="hidden md:inline-flex items-center text-sm font-medium px-4 py-2 rounded-full bg-[#1a1a1f] text-white hover:bg-[#494953] transition-colors"
        >
          Get in touch
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden p-2 -mr-2 text-[#1a1a1f]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#eeeef0] bg-white">
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-[#494953] hover:text-[#1a1a1f] py-1"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
