"use client";

import React, { useRef } from 'react';
import { getImageProps } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { Shield, Heart, ClipboardCheck, MessageSquare } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { BUSINESS } from '@/lib/constants';
import PageBanner from '@/components/ui/PageBanner';
import { PAGE_BANNERS } from '@/lib/pageBannerData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const VALUES = [
  {
    title: "Reliability",
    desc: "When something breaks down in a commercial environment, every hour counts. We show up, we follow through, and we keep you informed at every step. No chasing, no ambiguity.",
    icon: Shield,
  },
  {
    title: "Transparency",
    desc: "We believe businesses deserve clear communication and honest pricing. No hidden call-out fees, no vague invoices. You know what you're getting before we start and after we finish.",
    icon: Heart,
  },
  {
    title: "Accountability",
    desc: "Every job is done with quality and care. We coordinate every trade, track every compliance obligation, and take ownership of outcomes, not just individual tasks.",
    icon: ClipboardCheck,
  },
];

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);

  // --- Reusable image props (placeholder images – replace with real fencing/glass photos later) ---
  const commonImageProps = {
    alt: "Fortis Services Group commercial asset maintenance and trade services",
    fill: true,
    sizes: "(max-width: 767px) 100vw, 50vw",
  };
  const {
    props: { srcSet: desktopStoryImageSrcSet, ...desktopStoryImageRest },
  } = getImageProps({ ...commonImageProps, src: '/images/about/our-story-desktop.webp' });
  const {
    props: { srcSet: mobileStoryImageSrcSet },
  } = getImageProps({ ...commonImageProps, src: '/images/about/our-story-mobile.webp' });
  const {
    props: { srcSet: desktopPracticeImageSrcSet, ...desktopPracticeImageRest },
  } = getImageProps({ ...commonImageProps, src: '/images/about/our-practice-desktop.webp' });
  const {
    props: { srcSet: mobilePracticeImageSrcSet },
  } = getImageProps({ ...commonImageProps, src: '/images/about/our-practice-mobile.webp' });

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
      className="w-full"
      ref={container}
    >
      <PageBanner {...PAGE_BANNERS.about} />

      {/* Our Story – two‑column with image */}
      <SectionWrapper className="bg-base-secondary">
        <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-8">
              Built on the Belief That Maintenance Should Never Be a Distraction
            </h2>
            <div className="prose prose-stone text-[var(--text-secondary)] font-light leading-relaxed space-y-6 text-sm">
              <p>
                Most businesses spend more time managing maintenance than they realise. Chasing different contractors, re-explaining the same problem, juggling separate invoices for plumbing, electrical and refrigeration — it adds up. Fortis Services Group was built to remove that friction entirely.
              </p>
              <p>
                We operate as a single point of contact for asset compliance, reactive maintenance and integrated trade services across Sydney, Wollongong, Central Coast & surrounds. Whether you manage a hospitality venue, a manufacturing facility, a high-rise office or an aged care home, we take the coordination off your plate and give you confidence that your site is covered.
              </p>
              <p>
                Our team works with vetted, qualified tradespeople and manages every job from request through to resolution. You focus on your business. We handle the rest.
              </p>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[5/4] rounded-[var(--radius-card)] overflow-hidden">
            <picture>
              <source media={`(max-width: ${BUSINESS.mobileBreakpoint}px)`} srcSet={mobileStoryImageSrcSet} />
              <source media={`(min-width: ${BUSINESS.mobileBreakpoint + 1}px)`} srcSet={desktopStoryImageSrcSet} />
              <img
                {...desktopStoryImageRest}
                decoding="async"
                className="object-cover"
              />
            </picture>
          </div>
        </div>
      </SectionWrapper>

      {/* Our Values – left‑aligned cards */}
      <SectionWrapper className="bg-base-secondary">
        <div className="scroll-reveal">
          <div className="mb-14">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="card text-left">
                  <div className="w-14 h-14 rounded-full bg-base-secondary flex items-center justify-center mb-7">
                    <Icon className="w-5 h-5 text-[var(--text-primary)]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)] mb-3">
                    {val.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)]">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Our Process (was "Our Practice") */}
      <SectionWrapper className="bg-base-secondary">
        <div className="scroll-reveal flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Mobile-only header */}
          <h2 className="lg:hidden font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-8">
            Our Process: You Reach Out. We Handle the Rest.
          </h2>

          {/* Image */}
          <div className="relative aspect-square md:aspect-[5/4] rounded-[var(--radius-card)] overflow-hidden mb-16 lg:mb-0">
            <picture>
              <source media={`(max-width: ${BUSINESS.mobileBreakpoint}px)`} srcSet={mobilePracticeImageSrcSet} />
              <source media={`(min-width: ${BUSINESS.mobileBreakpoint + 1}px)`} srcSet={desktopPracticeImageSrcSet} />
              <img
                {...desktopPracticeImageRest}
                decoding="async"
                className="object-cover"
              />
            </picture>
          </div>

          {/* Content */}
          <div>
            {/* Desktop-only header */}
            <h2 className="hidden lg:block font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-8">
              Our Process: You Reach Out. We Handle the Rest.
            </h2>
            <div className="prose prose-stone text-[var(--text-secondary)] font-light leading-relaxed mb-8 space-y-4 text-sm">
              <p>
                We make commercial asset maintenance simple, transparent and genuinely effortless to manage.
              </p>
              <p>
              <strong className="font-semibold text-[var(--text-primary)]">How It Works:</strong>
              </p>
              <p>
                1. A single call or email to our helpdesk. We log your request, assess the priority, and decide whether it is a scheduled inspection or an urgent breakdown.
              </p>
              <p>
                2. Our network of qualified, vetted tradespeople is dispatched to your site. We keep you updated in real time, no back and forth, no chasing.
              </p>
              <p>
                3. Every job is closed with a service report. Compliance obligations are tracked, recurring issues are flagged, and your asset register stays current.
              </p>
            </div>
            <a
              href="/contact"
              className="block group"
            >
              <div className="flex items-center gap-4 p-6 bg-base rounded-[var(--radius-card)] border border-[var(--border)] transition-all duration-[var(--transition-base)] hover:border-[var(--accent)] hover:shadow-md cursor-pointer">
                <MessageSquare className="w-6 h-6 text-[var(--accent)] shrink-0 transition-transform group-hover:scale-110" />
                <div>
                  <h3 className="font-medium text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                    Request a Free Quote
                  </h3>
                  <p className="text-[var(--text-secondary)] font-light text-sm">
                    Tell us about your site and requirements. We will get back to you within 24 hours.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </SectionWrapper>
    </motion.div>
  );
}