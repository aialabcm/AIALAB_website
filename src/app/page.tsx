import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import WhyChooseUs from "@/components/WhyChooseUs";
import ExpertiseSection from "@/components/ExpertiseSection";
import { getProjects, getTestimonials } from "@/lib/wordpress";

// ─── Below-the-fold components: lazy-loaded to reduce initial JS bundle ───
const StatsSection = dynamic(() => import("@/components/StatsSection"));
const PortfolioSection = dynamic(() => import("@/components/PortfolioSection"));
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const ContactCTA = dynamic(() => import("@/components/ContactCTA"));
const Footer = dynamic(() => import("@/components/Footer"));

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
