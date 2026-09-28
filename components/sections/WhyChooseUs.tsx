'use client';

import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import ImageReveal from '../ui/ImageReveal';
import MotionReveal from '../ui/MotionReveal';
import { siteContent } from '@/content/site';

export default function WhyChooseUs() {
  const { why } = siteContent;

  return (
    <section id="why" className="section-wrapper" aria-label="Why Aurelle">
      <div className="content-container">
        <SectionHeader title={why.h2} />

        {/* Wide image: aspect 16:6 */}
        <div className="mb-16">
          <ImageReveal
            src={why.wideImage}
            alt="Serene living room with travertine fireplace"
            aspectClass="aspect-[16/9] md:aspect-[16/6]"
            parallax={true}
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* 2-column grid of cards with 3rd card spanning full width on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Card 1 */}
          <MotionReveal delay={0.1} className="lg:col-span-6">
            <div className="h-full bg-[#F5F3EC] border border-[#D1D1D1] rounded-[10px] p-6 sm:p-8 flex flex-col justify-between">
              <div className="mb-6">
                <h4 className="h4-small text-[#1F1F1F] mb-3">{why.items[0].title}</h4>
                <p className="body-text text-[#5C5C5C]">{why.items[0].body}</p>
              </div>
              <div className="mt-4">
                <ImageReveal
                  src={why.items[0].image}
                  alt={why.items[0].title}
                  aspectClass="aspect-[4/5]"
                  sizes="(max-width: 768px) 100vw, 550px"
                />
              </div>
            </div>
          </MotionReveal>

          {/* Card 2 */}
          <MotionReveal delay={0.2} className="lg:col-span-6">
            <div className="h-full bg-[#F5F3EC] border border-[#D1D1D1] rounded-[10px] p-6 sm:p-8 flex flex-col justify-between">
              <div className="mb-6">
                <h4 className="h4-small text-[#1F1F1F] mb-3">{why.items[1].title}</h4>
                <p className="body-text text-[#5C5C5C]">{why.items[1].body}</p>
              </div>
              <div className="mt-4">
                <ImageReveal
                  src={why.items[1].image}
                  alt={why.items[1].title}
                  aspectClass="aspect-[4/5]"
                  sizes="(max-width: 768px) 100vw, 550px"
                />
              </div>
            </div>
          </MotionReveal>

          {/* Card 3: spans full width or centered */}
          <MotionReveal delay={0.3} className="lg:col-span-12">
            <div className="bg-[#F5F3EC] border border-[#D1D1D1] rounded-[10px] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6">
                <h4 className="h4-small text-[#1F1F1F] mb-3">{why.items[2].title}</h4>
                <p className="body-text text-[#5C5C5C] text-[18px] max-w-lg mb-6">
                  {why.items[2].body}
                </p>
                <div className="meta-text text-[#DE6800] uppercase tracking-wider font-semibold">
                  Timeless Balance & Craft
                </div>
              </div>
              <div className="lg:col-span-6">
                <ImageReveal
                  src={why.items[2].image}
                  alt={why.items[2].title}
                  aspectClass="aspect-[4/3] lg:aspect-[16/10]"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
