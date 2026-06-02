import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { localBusinessSchema } from "@/lib/schema";
import { BUSINESS } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    template: `%s | ${BUSINESS.name}`,
    default: `Commercial Asset Maintenance & Compliance Sydney | ${BUSINESS.name}`,
  },
  description: "Asset compliance, 24/7 reactive maintenance & integrated trade services for hospitality, manufacturing & aged care businesses across Sydney, Wollongong & Central Coast. Call to get a free quote.",
  openGraph: {
    title: `Commercial Asset Maintenance & Compliance Sydney | ${BUSINESS.name}`,
    description: "One point of contact for asset compliance, reactive maintenance & trade services across Sydney, Wollongong & Central Coast. 24/7 emergency support available.",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    locale: "en_AU",
    type: "website",
  },
  alternates: {
    canonical: BUSINESS.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen bg-base text-pretty">
        <Navbar />
        <main className="flex-grow pt-[var(--nav-height)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
