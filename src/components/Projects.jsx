import { Link } from 'react-router-dom'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '../data'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-narrow">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-title">Selected Projects</p>
            <h2 className="heading">Recent work.</h2>
          </div>
          <p className="text-sm text-ink-500 max-w-sm">
            A snapshot of research and applied ML projects spanning NLP, computer vision,
            and generative AI. Click any card for a full case study.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative rounded-3xl border border-ink-100 p-7 md:p-8 hover:border-ink-900 transition-all duration-300 bg-white flex flex-col"
            >
              <Link
                to={`/projects/${p.slug}`}
                aria-label={`Open ${p.title} case study`}
                className="absolute inset-0 rounded-3xl"
              />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-ink-500">
                    {p.org}
                  </p>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-ink-600">{p.subtitle}</p>
                </div>
                <ArrowUpRight
                  size={22}
                  className="text-ink-300 group-hover:text-ink-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                />
              </div>

              <ul className="mt-6 space-y-2.5 text-sm text-ink-700 leading-relaxed flex-1">
                {p.highlights.slice(0, 3).map((h, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 rounded-full bg-ink-400 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.slice(0, 5).map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-ink-100 flex items-center justify-between gap-3 relative z-10">
                {p.metric && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold tracking-tight text-ink-900">
                      {p.metric}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-ink-500">
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
                      className="inline-flex items-center gap-1.5 text-xs text-ink-600 hover:text-ink-900 transition-colors"
                    >
                      <Github size={14} /> Code
                    </a>
                  )}
                  <Link
                    to={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-ink-900 relative z-10"
                  >
                    Case study →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
