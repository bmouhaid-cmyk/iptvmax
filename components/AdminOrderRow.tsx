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
        <li className="px-4 py-4 sm:px-6 hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-blue-400 truncate">
                            {order.profiles?.email}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                            {editing ? (
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="bg-slate-800 text-white text-xs rounded border border-slate-600 px-2 py-1"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            ) : (
                                <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {status}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <div className="flex flex-col gap-1">
                            <p className="capitalize font-medium text-white">{order.package_type}</p>
                            <p className="text-xs">{order.payment_method} • {order.device_type || 'No Device Selected'}</p>
                        </div>
                        <p suppressHydrationWarning>{new Date(order.created_at).toLocaleDateString()}</p>
                        {order.payment_proof_url && (
                            <a
                                href={order.payment_proof_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline ml-4"
                            >
                                View Proof
                            </a>
                        )}
                        {order.payment_proof_text && (
                            <span className="ml-4 text-gray-300 bg-slate-800 px-2 py-1 rounded text-xs border border-slate-700">
                                Proof: {order.payment_proof_text}
                            </span>
                        )}
                    </div>

                    <div className="mt-4">
                        {editing ? (
                            <textarea
                                value={credentials}
                                onChange={(e) => setCredentials(e.target.value)}
                                placeholder="Enter IPTV Credentials here..."
                                className="w-full bg-slate-950 text-white text-sm rounded border border-slate-700 p-2 h-24 font-mono"
                            />
                        ) : (
                            credentials && (
                                <pre className="text-xs text-gray-500 whitespace-pre-wrap font-mono mt-2 bg-slate-950 p-2 rounded border border-slate-800">
                                    {credentials}
                                </pre>
                            )
                        )}
                    </div>
                </div>
                <div className="ml-4 flex-shrink-0 self-start">
                    {editing ? (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="text-green-400 hover:text-green-300"
                            >
                                <Save size={20} />
                            </button>
                            <button
                                onClick={() => {
                                    setEditing(false)
                                    setStatus(order.status)
                                    setCredentials(order.iptv_credentials || '')
                                }}
                                className="text-red-400 hover:text-red-300"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setEditing(true)}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </li>
    )
}
