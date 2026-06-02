"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ─── Shared infinite carousel logic (copied from original) ───
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

// ─── Desktop Carousel Component ───
interface CarouselDesktopProps {
  images: string[];
  onImageClick: (index: number) => void;
  autoSlideInterval?: number;
  itemsPerDesktop?: number;
  isActive?: boolean;
}

export const CarouselDesktop = ({
  images,
  onImageClick,
  autoSlideInterval = 2400,
  itemsPerDesktop = 3,
  isActive = true,
}: CarouselDesktopProps) => {
  const desktopSlider = useInfiniteCarousel({
    images,
    itemsPerPage: itemsPerDesktop,
    gap: 16,
    autoSlideInterval,
    isActive,
  });

  return (
    <div className="hidden md:block relative">
      {desktopSlider.isStatic ? (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))`,
          }}
        >
          {images.map((src, idx) => (
            <button
              key={src}
              onClick={() => onImageClick(idx)}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-card)] group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={src}
                alt="Gallery image"
                fill
                sizes="(max-width: 1024px) 33vw, 400px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      ) : (
        <>
          <div
            ref={desktopSlider.containerRef}
            className="overflow-hidden rounded-[var(--radius-card)]"
          >
            <div
              ref={desktopSlider.trackRef}
              className="flex gap-4"
              style={{ willChange: "transform" }}
            >
              {desktopSlider.extendedImages.map((src, idx) => {
                const actual = desktopSlider.getActualIndex(idx);
                return (
                  <button
                    key={`${src}-${idx}`}
                    onClick={() => onImageClick(actual)}
                    className="relative aspect-[3/4] flex-shrink-0 overflow-hidden rounded-[var(--radius-card)] group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    style={{ flex: `0 0 ${desktopSlider.itemFlexBasis}` }}
                    aria-label={`View image ${actual + 1}`}
                  >
                    <Image
                      src={src}
                      alt="Gallery image"
                      fill
                      sizes="(max-width: 1024px) 33vw, 400px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-8">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => desktopSlider.handleDotClick(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === desktopSlider.displayDotIndex
                    ? "bg-[var(--text-primary)] w-10"
                    : "bg-stone-400 w-3 hover:w-5 hover:bg-stone-500"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};