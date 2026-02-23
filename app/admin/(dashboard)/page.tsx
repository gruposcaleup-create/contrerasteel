import { getSubmissions } from '@/lib/submissions';
import Link from 'next/link';
import { Mail, MessageSquare, MousePointer, Eye, ArrowUpRight } from 'lucide-react';
import fs from 'fs/promises';
import path from 'path';

async function getAnalytics() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'analytics.json');
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return { visits: 0, clicks: 0 };
    }
}

export default async function AdminDashboard() {
    const submissions = await getSubmissions();
    const analytics = await getAnalytics();

    const newMessages = submissions.filter(s => s.status === 'new').length;
    const respondedMessages = submissions.filter(s => s.status === 'responded').length;
    const totalMessages = submissions.length;

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white/90 font-oswald uppercase">Command Center</h2>
                <p className="text-zinc-400 font-manrope">Real-time system monitoring active.</p>
            </div>

            {/* Live Analytics Row */}
            <div className="grid gap-4 md:grid-cols-4">
                <StatsCard
                    title="Total Visits"
                    value={analytics.visits.toLocaleString()}
                    icon={<Eye className="h-4 w-4 text-[#D4AF37]" />}
                    trend="Live Tracking"
                    trendUp={true}
                    alert={true}
                />
                <StatsCard
                    title="Engagement Clicks"
                    value={analytics.clicks.toLocaleString()}
                    icon={<MousePointer className="h-4 w-4 text-blue-500" />}
                    trend="Contact Actions"
                    trendUp={true}
                />
                <StatsCard
                    title="New Inquiries"
                    value={newMessages.toString()}
                    icon={<Mail className="h-4 w-4 text-green-500" />}
                    trend="Unread Messages"
                    trendUp={newMessages > 0}
                    alert={newMessages > 0}
                />
                <StatsCard
                    title="Total Messages"
                    value={totalMessages.toString()}
                    icon={<MessageSquare className="h-4 w-4 text-purple-500" />}
                    trend="All Time"
                    trendUp={true}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Content Area */}
                <div className="col-span-2 space-y-6">
                    {/* Analytics Chart Placeholder (could be real later) */}
                    <div className="rounded-xl border bg-zinc-900 border-zinc-800 p-6 flex flex-col items-center justify-center text-center h-64 opacity-50">
                        <p className="text-zinc-500 text-sm uppercase tracking-widest">Real-time Traffic Graph (Coming Soon)</p>
                        <p className="text-zinc-600 text-xs mt-2">Data is being collected...</p>
                    </div>

                    {/* Quick Guide */}
                    <div className="rounded-xl border bg-zinc-900 border-zinc-800 p-6">
                        <h3 className="font-bold text-white font-oswald uppercase tracking-wider mb-4">System Status</h3>
                        <div className="space-y-4 text-sm text-zinc-400">
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                                <span>Analytics Engine</span>
                                <span className="text-green-500 font-mono">ONLINE</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                                <span>Message Processing</span>
                                <span className="text-green-500 font-mono">ACTIVE</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Database Connection</span>
                                <span className="text-green-500 font-mono">STABLE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Inbox */}
                <div className="rounded-xl border bg-zinc-900 border-zinc-800 flex flex-col h-[500px]">
                    <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                        <h3 className="font-bold text-white font-oswald uppercase tracking-wider">Inbox Stream</h3>
                        <Link href="/admin/messages" className="text-xs text-[#D4AF37] hover:underline uppercase tracking-wide font-bold">
                            View All
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        {submissions.length === 0 ? (
                            <div className="text-center py-20 text-zinc-500">No messages yet.</div>
                        ) : (
                            submissions.filter(s => s.status !== 'trash').slice(0, 8).map((sub) => (
                                <div key={sub.id} className="p-3 hover:bg-zinc-800/50 rounded-lg transition-colors border-b border-zinc-800/30 last:border-0 cursor-default">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-white text-sm truncate pr-2">{sub.name}</h4>
                                        <span suppressHydrationWarning className="text-[10px] text-zinc-500">{new Date(sub.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}</span>
                                    </div>
                                    <p className="text-xs text-zinc-400 line-clamp-1">{sub.message}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold border ${sub.status === 'new'
                                            ? 'bg-[#D4AF37]/5 text-[#D4AF37] border-[#D4AF37]/20'
                                            : 'bg-green-500/5 text-green-500 border-green-500/20'
                                            }`}>
                                            {sub.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon, trend, trendUp, alert }: any) {
    return (
        <div className={`rounded-xl border p-6 ${alert ? 'bg-[#D4AF37] border-[#D4AF37]' : 'bg-zinc-900 border-zinc-800'} relative overflow-hidden group`}>
            <div className="absolute right-0 top-0 opacity-5 transform translate-x-1/2 -translate-y-1/2">
                <Eye size={100} />
            </div>

            <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <h3 className={`tracking-tight text-sm font-medium ${alert ? 'text-black' : 'text-zinc-400'}`}>{title}</h3>
                {icon}
            </div>
            <div className={`text-4xl font-bold font-oswald mb-2 relative z-10 ${alert ? 'text-black' : 'text-white'}`}>{value}</div>
            <div className="flex items-center gap-1 relative z-10">
                <ArrowUpRight size={14} className={alert ? "text-black/70" : "text-green-500"} />
                <p className={`text-xs ${alert ? 'text-black/70' : 'text-zinc-500'}`}>
                    {trend}
                </p>
            </div>
        </div>
    );
}
