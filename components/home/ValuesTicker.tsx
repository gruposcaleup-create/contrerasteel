"use client";

import { motion } from "framer-motion";

const values = [
    "Extreme Ownership",
    "Disciplined Execution",
    "Relentless Standards",
    "Faithful Stewardship",
    "Generational Impact"
];

export function ValuesTicker() {
    return (
        <div className="w-full bg-[#D4AF37] py-6 overflow-hidden border-y border-[#C59D5F] relative z-30">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                >
                    {[...values, ...values, ...values, ...values].map((value, index) => (
                        <span key={index} className="flex items-center text-void-black font-bold font-oswald text-2xl md:text-3xl tracking-widest uppercase px-12">
                            {value}
                            <span className="w-2 h-2 bg-void-black rounded-full ml-12" />
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
