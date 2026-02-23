"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ServiceSectionProps {
    id: string;
    title: string;
    subtitle: string;
    children: React.ReactNode;
    imageSrc: string;
    imageAlt: string;
    align?: "left" | "right";
}

export function ServiceSection({ id, title, subtitle, children, imageSrc, imageAlt, align = "left" }: ServiceSectionProps) {
    return (
        <section id={id} className="mb-40 scroll-mt-32 overflow-hidden">
            <div className={cn(
                "flex flex-col gap-16 items-center",
                align === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
            )}>
                {/* Content */}
                <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="border-l-2 border-[#D4AF37] pl-8 mb-8">
                        <h2 className="text-4xl md:text-6xl font-oswald text-white mb-4 uppercase leading-none">{title}</h2>
                        <p className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C59D5F] font-medium tracking-[0.1em] uppercase">
                            {subtitle}
                        </p>
                    </div>
                    <div className="text-gray-400 font-manrope leading-relaxed text-lg space-y-6 max-w-xl">
                        {children}
                    </div>
                </motion.div>

                {/* Image */}
                <motion.div
                    className="flex-1 w-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 mix-blend-overlay" />
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            quality={100}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
