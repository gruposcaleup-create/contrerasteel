"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: "primary" | "outline" | "ghost";
    disabled?: boolean;
}

export function MagneticButton({ children, className, onClick, variant = "primary", disabled }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.15); // Sensitivity
        y.set(middleY * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const variants = {
        primary: "bg-gradient-to-br from-[#D4AF37] to-[#C59D5F] text-black border-none hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]",
        outline: "bg-transparent border border-[#C59D5F] text-[#C59D5F] hover:bg-[#C59D5F]/10",
        ghost: "bg-transparent text-gray-300 hover:text-[#D4AF37]",
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
            fetch('/api/analytics', {
                method: 'POST',
                body: JSON.stringify({ type: 'click' }),
                headers: { 'Content-Type': 'application/json' }
            }).catch(() => { }); // silently fail if tracking errors

            if (onClick) onClick();
        }
    };

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            className={cn(
                "relative inline-flex items-center justify-center h-12 px-8 py-0 font-oswald text-lg font-bold uppercase tracking-wider transition-all duration-300 rounded-sm",
                variants[variant],
                className,
                disabled && "opacity-50 cursor-not-allowed hover:shadow-none"
            )}
            onMouseMove={disabled ? undefined : handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            disabled={disabled}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}
