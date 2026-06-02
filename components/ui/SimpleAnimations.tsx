"use client";

import React from "react";

/** Card3DHover – for cards in a grid or full‑width container (e.g. service cards). Block level, takes full width. */
export const Card3DHover = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`card-3d-hover-block ${className}`}>
      {children}
      <style jsx>{`
        .card-3d-hover-block {
          transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.2),
                      box-shadow 0.4s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .card-3d-hover-block:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 30px 50px -15px rgba(0, 0, 0, 0.35),
                      0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        @media (hover: hover) {
          .card-3d-hover-block:hover {
            transform: translateY(-12px) rotateY(8deg) scale(1.03);
          }
        }
        .card-3d-hover-block:hover :global(.icon-wrapper) {
          transform: translateZ(18px) scale(1.12);
          transition: transform 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};

/** Card3DHoverFit – for standalone cards that should only be as wide as their content (e.g. specialty card). */
export const Card3DHoverFit = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`card-3d-hover-fit ${className}`}>
      {children}
      <style jsx>{`
        .card-3d-hover-fit {
          display: inline-block;
          width: fit-content;
          transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.2),
                      box-shadow 0.4s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .card-3d-hover-fit:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 30px 50px -15px rgba(0, 0, 0, 0.35),
                      0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        @media (hover: hover) {
          .card-3d-hover-fit:hover {
            transform: translateY(-12px) rotateY(8deg) scale(1.03);
          }
        }
        .card-3d-hover-fit:hover :global(.icon-wrapper) {
          transform: translateZ(18px) scale(1.12);
          transition: transform 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};