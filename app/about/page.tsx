import Link from 'next/link';
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
    <div className="px-6 py-20 md:py-28 bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-950/40 px-5 py-2 text-xs font-bold uppercase tracking-widest dark:text-cyan-400 transition-colors duration-300">
            <ShieldCheck className="h-4 w-4" />
            The 24xDev Standard
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl leading-[1.1] transition-colors duration-300">
            Enterprise-grade code. <br className="hidden md:block" />
            <span className="text-gradient-flow bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-600 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-500 bg-clip-text text-transparent">
              Local Sheffield accountability.
            </span>
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal delay={0.15} className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
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
                  <li key={item} className="flex gap-3 font-medium text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.25} scale>
            <div className="rounded-2xl border border-cyan-200 dark:border-cyan-500/30 bg-white dark:bg-slate-900/90 p-8 shadow-sm dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-cyan-500/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950 font-mono text-2xl font-bold text-cyan-700 dark:text-cyan-300">
                GS
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Gurmanpreet Singh</h3>
              <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Director &amp; Principal Architect</p>
              <blockquote className="mt-6 text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed">
                &ldquo;Our mission is to give UK businesses bespoke software that pays for itself from day one — no
                bloat, no jargon, no disappearing after the invoice.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <MapPin className="h-4 w-4 text-cyan-600 dark:text-cyan-400" /> Sheffield, South Yorkshire
              </div>
            </div>
          </Reveal>
        </div>

        {/* Values */}
        <div className="mt-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">What we believe</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl transition-colors duration-300">
              How we work with clients.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 0.08}>
                <div className="group rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 dark:hover:border-cyan-500/40 hover:shadow-lg dark:hover:shadow-cyan-500/5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/50 text-cyan-600 dark:text-cyan-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{v.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mt-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Our process</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl transition-colors duration-300">
              From first call to launch.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, idx) => (
              <Reveal key={p.step} delay={idx * 0.08}>
                <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 dark:hover:border-cyan-500/40">
                  <span className="font-mono text-3xl font-black text-cyan-600/30 dark:text-cyan-400/20">{p.step}</span>
                  <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-24 rounded-3xl border border-cyan-200 dark:border-cyan-500/30 bg-gradient-to-br from-white to-slate-50 dark:from-[#0a1118] dark:to-[#05090d] p-10 text-center transition-colors duration-300">
            <Sparkles className="mx-auto h-8 w-8 text-cyan-600 dark:text-cyan-400" />
            <h2 className="mt-4 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
              Let&apos;s talk about your project.
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              Book a free, no-obligation consultation with Director Gurmanpreet Singh and get a fixed-scope quote
              within 48 hours.
            </p>
            <Link
              href="/contact"
              className="cta-glow mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 px-8 py-4 text-sm font-black text-white dark:text-black shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
