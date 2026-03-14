import { useEffect, useState } from 'react';

function CssCube({ size, colorClass, animationDuration, delay, top, left }) {
  const half = size / 2;
  return (
    <div className="css-cube-wrapper" style={{ top, left, width: size, height: size, animationDelay: delay, animationDuration: animationDuration }}>
      <div className={`css-cube ${colorClass}`} style={{ animationDuration: animationDuration }}>
        <div className="face front" style={{ transform: `translateZ(${half}px)` }}></div>
        <div className="face back" style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}></div>
        <div className="face right" style={{ transform: `rotateY(90deg) translateZ(${half}px)` }}></div>
        <div className="face left" style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }}></div>
        <div className="face top" style={{ transform: `rotateX(90deg) translateZ(${half}px)` }}></div>
        <div className="face bottom" style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }}></div>
      </div>
    </div>
  );
}

export default function Hero3D() {
  const [cubes, setCubes] = useState([]);

  useEffect(() => {
    // Generate real 3D CSS cubes
    const generatedCubes = Array.from({ length: 24 }).map((_, i) => {
      const isPurple = i % 2 === 0;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.max(30, Math.random() * 120),
        duration: `${25 + Math.random() * 35}s`,
        delay: `-${Math.random() * 40}s`,
        colorClass: isPurple ? 'cube-purple' : 'cube-blue'
      };
    });
    setCubes(generatedCubes);
  }, []);

  return (
    <div className="css-3d-background">
      <div className="cubes-container">
        {cubes.map(cube => (
          <CssCube 
            key={cube.id}
            size={cube.size}
            top={cube.top}
            left={cube.left}
            animationDuration={cube.duration}
            delay={cube.delay}
            colorClass={cube.colorClass}
          />
        ))}
      </div>
      
      {/* Central glowing orb for depth */}
      <div className="central-glow-orb"></div>
    </div>
  );
}
