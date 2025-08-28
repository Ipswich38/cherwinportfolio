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

  const getGridLayout = () => {
    if (hoveredIndex === null) {
      return {
        gridTemplateColumns: 'repeat(5, 120px)',
        gridTemplateRows: 'repeat(5, 120px)',
      };
    }

    const { row: hoveredRow, col: hoveredCol } = getRowCol(hoveredIndex);
    
    // Create grid where hovered position gets more space, others get squeezed
    const colSizes = Array.from({ length: 5 }, (_, i) => {
      if (i === hoveredCol) return '200px'; // Expanded column
      return '100px'; // Squeezed columns
    }).join(' ');
    
    const rowSizes = Array.from({ length: 5 }, (_, i) => {
      if (i === hoveredRow) return '200px'; // Expanded row
      return '100px'; // Squeezed rows
    }).join(' ');
    
    return {
      gridTemplateColumns: colSizes,
      gridTemplateRows: rowSizes,
    };
  };

  const getSizeClasses = (index: number) => {
    const baseClasses = "cursor-pointer transition-all duration-300 ease-out";
    
    if (hoveredIndex !== null && hoveredIndex !== index) {
      return `${baseClasses} opacity-70`;
    }
    
    return baseClasses;
  };

  const getGridPosition = (index: number) => {
    const { row, col } = getRowCol(index);
    return {
      gridColumn: col + 1,
      gridRow: row + 1,
    };
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Material 3 Header */}
      <header className="w-full bg-surface-container shadow-sm border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-medium text-on-surface tracking-tight">
              Cherwin
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 bg-primary text-on-primary rounded-full font-medium text-sm hover:shadow-md transition-all duration-200 hover:bg-primary-container hover:text-on-primary-container">
              CV
            </button>
            <button className="px-6 py-2 bg-secondary text-on-secondary rounded-full font-medium text-sm hover:shadow-md transition-all duration-200 hover:bg-secondary-container hover:text-on-secondary-container">
              Contact Me
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="text-4xl font-light text-on-surface mb-2">
              Portfolio
            </h2>
            <p className="text-lg text-on-surface-variant">
              Explore my projects
            </p>
          </div>
          
          <div 
            className={`
              grid gap-0 rounded-3xl overflow-hidden
              transition-all duration-300 ease-in-out
              ${isAnimating ? 'animate-pulse' : ''}
              shadow-lg elevation-2
            `}
            style={{ 
              ...getGridLayout()
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
                ...getGridPosition(index),
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
      </main>
    </div>
  );
}
