import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

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
    <div className="px-6 py-20 md:py-28 bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Pricing</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white sm:text-5xl transition-colors duration-300">
            Clear pricing. No surprises.
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 transition-colors duration-300">
            Every project gets a fixed-scope quote after a free discovery call. The guide prices below show where
            most projects start.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:items-start">
          {tiers.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 0.1} scale={tier.highlight}>
              <div
                className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                  tier.highlight
                    ? 'border-cyan-400 dark:border-cyan-500/50 bg-white dark:bg-slate-900/60 shadow-xl dark:shadow-cyan-500/10 lg:-translate-y-4 hover:lg:-translate-y-5'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-cyan-300 dark:hover:border-cyan-500/40'
                }`}
              >
                {tier.highlight && (
                  <span className="cta-glow absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                )}
                <h2 className="text-lg font-black text-slate-900 dark:text-white">{tier.name}</h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{tier.price}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">{tier.suffix}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{tier.desc}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-black transition-all ${
                    tier.highlight
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 text-white dark:text-black shadow-lg shadow-cyan-500/20 hover:scale-[1.02]'
                      : 'border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
                  }`}
                >
                  Get a Free Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-center text-2xl font-black text-slate-900 dark:text-white sm:text-3xl transition-colors duration-300">
              Pricing questions, answered.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {faqs.map((item, idx) => (
              <Reveal key={item.q} delay={idx * 0.05}>
                <details className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 transition-colors duration-300 open:border-cyan-300 dark:open:border-cyan-500/40">
                  <summary className="cursor-pointer list-none font-bold text-slate-900 dark:text-white flex items-center justify-between gap-4">
                    {item.q}
                    <span className="shrink-0 text-cyan-600 dark:text-cyan-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
