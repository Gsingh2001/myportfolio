import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, ChevronRight, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sql } from '@/lib/db';
import { estimateReadingTime, extractHeadings } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';
import Tag from '@/components/ui/Tag';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import AuthorCard from '@/components/blog/AuthorCard';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedPosts from '@/components/blog/RelatedPosts';

export const revalidate = 60;

const siteUrl = 'https://24xdev.co.uk';

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

type RelatedRow = {
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  tags: string[];
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

async function getRelatedPosts(currentSlug: string, tags: string[]): Promise<RelatedRow[]> {
  if (!sql) return [];
  try {
    const rows = await sql`
      SELECT slug, title, excerpt, cover_image, tags, published_at
      FROM posts
      WHERE published = true AND slug != ${currentSlug}
      ORDER BY published_at DESC
      LIMIT 20
    `;
    const candidates = rows as unknown as RelatedRow[];
    return candidates
      .map((post) => ({ post, score: post.tags?.filter((tag) => tags.includes(tag)).length ?? 0 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((entry) => entry.post);
  } catch (err) {
    console.error(`Failed to load related posts for "${currentSlug}":`, err);
    return [];
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

  const readingTime = estimateReadingTime(post.content);
  const headings = extractHeadings(post.content);
  const relatedPosts = await getRelatedPosts(post.slug, post.tags ?? []);
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  // headingIndex is intentionally a plain local variable, re-created fresh
  // on every render of this Server Component — it must never live at module
  // scope, since that would leak state across unrelated requests.
  let headingIndex = 0;

  return (
    <div className="bg-paper px-6 py-20 transition-colors duration-300 md:py-28">
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
            author: { '@type': 'Person', name: 'Gurmanpreet Singh' },
            publisher: {
              '@type': 'Organization',
              name: '24xDev',
              logo: { '@type': 'ImageObject', url: `${siteUrl}/logo/android-chrome-512x512.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
          }),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
            ],
          }),
        }}
      />

      <div className="mx-auto max-w-5xl">
        <Reveal>
          <nav className="flex items-center gap-1.5 font-mono text-xs font-semibold text-ink-secondary">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-accent">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-ink-secondary/70">{post.title}</span>
          </nav>

          {post.cover_image && (
            <div className="mt-6 h-64 w-full overflow-hidden border border-line sm:h-80 md:h-96">
              <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" />
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs font-bold uppercase tracking-wider text-ink-secondary">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.published_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readingTime} min read
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-secondary">{post.excerpt}</p>
          {post.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag} tone="outline">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            <Reveal delay={0.1}>
              <Panel padding="lg">
                <article className="text-ink-secondary leading-relaxed [&>*+*]:mt-5">
                  <ReactMarkdown
                    components={{
                      h1: (props) => <h2 className="font-display text-2xl font-semibold text-ink" {...props} />,
                      h2: (props) => {
                        const heading = headings[headingIndex++];
                        return (
                          <h2
                            id={heading?.id}
                            className="scroll-mt-28 font-display text-2xl font-semibold text-ink"
                            {...props}
                          />
                        );
                      },
                      h3: (props) => {
                        const heading = headings[headingIndex++];
                        return (
                          <h3
                            id={heading?.id}
                            className="scroll-mt-28 font-display text-xl font-semibold text-ink"
                            {...props}
                          />
                        );
                      },
                      a: (props) => <a className="font-semibold text-accent hover:underline" {...props} />,
                      ul: (props) => <ul className="list-disc space-y-2 pl-6" {...props} />,
                      ol: (props) => <ol className="list-decimal space-y-2 pl-6" {...props} />,
                      blockquote: (props) => (
                        <blockquote className="border-l-4 border-accent pl-4 italic text-ink-secondary" {...props} />
                      ),
                      code: (props) => (
                        <code className="rounded bg-surface-alt px-1.5 py-0.5 text-sm text-ink" {...props} />
                      ),
                      pre: (props) => (
                        <pre className="overflow-x-auto rounded border border-line bg-surface-alt p-4 text-sm text-ink" {...props} />
                      ),
                      img: (props) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" className="w-full border border-line" {...props} alt={props.alt ?? ''} />
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </article>
              </Panel>
            </Reveal>

            <Reveal delay={0.15} className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <AuthorCard />
              <ShareButtons url={postUrl} title={post.title} />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 border border-accent bg-surface-alt p-7 text-center">
                <p className="text-ink-secondary">Have a project in mind?</p>
                <Button href="/contact" variant="primary" className="mt-3">
                  Get a Free Quote <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>

          <aside>
            <TableOfContents headings={headings} />
          </aside>
        </div>

        <RelatedPosts posts={relatedPosts} />
      </div>
    </div>
  );
}
