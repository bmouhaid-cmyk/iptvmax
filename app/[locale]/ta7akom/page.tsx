import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import AdminOrderRow from '@/components/AdminOrderRow'
import AdminAnalytics from '@/components/AdminAnalytics'

export default async function AdminDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Check role
    const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    const profile = profileData as { role: string } | null

    if (profile?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
                    <p className="mt-4 text-gray-400">You do not have permission to view this page.</p>
                </div>
            </div>
        )
    }

    const { data: ordersData } = await supabase
        .from('orders')
        .select('*, profiles(email)')
        .order('created_at', { ascending: false })

    const orders = ordersData as any[]

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                    <AdminAnalytics orders={orders} />

                    <div className="bg-slate-900 shadow overflow-hidden sm:rounded-lg border border-slate-800">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-white">Order Management</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-400">Manage and fulfill customer orders.</p>
                        </div>
                        <div className="border-t border-slate-800">
                            <ul role="list" className="divide-y divide-slate-800">
                                {orders?.map((order) => (
                                    <AdminOrderRow key={order.id} order={order} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
