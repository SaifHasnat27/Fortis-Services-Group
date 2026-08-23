import React from 'react';
import { getImageProps } from 'next/image';
import { BUSINESS } from '@/lib/constants';

interface PageBannerProps {
  heading: string;
  subheading: string;
  desktopSrc: string;
  mobileSrc: string;
}

export default function PageBanner({
  heading,
  subheading,
  desktopSrc,
  mobileSrc,
}: PageBannerProps) {
  const commonHeroProps = {
    alt: heading,
    fill: true,
    sizes: "100vw",
    priority: true,
  };

  const {
    props: { srcSet: desktopHeroSrcSet, ...desktopHeroRest },
  } = getImageProps({ ...commonHeroProps, src: desktopSrc });

  const {
    props: { srcSet: mobileHeroSrcSet },
  } = getImageProps({ ...commonHeroProps, src: mobileSrc });

  return (
    <>
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
      `}</style>

      <section className="relative w-full aspect-[4/5] md:aspect-[3/1] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
            <source media={`(max-width: ${BUSINESS.mobileBreakpoint}px)`} srcSet={mobileHeroSrcSet} />
            <source media={`(min-width: ${BUSINESS.mobileBreakpoint + 1}px)`} srcSet={desktopHeroSrcSet} />
            <img
              {...desktopHeroRest}
              decoding="sync"
              fetchPriority="high"
              className="object-cover object-top"
            />
          </picture>
          <div className="absolute inset-0 bg-black/15 z-10" />
        </div>

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="section-wrapper relative w-full">
            <div className="w-full text-white text-left">
              <h1 className="hero-headline font-[family-name:var(--font-display)] leading-[1.1] mb-8 tracking-[-0.02em] text-[clamp(2rem,8vh,4rem)] md:text-[clamp(2rem,9vh,3.6rem)]">
                <span className="inline-block">{heading}</span>
              </h1>
              <p className="hero-subtitle font-light mb-10 max-w-3xl leading-relaxed text-[clamp(0.875rem,2.5vh,1.25rem)] md:text-[clamp(1rem,3.5vh,1.5rem)] text-white/90">
                {subheading}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
