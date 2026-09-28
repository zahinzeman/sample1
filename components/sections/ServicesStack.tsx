'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { siteContent, ServiceItem } from '@/content/site';

interface StickyServiceCardProps {
  service: ServiceItem;
  index: number;
}

function StickyServiceCard({ service, index }: StickyServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  // Scale down and dim when being overlapped by later cards
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  const topOffset = 90 + index * 16;

  return (
    <div
      className="lg:sticky mb-10 lg:mb-14"
      style={{ top: `${topOffset}px` }}
    >
      <motion.div
        ref={cardRef}
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          opacity: shouldReduceMotion ? 1 : opacity,
        }}
        className="w-full rounded-[10px] bg-[#F0EFE6] border border-[#D1D1D1] p-4 sm:p-6 transition-all"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Big Image (aspect 4:5) */}
          <div className="lg:col-span-5 relative aspect-[4/5] w-full overflow-hidden rounded-[8px] bg-[#E0DED6]">
            <Image
              src={service.images[0]}
              alt={service.title}
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right Column: Content + Detail Image + 3-row List */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full py-2 sm:px-2">
            <div>
              {/* Title */}
              <h3 className="h3-card text-[#1F1F1F] mb-3">{service.title}</h3>

              {/* Description */}
              <p className="body-text text-[#5C5C5C] text-[16px] sm:text-[17px] leading-relaxed mb-6">
                {service.body}
              </p>

              {/* Smaller Landscape Image */}
              <div className="relative aspect-[16/8] w-full overflow-hidden rounded-[8px] mb-8 bg-[#E0DED6]">
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
                  className="flex justify-between items-center py-3.5 border-b border-[#D1D1D1] text-[15px] font-body"
                >
                  <span className="font-mono text-[#5C5C5C] text-[13px]">
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
        <div className="relative pt-4 pb-16">
          {services.items.map((service, idx) => (
            <StickyServiceCard
              key={service.title}
              service={service}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
