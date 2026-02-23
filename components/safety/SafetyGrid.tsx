"use client";

import { motion } from "framer-motion";
import { ClipboardList, ShieldAlert, Users, Warehouse, Ban, HardHat, TriangleAlert, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Define custom icons or import appropriate ones
const BlueprintIcon = ClipboardList;
const ShieldIcon = ShieldAlert;
const TeamIcon = Users;
const BroomIcon = HardHat; // Placeholder for "Site Discipline"
const StopIcon = Ban;

interface SafetyCardProps {
    title: string;
    icon: LucideIcon;
    detail: string;
    className?: string;
    delay?: number;
}

function SafetyCard({ title, icon: Icon, detail, className, delay = 0 }: SafetyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className={cn(
                "relative group p-8 border border-white/10 bg-zinc-900/50 hover:bg-zinc-900 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[300px]",
                className
            )}
        >
            {/* Background Icon Watermark */}
            <Icon className="absolute -bottom-8 -right-8 w-48 h-48 text-white/5 group-hover:text-gold/5 transition-colors duration-500 pointer-events-none" />

            {/* Hover Glow */}
            <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-black transition-colors duration-500">
                    <Icon className="w-6 h-6 text-gold group-hover:text-black transition-colors duration-500" />
                </div>

                <h3 className="text-2xl font-oswald text-white uppercase mb-4 tracking-wide group-hover:text-gold transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-gray-400 font-manrope leading-relaxed text-sm max-w-[90%] group-hover:text-white transition-colors duration-300">
                    {detail}
                </p>

                {/* Expand Indicator */}
                <div className="mt-8 h-[1px] w-12 bg-white/20 group-hover:w-full group-hover:bg-gold transition-all duration-500" />
            </div>
        </motion.div>
    );
}

export function SafetyGrid() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-void-black relative">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <h2 className="text-gold font-oswald uppercase tracking-[0.3em] text-sm mb-4">Ownership In Action</h2>
                    <h3 className="text-4xl md:text-6xl text-white font-oswald uppercase font-bold">Protocol Matrix</h3>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[600px]"
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {/* Card 1: The Plan (Large) */}
                    <div
                        className={cn("md:col-span-4 md:row-span-1 transition-opacity duration-500", hoveredIndex !== null && hoveredIndex !== 0 && "opacity-40")}
                        onMouseEnter={() => setHoveredIndex(0)}
                    >
                        <SafetyCard
                            title="Pre-Task Planning"
                            icon={BlueprintIcon}
                            detail="Hazard awareness before the work begins. Every shift starts with a comprehensive plan."
                            className="h-full bg-gradient-to-br from-zinc-900 to-black"
                            delay={0}
                        />
                    </div>

                    {/* Card 2: JHA Protocols  */}
                    <div
                        className={cn("md:col-span-2 md:row-span-1 transition-opacity duration-500", hoveredIndex !== null && hoveredIndex !== 1 && "opacity-40")}
                        onMouseEnter={() => setHoveredIndex(1)}
                    >
                        <SafetyCard
                            title="JHA Protocols"
                            icon={ShieldIcon}
                            detail="Job Hazard Analyses for all critical activities."
                            className="h-full"
                            delay={0.1}
                        />
                    </div>

                    {/* Card 3: Culture */}
                    <div
                        className={cn("md:col-span-2 md:row-span-1 transition-opacity duration-500", hoveredIndex !== null && hoveredIndex !== 2 && "opacity-40")}
                        onMouseEnter={() => setHoveredIndex(2)}
                    >
                        <SafetyCard
                            title="Total Accountability"
                            icon={TeamIcon}
                            detail="Accountability at every level. No exceptions."
                            className="h-full"
                            delay={0.2}
                        />
                    </div>

                    {/* Card 4: Environment */}
                    <div
                        className={cn("md:col-span-2 md:row-span-1 transition-opacity duration-500", hoveredIndex !== null && hoveredIndex !== 3 && "opacity-40")}
                        onMouseEnter={() => setHoveredIndex(3)}
                    >
                        <SafetyCard
                            title="Site Discipline"
                            icon={BroomIcon}
                            detail="Clean, organized job sites lead to safe outcomes."
                            className="h-full"
                            delay={0.3}
                        />
                    </div>

                    {/* Card 5: Bottom Line */}
                    <div
                        className={cn("md:col-span-2 md:row-span-1 transition-opacity duration-500", hoveredIndex !== null && hoveredIndex !== 4 && "opacity-40")}
                        onMouseEnter={() => setHoveredIndex(4)}
                    >
                        <SafetyCard
                            title="Zero Shortcuts"
                            icon={StopIcon}
                            detail="Every team member goes home safe — every day."
                            className="h-full border-gold/20"
                            delay={0.4}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
