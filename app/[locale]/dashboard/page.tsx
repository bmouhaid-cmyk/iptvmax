import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import DashboardProofUpload from '@/components/DashboardProofUpload'
import DashboardFastBuy from '@/components/DashboardFastBuy'

export default async function Dashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    const orders = ordersData as any[]

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <DashboardFastBuy />

                    <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                    {orders && orders.length > 0 ? (
                        <div className="bg-slate-900 shadow overflow-hidden sm:rounded-md border border-slate-800">
                            <ul role="list" className="divide-y divide-slate-800">
                                {orders.map((order) => (
                                    <li key={order.id}>
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-blue-400 truncate capitalize">
                                                    {order.package_type} Subscription
                                                </p>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {order.status}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <p className="flex items-center text-sm text-gray-400">
                                                        Payment: {order.payment_method}
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0">
                                                    <p>
                                                        Ordered on {new Date(order.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Late Payment Proof Upload */}
                                            {order.status === 'Pending' && !order.payment_proof_url && (
                                                <DashboardProofUpload orderId={order.id} userId={user.id} />
                                            )}

                                            {order.status === 'Completed' && order.iptv_credentials && (
                                                <div className="mt-4 p-4 bg-slate-800 rounded-md border border-slate-700">
                                                    <h4 className="text-sm font-medium text-white mb-2">Your Credentials:</h4>
                                                    <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono bg-slate-950 p-2 rounded">
                                                        {order.iptv_credentials}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-slate-900 rounded-lg border border-slate-800">
                            <p className="text-gray-400">No orders found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
