import Link from "next/link";
import HeroSlider from "@/components/sliders/HeroSlider";
import LogoSlider from "@/components/sliders/LogoSlider";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <main style={{ padding: "40px" }}>
        <h1>Sellability Frontend</h1>
        <br />

        <Link href="/projects">View Projects</Link>
      </main>
      <LogoSlider />
    </>
  );
}
