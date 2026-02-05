"use client"

import { Link } from '@/i18n/routing'
import { Check, Star } from 'lucide-react'
import { useCurrency } from '@/context/CurrencyContext'
import { PRICING_PLANS } from '@/lib/constants'

interface PricingCardProps {
    title: string
    price: string
    duration: string
    features: string[]
    packageId?: string
    popular?: boolean
    ctaText?: string
}

export default function PricingCard({ title, price, duration, features, popular, ctaText = "Get Started", packageId }: PricingCardProps) {
    const { currency, symbol } = useCurrency()

    // Find plan to get dynamic price
    const plan = PRICING_PLANS.find(p => p.id === packageId)
    // If we have a plan and it has prices for the current currency, use it. Otherwise fallback to props.
    // However, props 'price' is likely hardcoded EUR from page.tsx.
    // We should try to use the plan price if available.
    // If no plan found (custom card?), use default price but currency symbol might be wrong if we just swap symbol.
    // For now assuming all cards match a plan if packageId is present.

    const displayPrice = (plan && (plan as any).prices && (plan as any).prices[currency]) ? (plan as any).prices[currency] : price
    const displaySymbol = (plan && (plan as any).prices) ? symbol : '€' // Logic: if it's a known plan, use context symbol. If generic, keep Euro or use context? Safer to use context symbol but value might be wrong if not converted. 
    // Actually, PRICING_PLANS in constants has the 'prices' object.

    return (
        <div className={`relative p-8 rounded-3xl flex flex-col transition-all duration-300 hover:scale-105 ${popular
            ? 'bg-gradient-to-b from-slate-800/80 to-slate-900/80 border-2 border-blue-500 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]'
            : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
            } backdrop-blur-xl`}>

            {popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg flex items-center gap-2 uppercase tracking-wider">
                        <Star className="w-4 h-4 fill-current" />
                        Most Popular
                    </div>
                </div>
            )}

            <div className="flex-1 pt-4">
                <h3 className={`text-xl font-semibold ${popular ? 'text-blue-400' : 'text-slate-300'}`}>{title}</h3>
                <div className="mt-6 flex items-baseline">
                    <span className="text-5xl font-bold tracking-tight text-white">{displaySymbol}{displayPrice}</span>
                    <span className="ml-2 text-lg font-medium text-slate-400">/{duration}</span>
                </div>

                <div className="mt-8 w-full h-px bg-slate-700/50" />

                <ul role="list" className="mt-8 space-y-4">
                    {features.map((feature) => (
                        <li key={feature} className="flex items-start">
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${popular ? 'bg-blue-500/20' : 'bg-slate-700/50'}`}>
                                <Check className={`w-4 h-4 ${popular ? 'text-blue-400' : 'text-slate-400'}`} aria-hidden="true" />
                            </div>
                            <span className="ml-3 text-slate-300 text-sm leading-6">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <Link
                href={`/checkout?package=${packageId || title.toLowerCase().replace(' ', '-')}&currency=${currency}`}
                className={`mt-8 block w-full py-4 px-6 rounded-xl text-center font-bold text-lg transition-all duration-300 shadow-lg ${popular
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/25'
                    : 'bg-slate-700 text-white hover:bg-slate-600 hover:text-white'
                    }`}
            >
                {ctaText}
            </Link>
        </div>
    )
}
