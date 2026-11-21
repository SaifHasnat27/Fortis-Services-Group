"use client";

// LP card: same look + motion as the homepage ServiceCards / QuickContact cards.
// Uses the existing Card3DHover (read-only import, site code untouched).
import { motion } from "framer-motion";
import { Card3DHover } from "@/components/ui/SimpleAnimations";

export default function CardLp({
  index = 0,
  className = "",
  children,
}: {
  /** Position in the grid, for the stagger delay. */
  index?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card3DHover>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { delay: index * 0.08, duration: 0.5 } },
        }}
        className={`bg-base h-full flex flex-col p-8 border-[length:var(--border-width)] border-[color:var(--border)] transition-all duration-[var(--transition-base)] ${className}`}
      >
        {children}
      </motion.div>
    </Card3DHover>
  );
}
