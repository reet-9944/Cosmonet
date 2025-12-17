import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PlanetCard = ({ planet, index, onClick }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="min-h-screen flex items-center justify-center px-8 py-20"
    >
      <div className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <motion.h3 
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            {planet.name}
          </motion.h3>
          <p className="text-xl text-cyan-300 font-semibold">{planet.distance}</p>
          <p className="text-xl text-gray-300 leading-relaxed">{planet.details}</p>
          <div className="flex flex-wrap gap-3">
            {planet.features.map((feature, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="glass-strong px-4 py-2 rounded-full text-cyan-300 text-sm font-medium border border-cyan-500/30"
              >
                ✓ {feature}
              </motion.span>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClick(planet)}
            className="glass-strong px-8 py-4 rounded-2xl text-white font-bold text-lg hover:bg-cyan-600/20 transition-all duration-300 border-2 border-cyan-500"
          >
            Explore {planet.name} →
          </motion.button>
        </motion.div>

        {/* Visual Side - Planet Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <div className="glass-strong rounded-3xl p-12 relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-500">
            {/* Animated background gradient */}
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0"
            />
            
            {/* Planet Image */}
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
                className="relative"
              >
                <img 
                  src={planet.image}
                  alt={planet.name}
                  className="w-full h-80 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>
              
              {/* Orbiting particles */}
              <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 5 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0"
                  >
                    <div 
                      className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                      style={{
                        top: '50%',
                        left: `${20 + i * 30}%`,
                        transform: 'translateY(-50%)'
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const GalaxyCard = ({ galaxy, index, onClick }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="min-h-screen flex items-center justify-center px-8 py-20"
    >
      <div className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <motion.h3 
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
          >
            {galaxy.name}
          </motion.h3>
          <p className="text-xl text-purple-300 font-semibold">{galaxy.type}</p>
          <p className="text-xl text-gray-300 leading-relaxed">{galaxy.details}</p>
          <div className="flex flex-wrap gap-3">
            {galaxy.features.map((feature, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="glass-strong px-4 py-2 rounded-full text-purple-300 text-sm font-medium border border-purple-500/30"
              >
                ✓ {feature}
              </motion.span>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClick(galaxy)}
            className="glass-strong px-8 py-4 rounded-2xl text-white font-bold text-lg hover:bg-purple-600/20 transition-all duration-300 border-2 border-purple-500"
          >
            Explore {galaxy.name} →
          </motion.button>
        </motion.div>

        {/* Visual Side - Galaxy Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <div className="glass-strong rounded-3xl p-12 relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-500">
            {/* Animated background gradient */}
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0"
            />
            
            {/* Galaxy Image */}
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.08, 1]
                }}
                transition={{ 
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity }
                }}
                className="relative"
              >
                <img 
                  src={galaxy.image}
                  alt={galaxy.name}
                  className="w-full h-80 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>
              
              {/* Spiral particles */}
              <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: -360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      rotate: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, delay: i * 0.2 }
                    }}
                    className="absolute inset-0"
                  >
                    <div 
                      className="absolute w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                      style={{
                        top: `${30 + i * 10}%`,
                        left: `${30 + i * 10}%`
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ModernExploreCosmos = ({ onCategorySelect }) => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedGalaxy, setSelectedGalaxy] = useState(null);
  const [showBlackHoleModal, setShowBlackHoleModal] = useState(false);
  const [showSpeedOfLightModal, setShowSpeedOfLightModal] = useState(false);
  const [showUniverseModal, setShowUniverseModal] = useState(false);
  const [showNeutronStarModal, setShowNeutronStarModal] = useState(false);

  const [headerRef, headerInView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  // Planet data with features
  const planets = [
    {
      id: 'mercury',
      name: 'Mercury',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg',
      distance: '57.9 million km from Sun',
      details: 'Mercury is the smallest and fastest planet in our solar system. Its surface is covered with craters and it has extreme temperature variations from -173°C to 427°C.',
      features: ['Fastest orbit', 'No atmosphere', 'Extreme temperatures', 'Heavily cratered']
    },
    {
      id: 'venus',
      name: 'Venus',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg',
      distance: '108.2 million km from Sun',
      details: 'Venus has a thick atmosphere of carbon dioxide with clouds of sulfuric acid, making it the hottest planet in our solar system despite not being closest to the Sun.',
      features: ['Hottest planet', 'Toxic atmosphere', 'Retrograde rotation', 'Volcanic surface']
    },
    {
      id: 'earth',
      name: 'Earth',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
      distance: '149.6 million km from Sun',
      details: 'Earth is the only known planet with life. It has liquid water, a protective atmosphere, and perfect conditions for diverse ecosystems to thrive.',
      features: ['Only life-bearing', 'Liquid water', 'Protective atmosphere', 'Dynamic geology']
    },
    {
      id: 'mars',
      name: 'Mars',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
      distance: '227.9 million km from Sun',
      details: 'Mars is known for its reddish appearance due to iron oxide. It has the largest volcano (Olympus Mons) and canyon (Valles Marineris) in the solar system.',
      features: ['Red planet', 'Largest volcano', 'Polar ice caps', 'Potential for life']
    }
  ];

  // Galaxy data with features
  const galaxies = [
    {
      id: 'milky-way',
      name: 'Milky Way',
      image: 'https://media.istockphoto.com/id/481229372/photo/spiral-galaxy-illustration-of-milky-way.jpg?s=612x612&w=0&k=20&c=O-OKRJWM_XhGv48z6OhOj_tKBwEaDsvhYKguEN1yuJM=',
      type: 'Barred Spiral Galaxy',
      details: 'The Milky Way is our home galaxy, a barred spiral galaxy containing 200-400 billion stars. It spans about 100,000 light-years and our solar system is located about 26,000 light-years from the galactic center.',
      features: ['Our home', '200-400B stars', '100,000 light-years', 'Supermassive black hole']
    },
    {
      id: 'andromeda',
      name: 'Andromeda',
      image: 'https://cdn.mos.cms.futurecdn.net/v2/t:0,l:268,cw:1606,ch:1205,q:80,w:1606/hCXYB5YKXzdq2WEHYEe36d.jpg',
      type: 'Spiral Galaxy',
      details: 'Andromeda is the closest large galaxy to the Milky Way and is on a collision course with us, expected to merge in 4.5 billion years to form a giant elliptical galaxy.',
      features: ['Nearest major galaxy', '1 trillion stars', 'Collision course', '2.5M light-years away']
    },
    {
      id: 'whirlpool',
      name: 'Whirlpool Galaxy',
      image: 'https://cdn.mos.cms.futurecdn.net/ch5qEKob8RmEjK3etdE32E.jpg',
      type: 'Grand Design Spiral',
      details: 'The Whirlpool Galaxy is famous for its well-defined spiral arms and is interacting with a smaller companion galaxy, creating spectacular star formation regions.',
      features: ['Perfect spiral', 'Interacting pair', 'Star formation', '23M light-years away']
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1500],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
              boxShadow: '0 0 4px rgba(34, 211, 238, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: -50 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="pt-32 pb-20 text-center relative z-10"
      >
        <motion.h1
          animate={{
            textShadow: [
              '0 0 20px rgba(34, 211, 238, 0.5)',
              '0 0 40px rgba(168, 85, 247, 0.8)',
              '0 0 20px rgba(34, 211, 238, 0.5)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6"
        >
          Explore Cosmos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-2xl text-gray-400 max-w-3xl mx-auto"
        >
          Journey through the wonders of our solar system and beyond
        </motion.p>
      </motion.div>

      {/* Planets Section Header - CLICKABLE */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        onClick={() => onCategorySelect('planets')}
        className="text-center py-20 relative z-10 cursor-pointer group"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <motion.h2
            animate={{
              textShadow: [
                '0 0 20px rgba(34, 211, 238, 0.3)',
                '0 0 30px rgba(34, 211, 238, 0.6)',
                '0 0 20px rgba(34, 211, 238, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors"
          >
            The Planets →
          </motion.h2>
          <p className="text-xl text-gray-400">Explore the diverse worlds of our solar system</p>
          <p className="text-sm text-cyan-500 mt-2 animate-pulse">Click to enter 3D Planet View</p>
        </motion.div>
        
        {/* Preview Images */}
        <div className="mt-12 flex justify-center gap-6 flex-wrap max-w-4xl mx-auto">
          {planets.slice(0, 4).map((planet, i) => (
            <motion.div
              key={planet.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-lg"
            >
              <img src={planet.image} alt={planet.name} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Galaxies Section Header - CLICKABLE */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        onClick={() => onCategorySelect('galaxies')}
        className="text-center py-20 relative z-10 cursor-pointer group"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <motion.h2
            animate={{
              textShadow: [
                '0 0 20px rgba(168, 85, 247, 0.3)',
                '0 0 30px rgba(168, 85, 247, 0.6)',
                '0 0 20px rgba(168, 85, 247, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl font-bold text-purple-400 mb-4 group-hover:text-purple-300 transition-colors"
          >
            The Galaxies →
          </motion.h2>
          <p className="text-xl text-gray-400">Vast cosmic islands containing billions of stars</p>
          <p className="text-sm text-purple-500 mt-2 animate-pulse">Click to enter Galaxy Carousel</p>
        </motion.div>
        
        {/* Preview Images */}
        <div className="mt-12 flex justify-center gap-6 flex-wrap max-w-4xl mx-auto">
          {galaxies.slice(0, 3).map((galaxy, i) => (
            <motion.div
              key={galaxy.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-lg"
            >
              <img src={galaxy.image} alt={galaxy.name} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interesting Facts Sections */}
      <InterestingFactsSections 
        onCategorySelect={onCategorySelect} 
        onBlackHoleClick={() => setShowBlackHoleModal(true)}
        onSpeedOfLightClick={() => setShowSpeedOfLightModal(true)}
        onUniverseClick={() => setShowUniverseModal(true)}
        onNeutronStarClick={() => setShowNeutronStarModal(true)}
      />

      {/* Beautiful Sky Scene */}
      <BeautifulSkyScene />

      {/* Planet Detail Modal */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPlanet(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-2xl bg-white/10 border-2 border-cyan-500/50 rounded-3xl p-8 max-w-5xl w-full shadow-2xl"
            >
              <button
                onClick={() => setSelectedPlanet(null)}
                className="absolute top-6 right-6 text-white hover:text-red-400 text-4xl font-bold transition-colors"
              >
                ×
              </button>
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div 
                  className="md:w-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <img 
                    src={selectedPlanet.image}
                    alt={selectedPlanet.name}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                </motion.div>
                <div className="md:w-1/2 flex flex-col justify-center">
                  <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                    {selectedPlanet.name}
                  </h2>
                  <p className="text-cyan-400 text-lg mb-4">{selectedPlanet.distance}</p>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">{selectedPlanet.details}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlanet.features.map((feature, i) => (
                      <span key={i} className="glass-strong px-3 py-1 rounded-full text-cyan-300 text-sm border border-cyan-500/30">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Galaxy Detail Modal */}
      <AnimatePresence>
        {selectedGalaxy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGalaxy(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-2xl bg-white/10 border-2 border-purple-500/50 rounded-3xl p-8 max-w-5xl w-full shadow-2xl"
            >
              <button
                onClick={() => setSelectedGalaxy(null)}
                className="absolute top-6 right-6 text-white hover:text-red-400 text-4xl font-bold transition-colors"
              >
                ×
              </button>
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div 
                  className="md:w-1/2"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img 
                    src={selectedGalaxy.image}
                    alt={selectedGalaxy.name}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                </motion.div>
                <div className="md:w-1/2 flex flex-col justify-center">
                  <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                    {selectedGalaxy.name}
                  </h2>
                  <p className="text-purple-400 text-lg font-semibold mb-4">{selectedGalaxy.type}</p>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">{selectedGalaxy.details}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedGalaxy.features.map((feature, i) => (
                      <span key={i} className="glass-strong px-3 py-1 rounded-full text-purple-300 text-sm border border-purple-500/30">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Black Hole Mystery Modal with YouTube Video - Compact & Scrollable */}
      <AnimatePresence>
        {showBlackHoleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBlackHoleModal(false)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-2xl bg-gradient-to-br from-purple-900/40 to-black/60 border-2 border-purple-500/50 rounded-3xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setShowBlackHoleModal(false)}
                className="sticky top-0 right-0 float-right text-white hover:text-red-400 text-3xl font-bold transition-colors z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              >
                ×
              </button>

              <div className="space-y-4 clear-both">
                {/* Header */}
                <div className="text-center mb-4">
                  <motion.h2
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(168, 85, 247, 0.5)',
                        '0 0 40px rgba(168, 85, 247, 0.8)',
                        '0 0 20px rgba(168, 85, 247, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 mb-2"
                  >
                    Black Hole Mystery
                  </motion.h2>
                  <p className="text-lg text-purple-300 font-semibold">Where Physics Breaks Down</p>
                </div>

                {/* YouTube Video - Smaller */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-purple-500/30">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/QqsLTNkzvaY"
                    title="Black Holes Explained"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>

                {/* Description */}
                <div className="glass-strong rounded-xl p-4 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">What Are Black Holes?</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape. 
                    At the center lies the singularity - a point where gravity becomes infinite and our understanding of physics completely breaks down.
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    The boundary around a black hole is called the event horizon. Once anything crosses this point, it can never return. 
                    Time itself behaves strangely near black holes - it slows down relative to distant observers, and at the event horizon, time appears to stop completely!
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Black holes form when massive stars collapse at the end of their lives. The core implodes, creating a region where the escape velocity exceeds the speed of light. 
                    Some black holes are millions or billions of times more massive than our Sun and lurk at the centers of galaxies.
                  </p>
                </div>

                {/* Additional Info - Hawking Radiation */}
                <div className="glass-strong rounded-xl p-4 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">Hawking Radiation</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Stephen Hawking discovered that black holes aren't completely black! They emit a faint radiation due to quantum effects near the event horizon. 
                    This means black holes slowly evaporate over incredibly long timescales - a solar mass black hole would take 10⁶⁷ years to evaporate!
                  </p>
                </div>

                {/* Additional Info - Spaghettification */}
                <div className="glass-strong rounded-xl p-4 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">Spaghettification</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    If you fell into a black hole, the difference in gravitational pull between your head and feet would stretch you like spaghetti! 
                    This process, called "spaghettification" or the "noodle effect," would tear you apart atom by atom before you even reached the event horizon.
                  </p>
                </div>

                {/* Key Facts */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="glass-strong rounded-lg p-4 text-center border border-purple-500/20">
                    <div className="text-3xl font-black text-purple-400 mb-1">∞</div>
                    <div className="text-xs text-gray-400">Gravity at Singularity</div>
                  </div>
                  <div className="glass-strong rounded-lg p-4 text-center border border-purple-500/20">
                    <div className="text-3xl font-black text-purple-400 mb-1">0</div>
                    <div className="text-xs text-gray-400">Escape Velocity</div>
                  </div>
                  <div className="glass-strong rounded-lg p-4 text-center border border-purple-500/20">
                    <div className="text-3xl font-black text-purple-400 mb-1">?</div>
                    <div className="text-xs text-gray-400">What's Inside</div>
                  </div>
                </div>

                {/* See Different Types Button with Images */}
                <div className="text-center pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowBlackHoleModal(false);
                      onCategorySelect('blackholes');
                    }}
                    className="glass-strong px-6 py-3 rounded-xl text-white font-bold text-base hover:bg-purple-600/20 transition-all duration-300 border-2 border-purple-500 flex items-center gap-3 mx-auto"
                  >
                    <span>See Different Types of Black Holes</span>
                    <span className="text-2xl">🌌</span>
                  </motion.button>
                  <p className="text-xs text-purple-400 mt-2">Explore Supermassive, Stellar & More with Images</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speed of Light Modal */}
      <AnimatePresence>
        {showSpeedOfLightModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSpeedOfLightModal(false)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-2xl bg-gradient-to-br from-yellow-900/40 to-black/60 border-2 border-yellow-500/50 rounded-3xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setShowSpeedOfLightModal(false)}
                className="sticky top-0 right-0 float-right text-white hover:text-red-400 text-3xl font-bold transition-colors z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              >
                ×
              </button>

              <div className="space-y-4 clear-both">
                <div className="text-center mb-4">
                  <motion.h2
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(251, 191, 36, 0.5)',
                        '0 0 40px rgba(251, 191, 36, 0.8)',
                        '0 0 20px rgba(251, 191, 36, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2"
                  >
                    The Speed of Light
                  </motion.h2>
                  <p className="text-lg text-yellow-300 font-semibold">299,792,458 meters per second</p>
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-yellow-500/30">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/pTn6Ewhb27k"
                    title="Speed of Light Explained"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>

                <div className="glass-strong rounded-xl p-4 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">The Universal Speed Limit</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    The speed of light in a vacuum is exactly 299,792,458 meters per second (about 186,282 miles per second). This isn't just fast - it's the absolute speed limit of the universe! Nothing with mass can ever reach or exceed this speed.
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    Light can circle the Earth 7.5 times in just one second. Yet despite this incredible speed, it still takes 8 minutes and 20 seconds for sunlight to reach Earth, and over 4 years to reach the nearest star system, Alpha Centauri.
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Einstein's theory of relativity revealed that the speed of light is constant for all observers, regardless of their motion. This led to mind-bending consequences like time dilation and length contraction.
                  </p>
                </div>

                <div className="glass-strong rounded-xl p-4 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">Why Can't We Go Faster?</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    As an object with mass approaches the speed of light, its mass effectively increases, requiring more and more energy to accelerate further. To actually reach light speed would require infinite energy - which is impossible! Only massless particles like photons can travel at light speed.
                  </p>
                </div>

                <div className="glass-strong rounded-xl p-4 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">Light-Years: Cosmic Distances</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    A light-year is the distance light travels in one year - about 9.46 trillion kilometers (5.88 trillion miles). The Milky Way galaxy is about 100,000 light-years across, and the observable universe extends 93 billion light-years in diameter!
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="glass-strong rounded-lg p-4 text-center border border-yellow-500/20">
                    <div className="text-3xl font-black text-yellow-400 mb-1">8 min</div>
                    <div className="text-xs text-gray-400">Sun to Earth</div>
                  </div>
                  <div className="glass-strong rounded-lg p-4 text-center border border-yellow-500/20">
                    <div className="text-3xl font-black text-yellow-400 mb-1">4.3 yr</div>
                    <div className="text-xs text-gray-400">Nearest Star</div>
                  </div>
                  <div className="glass-strong rounded-lg p-4 text-center border border-yellow-500/20">
                    <div className="text-3xl font-black text-yellow-400 mb-1">100k yr</div>
                    <div className="text-xs text-gray-400">Across Milky Way</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Observable Universe Modal */}
      <AnimatePresence>
        {showUniverseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUniverseModal(false)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-2xl bg-gradient-to-br from-cyan-900/40 to-black/60 border-2 border-cyan-500/50 rounded-3xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setShowUniverseModal(false)}
                className="sticky top-0 right-0 float-right text-white hover:text-red-400 text-3xl font-bold transition-colors z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              >
                ×
              </button>

              <div className="space-y-4 clear-both">
                <div className="text-center mb-4">
                  <motion.h2
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(34, 211, 238, 0.5)',
                        '0 0 40px rgba(34, 211, 238, 0.8)',
                        '0 0 20px rgba(34, 211, 238, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2"
                  >
                    The Observable Universe
                  </motion.h2>
                  <p className="text-lg text-cyan-300 font-semibold">93 Billion Light-Years Across</p>
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-cyan-500/30">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/uzkD5SeuwzM"
                    title="Observable Universe Explained"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>

                <div className="glass-strong rounded-xl p-4 border border-cyan-500/30">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">The Edge of Everything We Can See</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    The observable universe is the spherical region of the universe comprising all matter that can be observed from Earth at the present time. It's about 93 billion light-years in diameter, containing an estimated 200 billion to 2 trillion galaxies!
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    But here's the mind-blowing part: the universe is expanding faster than the speed of light! This means there are regions of space that are moving away from us so fast that their light will never reach us, no matter how long we wait.
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    The universe is 13.8 billion years old, but due to cosmic expansion, the most distant objects we can see are now 46.5 billion light-years away in all directions.
                  </p>
                </div>

                <div className="glass-strong rounded-xl p-4 border border-cyan-500/30">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">The Cosmic Horizon</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    The edge of the observable universe is called the cosmic horizon or particle horizon. Beyond this boundary, light hasn't had enough time to reach us since the Big Bang. As time passes, we can see slightly farther, but expansion means some galaxies will eventually disappear from view forever!
                  </p>
                </div>

                <div className="glass-strong rounded-xl p-4 border border-cyan-500/30">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">What's Beyond?</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    The actual universe is likely much larger than what we can observe - possibly infinite! Some theories suggest it could be 250 times larger than the observable universe, or even infinitely large. We may never know what lies beyond our cosmic horizon.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="glass-strong rounded-lg p-4 text-center border border-cyan-500/20">
                    <div className="text-3xl font-black text-cyan-400 mb-1">200B+</div>
                    <div className="text-xs text-gray-400">Galaxies</div>
                  </div>
                  <div className="glass-strong rounded-lg p-4 text-center border border-cyan-500/20">
                    <div className="text-3xl font-black text-cyan-400 mb-1">13.8B</div>
                    <div className="text-xs text-gray-400">Years Old</div>
                  </div>
                  <div className="glass-strong rounded-lg p-4 text-center border border-cyan-500/20">
                    <div className="text-3xl font-black text-cyan-400 mb-1">∞</div>
                    <div className="text-xs text-gray-400">Possibilities</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Neutron Stars Modal */}
      <AnimatePresence>
        {showNeutronStarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNeutronStarModal(false)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-2xl bg-gradient-to-br from-pink-900/40 to-black/60 border-2 border-pink-500/50 rounded-3xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setShowNeutronStarModal(false)}
                className="sticky top-0 right-0 float-right text-white hover:text-red-400 text-3xl font-bold transition-colors z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              >
                ×
              </button>

              <div className="space-y-4 clear-both">
                <div className="text-center mb-4">
                  <motion.h2
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(236, 72, 153, 0.5)',
                        '0 0 40px rgba(236, 72, 153, 0.8)',
                        '0 0 20px rgba(236, 72, 153, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 mb-2"
                  >
                    Neutron Stars
                  </motion.h2>
                  <p className="text-lg text-pink-300 font-semibold">The Densest Objects in the Universe</p>
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-pink-500/30">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/ZW3aV7U-aik"
                    title="Neutron Stars Explained"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>

                <div className="glass-strong rounded-xl p-4 border border-pink-500/30">
                  <h3 className="text-xl font-bold text-pink-400 mb-3">Collapsed Stellar Cores</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    Neutron stars are the collapsed cores of massive stars that exploded as supernovae. They're incredibly dense - a teaspoon of neutron star material would weigh about 6 billion tons on Earth! That's like compressing Mount Everest into a sugar cube.
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    These stellar remnants are typically only about 20 kilometers (12 miles) in diameter, yet contain more mass than our entire Sun. They're so dense that their gravity is 2 billion times stronger than Earth's!
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Neutron stars spin incredibly fast - some rotate hundreds of times per second! The fastest known neutron star, PSR J1748-2446ad, spins 716 times per second. That's faster than a kitchen blender!
                  </p>
                </div>

                <div className="glass-strong rounded-xl p-4 border border-pink-500/30">
                  <h3 className="text-xl font-bold text-pink-400 mb-3">Pulsars: Cosmic Lighthouses</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Many neutron stars are pulsars - they emit beams of radiation from their magnetic poles. As the star rotates, these beams sweep across space like a lighthouse, creating regular pulses we can detect on Earth. The first pulsar was discovered in 1967 and was initially thought to be a signal from aliens!
                  </p>
                </div>

                <div className="glass-strong rounded-xl p-4 border border-pink-500/30">
                  <h3 className="text-xl font-bold text-pink-400 mb-3">Magnetars: The Most Magnetic Objects</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Some neutron stars called magnetars have magnetic fields a quadrillion times stronger than Earth's - so powerful they can distort atoms and strip electrons from matter thousands of kilometers away. A magnetar's magnetic field is strong enough to be lethal from 1,000 km away!
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="glass-strong rounded-lg p-4 text-center border border-pink-500/20">
                    <div className="text-3xl font-black text-pink-400 mb-1">6B tons</div>
                    <div className="text-xs text-gray-400">Per Teaspoon</div>
                  </div>
                  <div className="glass-strong rounded-lg p-4 text-center border border-pink-500/20">
                    <div className="text-3xl font-black text-pink-400 mb-1">700/s</div>
                    <div className="text-xs text-gray-400">Rotation Speed</div>
                  </div>
                  <div className="glass-strong rounded-lg p-4 text-center border border-pink-500/20">
                    <div className="text-3xl font-black text-pink-400 mb-1">10¹²</div>
                    <div className="text-xs text-gray-400">Magnetic Field</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InterestingFactsSections = ({ onCategorySelect, onBlackHoleClick, onSpeedOfLightClick, onUniverseClick, onNeutronStarClick }) => {
  const facts = [
    {
      title: "The Speed of Light",
      subtitle: "299,792,458 m/s",
      description: "Light travels so fast that it could circle Earth 7.5 times in just one second. Yet, it still takes 8 minutes for sunlight to reach us, and 4.3 years to reach the nearest star!",
      image: "https://www.thoughtco.com/thmb/x4E7h1N3BBYWRhI3-ftmsi9CbYY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1055846884-5c429fb7c9e77c0001f602c3.jpg",
      stats: [
        { value: "8 min", label: "Sun to Earth" },
        { value: "4.3 years", label: "Nearest Star" },
        { value: "100,000 years", label: "Across Milky Way" }
      ],
      color: "from-yellow-400 to-orange-500",
      clickable: true,
      onClickHandler: onSpeedOfLightClick
    },
    {
      title: "Black Hole Mystery",
      subtitle: "Where Physics Breaks Down",
      description: "At the center of a black hole lies the singularity - a point where gravity becomes infinite and our understanding of physics completely breaks down. Time itself stops at the event horizon!",
      image: "https://preview.redd.it/jwst-has-spotted-the-earliest-black-hole-ever-seen-in-the-v0-pfij9eavnxqa1.jpg?width=1080&crop=smart&auto=webp&s=7d2ea5341094ef87b862b3a5b15ffe43eba16c7d",
      stats: [
        { value: "∞", label: "Gravity" },
        { value: "0", label: "Escape Velocity" },
        { value: "?", label: "Inside" }
      ],
      color: "from-purple-400 to-indigo-600",
      clickable: true,
      categoryId: "blackholes",
      onClickHandler: onBlackHoleClick
    },
    {
      title: "The Observable Universe",
      subtitle: "93 Billion Light-Years Across",
      description: "The universe is expanding faster than light can travel! This means there are parts of the universe we will never be able to see, no matter how long we wait or how advanced our technology becomes.",
      image: "https://www.livemint.com/lm-img/img/2024/07/07/original/4_1720343324123.jpg",
      stats: [
        { value: "200B+", label: "Galaxies" },
        { value: "13.8B", label: "Years Old" },
        { value: "∞", label: "Possibilities" }
      ],
      color: "from-cyan-400 to-blue-500",
      clickable: true,
      onClickHandler: onUniverseClick
    },
    {
      title: "Neutron Stars",
      subtitle: "The Densest Objects",
      description: "A teaspoon of neutron star material would weigh about 6 billion tons on Earth! These stellar remnants spin hundreds of times per second and have magnetic fields trillions of times stronger than Earth's.",
      image: "https://i.ytimg.com/vi/M8DmwNvtfxk/maxresdefault.jpg",
      stats: [
        { value: "6B tons", label: "Per Teaspoon" },
        { value: "700/s", label: "Rotation Speed" },
        { value: "10¹²", label: "Magnetic Field" }
      ],
      color: "from-pink-400 to-red-500",
      clickable: true,
      onClickHandler: onNeutronStarClick
    }
  ];

  return (
    <div className="relative py-20">
      {facts.map((fact, index) => (
        <SplitFactSection key={index} fact={fact} index={index} onCategorySelect={onCategorySelect} />
      ))}
    </div>
  );
};

const SplitFactSection = ({ fact, index, onCategorySelect }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  const isEven = index % 2 === 0;
  
  const handleClick = () => {
    if (fact.onClickHandler) {
      fact.onClickHandler();
    } else if (fact.clickable && fact.categoryId) {
      onCategorySelect(fact.categoryId);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center px-8 py-20 relative"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -500],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            className={`absolute w-1 h-1 bg-gradient-to-b ${fact.color} rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`space-y-6 ${!isEven ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <motion.div
              animate={{
                textShadow: inView ? [
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                  '0 0 40px rgba(168, 85, 247, 0.6)',
                  '0 0 20px rgba(34, 211, 238, 0.3)'
                ] : '0 0 0px rgba(0,0,0,0)'
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h3 
                className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${fact.color} mb-3 ${fact.clickable ? 'cursor-pointer hover:scale-105 transition-transform inline-block' : ''}`}
                onClick={fact.clickable ? handleClick : undefined}
              >
                {fact.title} {fact.clickable && '→'}
              </h3>
              <p className="text-2xl text-gray-400 font-semibold mb-6">{fact.subtitle}</p>
              {fact.clickable && (
                <p className="text-sm text-purple-500 animate-pulse mb-4">Click title to learn more</p>
              )}
            </motion.div>

            <p className="text-xl text-gray-300 leading-relaxed">
              {fact.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {fact.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`backdrop-blur-xl bg-white/5 border-2 border-white/20 rounded-2xl p-4 text-center cursor-pointer`}
                >
                  <div className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${fact.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Image with interesting center element */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 100 : -100 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 100 : -100 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`relative ${!isEven ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="relative rounded-3xl overflow-hidden group">
              {/* Main Image */}
              <motion.img
                src={fact.image}
                alt={fact.title}
                className="w-full h-[500px] object-cover"
                animate={inView ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60`} />
              
              {/* Center floating element */}
              <motion.div
                animate={inView ? {
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className={`backdrop-blur-2xl bg-white/10 border-2 border-white/30 rounded-full w-32 h-32 flex items-center justify-center shadow-2xl`}>
                  <motion.div
                    animate={inView ? { rotate: 360 } : {}}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className={`text-6xl`}
                  >
                    {index === 0 ? '💫' : index === 1 ? '🌀' : index === 2 ? '🌌' : '⭐'}
                  </motion.div>
                </div>
              </motion.div>

              {/* Orbiting particles around center */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={inView ? {
                    rotate: 360
                  } : {}}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2"
                >
                  <div 
                    className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${fact.color} shadow-lg`}
                    style={{
                      top: '0',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  />
                </motion.div>
              ))}

              {/* Corner decorations */}
              <motion.div
                animate={inView ? { rotate: 360 } : {}}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-4 right-4 w-16 h-16 border-4 border-white/20 rounded-full"
              />
              <motion.div
                animate={inView ? { rotate: -360 } : {}}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-4 left-4 w-12 h-12 border-4 border-white/20 rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Connecting line between sections */}
        {index < 3 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-1 h-20 bg-gradient-to-b ${fact.color} origin-top`}
          />
        )}
      </div>
    </motion.div>
  );
};

const BeautifulSkyScene = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [selectedWonder, setSelectedWonder] = useState(null);

  const cosmicWonders = [
    { 
      image: 'https://i.ytimg.com/vi/F8A9d_1Sr6k/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGE4gTihlMA8=&rs=AOn4CLCWQnlv9oB90_a4E9uSNwjF0RAetA', 
      title: 'Nebulae', 
      desc: 'Stellar nurseries where stars are born',
      color: 'from-pink-500 to-purple-500',
      fullDesc: 'Nebulae are vast clouds of gas and dust in space, often spanning hundreds of light-years. They are the birthplaces of stars, where gravity pulls material together to form new stellar systems. Famous examples include the Orion Nebula, Eagle Nebula, and Carina Nebula.',
      facts: ['Can be 100+ light-years across', 'Contain hydrogen, helium, and dust', 'Glow from ionized gases', 'Form new stars and planets']
    },
    { 
      image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201904/blackhole_reuters.png?VersionId=tHO7rPcQ8ZU.GCfubOEk2CGA5fswrSKC', 
      title: 'Black Holes', 
      desc: 'The ultimate gravity wells',
      color: 'from-purple-500 to-indigo-500',
      fullDesc: 'Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape. They form when massive stars collapse at the end of their lives. The boundary around a black hole is called the event horizon - the point of no return.',
      facts: ['Infinite density at center', 'Time stops at event horizon', 'Can be millions of solar masses', 'Warp spacetime itself']
    },
    { 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2iTP6npKAaeSRrY5PaZH5pXoOIAOIDngpFg&s', 
      title: 'Star Clusters', 
      desc: 'Billions of stars dancing together',
      color: 'from-cyan-500 to-blue-500',
      fullDesc: 'Star clusters are groups of stars that formed together from the same molecular cloud. Globular clusters can contain millions of ancient stars tightly packed together, while open clusters are younger and more loosely bound. They help astronomers understand stellar evolution.',
      facts: ['Can contain millions of stars', 'Held together by gravity', 'Some are 13 billion years old', 'Used to measure cosmic distances']
    },
    { 
      image: 'https://media.istockphoto.com/id/497707356/photo/purple-nebula-and-cosmic-dust.jpg?s=612x612&w=0&k=20&c=k955ga0hmw-pk9wdjiRPC15fMAqwYwP9u4RJDlruTsg=', 
      title: 'Cosmic Dust', 
      desc: 'The building blocks of worlds',
      color: 'from-blue-500 to-purple-500',
      fullDesc: 'Cosmic dust consists of tiny particles of solid matter floating in space. These microscopic grains are the building blocks of planets, asteroids, and comets. They also play a crucial role in star formation and can affect how we observe distant objects.',
      facts: ['Smaller than sand grains', 'Made of carbon, silicon, iron', 'Essential for planet formation', 'Blocks visible light, glows in infrared']
    },
    { 
      image: 'https://futurism.com/wp-content/uploads/2017/12/144936main_image_feature_532_ys_full.jpg?quality=85&w=1152', 
      title: 'Supernovae', 
      desc: 'Explosive deaths of massive stars',
      color: 'from-orange-500 to-red-500',
      fullDesc: 'A supernova is the explosive death of a massive star, releasing more energy in a few seconds than our Sun will produce in its entire lifetime. These cosmic explosions create and distribute heavy elements throughout the universe, making life possible.',
      facts: ['Brighter than entire galaxies', 'Create heavy elements', 'Can be seen across universe', 'Leave behind neutron stars or black holes']
    },
    { 
      image: 'https://www.slate.com/content/dam/slate/blogs/bad_astronomy/galleries/exoplanet-images/exoplanet_gliese581c_art.jpg', 
      title: 'Exoplanets', 
      desc: 'Worlds beyond our solar system',
      color: 'from-green-500 to-cyan-500',
      fullDesc: 'Exoplanets are planets that orbit stars other than our Sun. Since the first confirmed detection in 1992, we have discovered over 5,000 exoplanets. Some are gas giants larger than Jupiter, while others are rocky worlds that might harbor life.',
      facts: ['5,000+ discovered so far', 'Some in habitable zones', 'Range from gas giants to rocky worlds', 'Detected by transit and wobble methods']
    }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="py-32 px-8 relative z-10"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-20"
      >
        <motion.h2
          animate={{
            textShadow: [
              '0 0 20px rgba(236, 72, 153, 0.3)',
              '0 0 30px rgba(236, 72, 153, 0.6)',
              '0 0 20px rgba(236, 72, 153, 0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6"
        >
          More Cosmic Wonders
        </motion.h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Discover the infinite beauty and mystery of the universe
        </p>
      </motion.div>

      {/* Cosmic Wonders Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {cosmicWonders.map((wonder, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, rotateY: -20 }}
            animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              boxShadow: '0 20px 60px rgba(168, 85, 247, 0.4)'
            }}
            onClick={() => setSelectedWonder(wonder)}
            className="glass-strong rounded-3xl overflow-hidden cursor-pointer group relative"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <motion.img
                src={wonder.image}
                alt={wonder.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Floating particles */}
              <div className="absolute inset-0">
                {[...Array(5)].map((_, j) => (
                  <motion.div
                    key={j}
                    animate={{
                      y: [0, -100, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3 + j,
                      repeat: Infinity,
                      delay: j * 0.5
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${20 + j * 15}%`,
                      bottom: '0'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 relative">
              <motion.h3 
                className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${wonder.color} mb-2 group-hover:scale-105 transition-transform`}
              >
                {wonder.title}
              </motion.h3>
              <p className="text-gray-400">{wonder.desc}</p>
              
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                className={`h-1 bg-gradient-to-r ${wonder.color} rounded-full mt-4`}
              />
            </div>

            {/* Glow effect on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className={`absolute inset-0 bg-gradient-to-t ${wonder.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
            />
          </motion.div>
        ))}
      </div>

      {/* Final Sky Scene */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="relative w-full max-w-7xl mx-auto"
      >
        <div className="relative h-[700px] rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80"
            alt="Cosmic Sky"
            className="w-full h-full object-cover"
          />
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20" />
          
          {/* Shooting stars */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [-100, 1000],
                y: [0, 300],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 3,
                repeatDelay: 5
              }}
              className="absolute top-20 left-0 w-1 h-20 bg-gradient-to-b from-white to-transparent rotate-45"
            />
          ))}
          
          {/* Glassmorphism content box */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 1 }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            <div className="backdrop-blur-2xl bg-white/5 border-2 border-white/20 rounded-3xl p-12 max-w-4xl shadow-2xl">
              <motion.h2 
                animate={{
                  textShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.5)',
                    '0 0 40px rgba(168, 85, 247, 0.8)',
                    '0 0 20px rgba(236, 72, 153, 0.5)',
                    '0 0 20px rgba(34, 211, 238, 0.5)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 mb-6 text-center"
              >
                The Universe Awaits
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 leading-relaxed text-center mb-8"
              >
                Every star you see is a sun, potentially with its own planets. Every galaxy contains billions of stars. The cosmos is vast beyond imagination, and we've only just begun to explore it.
              </motion.p>
              
              {/* Stats with glassmorphism */}
              <motion.div 
                className="grid grid-cols-3 gap-6 mt-8"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="backdrop-blur-xl bg-white/5 border border-cyan-500/30 rounded-2xl p-4 text-center cursor-pointer"
                >
                  <div className="text-3xl font-bold text-cyan-400">200B+</div>
                  <div className="text-sm text-gray-300 mt-1">Galaxies</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="backdrop-blur-xl bg-white/5 border border-purple-500/30 rounded-2xl p-4 text-center cursor-pointer"
                >
                  <div className="text-3xl font-bold text-purple-400">∞</div>
                  <div className="text-sm text-gray-300 mt-1">Possibilities</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="backdrop-blur-xl bg-white/5 border border-pink-500/30 rounded-2xl p-4 text-center cursor-pointer"
                >
                  <div className="text-3xl font-bold text-pink-400">1</div>
                  <div className="text-sm text-gray-300 mt-1">Universe</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Cosmic Wonder Detail Modal */}
      <AnimatePresence>
        {selectedWonder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWonder(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`backdrop-blur-2xl bg-white/10 border-2 rounded-3xl p-8 max-w-5xl w-full shadow-2xl border-white/20`}
            >
              <button
                onClick={() => setSelectedWonder(null)}
                className="absolute top-6 right-6 text-white hover:text-red-400 text-4xl font-bold transition-colors"
              >
                ×
              </button>
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div 
                  className="md:w-1/2"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <img 
                    src={selectedWonder.image}
                    alt={selectedWonder.title}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                </motion.div>
                <div className="md:w-1/2 flex flex-col justify-center">
                  <h2 className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${selectedWonder.color} mb-4`}>
                    {selectedWonder.title}
                  </h2>
                  <p className="text-gray-400 text-lg mb-4 italic">{selectedWonder.desc}</p>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">{selectedWonder.fullDesc}</p>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white mb-3">Key Facts:</h3>
                    {selectedWonder.facts.map((fact, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${selectedWonder.color} text-xl`}>•</span>
                        <span className="text-gray-300">{fact}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ModernExploreCosmos;
