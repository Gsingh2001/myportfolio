import { experience } from './data';
import { containerNarrow, section, sectionTitle, heading, bulletDot } from './ui';
import Reveal from '@/components/ui/Reveal';

export default function Experience() {
  return (
    <section id="experience" className={section}>
      <div className={containerNarrow}>
        <p className={sectionTitle}>Experience</p>
        <h2 className={heading}>Where I&apos;ve built.</h2>

        <div className="mt-10 space-y-8">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.05}>
              <div className="grid md:grid-cols-12 gap-6 pb-8 border-b border-[#eeeef0] last:border-0 last:pb-0">
                <div className="md:col-span-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#71717f]">
                    {job.period}
                  </p>
                  <p className="mt-1 text-sm text-[#5a5a66]">{job.location}</p>
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-lg font-semibold tracking-tight text-[#1a1a1f]">
                    {job.role}
                  </h3>
                  <p className="text-[#5a5a66]">{job.company}</p>
                  <ul className="mt-4 space-y-2 text-sm text-[#494953] leading-relaxed">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3">
                        <span className={bulletDot} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
