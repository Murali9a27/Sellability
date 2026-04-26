import Link from "next/link";
import HeroSlider from "@/components/sliders/HeroSlider";
import LogoSlider from "@/components/sliders/LogoSlider";
import ProjectGallerySlider from "@/components/sliders/ProjectGallerySlider";

import { getProjects } from "@/lib/wordpress";

export default async function HomePage() {
  const projects = await getProjects();

  const featuredProject = projects[0];
  return (
    <>
      <HeroSlider />
      <main style={{ padding: "40px" }}>
        <h1>Sellability Frontend</h1>
        <br />

        <Link href="/projects">View Projects</Link>
      </main>
      <LogoSlider />
      {featuredProject && <ProjectGallerySlider project={featuredProject} />}
    </>
  );
}
