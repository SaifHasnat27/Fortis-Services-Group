import React from 'react';
import { getImageProps } from 'next/image';
import { BUSINESS } from '@/lib/constants';

/**
 * Upper bound of the mobile banner crop, derived from the shared
 * BUSINESS.mobileBreakpoint (1023) so this component has no breakpoint of its
 * own to fall out of step.
 *
 * The `.98` matters: mobileBreakpoint is the last mobile pixel, so the old
 * `max-width: 1023px` / `min-width: 1024px` pair left anything between them
 * matching NEITHER query — real on devices with a fractional CSS width
 * (e.g. 1023.5px at a non-integer devicePixelRatio). Using 1023.98 as a
 * single boundary closes that gap.
 *
 * This also lines up with the `md:aspect-[3/1]` class on the <section> below,
 * which flips the container's shape at the same width — `md` is 1024px in
 * this project, overridden in globals.css (`@theme { --breakpoint-md: 1024px }`),
 * not Tailwind's stock 768px.
 */
const MOBILE_BANNER_MAX_WIDTH = BUSINESS.mobileBreakpoint + 0.98;

interface PageBannerProps {
  heading: string;
  subheading: string;
  desktopSrc: string;
  mobileSrc: string;
  imageAlt: string;
}

export default function PageBanner({
  heading,
  subheading,
  desktopSrc,
  mobileSrc,
  imageAlt,
}: PageBannerProps) {
  const commonHeroProps = {
    alt: imageAlt,
    fill: true,
    sizes: "100vw",
    priority: true,
  };

  /* Only the mobile srcSet is pulled out — it feeds the <source> element.
     The desktop props are kept WHOLE and spread onto the fallback <img>, so
     that <img> keeps its own src/srcSet. (The previous version destructured
     srcSet off the desktop props too, leaving the fallback <img> with no
     image source at all.) */
  const {
    props: { srcSet: mobileHeroSrcSet },
  } = getImageProps({ ...commonHeroProps, src: mobileSrc });

  const { props: desktopHeroProps } = getImageProps({
    ...commonHeroProps,
    src: desktopSrc,
  });

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
          {/* <picture> rather than two <img> tags with hidden/block classes:
              the browser evaluates these media queries and downloads exactly
              ONE source. Hiding an <img> with CSS does not reliably prevent
              its fetch — the preload scanner runs before styles are applied,
              so that approach can pull both crops down on some browsers. */}
          <picture>
            <source
              media={`(max-width: ${MOBILE_BANNER_MAX_WIDTH}px)`}
              srcSet={mobileHeroSrcSet}
            />
            {/* No second <source> for desktop: the <img> below already carries
                the desktop image, and it is what the browser uses whenever the
                mobile query does not match. One less place to get out of sync,
                and the fallback is a real image rather than an empty tag. */}
            <img
              {...desktopHeroProps}
              /* alt is already inside desktopHeroProps via commonHeroProps,
                 but ESLint's jsx-a11y rule cannot see through a spread —
                 stating it explicitly satisfies the linter and makes the
                 accessible name obvious when reading the markup. */
              alt={imageAlt}
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
