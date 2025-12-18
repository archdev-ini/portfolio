import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SelectedWorks from "@/components/SelectedWorks";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import { getProfile, getHomePage, getAllSkills } from "@/src/lib/archive";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, home, skills] = await Promise.all([
    getProfile(),
    getHomePage(),
    getAllSkills(),
  ]);

  return (
    <main className="min-h-screen relative flex flex-col bg-background selection:bg-foreground selection:text-background">
      <Header profile={profile} />
      <Hero home={home} profile={profile} />
      <About home={home} />
      <SelectedWorks />
      <Research profile={profile} />
      <Skills skillsData={skills} />
      <Footer profile={profile} home={home} />
    </main>
  );
}
