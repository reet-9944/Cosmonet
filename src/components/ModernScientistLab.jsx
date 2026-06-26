import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ModernScientistLab = () => {
  const [hoveredEquipment, setHoveredEquipment] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedScientist, setSelectedScientist] = useState(null);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const labEquipment = [
    {
      id: 1,
      name: 'Telescope',
      position: { x: 15, y: 55 },
      image: 'https://media.istockphoto.com/id/1418847625/photo/telescope-watching-the-sky-and-falling-star-3d-rendering.jpg?s=612x612&w=0&k=20&c=6cOZO6DWYI53WyD9j_gH2lXxSKikcKcqifXt2P9gvF4=',
      description: 'Advanced optical telescope for observing distant celestial objects',
      details: 'This research-grade telescope features a 16-inch aperture with computerized tracking. It can observe galaxies millions of light-years away and is equipped with CCD cameras for astrophotography.',
      specs: ['Aperture: 16 inches', 'Focal Length: 4000mm', 'Mount: Equatorial', 'Magnification: 400x'],
      uses: ['Deep sky observation', 'Planetary imaging', 'Spectroscopy', 'Astrometry'],
      color: '#3b82f6'
    },
    {
      id: 2,
      name: 'Microscope',
      position: { x: 35, y: 60 },
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScXszv1X4EQLSxHL1j1_4v0UtimB0D5gnDqA&s',
      description: 'High-powered electron microscope for studying microscopic structures',
      details: 'State-of-the-art scanning electron microscope capable of magnifying samples up to 1,000,000x. Used for examining cellular structures, bacteria, and nanomaterials.',
      specs: ['Magnification: 1,000,000x', 'Resolution: 1 nanometer', 'Type: SEM', 'Voltage: 30kV'],
      uses: ['Cell biology', 'Material science', 'Nanotechnology', 'Forensics'],
      color: '#8b5cf6'
    },
    {
      id: 3,
      name: 'Particle Accelerator',
      position: { x: 55, y: 65 },
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRscxKJ8Odf0x-1LTlcpQs--HwAsTpnKb8wuA&s',
      description: 'Miniature particle accelerator for physics experiments',
      details: 'Compact linear accelerator that propels charged particles to near light speed. Used for studying fundamental particles and their interactions.',
      specs: ['Energy: 10 GeV', 'Length: 50 meters', 'Type: Linear', 'Particles: Electrons'],
      uses: ['Particle physics', 'Radiation therapy', 'Material analysis', 'Nuclear research'],
      color: '#ef4444'
    },
    {
      id: 4,
      name: 'Spectrometer',
      position: { x: 75, y: 60 },
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80',
      description: 'Mass spectrometer for analyzing chemical compositions',
      details: 'High-resolution mass spectrometer that identifies substances by measuring mass-to-charge ratios. Essential for chemistry and biochemistry research.',
      specs: ['Resolution: 100,000', 'Mass Range: 2-4000 Da', 'Type: TOF-MS', 'Accuracy: 1 ppm'],
      uses: ['Chemical analysis', 'Drug discovery', 'Proteomics', 'Environmental testing'],
      color: '#10b981'
    },
    {
      id: 5,
      name: 'Centrifuge',
      position: { x: 25, y: 70 },
      image: 'https://www.shutterstock.com/image-photo/laboratory-assistant-puts-test-tube-600nw-2266637551.jpg',
      description: 'Ultra-high-speed centrifuge for sample separation',
      details: 'Ultracentrifuge capable of spinning samples at 100,000 RPM, generating forces up to 1,000,000 g. Used for separating cellular components and purifying proteins.',
      specs: ['Max Speed: 100,000 RPM', 'Force: 1,000,000 g', 'Capacity: 6 tubes', 'Temperature: -20°C to 40°C'],
      uses: ['Cell fractionation', 'Protein purification', 'DNA isolation', 'Virus research'],
      color: '#f59e0b'
    },
    {
      id: 6,
      name: 'Quantum Computer',
      position: { x: 65, y: 50 },
      image: 'https://thequantuminsider.com/wp-content/uploads/iqc-cory-lab-scaled.jpg',
      description: 'Experimental quantum computing system',
      details: 'Cutting-edge quantum computer with 50 qubits operating at near absolute zero. Capable of solving complex problems exponentially faster than classical computers.',
      specs: ['Qubits: 50', 'Temperature: 0.015 K', 'Coherence: 100 μs', 'Gate Fidelity: 99.9%'],
      uses: ['Cryptography', 'Drug discovery', 'AI optimization', 'Climate modeling'],
      color: '#ec4899'
    },
    {
      id: 7,
      name: 'DNA Sequencer',
      position: { x: 45, y: 75 },
      image: 'https://today.uconn.edu/wp-content/uploads/2013/03/dna_sequence.jpg',
      description: 'Next-generation DNA sequencing machine',
      details: 'High-throughput DNA sequencer capable of reading entire genomes in hours. Uses nanopore technology to sequence DNA strands in real-time.',
      specs: ['Throughput: 50 Gb/day', 'Read Length: 2 Mb', 'Accuracy: 99.9%', 'Type: Nanopore'],
      uses: ['Genome sequencing', 'Cancer research', 'Evolutionary biology', 'Personalized medicine'],
      color: '#06b6d4'
    },
    {
      id: 8,
      name: 'Laser System',
      position: { x: 85, y: 65 },
      image: 'https://images.labroots.com/content_article_profile_image_4cddba05eb5e56f78d11b03535b7593255e58de5_4647.jpg',
      description: 'High-powered laser for precision experiments',
      details: 'Femtosecond laser system capable of producing ultra-short pulses. Used for precision cutting, spectroscopy, and studying ultrafast phenomena.',
      specs: ['Power: 100 Watts', 'Pulse Duration: 100 fs', 'Wavelength: 800 nm', 'Repetition: 1 kHz'],
      uses: ['Material processing', 'Spectroscopy', 'Surgery', 'Quantum optics'],
      color: '#f43f5e'
    }
  ];

  const scientists = [
    {
      id: 1,
      name: 'Albert Einstein',
      field: 'Theoretical Physics',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/400px-Albert_Einstein_Head.jpg',
      contribution: 'Theory of Relativity',
      year: '1915',
      born: '1879',
      died: '1955',
      nationality: 'German-American',
      bio: 'Albert Einstein revolutionized our understanding of space, time, and gravity. His theory of relativity fundamentally changed physics and led to groundbreaking discoveries including the equivalence of mass and energy (E=mc²).',
      achievements: [
        'Developed Special Theory of Relativity (1905)',
        'Developed General Theory of Relativity (1915)',
        'Explained the Photoelectric Effect',
        'Nobel Prize in Physics (1921)',
        'Predicted gravitational waves'
      ],
      quote: 'Imagination is more important than knowledge.'
    },
    {
      id: 2,
      name: 'Marie Curie',
      field: 'Radioactivity',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/400px-Marie_Curie_c1920.jpg',
      contribution: 'Discovered Radium & Polonium',
      year: '1898',
      born: '1867',
      died: '1934',
      nationality: 'Polish-French',
      bio: 'Marie Curie was a pioneering physicist and chemist who conducted groundbreaking research on radioactivity. She was the first woman to win a Nobel Prize and remains the only person to win Nobel Prizes in two different sciences.',
      achievements: [
        'Discovered Polonium and Radium',
        'Nobel Prize in Physics (1903)',
        'Nobel Prize in Chemistry (1911)',
        'First female professor at University of Paris',
        'Developed mobile X-ray units for WWI'
      ],
      quote: 'Nothing in life is to be feared, it is only to be understood.'
    },
    {
      id: 3,
      name: 'Stephen Hawking',
      field: 'Cosmology',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Stephen_Hawking.StarChild.jpg/400px-Stephen_Hawking.StarChild.jpg',
      contribution: 'Hawking Radiation',
      year: '1974',
      born: '1942',
      died: '2018',
      nationality: 'British',
      bio: 'Stephen Hawking made groundbreaking contributions to cosmology and black hole physics despite living with ALS for over 50 years. His work on black holes and the origin of the universe changed our understanding of the cosmos.',
      achievements: [
        'Discovered Hawking Radiation',
        'Developed Black Hole Thermodynamics',
        'Wrote "A Brief History of Time"',
        'Proved Singularity Theorems',
        'Advanced Quantum Cosmology'
      ],
      quote: 'Intelligence is the ability to adapt to change.'
    },
    {
      id: 4,
      name: 'Carl Sagan',
      field: 'Astronomy',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Carl_Sagan_Planetary_Society.JPG/400px-Carl_Sagan_Planetary_Society.JPG',
      contribution: 'Cosmos & Science Communication',
      year: '1980',
      born: '1934',
      died: '1996',
      nationality: 'American',
      bio: 'Carl Sagan was an astronomer and science communicator who inspired millions through his TV series Cosmos. He played a leading role in the American space program and advocated for the search for extraterrestrial intelligence.',
      achievements: [
        'Created Cosmos TV series',
        'Contributed to Pioneer and Voyager missions',
        'Developed Nuclear Winter theory',
        'Pulitzer Prize winner',
        'Advocated for SETI program'
      ],
      quote: 'Somewhere, something incredible is waiting to be known.'
    },
    {
      id: 5,
      name: 'Isaac Newton',
      field: 'Physics & Mathematics',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Portrait_of_Sir_Isaac_Newton%2C_1689.jpg/400px-Portrait_of_Sir_Isaac_Newton%2C_1689.jpg',
      contribution: 'Laws of Motion & Gravity',
      year: '1687',
      born: '1643',
      died: '1727',
      nationality: 'English',
      bio: 'Isaac Newton laid the foundations for classical mechanics with his three laws of motion and universal gravitation. His work in mathematics, optics, and physics shaped scientific thinking for centuries.',
      achievements: [
        'Formulated Laws of Motion',
        'Discovered Universal Gravitation',
        'Invented Calculus',
        'Studied Optics and Light',
        'Wrote Principia Mathematica'
      ],
      quote: 'If I have seen further, it is by standing on the shoulders of giants.'
    }
  ];

  const experiments = [
    {
      id: 1,
      title: 'CRISPR Gene Editing',
      status: 'Active',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0yi3AZ0j4EPltQjXIhwyuGDHdFSyd3abPAA&s',
      description: 'Revolutionary gene-editing technology allowing precise DNA modifications',
      progress: 85,
      applications: ['Disease treatment', 'Agriculture', 'Biotechnology'],
      fullDescription: 'CRISPR-Cas9 is a revolutionary gene-editing technology that allows scientists to precisely modify DNA sequences. This breakthrough enables treatment of genetic diseases, development of disease-resistant crops, and advancement of biotechnology research.',
      achievements: [
        'Successfully treated sickle cell disease in clinical trials',
        'Developed drought-resistant crops',
        'Created disease models for research',
        'Advanced cancer immunotherapy'
      ],
      challenges: ['Ethical considerations', 'Off-target effects', 'Delivery mechanisms', 'Regulatory approval']
    },
    {
      id: 2,
      title: 'Quantum Entanglement',
      status: 'Research',
      image: 'https://bigthink.com/wp-content/uploads/2022/10/AdobeStock_537881222.jpeg',
      description: 'Studying quantum particles that remain connected across vast distances',
      progress: 65,
      applications: ['Quantum computing', 'Secure communication', 'Teleportation', 'Quantum sensors'],
      fullDescription: 'Quantum entanglement research explores the mysterious connection between particles that remain linked regardless of distance. This phenomenon could revolutionize computing, enable unhackable communication networks, and potentially lead to quantum teleportation of information.',
      achievements: [
        'Achieved entanglement over 1,200 km distance',
        'Developed quantum repeaters for long-distance communication',
        'Created entangled photon sources',
        'Demonstrated quantum key distribution'
      ],
      challenges: ['Maintaining coherence', 'Scaling up systems', 'Error correction', 'Temperature control']
    },
    {
      id: 3,
      title: 'Fusion Energy',
      status: 'Testing',
      image: 'https://www.energy-reporters.com/wp-content/uploads/2025/08/unleashing-chaos-scientists-push-boundaries-with-radical-energy-breakthrough-that-could-reshape-global-power-dynamics.jpg.webp',
      description: 'Harnessing the power of stars to create unlimited clean energy',
      progress: 70,
      applications: ['Clean energy', 'Climate solution', 'Space propulsion', 'Desalination'],
      fullDescription: 'Nuclear fusion research aims to replicate the process that powers the sun, fusing hydrogen atoms to release enormous amounts of clean energy. Recent breakthroughs have achieved net energy gain, bringing us closer to unlimited, carbon-free power.',
      achievements: [
        'Achieved net energy gain (Q>1)',
        'Sustained plasma for 17 minutes',
        'Reached 100 million degrees Celsius',
        'Developed advanced magnetic confinement'
      ],
      challenges: ['Plasma stability', 'Material durability', 'Cost reduction', 'Commercial scaling']
    },
    {
      id: 4,
      title: 'Artificial Photosynthesis',
      status: 'Development',
      image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/fromleaftotr.jpg',
      description: 'Creating artificial systems that convert sunlight into chemical energy',
      progress: 55,
      applications: ['Carbon capture', 'Fuel production', 'Climate change', 'Sustainable chemistry'],
      fullDescription: 'Artificial photosynthesis mimics plants\' ability to convert sunlight, water, and CO2 into fuel. This technology could provide clean fuel while removing carbon dioxide from the atmosphere, addressing both energy and climate challenges simultaneously.',
      achievements: [
        'Achieved 10% solar-to-fuel efficiency',
        'Developed stable catalyst materials',
        'Created scalable reactor designs',
        'Produced hydrogen and methanol fuels'
      ],
      challenges: ['Efficiency improvement', 'Catalyst longevity', 'Cost effectiveness', 'Large-scale deployment']
    }
  ];

  const futureProjects = [
    {
      id: 1,
      title: 'Brain-Computer Interface',
      timeline: '2025-2030',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjom0w49H_PHFZVVF-E1w4uXwhmcpMcGW0HA&s',
      description: 'Direct neural connections between human brains and computers enabling thought-controlled devices and enhanced cognitive abilities',
      impact: 'Revolutionary medical treatments for paralysis, restoration of sight and hearing, treatment of neurological disorders, and potential human cognitive enhancement',
      goals: [
        'Restore mobility to paralyzed patients',
        'Enable direct brain-to-brain communication',
        'Enhance memory and learning capabilities',
        'Treat depression and PTSD'
      ],
      challenges: ['Biocompatibility', 'Signal processing', 'Ethical concerns', 'Long-term stability']
    },
    {
      id: 2,
      title: 'Asteroid Mining',
      timeline: '2030-2040',
      image: 'https://cdn.hswstatic.com/gif/asteroid-mining-intro.jpg',
      description: 'Extracting valuable minerals, water, and rare earth elements from near-Earth asteroids to support space exploration and Earth industries',
      impact: 'Access to unlimited resources worth trillions of dollars, enabling space colonization and solving resource scarcity on Earth',
      goals: [
        'Extract platinum group metals',
        'Harvest water for rocket fuel',
        'Mine rare earth elements',
        'Establish orbital refineries'
      ],
      challenges: ['Spacecraft technology', 'Economic viability', 'Legal framework', 'Resource processing']
    },
    {
      id: 3,
      title: 'Synthetic Biology',
      timeline: '2025-2035',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
      description: 'Engineering entirely new biological systems and organisms from scratch using DNA synthesis and genetic circuits',
      impact: 'Custom-designed medicines, bio-manufactured materials, programmable cells for disease treatment, and sustainable bio-production replacing chemical manufacturing',
      goals: [
        'Design custom organisms for medicine production',
        'Create bio-computers using living cells',
        'Develop self-healing materials',
        'Engineer carbon-capturing bacteria'
      ],
      challenges: ['Safety protocols', 'Ethical guidelines', 'Containment systems', 'Public acceptance']
    }
  ];

  return (
    <div className="relative bg-gradient-to-b from-[#0a0520] via-[#1a0f3a] to-[#0a0520] overflow-x-hidden">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-20 pt-32"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
          Scientist Lab
        </h1>
        <p className="text-xl text-gray-300 font-semibold">Hover over equipment to explore • Click for detailed information</p>
      </motion.div>

      {/* 3D Lab View with Real Equipment */}
      <div className="relative max-w-7xl mx-auto">
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden glass-strong border-2 border-purple-500/30">
          {/* Lab room background */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=80"
              alt="Laboratory"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 to-blue-900/40" />
          </div>

          {/* Equipment with actual images */}
          {labEquipment.map((equipment) => (
            <motion.div
              key={equipment.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: equipment.id * 0.1, type: 'spring' }}
              style={{
                position: 'absolute',
                left: `${equipment.position.x}%`,
                top: `${equipment.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={() => setHoveredEquipment(equipment)}
              onMouseLeave={() => setHoveredEquipment(null)}
              onClick={() => setSelectedEquipment(equipment)}
              className="cursor-pointer group"
            >
              <motion.div
                animate={{
                  scale: hoveredEquipment?.id === equipment.id ? 1.2 : 1,
                  y: hoveredEquipment?.id === equipment.id ? -10 : 0
                }}
                className="relative"
              >
                {/* Equipment image */}
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden glass-strong border-2 group-hover:border-4 transition-all"
                  style={{ borderColor: equipment.color }}
                >
                  <img 
                    src={equipment.image}
                    alt={equipment.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                {/* Glow effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl blur-xl"
                  style={{ backgroundColor: equipment.color }}
                />
                
                {/* Label */}
                {hoveredEquipment?.id === equipment.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap glass px-3 py-1 rounded-full text-xs font-bold"
                    style={{ color: equipment.color }}
                  >
                    {equipment.name}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info Panel */}
        <AnimatePresence>
          {hoveredEquipment && !selectedEquipment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 glass-strong rounded-2xl p-6 border-2"
              style={{ borderColor: hoveredEquipment.color }}
            >
              <div className="flex gap-6 items-start">
                <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={hoveredEquipment.image}
                    alt={hoveredEquipment.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-2">{hoveredEquipment.name}</h3>
                  <p className="text-gray-300 text-lg">{hoveredEquipment.description}</p>
                  <p className="text-gray-400 text-sm mt-3">Click for detailed specifications</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Famous Scientists - Horizontal Scroll */}
      <div className="mt-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center text-purple-400 mb-12"
        >
          Famous Scientists
        </motion.h2>
        <div className="flex gap-6 overflow-x-auto pb-8 px-4 scrollbar-hide">
          {scientists.map((scientist, index) => (
            <motion.div
              key={scientist.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedScientist(scientist)}
              className="glass-strong rounded-3xl overflow-hidden min-w-[300px] cursor-pointer"
            >
              <div className="relative h-80">
                <img 
                  src={scientist.image}
                  alt={scientist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{scientist.name}</h3>
                  <p className="text-purple-400 font-semibold">{scientist.field}</p>
                  <p className="text-gray-300 text-sm mt-2">{scientist.contribution}</p>
                  <span className="inline-block mt-3 glass px-3 py-1 rounded-full text-xs text-gray-300">
                    {scientist.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current Experiments */}
      <div className="mt-32 px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center text-blue-400 mb-12"
        >
          Ongoing Experiments
        </motion.h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedExperiment(experiment)}
              className="glass-strong rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="relative h-64">
                <img 
                  src={experiment.image}
                  alt={experiment.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    experiment.status === 'Active' ? 'bg-green-900 text-green-300' :
                    experiment.status === 'Research' ? 'bg-blue-900 text-blue-300' :
                    experiment.status === 'Testing' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-purple-900 text-purple-300'
                  }`}>
                    {experiment.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{experiment.title}</h3>
                <p className="text-gray-300 mb-4">{experiment.description}</p>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{experiment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${experiment.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Applications */}
                <div className="flex flex-wrap gap-2">
                  {experiment.applications.map((app, i) => (
                    <span key={i} className="glass px-3 py-1 rounded-full text-xs text-blue-300">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Future Projects */}
      <div className="mt-32 px-4 pb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center text-pink-400 mb-12"
        >
          Future Projects
        </motion.h2>
        <div className="max-w-7xl mx-auto space-y-8">
          {futureProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={() => setSelectedProject(project)}
              className="glass-strong rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                <div className={`relative h-80 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>
                <div className={`p-8 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <span className="inline-block glass px-4 py-2 rounded-full text-sm text-pink-300 font-bold mb-4 w-fit">
                    {project.timeline}
                  </span>
                  <h3 className="text-4xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-gray-300 text-lg mb-4">{project.description}</p>
                  <div className="glass-green rounded-xl p-4 border-l-4 border-pink-500">
                    <p className="text-sm text-gray-400 mb-1">Expected Impact:</p>
                    <p className="text-white font-semibold">{project.impact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scientist Detail Modal */}
      <AnimatePresence>
        {selectedScientist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScientist(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-6 md:p-8 max-w-4xl w-full border-2 border-purple-500 my-8 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedScientist(null)}
                className="sticky top-2 right-2 float-right text-white hover:text-red-400 text-4xl font-bold z-20 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ×
              </button>

              {/* Header Section - No Image */}
              <div className="mb-6 clear-both pb-6 border-b border-purple-500/30">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-3">{selectedScientist.name}</h2>
                <p className="text-purple-400 text-2xl font-bold mb-2">{selectedScientist.field}</p>
                <p className="text-gray-300 text-lg">{selectedScientist.born} - {selectedScientist.died} • {selectedScientist.nationality}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-purple-400 mb-3">Biography</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedScientist.bio}</p>
                </div>

                <div className="glass-green rounded-2xl p-6 border-l-4 border-purple-500">
                  <p className="text-xl text-gray-200 italic">"{selectedScientist.quote}"</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-purple-400 mb-3">Major Achievements</h3>
                  <ul className="space-y-2">
                    {selectedScientist.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experiment Detail Modal */}
      <AnimatePresence>
        {selectedExperiment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExperiment(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-6 md:p-8 max-w-4xl w-full border-2 border-blue-500 my-8 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedExperiment(null)}
                className="sticky top-2 right-2 float-right text-white hover:text-red-400 text-4xl font-bold z-20 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ×
              </button>

              <div className="mb-6 clear-both pb-6 border-b border-blue-500/30">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">{selectedExperiment.title}</h2>
                <span className={`inline-block px-6 py-3 rounded-full text-base font-bold ${
                  selectedExperiment.status === 'Active' ? 'bg-green-900 text-green-300' :
                  selectedExperiment.status === 'Research' ? 'bg-blue-900 text-blue-300' :
                  'bg-yellow-900 text-yellow-300'
                }`}>
                  {selectedExperiment.status}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-3">Overview</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedExperiment.fullDescription || selectedExperiment.description}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-3">Progress: {selectedExperiment.progress}%</h3>
                  <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${selectedExperiment.progress}%` }}
                    />
                  </div>
                </div>

                {selectedExperiment.achievements && (
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-3">Key Achievements</h3>
                    <ul className="space-y-2">
                      {selectedExperiment.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-3">Applications</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedExperiment.applications.map((app, i) => (
                      <span key={i} className="glass px-4 py-2 rounded-full text-blue-300">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedExperiment.challenges && (
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-3">Current Challenges</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedExperiment.challenges.map((challenge, i) => (
                        <span key={i} className="glass px-4 py-2 rounded-full text-yellow-300">
                          {challenge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-6 md:p-8 max-w-4xl w-full border-2 border-pink-500 my-8 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="sticky top-2 right-2 float-right text-white hover:text-red-400 text-4xl font-bold z-20 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ×
              </button>

              <div className="mb-6 clear-both pb-6 border-b border-pink-500/30">
                <span className="inline-block glass px-6 py-3 rounded-full text-base text-pink-300 font-bold mb-4">
                  {selectedProject.timeline}
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-white">{selectedProject.title}</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-pink-400 mb-3">Project Description</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="glass-green rounded-2xl p-6 border-l-4 border-pink-500">
                  <h4 className="text-lg font-bold text-pink-400 mb-2">Expected Impact</h4>
                  <p className="text-white text-lg">{selectedProject.impact}</p>
                </div>

                {selectedProject.goals && (
                  <div>
                    <h3 className="text-2xl font-bold text-pink-400 mb-3">Project Goals</h3>
                    <ul className="space-y-2">
                      {selectedProject.goals.map((goal, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="text-pink-400 font-bold">•</span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.challenges && (
                  <div>
                    <h3 className="text-2xl font-bold text-pink-400 mb-3">Key Challenges</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.challenges.map((challenge, i) => (
                        <span key={i} className="glass px-4 py-2 rounded-full text-pink-300">
                          {challenge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Equipment Detail Modal */}
      <AnimatePresence>
        {selectedEquipment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEquipment(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-6 md:p-8 max-w-4xl w-full border-2 my-8 max-h-[90vh] overflow-y-auto relative"
              style={{ borderColor: selectedEquipment.color }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEquipment(null);
                }}
                className="sticky top-2 right-2 float-right text-white hover:text-red-400 text-4xl font-bold z-20 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ×
              </button>

              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6 clear-both">
                <img 
                  src={selectedEquipment.image}
                  alt={selectedEquipment.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{selectedEquipment.name}</h2>
                  <p className="text-xl text-gray-300">{selectedEquipment.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: selectedEquipment.color }}>Overview</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedEquipment.details}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: selectedEquipment.color }}>Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedEquipment.specs.map((spec, i) => (
                      <div key={i} className="glass rounded-xl p-4">
                        <p className="text-gray-300">{spec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: selectedEquipment.color }}>Applications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedEquipment.uses.map((use, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="glass rounded-xl p-4 text-center"
                      >
                        <p className="text-white font-semibold">{use}</p>
                      </motion.div>
                    ))}
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

export default ModernScientistLab;
