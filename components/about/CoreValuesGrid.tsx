"use client";

import { Shield, Target, Award, HeartHandshake, HardHat, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const values = [
    {
        title: "Extreme Ownership",
        description: "We own the outcome — always.",
        icon: Shield
    },
    {
        title: "Disciplined Execution",
        description: "We do what we said, when we said we’d do it.",
        icon: Target
    },
    {
        title: "Relentless Standards",
        description: "Good enough is never enough.",
        icon: Award
    },
    {
        title: "Faithful Stewardship",
        description: "We are entrusted with people, resources, and influence.",
        icon: HeartHandshake
    },
    {
        title: "Generational Impact",
        description: "We build for generations, not just returns.",
        icon: TrendingUp
    }
];

export function CoreValuesGrid() {
    return (
        <section className="py-24 bg-void-black border-t border-white/5">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-oswald text-white mb-16 text-center uppercase tracking-tight">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((item, index) => (
                        <div key={index} className="group relative bg-[#151515] p-10 overflow-hidden border border-white/5 hover:border-gold transition-colors duration-500">

                            {/* Gold Background Sweep */}
                            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />

                            <div className="relative z-10">
                                <item.icon className="h-12 w-12 text-[#D4AF37] mb-8 group-hover:text-black transition-colors duration-300" />
                                <h3 className="text-2xl font-oswald text-white mb-4 uppercase tracking-wider group-hover:text-black transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-base font-manrope group-hover:text-black/80 transition-colors duration-300">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
