import type { Metadata } from "next";
import { SafetyHero } from "@/components/safety/SafetyHero";
import { SafetyGrid } from "@/components/safety/SafetyGrid";
import { SafetyLoop } from "@/components/safety/SafetyLoop";
import { SafetyFooter } from "@/components/safety/SafetyFooter";

export const metadata: Metadata = {
    title: "Safety — Our Commitment to Zero Incidents",
    description: "Safety is non-negotiable at Contreras Steel. Review our EMR rating, safety protocols, and commitment to zero-incident job sites.",
    openGraph: {
        title: "Safety Program | Contreras Steel LLC",
        description: "Safety-first field operations with military-grade discipline. Zero-incident job sites.",
    },
};

export default function SafetyPage() {
    return (
        <main className="bg-void-black min-h-screen">
            <SafetyHero />
            <SafetyGrid />
            <SafetyLoop />
            <SafetyFooter />
        </main>
    );
}
