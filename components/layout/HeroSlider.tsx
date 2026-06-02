"use client";

import React, { useState, useEffect, useRef } from "react";
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

const HOLD_DURATION = 4000;
const TRANSITION_MS = 900;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "transitioning">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = () => {
    setCurrent(prev => {
      const nextIdx = (prev + 1) % SLIDES.length;
      setNext(nextIdx);
      setPhase("transitioning");
      return prev;
    });
  };

  useEffect(() => {
    timerRef.current = setTimeout(advance, HOLD_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  useEffect(() => {
    if (phase !== "transitioning" || next === null) return;
    const t = setTimeout(() => {
      setCurrent(next);
      setNext(null);
      setPhase("idle");
    }, TRANSITION_MS);
    return () => clearTimeout(t);
  }, [phase, next]);

  const easing = `cubic-bezier(0.76, 0, 0.24, 1)`;

  return (
    <div className="absolute inset-0 z-0 bg-base-secondary overflow-hidden">

      {/* Incoming slide — sits underneath, fully visible */}
      {next !== null && (
        <SlideLayer slide={SLIDES[next]} priority={false} />
      )}

      {/* Current slide — split into left and right doors that slide apart */}

      {/* Left door — clipped to left half, slides out left */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: "inset(0 50% 0 0)",
          transform: phase === "transitioning" ? "translateX(-100%)" : "translateX(0%)",
          transition: phase === "transitioning" ? `transform ${TRANSITION_MS}ms ${easing}` : "none",
          willChange: "transform",
        }}
      >
        <SlideLayer slide={SLIDES[current]} priority />
      </div>

      {/* Right door — clipped to right half, slides out right */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: "inset(0 0 0 50%)",
          transform: phase === "transitioning" ? "translateX(100%)" : "translateX(0%)",
          transition: phase === "transitioning" ? `transform ${TRANSITION_MS}ms ${easing}` : "none",
          willChange: "transform",
        }}
      >
        <SlideLayer slide={SLIDES[current]} priority />
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
    alt: "Just Frameless hero",
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
          className="object-cover object-center w-full h-full"
        />
      </picture>
    </div>
  );
}
