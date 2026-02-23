"use client";

import { motion } from "framer-motion";

const events = [
    { year: "2010", title: "Foundation", description: "Established with a single welding rig and a vision for excellence." },
    { year: "2014", title: "Expansion", description: "Moved into our first dedicated fabrication facility." },
    { year: "2018", title: "Structural Shift", description: "Transitioned to full-scale structural erection and complex projects." },
    { year: "2024", title: "The Standard", description: "Recognized as a leader in safety and quality across the region." },
];

export function Timeline() {
    return (
        <div className="relative py-20">
            {/* Vertical Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 ml-[-1px] md:ml-0">
                <motion.div
                    className="w-full bg-[#D4AF37]"
                    initial={{ height: "0%" }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
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
                        <div className="flex-1 pl-12 md:pl-0 md:px-12 md:text-right">
                            <div className={`${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                <span className="text-[#D4AF37] font-oswald text-5xl font-bold opacity-20 absolute -top-4 md:top-auto md:-mt-8 select-none">
                                    {event.year}
                                </span>
                                <h3 className="text-2xl font-oswald text-white uppercase mb-2 relative z-10">{event.title}</h3>
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
