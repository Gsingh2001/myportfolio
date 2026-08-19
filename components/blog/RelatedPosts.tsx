import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import SectionIndex from '@/components/ui/SectionIndex';

type RelatedPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  published_at: string;
};

export default function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16">
      <SectionIndex index={2} total={2} label="KEEP READING" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded border border-line bg-surface transition-colors hover:border-accent"
          >
            <div className="relative h-32 w-full overflow-hidden border-b border-line bg-surface-alt">
              {post.cover_image ? (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-mono text-2xl font-black text-ink-secondary/30">
                  24
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink-secondary">
                <Calendar className="h-3 w-3" />
                {new Date(post.published_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <h3 className="mt-2 font-display text-sm font-semibold text-ink group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-secondary line-clamp-2">{post.excerpt}</p>
              <span className="mt-3 flex items-center gap-1 font-mono text-xs font-bold text-accent">
                Read <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
