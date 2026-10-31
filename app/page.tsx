import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import { FaqList, FaqSchema, QuoteBand } from '@/components/marketing/Sections';
import Marquee from '@/components/motion/Marquee';
import WorkCarousel from '@/components/motion/WorkCarousel';
import BookMeeting from '@/components/ui/BookMeeting';

const capabilities = [
  {
    index: '01',
    title: 'Websites',
    href: '/services/websites',
    text: 'Marketing sites and product sites built to load quickly, read clearly, and turn a visit into a conversation.',
  },
  {
    index: '02',
    title: 'AI & automation',
    href: '/services/ai',
    text: 'Assistants and workflows that sit inside the tools you already use, and take the repetitive work off the team.',
  },
  {
    index: '03',
    title: 'Commerce',
    href: '/services/commerce',
    text: 'Stores with a checkout that feels like the brand, including UK VAT and the payments stack you actually need.',
  },
  {
    index: '04',
    title: 'Platforms',
    href: '/services/platforms',
    text: 'Dashboards, portals and internal tools your staff will open every morning, because they match how the work really happens.',
  },
];

const steps = [
  { n: '01', title: 'A proper conversation', text: 'We start with the outcome you want, the constraints, and what “done” looks like. No deck, no pitch theatre.' },
  { n: '02', title: 'A written scope', text: 'You receive a free quote that names the work, the timeline and what sits outside it, before anyone starts building.' },
  { n: '03', title: 'Build in the open', text: 'A staging link, regular check-ins, and the same engineer from the first call through to launch.' },
  { n: '04', title: 'Handover you can keep', text: 'You own the code, the domain and the infrastructure. Support afterwards is available, and optional.' },
];

const engagements = [
  {
    kicker: 'Website',
    title: 'A corporate site that stopped feeling like a template',
    text: 'A WordPress build that had grown slow and fragile, replaced with a custom Next.js site structured for search and for the people who update it.',
  },
  {
    kicker: 'AI',
    title: 'Support questions answered from the company’s own knowledge',
    text: 'An assistant grounded in the client’s documents, so routine questions are handled before they become a ticket.',
  },
  {
    kicker: 'Operations',
    title: 'One place to see orders, stock and the day',
    text: 'An internal portal for a growing team that had been stitching the same picture together from spreadsheets.',
  },
  {
    kicker: 'Commerce',
    title: 'A storefront built for the phone in someone’s hand',
    text: 'A custom checkout with payments and the tax handling the brand actually sells under, instead of a generic theme.',
  },
  {
    kicker: 'Automation',
    title: 'Documents that file themselves',
    text: 'Inbound PDFs and emails turned into structured records and pushed into the system the team already uses.',
  },
  {
    kicker: 'Product',
    title: 'A marketing site and a product that share one system',
    text: 'The public site and the signed-in product designed together, so the brand does not change at the login screen.',
  },
];

const faqs = [
  {
    q: 'How do I get a quote?',
    a: 'Send a short brief through the quote form, or email contact@24xdev.co.uk. We reply within one business day with a written scope. Nothing is published as a price list, because each project is quoted on its own.',
  },
  {
    q: 'Who will I actually work with?',
    a: 'You work with the engineer building the product, including Director Gurmanpreet Singh. There is no account layer passing messages to a separate delivery team.',
  },
  {
    q: 'Do you work outside London?',
    a: 'Yes. The studio is in London and the clients are worldwide. Work is remote, calls are booked around your time zone, and the project itself can be delivered in many languages.',
  },
  {
    q: 'How long does a typical build take?',
    a: 'A focused marketing site is often ready in one to three weeks. Web applications, dashboards and AI integrations usually take three to eight weeks, depending on the scope we agree.',
  },
  {
    q: 'What do we own at the end?',
    a: 'The code, the domain and the infrastructure. You are not locked into a proprietary platform to keep the thing running.',
  },
];

export default function HomePage() {
  return (
    <div className="bg-transparent">
      <FaqSchema items={faqs} />

      <section className="px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto grid max-w-6xl items-end gap-16 lg:grid-cols-[1.4fr_0.8fr]">
          <Reveal>
            <Eyebrow>London studio · Clients worldwide</Eyebrow>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              The studio you brief is the studio that builds it.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-ink-secondary">
              24xDev designs and builds websites, AI automation, commerce and internal tools for companies
              anywhere. One studio in London. The work can ship in many languages. A free written quote, or a meeting, before any commitment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Request a free quote <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#book" variant="secondary" size="lg">
                Book a meeting
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee
        items={['Remote worldwide', 'Many languages', 'Any time zone', 'Free quote', 'Book a meeting', 'London studio']}
      />

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line md:grid-cols-4">
          {[
            ['Based in', 'London'],
            ['Working with', 'Clients worldwide'],
            ['You own', 'The code'],
            ['First reply', 'One business day'],
          ].map(([label, value]) => (
            <div key={label} className="bg-paper px-6 py-8">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-secondary">{label}</p>
              <p className="mt-2 font-display text-xl font-semibold text-ink">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <Eyebrow>Capabilities</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                Four kinds of work. One accountable team.
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent">
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {capabilities.map((item, i) => (
              <Reveal key={item.href} delay={i * 0.05} lift>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-8 transition-colors hover:border-accent"
                >
                  <span className="font-mono text-xs text-ink-secondary">{item.index}</span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink group-hover:text-accent">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">{item.text}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    Read the service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Representative engagements.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-secondary">
            Named case studies are walked through on a call. These are the shapes of work the studio takes on.
          </p>
          <div className="mt-12">
            <WorkCarousel slides={engagements} />
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Worldwide</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            One studio. Any time zone.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-secondary">
            The same pattern used by small studios that work internationally: a real base, remote delivery, and a
            single person accountable for the work. We do not open a slide of city offices.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ['A base you can name', 'London, United Kingdom. That is the studio. Clients join from wherever they already are.'],
              ['Many languages', 'The product can ship in the languages your customers use. Briefs stay clear, and the interface, content and emails follow the markets you name.'],
              ['Calls when they help', 'We book live sessions inside your working day where the time zones allow, and keep the rest asynchronous.'],
            ].map(([title, text], i) => (
              <Reveal key={title} delay={i * 0.06} lift>
              <div className="h-full rounded-3xl border border-line bg-surface p-7">
                <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{text}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Process</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              A short path from brief to launch.
            </h2>
            <Link href="/process" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent">
              How an engagement works <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06} y={16}>
              <div className="grid grid-cols-[auto_1fr] gap-5">
                <span className="font-mono text-sm text-accent">{step.n}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{step.text}</p>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] border border-line bg-surface px-8 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-12">
          <div>
            <Eyebrow>Studio</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Senior attention, on purpose.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-secondary">
              24xDev stays small so a project is not handed down a queue. Director Gurmanpreet Singh leads the work
              from London for clients worldwide. The person who understands the brief is the person who writes
              the software.
            </p>
            <Button href="/about" variant="secondary" className="mt-8">
              About the studio
            </Button>
          </div>
          <ul className="space-y-4 text-sm leading-relaxed text-ink">
            {[
              'Direct access to the engineer, from discovery through launch.',
              'Scope agreed in writing before work starts.',
              'You keep the codebase, the domain and the hosting.',
              'English, remote, with calls set around your time zone.',
            ].map((line) => (
              <li key={line} className="border-t border-line pt-4">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Before you write.</h2>
          <FaqList items={faqs} />
        </div>
      </section>

      <div className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <QuoteBand className="mt-0 h-full" />
          <BookMeeting />
        </div>
      </div>
    </div>
  );
}
