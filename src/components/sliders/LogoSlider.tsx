"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const logos = [
  { name: "Logo 1", src: "/images/clients/Bishnoi-Kalamkar.png" },
  { name: "Logo 2", src: "/images/clients/Kakkad-Group.png" },
  { name: "Logo 3", src: "/images/clients/Kunal_Group.png" },
  { name: "Logo 4", src: "/images/clients/MB.png" },
  { name: "Logo 5", src: "/images/clients/pride.png" },
  { name: "Logo 6", src: "/images/clients/SSD-Group.png" },
  { name: "Logo 7", src: "/images/clients/Utsav-Homes.png" },
];

export default function LogoSlider() {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(6);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const extendedLogos = [...logos, ...logos];

  useEffect(() => {
    const updatePerView = () => {
      if (window.innerWidth < 768) setPerView(2);
      else if (window.innerWidth < 1024) setPerView(4);
      else setPerView(6);
    };

    updatePerView();
    window.addEventListener("resize", updatePerView);

    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 3000); // 1s slide + 2s halt

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (current === logos.length) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrent(0);

        setTimeout(() => {
          setTransitionEnabled(true);
        }, 50);
      }, 1000);
    }
  }, [current]);

  return (
    <section className="w-full overflow-hidden bg-black py-10">
      <div className="mx-auto max-w-7xl overflow-hidden px-6">
        <div
          className={`flex ${
            transitionEnabled
              ? "transition-transform duration-1000 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translateX(-${current * (100 / perView)}%)`,
          }}
        >
          {extendedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex h-24 shrink-0 items-center justify-center px-6"
              style={{
                width: `${100 / perView}%`,
              }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={160}
                height={60}
                className="max-h-14 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}