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
import Eyebrow from '@/components/ui/Eyebrow';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';

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
  },
  {
    category: 'E-commerce',
    title: 'Direct-to-Consumer Storefront',
    summary:
      'A bespoke storefront with a custom checkout, UK VAT handling and Stripe integration, built for speed on mobile where most traffic converts.',
    tags: ['Next.js', 'Stripe', 'Headless commerce'],
    icon: ShoppingCart,
  },
  {
    category: 'AI & Automation',
    title: 'AI Customer Support Agent',
    summary:
      'A custom LLM-powered assistant trained on a client’s knowledge base, deflecting routine support tickets before they reach a human.',
    tags: ['OpenAI API', 'RAG pipeline', 'Workflow automation'],
    icon: Cpu,
  },
  {
    category: 'Dashboards & Internal Tools',
    title: 'Operations Dashboard',
    summary:
      'A secure internal portal giving a growing business real-time visibility into orders, stock and staff performance in one place.',
    tags: ['PostgreSQL', 'Role-based access', 'Data visualisation'],
    icon: LayoutDashboard,
  },
  {
    category: 'AI & Automation',
    title: 'Document Processing Pipeline',
    summary:
      'An automation that reads incoming PDFs and emails, extracts structured data and pushes it straight into the client’s existing systems.',
    tags: ['AI extraction', 'Automation', 'API integrations'],
    icon: Sparkles,
  },
  {
    category: 'Web Development',
    title: 'SaaS Product Front End',
    summary:
      'A polished, high-conversion marketing site and customer dashboard for an early-stage SaaS product, built to scale with the product roadmap.',
    tags: ['Next.js', 'React', 'Design system'],
    icon: Code2,
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-paper px-6 py-20 transition-colors duration-300 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>Our Work</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Projects built for real businesses.
          </h1>
          <p className="mt-4 leading-relaxed text-ink-secondary">
            A snapshot of the kind of work we do — from full website rebuilds to AI automations and internal
            dashboards. Get in touch and we&apos;ll walk you through detailed case studies relevant to your project.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <Reveal key={project.title} delay={idx * 0.07}>
              <div className="group flex h-full flex-col overflow-hidden border border-line bg-surface transition-colors duration-200 hover:border-accent">
                <div className="grid-texture relative flex h-40 items-center justify-center border-b border-line bg-surface-alt">
                  <project.icon className="relative h-14 w-14 text-ink transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
                    {project.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink">{project.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag} tone="outline">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col items-center gap-6 border border-line bg-surface p-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Have a similar project in mind?</h2>
              <p className="mt-2 flex items-center justify-center gap-1 text-ink-secondary sm:justify-start">
                Let&apos;s talk through it on a free call <ArrowUpRight className="h-4 w-4" />
              </p>
            </div>
            <Button href="/contact" variant="primary" size="lg" className="shrink-0">
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
