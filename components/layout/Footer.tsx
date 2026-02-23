import Link from "next/link";
import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook } from "lucide-react";

interface FooterProps {
    content?: any;
}

export function Footer({ content }: FooterProps) {
    const data = content?.footer || {
        address: "123 Industrial Way\nSteel City, TX 75000",
        phone: "+1 (555) 123-4567",
        email: "info@contrerassteel.com",
        copyright: "© 2026 CONTRERAS STEEL LLC. ALL RIGHTS RESERVED."
    };
    return (
        <footer className="w-full border-t border-white/5 bg-void-black pt-24 pb-12">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Col 1: Brand */}
                    <div>
                        <Link href="/" className="group inline-block mb-6">
                            <span className="text-2xl font-bold font-oswald tracking-tighter text-white">
                                CONTRERAS <span className="text-white">STEEL</span> LLC
                            </span>
                            <span className="block h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#C59D5F] w-12 mt-2" />
                        </Link>
                        <p className="text-gray-400 font-manrope text-sm leading-relaxed max-w-xs">
                            Raising structures, empowering possibilities. We build with discipline, integrity, and extreme ownership.
                        </p>
                    </div>

                    {/* Col 2: Navigation */}
                    <div>
                        <h3 className="text-gold font-oswald uppercase tracking-widest text-sm mb-6">Explore</h3>
                        <div className="flex flex-col space-y-4">
                            <Link href="/" className="text-gray-400 hover:text-white transition-colors font-manrope text-sm uppercase tracking-wide">Home</Link>
                            <Link href="/services" className="text-gray-400 hover:text-white transition-colors font-manrope text-sm uppercase tracking-wide">Services</Link>
                            <Link href="/about" className="text-gray-400 hover:text-white transition-colors font-manrope text-sm uppercase tracking-wide">About Us</Link>
                            <Link href="/safety" className="text-gray-400 hover:text-white transition-colors font-manrope text-sm uppercase tracking-wide">Safety</Link>
                            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors font-manrope text-sm uppercase tracking-wide">Contact</Link>
                        </div>
                    </div>

                    {/* Col 3: Contact */}
                    <div>
                        <h3 className="text-gold font-oswald uppercase tracking-widest text-sm mb-6">Contact</h3>
                        <div className="space-y-4 text-sm font-manrope text-gray-400">
                            <div className="flex items-start">
                                <MapPin className="h-4 w-4 mr-3 mt-1 text-gray-500" />
                                <p className="whitespace-pre-line">{data.address}</p>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-3 text-gray-500" />
                                <p>{data.phone}</p>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-3 text-gray-500" />
                                <p>{data.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Socials & Legal */}
                    <div>
                        <h3 className="text-gold font-oswald uppercase tracking-widest text-sm mb-6">Follow Us</h3>
                        <div className="flex gap-4 mb-8">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-black transition-all duration-300">
                                <Linkedin className="h-4 w-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-black transition-all duration-300">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-black transition-all duration-300">
                                <Facebook className="h-4 w-4" />
                            </a>
                        </div>
                        <blockquote className="text-xs text-gray-600 font-serif italic border-l border-white/10 pl-4">
                            "Unless the Lord builds the house, the builders labor in vain."
                            <span className="block not-italic font-oswald text-[#C59D5F] mt-1">— Psalm 127:1</span>
                        </blockquote>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-manrope uppercase tracking-wider">
                    <p>{data.copyright}</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
