"use client";

import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsForm({ initialContent }: { initialContent: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        config: {
            replyEmail: initialContent.config?.replyEmail || '',
            replyPhone: initialContent.config?.replyPhone || '',
            emailSignature: initialContent.config?.emailSignature || '',
        }
    });

    const handleChange = (section: 'config', field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Merge with existing content to avoid losing other data
            const newContent = {
                ...initialContent,

                config: {
                    ...initialContent.config,
                    ...formData.config
                }
            };

            const res = await fetch('/api/content', {
                method: 'POST',
                body: JSON.stringify(newContent),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) throw new Error('Failed to save');

            router.refresh();
            alert('Settings saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to save settings.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            {/* Admin Configuration */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 font-oswald uppercase tracking-wide border-b border-zinc-800 pb-2">
                    Admin Configuration
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="block text-xs uppercase text-zinc-500 mb-1 font-bold">Reply-To Email</label>
                        <p className="text-[10px] text-zinc-600 mb-2">Used for email links in the admin panel.</p>
                        <input
                            type="email"
                            value={formData.config.replyEmail}
                            onChange={e => handleChange('config', 'replyEmail', e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-zinc-500 mb-1 font-bold">Reply-To Phone</label>
                        <p className="text-[10px] text-zinc-600 mb-2">Used for WhatsApp links (include country code).</p>
                        <input
                            type="text"
                            value={formData.config.replyPhone}
                            onChange={e => handleChange('config', 'replyPhone', e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs uppercase text-zinc-500 mb-1 font-bold">Email Signature</label>
                        <textarea
                            rows={4}
                            value={formData.config.emailSignature}
                            onChange={e => handleChange('config', 'emailSignature', e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white focus:border-[#D4AF37] focus:outline-none transition-colors font-mono text-sm"
                        />
                    </div>
                </div>
            </div>



            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b0902c] text-black font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Save Settings
                </button>
            </div>
        </form>
    );
}
