"use client";

import { useState } from 'react';
import { Submission } from '@/lib/types';
import { Check, Mail, MessageSquare, Phone, Trash2, ArchiveRestore, X, CheckSquare, Square, Tag, Flag, MoreHorizontal } from 'lucide-react';

export default function MessagesList({ initialSubmissions, config }: { initialSubmissions: Submission[], config?: any }) {
    const [submissions, setSubmissions] = useState(initialSubmissions);
    const [filter, setFilter] = useState<'all' | 'new' | 'responded' | 'trash'>('all');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [replyModal, setReplyModal] = useState<{ isOpen: boolean, type: 'email' | 'whatsapp', ids: string, name: string, email?: string, phone?: string } | null>(null);
    const [messageDraft, setMessageDraft] = useState({ subject: 'Re: Inquiry - Contreras Steel', body: 'Hello,\n\nThank you for reaching out to us.\n\n' });

    const filtered = submissions.filter(s => {
        if (filter === 'trash') return s.status === 'trash';
        if (s.status === 'trash') return false;
        if (filter === 'all') return true;
        return s.status === filter;
    });

    const selectedMessage = submissions.find(s => s.id === selectedId);

    const updateSubmission = async (id: string, updates: Partial<Submission>) => {
        setSubmissions(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
        try {
            await fetch(`/api/contact/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updates),
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) { console.error("Failed to update submission"); }
    };

    const updateStatus = (id: string, status: 'new' | 'responded' | 'trash') => {
        updateSubmission(id, { status });
    };

    const toggleTag = (tag: string) => {
        if (!selectedMessage) return;
        const currentTags = selectedMessage.tags || [];
        const newTags = currentTags.includes(tag)
            ? currentTags.filter(t => t !== tag)
            : [...currentTags, tag];
        updateSubmission(selectedMessage.id, { tags: newTags });
    };

    const togglePriority = () => {
        if (!selectedMessage) return;
        const nextPriority = !selectedMessage.priority || selectedMessage.priority === 'low' ? 'normal' : selectedMessage.priority === 'normal' ? 'high' : 'low';
        updateSubmission(selectedMessage.id, { priority: nextPriority });
    };

    const deletePermanently = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message permanently?')) return;
        setSubmissions(prev => prev.filter(s => s.id !== id));
        // In a real app, send delete request to API
    };

    const deletePermanentlyBulk = async (ids: string[]) => {
        if (!confirm(`Are you sure you want to delete ${ids.length} messages permanently?`)) return;
        setSubmissions(prev => prev.filter(s => !ids.includes(s.id)));
        setSelectedIds(new Set());
        if (selectedId && ids.includes(selectedId)) setSelectedId(null);
    };

    const emptyTrash = () => {
        if (!confirm('Delete all messages in Trash?')) return;
        setSubmissions(prev => prev.filter(s => s.status !== 'trash'));
    }

    const toggleSelection = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === filtered.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filtered.map(s => s.id)));
        }
    };

    const bulkUpdateStatus = async (status: 'new' | 'responded' | 'trash') => {
        const idsToUpdate = Array.from(selectedIds);
        setSubmissions(prev => prev.map(s => idsToUpdate.includes(s.id) ? { ...s, status } : s));
        setSelectedIds(new Set());

        // Optimistic update, then fire requests
        // In a real app with many items, this should be a single bulk API call
        idsToUpdate.forEach(id => {
            fetch(`/api/contact/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ status }),
                headers: { 'Content-Type': 'application/json' },
            }).catch(e => console.error(`Failed to update ${id}`, e));
        });
    };

    const handleReplyClick = (type: 'email' | 'whatsapp', sub: Submission) => {
        setMessageDraft({
            subject: `Re: Inquiry - ${sub.name}`,
            body: `Hello ${sub.name},\n\nThank you for contacting Contreras Steel.\n\n${config?.emailSignature || ''}`
        });
        setReplyModal({ isOpen: true, type, ids: sub.id, name: sub.name, email: sub.email, phone: sub.phone });
    };

    const sendReply = () => {
        if (!replyModal) return;

        if (replyModal.type === 'email') {
            const mailtoLink = `mailto:${replyModal.email}?subject=${encodeURIComponent(messageDraft.subject)}&body=${encodeURIComponent(messageDraft.body)}`;
            window.open(mailtoLink, '_blank');
        } else {
            // WhatsApp
            let phone = replyModal.phone?.replace(/\D/g, ''); // strip non-numeric
            if (!phone) { alert('No phone number found'); return; }
            const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(messageDraft.body)}`;
            window.open(waLink, '_blank');
        }

        // Optimistically mark as responded
        updateStatus(replyModal.ids, 'responded');
        updateSubmission(replyModal.ids, { respondedVia: replyModal.type });
        setReplyModal(null);
    };

    const availableTags = ['Quote Request', 'General Inquiry', 'Urgent', 'Follow-up'];

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col relative">
            {/* Header / Filter Bar */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-white/90 font-oswald uppercase">Inbox</h2>
                <div className="flex gap-4 items-center">
                    {filter === 'trash' && filtered.length > 0 && (
                        <button onClick={emptyTrash} className="text-red-500 text-xs hover:underline uppercase tracking-wider font-bold">Empty Trash</button>
                    )}
                    <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                        <FilterButton active={filter === 'all'} onClick={() => { setFilter('all'); setSelectedIds(new Set()); }} label="Inbox" count={submissions.filter(s => s.status !== 'trash').length} />
                        <FilterButton active={filter === 'new'} onClick={() => { setFilter('new'); setSelectedIds(new Set()); }} label="Unread" count={submissions.filter(s => s.status === 'new').length} />
                        <FilterButton active={filter === 'responded'} onClick={() => { setFilter('responded'); setSelectedIds(new Set()); }} label="Done" />
                        <FilterButton active={filter === 'trash'} onClick={() => { setFilter('trash'); setSelectedIds(new Set()); }} label="Trash" icon={<Trash2 size={14} />} />
                    </div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
                {/* List Column */}
                <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden flex flex-col">
                    {/* Bulk Actions Header */}
                    <div className="p-3 border-b border-zinc-800 bg-zinc-950/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleSelectAll}
                                className="text-zinc-500 hover:text-white transition-colors"
                                title="Select All"
                            >
                                {selectedIds.size > 0 && selectedIds.size === filtered.length ? <CheckSquare size={18} /> : <Square size={18} />}
                            </button>
                            <span className="text-xs text-zinc-500">{selectedIds.size} selected</span>
                        </div>
                        {selectedIds.size > 0 && (
                            <div className="flex items-center gap-1">
                                {filter !== 'trash' ? (
                                    <>
                                        <button onClick={() => bulkUpdateStatus('responded')} className="p-1.5 text-zinc-400 hover:text-white" title="Mark as Read"><ArchiveRestore size={16} /></button>
                                        <button onClick={() => bulkUpdateStatus('trash')} className="p-1.5 text-zinc-400 hover:text-red-400" title="Move to Trash"><Trash2 size={16} /></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => bulkUpdateStatus('new')} className="p-1.5 text-zinc-400 hover:text-green-400" title="Restore"><ArchiveRestore size={16} /></button>
                                        <button onClick={() => deletePermanentlyBulk(Array.from(selectedIds))} className="p-1.5 text-zinc-400 hover:text-red-400" title="Delete Forever"><Trash2 size={16} /></button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filtered.length === 0 ? <div className="text-center py-8 text-zinc-500 text-sm">No messages.</div> : (
                            filtered.map((sub) => (
                                <div
                                    key={sub.id}
                                    onClick={() => setSelectedId(sub.id)}
                                    className={`p-4 border-b border-zinc-800 cursor-pointer hover:bg-zinc-800/50 transition-colors group relative ${selectedId === sub.id ? 'bg-zinc-800/80 border-l-2 border-l-[#D4AF37]' : 'border-l-2 border-l-transparent'}`}
                                >
                                    {/* Selection Checkbox & Quick Actions */}
                                    <div className={`absolute left-2 top-4 z-10 flex flex-col gap-2 ${selectedIds.has(sub.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                                        <button onClick={(e) => toggleSelection(sub.id, e)} className="text-zinc-400 hover:text-white bg-zinc-900/90 rounded p-0.5 shadow-sm">
                                            {selectedIds.has(sub.id) ? <CheckSquare size={16} /> : <Square size={16} />}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); updateStatus(sub.id, sub.status === 'new' ? 'responded' : 'new'); }}
                                            className={`text-zinc-400 hover:text-white bg-zinc-900/90 rounded p-0.5 shadow-sm ${sub.status === 'new' ? 'text-[#D4AF37]' : ''}`}
                                            title={sub.status === 'new' ? "Mark as Read" : "Mark as Unread"}
                                        >
                                            <Mail size={16} className={sub.status === 'new' ? 'fill-[#D4AF37]' : ''} />
                                        </button>
                                    </div>

                                    <div className={`pl-8 transition-all`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-sm truncate pr-2 ${sub.status === 'new' ? 'font-bold text-white' : 'font-medium text-zinc-300'}`}>{sub.name}</h4>
                                            <span suppressHydrationWarning className="text-[10px] text-zinc-500 whitespace-nowrap">{new Date(sub.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-1">
                                            {sub.priority === 'high' && <Flag size={10} className="text-red-500 fill-red-500" />}
                                            {sub.tags?.slice(0, 2).map(t => (
                                                <span key={t} className="text-[9px] bg-zinc-800 px-1 rounded text-zinc-400">{t}</span>
                                            ))}
                                        </div>
                                        <p className={`text-xs line-clamp-2 ${sub.status === 'new' ? 'text-zinc-300' : 'text-zinc-500'}`}>{sub.message}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Detail Column */}
                <div className="col-span-12 md:col-span-8 lg:col-span-9 bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden flex flex-col">
                    {selectedMessage ? (
                        <>
                            {/* Detail Header */}
                            <div className="p-6 border-b border-zinc-700 bg-zinc-950/30">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-bold text-white font-oswald">{selectedMessage.name}</h3>
                                            <button
                                                onClick={togglePriority}
                                                className={`p-1 rounded hover:bg-zinc-800 transition-colors ${selectedMessage.priority === 'high' ? 'text-red-500' : 'text-zinc-600'}`}
                                                title="Toggle Priority"
                                            >
                                                <Flag size={18} className={selectedMessage.priority === 'high' ? 'fill-red-500' : ''} />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-zinc-400">
                                            <span className="flex items-center gap-1.5"><Mail size={14} /> {selectedMessage.email}</span>
                                            {selectedMessage.phone && <span className="flex items-center gap-1.5"><Phone size={14} /> {selectedMessage.phone}</span>}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <div className="relative group">
                                            <button className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                                                <Tag size={14} /> Tags
                                            </button>
                                            <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl p-2 hidden group-hover:block z-50">
                                                {availableTags.map(tag => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => toggleTag(tag)}
                                                        className={`w-full text-left px-3 py-2 text-xs rounded hover:bg-zinc-800 flex justify-between items-center ${selectedMessage.tags?.includes(tag) ? 'text-[#D4AF37]' : 'text-zinc-400'}`}
                                                    >
                                                        {tag}
                                                        {selectedMessage.tags?.includes(tag) && <Check size={12} />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="h-8 w-px bg-zinc-800 mx-2"></div>

                                        {selectedMessage.status === 'new' ? (
                                            <button onClick={() => updateStatus(selectedMessage.id, 'responded')} className="p-2 text-zinc-400 hover:text-white" title="Mark as Read">
                                                <ArchiveRestore size={18} />
                                            </button>
                                        ) : (
                                            <button onClick={() => updateStatus(selectedMessage.id, 'new')} className="p-2 text-zinc-400 hover:text-white" title="Mark as Unread">
                                                <Mail size={18} />
                                            </button>
                                        )}

                                        {selectedMessage.status !== 'trash' ? (
                                            <button onClick={() => updateStatus(selectedMessage.id, 'trash')} className="p-2 text-zinc-400 hover:text-red-400"><Trash2 size={18} /></button>
                                        ) : (
                                            <>
                                                <button onClick={() => updateStatus(selectedMessage.id, 'new')} className="p-2 text-zinc-400 hover:text-green-400" title="Restore"><ArchiveRestore size={18} /></button>
                                                <button onClick={() => deletePermanently(selectedMessage.id)} className="p-2 text-red-500 hover:text-red-400" title="Delete Forever"><Trash2 size={18} /></button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Tags Display */}
                                <div className="flex gap-2 flex-wrap">
                                    {selectedMessage.tags?.map(tag => (
                                        <span key={tag} className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-1 rounded-full border border-zinc-700 uppercase tracking-wide flex items-center gap-1">
                                            {tag}
                                            <button onClick={() => toggleTag(tag)} className="hover:text-white"><X size={10} /></button>
                                        </span>
                                    ))}
                                    {(!selectedMessage.tags || selectedMessage.tags.length === 0) && (
                                        <span className="text-[10px] text-zinc-600 italic">No tags</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 p-8 overflow-y-auto">
                                <p className="text-zinc-200 text-lg whitespace-pre-wrap">{selectedMessage.message}</p>
                            </div>

                            {selectedMessage.status !== 'trash' && (
                                <div className="p-6 border-t border-zinc-800 bg-zinc-950/30">
                                    <div className="flex gap-3">
                                        <button onClick={() => handleReplyClick('email', selectedMessage)} className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#b0902c] text-black font-bold py-3 px-4 rounded-lg transition-colors">
                                            <Mail size={18} /> Reply via Email
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-zinc-600">
                            <Mail size={48} className="mb-4 opacity-20" />
                            <p>Select a message to view details</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Reply Modal */}
            {replyModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-zinc-900 w-full max-w-lg p-6 rounded-xl border border-zinc-700 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white font-oswald">Reply via {replyModal.type === 'email' ? 'Email' : 'WhatsApp'}</h3>
                            <button onClick={() => setReplyModal(null)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
                        </div>
                        <div className="space-y-4">
                            {replyModal.type === 'email' && (
                                <div>
                                    <label className="block text-xs uppercase text-zinc-500 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        value={messageDraft.subject}
                                        onChange={e => setMessageDraft({ ...messageDraft, subject: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-xs uppercase text-zinc-500 mb-1">Message</label>
                                <textarea
                                    rows={8}
                                    value={messageDraft.body}
                                    onChange={e => setMessageDraft({ ...messageDraft, body: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button onClick={() => setReplyModal(null)} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
                                <button onClick={sendReply} className="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded hover:bg-[#b0902c]">
                                    Send Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function FilterButton({ active, onClick, label, count, icon }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${active ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
            {icon} {label} {count !== undefined && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-zinc-700' : 'bg-zinc-800'}`}>{count}</span>}
        </button>
    );
}
