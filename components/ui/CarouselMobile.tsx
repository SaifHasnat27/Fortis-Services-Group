"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ─── Infinite carousel hook (mobile config: 1 item, no gap) ───
interface UseInfiniteCarouselOptions {
  images: string[];
  itemsPerPage: number;
  gap: number;
  autoSlideInterval: number;
  isActive: boolean;
}

function useInfiniteCarousel({
  images,
  itemsPerPage,
  gap,
  autoSlideInterval,
  isActive,
}: UseInfiniteCarouselOptions) {
  const totalImages = images.length;
  const CLONE_COUNT = itemsPerPage;
  const isStatic = totalImages <= itemsPerPage;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemStepRef = useRef(0);
  const realIndexRef = useRef(0);
  const [realIndex, setRealIndex] = useState(0);
  const bypassAnimRef = useRef(false);

  useEffect(() => {
    realIndexRef.current = realIndex;
  }, [realIndex]);

  const extendedImages = useMemo(() => {
    if (isStatic) return images;
    return [
      ...images.slice(-CLONE_COUNT),
      ...images,
      ...images.slice(0, CLONE_COUNT),
    ];
  }, [images, CLONE_COUNT, isStatic]);

  useEffect(() => {
    if (isStatic) return;
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const containerWidth = container.clientWidth;
      const itemWidth = (containerWidth - (itemsPerPage - 1) * gap) / itemsPerPage;
      itemStepRef.current = itemWidth + gap;
      if (trackRef.current) {
        const targetX = -(realIndexRef.current + CLONE_COUNT) * itemStepRef.current;
        gsap.set(trackRef.current, { x: targetX });
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, [isStatic, itemsPerPage, gap, CLONE_COUNT]);

  const animateWrapForward = useCallback(() => {
    if (!trackRef.current || itemStepRef.current === 0) return;
    const track = trackRef.current;
    const step = itemStepRef.current;
    const targetX = -(totalImages + CLONE_COUNT) * step;
    gsap.to(track, {
      x: targetX,
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(track, { x: -(0 + CLONE_COUNT) * step });
        bypassAnimRef.current = true;
        setRealIndex(0);
      },
    });
  }, [totalImages, CLONE_COUNT]);

  useGSAP(
    () => {
      if (isStatic) return;
      if (bypassAnimRef.current) {
        bypassAnimRef.current = false;
        return;
      }
      if (realIndex < 0 || realIndex >= totalImages) return;
      const track = trackRef.current;
      const step = itemStepRef.current;
      if (!track || step === 0) return;
      const targetX = -(realIndex + CLONE_COUNT) * step;
      gsap.to(track, { x: targetX, duration: 0.8, ease: "power4.inOut" });
    },
    {
      dependencies: [realIndex, isStatic, totalImages, CLONE_COUNT],
      scope: containerRef,
    }
  );

  useEffect(() => {
    if (isStatic || !isActive) return;
    const interval = setInterval(() => {
      const current = realIndexRef.current;
      if (current === totalImages - 1) {
        animateWrapForward();
      } else {
        setRealIndex(current + 1);
      }
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [isActive, isStatic, totalImages, autoSlideInterval, animateWrapForward]);

  const getActualIndex = useCallback(
    (extendedIdx: number) => {
      let idx = (extendedIdx - CLONE_COUNT) % totalImages;
      return idx < 0 ? idx + totalImages : idx;
    },
    [totalImages, CLONE_COUNT]
  );

  const handleDotClick = useCallback(
    (index: number) => {
      if (index === realIndex) return;
      setRealIndex(index);
    },
    [realIndex]
  );

  const displayDotIndex = realIndex >= 0 && realIndex < totalImages ? realIndex : 0;

  const itemFlexBasis = `calc((100% - ${(itemsPerPage - 1) * gap}px) / ${itemsPerPage})`;

  return {
    containerRef,
    trackRef,
    extendedImages,
    displayDotIndex,
    handleDotClick,
    getActualIndex,
    isStatic,
    itemFlexBasis,
  };
}

// ─── Mobile Carousel Component ───
interface CarouselMobileProps {
  images: string[];
  onImageClick: (index: number) => void;
  autoSlideInterval?: number;
  isActive?: boolean;
}

export const CarouselMobile = ({
  images,
  onImageClick,
  autoSlideInterval = 2400,
  isActive = true,
}: CarouselMobileProps) => {
  const mobileSlider = useInfiniteCarousel({
    images,
    itemsPerPage: 1,
    gap: 0,
    autoSlideInterval,
    isActive,
  });

  return (
    <div className="block md:hidden">
      <div className="relative w-full overflow-hidden rounded-[var(--radius-card)]">
        <div className="relative w-full max-h-[80vh] overflow-hidden">
          <div ref={mobileSlider.containerRef} className="w-full overflow-hidden">
            <div
              ref={mobileSlider.trackRef}
              className="flex"
              style={{ willChange: "transform" }}
            >
              {mobileSlider.extendedImages.map((src, idx) => {
                const actual = mobileSlider.getActualIndex(idx);
                return (
                  <button
                    key={`${src}-${idx}`}
                    onClick={() => onImageClick(actual)}
                    className="relative flex-shrink-0 w-full aspect-[3/4] overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    style={{ flex: `0 0 ${mobileSlider.itemFlexBasis}` }}
                    aria-label={`View image ${actual + 1}`}
                  >
                    <Image
                      src={src}
                      alt="Gallery image"
                      fill
                      sizes="100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => mobileSlider.handleDotClick(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === mobileSlider.displayDotIndex
                ? "bg-[var(--text-primary)] w-10"
                : "bg-stone-400 w-3 hover:w-5 hover:bg-stone-500"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};