import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => setPosition({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button, input, textarea {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Center Dot */}
      <div 
        className={`fixed top-0 left-0 w-2 h-2 bg-primary-400 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden md:block ${clicked ? 'scale-75' : 'scale-100'}`}
        style={{ transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)` }}
      />
      
      {/* Outer Ring */}
      <div 
        className={`fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out hidden md:block ${
          hovered 
            ? 'scale-[1.8] bg-primary-500/10 border-primary-400/30 backdrop-blur-[1px]' 
            : 'scale-100 border-primary-500/50'
        } ${clicked ? 'scale-90 border-primary-400' : ''}`}
        style={{ transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)` }}
      />
    </>
  );
}
