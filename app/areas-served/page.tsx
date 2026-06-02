"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AreasServedPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.4 + 0.2,
          color: `hsl(${185 + Math.random() * 40}, 85%, ${70 + Math.random() * 20}%)`,
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(5, 5, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(
          ")",
          `, ${particle.opacity})`
        ).replace("hsl", "hsla");
        ctx.fill();
      });

      ctx.strokeStyle = "rgba(0, 200, 255, 0.15)";
      ctx.lineWidth = 0.8;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120;

          if (distance < maxDistance) {
            const opacity = 0.15 * (1 - distance / maxDistance);
            ctx.strokeStyle = `rgba(0, 220, 255, ${opacity})`;
            ctx.lineWidth = 0.6 + (1 - distance / maxDistance) * 0.6;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen -z-10"
        style={{ background: "#050510" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full min-h-[60vh] flex items-center justify-center bg-transparent"
      >
        <div
          className="bg-black/60 backdrop-blur-sm rounded-none p-8 md:p-10 text-center"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          <h1
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-[-0.02em] mb-6"
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              textShadow: "none",
            }}
          >
            Areas Served
          </h1>

          <div className="inline-block">
            <span
              className="font-bold text-[clamp(1.5rem,4.5vw,1.5rem)] leading-[1.2] tracking-wide animate-pulse-glow"
              style={{
                display: "inline-block",
                color: "#80ffff",
                textShadow: "0 0 8px rgba(0, 200, 255, 0.8), 0 0 15px rgba(0, 100, 255, 0.5)",
                animation: "pulseGlow 2.5s ease-in-out infinite",
              }}
            >
              Coming Soon
            </span>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulseGlow {
            0% {
              transform: scale(1);
              opacity: 0.8;
              text-shadow: 0 0 0px rgba(0, 200, 255, 0);
            }
            50% {
              transform: scale(1.08);
              opacity: 1;
              text-shadow: 0 0 15px rgba(0, 220, 255, 0.9), 0 0 25px rgba(0, 100, 255, 0.6);
            }
            100% {
              transform: scale(1);
              opacity: 0.8;
              text-shadow: 0 0 0px rgba(0, 200, 255, 0);
            }
          }
        `}</style>
      </motion.div>
    </>
  );
}