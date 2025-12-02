import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CheckoutForm from '@/components/CheckoutForm'

export default async function CheckoutPage({
    searchParams,
}: {
    searchParams: Promise<{ package?: string }>
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { package: pkg } = await searchParams

    if (!user) {
        const nextUrl = '/login?next=/checkout?package=' + (pkg ?? '')
        redirect(nextUrl)
    }

    const packageType = pkg?.replace('-', ' ') || '1 month'

    // Calculate price based on package
    let price = '10'
    if (packageType.includes('3')) price = '25'
    if (packageType.includes('1 year') || packageType.includes('year')) price = '70'

    return (
        <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-slate-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 border border-slate-800">
                <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

                <div className="mb-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                    <div className="flex justify-between items-center">
                        <span className="capitalize">{packageType} Subscription</span>
                        <span className="font-bold text-xl">${price}</span>
                    </div>
                </div>

                <CheckoutForm packageType={packageType} price={price} userId={user.id} />
            </div>
        </div>
    )
}
