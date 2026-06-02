// website/components/ui/GsapAnimations.tsx
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BUSINESS } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface SpecialtyZoomOutProps {
  containerRef: React.RefObject<HTMLElement | null>;
  bgRef: React.RefObject<HTMLDivElement | null>;
  overlayRef?: React.RefObject<HTMLDivElement | null>;
  config?: {
    startScale?: number;
    endScale?: number;
    startRotation?: number;
    endRotation?: number;
    scrub?: number | boolean;
    overlayStartOpacity?: number;
    overlayEndOpacity?: number;
  };
}

export function useSpecialtyZoomOut({
  containerRef,
  bgRef,
  overlayRef,
  config,
}: SpecialtyZoomOutProps) {
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;
      if (!containerRef.current || !bgRef.current) return;

      const {
        startScale = 1.5,
        endScale = 1,
        startRotation = -0.8,
        endRotation = 0,
        scrub = true,        // changed from 1.2 to true (instant, no lag)
        overlayStartOpacity = 0.6,
        overlayEndOpacity = 0.4,
      } = config || {};

      // Responsive: on mobile, disable rotation, reduce scale range
      const mm = gsap.matchMedia();
      mm.add(`(min-width: ${BUSINESS.mobileBreakpoint + 1}px)`, () => {
        // Desktop: full effect
        gsap.fromTo(bgRef.current,
          { scale: startScale, rotation: startRotation, transformOrigin: "center center" },
          { scale: endScale, rotation: endRotation, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub, invalidateOnRefresh: true } }
        );
      });
      mm.add(`(max-width: ${BUSINESS.mobileBreakpoint}px)`, () => {
        // Mobile: no rotation, less extreme zoom
        gsap.fromTo(bgRef.current,
          { scale: 1.15, rotation: 0 },
          { scale: 1, rotation: 0, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true } }
        );
      });

      // Overlay animation (same on all devices)
      if (overlayRef?.current) {
        gsap.fromTo(overlayRef.current,
          { opacity: overlayStartOpacity },
          { opacity: overlayEndOpacity, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top 80%", end: "bottom 20%", scrub: true } }
        );
      }

      return () => {
        mm.revert(); // kill only the matchMedia handlers, not other ScrollTriggers
      };
    },
    { scope: containerRef }
  );
}