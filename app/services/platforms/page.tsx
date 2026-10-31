import type { Metadata } from 'next';
import { FaqList, FaqSchema, PageHero, QuoteBand, RelatedServices, ServiceSchema } from '@/components/marketing/Sections';

export const metadata: Metadata = {
  title: 'Dashboards & Internal Tools for UK Teams',
  description:
    'Custom dashboards, client portals and operational software for UK businesses. Secure, owned by you, and scoped with a free quote.',
  alternates: { canonical: '/services/platforms' },
};

const faqs = [
  {
    q: 'Is this just a nicer spreadsheet?',
    a: 'Sometimes the right answer is to keep the spreadsheet. We build a platform when several people need the same live picture, when permissions matter, or when the data is already coming from more than one place.',
  },
  {
    q: 'Who can see what?',
    a: 'Roles are part of the design. Staff, managers and external clients can have different views. We agree those rules before the screens are built.',
  },
  {
    q: 'Where does the data live?',
    a: 'Typically in PostgreSQL on infrastructure in your name. You are not renting access to a tool we can switch off.',
  },
];

export default function PlatformsPage() {
  return (
    <div className="bg-transparent px-6 py-20 md:py-28">
      <ServiceSchema
        name="Dashboards and internal platforms"
        description="Operational dashboards, portals and internal software for UK teams."
        path="/services/platforms"
      />
      <FaqSchema items={faqs} />
      <div className="mx-auto max-w-3xl">
        <PageHero
          eyebrow="Platforms"
          title="Software for the people who run the business."
          lede="Dashboards, client portals and internal tools for teams that have outgrown inboxes and shared drives. Built around the job, then handed over as something you own."
        />

        <div className="mt-14 space-y-6 leading-relaxed text-ink-secondary">
          <p>
            Internal software fails when it is designed like a brochure. The people using it already know the work.
            They need fewer clicks, the right number on the first screen, and confidence that yesterday’s figure is
            the same one finance will see. We sit with that workflow before we draw a chart.
          </p>
          <p>
            A typical platform brings orders, stock, pipeline or service work into one place, with permissions that
            match the organisation. Client portals are the same idea facing outward: a customer logs in and sees the
            status, documents or requests that used to arrive by email. Underneath is a PostgreSQL database and an
            application your team can keep, not a stack of connected spreadsheets with a logo on top.
          </p>
          <p>
            We scope these in slices. A first version that a team will actually open is more useful than a model of
            the entire company. The quote says what the first release includes, and what can wait until it has been
            used for a month.
          </p>
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold text-ink">Common starting points</h2>
        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink">
          {[
            'An operations view of orders, jobs or stock.',
            'A client portal that replaces status emails.',
            'Reporting with role-based access for managers and staff.',
            'A careful import from the spreadsheets you are leaving behind.',
          ].map((item) => (
            <li key={item} className="border-t border-line pt-3">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-2xl font-semibold text-ink">Questions</h2>
        <FaqList items={faqs} />
        <RelatedServices current="/services/platforms" />
        <QuoteBand title="Describe the spreadsheet you are tired of." />
      </div>
    </div>
  );
}
