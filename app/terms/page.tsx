import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import Panel from '@/components/ui/Panel';

export const metadata: Metadata = {
  title: 'Terms of Service | 24xDev',
  description: 'The terms that govern use of the 24xDev website and our services.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

const lastUpdated = '18 August 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-secondary">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-paper px-6 py-20 transition-colors duration-300 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-ink-secondary">Last updated: {lastUpdated}</p>

          <div className="mt-6 rounded border border-accent bg-surface-alt p-5 text-sm leading-relaxed text-ink-secondary">
            This is a general-purpose template, not legal advice, and hasn&apos;t been reviewed by a
            solicitor. Have it checked by a qualified professional before relying on it, and make
            sure it matches the actual contract terms you agree with clients for paid work.
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <Panel padding="lg" className="mt-10">
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
                <a href="mailto:contact@24xdev.co.uk" className="font-semibold text-accent hover:underline">
                  contact@24xdev.co.uk
                </a>
                .
              </p>
            </Section>
          </Panel>
        </Reveal>
      </div>
    </div>
  );
}
