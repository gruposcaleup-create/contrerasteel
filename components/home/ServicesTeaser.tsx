"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ServicesTeaserProps {
    content?: any;
}

export function ServicesTeaser({ content }: ServicesTeaserProps) {
    const data = content?.servicesTeaser || {
        heading: "Constructing Excellence",
        subheading: "Our Capabilities",
        items: []
    };

    const defaultServices = [
        {
            title: "Structural Steel Erection",
            description: "Disciplined field execution. Precision alignment and bolting.",
            image: "/IMG_3383.jpg",
            link: "/services#erection",
            number: "01"
        },
        {
            title: "Steel Fabrication",
            description: "Precision built, field ready. High-tolerance manufacturing.",
            image: "/dji_fly_20230309_160218_8_1678396403036_photo.jpg",
            link: "/services#fabrication",
            number: "02"
        },
        {
            title: "Turnkey Fabricate & Erect",
            description: "One partner, total accountability. From design to erection.",
            image: "/DJI_20250328123428_0015_W.JPG",
            link: "/services#turnkey",
            number: "03"
        }
    ];

    const services = data.items && data.items.length > 0 ? data.items.map((item: any, i: number) => ({
        ...defaultServices[i % 3], // Fallback for image/link if not in JSON yet
        title: item.title,
        description: item.description,
        number: `0${i + 1}`
    })) : defaultServices;

    return (
        <section className="py-32 bg-void-black border-b border-white/5">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16"
                >
                    <div>
                        <span className="text-gold font-oswald text-sm uppercase tracking-[0.3em] mb-2 block">{data.subheading}</span>
                        <h2 className="text-4xl md:text-6xl font-bold font-oswald text-white uppercase tracking-tighter leading-none">
                            {data.heading}
                        </h2>
                    </div>
                    <Link href="/services" className="hidden md:flex items-center gap-2 text-white/50 hover:text-gold transition-colors font-oswald uppercase tracking-widest text-sm group">
                        View All Services <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service: { title: string, description: string, image: string, link: string, number: string }, index: number) => (
                        <Link key={index} href={service.link}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="group relative h-[600px] overflow-hidden border border-white/10 bg-zinc-900"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60 grayscale group-hover:grayscale-0"
                                        quality={100}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                {/* Hover Overlay - Gold Glow */}
                                <div className="absolute inset-0 box-border border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform transition-transform duration-500 group-hover:-translate-y-4">
                                    <span className="text-6xl font-oswald font-bold text-white/10 absolute -top-16 left-8 select-none group-hover:text-gold/20 transition-colors duration-500">
                                        {service.number}
                                    </span>
                                    <h3 className="text-3xl font-oswald text-white uppercase mb-4 leading-none relative">
                                        {service.title}
                                    </h3>
                                    <div className="h-[1px] w-12 bg-gold mb-4 group-hover:w-full transition-all duration-500" />
                                    <p className="text-gray-400 font-manrope text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[90%]">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <Link href="/services" className="md:hidden mt-8 flex items-center justify-center gap-2 text-white/50 hover:text-gold transition-colors font-oswald uppercase tracking-widest text-sm group">
                    View All Services <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
