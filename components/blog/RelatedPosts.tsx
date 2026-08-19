import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

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
      <h2 className="text-xl font-black text-slate-900 dark:text-white">Keep reading</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-cyan-500/40"
          >
            <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950">
              {post.cover_image ? (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-black text-cyan-400/40">
                  24
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Calendar className="h-3 w-3" />
                {new Date(post.published_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <h3 className="mt-2 text-sm font-black text-slate-900 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
                {post.excerpt}
              </p>
              <span className="mt-3 flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                Read <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
