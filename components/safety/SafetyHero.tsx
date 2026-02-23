"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

export function SafetyHero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center bg-void-black text-center overflow-hidden border-b border-white/5">
            {/* Background Texture - Subtle Grid or Noise */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 z-10 relative">
                <motion.h1
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="text-6xl md:text-9xl font-oswald font-bold uppercase tracking-tighter text-white mb-2 leading-[0.85]"
                >
                    Safety Is A <br />
                    <span className="text-white">Standard.</span>
                </motion.h1>

                <motion.div
                    initial={{ scale: 2, opacity: 0, y: -50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.6,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                >
                    <h2 className="text-5xl md:text-8xl font-oswald font-bold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-transparent via-transparent to-transparent bg-void-black stroke-white stroke-2"
                        style={{ WebkitTextStroke: "2px #D4AF37", color: "transparent" }}
                    >
                        Not A Slogan.
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="mt-12 text-lg md:text-xl text-gray-400 font-manrope max-w-2xl mx-auto border-l-2 border-gold pl-6 text-left whitespace-pre-line"
                >
                    Safety is not a checkbox at Contreras Steel.
                    It is a core responsibility.
                    We operate with disciplined safety practices, job hazard analyses, and crew accountability to ensure every team member goes home safe — every day.
                </motion.p>
            </div>

            {/* Decorative Hazard Stripes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[repeating-linear-gradient(45deg,#D4AF37,#D4AF37_10px,transparent_10px,transparent_20px)] opacity-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[repeating-linear-gradient(45deg,#D4AF37,#D4AF37_10px,transparent_10px,transparent_20px)] opacity-20" />
        </section>
    );
}
