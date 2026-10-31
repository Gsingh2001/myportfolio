import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero, QuoteBand } from '@/components/marketing/Sections';

export const metadata: Metadata = {
  title: 'Services | Websites, AI, Commerce & Platforms',
  description:
    'What 24xDev builds for UK businesses: websites, AI automation, commerce and internal platforms. Start with a free quote from the London studio.',
  alternates: { canonical: '/services' },
};

const services = [
  {
    href: '/services/websites',
    index: '01',
    title: 'Websites',
    text: 'Company sites, campaign sites and product marketing pages. Fast, editable, and structured so search engines and visitors both understand the offer.',
    points: ['Marketing and brochure sites', 'Headless content so your team can publish', 'Technical SEO and performance as part of the build'],
  },
  {
    href: '/services/ai',
    index: '02',
    title: 'AI & automation',
    text: 'Practical AI: assistants that answer from your material, and automations that move data between the systems you already pay for.',
    points: ['Support and internal assistants', 'Document and inbox extraction', 'A clear view of where AI will not help'],
  },
  {
    href: '/services/commerce',
    index: '03',
    title: 'Commerce',
    text: 'Stores that feel like the brand, with payments, UK VAT and an admin experience your team can run without a developer on the line.',
    points: ['Custom storefronts', 'Stripe and catalogue integrations', 'Checkout designed for mobile traffic'],
  },
  {
    href: '/services/platforms',
    index: '04',
    title: 'Platforms',
    text: 'The tools behind the website: dashboards, client portals and operational software that replaces a pile of spreadsheets.',
    points: ['Role-based access', 'Reporting your team will actually open', 'PostgreSQL-backed systems you own'],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-transparent px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <PageHero
          eyebrow="Services"
          title="Work that has a job to do."
          lede="Most enquiries are one of four shapes. If yours sits between them, say so — the quote is written for the project, not forced into a package."
        />

        <div className="mt-16 space-y-4">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group grid gap-6 rounded-3xl border border-line bg-surface p-8 transition-colors hover:border-accent md:grid-cols-[120px_1fr_1fr] md:items-start md:p-10"
            >
              <span className="font-mono text-sm text-ink-secondary">{service.index}</span>
              <div>
                <h2 className="font-display text-3xl font-semibold text-ink group-hover:text-accent">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{service.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <ul className="space-y-3 text-sm text-ink">
                {service.points.map((point) => (
                  <li key={point} className="border-t border-line pt-3">
                    {point}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>

        <QuoteBand
          title="Not sure which one it is?"
          text="Describe the outcome. We will tell you which shape of work it is, and what a sensible first version includes."
        />
      </div>
    </div>
  );
}
