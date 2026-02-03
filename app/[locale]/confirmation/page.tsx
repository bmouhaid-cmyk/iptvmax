'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { CheckCircle } from 'lucide-react'

export default function ConfirmationPage() {
    const t = useTranslations('Confirmation')

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">

                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-blue-500/20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 transition-all duration-700 group-hover:bg-purple-500/20" />

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
                        <CheckCircle className="w-20 h-20 text-green-400 relative z-10 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        {t('title')}
                    </h1>

                    <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                        {t('description')}
                    </p>

                    <div className="w-full space-y-3">
                        <Link
                            href="/login"
                            className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transform hover:-translate-y-0.5"
                        >
                            {t('loginButton')}
                        </Link>

                        <Link
                            href="/"
                            className="block w-full py-3 px-4 bg-slate-800/50 hover:bg-slate-800 text-gray-300 hover:text-white rounded-xl font-medium transition-colors border border-slate-700/50 hover:border-slate-600"
                        >
                            {t('backHome')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
