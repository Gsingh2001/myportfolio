import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { sql } from '@/lib/db';
import { estimateReadingTime } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';
import Eyebrow from '@/components/ui/Eyebrow';
import Tag from '@/components/ui/Tag';
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
    <div className="bg-paper px-6 py-20 transition-colors duration-300 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">Notes from the team.</h1>
          <p className="mt-4 leading-relaxed text-ink-secondary">
            Thoughts on web development, AI automation, and building software that holds up in
            production — from the 24xDev team in Sheffield.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <div className="mt-14 border border-line bg-surface p-12 text-center">
            <p className="text-ink-secondary">
              Nothing published yet — check back soon, or{' '}
              <Link href="/contact" className="font-semibold text-accent hover:underline">
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
                  className="group grid overflow-hidden border border-line bg-surface transition-colors duration-200 hover:border-accent md:grid-cols-2"
                >
                  <div className="relative h-64 w-full overflow-hidden border-b border-line bg-surface-alt md:h-full md:border-b-0 md:border-r">
                    {featured.cover_image ? (
                      <img
                        src={featured.cover_image}
                        alt={featured.title}
                        loading="eager"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center border-2 border-ink font-mono text-2xl font-black text-ink">
                          24
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <Tag tone="accent" className="w-fit">Latest</Tag>
                    <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider text-ink-secondary">
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
                    <h2 className="mt-3 font-display text-2xl font-semibold text-ink group-hover:text-accent sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-ink-secondary">{featured.excerpt}</p>
                    <span className="mt-6 flex items-center gap-2 font-mono text-sm font-bold text-accent">
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

            <Reveal delay={0.15} className="mt-20 border border-line bg-surface p-8 text-center md:p-12">
              <Eyebrow className="text-center">Stay in the loop</Eyebrow>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Get new posts by email.</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-ink-secondary">
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
