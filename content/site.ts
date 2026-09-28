export interface ProjectItem {
  tag: string;
  location: string;
  year: string;
  name: string;
  image: string;
}

export interface WhyItem {
  title: string;
  body: string;
  image: string;
}

export interface ServiceItem {
  title: string;
  body: string;
  list: string[];
  images: [string, string];
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  bg: string;
  avatar: string;
}

export interface JournalItem {
  date: string;
  title: string;
  image: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const siteContent = {
  brand: {
    name: "Aurelle Studio",
    shortName: "Aurelle",
    tagline: "Interiors of quiet, lasting luxury.",
    email: "studio@aurellestudio.com",
    phone: "+44 (0) 20 7946 0892",
    location: "London · Lisbon · Copenhagen",
  },
  nav: {
    wordmark: "Aurelle",
    links: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Services", href: "#services" },
      { label: "Journal", href: "#journal" },
      { label: "Contact", href: "#contact" },
    ],
  },
  menuOverlay: {
    links: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Journal", href: "#journal" },
      { label: "Contact", href: "#contact" },
    ],
    ctaCard: {
      heading: "Have a space in mind?",
      body: "Tell us about your project and we'll arrange an initial studio conversation.",
      buttonText: "Book a call",
    },
    contact: {
      email: "studio@aurellestudio.com",
      socials: [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "Pinterest", href: "https://pinterest.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
      ],
    },
  },
  hero: {
    h1: "Aurelle Studio.",
    sub: "We shape calm, considered interiors where natural materials, soft light and precise detailing come together for spaces that feel effortless to live in.",
    primaryButton: "Begin Your Project",
    secondaryButton: "View Our Work",
    image: "/images/hero-terrace.jpg",
  },
  about: {
    h2: "Our Story, In Brief.",
    image: "/images/about-hallway.jpg",
    lead: "Aurelle is a small studio of architects and designers who believe the best rooms are quiet ones. We work with honest materials, generous light and careful proportion to create homes and spaces that age gracefully.",
    stats: [
      { value: 18, suffix: "+", label: "Years in practice" },
      { value: 340, suffix: "+", label: "Completed interiors" },
      { value: 1200, suffix: "+", label: "Clients across 14 countries" },
    ],
  },
  projects: {
    h2: "Selected Projects.",
    buttonText: "See All Projects",
    items: [
      {
        tag: "Private Residence",
        location: "Lisbon",
        year: "2026",
        name: "Alvor Hill House",
        image: "/images/project-01-livingroom.jpg",
      },
      {
        tag: "City Apartment",
        location: "Copenhagen",
        year: "2025",
        name: "Harbourline Loft",
        image: "/images/project-02-riverview.jpg",
      },
      {
        tag: "Coastal Retreat",
        location: "Cape Town",
        year: "2026",
        name: "Driftwood Point Villa",
        image: "/images/project-03-lounge.jpg",
      },
    ] as ProjectItem[],
  },
  why: {
    h2: "Why Aurelle.",
    wideImage: "/images/why-fireplace.jpg",
    items: [
      {
        title: "01 — Plans Built Around You",
        body: "Layouts shaped by how you actually live, work and gather.",
        image: "/images/why-01-reading-nook.jpg",
      },
      {
        title: "02 — Materials With Integrity",
        body: "Stone, timber, linen and clay chosen to feel better with age.",
        image: "/images/why-02-sculpted-lounge.jpg",
      },
      {
        title: "03 — Design That Outlasts Trends",
        body: "Restrained, balanced rooms that stay relevant for decades.",
        image: "/images/why-03-dining.jpg",
      },
    ] as WhyItem[],
  },
  services: {
    h2: "What We Design.",
    items: [
      {
        title: "01 — Residential Interiors",
        body: "Complete homes planned and finished with warmth, clarity and craft.",
        list: ["Spatial Planning", "Material Palettes", "Custom Joinery"],
        images: ["/images/service-01-main.jpg", "/images/service-01-detail.jpg"],
      },
      {
        title: "02 — Hospitality & Workplace",
        body: "Hotels, restaurants and offices that make guests and teams feel considered.",
        list: ["Workplace Strategy", "Hospitality Concepts", "Guest Journeys"],
        images: ["/images/service-02-main.jpg", "/images/service-02-detail.jpg"],
      },
      {
        title: "03 — Interior Architecture",
        body: "Structural moves — stairs, openings, ceilings — that improve flow and proportion.",
        list: ["Volume Studies", "Layout Development", "Construction Detailing"],
        images: ["/images/service-03-main.jpg", "/images/service-03-detail.jpg"],
      },
      {
        title: "04 — Furnishing & Styling",
        body: "Furniture, lighting, art and objects curated to finish a space with character.",
        list: ["Furniture Sourcing", "Art & Objects", "Lighting Scenes"],
        images: ["/images/service-04-main.jpg", "/images/service-04-detail.jpg"],
      },
    ] as ServiceItem[],
  },
  process: {
    h2: "How We Work.",
    imageIntro: "/images/process-intro.jpg",
    lead: "Our process is deliberate and collaborative — careful listening, clear concepts and meticulous delivery, so the finished space feels unmistakably yours.",
    imageOffice: "/images/process-office.jpg",
    subHeading: "From first conversation to final styling.",
    steps: [
      {
        title: "01 — Discovery",
        body: "We learn how you live, what you love and what the space needs to do.",
      },
      {
        title: "02 — Concept",
        body: "Mood, materials and layouts are developed and refined together with you.",
      },
      {
        title: "03 — Delivery",
        body: "We manage makers and trades through to installation and final styling.",
      },
    ] as ProcessStep[],
  },
  team: {
    h2: "The Studio.",
    founders: [
      { name: "Marcus Hale", role: "Founding Director", image: "/images/team-01.jpg" },
      { name: "Noor Khalid", role: "Creative Director", image: "/images/team-02.jpg" },
      { name: "Elena Varga", role: "Head of Interiors", image: "/images/team-03.jpg" },
    ] as TeamMember[],
    designers: [
      { name: "Daniel Osei", role: "Interior Architect", image: "/images/team-04.jpg" },
      { name: "Priya Raman", role: "Senior Designer", image: "/images/team-05.jpg" },
      { name: "Tomás Ribeiro", role: "Design Associate", image: "/images/team-06.jpg" },
    ] as TeamMember[],
  },
  testimonials: {
    h2: "Kind Words.",
    items: [
      {
        quote: "They listened more than they talked, and the result feels like the home we always pictured but couldn't describe.",
        name: "Clara Jensen",
        role: "Homeowner, Copenhagen",
        bg: "/images/testimonial-01-bg.jpg",
        avatar: "/images/avatar-01.jpg",
      },
      {
        quote: "Our guests notice the calm the moment they walk in. Bookings rose within the first season.",
        name: "Rafael Duarte",
        role: "Boutique Hotel Owner",
        bg: "/images/testimonial-02-bg.jpg",
        avatar: "/images/avatar-02.jpg",
      },
      {
        quote: "Precise, patient and endlessly thoughtful. Every detail was resolved before we even asked.",
        name: "Hannah Liu",
        role: "Private Client, Singapore",
        bg: "/images/testimonial-03-bg.jpg",
        avatar: "/images/avatar-03.jpg",
      },
    ] as TestimonialItem[],
  },
  journal: {
    h2: "From The Journal.",
    buttonText: "Read The Journal",
    items: [
      {
        date: "Jul 14, 2026",
        title: "Designing With Restraint",
        image: "/images/journal-01.jpg",
      },
      {
        date: "Sep 02, 2026",
        title: "Why Natural Light Comes First",
        image: "/images/journal-02.jpg",
      },
    ] as JournalItem[],
  },
  faq: {
    h2: "Questions, Answered.",
    sideCard: {
      image: "/images/faq-nook.jpg",
      heading: "Still curious?",
      cta: "Get In Touch",
    },
    items: [
      {
        q: "What services does the studio offer?",
        a: "Residential interiors, hospitality and workplace design, interior architecture, and furnishing and styling.",
      },
      {
        q: "What size of project do you take on?",
        a: "Anything from a single signature room to full homes, villas, hotels and offices.",
      },
      {
        q: "What does your process look like?",
        a: "Discovery, concept, detailed design and delivery — with clear sign-off at each stage.",
      },
      {
        q: "How long does a project usually take?",
        a: "Most projects run 10–24 weeks depending on scope and lead times.",
      },
      {
        q: "Is every design bespoke?",
        a: "Yes. Each scheme is developed from scratch around the client and the building.",
      },
      {
        q: "Do you source furniture and materials?",
        a: "We handle sourcing, samples, procurement and delivery for all finishes and pieces.",
      },
      {
        q: "Can you manage the full project?",
        a: "Yes — we coordinate trades and suppliers through to installation and final styling.",
      },
    ] as FaqItem[],
  },
  cta: {
    h2: "Ready To Reimagine Your Space?",
    body: "Tell us about your space and your plans — we'll take it from there.",
    buttonText: "Book a call",
    image: "/images/cta-dark-interior.jpg",
  },
  footer: {
    wordmark: "AURELLE",
    image: "/images/footer-lounge.jpg",
    columns: [
      {
        title: "Navigation",
        links: [
          { label: "Home", href: "#hero" },
          { label: "About", href: "#about" },
          { label: "Projects", href: "#projects" },
          { label: "Services", href: "#services" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "More",
        links: [
          { label: "Journal", href: "#journal" },
          { label: "Terms & Conditions", href: "#" },
          { label: "Privacy Policy", href: "#" },
        ],
      },
    ],
    copyright: "© 2026 Aurelle Studio. All rights reserved.",
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Pinterest", href: "https://pinterest.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Editorial", href: "https://substack.com" },
    ],
  },
};
