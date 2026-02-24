"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import Link from "next/link";
import Image from "next/image";

export function Hero({ content }: { content?: any }) {
    const heroContent = content?.hero || {
        title: "Building Steel.",
        subtitle1: "Building People.",
        subtitle2: "Building Legacy.",
        description: "Structural steel erection and fabrication delivered with discipline, integrity, and extreme ownership.\n\nRaising structures, empowering possibilities.",
        ctaPrimary: "Request a Quote",
        ctaSecondary: "View Services"
    };

    return (
        <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-void-black">
            {/* Background Video/Image Placeholder - Industrial Dark Steel */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" /> {/* Canvas Overlay */}
                <div className="absolute inset-0 w-full h-full opacity-50">
                    <Image
                        src="/1000000455.JPEG"
                        alt="Hero Background"
                        fill
                        className="object-cover object-center"
                        quality={100}
                        priority
                        unoptimized
                    />
                </div>
                {/* Note: Video background would go here in production */}
            </div>

            <div className="relative z-20 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-6 flex flex-col items-center justify-center w-full">
                        <TextReveal className="text-[14vw] sm:text-6xl md:text-8xl lg:text-9xl font-bold font-oswald uppercase tracking-tighter text-white leading-[0.9]">
                            {heroContent.title || "Building Steel."}
                        </TextReveal>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8 mt-4 w-full">
                            <TextReveal className="text-[9vw] sm:text-4xl md:text-6xl lg:text-7xl font-bold font-oswald uppercase tracking-tighter text-gray-400 leading-[0.9] text-center" delay={0.2}>
                                {heroContent.subtitle1 || "Building People."}
                            </TextReveal>
                            <TextReveal className="text-[9vw] sm:text-4xl md:text-6xl lg:text-7xl font-bold font-oswald uppercase tracking-tighter text-gold leading-[0.9] text-center" delay={0.4}>
                                {heroContent.subtitle2 || "Building Legacy."}
                            </TextReveal>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="max-w-3xl mx-auto mb-12"
                >
                    {(() => {
                        const text = heroContent.description || "";
                        const highlight = "Raising structures, empowering possibilities.";
                        const idx = text.indexOf(highlight);

                        if (idx === -1) {
                            return (
                                <p className="text-lg md:text-2xl text-gray-300 font-manrope font-light tracking-wide leading-relaxed whitespace-pre-line mb-4">
                                    {text}
                                </p>
                            );
                        }

                        const before = text.slice(0, idx);
                        const match = text.slice(idx, idx + highlight.length);
                        const after = text.slice(idx + highlight.length);

                        return (
                            <>
                                {before.trim() && (
                                    <p className="text-lg md:text-2xl text-gray-300 font-manrope font-light tracking-wide leading-relaxed whitespace-pre-line mb-6">
                                        {before.trim()}
                                    </p>
                                )}
                                <p className="text-2xl md:text-4xl text-white font-manrope font-bold tracking-wide leading-relaxed">
                                    {match}
                                </p>
                                {after.trim() && (
                                    <p className="text-lg md:text-2xl text-gray-300 font-manrope font-light tracking-wide leading-relaxed whitespace-pre-line mt-6">
                                        {after.trim()}
                                    </p>
                                )}
                            </>
                        );
                    })()}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <Link href="/contact">
                        <MagneticButton variant="primary" className="min-w-[200px]">
                            {heroContent.ctaPrimary || "Request a Quote"}
                        </MagneticButton>
                    </Link>
                    <Link href="/services">
                        <MagneticButton variant="outline" className="min-w-[200px] border-white text-white hover:bg-white/10 hover:text-white">
                            {heroContent.ctaSecondary || "View Services"}
                        </MagneticButton>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
            </motion.div>
        </section>
    );
}
