import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkHero from "./components/WorkHero";
import WorkGrid from "./components/WorkGrid";
import WallOfFame from "./components/WallOfFame";
import WorkCTA from "./components/WorkCTA";
import ContactCTA from "@/components/ContactCTA";
import { getProjects } from "@/lib/wordpress";
import { projects as fallbackProjects } from "@/data/projects";

export default async function WorkPage() {
  const wpProjects = await getProjects();
  
  // Combine WordPress projects and fallback projects so they all display together for testing
  const projects = [...wpProjects, ...fallbackProjects];

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#FAFAFA]">
        <WorkHero />
        <WorkGrid projects={projects} />
        <WallOfFame />
        <WorkCTA />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
