'use client';

import { useState, useEffect } from 'react';

const projects = [
  { 
    id: 1, 
    title: 'The Good Loose Coins',
    description: 'Social impact platform transforming spare change into community support',
    url: 'https://thegoodloosecoins.vercel.app/',
    tech: ['Next.js', 'TypeScript', 'Supabase'],
    features: ['Micro-donations', 'Community Impact', 'Education Support'],
    hasPreview: true,
    videoPreview: '/projects/thegoodloosecoins.mov'
  },
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
    const row = Math.floor(index / 4);
    const col = index % 4;
    return { row, col };
  };

  const getBoxColor = () => {
    return 'bg-black';
  };

  const getTextColor = () => {
    return 'text-white';
  };

  const getGridLayout = () => {
    if (hoveredIndex === null) {
      return {
        gridTemplateColumns: 'repeat(4, 180px)',
        gridTemplateRows: 'repeat(4, 180px)',
      };
    }

    const { row: hoveredRow, col: hoveredCol } = getRowCol(hoveredIndex);
    
    // For 3x3 expansion, we need to allocate more space
    // Total space: 720px, expanded box takes 360px, remaining 3 boxes get 120px each
    const colSizes = Array.from({ length: 4 }, (_, i) => {
      if (i === hoveredCol) return '360px'; // 3x expanded column
      return '120px'; // Squeezed columns
    }).join(' ');
    
    const rowSizes = Array.from({ length: 4 }, (_, i) => {
      if (i === hoveredRow) return '360px'; // 3x expanded row
      return '120px'; // Squeezed rows
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
    <div className="min-h-screen bg-gradient-to-br from-surface via-surface to-surface-container">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-r from-transparent via-green-500/10 to-transparent"></div>
      
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen p-8 relative z-10">
        <div className="flex items-center justify-between w-full h-full">
          <div className="w-3/4 flex items-center justify-center">
            <div 
              className={`
                grid gap-0 overflow-hidden
                transition-all duration-300 ease-in-out
                ${isAnimating ? 'animate-pulse' : ''}
                shadow-2xl elevation-3 rounded-lg
                ring-1 ring-green-500/10
                backdrop-blur-sm
              `}
              style={{ 
                ...getGridLayout()
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
            {projects.slice(0, 16).map((project, index) => (
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
                  w-full h-full ${getBoxColor()}
                  relative group
                  transition-all duration-300 ease-in-out
                  overflow-hidden
                  border-[0.5px] border-green-500
                `}>
                  {/* Video preview for projects with hasPreview */}
                  {project.hasPreview && project.videoPreview && (
                    <div className="absolute inset-0 z-20 overflow-hidden">
                      <video
                        src={project.videoPreview}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        onError={(e) => console.log('Video failed to load:', e)}
                      />
                      
                      {/* Overlay with project info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                      
                      {/* Project title overlay */}
                      <div className="absolute bottom-4 left-4 text-white z-10">
                        <div className="text-lg font-medium">{project.title}</div>
                        <div className="text-xs opacity-80 mt-1">Click to explore live site ↗</div>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  
                  {/* Project info */}
                  <div className="absolute bottom-2 left-2 z-10">
                    <div className={`${getTextColor()} font-light text-xs tracking-wide opacity-80`}>
                      {project.title}
                    </div>
                    {project.description && hoveredIndex === index && (
                      <div className={`${getTextColor()} font-light text-xs opacity-60 mt-1`}>
                        {project.description}
                      </div>
                    )}
                  </div>

                  {/* Tech stack indicator */}
                  {project.tech && hoveredIndex === index && (
                    <div className="absolute top-2 right-2 z-10">
                      <div className="flex gap-1">
                        {project.tech.slice(0, 2).map((tech, i) => (
                          <span
                            key={i}
                            className={`${getTextColor()} text-xs font-light opacity-50 bg-white/10 px-1 rounded`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Click to open indicator */}
                  {project.url && hoveredIndex === index && (
                    <div 
                      className="absolute inset-0 cursor-pointer z-30"
                      onClick={() => window.open(project.url, '_blank')}
                      title={`Open ${project.title}`}
                    >
                      <div className="absolute bottom-2 right-2">
                        <div className={`${getTextColor()} text-xs opacity-60`}>
                          ↗
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
          
          <div className="w-1/4 flex flex-col items-center justify-center space-y-8">
            <div className="text-center">
              <h1 className="text-[44px] font-thin text-on-surface tracking-wide mb-2">
                Cherwin Fernandez
              </h1>
              <p className="text-sm text-on-surface/70 font-light tracking-wide">
                Full Stack Developer & UI/UX Designer
              </p>
            </div>
            
            <div className="flex flex-col space-y-3 w-full max-w-[200px]">
              <button className="
                bg-green-600 hover:bg-green-700 
                text-white font-medium text-sm
                px-6 py-3 rounded-lg
                transition-all duration-200 ease-out
                hover:shadow-lg hover:scale-[1.02]
                active:scale-[0.98]
                border border-green-500
              ">
                Download CV
              </button>
              
              <button className="
                bg-transparent hover:bg-green-50 dark:hover:bg-green-950/20
                text-green-600 dark:text-green-400 font-medium text-sm
                px-6 py-3 rounded-lg
                transition-all duration-200 ease-out
                hover:shadow-md hover:scale-[1.02]
                active:scale-[0.98]
                border border-green-500 hover:border-green-600
              ">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
