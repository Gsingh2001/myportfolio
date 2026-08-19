'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin } from 'lucide-react';
import NewsletterForm from '@/components/ui/NewsletterForm';

const columns = [
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'Why Us' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/tech', label: 'Tech Stack' },
      { href: '/blog', label: 'Blog' },
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
    <footer className="relative z-10 border-t border-line bg-paper px-6 py-16 text-ink-secondary transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1.4fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink">
              <span className="flex h-7 w-7 items-center justify-center rounded border-2 border-ink font-mono text-xs font-black">
                24
              </span>
              <span>
                x<span className="text-accent">Dev</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              A Sheffield, UK based software engineering studio building high-performance websites, AI automation
              and custom dashboards for ambitious businesses.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href="mailto:contact@24xdev.co.uk" className="flex items-center gap-2 hover:text-accent">
                <Mail className="h-4 w-4" /> contact@24xdev.co.uk
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Sheffield, South Yorkshire, UK
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ink-secondary">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ink-secondary">
              Stay in the loop
            </h3>
            <p className="mt-4 text-sm leading-relaxed">
              Occasional notes on new projects, blog posts and what we&apos;re building. No spam.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs sm:flex-row">
          <p>&copy; {new Date().getFullYear()} 24xDev (24xdev.co.uk). Based in Sheffield, UK. Led by Gurmanpreet Singh.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-accent">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent">Terms of Service</Link>
            <p>Built with Next.js, deployed on Vercel.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
