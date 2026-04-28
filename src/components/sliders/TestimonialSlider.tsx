"use client";

import { useState, useEffect } from "react";
import BaseSlider from "./BaseSlider";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  text: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    role: "CEO, Company ABC",
    text: "Sellability transformed our business and accelerated our growth. Highly recommend!",
    image: "/images/testimonials/john_doe.jpg",
  },
  {
    name: "Jane Smith",
    role: "Project Manager, XYZ Ltd.",
    text: "The team at Sellability exceeded expectations in every way. Their approach is next level.",
    image: "/images/testimonials/jane_smith.jpg",
  },
  {
    name: "John Doe",
    role: "CEO, Company ABC",
    text: "Sellability transformed our business and accelerated our growth. Highly recommend!",
    image: "/images/testimonials/john_doe.jpg",
  },
  {
    name: "Jane Smith",
    role: "Project Manager, XYZ Ltd.",
    text: "The team at Sellability exceeded expectations in every way. Their approach is next level.",
    image: "/images/testimonials/jane_smith.jpg",
  },
  {
    name: "Michael Lee",
    role: "Founder, TechCorp",
    text: "A game-changing partner for scaling up projects. The results speak for themselves.",
    image: "/images/testimonials/michael_lee.jpg",
  },
];

export default function TestimonialSlider() {
  const slides = testimonials.map((testimonial) => (
    <div key={testimonial.name} className="flex flex-col items-center text-center px-6 py-8 bg-gray-800 rounded-lg">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-20 h-20 rounded-full object-cover mb-4"
      />
      <p className="text-white text-xl font-semibold">{testimonial.name}</p>
      <p className="text-sm text-gray-400 mb-4">{testimonial.role}</p>
      <p className="text-white/70">{testimonial.text}</p>
    </div>
  ));

  return (
    <section className="w-full overflow-hidden py-20 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <BaseSlider
          slides={slides}
          autoPlay={true}
          interval={5000}
          duration={1000}
          perView={{ mobile: 1, tablet: 2, desktop: 3 }}
          showArrows={true}
          showDots={true}
          className="w-full"
        />
      </div>
    </section>
  );
}