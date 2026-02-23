"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { useState } from "react";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        projectType: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev: typeof formData) => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const fullMessage = `Company: ${formData.company}\nProject Type: ${formData.projectType}\n\n${formData.message}`;

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: fullMessage
                })
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', company: '', email: '', projectType: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group relative">
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent"
                        placeholder="Name"
                    />
                    <label
                        htmlFor="name"
                        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#D4AF37] peer-focus:text-sm uppercase tracking-wide"
                    >
                        Name
                    </label>
                </div>
                <div className="group relative">
                    <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent"
                        placeholder="Company"
                    />
                    <label
                        htmlFor="company"
                        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#D4AF37] peer-focus:text-sm uppercase tracking-wide"
                    >
                        Company
                    </label>
                </div>
            </div>

            <div className="group relative">
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent"
                    placeholder="Email"
                />
                <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#D4AF37] peer-focus:text-sm uppercase tracking-wide"
                >
                    Email
                </label>
            </div>

            <div className="group relative">
                <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none"
                >
                    <option className="bg-void-black text-gray-400" value="">Select Project Type</option>
                    <option className="bg-void-black" value="Structural Steel Erection">Structural Steel Erection</option>
                    <option className="bg-void-black" value="Fabrication">Fabrication</option>
                    <option className="bg-void-black" value="Turnkey Solution">Turnkey Solution</option>
                    <option className="bg-void-black" value="Other">Other</option>
                </select>
                <label
                    htmlFor="projectType"
                    className="absolute left-0 -top-3.5 text-[#D4AF37] text-sm uppercase tracking-wide"
                >
                    Project Type
                </label>
            </div>

            <div className="group relative">
                <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent resize-none"
                    placeholder="Message"
                ></textarea>
                <label
                    htmlFor="message"
                    className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#D4AF37] peer-focus:text-sm uppercase tracking-wide"
                >
                    Message
                </label>
            </div>

            <div className="pt-8 flex flex-col items-start gap-4">
                <MagneticButton variant="primary" className="w-full md:w-auto" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </MagneticButton>
                {status === 'success' && <p className="text-green-500">Message sent successfully!</p>}
                {status === 'error' && <p className="text-red-500">Failed to send message. Please try again.</p>}
            </div>
        </form>
    );
}
