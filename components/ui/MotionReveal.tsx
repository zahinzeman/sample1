'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CUBIC_EASE } from './motion';

interface MotionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
  y?: number;
}

export default function MotionReveal({
  children,
  delay = 0,
  className = '',
  amount = 0.2,
  y = 40,
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount }}
        transition={{ duration: 0.6, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.8,
        delay,
        ease: CUBIC_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
