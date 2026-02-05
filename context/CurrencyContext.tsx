"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Currency = "EUR" | "USD" | "MAD" | "USDT"

interface CurrencyContextType {
    currency: Currency
    setCurrency: (currency: Currency) => void
    symbol: string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const CURRENCY_SYMBOLS: Record<Currency, string> = {
    EUR: "€",
    USD: "$",
    MAD: "Dh",
    USDT: "₮",
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<Currency>("EUR")

    useEffect(() => {
        const saved = localStorage.getItem("site_currency") as Currency
        if (saved && ["EUR", "USD", "MAD", "USDT"].includes(saved)) {
            setCurrency(saved)
        }
    }, [])

    const handleSetCurrency = (c: Currency) => {
        setCurrency(c)
        localStorage.setItem("site_currency", c)
    }

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                setCurrency: handleSetCurrency,
                symbol: CURRENCY_SYMBOLS[currency],
            }}
        >
            {children}
        </CurrencyContext.Provider>
    )
}

export function useCurrency() {
    const context = useContext(CurrencyContext)
    if (context === undefined) {
        throw new Error("useCurrency must be used within a CurrencyProvider")
    }
    return context
}
