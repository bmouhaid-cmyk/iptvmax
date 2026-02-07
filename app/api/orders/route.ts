import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const { userId, packageType, paymentMethod, paymentProofUrl, paymentProofText, device, status } = await request.json()

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
            status: status || 'Pending',
            payment_method: paymentMethod,
            payment_proof_url: paymentProofUrl,
            payment_proof_text: paymentProofText,
            device_type: device // Mapping 'device' from frontend to 'device_type' in DB (assuming column name)
        } as any).select()

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
