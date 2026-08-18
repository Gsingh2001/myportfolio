import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackgroundGlow from '@/components/ui/BackgroundGlow';
import ScrollProgress from '@/components/ui/ScrollProgress';
import FloatingCTA from '@/components/ui/FloatingCTA';
import OrganizationSchema from '@/components/seo/OrganizationSchema';
import { ThemeProvider } from '@/components/ThemeProvider';
// ThemeToggle is not imported here because it is rendered inside Navbar instead

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

const siteUrl = 'https://24xdev.co.uk';

const defaultTitle = '24xDev | Web Development & AI Agency — Sheffield & UK-Wide';
const defaultDescription =
  'Sheffield-based software studio serving clients across London, Birmingham, Manchester, Leeds and the rest of the UK. High-performance websites, AI automation & dashboards — free quotes.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s | 24xDev',
  },
  description: defaultDescription,
  keywords: [
    'web development agency UK',
    'web design agency Sheffield',
    'web developers Birmingham',
    'web development company London',
    'software developers Manchester',
    'app development company Leeds',
    'Next.js developers UK',
    'AI automation agency UK',
    'custom software development UK',
    'bespoke dashboards UK',
  ],
  authors: [{ name: '24xDev' }],
  creator: '24xDev',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: '24xDev',
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${mono.variable} font-sans bg-slate-50 text-slate-900 dark:bg-[#07080c] dark:text-slate-100 antialiased selection:bg-cyan-500 selection:text-black min-h-screen flex flex-col transition-colors duration-300`}
      >
        <OrganizationSchema />
        <ThemeProvider>
          <ScrollProgress />
          <BackgroundGlow />
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow relative z-10">{children}</main>

          <Footer />
          <FloatingCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}
