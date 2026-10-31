import type { Metadata, Viewport } from 'next';
import { Fraunces, Public_Sans, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackgroundGlow from '@/components/ui/BackgroundGlow';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CookieConsent from '@/components/ui/CookieConsent';
import SmoothScroll from '@/components/motion/SmoothScroll';
import ChatWidget from '@/components/ui/ChatWidget';
import OrganizationSchema from '@/components/seo/OrganizationSchema';
import { ThemeProvider } from '@/components/ThemeProvider';
// ThemeToggle is not imported here because it is rendered inside Navbar instead

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz'],
  display: 'swap',
});
const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-public-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' });

const siteUrl = 'https://24xdev.co.uk';

const defaultTitle = '24xDev | Websites, AI & Software for Clients Worldwide';
const defaultDescription =
  'London studio building websites, AI automation and custom software for clients worldwide. Projects delivered in many languages. Book a meeting or start with a free quote.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s | 24xDev',
  },
  description: defaultDescription,
  keywords: [
    'web development agency worldwide',
    'remote software studio',
    'web design agency London',
    'Next.js developers',
    'AI automation agency',
    'custom software development',
    'international web development studio',
    'free website quote',
  ],
  authors: [{ name: '24xDev' }],
  creator: '24xDev',
  publisher: '24xDev',
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/logo/favicon.ico', sizes: 'any' },
      { url: '/logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/logo/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/logo/favicon.ico'],
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f3ec' },
    { media: '(prefers-color-scheme: dark)', color: '#15130f' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${publicSans.variable} ${mono.variable} font-sans bg-paper text-ink antialiased min-h-screen flex flex-col transition-colors duration-300`}
      >
        <OrganizationSchema />
        <ThemeProvider>
          <SmoothScroll />
          <ScrollProgress />
          <BackgroundGlow />
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow relative z-10">{children}</main>

          <Footer />
          <ChatWidget />
          <CookieConsent />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
