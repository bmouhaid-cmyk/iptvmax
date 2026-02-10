'use client'

import { BarChart3, Clock, CreditCard, Package, CheckCircle2, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react'
import { PRICING_PLANS } from '@/lib/constants'
import { useCurrency } from '@/context/CurrencyContext'

export default function AdminAnalytics({ orders }: { orders: any[] }) {
    const { currency, symbol } = useCurrency()

    if (!orders) return null

    const totalOrders = orders.length
    const pendingOrders = orders.filter(o => o.status === 'Pending').length
    const paidOrders = orders.filter(o => o.status === 'Paid').length
    const completedOrders = orders.filter(o => o.status === 'Completed').length
    const notCompletedOrders = orders.filter(o => ['Cancelled', 'Refunded', 'Failed'].includes(o.status)).length

    // Payment Methods
    const paymentMethods = orders.reduce((acc: any, order) => {
        const method = order.payment_method || 'Unknown'
        acc[method] = (acc[method] || 0) + 1
        return acc
    }, {})

    // Package Types
    const packageTypes = orders.reduce((acc: any, order) => {
        const type = order.package_type || 'Unknown'
        acc[type] = (acc[type] || 0) + 1
        return acc
    }, {})

    // Calculate Estimated Revenue
    // Map package title to price for selected currency
    const priceMap = PRICING_PLANS.reduce((acc: any, plan) => {
        // @ts-ignore
        acc[plan.title] = parseFloat((plan as any).prices?.[currency] || plan.price)
        return acc
    }, {})

    const totalRevenue = orders.reduce((sum, order) => {
        if (order.status === 'Completed' || order.status === 'Paid') {
            const price = priceMap[order.package_type] || 0
            return sum + price
        }
        return sum
    }, 0)

    const pendingRevenue = orders.reduce((sum, order) => {
        if (order.status === 'Pending') {
            const price = priceMap[order.package_type] || 0
            return sum + price
        }
        return sum
    }, 0)

    return (
        <div className="space-y-6 mb-8">
            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Total Orders</h3>
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                        </div>
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">{totalOrders}</span>
                        <span className="ml-2 text-xs text-gray-500">all time</span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Pending</h3>
                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <Clock className="w-5 h-5 text-yellow-500" />
                        </div>
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">{pendingOrders}</span>
                        <span className="ml-2 text-xs text-gray-500">needing action</span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Paid</h3>
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <DollarSign className="w-5 h-5 text-indigo-500" />
                        </div>
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">{paidOrders}</span>
                        <span className="ml-2 text-xs text-gray-500">processing</span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Completed</h3>
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">{completedOrders}</span>
                        <span className="ml-2 text-xs text-gray-500">fulfilled</span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Not Completed</h3>
                        <div className="p-2 bg-red-500/10 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">{notCompletedOrders}</span>
                        <span className="ml-2 text-xs text-gray-500">cancelled/refunded</span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Pending Income</h3>
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            <Clock className="w-5 h-5 text-orange-500" />
                        </div>
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white max-w-full truncate" title={`${symbol}${pendingRevenue.toFixed(2)}`}>
                            {symbol}{pendingRevenue.toFixed(2)}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">potential</span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-400 text-sm font-medium">Total Income</h3>
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                        </div>
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white max-w-full truncate" title={`${symbol}${totalRevenue.toFixed(2)}`}>
                            {symbol}{totalRevenue.toFixed(2)}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">realized</span>
                    </div>
                </div>
            </div>

            {/* Breakdowns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Package Distribution */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Package className="w-5 h-5 text-gray-400" />
                        Package Distribution
                    </h3>
                    <div className="space-y-4">
                        {Object.entries(packageTypes).map(([type, count]: [string, any]) => (
                            <div key={type} className="relative">
                                <div className="flex justify-between items-center mb-1 text-sm">
                                    <span className="text-gray-300 capitalize">{type}</span>
                                    <span className="text-white font-medium">{count} ({Math.round((count / totalOrders) * 100)}%)</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(count / totalOrders) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        Payment Methods
                    </h3>
                    <div className="space-y-4">
                        {Object.entries(paymentMethods).map(([method, count]: [string, any]) => (
                            <div key={method} className="relative">
                                <div className="flex justify-between items-center mb-1 text-sm">
                                    <span className="text-gray-300 capitalize">{method}</span>
                                    <span className="text-white font-medium">{count} ({Math.round((count / totalOrders) * 100)}%)</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${method === 'crypto' ? 'bg-green-500' : 'bg-blue-500'}`}
                                        style={{ width: `${(count / totalOrders) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
