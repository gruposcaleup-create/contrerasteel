import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
    title: "Contact Us — Get a Quote or Schedule a Consultation",
    description: "Ready to start your next steel project? Contact Contreras Steel LLC in Cullman, AL at +1 (256)-747-5012 or projects@contrerassteel.com for estimates and capabilities.",
    openGraph: {
        title: "Contact Contreras Steel LLC",
        description: "Request a quote or schedule a consultation. Structural steel erection and fabrication in Cullman, Alabama.",
    },
};

export default async function ContactPage() {
    const content = await getContent();
    const { contactPage } = content;

    return (
        <div className="bg-void-black min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                {/* Left: Info */}
                <div className="relative p-12 lg:p-24 flex flex-col justify-between bg-zinc-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

                    <div>
                        <h1 className="text-5xl md:text-7xl font-oswald text-white uppercase leading-none mb-8" dangerouslySetInnerHTML={{ __html: contactPage?.title?.replace(/\n/g, '<br />') || "Let’s Build<br />Something<br /><span class='text-[#D4AF37]'>Lasting.</span>" }}>
                        </h1>
                        <p className="text-gray-400 text-lg font-manrope max-w-md">
                            {contactPage?.subtitle || "We are ready to discuss your next project. Reach out to our team for estimates, capabilities, or partnership opportunities."}
                        </p>
                    </div>

                    <div className="space-y-10 mt-16 relative z-10">
                        <div className="flex items-start group">
                            <MapPin className="h-6 w-6 text-[#D4AF37] mr-6 mt-1 group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="text-sm font-oswald text-[#D4AF37] uppercase tracking-widest mb-1">{contactPage?.addressTitle || "Headquarters"}</h3>
                                <p className="text-white font-manrope whitespace-pre-line">{contactPage?.address || "800 2nd Ave NW\nCullman, AL 35055"}</p>
                            </div>
                        </div>

                        <div className="flex items-start group">
                            <Phone className="h-6 w-6 text-[#D4AF37] mr-6 mt-1 group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="text-sm font-oswald text-[#D4AF37] uppercase tracking-widest mb-1">{contactPage?.phoneTitle || "Phone"}</h3>
                                <p className="text-white font-manrope">{contactPage?.phone || "+1 (256)-747-5012"}</p>
                            </div>
                        </div>

                        <div className="flex items-start group">
                            <Mail className="h-6 w-6 text-[#D4AF37] mr-6 mt-1 group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="text-sm font-oswald text-[#D4AF37] uppercase tracking-widest mb-1">{contactPage?.emailTitle || "Email"}</h3>
                                <p className="text-white font-manrope">{contactPage?.email || "projects@contrerassteel.com"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="p-12 lg:p-24 flex items-center bg-void-black relative">
                    {/* Decorative Border */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

                    <div className="w-full max-w-lg mx-auto">
                        <ContactForm />

                        <div className="mt-12 pt-12 border-t border-white/10 text-center">
                            <p className="text-gray-500 font-manrope mb-6 uppercase tracking-wider text-sm">Or connect professionally</p>
                            <a
                                href={contactPage?.linkedinUrl || "https://linkedin.com"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-3 border border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all duration-300 font-oswald uppercase tracking-wide rounded-sm"
                            >
                                <span className="text-lg">Connect on LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
