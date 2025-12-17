import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlackHoleArchive = ({ data, onBack }) => {
  // Expand data for scrolling effect
  const scrollData = useMemo(() => {
    let expanded = [];
    for (let i = 0; i < 5; i++) {
      expanded = [...expanded, ...data];
    }
    return expanded.map((item, idx) => ({ ...item, uniqueId: idx }));
  }, [data]);

  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedBlackHole, setSelectedBlackHole] = useState(null);

  const handleScroll = () => {
    if (!listRef.current) return;
    const container = listRef.current;
    const containerCenter = container.scrollTop + (container.clientHeight / 2);
    const items = container.children;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemCenter = item.offsetTop + (item.clientHeight / 2);
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const container = listRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => container && container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col font-sans">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#220033_0%,_#000000_100%)] pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-20 p-8 flex justify-between items-center shrink-0 h-24">
        <button 
          onClick={onBack} 
          className="text-white hover:text-purple-400 flex items-center gap-2 transition text-lg font-bold tracking-widest uppercase"
        >
          <span className="text-2xl">←</span> Back
        </button>
        <h2 className="text-purple-500 tracking-[0.5em] text-sm font-bold uppercase">
          Event Horizon
        </h2>
      </div>

      {/* Scrollable List */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto relative z-10 scrollbar-hide px-4 md:px-0 pt-32 pb-64"
        style={{ scrollBehavior: 'smooth' }}
      >
        {scrollData.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={item.uniqueId}
              className={`max-w-3xl mx-auto mb-16 rounded-3xl p-1 transition-all duration-500 ease-out transform origin-center ${
                isActive
                  ? 'scale-100 opacity-100 translate-y-0'
                  : 'scale-90 opacity-40 blur-[1px] translate-y-4'
              }`}
            >
              <div
                onClick={() => setSelectedBlackHole(item)}
                className={`relative overflow-hidden rounded-3xl bg-gray-900 border border-purple-500/30 cursor-pointer hover:scale-105 transition-transform ${
                  isActive ? 'shadow-[0_0_50px_rgba(168,85,247,0.3)] border-purple-500' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row h-auto md:h-[280px]">
                  {/* Icon Section */}
                  <div className="md:w-5/12 bg-black/50 flex items-center justify-center text-7xl md:text-8xl relative overflow-hidden py-8 md:py-0">
                    <span className="relative z-10">{item.icon}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0%,_#a855f7_100%)] animate-[spin_4s_linear_infinite] opacity-20"></div>
                    )}
                  </div>

                  {/* Info Section */}
                  <div className="md:w-7/12 p-8 flex flex-col justify-center bg-gradient-to-r from-gray-900 to-gray-800">
                    <h3
                      className={`text-3xl md:text-4xl font-black uppercase mb-2 ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      {item.name}
                    </h3>
                    <div className="inline-block bg-purple-900/50 text-purple-300 px-3 py-1 rounded text-xs font-bold tracking-widest w-fit mb-4 border border-purple-500/30">
                      {item.type}
                    </div>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                      {item.detailInfo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Black Hole Modal */}
      <AnimatePresence>
        {selectedBlackHole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedBlackHole(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: -30 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: 30 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-purple-950 via-black to-purple-950 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-500/50 shadow-2xl shadow-purple-500/50"
            >
              <div className="relative">
                {/* Header with Image */}
                <div className="relative h-80 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedBlackHole.image || 'https://museumsvictoria.com.au/media/1031/black-holes.jpg'}
                    alt={selectedBlackHole.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedBlackHole(null)}
                    className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-red-500 hover:rotate-90 transition-all duration-300 flex items-center justify-center text-2xl border border-white/20"
                  >
                    ×
                  </button>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="mb-4">
                      <h2 className="text-5xl font-black text-white uppercase tracking-tight mb-3">
                        {selectedBlackHole.name}
                      </h2>
                      <div className="inline-block bg-purple-600/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest">
                        {selectedBlackHole.type}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-3">Overview</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {selectedBlackHole.detailInfo}
                    </p>
                  </div>

                  {/* Key Facts */}
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-4">Key Facts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedBlackHole.facts?.map((fact, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-purple-900/30 backdrop-blur-md border border-purple-500/30 rounded-xl p-4"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-purple-400 text-2xl">•</span>
                            <span className="text-gray-200">{fact}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Scientific Details */}
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-4">Scientific Details</h3>
                    <div className="bg-black/50 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 space-y-3">
                      <div className="flex justify-between items-center border-b border-purple-500/20 pb-3">
                        <span className="text-gray-400">Mass:</span>
                        <span className="text-white font-bold">{selectedBlackHole.mass || 'Unknown'}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-purple-500/20 pb-3">
                        <span className="text-gray-400">Distance from Earth:</span>
                        <span className="text-white font-bold">{selectedBlackHole.distance || 'Unknown'}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-purple-500/20 pb-3">
                        <span className="text-gray-400">Discovery Year:</span>
                        <span className="text-white font-bold">{selectedBlackHole.discovered || 'Unknown'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Event Horizon:</span>
                        <span className="text-white font-bold">{selectedBlackHole.eventHorizon || 'Calculated'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    Explore More About {selectedBlackHole.name} →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlackHoleArchive;
