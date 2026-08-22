"use client";

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import SectionWrapper from '@/components/ui/SectionWrapper';
import QuickContact from '@/components/contact/QuickContact';
import TestimonialsCarousel from '@/components/ui/TestimonialsCarousel';
import HeroBanner from '@/components/ui/HeroBanner';
import ServiceCards from '@/components/servicecards/ServiceCards';
import FAQ from '@/components/servicecards/faq';
const PageContactForm = dynamic(() => import('@/components/forms/PageContactForm'), {
  ssr: false,
});
import HomeSpecialty from '@/components/layout/HomeSpecialty';
import ICP from '@/components/servicecards/icp';
import WhyUs from '@/components/servicecards/whyUs';

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div ref={container} className="w-full">

      {/* 1. Hero */}
      <HeroBanner />

      {/* 2. Our Services */}
      <SectionWrapper className="bg-base-secondary" id="services-preview">
        <div className="scroll-reveal">
          <div className="mb-14">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-left">Our Services</h2>
          </div>
          <ServiceCards />
        </div>
      </SectionWrapper>

      {/* 3. Who We Work With */}
      <ICP />

      {/* 4. Specialty Section */}
      <HomeSpecialty />

      {/* 5. Why Choose Us */}
      <WhyUs />

      {/* 6. Google Reviews */}
      <TestimonialsCarousel />

      {/* 7. Contact Form */}
      <SectionWrapper id="contact-form" className="bg-base-secondary">
        <div className="scroll-reveal">
          <div className="card !p-10 md:!p-12 hover:border-[var(--border-dark)] transition-colors duration-[var(--transition-fast)]">
            <p className="text-[0.6875rem] font-medium tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
              We're Here to Help
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em] mb-8 text-[var(--text-primary)]">
              Get a Free Quote
            </h2>
            <PageContactForm />
          </div>
        </div>
      </SectionWrapper>

      {/* 7. FAQs */}
      <SectionWrapper id="faq" className="bg-base-secondary">
        <div className="scroll-reveal">
          <FAQ />
        </div>
      </SectionWrapper>

      {/* 8. Quick Contact */}
      <SectionWrapper className="bg-base-secondary" id="quick-contact">
        <div className="scroll-reveal">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] mb-3 text-left">Get in Touch</h2>
          <QuickContact />
        </div>
      </SectionWrapper>

    </div>
  );
}
