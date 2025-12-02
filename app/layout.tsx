import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Premium IPTV Store - 10,000+ Channels in 4K/FHD',
  description: 'Get the best IPTV service with over 10,000 channels, movies, and series. Instant delivery, anti-freeze technology, and 24/7 support.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}
