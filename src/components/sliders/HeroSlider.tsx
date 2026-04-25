import BaseSlider from "./BaseSlider";
import Button from "@/components/common/Button";

export default function HeroSlider() {
  const slides = [
    <section
      key="slide-1"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="/images/hero/hero-1.jpg"
        alt="Luxury project"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-white">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">
          Strategic Sales Partner
        </p>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          Unlock Growth for Ambitious Projects
        </h1>

        <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
          From positioning to conversions, we help projects scale faster with
          strategy-led execution.
        </p>

        <div className="mt-8">
          <Button href="/contact">
            Book Consultation
          </Button>
        </div>
      </div>
    </section>,

    <section
      key="slide-2"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="/images/clients/Bishnoi-Kalamkar.png"
        alt="Growth strategy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-white">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">
          Revenue Architecture
        </p>

        <h2 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          Sell Smarter. Scale Faster.
        </h2>

        <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
          We turn opportunities into momentum with modern sales systems.
        </p>

        <div className="mt-8">
          <Button href="/contact">
            Unlock Growth
          </Button>
        </div>
      </div>
    </section>,
  ];

  return (
    <BaseSlider
      slides={slides}
      autoPlay={true}
      interval={2000}
      showArrows={false}
      showDots={false}
      className="w-full"
    />
  );
}