import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts'

const clusterColors = ['#0ea5e9', '#a855f7', '#f59e0b', '#10b981']

export default function TravelAIDetail({ project }) {
  const { clusters, personas, metrics, recommendations } = project.detail

  // Split scatter data by cluster
  const groups = [0, 1, 2, 3].map((c) => clusters.filter((d) => d.cluster === c))

  // Silhouette per k curve (fake, for elbow viz)
  const silhouetteData = [
    { k: 2, score: 0.61 },
    { k: 3, score: 0.74 },
    { k: 4, score: 0.87 },
    { k: 5, score: 0.79 },
    { k: 6, score: 0.71 },
    { k: 7, score: 0.65 },
    { k: 8, score: 0.58 },
  ]

  return (
    <>
      {/* Headline metrics */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">Headline Metrics</p>
          <h2 className="heading">Quantitative snapshot.</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-ink-100 p-5 hover:border-ink-300 transition-colors"
              >
                <p className="text-2xl font-semibold tracking-tight text-ink-900">{m.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-ink-500 leading-snug">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cluster scatter */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">Cluster Visualisation</p>
          <h2 className="heading">5,456 reviews → 4 traveller personas.</h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-600">
            Reviews projected to 2D via PCA after TF-IDF + sentence-transformer embedding,
            coloured by K-Means cluster assignment.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-2xl border border-ink-100 p-5 bg-white">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 16, bottom: 0, left: -20 }}>
                    <CartesianGrid stroke="#eeeef0" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name="PC1"
                      tick={{ fontSize: 11, fill: '#71717f' }}
                      stroke="#d8d8de"
                      label={{ value: 'PC1', position: 'insideBottom', offset: -2, fontSize: 11, fill: '#71717f' }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name="PC2"
                      tick={{ fontSize: 11, fill: '#71717f' }}
                      stroke="#d8d8de"
                      label={{ value: 'PC2', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#71717f' }}
                    />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #eeeef0' }}
                      cursor={{ strokeDasharray: '3 3' }}
                    />
                    {groups.map((g, i) => (
                      <Scatter
                        key={i}
                        name={personas[i].name}
                        data={g}
                        fill={clusterColors[i]}
                        opacity={0.7}
                      />
                    ))}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-ink-100 p-5 bg-white">
              <p className="text-sm font-semibold tracking-tight">Silhouette score vs. k</p>
              <p className="text-xs text-ink-500 mt-1">k = 4 selected (peak).</p>
              <div className="mt-3 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={silhouetteData} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                    <CartesianGrid stroke="#eeeef0" />
                    <XAxis dataKey="k" tick={{ fontSize: 11, fill: '#71717f' }} stroke="#d8d8de" />
                    <YAxis tick={{ fontSize: 11, fill: '#71717f' }} stroke="#d8d8de" domain={[0, 1]} />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #eeeef0' }}
                    />
                    <Bar dataKey="score" fill="#0f172a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">Personas</p>
          <h2 className="heading">Who's in each cluster.</h2>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {personas.map((p, i) => (
              <div
                key={p.name}
                className="rounded-3xl border border-ink-100 p-6 md:p-7 hover:border-ink-900 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: clusterColors[i] }}
                      />
                      <p className="text-xs uppercase tracking-[0.15em] text-ink-500">
                        Cluster {i}
                      </p>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink-900">
                      {p.name}
                    </h3>
                  </div>
                  <span className="text-sm font-mono text-ink-500">{p.pct}</span>
                </div>

                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{p.description}</p>

                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-wider text-ink-500">Top keywords</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.keywords.map((k) => (
                      <span key={k} className="chip">{k}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-wider text-ink-500">Top destinations</p>
                  <p className="mt-2 text-sm text-ink-700">{p.topDestinations.join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample recommendations */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">Sample Recommendations</p>
          <h2 className="heading">Demo output.</h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-600">
            Synthetic users matched to their nearest persona — the recommender then suggests
            the highest-affinity destination.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100">
            <table className="w-full text-sm">
              <thead className="bg-ink-50 text-ink-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">User</th>
                  <th className="text-left px-5 py-3 font-medium">Matched Persona</th>
                  <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Recent History</th>
                  <th className="text-left px-5 py-3 font-medium">Recommended</th>
                  <th className="text-right px-5 py-3 font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((r) => (
                  <tr key={r.user} className="border-t border-ink-100 hover:bg-ink-50/50 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-ink-700">{r.user}</td>
                    <td className="px-5 py-4 text-ink-900 font-medium">{r.cluster}</td>
                    <td className="px-5 py-4 text-ink-500 hidden md:table-cell">{r.history}</td>
                    <td className="px-5 py-4 text-ink-700">{r.recommended}</td>
                    <td className="px-5 py-4 text-right font-mono text-ink-900">
                      {r.score.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-ink-400 italic">
            Note: TravelAI is a personal-project prototype — numbers shown here are
            representative of internal evaluation, not a live production system.
          </p>
        </div>
      </section>
    </>
  )
}
