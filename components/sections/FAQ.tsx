'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { useInquiry } from '../ui/InquiryContext';
import { siteContent, FaqItem } from '@/content/site';

interface AccordionItemProps {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, index, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="bg-[#F5F3EC] border border-[#D1D1D1] rounded-[8px] p-[18px] transition-colors duration-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DE6800] cursor-pointer"
        aria-expanded={isOpen}
      >
        <h4 className="font-heading text-[18px] sm:text-[20px] font-semibold text-[#1F1F1F] leading-snug">
          <span className="text-[#DE6800] mr-2 font-mono text-[16px]">
            {index + 1}.
          </span>
          {item.q}
        </h4>

        {/* 24px black rounded-square icon button with white Plus */}
        <div className="w-6 h-6 rounded-[4px] bg-[#1F1F1F] flex items-center justify-center shrink-0">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Plus className="w-4 h-4 text-white" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
            animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
            exit={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-[15px] sm:text-[16px] text-[#5C5C5C] font-body leading-relaxed border-t border-[#D1D1D1]/50 mt-3">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const { faq } = siteContent;
  const { openInquiry } = useInquiry();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="section-wrapper" aria-label="Frequently Asked Questions">
      <div className="content-container">
        <SectionHeader title={faq.h2} />

        {/* Two-Column Grid: left 7 cols accordion, right 4 cols sticky card (12-col grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Accordion list (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {faq.items.map((item, idx) => (
              <AccordionItem
                key={item.q}
                item={item}
                index={idx}
                isOpen={openIndex === idx}
                onToggle={() => handleToggle(idx)}
              />
            ))}
          </div>

          {/* Right Column: Sticky side card (col 9-12 or 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px]">
            <div className="bg-[#F5F3EC] border border-[#D1D1D1] rounded-[10px] p-5 sm:p-6 flex flex-col">
              {/* Image aspect 4:5 */}
              <div className="relative aspect-[4/5] w-full rounded-[8px] overflow-hidden mb-6 bg-[#E0DED6]">
                <Image
                  src={faq.sideCard.image}
                  alt="Cozy interior nook"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>

              {/* Side Card Content */}
              <h3 className="font-heading text-[24px] font-semibold text-[#1F1F1F] mb-3">
                {faq.sideCard.heading}
              </h3>
              <p className="body-text text-[#5C5C5C] text-[15px] mb-6">
                Every project begins with a relaxed, no-obligation conversation. Let us explore what is possible for your home.
              </p>

              <Button
                variant="primary"
                onClick={() => openInquiry('General Inquiry')}
                className="w-full text-center"
              >
                {faq.sideCard.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
