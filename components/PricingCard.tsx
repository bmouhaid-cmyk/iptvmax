import Link from 'next/link'
import { Check } from 'lucide-react'

interface PricingCardProps {
    title: string
    price: string
    duration: string
    features: string[]
    popular?: boolean
}

export default function PricingCard({ title, price, duration, features, popular }: PricingCardProps) {
    return (
        <div className={`relative p-8 bg-slate-800 border ${popular ? 'border-blue-500' : 'border-slate-700'} rounded-2xl shadow-sm flex flex-col`}>
            {popular && (
                <div className="absolute top-0 right-0 -mt-4 mr-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                </div>
            )}
            <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-4 flex items-baseline text-white">
                    <span className="text-5xl font-extrabold tracking-tight">${price}</span>
                    <span className="ml-1 text-xl font-semibold text-gray-400">/{duration}</span>
                </p>
                <ul role="list" className="mt-6 space-y-6">
                    {features.map((feature) => (
                        <li key={feature} className="flex">
                            <Check className="flex-shrink-0 w-6 h-6 text-blue-500" aria-hidden="true" />
                            <span className="ml-3 text-gray-300">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Link
                href={`/checkout?package=${title.toLowerCase().replace(' ', '-')}`}
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-700 text-blue-100 hover:bg-slate-600'
                    }`}
            >
                Get Started
            </Link>
        </div>
    )
}
