import { createClient } from '@/lib/supabase/server'
import { PRICING_PLANS } from '@/lib/constants'
import { redirect } from '@/i18n/routing'
import CheckoutForm from '@/components/CheckoutForm'
import { getTranslations } from 'next-intl/server'

export default async function CheckoutPage({
    searchParams,
    params
}: {
    searchParams: Promise<{ package?: string; currency?: string }>
    params: Promise<{ locale: string }>
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'Checkout' })

    const { package: pkg, currency: currencyParam } = await searchParams

    if (!user) {
        redirect({ href: `/login?next=/checkout?package=${pkg ?? ''}&currency=${currencyParam ?? ''}`, locale })
    }

    // Find the plan from constants
    // If exact match fails, try fallback or default to 1-month equivalent (now 24h or similar)
    // Actually better to defaults to safe value
    const selectedPlan = PRICING_PLANS.find(p => p.linkParam === pkg) || PRICING_PLANS[0]

    const currency = (currencyParam as 'EUR' | 'USD' | 'MAD' | 'USDT') || 'EUR'
    const packageType = selectedPlan.title

    // Get price for selected currency
    const price = (selectedPlan as any).prices?.[currency] || selectedPlan.price

    const symbols: Record<string, string> = {
        EUR: '€',
        USD: '$',
        MAD: 'Dh',
        USDT: '₮'
    }
    const symbol = symbols[currency] || '€'

    return (
        <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-slate-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 border border-slate-800">
                <h2 className="text-2xl font-bold mb-6 text-center">{t('title')}</h2>

                <div className="mb-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-semibold mb-2">{t('orderSummary')}</h3>
                    <div className="flex justify-between items-center">
                        <span className="capitalize">{packageType} {t('subscription')}</span>
                        <span className="font-bold text-xl">{symbol}{price}</span>
                    </div>
                </div>

                <CheckoutForm
                    packageType={packageType}
                    price={price}
                    userId={user!.id}
                    currency={currency}
                    paypalPrice={currency === 'MAD' ? (selectedPlan as any).prices?.EUR : currency === 'USDT' ? (selectedPlan as any).prices?.USD : price}
                    paypalCurrency={currency === 'MAD' ? 'EUR' : currency === 'USDT' ? 'USD' : currency}
                />
            </div>
        </div>
    )
}
