'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion, Variants } from 'framer-motion';
import Button from '../ui/Button';
import { CUBIC_EASE } from '../ui/motion';
import { siteContent } from '@/content/site';

export default function CTABanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { cta } = siteContent;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const words = ['Ready', 'To', 'Reimagine', 'Your', 'Space?'];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
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

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full min-h-[75vh] md:min-h-[80vh] overflow-hidden bg-[#1F1F1F] flex items-center mt-28 sm:mt-36"
      aria-label="Call to action"
    >
      {/* Background Image with Parallax & 45% Overlay */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : parallaxY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] left-0"
      >
        <Image
          src={cta.image}
          alt="Atmospheric luxury interior"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* 45% black overlay */}
        <div className="absolute inset-0 bg-[#171717]/65" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full py-20 px-5 sm:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[760px]">
            {/* H2 Title with word reveal and accent dot */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
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
            </motion.h2>

            {/* White Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.4, duration: 0.8, ease: CUBIC_EASE }}
              className="font-body text-[18px] sm:text-[20px] text-white/90 leading-relaxed mb-10 max-w-xl"
            >
              {cta.body}
            </motion.p>

            {/* Primary Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.55, duration: 0.8, ease: CUBIC_EASE }}
            >
              <Button
                variant="primary"
                href={`mailto:${siteContent.brand.email}?subject=Project%20Inquiry%20-%20Aurelle%20Studio`}
                className="text-[16px] px-8 py-4"
              >
                {cta.buttonText}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
