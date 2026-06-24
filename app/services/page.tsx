"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import { services } from '@/lib/servicesData';
import PageBanner from '@/components/ui/PageBanner';
import { PAGE_BANNERS } from '@/lib/pageBannerData';

// Derive valid tab IDs dynamically from the data source
const VALID_TABS = services.map(s => s.id);

function ServicesContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = tabParam && VALID_TABS.includes(tabParam) ? tabParam : services[0].id;

  return (
    <SectionWrapper>
      <Tabs key={activeTab} defaultValue={activeTab}>
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
      <Suspense fallback={null}>
        <ServicesContent />
      </Suspense>
    </motion.div>
  );
}
