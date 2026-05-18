import { personal } from '../data'

const stats = [
  { value: '7.8', label: 'MSc AI Distinction' },
  { value: '500+', label: 'Patient Narratives Processed' },
  { value: '60%', label: 'Manual Review Time Cut' },
  { value: '15%', label: 'Trajectory Drift Reduced' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-narrow">
        <p className="section-title">About</p>
        <h2 className="heading">
          An AI engineer focused on{' '}
          <span className="text-ink-500">turning research into shipping systems.</span>
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-5 text-ink-700 leading-relaxed">
            <p>{personal.summary}</p>
            <p>
              MSc Artificial Intelligence graduate (Distinction) from Sheffield Hallam
              University, targeting AI Engineering, Applied AI, and research roles in the UK.
              My work spans NLP, computer vision, SLAM/odometry, and sensor fusion — usually
              with a generative or retrieval-augmented twist.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-3 self-start">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-ink-100 p-4 hover:border-ink-200 transition-colors"
              >
                <p className="text-2xl font-semibold tracking-tight text-ink-900">{s.value}</p>
                <p className="mt-1 text-xs text-ink-500 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
