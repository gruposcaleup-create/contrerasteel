import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');
const analyticsPath = path.join(dataDirectory, 'analytics.json');

async function getAnalytics() {
    try {
        const fileContents = await fs.readFile(analyticsPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        return { visits: 0, clicks: 0 };
    }
}

async function saveAnalytics(data: any) {
    await fs.writeFile(analyticsPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function POST(request: Request) {
    const { type } = await request.json();
    const data = await getAnalytics();

    if (type === 'visit') {
        data.visits += 1;
    } else if (type === 'click') {
        data.clicks += 1;
    }

    await saveAnalytics(data);
    return NextResponse.json({ success: true, data });
}

export async function GET() {
    const data = await getAnalytics();
    return NextResponse.json(data);
}
