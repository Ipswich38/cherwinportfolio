'use client';

import { useState, useEffect } from 'react';

const projects = [
  { id: 1, title: 'Project Alpha', color: 'from-red-500 to-pink-500' },
  { id: 2, title: 'Project Beta', color: 'from-blue-500 to-cyan-500' },
  { id: 3, title: 'Project Gamma', color: 'from-green-500 to-teal-500' },
  { id: 4, title: 'Project Delta', color: 'from-yellow-500 to-orange-500' },
  { id: 5, title: 'Project Epsilon', color: 'from-purple-500 to-violet-500' },
  { id: 6, title: 'Project Zeta', color: 'from-indigo-500 to-blue-500' },
  { id: 7, title: 'Project Eta', color: 'from-teal-500 to-green-500' },
  { id: 8, title: 'Project Theta', color: 'from-orange-500 to-red-500' },
  { id: 9, title: 'Project Iota', color: 'from-cyan-500 to-blue-500' },
  { id: 10, title: 'Project Kappa', color: 'from-lime-500 to-green-500' },
  { id: 11, title: 'Project Lambda', color: 'from-amber-500 to-yellow-500' },
  { id: 12, title: 'Project Mu', color: 'from-emerald-500 to-teal-500' },
  { id: 13, title: 'Project Nu', color: 'from-violet-500 to-purple-500' },
  { id: 14, title: 'Project Xi', color: 'from-rose-500 to-pink-500' },
  { id: 15, title: 'Project Omicron', color: 'from-sky-500 to-cyan-500' },
  { id: 16, title: 'Project Pi', color: 'from-fuchsia-500 to-violet-500' },
  { id: 17, title: 'Project Rho', color: 'from-slate-500 to-gray-500' },
  { id: 18, title: 'Project Sigma', color: 'from-zinc-500 to-slate-500' },
  { id: 19, title: 'Project Tau', color: 'from-neutral-500 to-gray-500' },
  { id: 20, title: 'Project Phi', color: 'from-pink-500 to-rose-500' },
  { id: 21, title: 'Project Chi', color: 'from-emerald-400 to-cyan-400' },
  { id: 22, title: 'Project Psi', color: 'from-violet-400 to-purple-400' },
  { id: 23, title: 'Project Omega', color: 'from-orange-400 to-red-400' },
  { id: 24, title: 'Project Beta II', color: 'from-blue-400 to-indigo-400' },
  { id: 25, title: 'Project Final', color: 'from-rose-400 to-pink-400' }
];

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const getRowCol = (index: number) => {
    const row = Math.floor(index / 5);
    const col = index % 5;
    return { row, col };
  };

  const getSizeClasses = (index: number) => {
    const baseClasses = "relative overflow-hidden cursor-pointer transition-all duration-300 ease-out";
    
    if (hoveredIndex === index) {
      const { row, col } = getRowCol(index);
      
      // Check if we're on the bottom row (row 4) or right column (col 4)
      const isBottomRow = row === 4;
      const isRightCol = col === 4;
      
      if (isBottomRow && isRightCol) {
        // Bottom-right corner: expand up and left
        return `${baseClasses} col-span-2 row-span-2 z-20 col-start-4 row-start-4`;
      } else if (isBottomRow) {
        // Bottom row: expand upward
        return `${baseClasses} col-span-2 row-span-2 z-20 row-start-4`;
      } else if (isRightCol) {
        // Right column: expand leftward
        return `${baseClasses} col-span-2 row-span-2 z-20 col-start-4`;
      } else {
        // Normal expansion down and right
        return `${baseClasses} col-span-2 row-span-2 z-20`;
      }
    }
    
    if (hoveredIndex !== null && hoveredIndex !== index) {
      return `${baseClasses} col-span-1 row-span-1 opacity-60`;
    }

    return `${baseClasses} col-span-1 row-span-1`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Cherwin&apos;s Portfolio
        </h1>
        
        <div 
          className={`
            grid grid-cols-5 grid-rows-5 gap-0
            transition-all duration-300 ease-in-out
            ${isAnimating ? 'animate-pulse' : ''}
            border-4 border-slate-700 overflow-hidden
          `}
          style={{ 
            width: '600px', 
            height: '600px',
            aspectRatio: '1/1'
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={getSizeClasses(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className={`
                w-full h-full bg-gradient-to-br ${project.color}
                flex flex-col items-center justify-center
                relative group
              `}>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                
                <div className="text-center z-10 p-4">
                  <div className="text-white font-bold text-lg mb-2">
                    {project.title}
                  </div>
                  <div className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to explore
                  </div>
                </div>

                <div className="absolute top-2 right-2 text-white/60 text-xs">
                  #{project.id}
                </div>

                <div className="absolute inset-0 border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
