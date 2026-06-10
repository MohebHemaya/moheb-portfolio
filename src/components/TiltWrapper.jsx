import { useState, useRef, useCallback } from 'react';

export default function TiltWrapper({ children, className = '' }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt (max 12 degrees)
    const tiltX = ((y - centerY) / centerY) * -12; 
    const tiltY = ((x - centerX) / centerX) * 12;
    
    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-full transition-all duration-300 ease-out"
        style={{
          transform: isHovered 
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)` 
            : 'rotateX(0) rotateY(0) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
        
        {/* Glare effect */}
        {isHovered && (
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 z-10 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${tilt.y * 5 + 50}% ${tilt.x * -5 + 50}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
