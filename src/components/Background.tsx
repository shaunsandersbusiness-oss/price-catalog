import React, { useEffect, useState } from 'react';

export default function Background() {
  const [particles, setParticles] = useState<Array<{id: number, left: string, top: string, size: string, duration: string, delay: string}>>([]);

  useEffect(() => {
    // Generate static particles on mount to avoid hydration mismatch if we were using SSR (not strictly needed for SPA but good practice)
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 10 + 10}s`,
      delay: `${Math.random() * 5}s`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* Orbs */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.04] bg-regalis-gold animate-float-slow will-change-transform"
      />
      <div 
        className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.06] bg-regalis-navy animate-float-medium will-change-transform"
      />
      <div 
        className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full blur-[160px] opacity-[0.03] bg-regalis-gold animate-float-fast will-change-transform"
      />

      {/* Dust Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `drift ${p.duration} linear infinite`,
            animationDelay: p.delay,
            opacity: 0.08
          }}
        />
      ))}
    </div>
  );
}
