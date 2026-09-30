'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import ImageReveal from '../ui/ImageReveal';
import MotionReveal from '../ui/MotionReveal';
import { siteContent } from '@/content/site';

interface StepCardProps {
  step: { title: string; body: string };
  isActive: boolean;
  onActivate: () => void;
}

function StepCard({ step, isActive, onActivate }: StepCardProps) {
  return (
    <div
      onClick={onActivate}
      className={`rounded-[10px] bg-[#F5F3EC] p-6 sm:p-8 cursor-pointer transition-all duration-400 border ${
        isActive
          ? 'border-[#303030] opacity-100'
          : 'border-[#D1D1D1] opacity-50 hover:opacity-80'
      }`}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-heading text-[20px] sm:text-[22px] font-semibold text-[#1F1F1F]">
          {step.title}
        </h4>
        <span
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            isActive ? 'bg-[#DE6800]' : 'bg-[#D1D1D1]'
          }`}
        />
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isActive ? 'auto' : 0,
          opacity: isActive ? 1 : 0,
          marginTop: isActive ? 16 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="body-text text-[#5C5C5C] text-[16px] sm:text-[17px] leading-relaxed">
          {step.body}
        </p>
      </motion.div>
    </div>
  );
}

export default function ProcessSteps() {
  const { process } = siteContent;
  const [activeStep, setActiveStep] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: subHeadingRef,
    offset: ['start 80%', 'center center'],
  });

  const subWords = process.subHeading.split(' ');

  return (
    <section id="process" className="section-wrapper" aria-label="Our Process">
      <div className="content-container">
        <SectionHeader title={process.h2} />

        {/* Row 1: Image left (5 cols), Lead paragraph right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20 sm:mb-28">
          <div className="lg:col-span-5">
            <ImageReveal
              src={process.imageIntro}
              alt="Organic cave-like plaster interior"
              aspectClass="aspect-[4/3] sm:aspect-[4/5]"
              parallax={true}
              sizes="(max-width: 1024px) 100vw, 500px"
            />
          </div>
          <div className="lg:col-span-7">
            <MotionReveal delay={0.2}>
              <p className="lead-paragraph text-[#303030] lg:text-[26px]">
                {process.lead}
              </p>
            </MotionReveal>
          </div>
        </div>

        {/* Row 2: Sticky tall image left while right column scrolls */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[120px]">
              <div className="relative rounded-[8px] overflow-hidden aspect-[3/4] w-full">
                <Image
                  src={process.imageOffice}
                  alt="Luxury studio design office"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Faded subheading with word-by-word scroll fill + 3 step cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Scroll-linked word fill heading */}
            <p
              ref={subHeadingRef}
              className="font-heading text-[28px] sm:text-[34px] md:text-[38px] font-semibold tracking-tight leading-snug mb-10 text-[#5C5C5C]"
            >
              {subWords.map((word, i) => {
                const start = i / subWords.length;
                const end = (i + 1) / subWords.length;
                return (
                  <WordSpan
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </p>

            {/* 3 Step Cards */}
            <div className="flex flex-col space-y-6">
              {process.steps.map((step, idx) => (
                <StepCard
                  key={step.title}
                  step={step}
                  isActive={activeStep === idx}
                  onActivate={() => setActiveStep(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WordSpan({
  word,
  progress,
  range,
}: {
  word: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.35, 1.0]);
  const color = useTransform(progress, range, ['#8A8A8A', '#1F1F1F']);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.28em] transition-colors"
    >
      {word}
    </motion.span>
  );
}
