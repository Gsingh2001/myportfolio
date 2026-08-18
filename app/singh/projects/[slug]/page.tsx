import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projects } from '@/components/singh/data';
import { containerNarrow, sectionTitle, heading, chip, bulletDot } from '@/components/singh/ui';
import AstraiosDetail from '@/components/singh/projects/AstraiosDetail';
import MedLinguistsDetail from '@/components/singh/projects/MedLinguistsDetail';
import AlgonautsDetail from '@/components/singh/projects/AlgonautsDetail';
import TravelAIDetail from '@/components/singh/projects/TravelAIDetail';

const detailMap: Record<string, React.ComponentType<{ project: any }>> = {
  astraios: AstraiosDetail,
  medlinguists: MedLinguistsDetail,
  algonauts: AlgonautsDetail,
  travelai: TravelAIDetail,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Gurmanpreet Singh`,
    description: project.overview,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const DetailBody = detailMap[slug];

  return (
    <>
      {/* Header / hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#eeeef0] blur-3xl opacity-50 pointer-events-none"
          aria-hidden
        />
        <div className={`${containerNarrow} relative`}>
          <Link
            href="/singh#projects"
            className="inline-flex items-center gap-2 text-sm text-[#5a5a66] hover:text-[#1a1a1f] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>

          <p className="text-xs uppercase tracking-[0.2em] text-[#71717f] font-medium">
            {project.org} · {project.period}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-[#1a1a1f]">
            {project.title}
          </h1>
          <p className="mt-3 text-xl md:text-2xl text-[#71717f] font-medium">{project.subtitle}</p>

          <p className="mt-6 max-w-3xl text-base md:text-lg text-[#5a5a66] leading-relaxed">
            {project.overview}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className={chip}>
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1a1a1f] text-white text-sm font-medium hover:bg-[#494953] transition-colors"
              >
                <Github size={16} /> View on GitHub <ExternalLink size={14} />
              </a>
            )}
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#d8d8de] text-[#494953] text-sm">
              <span className="text-[#71717f]">Role:</span> {project.role}
            </span>
          </div>
        </div>
      </section>

      {/* Quick metric */}
      <section className="border-y border-[#eeeef0] bg-[#f7f7f8]/40">
        <div className={`${containerNarrow} py-8 flex items-baseline gap-4`}>
          <span className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1a1a1f]">
            {project.metric}
          </span>
          <span className="text-sm uppercase tracking-wider text-[#71717f]">
            {project.metricLabel}
          </span>
        </div>
      </section>

      {/* Challenge & approach */}
      <section className="py-20 md:py-28">
        <div className={`${containerNarrow} grid md:grid-cols-12 gap-10`}>
          <div className="md:col-span-5">
            <p className={sectionTitle}>The Challenge</p>
            <p className="text-[#494953] leading-relaxed">{project.challenge}</p>
          </div>
          <div className="md:col-span-7">
            <p className={sectionTitle}>Approach</p>
            <ul className="space-y-3 text-[#494953] leading-relaxed">
              {project.approach.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className={bulletDot} />
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
      <section className="py-20 md:py-28 border-t border-[#eeeef0]">
        <div className={containerNarrow}>
          <p className={sectionTitle}>Key Outcomes</p>
          <h2 className={heading}>What shipped.</h2>
          <ul className="mt-8 grid md:grid-cols-2 gap-4">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="rounded-2xl border border-[#eeeef0] p-5 text-sm text-[#494953] leading-relaxed"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
