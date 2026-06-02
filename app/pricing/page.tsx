"use client";

import React, { useRef } from 'react';
import { getImageProps } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { Phone, Mail, Camera } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Card3DHover } from '@/components/ui/SimpleAnimations';
import { BUSINESS } from '@/lib/constants';
import { categories, isSizeItem, type Category } from '@/lib/pricingData';
import type { SizeItem, FlatItem, PricingItem } from '@/lib/pricingData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const pillClass = `
  inline-block px-2 py-1.5
  text-[0.65rem] uppercase tracking-wider
  border border-[var(--border-light)]
  bg-[var(--bg-fourth)]
  text-[var(--text-secondary)]
`;

// All keys that represent a variant pill – easy to extend later
const VARIANT_KEYS = ['short', 'medium', 'long', 'boys', 'girls'] as const;

function CategorySection({ category }: { category: Category }) {
  return (
    <div className="category-section mb-16 last:mb-0">
      <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-10">
        {category.label}
      </h2>

      {category.hasSizes ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.items.map((item: PricingItem) => {
            // Find all variant keys present on this item
            const variantKeys = VARIANT_KEYS.filter(
              (k) => (item as any)[k] !== undefined
            );

            if (variantKeys.length > 0) {
              // Render pills for each variant (short, medium, long, boys, girls)
              const sizeItem = item as SizeItem;
              return (
                <div
                  key={sizeItem.label}
                  className="pricing-card group bg-base border border-[var(--border)] p-6 transition-all duration-300 hover:border-[var(--border-dark)] hover:shadow-lg hover:-translate-y-1"
                >
                  <h3 className="text-[var(--text-primary)] font-medium text-lg mb-3">
                    {sizeItem.label}
                  </h3>
                  {sizeItem.note && (
                    <p className="text-[var(--text-muted)] text-xs mb-4 font-light">
                      {sizeItem.note}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {variantKeys.map((key) => (
                      <span key={key} className={pillClass}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                        <span className="text-[var(--text-primary)] font-medium ml-1">
                          {(sizeItem as any)[key]}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            }

            // Flat price (no variants at all)
            const flat = item as FlatItem;
            return (
              <div
                key={flat.label}
                className="pricing-card group bg-base border border-[var(--border)] p-6 transition-all duration-300 hover:border-[var(--border-dark)] hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-[var(--text-primary)] font-medium text-sm mb-1">
                    {flat.label}
                  </h3>
                  {flat.note && (
                    <p className="text-[var(--text-muted)] text-xs font-light">
                      {flat.note}
                    </p>
                  )}
                </div>
                {flat.price && (
                  <span
                    className={`${pillClass} mt-4 w-fit !text-[var(--text-primary)] font-medium`}
                  >
                    {flat.price}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.items.map((item) => {
            const flat = item as FlatItem;
            return (
              <div
                key={flat.label}
                className="pricing-card group bg-base border border-[var(--border)] p-5 transition-all duration-300 hover:border-[var(--border-dark)] hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-[var(--text-primary)] font-medium text-sm mb-1">
                    {flat.label}
                  </h3>
                  {flat.note && (
                    <p className="text-[var(--text-muted)] text-xs font-light">
                      {flat.note}
                    </p>
                  )}
                </div>
                {flat.price && (
                  <span
                    className={`${pillClass} mt-4 w-fit !text-[var(--text-primary)] font-medium`}
                  >
                    {flat.price}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Inlined contact data (same as original QuickContact)
const contacts = [
  {
    name: "Call Us",
    desc: "Speak directly with our team",
    icon: <Phone aria-hidden="true" className="w-8 h-8 stroke-1" />,
    href: `tel:${BUSINESS.phoneRaw}`,
  },
  {
    name: "Email Us",
    desc: "Send us a message anytime",
    icon: <Mail aria-hidden="true" className="w-8 h-8 stroke-1" />,
    href: `mailto:${BUSINESS.email}`,
  },
  {
    name: "WhatsApp",
    desc: "Message us for support",
    icon: <Camera aria-hidden="true" className="w-8 h-8 stroke-1" />,
    href: BUSINESS.whatsappLink,
  },
];

export default function PricingPage() {
  const container = useRef<HTMLDivElement>(null);

  const commonHeroProps = {
    alt: "Pricing",
    fill: true,
    sizes: "100vw",
    priority: true,
  };
  const {
    props: { srcSet: desktopHeroSrcSet, ...desktopHeroRest },
  } = getImageProps({ ...commonHeroProps, src: '/images/Pricing/haircuts.webp' });
  const {
    props: { srcSet: mobileHeroSrcSet },
  } = getImageProps({ ...commonHeroProps, src: '/images/Pricing/haircuts-mobile.webp' });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const sections = gsap.utils.toArray('.category-section', container.current);
        sections.forEach((section) => {
          gsap.from(section as Element, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section as Element,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        });

        const quickEl = document.querySelector('.quick-contact-section');
        if (quickEl) {
          gsap.from(quickEl.querySelectorAll('.reveal-child'), {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: quickEl,
              start: 'top 80%',
            },
          });
        }
      });
      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-base-secondary min-h-screen relative"
      ref={container}
    >
      <style>{`
        .hero-headline span {
          display: inline-block;
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUpHeading 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .hero-headline span:nth-child(1) { animation-delay: 0s; }
        @keyframes fadeUpHeading {
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-subtitle {
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUpSubtitle 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.3s;
        }
        @keyframes fadeUpSubtitle {
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-headline,
        .hero-subtitle {
          -webkit-text-stroke: 0.9px rgba(0,0,0,0.30);
          paint-order: stroke fill;
          color: #fff;
          text-shadow:
            0 0 3px rgba(0,0,0,0.09),
            0 0 6px rgba(0,0,0,0.06);
        }

        .pricing-card {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @media (prefers-reduced-motion: reduce) {
          .category-section,
          .pricing-card {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section className="relative w-full aspect-[4/5] md:aspect-[3/1] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
            <source media={`(max-width: ${BUSINESS.mobileBreakpoint}px)`} srcSet={mobileHeroSrcSet} />
            <source media={`(min-width: ${BUSINESS.mobileBreakpoint + 1}px)`} srcSet={desktopHeroSrcSet} />
            <img
              {...desktopHeroRest}
              decoding="sync"
              className="object-cover object-top"
            />
          </picture>
          <div className="absolute inset-0 bg-black/30 z-10" />
        </div>
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="section-wrapper relative w-full">
            <div className="w-full text-white text-left">
              <h1 className="hero-headline font-[family-name:var(--font-display)] leading-[1.1] mb-8 tracking-[-0.02em] text-[clamp(2rem,8vh,4rem)] md:text-[clamp(2rem,9vh,3.6rem)]">
                <span className="inline-block">Pricing</span>
              </h1>
              <p className="hero-subtitle font-light mb-10 max-w-md leading-relaxed text-[clamp(0.875rem,2.5vh,1.25rem)] md:text-[clamp(1rem,3.5vh,1.5rem)] text-white/90">
                Transparent pricing for our premium services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="pricing-content">
        {categories.map(cat => (
          <CategorySection key={cat.id} category={cat} />
        ))}
      </SectionWrapper>

      <SectionWrapper>
        <div className="quick-contact-section">
          <div className="reveal-child mb-14">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-3">
              Book Your Appointment
            </h2>
            <p className="text-[var(--text-secondary)] font-light text-sm md:text-base leading-relaxed max-w-lg">
              Reach out to us directly to secure your preferred time and stylist.
            </p>
          </div>
          <div className="reveal-child">
            {/* Inlined QuickContact with bg-base cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
              {contacts.map((contact) => (
                <Card3DHover key={contact.name}>
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      block
                      bg-base
                      p-8
                      border border-[var(--border)]
                      transition-all duration-[var(--transition-base)]
                    "
                  >
                    <div className="icon-wrapper text-[var(--text-primary)] mb-7 transition-transform duration-[var(--transition-base)] origin-left">
                      {contact.icon}
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] mb-3 text-left leading-snug">
                      {contact.name}
                    </h3>
                    <p className="text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)] mb-7 min-h-[48px] text-left">
                      {contact.desc}
                    </p>
                    <div className="inline-flex items-center text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-[var(--transition-fast)] border-b md:border-b-2 border-current pb-0.5">
                      Contact now
                    </div>
                  </a>
                </Card3DHover>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </motion.div>
  );
}