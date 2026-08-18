import Link from 'next/link';
import { Home, Mail, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center bg-slate-50 dark:bg-[#07080c] transition-colors duration-300">
      <p className="font-mono text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
        Error 404
      </p>
      <h1 className="mt-4 text-4xl font-black text-slate-900 dark:text-white sm:text-5xl">
        This page went missing.
      </h1>
      <p className="mt-4 max-w-md text-slate-600 dark:text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist, moved, or the link might be broken.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 px-6 py-3 text-sm font-black text-white dark:text-black"
        >
          <Home className="h-4 w-4" /> Back to homepage
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-bold text-slate-800 dark:text-white"
        >
          <Compass className="h-4 w-4" /> Explore services
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-bold text-slate-800 dark:text-white"
        >
          <Mail className="h-4 w-4" /> Contact us
        </Link>
      </div>
    </div>
  );
}
