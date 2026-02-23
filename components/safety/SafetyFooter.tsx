"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";
import { motion } from "framer-motion";

export function SafetyFooter() {
    return (
        <section className="py-24 relative bg-zinc-900 overflow-hidden border-t border-white/5">
            {/* Diamond Plate Texture (Simulated with repeating pattern) */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')",
                    backgroundSize: "50px 50px"
                }}
            />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-oswald text-white uppercase font-bold mb-8">
                        See Our Safety Record <span className="text-gold">In Action</span>.
                    </h2>
                    <p className="text-gray-400 font-manrope mb-12 max-w-xl mx-auto">
                        We invite you to review our EMR rating and safety manual. Transparency is part of our discipline.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <Link href="/contact">
                            <MagneticButton variant="primary">
                                Request Safety Plan
                            </MagneticButton>
                        </Link>
                        <Link href="/contact">
                            <MagneticButton variant="outline">
                                Contact Safety Director
                            </MagneticButton>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
