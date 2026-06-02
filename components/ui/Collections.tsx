"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import GalleryLightbox from "@/components/ui/GalleryLightbox"; // adjust path if needed

const workImages = [
  "/images/ourWork/1.webp",
  "/images/ourWork/2.webp",
  "/images/ourWork/3.webp",
  "/images/ourWork/4.webp",
  "/images/ourWork/5.webp",
  "/images/ourWork/6.webp",
];

export default function Collections({ className = 'bg-base-secondary' }: { className?: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => setLightboxIndex(index);
  const handleClose = () => setLightboxIndex(null);
  const handlePrev = () => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + workImages.length) % workImages.length : null));
  };
  const handleNext = () => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % workImages.length : null));
  };

  return (
    <section className={`${className} section-wrapper py-[var(--section-padding-y)]`}>
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-10">
        Our Work
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {workImages.map((src, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: idx * 0.08, duration: 0.5, ease: "easeOut" },
              },
            }}
            className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] group cursor-pointer"
            onClick={() => handleOpen(idx)}
          >
            <Image
              src={src}
              alt={`Work sample ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </motion.div>
        ))}
      </div>

      <Link href="/our-work">
        <Button variant="primary" size="md">
          View All Work
        </Button>
      </Link>

      {/* Lightbox */}
      <GalleryLightbox
        images={workImages}
        selectedIndex={lightboxIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}