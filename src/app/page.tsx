import Link from "next/link";
import HeroSlider from "@/components/sliders/HeroSlider";
import LogoSlider from "@/components/sliders/LogoSlider";
import ProjectGallerySlider from "@/components/sliders/ProjectGallerySlider";
import TestimonialSlider from "@/components/sliders/TestimonialSlider";

import { getProjects } from "@/lib/wordpress";
import TestimonialCarousel from "@/components/sliders/TestimonialCarousel";
import ImpactMapSection from "@/components/sections/ImpactMapSection";
import RealEstateRhythmSection from "@/components/sections/RealEstateRhythmSection";
import { HoverTransition, type HoverEffect } from '@/components/HoverTransition';


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
      <RealEstateRhythmSection />
      <ImpactMapSection/>
      <LogoSlider />
      <TestimonialSlider />
      <TestimonialCarousel />
      {featuredProject && <ProjectGallerySlider project={featuredProject} />}
    </>
  );
}
