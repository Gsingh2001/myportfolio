import type { Metadata } from 'next';
import { FaqList, FaqSchema, PageHero, QuoteBand, RelatedServices, ServiceSchema } from '@/components/marketing/Sections';

export const metadata: Metadata = {
  title: 'E-commerce Development for UK Brands',
  description:
    'Custom online stores for UK brands: fast storefronts, Stripe payments and UK VAT-aware checkout. Request a free quote from 24xDev in London.',
  alternates: { canonical: '/services/commerce' },
};

const faqs = [
  {
    q: 'Do you work with Shopify, or only custom builds?',
    a: 'Both are legitimate. If a well-configured platform will do the job, we will say so. Custom storefronts are for brands that need a checkout, catalogue or content model the platform is fighting.',
  },
  {
    q: 'Can you handle UK VAT?',
    a: 'Yes. Checkout flows are designed around UK VAT, including the information your finance team needs to reconcile. The exact rules depend on what you sell and where, and we confirm that in the scope.',
  },
  {
    q: 'Who runs the shop day to day?',
    a: 'Your team. We build the admin path for products, orders and content, and we document it. You should not need us to change a price.',
  },
];

export default function CommercePage() {
  return (
    <div className="bg-transparent px-6 py-20 md:py-28">
      <ServiceSchema
        name="E-commerce development"
        description="Custom storefronts and checkout experiences for UK brands."
        path="/services/commerce"
      />
      <FaqSchema items={faqs} />
      <div className="mx-auto max-w-3xl">
        <PageHero
          eyebrow="Commerce"
          title="A shop that feels like the brand, and settles like a proper business."
          lede="We build online stores for UK companies that have outgrown a generic theme. The storefront, the checkout and the admin are treated as one product."
        />

        <div className="mt-14 space-y-6 leading-relaxed text-ink-secondary">
          <p>
            Most of the money on a store is decided on a phone, on a slow connection, with a thumb. We design the
            path from product to payment around that, then make the desktop experience just as clear. Catalogue,
            content and checkout share one visual system so the shop does not feel bolted onto a brochure site.
          </p>
          <p>
            Payments are integrated properly, commonly through Stripe, with the order record your team and your
            accountant can follow. UK VAT is part of the design, not a plugin added the week before launch. If you
            already have stock, fulfilment or a finance system, the scope names those connections up front.
          </p>
          <p>
            We are careful about platform choice. A custom build is worth it when the buying experience, the
            catalogue rules or the content are the advantage. When they are not, we would rather configure something
            simpler and spend the effort on the parts customers actually touch.
          </p>
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold text-ink">What we pay attention to</h2>
        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink">
          {[
            'Product pages that answer the question and load quickly.',
            'A checkout with as few surprises as the business allows.',
            'Admin your team can use for catalogue, orders and content.',
            'A handover that includes how refunds, tax and failed payments are handled.',
          ].map((item) => (
            <li key={item} className="border-t border-line pt-3">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-2xl font-semibold text-ink">Questions</h2>
        <FaqList items={faqs} />
        <RelatedServices current="/services/commerce" />
        <QuoteBand title="Replacing a store, or opening the first one?" />
      </div>
    </div>
  );
}
