import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "./components/AboutHero";
import AboutManifesto from "./components/AboutManifesto";
import AboutADN from "./components/AboutADN";
import AboutPromise from "./components/AboutPromise";
import AboutHistory from "./components/AboutHistory";
import AboutTeam from "./components/AboutTeam";
import ContactCTA from "@/components/ContactCTA";

export const metadata = {
  title: "About Us | AIA LAB",
  description:
    "Découvrez notre histoire, notre équipe, nos valeurs et notre vision créative au service de l'élite digitale.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-bg-main">
        <AboutHero />
        <AboutManifesto />
        <AboutADN />
        <AboutPromise />
        <AboutTeam />
        <AboutHistory />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

