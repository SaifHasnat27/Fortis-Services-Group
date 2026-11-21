"use client";

/* ────────────────────────────────────────────────────────────────
   LP reviews: Google-style review cards.
   Desktop (lg+): 3-card grid.
   Mobile: ONE card that swaps review with the site carousel's fade
   animation (same timings) + dots. Height locked to the longest
   review so nothing jumps.
   Review data: real Google reviews in components/googleAds/lib/reviewsLpData.ts.
   ──────────────────────────────────────────────────────────────── */

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Phone } from "lucide-react";
import ButtonLp from "@/components/googleAds/ui/ButtonLp";
import { BUSINESS } from "@/lib/constants";
import { LP_REVIEWS as reviews } from "@/components/googleAds/lib/reviewsLpData";
import SectionWrapper from "@/components/ui/SectionWrapper";
import CardLp from "@/components/googleAds/ui/CardLp";
import GoogleIcon from "@/components/ui/GoogleIcon";
import { H2_LP, QUOTE_LP } from "@/components/googleAds/ui/styles";

const AUTOPLAY_MS = 4500;

// Google's star yellow (same as the "G" logo), so the rating reads as Google at a glance.
const GOOGLE_STAR = "text-[#FBBC05]";

const NAME_CLASS = "text-sm font-medium text-[var(--text-primary)]";

function StarsRow({ starsRef }: { starsRef?: React.Ref<HTMLSpanElement> }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <span ref={starsRef} className={`text-3xl tracking-widest ${GOOGLE_STAR}`} aria-label="5 stars">
        ★★★★★
      </span>
      <GoogleIcon className="w-7 h-7 shrink-0" />
    </div>
  );
}

function MobileCarousel() {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Fade out → swap → fade in (same timings as the site carousel).
  // Stars and review animate together; the G logo stays put.
  const transitionTo = useCallback((next: number) => {
    if (!textRef.current || !starsRef.current) return;
    const targets = [starsRef.current, textRef.current];
    tlRef.current?.kill();
    tlRef.current = gsap
      .timeline()
      .to(targets, { opacity: 0, y: -12, duration: 0.3, ease: "power2.in" })
      .call(() => setIndex(next))
      .to(targets, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" });
  }, []);

  // Tap the card to pause; tap it again or anywhere outside to resume.
  const [paused, setPaused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paused) return;
    const resumeOnOutsideTap = (e: PointerEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) setPaused(false);
    };
    document.addEventListener("pointerdown", resumeOnOutsideTap);
    return () => document.removeEventListener("pointerdown", resumeOnOutsideTap);
  }, [paused]);

  // Autoplay. Restarts whenever the review changes (so a dot tap resets the timer). Stops while paused.
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => transitionTo((index + 1) % reviews.length), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, transitionTo]);

  useEffect(() => () => {
    tlRef.current?.kill();
  }, []);

  const r = reviews[index];

  return (
    <div className="lg:hidden">
      <div
        ref={cardRef}
        onClick={() => setPaused((p) => !p)}
        className="bg-base p-8 border-[length:var(--border-width)] border-[color:var(--border)] cursor-pointer"
      >
        <StarsRow starsRef={starsRef} />
        <div ref={textRef} aria-live="polite" aria-atomic="true">
          {/* Height locked to the longest review: all quotes stacked invisibly in one cell */}
          <div className="grid">
            {reviews.map((rv) => (
              <p key={rv.name} aria-hidden="true" className={`${QUOTE_LP} col-start-1 row-start-1 invisible`}>
                {rv.review}
              </p>
            ))}
            <p className={`${QUOTE_LP} col-start-1 row-start-1`}>{r.review}</p>
          </div>
          <span className={`${NAME_CLASS} block mt-8`}>{r.name}</span>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-3 mt-6" role="tablist" aria-label="Review navigation">
        {reviews.map((rv, i) => (
          <button
            key={rv.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`View review from ${rv.name}`}
            onClick={() => i !== index && transitionTo(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-10 bg-[var(--text-primary)]" : "w-3 bg-[var(--color-neutral-600)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ReviewsLp() {
  return (
    <SectionWrapper className="bg-base-secondary">
      <div className="mb-14">
        <h2 className={H2_LP}>
          Rated 5 Stars on Google{" "}
          <span className={`whitespace-nowrap tracking-widest ${GOOGLE_STAR}`} aria-label="5 out of 5 stars">
            ★★★★★
          </span>
        </h2>
      </div>

      {/* Desktop: 3-card grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <CardLp key={r.name} index={i}>
            <StarsRow />
            <p className={`${QUOTE_LP} mb-8`}>{r.review}</p>
            <span className={`${NAME_CLASS} mt-auto`}>{r.name}</span>
          </CardLp>
        ))}
      </div>

      {/* Mobile: one card, swap animation */}
      <MobileCarousel />

      <div className="mt-14">
        <ButtonLp variant="gPrimary" href={`tel:${BUSINESS.phoneRaw}`} icon={Phone} className="w-full sm:w-auto">
          Call {BUSINESS.phone}
        </ButtonLp>
      </div>
    </SectionWrapper>
  );
}
