"use client";

import React from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import Button from '@/components/ui/Button';
import HeroSlider from '@/components/layout/HeroSlider';
import { BUSINESS } from '@/lib/constants';

export default function HeroBanner() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .hero-headline, .hero-subtitle, .hero-ctas {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
        .hero-headline {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .hero-subtitle {
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.2s;
        }
        .hero-ctas {
          opacity: 0;
          transform: translateY(8px);
          animation: fadeUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.35s;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Diagonal shadow – light from top‑right, shadow bottom‑left */
        .hero-headline, .hero-subtitle {
          text-shadow: -2px 2px 4px rgba(0, 0, 0, 0.6);
        }
      `}</style>

      <section className="relative w-full grid grid-cols-1 grid-rows-1 overflow-hidden">
        <div className="col-start-1 row-start-1 relative w-full aspect-[2/3] md:aspect-[5/2] self-stretch overflow-hidden">
          <HeroSlider />
        </div>
        <div className="col-start-1 row-start-1 z-20 flex items-center py-10 md:py-0">
          <div className="section-wrapper w-full px-5 md:px-10">
            <div className="w-full text-left">
                <h1 className="hero-headline font-[family-name:var(--font-display)] font-bold leading-[1.1] tracking-[-0.01em] text-[clamp(1.625rem,4vw+0.5rem,3rem)] text-white max-w-5xl">
                  Asset Maintenance, Compliance & Trade Services for Sydney & Surrounding Businesses
                </h1>
                <p className="hero-subtitle text-base sm:text-lg xl:text-xl text-white max-w-3xl mt-5 leading-relaxed">
                  One point of contact for proactive upkeep and rapid repairs.<br />
                  We coordinate your trades and mandatory inspections so you can focus on your business.
                </p>
                <div className="hero-ctas flex flex-col sm:flex-row items-start gap-4 mt-8">
                  <Link href="/contact">
                    <Button variant="primary" size="md" className="w-full sm:w-auto">
                      Get a Free Quote
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="primary" size="md" className="w-full sm:w-auto">
                      Our Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}