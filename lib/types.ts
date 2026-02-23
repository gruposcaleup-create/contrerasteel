export interface Submission {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    date: string;
    status: 'new' | 'responded' | 'trash';
    respondedVia?: 'email' | 'whatsapp';
    tags?: string[];
    priority?: 'low' | 'normal' | 'high';
}
