import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "AIA LAB — Studio de Création Digitale d'Élite",
  description:
    "AIA LAB fusionne intelligence artificielle, design haut de gamme et développement Next.js pour créer des expériences digitales d'exception. Branding, Web Design, Marketing Digital.",
};

export default async function Home() {
  const [projects, testimonials] = await Promise.all([
    getProjects(),
    getTestimonials(),
  ]);

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
