'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Play, Star, Tv, Zap, ShieldCheck, Film } from 'lucide-react'

export default function Hero() {
    const t = useTranslations('Hero')
    const tPricing = useTranslations('Pricing')

    return (
        <div className="relative isolate overflow-hidden bg-slate-950 pt-6 pb-8 sm:pb-12">
            {/* Dynamic Background Effects */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] rounded-full bg-cyan-500/10 blur-[80px]" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-12 sm:py-16 lg:py-24 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col justify-center text-center lg:text-left z-10">
                        {/* Trust Badge */}
                        <div className="mb-8 flex justify-center lg:justify-start">
                            <div className="rounded-full bg-blue-500/10 px-3 py-1 text-sm leading-6 text-blue-400 ring-1 ring-inset ring-blue-500/20 backdrop-blur-sm flex items-center gap-2">
                                <span className="flex text-yellow-500">
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                </span>
                                <span className="font-semibold">#1 Premium IPTV Service</span>
                            </div>
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl uppercase">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 drop-shadow-sm pb-2">
                                {t('title')}
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-gray-300 max-w-lg mx-auto lg:mx-0">
                            {t('subtitle')} Experience buffer-free streaming with our high-speed global servers.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            <Link
                                href="/#pricing"
                                className="relative rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 flex items-center gap-2 group"
                            >
                                {tPricing('subscribe')}
                                <Play className="w-4 h-4 fill-current group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
                            </Link>
                        </div>

                        {/* Mini Features List */}
                        <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                                <span>SSL Secure</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-500" />
                                <span>Instant Setup</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Composition */}
                    <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow flex items-center justify-center perspective-1000">
                        <div className="relative w-full max-w-md h-[400px]">
                            {/* Floating Card 1: Live TV */}
                            <div className="absolute top-0 right-0 w-64 p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl transform rotate-6 hover:rotate-0 transition-all duration-500 z-20 animate-float">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-red-500/20 rounded-lg">
                                        <Tv className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">Live Sports and channels</h3>
                                        <p className="text-xs text-gray-400">World cup, champions league, la liga, and more,</p>
                                    </div>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full w-full overflow-hidden">
                                    <div className="h-full bg-red-500 w-3/4 animate-pulse" />
                                </div>
                            </div>

                            {/* Floating Card 2: Movies */}
                            <div className="absolute bottom-10 left-0 w-64 p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl transform -rotate-3 hover:rotate-0 transition-all duration-500 z-30 animate-float-delayed">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-blue-500/20 rounded-lg">
                                        <Film className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">4K Movies/tv shows</h3>
                                        <p className="text-xs text-gray-400">Latest Blockbusters and series</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mt-2">
                                    <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-gray-300">HDR</span>
                                    <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-gray-300">4K</span>
                                    <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-gray-300">Dolby</span>
                                </div>
                            </div>

                            {/* Center Glow/Highlight to mimic a screen */}
                            <div className="absolute inset-4 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-xl z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
