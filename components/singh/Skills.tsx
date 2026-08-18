import { skills } from './data';
import { containerNarrow, section, sectionTitle, heading, chip } from './ui';
import Reveal from '@/components/ui/Reveal';

export default function Skills() {
  return (
    <section id="skills" className={section}>
      <div className={containerNarrow}>
        <p className={sectionTitle}>Skills</p>
        <h2 className={heading}>The stack I build with.</h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.05}>
              <div className="rounded-2xl border border-[#eeeef0] p-6 hover:border-[#d8d8de] hover:shadow-sm transition-all duration-300">
                <p className="text-sm font-semibold tracking-tight text-[#1a1a1f]">
                  {group.category}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className={chip}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
