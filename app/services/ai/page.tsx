import type { Metadata } from 'next';
import { FaqList, FaqSchema, PageHero, QuoteBand, RelatedServices, ServiceSchema } from '@/components/marketing/Sections';

export const metadata: Metadata = {
  title: 'AI Automation for UK Businesses',
  description:
    'Practical AI for UK companies: assistants grounded in your documents, and automations that remove repetitive admin. A free quote from a London studio.',
  alternates: { canonical: '/services/ai' },
};

const faqs = [
  {
    q: 'Will this replace our team?',
    a: 'No. The useful projects take a narrow, repetitive task — answering the same question, reading the same kind of document — and hand a draft or a structured result back to a person.',
  },
  {
    q: 'Does the assistant use the public internet?',
    a: 'Only if that is what you want. Most of the assistants we build answer from your own material: policies, product docs, previous replies. If it does not know, it should say so.',
  },
  {
    q: 'Can you connect this to the software we already use?',
    a: 'Yes, when that software has an API or a reliable export. The quote names the systems in scope so integration work is not a surprise later.',
  },
];

export default function AiPage() {
  return (
    <div className="bg-transparent px-6 py-20 md:py-28">
      <ServiceSchema
        name="AI and workflow automation"
        description="Document-grounded assistants and business automations for UK companies."
        path="/services/ai"
      />
      <FaqSchema items={faqs} />
      <div className="mx-auto max-w-3xl">
        <PageHero
          eyebrow="AI & automation"
          title="Use AI where it removes work, not where it adds a demo."
          lede="We build assistants and automations for UK businesses that already know which task is wasting the week. The result is a tool your team trusts, because it is narrow and checkable."
        />

        <div className="mt-14 space-y-6 leading-relaxed text-ink-secondary">
          <p>
            A good AI project is usually smaller than the first conversation suggests. Someone is copying figures out
            of PDFs. Support is answering the same policy question. A salesperson is rewriting the same follow-up.
            We pick one of those, design the input and the output, and put a person in the loop where a mistake
            would matter.
          </p>
          <p>
            Assistants are grounded in your material. That might be a knowledge base, a folder of procedures, or the
            history of how your team already replies. Retrieval is set up so an answer can point back to the source.
            Automations sit beside that: read an email or a file, extract the fields you care about, and write them
            into the system of record.
          </p>
          <p>
            We will also tell you when a model is the wrong tool. Some jobs are a form, a report, or a clearer
            process. The written quote separates the experiment from the thing you can rely on in a normal week.
          </p>
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold text-ink">Typical builds</h2>
        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink">
          {[
            'A support or staff assistant that answers from approved documents.',
            'Extraction from invoices, applications or inbound email into structured records.',
            'A review step, so a person confirms anything that leaves the building.',
            'Logging, so you can see what the system did and correct it.',
          ].map((item) => (
            <li key={item} className="border-t border-line pt-3">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-2xl font-semibold text-ink">Questions</h2>
        <FaqList items={faqs} />
        <RelatedServices current="/services/ai" />
        <QuoteBand title="Have a task you would like taken off the team?" />
      </div>
    </div>
  );
}
