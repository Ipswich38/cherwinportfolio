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
    const baseClasses = "cursor-pointer transition-all duration-300 ease-out relative";
    
    if (hoveredIndex === index) {
      return `${baseClasses} z-20`;
    }
    
    if (hoveredIndex !== null && hoveredIndex !== index) {
      return `${baseClasses} opacity-70`;
    }
    
    return baseClasses;
  };

  const getBoxStyles = (index: number) => {
    const { row, col } = getRowCol(index);
    
    if (hoveredIndex === null) {
      return {};
    }

    if (hoveredIndex === index) {
      // Expanded box - make it 2x2 square but stay within bounds
      const { row: hoveredRow, col: hoveredCol } = getRowCol(hoveredIndex);
      const isBottomRow = hoveredRow === 4;
      const isRightCol = hoveredCol === 4;
      
      const transform = 'scale(2)';
      let transformOrigin = 'top left';
      
      if (isBottomRow && isRightCol) {
        transformOrigin = 'bottom right';
      } else if (isBottomRow) {
        transformOrigin = 'bottom left';
      } else if (isRightCol) {
        transformOrigin = 'top right';
      }
      
      return {
        transform,
        transformOrigin,
        zIndex: 20,
      };
    }

    // Non-hovered boxes - calculate distance-based shrinking
    const { row: hoveredRow, col: hoveredCol } = getRowCol(hoveredIndex);
    const distance = Math.abs(row - hoveredRow) + Math.abs(col - hoveredCol);
    
    // Boxes closer to hovered box shrink more
    const maxDistance = 8; // Max Manhattan distance in 5x5 grid
    const shrinkFactor = Math.max(0.4, 1 - (distance / maxDistance) * 0.5);
    
    // Calculate push direction away from hovered box
    const pushX = col === hoveredCol ? 0 : (col > hoveredCol ? 5 : -5);
    const pushY = row === hoveredRow ? 0 : (row > hoveredRow ? 5 : -5);
    
    // Reduce push for edge boxes
    const edgeFactorX = (col === 0 || col === 4) ? 0.3 : 1;
    const edgeFactorY = (row === 0 || row === 4) ? 0.3 : 1;
    
    return {
      transform: `scale(${shrinkFactor}) translate(${pushX * edgeFactorX}px, ${pushY * edgeFactorY}px)`,
      transformOrigin: 'center',
    };
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
                ...getBoxStyles(index),
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
