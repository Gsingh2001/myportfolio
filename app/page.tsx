'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CoverageStrip from '@/components/ui/CoverageStrip';
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

/* -------------------------------------------------------------------------- */
/* Utility: Classname Merger                                                  */
/* -------------------------------------------------------------------------- */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 transition-colors duration-300 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-bold text-slate-900 dark:text-white">{q}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400 transition-transform duration-300',
            open && 'rotate-180',
          )}
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
            <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{a}</p>
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
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

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
    <div className="relative flex flex-col gap-24 md:gap-32 pb-24 overflow-hidden bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">

      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-[1200px] bg-[linear-gradient(to_right,#cbd5e150_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e150_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none transition-colors duration-300" />

      {/* =========================================
          1. IMMERSIVE HERO SECTION
          ========================================= */}
      <section className="relative px-6 pt-28 md:pt-40 lg:pt-48 min-h-[90vh] flex flex-col justify-center">
        {/* Floating Ambient Glow */}
        <motion.div
          style={{ y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-300"
        />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-950/40 px-5 py-2 text-xs font-bold uppercase tracking-widest dark:text-cyan-400 backdrop-blur-md shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-colors duration-300"
          >
            <MapPin className="h-4 w-4" />
            Sheffield&apos;s Elite Web & AI Architects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] transition-colors duration-300"
          >
            Scale Your Business With <br className="hidden md:block"/>
            <span className="relative inline-block mt-2">
              <span className="text-gradient-flow bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-600 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-500 bg-clip-text text-transparent dark:drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                Next-Gen Engineering.
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl transition-colors duration-300"
          >
            We don&apos;t just build websites. We engineer ultra-fast Next.js architectures, intelligent AI workflows, and bespoke admin panels that automate growth and destroy bottlenecks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Link
              href="/contact"
              className="cta-glow group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 px-8 py-4 text-base font-black text-white dark:text-black shadow-lg shadow-cyan-500/20 dark:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/40 dark:hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10">Book a Free Consultation</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/60 px-8 py-4 text-base font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white backdrop-blur-md transition-all hover:bg-slate-50 dark:hover:border-cyan-500/50 dark:hover:bg-slate-800/80 sm:w-auto"
            >
              <span>Explore Capabilities</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          2. HARD DATA & STATS BANNER
          ========================================= */}
      <section className="px-6 relative z-10 -mt-12 md:-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}
          className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/50 backdrop-blur-xl p-8 shadow-xl dark:shadow-2xl transition-colors duration-300"
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 divide-x divide-slate-200/0 md:divide-slate-200 dark:divide-slate-800 transition-colors duration-300">
            {[
              { label: 'Core Web Vitals', value: '100/100', icon: Zap },
              { label: 'Outsourced Code', value: 'Zero', icon: ShieldCheck },
              { label: 'UK Support', value: '24/7', icon: Server },
              { label: 'SEO Architecture', value: 'Top 1%', icon: Search },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4">
                <stat.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400 mb-3 opacity-80" />
                <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                <span className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* =========================================
          3. THE OLD WAY VS. 24xDEV WAY
          ========================================= */}
      <section className="px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">Stop Settling for Mediocre Software</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">The difference between a standard agency and a dedicated engineering partner.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl border border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-950/10 p-8 relative overflow-hidden transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10"><XCircle className="w-32 h-32 text-red-500" /></div>
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center gap-2">
                <XCircle className="h-5 w-5" /> The Standard Agency
              </h3>
              <ul className="space-y-4">
                {[
                  'Bloated WordPress templates that load slowly.',
                  'Projects handed off to junior devs overseas.',
                  'Manual data entry that wastes your team\'s time.',
                  'Vulnerable plugins that constantly break.'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-400 font-medium">
                    <span className="text-red-500 mt-0.5 shrink-0">✕</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* The 24xDev Way */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl border border-cyan-200 bg-cyan-50 dark:border-cyan-500/30 dark:bg-cyan-950/10 p-8 relative overflow-hidden shadow-lg dark:shadow-[0_0_30px_rgba(6,182,212,0.05)] transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10"><CheckCircle2 className="w-32 h-32 text-cyan-500 dark:text-cyan-400" /></div>
              <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-400 mb-6 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> The 24xDev Standard
              </h3>
              <ul className="space-y-4">
                {[
                  'Custom Next.js codebases optimized for milliseconds.',
                  'Direct communication with Sheffield-based architects.',
                  'Custom AI automations that do the work for you.',
                  'Enterprise-grade PostgreSQL & Node.js security.'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-900 dark:text-slate-200 font-bold">
                    <CheckCircle2 className="h-5 w-5 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================
          4. TERMINAL DEPLOYMENT (Always Dark Mode for Tech Vibe)
          ========================================= */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 shadow-sm transition-colors duration-300 mb-6">
              <Activity className="h-4 w-4 text-cyan-500" /> Deployment Architecture
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Engineered for Zero Downtime.
            </h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              We replace brittle, unmanageable legacy code with lightning-fast modern frameworks. When we push an update to your software, it propagates to 320+ global edge nodes in seconds, with zero traffic interruption.
            </p>

            <div className="mt-8 space-y-6">
              {[
                { title: 'Sub-Second Load Times', desc: 'Optimised Core Web Vitals to maximize your Google rankings.', icon: Zap },
                { title: 'AI-Powered Workflows', desc: 'Turn hours of manual data entry into seconds of automated processing.', icon: Sparkles }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{feature.title}</h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Terminal UI (Forced Dark Mode) */}
          <div className="relative rounded-2xl border border-slate-700 bg-[#0d1117] p-6 shadow-2xl overflow-hidden group">
            {/* Ambient Background Blur inside terminal */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-700" />

            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4 relative z-10">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="ml-2 font-mono text-xs text-slate-500 font-bold tracking-wider">production-deploy — bash</span>
            </div>

            <div className="font-mono text-sm leading-relaxed text-slate-300 space-y-2 min-h-[200px] relative z-10">
              <p><span className="text-cyan-400 font-bold">➜</span> <span className="text-emerald-400">~</span> <span className="text-white font-semibold">24x deploy --production</span></p>

              <AnimatePresence mode="popLayout">
                {terminalStep >= 1 && (
                  <motion.p key="step-1" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-slate-500">
                    [1/3] Resolving dependencies & compiling Next.js 15 build...
                  </motion.p>
                )}
                {terminalStep >= 2 && (
                  <motion.p key="step-2" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-slate-400">
                    [2/3] Executing PostgreSQL vector migrations... <span className="text-emerald-400">✓ Done in 142ms</span>
                  </motion.p>
                )}
                {terminalStep >= 3 && (
                  <motion.div key="step-3" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-slate-400">[3/3] Invalidating Edge Cache across 320 regions...</p>
                    <p className="mt-4 font-bold text-white"><span className="text-emerald-400">✓ SUCCESS:</span> 24xDev system is live and highly available.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="inline-block w-2.5 h-5 bg-cyan-400 animate-pulse mt-2 translate-y-1"></span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          5. FEATURED SERVICES
          ========================================= */}
      <section className="relative px-6 py-24 bg-slate-100 dark:bg-slate-900/20 border-y border-slate-200 dark:border-slate-800/50 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Core Services</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">Built for Scale.</h2>
            </div>
            <Link href="/services" className="group flex items-center gap-2 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 bg-white dark:bg-cyan-950/30 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-transparent shadow-sm transition-all">
              View Architecture Capabilities <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Full-Stack Web Dev', desc: 'Deterministic Next.js applications that load instantly and scale infinitely without server bloat.', icon: Code2 },
              { title: 'AI & LLM Integration', desc: 'Custom OpenAI / Claude agents integrated into your systems to automate tedious workflows.', icon: Cpu },
              { title: 'Custom Dashboards', desc: 'Secure backend portals powered by PostgreSQL to manage your entire business operation.', icon: LayoutDashboard }
            ].map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href="/services"
                  className="group relative block rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#07080c] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 dark:hover:border-cyan-500/40 shadow-sm hover:shadow-xl dark:hover:shadow-cyan-500/10"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-500/10 transition-colors">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-8 text-xl font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{service.title}</h3>
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{service.desc}</p>
                  <div className="mt-8 flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Explore Architecture <ArrowRight className="h-4 w-4" />
                  </div>
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
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Featured Work</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">Recent project types.</h2>
            </div>
            <Link href="/portfolio" className="group flex items-center gap-2 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 bg-white dark:bg-cyan-950/30 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-transparent shadow-sm transition-all">
              View Full Portfolio <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Corporate Website Rebuild', desc: 'WordPress to Next.js migration cutting load times from 4s+ to under 1s.', icon: Globe2, gradient: 'from-cyan-500 to-blue-600' },
              { title: 'AI Customer Support Agent', desc: 'A custom LLM assistant that deflects routine support tickets automatically.', icon: Cpu, gradient: 'from-teal-500 to-cyan-600' },
              { title: 'Direct-to-Consumer Storefront', desc: 'A bespoke checkout with UK VAT handling, built for speed on mobile.', icon: ShoppingCart, gradient: 'from-blue-500 to-indigo-600' },
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
                  className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#07080c] transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 dark:hover:border-cyan-500/40 shadow-sm hover:shadow-xl dark:hover:shadow-cyan-500/10"
                >
                  <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                    <project.icon className="relative h-11 w-11 text-white drop-shadow-lg" />
                  </div>
                  <div className="p-7">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{project.desc}</p>
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
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">From the Blog</p>
                <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">Latest notes.</h2>
              </div>
              <Link href="/blog" className="group flex items-center gap-2 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 bg-white dark:bg-cyan-950/30 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-transparent shadow-sm transition-all">
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
                    className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#07080c] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 dark:hover:border-cyan-500/40 shadow-sm hover:shadow-xl dark:hover:shadow-cyan-500/10"
                  >
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <h3 className="mt-3 text-lg font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{post.title}</h3>
                    <p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{post.excerpt}</p>
                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
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
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/20 p-10 transition-colors duration-300">
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              { title: 'Fixed-scope quotes', desc: 'One clear price after your discovery call — no hourly surprises.', icon: FileCheck2 },
              { title: 'Direct access', desc: 'You talk to the engineer building your product, not an account manager.', icon: Handshake },
              { title: 'No lock-in', desc: 'You own the code, the domain and the infrastructure, always.', icon: ShieldCheck },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          6. THE SHEFFIELD ADVANTAGE
          ========================================= */}
      <section className="px-6 py-12 text-center">
        <div className="mx-auto max-w-4xl">
          <ShieldCheck className="mx-auto h-14 w-14 text-cyan-600 dark:text-cyan-400 mb-6" />
          <h2 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
            Local Expertise. <span className="text-cyan-600 dark:text-cyan-400">Global Standards.</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Based right here in Sheffield, South Yorkshire, and working remotely with businesses across London, Birmingham, Manchester and the rest of the UK. When you work with 24xDev, you get direct communication with Director Gurmanpreet Singh and a UK-based engineering team. No language barriers. No frustrating time-zone delays. Just high-end code and absolute accountability.
          </p>

          <CoverageStrip />

          <div className="mt-10 flex justify-center">
             <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 px-6 py-3 rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                Read our engineering manifesto <ArrowRight className="h-4 w-4" />
             </Link>
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
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">FAQ</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">Common questions.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} defaultOpen={i === 0} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <BookOpen className="h-4 w-4" />
            <span>
              More questions?{' '}
              <Link href="/contact" className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline">
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
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-cyan-200 dark:border-cyan-500/30 bg-gradient-to-br from-white to-slate-50 dark:from-[#0a1118] dark:to-[#05090d] relative shadow-2xl dark:shadow-[0_0_50px_rgba(6,182,212,0.1)] transition-colors duration-300"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-cyan-400/20 dark:bg-cyan-500/20 blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-blue-400/20 dark:bg-blue-500/20 blur-[100px] pointer-events-none"></div>

          <div className="relative px-8 py-20 md:px-16 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Ready to dominate <br className="hidden sm:block"/> your sector?
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Stop losing customers to slow websites and manual processes. Partner with Sheffield&apos;s leading engineers to build software that does the heavy lifting for you.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 dark:bg-white px-10 py-5 text-lg font-black text-white dark:text-black transition-all hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:scale-105 shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <span>Initialize Project</span>
                <Terminal className="h-5 w-5" />
              </Link>
              <a
                href="mailto:contact@24xdev.co.uk"
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-transparent px-10 py-5 text-lg font-bold text-slate-700 dark:text-white transition-all hover:border-slate-300 hover:bg-slate-50 dark:hover:border-cyan-500 dark:hover:bg-cyan-950/30"
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
