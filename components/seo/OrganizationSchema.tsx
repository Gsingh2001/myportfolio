const areaServed = [
  { '@type': 'Place', name: 'Worldwide' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Continent', name: 'Europe' },
  { '@type': 'Continent', name: 'North America' },
  { '@type': 'Continent', name: 'Asia' },
  { '@type': 'Continent', name: 'Oceania' },
];

/**
 * Site-wide Organization/ProfessionalService structured data.
 *
 * `address` names London only, with no street. `areaServed` describes remote
 * clients worldwide. It does not claim an office in each region, and the
 * site does not spin up city landing pages.
 */
export default function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: '24xDev',
    url: 'https://24xdev.co.uk',
    image: 'https://24xdev.co.uk/opengraph-image',
    description:
      'London software studio building websites, AI automation and custom software for clients worldwide. Projects can be delivered in many languages. Every project starts with a free quote.',
    slogan: 'Built to be noticed. Engineered to convert.',
    potentialAction: {
      '@type': 'CommunicateAction',
      name: 'Get a free quote',
      target: 'https://24xdev.co.uk/contact',
    },
    email: 'contact@24xdev.co.uk',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressRegion: 'England',
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
