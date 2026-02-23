
import { NextResponse } from 'next/server';
import { getSubmissions, saveSubmissions } from '@/lib/submissions';
import { cookies } from 'next/headers';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Auth check
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin_session');
    if (!authCookie || authCookie.value !== 'true') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { status, respondedVia, tags, priority } = body;

        const submissions = await getSubmissions();
        const index = submissions.findIndex(s => s.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
        }

        // Update fields
        if (status) submissions[index].status = status;
        if (respondedVia) submissions[index].respondedVia = respondedVia;
        if (tags) submissions[index].tags = tags;
        if (priority) submissions[index].priority = priority;

        await saveSubmissions(submissions);

        return NextResponse.json({ success: true, submission: submissions[index] });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
