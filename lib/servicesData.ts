// ─── Types ───────────────────────────────────────────────
export interface ServiceBullet {
  text: string;            // Short feature title (as shown on /services checklist)
  desc: string;            // Rich description of the feature
}

export interface Service {
  id: string;
  name: string;
  shortDesc: string;       // Used on homepage service cards
  longDesc: string[];      // Detailed paragraphs on /services page
  bullets: ServiceBullet[];// Feature list (title + description) on /services page
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
      "We manage and track every mandatory inspection your business is required to meet, including smoke alarm testing, switchboard thermal imaging, emergency lighting checks and fire equipment servicing. Operating across Sydney, Wollongong, Central Coast and surrounding areas, we ensure you remain compliant with all NSW statutory obligations without the administrative burden.",
      "Beyond compliance, we build tailored preventative maintenance schedules that extend the life of your critical assets, including refrigeration systems in hospitality venues, HVAC units in high-rise offices, and production equipment in manufacturing and warehousing. We become your strategic partner in risk reduction, cost certainty and asset longevity. Whatever your requirements, Fortis Services Group has the expertise and resources to deliver.",
    ],
    bullets: [
      {
        text: "Mandatory Compliance Inspections",
        desc: "We oversee and coordinate your entire schedule of legally required assessments, including smoke alarm testing in line with NSW regulations, switchboard thermal imaging, emergency and exit light testing, and fire equipment servicing, ensuring you meet all statutory obligations across Sydney, Wollongong and the Central Coast.",
      },
      {
        text: "Preventative Maintenance Scheduling",
        desc: "Whether it's air conditioning, refrigeration, electrical, plumbing, fire compliance, cleaning, pest control, painting, landscaping, roofing, security, or general maintenance, we coordinate and manage the services your property needs to operate safely, efficiently and without disruption.",
      },
      {
        text: "Proactive & Reactive Repairs",
        desc: "Seamlessly combine scheduled maintenance with rapid, on-demand repair coordination. From a leaking tap to a critical electrical fault, we manage the entire process, providing a single point of contact to keep your operations running smoothly and efficiently.",
      },
      {
        text: "Asset Lifecycle Management",
        desc: "Gain complete visibility and control over your physical assets. From initial equipment audits and the creation of detailed asset registers to ongoing lifecycle cost analysis, we provide the data-driven insights needed to optimise your capital and operational expenditure planning.",
      },
    ],
    image: "/images/services/asset.webp",
    iconName: "ShieldCheck",
  },
  {
    id: "reactive-maintenance",
    name: "24/7 Reactive Maintenance",
    shortDesc: "One call deploys qualified technicians to your site fast, minimising downtime and centralising all urgent repair requests.",
    longDesc: [
      "Downtime costs money. When a breakdown happens, you need the right technician on site fast, not a list of contractors to call through. Our dedicated helpdesk acts as your central command, logging every request, dispatching the nearest qualified technician, and providing real-time updates until the job is resolved.",
      "For hospitality venues, manufacturing facilities, warehouses, high rise offices, and aged care homes, you get round the clock reactive support with constant operational oversight and a single accountable point of contact.",
    ],
    bullets: [
      {
        text: "Single Point of Contact Helpdesk",
        desc: "One call or email to our dedicated support line is all it takes. Our helpdesk acts as your central command, logging requests, dispatching the right technician, and providing you with real-time updates until the job is done.",
      },
      {
        text: "Coordinated Technical Dispatch",
        desc: "For time-sensitive breakdowns, every minute matters. Our network of qualified, vetted technicians across our service areas is ready to be deployed. We manage the entire process, from locating the nearest available expert to ensuring the repair meets our quality standards.",
      },
      {
        text: "Transparent Reporting & Analytics",
        desc: "Beyond fixing the problem, we provide clarity. You receive detailed service reports and can access tailored analytics on work orders, helping you track maintenance spend, identify recurring issues, and make informed decisions about your property and equipment.",
      },
      {
        text: "On-Site Maintenance Personnel",
        desc: "For large, complex sites such as high-rise offices, manufacturing facilities or aged care homes, a dedicated presence can be invaluable. We can provide an on-site maintenance person to handle day-to-day planned tasks and immediate corrective repairs, ensuring constant operational oversight.",
      },
    ],
    image: "/images/services/response.webp",
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
      {
        text: "Complete Electrical Services",
        desc: "From replacing a faulty power point to resolving complex 3-phase power issues or conducting full site lighting upgrades, our licensed electricians handle all commercial electrical needs, ensuring safety and compliance.",
      },
      {
        text: "Commercial & Industrial Plumbing",
        desc: "We manage the full spectrum of plumbing requirements, including clearing blocked drains in a busy kitchen, repairing broken fixtures, installing new sanitary ware for an aged care facility, and maintaining hot water systems.",
      },
      {
        text: "Refrigeration & HVAC Solutions",
        desc: "Minimise stock loss and ensure occupant comfort with our dedicated refrigeration and climate control services. We specialise in maintaining and repairing commercial kitchen cool-rooms, freezers, and air conditioning systems for high-rise offices and manufacturing environments.",
      },
      {
        text: "General Building Maintenance",
        desc: "For those larger jobs that fall outside a simple repair, we manage small-scale projects. This includes carpentry, painting, flooring, cleaning, pest control, landscaping, and other general building upkeep required to keep your property in top condition. Our services offer complete coverage, tailored specifically to what you need.",
      },
    ],
    image: "/images/services/trades.webp",
    iconName: "Wrench",
  },
];
