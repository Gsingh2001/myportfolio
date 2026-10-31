import type { Metadata } from 'next';
import { FaqList, FaqSchema, PageHero, QuoteBand } from '@/components/marketing/Sections';

export const metadata: Metadata = {
  title: 'Process | How a 24xDev Project Runs',
  description:
    'How a 24xDev engagement works: a conversation, a free written quote, a build you can see, and a handover you own. London studio, clients worldwide. Projects can ship in many languages.',
  alternates: { canonical: '/process' },
};

const phases = [
  {
    n: '01',
    title: 'Listen',
    text: 'A call or a written brief. We want the business outcome, the people who will use the thing, the deadline that is real, and anything that has already been tried. If we are the wrong studio, we say so here.',
  },
  {
    n: '02',
    title: 'Write it down',
    text: 'You receive a free quote: what will be built, what will not, how we will work, and a timeline. That document is the agreement to proceed. Nothing is billed as open-ended hours.',
  },
  {
    n: '03',
    title: 'Design the spine',
    text: 'Information architecture, key screens and the content model come before decoration. You see the structure early, while it is still cheap to change.',
  },
  {
    n: '04',
    title: 'Build where you can watch',
    text: 'Work lands on a staging environment. Check-ins are regular and short. The engineer on the call is the engineer in the repository.',
  },
  {
    n: '05',
    title: 'Launch, then leave you in charge',
    text: 'We ship to production, check the paths that matter, and hand over access, documentation and the repository. Care afterwards is available. It is not a condition of keeping the site online.',
  },
];

const faqs = [
  {
    q: 'Do we have to sign before the quote?',
    a: 'No. The quote is free. You decide whether the scope is the right next step.',
  },
  {
    q: 'How involved do we need to be?',
    a: 'Most at the start and near launch: decisions on content, access to the current site or data, and a single person who can answer questions. Weekly, not daily.',
  },
  {
    q: 'Can the scope change?',
    a: 'Yes, in writing. If something new is worth doing, we describe it and agree it. It does not appear as a surprise on an invoice.',
  },
];

export default function ProcessPage() {
  return (
    <div className="bg-transparent px-6 py-20 md:py-28">
      <FaqSchema items={faqs} />
      <div className="mx-auto max-w-3xl">
        <PageHero
          eyebrow="Process"
          title="Calm on purpose."
          lede="An engagement should feel like a sequence you can explain to a colleague. This is the sequence, from the first conversation to the day you own the result."
        />

        <ol className="mt-16 space-y-10">
          {phases.map((phase) => (
            <li key={phase.n} className="grid gap-3 border-t border-line pt-8 sm:grid-cols-[4rem_1fr]">
              <span className="font-mono text-sm text-accent">{phase.n}</span>
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">{phase.title}</h2>
                <p className="mt-3 leading-relaxed text-ink-secondary">{phase.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 font-display text-2xl font-semibold text-ink">What we need from you</h2>
        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink">
          {[
            'One person who can make decisions, even if others review.',
            'Access to the current site, brand files, and any systems we are connecting to.',
            'Honest constraints: legal, brand, deadline, and what must not change.',
            'Feedback on staging while there is still time to use it.',
          ].map((item) => (
            <li key={item} className="border-t border-line pt-3">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-2xl font-semibold text-ink">Questions</h2>
        <FaqList items={faqs} />
        <QuoteBand title="Start with the conversation." />
      </div>
    </div>
  );
}
