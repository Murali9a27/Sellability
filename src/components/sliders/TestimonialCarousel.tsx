import Image from "next/image";
import { Play } from "lucide-react";
import BaseSlider from "./BaseSlider";

const testimonials = [
  {
    type: "text",
    quote:
      "The lovely team at Sellability has provided our project with significant leverage. Their work is professional, strategic, and always focused on growth.",
    name: "Patrick Nawrocki",
    role: "UX Manager at Superhabits",
    avatar: "/images/testimonials/user-1.jpg",
  },
  {
    type: "video",
    name: "Pri Patil",
    role: "Product Designer at Lightdash",
    avatar: "/images/testimonials/user-2.jpg",
    image: "/images/testimonials/video-thumb-1.jpg",
    videoUrl: "#",
  },
  {
    type: "text",
    quote:
      "Sellability has greatly exceeded our expectations. The communication is excellent, the turnaround is quick, and the strategy is sharp.",
    name: "Rob West",
    role: "CEO of Kingdom Advisors",
    avatar: "/images/testimonials/user-3.jpg",
  },
  {
    type: "text",
    quote:
      "Their team brings clarity, confidence, and strong execution. We saw better direction and faster movement from the very first phase.",
    name: "Dom Ty",
    role: "CEO of Kii",
    avatar: "/images/testimonials/user-4.jpg",
  },
];

export default function TestimonialCarousel() {
  const slides = testimonials.map((item, index) => (
    <div key={index} className="px-3">
      {item.type === "video" ? (
        <div className="relative h-[540px] overflow-hidden rounded-[22px] bg-black">
          <Image
            src={item.image || ""}
            alt={item.name}
            fill
            className="object-cover opacity-70"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute left-8 top-8 z-10">
            <Image
              src={item.avatar}
              alt={item.name}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          </div>

          <button
            type="button"
            className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-[#E25C2D]"
            aria-label="Play testimonial video"
          >
            <Play size={24} fill="currentColor" />
          </button>

          <div className="absolute bottom-8 left-8 z-10 text-white">
            <p className="text-3xl font-light italic">{item.name}</p>
            <p className="mt-1 text-sm text-white/70">{item.role}</p>
          </div>
        </div>
      ) : (
        <div className="flex h-[540px] flex-col justify-between rounded-[22px] bg-white p-8 text-black">
          <div>
            <Image
              src={item.avatar}
              alt={item.name}
              width={56}
              height={56}
              className="mb-10 rounded-full object-cover"
            />

            <p className="text-[22px] leading-[1.35] tracking-[-0.03em]">
              “{item.quote}”
            </p>
          </div>

          <div>
            <p className="text-3xl font-light italic">{item.name}</p>
            <p className="mt-1 text-sm text-black/45">{item.role}</p>
          </div>
        </div>
      )}
    </div>
  ));

  return (
    <section className="w-full overflow-hidden bg-[#f3f3f3] py-20">
      <BaseSlider
        slides={slides}
        autoPlay={true}
        interval={3500}
        duration={900}
        perView={{ mobile: 1, tablet: 2, desktop: 3 }}
        showArrows={false}
        showDots={false}
        className="mx-auto max-w-[1500px]"
      />
    </section>
  );
}