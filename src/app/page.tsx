import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import WhyChooseUs from "@/components/WhyChooseUs";
import ExpertiseSection from "@/components/ExpertiseSection";
import StatsSection from "@/components/StatsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { getProjects, getTestimonials } from "@/lib/wordpress";
import { projects as fallbackProjects } from "@/data/projects";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";

export default async function Home() {
  const [wpProjects, wpTestimonials] = await Promise.all([
    getProjects(),
    getTestimonials(),
  ]);

  // Combine WordPress projects and fallback projects so they all display together for testing
  const projects = [...wpProjects, ...fallbackProjects];

  // Combine WordPress testimonials and fallback testimonials so they all display together for testing
  const testimonials = [...wpTestimonials, ...fallbackTestimonials];

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <MarqueeTicker />
        <WhyChooseUs />
        <ExpertiseSection />
        <StatsSection />
        <PortfolioSection projects={projects} />
        <ProcessSection />
        <TestimonialsSection testimonials={testimonials} />
        <FAQSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
