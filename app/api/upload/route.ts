
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    // Auth Check
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin_session');

    if (!authCookie || authCookie.value !== 'true') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Sanitize filename
        const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueName = `${Date.now()}-${filename}`;

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, uniqueName);

        await fs.writeFile(filePath, buffer);

        return NextResponse.json({ url: `/uploads/${uniqueName}` });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
