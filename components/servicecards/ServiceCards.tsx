"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Wrench, CheckCircle2 } from 'lucide-react';
import { Card3DHover } from '@/components/ui/SimpleAnimations';
import { services } from '@/lib/servicesData';
import type { LucideIcon } from 'lucide-react';


// ─── Icon Map ────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
    ShieldCheck, Zap, Wrench,
};

export default function ServiceCards({ cardClassName = 'bg-base' }: { cardClassName?: string }) {
    return (
        /*
         * items-stretch (grid default) makes every card fill its row height.
         * Each card is a flex column; `mt-auto` on the Learn More row pushes
         * it to the bottom — so all buttons align on desktop where cards sit
         * side-by-side. On mobile each card is its own height, button sits
         * naturally after the text. Zero JS, original spacing preserved.
         */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => {
                const Icon = iconMap[service.iconName];
                return (
                    <Card3DHover key={service.id}>
                        <motion.div
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
                            className={`${cardClassName} h-full flex flex-col p-8 border-[length:var(--border-width)] border-[color:var(--border)] transition-all duration-[var(--transition-base)]`}
                        >
                            {/* Service icon — teal */}
                            <div className="icon-wrapper text-[var(--color-accent)] mb-7 transition-transform duration-[var(--transition-base)] origin-left">
                                {Icon && <Icon aria-hidden="true" className="w-8 h-8 stroke-1" />}
                            </div>

                            {/* Service name */}
                            <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] mb-3 text-left leading-snug">
                                {service.name}
                            </h3>

                            {/* Short description */}
                            <p className="text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)] mb-7 text-left">
                                {service.shortDesc}
                            </p>

                            {/* Service Features */}
                            <p className="text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-[var(--text-primary)] mb-4">
                                Service Features
                            </p>
                            <ul className="space-y-2.5 mb-7">
                                {service.bullets.map((bullet, idx) => (
                                    <li key={idx} className="flex items-center gap-2.5">
                                        <CheckCircle2
                                            className="w-4 h-4 text-[var(--color-accent)] shrink-0"
                                            aria-hidden="true"
                                        />
                                        <span className="text-[var(--text-secondary)] text-xs leading-snug">
                                            {bullet.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Learn more — mt-auto keeps it pinned to bottom */}
                            <Link
                                href={`/services?tab=${service.id}`}
                                aria-label={`Learn more about ${service.name}`}
                                className="mt-auto inline-flex items-center self-start text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-[var(--text-primary)] hover:text-[var(--text-accent)] transition-colors duration-[var(--transition-fast)] border-b md:border-b-2 border-current pb-0.5"
                            >
                                Learn more<span className="sr-only"> about {service.name}</span>
                            </Link>
                        </motion.div>
                    </Card3DHover>
                );
            })}
        </div>
    );
}
