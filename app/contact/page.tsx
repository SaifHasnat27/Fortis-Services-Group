"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import ContactForm from '@/components/forms/ContactForm';
import QuickContact from '@/components/contact/QuickContact';
import FAQSection from '@/components/servicecards/faq';
import { BUSINESS } from '@/lib/constants';
import PageBanner from '@/components/ui/PageBanner';
import { PAGE_BANNERS } from '@/lib/pageBannerData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ContactPage() {
  const container = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  // ---- Existing scroll-reveal for sections that still use the class ----
  useGSAP(() => {
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
  }, { scope: container });

  // ---- GSAP timeline for the form + info cards (the "wow" moment) ----
  useGSAP(
    () => {
      if (!formSectionRef.current) return;

      // Respect reduced motion: if user prefers reduced motion, just set elements visible immediately
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          isDesktop: `(min-width: ${BUSINESS.mobileBreakpoint + 1}px)`,
        },
        (ctx) => {
          const { reduceMotion } = ctx.conditions!;
          const formCard = (formSectionRef.current as HTMLElement).querySelector('.form-card');
          const infoCards = (formSectionRef.current as HTMLElement).querySelectorAll('.info-card');

          if (!formCard) return;

          if (reduceMotion) {
            // Zero duration – elements appear instantly
            gsap.set([formCard, ...infoCards], { opacity: 1, x: 0, rotationY: 0 });
            return;
          }

          // Build the timeline
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });

          // Form card glides in from the left
          tl.fromTo(
            formCard,
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
            0
          );

          // Info cards swoop in from the right with a subtle 3D twist, staggered
          if (infoCards.length) {
            tl.fromTo(
              infoCards,
              { x: 60, opacity: 0, rotationY: 15 },
              {
                x: 0,
                opacity: 1,
                rotationY: 0,
                duration: 0.75,
                ease: 'back.out(1.2)',
                stagger: 0.12,
                clearProps: 'transform', // clean up inline styles after animation
              },
              '-=0.3' // overlap slightly for fluidity
            );
          }

          // Add will-change during animation, then remove it
          tl.set([formCard, ...infoCards], { willChange: 'transform' }, 0);
          tl.set([formCard, ...infoCards], { willChange: 'auto' });
        },
        formSectionRef.current // scope so selectors are local (optional but good practice)
      );

      return () => mm.revert(); // clean up matchMedia on unmount
    },
    { scope: formSectionRef }
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
      <PageBanner {...PAGE_BANNERS.contact} />

      {/* QuickContact – keeps the default scroll-reveal */}
      <SectionWrapper noPadding>
        <div className="scroll-reveal">
          <QuickContact />
        </div>
      </SectionWrapper>

      {/* Form + Info Section – now with custom GSAP entrance */}
      <SectionWrapper>
        <div
          ref={formSectionRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* Form Card */}
          <div className="lg:col-span-8 card !p-10 md:!p-12 form-card hover:border-[var(--border-dark)] transition-colors duration-[var(--transition-fast)]">
            <p className="text-[0.6875rem] font-medium tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
              We’re Here to Help.
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em] mb-8 text-[var(--text-primary)]">
              Get a Free Quote
            </h2>
            <ContactForm />
          </div>

          {/* Info Side */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="card info-card hover:border-[var(--border-dark)] transition-colors duration-[var(--transition-fast)]">
              <div className="flex items-center gap-3 mb-5">
                <Clock aria-hidden="true" className="w-4 h-4 text-[var(--text-muted)]" />
                <p className="text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-[var(--text-muted)]">
                  Opening Hours
                </p>
              </div>
              <p className="text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)] mb-4">
                Our office hours, with around-the-clock emergency coverage.
              </p>
              <div className="p-4 bg-base-secondary border border-[var(--border)] flex flex-col gap-3">
                <p className="text-sm text-[var(--text-primary)] font-medium tracking-wide">{BUSINESS.openingHours.weekdays}</p>
                <p className="text-sm text-[var(--text-primary)] font-medium tracking-wide">{BUSINESS.openingHours.emergency}</p>
              </div>
            </div>

            <div className="card info-card hover:border-[var(--border-dark)] transition-colors duration-[var(--transition-fast)]">
              <div className="flex items-center gap-3 mb-5">
                <MapPin aria-hidden="true" className="w-4 h-4 text-[var(--text-muted)]" />
                <p className="text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-[var(--text-muted)]">
                  Service Area
                </p>
              </div>
              <p className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] leading-snug">
                {BUSINESS.serviceArea}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ – untouched, still using scroll-reveal */}
      <SectionWrapper>
        <div className="scroll-reveal">
          <FAQSection />
        </div>
      </SectionWrapper>
    </motion.div>
  );
}