import type { Metadata } from 'next';
import SinghNavbar from '@/components/singh/Navbar';
import SinghFooter from '@/components/singh/Footer';

// This route is intentionally unlisted: it is not linked from any nav,
// footer, sitemap, or other page on the 24xDev business site, and it is
// excluded from search indexing below. The only way to reach it is by
// knowing the exact URL.
export const metadata: Metadata = {
  title: 'Gurmanpreet Singh | AI/ML Engineer',
  description:
    'Personal portfolio of Gurmanpreet Singh — AI/ML Engineer specialising in Generative AI, LLM systems, and MLOps.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function SinghLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1f] flex flex-col font-sans">
      <SinghNavbar />
      <main className="flex-1">{children}</main>
      <SinghFooter />
    </div>
  );
}
