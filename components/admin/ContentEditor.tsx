
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import ImagePicker from './ImagePicker';
import { Plus, Trash2 } from 'lucide-react';

export default function ContentEditor({ initialContent }: { initialContent: any }) {
    const [content, setContent] = useState(initialContent);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('hero');

    const tabs = ['hero', 'intro', 'servicesTeaser', 'testimonials', 'values', 'about', 'footer', 'contactPage'];

    const handleChange = (section: string, key: string, value: any) => {
        setContent((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    // Helper for deeply nested or array updates could be added, 
    // but for now we'll handle specific array logic locally in the render

    const handleArrayChange = (section: string, arrayName: string, index: number, field: string, value: string) => {
        const newArray = [...content[section][arrayName]];
        newArray[index] = { ...newArray[index], [field]: value };
        handleChange(section, arrayName, newArray);
    };

    const addItem = (section: string, arrayName: string, template: any) => {
        const newArray = [...(content[section][arrayName] || []), template];
        handleChange(section, arrayName, newArray);
    };

    const removeItem = (section: string, arrayName: string, index: number) => {
        const newArray = [...content[section][arrayName]];
        newArray.splice(index, 1);
        handleChange(section, arrayName, newArray);
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.ok) {
                setMessage('Content saved successfully!');
            } else {
                const errData = await res.json().catch(() => ({}));
                setMessage(`Failed to save content: ${errData.error || res.status + ' ' + res.statusText}`);
            }
        } catch (error: any) {
            setMessage(`Error saving content: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center sticky top-0 z-10 bg-zinc-950/80 backdrop-blur pb-4 pt-2">
                <h2 className="text-3xl font-bold tracking-tight text-white/90">Content Editor</h2>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#D4AF37] hover:bg-[#b0902c] text-black font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg ${message.includes('Success') ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                    {message}
                </div>
            )}

            {/* Tabs */}
            <div className="flex overflow-x-auto gap-2 border-b border-zinc-800 pb-1">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-t-lg text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-zinc-800 text-[#D4AF37] border-t border-x border-zinc-700' : 'text-zinc-500 hover:text-white'}`}
                    >
                        {tab.replace(/([A-Z])/g, ' $1').trim()}
                    </button>
                ))}
            </div>

            <div className="bg-zinc-900 p-6 rounded-b-xl rounded-tr-xl border border-zinc-800 min-h-[500px]">

                {/* HERO SECTION */}
                {activeTab === 'hero' && (
                    <div className="space-y-4">
                        <ImagePicker
                            label="Background Image"
                            value={content.hero?.backgroundImage || ''}
                            onChange={(url) => handleChange('hero', 'backgroundImage', url)}
                        />
                        <div className="grid gap-4 md:grid-cols-3">
                            <Input label="Title" value={content.hero?.title} onChange={(v) => handleChange('hero', 'title', v)} />
                            <Input label="Subtitle 1" value={content.hero?.subtitle1} onChange={(v) => handleChange('hero', 'subtitle1', v)} />
                            <Input label="Subtitle 2" value={content.hero?.subtitle2} onChange={(v) => handleChange('hero', 'subtitle2', v)} />
                        </div>
                        <TextArea label="Description" value={content.hero?.description} onChange={(v) => handleChange('hero', 'description', v)} />
                        <div className="grid gap-4 md:grid-cols-2">
                            <Input label="CTA Primary" value={content.hero?.ctaPrimary} onChange={(v) => handleChange('hero', 'ctaPrimary', v)} />
                            <Input label="CTA Secondary" value={content.hero?.ctaSecondary} onChange={(v) => handleChange('hero', 'ctaSecondary', v)} />
                        </div>
                    </div>
                )}

                {/* INTRO SECTION */}
                {activeTab === 'intro' && (
                    <div className="space-y-4">
                        <ImagePicker
                            label="Side Image"
                            value={content.intro?.image || ''}
                            onChange={(url) => handleChange('intro', 'image', url)}
                        />
                        <Input label="Heading" value={content.intro?.heading} onChange={(v) => handleChange('intro', 'heading', v)} />
                        <TextArea label="Text" value={content.intro?.text} onChange={(v) => handleChange('intro', 'text', v)} />
                    </div>
                )}

                {/* SERVICES TEASER */}
                {activeTab === 'servicesTeaser' && (
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Input label="Heading" value={content.servicesTeaser?.heading} onChange={(v) => handleChange('servicesTeaser', 'heading', v)} />
                            <Input label="Subheading" value={content.servicesTeaser?.subheading} onChange={(v) => handleChange('servicesTeaser', 'subheading', v)} />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-400">Service Items</label>
                            {content.servicesTeaser?.items?.map((item: any, i: number) => (
                                <div key={i} className="flex gap-4 items-start bg-zinc-950 p-4 rounded border border-zinc-800">
                                    <div className="flex-1 space-y-2">
                                        <ImagePicker
                                            label="Service Image"
                                            value={item.image || ''}
                                            onChange={(url) => handleArrayChange('servicesTeaser', 'items', i, 'image', url)}
                                        />
                                        <Input label="Title" value={item.title} onChange={(v) => handleArrayChange('servicesTeaser', 'items', i, 'title', v)} />
                                        <TextArea label="Description" value={item.description} onChange={(v) => handleArrayChange('servicesTeaser', 'items', i, 'description', v)} />
                                    </div>
                                    <button onClick={() => removeItem('servicesTeaser', 'items', i)} className="text-red-500 hover:text-red-400 p-1"><Trash2 size={16} /></button>
                                </div>
                            ))}
                            <button
                                onClick={() => addItem('servicesTeaser', 'items', { title: "New Service", description: "Description" })}
                                className="flex items-center gap-2 text-[#D4AF37] text-sm hover:underline"
                            >
                                <Plus size={16} /> Add Service Item
                            </button>
                        </div>
                    </div>
                )}

                {/* TESTIMONIALS */}
                {activeTab === 'testimonials' && (
                    <div className="space-y-6">
                        {content.testimonials?.map((item: any, i: number) => (
                            <div key={i} className="flex gap-4 items-start bg-zinc-950 p-4 rounded border border-zinc-800">
                                <div className="flex-1 space-y-2">
                                    <TextArea label="Quote" value={item.text} onChange={(v) => {
                                        const newArr = [...content.testimonials];
                                        newArr[i] = { ...newArr[i], text: v };
                                        handleChange('testimonials', '', newArr); // Hacky re-use or need specific handler
                                        // Actually need to handle root array update for testimonials key
                                        setContent((prev: any) => {
                                            const n = [...prev.testimonials];
                                            n[i].text = v;
                                            return { ...prev, testimonials: n };
                                        });
                                    }} />
                                    <Input label="Author" value={item.author} onChange={(v) => {
                                        setContent((prev: any) => {
                                            const n = [...prev.testimonials];
                                            n[i].author = v;
                                            return { ...prev, testimonials: n };
                                        });
                                    }} />
                                </div>
                                <button onClick={() => {
                                    setContent((prev: any) => {
                                        const n = [...prev.testimonials];
                                        n.splice(i, 1);
                                        return { ...prev, testimonials: n };
                                    });
                                }} className="text-red-500 hover:text-red-400 p-1"><Trash2 size={16} /></button>
                            </div>
                        ))}
                        <button
                            onClick={() => {
                                setContent((prev: any) => {
                                    const n = [...prev.testimonials, { text: "Review text", author: "Author Name" }];
                                    return { ...prev, testimonials: n };
                                });
                            }}
                            className="flex items-center gap-2 text-[#D4AF37] text-sm hover:underline"
                        >
                            <Plus size={16} /> Add Testimonial
                        </button>
                    </div>
                )}

                {/* VALUES */}
                {activeTab === 'values' && (
                    <div className="space-y-4">
                        <Input label="Banner Text" value={content.values?.bannerText} onChange={(v) => handleChange('values', 'bannerText', v)} />
                        <Input label="Ticker Text" value={content.values?.tickerText} onChange={(v) => handleChange('values', 'tickerText', v)} />
                    </div>
                )}

                {/* ABOUT */}
                {activeTab === 'about' && (
                    <div className="space-y-4">
                        <ImagePicker
                            label="About Image"
                            value={content.about?.image || ''}
                            onChange={(url) => handleChange('about', 'image', url)}
                        />
                        <Input label="Title" value={content.about?.title} onChange={(v) => handleChange('about', 'title', v)} />
                        <TextArea label="Text" value={content.about?.text} onChange={(v) => handleChange('about', 'text', v)} />
                    </div>
                )}

                {/* FOOTER */}
                {activeTab === 'footer' && (
                    <div className="space-y-4">
                        <Input label="Address" value={content.footer?.address} onChange={(v) => handleChange('footer', 'address', v)} />
                        <Input label="Phone" value={content.footer?.phone} onChange={(v) => handleChange('footer', 'phone', v)} />
                        <Input label="Email" value={content.footer?.email} onChange={(v) => handleChange('footer', 'email', v)} />
                        <Input label="Copyright" value={content.footer?.copyright} onChange={(v) => handleChange('footer', 'copyright', v)} />
                    </div>
                )}

                {/* CONTACT PAGE */}
                {activeTab === 'contactPage' && (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Input label="Page Title" value={content.contactPage?.title} onChange={(v) => handleChange('contactPage', 'title', v)} />
                            <TextArea label="Page Subtitle" value={content.contactPage?.subtitle} onChange={(v) => handleChange('contactPage', 'subtitle', v)} />
                            <div className="grid gap-4 md:grid-cols-2">
                                <Input label="Phone (Display)" value={content.contactPage?.phone} onChange={(v) => handleChange('contactPage', 'phone', v)} />
                                <Input label="Email (Display)" value={content.contactPage?.email} onChange={(v) => handleChange('contactPage', 'email', v)} />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Input label="Phone Title" value={content.contactPage?.phoneTitle} onChange={(v) => handleChange('contactPage', 'phoneTitle', v)} />
                                <Input label="Email Title" value={content.contactPage?.emailTitle} onChange={(v) => handleChange('contactPage', 'emailTitle', v)} />
                            </div>
                            <TextArea label="Physical Address" value={content.contactPage?.address} onChange={(v) => handleChange('contactPage', 'address', v)} />
                            <Input label="Address Title" value={content.contactPage?.addressTitle} onChange={(v) => handleChange('contactPage', 'addressTitle', v)} />
                            <Input label="LinkedIn URL" value={content.contactPage?.linkedinUrl} onChange={(v) => handleChange('contactPage', 'linkedinUrl', v)} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

// Reusable micro-components for editor
function Input({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">{label}</label>
            <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
            />
        </div>
    );
}

function TextArea({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">{label}</label>
            <textarea
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] min-h-[100px]"
            />
        </div>
    );
}
