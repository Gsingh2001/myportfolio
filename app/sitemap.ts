import type { MetadataRoute } from 'next';
import { sql } from '@/lib/db';

const siteUrl = 'https://24xdev.co.uk';

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/tech', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  // Intentionally NOT listed: /singh — Gurmanpreet's personal portfolio,
  // kept unlisted and unindexed on purpose.
];

async function getBlogRoutes(): Promise<MetadataRoute.Sitemap> {
  if (!sql) return [];
  try {
    const rows = await sql`SELECT slug, updated_at FROM posts WHERE published = true`;
    return (rows as { slug: string; updated_at: string }[]).map((row) => ({
      url: `${siteUrl}/blog/${row.slug}`,
      lastModified: new Date(row.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (err) {
    console.error('sitemap: failed to load blog posts:', err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
  const blogRoutes = await getBlogRoutes();
  return [...staticRoutes, ...blogRoutes];
}
