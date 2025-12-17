import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SimpleMissile = () => {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);

  const missileParts = [
    {
      id: 'nose',
      name: 'Nose Cone',
      info: 'Aerodynamic nose cone designed to reduce air resistance. Made of heat-resistant composite materials.',
      color: '#ef4444'
    },
    {
      id: 'guidance',
      name: 'Guidance System',
      info: 'Advanced navigation system with GPS and inertial guidance for precision targeting.',
      color: '#3b82f6'
    },
    {
      id: 'payload',
      name: 'Payload Bay',
      info: 'Houses satellites or scientific instruments. Protected by thermal shielding.',
      color: '#6b7280'
    },
    {
      id: 'fuel',
      name: 'Fuel Tank',
      info: 'Contains liquid oxygen and rocket fuel. Capacity: 500,000 liters at -183°C.',
      color: '#8b5cf6'
    },
    {
      id: 'engine',
      name: 'Engine Section',
      info: 'Main propulsion system. Thrust: 7.6 million pounds with vectoring capability.',
      color: '#1f2937'
    },
    {
      id: 'booster',
      name: 'Booster Stage',
      info: 'Reusable first stage with grid fins and landing legs for controlled descent.',
      color: '#f59e0b'
    }
  ];

  return (
    <div className="relative w-full py-20 flex items-center justify-center">
      <div className="relative">
        {/* SVG Missile */}
        <svg
          width="300"
          height="600"
          viewBox="0 0 300 600"
          className="drop-shadow-2xl"
        >
          {/* Nose Cone */}
          <motion.path
            d="M 150 20 L 100 120 L 200 120 Z"
            fill={hoveredPart === 'nose' ? '#22c55e' : '#ef4444'}
            stroke="#fff"
            strokeWidth="2"
            onMouseEnter={() => setHoveredPart('nose')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => setSelectedPart(missileParts[0])}
            className="cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          />

          {/* Guidance System */}
          <motion.rect
            x="100"
            y="120"
            width="100"
            height="80"
            fill={hoveredPart === 'guidance' ? '#22c55e' : '#3b82f6'}
            stroke="#fff"
            strokeWidth="2"
            onMouseEnter={() => setHoveredPart('guidance')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => setSelectedPart(missileParts[1])}
            className="cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          />

          {/* Payload Bay */}
          <motion.rect
            x="95"
            y="200"
            width="110"
            height="100"
            fill={hoveredPart === 'payload' ? '#22c55e' : '#6b7280'}
            stroke="#fff"
            strokeWidth="2"
            onMouseEnter={() => setHoveredPart('payload')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => setSelectedPart(missileParts[2])}
            className="cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          />

          {/* Fuel Tank */}
          <motion.rect
            x="90"
            y="300"
            width="120"
            height="120"
            fill={hoveredPart === 'fuel' ? '#22c55e' : '#8b5cf6'}
            stroke="#fff"
            strokeWidth="2"
            onMouseEnter={() => setHoveredPart('fuel')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => setSelectedPart(missileParts[3])}
            className="cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          />

          {/* Engine Section */}
          <motion.rect
            x="85"
            y="420"
            width="130"
            height="80"
            fill={hoveredPart === 'engine' ? '#22c55e' : '#1f2937'}
            stroke="#fff"
            strokeWidth="2"
            onMouseEnter={() => setHoveredPart('engine')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => setSelectedPart(missileParts[4])}
            className="cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          />

          {/* Booster Stage */}
          <motion.path
            d="M 100 500 L 80 550 L 150 580 L 220 550 L 200 500 Z"
            fill={hoveredPart === 'booster' ? '#22c55e' : '#f59e0b'}
            stroke="#fff"
            strokeWidth="2"
            onMouseEnter={() => setHoveredPart('booster')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => setSelectedPart(missileParts[5])}
            className="cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          />

          {/* Fins */}
          <motion.path
            d="M 80 480 L 40 520 L 80 520 Z"
            fill="#374151"
            stroke="#fff"
            strokeWidth="1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M 220 480 L 260 520 L 220 520 Z"
            fill="#374151"
            stroke="#fff"
            strokeWidth="1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Fire Effect */}
          <motion.ellipse
            cx="150"
            cy="590"
            rx="30"
            ry="40"
            fill="url(#fireGradient)"
            animate={{
              ry: [40, 50, 40],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <motion.ellipse
            cx="150"
            cy="595"
            rx="20"
            ry="30"
            fill="#ffff00"
            animate={{
              ry: [30, 40, 30],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="fireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff6b00" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff0000" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hover Label */}
        <AnimatePresence>
          {hoveredPart && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 glass-strong rounded-lg px-4 py-2 whitespace-nowrap"
            >
              <p className="text-green-400 font-bold">
                {missileParts.find(p => p.id === hoveredPart)?.name}
              </p>
              <p className="text-xs text-gray-400">Click for details</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {selectedPart && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 glass-strong rounded-2xl p-6 max-w-sm border-2 border-green-500"
          >
            <button
              onClick={() => setSelectedPart(null)}
              className="absolute top-3 right-3 text-white hover:text-red-400 text-xl"
            >
              ×
            </button>
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">{selectedPart.name}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{selectedPart.info}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 font-bold">Operational</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Temperature:</span>
                <span className="text-blue-400 font-bold">-180°C</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Pressure:</span>
                <span className="text-yellow-400 font-bold">350 PSI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};

export default SimpleMissile;
