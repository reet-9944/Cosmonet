import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { motion, AnimatePresence } from 'framer-motion';

const SolarSystemSimulation = ({ onClose }) => {
  const mountRef = useRef(null);
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
  const [tourStarted, setTourStarted] = useState(false);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const planetsRef = useRef([]);

  const planetsData = [
    { name: "Mercury", distance: 15, size: 2.0, speed: 0.015, color: 0xaaaaaa, texture: 'https://tse4.mm.bing.net/th/id/OIP.m3w_E0fDCXaMH7wJTYX4NQHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', info: "Smallest planet, closest to the Sun", temp: "167°C", diameter: "4,879 km" },
    { name: "Venus", distance: 24, size: 3.0, speed: 0.01, color: 0xffdd88, texture: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Cylindrical_Map_of_Venus.jpg', info: "Hottest planet with thick atmosphere", temp: "464°C", diameter: "12,104 km" },
    { name: "Earth", distance: 35, size: 3.5, speed: 0.005, color: 0x4488ff, texture: 'https://th.bing.com/th/id/R.9a5157fba87c60fa38e6ae3a4daa111b?rik=HsJ471UsIGJJSA&riu=http%3a%2f%2feoimages.gsfc.nasa.gov%2fimages%2fimagerecords%2f79000%2f79765%2fdnb_land_ocean_ice.2012.3600x1800.jpg&ehk=0tDHrlMn0XvT4cjKr90cnzDpaY2DttmXRvfE17a3B%2f8%3d&risl=&pid=ImgRaw&r=0', info: "Our home, the only planet with life", temp: "15°C", diameter: "12,742 km" },
    { name: "Asteroid Belt", distance: 42, size: 0, speed: 0.0045, color: 0x888888, info: "Millions of rocky asteroids between Mars and Jupiter", temp: "-73°C", diameter: "Various sizes" },
    { name: "Mars", distance: 50, size: 2.5, speed: 0.004, color: 0xff8866, texture: 'https://tse2.mm.bing.net/th/id/OIP.Jjl6f_9tEx67dioA1vNb9AHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', info: "The Red Planet with largest volcano", temp: "-65°C", diameter: "6,779 km" },
    { name: "Jupiter", distance: 80, size: 7.0, speed: 0.001, color: 0xffaa66, texture: 'https://th.bing.com/th/id/R.f69754cbb9d0129d83e3a6b0a2a91df3?rik=qpDLSCrVCqKWaw&riu=http%3a%2f%2fplanetpixelemporium.com%2fdownload%2fdownload.php%3fjupitermap.jpg&ehk=XMJr3PxUI%2bt0a2AeVuzz%2fqjW6g4%2bstdAGGIaiMSdYos%3d&risl=&pid=ImgRaw&r=0', info: "Largest planet with Great Red Spot", temp: "-110°C", diameter: "139,820 km" },
    { name: "Saturn", distance: 110, size: 6.0, speed: 0.0008, color: 0xffdd99, texture: 'https://tse4.mm.bing.net/th/id/OIP.BSSL0H1Gqab_JCCLC_E-6gHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', info: "Famous for its beautiful ring system", temp: "-140°C", diameter: "116,460 km" },
    { name: "Uranus", distance: 140, size: 4.5, speed: 0.0006, color: 0x88ddff, texture: 'https://tse3.mm.bing.net/th/id/OIP.DPKRTvAMzBHfrNSiixfR8QHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', info: "Ice giant that rotates on its side", temp: "-195°C", diameter: "50,724 km" },
    { name: "Neptune", distance: 170, size: 4.3, speed: 0.0005, color: 0x4466ff, texture: 'https://tse2.mm.bing.net/th/id/OIP.Mb8o1tZm3IOFmk-4kMPBSQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', info: "Windiest planet in solar system", temp: "-200°C", diameter: "49,244 km" },
    { name: "Pluto", distance: 200, size: 1.8, speed: 0.0004, color: 0xccaa88, texture: 'https://tse2.mm.bing.net/th/id/OIP.66RNO_4-XKcyktl85gzdEgHaDs?rs=1&pid=ImgDetMain&o=7&rm=3', info: "Dwarf planet with heart-shaped glacier", temp: "-225°C", diameter: "2,377 km" },
    { name: "Halley's Comet", distance: 230, size: 2.5, speed: 0.0003, color: 0x88ccff, texture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5b8c2f46-9c59-4db1-ad6e-01745544238e/dfhw941-9e08fb4c-8ccb-43f5-9139-2a75d61219f3.jpg/v1/fill/w_1280,h_1280,q_75,strp/halley_s_comet__by_ghostygrm_dfhw941-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzViOGMyZjQ2LTljNTktNGRiMS1hZDZlLTAxNzQ1NTQ0MjM4ZVwvZGZodzk0MS05ZTA4ZmI0Yy04Y2NiLTQzZjUtOTEzOS0yYTc1ZDYxMjE5ZjMuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.j2obiszTJSOF_0k79rWCABUY8RLgVhDn9Qd83h6y4nQ', info: "Famous comet with glowing tail of ice and dust", temp: "-270°C", diameter: "15 km nucleus" },
    { name: "Kuiper Belt", distance: 260, size: 0, speed: 0.0002, color: 0x6688aa, info: "Icy region beyond Neptune with dwarf planets", temp: "-240°C", diameter: "Vast region" },
    { name: "Andromeda Galaxy", distance: 320, size: 18.0, speed: 0.00015, color: 0xff88ff, texture: 'https://tse3.mm.bing.net/th/id/OIP.efJaLDCjqH2tblV8H8z6tgHaEK?w=1600&h=900&rs=1&pid=ImgDetMain&o=7&rm=3', info: "Nearest major galaxy, 2.5 million light-years away", temp: "N/A", diameter: "220,000 light-years" },
    { name: "Black Hole", distance: 380, size: 10.0, speed: 0.0001, color: 0x000000, info: "Supermassive black hole warping spacetime", temp: "N/A", diameter: "Event Horizon" },
    { name: "Quasar", distance: 450, size: 12.0, speed: 0.00008, color: 0x00ffff, texture: 'https://media.sketchfab.com/models/fa4809f46c534503bfe2d354fa8ec8ec/thumbnails/72730fcb460c4263bde2a0e82dfb3161/feca5a671ae94d2080e47c88e2616bd5.jpeg', info: "Extremely bright galactic core powered by black hole", temp: "Billions °C", diameter: "Light-years across" }
  ];

  // Auto-start tour and auto-advance through planets
  useEffect(() => {
    setTourStarted(true);
    
    const interval = setInterval(() => {
      setCurrentPlanetIndex((prev) => {
        const newIndex = prev < planetsData.length - 1 ? prev + 1 : 0;
        if (window.updatePlanetIndex) {
          window.updatePlanetIndex(newIndex);
        }
        return newIndex;
      });
    }, 3000); // 3 seconds per object

    return () => clearInterval(interval);
  }, []);

  // Update animation when planet changes
  useEffect(() => {
    if (window.updatePlanetIndex) {
      window.updatePlanetIndex(currentPlanetIndex);
    }
  }, [currentPlanetIndex]);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(20, 10, 40);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 300;
    controlsRef.current = controls;

    // Lighting
    const sunLight = new THREE.PointLight(0xffffff, 2.0, 0);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const loader = new THREE.TextureLoader();

    // The Sun
    const sunGeo = new THREE.SphereGeometry(8, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({
      map: loader.load('https://upload.wikimedia.org/wikipedia/commons/9/99/Map_of_the_full_sun.jpg'),
      color: 0xffddaa
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Create orbit ring helper
    const createOrbitRing = (radius) => {
      const shape = new THREE.Shape();
      shape.absarc(0, 0, radius, 0, Math.PI * 2);
      const geo = new THREE.BufferGeometry().setFromPoints(shape.getSpacedPoints(128));
      const mat = new THREE.LineBasicMaterial({ color: 0x4444ff, transparent: true, opacity: 0.2 });
      const orbit = new THREE.LineLoop(geo, mat);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);
    };

    // Create all planets and cosmic objects
    const planets = [];
    planetsData.forEach((planetData, index) => {
      createOrbitRing(planetData.distance);
      
      const orbitSys = new THREE.Object3D();
      scene.add(orbitSys);
      
      let mesh;
      
      // Asteroid Belt
      if (planetData.name === "Asteroid Belt") {
        const asteroidGroup = new THREE.Group();
        for (let i = 0; i < 250; i++) {
          const size = Math.random() * 0.3 + 0.1;
          const asteroidGeo = new THREE.SphereGeometry(size, 8, 8);
          const asteroidMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.9 });
          const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
          const angle = Math.random() * Math.PI * 2;
          const dist = planetData.distance + (Math.random() - 0.5) * 8;
          asteroid.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * 2, Math.sin(angle) * dist);
          asteroidGroup.add(asteroid);
        }
        orbitSys.add(asteroidGroup);
        mesh = asteroidGroup;
      }
      // Kuiper Belt
      else if (planetData.name === "Kuiper Belt") {
        const kuiperGroup = new THREE.Group();
        const kuiperTexture = planetData.texture ? loader.load(planetData.texture) : null;
        for (let i = 0; i < 300; i++) {
          const size = Math.random() * 0.4 + 0.15;
          const kuiperGeo = new THREE.SphereGeometry(size, 8, 8);
          const kuiperMat = new THREE.MeshStandardMaterial({ 
            map: kuiperTexture,
            color: 0x6688aa, 
            roughness: 0.8 
          });
          const kuiperObj = new THREE.Mesh(kuiperGeo, kuiperMat);
          const angle = Math.random() * Math.PI * 2;
          const dist = planetData.distance + (Math.random() - 0.5) * 15;
          kuiperObj.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * 3, Math.sin(angle) * dist);
          kuiperGroup.add(kuiperObj);
        }
        orbitSys.add(kuiperGroup);
        mesh = kuiperGroup;
      }
      // Halley's Comet
      else if (planetData.name === "Halley's Comet") {
        const cometGeo = new THREE.SphereGeometry(planetData.size, 32, 32);
        const cometMat = new THREE.MeshStandardMaterial({ 
          map: planetData.texture ? loader.load(planetData.texture) : null,
          color: 0x88ccff, 
          emissive: 0x4488ff,
          emissiveIntensity: 0.4
        });
        mesh = new THREE.Mesh(cometGeo, cometMat);
        
        // Comet tail
        const tailGeo = new THREE.ConeGeometry(planetData.size * 2, planetData.size * 8, 16);
        const tailMat = new THREE.MeshBasicMaterial({
          color: 0x88ccff,
          transparent: true,
          opacity: 0.3
        });
        const tail = new THREE.Mesh(tailGeo, tailMat);
        tail.rotation.x = Math.PI / 2;
        tail.position.z = -planetData.size * 4;
        mesh.add(tail);
        
        mesh.position.x = planetData.distance;
        orbitSys.add(mesh);
      }
      // Black Hole
      else if (planetData.name === "Black Hole") {
        const blackHoleGeo = new THREE.SphereGeometry(planetData.size, 64, 64);
        const blackHoleMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        mesh = new THREE.Mesh(blackHoleGeo, blackHoleMat);
        
        // Accretion disk
        const diskGeo = new THREE.RingGeometry(planetData.size * 1.5, planetData.size * 3.5, 64);
        const diskMat = new THREE.MeshBasicMaterial({
          color: 0xff6600,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7
        });
        const disk = new THREE.Mesh(diskGeo, diskMat);
        disk.rotation.x = Math.PI / 2;
        mesh.add(disk);
        
        mesh.position.x = planetData.distance;
        orbitSys.add(mesh);
      }
      // Andromeda Galaxy
      else if (planetData.name === "Andromeda Galaxy") {
        const galaxyGeo = new THREE.SphereGeometry(planetData.size, 64, 64);
        const galaxyMat = new THREE.MeshStandardMaterial({
          map: loader.load(planetData.texture),
          emissive: 0xff88ff,
          emissiveIntensity: 0.4,
          transparent: true,
          opacity: 0.9
        });
        mesh = new THREE.Mesh(galaxyGeo, galaxyMat);
        mesh.position.x = planetData.distance;
        orbitSys.add(mesh);
      }
      // Quasar
      else if (planetData.name === "Quasar") {
        const quasarGeo = new THREE.SphereGeometry(planetData.size, 64, 64);
        const quasarMat = new THREE.MeshBasicMaterial({
          map: planetData.texture ? loader.load(planetData.texture) : null,
          color: 0x00ffff,
          emissive: 0x00ffff,
          emissiveIntensity: 1.0
        });
        mesh = new THREE.Mesh(quasarGeo, quasarMat);
        
        // Quasar jets
        const jetGeo = new THREE.CylinderGeometry(0.5, 0.5, planetData.size * 4, 16);
        const jetMat = new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.5
        });
        const jet1 = new THREE.Mesh(jetGeo, jetMat);
        jet1.position.y = planetData.size * 2;
        mesh.add(jet1);
        
        const jet2 = new THREE.Mesh(jetGeo, jetMat);
        jet2.position.y = -planetData.size * 2;
        mesh.add(jet2);
        
        mesh.position.x = planetData.distance;
        orbitSys.add(mesh);
      }
      // Regular planets
      else {
        const geo = new THREE.SphereGeometry(planetData.size, 64, 64);
        const mat = new THREE.MeshStandardMaterial({
          map: loader.load(planetData.texture),
          color: planetData.color,
          roughness: 0.6,
          metalness: 0.0
        });
        mesh = new THREE.Mesh(geo, mat);
        mesh.position.x = planetData.distance;
        orbitSys.add(mesh);
        
        // Add Saturn's rings
        if (planetData.name === "Saturn") {
          const ringGeo = new THREE.RingGeometry(planetData.size * 1.5, planetData.size * 2.5, 64);
          const ringMat = new THREE.MeshStandardMaterial({
            color: 0xaa9977,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.x = Math.PI / 2.2;
          mesh.add(ringMesh);
        }
      }
      
      planets.push({ orbitSys, mesh, data: planetData });
    });
    planetsRef.current = planets;

    // Enhanced Multi-Layer Starfield for Universe Feel
    const createStarLayer = (count, minDist, maxDist, size, color, opacity) => {
      const geo = new THREE.BufferGeometry();
      const posArray = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = minDist + Math.random() * (maxDist - minDist);
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i * 3 + 2] = r * Math.cos(phi);
      }
      geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const mat = new THREE.PointsMaterial({ size, color, transparent: true, opacity });
      return new THREE.Points(geo, mat);
    };

    // Create multiple star layers with different colors and depths
    const nearStars = createStarLayer(4000, 500, 800, 0.4, 0xffffff, 1.0);
    const midStars = createStarLayer(6000, 800, 1200, 0.25, 0xaaccff, 0.85);
    const farStars = createStarLayer(8000, 1200, 1800, 0.15, 0xffccaa, 0.7);
    const distantStars = createStarLayer(12000, 1800, 2500, 0.08, 0xccccff, 0.5);
    
    scene.add(nearStars);
    scene.add(midStars);
    scene.add(farStars);
    scene.add(distantStars);

    // Add colorful nebula clouds for cosmic atmosphere
    const createNebula = (x, y, z, size, color) => {
      const nebulaGeo = new THREE.SphereGeometry(size, 32, 32);
      const nebulaMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide
      });
      const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
      nebula.position.set(x, y, z);
      return nebula;
    };

    const nebula1 = createNebula(600, 250, -400, 80, 0x8844ff);
    const nebula2 = createNebula(-500, -200, 500, 100, 0xff4488);
    const nebula3 = createNebula(300, 400, 300, 90, 0x44ff88);
    const nebula4 = createNebula(-700, 100, -200, 70, 0xffaa44);
    
    scene.add(nebula1);
    scene.add(nebula2);
    scene.add(nebula3);
    scene.add(nebula4);

    // Animation loop
    let animationId;
    let cameraAngle = 0;
    let currentIndex = 0;
    
    // Update current index from state
    const updateIndex = (index) => {
      currentIndex = index;
    };
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      sun.rotation.y += 0.001;
      
      planets.forEach((planet, index) => {
        // Slow down the focused planet
        const speedMultiplier = index === currentIndex ? 0.3 : 1;
        planet.orbitSys.rotation.y += planet.data.speed * speedMultiplier;
        planet.mesh.rotation.y += 0.01;
      });
      
      // Make camera revolve around the focused planet
      if (planetsRef.current[currentIndex]) {
        const focusedPlanet = planetsRef.current[currentIndex];
        const planetWorldPos = new THREE.Vector3();
        focusedPlanet.mesh.getWorldPosition(planetWorldPos);
        
        // Camera revolves around planet
        cameraAngle += 0.005;
        const distance = focusedPlanet.data.size * 4;
        const camX = planetWorldPos.x + Math.cos(cameraAngle) * distance;
        const camZ = planetWorldPos.z + Math.sin(cameraAngle) * distance;
        const camY = planetWorldPos.y + distance * 0.3;
        
        camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.05);
        controls.target.lerp(planetWorldPos, 0.05);
      }
      
      // Animate star layers at different speeds for depth effect
      nearStars.rotation.y -= 0.0002;
      midStars.rotation.y -= 0.00012;
      farStars.rotation.y -= 0.00006;
      distantStars.rotation.y -= 0.00003;
      
      // Animate nebulae
      nebula1.rotation.y += 0.0003;
      nebula2.rotation.y -= 0.0004;
      nebula3.rotation.x += 0.0002;
      nebula4.rotation.z += 0.0003;
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Store update function
    window.updatePlanetIndex = updateIndex;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container && container.firstChild) {
        container.removeChild(container.firstChild);
      }
      renderer.dispose();
    };
  }, []);



  const currentPlanet = planetsData[currentPlanetIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-10">
        <button 
          onClick={onClose}
          className="px-6 py-3 bg-blue-600/80 backdrop-blur-md rounded-full text-white font-bold hover:bg-blue-500 transition-all duration-300 hover:scale-105"
        >
          Back to Home
        </button>
        <div className="text-blue-400 tracking-[0.3em] text-sm font-bold">
          3D SOLAR SYSTEM TOUR
        </div>
      </div>



      {/* Planet Info Card */}
      <AnimatePresence>
        {tourStarted && currentPlanet && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-10"
          >
            <div className="backdrop-blur-2xl bg-white/10 border-2 border-white/20 rounded-3xl p-6 w-80 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-2">{currentPlanet.name}</h2>
              <p className="text-cyan-400 text-sm mb-4">{currentPlanet.info}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Temperature:</span>
                  <span className="text-white font-bold">{currentPlanet.temp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Diameter:</span>
                  <span className="text-white font-bold">{currentPlanet.diameter}</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">
                  Planet {currentPlanetIndex + 1} of {planetsData.length}
                </div>
                <div className="flex gap-1 justify-center">
                  {planetsData.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentPlanetIndex 
                          ? 'w-8 bg-cyan-400' 
                          : 'w-2 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SolarSystemSimulation;
