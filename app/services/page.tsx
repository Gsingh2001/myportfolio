import Link from 'next/link';
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
    <div className="px-6 py-20 md:py-28 bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Core Services</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white sm:text-5xl transition-colors duration-300">
            Engineered for speed &amp; scale.
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 transition-colors duration-300">
            High-performance architectures, custom AI automation, and dashboards built by a UK-based team who answer
            the phone.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, idx) => (
            <Reveal key={svc.title} delay={idx * 0.07}>
              <div className="group rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 dark:hover:border-cyan-500/40 hover:shadow-xl dark:hover:shadow-cyan-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <svc.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">{svc.title}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{svc.desc}</p>
                <ul className="mt-5 space-y-2">
                  {svc.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" /> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Process strip */}
        <Reveal>
          <div className="mt-24 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/20 p-10 transition-colors duration-300">
            <div className="grid gap-10 sm:grid-cols-3">
              {process.map((p, i) => (
                <div key={p.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-mono font-black shadow-sm">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{p.title}</h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left rounded-3xl border border-cyan-200 dark:border-cyan-500/30 bg-gradient-to-br from-white to-slate-50 dark:from-[#0a1118] dark:to-[#05090d] p-10 transition-colors duration-300">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">Not sure which service fits?</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Tell us your goals — we&apos;ll recommend the right scope and a fixed price.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 px-6 py-3.5 text-sm font-bold text-slate-800 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80">
                View Pricing
              </Link>
              <Link href="/contact" className="cta-glow inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 px-6 py-3.5 text-sm font-black text-white dark:text-black shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]">
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
