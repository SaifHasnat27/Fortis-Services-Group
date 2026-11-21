import { BUSINESS } from "@/lib/constants";

// DRAFT COPY. Refrigeration FAQs for the Google Ads landing pages only.
// The site FAQ (components/servicecards/answer.tsx) is untouched.

export interface LpFaqItem {
  q: string;
  a: string;
}

export const LP_FAQS: LpFaqItem[] = [
  {
    q: "Do you offer 24/7 emergency refrigeration repairs?",
    a: "Yes. Refrigeration breakdowns don't wait for business hours, so our team responds day or night, seven days a week, including weekends and public holidays.",
  },
  {
    q: "What refrigeration equipment do you repair?",
    a: "We repair all types of commercial refrigeration equipment, including upright and under bench fridges, display cabinets, freezers, walk-in cool rooms, freezer rooms, ice machines, glycol beer systems and more.",
  },
  {
    q: "Are your technicians licensed?",
    a: "Yes. All refrigerant handling is carried out by technicians holding an Australian Refrigeration Council (ARC) licence, so the work is safe, legal and done to industry standards.",
  },
  {
    q: "Which areas do you cover?",
    a: `We cover all of Greater Sydney, including the Eastern Suburbs, Inner West, North Shore, Northern Beaches, Western Sydney and the Sutherland Shire, as well as Wollongong and the Central Coast. Not sure if we cover your area? Give us a call on ${BUSINESS.phone} and we'll let you know.`,
  },
  {
    q: "How can I protect my stock while I wait for a technician?",
    a: "Keep doors closed as much as possible, move critical stock into a working fridge or freezer if you can, and note the temperature readings. Our technician will advise you on the phone and on site.",
  },
  {
    q: "Do you offer preventative maintenance?",
    a: "Yes. Scheduled servicing catches small faults before they become costly breakdowns. We clean condensers, check refrigerant levels, test controls and door seals, and keep a service history for every unit.",
  },
  {
    q: "How do I get a quote?",
    a: `Call us on ${BUSINESS.phone} or fill in the quote form on this page. There's no standard price list. We give you a clear quote based on your equipment and the work required.`,
  },
];
