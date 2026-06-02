"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from '@/components/ui/Button';
import SectionWrapper from '@/components/ui/SectionWrapper';
import QuickContact from '@/components/contact/QuickContact';
import GalleryLightbox from '@/components/ui/GalleryLightbox';
import TestimonialsCarousel from '@/components/ui/TestimonialsCarousel';
import HeroBanner from '@/components/ui/HeroBanner';
import { BUSINESS } from '@/lib/constants';
import { Carousel } from '@/components/ui/Carousel';
import ServiceCards from '@/components/servicecards/ServiceCards';
import Collections from '@/components/ui/Collections';
import FAQ from '@/components/servicecards/faq';
import ContactForm from '@/components/forms/ContactForm';
import PageContactForm from '@/components/forms/PageContactForm';
import HomeSpecialty from '@/components/layout/HomeSpecialty';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const GALLERY_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
  (n) => `/images/ig/${n}.webp`
);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BUSINESS.mobileBreakpoint}px)`);
    setIsMobile(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const prevImage = useCallback(() =>
    setSelectedIndex((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)),
    []
  );
  const nextImage = useCallback(() =>
    setSelectedIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length)),
    []
  );

  useGSAP(() => {
    const revealSections = gsap.utils.toArray('.scroll-reveal');
    revealSections.forEach((section: any) => {
      gsap.from(section.children, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      });
    });
  }, { scope: container });


  return (
    <>
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

        {/* 3. Specialty Section */}
        <HomeSpecialty />


        {/* 5. Google Reviews */}
        <TestimonialsCarousel />

        {/* 6. Book an Appointment (Contact Form) */}
        <SectionWrapper id="contact-form" className="bg-base-secondary">
          <div className="scroll-reveal">
            <div className="card !p-10 md:!p-12 hover:border-[var(--border-dark)] transition-colors duration-[var(--transition-fast)]">
              <p className="text-[0.6875rem] font-medium tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
                We’re Here to Help
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em] mb-8 text-[var(--text-primary)]">
                Get a Free Quote
              </h2>
              {isMobile ? <ContactForm /> : <PageContactForm />}
            </div>
          </div>
        </SectionWrapper>

        {/* 8. FAQ */}
        <SectionWrapper id="faq" className="bg-base-secondary">
          <div className="scroll-reveal">
            <FAQ />
          </div>
        </SectionWrapper>
      </div>

      {/* 9. Quick Contacts */}
      <SectionWrapper className="bg-base-secondary" id="quick-contact">
        <div className="scroll-reveal">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] mb-3 text-left">Get in Touch</h2>
          <p className="text-[var(--text-secondary)] font-light text-sm leading-relaxed mb-0 text-left max-w-sm">Reach out to us to secure your appointment.</p>
          <QuickContact />
        </div>
      </SectionWrapper>



      <GalleryLightbox
        images={GALLERY_IMAGES}
        selectedIndex={selectedIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  );
}