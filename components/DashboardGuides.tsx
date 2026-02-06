import { Tv, Smartphone, Monitor } from 'lucide-react'

export default function DashboardGuides() {
    const guides = [
        {
            title: "Smart TV Setup",
            icon: Tv,
            desc: "Setup for Samsung, LG, Android TV",
            link: "#"
        },
        {
            title: "Mobile / Tablet",
            icon: Smartphone,
            desc: "IPTV Smarters, XCIPTV Setup",
            link: "#"
        },
        {
            title: "PC / Laptop",
            icon: Monitor,
            desc: "VLC, Web Player Setup",
            link: "#"
        }
    ]

    return (
        <div className="mt-12 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Installation Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {guides.map((guide, i) => (
                    <a
                        key={i}
                        href={guide.link}
                        className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 hover:bg-slate-800 transition-all group"
                    >
                        <div className="p-3 bg-blue-600/10 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                            <guide.icon className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">{guide.title}</h3>
                            <p className="text-xs text-gray-400">{guide.desc}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}
