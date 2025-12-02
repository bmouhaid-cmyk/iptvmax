'use client'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { LogOut, Menu, X } from 'lucide-react'

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    return (
        <nav className="bg-slate-900 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-white">
                            IPTV Store
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/#pricing" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Pricing
                            </Link>
                            {user ? (
                                <>
                                    <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                                        <LogOut size={16} /> Logout
                                    </button>
                                </>
                            ) : (
                                <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/#pricing" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            Pricing
                        </Link>
                        {user ? (
                            <>
                                <Link href="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
