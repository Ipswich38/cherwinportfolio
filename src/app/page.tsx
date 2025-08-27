'use client';

import { useState } from 'react';

const colors = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
  'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-amber-500',
  'bg-emerald-500', 'bg-violet-500', 'bg-rose-500', 'bg-sky-500',
  'bg-fuchsia-500', 'bg-slate-500', 'bg-zinc-500', 'bg-neutral-500'
];

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100">
      <div 
        className="grid grid-cols-5 grid-rows-4 w-[600px] h-[480px] border-4 border-gray-800"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            className={`
              ${color} 
              transition-all 
              duration-300 
              ease-in-out 
              cursor-pointer
              flex 
              items-center 
              justify-center 
              text-white 
              font-bold 
              text-lg
              ${hoveredIndex === index 
                ? 'scale-150 z-10 shadow-2xl' 
                : hoveredIndex !== null 
                  ? 'scale-75 opacity-70' 
                  : 'scale-100'
              }
            `}
            onMouseEnter={() => setHoveredIndex(index)}
            style={{
              transformOrigin: 'center',
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
