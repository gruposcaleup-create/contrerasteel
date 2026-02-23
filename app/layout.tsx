import type { Metadata } from "next";
import { Oswald, Manrope } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

import { AnalyticsTracker } from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: {
    default: "Contreras Steel LLC | Structural Erection & Fabrication",
    template: "%s | Contreras Steel LLC"
  },
  description: "Premier structural steel erection and custom fabrication services in Cullman, Alabama, delivered with discipline, integrity, and military-grade precision.",
  keywords: ["Steel Erection", "Custom Fabrication", "Bar Joist", "Alabama Steel Contractors", "Cullman Steel", "Commercial Steel", "Structural Steel"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.contrerassteel.com",
    title: "Contreras Steel LLC",
    description: "Military-grade precision in structural steel erection and fabrication.",
    siteName: "Contreras Steel",
    images: [{
      url: "/IMG_4562.jpg", // Default image for preview cards
      width: 1200,
      height: 630,
      alt: "Contreras Steel Works"
    }],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${oswald.variable} ${manrope.variable} antialiased bg-void-black text-white flex flex-col min-h-screen selection:bg-[#D4AF37] selection:text-black`}
      >
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
