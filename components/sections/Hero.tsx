'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion, Variants } from 'framer-motion';
import Button from '../ui/Button';
import { CUBIC_EASE } from '../ui/motion';
import { useInquiry } from '../ui/InquiryContext';
import { siteContent } from '@/content/site';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { hero } = siteContent;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: moves 15% slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const words = ['Aurelle', 'Studio'];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: CUBIC_EASE,
      },
    },
  };

  const { openInquiry } = useInquiry();

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[640px] overflow-hidden bg-[#1F1F1F]"
      aria-label="Hero Section"
    >
      {/* Background Image Container with Parallax and Scale-in */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : imageY }}
        initial={shouldReduceMotion ? { opacity: 0 } : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 1.6, ease: CUBIC_EASE }}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
      >
        <Image
          src={hero.image}
          alt="Aurelle Studio luxury terrace interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Bottom dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)',
          }}
        />
      </motion.div>

      {/* Bottom-left Content Block */}
      <div className="absolute left-0 bottom-0 w-full z-10 pb-16 px-5 sm:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px]">
            {/* H1 Heading */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="h1-title text-white mb-6"
            >
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block overflow-hidden py-1 pr-[0.25em] align-top"
                >
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden py-1 align-top">
                <motion.span variants={wordVariants} className="inline-block text-[#DE6800]">
                  .
                </motion.span>
              </span>
            </motion.h1>

            {/* 2-line white paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: CUBIC_EASE }}
              className="font-body text-[16px] sm:text-[18px] text-white/90 leading-[1.6] max-w-[560px] mb-8"
            >
              {hero.sub}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: CUBIC_EASE }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                onClick={() => openInquiry('Residential Interiors')}
                className="w-full sm:w-auto text-center"
              >
                {hero.primaryButton}
              </Button>
              <Button
                variant="secondary_on_dark"
                href="#projects"
                className="w-full sm:w-auto text-center"
              >
                {hero.secondaryButton}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
