import Link from 'next/link';
import type { Metadata } from 'next';
import { Code2, Database, Zap, Layers, Terminal, Sparkles, Cloud, Lock, ArrowRight, Cpu } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Our Tech Stack | Next.js, React, Node.js, AI',
  description: 'The modern, battle-tested tools 24xDev uses to build fast, secure, scalable software for UK businesses.',
  alternates: { canonical: '/tech' },
};

const stackGroups = [
  {
    label: 'Frontend',
    items: [
      { name: 'Next.js', icon: Layers },
      { name: 'React', icon: Code2 },
      { name: 'Tailwind CSS', icon: Sparkles },
      { name: 'TypeScript', icon: Terminal },
    ],
  },
  {
    label: 'Backend & Data',
    items: [
      { name: 'Node.js', icon: Terminal },
      { name: 'PostgreSQL', icon: Database },
      { name: 'Server Actions / REST APIs', icon: Code2 },
      { name: 'Edge Functions', icon: Zap },
    ],
  },
  {
    label: 'AI & Automation',
    items: [
      { name: 'OpenAI API', icon: Sparkles },
      { name: 'Claude / Anthropic API', icon: Sparkles },
      { name: 'Custom RAG pipelines', icon: Cpu },
      { name: 'Workflow automation', icon: Zap },
    ],
  },
  {
    label: 'Infrastructure',
    items: [
      { name: 'Vercel Edge Network', icon: Cloud },
      { name: 'CI/CD Pipelines', icon: Terminal },
      { name: 'SSL & Security Hardening', icon: Lock },
      { name: 'Automated Backups', icon: Database },
    ],
  },
];

export default function TechPage() {
  return (
    <div className="px-6 py-20 md:py-28 text-center bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Our Toolkit</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white sm:text-5xl transition-colors duration-300">
            Industry-leading technologies.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400 transition-colors duration-300">
            No bloated page builders or outdated frameworks. We build exclusively with modern, actively-maintained
            tools chosen for speed, security and long-term maintainability.
          </p>
        </Reveal>

        <div className="mt-16 space-y-14 text-left">
          {stackGroups.map((group, groupIdx) => (
            <Reveal key={group.label} delay={groupIdx * 0.05}>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-5">
                {group.label}
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {group.items.map((t) => (
                  <div
                    key={t.name}
                    className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 dark:hover:border-cyan-500/40 hover:shadow-lg dark:hover:shadow-cyan-500/5"
                  >
                    <t.icon className="h-7 w-7 text-cyan-600 dark:text-cyan-400 transition-transform duration-300 group-hover:scale-125" />
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 rounded-3xl border border-cyan-200 dark:border-cyan-500/30 bg-gradient-to-br from-white to-slate-50 dark:from-[#0a1118] dark:to-[#05090d] p-10 transition-colors duration-300">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">Want the details behind the stack?</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              We&apos;ll walk you through exactly how we&apos;d architect your project on a free discovery call.
            </p>
            <Link
              href="/contact"
              className="cta-glow mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 px-8 py-4 text-sm font-black text-white dark:text-black shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              Book a Free Call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
