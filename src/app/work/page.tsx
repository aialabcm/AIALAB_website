import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkHero from "./components/WorkHero";
import WorkGrid from "./components/WorkGrid";
import WallOfFame from "./components/WallOfFame";
import WorkCTA from "./components/WorkCTA";
import ContactCTA from "@/components/ContactCTA";
import { getProjects } from "@/lib/wordpress";

export default async function WorkPage() {
  const projects = await getProjects();

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
