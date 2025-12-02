'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CheckoutForm({ packageType, price, userId }: { packageType: string, price: string, userId: string }) {
    const [paymentMethod, setPaymentMethod] = useState('crypto')
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSubmit = async () => {
        setLoading(true)
        console.log('Submitting order...', { userId, packageType, paymentMethod })

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, packageType, paymentMethod }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create order')
            }

            console.log('Order created successfully, showing modal...')
            setLoading(false)
            setShowModal(true)
        } catch (error: any) {
            alert('Error creating order: ' + error.message)
            setLoading(false)
        }
    }

    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(`Hello, I have made a payment for the ${packageType} package. Here is my proof.`)}`

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === 'paypal'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-700 hover:border-slate-600'
                        }`}
                >
                    <div className="font-semibold">PayPal</div>
                </button>
                <button
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === 'crypto'
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-slate-700 hover:border-slate-600'
                        }`}
                >
                    <div className="font-semibold">Crypto (USDT)</div>
                </button>
            </div>

            {/* Payment Details */}
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                {paymentMethod === 'paypal' ? (
                    <div>
                        <p className="text-sm text-gray-400 mb-2">Send payment to:</p>
                        <div className="flex items-center justify-between bg-slate-900 p-3 rounded">
                            <code className="text-blue-400">paypal@example.com</code>
                            <button
                                onClick={() => handleCopy('paypal@example.com')}
                                className="text-sm text-gray-400 hover:text-white"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm text-gray-400 mb-2">Send USDT (TRC20) to:</p>
                        <div className="flex items-center justify-between bg-slate-900 p-3 rounded">
                            <code className="text-green-400 text-sm break-all">T9yD14Nj9j7xAB4dbGeiX9h8b...</code>
                            <button
                                onClick={() => handleCopy('T9yD14Nj9j7xAB4dbGeiX9h8b...')}
                                className="text-sm text-gray-400 hover:text-white ml-2"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
                <p className="text-yellow-200 text-sm font-medium flex items-start gap-2">
                    <span className="text-lg">⚠️</span>
                    <span>
                        <strong>Important:</strong> Please take a screenshot of your payment. You will need to send it to us via WhatsApp to activate your subscription.
                    </span>
                </p>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Processing...' : 'I Have Made The Payment'}
            </button>

            {/* Payment Proof Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full border border-slate-700 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-center">Payment Confirmation</h3>
                        <p className="text-gray-300 mb-6 text-center">
                            Please send a screenshot of your payment to our WhatsApp support to activate your subscription immediately.
                        </p>
                        <div className="space-y-3">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg text-center transition-colors"
                            >
                                Send Proof on WhatsApp
                            </a>
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
