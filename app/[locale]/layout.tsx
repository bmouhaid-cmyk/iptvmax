import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from "@vercel/analytics/next"
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from 'next/font/google'
import '../globals.css'
import CrispChat from '@/components/CrispChat'
import { CurrencyProvider } from '@/context/CurrencyContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'tv4watch - Premium IPTV Service | 10,000+ Channels in 4K/FHD',
    template: '%s | tv4watch'
  },
  description: 'Experience the best IPTV service with over 10,000 live channels, movies, and series. Instant delivery, anti-freeze technology, and 24/7 support. Compatible with Samsung, LG, Android, and Apple TV.',
  keywords: ['IPTV', 'Premium IPTV', '4K TV', 'Smart TV', 'Android TV', 'Live Sports', 'VOD', 'Streaming Service', 'Best IPTV Provider'],
  authors: [{ name: 'tv4watch' }],
  creator: 'tv4watch',
  publisher: 'tv4watch',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tv4watch.com',
    siteName: 'tv4watch',
    title: 'tv4watch - Premium IPTV Service | 10,000+ Channels',
    description: 'Get the best IPTV service with over 10,000 channels, movies, and series. Instant delivery, anti-freeze technology, and 24/7 support.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'tv4watch Premium IPTV',
      },
    ],
  },
  metadataBase: new URL('https://tv4watch.com'),
  twitter: {
    card: 'summary_large_image',
    title: 'tv4watch - Premium IPTV Service',
    description: '10,000+ Channels in 4K/FHD with Anti-Freeze Technology',
    images: ['/twitter-image.jpg'], // You should add these images to public folder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <CurrencyProvider>
            {children}

          </CurrencyProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": "https://tv4watch.com/#organization",
                    "name": "tv4watch",
                    "url": "https://tv4watch.com",
                    "logo": "https://tv4watch.com/logo.png",
                    "sameAs": [
                      "https://twitter.com/tv4watch",
                      "https://facebook.com/tv4watch"
                    ]
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://tv4watch.com/#website",
                    "url": "https://tv4watch.com",
                    "name": "tv4watch - Premium IPTV Service",
                    "publisher": {
                      "@id": "https://tv4watch.com/#organization"
                    },
                    "potentialAction": {
                      "@type": "SearchAction",
                      "target": "https://tv4watch.com/?q={search_term_string}",
                      "query-input": "required name=search_term_string"
                    }
                  },
                  {
                    "@type": "Product",
                    "name": "Premium IPTV Subscription",
                    "description": "Access over 10,000 live channels and VODs in 4K/FHD quality. Anti-freeze technology and 24/7 support.",
                    "brand": {
                      "@type": "Brand",
                      "name": "tv4watch"
                    },
                    "offers": {
                      "@type": "Offer",
                      "url": "https://tv4watch.com/#pricing",
                      "priceCurrency": "EUR",
                      "price": "49.00",
                      "availability": "https://schema.org/InStock",
                      "priceValidUntil": "2025-12-31"
                    },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": "4.9",
                      "reviewCount": "1250"
                    }
                  }
                ]
              })
            }}
          />
          <CrispChat />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
