import Link from 'next/link';
import React from 'react';

export default function Wordmark({
  className = "",
  dark = false
}: {
  className?: string;
  dark?: boolean;
}) {
  const textColor = dark ? 'text-white/90' : 'text-[var(--text-primary)]';
  const baseClasses = `font-[family-name:var(--font-display)] font-light text-2xl leading-none uppercase transition-colors duration-300 ${textColor}`;

  return (
    <Link href="/" className={`flex items-baseline gap-1.5 ${className}`}>
      <span className={`${baseClasses} wordmark-eye`}>Fortis</span>
      <span className={`${baseClasses} wordmark-spot`}>Services</span>
      <span className={`${baseClasses} wordmark-spot`}>Group</span>
    </Link>
  );
}
