'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Heart } from 'lucide-react';

const PROPERTIES = [
  { id: 1, name: 'Ocean View Manor', location: 'Seaside City, CA 90210', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000' },
  { id: 2, name: 'Willowbrook Estates', location: 'Woodland Heights, TX 77002', img: 'https://images.unsplash.com/photo-1600607687940-467f4b637779?q=80&w=1000' },
  { id: 3, name: 'Sunset Ridge Villas', location: 'Desert Hills, FL 33602', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000' },
  { id: 4, name: 'Cedarwood Retreat', location: 'Serenity Springs, AZ 85001', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000' },
  { id: 5, name: 'Lakeside Haven', location: 'Waterfront Bay, MN 55431', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000' },
  { id: 6, name: 'Mountain View Acres', location: 'Mountainville, CO 81101', img: 'https://images.unsplash.com/photo-1580587767073-424a10688321?q=80&w=1000' },
  { id: 7, name: 'Oakridge Meadows', location: 'Peaceful Grove, WA 98001', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000' },
  { id: 8, name: 'Riverbend Ranch', location: 'Riverside Ranch, OR 97001', img: 'https://images.unsplash.com/photo-1449156059431-787c5b7ad997?q=80&w=1000' },
];

export default function PropertyNavigator() {
  const [activeIndex, setActiveIndex] = useState(4); // Default to Lakeside Haven

  const handlePrev = () => setActiveIndex((p) => (p > 0 ? p - 1 : PROPERTIES.length - 1));
  const handleNext = () => setActiveIndex((p) => (p < PROPERTIES.length - 1 ? p + 1 : 0));

  return (
    <div className="relative flex h-screen w-full bg-[#F5F5F5] overflow-hidden select-none">
      
      {/* LEFT: Image Section */}
      <div className="relative w-1/2 h-full overflow-hidden">
        {PROPERTIES.map((prop, i) => (
          <div
            key={prop.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            <img src={prop.img} alt={prop.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        ))}
      </div>

      {/* CENTER: The Control Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6">
        <button onClick={handlePrev} className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 border border-gray-100">
          <ChevronUp size={20} className="text-gray-400" />
        </button>

        <div className="group relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-black rounded-full shadow-2xl transition-transform group-hover:scale-105" />
          <span className="relative text-[10px] text-white font-bold uppercase tracking-widest text-center px-4 leading-tight">
            View All Building
          </span>
        </div>

        <button onClick={handleNext} className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 border border-gray-100">
          <ChevronDown size={20} className="text-gray-400" />
        </button>
      </div>

      {/* RIGHT: The Curved List */}
      <div className="relative w-1/2 h-full flex flex-col justify-center items-start pl-32 bg-white">
        
        {/* Decorative subtle arc line */}
        <div className="absolute left-[-150px] top-1/2 -translate-y-1/2 w-[400px] h-[800px] border-r border-dashed border-gray-200 rounded-full pointer-events-none" />

        <div className="relative space-y-2">
          {PROPERTIES.map((prop, i) => {
            const distance = i - activeIndex;
            const isActive = i === activeIndex;
            
            // MATH FOR CURVE:
            // Calculate horizontal offset (x) based on distance from center (y)
            // Using a simple parabolic curve: x = distance^2 * factor
            const translateX = Math.pow(Math.abs(distance), 1.6) * 15;
            const opacity = Math.max(1 - Math.abs(distance) * 0.25, 0.1);
            const scale = isActive ? 1 : 0.9;

            return (
              <div
                key={prop.id}
                onClick={() => setActiveIndex(i)}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity: opacity,
                }}
                className={`
                  relative cursor-pointer transition-all duration-700 ease-out py-2 flex items-center
                  ${isActive ? 'z-10' : 'z-0'}
                `}
              >
                {/* Active Selection Indicator */}
                {isActive && (
                  <div className="absolute left-[-60px] flex items-center animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E87D44]" />
                    <div className="w-12 h-[1px] bg-[#E87D44]" />
                  </div>
                )}

                <div className={`
                  px-6 py-2 rounded-full transition-all duration-500
                  ${isActive ? 'border border-[#E87D44] bg-white' : 'border-transparent'}
                `}>
                  <h3 className={`
                    text-lg font-medium tracking-tight whitespace-nowrap transition-colors duration-500
                    ${isActive ? 'text-black' : 'text-gray-400'}
                  `}>
                    {prop.name}
                  </h3>
                  <p className={`
                    text-[10px] uppercase tracking-wider font-semibold transition-colors duration-500
                    ${isActive ? 'text-gray-500' : 'text-gray-300'}
                  `}>
                    {prop.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interaction Footer */}
        <div className="absolute bottom-12 right-12 flex flex-col items-center gap-2 group">
          <button className="relative w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-50 transition-transform hover:scale-110">
            <Heart size={24} className="text-gray-200 group-hover:text-red-500 group-hover:fill-red-500 transition-all" />
          </button>
          <span className="text-sm font-bold text-gray-400 tabular-nums">231</span>
        </div>
      </div>

    </div>
  );
}