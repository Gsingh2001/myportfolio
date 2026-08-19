import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { sql } from '@/lib/db';
import { estimateReadingTime } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';
import BlogGrid from '@/components/blog/BlogGrid';
import NewsletterForm from '@/components/ui/NewsletterForm';

export const metadata: Metadata = {
  title: 'Blog | 24xDev',
  description:
    'Notes on web development, AI automation and building software for UK businesses — from the 24xDev team in Sheffield.',
  alternates: { canonical: '/blog' },
};

export const revalidate = 60;

type PostRow = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  tags: string[];
  published_at: string;
};

async function getPosts(): Promise<PostRow[]> {
  if (!sql) return [];
  try {
    const rows = await sql`
      SELECT slug, title, excerpt, content, cover_image, tags, published_at
      FROM posts
      WHERE published = true
      ORDER BY published_at DESC
      LIMIT 50
    `;
    return rows as unknown as PostRow[];
  } catch (err) {
    console.error('Failed to load blog posts:', err);
    return [];
  }
}

export default async function BlogPage() {
  const rows = await getPosts();
  const posts = rows.map((post) => ({ ...post, readingTime: estimateReadingTime(post.content) }));
  const [featured, ...rest] = posts;

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
          <>
            {featured && (
              <Reveal delay={0.05} className="mt-14">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:border-cyan-300 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-cyan-500/40 shadow-sm hover:shadow-xl dark:hover:shadow-cyan-500/10 md:grid-cols-2"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-black md:h-full">
                    {featured.cover_image ? (
                      <img
                        src={featured.cover_image}
                        alt={featured.title}
                        loading="eager"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 font-mono text-2xl font-black text-black">
                          24
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <span className="w-fit rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
                      Latest
                    </span>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(featured.published_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {featured.readingTime} min read
                      </span>
                    </div>
                    <h2 className="mt-3 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">{featured.excerpt}</p>
                    <span className="mt-6 flex items-center gap-2 text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      Read the full post{' '}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )}

            {rest.length > 0 && (
              <Reveal delay={0.1} className="mt-16">
                <BlogGrid posts={rest} />
              </Reveal>
            )}

            <Reveal
              delay={0.15}
              className="mt-20 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-black p-8 text-center md:p-12"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Stay in the loop</p>
              <h2 className="mt-2 text-2xl font-black text-white">Get new posts by email.</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
                Occasional notes on new projects, engineering write-ups and what we&apos;re building. No spam.
              </p>
              <div className="mx-auto mt-6 max-w-sm">
                <NewsletterForm />
              </div>
            </Reveal>
          </>
        )}
      </div>
    </div>
  );
}
