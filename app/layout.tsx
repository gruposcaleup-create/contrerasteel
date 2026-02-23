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

const SITE_URL = "https://www.contrerassteel.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Contreras Steel LLC | Structural Steel Erection & Fabrication | Cullman, AL",
    template: "%s | Contreras Steel LLC"
  },
  description: "Premier structural steel erection and custom fabrication services in Cullman, Alabama. Bar joist & decking installation, commercial steel construction delivered with military-grade precision. Call +1 (256)-747-5012.",
  keywords: [
    "steel erection Alabama",
    "structural steel fabrication",
    "steel erection Cullman AL",
    "custom steel fabrication",
    "bar joist installation",
    "decking installation",
    "commercial steel contractor",
    "steel building erector",
    "Alabama steel contractor",
    "Contreras Steel",
    "steel erection company near me",
    "structural steel installation",
    "steel fabrication services",
    "steel erector Southeast US"
  ],
  authors: [{ name: "Contreras Steel LLC" }],
  creator: "Contreras Steel LLC",
  publisher: "Contreras Steel LLC",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Contreras Steel LLC | Structural Steel Erection & Fabrication",
    description: "Military-grade precision in structural steel erection and fabrication. Serving Alabama and the Southeast United States.",
    siteName: "Contreras Steel LLC",
    images: [{
      url: "/IMG_4562.jpg",
      width: 1200,
      height: 630,
      alt: "Contreras Steel — Structural Erection & Fabrication"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contreras Steel LLC | Steel Erection & Fabrication",
    description: "Premier structural steel erection and fabrication in Cullman, Alabama. Military-grade precision.",
    images: ["/IMG_4562.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "construction",
};

// JSON-LD Structured Data for Google Rich Results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE_URL,
  name: "Contreras Steel LLC",
  description: "Premier structural steel erection and custom fabrication services in Cullman, Alabama. Bar joist & decking installation, commercial steel construction.",
  url: SITE_URL,
  telephone: "+1-256-747-5012",
  email: "projects@contrerassteel.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "800 2nd Ave NW",
    addressLocality: "Cullman",
    addressRegion: "AL",
    postalCode: "35055",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.1748,
    longitude: -86.8436,
  },
  image: `${SITE_URL}/IMG_4562.jpg`,
  logo: `${SITE_URL}/CONTRERAS STEEL SVG.png`,
  sameAs: [],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "17:00",
  },
  priceRange: "$$",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 34.1748,
      longitude: -86.8436,
    },
    geoRadius: "500",
  },
  knowsAbout: [
    "Structural Steel Erection",
    "Custom Steel Fabrication",
    "Bar Joist Installation",
    "Decking Installation",
    "Commercial Steel Construction",
  ],
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
