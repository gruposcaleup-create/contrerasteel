"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
    { id: "erection", label: "Structural Erection" },
    { id: "fabrication", label: "Steel Fabrication" },
    { id: "turnkey", label: "Turnkey Solutions" },
];

export function ServicesNav() {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -50% 0px" }
        );

        links.forEach((link) => {
            const element = document.getElementById(link.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="flex flex-col space-y-6 border-l border-white/10 pl-8 relative">
            {/* Active Indicator Line */}
            <motion.div
                className="absolute left-0 w-[2px] bg-[#D4AF37]"
                layoutId="active-nav-line"
                initial={false}
                animate={{
                    height: 24, // Approximation of line height or dynamic calculation
                    top: links.findIndex(l => l.id === activeId) * 50 // Rough calc, might need refinement or ref based approach
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-4">
                Contents
            </span>
            {links.map((link) => (
                <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleClick(e, link.id)}
                    className={cn(
                        "text-lg font-oswald uppercase tracking-widest transition-colors duration-300",
                        activeId === link.id ? "text-white" : "text-gray-600 hover:text-gray-400"
                    )}
                >
                    {link.label}
                </a>
            ))}
        </nav>
    );
}
