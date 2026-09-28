import FloatingNav from '@/components/sections/FloatingNav';
import Hero from '@/components/sections/Hero';
import AboutStory from '@/components/sections/AboutStory';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import ServicesStack from '@/components/sections/ServicesStack';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Team from '@/components/sections/Team';
import TestimonialSlider from '@/components/sections/TestimonialSlider';
import JournalPreview from '@/components/sections/JournalPreview';
import FAQ from '@/components/sections/FAQ';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#EAE8E0] text-[#303030]">
      {/* Floating Top Navigation */}
      <FloatingNav />

      {/* Main Landmark */}
      <main id="main-content">
        {/* 1. Hero */}
        <Hero />

        {/* 2. About Story */}
        <AboutStory />

        {/* 3. Featured Projects */}
        <FeaturedProjects />

        {/* 4. Why Choose Us */}
        <WhyChooseUs />

        {/* 5. Services Stacking Cards */}
        <ServicesStack />

        {/* 6. Process Steps */}
        <ProcessSteps />

        {/* 7. Studio Team */}
        <Team />

        {/* 8. Testimonials Slider */}
        <TestimonialSlider />

        {/* 9. Journal Preview */}
        <JournalPreview />

        {/* 10. FAQ Accordion */}
        <FAQ />

        {/* 11. CTA Dark Banner */}
        <CTABanner />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
