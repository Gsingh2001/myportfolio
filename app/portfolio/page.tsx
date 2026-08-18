import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Cpu,
  LayoutDashboard,
  ShoppingCart,
  Globe2,
  Sparkles,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Portfolio | Web & AI Projects Across the UK',
  description:
    'A look at the websites, AI automations and dashboards 24xDev builds for businesses in Sheffield, London, Birmingham and across the UK.',
  alternates: { canonical: '/portfolio' },
};

const projects = [
  {
    category: 'Web Development',
    title: 'Corporate Website Rebuild',
    summary:
      'Migrated a slow, plugin-heavy WordPress site to a custom Next.js build — cutting load times from 4s+ to under 1s and lifting organic search visibility.',
    tags: ['Next.js', 'Tailwind CSS', 'Technical SEO'],
    icon: Globe2,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    category: 'E-commerce',
    title: 'Direct-to-Consumer Storefront',
    summary:
      'A bespoke storefront with a custom checkout, UK VAT handling and Stripe integration, built for speed on mobile where most traffic converts.',
    tags: ['Next.js', 'Stripe', 'Headless commerce'],
    icon: ShoppingCart,
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    category: 'AI & Automation',
    title: 'AI Customer Support Agent',
    summary:
      'A custom LLM-powered assistant trained on a client’s knowledge base, deflecting routine support tickets before they reach a human.',
    tags: ['OpenAI API', 'RAG pipeline', 'Workflow automation'],
    icon: Cpu,
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    category: 'Dashboards & Internal Tools',
    title: 'Operations Dashboard',
    summary:
      'A secure internal portal giving a growing business real-time visibility into orders, stock and staff performance in one place.',
    tags: ['PostgreSQL', 'Role-based access', 'Data visualisation'],
    icon: LayoutDashboard,
    gradient: 'from-indigo-500 to-blue-700',
  },
  {
    category: 'AI & Automation',
    title: 'Document Processing Pipeline',
    summary:
      'An automation that reads incoming PDFs and emails, extracts structured data and pushes it straight into the client’s existing systems.',
    tags: ['AI extraction', 'Automation', 'API integrations'],
    icon: Sparkles,
    gradient: 'from-cyan-500 to-teal-600',
  },
  {
    category: 'Web Development',
    title: 'SaaS Product Front End',
    summary:
      'A polished, high-conversion marketing site and customer dashboard for an early-stage SaaS product, built to scale with the product roadmap.',
    tags: ['Next.js', 'React', 'Design system'],
    icon: Code2,
    gradient: 'from-sky-500 to-cyan-600',
  },
];

export default function PortfolioPage() {
  return (
    <div className="px-6 py-20 md:py-28 bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Our Work</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white sm:text-5xl transition-colors duration-300">
            Projects built for real businesses.
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
            A snapshot of the kind of work we do — from full website rebuilds to AI automations and internal
            dashboards. Get in touch and we&apos;ll walk you through detailed case studies relevant to your project.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <Reveal key={project.title} delay={idx * 0.07}>
              <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 dark:hover:border-cyan-500/40 hover:shadow-xl dark:hover:shadow-cyan-500/10">
                <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                  <project.icon className="relative h-14 w-14 text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-lg font-black text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 dark:bg-slate-800/60 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left rounded-3xl border border-cyan-200 dark:border-cyan-500/30 bg-gradient-to-br from-white to-slate-50 dark:from-[#0a1118] dark:to-[#05090d] p-10 transition-colors duration-300">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">Have a similar project in mind?</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300 flex items-center gap-1 justify-center sm:justify-start">
                Let&apos;s talk through it on a free call <ArrowUpRight className="h-4 w-4" />
              </p>
            </div>
            <Link
              href="/contact"
              className="cta-glow inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 px-8 py-4 text-sm font-black text-white dark:text-black shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
