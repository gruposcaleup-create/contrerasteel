
"use client";

import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImagePickerProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImagePicker({ value, onChange, label }: ImagePickerProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                onChange(data.url);
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Error uploading file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-medium text-zinc-400">{label}</label>}

            <div className="flex items-start gap-4">
                {/* Preview */}
                <div className="relative w-32 h-20 bg-zinc-900 rounded-lg border border-zinc-700 overflow-hidden flex items-center justify-center group">
                    {value ? (
                        <Image
                            src={value}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized // For local dev
                        />
                    ) : (
                        <ImageIcon className="text-zinc-600" />
                    )}
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="/path/to/image.jpg"
                        className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded px-2 py-1 focus:ring-[#D4AF37] w-full"
                    />
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-3 py-1.5 rounded transition-colors border border-zinc-600"
                        >
                            <Upload size={14} />
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    className="hidden"
                    accept="image/*"
                />
            </div>
        </div>
    );
}
