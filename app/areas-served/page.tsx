"use client";

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import QuickContact from '@/components/contact/QuickContact';
import Button from '@/components/ui/Button';
import { Card3DHover } from '@/components/ui/SimpleAnimations';
import PageBanner from '@/components/ui/PageBanner';
import { PAGE_BANNERS } from '@/lib/pageBannerData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const REGIONS = [
  {
    name: "Sydney",
    suburbs: ["Eastern Suburbs", "Northern Beaches", "North Shore", "Inner West", "Western Sydney", "South Sydney"],
  },
  {
    name: "Wollongong",
    suburbs: ["Wollongong CBD", "Port Kembla", "Unanderra", "Fairy Meadow", "Coniston", "Albion Park Rail"],
  },
  {
    name: "Central Coast",
    suburbs: ["Gosford", "West Gosford", "Somersby", "Tuggerah", "Warnervale", "Erina"],
  },
  {
    name: "Blue Mountains",
    suburbs: ["Katoomba", "Springwood", "Leura", "Wentworth Falls", "Lawson", "Glenbrook"],
  },
  {
    name: "Southern Highlands",
    suburbs: ["Moss Vale", "Bowral", "Mittagong", "Braemar", "Bundanoon", "Berrima"],
  },
  {
    name: "Hawkesbury",
    suburbs: ["Richmond", "Windsor", "South Windsor", "North Richmond", "Mulgrave", "Pitt Town"],
  },
];

export default function AreasServedPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const revealSections = gsap.utils.toArray('.scroll-reveal');
      revealSections.forEach((section: any) => {
        gsap.from(section.children, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        });
      });
    },
    { scope: container }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-base-secondary min-h-screen pb-20"
      ref={container}
    >
      <PageBanner {...PAGE_BANNERS.areasServed} />

      {/* Regions Grid */}
      <SectionWrapper>
        <div className="scroll-reveal">
          <div className="mb-14">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-4">
              Where We Operate
            </h2>
            <p className="text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)]">
              From the regions and suburbs below to the areas surrounding them, our helpdesk, technicians and trade partners have you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {REGIONS.map((region, index) => (
              <Card3DHover key={region.name}>
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
                  className="card text-left h-full"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)] mb-5">
                    {region.name}
                  </h3>
                  <ul className="space-y-2">
                    {region.suburbs.map((suburb) => (
                      <li key={suburb} className="flex items-center gap-3">
                        <CheckCircle2
                          className="w-5 h-5 text-[var(--color-accent)] shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)]">
                          {suburb}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Card3DHover>
            ))}
          </div>

          <Link href="/contact">
            <Button variant="primary">Get a Free Quote</Button>
          </Link>
        </div>
      </SectionWrapper>

      {/* Not Listed CTA + Quick Contact */}
      <SectionWrapper>
        <div className="scroll-reveal">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-4">
            Don&apos;t See Your Suburb?
          </h2>
          <p className="text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)]">
            Our service network covers all areas across Sydney, Wollongong, Central Coast and surrounding regions. If your location isn&apos;t listed above, get in touch, chances are we&apos;ve already got you covered.
          </p>
        </div>
        {/* Outside .scroll-reveal: QuickContact reveals its own cards
            individually now (per-card whileInView, like ServiceCards), so
            wrapping it would double-animate them. */}
        <QuickContact />
      </SectionWrapper>
    </motion.div>
  );
}
