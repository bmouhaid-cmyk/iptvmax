import Navbar from '@/components/Navbar'
import PricingCard from '@/components/PricingCard'
import ChannelCategoriesSection from '@/components/ChannelCategories'
import ChannelSlider from '@/components/ChannelSlider'
import ReviewsSection from '@/components/ReviewsSection'
import FAQSection from '@/components/FAQSection'
import { Tv, Zap, Globe } from 'lucide-react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import { useTranslations } from 'next-intl'
import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://tv4watch.com',
    languages: {
      'en': 'https://tv4watch.com/en',
      'fr': 'https://tv4watch.com/fr',
      'es': 'https://tv4watch.com/es',
      'ar': 'https://tv4watch.com/ar',
    },
  },
}

export default function Home() {
  const t = useTranslations('Hero')
  const tPricing = useTranslations('Pricing')

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <Hero />

      {/* Pricing */}
      <div id="pricing" className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{tPricing('title')}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {tPricing('subtitle')}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:flex lg:max-w-none lg:items-center lg:gap-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 w-full">
              <PricingCard
                title={tPricing('test24h')}
                price="0.99"
                duration="24h"
                features={[
                  tPricing('features.fullAccess'),
                  tPricing('features.channels15k'),
                  tPricing('features.quality'),
                  tPricing('features.moviesSeries'),
                  tPricing('features.noBuffering')
                ]}
                ctaText={tPricing('subscribe')}
                packageId="24h-test"
              />
              <PricingCard
                title={tPricing('month3')}
                price="19.00"
                duration={tPricing('month3')}
                features={[
                  tPricing('features.channels15k'),
                  tPricing('features.quality'),
                  tPricing('features.moviesSeries'),
                  tPricing('features.noBuffering'),
                  tPricing('features.support247')
                ]}
                ctaText={tPricing('subscribe')}
                packageId="3-months"
              />
              <PricingCard
                title={tPricing('month6')}
                price="32.00"
                duration={tPricing('month6')}
                features={[
                  tPricing('features.channels15k'),
                  tPricing('features.quality'),
                  tPricing('features.moviesSeries'),
                  tPricing('features.noBuffering'),
                  tPricing('features.prioritySupport'),
                  tPricing('features.save15')
                ]}
                popular={true}
                ctaText={tPricing('subscribe')}
                packageId="6-months"
              />
              <PricingCard
                title={tPricing('month12')}
                price="59.00"
                duration={tPricing('month12')}
                features={[
                  tPricing('features.channels15k'),
                  tPricing('features.quality'),
                  tPricing('features.moviesSeries'),
                  tPricing('features.noBuffering'),
                  tPricing('features.vipSupport'),
                  tPricing('features.bestValue'),
                  tPricing('features.multiDevice')
                ]}
                ctaText={tPricing('subscribe')}
                packageId="12-months"
              />
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex justify-center gap-8 text-slate-400 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Instant Delivery
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              24/7 Support
            </div>
          </div>
        </div>
      </div>

      <ChannelSlider />

      {/* Features */}
      <div className="py-24 sm:py-32 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-400">Why Choose Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need for entertainment
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Tv className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  10,000+ Channels
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">
                  Live TV from around the world, including sports, news, and entertainment.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Instant Delivery
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">
                  Get your credentials immediately after payment confirmation.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Global Coverage
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">
                  Works on all devices and from any location with internet access.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <ReviewsSection />

      <ChannelCategoriesSection />

      <FAQSection />

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'tv4watch',
            url: 'https://tv4watch.com',
            logo: 'https://tv4watch.com/logo.png',
            sameAs: [
              'https://twitter.com/tv4watch',
              'https://facebook.com/tv4watch',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-234-567-8900',
              contactType: 'customer service',
              availableLanguage: ['English', 'French', 'Arabic', 'Spanish'],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Premium IPTV Subscription',
            image: 'https://tv4watch.com/og-image.jpg',
            description: 'One of the best IPTV services with over 10,000 channels in 4K/FHD. Anti-freeze technology and 24/7 support.',
            brand: {
              '@type': 'Brand',
              name: 'tv4watch',
            },
            offers: {
              '@type': 'AggregateOffer',
              url: 'https://tv4watch.com/#pricing',
              priceCurrency: 'USD',
              lowPrice: '0.99',
              highPrice: '59.00',
              offerCount: '4',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '1250',
            },
          }),
        }}
      />
    </div>
  )
}
