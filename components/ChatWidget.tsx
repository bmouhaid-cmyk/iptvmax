'use client'

import { MessageCircle } from 'lucide-react'

export default function ChatWidget({ phoneNumber = '1234567890' }: { phoneNumber?: string }) {
    const message = encodeURIComponent("Hello, I need help with my order.")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center group"
            aria-label="Chat with us on WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
                Chat with us
            </span>
        </a>
    )
}
