import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedFaq from '@/components/marketing/AnimatedFaq';

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mx-auto max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-secondary">{lede}</p>
    </header>
  );
}

export function QuoteBand({
  title = 'Tell us what you want to build.',
  text = 'You will get a written scope, usually within one business day. No price list on the site, and no obligation to continue.',
  className = 'mt-20',
}: {
  title?: string;
  text?: string;
  className?: string;
}) {
  return (
    <section className={`${className} overflow-hidden rounded-[2rem] border border-line bg-surface px-8 py-14 text-ink md:px-14 md:py-16`}>
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">{text}</p>
        <Button href="/contact" variant="primary" size="lg" className="mt-8">
          Request a free quote <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return <AnimatedFaq items={items} />;
}

export function FaqSchema({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `https://24xdev.co.uk${path}`,
    provider: {
      '@type': 'ProfessionalService',
      name: '24xDev',
      url: 'https://24xdev.co.uk',
    },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const serviceLinks = [
  { href: '/services/websites', label: 'Websites' },
  { href: '/services/ai', label: 'AI & automation' },
  { href: '/services/commerce', label: 'Commerce' },
  { href: '/services/platforms', label: 'Platforms' },
];

export function RelatedServices({ current }: { current: string }) {
  return (
    <div className="mt-16">
      <p className="text-sm font-medium text-ink">Other ways we can help</p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {serviceLinks
          .filter((link) => link.href !== current)
          .map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink transition-colors hover:border-accent"
              >
                {link.label} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
