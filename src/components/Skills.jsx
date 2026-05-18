import { skills } from '../data'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-narrow">
        <p className="section-title">Skills</p>
        <h2 className="heading">
          The stack I build with.
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-ink-100 p-6 hover:border-ink-300 hover:shadow-sm transition-all duration-300"
            >
              <p className="text-sm font-semibold tracking-tight text-ink-900">
                {group.category}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
