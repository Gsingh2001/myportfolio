import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Terms of Service | 24xDev',
  description: 'The terms that govern use of the 24xDev website and our services.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

const lastUpdated = '18 August 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-slate-200 dark:border-slate-800 py-8 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-black text-slate-900 dark:text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="px-6 py-20 md:py-28 bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Legal</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">Last updated: {lastUpdated}</p>

          <div className="mt-6 rounded-2xl border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/10 p-5 text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            This is a general-purpose template, not legal advice, and hasn&apos;t been reviewed by a
            solicitor. Have it checked by a qualified professional before relying on it, and make
            sure it matches the actual contract terms you agree with clients for paid work.
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-8 md:p-10 transition-colors duration-300">
          <Section title="Acceptance of these terms">
            <p>
              By using this website (24xdev.co.uk), you agree to these terms. If you don&apos;t
              agree, please don&apos;t use the site.
            </p>
          </Section>

          <Section title="About 24xDev">
            <p>
              24xDev is a software engineering studio based in Sheffield, UK, led by Gurmanpreet
              Singh, providing web development, AI automation and custom dashboard services.
            </p>
          </Section>

          <Section title="Quotes and project engagements">
            <p>
              Figures given via the quote form, this site, or in conversation are estimates only
              and not a binding offer until confirmed in writing in a separate proposal or contract
              that sets out scope, price, timeline and payment terms for that specific project.
              Nothing on this website constitutes a binding contract for services.
            </p>
          </Section>

          <Section title="Intellectual property">
            <p>
              The content, design and code of this website belong to 24xDev unless otherwise
              stated, and may not be copied or reused without permission. Intellectual property in
              work delivered under a paid client engagement is governed by that engagement&apos;s
              own written contract, not by this page.
            </p>
          </Section>

          <Section title="Acceptable use">
            <p>
              Don&apos;t use this site to submit false, malicious or unlawful content (including
              through the contact or newsletter forms), attempt to interfere with its operation, or
              attempt to access data or systems you&apos;re not authorised to access.
            </p>
          </Section>

          <Section title="No warranty; limitation of liability">
            <p>
              This website and its content are provided &quot;as is&quot;, without warranties of
              any kind, to the fullest extent permitted by law. 24xDev is not liable for any
              indirect or consequential loss arising from your use of this website. This does not
              limit liability for anything that can&apos;t be limited under English law, such as
              death or personal injury caused by negligence, or fraud.
            </p>
          </Section>

          <Section title="Governing law">
            <p>These terms are governed by the laws of England and Wales.</p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms:{' '}
              <a href="mailto:contact@24xdev.co.uk" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
                contact@24xdev.co.uk
              </a>
              .
            </p>
          </Section>
        </Reveal>
      </div>
    </div>
  );
}
