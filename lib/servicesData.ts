// ─── Types ───────────────────────────────────────────────
export interface Service {
  id: string;
  name: string;
  shortDesc: string;       // Used on homepage service cards
  longDesc: string[];      // Detailed paragraphs on /services page
  bullets: string[];       // Checklist items on /services page
  image: string;           // Path to service image
  iconName: string;        // Lucide icon component name (mapped in consuming components)
}

// ─── Data ────────────────────────────────────────────────
export const services: Service[] = [
  {
    id: "asset-compliance-management",
    name: "Asset Compliance & Management",
    shortDesc: "Stay legally compliant and reduce risk with fully coordinated inspections, preventative maintenance, and asset lifecycle management.",
    longDesc: [
      "We manage and track every mandatory inspection your business is required to meet, including smoke alarm testing, switchboard thermal imaging, emergency lighting checks and fire equipment servicing. Operating across Sydney, Wollongong and the Central Coast, we ensure you remain compliant with all NSW statutory obligations without the administrative burden.",
      "Beyond compliance, we build tailored preventative maintenance schedules that extend the life of your critical assets, including refrigeration systems in hospitality venues, HVAC units in high-rise offices, and production equipment in manufacturing and warehousing. We become your strategic partner in risk reduction, cost certainty and asset longevity.",
    ],
    bullets: [
      "Mandatory compliance inspections (smoke alarms, switchboard thermal imaging, exit lighting)",
      "Tailored preventative maintenance scheduling",
      "Proactive & reactive repair coordination",
      "Asset lifecycle management & detailed asset registers",
    ],
    image: "/images/services/fence.webp",
    iconName: "ShieldCheck",
  },
  {
    id: "reactive-maintenance",
    name: "24/7 Reactive Maintenance",
    shortDesc: "One call deploys qualified technicians to your site fast, minimising downtime and centralising all urgent repair requests.",
    longDesc: [
      "Downtime costs money. When a breakdown happens, you need the right technician on site fast, not a list of contractors to call through. Our dedicated helpdesk acts as your central command, logging every request, dispatching the nearest qualified technician, and providing real-time updates until the job is resolved.",
      "For large or complex sites like high-rise offices, manufacturing facilities and aged care homes, we can also place an on-site maintenance person to handle day-to-day planned tasks and immediate corrective repairs. You get constant operational oversight and a single, accountable point of contact.",
    ],
    bullets: [
      "24/7 emergency support, one call and one contact",
      "Coordinated technical dispatch across Sydney, Wollongong & Central Coast",
      "Transparent reporting & maintenance analytics",
      "On-site maintenance personnel for large facilities",
    ],
    image: "/images/services/gate.webp",
    iconName: "Zap",
  },
  {
    id: "integrated-trade-services",
    name: "Integrated Trade Services",
    shortDesc: "Electrical, plumbing, refrigeration, HVAC and building maintenance under one point of contact, with consistent quality and no contractor juggling.",
    longDesc: [
      "Managing multiple trades is a hidden cost most businesses underestimate. Separate contractors mean separate call-out fees, separate schedules, and no single party accountable for the outcome. Fortis Services Group consolidates electrical, plumbing, refrigeration, HVAC, and general building maintenance under a single management interface.",
      "Our licensed and vetted tradespeople work across hospitality, manufacturing, warehousing, high-rise offices and aged care. Whether it's a faulty power point, a blocked drain in a commercial kitchen, a cool-room repair or a full lighting upgrade, we scope, schedule and deliver with consistent quality and full documentation.",
    ],
    bullets: [
      "Complete electrical services including faults, upgrades and compliance",
      "Commercial and industrial plumbing",
      "Refrigeration and HVAC including cool-rooms, freezers and air conditioning",
      "General building maintenance including carpentry, painting and flooring",
    ],
    image: "/images/services/glass.webp",
    iconName: "Wrench",
  },
];


