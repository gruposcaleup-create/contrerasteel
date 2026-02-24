import type { Metadata } from "next";
import { CoreValuesGrid } from "@/components/about/CoreValuesGrid";
import { Timeline } from "@/components/about/Timeline";

export const metadata: Metadata = {
    title: "About Us — Our Story, Mission & Values",
    description: "Learn about Contreras Steel LLC — a veteran-founded steel company in Cullman, Alabama built on faith, discipline, and extreme ownership.",
    openGraph: {
        title: "About Contreras Steel LLC",
        description: "Built on faith, proven through execution. Discover the story and values behind Contreras Steel.",
    },
};

export default function AboutPage() {
    return (
        <div className="bg-void-black min-h-screen">
            {/* Hero */}
            <section className="relative py-32 bg-zinc-900 border-b border-white/5 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30" />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-8xl font-oswald font-bold text-white mb-6 uppercase tracking-tight">
                        Built on <span className="text-gold">Faith</span>.<br />
                        Proven Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Execution</span>.
                    </h1>
                </div>
            </section>

            {/* Narrative */}
            <section className="py-24 bg-void-black">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8">
                        <div className="prose text-xl md:text-2xl prose-invert text-gray-300 font-manrope">
                            <p className="mb-6 first-letter:text-5xl first-letter:font-oswald first-letter:text-gold first-letter:mr-2 first-letter:float-left">
                                Contreras Steel was built through adversity, discipline, and faith. What began as a steel erection company became a platform to build people, families, and communities.
                            </p>
                            <p>
                                We believe business is a responsibility — not just a revenue stream.
                            </p>
                        </div>
                    </div>

                    <div className="mt-20">
                        <Timeline />
                    </div>
                </div>
            </section>

            {/* Mission & Vision - Glassmorphism */}
            <section className="py-24 bg-[#0F0F0F] relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    <div className="p-10 border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm relative group hover:border-[#D4AF37]/50 transition-colors duration-500">
                        <div className="absolute top-4 right-4 text-6xl font-oswald font-bold text-white/5 select-none transition-transform group-hover:scale-110">M</div>
                        <h3 className="text-3xl font-oswald text-[#D4AF37] mb-6 uppercase tracking-widest leading-tight">Our Mission</h3>
                        <blockquote className="text-xl text-white font-manrope font-light leading-relaxed">
                            "To deliver world-class structural steel services with uncompromising integrity, disciplined execution, and extreme ownership—while empowering our people and serving our community."
                        </blockquote>
                    </div>
                    <div className="p-10 border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm relative group hover:border-[#D4AF37]/50 transition-colors duration-500">
                        <div className="absolute top-4 right-4 text-6xl font-oswald font-bold text-white/5 select-none transition-transform group-hover:scale-110">V</div>
                        <h3 className="text-3xl font-oswald text-[#D4AF37] mb-6 uppercase tracking-widest leading-tight">Our Vision</h3>
                        <blockquote className="text-xl text-white font-manrope font-light leading-relaxed">
                            "To build structures that outlast generations by leading with faith, discipline, and excellence—creating lasting impact beyond the jobsite."
                        </blockquote>
                    </div>
                </div>
            </section>

            <CoreValuesGrid />
        </div>
    );
}
