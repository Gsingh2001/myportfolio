import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '24xDev — Web Development & AI Agency',
    short_name: '24xDev',
    description:
      'Sheffield-based software studio building high-performance websites, AI automation and custom dashboards for UK businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07080c',
    theme_color: '#07080c',
    icons: [
      {
        src: '/logo/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/logo/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
