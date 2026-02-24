"use client";

import { Shield, Target, Award, HeartHandshake, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const values = [
    {
        title: "Extreme Ownership",
        description: "We own the outcome — always. No blame, no excuses. When something goes wrong, we look in the mirror first.",
        icon: Shield,
        keyword: "OWNERSHIP"
    },
    {
        title: "Disciplined Execution",
        description: "We do what we said, when we said we'd do it. Every bolt, every weld, every deadline — executed with intent.",
        icon: Target,
        keyword: "DISCIPLINE"
    },
    {
        title: "Relentless Standards",
        description: "Good enough is never enough. We hold ourselves to standards most won't even attempt.",
        icon: Award,
        keyword: "STANDARDS"
    },
    {
        title: "Faithful Stewardship",
        description: "We are entrusted with people, resources, and influence. We steward each one with integrity.",
        icon: HeartHandshake,
        keyword: "STEWARDSHIP"
    },
    {
        title: "Generational Impact",
        description: "We build for generations, not just returns. Every structure, every relationship — built to last.",
        icon: TrendingUp,
        keyword: "LEGACY"
    }
];

export function CoreValuesGrid() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const AUTO_CYCLE_MS = 5000;

    // Auto-cycle through values
    useEffect(() => {
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    setActiveIndex(current => (current + 1) % values.length);
                    return 0;
                }
                return prev + (100 / (AUTO_CYCLE_MS / 50));
            });
        }, 50);
        return () => clearInterval(interval);
    }, [activeIndex]);

    const handleClick = (index: number) => {
        setActiveIndex(index);
        setProgress(0);
    };

    return (
        <section className="py-24 bg-void-black border-t border-white/5 overflow-hidden relative">
            {/* Subtle background keyword */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.02, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
                >
                    <span className="text-[18vw] font-oswald font-bold text-white uppercase leading-none">
                        {values[activeIndex].keyword}
                    </span>
                </motion.div>
            </AnimatePresence>

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-oswald text-white mb-6 text-center uppercase tracking-tight"
                >
                    Our Core Values
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-gray-500 font-manrope mb-16 text-sm uppercase tracking-[0.3em]"
                >
                    {String(activeIndex + 1).padStart(2, "0")} / {String(values.length).padStart(2, "0")}
                </motion.p>

                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-0 lg:gap-16 items-start">

                    {/* Left: Accordion List */}
                    <div>
                        {values.map((item, index) => {
                            const isActive = activeIndex === index;
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                >
                                    <button
                                        onClick={() => handleClick(index)}
                                        className={`w-full flex items-center gap-5 py-5 px-4 transition-all duration-400 text-left group relative ${isActive ? "" : "hover:bg-white/[0.02]"
                                            }`}
                                    >
                                        {/* Progress bar (left edge) */}
                                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5">
                                            {isActive && (
                                                <motion.div
                                                    className="w-full bg-gradient-to-b from-[#D4AF37] to-[#C59D5F] origin-top"
                                                    style={{ height: `${progress}%` }}
                                                    transition={{ duration: 0.05, ease: "linear" }}
                                                />
                                            )}
                                        </div>

                                        {/* Icon container */}
                                        <motion.div
                                            animate={{
                                                scale: isActive ? 1 : 0.85,
                                                opacity: isActive ? 1 : 0.4
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 flex-shrink-0 ${isActive
                                                    ? "bg-[#D4AF37]/10 border border-[#D4AF37]/40"
                                                    : "bg-transparent border border-white/5 group-hover:border-white/15"
                                                }`}
                                        >
                                            <Icon className={`h-5 w-5 transition-colors duration-300 ${isActive ? "text-[#D4AF37]" : "text-white/30 group-hover:text-white/50"
                                                }`} />
                                        </motion.div>

                                        {/* Title + number */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`text-lg md:text-xl font-oswald uppercase tracking-wider transition-colors duration-300 truncate ${isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                                                }`}>
                                                {item.title}
                                            </h3>
                                        </div>

                                        {/* Arrow */}
                                        <motion.span
                                            animate={{ x: isActive ? 4 : 0, opacity: isActive ? 1 : 0.2 }}
                                            className="text-[#D4AF37] text-lg flex-shrink-0"
                                        >
                                            →
                                        </motion.span>
                                    </button>

                                    {/* Mobile: inline description */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                                className="overflow-hidden lg:hidden"
                                            >
                                                <div className="px-4 pb-6 pl-[76px]">
                                                    <p className="text-base text-gray-400 font-manrope font-light leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right: Detail panel (desktop) */}
                    <div className="hidden lg:flex items-start pt-4">
                        <div className="relative w-full min-h-[280px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="relative"
                                >
                                    {/* Large number watermark */}
                                    <span className="text-[120px] font-oswald font-bold text-white/[0.03] leading-none absolute -top-8 -left-4 select-none pointer-events-none">
                                        0{activeIndex + 1}
                                    </span>

                                    <div className="relative z-10">
                                        {/* Icon large */}
                                        <motion.div
                                            animate={{
                                                y: [0, -5, 0],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="mb-8"
                                        >
                                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#C59D5F]/10 border border-[#D4AF37]/30">
                                                {(() => {
                                                    const ActiveIcon = values[activeIndex].icon;
                                                    return <ActiveIcon className="h-10 w-10 text-[#D4AF37]" />;
                                                })()}
                                            </div>
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-3xl md:text-4xl font-oswald text-white uppercase tracking-tight mb-6 leading-tight">
                                            {values[activeIndex].title}
                                        </h3>

                                        {/* Gold accent divider */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <motion.div
                                                className="h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent"
                                                initial={{ width: 0 }}
                                                animate={{ width: 80 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                            />
                                            <span className="text-xs font-oswald text-[#D4AF37]/50 tracking-[0.4em] uppercase">
                                                {values[activeIndex].keyword}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-xl text-gray-400 font-manrope font-light leading-relaxed max-w-lg">
                                            {values[activeIndex].description}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
