'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { siteContent } from '@/content/site';

export default function TestimonialSlider() {
  const { testimonials } = siteContent;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = testimonials.items.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay every 6 seconds, pauses on hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  const current = testimonials.items[currentIndex];
  const quoteWords = current.quote.split(' ');

  return (
    <section id="testimonials" className="section-wrapper" aria-label="Client Testimonials">
      <div className="content-container">
        <SectionHeader title={testimonials.h2} />

        {/* Counter Row above card: '01' large and '/ 03' muted */}
        <div className="flex items-baseline gap-2 mb-6">
          <div className="h-[40px] overflow-hidden leading-[40px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-[32px] sm:text-[38px] font-bold text-[#1F1F1F] inline-block"
              >
                0{currentIndex + 1}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="font-heading text-[18px] text-[#5C5C5C] font-medium">
            / 0{total}
          </span>
        </div>

        {/* Full-width card: aspect ~16:7 */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full min-h-[480px] lg:min-h-[520px] rounded-[10px] overflow-hidden bg-[#1F1F1F] text-white flex flex-col justify-between p-6 sm:p-10 md:p-14"
        >
          {/* Background image crossfade with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.bg}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={current.bg}
                alt="Luxury interior background"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#171717]/65" />
            </motion.div>
          </AnimatePresence>

          {/* Top spacer */}
          <div className="relative z-10" />

          {/* Centre-left: Large white quote */}
          <div className="relative z-10 max-w-[850px] my-auto py-8">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.quote}
                className="font-heading text-[24px] sm:text-[32px] md:text-[36px] font-semibold text-white leading-[1.3] tracking-tight"
              >
                &ldquo;
                {quoteWords.map((word, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden py-0.5 pr-[0.25em] align-top"
                  >
                    <motion.span
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.02,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
                &rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Bottom Bar: Avatar & Client info left, navigation arrows right */}
          <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-6 pt-4 border-t border-white/15">
            {/* Avatar & Info */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/20 shrink-0">
                <Image
                  src={current.avatar}
                  alt={current.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-heading text-[17px] font-semibold text-white">
                  {current.name}
                </h4>
                <p className="font-body text-[14px] text-white/80">
                  {current.role}
                </p>
              </div>
            </div>

            {/* Bottom-right: round 44px arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-[6px] hover:bg-white/30 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-white hover:bg-white/90 text-[#1F1F1F] flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
