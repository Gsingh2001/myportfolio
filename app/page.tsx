'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import CoverageStrip from '@/components/ui/CoverageStrip';
import Eyebrow from '@/components/ui/Eyebrow';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import SectionIndex from '@/components/ui/SectionIndex';
import {
  ArrowRight,
  MapPin,
  Code2,
  Cpu,
  LayoutDashboard,
  Terminal,
  Zap,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Search,
  Server,
  Activity,
  ChevronRight,
  ChevronDown,
  Globe2,
  Sparkles,
  ShoppingCart,
  Handshake,
  FileCheck2,
  BookOpen,
  Calendar,
} from 'lucide-react';

type BlogPreview = {
  slug: string;
  title: string;
  excerpt: string;
  published_at: string;
};

const faqs = [
  {
    q: 'How much does a project cost?',
    a: 'It depends on scope, but most engagements land between £2,000 and £15,000+. After a free discovery call we send a fixed-scope quote — one clear price, agreed before we start, no hourly surprises. See our pricing page for typical ranges.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A focused marketing site usually ships in 1–3 weeks. Web applications, dashboards and AI integrations typically run 3–8 weeks depending on complexity. We\'ll give you a realistic timeline as part of your quote.',
  },
  {
    q: 'Do you work with businesses outside Sheffield?',
    a: 'Yes — we\'re Sheffield-based but work remotely with clients across London, Birmingham, Manchester, Leeds and the rest of the UK. Video calls and async updates keep things moving without needing to be in the same city.',
  },
  {
    q: 'Who actually builds my project?',
    a: 'You get direct access to the engineer building your product — not an account manager relaying messages to an offshore team. That\'s Director Gurmanpreet Singh and the core 24xDev team.',
  },
  {
    q: 'What happens after launch?',
    a: 'You own the code, the domain and the infrastructure — no lock-in. We\'re also available for ongoing support and iteration if you want us to keep building after launch; that\'s entirely optional.',
  },
];

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-line bg-surface transition-colors duration-300">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display font-semibold text-ink">{q}</span>
        <ChevronDown
          className={cn('h-5 w-5 shrink-0 text-accent transition-transform duration-300', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-ink-secondary">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Landing Page Component                                                */
/* -------------------------------------------------------------------------- */
export default function UltimateLandingPage() {
  // Terminal Auto-Typing Effect State
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    const sequence = [
      { delay: 1000, step: 1 }, // Initialize
      { delay: 2500, step: 2 }, // Deploying
      { delay: 4000, step: 3 }, // Success
      { delay: 8000, step: 0 }  // Reset loop
    ];
    let timeout: NodeJS.Timeout;

    const runSequence = (index: number) => {
      timeout = setTimeout(() => {
        setTerminalStep(sequence[index].step);
        if (index < sequence.length - 1) {
          runSequence(index + 1);
        } else {
          runSequence(0);
        }
      }, sequence[index].delay);
    };

    runSequence(0);
    return () => clearTimeout(timeout);
  }, []);

  // Latest blog posts — fetched client-side from our own public API. If the
  // database isn't connected yet, or there simply aren't any posts, the
  // section quietly doesn't render rather than showing an error or an
  // empty box.
  const [posts, setPosts] = useState<BlogPreview[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/posts?limit=3')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.posts) setPosts(data.posts);
      })
      .catch(() => {
        // Silently ignore — the homepage should never break because the
        // blog preview couldn't load.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative flex flex-col gap-24 overflow-hidden bg-paper pb-24 transition-colors duration-300 md:gap-32">
      <div className="grid-texture pointer-events-none absolute inset-x-0 top-0 h-[1200px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* =========================================
          1. HERO SECTION
          ========================================= */}
      <section className="relative flex min-h-[85vh] flex-col justify-center px-6 pt-10 md:pt-10 lg:pt-10">
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-line bg-surface px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink-secondary"
          >
            <MapPin className="h-4 w-4 text-accent" />
            Sheffield&apos;s Web &amp; AI Studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Scale your business with <br className="hidden md:block" />
            <span className="text-accent">next-gen engineering.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-secondary sm:text-xl"
          >
            We don&apos;t just build websites. We engineer ultra-fast Next.js architectures, intelligent AI workflows, and bespoke admin panels that automate growth and destroy bottlenecks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
              Book a Free Consultation <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/services" variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore Capabilities
            </Button>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          2. HARD DATA & STATS BANNER
          ========================================= */}
      <section className="relative z-10 -mt-12 px-6 md:-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}
          className="mx-auto max-w-6xl"
        >
          <Panel padding="lg">
            <div className="grid grid-cols-2 gap-8 divide-y divide-line md:grid-cols-4 md:divide-x md:divide-y-0">
              {[
                { label: 'Core Web Vitals', value: '100/100', icon: Zap },
                { label: 'Outsourced Code', value: 'Zero', icon: ShieldCheck },
                { label: 'UK Support', value: '24/7', icon: Server },
                { label: 'SEO Architecture', value: 'Top 1%', icon: Search },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center px-4 pt-8 text-center first:pt-0 md:pt-0">
                  <stat.icon className="mb-3 h-6 w-6 text-accent" />
                  <span className="font-display text-3xl font-semibold text-ink md:text-4xl">{stat.value}</span>
                  <span className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-ink-secondary">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </section>

      {/* =========================================
          3. THE OLD WAY VS. 24xDEV WAY
          ========================================= */}
      <section className="px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Stop settling for mediocre software.
            </h2>
            <p className="mt-4 text-ink-secondary">
              The difference between a standard agency and a dedicated engineering partner.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* The Old Way */}
            <div className="border border-line bg-surface p-8">
              <h3 className="mb-6 flex items-center gap-2 font-display text-xl font-semibold text-ink">
                <XCircle className="h-5 w-5 text-ink-secondary" /> The Standard Agency
              </h3>
              <ul className="space-y-4">
                {[
                  'Bloated WordPress templates that load slowly.',
                  'Projects handed off to junior devs overseas.',
                  'Manual data entry that wastes your team\'s time.',
                  'Vulnerable plugins that constantly break.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-medium text-ink-secondary">
                    <span className="mt-0.5 shrink-0 text-ink-secondary">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* The 24xDev Way */}
            <div className="border border-accent bg-surface-alt p-8">
              <h3 className="mb-6 flex items-center gap-2 font-display text-xl font-semibold text-ink">
                <CheckCircle2 className="h-5 w-5 text-accent" /> The 24xDev Standard
              </h3>
              <ul className="space-y-4">
                {[
                  'Custom Next.js codebases optimized for milliseconds.',
                  'Direct communication with Sheffield-based architects.',
                  'Custom AI automations that do the work for you.',
                  'Enterprise-grade PostgreSQL & Node.js security.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-bold text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          4. TERMINAL DEPLOYMENT
          ========================================= */}
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-line bg-surface px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-ink-secondary">
              <Activity className="h-4 w-4 text-accent" /> Deployment Architecture
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Engineered for zero downtime.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
              We replace brittle, unmanageable legacy code with lightning-fast modern frameworks. When we push an update to your software, it propagates to 320+ global edge nodes in seconds, with zero traffic interruption.
            </p>

            <div className="mt-8 space-y-6">
              {[
                { title: 'Sub-Second Load Times', desc: 'Optimised Core Web Vitals to maximize your Google rankings.', icon: Zap },
                { title: 'AI-Powered Workflows', desc: 'Turn hours of manual data entry into seconds of automated processing.', icon: Sparkles },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink text-accent">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-ink">{feature.title}</h4>
                    <p className="mt-1 text-sm text-ink-secondary">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Terminal UI */}
          <div className="relative border border-ink bg-ink p-6">
            <div className="relative z-10 mb-4 flex items-center gap-2 border-b border-paper/15 pb-4">
              <div className="h-3 w-3 rounded-full border border-paper/25" />
              <div className="h-3 w-3 rounded-full border border-paper/25" />
              <div className="h-3 w-3 rounded-full border border-paper/25" />
              <span className="ml-2 font-mono text-xs font-bold tracking-wider text-paper/50">production-deploy — bash</span>
            </div>

            <div className="relative z-10 min-h-[200px] space-y-2 font-mono text-sm leading-relaxed text-paper/80">
              <p>
                <span className="font-bold text-accent">➜</span> <span className="text-paper/60">~</span>{' '}
                <span className="font-semibold text-paper">24x deploy --production</span>
              </p>

              <AnimatePresence mode="popLayout">
                {terminalStep >= 1 && (
                  <motion.p key="step-1" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-paper/50">
                    [1/3] Resolving dependencies &amp; compiling Next.js build...
                  </motion.p>
                )}
                {terminalStep >= 2 && (
                  <motion.p key="step-2" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-paper/60">
                    [2/3] Executing PostgreSQL migrations... <span className="text-accent">✓ Done in 142ms</span>
                  </motion.p>
                )}
                {terminalStep >= 3 && (
                  <motion.div key="step-3" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-paper/60">[3/3] Invalidating edge cache across 320 regions...</p>
                    <p className="mt-4 font-bold text-paper">
                      <span className="text-accent">✓ SUCCESS:</span> 24xDev system is live and highly available.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="mt-2 inline-block h-5 w-2.5 translate-y-1 animate-pulse bg-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          5. FEATURED SERVICES
          ========================================= */}
      <section className="relative border-y border-line bg-surface-alt px-6 py-24 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionIndex index={1} total={4} label="Core Services" />
              <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">Built for scale.</h2>
            </div>
            <Link
              href="/services"
              className="group flex items-center gap-2 border border-line bg-surface px-5 py-2.5 font-mono text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              View Architecture Capabilities <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Full-Stack Web Dev', desc: 'Deterministic Next.js applications that load instantly and scale infinitely without server bloat.', icon: Code2 },
              { title: 'AI & LLM Integration', desc: 'Custom OpenAI / Claude agents integrated into your systems to automate tedious workflows.', icon: Cpu },
              { title: 'Custom Dashboards', desc: 'Secure backend portals powered by PostgreSQL to manage your entire business operation.', icon: LayoutDashboard },
            ].map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href="/services" className="group block h-full">
                  <Panel interactive padding="lg" className="h-full">
                    <div className="flex h-14 w-14 items-center justify-center border border-ink text-accent transition-colors group-hover:bg-accent group-hover:text-accent-ink">
                      <service.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-8 font-display text-xl font-semibold text-ink group-hover:text-accent">{service.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{service.desc}</p>
                    <div className="mt-8 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-ink-secondary group-hover:text-accent">
                      Explore Architecture <ArrowRight className="h-4 w-4" />
                    </div>
                  </Panel>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          5b. FEATURED WORK
          ========================================= */}
      <section className="px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionIndex index={2} total={4} label="Featured Work" />
              <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">Recent project types.</h2>
            </div>
            <Link
              href="/portfolio"
              className="group flex items-center gap-2 border border-line bg-surface px-5 py-2.5 font-mono text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              View Full Portfolio <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Corporate Website Rebuild', desc: 'WordPress to Next.js migration cutting load times from 4s+ to under 1s.', icon: Globe2 },
              { title: 'AI Customer Support Agent', desc: 'A custom LLM assistant that deflects routine support tickets automatically.', icon: Cpu },
              { title: 'Direct-to-Consumer Storefront', desc: 'A bespoke checkout with UK VAT handling, built for speed on mobile.', icon: ShoppingCart },
            ].map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href="/portfolio"
                  className="group block overflow-hidden border border-line bg-surface transition-colors duration-200 hover:border-accent"
                >
                  <div className="grid-texture relative flex h-32 items-center justify-center border-b border-line bg-surface-alt">
                    <project.icon className="relative h-11 w-11 text-ink transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-lg font-semibold text-ink group-hover:text-accent">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{project.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          5c. LATEST FROM THE BLOG (renders nothing until posts exist)
          ========================================= */}
      {posts && posts.length > 0 && (
        <section className="px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>From the Blog</Eyebrow>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Latest notes.</h2>
              </div>
              <Link
                href="/blog"
                className="group flex items-center gap-2 border border-line bg-surface px-5 py-2.5 font-mono text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Read the blog <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {posts.map((post, idx) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col border border-line bg-surface p-7 transition-colors duration-200 hover:border-accent"
                  >
                    <p className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink-secondary">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-semibold text-ink group-hover:text-accent">{post.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">{post.excerpt}</p>
                    <div className="mt-6 flex items-center gap-2 font-mono text-xs font-bold text-accent">
                      Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================
          5d. OUR PROMISE
          ========================================= */}
      <section className="px-6">
        <div className="mx-auto max-w-6xl">
          <SectionIndex index={3} total={4} label="Our Promise" />
          <Panel padding="lg" className="mt-4">
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                { title: 'Fixed-scope quotes', desc: 'One clear price after your discovery call — no hourly surprises.', icon: FileCheck2 },
                { title: 'Direct access', desc: 'You talk to the engineer building your product, not an account manager.', icon: Handshake },
                { title: 'No lock-in', desc: 'You own the code, the domain and the infrastructure, always.', icon: ShieldCheck },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink text-accent">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-ink">{item.title}</h4>
                    <p className="mt-1 text-sm text-ink-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      {/* =========================================
          6. THE SHEFFIELD ADVANTAGE
          ========================================= */}
      <section className="px-6 py-12 text-center">
        <div className="mx-auto max-w-4xl">
          <SectionIndex index={4} total={4} label="The Sheffield Advantage" />
          <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center border border-ink text-accent">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Local expertise. <span className="text-accent">Global standards.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
            Based right here in Sheffield, South Yorkshire, and working remotely with businesses across London, Birmingham, Manchester and the rest of the UK. When you work with 24xDev, you get direct communication with Director Gurmanpreet Singh and a UK-based engineering team. No language barriers. No frustrating time-zone delays. Just high-end code and absolute accountability.
          </p>

          <CoverageStrip />

          <div className="mt-10 flex justify-center">
            <Button href="/about" variant="secondary">
              Read our engineering manifesto <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================
          6b. FAQ
          ========================================= */}
      <section className="px-6">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <Eyebrow className="text-center">FAQ</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Common questions.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} defaultOpen={i === 0} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-secondary">
            <BookOpen className="h-4 w-4" />
            <span>
              More questions?{' '}
              <Link href="/contact" className="font-bold text-accent hover:underline">
                Just ask
              </Link>
              .
            </span>
          </div>
        </div>
      </section>

      {/* =========================================
          7. HIGH-IMPACT FINAL CTA
          ========================================= */}
      <section className="px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl overflow-hidden border border-ink bg-ink"
        >
          <div className="grid-texture relative flex flex-col items-center px-8 py-20 text-center md:px-16">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-paper md:text-5xl lg:text-6xl">
              Ready to dominate <br className="hidden sm:block" /> your sector?
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-paper/70">
              Stop losing customers to slow websites and manual processes. Partner with Sheffield&apos;s leading engineers to build software that does the heavy lifting for you.
            </p>
            <div className="mt-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Button href="/contact" variant="primary" size="lg">
                Initialize Project <Terminal className="h-5 w-5" />
              </Button>
              <a
                href="mailto:contact@24xdev.co.uk"
                className="flex items-center justify-center gap-2 border border-paper/25 px-10 py-4 text-base font-bold text-paper transition-colors hover:border-accent hover:text-accent"
              >
                Email the Director
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
