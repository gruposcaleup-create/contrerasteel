import { SafetyHero } from "@/components/safety/SafetyHero";
import { SafetyGrid } from "@/components/safety/SafetyGrid";
import { SafetyLoop } from "@/components/safety/SafetyLoop";
import { SafetyFooter } from "@/components/safety/SafetyFooter";

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
