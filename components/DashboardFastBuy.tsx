"use client"

import { Link } from '@/i18n/routing'
import { PRICING_PLANS } from '@/lib/constants'
import { Check, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCurrency } from '@/context/CurrencyContext'

export default function DashboardFastBuy({ compact = false }: { compact?: boolean }) {
    const t = useTranslations('Pricing')
    const { currency, symbol } = useCurrency()

    const getFeatures = (id: string) => {
        const common = [
            t('features.channels15k'),
            t('features.quality'),
            t('features.moviesSeries'),
            t('features.noBuffering'),
        ]

        switch (id) {
            case '24h-test':
                return [t('features.fullAccess'), ...common]
            case '3-months':
                return [...common, t('features.support247')]
            case '6-months':
                return [...common, t('features.prioritySupport'), t('features.save15')]
            case '12-months':
                return [...common, t('features.vipSupport'), t('features.bestValue'), t('features.multiDevice')]
            default:
                return common
        }
    }

    const getTitle = (id: string) => {
        if (id === '24h-test') return t('test24h')
        if (id === '3-months') return t('month3')
        if (id === '6-months') return t('month6')
        if (id === '12-months') return t('month12')
        return ''
    }

    const getDuration = (id: string) => {
        if (id === '24h-test') return '24h'
        if (id === '3-months') return t('month3')
        if (id === '6-months') return t('month6')
        if (id === '12-months') return t('month12')
        return ''
    }

    const getButtonText = () => t('subscribe')

    return (
        <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
                <Zap className="text-yellow-400 fill-yellow-400" />
                <h2 className="text-xl font-bold text-white">Fast Buy Subscription</h2>
            </div>

            <div className={`grid gap-6 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                {PRICING_PLANS.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${plan.popular
                            ? 'bg-slate-800/80 border-blue-500 shadow-lg shadow-blue-500/10'
                            : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider">
                                Best Value
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">{getTitle(plan.id)}</h3>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-2xl font-bold text-white">{symbol}{(plan as any).prices?.[currency] || plan.price}</span>
                                    <span className="text-sm text-gray-400">/{getDuration(plan.id)}</span>
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-2 mb-6">
                            {getFeatures(plan.id).slice(0, 4).map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={`/checkout?package=${plan.linkParam}&currency=${currency}`}
                            className={`block w-full py-2.5 px-4 rounded-lg text-center font-semibold text-sm transition-colors ${plan.popular
                                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                : 'bg-slate-700 hover:bg-slate-600 text-white'
                                }`}
                        >
                            {getButtonText()}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
