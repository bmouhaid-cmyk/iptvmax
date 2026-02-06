import { Package, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function DashboardStats({ orders }: { orders: any[] }) {
    const totalOrders = orders.length
    const activeOrders = orders.filter(o => o.status === 'Completed').length
    const pendingOrders = orders.filter(o => o.status === 'Pending').length

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Package className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                    <h3 className="text-gray-400 text-sm font-medium">Total Orders</h3>
                    <p className="text-2xl font-bold text-white">{totalOrders}</p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div>
                    <h3 className="text-gray-400 text-sm font-medium">Active Subscriptions</h3>
                    <p className="text-2xl font-bold text-white">{activeOrders}</p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <Clock className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                    <h3 className="text-gray-400 text-sm font-medium">Pending Approvals</h3>
                    <p className="text-2xl font-bold text-white">{pendingOrders}</p>
                </div>
            </div>
        </div>
    )
}
