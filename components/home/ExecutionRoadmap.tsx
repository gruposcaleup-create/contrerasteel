"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
    {
        title: "Consultation & Planning",
        description: "Schedule-driven manpower planning. We align with your timeline before the first beam is cut.",
        number: "01"
    },
    {
        title: "Precision Fabrication",
        description: "Components produced with accuracy and consistency.",
        number: "02"
    },
    {
        title: "Disciplined Erection",
        description: "Safe, efficient execution. Every lift executed with intent and extreme ownership.",
        number: "03"
    },
    {
        title: "Legacy Built",
        description: "Structures that outlast generations. We build for the future.",
        number: "04"
    }
];

export function ExecutionRoadmap() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    return (
        <section ref={targetRef} className="py-32 bg-zinc-900 border-b border-white/5 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-oswald text-white uppercase tracking-tighter mb-4">
                        From Shop Floor to <span className="text-gold">Final Bolt</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                </div>

                <div className="relative">
                    {/* Creating a center line for desktop */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 ml-[-1px] md:ml-0">
                        <motion.div
                            className="w-full bg-gold"
                            style={{ height: useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]) }}
                        />
                    </div>

                    <div className="space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 items-start md:items-center relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content */}
                                <div className={`flex-1 pl-12 md:pl-0 md:px-12 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                    <div className="inline-block border border-white/10 bg-void-black/50 backdrop-blur-sm p-8 hover:border-gold/50 transition-colors duration-500 rounded-sm group relative">
                                        <span className={`absolute top-0 text-6xl font-oswald font-bold text-white/5 select-none -mt-8 ${index % 2 === 0 ? 'right-4' : 'left-4 md:right-auto md:left-4'}`}>
                                            {step.number}
                                        </span>
                                        <h3 className="text-2xl font-oswald text-white uppercase mb-4 relative z-10 group-hover:text-gold transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-400 font-manrope leading-relaxed relative z-10">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Node */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-void-black border-2 border-gold md:-ml-2 z-20 shadow-[0_0_15px_rgba(212,175,55,0.5)]" />

                                {/* Empty Side */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
