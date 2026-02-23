
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-zinc-900 p-8 rounded-2xl border border-zinc-800"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold font-oswald tracking-tighter">ADMIN ACCESS</h2>
                    <p className="mt-2 text-sm text-zinc-400">Enter your credentials to continue</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none relative block w-full px-3 py-3 border border-zinc-700 placeholder-zinc-500 text-white rounded-lg bg-zinc-950 focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] focus:z-10 sm:text-sm"
                            placeholder="Enter Access Code"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-900/10 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-[#D4AF37] hover:bg-[#b0902c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? 'Verifying...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
