"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";

export interface Testimonial {
  name: string;
  review: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "David",
    review: "We run a decent sized warehouse out near Penrith and used to have three different contractors for electrical, plumbing and general maintenance. Fortis took over everything. One phone call when something breaks and they just handle it. Saved me a lot of headaches and the response time is genuinely fast.",
  },
  {
    name: "Michelle",
    review: "Working in aged care compliance is a nightmare if you let things slip. Fortis keeps on top of all our mandatory inspections smoke alarms electrical testing fire equipment the whole lot. I get a proper report every time and when auditors come around Ive got everything I need. Worth every dollar.",
  },
  {
    name: "Tony",
    review: "Got a few hospitality venues in the CBD and the inner west. Kitchen equipment breaks down at the worst times obviously. Fortis has been solid for us. Refrigeration goes down we call them and theyve got someone out usually within a couple hours. Their proactive maintenance has actually stopped a few breakdowns before they happened which never used to happen with our old guys.",
  },
  {
    name: "Sarah",
    review: "We manage a high rise office tower in North Sydney. Having one company handle the reactive repairs and the scheduled compliance checks has made my job so much easier. The helpdesk actually answers the phone and follows up. They even flagged a recurring electrical issue we didnt know we had and sorted it properly.",
  },
  {
    name: "James",
    review: "Manufacturing plant with old infrastructure is a headache. We needed someone who could do everything from electrical switchboard upgrades to urgent plumbing fixes to hvac servicing. Fortis came in gave us a tailored plan and the team they send actually know what theyre doing. Downtime has dropped noticeably since we switched.",
  },
  {
    name: "Emma",
    review: "Had a leaking cool room at our restaurant on a Friday night. Called Fortis they had a refrigeration tech out within two hours. Saved our weekend stock. Been using them for all our maintenance ever since. Reliable fair priced and they actually communicate when someone is on the way.",
  },
  {
    name: "Peter",
    review: "What I like most is the reporting. Every job no matter how small comes with a service report. For a facilities manager that kind of documentation is gold. Theyve also helped us get on top of our asset register which was a complete mess before. Top blokes to deal with.",
  },
];

export default function TestimonialsCarousel({ className = 'bg-base-secondary', cardClassName = 'bg-base' }: { className?: string; cardClassName?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(currentIndex);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  indexRef.current = currentIndex;

  const transitionTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex === indexRef.current || !textRef.current) return;

      timelineRef.current?.kill();
      timelineRef.current = null;

      const tl = gsap.timeline({
        onComplete: () => {
          timelineRef.current = null;
        },
      });

      tl.to(textRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.3,
        ease: "power2.in",
      })
        .call(() => {
          setCurrentIndex(nextIndex);
          indexRef.current = nextIndex;
        })
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
        });

      timelineRef.current = tl;
      resetAutoPlay();
    },
    []
  );

  const handleDotClick = useCallback(
    (index: number) => {
      transitionTo(index);
    },
    [transitionTo]
  );

  const resetAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    autoPlayTimerRef.current = setTimeout(() => {
      const next = (indexRef.current + 1) % testimonials.length;
      transitionTo(next);
    }, 4500);
  }, [transitionTo]);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      timelineRef.current?.kill();
    };
  }, [resetAutoPlay]);

  const t = testimonials[currentIndex];

  return (
    <section
      ref={containerRef}
      className={`py-12 md:py-20 ${className} overflow-hidden`}
      aria-label="Client testimonials"
    >
      <div className="section-wrapper max-w-4xl mx-auto">
        <div className="scroll-reveal">
          <div className="mb-14">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-left">
              Client Reviews
            </h2>
          </div>

          <div className={`${cardClassName} border border-[var(--border)] p-8 md:p-12`}>
            <div
              ref={textRef}
              className="flex flex-col items-center text-center h-[320px] md:h-[260px]"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* Row 1 — fixed height stars */}
              <div className="h-16 md:h-20 flex items-start justify-center shrink-0">
                <span
                  className="text-3xl tracking-widest text-[var(--text-primary)]"
                  aria-label="5 stars"
                >
                  ★★★★★
                </span>
              </div>

              {/* Row 2 — fills remaining height, review centred within */}
              <div className="flex-1 flex items-center justify-center">
                <p className="
                  font-[family-name:var(--font-display)]
                  text-xl md:text-2xl lg:text-3xl
                  leading-[var(--leading-snug)]
                  text-[var(--text-primary)]
                  italic font-light
                ">
                  {t.review}
                </p>
              </div>
            </div>

            {/* Name — fixed position below the box */}
            <div className="flex flex-col items-center gap-1.5 mt-6">
              <span className="text-sm font-medium tracking-[0.18em] uppercase text-[var(--text-primary)]">
                {t.name}
              </span>
            </div>

            <div
              className="flex justify-center items-center gap-3 mt-12"
              role="tablist"
              aria-label="Testimonial navigation"
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === currentIndex}
                  onClick={() => handleDotClick(i)}
                  className={`
                    h-1 rounded-full transition-all duration-500
                    ${i === currentIndex
                      ? "bg-[var(--testimonial-dot-active,var(--text-primary))] w-10"
                      : "bg-[var(--testimonial-dot-bg,var(--color-stone-400))] w-3 hover:w-5 hover:bg-[var(--testimonial-dot-hover-bg,var(--color-stone-600))]"
                    }
                  `}
                  aria-label={`View testimonial from ${testimonials[i].name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
