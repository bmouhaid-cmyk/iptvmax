'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Check, X, Save } from 'lucide-react'

export default function AdminOrderRow({ order }: { order: any }) {
    const [status, setStatus] = useState(order.status)
    const [credentials, setCredentials] = useState(order.iptv_credentials || '')
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const supabase = createClient() as any

    const handleSave = async () => {
        setLoading(true)
        const { error } = await supabase
            .from('orders')
            .update({ status, iptv_credentials: credentials } as any)
            .eq('id', order.id)

        if (error) {
            alert('Error updating order: ' + error.message)
        } else {
            setEditing(false)
        }
        setLoading(false)
    }

    return (
        <li className="p-4 hover:bg-slate-800/30 transition-colors border-b border-slate-800 last:border-0">
            <div className="flex flex-col gap-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <span className="text-white font-semibold text-sm">{order.profiles?.email}</span>
                            <span className="text-xs text-gray-400">Ordered: {new Date(order.created_at).toISOString().split('T')[0]}</span>
                        </div>
                        {editing ? (
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="bg-slate-800 text-white text-xs rounded border border-slate-600 px-2 py-1 ml-2"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Refunded">Refunded</option>
                                <option value="Failed">Failed</option>
                            </select>
                        ) : (
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ml-2 ${status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                                status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                    status === 'Paid' ? 'bg-indigo-500/10 text-indigo-500' :
                                        ['Cancelled', 'Refunded', 'Failed'].includes(status) ? 'bg-red-500/10 text-red-500' :
                                            'bg-gray-500/10 text-gray-500'
                                }`}>
                                {status}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {editing ? (
                            <>
                                <button onClick={handleSave} disabled={loading} className="p-2 bg-green-600/20 text-green-400 rounded hover:bg-green-600/30 transition-colors">
                                    <Save size={16} />
                                </button>
                                <button onClick={() => setEditing(false)} className="p-2 bg-red-600/20 text-red-400 rounded hover:bg-red-600/30 transition-colors">
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setEditing(true)} className="text-blue-400 hover:text-white text-xs font-medium px-3 py-1 border border-blue-500/30 rounded hover:bg-blue-500/10">
                                Manage
                            </button>
                        )}
                    </div>
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <div>
                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Package Info</p>
                        <p className="text-white capitalize">{order.package_type}</p>
                        <p className="text-gray-400 text-xs mt-1">{order.payment_method} • {order.device_type || 'No Device'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase font-bold mb-1">Payment Proof</p>
                        <div className="flex items-center gap-2">
                            {order.payment_proof_url ? (
                                <a href={order.payment_proof_url} target="_blank" rel="noopener" className="text-blue-400 hover:underline text-xs flex items-center gap-1">
                                    <Check className="w-3 h-3" /> View Screenshot
                                </a>
                            ) : order.payment_proof_text ? (
                                <code className="bg-slate-800 px-2 py-0.5 rounded text-xs text-gray-300">{order.payment_proof_text}</code>
                            ) : (
                                <span className="text-gray-600 text-xs italic">No proof uploaded</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Credentials Section */}
                <div className="mt-1">
                    {editing ? (
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase font-semibold">IPTV Credentials / Notes</label>
                            <textarea
                                value={credentials}
                                onChange={(e) => setCredentials(e.target.value)}
                                placeholder="Paste M3U Link, Username, Password here..."
                                className="w-full bg-slate-950 text-white text-sm rounded-lg border border-slate-700 p-3 h-32 font-mono focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                    ) : (
                        credentials && (
                            <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                                <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                                    <span className="text-xs text-gray-500 uppercase font-semibold">Sent Credentials</span>
                                </div>
                                <pre className="p-3 text-xs text-green-400 whitespace-pre-wrap font-mono">
                                    {credentials}
                                </pre>
                            </div>
                        )
                    )}
                </div>
            </div>
        </li>
    )
}
