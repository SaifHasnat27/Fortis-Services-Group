"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import { BUSINESS } from '@/lib/constants';
import { services } from '@/lib/servicesData';
import PageBanner from '@/components/ui/PageBanner';
import { PAGE_BANNERS } from '@/lib/pageBannerData';

// Derive valid tab IDs dynamically from the data source
const VALID_TABS = services.map(s => s.id);

export default function ServicesPage() {
  const [defaultTab, setDefaultTab] = useState(services[0].id);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (VALID_TABS.includes(hash)) {
        setDefaultTab(hash);
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-base-secondary"
    >
      <PageBanner {...PAGE_BANNERS.services} />

      <SectionWrapper>
        <Tabs defaultValue={defaultTab} className="max-w-4xl">
          <TabsList className="flex justify-start">
            {services.map(s => (
              <TabsTrigger key={s.id} value={s.id}>{s.name}</TabsTrigger>
            ))}
          </TabsList>

          {services.map(s => (
            <TabsContent key={s.id} value={s.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-[4/5] rounded-[var(--radius-card)] overflow-hidden">
                  <Image src={s.image} alt={s.name} fill className="object-cover" />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-6">
                    {s.name}
                  </h2>
                  <div className="mb-8">
                    {s.longDesc.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={`text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)] ${idx < s.longDesc.length - 1 ? 'mb-4' : 'mb-6'}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                    <ul className="space-y-3 mb-8">
                      {s.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                          <span className="text-[var(--text-primary)] text-sm leading-[var(--leading-relaxed)]">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href="/contact">
                    <Button variant="primary">Get a Free Quote</Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </SectionWrapper>
    </motion.div>
  );
}
