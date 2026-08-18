import { Award } from 'lucide-react';
import { awards } from './data';
import { containerNarrow, section, sectionTitle, heading } from './ui';
import Reveal from '@/components/ui/Reveal';

export default function Awards() {
  return (
    <section id="awards" className={section}>
      <div className={containerNarrow}>
        <p className={sectionTitle}>Awards &amp; Achievements</p>
        <h2 className={heading}>Recognitions.</h2>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="flex gap-4 rounded-2xl border border-[#eeeef0] p-6 hover:border-[#d8d8de] transition-colors h-full">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center text-[#494953]">
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-[#1a1a1f]">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#5a5a66] leading-relaxed">{a.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
