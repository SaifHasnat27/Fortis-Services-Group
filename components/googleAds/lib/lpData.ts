import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

/* ────────────────────────────────────────────────────────────────
   Google Ads landing pages (template1). DRAFT COPY.

   Only the hero + meta change per page. Every other section is shared
   and lives in components/googleAds/sections/.

   All LP pages are noindex / nofollow: set here AND in
   app/(googleAds)/layout.tsx. They are not in sitemap.ts.
   ──────────────────────────────────────────────────────────────── */

export type LpSlug =
  | "commercial-refrigeration-repairs"
  | "commercial-fridge-repairs"
  | "cool-room-repairs";

export interface LpPage {
  /** The equipment this page is about, lowercase ("cool room"). Shared copy in sections
      is built from it, so a new page can't inherit another page's wording. */
  equipment: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; heading: string; subheading: string; image: string; imageAlt: string };
  /** "How it works" section heading. */
  process: { heading: string };
  /** Big call CTA section. Subheading is built from `equipment` in CtaLp. */
  cta: { heading: string };
}

export const LP_PAGES: Record<LpSlug, LpPage> = {
  "commercial-refrigeration-repairs": {
    equipment: "refrigeration",
    meta: {
      title: "Commercial Refrigeration Repairs Sydney | 24/7",
      description: `ARC licensed technicians for commercial fridges, freezers, cool rooms and ice machines. 24/7 emergency response. Call ${BUSINESS.phone}.`,
    },
    hero: {
      eyebrow: "24/7 Emergency Repairs Sydney Wide",
      heading: "Commercial Refrigeration Repairs Sydney",
      subheading:
        "Fridges, freezers, cool rooms and ice machines repaired on site by ARC licensed technicians. One call and we're on the way, day or night.",
      image: "/images/Ads/commercial-refrigeration.webp",
      imageAlt: "Commercial refrigeration repair",
    },
    process: { heading: "Get Your Refrigeration Repaired in 3 Steps" },
    cta: {
      heading: "Refrigeration Down Right Now?",
    },
  },
  "commercial-fridge-repairs": {
    equipment: "fridge or freezer",
    meta: {
      title: "Commercial Fridge Repairs Sydney | 24/7",
      description: `Upright, under bench and display fridge repairs by ARC licensed technicians. 24/7 emergency response to protect your stock. Call ${BUSINESS.phone}.`,
    },
    hero: {
      eyebrow: "24/7 Emergency Repairs Sydney Wide",
      heading: "Commercial Fridge & Freezer Repairs Sydney",
      subheading:
        "Display, glass door, upright and under bench fridges and freezers repaired on site, day or night, by our ARC licensed technicians, so your stock stays safe.",
      image: "/images/Ads/commercial-refrigeration.webp",
      imageAlt: "Commercial fridge and freezer repair",
    },
    process: { heading: "Get Your Fridge & Freezer Repaired in 3 Steps" },
    cta: {
      heading: "Commercial Fridge or Freezer Down Right Now?",
    },
  },
  "cool-room-repairs": {
    equipment: "cool room",
    meta: {
      title: "Cool Room Repairs Sydney | 24/7 Emergency",
      description: `Walk-in cool room and freezer room repairs by ARC licensed technicians. 24/7 emergency response across Sydney. Call ${BUSINESS.phone}.`,
    },
    hero: {
      eyebrow: "24/7 Emergency Repairs Sydney Wide",
      heading: "Cool Room Repairs Sydney",
      subheading:
        "Cool room or freezer room down? Our ARC licensed technicians repair it on site, day or night, so your stock stays protected.",
      image: "/images/Ads/cool-room.webp",
      imageAlt: "Commercial cool room repair",
    },
    process: { heading: "Get Your Cool Room Repaired in 3 Steps" },
    cta: {
      heading: "Cool Room Down Right Now?",
    },
  },
};

/** Metadata for one LP. Overrides the root layout's canonical ("/"). */
export function buildLpMetadata(slug: LpSlug): Metadata {
  const { meta } = LP_PAGES[slug];
  const path = `/lp/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    robots: { index: false, follow: false },
    alternates: { canonical: path },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      siteName: BUSINESS.name,
      locale: "en_AU",
      type: "website",
    },
  };
}
