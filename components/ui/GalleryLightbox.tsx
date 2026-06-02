"use client";

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryLightboxProps {
  images: string[];
  selectedIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  images,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const isOpen = selectedIndex !== null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || selectedIndex === null) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 p-2 text-white/60 hover:text-white transition-colors"
        aria-label="Close"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Counter */}
      <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-widest font-light">
        {selectedIndex + 1} / {images.length}
      </p>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 md:left-6 z-10 p-3 text-white/60 hover:text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-9 h-9" />
        </button>
      )}

      {/* Image container — stops backdrop-click propagation */}
      <div
        className="relative w-full h-full mx-14 md:mx-20 my-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[selectedIndex]}
          alt={`Hair styling result ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-contain"
          priority
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 md:right-6 z-10 p-3 text-white/60 hover:text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-9 h-9" />
        </button>
      )}
    </div>
  );
}
