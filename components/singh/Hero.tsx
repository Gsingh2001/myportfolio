import Link from 'next/link';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personal } from './data';
import { containerNarrow, gridBgStyle } from './ui';

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 opacity-60 pointer-events-none" style={gridBgStyle} />
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#eeeef0] blur-3xl opacity-50 pointer-events-none"
        aria-hidden
      />

      <div className={`${containerNarrow} relative`}>
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#5a5a66] px-3 py-1.5 rounded-full border border-[#d8d8de] bg-white/60 backdrop-blur mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for AI Engineering roles in the UK
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-[#1a1a1f]">
            {personal.name}.
            <br />
            <span className="text-[#71717f]">{personal.role}.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base md:text-lg text-[#5a5a66] leading-relaxed">
            {personal.tagline}. Building production-grade ML systems — from RAG
            pipelines and LLM applications to multi-modal sensor fusion for autonomous systems.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/singh#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1a1a1f] text-white text-sm font-medium hover:bg-[#494953] transition-colors"
            >
              View Projects
              <ArrowDown size={16} />
            </Link>
            <Link
              href="/singh#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#d8d8de] text-[#1a1a1f] text-sm font-medium hover:bg-[#f7f7f8] transition-colors"
            >
              Contact
            </Link>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#d8d8de] text-[#1a1a1f] text-sm font-medium hover:bg-[#f7f7f8] transition-colors"
            >
              <Github size={16} /> GitHub
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#5a5a66]">
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} /> {personal.location}
            </span>
            <a
              className="inline-flex items-center gap-2 hover:text-[#1a1a1f] transition-colors"
              href={`mailto:${personal.email}`}
            >
              <Mail size={15} /> {personal.email}
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-[#1a1a1f] transition-colors"
              href={personal.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={15} /> GitHub
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-[#1a1a1f] transition-colors"
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
  );
}
