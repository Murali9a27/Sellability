"use client";

import { ReactNode, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PerView = {
  mobile: number;
  tablet: number;
  desktop: number;
};

type BaseSliderProps = {
  slides: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  showArrows?: boolean;
  showDots?: boolean;
  perView?: PerView;
  className?: string;
};

export default function BaseSlider({
  slides,
  autoPlay = true,
  interval = 4000,
  duration = 600,
  showArrows = true,
  showDots = true,
  perView = { mobile: 1, tablet: 1, desktop: 1 },
  className = "",
}: BaseSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(perView.desktop);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const totalSlides = slides.length;
  const extendedSlides = [...slides, ...slides];

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(perView.mobile);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(perView.tablet);
      } else {
        setVisibleCount(perView.desktop);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [perView.mobile, perView.tablet, perView.desktop]);

  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (currentIndex === 0) {
      setTransitionEnabled(false);
      setCurrentIndex(totalSlides);

      setTimeout(() => {
        setTransitionEnabled(true);
        setCurrentIndex(totalSlides - 1);
      }, 50);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || totalSlides <= visibleCount) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, totalSlides, visibleCount]);

  useEffect(() => {
    if (currentIndex === totalSlides) {
      const resetTimer = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(0);

        setTimeout(() => {
          setTransitionEnabled(true);
        }, 50);
      }, duration);

      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, totalSlides, duration]);

  if (!slides.length) return null;

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        className="flex"
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          transition: transitionEnabled
            ? `transform ${duration}ms ease-in-out`
            : "none",
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={index}
            className="shrink-0"
            style={{
              width: `${100 / visibleCount}%`,
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {showArrows && totalSlides > visibleCount && (
        <>
          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-[#E25C2D]"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-[#E25C2D]"
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {showDots && visibleCount === 1 && totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                currentIndex % totalSlides === index
                  ? "w-6 bg-[#E25C2D]"
                  : "w-2.5 bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}