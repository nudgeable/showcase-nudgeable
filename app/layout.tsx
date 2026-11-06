import type { Metadata, Viewport } from 'next';
import { Analytics as GoogleAnalytics } from '@/components/Analytics';
import { Analytics } from '@vercel/analytics/next';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nudgeable.ai';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nudgeable | Practical AI for Work',
    template: '%s | Nudgeable'
  },
  description: 'Corporate AI for Work training, AI Coach roleplays and the Actions Engine for practical workplace capability.',
  applicationName: 'Nudgeable',
  authors: [{ name: 'Gaurav Patel', url: 'https://www.linkedin.com/in/gauravpatel25/ai' }],
  creator: 'Nudgeable',
  publisher: 'Nudgeable',
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '256x256' }],
    apple: [{ url: '/icon.png', type: 'image/png', sizes: '256x256' }],
    shortcut: '/icon.png'
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined
  },
  openGraph: {
    siteName: 'Nudgeable',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: 'Nudgeable' }]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/assets/og-default.png']
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#fffdf5'
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Nudgeable',
      url: siteUrl,
      logo: `${siteUrl}/brand/nudgeable-black.png`,
      description: 'Practical AI for Work training and products for corporate capability building.',
      email: 'team@nudgeable.ai',
      sameAs: [
        'https://x.com/gauravxlri',
        'https://www.linkedin.com/in/gauravpatel25',
        'https://www.youtube.com/@Gaurav-NudgeableAI',
        'https://www.instagram.com/gaurav.patel_gp'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Nudgeable',
      url: siteUrl,
      publisher: { '@id': `${siteUrl}/#organization` }
    }
  ]
};

// Stylesheets load per page (see styles/design). Internal tools keep app/globals.css via their own layouts.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Manrope:wght@400;500;600;650;700;750;800&display=swap" rel="stylesheet" />
    </head>
    <body>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
      <GoogleAnalytics />
      <Analytics />
      <AnalyticsTracker />
    </body>
  </html>;
}
