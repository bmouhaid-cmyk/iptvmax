'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { CheckCircle } from 'lucide-react'

export default function ConfirmationPage() {
    const t = useTranslations('Confirmation')

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-slate-950">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-center">

                    {/* Subtle glow effects matching homepage hero */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -ml-16 -mb-16" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-6 rounded-full bg-white/5 p-4 ring-1 ring-white/10">
                            <CheckCircle className="w-12 h-12 text-emerald-400" />
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                            {t('title')}
                        </h1>

                        <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                            {t('description')}
                        </p>

                        <div className="w-full space-y-4">
                            <Link
                                href="/login"
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
                            >
                                {t('loginButton')}
                            </Link>

                            <Link
                                href="/"
                                className="flex w-full justify-center rounded-md bg-white/5 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white/10 ring-1 ring-inset ring-white/10 transition-all"
                            >
                                {t('backHome')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
