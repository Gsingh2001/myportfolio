export default function AstraiosDetail({ project }) {
  const { scenes, overall, overview } = project.detail

  const stats = [
    { label: "Trajectory Error", value: `${overall.trajectory_error_pct}%` },
    { label: "Total RMSE", value: `${overall.rmse_m}m` },
    { label: "Path Length", value: `${overall.trajectory_distance_km}km` },
    { label: "Drift Reduction", value: `−${overall.drift_reduction_pct}%` },
    { label: "Scenes Evaluated", value: overall.scenes_evaluated },
  ]

  return (
    <>
      {/* 3D Overview */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">3D Trajectory Overview</p>
          <h2 className="heading">All Moon_* sequences combined.</h2>
          <p className="mt-3 max-w-3xl text-sm text-ink-600">
            Combined ground-truth (blue) vs. QXMT-SLAM prediction (orange) across all
            evaluated lunar-analog sequences in 3D world coordinates.
          </p>

          <div className="mt-8 rounded-3xl border border-ink-100 p-4 md:p-6 bg-white">
            <img
              src={overview}
              alt="3D trajectory: all Moon sequences"
              className="w-full h-auto rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Aggregate results */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">Results — Aggregate</p>
          <h2 className="heading">Across 8 lunar-analog scenes.</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-ink-100 p-5 hover:border-ink-300 transition-colors"
              >
                <p className="text-2xl font-semibold tracking-tight text-ink-900">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-ink-500 leading-snug uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-scene plots */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">Results — Per Scene</p>
          <h2 className="heading">GT vs. QXMT-SLAM trajectories.</h2>
          <p className="mt-4 max-w-3xl text-ink-600">
            Each plot compares the ground-truth trajectory against the QXMT-SLAM prediction
            for one Moon_* scene. Drift accumulates over the path; lower ATE
            (Absolute Trajectory Error) is better.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {scenes.map((s) => (
              <figure
                key={s.name}
                className="rounded-2xl border border-ink-100 p-4 bg-white hover:border-ink-300 transition-colors"
              >
                <img
                  src={s.image}
                  alt={`Scene ${s.name} trajectory`}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
                <figcaption className="mt-3 flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-ink-900">Scene {s.name}</span>
                  <span className="text-xs text-ink-500 font-mono">
                    RMSE {s.rmse} · ATE {s.ate}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section">
        <div className="container-narrow">
          <p className="section-title">Architecture</p>
          <h2 className="heading">Multi-modal fusion pipeline.</h2>

          <div className="mt-8 rounded-3xl border border-ink-100 p-6 md:p-10 bg-white">
            <div className="grid md:grid-cols-5 gap-4 text-center text-sm">
              {[
                { t: "Camera", s: "RGB frames" },
                { t: "LiDAR", s: "Point cloud" },
                { t: "IMU", s: "Linear / angular accel." },
              ].map((m) => (
                <div
                  key={m.t}
                  className="md:col-span-1 rounded-xl border border-ink-200 p-4"
                >
                  <p className="text-xs uppercase tracking-wider text-ink-500">Modality</p>
                  <p className="mt-1 font-semibold">{m.t}</p>
                  <p className="text-xs text-ink-500 mt-1">{m.s}</p>
                </div>
              ))}
              <div className="md:col-span-2 rounded-xl bg-ink-900 text-white p-4">
                <p className="text-xs uppercase tracking-wider text-ink-300">Fusion</p>
                <p className="mt-1 font-semibold">
                  Transformer Encoders + Quantum-Inspired Cross-Attention
                </p>
                <p className="text-xs text-ink-300 mt-1">
                  Per-modality embedding → fused token stream
                </p>
              </div>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-ink-200 p-4">
                <p className="text-xs uppercase tracking-wider text-ink-500">
                  Temporal Modelling
                </p>
                <p className="mt-1 font-semibold">LSTM over fused tokens</p>
                <p className="text-xs text-ink-500 mt-1">
                  Sequence-aware pose increment prediction
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                <p className="text-xs uppercase tracking-wider text-emerald-700">Output</p>
                <p className="mt-1 font-semibold text-emerald-900">6-DoF trajectory</p>
                <p className="text-xs text-emerald-700 mt-1">
                  Evaluated via ATE / RMSE per scene
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
