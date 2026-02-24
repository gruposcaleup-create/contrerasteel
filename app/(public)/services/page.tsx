import type { Metadata } from "next";
import { ServicesNav } from "@/components/services/ServicesNav";
import { ServiceSection } from "@/components/services/ServiceSection";
import { CheckCircle2 } from "lucide-react";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export const metadata: Metadata = {
    title: "Structural Steel Services — Erection, Fabrication & Turnkey",
    description: "Contreras Steel offers structural steel erection, custom fabrication, bar joist & decking installation, and turnkey fabricate-and-erect solutions in Alabama.",
    openGraph: {
        title: "Steel Services | Contreras Steel LLC",
        description: "Structural erection, custom fabrication, and turnkey solutions delivered with military precision.",
        images: [{ url: "/IMG_3383.jpg", width: 1200, height: 630, alt: "Steel Erection Services" }],
    },
};

export default function ServicesPage() {
    return (
        <div className="bg-void-black min-h-screen">
            {/* Heavy Header */}
            <div className="relative py-32 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white mb-6 uppercase tracking-tight leading-none">
                        Structural Steel <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C59D5F]">Solutions</span><br />
                        Built on Discipline and Accountability.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl font-manrope whitespace-pre-line">
                        Contreras Steel provides structural steel services for commercial, industrial, and institutional projects where execution, safety, and accountability matter.

                        We don’t overpromise. We deliver.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row gap-16">
                {/* Sidebar Nav - Sticky */}
                <aside className="hidden lg:block w-72 flex-shrink-0">
                    <div className="sticky top-32">
                        <ServicesNav />
                    </div>
                </aside>

                {/* Content */}
                <main className="flex-1">
                    <ServiceSection
                        id="erection"
                        title="Structural Steel Erection"
                        subtitle="Disciplined Field Execution. Built to Perform."
                        imageSrc="/IMG_3383.jpg"
                        imageAlt="Steel Erection"
                        align="left"
                    >
                        <p>
                            Our erection crews operate with precision, coordination, and respect for schedule. Every lift, bolt, and weld is executed with intent and accountability.
                        </p>
                        <h4 className="text-[#D4AF37] font-oswald uppercase tracking-widest mt-8 mb-4">Capabilities</h4>
                        <ul className="grid grid-cols-1 gap-4">
                            {[
                                "Offloading and staging of structural steel",
                                "Erection of columns, beams, and bracing",
                                "Bolting and field welding per contract documents",
                                "Coordination with general contractors and trades",
                                "Schedule-driven manpower planning"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 group">
                                    <div className="w-1.5 h-1.5 mt-2 bg-[#D4AF37] rounded-full group-hover:scale-150 transition-transform" />
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </ServiceSection>

                    <ServiceSection
                        id="fabrication"
                        title="Steel Fabrication"
                        subtitle="Precision Built. Field Ready."
                        imageSrc="/dji_fly_20230309_160218_8_1678396403036_photo.jpg"
                        imageAlt="Steel Fabrication"
                        align="right"
                    >
                        <p>
                            Our fabrication process is designed to support the field — not slow it down. Every component is produced with accuracy, consistency, and schedule in mind.
                        </p>
                        <h4 className="text-[#D4AF37] font-oswald uppercase tracking-widest mt-8 mb-4">Capabilities</h4>
                        <ul className="grid grid-cols-1 gap-4">
                            {[
                                "Structural steel members",
                                "Miscellaneous steel fabrication",
                                "Quality-controlled shop processes",
                                "Clear shop-to-field coordination"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 group">
                                    <div className="w-1.5 h-1.5 mt-2 bg-[#D4AF37] rounded-full group-hover:scale-150 transition-transform" />
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </ServiceSection>

                    <ServiceSection
                        id="turnkey"
                        title="Turnkey Fabricate & Erect"
                        subtitle="One Partner. Total Accountability."
                        imageSrc="/DJI_20250328123428_0015_W.JPG"
                        imageAlt="Turnkey Construction"
                        align="left"
                    >
                        <p>
                            For clients seeking simplicity and reduced risk, our turnkey solutions provide a single point of responsibility from shop floor to final bolt.
                        </p>
                        <h4 className="text-[#D4AF37] font-oswald uppercase tracking-widest mt-8 mb-4">Benefits</h4>
                        <ul className="grid grid-cols-1 gap-4">
                            {[
                                "Streamlined communication",
                                "Reduced coordination risk",
                                "Improved schedule control",
                                "Single-source accountability"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 group">
                                    <div className="w-1.5 h-1.5 mt-2 bg-[#D4AF37] rounded-full group-hover:scale-150 transition-transform" />
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </ServiceSection>
                </main>
            </div>
        </div>
    );
}
