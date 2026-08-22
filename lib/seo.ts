import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

/* ────────────────────────────────────────────────────────────────
   Central SEO copy for every page.

   All titles/descriptions live here so there is ONE place to edit.
   Phone/email/url are pulled from BUSINESS (constants.ts) so they
   never drift out of sync.

   Each page has a sibling layout.tsx that does:
     export const metadata = buildMetadata("about");

   This keeps the page.tsx files free to stay "use client" — a client
   component cannot export metadata, but its layout can.

   The root layout consumes PAGE_SEO.home for the site-wide default
   title/description, so the homepage copy lives here too.

   No <meta keywords> tag is emitted — Google has ignored it since 2009
   and it only leaks the target list to competitors. Each entry keeps a
   "Targets:" comment instead, so the keyword research stays visible to
   whoever edits the copy without shipping anything to the browser.

   House rules for editing:
     - Title 50-60 chars. What you write here is exactly what renders —
       there is no title template and no brand suffix appended.
     - Description 150-160 chars, key message inside the first 120
     - Front-load the primary keyword; write for the click, not the bot
   ──────────────────────────────────────────────────────────────── */

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "contact"
  | "areasServed"
  | "policy"
  | "terms";

interface PageSeo {
  title: string;
  description: string;
  /** Path only, e.g. "/about". Home is "/". */
  canonical: string;
}

export const PAGE_SEO: Record<PageKey, PageSeo> = {
  home: {
    // Targets: commercial refrigeration repair, cold room repairs,
    // commercial fridge repair, facilities maintenance,
    // commercial hvac service, commercial refrigeration maintenance,
    // emergency fridge repairs
    title: "Commercial Refrigeration Repair & Facilities Maintenance Sydney",
    description:
      "Cold room repairs, commercial fridge repair and commercial HVAC service across Sydney. 24/7 emergency response and full facilities maintenance. Free quote.",
    canonical: "/",
  },
  about: {
    // Targets: facilities maintenance, commercial refrigeration repair,
    // commercial air conditioning service, commercial property maintenance,
    // commercial building maintenance
    title: "About Us | Facilities Maintenance & Refrigeration Repair Sydney",
    description:
      "Sydney specialists in commercial refrigeration repair, commercial air conditioning service and facilities maintenance. Reliable, transparent, accountable.",
    canonical: "/about",
  },
  services: {
    // Targets: commercial refrigeration repair, cool room repair,
    // commercial freezer repair, commercial cooler repair,
    // commercial ice machine repair, cool room installation,
    // commercial air conditioning maintenance, commercial air conditioning
    // repairs, commercial hvac repair, commercial air conditioning
    // installation, heat pump repair, heat pump service,
    // facilities maintenance, property maintenance
    title: "Commercial Refrigeration, HVAC & Facilities Maintenance Sydney",
    description:
      "Cool room repair, commercial freezer repair, commercial air conditioning maintenance and property maintenance across Sydney. 24/7 callout. Get a free quote.",
    canonical: "/services",
  },
  contact: {
    // Targets: emergency fridge repairs, emergency air conditioning repair,
    // emergency ac repair, 24 7 air conditioning repair, cold room repairs,
    // commercial refrigeration repair, commercial hvac repair,
    // facilities maintenance
    title: "Contact Us | Commercial Refrigeration & HVAC Sydney",
    description: `Get a free quote or book a 24/7 emergency callout for commercial refrigeration, cold room and HVAC repairs across Sydney. Call ${BUSINESS.phone} today.`,
    canonical: "/contact",
  },
  areasServed: {
    // Targets: commercial refrigeration repair, commercial hvac service,
    // facilities maintenance, commercial property maintenance,
    // industrial property maintenance, office maintenance,
    // property maintenance
    title: "Areas Served | Commercial Refrigeration & HVAC Sydney",
    description:
      "Commercial refrigeration repair, commercial HVAC service and facilities maintenance across Sydney, Wollongong, Central Coast and surrounds. Free quote.",
    canonical: "/areas-served",
  },
  policy: {
    title: `Privacy Policy | ${BUSINESS.name}`,
    description: `Read the ${BUSINESS.name} Privacy Policy to understand how we collect, use and protect your personal information.`,
    canonical: "/policy",
  },
  terms: {
    title: `Terms & Conditions | ${BUSINESS.name}`,
    description: `Read the ${BUSINESS.name} Terms & Conditions governing use of our website and services.`,
    canonical: "/terms",
  },
};

/**
 * Build a Next.js Metadata object for a page from its central SEO entry.
 * Titles render verbatim — no template, no brand suffix.
 */
export function buildMetadata(key: PageKey): Metadata {
  const seo = PAGE_SEO[key];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: BUSINESS.name,
      locale: "en_AU",
      type: "website",
    },
  };
}
