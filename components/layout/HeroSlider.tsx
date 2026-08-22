"use client";

import React, { useState, useEffect } from "react";
import { getImageProps } from "next/image";
import { BUSINESS } from "@/lib/constants";

const SLIDES = [
  {
    desktop: "/images/homeHero/desktop-banner-1.webp",
    mobile: "/images/homeHero/mobile-banner-1.webp",
  },
  {
    desktop: "/images/homeHero/desktop-banner-2.webp",
    mobile: "/images/homeHero/mobile-banner-2.webp",
  },
  {
    desktop: "/images/homeHero/desktop-banner-3.webp",
    mobile: "/images/homeHero/mobile-banner-3.webp",
  },
];

const HOLD_DURATION = 3000;
const TRANSITION_MS = 800;

export default function HeroSlider() {
  // index runs 0..SLIDES.length (the last value lands on a clone of slide 0)
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIndex(prev => prev + 1), HOLD_DURATION);
    return () => clearTimeout(timer);
  }, [index]);

  // When we reach the cloned slide, snap back to the real first slide
  // (no animation) so the loop is seamless.
  useEffect(() => {
    if (index !== SLIDES.length) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, TRANSITION_MS);
    return () => clearTimeout(t);
  }, [index]);

  // Re-enable animation after the instant snap-back.
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const easing = `cubic-bezier(0.76, 0, 0.24, 1)`;

  // Track holds every slide stacked vertically, plus a clone of the first.
  const track = [...SLIDES, SLIDES[0]];

  return (
    <div className="absolute inset-0 z-0 bg-base-secondary overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          height: `${track.length * 100}%`,
          transform: `translateY(-${index * (100 / track.length)}%)`,
          transition: animate ? `transform ${TRANSITION_MS}ms ${easing}` : "none",
          willChange: "transform",
        }}
      >
        {track.map((slide, i) => (
          <div
            key={i}
            className="relative w-full"
            style={{ height: `${100 / track.length}%` }}
          >
            <SlideLayer slide={slide} priority={i === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Isolated slide layer ──────────────────────────────────
function SlideLayer({
  slide,
  priority,
}: {
  slide: (typeof SLIDES)[number];
  priority: boolean;
}) {
  const commonProps = {
    alt: "Fortis Services Group hero",
    fill: true as const,
    sizes: "100vw",
    priority,
  };

  const { props: { srcSet: desktopSrcSet, ...desktopRest } } =
    getImageProps({ ...commonProps, src: slide.desktop });
  const { props: { srcSet: mobileSrcSet } } =
    getImageProps({ ...commonProps, src: slide.mobile });

  return (
    <div className="absolute inset-0">
      <picture>
        <source media={`(max-width: ${BUSINESS.mobileBreakpoint}px)`} srcSet={mobileSrcSet} />
        <source media={`(min-width: ${BUSINESS.mobileBreakpoint + 1}px)`} srcSet={desktopSrcSet} />
        <img
          {...desktopRest}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : undefined}
          className="object-cover object-center w-full h-full"
        />
      </picture>
    </div>
  );
}
