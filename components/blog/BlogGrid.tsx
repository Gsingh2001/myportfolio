'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import Tag from '@/components/ui/Tag';

type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  tags: string[];
  published_at: string;
  readingTime: number;
};

export default function BlogGrid({ posts }: { posts: PostSummary[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((post) => post.tags?.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = activeTag ? posts.filter((post) => post.tags?.includes(activeTag)) : posts;

  return (
    <div>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={cn(
              'rounded border px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wide transition-colors',
              activeTag === null
                ? 'border-ink bg-ink text-paper'
                : 'border-line text-ink-secondary hover:border-ink hover:text-ink',
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={cn(
                'rounded border px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wide transition-colors',
                activeTag === tag
                  ? 'border-accent bg-accent text-accent-ink'
                  : 'border-line text-ink-secondary hover:border-accent hover:text-accent',
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-ink-secondary">No posts tagged &ldquo;{activeTag}&rdquo; yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded border border-line bg-surface transition-colors hover:border-accent"
            >
              <div className="relative h-44 w-full overflow-hidden border-b border-line bg-surface-alt">
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded border-2 border-ink font-mono text-lg font-black text-ink">
                      24
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider text-ink-secondary">
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
                    {post.readingTime} min read
                  </span>
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold text-ink group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary line-clamp-3">{post.excerpt}</p>
                {post.tags?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Tag key={tag} tone="outline">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                )}
                <div className="mt-5 flex items-center gap-2 font-mono text-xs font-bold text-accent">
                  Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
