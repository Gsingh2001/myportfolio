import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

// Plausible-looking training loss curves for the conditional DCGAN
const lossCurve = Array.from({ length: 50 }, (_, i) => {
  const epoch = i * 10
  const g = 2.4 * Math.exp(-i / 14) + 0.6 + (Math.random() - 0.5) * 0.18
  const d = 1.9 * Math.exp(-i / 18) + 0.45 + (Math.random() - 0.5) * 0.15
  return { epoch, generator: +g.toFixed(3), discriminator: +d.toFixed(3) }
})

export default function AlgonautsDetail({ project }) {
  const { results } = project.detail

  return (
    <>
      {/* Pipeline */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">Pipeline</p>
          <h2 className="heading">fMRI → image, end-to-end.</h2>
          <div className="mt-8 rounded-3xl border border-ink-100 p-6 md:p-10 bg-white">
            <div className="grid md:grid-cols-5 gap-3 text-center text-sm">
              {[
                { t: "fMRI Voxels", s: "≈19,000 dims" },
                { t: "PCA", s: "1024 → 128" },
                { t: "Generator", s: "Conditional DCGAN" },
                { t: "Discriminator", s: "Joint cond." },
                { t: "Output", s: "32×32 RGB" },
              ].map((m, i) => (
                <div key={m.t} className="relative rounded-xl border border-ink-200 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-ink-500">
                    Stage {i + 1}
                  </p>
                  <p className="mt-1 font-semibold">{m.t}</p>
                  <p className="text-xs text-ink-500 mt-1">{m.s}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-ink-900 text-white p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-ink-300">Conditioning</p>
              <p className="mt-1 font-semibold">
                PCA features concatenated with noise · ResNet-50 perceptual loss
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results metrics */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">Results</p>
          <h2 className="heading">Quantitative evaluation.</h2>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {results.map((r) => (
              <div
                key={r.metric}
                className="rounded-2xl border border-ink-100 p-5 hover:border-ink-300 transition-colors"
              >
                <p className="text-xs uppercase tracking-wider text-ink-500">{r.metric}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-ink-900">{r.value}</p>
                <p className="mt-1 text-xs text-ink-500">{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loss curves */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">Training Dynamics</p>
          <h2 className="heading">Generator vs. Discriminator loss.</h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-600">
            500-epoch conditional DCGAN run. Loss values are illustrative — exact figures are
            in <code className="text-xs">results/figures/exp2_loss.png</code> of the repo.
          </p>

          <div className="mt-8 rounded-2xl border border-ink-100 p-5 bg-white">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lossCurve} margin={{ top: 5, right: 16, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eeeef0" />
                  <XAxis dataKey="epoch" tick={{ fontSize: 11, fill: '#71717f' }} stroke="#d8d8de" />
                  <YAxis tick={{ fontSize: 11, fill: '#71717f' }} stroke="#d8d8de" />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #eeeef0' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="generator" stroke="#1d4ed8" dot={false} strokeWidth={2} isAnimationActive={false} />
                  <Line type="monotone" dataKey="discriminator" stroke="#f97316" dot={false} strokeWidth={2} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

 
    </>
  )
}
