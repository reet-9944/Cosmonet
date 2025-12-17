import React, { useState } from 'react';

const GalaxyCarousel = ({ data, onBack }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    if (activeIndex < data.length - 1) setActiveIndex(activeIndex + 1);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const getCardStyle = (index) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);
    const isActive = offset === 0;

    if (isActive) {
      return {
        transform: `translateX(0) scale(1.1) translateZ(0) rotateY(0deg)`,
        opacity: 1,
        zIndex: 50,
        pointerEvents: 'auto',
        borderColor: '#22d3ee',
        boxShadow: '0 0 50px rgba(34, 211, 238, 0.5), 0 0 100px rgba(34, 211, 238, 0.3)'
      };
    }

    if (absOffset === 1) {
      return {
        transform: `translateX(${offset * 260}px) scale(0.85) translateZ(-100px) rotateY(${offset * -30}deg)`,
        opacity: 0.6,
        zIndex: 40,
        pointerEvents: 'auto',
        borderColor: '#06b6d4',
        boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
      };
    }

    return {
      transform: `translateX(${offset * 200}px) scale(0.7) translateZ(-200px) rotateY(${offset * -45}deg)`,
      opacity: 0.3,
      zIndex: 30,
      pointerEvents: 'auto',
      borderColor: '#0891b2',
      boxShadow: '0 0 10px rgba(8, 145, 178, 0.2)'
    };
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-cyan-950 via-blue-950 to-black flex flex-col font-sans overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none"></div>
      
      {/* Sparkling Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-20 p-8 flex justify-between items-center w-full h-24">
        <button 
          onClick={onBack} 
          className="text-white hover:text-cyan-400 flex items-center gap-2 transition text-lg font-bold tracking-widest uppercase"
        >
          <span className="text-2xl"></span> Back
        </button>
        <h2 className="text-cyan-400 tracking-[0.3em] text-xl md:text-2xl font-bold uppercase">
          Galactic Flow
        </h2>
      </div>

      {/* 3D Carousel */}
      <div 
        className="flex-1 flex items-center justify-center relative perspective-container" 
        style={{ perspective: '1200px' }}
      >
        <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center preserve-3d">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                ...getCardStyle(index),
                transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.6s, border-color 0.6s',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
              className="absolute w-[280px] h-[440px] rounded-2xl bg-gray-900 overflow-hidden cursor-pointer flex flex-col shadow-2xl origin-center"
            >
              {/* Overlay for non-active cards */}
              <div 
                className={`absolute inset-0 bg-black transition-opacity duration-500 z-20 pointer-events-none ${
                  index === activeIndex ? 'opacity-0' : 'opacity-60'
                }`}
              ></div>

              {/* Image */}
              <div className="h-3/4 w-full relative z-10 bg-gray-800">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
              </div>

              {/* Info */}
              <div className="h-1/4 bg-black p-4 flex flex-col items-center justify-center text-center border-t border-white/10 z-10">
                <div className="text-3xl mb-1">{item.icon}</div>
                <h3 className="text-white font-bold uppercase tracking-wider text-sm">
                  {item.name}
                </h3>
                <p className="text-cyan-400 text-[10px] mt-1 uppercase tracking-widest">
                  {item.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-20 pb-12 flex flex-col items-center gap-6">
        {/* Description */}
        <div className="text-center h-16 animate-fadeIn px-4">
          <p className="text-gray-300 text-lg max-w-xl mx-auto drop-shadow-md">
            {data[activeIndex].detailInfo}
          </p>
        </div>

      </div>
    </div>
  );
};

export default GalaxyCarousel;
