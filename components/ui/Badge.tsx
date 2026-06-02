import React from 'react';

export default function Badge({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`
        inline-block
        px-4 py-1
        text-[0.6875rem] font-medium
        tracking-[0.2em] uppercase
        bg-base-secondary
        text-[var(--text-muted)]
        border border-[var(--border)]
        rounded-full
        ${className}
      `}
    >
      {children}
    </span>
  );
}
