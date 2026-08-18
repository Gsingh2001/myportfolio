import type { Metadata } from 'next';
import { Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import QuoteForm from '@/components/ui/QuoteForm';
import Reveal from '@/components/ui/Reveal';

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
    <div className="px-6 py-20 md:py-28 bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Get a Free Quote</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white sm:text-5xl transition-colors duration-300">
            Let&apos;s scope your project.
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
            Tell us a little about what you&apos;re building and we&apos;ll come back with a clear, fixed-scope quote
            — usually within 1 business day. No obligation, no sales pressure.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 sm:p-10 transition-colors duration-300 shadow-sm dark:shadow-none">
              <QuoteForm />
            </div>
          </Reveal>

          <Reveal delay={0.2} className="space-y-6">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/40 p-7 transition-colors duration-300">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Contact details
                </h2>
                <ul className="mt-5 space-y-5">
                  {infoItems.map((item) => (
                    <li key={item.label} className="group flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-semibold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/10 p-7 transition-colors duration-300">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Prefer email? Send project details straight to{' '}
                  <a href="mailto:contact@24xdev.co.uk" className="font-bold text-cyan-700 dark:text-cyan-400 hover:underline">
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
