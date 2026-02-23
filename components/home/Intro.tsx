"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import Link from "next/link";
import { motion } from "framer-motion";

export function Intro({ content }: { content?: any }) {
    const introContent = content?.intro || {
        heading: "Forged in Fire, Built for the Future",
        text: "At Contreras Steel, we don't just build structures; we build trust. With over 20 years of experience in the steel industry, we bring military-grade precision and unwavering commitment to every project. From complex commercial erections to custom fabrication, our team executes with safety, speed, and superior quality."
    };

    return (
        <section className="py-24 md:py-32 bg-void-black text-white overflow-hidden border-b border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-7xl font-oswald font-bold uppercase tracking-tight mb-8 leading-none">
                            {introContent.heading.split(' ')[0]} <span className="text-gold">{introContent.heading.split(' ').slice(1).join(' ')}</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 font-manrope leading-relaxed mb-8 max-w-lg border-l-2 border-gold pl-6 whitespace-pre-line">
                            {introContent.text}
                        </p>
                        <Link href="/about">
                            <MagneticButton variant="outline">Our Story</MagneticButton>
                        </Link>
                    </motion.div>

                    {/* Parallax Image */}
                    <div className="relative">
                        <ParallaxImage
                            src="/IMG_4562.jpg"
                            alt="Construction Crane"
                            aspectRatio="aspect-[3/4]"
                            quality={100}
                            priority={true}
                        />
                        {/* Decorative Elements */}
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 border-l border-b border-[#D4AF37] hidden md:block" />
                        <div className="absolute -top-8 -right-8 w-32 h-32 border-r border-t border-[#D4AF37] hidden md:block" />
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-16">
                    {[
                        { label: "Accidents", value: "0", sub: "Safety Focus" },
                        { label: "Accountability", value: "100%", sub: "No Excuses" },
                        { label: "Service", value: "Nationwide", sub: "Reach" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            className="text-center group"
                        >
                            <div className="text-5xl md:text-7xl font-oswald font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                                {stat.value}
                            </div>
                            <div className="text-sm font-oswald uppercase tracking-[0.2em] text-gold mb-1">
                                {stat.label}
                            </div>
                            <div className="text-xs font-manrope text-gray-500 uppercase tracking-widest">
                                {stat.sub}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
