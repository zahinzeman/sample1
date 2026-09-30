'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { siteContent, ServiceItem } from '@/content/site';

interface StickyServiceCardProps {
  service: ServiceItem;
  index: number;
  total: number;
}

function StickyServiceCard({ service, index, total }: StickyServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [halfHeight, setHalfHeight] = useState<number>(220);

  useEffect(() => {
    const updateSize = () => {
      if (cardRef.current) {
        setHalfHeight(Math.round(cardRef.current.offsetHeight / 2));
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const isLast = index === total - 1;
  // Subtle scaling and dimming as later cards stack over
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.88]);

  // Center vertically on the screen: 50vh - halfHeight
  // Each card in the stack has a slight stagger to create a crisp deck cascade
  // Clamped with minTop so it never overlaps the floating navbar
  const stagger = index * 14;
  const minTop = 72 + stagger;
  const topOffset = `max(${minTop}px, calc(50vh - ${halfHeight}px + ${stagger}px))`;

  return (
    <div
      ref={containerRef}
      className="lg:sticky mb-12 lg:mb-16 last:mb-0"
      style={{ top: topOffset }}
    >
      <motion.div
        ref={cardRef}
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          opacity: shouldReduceMotion ? 1 : opacity,
        }}
        className="w-full rounded-[10px] bg-[#F0EFE6] border border-[#D1D1D1] p-5 sm:p-6 lg:p-7 transition-all"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Big Image */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[360px] lg:max-h-[440px] overflow-hidden rounded-[8px] bg-[#E0DED6]">
            <Image
              src={service.images[0]}
              alt={service.title}
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority={index === 0}
            />
          </div>

          {/* Right Column: Content + Detail Image + 3-row List */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full py-1 sm:px-1">
            <div>
              {/* Title */}
              <h3 className="font-heading font-semibold text-[#1F1F1F] text-[22px] sm:text-[24px] lg:text-[26px] leading-tight mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="body-text text-[#5C5C5C] text-[14px] sm:text-[15px] leading-relaxed mb-3 sm:mb-4">
                {service.body}
              </p>

              {/* Architectural Detail Image Ribbon */}
              <div className="relative h-[110px] sm:h-[125px] w-full overflow-hidden rounded-[8px] mb-3 sm:mb-4 bg-[#E0DED6]">
                <Image
                  src={service.images[1]}
                  alt={`${service.title} architectural detail`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* 3-Row List: number left ('01') and label right-aligned, separated by thin borders */}
            <div className="border-t border-[#D1D1D1]">
              {service.list.map((item, itemIdx) => (
                <div
                  key={item}
                  className="flex justify-between items-center py-2 sm:py-2.5 border-b border-[#D1D1D1] text-[13px] sm:text-[14px] font-body"
                >
                  <span className="font-mono text-[#5C5C5C] text-[12px]">
                    0{itemIdx + 1}
                  </span>
                  <span className="font-medium text-[#1F1F1F] text-right">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesStack() {
  const { services } = siteContent;

  return (
    <section id="services" className="section-wrapper" aria-label="What We Design">
      <div className="content-container">
        <SectionHeader title={services.h2} />

        {/* Services Stack Container */}
        <div className="relative pt-2 pb-24 lg:pb-36">
          {services.items.map((service, idx) => (
            <StickyServiceCard
              key={service.title}
              service={service}
              index={idx}
              total={services.items.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
