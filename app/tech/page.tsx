import type { Metadata } from 'next';
import { ArrowRight, Code2, Database, Zap, Layers, Terminal, Sparkles, Cloud, Lock, Cpu } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';

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
    <div className="bg-paper px-6 py-20 text-center transition-colors duration-300 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow className="text-center">Our Toolkit</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Industry-leading technologies.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-secondary">
            No bloated page builders or outdated frameworks. We build exclusively with modern, actively-maintained
            tools chosen for speed, security and long-term maintainability.
          </p>
        </Reveal>

        <div className="mt-16 space-y-14 text-left">
          {stackGroups.map((group, groupIdx) => (
            <Reveal key={group.label} delay={groupIdx * 0.05}>
              <h2 className="mb-5 font-mono text-sm font-bold uppercase tracking-widest text-ink-secondary">
                {group.label}
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {group.items.map((t) => (
                  <div
                    key={t.name}
                    className="flex flex-col items-center justify-center gap-3 border border-line bg-surface p-6 text-center transition-colors duration-200 hover:border-accent"
                  >
                    <t.icon className="h-7 w-7 text-accent" />
                    <span className="text-sm font-bold text-ink">{t.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 border border-line bg-surface p-10">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Want the details behind the stack?</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-secondary">
              We&apos;ll walk you through exactly how we&apos;d architect your project on a free discovery call.
            </p>
            <Button href="/contact" variant="primary" size="lg" className="mt-8">
              Book a Free Call <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
