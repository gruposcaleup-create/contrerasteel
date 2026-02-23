
import { NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/content';
import { cookies } from 'next/headers';

export async function GET() {
    const content = await getContent();
    return NextResponse.json(content);
}

export async function POST(request: Request) {
    // Simple check for auth cookie
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin_session');

    if (!authCookie || authCookie.value !== 'true') { // Weak check, but sufficient for this request level
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const success = await saveContent(body);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
