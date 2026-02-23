"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: string;
    quality?: number;
    priority?: boolean;
    unoptimized?: boolean;
}

export function ParallaxImage({ src, alt, className, aspectRatio = "aspect-[4/5]", quality = 75, priority = false, unoptimized = false }: ParallaxImageProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

    return (
        <div ref={ref} className={cn("overflow-hidden relative w-full", aspectRatio, className)}>
            <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={quality}
                    priority={priority}
                    unoptimized={unoptimized}
                />
                <div className="absolute inset-0 bg-black/20" />
            </motion.div>
        </div>
    );
}
