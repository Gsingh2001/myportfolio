import type { Metadata } from 'next';
import {
  Code2,
  Cpu,
  LayoutDashboard,
  Zap,
  Clock,
  Search,
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  Workflow,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionIndex from '@/components/ui/SectionIndex';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Web Development & AI Services | Sheffield & UK-Wide',
  description:
    'Full-stack web development, AI integration, e-commerce and custom dashboards for businesses in Sheffield, Birmingham, Manchester and across the UK.',
  alternates: { canonical: '/services' },
};

const services = [
  {
    title: 'Full-Stack Web Development',
    desc: 'Bespoke, lightning-fast websites and web apps built on Next.js, React and Node.js — designed to convert, not just look nice.',
    icon: Code2,
    points: ['Marketing sites & landing pages', 'Web applications & customer portals', 'Headless CMS integration'],
  },
  {
    title: 'AI & LLM Integrations',
    desc: 'Custom AI agents and automations that plug into your existing tools to remove hours of manual, repetitive work.',
    icon: Cpu,
    points: ['Support & sales chat agents', 'Document & data processing automation', 'OpenAI / Claude workflow integration'],
  },
  {
    title: 'Custom Dashboards & Portals',
    desc: 'Secure, purpose-built admin panels and analytics hubs backed by PostgreSQL, tailored to how your team actually works.',
    icon: LayoutDashboard,
    points: ['Internal ops & reporting tools', 'Client-facing portals', 'Role-based access & permissions'],
  },
  {
    title: 'E-commerce Builds',
    desc: 'Fast, conversion-focused online stores — from a lean headless storefront to a fully custom checkout experience.',
    icon: ShoppingCart,
    points: ['Stripe / payment integration', 'Inventory & order management', 'UK VAT-ready checkout flows'],
  },
  {
    title: 'SEO & Performance',
    desc: 'Technical SEO and Core Web Vitals optimisation so your site actually gets found — and keeps visitors once it does.',
    icon: Zap,
    points: ['100/100 Core Web Vitals targets', 'Structured data & schema markup', 'Local UK SEO strategy'],
  },
  {
    title: 'Ongoing Support & Retainers',
    desc: 'Continuous monitoring, updates and small enhancements from the same UK-based team that built your product.',
    icon: Clock,
    points: ['Uptime & performance monitoring', 'Security patches & dependency updates', 'Priority-response support hours'],
  },
];

const process = [
  { title: 'Audit', desc: 'We review your current site or idea and flag the biggest opportunities.', icon: Search },
  { title: 'Build', desc: 'Weekly progress on a live staging link — no black-box development.', icon: Workflow },
  { title: 'Launch', desc: 'Deployed, monitored, and handed over with clean documentation.', icon: Zap },
];

export default function ServicesPage() {
  return (
    <div className="bg-paper px-6 py-20 transition-colors duration-300 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-center">Core Services</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Engineered for speed &amp; scale.
          </h1>
          <p className="mt-4 text-ink-secondary">
            High-performance architectures, custom AI automation, and dashboards built by a UK-based team who answer
            the phone.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, idx) => (
            <Reveal key={svc.title} delay={idx * 0.07}>
              <Panel className="h-full">
                <div className="flex h-12 w-12 items-center justify-center border border-ink text-accent">
                  <svc.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">{svc.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{svc.desc}</p>
                <ul className="mt-5 space-y-2">
                  {svc.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-xs font-medium text-ink-secondary">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {pt}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
          ))}
        </div>

        {/* Process strip */}
        <Reveal>
          <div className="mt-24">
            <SectionIndex index={5} total={6} label="HOW IT WORKS" />
            <div className="border border-line bg-surface-alt p-10">
              <div className="grid gap-10 sm:grid-cols-3">
                {process.map((p, i) => (
                  <div key={p.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink bg-surface font-mono font-black text-ink">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-ink">{p.title}</h4>
                      <p className="mt-1 text-sm text-ink-secondary">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col items-center gap-6 border border-line bg-surface p-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Not sure which service fits?</h2>
              <p className="mt-2 text-ink-secondary">Tell us your goals — we&apos;ll recommend the right scope and a fixed price.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button href="/pricing" variant="secondary">View Pricing</Button>
              <Button href="/contact" variant="primary">
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
