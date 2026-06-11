import Link from 'next/link';
import React from 'react';

export default function Wordmark({
  className = "",
  dark = false
}: {
  className?: string;
  dark?: boolean;
}) {
  // Colour for the "Services Group" portion (theme-aware).
  const restColor = dark ? 'text-white/90' : 'text-[var(--text-primary)]';
  // Shared type styling — NO colour or weight here, so each span sets its own
  // cleanly with no class-collision.
  const baseClasses = `font-[family-name:var(--font-display)] text-base md:text-xl xl:text-2xl leading-none uppercase transition-colors duration-300`;

  return (
    <Link href="/" className={`flex items-baseline gap-1.5 ${className}`}>
      <span className={`${baseClasses} wordmark-a font-bold text-[var(--color-accent)]`}>Fortis</span>
      <span className={`${baseClasses} wordmark-b font-light ${restColor}`}>Services</span>
      <span className={`${baseClasses} wordmark-c font-light ${restColor}`}>Group</span>
    </Link>
  );
}
