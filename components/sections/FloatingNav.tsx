'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import MenuOverlay from './MenuOverlay';
import { siteContent } from '@/content/site';

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateNavVisibility = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY && !isOpen) {
        // Scrolling down
        setHidden(true);
      } else {
        // Scrolling up
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateNavVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateNavVisibility);
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: hidden && !isOpen ? '-120%' : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-[8px] right-[8px] z-50 h-[52px] bg-[#F0EFE6]/95 backdrop-blur-[12px] rounded-b-[12px] border-b border-x border-[#D1D1D1]/60 px-6 sm:px-8 flex items-center justify-between transition-colors duration-300"
      >
        {/* Left: Wordmark */}
        <a
          href="#hero"
          className="font-heading text-[28px] font-semibold text-[#1F1F1F] tracking-tight hover:text-[#DE6800] transition-colors"
          aria-label="Aurelle Studio Home"
        >
          {siteContent.nav.wordmark}
          <span className="text-[#DE6800]">.</span>
        </a>

        {/* Right: Hamburger button with accent indicator */}
        <div className="flex items-center gap-3">
          {isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full bg-[#DE6800]"
              aria-hidden="true"
            />
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 flex flex-col justify-center items-center gap-[6px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DE6800] rounded-[4px] cursor-pointer"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {/* Line 1 */}
            <span
              className={`block w-[32px] h-[2px] bg-[#1F1F1F] rounded-full transition-transform duration-300 origin-center ${
                isOpen ? 'rotate-45 translate-y-[8px]' : ''
              }`}
            />
            {/* Line 2 */}
            <span
              className={`block w-[32px] h-[2px] bg-[#1F1F1F] rounded-full transition-opacity duration-200 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Line 3 */}
            <span
              className={`block w-[32px] h-[2px] bg-[#1F1F1F] rounded-full transition-transform duration-300 origin-center ${
                isOpen ? '-rotate-45 -translate-y-[8px]' : ''
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Full-screen Menu Overlay */}
      <MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
