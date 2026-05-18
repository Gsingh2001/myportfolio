import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { personal } from '../data'

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-ink-100 blur-3xl opacity-50 pointer-events-none"
        aria-hidden
      />

      <div className="container-narrow relative">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-ink-600 px-3 py-1.5 rounded-full border border-ink-200 bg-white/60 backdrop-blur mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for AI Engineering roles in the UK
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
            {personal.name}.
            <br />
            <span className="text-ink-500">{personal.role}.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base md:text-lg text-ink-600 leading-relaxed">
            {personal.tagline}. Building production-grade ML systems — from RAG
            pipelines and LLM applications to multi-modal sensor fusion for autonomous systems.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink-900 text-white text-sm font-medium hover:bg-ink-700 transition-colors"
            >
              View Projects
              <ArrowDown size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink-200 text-ink-900 text-sm font-medium hover:bg-ink-50 transition-colors"
            >
              Contact
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink-200 text-ink-900 text-sm font-medium hover:bg-ink-50 transition-colors"
            >
              <Github size={16} /> GitHub
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-600">
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} /> {personal.location}
            </span>
            <a
              className="inline-flex items-center gap-2 hover:text-ink-900 transition-colors"
              href={`mailto:${personal.email}`}
            >
              <Mail size={15} /> {personal.email}
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-ink-900 transition-colors"
              href={personal.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={15} /> GitHub
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-ink-900 transition-colors"
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
