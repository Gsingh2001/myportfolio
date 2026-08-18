import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Privacy Policy | 24xDev',
  description: 'How 24xDev collects, uses and protects your data.',
  alternates: { canonical: '/privacy' },
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

export default function PrivacyPage() {
  return (
    <div className="px-6 py-20 md:py-28 bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Legal</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">Last updated: {lastUpdated}</p>

          <div className="mt-6 rounded-2xl border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/10 p-5 text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            This is a general-purpose template, not legal advice. It hasn&apos;t been reviewed by a
            solicitor. Before relying on it for compliance with UK GDPR, the Data Protection Act
            2018 or other applicable law, have it checked by a qualified professional — especially
            once you know exactly what data your systems collect and process.
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-8 md:p-10 transition-colors duration-300">
          <Section title="Who we are">
            <p>
              24xDev is a software engineering studio based in Sheffield, South Yorkshire, United
              Kingdom. For any question about this policy or your data, email{' '}
              <a href="mailto:contact@24xdev.co.uk" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
                contact@24xdev.co.uk
              </a>
              .
            </p>
          </Section>

          <Section title="What we collect">
            <p>We only collect data you give us directly, through:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>The quote request form on /contact (name, email, phone, company, project details) — processed by our form provider, Formspree.</li>
              <li>The newsletter signup in our footer (email address only).</li>
              <li>Direct email or phone contact you initiate.</li>
            </ul>
          </Section>

          <Section title="Cookies & analytics">
            <p>
              We use Vercel Web Analytics and Vercel Speed Insights to understand traffic and site
              performance. Both are designed by Vercel to work without cookies and without storing
              personally identifiable information — they don&apos;t track you across other sites,
              and there is no advertising or retargeting pixel on this site.
            </p>
            <p>
              We do not use any third-party advertising cookies, and we don&apos;t sell or share
              your data with data brokers or advertisers.
            </p>
          </Section>

          <Section title="How we use your data">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>To respond to quote requests and enquiries.</li>
              <li>To send occasional updates if you subscribed to our newsletter (you can unsubscribe any time — reply to any email or contact us).</li>
              <li>To meet legal or accounting obligations, e.g. invoicing for work carried out.</li>
            </ul>
          </Section>

          <Section title="Who we share it with">
            <p>We use a small number of processors to run this site and our business:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li><span className="font-semibold text-slate-800 dark:text-slate-200">Vercel</span> — hosting, analytics and our Postgres database (via Neon).</li>
              <li><span className="font-semibold text-slate-800 dark:text-slate-200">Formspree</span> — processes quote-request form submissions.</li>
            </ul>
            <p>We don&apos;t sell your personal data to anyone, ever.</p>
          </Section>

          <Section title="How long we keep it">
            <p>
              Quote request and enquiry data is kept only as long as needed to respond to you and,
              where relevant, deliver and invoice for a project — typically no more than a few
              years after our last contact. Newsletter emails are kept until you unsubscribe.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Under UK GDPR, you have the right to access, correct, delete, or export the personal
              data we hold about you, and to object to or restrict certain processing. To exercise
              any of these, email{' '}
              <a href="mailto:contact@24xdev.co.uk" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
                contact@24xdev.co.uk
              </a>
              . If you&apos;re unhappy with how we&apos;ve handled your data, you can also complain
              to the UK Information Commissioner&apos;s Office (ICO) at ico.org.uk.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this policy as the site or our processors change. Material changes will
              update the &quot;Last updated&quot; date above.
            </p>
          </Section>
        </Reveal>
      </div>
    </div>
  );
}
