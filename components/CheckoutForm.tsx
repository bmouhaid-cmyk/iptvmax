'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Copy, Check } from 'lucide-react'

export default function CheckoutForm({ packageType, price, userId }: { packageType: string, price: string, userId: string }) {
    const [paymentMethod, setPaymentMethod] = useState('crypto')
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const router = useRouter()
    const supabase = createClient() as any

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSubmit = async () => {
        setLoading(true)
        console.log('Submitting order...', { userId, packageType, paymentMethod })

        // Ensure profile exists (in case user signed up before trigger was created)
        const { data: profile } = await supabase.from('profiles').select('id').eq('id', userId).single()
        if (!profile) {
            console.log('Profile missing, creating...')
            const { data: { user } } = await supabase.auth.getUser()
            if (user && user.email) {
                await supabase.from('profiles').insert({ id: userId, email: user.email })
            }
        }

        const { data, error } = await supabase.from('orders').insert({
            user_id: userId,
            package_type: packageType,
            status: 'Pending',
            payment_method: paymentMethod,
        }).select()

        console.log('Order submission result:', { data, error })

        if (error) {
            alert('Error creating order: ' + error.message)
            setLoading(false)
        } else {
            console.log('Order created successfully, redirecting...')
            router.push('/dashboard')
            router.refresh()
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setPaymentMethod('crypto')}
                        className={`p-4 rounded-lg border ${paymentMethod === 'crypto' ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 bg-slate-800'} transition-all`}
                    >
                        Crypto (USDT)
                    </button>
                    <button
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 rounded-lg border ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 bg-slate-800'} transition-all`}
                    >
                        PayPal
                    </button>
                </div>
            </div>

            {paymentMethod === 'crypto' && (
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <p className="text-sm text-gray-400 mb-2">Send <strong>${price}</strong> USDT (TRC20) to:</p>
                    <div className="flex items-center justify-between bg-slate-950 p-3 rounded border border-slate-800">
                        <code className="text-xs sm:text-sm text-blue-400 break-all">T9yD14Nj9j7xAB4dbGeiX9h8zzCyrxyz</code>
                        <button onClick={() => handleCopy('T9yD14Nj9j7xAB4dbGeiX9h8zzCyrxyz')} className="ml-2 text-gray-400 hover:text-white">
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                    </div>
                </div>
            )}

            {paymentMethod === 'paypal' && (
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <p className="text-sm text-gray-400">
                        Please send <strong>${price}</strong> to <span className="text-blue-400">payments@iptvstore.com</span> via Friends & Family.
                    </p>
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'I Have Made The Payment'}
            </button>
        </div>
    )
}
