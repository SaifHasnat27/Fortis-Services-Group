import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Syne, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { localBusinessSchema } from "@/lib/schema";
import { BUSINESS } from "@/lib/constants";
import { PAGE_SEO } from "@/lib/seo";
import "./globals.css";

/* Legacy fonts — kept loaded, available via --font-cormorant / --font-dm-sans */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* Active FSG fonts — drive --font-display / --font-body tokens */
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/* Site-wide shell + homepage metadata.
   Homepage copy lives in lib/seo.ts (PAGE_SEO.home) alongside every other
   page, so all SEO text stays editable from one file. Child routes override
   this via their own layout.tsx -> buildMetadata().

   No title template: every page renders exactly the title written in
   seo.ts, with no brand suffix appended. */
export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: PAGE_SEO.home.title,
  description: PAGE_SEO.home.description,
  openGraph: {
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    url: PAGE_SEO.home.canonical,
    siteName: BUSINESS.name,
    locale: "en_AU",
    type: "website",
  },
  alternates: {
    canonical: PAGE_SEO.home.canonical,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${syne.variable} ${inter.variable}`}
    >
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
