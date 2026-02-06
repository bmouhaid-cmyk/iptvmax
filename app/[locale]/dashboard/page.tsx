import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import DashboardProofUpload from '@/components/DashboardProofUpload'
import DashboardFastBuy from '@/components/DashboardFastBuy'
import DashboardStats from '@/components/DashboardStats'
import DashboardOrderCard from '@/components/DashboardOrderCard'
import DashboardGuides from '@/components/DashboardGuides'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

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
    const t = await getTranslations('Dashboard')

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

                    <DashboardFastBuy />

                    <DashboardStats orders={orders || []} />

                    <section className="mt-8">
                        <h2 className="text-xl font-bold mb-4">{t('orders')}</h2>
                        {orders && orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <DashboardOrderCard
                                        key={order.id}
                                        order={order}
                                        DashboardProofUpload={DashboardProofUpload}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-slate-900 rounded-xl border border-slate-800">
                                <p className="text-gray-400">No active subscriptions found.</p>
                            </div>
                        )}
                    </section>

                    <DashboardGuides />
                </div>
            </div>
        </div>
    )
}
