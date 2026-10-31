import type { Metadata } from 'next';
import { FaqList, FaqSchema, PageHero, QuoteBand, RelatedServices, ServiceSchema } from '@/components/marketing/Sections';

export const metadata: Metadata = {
  title: 'Website Design & Development for UK Businesses',
  description:
    'Custom websites for UK companies, built in Next.js by a London studio. Fast pages, a CMS your team can use, and a free quote before any work starts.',
  alternates: { canonical: '/services/websites' },
};

const faqs = [
  {
    q: 'Do you rebuild existing sites or only start from scratch?',
    a: 'Both. Many projects replace a WordPress or page-builder site that has become slow or hard to edit. Others are a first proper site for a company that has outgrown a template.',
  },
  {
    q: 'Can our team update the content?',
    a: 'Yes. Where you need to publish without a developer, we integrate a headless CMS and leave you with a simple editing path, plus documentation.',
  },
  {
    q: 'Is search engine optimisation included?',
    a: 'Technical foundations are part of the build: sensible structure, metadata, performance, and structured data where it helps. Ongoing content marketing is a separate conversation.',
  },
];

export default function WebsitesPage() {
  return (
    <div className="bg-transparent px-6 py-20 md:py-28">
      <ServiceSchema
        name="Website design and development"
        description="Custom marketing and company websites for UK businesses."
        path="/services/websites"
      />
      <FaqSchema items={faqs} />
      <div className="mx-auto max-w-3xl">
        <PageHero
          eyebrow="Websites"
          title="A site that explains the business, then gets out of the way."
          lede="We design and build company websites for organisations that are tired of templates. The page should load quickly, say the right thing, and make the next step obvious."
        />

        <div className="mt-14 space-y-6 text-base leading-relaxed text-ink-secondary">
          <p>
            A website project at 24xDev starts with the commercial job of the page, not a theme. Who is it for, what
            should they understand in the first screen, and what should they do next. From there we design a small
            set of templates and build them as a custom Next.js site, so you are not inheriting someone else’s plugin
            stack.
          </p>
          <p>
            Performance and structure are part of the same job. Pages are server-rendered, images are sized properly,
            and headings, metadata and internal links are planned so search engines can read the site the way a
            person does. If your team needs to publish news, case notes or service pages, we add a CMS and keep the
            editing model narrow on purpose.
          </p>
          <p>
            Typical work includes a full company site, a campaign or product landing system, a migration off
            WordPress, and a redesign that keeps the content worth keeping. You see the site on a staging link while
            it is being built. At handover you own the repository, the domain and the hosting account.
          </p>
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold text-ink">What a website engagement usually includes</h2>
        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink">
          {[
            'A short discovery conversation and a written scope before design starts.',
            'Page structure, messaging hierarchy and a visual system for the site.',
            'A production build in Next.js, responsive across current phones and desktops.',
            'Forms that reach your inbox, analytics you can actually read, and a launch checklist.',
            'Documentation, and the option of a care arrangement after go-live.',
          ].map((item) => (
            <li key={item} className="border-t border-line pt-3">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-2xl font-semibold text-ink">Questions</h2>
        <FaqList items={faqs} />
        <RelatedServices current="/services/websites" />
        <QuoteBand title="Planning a new site, or a replacement?" />
      </div>
    </div>
  );
}
