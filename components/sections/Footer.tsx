'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { CUBIC_EASE } from '../ui/motion';
import { siteContent } from '@/content/site';

export default function Footer() {
  const { footer } = siteContent;
  const letters = footer.wordmark.split('');

  const letterVariants: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: (i: number) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.9,
        delay: i * 0.05,
        ease: CUBIC_EASE,
      },
    }),
  };

  return (
    <footer className="w-full bg-[#1F1F1F] text-white pt-16 sm:pt-24 pb-12 px-6 sm:px-10" aria-label="Footer">
      <div className="max-w-[1360px] mx-auto flex flex-col">
        {/* Top: Giant Wordmark 'AURELLE' letters rise one by one from y 100% */}
        <div className="overflow-hidden border-b border-white/15 pb-4 mb-16 sm:mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex justify-between items-center w-full select-none"
          >
            {letters.map((char, idx) => (
              <span key={idx} className="overflow-hidden inline-block leading-none">
                <motion.span
                  custom={idx}
                  variants={letterVariants}
                  className="font-heading text-[18vw] sm:text-[17vw] lg:text-[16vw] font-bold tracking-tighter text-white block leading-none"
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 mb-16 sm:mb-20">
          {/* Brand Philosophy / Contact col (cols 1-6) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <p className="font-heading text-[24px] sm:text-[28px] font-medium text-white/90 max-w-md leading-relaxed mb-6">
                Interiors of quiet, lasting luxury. Crafted for living, built with integrity.
              </p>
            </div>
            <div className="text-[14px] text-white/50 font-body">
              {siteContent.brand.location}
            </div>
          </div>

          {/* Navigation Column (cols 7-9) */}
          <div className="md:col-span-3">
            <h4 className="meta-text text-white/40 uppercase tracking-widest text-[13px] mb-6 font-medium">
              {footer.columns[0].title}
            </h4>
            <ul className="flex flex-col space-y-4">
              {footer.columns[0].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex font-heading text-[20px] font-semibold text-white/90 hover:text-white"
                  >
                    <span className="relative block h-[1.3em] overflow-hidden leading-[1.3em]">
                      <span className="block transition-transform duration-350 ease-out group-hover:-translate-y-full">
                        {link.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 block text-[#DE6800] transition-transform duration-350 ease-out translate-y-full group-hover:translate-y-0"
                      >
                        {link.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Column (cols 10-12) */}
          <div className="md:col-span-3">
            <h4 className="meta-text text-white/40 uppercase tracking-widest text-[13px] mb-6 font-medium">
              {footer.columns[1].title}
            </h4>
            <ul className="flex flex-col space-y-4">
              {footer.columns[1].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex font-heading text-[20px] font-semibold text-white/90 hover:text-white"
                  >
                    <span className="relative block h-[1.3em] overflow-hidden leading-[1.3em]">
                      <span className="block transition-transform duration-350 ease-out group-hover:-translate-y-full">
                        {link.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 block text-[#DE6800] transition-transform duration-350 ease-out translate-y-full group-hover:translate-y-0"
                      >
                        {link.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 1px dashed divider */}
        <div className="w-full border-t border-dashed border-white/25 mb-14" />

        {/* Full-width rounded image: aspect 16:6 */}
        <div className="relative aspect-[16/8] sm:aspect-[16/6] w-full rounded-[8px] overflow-hidden mb-12 bg-[#2A2A2A]">
          <Image
            src={footer.image}
            alt="Warm architectural living room at dusk"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Bottom row: © 2026 Aurelle Studio left, social links right */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[14px] text-white/50 font-body">
          <div>{footer.copyright}</div>
          <div className="flex flex-wrap gap-6 sm:gap-8">
            {footer.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block hover:text-white transition-colors"
              >
                <span className="relative block h-[1.3em] overflow-hidden leading-[1.3em]">
                  <span className="block transition-transform duration-350 ease-out group-hover:-translate-y-full">
                    {social.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block text-[#DE6800] transition-transform duration-350 ease-out translate-y-full group-hover:translate-y-0"
                  >
                    {social.label}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
