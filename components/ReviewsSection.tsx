'use client'
import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ReviewsSection() {
    const t = useTranslations('Reviews')

    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            rating: 5,
            key: "review1"
        },
        {
            id: 2,
            name: "Michael Chen",
            rating: 5,
            key: "review2"
        },
        {
            id: 3,
            name: "David Smith",
            rating: 5,
            key: "review3"
        }
    ]

    return (
        <div className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-400">{t('sectionTitle')}</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t('title')}
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
                    {reviews.map((review) => (
                        <div key={review.id} className="flex flex-col justify-between bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors backdrop-blur-sm">
                            <div>
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-lg leading-7 text-gray-300">
                                    "{t(review.key)}"
                                </p>
                            </div>
                            <div className="mt-6 flex items-center gap-x-4">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                    {review.name.charAt(0)}
                                </div>
                                <div className="text-base font-semibold text-white">{review.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
