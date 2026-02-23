
import { NextResponse } from 'next/server';
import { getSubmissions, saveSubmissions } from '@/lib/submissions';
import { Submission } from '@/lib/types';
import crypto from 'crypto';

export async function GET() {
    const submissions = await getSubmissions();
    return NextResponse.json(submissions);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newSubmission: Submission = {
            id: crypto.randomUUID(),
            name,
            email,
            phone: phone || '',
            message,
            date: new Date().toISOString(),
            status: 'new'
        };

        const submissions = await getSubmissions();
        submissions.unshift(newSubmission); // Add to beginning
        await saveSubmissions(submissions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
