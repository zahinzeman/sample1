'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { CUBIC_EASE } from '../ui/motion';
import { siteContent, ProjectItem } from '@/content/site';

interface ProjectCardProps {
  project: ProjectItem;
  className?: string;
}

function ProjectCard({ project, className = '' }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: CUBIC_EASE }}
      whileHover={{ y: -8 }}
      data-cursor="view"
      className={`group bg-[#F5F3EC] border border-[#D1D1D1]/60 rounded-[10px] p-3 transition-shadow duration-500 cursor-pointer ${className}`}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px]">
        {/* Pill tag top-left */}
        <div className="absolute top-3 left-3 z-10 bg-[#F0EFE6]/95 backdrop-blur-[4px] border border-[#D1D1D1]/50 px-3 py-1 rounded-[999px] text-[13px] font-body text-[#303030]">
          {project.tag}
        </div>

        {/* Inner scaling image */}
        <div className="relative w-full h-full">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* Info block */}
      <div className="pt-4 pb-2 px-1">
        {/* Location and Year */}
        <div className="flex justify-between items-center text-[14px] text-[#5C5C5C] font-body pb-3">
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>

        {/* Thin divider */}
        <div className="w-full h-px bg-[#D1D1D1]/70 mb-3" />

        {/* Project Name */}
        <h3 className="h3-card text-[#1F1F1F] group-hover:text-[#DE6800] transition-colors duration-300">
          {project.name}
        </h3>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const { projects } = siteContent;

  return (
    <section id="projects" className="section-wrapper" aria-label="Featured Projects">
      <div className="content-container">
        <SectionHeader title={projects.h2} />

        {/* Staggered Zig-Zag Layout (desktop) / Single column (tablet/mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-[100px] lg:gap-y-[140px] pt-4 pb-20">
          {/* Card 1: Right-aligned (cols 6-12) */}
          <div className="lg:col-start-6 lg:col-span-7">
            <ProjectCard project={projects.items[0]} />
          </div>

          {/* Card 2: Left-aligned (cols 1-7) */}
          <div className="lg:col-start-2 lg:col-span-7">
            <ProjectCard project={projects.items[1]} />
          </div>

          {/* Card 3: Right-aligned (cols 6-12) */}
          <div className="lg:col-start-6 lg:col-span-7">
            <ProjectCard project={projects.items[2]} />
          </div>
        </div>

        {/* Centered primary button */}
        <div className="flex justify-center mt-6">
          <Button variant="primary" href="#contact">
            {projects.buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
