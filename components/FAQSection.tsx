'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQSection() {
    const t = useTranslations('FAQ')
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        { id: 1, key: 'q1' },
        { id: 2, key: 'q2' },
        { id: 3, key: 'q3' },
        { id: 4, key: 'q4' },
        { id: 5, key: 'q5' }
    ]

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="py-24 sm:py-32 bg-slate-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-blue-400">{t('sectionTitle')}</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t('title')}
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        {t('subtitle')}
                    </p>
                </div>
                <div className="mx-auto max-w-3xl divide-y divide-slate-800">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="py-6">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex w-full items-start justify-between text-left"
                            >
                                <span className="text-base font-semibold leading-7 text-white">
                                    {t(`${faq.key}.question`)}
                                </span>
                                <span className="ml-6 flex h-7 items-center">
                                    {openIndex === index ? (
                                        <ChevronUp className="h-6 w-6 text-blue-400" aria-hidden="true" />
                                    ) : (
                                        <ChevronDown className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    )}
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="mt-2 pr-12">
                                    <p className="text-base leading-7 text-gray-400">
                                        {t(`${faq.key}.answer`)}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
