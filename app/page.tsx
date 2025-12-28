import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Hackathons from "@/components/Hackathons";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    <div className="bg-[#020617]">
      {/* Each section now has a specific ID for the BottomNav to anchor to */}
      
      <section id="home">
        <Hero />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="education">
        <Education />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="hackathons">
        <Hackathons />
      </section>

      <Footer />
    </div>
  );
}