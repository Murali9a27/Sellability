import Link from "next/link";
import HeroSlider from "@/components/sliders/HeroSlider";
import LogoSlider from "@/components/sliders/LogoSlider";
import ProjectGallerySlider from "@/components/sliders/ProjectGallerySlider";
import TestimonialSlider from "@/components/sliders/TestimonialSlider";

import { getProjects } from "@/lib/wordpress";
import TestimonialCarousel from "@/components/sliders/TestimonialCarousel";
import ImpactMapSection from "@/components/sections/ImpactMapSection";
import RealEstateRhythmSection from "@/components/sections/RealEstateRhythmSection";
import {
  HoverTransition,
  type HoverEffect,
} from "@/components/HoverTransition";
import PropertyNavigator from "@/components/sections/PropertyNavigator";
import GlowButton from "@/components/common/GlowButton";

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
      <PropertyNavigator />
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <div className="bg-blue-300 w-[200px] h-[200px]">
          <HoverTransition
            className="w-[200px] h-[200px]"
            effect="ribbon"
            beforeImage="/images/sections/bunglow-1.jpg"
            afterImage="/images/clients/Bishnoi-Kalamkar.png"
          />
        </div>
        <div className="bg-blue-300 w-[200px] h-[200px]">
          <HoverTransition
            className="w-[200px] h-[200px]"
            effect="dots"
            beforeImage="/images/sections/bunglow-1.jpg"
            afterImage="/images/clients/Bishnoi-Kalamkar.png"
          />
        </div>
        <div className="bg-blue-300 w-[200px] h-[200px]">
          <HoverTransition
            className="w-[200px] h-[200px]"
            effect="curtain"
            beforeImage="/images/sections/bunglow-1.jpg"
            afterImage="/images/clients/Bishnoi-Kalamkar.png"
          />
        </div>
        <div className="bg-blue-300 w-[200px] h-[200px]">
          <HoverTransition
            className="w-[200px] h-[200px]"
            effect="mosaic"
            beforeImage="/images/sections/bunglow-1.jpg"
            afterImage="/images/clients/Bishnoi-Kalamkar.png"
          />
        </div>
        <div className="bg-blue-300 w-[200px] h-[200px]">
          <HoverTransition
            className="w-[200px] h-[200px]"
            effect="wave"
            beforeImage="/images/sections/bunglow-1.jpg"
            afterImage="/images/clients/Bishnoi-Kalamkar.png"
          />
        </div>
        <div className="bg-blue-300 w-[200px] h-[200px]">
          <HoverTransition
            className="w-[200px] h-[200px]"
            effect="shutter"
            beforeImage="/images/sections/bunglow-1.jpg"
            afterImage="/images/clients/Bishnoi-Kalamkar.png"
          />
        </div>
        
      </div>

      <RealEstateRhythmSection />
      <ImpactMapSection />
      <LogoSlider />
      <TestimonialSlider />
      <TestimonialCarousel />
      <GlowButton className="mt-8">Explore More</GlowButton>
      {featuredProject && <ProjectGallerySlider project={featuredProject} />}
    </>
  );
}
