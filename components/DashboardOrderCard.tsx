'use client'

import { useState } from 'react'
import { Copy, Check, Download, ExternalLink, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function DashboardOrderCard({ order, DashboardProofUpload }: { order: any, DashboardProofUpload: any }) {
    const t = useTranslations('Dashboard') // We need to add this namespace
    const [copied, setCopied] = useState('')

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text)
        setCopied(field)
        setTimeout(() => setCopied(''), 2000)
    }

    const downloadM3u = () => {
        // Mock download logic - normally this would hit an API endpoint
        alert('Downloading M3U playlist...')
    }

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            {order.package_type} Subscription
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${order.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                                order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                    'bg-gray-500/10 text-gray-500'
                                }`}>
                                {order.status}
                            </span>
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                            {new Date(order.created_at).toISOString().split('T')[0]} • {order.payment_method}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Credentials Section */}
                {order.status === 'Completed' && order.iptv_credentials ? (
                    <div className="space-y-4">
                        {/* Try to detect if credentials are structured line-by-line or just text */}
                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                            <div className="flex justify-between items-start mb-2">
                                <label className="text-xs text-gray-500 uppercase font-semibold">Subscription Credentials</label>
                                <div className="flex gap-2">
                                    <button onClick={() => handleCopy(order.iptv_credentials, 'creds')} className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1">
                                        {copied === 'creds' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy All
                                    </button>
                                </div>
                            </div>
                            <pre className="text-sm text-blue-400 whitespace-pre-wrap font-mono leading-relaxed">
                                {order.iptv_credentials}
                            </pre>
                        </div>


                    </div>
                ) : order.status === 'Pending' ? (
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                        <div className="flex gap-3">
                            <div className="p-2 bg-yellow-500/10 rounded-full h-fit">
                                <Clock className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div>
                                <h4 className="text-yellow-500 font-bold mb-1">Awaiting Activation</h4>
                                <p className="text-sm text-gray-400">
                                    We are verifying your payment. This usually takes 15-60 minutes.
                                    {!order.payment_proof_url && " Please upload your proof below if you haven't already."}
                                </p>
                            </div>
                        </div>
                        {!order.payment_proof_url && (
                            <div className="mt-4">
                                <DashboardProofUpload orderId={order.id} userId="user" />
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
