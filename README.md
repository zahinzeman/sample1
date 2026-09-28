# Aurelle Studio — Luxury Interior Design & Architecture

> Interiors of quiet, lasting luxury.

A production-quality single-page marketing website for **Aurelle Studio**, built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lenis smooth scrolling.

---

## ✨ Features & Architecture

- **Next.js 15 App Router + TypeScript**: Server and Client Components with modular component boundaries.
- **Tailwind CSS v4 & Custom Tokens**: Curated warm neutral palette (`#EAE8E0`, `#F0EFE6`, `#F5F3EC`, `#1F1F1F`, `#DE6800`), zero-shadow aesthetic, and custom text-roll hover micro-interactions.
- **Brand Signature**: Every H1/H2 heading terminates with an accent-colored full stop (`<span class="text-[#DE6800]">.</span>`).
- **Framer Motion Reveals**: Custom cubic-bezier easing `[0.22, 1, 0.36, 1]`, word-by-word masked line reveals, and 12% inset clip-path image reveals with inner scaling (`1.15` to `1.0`).
- **Lenis Smooth Scrolling**: Hardware-accelerated smooth scrolling with automatic reduced-motion detection.
- **Custom Desktop Cursor**: Interactive 72px accent follower that expands to a branded "View" badge over project cards.
- **Complete Asset Pipeline**: 36 magazine-grade architectural interior images and studio portraits located in `/public/images`.
- **Single-Source Content**: All copy, project lists, services, FAQs, and testimonials are editable from `/content/site.ts`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ or Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/zahinzeman/sample1.git
cd sample1

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001`) with your browser to experience the site.

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Design tokens, typography rules, zero-shadows, text-roll
│   ├── layout.tsx           # SEO metadata, OpenGraph, Google Fonts, Root providers
│   └── page.tsx             # Semantic page assembly across all 12 sections
├── components/
│   ├── sections/            # FloatingNav, MenuOverlay, Hero, AboutStory,
│   │                        # FeaturedProjects, WhyChooseUs, ServicesStack,
│   │                        # ProcessSteps, Team, TestimonialSlider,
│   │                        # JournalPreview, FAQ, CTABanner, Footer
│   └── ui/                  # Button, SectionHeader, ImageReveal, MotionReveal,
│                            # SmoothScroll, CustomCursor, motion constants
├── content/
│   └── site.ts              # Centralized editable site copy and metadata
├── public/
│   └── images/              # 36 high-resolution interior and portrait images
└── next.config.ts           # AVIF & WebP optimization configuration
```

---

## 📜 License

Private & Proprietary — © 2026 Aurelle Studio. All rights reserved.
