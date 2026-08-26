"use client";

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from '@/components/ui/Button';
import { Card3DHoverFit } from '@/components/ui/SimpleAnimations';
import ScrollParallax from '@/components/ui/ScrollParallax';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HomeSpecialty() {
  const specialtyRef = useRef<HTMLDivElement>(null);
  const specialtyCardRef = useRef<HTMLDivElement>(null);

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
    <div ref={specialtyRef}>
      <ScrollParallax
        src="/images/specialty-desktop.webp"
        mobileSrc="/images/specialty-mobile.webp"
        alt="Fortis Services Group commercial asset compliance and maintenance management"
        overlayOpacity={0}
        className="specialty-section min-h-[70vh] py-12 md:py-16 flex items-center"
      >
        <div className="section-wrapper relative z-10 w-full">
          <Card3DHoverFit>
            <div
              ref={specialtyCardRef}
              className="card !bg-base !p-9 md:!p-14 max-w-xl rounded-[var(--radius-card)] text-left backdrop-blur-sm hover:!transform-none hover:!shadow-[var(--shadow-card)] hover:!border-[var(--border)]"
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
      </ScrollParallax>
    </div>
  );
}
