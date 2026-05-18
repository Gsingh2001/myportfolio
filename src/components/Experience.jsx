import { experience } from '../data'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-narrow">
        <p className="section-title">Experience</p>
        <h2 className="heading">Where I've built.</h2>

        <div className="mt-10 space-y-8">
          {experience.map((job) => (
            <div
              key={job.company}
              className="grid md:grid-cols-12 gap-6 pb-8 border-b border-ink-100 last:border-0 last:pb-0"
            >
              <div className="md:col-span-4">
                <p className="text-xs uppercase tracking-[0.15em] text-ink-500">
                  {job.period}
                </p>
                <p className="mt-1 text-sm text-ink-600">{job.location}</p>
              </div>
              <div className="md:col-span-8">
                <h3 className="text-lg font-semibold tracking-tight text-ink-900">
                  {job.role}
                </h3>
                <p className="text-ink-600">{job.company}</p>
                <ul className="mt-4 space-y-2 text-sm text-ink-700 leading-relaxed">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 rounded-full bg-ink-400 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
