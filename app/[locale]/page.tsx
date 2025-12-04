import Navbar from '@/components/Navbar'
import PricingCard from '@/components/PricingCard'
import ChannelCategoriesSection from '@/components/ChannelCategories'
import ChannelSlider from '@/components/ChannelSlider'
import ReviewsSection from '@/components/ReviewsSection'
import FAQSection from '@/components/FAQSection'
import { Tv, Zap, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Hero')
  const tPricing = useTranslations('Pricing')

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            {t('title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="#pricing" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              {tPricing('subscribe')}
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              {t('features')} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

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
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 w-full">
              <PricingCard
                title={`1 ${tPricing('month')}`}
                price="10"
                duration={tPricing('month')}
                features={['1 Device', '4K/FHD Quality', 'Anti-Freeze Technology', '24/7 Support']}
                ctaText={tPricing('subscribe')}
              />
              <PricingCard
                title={`3 ${tPricing('month')}s`}
                price="25"
                duration={`3 ${tPricing('month')}s`}
                features={['1 Device', '4K/FHD Quality', 'Anti-Freeze Technology', '24/7 Support']}
                popular={true}
                ctaText={tPricing('subscribe')}
              />
              <PricingCard
                title={`1 ${tPricing('year')}`}
                price="70"
                duration={tPricing('year')}
                features={['2 Devices', '4K/FHD Quality', 'Anti-Freeze Technology', 'Priority Support']}
                ctaText={tPricing('subscribe')}
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
    </div>
  )
}
