'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardProofUpload({ orderId, userId }: { orderId: string, userId: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [proofFile, setProofFile] = useState<File | null>(null)
    const [proofType, setProofType] = useState<'file' | 'text'>('text')
    const [proofText, setProofText] = useState('')
    const [uploading, setUploading] = useState(false)
    const router = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProofFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (proofType === 'file' && !proofFile) return
        if (proofType === 'text' && !proofText.trim()) return

        setUploading(true)
        try {
            const supabase = createClient()
            let publicUrl = null

            if (proofType === 'file' && proofFile) {
                const fileExt = proofFile.name.split('.').pop()
                const fileName = `${Date.now()}.${fileExt}`
                const filePath = `${userId}/${fileName}`

                const { error: uploadError } = await supabase.storage
                    .from('payment-proofs')
                    .upload(filePath, proofFile)

                if (uploadError) throw uploadError

                const { data } = supabase.storage
                    .from('payment-proofs')
                    .getPublicUrl(filePath)

                publicUrl = data.publicUrl
            }

            const { error: updateError } = await supabase
                .from('orders')
                // @ts-ignore
                .update({
                    payment_proof_url: publicUrl,
                    payment_proof_text: proofType === 'text' ? proofText : null
                })
                .eq('id', orderId)

            if (updateError) throw updateError

            setIsOpen(false)
            setProofFile(null)
            setProofText('')
            router.refresh()
        } catch (error: any) {
            alert('Error uploading proof: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="text-sm text-blue-400 hover:text-blue-300 underline mt-2"
            >
                Upload Payment Proof
            </button>
        )
    }

    return (
        <div className="mt-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-white">Provide Proof</h4>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                    <X size={16} />
                </button>
            </div>

            <div className="space-y-4">
                <div className="flex gap-2 mb-2">
                    <button
                        onClick={() => setProofType('text')}
                        className={`flex-1 py-1 px-2 rounded text-xs border transition-all ${proofType === 'text'
                                ? 'bg-blue-600 border-blue-500 text-white'
                                : 'bg-slate-700 border-slate-600 text-gray-400 hover:bg-slate-600'
                            }`}
                    >
                        Enter Text
                    </button>
                    <button
                        onClick={() => setProofType('file')}
                        className={`flex-1 py-1 px-2 rounded text-xs border transition-all ${proofType === 'file'
                                ? 'bg-blue-600 border-blue-500 text-white'
                                : 'bg-slate-700 border-slate-600 text-gray-400 hover:bg-slate-600'
                            }`}
                    >
                        Upload File
                    </button>
                </div>

                {proofType === 'file' ? (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-400
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700"
                    />
                ) : (
                    <input
                        type="text"
                        value={proofText}
                        onChange={(e) => setProofText(e.target.value)}
                        placeholder="Wallet Address or Email"
                        className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                )}

                <button
                    onClick={handleUpload}
                    disabled={(proofType === 'file' && !proofFile) || (proofType === 'text' && !proofText) || uploading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-colors disabled:opacity-50 text-sm"
                >
                    {uploading ? 'Submitting...' : 'Submit Proof'}
                </button>
            </div>
        </div>
    )
}
