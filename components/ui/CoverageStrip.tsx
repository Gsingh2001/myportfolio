import { MapPin } from 'lucide-react';
import Tag from '@/components/ui/Tag';

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
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-ink-secondary">
        Sheffield HQ — working remotely with clients across
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {cities.map((city) => (
          <Tag key={city} tone="outline" className="gap-1.5 py-1.5">
            <MapPin className="h-3 w-3 text-accent" />
            {city}
          </Tag>
        ))}
        <Tag tone="accent" className="py-1.5">
          + all of the UK
        </Tag>
      </div>
    </div>
  );
}
