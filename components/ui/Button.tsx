'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary_on_dark' | 'outline';
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    'group relative inline-flex items-center justify-center font-body text-[14px] font-medium tracking-normal transition-colors duration-300 rounded-[6px] px-[28px] py-[14px] cursor-pointer select-none overflow-hidden';

  const variantStyles = {
    primary: 'bg-[#DE6800] text-white hover:bg-[#C45C00]',
    secondary_on_dark: 'bg-transparent border border-white text-white hover:bg-white/10',
    outline: 'bg-transparent border border-[#303030] text-[#303030] hover:bg-[#303030] hover:text-white',
  }[variant];

  const content = (
    <span className="relative block h-[1.25em] overflow-hidden leading-[1.25em]">
      <span className="block transition-transform duration-[350ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block transition-transform duration-[350ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] translate-y-full group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variantStyles} ${className}`}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
