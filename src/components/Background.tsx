import React from 'react';

export default function Background() {
  // Generate random delays for particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${17 + Math.random() * 10}s`
    }
  }));

  return (
    <>
      {/* Layer 1: Gradient Base */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.03) 0%, rgba(26,26,46,0.04) 40%, transparent 70%)'
        }}
      />

      {/* Layer 2: Floating Glow Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Layer 3: Gold Dust Particles */}
      {particles.map(p => (
        <div 
          key={p.id} 
          className="gold-particle" 
          style={p.style}
        />
      ))}

      {/* Layer 4: Horizon Shimmer Line */}
      <div className="horizon-shimmer"></div>
    </>
  );
}
