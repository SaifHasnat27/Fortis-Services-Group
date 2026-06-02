"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from '@/components/ui/Button';
import SectionWrapper from '@/components/ui/SectionWrapper';
import QuickContact from '@/components/contact/QuickContact';
import GalleryLightbox from '@/components/ui/GalleryLightbox';
import TestimonialsCarousel from '@/components/ui/TestimonialsCarousel';
import HeroBanner from '@/components/ui/HeroBanner';
import { BUSINESS } from '@/lib/constants';
import { Card3DHoverFit } from '@/components/ui/SimpleAnimations';
import { Carousel } from '@/components/ui/Carousel';
import { useSpecialtyZoomOut } from '@/components/ui/GsapAnimations';
import ServiceCards from '@/components/servicecards/ServiceCards';
import Collections from '@/components/ui/Collections';
import FAQ from '@/components/servicecards/faq';
import ContactForm from '@/components/forms/ContactForm';
import PageContactForm from '@/components/forms/PageContactForm';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const GALLERY_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
    (n) => `/images/ig/${n}.webp`
);

export default function Design2Page() {
    const container = useRef<HTMLDivElement>(null);
    const specialtyRef = useRef<HTMLElement>(null);
    const specialtyBgRef = useRef<HTMLDivElement>(null);
    const specialtyOverlayRef = useRef<HTMLDivElement>(null);
    const specialtyCardRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${BUSINESS.mobileBreakpoint}px)`);
        setIsMobile(mql.matches);
        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener('change', handleChange);
        return () => mql.removeEventListener('change', handleChange);
    }, []);

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);
    const prevImage = useCallback(() =>
        setSelectedIndex((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)),
        []
    );
    const nextImage = useCallback(() =>
        setSelectedIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length)),
        []
    );

    useGSAP(() => {
        const revealSections = gsap.utils.toArray('.scroll-reveal');
        revealSections.forEach((section: any) => {
            gsap.from(section.children, {
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                }
            });
        });
    }, { scope: container });

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
    }, { scope: container });

    return (
        <>
            <div ref={container} className="w-full">
                {/* 1. Hero */}
                <HeroBanner />

                {/* 2. Our Services */}
                <SectionWrapper className="bg-design2b" id="services-preview">
                    <div className="scroll-reveal">
                        <div className="mb-14">
                            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-left">Our Services</h2>
                        </div>
                        <ServiceCards cardClassName="bg-design2p" />
                    </div>
                </SectionWrapper>

                {/* 3. Specialty Section */}
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
                                className="max-w-xl p-10 md:p-14 rounded-[var(--radius-card)] text-left bg-design2p backdrop-blur-sm border border-[var(--border)]"
                            >
                                <h2 className="font-[family-name:var(--font-display)] text-4xl mb-4 text-[var(--text-primary)]">
                                    30 Years of Expert Craftsmanship
                                </h2>
                                <p className="text-[var(--text-secondary)] font-light leading-relaxed mb-8">
                                    A Sydney home is a big investment. We bring three decades of experience so you can relax, knowing it's done right. From residential to commercial projects, our expert team delivers exceptional results every time.
                                </p>
                                <a href={BUSINESS.shopUrl} target="_blank" rel="noopener noreferrer">
                                    <Button variant="primary">View Our Services</Button>
                                </a>
                            </div>
                        </Card3DHoverFit>
                    </div>
                </section>


                {/* 5. Google Reviews */}
                <TestimonialsCarousel className="bg-design2b" cardClassName="bg-design2p" />

                {/* 6. Book an Appointment (Contact Form) */}
                <SectionWrapper id="contact-form" className="bg-design2b">
                    <div className="scroll-reveal">
                        <div className="card !p-10 md:!p-12 hover:border-[var(--border-dark)] transition-colors duration-[var(--transition-fast)]">
                            <p className="text-[0.6875rem] font-medium tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
                                We're Here to Help
                            </p>
                            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em] mb-8 text-[var(--text-primary)]">
                                Book Your Appointment
                            </h2>
                            {isMobile ? <ContactForm /> : <PageContactForm />}
                        </div>
                    </div>
                </SectionWrapper>


                {/* 8. FAQ */}
                <SectionWrapper id="faq" className="bg-design2b">
                    <div className="scroll-reveal">
                        <FAQ />
                    </div>
                </SectionWrapper>
            </div>

            {/* 9. Quick Contacts */}
            <SectionWrapper className="bg-design2b" id="quick-contact">
                <div className="scroll-reveal">
                    <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] mb-3 text-left">Get in Touch</h2>
                    <p className="text-[var(--text-secondary)] font-light text-sm leading-relaxed mb-0 text-left max-w-sm">Reach out to us to secure your appointment.</p>
                    <QuickContact cardClassName="bg-design2p" />
                </div>
            </SectionWrapper>

            <GalleryLightbox
                images={GALLERY_IMAGES}
                selectedIndex={selectedIndex}
                onClose={closeLightbox}
                onPrev={prevImage}
                onNext={nextImage}
            />
        </>
    );
}
