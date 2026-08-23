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
    /* Wrapped in matchMedia purely to honour prefers-reduced-motion. Users who
       set that OS preference often do so for vestibular disorders, where
       sliding content can cause real nausea — GSAP's guidance is to run the
       tween with duration: 0 rather than skip it, so the elements still end up
       visible (gsap.from starts them at autoAlpha: 0) but simply snap into
       place with no travel.

       For everyone else every value below is unchanged from before. */
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        normalMotion: '(prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const { reduceMotion } = ctx.conditions!;

        gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach((section) => {
          gsap.from(section.children, {
            y: reduceMotion ? 0 : 40,
            // autoAlpha over opacity: at 0 GSAP also sets visibility:hidden, so
            // a not-yet-revealed section can't swallow taps on mobile.
            autoAlpha: 0,
            stagger: reduceMotion ? 0 : 0.15,
            duration: reduceMotion ? 0 : 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 85%' },
          });
        });
      },
      container.current ?? undefined // scope selector text to this page
    );

    return () => mm.revert();
  }, { scope: container });

  // ---- GSAP timeline for the form + info cards (the "wow" moment) ----
  useGSAP(
    () => {
      if (!formSectionRef.current) return;

      /* One matchMedia, three named conditions.

         NOTE: an `isMobile` condition is REQUIRED here, not optional. GSAP only
         runs this handler when at least one condition matches. Previously the
         only conditions were `reduceMotion` and `isDesktop`, so on a phone
         (< 1024px, no reduced-motion preference) NOTHING matched, the handler
         never ran, and the form/info cards got no entrance at all — while
         QuickContact and the FAQ still animated via .scroll-reveal. That
         inconsistency is what this block fixes.

         Desktop keeps the full left/right glide with the 3D twist. Mobile is a
         single column, where sliding cards in horizontally and rotating them on
         Y reads badly and costs more compositing on weaker hardware — so mobile
         gets the same calm fade-up used by .scroll-reveal elsewhere on the page. */
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: `(min-width: ${BUSINESS.mobileBreakpoint + 1}px)`,
          isMobile: `(max-width: ${BUSINESS.mobileBreakpoint}px)`,
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { isDesktop, reduceMotion } = ctx.conditions!;
          const root = formSectionRef.current as HTMLElement;
          const formCard = root.querySelector('.form-card');
          const infoCards = root.querySelectorAll('.info-card');

          if (!formCard) return;

          const cards = [formCard, ...infoCards];

          if (reduceMotion) {
            // Vestibular safety: no motion at all, just make sure nothing is
            // left hidden by a previously-reverted tween.
            gsap.set(cards, { autoAlpha: 1, x: 0, y: 0, rotationY: 0 });
            return;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });

          if (isDesktop) {
            // Form card glides in from the left
            tl.fromTo(
              formCard,
              { x: -60, autoAlpha: 0 },
              { x: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' },
              0
            );

            // Info cards swoop in from the right with a subtle 3D twist, staggered
            if (infoCards.length) {
              tl.fromTo(
                infoCards,
                { x: 60, autoAlpha: 0, rotationY: 15 },
                {
                  x: 0,
                  autoAlpha: 1,
                  rotationY: 0,
                  duration: 0.75,
                  ease: 'back.out(1.2)',
                  stagger: 0.12,
                  clearProps: 'transform', // clean up inline styles after animation
                },
                '-=0.3' // overlap slightly for fluidity
              );
            }
          } else {
            // Mobile: one column, so a vertical fade-up matching .scroll-reveal
            // (y: 40 / stagger / power2.out) instead of horizontal slides.
            tl.fromTo(
              cards,
              { y: 40, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.15,
                clearProps: 'transform',
              },
              0
            );
          }

          // will-change only for the duration of the animation, per GSAP's
          // performance guidance — never leave it on permanently.
          tl.set(cards, { willChange: 'transform' }, 0);
          tl.set(cards, { willChange: 'auto' });
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

      {/* QuickContact – keeps the default scroll-reveal.
          The h2 is visually hidden: the other pages that use QuickContact
          (home, areas-served) each have a visible h2 above it, so its
          internal h3s sit correctly. This page has no visible section
          heading by design, so a screen-reader-only h2 keeps the heading
          outline sequential (h1 -> h2 -> h3) without changing the layout. */}
      <SectionWrapper noPadding>
        <div className="scroll-reveal">
          <h2 className="sr-only">Contact us directly</h2>
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