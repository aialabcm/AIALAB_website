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

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <MarqueeTicker />
        <WhyChooseUs />
        <ExpertiseSection />
        <StatsSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

