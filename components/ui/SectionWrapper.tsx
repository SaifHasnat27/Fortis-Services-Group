import React from 'react';

type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  noPadding?: boolean;
};

export default function SectionWrapper({
  children,
  className = '',
  id,
  noPadding = false
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`${noPadding ? '' : 'py-12 md:py-20'} ${className}`}
    >
      <div className="section-wrapper">
        {children}
      </div>
    </section>
  );
}