"use client";

import SectionWrapper from '@/components/ui/SectionWrapper';
import { motion } from 'framer-motion';
import { PhoneCall, ClipboardCheck, BadgeDollarSign, FileText, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ─── Why Us Data ──────────────────────────────────────────────────────────────
const WHY_US: {
  id: number;
  sector: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    id: 1,
    sector: "One Point of Contact",
    detail: "No more chasing multiple contractors. We coordinate all your trades and provide one simple invoice for every job.",
    icon: PhoneCall,
  },
  {
    id: 2,
    sector: "Compliance Management",
    detail: "We track your mandatory inspections, certifications, and deadlines so you never miss a compliance requirement.",
    icon: ClipboardCheck,
  },
  {
    id: 3,
    sector: "Competitive Tailored Pricing",
    detail: "No rigid contracts. We build competitive, custom maintenance plans that fit your specific property type, equipment, and budget.",
    icon: BadgeDollarSign,
  },
  {
    id: 4,
    sector: "Full Transparency",
    detail: "Itemised quotes and detailed service reports for every job. You'll always know exactly what you're paying for.",
    icon: FileText,
  },
  {
    id: 5,
    sector: "24/7 Emergency Support",
    detail: "Breakdowns don't wait for business hours. Neither do we. Our helpdesk is available around the clock for urgent repairs.",
    icon: Clock,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function WhyUs() {
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
          Why Choose Us
        </h2>
      </motion.div>

      {/* Cards — each has its own whileInView observer so on mobile
          each card fires individually as it scrolls into view         */}
      <div className="flex flex-col gap-4">
        {WHY_US.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
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
                  {item.sector}
                </h3>
              </div>

              {/* Detail zone */}
              <div className="bg-base flex items-center px-7 pt-2 pb-5 md:py-7">
                <p className="text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)]">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

    </SectionWrapper>
  );
}
