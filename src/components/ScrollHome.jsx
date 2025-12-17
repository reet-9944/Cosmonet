import React, { useEffect, useRef } from 'react';
import { Instagram, Twitter, Linkedin, Github, Copyright } from 'lucide-react';
import gsap from 'gsap';
import SolarSystemSimulation from './SolarSystemSimulation';
import ProtectedFeature from './ProtectedFeature';

const ScrollHome = ({ onExplore, onOpenArtifact, isAuthenticated, onLoginRequired }) => {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);

  const [selectedArtifact, setSelectedArtifact] = React.useState(null);
  const [showSimulation, setShowSimulation] = React.useState(false);
  
  const handleSimulationClick = () => {
    if (!isAuthenticated) {
      onLoginRequired();
    } else {
      setShowSimulation(true);
    }
  };

  const artifacts = [
    { 
      id: 1, 
      title: "The Great Void", 
      desc: "A region of space 330 million light-years across with... absolutely nothing.", 
      icon: "🕳️", 
      color: "border-purple-500",
      image: "https://preview.redd.it/etkk949z31d01.jpg?auto=webp&s=78501c390019624774df1f812d2ab56ee211f502",
      fullDesc: "The Boötes Void, also known as the Great Void, is an enormous region of space approximately 330 million light-years in diameter. It contains very few galaxies compared to other regions of the universe. Discovered in 1981, this cosmic void challenges our understanding of how matter is distributed in the universe.",
      facts: [
        "Contains only 60 galaxies (normal regions have 2,000+)",
        "330 million light-years across",
        "Located 700 million light-years from Earth",
        "One of the largest known voids in the universe"
      ]
    },
    { 
      id: 2, 
      title: "Zombie Stars", 
      desc: "Type Ia supernovae that survive their own explosion and keep burning.", 
      icon: "🧟", 
      color: "border-green-500",
      image: "https://static.scientificamerican.com/sciam/cache/file/E21D7F63-03E3-4AD8-BAE40C488E47573F_source.jpg",
      fullDesc: "Zombie stars are white dwarfs that survive their supernova explosions and continue to exist. These stellar remnants defy expectations by not being completely destroyed during the violent explosion. They represent a rare and fascinating phenomenon in stellar evolution.",
      facts: [
        "Survive their own supernova explosions",
        "Continue burning after the blast",
        "Challenge traditional supernova models",
        "Extremely rare cosmic phenomena"
      ]
    },
    { 
      id: 3, 
      title: "Galactic Cannibalism", 
      desc: "Large galaxies ripping apart smaller ones to fuel their own growth.", 
      icon: "🪐", 
      color: "border-red-500",
      image: "https://gohighbrow.com/wp-content/uploads/2015/03/77.jpg",
      fullDesc: "Galactic cannibalism occurs when a large galaxy collides with and absorbs a smaller galaxy. This process is common in the universe and is how galaxies grow over billions of years. Our own Milky Way is currently consuming several smaller satellite galaxies and will eventually merge with Andromeda.",
      facts: [
        "Milky Way is eating smaller galaxies right now",
        "Process takes hundreds of millions of years",
        "Creates spectacular tidal streams of stars",
        "Will merge with Andromeda in 4.5 billion years"
      ]
    },
    { 
      id: 4, 
      title: "Dark Flow", 
      desc: "Something outside the visible universe is pulling galaxy clusters at 2 million mph.", 
      icon: "💫", 
      color: "border-blue-500",
      image: "https://www.popsci.com/wp-content/uploads/2019/03/18/I76FNIQ6ZWNF3L2ZZ4QLUVGWVQ.jpeg?quality=85&w=640",
      fullDesc: "Dark Flow is a mysterious phenomenon where galaxy clusters appear to be moving in a uniform direction at enormous speeds, as if being pulled by something beyond the observable universe. This challenges our understanding of cosmology and suggests there may be massive structures beyond what we can see.",
      facts: [
        "Galaxy clusters moving at 2 million mph",
        "Direction points toward constellation Centaurus",
        "May indicate structures beyond observable universe",
        "Discovered in 2008, still unexplained"
      ]
    },
    { 
      id: 5, 
      title: "Diamond Planet", 
      desc: "55 Cancri e is made largely of diamond. Worth $26.9 nonillion.", 
      icon: "💎", 
      color: "border-cyan-500",
      image: "https://www.shutterstock.com/image-photo/planet-being-cut-half-revealing-600nw-2381787303.jpg",
      fullDesc: "55 Cancri e is an exoplanet located 40 light-years away that is believed to be composed largely of diamond. With a mass about 8 times that of Earth, this super-Earth orbits very close to its star, completing one orbit in just 18 hours. Its estimated value is $26.9 nonillion.",
      facts: [
        "Twice the size of Earth",
        "Surface temperature: 2,400°C (4,400°F)",
        "Orbits its star in just 18 hours",
        "Worth more than Earth's entire economy"
      ]
    },
    { 
      id: 6, 
      title: "The Cold Spot", 
      desc: "A mysterious cool area in the CMB caused by a collision with a parallel universe?", 
      icon: "❄️", 
      color: "border-white",
      image: "https://cdn.mos.cms.futurecdn.net/NGvjRSwZWbsGdNZ4cKtKgd.jpg",
      fullDesc: "The CMB Cold Spot is an unusually large and cold region in the cosmic microwave background radiation. Discovered in 2004, it's about 1.8 billion light-years across and is 70 microkelvins colder than expected. Some scientists speculate it could be evidence of a collision with a parallel universe.",
      facts: [
        "1.8 billion light-years across",
        "70 microkelvins colder than surroundings",
        "May be evidence of parallel universe",
        "Challenges standard cosmological models"
      ]
    }
  ];

  useEffect(() => {

    // Hero animation with GSAP
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }

    // Cards animation on scroll (without animejs)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Simple CSS animation fallback
          const cards = document.querySelectorAll('.artifact-card');
          cards.forEach((el, idx) => {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0) scale(1)';
            }, idx * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] bg-purple-900/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        
        {/* Animated Stars */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: Math.random() * 3 + 2 + 's',
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>

      {/* SECTION 1: HERO */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6">
        <div ref={heroRef} className="opacity-0"> 
          <div className="inline-block px-4 py-1 border border-blue-500/50 rounded-full bg-blue-900/20 backdrop-blur-md text-blue-300 text-xs tracking-[0.3em] mb-6 uppercase">
            Cosmic Discovery Portal
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent" style={{ textShadow: '0 10px 30px rgba(255,255,255,0.1)' }}>
            COSMONET :<br/>The Universe Explorer
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl mb-12 leading-relaxed">
            Journey through the cosmos and discover the mysteries of space.<br/>
            Explore planets, stars, galaxies, and beyond in our interactive universe.
          </p>
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE CARDS */}
      <div ref={cardsRef} className="relative z-10 py-24 px-6 md:px-20 bg-gradient-to-b from-transparent via-black/80 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-left border-l-4 border-blue-500 pl-6">
            <span className="block text-sm text-blue-400 tracking-widest uppercase mb-2">Sector 7G</span>
            Forbidden Knowledge
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artifacts.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedArtifact(item)}
                className={`artifact-card group relative p-8 rounded-xl bg-gray-900/40 border ${item.color} border-opacity-30 hover:border-opacity-100 backdrop-blur-md transition-all duration-500 hover:bg-gray-800 transform hover:-translate-y-2 cursor-pointer`}
                style={{ opacity: 0, transform: 'translateY(100px) scale(0.8)', transition: 'all 0.6s ease-out' }} 
              >
                <div className="absolute top-0 right-0 p-4 text-4xl opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                  {item.icon}
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors text-gray-200">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: SOLAR SYSTEM TEASER */}
      <div className="relative z-10 py-32 bg-gray-900 border-t border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500 rounded-full blur-[150px]"></div>
        </div>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/2 text-left">
            <h2 className="text-5xl font-black mb-6 text-white">THE SOLAR SYSTEM</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Return to the safety of our home system. View real-time orbits, planetary details, and atmospheric simulations in our 3D engine.
            </p>
            <ProtectedFeature 
              onLoginRequired={onLoginRequired}
              showLockIcon={!isAuthenticated}
              lockMessage="🔒 Login Required to Launch Simulation"
            >
              <button 
                onClick={handleSimulationClick}
                className="px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <span>LAUNCH 3D SIMULATION</span>
                <span>🚀</span>
                {!isAuthenticated && <span className="ml-2">🔒</span>}
              </button>
            </ProtectedFeature>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 animate-[spin_20s_linear_infinite]">
              <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_50px_rgba(250,204,21,0.8)]"></div>
              <div className="absolute top-0 left-1/2 w-8 h-8 bg-blue-500 rounded-full -translate-x-1/2 shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
              <div className="absolute bottom-10 right-10 w-6 h-6 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)]"></div>
              <div className="absolute top-1/2 left-0 w-4 h-4 bg-gray-400 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
              <div className="absolute inset-0 rounded-full border border-white/10"></div>
              <div className="absolute inset-4 rounded-full border border-white/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: FOOTER */}
      <footer className="relative z-10 bg-black pt-20 pb-10 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">COSMONET</h3>
            <p className="text-gray-500 max-w-xs">
              Exploring the unknown boundaries of the universe through code and curiosity.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Explore</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-blue-400 cursor-pointer transition">Solar System</li>
              <li className="hover:text-blue-400 cursor-pointer transition">Black Holes</li>
              <li className="hover:text-blue-400 cursor-pointer transition">Deep Space Network</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Connect</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/space.rovers?igsh=OWNkc3Jlamw2dHFw" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition"><Instagram size={18} /></a>
              <a href="https://x.com/" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition"><Twitter size={18} /></a>
              <a href="https://www.linkedin.com/feed/" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition"><Linkedin size={18} /></a>
              <a href="https://github.com/reet-9944/Cosmonet-The-Universe-Explorer-Hub" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition"><Github size={18} /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Copyright size={12} /> 2025 Cosmonet Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Artifact Detail Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            onClick={() => setSelectedArtifact(null)}
          />
          
          {/* Modal */}
          <div 
            className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 ${selectedArtifact.color} rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl z-10`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Top Right */}
            <button 
              onClick={() => setSelectedArtifact(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-800/50 backdrop-blur-md border border-purple-500/30 text-white flex items-center justify-center hover:bg-gray-700/70 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img 
                  src={selectedArtifact.image}
                  alt={selectedArtifact.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Content Side */}
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[80vh]">
                <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                  SECTOR 7G • CLASSIFIED
                </div>
                <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4 border-b-2 ${selectedArtifact.color} pb-4`}>
                  {selectedArtifact.title}
                </h2>
                
                <p className="text-gray-400 text-lg mb-6 italic">
                  {selectedArtifact.desc}
                </p>

                <p className="text-gray-300 text-base leading-relaxed mb-8">
                  {selectedArtifact.fullDesc}
                </p>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${selectedArtifact.color.replace('border', 'bg')}`} />
                    Key Facts
                  </h3>
                  {selectedArtifact.facts.map((fact, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <span className={`text-2xl ${selectedArtifact.color.replace('border', 'text')}`}>•</span>
                      <span className="text-gray-300 flex-1">{fact}</span>
                    </div>
                  ))}
                </div>


              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Solar System Simulation */}
      {showSimulation && (
        <SolarSystemSimulation onClose={() => setShowSimulation(false)} />
      )}
    </div>
  );
};

export default ScrollHome;
