'use client'
import { useState } from "react"
import Image from "next/image"
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'

interface Channel {
    name: string
    logo: string
    description?: string
}

interface Category {
    id: string
    name: string
    count: string
    channels: Channel[]
    color: string
    icon: string
}

export default function ChannelCategoriesSection() {
    const t = useTranslations('Categories')
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [showChannelList, setShowChannelList] = useState(false)

    const categories: Category[] = [
        {
            id: "sports",
            name: t('sports'),
            count: "200+",
            color: "bg-green-600 hover:bg-green-700",
            icon: "⚽",
            channels: [
                {
                    name: "beIN Sports 1 HD",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/BeIN-Sports-Logo.svg/2560px-BeIN-Sports-Logo.svg.png",
                    description: "Premium Sports Channel",
                },
                {
                    name: "beIN Sports 2 HD",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/BeIN-Sports-Logo.svg/2560px-BeIN-Sports-Logo.svg.png",
                    description: "Premium Sports Channel",
                },
                {
                    name: "ESPN HD",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/1280px-ESPN_wordmark.svg.png",
                    description: "US Sports Network",
                },
                {
                    name: "Sky Sports Premier League",
                    logo: "https://logos-world.net/wp-content/uploads/2020/06/Sky-Sports-Logo.png",
                    description: "English Premier League",
                },
                {
                    name: "DAZN",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/DAZN_Logo_Master.svg/1200px-DAZN_Logo_Master.svg.png",
                    description: "Sports Streaming",
                },
            ],
        },
        {
            id: "movies",
            name: t('movies'),
            count: "500+",
            color: "bg-purple-600 hover:bg-purple-700",
            icon: "🎬",
            channels: [
                {
                    name: "Netflix",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png",
                    description: "Movies & Series",
                },
                {
                    name: "HBO Max",
                    logo: "https://brandlogos.net/wp-content/uploads/2022/03/hbo_max-logo-brandlogos.net_.png",
                    description: "Exclusive Content",
                },
                {
                    name: "Prime Video",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg",
                    description: "Amazon Streaming",
                },
                {
                    name: "Disney+",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
                    description: "Disney & Family",
                },
                {
                    name: "Apple TV+",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/AppleTVLogo.svg/1200px-AppleTVLogo.svg.png",
                    description: "Apple Originals",
                },
            ],
        },
        {
            id: "news",
            name: t('news'),
            count: "150+",
            color: "bg-red-600 hover:bg-red-700",
            icon: "📺",
            channels: [
                {
                    name: "Al Jazeera",
                    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX2eGB47dEs7OMC3x82T0vcStU2NtSJ-EG7g&s",
                    description: "Global News",
                },
                {
                    name: "CNN International",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/CNN_International_logo.svg/2048px-CNN_International_logo.svg.png",
                    description: "US News",
                },
                {
                    name: "BBC World News",
                    logo: "https://ichef.bbci.co.uk/images/ic/1920x1080/p09xtmrp.jpg",
                    description: "UK News",
                },
                {
                    name: "France 24",
                    logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/2/24/Logos_FRANCE24_RVB_2013.svg/1200px-Logos_FRANCE24_RVB_2013.svg.png",
                    description: "French News",
                },
            ],
        },
        {
            id: "kids",
            name: t('kids'),
            count: "100+",
            color: "bg-pink-600 hover:bg-pink-700",
            icon: "🧸",
            channels: [
                {
                    name: "Cartoon Network",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cartoon_Network_2010_logo.svg/1200px-Cartoon_Network_2010_logo.svg.png",
                    description: "Cartoons",
                },
                {
                    name: "Disney Channel",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/2019_Disney_Channel_logo.svg/1200px-2019_Disney_Channel_logo.svg.png",
                    description: "Disney Kids",
                },
                {
                    name: "Nickelodeon",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Nickelodeon_2009_logo.svg/1200px-Nickelodeon_2009_logo.svg.png",
                    description: "Kids Shows",
                },
                {
                    name: "Spacetoon",
                    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Spacetoon_logo.png/220px-Spacetoon_logo.png",
                    description: "Anime & Cartoons",
                },
            ],
        },
        {
            id: "documentary",
            name: t('documentary'),
            count: "80+",
            color: "bg-blue-600 hover:bg-blue-700",
            icon: "🌍",
            channels: [
                {
                    name: "National Geographic",
                    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnMkH9iO1MosKoMIMVQ-m6QN7q7Xj-VfKtA&s",
                    description: "Nature & Science",
                },
                {
                    name: "Discovery Channel",
                    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqPxnDT5QmCG11r5e_qO6iPbZotTqJ2CpchQ&s",
                    description: "Documentaries",
                },
                {
                    name: "Animal Planet",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/2018_Animal_Planet_logo.svg/1200px-2018_Animal_Planet_logo.svg.png",
                    description: "Animals",
                },
            ],
        },
        {
            id: "music",
            name: t('music'),
            count: "120+",
            color: "bg-orange-600 hover:bg-orange-700",
            icon: "🎵",
            channels: [
                {
                    name: "MTV",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/MTV-2021.svg/1200px-MTV-2021.svg.png",
                    description: "Music Videos",
                },
                {
                    name: "Rotana Music",
                    logo: "https://upload.wikimedia.org/wikipedia/ar/b/b8/Rotana_logo.jpg",
                    description: "Arabic Music",
                },
            ],
        },
    ]

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category)
        setShowChannelList(true)
    }

    const closeChannelList = () => {
        setShowChannelList(false)
        setSelectedCategory(null)
    }

    return (
        <section className="py-16 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-white text-center mb-12">{t('title')}</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(category)}
                            className={`${category.color} text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/10`}
                        >
                            <div className="text-3xl mb-3">{category.icon}</div>
                            <div className="text-2xl font-bold text-white mb-2">{t('count', { count: category.count.replace('+', '') })}</div>
                            <div className="text-white font-medium text-sm">{category.name}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Channel List Modal */}
            {showChannelList && selectedCategory && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden border border-slate-700 shadow-2xl">
                        {/* Modal Header */}
                        <div className={`flex items-center justify-between p-6 border-b border-slate-700 ${selectedCategory.color}`}>
                            <div className="flex items-center gap-4">
                                <div className="text-3xl">{selectedCategory.icon}</div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selectedCategory.name}</h2>
                                    <p className="text-white/90">{t('available', { count: selectedCategory.count.replace('+', '') })}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeChannelList}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content - Scrollable Channel List */}
                        <div className="p-6 overflow-y-auto max-h-[70vh] bg-slate-900">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {selectedCategory.channels.map((channel, index) => (
                                    <div
                                        key={`${channel.name}-${index}`}
                                        className="bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition-all duration-300 hover:shadow-md border border-slate-700"
                                    >
                                        <div className="flex items-center justify-center h-16 mb-4 bg-white/5 rounded-lg p-2">
                                            <Image
                                                src={channel.logo || "/placeholder.svg"}
                                                alt={channel.name}
                                                width={120}
                                                height={60}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                        <h4 className="text-center text-sm font-semibold text-white mb-2 line-clamp-2">
                                            {channel.name}
                                        </h4>
                                        {channel.description && (
                                            <p className="text-center text-xs text-gray-400 line-clamp-2">{channel.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Show more channels message */}
                            <div className="mt-8 text-center">
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-blue-400 mb-2">{t('more')}</h3>
                                    <p className="text-blue-200">
                                        {t('sample', { category: selectedCategory.name })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
