import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const { userId, packageType, paymentMethod } = await request.json()

        // Ensure profile exists
        const { data: profile } = await supabase.from('profiles').select('id').eq('id', userId).single()
        if (!profile) {
            const { data: { user } } = await supabase.auth.getUser()
            if (user && user.email) {
                await supabase.from('profiles').insert({ id: userId, email: user.email } as any)
            }
        }

        const { data, error } = await supabase.from('orders').insert({
            user_id: userId,
            package_type: packageType,
            status: 'Pending',
            payment_method: paymentMethod,
        } as any).select()

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
