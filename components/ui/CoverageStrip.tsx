import { MapPin } from 'lucide-react';

const cities = [
  'Sheffield',
  'London',
  'Birmingham',
  'Manchester',
  'Leeds',
  'Liverpool',
  'Bristol',
  'Newcastle',
  'Nottingham',
  'Leicester',
  'Edinburgh',
  'Glasgow',
  'Cardiff',
];

/**
 * Honest "where we work" strip — a single, real list of the areas we serve
 * remotely, not a set of near-identical templated city landing pages (which
 * search engines treat as doorway-page spam). One clear, truthful section
 * beats ten thin ones.
 */
export default function CoverageStrip() {
  return (
    <div className="mt-10">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">
        Sheffield HQ — working remotely with clients across
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {cities.map((city) => (
          <span
            key={city}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-300"
          >
            <MapPin className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
            {city}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300 dark:border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/30 px-4 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-400">
          + all of the UK
        </span>
      </div>
    </div>
  );
}
