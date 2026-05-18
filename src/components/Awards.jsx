import { Award } from 'lucide-react'
import { awards } from '../data'

export default function Awards() {
  return (
    <section id="awards" className="section">
      <div className="container-narrow">
        <p className="section-title">Awards & Achievements</p>
        <h2 className="heading">Recognitions.</h2>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {awards.map((a) => (
            <div
              key={a.title}
              className="flex gap-4 rounded-2xl border border-ink-100 p-6 hover:border-ink-300 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ink-50 flex items-center justify-center text-ink-700">
                <Award size={18} />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-ink-900">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm text-ink-600 leading-relaxed">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
