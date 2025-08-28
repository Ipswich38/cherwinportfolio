'use client';

import { useState, useEffect } from 'react';

const projects = [
  { id: 1, title: 'Project Alpha' },
  { id: 2, title: 'Project Beta' },
  { id: 3, title: 'Project Gamma' },
  { id: 4, title: 'Project Delta' },
  { id: 5, title: 'Project Epsilon' },
  { id: 6, title: 'Project Zeta' },
  { id: 7, title: 'Project Eta' },
  { id: 8, title: 'Project Theta' },
  { id: 9, title: 'Project Iota' },
  { id: 10, title: 'Project Kappa' },
  { id: 11, title: 'Project Lambda' },
  { id: 12, title: 'Project Mu' },
  { id: 13, title: 'Project Nu' },
  { id: 14, title: 'Project Xi' },
  { id: 15, title: 'Project Omicron' },
  { id: 16, title: 'Project Pi' },
  { id: 17, title: 'Project Rho' },
  { id: 18, title: 'Project Sigma' },
  { id: 19, title: 'Project Tau' },
  { id: 20, title: 'Project Phi' },
  { id: 21, title: 'Project Chi' },
  { id: 22, title: 'Project Psi' },
  { id: 23, title: 'Project Omega' },
  { id: 24, title: 'Project Beta II' },
  { id: 25, title: 'Project Final' }
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

  const getChessboardColor = (index: number) => {
    const { row, col } = getRowCol(index);
    const isLight = (row + col) % 2 === 0;
    return isLight ? 'bg-white' : 'bg-gray-800';
  };

  const getTextColor = (index: number) => {
    const { row, col } = getRowCol(index);
    const isLight = (row + col) % 2 === 0;
    return isLight ? 'text-gray-800' : 'text-white';
  };

  const getGridLayout = () => {
    if (hoveredIndex === null) {
      return {
        gridTemplateColumns: 'repeat(5, 120px)',
        gridTemplateRows: 'repeat(5, 120px)',
      };
    }

    const { row: hoveredRow, col: hoveredCol } = getRowCol(hoveredIndex);
    
    // For 3x3 expansion, we need to allocate more space
    // Total space: 600px, expanded box takes 300px, remaining 4 boxes get 75px each
    const colSizes = Array.from({ length: 5 }, (_, i) => {
      if (i === hoveredCol) return '300px'; // 3x expanded column
      return '75px'; // Heavily squeezed columns
    }).join(' ');
    
    const rowSizes = Array.from({ length: 5 }, (_, i) => {
      if (i === hoveredRow) return '300px'; // 3x expanded row
      return '75px'; // Heavily squeezed rows
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
              grid gap-0 overflow-hidden
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
                w-full h-full ${getChessboardColor(index)}
                relative group
                transition-all duration-300 ease-in-out
              `}>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                <div className="absolute bottom-2 left-2 z-10">
                  <div className={`${getTextColor(index)} font-light text-xs tracking-wide opacity-80`}>
                    {project.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </main>
    </div>
  );
}
