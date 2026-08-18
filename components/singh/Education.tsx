import { education, publications } from './data';
import { containerNarrow, section, sectionTitle, heading, bulletDot } from './ui';
import Reveal from '@/components/ui/Reveal';

export default function Education() {
  return (
    <section id="education" className={section}>
      <div className={containerNarrow}>
        <p className={sectionTitle}>Education</p>
        <h2 className={heading}>Academic background.</h2>

        <div className="mt-10 space-y-6">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.05}>
              <div className="rounded-2xl border border-[#eeeef0] p-6 md:p-7 hover:border-[#d8d8de] transition-colors">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-tight text-[#1a1a1f]">
                    {e.degree}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-[#71717f]">
                    {e.period}
                  </span>
                </div>
                <p className="mt-1 text-[#5a5a66]">
                  {e.school} · {e.location}
                </p>
                <p className="mt-1 text-sm font-medium text-[#494953]">{e.grade}</p>
                <p className="mt-4 text-sm text-[#5a5a66] leading-relaxed">{e.notes}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {publications?.length > 0 && (
          <div className="mt-12">
            <p className={sectionTitle}>Publications</p>
            <ul className="mt-4 space-y-2 text-sm text-[#494953] leading-relaxed">
              {publications.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className={bulletDot} />
                  <span>{p.citation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
