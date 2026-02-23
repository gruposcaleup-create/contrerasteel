import { ServicesNav } from "@/components/services/ServicesNav";
import { ServiceSection } from "@/components/services/ServiceSection";
import { CheckCircle2 } from "lucide-react";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export default function ServicesPage() {
    return (
        <div className="bg-void-black min-h-screen">
            {/* Heavy Header */}
            <div className="relative py-32 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white mb-6 uppercase tracking-tight leading-none">
                        Structural Steel <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C59D5F]">Solutions</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl font-manrope">
                        Built on Discipline and Accountability. We deliver precision in every weld and integrity in every connection.
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
                        subtitle="Disciplined Field Execution"
                        imageSrc="/IMG_3383.jpg"
                        imageAlt="Steel Erection"
                        align="left"
                    >
                        <p>
                            We handle complex structural steel erection with precision and safety.
                            Our teams are trained to execute with extreme ownership, ensuring that every
                            beam, column, and connection meets the highest standards of quality.
                        </p>
                        <ul className="grid grid-cols-1 gap-4 mt-8">
                            {[
                                "Complex Structural Steel Erection",
                                "Joist and Deck Installation",
                                "Miscellaneous Metals Installation",
                                "Rigging and Hoisting Plans",
                                "On-site Welding and Fabrication",
                                "Safety-First Field Operations"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 group">
                                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full group-hover:scale-150 transition-transform" />
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </ServiceSection>

                    <ServiceSection
                        id="fabrication"
                        title="Steel Fabrication"
                        subtitle="Precision Built. Field Ready"
                        imageSrc="/dji_fly_20230309_160218_8_1678396403036_photo.jpg"
                        imageAlt="Steel Fabrication"
                        align="right"
                    >
                        <p>
                            Our fabrication process ensures constructability and quality control from start to finish.
                            We utilize advanced technology and skilled craftsmanship to deliver components that fit perfectly in the field, reducing downtime and costs.
                        </p>
                        <p>
                            From heavy columns to intricate architectural metals, our shop is equipped to handle diverse fabrication needs. We maintain strict quality assurance protocols to guarantee compliance with all specifications.
                        </p>
                    </ServiceSection>

                    <ServiceSection
                        id="turnkey"
                        title="Turnkey Fabricate & Erect"
                        subtitle="One Partner. Total Accountability"
                        imageSrc="/DJI_20250328123428_0015_W.JPG"
                        imageAlt="Turnkey Construction"
                        align="left"
                    >
                        <p>
                            Simplify your project with our comprehensive turnkey solutions. By handling both fabrication and erection, we eliminate the finger-pointing and communication gaps that often plague construction projects.
                        </p>
                        <div className="my-8 p-6 border-l-4 border-gold bg-white/5">
                            <p className="font-bold text-white text-lg font-oswald uppercase tracking-wide">
                                One contract. One point of contact. One responsible party.
                            </p>
                        </div>
                        <p>
                            This integrated approach allows for seamless coordination, optimized schedules, and a unified focus on project success. We own the outcome from the drawing board to the final bolt.
                        </p>
                    </ServiceSection>
                </main>
            </div>
        </div>
    );
}
