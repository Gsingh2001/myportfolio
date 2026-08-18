import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { sql } from '@/lib/db';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Blog | 24xDev',
  description:
    'Notes on web development, AI automation and building software for UK businesses — from the 24xDev team in Sheffield.',
  alternates: { canonical: '/blog' },
};

export const revalidate = 60;

type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  tags: string[];
  published_at: string;
};

async function getPosts(): Promise<PostSummary[]> {
  if (!sql) return [];
  try {
    const rows = await sql`
      SELECT slug, title, excerpt, cover_image, tags, published_at
      FROM posts
      WHERE published = true
      ORDER BY published_at DESC
      LIMIT 50
    `;
    return rows as unknown as PostSummary[];
  } catch (err) {
    console.error('Failed to load blog posts:', err);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="px-6 py-20 md:py-28 bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Blog</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white sm:text-5xl">
            Notes from the team.
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            Thoughts on web development, AI automation, and building software that holds up in
            production — from the 24xDev team in Sheffield.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <div className="mt-14 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-12 text-center transition-colors duration-300">
            <p className="text-slate-600 dark:text-slate-400">
              Nothing published yet — check back soon, or{' '}
              <Link href="/contact" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
                get in touch
              </Link>{' '}
              in the meantime.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 dark:hover:border-cyan-500/40 shadow-sm hover:shadow-xl dark:hover:shadow-cyan-500/10"
                >
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.published_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <h2 className="mt-3 text-lg font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                  {post.tags?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-5 flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                    Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
