"use client"

import { useCurrency, Currency } from "@/context/CurrencyContext"
import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function CurrencySwitcher() {
    const { currency, setCurrency } = useCurrency()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const currencies: { code: Currency; symbol: string }[] = [
        { code: "EUR", symbol: "€" },
        { code: "USD", symbol: "$" },
        { code: "MAD", symbol: "Dh" },
        { code: "USDT", symbol: "₮" },
    ]

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700/50"
            >
                <span className="text-blue-400">{currencies.find(c => c.code === currency)?.symbol}</span>
                <span>{currency}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="py-1">
                        {currencies.map((item) => (
                            <button
                                key={item.code}
                                onClick={() => {
                                    setCurrency(item.code)
                                    setIsOpen(false)
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${currency === item.code
                                        ? "bg-blue-600/10 text-blue-400"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <span className="w-5 text-center font-bold">{item.symbol}</span>
                                <span>{item.code}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
