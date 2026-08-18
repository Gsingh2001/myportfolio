const areaServed = [
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'City', name: 'Sheffield' },
  { '@type': 'City', name: 'London' },
  { '@type': 'City', name: 'Birmingham' },
  { '@type': 'City', name: 'Manchester' },
  { '@type': 'City', name: 'Leeds' },
  { '@type': 'City', name: 'Liverpool' },
  { '@type': 'City', name: 'Bristol' },
  { '@type': 'City', name: 'Newcastle upon Tyne' },
  { '@type': 'City', name: 'Nottingham' },
  { '@type': 'City', name: 'Leicester' },
  { '@type': 'City', name: 'Edinburgh' },
  { '@type': 'City', name: 'Glasgow' },
  { '@type': 'City', name: 'Cardiff' },
];

/**
 * Site-wide Organization/ProfessionalService structured data.
 *
 * `address` intentionally only names the real Sheffield base (city + region,
 * no fabricated street address). `areaServed` is the correct schema.org
 * property for "we work with clients in these places remotely" — unlike
 * `address`, it does not claim a physical branch in each city. This mirrors
 * Google's own guidance for service-area businesses: describe your real
 * service area with `areaServed`/on-page copy rather than spinning up thin,
 * near-identical "city" landing pages, which reads as doorway-page spam.
 */
export default function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: '24xDev',
    url: 'https://24xdev.co.uk',
    image: 'https://24xdev.co.uk/opengraph-image',
    description:
      'UK-based software engineering studio building high-performance websites, AI automation and custom dashboards for businesses across the United Kingdom.',
    email: 'contact@24xdev.co.uk',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sheffield',
      addressRegion: 'South Yorkshire',
      addressCountry: 'GB',
    },
    founder: {
      '@type': 'Person',
      name: 'Gurmanpreet Singh',
      jobTitle: 'Director & Principal Architect',
    },
    areaServed,
    knowsAbout: [
      'Web Development',
      'Next.js Development',
      'AI Automation',
      'Custom Software Development',
      'E-commerce Development',
      'Dashboard Development',
      'Technical SEO',
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
