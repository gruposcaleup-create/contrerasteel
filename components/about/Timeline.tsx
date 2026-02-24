"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const events = [
    { year: "2022", title: "Foundation", description: "Established with a single welding rig and a vision for excellence." },
    { year: "2023", title: "Expansion", description: "Expanded to more than 70 field professionals and transitioned into our first dedicated office facility." },
    { year: "2025", title: "Structural Shift", description: "Added in-house steel fabrication and secured a dedicated shop facility to strengthen quality control and schedule execution." },
    { year: "2026", title: "The Standard", description: "Operating with ownership-driven leadership, safety-first execution, and long-term vision." },
];

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.5"],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="relative py-20">
            {/* Vertical Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 ml-[-1px] md:ml-0">
                <motion.div
                    className="w-full bg-[#D4AF37]"
                    style={{ height: lineHeight }}
                />
            </div>

            <div className="space-y-12">
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: index * 0.2 }}
                        className={`flex flex-col md:flex-row gap-8 items-start md:items-center relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Content Side */}
                        <div className={`flex-1 w-full pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} relative`}>
                            <div className="relative z-10 p-2">
                                <span className={`text-[#D4AF37] font-oswald text-6xl md:text-8xl font-bold opacity-10 absolute top-1/2 -translate-y-1/2 select-none ${index % 2 === 0 ? 'right-0' : 'left-0'} -z-10`}>
                                    {event.year}
                                </span>
                                <h3 className="text-2xl font-oswald text-white uppercase mb-2">{event.title}</h3>
                                <p className="text-gray-400 font-manrope">{event.description}</p>
                            </div>
                        </div>

                        {/* Dot */}
                        <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-void-black border-2 border-[#D4AF37] ml-[-8px] md:ml-[-8px] z-10" />

                        {/* Empty Side (for centering) */}
                        <div className="flex-1 hidden md:block" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
