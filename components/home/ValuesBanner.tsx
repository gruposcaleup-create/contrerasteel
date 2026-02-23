"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const values = [
    "Extreme Ownership",
    "Disciplined Execution",
    "Relentless Standards",
    "Faithful Stewardship",
    "Generational Impact"
];

interface ValuesBannerProps {
    content?: any;
}

export function ValuesBanner({ content }: ValuesBannerProps) {
    const bannerText = content?.values?.bannerText || "Discipline. Integrity. Extreme Ownership.";
    const tickerText = content?.values?.tickerText || " SAFETY FIRST • QUALITY ALWAYS • PRECISION EXECUTION • MILITARY GRADE • ";
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <section ref={ref} className="relative py-40 overflow-hidden border-t border-b border-white/5 bg-zinc-900 flex items-center justify-center">
            {/* Parallax Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 h-[140%] -top-[20%]"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: "url('https://picsum.photos/id/249/2000/1200')" }} // Welding/Bridge
                />
                <div className="absolute inset-0 bg-void-black/80" />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-oswald font-bold text-white uppercase tracking-tight mb-8"
                >
                    {bannerText}
                </motion.h2>
            </div>

            {/* Ticker Container */}
            <div className="absolute bottom-0 left-0 w-full bg-gold py-4 border-t border-[#C59D5F] z-20">
                <div className="flex whitespace-nowrap overflow-hidden">
                    <motion.div
                        className="flex"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30
                        }}
                    >
                        {[1, 2, 3, 4].map((_, index) => (
                            <span key={index} className="flex items-center text-void-black font-bold font-oswald text-xl md:text-2xl tracking-widest uppercase px-8">
                                {tickerText}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
