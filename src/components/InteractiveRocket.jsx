import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, MeshReflectorMaterial, Stars as DreiStars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Stars Component - Optimized
const Stars = () => {
  return <DreiStars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />;
};

// Animated Fire Effect
const FireEffect = () => {
  const fireRef = useRef();
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (fireRef.current) {
      fireRef.current.position.y = Math.sin(state.clock.elapsedTime * 5) * 0.2 - 4;
      fireRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      fireRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group>
      {/* Main flame cone */}
      <mesh ref={fireRef} position={[0, -4, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1.3, 2.5, 32]} />
        <meshStandardMaterial 
          color="#ff4500"
          emissive="#ff6b00"
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner bright flame */}
      <mesh position={[0, -4, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.8, 1.8, 32]} />
        <meshStandardMaterial 
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Particle effects - Reduced for performance */}
      <group ref={particlesRef}>
        {[...Array(8)].map((_, i) => (
          <mesh 
            key={i}
            position={[
              Math.sin(i * 0.8) * 0.5,
              -4.5 - i * 0.15,
              Math.cos(i * 0.8) * 0.5
            ]}
          >
            <sphereGeometry args={[0.12, 6, 6]} />
            <meshStandardMaterial 
              color="#ff8c00"
              emissive="#ff8c00"
              emissiveIntensity={2}
            />
          </mesh>
        ))}
      </group>
      
      {/* Point lights for glow effect */}
      <pointLight position={[0, -4, 0]} intensity={2} color="#ff6b00" distance={10} />
      <pointLight position={[0, -5, 0]} intensity={1.5} color="#ffff00" distance={8} />
    </group>
  );
};

// Rocket Part Component
const RocketPart = ({ position, args, color, name, info, onHover, onClick, isHovered, geometry = 'cylinder' }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (isHovered && meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 5) * 0.05);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(name, info);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        onHover(null, null);
        document.body.style.cursor = 'default';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(name, info);
      }}
      castShadow
      receiveShadow
    >
      {geometry === 'cone' ? (
        <coneGeometry args={args} />
      ) : (
        <cylinderGeometry args={args} />
      )}
      <meshStandardMaterial 
        color={isHovered ? '#22c55e' : color}
        metalness={0.9}
        roughness={0.1}
        emissive={isHovered ? '#22c55e' : color}
        emissiveIntensity={isHovered ? 0.5 : 0.1}
      />
      
      {/* Highlight ring when hovered */}
      {isHovered && (
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[args[0] * 1.1, 0.05, 16, 100]} />
          <meshStandardMaterial 
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={1}
          />
        </mesh>
      )}
    </mesh>
  );
};

// Main Rocket 3D Model
const Rocket3D = ({ onPartHover, onPartClick, hoveredPart }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const rocketParts = [
    {
      name: 'Nose Cone',
      position: [0, 5, 0],
      args: [0, 0.7, 2, 32],
      color: '#c0c0c0',
      geometry: 'cone',
      info: 'Sharp aerodynamic nose cone made of titanium alloy. Designed to pierce through atmosphere at hypersonic speeds up to Mach 5. Heat-resistant up to 3000°F.'
    },
    {
      name: 'Guidance System',
      position: [0, 3.5, 0],
      args: [0.7, 0.7, 1.2, 32],
      color: '#1e3a8a',
      info: 'Advanced inertial navigation system with GPS guidance. Contains gyroscopes, accelerometers, and flight computer for precision targeting.'
    },
    {
      name: 'Warhead Section',
      position: [0, 2.2, 0],
      args: [0.75, 0.75, 1.5, 32],
      color: '#374151',
      info: 'Payload compartment. In space missions, this houses satellites or scientific instruments. Reinforced titanium casing with thermal protection.'
    },
    {
      name: 'Fuel Tank',
      position: [0, 0.5, 0],
      args: [0.8, 0.8, 2.5, 32],
      color: '#6b7280',
      info: 'Main fuel tank containing RP-1 kerosene and liquid oxygen. Capacity: 50,000 liters. Pressurized to 350 PSI with cryogenic insulation at -183°C.'
    },
    {
      name: 'Engine Section',
      position: [0, -1.5, 0],
      args: [0.85, 0.7, 1.2, 32],
      color: '#1f2937',
      info: 'Solid rocket motor with thrust vectoring nozzle. Generates 500,000 lbf of thrust. Gimbal range: ±8 degrees for flight control.'
    },
    {
      name: 'Tail Section',
      position: [0, -2.8, 0],
      args: [0.6, 0.85, 1, 32],
      color: '#4b5563',
      info: 'Stabilizer section with aerodynamic fins. Houses telemetry equipment and self-destruct mechanism for safety.'
    }
  ];

  return (
    <group ref={groupRef}>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight 
        position={[0, 15, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1.5} 
        castShadow 
        color="#ffffff"
      />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[10, 5, 10]} intensity={0.5} color="#ef4444" />
      
      {/* Rocket Parts */}
      {rocketParts.map((part, index) => (
        <RocketPart
          key={index}
          {...part}
          onHover={onPartHover}
          onClick={onPartClick}
          isHovered={hoveredPart === part.name}
        />
      ))}
      
      {/* Fire Effect */}
      <FireEffect />
      
      {/* Tail Fins - 4 large fins like a missile */}
      {[0, 90, 180, 270].map((angle, i) => (
        <group key={`fin-${i}`} rotation={[0, (angle * Math.PI) / 180, 0]}>
          <mesh position={[0, -3.5, 1.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <boxGeometry args={[0.05, 1.5, 1.2]} />
            <meshStandardMaterial 
              color="#2d3748" 
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          {/* Fin tip */}
          <mesh position={[0, -3.5, 1.8]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.025, 0.3, 3]} />
            <meshStandardMaterial color="#1a202c" metalness={0.9} />
          </mesh>
        </group>
      ))}
      
      {/* Control Surfaces - Small canards near nose */}
      {[45, 135, 225, 315].map((angle, i) => (
        <group key={`canard-${i}`} rotation={[0, (angle * Math.PI) / 180, 0]}>
          <mesh position={[0, 3, 0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <boxGeometry args={[0.03, 0.8, 0.6]} />
            <meshStandardMaterial 
              color="#1e3a8a" 
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}
      
      {/* Stripes/Markings */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.76, 0.76, 0.3, 32]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.81, 0.81, 0.2, 32]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.7} />
      </mesh>
    </group>
  );
};

const InteractiveRocket = ({ onPartSelect }) => {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const handlePartHover = (name, info) => {
    setHoveredPart(name);
    setHoveredInfo(info);
  };

  const handlePartClick = (name, info) => {
    setSelectedPart(name);
    setSelectedInfo(info);
    if (onPartSelect) onPartSelect(name, info);
  };

  return (
    <div className="relative w-full h-screen bg-black pointer-events-none">
      <Canvas shadows camera={{ position: [6, 3, 8], fov: 50 }} className="pointer-events-auto">
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 50]} />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />
        
        <Environment preset="night" />
        
        <Rocket3D 
          onPartHover={handlePartHover}
          onPartClick={handlePartClick}
          hoveredPart={hoveredPart}
        />
        
        {/* Ground plane with reflection */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
        
        {/* Stars in background */}
        <Stars />
      </Canvas>

      {/* Hover Info Box */}
      <AnimatePresence>
        {hoveredPart && !selectedPart && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-1/2 left-8 transform -translate-y-1/2 glass-strong rounded-2xl p-6 max-w-sm pointer-events-none z-20"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-2">{hoveredPart}</h3>
            <p className="text-gray-300 text-sm">{hoveredInfo}</p>
            <p className="text-green-500 text-xs mt-3">Click to lock info</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Info Box */}
      <AnimatePresence>
        {selectedPart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 right-8 transform -translate-y-1/2 glass-strong rounded-2xl p-8 max-w-md border-2 border-green-500 pointer-events-auto z-20"
          >
            <button
              onClick={() => {
                setSelectedPart(null);
                setSelectedInfo(null);
              }}
              className="absolute top-4 right-4 text-white hover:text-red-400 text-2xl pointer-events-auto"
            >
              ×
            </button>
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-3xl font-bold text-green-400 mb-3">{selectedPart}</h3>
            <p className="text-gray-300 leading-relaxed">{selectedInfo}</p>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 font-bold">Operational</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Temperature:</span>
                <span className="text-blue-400 font-bold">-180°C</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Pressure:</span>
                <span className="text-yellow-400 font-bold">350 PSI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass rounded-full px-6 py-3 pointer-events-none z-10"
      >
        <p className="text-white text-sm">
          🖱️ Drag to rotate • 🔍 Scroll to zoom • 👆 Hover & Click parts for info
        </p>
      </motion.div>
    </div>
  );
};

export default InteractiveRocket;
