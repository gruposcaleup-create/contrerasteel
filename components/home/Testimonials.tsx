"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialsProps {
    content?: any;
}

export function Testimonials({ content }: TestimonialsProps) {
    const rawTestimonials = content?.testimonials || [];
    const defaultTestimonials = [
        {
            quote: "Contreras Steel didn't just meet the schedule; they owned it. Their discipline in the field is unmatched.",
            author: "Mark Henderson",
            role: "Project Executive",
            company: "Titan Builders Group"
        },
        {
            quote: "In a chaotic industry, they are the constant. I rest easier knowing Contreras is on the erection scope.",
            author: "Sarah Jenkins",
            role: "Senior Superintendent",
            company: "Apex Construction"
        },
        {
            quote: "Safety isn't a checkbox for them. It's their culture. The most professional crew we've had on site.",
            author: "David Miller",
            role: "Safety Director",
            company: "Summit General Contracting"
        }
    ];

    const testimonials = rawTestimonials.length > 0 ? rawTestimonials.map((t: any) => ({
        quote: t.text,
        author: t.author,
        role: "Client", // Fallback
        company: "Partner" // Fallback
    })) : defaultTestimonials;
    return (
        <section className="py-32 bg-void-black">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <h2 className="text-4xl md:text-6xl font-oswald font-bold text-white uppercase tracking-tighter leading-none">
                        Built on <span className="text-gold">Trust</span>
                    </h2>
                    <div className="h-[1px] flex-grow mx-8 bg-white/10 hidden md:block" />
                    <p className="text-gray-500 font-oswald tracking-[0.2em] uppercase text-sm mt-4 md:mt-0">
                        What our partners say
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item: { quote: string, author: string, role: string, company: string }, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-[#111] p-10 border border-white/5 relative group hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
                        >
                            <Quote className="h-10 w-10 text-gold/20 mb-6 group-hover:text-gold transition-colors duration-300" />
                            <p className="text-gray-300 font-manrope text-lg leading-relaxed mb-8 italic">
                                "{item.quote}"
                            </p>
                            <div>
                                <h4 className="text-white font-oswald uppercase text-xl">{item.author}</h4>
                                <p className="text-gold text-sm uppercase tracking-wider font-oswald">{item.role}</p>
                                <p className="text-gray-600 text-xs uppercase tracking-widest mt-1">{item.company}</p>
                            </div>

                            {/* Gold bottom border on hover */}
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
