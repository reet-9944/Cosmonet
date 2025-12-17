import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SimpleMissile from './SimpleMissile';

gsap.registerPlugin(ScrollTrigger);

const ModernMissionControl = () => {
  const [nasaData, setNasaData] = useState(null);
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedNasaImage, setSelectedNasaImage] = useState(null);
  const [rocketPart, setRocketPart] = useState(null);
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);

  // Fetch NASA APOD (Astronomy Picture of the Day)
  useEffect(() => {
    // Using fallback data due to API rate limits
   
    const fallbackData = [
      {
        title: 'Distant Galaxy Cluster',
        explanation: 'A stunning view of a distant galaxy cluster captured by the Hubble Space Telescope, showing billions of stars in a spiral formation.',
        url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
        date: '2024-11-20',
        media_type: 'image'
      },
      {
        title: 'Saturn and Its Rings',
        explanation: 'The majestic rings of Saturn, composed of ice and rock particles, captured in stunning detail.',
        url: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80',
        date: '2024-11-19',
        media_type: 'image'
      },
      {
        title: 'Nebula Formation',
        explanation: 'A stellar nursery where new stars are being born, illuminated by the light of young, hot stars.',
        url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
        date: '2024-11-18',
        media_type: 'image'
      },
      {
        title: 'Rocket Launch',
        explanation: 'A powerful rocket lifts off, its engines producing millions of pounds of thrust.',
        url: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80',
        date: '2024-11-17',
        media_type: 'image'
      },
      {
        title: 'International Space Station',
        explanation: 'The ISS orbiting Earth, a testament to international cooperation in space exploration.',
        url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80',
        date: '2024-11-16',
        media_type: 'image'
      },
      {
        title: 'Comet Trail',
        explanation: 'An icy visitor from the outer solar system streaks across the night sky.',
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        date: '2024-11-15',
        media_type: 'image'
      }
    ];
    
    setNasaData(fallbackData);
    
    // Uncomment below to try NASA API (may hit rate limits with DEMO_KEY)
    // fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=6')
    //   .then(res => res.json())
    //   .then(data => setNasaData(data))
    //   .catch(err => {
    //     console.warn('NASA API Error, using fallback data:', err);
    //     setNasaData(fallbackData);
    //   });
  }, []);

  // GSAP Scroll Animations - Smooth fade in from bottom
  useEffect(() => {
    if (scrollSectionRef.current) {
      const sections = scrollSectionRef.current.querySelectorAll('.scroll-section');
      
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const missions = [
    {
      name: 'Chandrayaan-3',
      status: 'Completed',
      date: '2023',
      description: 'India\'s successful lunar landing mission',
      agency: 'ISRO (Indian Space Research Organisation)',
      image: 'https://www.shutterstock.com/image-illustration/chennai-india-19th-august-2023-600nw-2349626681.jpg',
      details: 'Historic achievement as India became the 4th country to soft-land on the Moon and first to land near the lunar south pole.',
      fullDetails: 'Chandrayaan-3 was launched on July 14, 2023, and successfully landed on the Moon on August 23, 2023. Led by ISRO under the guidance of Chairman S. Somanath, the mission consisted of a lander (Vikram) and rover (Pragyan). The mission made India the first nation to land near the lunar south pole, a region of significant scientific interest due to potential water ice deposits. The mission operated for one lunar day (14 Earth days) conducting experiments on lunar soil composition, seismic activity, and thermal properties.',
      objectives: [
        'Demonstrate safe soft landing on lunar surface',
        'Demonstrate rover mobility on the Moon',
        'Conduct in-situ scientific experiments',
        'Study lunar south pole region composition'
      ],
      stats: { 
        duration: '14 days', 
        distance: '384,400 km', 
        cost: '$75 million', 
        landing: 'Aug 23, 2023' 
      },
      leadership: 'ISRO Chairman: S. Somanath | Project Director: P. Veeramuthuvel | Mission Director: S. Mohana Kumar',
      crew: 'Uncrewed (Vikram lander & Pragyan rover)',
      outcome: 'Complete Success - All objectives achieved. India became 4th nation to land on Moon.'
    },
    {
      name: 'Artemis I',
      status: 'Completed',
      date: '2022',
      description: 'Uncrewed test flight of Orion spacecraft around the Moon',
      agency: 'NASA (National Aeronautics and Space Administration)',
      image: 'https://www.3d-plus.com/app/uploads/2023/04/SLS-Artemis-1.jpg',
      details: 'Successfully tested the Orion spacecraft and Space Launch System rocket in preparation for crewed missions.',
      fullDetails: 'Artemis I was the first integrated test of NASA\'s deep space exploration systems: the Orion spacecraft, Space Launch System (SLS) rocket, and ground systems. Launched on November 16, 2022, the mission traveled 1.4 million miles over 25.5 days, going farther than any spacecraft built for humans has ever flown. It tested the heat shield during reentry at 24,500 mph and validated critical systems for future crewed missions. The mission paves the way for Artemis II (crewed lunar flyby) and Artemis III (first woman and person of color on the Moon).',
      objectives: [
        'Test Orion spacecraft systems in deep space',
        'Validate heat shield at lunar return velocities',
        'Demonstrate mission operations and ground systems',
        'Retrieve flight data for crew safety analysis'
      ],
      stats: { 
        distance: '1.4M miles', 
        duration: '25.5 days', 
        speed: '24,500 mph', 
        cost: '$4.1B' 
      },
      leadership: 'NASA Administrator: Bill Nelson | Artemis Program Manager: Mike Sarafin',
      crew: 'Uncrewed (Mannequins: Commander Moonikin Campos, Helga, Zohar)',
      outcome: 'Complete Success - Splashdown in Pacific Ocean on Dec 11, 2022'
    },
    {
      name: 'Perseverance Rover',
      status: 'Active',
      date: '2021-Present',
      description: 'Mars rover searching for signs of ancient life',
      agency: 'NASA/JPL (Jet Propulsion Laboratory)',
      image: 'https://thumbs.dreamstime.com/b/generated-image-412464793.jpg',
      details: 'Collecting rock samples and testing new technologies for future human missions to Mars.',
      fullDetails: 'Perseverance launched on July 30, 2020, and landed on Mars on February 18, 2021, after a 7-month journey covering 293 million miles. The rover is exploring Jezero Crater, site of an ancient lake and river delta 3.5 billion years ago. Led by NASA\'s Jet Propulsion Laboratory, the mission is collecting samples that will be returned to Earth by future missions (Mars Sample Return). It carries the Ingenuity helicopter, which made history as the first aircraft to achieve powered flight on another planet (April 19, 2021). The MOXIE experiment successfully produced oxygen from Mars\' CO2 atmosphere.',
      objectives: [
        'Search for signs of ancient microbial life',
        'Collect and cache rock and soil samples for Earth return',
        'Test oxygen production from Martian atmosphere (MOXIE)',
        'Demonstrate helicopter flight on Mars (Ingenuity)'
      ],
      stats: { 
        distance: '293M miles', 
        duration: '3+ years', 
        speed: '0.1 mph', 
        samples: '24+ collected' 
      },
      leadership: 'Project Manager: Jennifer Trosper | Deputy Project Manager: Matt Wallace | Chief Engineer: Adam Steltzner',
      crew: 'Robotic rover (Perseverance) + Ingenuity helicopter',
      outcome: 'Ongoing Success - Exceeded primary mission duration, continues exploration'
    },
    {
      name: 'James Webb Space Telescope',
      status: 'Active',
      date: '2021-Present',
      description: 'Most powerful space telescope observing the early universe',
      agency: 'NASA/ESA (European Space Agency)/CSA (Canadian Space Agency)',
      image: 'https://media.sketchfab.com/models/dcb95b3193be49e7a60192055df2315d/thumbnails/8ba4e3f4b2f24d089b1970c8b66b2169/71c925754ce14f3897582953a5e7f49f.jpeg',
      details: 'Capturing unprecedented images of distant galaxies, exoplanets, and stellar nurseries.',
      fullDetails: 'The James Webb Space Telescope (JWST) launched on December 25, 2021, aboard an Ariane 5 rocket from French Guiana. After a complex 30-day deployment journey, it reached the second Lagrange point (L2), 1 million miles from Earth. This international collaboration between NASA, ESA, and CSA took 30 years and $10 billion to develop. Its 6.5-meter gold-coated beryllium mirror and advanced infrared instruments can observe galaxies formed just 200 million years after the Big Bang. JWST has already discovered the oldest galaxies, analyzed exoplanet atmospheres, and captured stunning images of nebulae and star formation.',
      objectives: [
        'Observe the first galaxies formed after the Big Bang',
        'Study the formation and evolution of stars and planets',
        'Analyze chemical compositions of exoplanet atmospheres',
        'Investigate the nature of dark matter and dark energy'
      ],
      stats: { 
        distance: '1M miles', 
        duration: '3+ years', 
        resolution: '0.1 arcsec', 
        cost: '$10B' 
      },
      leadership: 'NASA Program Director: Greg Robinson | ESA Project Manager: Pierre Ferruit | CSA Project Manager: Chris Willott',
      crew: 'Uncrewed space observatory',
      outcome: 'Extraordinary Success - Revolutionizing astronomy with groundbreaking discoveries'
    },
    {
      name: 'SpaceX Starship',
      status: 'In Development',
      date: '2024-Present',
      description: 'Fully reusable super heavy-lift launch vehicle',
      agency: 'SpaceX (Space Exploration Technologies Corp.)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/SpaceX_Starship_ignition_during_IFT-5.jpg',
      details: 'Designed for missions to Moon, Mars, and beyond with full reusability.',
      fullDetails: 'Starship is a fully reusable transportation system designed to carry both crew and cargo to Earth orbit, the Moon, Mars, and beyond. Standing 120 meters (394 feet) tall, it\'s the most powerful launch vehicle ever developed, capable of lifting 100-150 tons to low Earth orbit. The system consists of two stages: the Super Heavy booster with 33 Raptor engines producing 17 million pounds of thrust, and the Starship spacecraft with 6 Raptor engines. Both stages are designed to land vertically and be rapidly reused. SpaceX has conducted multiple test flights from Starbase in Boca Chica, Texas, with each flight advancing toward orbital capability. NASA has selected Starship as the lunar lander for Artemis III mission.',
      objectives: [
        'Enable human settlement on Mars (Elon Musk\'s vision)',
        'Reduce cost of space access by 1000x through reusability',
        'Transport 100+ people per flight to orbit and beyond',
        'Serve as lunar lander for NASA\'s Artemis program'
      ],
      stats: { 
        payload: '100-150 tons', 
        height: '120m', 
        engines: '39 total', 
        thrust: '17M lbs' 
      },
      leadership: 'CEO: Elon Musk | President: Gwynne Shotwell | VP of Build & Flight Reliability: Bill Riley',
      crew: 'Designed for 100+ passengers (currently uncrewed test flights)',
      outcome: 'In Progress - Multiple test flights completed, advancing toward orbital operations'
    },
    {
      name: 'Tiangong Space Station',
      status: 'Active',
      date: '2021-Present',
      description: 'China\'s modular space station in low Earth orbit',
      agency: 'CNSA (China National Space Administration)',
      image: 'https://www.iasgyan.in//ig-uploads/images//image02663.jpg',
      details: 'China\'s permanently crewed space station conducting scientific research.',
      fullDetails: 'Tiangong (meaning "Heavenly Palace") is China\'s modular space station, completed in 2022. The station consists of three modules: Tianhe (core module), Wentian (laboratory), and Mengtian (laboratory). It orbits at 340-450 km altitude and is permanently crewed by three taikonauts (Chinese astronauts) on 6-month rotations. The station conducts experiments in microgravity, space medicine, astronomy, and Earth observation. China has announced plans to keep Tiangong operational for at least 10 years and is open to international cooperation.',
      objectives: [
        'Establish permanent Chinese presence in space',
        'Conduct long-duration scientific experiments',
        'Test technologies for future deep space missions',
        'Foster international space cooperation'
      ],
      stats: { 
        altitude: '340-450 km', 
        mass: '66 tons', 
        crew: '3 taikonauts', 
        duration: '10+ years' 
      },
      leadership: 'CNSA Director: Zhang Kejian | Chief Designer: Yang Hong | Mission Commander (current): Ye Guangfu',
      crew: 'Permanently crewed (3 taikonauts rotating every 6 months)',
      outcome: 'Operational Success - Conducting continuous scientific research'
    }
  ];

  const [selectedSite, setSelectedSite] = useState(null);

  const launchSites = [
    { 
      name: 'Kennedy Space Center', 
      location: 'Florida, USA', 
      launches: '175+',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJwocprFcfUBHE-AFR80zgnsE6YXEHwA-Qzg&s',
      details: 'NASA\'s primary launch center since 1968. Home to the iconic Vehicle Assembly Building and Launch Complex 39, where Apollo and Space Shuttle missions launched.',
      established: '1962',
      area: '144,000 acres',
      notable: 'Apollo 11, Space Shuttle, Artemis'
    },
    { 
      name: 'Baikonur Cosmodrome', 
      location: 'Kazakhstan', 
      launches: '1,500+',
      image: 'https://trvlland.com/wp-content/uploads/2022/09/kazakhstan_baykonur_cosmodrome-scaled.jpg',
      details: 'World\'s first and largest operational space launch facility. Yuri Gagarin launched from here in 1961, making history as the first human in space.',
      established: '1955',
      area: '2,593 sq mi',
      notable: 'Sputnik, Gagarin, ISS missions'
    },
    { 
      name: 'Guiana Space Centre', 
      location: 'French Guiana', 
      launches: '280+',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ensemble_de_lancement_Vega.jpg/500px-Ensemble_de_lancement_Vega.jpg',
      details: 'Europe\'s Spaceport, operated by ESA, CNES, and Arianespace. Its location near the equator provides a significant boost to launch efficiency.',
      established: '1968',
      area: '690 sq km',
      notable: 'Ariane 5, Vega, Soyuz'
    },
    { 
      name: 'Jiuquan Satellite Launch Center', 
      location: 'Gobi Desert, China', 
      launches: '100+',
      image: 'https://chinaspacereport.wordpress.com/wp-content/uploads/2016/05/12947184.jpg',
      details: 'China\'s first and most frequently used satellite launch center. Site of Yang Liwei\'s historic flight, making China the third nation to independently launch humans into space.',
      established: '1958',
      area: '2,800 sq km',
      notable: 'Shenzhou missions, Tiangong'
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-[#000000] via-[#0a0a1a] to-[#000000]">
      {/* Animated Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -2000],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%'
            }}
          />
        ))}
      </div>

      {/* Hero Section with Simple Missile */}
      <div className="relative min-h-screen pt-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 z-10"
        >
          <motion.h1
            animate={{
              textShadow: [
                '0 0 20px rgba(239, 68, 68, 0.5)',
                '0 0 40px rgba(239, 68, 68, 0.8)',
                '0 0 20px rgba(239, 68, 68, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 mb-4"
          >
            Mission Control
          </motion.h1>
          <h2 className="text-3xl font-bold text-white mb-2">
            Interactive Rocket Explorer
          </h2>
          <p className="text-gray-400">Hover and click on different parts to learn more</p>
        </motion.div>
        
        <SimpleMissile />
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl mt-8"
        >
          ⬇️
        </motion.div>
      </div>

      {/* Missions Section with GSAP Scroll */}
      <div ref={scrollSectionRef} className="relative py-16 px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-6xl font-bold text-center text-white mb-12"
        >
          Active Missions
        </motion.h2>

        <div className="max-w-7xl mx-auto space-y-16">
          {missions.map((mission, index) => (
            <div
              key={index}
              className="scroll-section"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedMission(mission)}
                className={`glass-strong rounded-3xl p-12 cursor-pointer border-2 ${
                  mission.status === 'Active' ? 'border-green-500' : 
                  mission.status === 'Completed' ? 'border-blue-500' : 'border-yellow-500'
                } grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
              >
                {/* Content */}
                <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      mission.status === 'Active' ? 'bg-green-900 text-green-300' :
                      mission.status === 'Completed' ? 'bg-blue-900 text-blue-300' :
                      'bg-yellow-900 text-yellow-300'
                    }`}>
                      {mission.status}
                    </span>
                    <span className="text-gray-400">{mission.date}</span>
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-4">{mission.name}</h3>
                  <p className="text-xl text-gray-300 mb-6">{mission.description}</p>
                  <p className="text-gray-400 mb-6">{mission.details}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(mission.stats).map(([key, value], i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className="glass rounded-xl p-4 text-center"
                      >
                        <div className="text-2xl font-bold text-green-400">{value}</div>
                        <div className="text-xs text-gray-400 uppercase mt-1">{key.replace(/_/g, ' ')}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="glass-strong rounded-3xl overflow-hidden relative"
                  >
                    <img 
                      src={mission.image} 
                      alt={mission.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Launch Sites Horizontal Scroll */}
      <div className="relative py-16 overflow-hidden">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-6xl font-bold text-center text-white mb-12"
        >
          Global Launch Sites
        </motion.h2>

        <div className="flex gap-8 px-8 overflow-x-auto pb-8 scrollbar-hide">
          {launchSites.map((site, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedSite(site)}
              className="glass-strong rounded-3xl overflow-hidden min-w-[350px] cursor-pointer"
            >
              <div className="relative h-48">
                <img 
                  src={site.image} 
                  alt={site.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{site.name}</h3>
                <p className="text-gray-400 mb-4">{site.location}</p>
                <div className="glass rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-400">{site.launches}</div>
                  <div className="text-sm text-gray-400">Total Launches</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NASA APOD Section */}
      <div className="relative py-16 px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-6xl font-bold text-center text-white mb-12"
        >
          NASA Astronomy Pictures
        </motion.h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nasaData && nasaData.length > 0 ? (
            nasaData.slice(0, 6).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                onClick={() => setSelectedNasaImage(item)}
                className="glass-strong rounded-3xl overflow-hidden cursor-pointer"
              >
                {item.media_type === 'image' && item.url ? (
                  <div className="relative h-64 bg-gray-800">
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl">🌌</div>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-64 bg-gray-800">
                    <img 
                      src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80"
                      alt="Space"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title || 'Space Image'}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3">{item.explanation || 'Exploring the cosmos'}</p>
                  <p className="text-green-400 text-xs mt-3">{item.date || 'Recent'}</p>
                </div>
              </motion.div>
            ))
          ) : (
            // Fallback images with real space photos
            [
              { img: 'https://media.istockphoto.com/id/1198684732/photo/stars-and-galaxy-space-sky-night-background.jpg?s=612x612&w=0&k=20&c=U6AnXKYJpi9H2tCeGGXSAS_ctR4pgsC-yC07J5ECH5M=', title: 'Distant Galaxy', desc: 'Billions of stars in a spiral formation' },
              { img: 'https://static.vecteezy.com/system/resources/thumbnails/052/876/689/small_2x/animated-saturn-grandeur-stunning-cosmic-show-saturn-in-all-its-glory-adorned-with-its-iconic-rings-and-bathed-in-the-warm-glow-of-distant-stars-video.jpg', title: 'Saturn Rings', desc: 'Majestic rings of ice and rock' },
              { img: 'https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2010/04/STScI-01EVVDDZ349N8H64SMV94VAQ39.tif/jcr:content/renditions/4003x2719.jpg', title: 'Nebula Formation', desc: 'Stellar nursery creating new stars' },
              { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaWbnxZO_RVkL2AP9JcZbLIrsMiWHjGQs_FA&s', title: 'Rocket Launch', desc: 'Powerful engines lifting off' },
              { img: 'https://media.istockphoto.com/id/1362967310/photo/international-space-station-in-2022-in-outer-space-iss-floating-on-orbit-of-earth-planet.jpg?s=612x612&w=0&k=20&c=Wy037AZCO62R_9Hf6ZLWcKXi_tqjIsCfkh2BubvP8Cw=', title: 'Space Station', desc: 'Orbiting laboratory in space' },
              { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA9HywuBlKK9336dfeRRjvgIUC7JE_Lm8i_A&s', title: 'Comet Trail', desc: 'Icy visitor from deep space' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                onClick={() => setSelectedNasaImage({
                  title: item.title,
                  explanation: item.desc,
                  url: item.img,
                  date: new Date().toISOString().split('T')[0],
                  media_type: 'image'
                })}
                className="glass-strong rounded-3xl overflow-hidden cursor-pointer"
              >
                <div className="h-64 bg-gray-800">
                  <img 
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                  <p className="text-green-400 text-xs mt-3">Click for details</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Mission Detail Modal */}
      <AnimatePresence>
        {selectedMission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMission(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-6 md:p-8 max-w-4xl w-full border-2 border-red-500 my-8 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMission(null);
                }}
                className="sticky top-2 right-2 float-right text-white hover:text-red-400 text-4xl font-bold z-20 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ×
              </button>
              
              {/* Mission Image */}
              <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-6 clear-both">
                <img 
                  src={selectedMission.image} 
                  alt={selectedMission.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{selectedMission.name}</h2>
                  <div className="flex gap-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      selectedMission.status === 'Active' ? 'bg-green-900 text-green-300' :
                      selectedMission.status === 'Completed' ? 'bg-blue-900 text-blue-300' :
                      'bg-yellow-900 text-yellow-300'
                    }`}>
                      {selectedMission.status}
                    </span>
                    <span className="glass px-4 py-2 rounded-full text-sm text-gray-300">
                      {selectedMission.agency}
                    </span>
                    <span className="glass px-4 py-2 rounded-full text-sm text-gray-300">
                      {selectedMission.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-red-400 mb-3">Mission Overview</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedMission.fullDetails}</p>
                </div>
                
                {selectedMission.leadership && (
                  <div className="glass rounded-xl p-4">
                    <h3 className="text-xl font-bold text-red-400 mb-2">Mission Leadership</h3>
                    <p className="text-gray-300">{selectedMission.leadership}</p>
                  </div>
                )}
                
                {selectedMission.crew && (
                  <div className="glass rounded-xl p-4">
                    <h3 className="text-xl font-bold text-red-400 mb-2">Crew/Payload</h3>
                    <p className="text-gray-300">{selectedMission.crew}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-2xl font-bold text-red-400 mb-3">Key Objectives</h3>
                  <ul className="space-y-2">
                    {selectedMission.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-red-400 font-bold mt-1">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-red-400 mb-4">Mission Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedMission.stats).map(([key, value], i) => (
                      <div key={i} className="glass rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-red-400 mb-1">{value}</div>
                        <div className="text-xs text-gray-400 uppercase">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedMission.outcome && (
                  <div className="glass-strong rounded-xl p-6 border-2 border-green-500">
                    <h3 className="text-2xl font-bold text-green-400 mb-3">Mission Outcome</h3>
                    <p className="text-gray-300 text-lg">{selectedMission.outcome}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Launch Site Detail Modal */}
      <AnimatePresence>
        {selectedSite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSite(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-6 md:p-8 max-w-4xl w-full border-2 border-green-500 my-8 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSite(null);
                }}
                className="sticky top-2 right-2 float-right text-white hover:text-red-400 text-4xl font-bold z-20 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ×
              </button>
              
              <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-6 clear-both">
                <img 
                  src={selectedSite.image} 
                  alt={selectedSite.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{selectedSite.name}</h2>
                  <p className="text-green-400 text-lg">{selectedSite.location}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">{selectedSite.details}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">{selectedSite.established}</div>
                    <div className="text-xs text-gray-400 uppercase">Established</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">{selectedSite.area}</div>
                    <div className="text-xs text-gray-400 uppercase">Total Area</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">{selectedSite.launches}</div>
                    <div className="text-xs text-gray-400 uppercase">Total Launches</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">Notable Missions</h3>
                  <p className="text-gray-300">{selectedSite.notable}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* NASA Image Detail Modal */}
      <AnimatePresence>
        {selectedNasaImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNasaImage(null)}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNasaImage(null);
                }}
                className="sticky top-2 right-2 float-right text-white hover:text-red-400 text-4xl font-bold z-20 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ×
              </button>
              
              {/* Large Image */}
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-6 clear-both">
                {selectedNasaImage.media_type === 'image' && selectedNasaImage.url ? (
                  <img 
                    src={selectedNasaImage.hdurl || selectedNasaImage.url} 
                    alt={selectedNasaImage.title}
                    className="w-full h-full object-contain bg-black"
                  />
                ) : selectedNasaImage.media_type === 'video' ? (
                  <iframe
                    src={selectedNasaImage.url}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900">
                    <img 
                      src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80"
                      alt="Space"
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 md:p-6">
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{selectedNasaImage.title}</h2>
                  <div className="flex gap-3 flex-wrap">
                    <span className="glass px-4 py-2 rounded-full text-sm text-purple-300">
                      {selectedNasaImage.date}
                    </span>
                    {selectedNasaImage.copyright && (
                      <span className="glass px-4 py-2 rounded-full text-sm text-purple-300">
                        © {selectedNasaImage.copyright}
                      </span>
                    )}
                    <span className="glass px-4 py-2 rounded-full text-sm text-purple-300">
                      NASA APOD
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-purple-400 mb-3">Description</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedNasaImage.explanation}</p>
                </div>
                
                {selectedNasaImage.hdurl && (
                  <div className="flex gap-4">
                    <a
                      href={selectedNasaImage.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 glass-strong hover:bg-purple-900/30 text-center py-3 rounded-xl text-purple-300 font-bold transition"
                    >
                      View HD Image
                    </a>
                    <a
                      href={selectedNasaImage.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 glass-strong hover:bg-purple-900/30 text-center py-3 rounded-xl text-purple-300 font-bold transition"
                    >
                      Original Source
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernMissionControl;
