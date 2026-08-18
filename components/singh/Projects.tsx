'use client';

import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from './data';
import { containerNarrow, section, sectionTitle, heading, chip, bulletDot } from './ui';
import Reveal from '@/components/ui/Reveal';

export default function Projects() {
  return (
    <section id="projects" className={section}>
      <div className={containerNarrow}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={sectionTitle}>Selected Projects</p>
            <h2 className={heading}>Recent work.</h2>
          </div>
          <p className="text-sm text-[#71717f] max-w-sm">
            A snapshot of research and applied ML projects spanning NLP, computer vision,
            and generative AI. Click any card for a full case study.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05} className="h-full">
              <article className="group relative rounded-3xl border border-[#eeeef0] p-7 md:p-8 hover:border-[#1a1a1f] transition-all duration-300 bg-white flex flex-col h-full">
                <Link
                  href={`/singh/projects/${p.slug}`}
                  aria-label={`Open ${p.title} case study`}
                  className="absolute inset-0 rounded-3xl"
                />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#71717f]">{p.org}</p>
                    <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-[#1a1a1f]">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-[#5a5a66]">{p.subtitle}</p>
                  </div>
                  <ArrowUpRight
                    size={22}
                    className="text-[#b6b6c0] group-hover:text-[#1a1a1f] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </div>

                <ul className="mt-6 space-y-2.5 text-sm text-[#494953] leading-relaxed flex-1">
                  {p.highlights.slice(0, 3).map((h, j) => (
                    <li key={j} className="flex gap-3">
                      <span className={bulletDot} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.slice(0, 5).map((t) => (
                    <span key={t} className={chip}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[#eeeef0] flex items-center justify-between gap-3 relative z-10">
                  {p.metric && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-semibold tracking-tight text-[#1a1a1f]">
                        {p.metric}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-[#71717f]">
                        {p.metricLabel}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 ml-auto">
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs text-[#5a5a66] hover:text-[#1a1a1f] transition-colors relative z-10"
                      >
                        <Github size={14} /> Code
                      </a>
                    )}
                    <Link
                      href={`/singh/projects/${p.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1a1a1f] relative z-10"
                    >
                      Case study →
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
