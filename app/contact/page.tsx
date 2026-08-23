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
      }
      // No scope argument needed: useGSAP's { scope: container } below already
      // scopes selector text to this page.
    );

    // No mm.revert() here — useGSAP reverts its context (matchMedia included)
    // on unmount automatically.
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

          /* will-change is applied here, up front, rather than as a tl.set() at
             position 0. A set inside the timeline fires on the same frame as
             the first animated frame — too late for the browser to promote the
             layer, so it was close to a no-op. Each tween's
             clearProps: 'transform,willChange' removes it once the card lands,
             so the hint never outlives the animation. */
          gsap.set(cards, { willChange: 'transform' });

          if (isDesktop) {
            /* Desktop: all three cards are visible together in a 12-col grid,
               so one shared trigger and one timeline is right — the stagger
               reads as a single choreographed entrance.

               toggleActions was 'play none none reverse', which fought the
               clearProps below: clearProps strips the inline transform the
               moment the tween finishes, so scrolling back up asked GSAP to
               reverse a transform it had just wiped. Worse for a contact form,
               reversing re-hides the card (autoAlpha: 0 -> visibility: hidden)
               if the user scrolls up mid-typing. Play once and stay put.

               refreshPriority: this section sits in the MIDDLE of the page, but
               its ScrollTrigger is created in the second useGSAP hook — after
               the first hook has already created the FAQ trigger below it.
               ScrollTrigger refreshes in creation order unless told otherwise.
               Lower numbers refresh first; -1 pulls this one ahead of the
               default-0 .scroll-reveal triggers. */
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: root,
                start: 'top 80%',
                toggleActions: 'play none none none',
                refreshPriority: -1,
              },
            });

            // Form card glides in from the left
            tl.fromTo(
              formCard,
              { x: -60, autoAlpha: 0 },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'transform,willChange',
              },
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
                  // clearProps drops the inline transform AND the will-change
                  // hint once the card has landed, so neither lingers on an
                  // element that is now static.
                  clearProps: 'transform,willChange',
                },
                '-=0.3' // overlap slightly for fluidity
              );
            }
          } else {
            /* Mobile: one column, so the three cards are far apart vertically.
               A single shared trigger on the wrapper fired all three at
               'top 80%' — meaning the two info cards finished animating while
               still well below the fold, and you scrolled down to find them
               already static. Give each card its OWN trigger instead, so each
               reveals as it comes into view. Same approach as the QuickContact
               cards and ServiceCards.

               No stagger/delay here: with per-card triggers the scroll itself
               provides the offset, and an added delay would just make a card
               sit visible-but-unanimated for a moment after entering view. */
            cards.forEach((card, i) => {
              gsap.fromTo(
                card,
                { y: 40, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.8,
                  ease: 'power2.out',
                  clearProps: 'transform,willChange',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 85%', // matches .scroll-reveal elsewhere
                    toggleActions: 'play none none none',
                    // Lower refreshes first, so ascending values keep the
                    // refresh order top-to-bottom down the column. Starts at
                    // -3 so all three still sit ahead of the default-0
                    // .scroll-reveal trigger on the FAQ below.
                    refreshPriority: -3 + i,
                  },
                }
              );
            });
          }
        }
        // No scope argument: useGSAP's { scope: formSectionRef } below covers it.
      );

      // No mm.revert() here — useGSAP handles context cleanup on unmount.
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

      {/* QuickContact.
          The h2 is visually hidden: the other pages that use QuickContact
          (home, areas-served) each have a visible h2 above it, so its
          internal h3s sit correctly. This page has no visible section
          heading by design, so a screen-reader-only h2 keeps the heading
          outline sequential (h1 -> h2 -> h3) without changing the layout. */}
      <SectionWrapper noPadding>
        {/* No .scroll-reveal wrapper here any more: QuickContact now reveals
            its own cards individually (per-card whileInView, like ServiceCards).
            Leaving the wrapper on would fade the whole block in first and then
            fade each card again on top of it — a visible double animation. */}
        <div>
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