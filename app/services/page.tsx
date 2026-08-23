"use client";

import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent, useTabs } from '@/components/ui/Tabs';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import { services } from '@/lib/servicesData';
import PageBanner from '@/components/ui/PageBanner';
import { PAGE_BANNERS } from '@/lib/pageBannerData';

// Derive valid tab IDs dynamically from the data source
const VALID_TABS = services.map(s => s.id);

/**
 * Applies ?tab=<id> to the surrounding <Tabs>. Renders nothing.
 *
 * This is deliberately the ONLY component on the page that calls
 * useSearchParams(). That hook forces everything up to the nearest <Suspense>
 * to bail out of prerendering, so keeping it isolated here means the whole
 * tab section — image, headings, copy, bullets — still ships in the static
 * HTML. Previously useSearchParams sat in ServicesContent, which bailed out
 * the entire section: the static HTML contained only a zero-height
 * BAILOUT_TO_CLIENT_SIDE_RENDERING placeholder, the footer rendered directly
 * under the banner, and hydration then pushed it ~1000px down — CLS 0.287.
 *
 * Do not move useSearchParams back up into the page component.
 */
function TabFromQuery() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const { setActiveTab } = useTabs();

  useEffect(() => {
    if (tab && VALID_TABS.includes(tab)) setActiveTab(tab);
  }, [tab, setActiveTab]);

  return null;
}

function ServicesContent() {
  return (
    <SectionWrapper>
      <Tabs defaultValue={services[0].id}>
        <Suspense fallback={null}>
          <TabFromQuery />
        </Suspense>
        <TabsList className="flex justify-start">
          {services.map(s => (
            <TabsTrigger key={s.id} value={s.id}>{s.name}</TabsTrigger>
          ))}
        </TabsList>

        {services.map(s => (
          <TabsContent key={s.id} value={s.id}>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-start">
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
                  <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--text-primary)] mb-5">
                    Service Features
                  </h3>
                  <ul className="space-y-6 mb-8">
                    {s.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-5 h-5 mt-0.5 text-[var(--color-accent)] shrink-0"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-[var(--text-primary)] text-sm font-medium leading-[var(--leading-snug)] mb-1.5">
                            {bullet.text}
                          </p>
                          <p className="text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)]">
                            {bullet.desc}
                          </p>
                        </div>
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
  );
}

export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-base-secondary"
    >
      <PageBanner {...PAGE_BANNERS.services} />
      <ServicesContent />
    </motion.div>
  );
}
