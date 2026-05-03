"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const items = [
  "/images/sections/bunglow-1.jpg",
  "/images/sections/bunglow-2.jpg",
  "/images/sections/bunglow-3.jpg",
  "/images/sections/bunglow-4.jpg",
];

function RhythmCard({ src, index }: { src: string; index: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-60, 60], [6, -6]);
  const rotateY = useTransform(mouseX, [-60, 60], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04, z: 40 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[340px] w-[250px] shrink-0 cursor-pointer md:h-[440px] md:w-[330px]"
    >
      <div
        className="relative h-full w-full overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.18)]"
        style={{
          clipPath:
            "polygon(0 0, 72% 0, 100% 50%, 72% 100%, 0 100%, 28% 50%)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            x: useTransform(mouseX, [-80, 80], [-10, 10]),
            y: useTransform(mouseY, [-80, 80], [-10, 10]),
            scale: 1.08,
          }}
        >
          <Image
            src={src}
            alt={`Real estate rhythm ${index + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/10" />
      </div>
    </motion.div>
  );
}

export default function RealEstateRhythmSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.4", "start 0.1"]
  });

  const trackX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [0.65, 1]),
            opacity: useTransform(scrollYProgress, [0, 1], [0.55, 1]),
          }}
          className="mb-20 text-center text-5xl font-semibold tracking-[-0.06em] text-black md:text-7xl"
        >
          This isn’t just{" "}
          <span className="text-black/30">about real estate.</span>
        </motion.h2>

        <motion.div
          style={{ x: trackX }}
          className="flex items-center justify-center gap-8"
        >
          {items.map((src, index) => {
            const start = index * 0.1;
            const end = start + 0.45;

            const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);
            const opacity = useTransform(
              scrollYProgress,
              [start, end],
              [0.5, 1]
            );
            const y = useTransform(scrollYProgress, [start, end], [40, 0]);

            return (
              <motion.div key={src} style={{ scale, opacity, y }}>
                <RhythmCard src={src} index={index} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}