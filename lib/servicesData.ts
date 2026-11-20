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
    id: "refrigeration-repairs",
    name: "Refrigeration Repairs",
    shortDesc: "Fast, reliable repairs for commercial fridges, freezers, cool rooms and ice machines, carried out by ARC licensed technicians and available 24/7.",
    longDesc: [
      "When refrigeration fails, every hour puts your stock, revenue and food safety at risk. Our ARC licensed technicians diagnose faults on site and get your equipment back to temperature quickly, with 24/7 emergency response across Sydney, Wollongong, Central Coast and surrounding areas. We repair upright and under bench fridges, display cabinets, freezers, walk-in cool rooms, freezer rooms, ice machines and glycol beer systems.",
      "Beyond fixing breakdowns, we help you avoid them. Preventative maintenance plans keep your equipment running efficiently, reduce energy costs and extend its working life, while new cool room installations are designed around the way your business operates. From cafes and restaurants to supermarkets, warehouses and aged care facilities, you get clear advice, upfront pricing and work you can rely on.",
    ],
    bullets: [
      {
        text: "ARC Licensed Technicians",
        desc: "All refrigerant handling is carried out by technicians holding an Australian Refrigeration Council licence, so the work on your equipment is safe, legal and completed to industry standards. You can be confident your systems are in qualified hands.",
      },
      {
        text: "Stock Loss Prevention",
        desc: "A failed cool room or freezer can mean thousands of dollars in spoiled stock. We prioritise urgent breakdowns, restore safe temperatures as quickly as possible and advise you on protecting your products while repairs are underway.",
      },
      {
        text: "Food Safety Compliance",
        desc: "Commercial refrigeration has to hold food at safe temperatures to meet food safety requirements. We repair, calibrate and maintain your equipment so it performs reliably, helping you pass inspections and protect your customers.",
      },
      {
        text: "Preventative Maintenance Plans",
        desc: "Scheduled servicing catches small faults before they become costly breakdowns. We clean condensers, check refrigerant levels, test controls and door seals, and keep a clear service history for every unit on your site.",
      },
      {
        text: "24/7 Emergency Response",
        desc: "Refrigeration problems rarely happen at a convenient time. Our team responds day or night, seven days a week, so a breakdown on a Friday night or public holiday doesn't turn into a lost weekend of trade.",
      },
    ],
    image: "/images/services/commercial-refrigeration-service.webp",
    iconName: "Snowflake",
  },
  {
    id: "commercial-property-maintenance",
    name: "Commercial Property Maintenance",
    shortDesc: "One point of contact for inspections, preventative maintenance and repairs, keeping your commercial property safe, compliant and fully operational.",
    longDesc: [
      "Managing a commercial property means juggling inspections, routine upkeep and urgent repairs across multiple trades. We take that coordination off your plate. Through a single helpdesk, we manage your compliance obligations, preventative maintenance and reactive repairs across Sydney, Wollongong, Central Coast and surrounding areas, so you deal with one accountable partner instead of a list of contractors.",
      "Whether you operate a hospitality venue, warehouse, manufacturing facility, high-rise office or aged care home, we tailor our approach to the way your site runs. Every job is documented, recurring issues are flagged and your maintenance is planned ahead, giving you cost certainty, fewer disruptions and assets that last longer.",
    ],
    bullets: [
      {
        text: "Single Point of Contact Helpdesk",
        desc: "One call or email is all it takes. Our helpdesk logs every request, dispatches the right technician and provides real-time updates until the job is done, so you never have to chase contractors or explain the same problem twice.",
      },
      {
        text: "Mandatory Compliance Inspections",
        desc: "We schedule and track the statutory inspections and certifications your property is required to meet, keep the documentation in order and stay ahead of every due date. Your compliance stays on track without the administrative burden.",
      },
      {
        text: "Integrated Trade Services",
        desc: "Electrical, plumbing, refrigeration, air conditioning and general building work are all coordinated through one team. You get consistent quality, one set of reports and no more managing separate contractors for every job.",
      },
      {
        text: "24/7 Reactive Maintenance",
        desc: "Breakdowns don't wait for business hours, and neither do we. Urgent requests are logged immediately and a qualified technician is dispatched to your site, minimising downtime and keeping your operations running.",
      },
      {
        text: "Preventative Maintenance Plans",
        desc: "We build maintenance schedules around your property, equipment and budget. Planned servicing reduces unexpected failures, extends the life of your assets and gives you predictable costs throughout the year.",
      },
    ],
    image: "/images/services/commercial-property-maintenance-service.webp",
    iconName: "Building2",
  },
  {
    id: "electrical-services",
    name: "Electrical Services",
    shortDesc: "Licensed commercial electricians for repairs, upgrades and installations, from 3 phase power and switchboards to lighting and EV chargers.",
    longDesc: [
      "Electrical faults can stop a business in its tracks and create serious safety risks. Our licensed and insured electricians handle everything from power outages and tripping circuits to 3 phase faults and switchboard upgrades, with 24/7 emergency response across Sydney, Wollongong, Central Coast and surrounding areas.",
      "We also deliver planned electrical work, including lighting installations and upgrades, new circuits and EV charger installation. As a Level 2 accredited provider, we can also work on the connection between your property and the electricity network. Every job is completed to AS/NZS 3000 and fully documented for your records.",
    ],
    bullets: [
      {
        text: "Licensed & Insured Electricians",
        desc: "Every job is carried out by fully licensed and insured electricians with commercial experience, giving you peace of mind that your property, staff and customers are protected.",
      },
      {
        text: "AS/NZS 3000 Compliant Work",
        desc: "All electrical work is completed in line with AS/NZS 3000, the Australian wiring rules, and certified on completion. You receive the documentation you need for compliance, insurance and audits.",
      },
      {
        text: "3 Phase Power Expertise",
        desc: "Commercial kitchens, workshops and production lines rely on 3 phase power. We diagnose and repair 3 phase faults, install new circuits and upgrade capacity so your equipment runs safely and reliably.",
      },
      {
        text: "Level 2 Accredited",
        desc: "As a Level 2 accredited service provider, we can work on service mains, metering and the connection to the electricity network, so you don't have to wait on a separate contractor to get your power connected or restored.",
      },
      {
        text: "24/7 Emergency Response",
        desc: "Power outages and electrical faults are handled around the clock. Our electricians respond quickly to make your site safe, find the fault and restore power with minimal disruption to your business.",
      },
    ],
    image: "/images/services/commercial-electrical-service.webp",
    iconName: "Zap",
  },
  {
    id: "plumbing-services",
    name: "Plumbing Services",
    shortDesc: "Licensed commercial plumbers for blocked drains, leaks, hot water, gas and commercial kitchens, with 24/7 emergency response.",
    longDesc: [
      "A blocked drain in a busy kitchen or a burst pipe in an office can shut down your operations. Our licensed and insured plumbers respond quickly to blockages, leaks and hot water failures, with 24/7 emergency response across Sydney, Wollongong, Central Coast and surrounding areas.",
      "We use CCTV drain cameras and leak detection to find the real cause of a problem rather than guessing, and offer pipe relining to repair damaged pipes without major excavation. From gas fitting and hot water systems to fixtures and grease traps, all work is completed to AS/NZS 3500 with minimal disruption to your business.",
    ],
    bullets: [
      {
        text: "Licensed & Insured Plumbers",
        desc: "Every job is carried out by fully licensed and insured plumbers experienced in commercial properties, so the work is done safely and correctly, with your business protected.",
      },
      {
        text: "AS/NZS 3500 Compliant Work",
        desc: "All plumbing and drainage work meets AS/NZS 3500, the Australian plumbing and drainage standard, with compliance documentation provided on completion for your records and insurers.",
      },
      {
        text: "Commercial Kitchen Expertise",
        desc: "Commercial kitchens put heavy demands on plumbing. We clear and maintain drains and grease traps, repair sinks, dishwasher connections and hot water, and work around your service times to keep the kitchen running.",
      },
      {
        text: "CCTV Drain Diagnostics",
        desc: "Our drain cameras show exactly what is happening inside your pipes, from blockages and tree roots to cracks and collapses. That means an accurate diagnosis, the right fix first time and no unnecessary digging.",
      },
      {
        text: "24/7 Emergency Response",
        desc: "Burst pipes, major leaks and blocked drains are handled day or night. Our plumbers respond quickly to stop the damage, make your site safe and get your facilities working again.",
      },
    ],
    image: "/images/services/commercial-plumbing-service.webp",
    iconName: "Droplets",
  },
  {
    id: "air-conditioning-repairs",
    name: "Air Conditioning Repairs",
    shortDesc: "Repairs, servicing and maintenance for commercial split, ducted and VRF systems by ARC licensed technicians, available 24/7.",
    longDesc: [
      "When the air conditioning fails, productivity drops and customers notice. Our ARC licensed technicians diagnose and repair commercial split, ducted and VRF systems of all makes and models, with 24/7 emergency response across Sydney, Wollongong, Central Coast and surrounding areas.",
      "Regular servicing keeps your systems efficient, lowers energy bills and extends equipment life. We clean coils and filters, check refrigerant levels, test controls and provide clear service reports, along with practical advice on improving efficiency across your site.",
    ],
    bullets: [
      {
        text: "ARC Licensed Technicians",
        desc: "All refrigerant work is carried out by technicians holding an Australian Refrigeration Council licence, so your systems are repaired safely, legally and to industry standards.",
      },
      {
        text: "All Makes & Models",
        desc: "Whatever brand or system you have, our technicians have the knowledge to diagnose and repair it. There's no need to find a different specialist for each unit on your site.",
      },
      {
        text: "Split, Ducted & VRF Expertise",
        desc: "From single split systems in small offices to large ducted and VRF systems in multi-level buildings, we service, repair and maintain the full range of commercial air conditioning.",
      },
      {
        text: "Energy Efficiency Expertise",
        desc: "Poorly maintained systems use more power and work harder than they should. We tune, clean and optimise your equipment and recommend practical improvements that reduce running costs.",
      },
      {
        text: "24/7 Emergency Response",
        desc: "An air conditioning failure on a hot day can't wait. Our technicians respond around the clock to restore comfort for your staff and customers as quickly as possible.",
      },
    ],
    image: "/images/services/commercial-air-conditioning-service.webp",
    iconName: "AirVent",
  },
  {
    id: "other-services",
    name: "Other Services",
    shortDesc: "Carpentry, painting, flooring, roofing, cleaning, pest control, landscaping and more, available as one-off jobs or ongoing plans.",
    longDesc: [
      "Alongside our core trades, we offer a full range of additional services to keep your property in good condition. This includes carpentry, painting, flooring, roofing, cleaning, pest control, landscaping, gardening and security, across Sydney, Wollongong, Central Coast and surrounding areas.",
      "Each service can be booked on its own, whether you need a single repair or a regular visit. They can also be added to a commercial property maintenance plan, so everything your site needs is looked after in one place.",
    ],
    bullets: [
      {
        text: "Qualified Tradespeople",
        desc: "Every job is carried out by qualified, experienced tradespeople who understand commercial properties and work to a professional standard on site.",
      },
      {
        text: "Australian Standards Compliant",
        desc: "All work is completed in line with the relevant Australian standards and building requirements, so you can be confident in the quality and safety of the finished job.",
      },
      {
        text: "Multi Trade Expertise",
        desc: "From repairing a damaged ceiling to repainting an office or replacing worn flooring, we cover a wide range of trades, so one booking can take care of the whole job.",
      },
      {
        text: "Property Upkeep Specialists",
        desc: "Regular cleaning, gardening, pest control and minor repairs keep your property safe, presentable and well protected, and stop small issues from turning into costly ones.",
      },
      {
        text: "Scheduled & On Call Services",
        desc: "Book a one-off job when you need it, or set up recurring visits on a schedule that suits your business. Either way, the work is arranged around your operating hours.",
      },
    ],
    image: "/images/services/trades.webp",
    iconName: "Hammer",
  },
];