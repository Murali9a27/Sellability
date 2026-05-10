// PropertyNavigator.tsx
'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Heart } from 'lucide-react';

const PROPERTIES = [
  {
    id: 1,
    name: 'Ocean View Manor',
    location: 'Seaside City, CA 90210',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    name: 'Willowbrook Estates',
    location: 'Woodland Heights, TX 77002',
    image: 'https://images.unsplash.com/photo-1600607687940-467f4b637779?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 3,
    name: 'Sunset Ridge Villas',
    location: 'Desert Hills, FL 33602',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 4,
    name: 'Cedarwood Retreat',
    location: 'Serenity Springs, AZ 85001',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 5,
    name: 'Lakeside Haven',
    location: 'Waterfront Bay, MN 55431',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 6,
    name: 'Mountain View Acres',
    location: 'Mountainville, CO 81101',
    image: 'https://images.unsplash.com/photo-1580587767073-424a10688321?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 7,
    name: 'Oakridge Meadows',
    location: 'Peaceful Grove, WA 98001',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200',
  },
];

export default function PropertyNavigator() {
  const [activeIndex, setActiveIndex] = useState(4); // Defaulting to Lakeside Haven

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : PROPERTIES.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < PROPERTIES.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] overflow-hidden font-sans">
      
      {/* LEFT SIDE: Dynamic Image Section */}
      <div className="relative w-1/2 h-full transition-all duration-700 ease-in-out">
        <img
          src={PROPERTIES[activeIndex].image}
          alt={PROPERTIES[activeIndex].name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Overlay gradient for UI depth */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* CENTER: Navigation Dial Component */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        {/* Navigation Buttons */}
        <div className="flex flex-col gap-4 mb-2">
          <button 
            onClick={handlePrevious}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <ChevronUp size={20} className="text-gray-600" />
          </button>
          
          <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-center p-4 border-4 border-white shadow-xl">
            <span className="text-white text-[10px] uppercase font-bold leading-tight">
              View All Building
            </span>
          </div>

          <button 
            onClick={handleNext}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <ChevronDown size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive List Section */}
      <div className="w-1/2 h-full flex flex-col justify-center pl-24 pr-12 relative bg-white">
        {/* Faded background curve effect */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
        
        <div className="flex flex-col gap-8">
          {PROPERTIES.map((prop, index) => {
            const isActive = index === activeIndex;
            // Calculate horizontal offset for the "curved" look
            const offset = Math.abs(index - activeIndex) * 20;
            
            return (
              <div
                key={prop.id}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer transition-all duration-500 ease-out flex items-center group`}
                style={{
                  transform: `translateX(${isActive ? 0 : offset}px)`,
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute -left-12 flex items-center">
                    <div className="w-8 h-[1px] bg-orange-500" />
                    <div className="w-2 h-2 rounded-full bg-orange-500 -ml-1" />
                  </div>
                )}

                <div className={`
                  p-3 rounded-full transition-all
                  ${isActive ? 'border border-orange-500 px-6' : 'border-transparent'}
                `}>
                  <h3 className={`text-lg font-semibold ${isActive ? 'text-orange-600' : 'text-gray-800'}`}>
                    {prop.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    {prop.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Social Action */}
        {/* <div className="absolute bottom-10 right-10 flex flex-col items-center gap-1">
          <button className="p-4 rounded-full bg-white shadow-xl hover:scale-110 transition-transform">
            <Heart size={24} className="text-gray-300 fill-current group-hover:text-red-500" />
          </button>
          <span className="text-sm font-bold text-gray-400">231</span>
        </div> */}
      </div>

    </div>
  );
}