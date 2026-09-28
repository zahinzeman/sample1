'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { siteContent, JournalItem } from '@/content/site';

interface JournalCardProps {
  item: JournalItem;
  delay?: number;
}

function JournalCard({ item, delay = 0 }: JournalCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-[#F5F3EC] border border-[#D1D1D1]/60 rounded-[10px] p-3 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Image Aspect 4:3 with hover zoom 1.05 */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px] mb-4">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform duration-600 ease-out group-hover:scale-105"
          />
        </div>

        {/* Date (meta) */}
        <div className="meta-text text-[14px] text-[#5C5C5C] mb-2 px-1">
          {item.date}
        </div>

        {/* Title (h3_card) with sliding ArrowUpRight icon */}
        <div className="px-1 flex items-baseline justify-between gap-3">
          <h3 className="h3-card text-[#1F1F1F] group-hover:text-[#DE6800] transition-colors duration-300">
            {item.title}
          </h3>
          <span className="shrink-0 text-[#DE6800] opacity-0 -translate-x-2 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out">
            <ArrowUpRight className="w-6 h-6" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function JournalPreview() {
  const { journal } = siteContent;

  return (
    <section id="journal" className="section-wrapper" aria-label="From The Journal">
      <div className="content-container">
        <SectionHeader title={journal.h2} />

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-14 sm:mb-16">
          {journal.items.map((item, idx) => (
            <JournalCard key={item.title} item={item} delay={idx * 0.15} />
          ))}
        </div>

        {/* Centered primary button */}
        <div className="flex justify-center">
          <Button variant="primary" href="#contact">
            {journal.buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
