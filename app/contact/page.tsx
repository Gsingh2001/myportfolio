import type { Metadata } from 'next';
import { Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import QuoteForm from '@/components/ui/QuoteForm';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import Panel from '@/components/ui/Panel';

export const metadata: Metadata = {
  title: 'Get a Free Quote | Contact 24xDev',
  description:
    'Get a free, fixed-scope quote from a UK web development and AI team based in Sheffield — for businesses in Birmingham, London or anywhere else in the UK.',
  alternates: { canonical: '/contact' },
};

const infoItems = [
  { icon: Mail, label: 'Email', value: 'contact@24xdev.co.uk', href: 'mailto:contact@24xdev.co.uk' },
  { icon: MapPin, label: 'Location', value: 'Sheffield, South Yorkshire, UK' },
  { icon: Clock, label: 'Response time', value: 'Within 1 business day' },
  { icon: ShieldCheck, label: 'No-pressure quotes', value: 'Fixed-scope pricing, no obligation' },
];

export default function ContactPage() {
  return (
    <div className="bg-paper px-6 py-20 transition-colors duration-300 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>Get a Free Quote</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Let&apos;s scope your project.
          </h1>
          <p className="mt-4 leading-relaxed text-ink-secondary">
            Tell us a little about what you&apos;re building and we&apos;ll come back with a clear, fixed-scope quote
            — usually within 1 business day. No obligation, no sales pressure.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <Reveal delay={0.1}>
            <Panel padding="lg">
              <QuoteForm />
            </Panel>
          </Reveal>

          <Reveal delay={0.2} className="space-y-6">
            <div className="space-y-6">
              <Panel padding="md">
                <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-ink-secondary">
                  Contact details
                </h2>
                <ul className="mt-5 space-y-5">
                  {infoItems.map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink text-accent">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink-secondary">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-semibold text-ink hover:text-accent">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-ink">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>

              <div className="border border-accent bg-surface-alt p-7">
                <p className="text-sm leading-relaxed text-ink-secondary">
                  Prefer email? Send project details straight to{' '}
                  <a href="mailto:contact@24xdev.co.uk" className="font-bold text-accent hover:underline">
                    contact@24xdev.co.uk
                  </a>{' '}
                  and we&apos;ll reply just as quickly.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
