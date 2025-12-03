'use client'
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useTranslations } from 'next-intl'

export default function ChannelSlider() {
    const t = useTranslations('Slider')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isPaused, setIsPaused] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [showChannelList, setShowChannelList] = useState(false)

    // Check if mobile on mount
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Popular TV channels with their logos
    const channels = [
        {
            name: "beIN Sports",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/BeIN-Sports-Logo.svg/2560px-BeIN-Sports-Logo.svg.png",
            category: "Sports",
        },
        {
            name: "Netflix",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png",
            category: "Streaming",
        },
        {
            name: "Prime Video",
            logo: "https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg",
            category: "Streaming",
        },
        {
            name: "DAZN",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/DAZN_Logo_Master.svg/1200px-DAZN_Logo_Master.svg.png",
            category: "Streaming",
        },
        {
            name: "Disney+",
            logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
            category: "Kids",
        },
        {
            name: "Al Jazeera",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX2eGB47dEs7OMC3x82T0vcStU2NtSJ-EG7g&s",
            category: "News",
        },
        {
            name: "HBO Max",
            logo: "https://brandlogos.net/wp-content/uploads/2022/03/hbo_max-logo-brandlogos.net_.png",
            category: "Streaming",
        },
        {
            name: "Apple TV",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/AppleTVLogo.svg/1200px-AppleTVLogo.svg.png",
            category: "Streaming",
        },
        {
            name: "Shahid",
            logo: "https://www.thefilmcollaborative.org/distripedia/digitaldistributionguide/img/vod/shahid.jpg",
            category: "Streaming",
        },
        {
            name: "MBC",
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/Mbc1logo.png",
            category: "Entertainment",
        },
        {
            name: "Dubai TV",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW3PUNpR7PiQxjG15wDSy0PBRlWO0-ZtOr6g&s",
            category: "General",
        },
        {
            name: "2M",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/2M_TV_logo.svg/1200px-2M_TV_logo.svg.png",
            category: "General",
        },
        {
            name: "Al Arabiya",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LhWbR6aKYjU8gR9dj4gOgwq0SEh9BNYRqQ&s",
            category: "News",
        },
        {
            name: "Rotana",
            logo: "https://upload.wikimedia.org/wikipedia/ar/b/b8/Rotana_logo.jpg",
            category: "Music",
        },
        {
            name: "OSN",
            logo: "https://e7.pngegg.com/pngimages/894/497/png-clipart-osn-mena-netflix-orbit-showtime-entertainment-let-s-go-miscellaneous-text.png",
            category: "Movies",
        },
        {
            name: "National Geographic",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnMkH9iO1MosKoMIMVQ-m6QN7q7Xj-VfKtA&s",
            category: "Documentary",
        },
        {
            name: "Discovery",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqPxnDT5QmCG11r5e_qO6iPbZotTqJ2CpchQ&s",
            category: "Documentary",
        },
        {
            name: "CNN",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/CNN_International_logo.svg/2048px-CNN_International_logo.svg.png",
            category: "News",
        },
        {
            name: "BBC",
            logo: "https://ichef.bbci.co.uk/images/ic/1920x1080/p09xtmrp.jpg",
            category: "News",
        },
        {
            name: "France 24",
            logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/2/24/Logos_FRANCE24_RVB_2013.svg/1200px-Logos_FRANCE24_RVB_2013.svg.png",
            category: "News",
        },
    ]

    const categories = [
        {
            name: "Sports",
            channels: channels.filter((ch) => ch.category === "Sports"),
            color: "from-green-500 to-emerald-600",
            icon: "⚽",
        },
        {
            name: "News",
            channels: channels.filter((ch) => ch.category === "News"),
            color: "from-red-500 to-rose-600",
            icon: "📺",
        },
        {
            name: "Streaming",
            channels: channels.filter((ch) => ch.category === "Streaming"),
            color: "from-purple-500 to-violet-600",
            icon: "🎬",
        },
        {
            name: "Kids",
            channels: channels.filter((ch) => ch.category === "Kids"),
            color: "from-pink-500 to-rose-600",
            icon: "🧸",
        },
        {
            name: "Entertainment",
            channels: channels.filter((ch) => ch.category === "Entertainment"),
            color: "from-blue-500 to-cyan-600",
            icon: "🎭",
        },
        {
            name: "General",
            channels: channels.filter((ch) => ch.category === "General"),
            color: "from-gray-500 to-slate-600",
            icon: "📡",
        },
    ]

    // Responsive channels per view
    const channelsPerView = isMobile ? 2 : 5 // 2 on mobile, 5 on desktop
    const totalSlides = Math.ceil(channels.length / channelsPerView)

    // Auto-scroll functionality
    const startAutoScroll = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            if (!isPaused) {
                setCurrentIndex((prev) => (prev + 1) % totalSlides)
            }
        }, 4000) // Slower on mobile
    }

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    useEffect(() => {
        if (isPlaying && !isPaused) {
            startAutoScroll()
        } else {
            stopAutoScroll()
        }

        return () => stopAutoScroll()
    }, [isPlaying, isPaused, totalSlides])

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const handleMouseEnter = () => {
        if (!isMobile) setIsPaused(true)
    }

    const handleMouseLeave = () => {
        if (!isMobile) setIsPaused(false)
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    // Get channels for current slide
    const getCurrentChannels = () => {
        const startIndex = currentIndex * channelsPerView
        const endIndex = Math.min(startIndex + channelsPerView, channels.length)
        return channels.slice(startIndex, endIndex)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="relative bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
                {/* Header with controls */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-800">
                    <div className="flex items-center space-x-2 md:space-x-4 space-x-reverse">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">
                            {t('totalChannels')}
                        </div>
                        <div className="bg-emerald-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">
                            {t('popular')}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse">
                        <button
                            onClick={togglePlayPause}
                            className="p-1.5 md:p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors duration-200"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause size={isMobile ? 14 : 16} /> : <Play size={isMobile ? 14 : 16} />}
                        </button>

                        <button
                            onClick={prevSlide}
                            className="p-1.5 md:p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-all duration-200"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={isMobile ? 14 : 16} />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="p-1.5 md:p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-all duration-200"
                            aria-label="Next"
                        >
                            <ChevronRight size={isMobile ? 14 : 16} />
                        </button>
                    </div>
                </div>

                {/* Slider container */}
                <div className="relative overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {/* Channel logos container */}
                    <div className="py-4 md:py-8 px-3 md:px-6">
                        <div className={`grid gap-3 md:gap-6 ${isMobile ? "grid-cols-2" : "grid-cols-5"}`}>
                            {getCurrentChannels().map((channel, index) => (
                                <div key={`${channel.name}-${currentIndex}-${index}`} className="group cursor-pointer">
                                    <div className="relative bg-slate-800 rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-slate-700 group-hover:border-blue-500">
                                        {/* Category badge */}
                                        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full font-medium shadow-lg">
                                            {channel.category}
                                        </div>

                                        {/* Logo container */}
                                        <div className="flex items-center justify-center h-10 md:h-16 mb-2 md:mb-4 bg-white/5 rounded-lg p-2">
                                            <Image
                                                src={channel.logo || "/placeholder.svg"}
                                                alt={channel.name}
                                                width={isMobile ? 80 : 120}
                                                height={isMobile ? 40 : 64}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>

                                        {/* Channel name */}
                                        <h4 className="text-center text-xs md:text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-300 line-clamp-1">
                                            {channel.name}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Slide indicators */}
                <div className="flex justify-center space-x-1 md:space-x-2 space-x-reverse pb-4 md:pb-6">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-blue-500 w-4 md:w-8" : "bg-slate-700 hover:bg-slate-600"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Progress bar */}
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <div className="w-full bg-slate-800 rounded-full h-0.5 md:h-1">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-0.5 md:h-1 rounded-full transition-all duration-300"
                            style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
