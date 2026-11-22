"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Card3DHover } from '@/components/ui/SimpleAnimations';

// Card flow: icon → title → detail (the actual number / email / channel) → link.
const contacts = [
  {
    name: "Call",
    detail: BUSINESS.phone,
    icon: <Phone aria-hidden="true" className="w-8 h-8 stroke-1" />,
    href: `tel:${BUSINESS.phoneRaw}`,
  },
  {
    name: "Email",
    detail: BUSINESS.email,
    icon: <Mail aria-hidden="true" className="w-8 h-8 stroke-1" />,
    href: `mailto:${BUSINESS.email}`,
  },
  {
    name: "WhatsApp",
    detail: "Text Online",
    icon: <MessageCircle aria-hidden="true" className="w-8 h-8 stroke-1" />,
    href: BUSINESS.whatsappLink,
  },
];

export default function QuickContact({ cardClassName = 'bg-base' }: { cardClassName?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
      {contacts.map((contact, index) => (
        <Card3DHover key={contact.name}>
          {/* Per-card reveal, matching ServiceCards. Each card carries its own
              whileInView trigger, so in the single-column mobile layout they
              animate one by one as each scrolls into view — rather than all
              firing together off a single wrapper trigger. On desktop the
              index delay reads as a quick left-to-right sweep.
              once: true so they never re-animate on scroll-up. */}
          <motion.div
            className="h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.08, duration: 0.5 },
              },
            }}
          >
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group
                flex flex-col
                h-full
                ${cardClassName}
                p-8
                border border-[var(--border)]
                transition-all duration-[var(--transition-base)]
              `}
            >
              {/* Icon + title on one row */}
              <div className="flex items-center gap-4">
                <div className="icon-wrapper text-[var(--text-primary)] shrink-0 transition-transform duration-[var(--transition-base)] origin-left">
                  {contact.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[var(--text-primary)] text-[1.5rem] text-left leading-snug">
                  {contact.name}
                </h3>
              </div>

              {/* Detail: close to its title (8px) so they read as one pair; softer than the title */}
              <p className="mt-7 text-[var(--text-secondary)] text-base text-left break-words">
                {contact.detail}
              </p>
              {/* mt-auto keeps the link aligned at the bottom across cards */}
              <div className="mt-auto pt-7">
                <span className="inline-flex items-center text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-[var(--text-primary)] group-hover:text-[var(--text-accent)] transition-colors duration-[var(--transition-fast)] border-b md:border-b-2 border-current pb-0.5">
                  Contact now
                </span>
              </div>
            </a>
          </motion.div>
        </Card3DHover>
      ))}
    </div>
  );
}
