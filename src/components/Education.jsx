import { education, publications } from '../data'

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container-narrow">
        <p className="section-title">Education</p>
        <h2 className="heading">Academic background.</h2>

        <div className="mt-10 space-y-6">
          {education.map((e) => (
            <div
              key={e.degree}
              className="rounded-2xl border border-ink-100 p-6 md:p-7 hover:border-ink-300 transition-colors"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight text-ink-900">
                  {e.degree}
                </h3>
                <span className="text-xs uppercase tracking-wider text-ink-500">
                  {e.period}
                </span>
              </div>
              <p className="mt-1 text-ink-600">
                {e.school} · {e.location}
              </p>
              <p className="mt-1 text-sm font-medium text-ink-700">{e.grade}</p>
              <p className="mt-4 text-sm text-ink-600 leading-relaxed">{e.notes}</p>
            </div>
          ))}
        </div>

        {publications?.length > 0 && (
          <div className="mt-12">
            <p className="section-title">Publications</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-700 leading-relaxed">
              {publications.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 rounded-full bg-ink-400 flex-shrink-0" />
                  <span>{p.citation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
