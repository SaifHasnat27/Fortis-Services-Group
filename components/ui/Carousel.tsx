"use client";

import React from "react";
import { CarouselMobile } from "./CarouselMobile";
import { CarouselDesktop } from "./CarouselDesktop";

interface CarouselProps {
  images: string[];
  onImageClick: (index: number) => void;
  autoSlideInterval?: number;
  itemsPerDesktop?: number;
  isActive?: boolean;
}

export const Carousel = ({
  images,
  onImageClick,
  autoSlideInterval = 2400,
  itemsPerDesktop = 3,
  isActive = true,
}: CarouselProps) => {
  return (
    <>
      <CarouselMobile
        images={images}
        onImageClick={onImageClick}
        autoSlideInterval={autoSlideInterval}
        isActive={isActive}
      />
      <CarouselDesktop
        images={images}
        onImageClick={onImageClick}
        autoSlideInterval={autoSlideInterval}
        itemsPerDesktop={itemsPerDesktop}
        isActive={isActive}
      />
    </>
  );
};