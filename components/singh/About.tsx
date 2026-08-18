import { personal } from './data';
import { containerNarrow, section, sectionTitle, heading } from './ui';
import Reveal from '@/components/ui/Reveal';

const stats = [
  { value: '7.8', label: 'MSc AI Distinction' },
  { value: '500+', label: 'Patient Narratives Processed' },
  { value: '60%', label: 'Manual Review Time Cut' },
  { value: '15%', label: 'Trajectory Drift Reduced' },
];

export default function About() {
  return (
    <section id="about" className={section}>
      <div className={containerNarrow}>
        <p className={sectionTitle}>About</p>
        <h2 className={heading}>
          An AI engineer focused on{' '}
          <span className="text-[#71717f]">turning research into shipping systems.</span>
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-10">
          <Reveal className="md:col-span-2 space-y-5 text-[#494953] leading-relaxed">
            <p>{personal.summary}</p>
            <p>
              MSc Artificial Intelligence graduate (Distinction) from Sheffield Hallam
              University, targeting AI Engineering, Applied AI, and research roles in the UK.
              My work spans NLP, computer vision, SLAM/odometry, and sensor fusion — usually
              with a generative or retrieval-augmented twist.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 md:gap-3 self-start">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="rounded-2xl border border-[#eeeef0] p-4 hover:border-[#d8d8de] transition-colors">
                  <p className="text-2xl font-semibold tracking-tight text-[#1a1a1f]">{s.value}</p>
                  <p className="mt-1 text-xs text-[#71717f] leading-snug">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
