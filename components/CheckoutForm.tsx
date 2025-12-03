'use client'
import { useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, CheckCircle } from 'lucide-react'
import Image from 'next/image'

export default function CheckoutForm({ packageType, price, userId }: { packageType: string, price: string, userId: string }) {
    const t = useTranslations('Checkout')
    const [paymentMethod, setPaymentMethod] = useState('crypto')
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [proofFile, setProofFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [proofType, setProofType] = useState<'file' | 'text'>('text')
    const [proofText, setProofText] = useState('')
    const [uploading, setUploading] = useState(false)
    const router = useRouter()

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setProofFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const removeFile = () => {
        setProofFile(null)
        if (previewUrl) URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
    }

    const handleSubmit = async () => {
        if (proofType === 'file' && !proofFile) {
            alert('Please upload a payment proof screenshot.')
            return
        }
        if (proofType === 'text' && !proofText.trim()) {
            alert('Please enter your wallet address or email.')
            return
        }

        setLoading(true)
        setUploading(true)
        console.log('Submitting order...', { userId, packageType, paymentMethod })

        try {
            let publicUrl = null

            if (proofType === 'file' && proofFile) {
                const supabase = createClient()
                const fileExt = proofFile.name.split('.').pop()
                const fileName = `${Date.now()}.${fileExt}`
                const filePath = `${userId}/${fileName}`

                // Upload proof to Supabase Storage
                const { error: uploadError } = await supabase.storage
                    .from('payment-proofs')
                    .upload(filePath, proofFile)

                if (uploadError) {
                    throw new Error('Failed to upload payment proof: ' + uploadError.message)
                }

                // Get public URL
                const { data } = supabase.storage
                    .from('payment-proofs')
                    .getPublicUrl(filePath)

                publicUrl = data.publicUrl
            }

            // Submit order with proof URL or Text
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    packageType,
                    paymentMethod,
                    paymentProofUrl: publicUrl,
                    paymentProofText: proofType === 'text' ? proofText : null
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create order')
            }

            console.log('Order created successfully, showing modal...')
            setLoading(false)
            setUploading(false)
            setShowModal(true)
        } catch (error: any) {
            alert('Error: ' + error.message)
            setLoading(false)
            setUploading(false)
        }
    }

    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(`Hello, I have made a payment for the ${packageType} package.`)}`

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

            {/* Upload Section */}
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">
                    Payment Proof
                </label>

                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => setProofType('text')}
                        className={`flex-1 py-2 px-4 rounded-lg border transition-all ${proofType === 'text'
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-slate-800 border-slate-700 text-gray-400 hover:bg-slate-700'
                            }`}
                    >
                        Enter Wallet/Email
                    </button>
                    <button
                        onClick={() => setProofType('file')}
                        className={`flex-1 py-2 px-4 rounded-lg border transition-all ${proofType === 'file'
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-slate-800 border-slate-700 text-gray-400 hover:bg-slate-700'
                            }`}
                    >
                        Upload Screenshot
                    </button>
                </div>

                {proofType === 'file' ? (
                    !previewUrl ? (
                        <div className="relative border-2 border-dashed border-slate-700 rounded-lg p-8 hover:border-blue-500 transition-colors bg-slate-800/30">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="text-center">
                                <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                                <p className="text-sm text-gray-300 font-medium">Click to upload screenshot</p>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={previewUrl}
                                    alt="Payment Proof"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="p-3 bg-slate-900 flex items-center justify-between">
                                <span className="text-sm text-gray-300 truncate max-w-[200px]">
                                    {proofFile?.name}
                                </span>
                                <button
                                    onClick={removeFile}
                                    className="text-red-400 hover:text-red-300 p-1"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
                        <label className="block text-sm text-gray-400 mb-2">
                            {paymentMethod === 'paypal' ? 'PayPal Email Address' : 'Wallet Address / Transaction ID'}
                        </label>
                        <input
                            type="text"
                            value={proofText}
                            onChange={(e) => setProofText(e.target.value)}
                            placeholder={paymentMethod === 'paypal' ? 'e.g. your-email@example.com' : 'e.g. TxID or Wallet Address'}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                )}
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
                <p className="text-yellow-200 text-sm font-medium flex items-start gap-2">
                    <span className="text-lg">⚠️</span>
                    <span>
                        <strong>{t('important')}:</strong> {t('instruction')}
                    </span>
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    onClick={handleSubmit}
                    disabled={loading || (proofType === 'file' && !proofFile) || (proofType === 'text' && !proofText)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {uploading ? 'Uploading Proof...' : t('processing')}
                        </>
                    ) : (
                        t('payButton')
                    )}
                </button>

                <button
                    onClick={() => router.push('/')}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-gray-300 font-semibold py-3 rounded-lg transition-colors"
                >
                    Cancel
                </button>
            </div>

            {/* Payment Proof Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full border border-slate-700 shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">{t('modalTitle')}</h3>
                            <p className="text-gray-300">
                                Your order and payment proof have been received! We will verify it and activate your subscription shortly.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors text-center"
                            >
                                {t('dashboardButton')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
