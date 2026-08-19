import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Pricing | Fixed-Scope Web & AI Quotes, UK-Wide',
  description:
    'Transparent starting prices in GBP for websites, e-commerce, AI automation and dashboards — from a Sheffield studio serving clients across the UK.',
  alternates: { canonical: '/pricing' },
};

const tiers = [
  {
    name: 'Launch',
    price: '£1,500',
    suffix: 'starting from',
    desc: 'A fast, polished website for businesses that need a strong first impression online.',
    features: [
      'Up to 5 custom-designed pages',
      'Built on Next.js — no page builders',
      'Mobile-first, fully responsive',
      'Basic on-page SEO setup',
      'Contact / enquiry form',
    ],
    highlight: false,
  },
  {
    name: 'Growth',
    price: '£4,500',
    suffix: 'starting from',
    desc: 'For businesses that need a full web app, online store, or a site with real functionality.',
    features: [
      'Everything in Launch, plus:',
      'Web app or e-commerce build',
      'CMS or admin panel included',
      'Payment / booking integration',
      'Technical SEO & performance tuning',
      '30 days of post-launch support',
    ],
    highlight: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    suffix: 'tailored quote',
    desc: 'Custom AI automation, dashboards, or multi-phase builds — scoped around your goals.',
    features: [
      'Everything in Growth, plus:',
      'AI / LLM integration & automation',
      'Custom dashboards & internal tools',
      'Ongoing retainer support available',
      'Dedicated architecture planning',
    ],
    highlight: false,
  },
];

const faqs = [
  {
    q: 'Are these prices fixed, or hourly?',
    a: 'Fixed. Once we scope your project on a discovery call, you get one clear price for the agreed deliverables — no surprise hourly overruns.',
  },
  {
    q: 'Do prices include VAT?',
    a: 'Prices shown are starting guide prices, excluding VAT. Your formal quote will show the full breakdown.',
  },
  {
    q: 'What if my project doesn’t fit neatly into a tier?',
    a: 'Most don’t. These tiers are a starting reference — every quote is tailored to your specific requirements after a free discovery call.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. Most projects are split into milestone payments (typically deposit, midpoint, and delivery) so cost lines up with progress.',
  },
  {
    q: 'Do you work with businesses outside Sheffield?',
    a: 'Yes — we work remotely with clients across the whole UK, with calls and screen-shares in place of in-person meetings where needed.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function PricingPage() {
  return (
    <div className="bg-paper px-6 py-20 transition-colors duration-300 md:py-28">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-center">Pricing</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Clear pricing. No surprises.
          </h1>
          <p className="mt-4 text-ink-secondary">
            Every project gets a fixed-scope quote after a free discovery call. The guide prices below show where
            most projects start.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:items-start">
          {tiers.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 0.1}>
              <div
                className={cn(
                  'relative flex h-full flex-col border p-8',
                  tier.highlight ? 'border-accent bg-surface lg:-translate-y-4' : 'border-line bg-surface',
                )}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 border border-ink bg-accent px-4 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-accent-ink">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                )}
                <h2 className="font-display text-lg font-semibold text-ink">{tier.name}</h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold text-ink">{tier.price}</span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-secondary">{tier.suffix}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{tier.desc}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-ink">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
                <Button href="/contact" variant={tier.highlight ? 'primary' : 'secondary'} className="mt-8">
                  Get a Free Quote <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-24 max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
              Pricing questions, answered.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {faqs.map((item, idx) => (
              <Reveal key={item.q} delay={idx * 0.05}>
                <details className="group border border-line bg-surface p-6 open:border-accent">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-ink">
                    {item.q}
                    <span className="shrink-0 font-mono text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
