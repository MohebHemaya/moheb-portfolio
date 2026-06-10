import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScroll(scrolled);
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-dark-800/20">
      <div 
        className="h-full bg-gradient-to-r from-primary-500 via-accent to-emerald-400"
        style={{ width: `${scroll}%`, transition: 'width 0.1s ease-out' }}
      />
      {/* Glow */}
      <div 
        className="absolute top-0 left-0 h-1 bg-primary-400/50 blur-[4px]"
        style={{ width: `${scroll}%`, transition: 'width 0.1s ease-out' }}
      />
    </div>
  );
}
