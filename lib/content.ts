import fs from 'fs/promises';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');
const contentPath = path.join(dataDirectory, 'content.json');

export async function getContent() {
    try {
        const fileContents = await fs.readFile(contentPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading content.json:", error);
        return fallbackContent; // Return default if file missing/error
    }
}

export async function saveContent(newContent: any) {
    try {
        await fs.writeFile(contentPath, JSON.stringify(newContent, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error("Error writing content.json:", error);
        return false;
    }
}

// Fallback in case JSON is missing or broken
export const fallbackContent = {
    hero: {
        title: "Building Steel",
        subtitle: "Building Legacy",
        description: "Structural steel erection and fabrication delivered with discipline, integrity, and extreme ownership.",
        ctaPrimary: "Request a Quote",
        ctaSecondary: "Our Capabilities"
    },
    intro: {
        heading: "Forged in Fire, Built for the Future",
        "text": "At Contreras Steel, we don't just build structures; we build trust. With over 20 years of experience in the steel industry, we bring military-grade precision and unwavering commitment to every project. From complex commercial erections to custom fabrication, our team executes with safety, speed, and superior quality."
    }
};
