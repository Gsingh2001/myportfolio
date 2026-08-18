'use client';

import {
  Sparkles, Heart, Brain, Search, FileText, MessagesSquare, ArrowDown,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from 'recharts';
import { section, containerNarrow, sectionTitle, heading, chip, bulletDot } from '../ui';

const iconMap: Record<string, typeof Sparkles> = {
  'Thematic Classification': Sparkles,
  'Sentiment & Emotion Detection': Heart,
  'Mental Health Pattern Detection': Brain,
  'Smart Document Retrieval (RAG)': Search,
  'AI Summary Generation': FileText,
  'Interactive AI Chatbot': MessagesSquare,
};

export default function MedLinguistsDetail({ project }: { project: any }) {
  const { capabilities, pipeline, themes } = project.detail;

  return (
    <>
      {/* The York Model context */}
      <section className={section}>
        <div className={containerNarrow}>
          <p className={sectionTitle}>Domain Context</p>
          <h2 className={heading}>The York Model of AWH Quality of Life.</h2>
          <p className="mt-4 max-w-3xl text-[#5a5a66] leading-relaxed">
            The York Model captures the complex, interconnected QoL themes for Abdominal Wall
            Hernia patients across three superordinate domains — Psychology, Social Dynamics,
            and Daily Life — with five subordinate themes covering Body Image, Mental Health,
            Interpersonal Relationships, Employment, and Symptoms &amp; Function.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-[#eeeef0] p-6 md:p-8">
              <p className="text-sm font-semibold tracking-tight text-[#1a1a1f]">
                QoL Theme Distribution
              </p>
              <p className="text-xs text-[#71717f] mt-1">
                Share of patient narratives mentioning each theme (n = 500+).
              </p>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={themes}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={2}
                      strokeWidth={0}
                    >
                      {themes.map((t: any) => (
                        <Cell key={t.name} fill={t.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        fontSize: 12,
                        borderRadius: 8,
                        border: '1px solid #eeeef0',
                      }}
                      formatter={(v: any) => `${v}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-xs">
                {themes.map((t: any) => (
                  <span key={t.name} className="inline-flex items-center gap-2 text-[#5a5a66]">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-sm"
                      style={{ background: t.color }}
                    />
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#eeeef0] p-6 md:p-8 bg-[#f7f7f8]/40">
              <p className="text-sm font-semibold tracking-tight text-[#1a1a1f]">
                Why this matters
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[#494953] leading-relaxed">
                <li className="flex gap-3">
                  <span className={bulletDot} /> Psychological distress (body image, identity) is
                  frequently missed by conventional QoL tools.
                </li>
                <li className="flex gap-3">
                  <span className={bulletDot} /> Manual narrative coding is slow, inconsistent,
                  and doesn&apos;t scale.
                </li>
                <li className="flex gap-3">
                  <span className={bulletDot} /> Clinicians need structured, quote-grounded
                  reports — not just statistics.
                </li>
                <li className="flex gap-3">
                  <span className={bulletDot} /> Patient voice must remain central; AI augments,
                  not replaces, clinical judgement.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className={section}>
        <div className={containerNarrow}>
          <p className={sectionTitle}>Pipeline</p>
          <h2 className={heading}>From narrative to report.</h2>

          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {pipeline.map((step: any, i: number) => (
              <div
                key={i}
                className="relative rounded-2xl border border-[#eeeef0] p-4 hover:border-[#d8d8de] transition-colors bg-white"
              >
                <p className="text-[10px] uppercase tracking-wider text-[#71717f]">
                  Step {i + 1} · {step.group}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#1a1a1f] leading-snug">
                  {step.step}
                </p>
                {i < pipeline.length - 1 && (
                  <ArrowDown
                    size={14}
                    className="hidden md:block absolute -bottom-3 left-1/2 -translate-x-1/2 text-[#b6b6c0] bg-white"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className={section}>
        <div className={containerNarrow}>
          <p className={sectionTitle}>Core Capabilities</p>
          <h2 className={heading}>What the system does.</h2>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((c: any) => {
              const Icon = iconMap[c.title] || Sparkles;
              return (
                <div
                  key={c.title}
                  className="rounded-2xl border border-[#eeeef0] p-6 hover:border-[#d8d8de] hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1f] text-white flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-[#1a1a1f]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5a5a66] leading-relaxed">{c.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sample report excerpt */}
      <section className={section}>
        <div className={containerNarrow}>
          <p className={sectionTitle}>From Data to Diagnosis</p>
          <h2 className={heading}>Sample report excerpt.</h2>

          <div className="mt-8 rounded-3xl border border-[#eeeef0] overflow-hidden">
            <div className="px-6 py-4 bg-[#1a1a1f] text-white flex items-center justify-between">
              <p className="text-sm font-medium">Patient #047 — QoL Assessment</p>
              <p className="text-xs text-[#b6b6c0] font-mono">Generated by MedLinguists</p>
            </div>
            <div className="p-6 md:p-8 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#71717f]">Ranked themes</p>
                <ol className="mt-2 space-y-1 text-sm text-[#494953]">
                  <li>
                    1. Body Image <span className="text-[#8e8e9c]">— 38% of narrative</span>
                  </li>
                  <li>
                    2. Mental Health <span className="text-[#8e8e9c]">— 27%</span>
                  </li>
                  <li>
                    3. Symptoms &amp; Function <span className="text-[#8e8e9c]">— 18%</span>
                  </li>
                  <li>
                    4. Interpersonal Relationships <span className="text-[#8e8e9c]">— 11%</span>
                  </li>
                  <li>
                    5. Employment / Financial <span className="text-[#8e8e9c]">— 6%</span>
                  </li>
                </ol>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-[#71717f]">
                  Mental health signals
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className={chip}>Anxiety (high)</span>
                  <span className={chip}>Social withdrawal (moderate)</span>
                  <span className={chip}>Frustration (moderate)</span>
                </div>
              </div>

              <blockquote className="border-l-2 border-[#b6b6c0] pl-4 italic text-[#494953] text-sm">
                &quot;I avoid looking in the mirror most days. I don&apos;t recognise myself, and
                going out with friends feels impossible — I&apos;m always worried about the bulge
                showing.&quot;
                <span className="block not-italic text-xs text-[#71717f] mt-1">
                  — Retrieved excerpt (Body Image · Mental Health)
                </span>
              </blockquote>

              <div>
                <p className="text-xs uppercase tracking-wider text-[#71717f]">
                  Suggested clinical actions
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#494953]">
                  <li className="flex gap-3">
                    <span className={bulletDot} /> Screen for body-image distress (e.g. BIDQ).
                  </li>
                  <li className="flex gap-3">
                    <span className={bulletDot} /> Offer psychological-support pathway referral.
                  </li>
                  <li className="flex gap-3">
                    <span className={bulletDot} /> Revisit post-surgical body-image expectations in
                    next consult.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
