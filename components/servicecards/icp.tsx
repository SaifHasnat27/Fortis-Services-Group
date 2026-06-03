"use client";

import SectionWrapper from '@/components/ui/SectionWrapper';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Factory, Building2, HeartPulse, Store } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ─── ICP Data ─────────────────────────────────────────────────────────────────
const ICP_INDUSTRIES: {
  id: number;
  sector: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    id: 1,
    sector: "Hospitality",
    detail: "Kitchens, cool-rooms, HVAC and compliance, kept operational so your guests never notice a thing.",
    icon: UtensilsCrossed,
  },
  {
    id: 2,
    sector: "Manufacturing & Warehousing",
    detail: "Minimise production downtime with rapid reactive response and scheduled asset maintenance.",
    icon: Factory,
  },
  {
    id: 3,
    sector: "High-Rise Offices",
    detail: "End-to-end compliance, electrical, plumbing and building maintenance under one accountable contact.",
    icon: Building2,
  },
  {
    id: 4,
    sector: "Aged Care",
    detail: "Strict compliance schedules and rapid repairs managed with the sensitivity your environment demands.",
    icon: HeartPulse,
  },
  {
    id: 5,
    sector: "Retail & Commercial",
    detail: "Consistent quality and transparent reporting so your sites stay safe, compliant and presentable.",
    icon: Store,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ICP() {
  return (
    <SectionWrapper className="bg-base-secondary">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-14"
      >
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] max-w-2xl">
          Who We Work With
        </h2>
      </motion.div>

      {/* Industry cards — each has its own whileInView observer so on
          mobile each card fires individually as it scrolls into view   */}
      <div className="flex flex-col gap-4">
        {ICP_INDUSTRIES.map((industry, index) => {
          const Icon = industry.icon;
          return (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group grid grid-cols-1 md:grid-cols-[1fr_1.7fr] border-[length:var(--border-width)] border-[color:var(--border)] hover:border-[color:var(--border-dark)] transition-colors duration-[var(--transition-base)] overflow-hidden"
            >
              {/* Title zone */}
              <div className="bg-base flex items-center gap-4 px-7 py-4 pb-2 md:py-7">
                <Icon
                  aria-hidden="true"
                  className="w-6 h-6 stroke-[1.5] text-[var(--color-accent)] shrink-0 transition-transform duration-[var(--transition-base)] group-hover:scale-110 origin-left"
                />
                <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl font-medium text-[var(--text-primary)] leading-snug">
                  {industry.sector}
                </h3>
              </div>

              {/* Detail zone */}
              <div className="bg-base flex items-center px-7 pt-2 pb-5 md:py-7">
                <p className="text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)]">
                  {industry.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

    </SectionWrapper>
  );
}
