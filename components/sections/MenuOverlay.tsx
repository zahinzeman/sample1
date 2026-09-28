'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Button from '../ui/Button';
import { CUBIC_EASE } from '../ui/motion';
import { siteContent } from '@/content/site';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const { menuOverlay } = siteContent;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  const panelVariants: Variants = {
    closed: {
      clipPath: 'inset(0% 0% 100% 0%)',
      transition: { duration: 0.6, ease: CUBIC_EASE },
    },
    open: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 0.7, ease: CUBIC_EASE },
    },
  };

  const linkVariants: Variants = {
    closed: { y: 60, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.2 + i * 0.08,
        ease: CUBIC_EASE,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu-overlay"
          initial="closed"
          animate="open"
          exit="closed"
          variants={panelVariants}
          className="fixed inset-0 z-40 bg-[#1F1F1F] text-white flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Top spacer for nav bar */}
          <div className="h-16" />

          {/* Main Grid */}
          <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto items-center">
            {/* Left Column: Large Stacked Links */}
            <nav className="lg:col-span-7 flex flex-col space-y-3 sm:space-y-4">
              {menuOverlay.links.map((link, idx) => (
                <div key={link.label} className="overflow-hidden">
                  <motion.a
                    custom={idx}
                    variants={linkVariants}
                    href={link.href}
                    onClick={onClose}
                    className="group inline-flex items-center text-[38px] sm:text-[48px] md:text-[56px] font-semibold font-heading tracking-tight leading-[1.1] transition-colors duration-300 hover:text-[#DE6800]"
                  >
                    <span className="relative block overflow-hidden">
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
                  </motion.a>
                </div>
              ))}
            </nav>

            {/* Right Column: CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="lg:col-span-5 bg-[#2A2A2A] border border-white/10 rounded-[10px] p-8 flex flex-col justify-between"
            >
              <div>
                <span className="text-[12px] font-mono tracking-widest text-[#DE6800] uppercase mb-3 block">
                  Studio Inquiry
                </span>
                <h3 className="font-heading text-[28px] sm:text-[32px] font-semibold text-white leading-snug mb-3">
                  {menuOverlay.ctaCard.heading}
                </h3>
                <p className="font-body text-[16px] text-white/70 leading-relaxed mb-8">
                  {menuOverlay.ctaCard.body}
                </p>
              </div>
              <div>
                <Button
                  variant="primary"
                  href="#contact"
                  onClick={onClose}
                  className="w-full sm:w-auto"
                >
                  {menuOverlay.ctaCard.buttonText}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="max-w-[1200px] w-full mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[14px] text-white/60 font-body"
          >
            <div>
              <a
                href={`mailto:${menuOverlay.contact.email}`}
                className="hover:text-white transition-colors"
              >
                {menuOverlay.contact.email}
              </a>
            </div>
            <div className="flex gap-6">
              {menuOverlay.contact.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DE6800] transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
