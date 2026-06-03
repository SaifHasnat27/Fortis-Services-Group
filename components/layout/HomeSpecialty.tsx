"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from '@/components/ui/Button';
import { BUSINESS } from '@/lib/constants';
import { Card3DHoverFit } from '@/components/ui/SimpleAnimations';
import { useSpecialtyZoomOut } from '@/components/ui/GsapAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HomeSpecialty() {
  const specialtyRef = useRef<HTMLElement>(null);
  const specialtyBgRef = useRef<HTMLDivElement>(null);
  const specialtyOverlayRef = useRef<HTMLDivElement>(null);
  const specialtyCardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BUSINESS.mobileBreakpoint}px)`);
    setIsMobile(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  useSpecialtyZoomOut({
    containerRef: specialtyRef,
    bgRef: specialtyBgRef,
    overlayRef: specialtyOverlayRef,
    config: {
      startScale: 1.25,
      endScale: 1,
      startRotation: -0.8,
      endRotation: 0,
      scrub: true,
      overlayStartOpacity: 0.6,
      overlayEndOpacity: 0.4,
    },
  });

  useGSAP(() => {
    if (!specialtyCardRef.current) return;
    const cardChildren = specialtyCardRef.current.children;
    gsap.fromTo(cardChildren,
      { y: 40, opacity: 0, autoAlpha: 0 },
      {
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: "back.out(0.6)",
        scrollTrigger: {
          trigger: specialtyRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: specialtyRef });

  return (
    <section ref={specialtyRef} className="specialty-section relative h-[70vh] flex items-center overflow-hidden">
      <div ref={specialtyBgRef} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src={isMobile ? "/images/specialty-mobile.webp" : "/images/specialty-desktop.webp"}
          alt="Designer Frames & Prescription Eyewear"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>
      <div ref={specialtyOverlayRef} className="absolute inset-0 z-5 bg-stone-900/60" />
      <div className="section-wrapper relative z-10 w-full">
        <Card3DHoverFit>
          <div
            ref={specialtyCardRef}
            className="max-w-xl p-9 md:p-14 rounded-[var(--radius-card)] text-left bg-base backdrop-blur-sm border border-[var(--border)]"
          >
            <h2 className="font-[family-name:var(--font-display)] text-4xl mb-4 text-text-primary">
              Simplify Asset Compliance & Maintenance
            </h2>
            <p className="text-text-secondary font-light leading-relaxed mb-8">
              We keep your business compliant and operational. From mandatory inspections and certifications to proactive maintenance that prevents costly downtime, our team has you covered.
            </p>
            <Link href="/services">
              <Button variant="primary">View Our Services</Button>
            </Link>
          </div>
        </Card3DHoverFit>
      </div>
    </section>
  );
}
