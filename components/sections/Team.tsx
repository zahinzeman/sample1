'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { siteContent, TeamMember } from '@/content/site';

interface MemberCardProps {
  member: TeamMember;
  index: number;
}

function MemberCard({ member, index }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col cursor-pointer"
    >
      {/* Portrait card: aspect 3:4, radius 8px */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[8px] mb-4 bg-[#E0DED6]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          className="object-cover transition-all duration-500 ease-out grayscale-[30%] group-hover:grayscale-0 group-hover:scale-104"
        />
      </div>

      {/* Name (h4) & Role (meta) */}
      <h4 className="h4-small text-[#1F1F1F] group-hover:text-[#DE6800] transition-colors duration-300">
        {member.name}
      </h4>
      <p className="meta-text text-[#5C5C5C] mt-1">{member.role}</p>
    </motion.div>
  );
}

export default function Team() {
  const { team } = siteContent;

  return (
    <section id="team" className="section-wrapper" aria-label="Studio Team">
      <div className="content-container">
        <SectionHeader title={team.h2} />

        {/* Group 1: Founders & Directors */}
        <div className="mb-20 sm:mb-24">
          <h3 className="font-heading text-[26px] sm:text-[30px] font-semibold text-[#1F1F1F] mb-8">
            Founders & Directors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {team.founders.map((member, idx) => (
              <MemberCard key={member.name} member={member} index={idx} />
            ))}
          </div>
        </div>

        {/* Group 2: Design Team */}
        <div>
          <h3 className="font-heading text-[26px] sm:text-[30px] font-semibold text-[#1F1F1F] mb-8">
            Design Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {team.designers.map((member, idx) => (
              <MemberCard key={member.name} member={member} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
