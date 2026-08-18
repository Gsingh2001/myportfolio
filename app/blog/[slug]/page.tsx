import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sql } from '@/lib/db';
import Reveal from '@/components/ui/Reveal';

export const revalidate = 60;

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  tags: string[];
  published: boolean;
  published_at: string;
};

async function getPost(slug: string): Promise<Post | null> {
  if (!sql) return null;
  try {
    const rows = await sql`
      SELECT slug, title, excerpt, content, cover_image, tags, published, published_at
      FROM posts
      WHERE slug = ${slug} AND published = true
      LIMIT 1
    `;
    return (rows[0] as unknown as Post) ?? null;
  } catch (err) {
    console.error(`Failed to load blog post "${slug}":`, err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | 24xDev Blog`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.published_at,
      tags: post.tags,
      authors: ['Gurmanpreet Singh'],
      ...(post.cover_image ? { images: [{ url: post.cover_image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="px-6 py-20 md:py-28 bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.published_at,
            dateModified: post.published_at,
            ...(post.cover_image ? { image: [post.cover_image] } : {}),
            author: {
              '@type': 'Person',
              name: 'Gurmanpreet Singh',
            },
            publisher: {
              '@type': 'Organization',
              name: '24xDev',
              logo: {
                '@type': 'ImageObject',
                url: 'https://24xdev.co.uk/logo/android-chrome-512x512.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://24xdev.co.uk/blog/${post.slug}`,
            },
          }),
        }}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <p className="mt-8 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.published_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl md:text-5xl leading-tight">
            {post.title}
          </h1>
          {post.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-8 md:p-10 transition-colors duration-300"
        >
          <article className="text-slate-700 dark:text-slate-300 leading-relaxed [&>*+*]:mt-5">
            <ReactMarkdown
              components={{
                h1: (props) => <h2 className="text-2xl font-black text-slate-900 dark:text-white" {...props} />,
                h2: (props) => <h2 className="text-2xl font-black text-slate-900 dark:text-white" {...props} />,
                h3: (props) => <h3 className="text-xl font-bold text-slate-900 dark:text-white" {...props} />,
                a: (props) => (
                  <a className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline" {...props} />
                ),
                ul: (props) => <ul className="list-disc space-y-2 pl-6" {...props} />,
                ol: (props) => <ol className="list-decimal space-y-2 pl-6" {...props} />,
                blockquote: (props) => (
                  <blockquote
                    className="border-l-4 border-cyan-300 dark:border-cyan-500/40 pl-4 italic text-slate-600 dark:text-slate-400"
                    {...props}
                  />
                ),
                code: (props) => (
                  <code className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-sm" {...props} />
                ),
                pre: (props) => (
                  <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 rounded-2xl border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/10 p-7 text-center transition-colors duration-300">
          <p className="text-slate-700 dark:text-slate-300">Have a project in mind?</p>
          <Link
            href="/contact"
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-black text-white"
          >
            Get a Free Quote
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
