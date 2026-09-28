'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import ImageReveal from '../ui/ImageReveal';
import MotionReveal from '../ui/MotionReveal';
import { CUBIC_EASE } from '../ui/motion';
import { siteContent } from '@/content/site';

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
}

function Counter({ value, suffix = '', label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: CUBIC_EASE,
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  const formatted = displayValue.toLocaleString('en-US');

  return (
    <div ref={ref} className="flex flex-col py-6 px-4 md:px-8">
      <div className="font-heading text-[48px] sm:text-[56px] md:text-[64px] font-bold text-[#1F1F1F] tracking-tight leading-none mb-3">
        {formatted}
        <span className="text-[#DE6800]">{suffix}</span>
      </div>
      <div className="meta-text text-[15px] sm:text-[16px] text-[#5C5C5C]">
        {label}
      </div>
    </div>
  );
}

export default function AboutStory() {
  const { about } = siteContent;

  return (
    <section id="about" className="section-wrapper" aria-label="About Aurelle Studio">
      <div className="content-container">
        {/* Section Header */}
        <SectionHeader title={about.h2} />

        {/* Full-width rounded image, aspect 21:9 */}
        <div className="mb-14 sm:mb-18">
          <ImageReveal
            src={about.image}
            alt="Mediterranean minimalist hallway interior"
            aspectClass="aspect-[16/9] sm:aspect-[21/9]"
            parallax={true}
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* Lead Paragraph spanning ~10 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 mb-16 sm:mb-20">
          <MotionReveal className="lg:col-span-10">
            <p className="lead-paragraph text-[#303030]">
              {about.lead}
            </p>
          </MotionReveal>
        </div>

        {/* Stats Row: 3 columns with borders (stack on mobile with horizontal divider) */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-[#D1D1D1] divide-y md:divide-y-0 md:divide-x divide-[#D1D1D1]">
          {about.stats.map((stat, idx) => (
            <Counter
              key={idx}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
