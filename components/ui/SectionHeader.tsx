'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CUBIC_EASE } from './motion';

interface SectionHeaderProps {
  title: string;
  className?: string;
  as?: 'h1' | 'h2';
}

export default function SectionHeader({
  title,
  className = '',
  as = 'h2',
}: SectionHeaderProps) {
  const cleanTitle = title.endsWith('.') ? title.slice(0, -1) : title;
  const words = cleanTitle.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: CUBIC_EASE,
      },
    },
  };

  const HeadingTag = motion[as];

  return (
    <div className={`w-full ${className}`}>
      <HeadingTag
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className={
          as === 'h1'
            ? 'h1-title text-[#1F1F1F]'
            : 'h2-section text-[#1F1F1F]'
        }
      >
        {words.map((word, idx) => {
          const isLast = idx === words.length - 1;
          return (
            <span
              key={idx}
              className="inline-block overflow-hidden py-1 pr-[0.25em] align-top"
            >
              <motion.span variants={wordVariants} className="inline-block">
                {word}
                {isLast && <span className="text-[#DE6800]">.</span>}
              </motion.span>
            </span>
          );
        })}
      </HeadingTag>

      {/* 1px full-width divider line 24px below */}
      <div className="w-full h-px bg-[#D1D1D1] mt-6 mb-12 sm:mb-16" />
    </div>
  );
}
