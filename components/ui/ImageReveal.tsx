'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { CUBIC_EASE } from './motion';

interface ImageRevealProps {
  src: string;
  alt: string;
  aspectClass?: string;
  parallax?: boolean;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
}

export default function ImageReveal({
  src,
  alt,
  aspectClass = 'aspect-[4/3]',
  parallax = false,
  priority = false,
  className = '',
  imageClassName = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-6%', '6%']
  );

  if (shouldReduceMotion) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-[8px] ${aspectClass} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${imageClassName}`}
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{
        clipPath: 'inset(12% 12% 12% 12% round 8px)',
        opacity: 0,
      }}
      whileInView={{
        clipPath: 'inset(0% 0% 0% 0% round 8px)',
        opacity: 1,
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1.2,
        ease: CUBIC_EASE,
      }}
      className={`relative overflow-hidden rounded-[8px] ${aspectClass} ${className}`}
    >
      <motion.div
        style={{ y: parallax ? parallaxY : 0 }}
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1.0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1.2,
          ease: CUBIC_EASE,
        }}
        className="relative w-full h-[115%] -top-[7.5%] left-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover transition-transform duration-600 ${imageClassName}`}
        />
      </motion.div>
    </motion.div>
  );
}
