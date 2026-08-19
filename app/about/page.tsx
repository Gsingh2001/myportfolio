import type { Metadata } from 'next';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Target,
  Users,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionIndex from '@/components/ui/SectionIndex';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Why 24xDev | Sheffield Software Studio, Serving the UK',
  description:
    'Meet 24xDev — a Sheffield software studio led by Director Gurmanpreet Singh, working with businesses in London, Birmingham and across the UK.',
  alternates: { canonical: '/about' },
};

const values = [
  {
    title: 'Direct accountability',
    desc: 'You talk to the engineer actually writing your code — not an account manager relaying messages overseas.',
    icon: MessageSquare,
  },
  {
    title: 'UK-based, UK compliant',
    desc: 'Every project is built and hosted with UK data protection, accessibility and tax requirements in mind from day one.',
    icon: ShieldCheck,
  },
  {
    title: 'No vendor lock-in',
    desc: 'You own the codebase, the domain and the infrastructure. Clean, documented code — no proprietary black boxes.',
    icon: Target,
  },
  {
    title: 'Small team, high output',
    desc: 'We stay deliberately lean so every client gets senior-level attention instead of being passed to a junior queue.',
    icon: Users,
  },
];

const process = [
  { step: '01', title: 'Discovery call', desc: 'A free, no-pressure conversation about your goals, timeline and budget.' },
  { step: '02', title: 'Proposal & quote', desc: 'A clear, fixed-scope proposal with pricing — no vague hourly estimates.' },
  { step: '03', title: 'Build in the open', desc: 'Weekly check-ins and a staging link so you watch progress in real time.' },
  { step: '04', title: 'Launch & support', desc: 'We ship, monitor performance, and stay on for ongoing support if you need it.' },
];

export default function AboutPage() {
  return (
    <div className="bg-paper px-6 py-20 transition-colors duration-300 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 border border-line px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink-secondary">
            <ShieldCheck className="h-4 w-4 text-accent" />
            The 24xDev Standard
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Enterprise-grade code. <br className="hidden md:block" />
            <span className="text-accent">Local Sheffield accountability.</span>
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal delay={0.15} className="space-y-6 leading-relaxed text-ink-secondary">
            <div className="space-y-6">
              <p>
                Most agencies hand your project to a non-technical account manager, or outsource the actual build
                overseas. At 24xDev, you work directly with the software architect building your product — from the
                first discovery call to the final deploy.
              </p>
              <p>
                We&apos;re based in Sheffield, South Yorkshire, and work with businesses across the UK who are tired
                of slow WordPress builds, unreliable freelancers, and agencies that disappear after invoicing.
              </p>
              <ul className="space-y-4 pt-2">
                {[
                  'Direct communication with Director Gurmanpreet Singh',
                  'Built for UK compliance, accessibility and fast local hosting',
                  'Clean, documented codebases with zero vendor lock-in',
                  'Fixed-scope quotes — no surprise hourly overruns',
                ].map((item) => (
                  <li key={item} className="flex gap-3 font-medium text-ink">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <Panel interactive className="p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink font-mono text-2xl font-bold text-ink">
                GS
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">Gurmanpreet Singh</h3>
              <p className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">
                Director &amp; Principal Architect
              </p>
              <blockquote className="mt-6 text-sm italic leading-relaxed text-ink-secondary">
                &ldquo;Our mission is to give UK businesses bespoke software that pays for itself from day one — no
                bloat, no jargon, no disappearing after the invoice.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-ink-secondary">
                <MapPin className="h-4 w-4 text-accent" /> Sheffield, South Yorkshire
              </div>
            </Panel>
          </Reveal>
        </div>

        {/* Values */}
        <div className="mt-24">
          <Reveal>
            <SectionIndex index={2} total={4} label="WHAT WE BELIEVE" />
            <h2 className="text-3xl font-display font-semibold text-ink sm:text-4xl">How we work with clients.</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 0.08}>
                <Panel className="h-full">
                  <div className="flex h-11 w-11 items-center justify-center border border-ink text-accent">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{v.desc}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mt-24">
          <Reveal>
            <SectionIndex index={3} total={4} label="OUR PROCESS" />
            <h2 className="text-3xl font-display font-semibold text-ink sm:text-4xl">From first call to launch.</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, idx) => (
              <Reveal key={p.step} delay={idx * 0.08}>
                <Panel className="h-full">
                  <span className="font-mono text-3xl font-black text-line">{p.step}</span>
                  <h3 className="mt-3 font-display text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{p.desc}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-24 border border-line bg-surface p-10 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-accent" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Let&apos;s talk about your project.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-secondary">
              Book a free, no-obligation consultation with Director Gurmanpreet Singh and get a fixed-scope quote
              within 48 hours.
            </p>
            <Button href="/contact" variant="primary" size="lg" className="mt-8">
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
