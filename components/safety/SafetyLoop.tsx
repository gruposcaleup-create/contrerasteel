"use client";

import { motion } from "framer-motion";

export function SafetyLoop() {
    return (
        <section className="py-32 bg-void-black overflow-hidden flex items-center justify-center relative border-y border-white/5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
                {/* Spinning Text Ring (Simulated with simple rotation for now, or use SVG text path) */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-white/10"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                >
                    {/* Decorative nodes */}
                    <div className="absolute top-0 left-1/2 -ml-2 -mt-2 w-4 h-4 bg-gold rounded-full shadow-[0_0_15px_#D4AF37]" />
                    <div className="absolute bottom-0 left-1/2 -ml-2 -mb-2 w-4 h-4 bg-gold rounded-full shadow-[0_0_15px_#D4AF37]" />
                </motion.div>

                <motion.div
                    className="absolute inset-[20px] rounded-full border border-dashed border-white/20"
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                />

                {/* Central Text */}
                <div className="text-center z-10 px-8">
                    <h3 className="text-2xl md:text-4xl font-oswald text-white uppercase font-bold leading-tight">
                        Safety Is <br />
                        <span className="text-gold">Ownership</span> <br />
                        In Action
                    </h3>
                </div>

                {/* Floating Text Elements - Simulating "Ring" */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute top-10 left-1/2 -translate-x-1/2 text-gray-600 font-oswald text-sm md:text-base uppercase tracking-[0.2em]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        Discipline
                    </motion.div>
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 font-oswald text-sm md:text-base uppercase tracking-[0.2em]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                    >
                        Execution
                    </motion.div>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-gray-600 font-oswald text-sm md:text-base uppercase tracking-[0.2em]">
                        Integrity
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-600 font-oswald text-sm md:text-base uppercase tracking-[0.2em]">
                        Stewardship
                    </div>
                </div>
            </div>
        </section>
    );
}
