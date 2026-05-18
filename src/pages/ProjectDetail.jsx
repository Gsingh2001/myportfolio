import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { projects } from '../data'
import AstraiosDetail from '../components/projects/AstraiosDetail'
import MedLinguistsDetail from '../components/projects/MedLinguistsDetail'
import AlgonautsDetail from '../components/projects/AlgonautsDetail'
import TravelAIDetail from '../components/projects/TravelAIDetail'

const detailMap = {
  astraios: AstraiosDetail,
  medlinguists: MedLinguistsDetail,
  algonauts: AlgonautsDetail,
  travelai: TravelAIDetail,
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <Navigate to="/" replace />

  const DetailBody = detailMap[slug]

  return (
    <>
      {/* Header / hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-ink-100 blur-3xl opacity-50 pointer-events-none"
          aria-hidden
        />
        <div className="container-narrow relative">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-ink-600 hover:text-ink-900 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>

          <p className="text-xs uppercase tracking-[0.2em] text-ink-500 font-medium">
            {project.org} · {project.period}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            {project.title}
          </h1>
          <p className="mt-3 text-xl md:text-2xl text-ink-500 font-medium">
            {project.subtitle}
          </p>

          <p className="mt-6 max-w-3xl text-base md:text-lg text-ink-600 leading-relaxed">
            {project.overview}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink-900 text-white text-sm font-medium hover:bg-ink-700 transition-colors"
              >
                <Github size={16} /> View on GitHub <ExternalLink size={14} />
              </a>
            )}
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink-200 text-ink-700 text-sm">
              <span className="text-ink-500">Role:</span> {project.role}
            </span>
          </div>
        </div>
      </section>

      {/* Quick metric */}
      <section className="border-y border-ink-100 bg-ink-50/40">
        <div className="container-narrow py-8 flex items-baseline gap-4">
          <span className="text-4xl md:text-5xl font-semibold tracking-tight text-ink-900">
            {project.metric}
          </span>
          <span className="text-sm uppercase tracking-wider text-ink-500">
            {project.metricLabel}
          </span>
        </div>
      </section>

      {/* Challenge & approach */}
      <section className="section">
        <div className="container-narrow grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="section-title">The Challenge</p>
            <p className="text-ink-700 leading-relaxed">{project.challenge}</p>
          </div>
          <div className="md:col-span-7">
            <p className="section-title">Approach</p>
            <ul className="space-y-3 text-ink-700 leading-relaxed">
              {project.approach.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 rounded-full bg-ink-400 flex-shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Project-specific detail */}
      {DetailBody && <DetailBody project={project} />}

      {/* Key highlights */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">Key Outcomes</p>
          <h2 className="heading">What shipped.</h2>
          <ul className="mt-8 grid md:grid-cols-2 gap-4">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="rounded-2xl border border-ink-100 p-5 text-sm text-ink-700 leading-relaxed"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
