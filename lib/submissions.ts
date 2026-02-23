import fs from 'fs/promises';
import path from 'path';
import { Submission } from './types';

const dataDirectory = path.join(process.cwd(), 'data');
const submissionsPath = path.join(dataDirectory, 'submissions.json');

export async function getSubmissions(): Promise<Submission[]> {
    try {
        const fileContents = await fs.readFile(submissionsPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading submissions.json:", error);
        return [];
    }
}

export async function saveSubmissions(submissions: Submission[]) {
    try {
        await fs.writeFile(submissionsPath, JSON.stringify(submissions, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error("Error writing submissions.json:", error);
        return false;
    }
}
