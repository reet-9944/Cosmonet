"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ScrollHome from './components/ScrollHome';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ModernTeacherToolkit from './components/ModernTeacherToolkit';
import ModernMissionControl from './components/ModernMissionControl';
import ModernScientistLab from './components/ModernScientistLab';
import ModernExploreCosmos from './components/ModernExploreCosmos';
import SpaceAI from './components/SpaceAI';
import HelpCenter from './components/HelpCenter';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedFeature from './components/ProtectedFeature';
import { useAuth } from './contexts/AuthContext';

// --- 1. AI Component ---
const CosmonautAI = ({ isOpen, onClose, gender }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const spaceKnowledge = {
    planets: "Our solar system has 8 planets! Mercury is the smallest and closest to the Sun, while Neptune is the farthest. Each planet has unique characteristics - like Jupiter's Great Red Spot or Saturn's beautiful rings! 🪐",
    stars: "Stars are massive balls of burning gas! Our Sun is a medium-sized star. The largest stars can be 1,000 times bigger than the Sun! Stars are born in nebulae and eventually die, sometimes exploding as supernovas. ⭐",
    blackhole: "Black holes are regions where gravity is so strong that nothing, not even light, can escape! They form when massive stars collapse. The closest black hole to Earth is about 1,000 light-years away. 🕳️",
    galaxy: "A galaxy is a huge collection of stars, gas, and dust held together by gravity. Our Milky Way galaxy contains over 200 billion stars! The nearest major galaxy is Andromeda, 2.5 million light-years away. 🌌",
    moon: "The Moon is Earth's only natural satellite! It's about 384,400 km away and takes 27.3 days to orbit Earth. The same side always faces us due to tidal locking. Humans first landed on the Moon in 1969! 🌙",
    mars: "Mars is called the Red Planet because of iron oxide (rust) on its surface! It has the largest volcano in the solar system (Olympus Mons) and evidence of ancient water. NASA is planning human missions to Mars! 🔴",
    comet: "Comets are icy bodies that release gas and dust, forming beautiful tails when near the Sun! Halley's Comet visits Earth every 75-76 years. They're like cosmic snowballs traveling through space! ☄️",
    asteroid: "Asteroids are rocky objects orbiting the Sun, mostly found in the asteroid belt between Mars and Jupiter. Some are as small as pebbles, others as large as mountains! 🪨",
    universe: "The universe is everything that exists - all matter, energy, space, and time! It's about 13.8 billion years old and constantly expanding. It contains billions of galaxies, each with billions of stars! 🌠"
  };

  const getAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('planet')) return spaceKnowledge.planets;
    if (input.includes('star')) return spaceKnowledge.stars;
    if (input.includes('black hole') || input.includes('blackhole')) return spaceKnowledge.blackhole;
    if (input.includes('galaxy') || input.includes('galaxies')) return spaceKnowledge.galaxy;
    if (input.includes('moon')) return spaceKnowledge.moon;
    if (input.includes('mars')) return spaceKnowledge.mars;
    if (input.includes('comet')) return spaceKnowledge.comet;
    if (input.includes('asteroid')) return spaceKnowledge.asteroid;
    if (input.includes('universe') || input.includes('cosmos')) return spaceKnowledge.universe;
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) 
      return `Hello! I'm ${aiPersonality[gender].name}, your space guide! 👋 Ask me about planets, stars, black holes, galaxies, or anything space-related!`;
    if (input.includes('help')) 
      return "I can tell you about: planets, stars, black holes, galaxies, the moon, Mars, comets, asteroids, and the universe! Just ask me anything! 🚀";
    
    return `Great question about "${userInput}"! 🌟 While I'm still learning, I know that space is full of amazing mysteries! Try asking me about planets, stars, black holes, galaxies, or comets!`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
        const response = getAIResponse(userInput);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col border-2 border-blue-500 animate-[bounceIn_0.5s_ease-out]">
        <div className="p-4 border-b border-blue-500 flex justify-between items-center bg-black bg-opacity-30">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{aiPersonality[gender].avatar}</span>
            <div>
              <h3 className="text-xl font-bold text-white">{aiPersonality[gender].name}</h3>
              <p className="text-xs text-blue-300">Your Space Guide</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:text-red-400 text-2xl">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && <div className="text-gray-400 animate-pulse">Thinking...</div>}
        </div>
        <div className="p-4 border-t border-blue-500 bg-black bg-opacity-30 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about the universe..." className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-blue-500 focus:outline-none" />
            <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">Send</button>
        </div>
      </div>
    </div>
  );
};

// --- 2. ANOMALY MODAL (For Artifact Cards) ---
const AnomalyModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className={`relative w-full max-w-4xl bg-gray-900 border-2 ${item.color} rounded-3xl overflow-hidden shadow-2xl animate-[fadeIn_0.3s_ease-out]`}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-red-600 transition">✕</button>
        
        <div className="flex flex-col md:flex-row h-[600px]">
          <div className="md:w-1/2 bg-black relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-30 group-hover:opacity-50 transition duration-700 transform group-hover:scale-110">
              {item.icon}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">Visual Simulation</div>
              <div className="text-green-400 font-mono text-sm animate-pulse">Running Analysis...</div>
            </div>
          </div>

          <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <h2 className="text-4xl font-black text-white mb-2 uppercase">{item.title}</h2>
            <div className={`h-1 w-20 ${item.color.replace('border', 'bg')} mb-6`}></div>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {item.desc}
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h4 className="text-blue-400 font-bold text-sm uppercase mb-1">Threat Level</h4>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[85%]"></div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h4 className="text-blue-400 font-bold text-sm uppercase mb-1">Discovery Date</h4>
                <p className="text-white">Classified / Unknown</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Login Component with MongoDB Integration ---
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ strength: '', color: '', suggestions: [] });

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength({ strength: '', color: '', suggestions: [] });
      return;
    }

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    const suggestions = [];
    if (!hasLower) suggestions.push('Add lowercase letters');
    if (!hasUpper) suggestions.push('Add uppercase letters');
    if (!hasNumber) suggestions.push('Add numbers');
    if (!hasSpecial) suggestions.push('Add special characters (!@#$%^&*)');
    if (!isLongEnough) suggestions.push('Use at least 8 characters');

    const score = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;

    if (score <= 2) {
      setPasswordStrength({ strength: 'Weak', color: 'text-red-500', suggestions });
    } else if (score === 3 || score === 4) {
      setPasswordStrength({ strength: 'Medium', color: 'text-yellow-500', suggestions });
    } else {
      setPasswordStrength({ strength: 'Strong', color: 'text-green-500', suggestions: [] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    
    try {
      const result = await onLogin(formData, isSignUp);
      if (result.success) {
        onClose();
        setFormData({ email: '', password: '', name: '', confirmPassword: '' });
        setError('');
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchToSignup = () => {
    setIsSignUp(true);
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    setError(''); // Clear error when switching
    setPasswordStrength({ strength: '', color: '', suggestions: [] });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchToLogin = () => {
    setIsSignUp(false);
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    setError(''); // Clear error when switching
    setPasswordStrength({ strength: '', color: '', suggestions: [] });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Clear error when user types
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (error) setError(''); // Clear error on input
    
    // Check password strength when password changes
    if (field === 'password' && isSignUp) {
      checkPasswordStrength(value);
    }
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay - Blurred Background */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-blue-500/50 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-800/50 backdrop-blur-md border border-blue-500/30 text-white flex items-center justify-center hover:bg-gray-700/70 hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
          aria-label="Close"
        >
          ✕
        </button>

          <div className="relative z-10 p-8">
            {/* Title */}
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
            >
              {isSignUp ? 'Join the Mission' : 'Welcome Back'}
            </motion.h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignUp && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={formData.name}
                    className="w-full p-4 bg-gray-800/50 backdrop-blur-md rounded-xl border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    onChange={e => handleInputChange('name', e.target.value)}
                    required={isSignUp}
                  />
                </motion.div>
              )}
              
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                className="w-full p-4 bg-gray-800/50 backdrop-blur-md rounded-xl border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                onChange={e => handleInputChange('email', e.target.value)}
                required 
              />
              
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password" 
                  value={formData.password}
                  className="w-full p-4 pr-12 bg-gray-800/50 backdrop-blur-md rounded-xl border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  onChange={e => handleInputChange('password', e.target.value)}
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              {/* Password Strength Indicator (only for signup) */}
              {isSignUp && formData.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Password Strength:</span>
                    <span className={`text-sm font-bold ${passwordStrength.color}`}>
                      {passwordStrength.strength}
                    </span>
                  </div>
                  {passwordStrength.suggestions.length > 0 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                      <p className="text-xs text-yellow-300 font-semibold mb-1">💡 Suggestions:</p>
                      <ul className="text-xs text-yellow-200 space-y-1">
                        {passwordStrength.suggestions.map((suggestion, idx) => (
                          <li key={idx}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}

              {isSignUp && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="relative"
                >
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password" 
                    value={formData.confirmPassword}
                    className="w-full p-4 pr-12 bg-gray-800/50 backdrop-blur-md rounded-xl border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    onChange={e => handleInputChange('confirmPassword', e.target.value)}
                    required={isSignUp}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </motion.div>
              )}
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-xl text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.button 
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white p-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/50 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
              </motion.button>
            </form>

            {/* Switch option */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {isSignUp ? 'Already have an account?' : 'New here?'}
                {' '}
                <button
                  onClick={isSignUp ? switchToLogin : switchToSignup}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  {isSignUp ? 'Log In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
        </motion.div>
    </div>
  );
};

// --- 3. CINEMATIC PLANET VIEW  ---
const CinematicPlanetView = ({ planets, onBack }) => {
  if (!planets || planets.length === 0) return <div className="text-white p-10">Loading Planets...</div>;

  const [activeIndex, setActiveIndex] = useState(2); 
  const activeIndexRef = useRef(2); 
  const canvasRef = useRef(null);
  const planetsRef = useRef([]); 
  
  const planetExtras = useMemo(() => ({
    Mercury: { moons: "0", moonSystem: [] },
    Venus: { moons: "0", moonSystem: [] },
    Earth: { moons: "1", moonSystem: [{ name: "The Moon", size: 1.2, dist: 11, speed: 0.01, color: 0xcccccc }] },
    Mars: { moons: "2", moonSystem: [
        { name: "Phobos", size: 0.6, dist: 9, speed: 0.02, color: 0xbf5a38 }, 
        { name: "Deimos", size: 0.4, dist: 12, speed: 0.015, color: 0x8c4a3b }
    ]},
    Jupiter: { moons: "95", moonSystem: [
        { name: "Io", size: 1.0, dist: 13, speed: 0.012, color: 0xe0e0e0 }, 
        { name: "Europa", size: 0.8, dist: 16, speed: 0.009, color: 0xd4a868 }, 
        { name: "Ganymede", size: 0.9, dist: 19, speed: 0.007, color: 0xaaaaaa }
    ]},
    Saturn: { moons: "146", moonSystem: [
        { name: "Titan", size: 1.1, dist: 18, speed: 0.008, color: 0xe8cd92 },
        { name: "Enceladus", size: 0.6, dist: 21, speed: 0.01, color: 0xffffff }
    ]},
    Uranus: { moons: "27", moonSystem: [
        { name: "Titania", size: 0.7, dist: 12, speed: 0.01, color: 0xafd7e6 }, 
        { name: "Oberon", size: 0.5, dist: 15, speed: 0.008, color: 0xffffff }
    ]},
    Neptune: { moons: "14", moonSystem: [{ name: "Triton", size: 0.8, dist: 12, speed: 0.009, color: 0x8fa1ff }] },
    Pluto: { moons: "5", moonSystem: [{ name: "Charon", size: 0.5, dist: 9, speed: 0.005, color: 0x666666 }] }
  }), []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const sidebarPlanets = useMemo(() => [...planets].reverse(), [planets]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02); 

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 30); 

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(10, 10, 20); 
    scene.add(dirLight);

    const createTextSprite = (text) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 128;
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 6;
        ctx.font = "Bold 40px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
        ctx.textAlign = "center";
        ctx.fillText(text, 256, 64);
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: texture, 
            transparent: true,
            depthTest: true, 
            depthWrite: false 
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(10, 2.5, 1); 
        return sprite;
    };

    const loader = new THREE.TextureLoader();
    
    const canvasGlow = document.createElement('canvas');
    canvasGlow.width = 128; canvasGlow.height = 128;
    const contextGlow = canvasGlow.getContext('2d');
    const gradient = contextGlow.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)'); 
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    contextGlow.fillStyle = gradient;
    contextGlow.fillRect(0, 0, 128, 128);
    const glowTexture = new THREE.CanvasTexture(canvasGlow);

    const meshes = [];

    const createMoonMesh = (config) => {
        const geo = new THREE.SphereGeometry(config.size, 32, 32);
        const mat = new THREE.MeshStandardMaterial({ color: config.color, roughness: 0.8 });
        return new THREE.Mesh(geo, mat);
    };

    planets.forEach((data, i) => {
        const group = new THREE.Group();
        
        const geo = new THREE.SphereGeometry(7, 64, 64);
        const tex = loader.load(data.textureUrl);
        const mat = new THREE.MeshStandardMaterial({ 
            map: tex, roughness: 0.5, metalness: 0.1,
            emissive: new THREE.Color(0x000000), emissiveIntensity: 0.1,
        });
        const mesh = new THREE.Mesh(geo, mat);
        group.add(mesh);

        const glowMat = new THREE.SpriteMaterial({ 
            map: glowTexture, color: 0x3b82f6, transparent: true, opacity: 0.6,
            blending: THREE.AdditiveBlending, depthWrite: false
        });
        const glowSprite = new THREE.Sprite(glowMat);
        glowSprite.scale.set(20, 20, 1);
        group.add(glowSprite);

        if (data.name === "Saturn") {
            const ringGeo = new THREE.RingGeometry(9, 14, 64);
            const ringMat = new THREE.MeshStandardMaterial({ 
                color: 0xaa9977, side: THREE.DoubleSide, transparent: true, opacity: 0.8
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringMesh.rotation.x = Math.PI / 2.2; 
            group.add(ringMesh);
        }

        const extra = planetExtras[data.name] || { moonSystem: [] };
        const moonObjects = [];
        
        extra.moonSystem.forEach((config) => {
            const moon = createMoonMesh(config);
            moon.position.set(config.dist, 0, 0);
            const label = createTextSprite(config.name);
            label.position.set(0, 2.5, 0);
            moon.add(label);
            moon.userData = { angle: Math.random() * Math.PI * 2, dist: config.dist, speed: config.speed };
            group.add(moon);
            moonObjects.push(moon);
        });

        const curve = new THREE.EllipseCurve(0, 0, 10, 10, 0, 2 * Math.PI, false, 0);
        const points = curve.getPoints(64);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
        const ring = new THREE.Line(lineGeo, lineMat);
        ring.rotation.x = Math.PI / 2.2;
        group.add(ring);

        group.position.set(0, (i - 2) * 20, -50); 
        scene.add(group);
        
        meshes.push({ group, mesh, ring, glowSprite, moons: moonObjects, index: i, rotSpeed: 0.001 + Math.random() * 0.002 });
    });

    planetsRef.current = meshes;

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const targetIndex = activeIndexRef.current;

      planetsRef.current.forEach((p) => {
          const offset = p.index - targetIndex;
          const isActive = offset === 0;

          p.mesh.rotation.y += p.rotSpeed;
          p.ring.rotation.z -= 0.0005;

          if (p.moons) {
              p.moons.forEach(moon => {
                  moon.visible = isActive; 
                  if (isActive) {
                      moon.userData.angle += moon.userData.speed;
                      moon.position.x = Math.cos(moon.userData.angle) * moon.userData.dist;
                      moon.position.z = Math.sin(moon.userData.angle) * moon.userData.dist;
                      moon.children[0].rotation.copy(camera.rotation);
                      moon.rotation.y += 0.01;
                  }
              });
          }

          let targetY, targetZ, targetOpacity, targetScale, targetEmissive;

          if (offset === 0) {
              targetY = -6; 
              targetZ = 5; 
              targetOpacity = 1; 
              targetScale = 1;
              targetEmissive = new THREE.Color(0x333333);
              p.glowSprite.material.opacity = THREE.MathUtils.lerp(p.glowSprite.material.opacity, 0.5, 0.1);
          } else if (offset === 1) { 
              targetY = 15;
              targetZ = -40;
              targetOpacity = 0.8; 
              targetScale = 0.6;
              targetEmissive = new THREE.Color(0x151515); 
              p.glowSprite.material.opacity = THREE.MathUtils.lerp(p.glowSprite.material.opacity, 0, 0.1);
          } else { 
              targetY = offset < 0 ? -30 : 40; 
              targetZ = -50;
              targetOpacity = 0; 
              targetScale = 0.5;
              targetEmissive = new THREE.Color(0x000000);
              p.glowSprite.material.opacity = 0;
          }

          const moveSpeed = 0.12; 
          p.group.position.y = THREE.MathUtils.lerp(p.group.position.y, targetY, moveSpeed);
          p.group.position.z = THREE.MathUtils.lerp(p.group.position.z, targetZ, moveSpeed);
          p.group.scale.setScalar(THREE.MathUtils.lerp(p.group.scale.x, targetScale, moveSpeed));
          
          p.mesh.material.emissive.lerp(targetEmissive, moveSpeed);
          p.mesh.material.opacity = THREE.MathUtils.lerp(p.mesh.material.opacity, targetOpacity, moveSpeed);
          p.ring.material.opacity = THREE.MathUtils.lerp(p.ring.material.opacity, targetOpacity * 0.4, moveSpeed);
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      meshes.forEach(m => {
          m.mesh.geometry.dispose();
          m.mesh.material.dispose();
      });
    };
  }, [planets, planetExtras]); 

  const activePlanet = planets[activeIndex] || planets[0];
  const extraInfo = planetExtras[activePlanet.name] || { moons: "0" };

  return (
    <div className="fixed inset-0 z-50 font-sans" style={{ background: 'black' }}>
        {/* Animated Star Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {[...Array(150)].map((_, i) => (
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
        
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
        <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-20">
            <button 
              onClick={onBack} 
              className="group relative px-8 py-3 bg-blue-600/80 backdrop-blur-md rounded-full text-white font-bold tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
            >
              <span className="relative z-10">Back to Cosmos</span>
            </button>
            <div className="text-blue-500 tracking-[0.5em] text-sm font-bold">SOLAR SYSTEM MAP</div>
        </div>
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-6">
            {sidebarPlanets.map((p) => {
                const originalIndex = planets.findIndex(original => original.name === p.name);
                const isActive = activeIndex === originalIndex;
                return (
                    <div key={p.name} onClick={() => setActiveIndex(originalIndex)} className="group flex items-center gap-4 cursor-pointer transition-all duration-300">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${isActive ? 'bg-blue-500 border-blue-500 scale-125 shadow-[0_0_10px_#3b82f6]' : 'border-gray-600 group-hover:border-white bg-transparent'}`} />
                        <div className="flex flex-col">
                            <span className={`text-sm tracking-widest font-bold uppercase transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{p.name}</span>
                        </div>
                    </div>
                );
            })}
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-20 w-full max-w-3xl">
             <h1 className="text-7xl md:text-8xl font-black text-white mb-4 uppercase tracking-tighter" style={{ textShadow: '0 0 30px rgba(0,0,0,0.8)' }}>{activePlanet.name}</h1>
             <p className="text-gray-300 text-sm md:text-base leading-relaxed tracking-wide mb-8 max-w-lg mx-auto drop-shadow-md">{activePlanet.detailInfo}</p>
             <div className="flex justify-center gap-12 border-t border-white/10 pt-6">
                <div>
                    <div className="text-black font-black text-[12px] uppercase tracking-widest mb-1" style={{ textShadow: '0 0 5px rgba(255,255,255,0.8)' }}>Diameter</div>
                    <div className="text-white font-bold text-lg">{activePlanet.diameter}</div>
                </div>
                <div>
                    <div className="text-black font-black text-[12px] uppercase tracking-widest mb-1" style={{ textShadow: '0 0 5px rgba(255,255,255,0.8)' }}>Orbit</div>
                    <div className="text-white font-bold text-lg">{activePlanet.orbitalPeriod || 'N/A'}</div>
                </div>
                <div>
                    <div className="text-black font-black text-[12px] uppercase tracking-widest mb-1" style={{ textShadow: '0 0 5px rgba(255,255,255,0.8)' }}>Temp</div>
                    <div className="text-white font-bold text-lg">{activePlanet.temp || 'Unknown'}</div>
                </div>
                <div>
                    <div className="text-black font-black text-[12px] uppercase tracking-widest mb-1" style={{ textShadow: '0 0 5px rgba(255,255,255,0.8)' }}>Moons</div>
                    <div className="text-white font-bold text-lg text-blue-400">{extraInfo.moons}</div>
                </div>
             </div>
        </div>
        
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000_120%)] opacity-40" />
    </div>
  );
};

// --- 4. GALAXY CAROUSEL (3D FLOW) ---

const GalaxyCarousel = ({ data, onBack }) => {
  // Create infinite loop by tripling the data
  const infiniteData = useMemo(() => [...data, ...data, ...data], [data]);
  const [activeIndex, setActiveIndex] = useState(data.length); // Start at middle set
  const [showModal, setShowModal] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleCardClick = (index) => {
    const actualIndex = index % data.length;
    const currentActual = activeIndex % data.length;
    
    if (actualIndex === currentActual) {
      // If clicking active card, show modal
      setShowModal(true);
    } else {
      // If clicking side card, make it active
      setActiveIndex(index);
    }
  };

  // Auto-loop when reaching edges
  useEffect(() => {
    if (activeIndex >= infiniteData.length - 2) {
      // Near end, jump to beginning set
      setTimeout(() => setActiveIndex(data.length), 400);
    } else if (activeIndex <= 1) {
      // Near start, jump to end set
      setTimeout(() => setActiveIndex(data.length * 2 - 1), 400);
    }
  }, [activeIndex, data.length, infiniteData.length]);

  // Get current galaxy (handles infinite loop)
  const currentGalaxy = infiniteData[activeIndex];

  // Swipe gesture handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isRightSwipe) {
      // Swipe right = go back
      onBack();
    } else if (isLeftSwipe) {
      // Swipe left = next galaxy
      setActiveIndex(prev => prev + 1);
    }
    
    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  const getCardStyle = (index) => {
    const offset = index - activeIndex; 
    const absOffset = Math.abs(offset);
    const isActive = offset === 0;
    
    // Hide cards that are too far away for better performance
    if (absOffset > 2) {
      return {
        display: 'none'
      };
    }
    
    // Simplified transforms for better performance
    let styles = {
        transform: `translateX(${offset * 200}px) scale(0.7)`,
        opacity: 0.3,
        zIndex: 30,
        pointerEvents: 'auto',
        borderColor: '#374151',
        willChange: 'transform, opacity' // GPU acceleration
    };

    if (isActive) {
        styles = {
            transform: `translateX(0) scale(1)`,
            opacity: 1,
            zIndex: 50,
            pointerEvents: 'auto',
            borderColor: '#8b5cf6', 
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
            willChange: 'transform, opacity'
        };
    } else if (absOffset === 1) {
        styles = {
            transform: `translateX(${offset * 300}px) scale(0.85)`,
            opacity: 0.6,
            zIndex: 40,
            pointerEvents: 'auto',
            borderColor: '#4b5563',
            willChange: 'transform, opacity'
        };
    }

    return styles;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex flex-col font-sans overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none"></div>
      
      <div className="relative z-20 p-8 flex justify-between items-center w-full h-24">
        <button 
          onClick={onBack} 
          className="group relative px-8 py-3 bg-slate-800/80 backdrop-blur-md rounded-full text-white font-bold tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-slate-700 hover:shadow-[0_0_30px_rgba(100,200,255,0.4)] border border-cyan-500/30 hover:border-cyan-400"
        >
          <span className="relative z-10">Back</span>
        </button>
        <h2 className="text-cyan-400 tracking-[0.3em] text-xl md:text-2xl font-bold uppercase">Galactic Flow</h2>
      </div>

      {/* Carousel Stage */}
      <div className="flex-1 flex items-center justify-center relative">
         <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center">
            {infiniteData.map((item, index) => (
                <div 
                    key={`galaxy-${index}`}
                    onClick={() => handleCardClick(index)}
                    style={{
                        ...getCardStyle(index),
                        // Fast, smooth transition
                        transition: 'transform 0.4s ease-out, opacity 0.4s ease-out, border-color 0.3s'
                    }}
                    className="absolute w-[280px] h-[440px] rounded-2xl border-2 bg-gray-900 overflow-hidden cursor-pointer flex flex-col shadow-2xl origin-center"
                >
                    {/* Dark Overlay for inactive items (Replaces Blur) */}
                    <div className={`absolute inset-0 bg-black transition-opacity duration-500 z-20 pointer-events-none ${index === activeIndex ? 'opacity-0' : 'opacity-60'}`}></div>

                    <div className="h-3/4 w-full relative z-10 bg-gray-800">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                          style={{ imageRendering: 'auto' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
                    </div>
                    
                    <div className="h-1/4 bg-black p-4 flex flex-col items-center justify-center text-center border-t border-cyan-500/20 z-10">
                        <h3 className="text-white font-bold uppercase tracking-wider text-lg mb-1">{item.name}</h3>
                        <p className="text-cyan-400 text-xs uppercase tracking-widest">{item.type}</p>
                    </div>
                </div>
            ))}
         </div>
      </div>

      <div className="relative z-20 pb-12 flex flex-col items-center gap-6">
         <div className="text-center h-16 animate-fadeIn px-4">
            <p className="text-gray-300 text-lg max-w-xl mx-auto drop-shadow-md">
                {currentGalaxy.detailInfo}
            </p>
         </div>
         <div className="text-gray-400 text-sm animate-pulse">
            Click on cards to navigate • Click active card for details
         </div>
      </div>

      {/* Galaxy Info Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full max-w-4xl bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 border-2 border-cyan-500/50 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20 animate-[fadeIn_0.3s_ease-out]">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-red-600 transition"
            >
              ✕
            </button>
            
            <div className="flex flex-col md:flex-row h-[600px]">
              <div className="md:w-1/2 relative overflow-hidden">
                <img 
                  src={currentGalaxy.imageUrl} 
                  alt={currentGalaxy.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">Galaxy Classification</div>
                  <div className="text-purple-400 font-mono text-lg font-bold">{currentGalaxy.type}</div>
                </div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <h2 className="text-4xl font-black text-white mb-2 uppercase">{currentGalaxy.name}</h2>
                <div className="h-1 w-20 bg-purple-500 mb-6"></div>
                
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  {currentGalaxy.detailInfo}
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="text-purple-400 font-bold text-sm uppercase mb-1">Type</h4>
                    <p className="text-white">{currentGalaxy.type}</p>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="text-purple-400 font-bold text-sm uppercase mb-1">Distance</h4>
                    <p className="text-white">Millions of light-years away</p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="text-purple-400 font-bold text-sm uppercase mb-1">Stars</h4>
                    <p className="text-white">Billions to trillions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 5. NEW: BLACK HOLE ARCHIVE (VERTICAL SCROLL) ---

const BlackHoleArchive = ({ data, onBack }) => {
  // Artificially expand data for scrolling effect
  const scrollData = useMemo(() => {
      let expanded = [];
      for(let i=0; i<5; i++) { 
          expanded = [...expanded, ...data];
      }
      return expanded.map((item, idx) => ({ ...item, uniqueId: idx }));
  }, [data]);

  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
      if (!listRef.current) return;
      const container = listRef.current;
      const containerCenter = container.scrollTop + (container.clientHeight / 2);
      const items = container.children; // Get the wrapper divs
      let closestIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < items.length; i++) {
          const item = items[i];
          // Calculate center of the item relative to the container
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
           className="group relative px-8 py-3 bg-purple-600/80 backdrop-blur-md rounded-full text-white font-bold tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
         >
           <span className="relative z-10">Back</span>
         </button>
         <h2 className="text-purple-500 tracking-[0.5em] text-sm font-bold uppercase">Event Horizon</h2>
       </div>

       {/* SCROLL CONTAINER */}
       {/* CHANGED: pt-32 (starts higher up) instead of py-[50vh] */}
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
                    className={`
                        max-w-3xl mx-auto mb-16 rounded-3xl p-1 transition-all duration-500 ease-out transform origin-center
                        ${isActive ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-40 blur-[1px] translate-y-4'}
                    `}
                  >
                     <div className={`
                        relative overflow-hidden rounded-3xl bg-gray-900 border border-purple-500/30
                        ${isActive ? 'shadow-[0_0_50px_rgba(168,85,247,0.3)] border-purple-500' : ''}
                     `}>
                        {/* Flex Container for Image/Text */}
                        <div className="flex flex-col md:flex-row h-auto md:h-[280px]">
                            
                            {/* Icon / Image Section */}
                            <div className="md:w-5/12 bg-black/50 flex items-center justify-center text-7xl md:text-8xl relative overflow-hidden py-8 md:py-0">
                                <span className="relative z-10">{item.icon}</span>
                                {/* Rotating glow effect for active item */}
                                {isActive && <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0%,_#a855f7_100%)] animate-[spin_4s_linear_infinite] opacity-20"></div>}
                            </div>
                            
                            {/* Text Info */}
                            <div className="md:w-7/12 p-8 flex flex-col justify-center bg-gradient-to-r from-gray-900 to-gray-800">
                                <h3 className={`text-3xl md:text-4xl font-black uppercase mb-2 ${isActive ? 'text-white' : 'text-gray-400'}`}>
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

       {/* Footer Indicator */}
       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-purple-500/50 text-xs tracking-widest uppercase z-20 animate-bounce">
           Scroll to Explore
       </div>
    </div>
  );
};

// --- 6. General Info Modal (UNCHANGED) ---
const GeneralInfoModal = ({ item, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 font-sans">
        <div className="bg-gradient-to-br from-gray-900 to-purple-900 border border-purple-500 rounded-2xl w-full max-w-4xl p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white text-4xl hover:text-red-500">×</button>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex items-center justify-center text-9xl bg-black bg-opacity-50 rounded-xl p-8">
                {item.icon}
            </div>
            <div className="md:w-2/3">
                <h2 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">{item.name}</h2>
                <div className="inline-block bg-purple-600 px-3 py-1 rounded text-sm mb-4">{item.type}</div>
                <p className="text-xl text-gray-200 leading-relaxed mb-6">{item.detailInfo}</p>
                {item.facts && (
                    <div className="bg-black bg-opacity-30 p-4 rounded-lg border border-purple-500">
                        <h4 className="text-purple-300 font-bold mb-2">Quick Facts</h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            {item.facts.map((fact, i) => <li key={i}>{fact}</li>)}
                        </ul>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
};

// --- MAIN APP ---
const App = () => {
  const { user, isAuthenticated, signup, login, logout } = useAuth();
  const [currentSection, setCurrentSection] = useState('home');
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [aiGender, setAiGender] = useState('female');
  
  // States
  const [isTourActive, setIsTourActive] = useState(false);
  const [cosmosCategory, setCosmosCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedScientist, setSelectedScientist] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  
  // Quiz Maker States
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizStep, setCurrentQuizStep] = useState('create'); // 'create', 'preview', 'sent', 'student-view'
  const [quizTitle, setQuizTitle] = useState('');
  const [quizTopic, setQuizTopic] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState('');
  const [customType, setCustomType] = useState('Multiple Choice');
  const [mcqOptions, setMcqOptions] = useState(['', '', '', '']);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [generatedQuizLink, setGeneratedQuizLink] = useState('');
  
  // Lesson Planner States
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonGrade, setLessonGrade] = useState('');
  const [lessonDuration, setLessonDuration] = useState('');
  const [lessonObjectives, setLessonObjectives] = useState(['']);
  const [generatedLesson, setGeneratedLesson] = useState(null);
  
  // Assignment Builder States
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [assignmentDifficulty, setAssignmentDifficulty] = useState('Medium');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');
  const [generatedAssignment, setGeneratedAssignment] = useState(null);
  
  // Progress Tracker States
  const [studentData, setStudentData] = useState([
    { id: 1, name: 'Alex Johnson', score: 85, quizzes: 12, assignments: 8, progress: 85 },
    { id: 2, name: 'Maria Garcia', score: 92, quizzes: 15, assignments: 10, progress: 92 },
    { id: 3, name: 'James Smith', score: 78, quizzes: 10, assignments: 7, progress: 78 },
    { id: 4, name: 'Emma Wilson', score: 88, quizzes: 13, assignments: 9, progress: 88 },
    { id: 5, name: 'Liam Brown', score: 95, quizzes: 16, assignments: 11, progress: 95 }
  ]);

  const mountRef = useRef(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isSwipeActive, setIsSwipeActive] = useState(false);

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [currentSection]);

  // Two-finger swipe back gesture with visual indicator
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchCount = 0;

    const handleTouchStart = (e) => {
      touchCount = e.touches.length;
      if (touchCount === 2) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        setIsSwipeActive(true);
      }
    };

    const handleTouchMove = (e) => {
      if (touchCount === 2 && e.touches.length === 2) {
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = Math.abs(touchEndY - touchStartY);

        // Update progress for visual feedback
        if (deltaX > 0 && deltaY < 50) {
          const progress = Math.min(deltaX / 150, 1);
          setSwipeProgress(progress);
        }

        // Trigger navigation when threshold reached
        if (deltaX > 150 && deltaY < 50) {
          if (cosmosCategory) {
            setCosmosCategory(null);
          } else if (currentSection !== 'home') {
            setCurrentSection('home');
          }
          setIsSwipeActive(false);
          setSwipeProgress(0);
          touchCount = 0;
        }
      }
    };

    const handleTouchEnd = () => {
      touchCount = 0;
      setIsSwipeActive(false);
      setSwipeProgress(0);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, cosmosCategory]);

  const cosmosCategories = [
    { id: 'planets', name: 'Planets', icon: '🪐', desc: 'Worlds of our Solar System' },
    { id: 'galaxies', name: 'Galaxies', icon: '🌌', desc: 'Islands of Billions of Stars' },
    { id: 'nebulae', name: 'Nebulae', icon: '🌫️', desc: 'Stellar Nurseries of Gas' },
    { id: 'blackholes', name: 'Black Holes', icon: '🕳️', desc: 'The Ultimate Gravity Wells' },
    { id: 'stars', name: 'Stars', icon: '☀️', desc: 'The Engines of the Universe' },
    { id: 'meteorites', name: 'Meteorites', icon: '☄️', desc: 'Space Rocks & Debris' }
  ];

  const scientists = [
    { name: "Albert Einstein", field: "Theoretical Physics", image: "🧠", bio: "Developed the theory of relativity.", achievements: ["E=mc^2", "Photoelectric Effect"] },
    { name: "Marie Curie", field: "Radioactivity", image: "⚗️", bio: "Pioneer in research on radioactivity.", achievements: ["Nobel Prize in Physics", "Nobel Prize in Chemistry"] }
  ];

  // Suggested questions by topic
  const suggestedQuestions = {
    planets: [
      { q: "What is the largest planet in our solar system?", a: "Jupiter", type: "Multiple Choice" },
      { q: "How many planets are in our solar system?", a: "8", type: "Short Answer" },
      { q: "Mars is known as the Red Planet. True or False?", a: "True", type: "True/False" },
      { q: "Which planet is closest to the Sun?", a: "Mercury", type: "Multiple Choice" },
      { q: "Saturn has rings made of ice and rock. True or False?", a: "True", type: "True/False" }
    ],
    galaxies: [
      { q: "What is the name of our galaxy?", a: "Milky Way", type: "Multiple Choice" },
      { q: "Which galaxy is closest to the Milky Way?", a: "Andromeda", type: "Multiple Choice" },
      { q: "Galaxies contain billions of stars. True or False?", a: "True", type: "True/False" },
      { q: "What shape is the Milky Way galaxy?", a: "Spiral", type: "Short Answer" },
      { q: "How many galaxies are estimated in the universe?", a: "Over 100 billion", type: "Short Answer" }
    ],
    stars: [
      { q: "What is the closest star to Earth?", a: "The Sun", type: "Multiple Choice" },
      { q: "Stars produce energy through nuclear fusion. True or False?", a: "True", type: "True/False" },
      { q: "What color are the hottest stars?", a: "Blue", type: "Multiple Choice" },
      { q: "What is a supernova?", a: "An exploding star", type: "Short Answer" },
      { q: "Our Sun is a medium-sized star. True or False?", a: "True", type: "True/False" }
    ],
    blackholes: [
      { q: "What is a black hole?", a: "A region of space with extremely strong gravity", type: "Short Answer" },
      { q: "Light can escape from a black hole. True or False?", a: "False", type: "True/False" },
      { q: "What is the boundary around a black hole called?", a: "Event Horizon", type: "Multiple Choice" },
      { q: "Black holes are formed from collapsed stars. True or False?", a: "True", type: "True/False" },
      { q: "What is at the center of most galaxies?", a: "A supermassive black hole", type: "Short Answer" }
    ],
    missions: [
      { q: "Which mission first landed humans on the Moon?", a: "Apollo 11", type: "Multiple Choice" },
      { q: "In what year did humans first walk on the Moon?", a: "1969", type: "Short Answer" },
      { q: "The Hubble Space Telescope orbits Earth. True or False?", a: "True", type: "True/False" },
      { q: "Which rover is currently exploring Mars?", a: "Perseverance", type: "Multiple Choice" },
      { q: "NASA stands for National Aeronautics and Space Administration. True or False?", a: "True", type: "True/False" }
    ],
    scientists: [
      { q: "Who developed the theory of relativity?", a: "Albert Einstein", type: "Multiple Choice" },
      { q: "Galileo discovered the moons of Jupiter. True or False?", a: "True", type: "True/False" },
      { q: "Who is known as the father of modern astronomy?", a: "Galileo Galilei", type: "Short Answer" },
      { q: "Isaac Newton discovered gravity. True or False?", a: "True", type: "True/False" },
      { q: "Who was the first person in space?", a: "Yuri Gagarin", type: "Multiple Choice" }
    ]
  };

  const teacherTools = [
    { 
      title: "Lesson Planner", 
      icon: "📝", 
      description: "AI-generated space lesson plans", 
      details: "Create curriculum aligned lesson plans for astronomy topics.", 
      features: ["PDF Export", "Grade Adaptation", "Standards Alignment", "Activity Suggestions"],
      type: "planner"
    },
    { 
      title: "Quiz Maker", 
      icon: "❓", 
      description: "Create custom space quizzes", 
      details: "Generate interactive quizzes with multiple question types.", 
      features: ["Multiple Choice", "True/False", "Short Answer", "Instant Grading", "Suggested Questions"],
      type: "quiz"
    },
    { 
      title: "Assignment Builder", 
      icon: "📋", 
      description: "Design space assignments", 
      details: "Create engaging homework and project assignments.", 
      features: ["Rubric Generator", "Difficulty Levels", "Resource Links", "Due Date Tracking"],
      type: "assignment"
    },
    { 
      title: "Progress Tracker", 
      icon: "📊", 
      description: "Monitor student learning", 
      details: "Track student progress and performance analytics.", 
      features: ["Grade Book", "Performance Charts", "Individual Reports", "Class Analytics"],
      type: "tracker"
    }
  ];

  const missions = [
    { name: "Apollo 11", status: "Success", description: "First humans on Moon", agency: "NASA", year: "1969", details: "Neil Armstrong and Buzz Aldrin walked on the lunar surface.", objectives: ["Land on Moon", "Return safely"] }
  ];

  const cosmosData = {
      planets: [
      { 
        name: "Mercury", temp: "167°C", orbitalPeriod: "88 days", 
        textureUrl: 'https://tse4.mm.bing.net/th/id/OIP.CK1RhQb6eHAdjU9fMXKjaQHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', 
        detailInfo: 'The smallest and fastest planet, zipping around the Sun in just 88 days.', 
        distanceFromSun: '57.9M km', diameter: '4,879 km' 
      },
      { 
        name: "Venus", temp: "464°C", orbitalPeriod: "225 days", 
        textureUrl: 'https://tse3.mm.bing.net/th/id/OIP.8_yJkhiynIea8JdrvXi9JQHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', 
        detailInfo: 'The hottest planet in the solar system, veiled in thick clouds.', 
        distanceFromSun: '108.2M km', diameter: '12,104 km' 
      },
      { 
        name: "Earth", temp: "15°C", orbitalPeriod: "365 days", 
        textureUrl: 'https://i2.wp.com/eoimages.gsfc.nasa.gov/images/imagerecords/74000/74518/world.topo.200412.3x5400x2700.jpg?ssl=1', 
        detailInfo: 'Our home, the "Blue Marble". The only known world with life.', 
        distanceFromSun: '149.6M km', diameter: '12,742 km' 
      },
      { 
        name: "Mars", temp: "-65°C", orbitalPeriod: "687 days", 
        textureUrl: 'https://static.vecteezy.com/system/resources/thumbnails/037/481/368/small_2x/ai-generated-seamless-texture-of-martian-surface-neural-network-generated-image-photo.jpg', 
        detailInfo: 'The Red Planet, colored by iron oxide. Home to Olympus Mons.', 
        distanceFromSun: '227.9M km', diameter: '6,779 km' 
      },
      { 
        name: "Jupiter", temp: "-110°C", orbitalPeriod: "12 years", 
        textureUrl: 'https://th.bing.com/th/id/R.f69754cbb9d0129d83e3a6b0a2a91df3?rik=qpDLSCrVCqKWaw&riu=http%3a%2f%2fplanetpixelemporium.com%2fdownload%2fdownload.php%3fjupitermap.jpg&ehk=XMJr3PxUI%2bt0a2AeVuzz%2fqjW6g4%2bstdAGGIaiMSdYos%3d&risl=&pid=ImgRaw&r=0', 
        detailInfo: 'The King of Planets. A massive gas giant.', 
        distanceFromSun: '778.5M km', diameter: '139,820 km' 
      },
      { 
        name: "Saturn", temp: "-140°C", orbitalPeriod: "29 years", 
        textureUrl: 'https://tse4.mm.bing.net/th/id/OIP.BSSL0H1Gqab_JCCLC_E-6gHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', 
        detailInfo: 'Famous for its complex and dazzling ring system.', 
        distanceFromSun: '1.4B km', diameter: '116,460 km' 
      },
      { 
        name: "Uranus", temp: "-195°C", orbitalPeriod: "84 years", 
        textureUrl: 'https://tse3.mm.bing.net/th/id/OIP.DPKRTvAMzBHfrNSiixfR8QHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', 
        detailInfo: 'An ice giant that rolls on its side.', 
        distanceFromSun: '2.9B km', diameter: '50,724 km' 
      },
      { 
        name: "Neptune", temp: "-200°C", orbitalPeriod: "165 years", 
        textureUrl: 'https://tse2.mm.bing.net/th/id/OIP.Mb8o1tZm3IOFmk-4kMPBSQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', 
        detailInfo: 'The windiest planet, a dark, cold world.', 
        distanceFromSun: '4.5B km', diameter: '49,244 km' 
      },
      { 
        name: "Pluto", temp: "-225°C", orbitalPeriod: "248 years", 
        textureUrl: 'https://tse2.mm.bing.net/th/id/OIP.66RNO_4-XKcyktl85gzdEgHaDs?rs=1&pid=ImgDetMain&o=7&rm=3', 
        detailInfo: 'A dwarf planet in the Kuiper Belt.', 
        distanceFromSun: '5.9B km', diameter: '2,377 km' 
      }
    ],
    
    // EXPANDED GALAXY COLLECTION - High Quality Images
    galaxies: [
        { name: "Milky Way", type: "Spiral Galaxy", icon: "", detailInfo: "Our home galaxy containing 200-400 billion stars in a barred spiral structure.", imageUrl: "https://media.istockphoto.com/id/481229372/photo/spiral-galaxy-illustration-of-milky-way.jpg?s=612x612&w=0&k=20&c=O-OKRJWM_XhGv48z6OhOj_tKBwEaDsvhYKguEN1yuJM=" },
        { name: "Andromeda", type: "Spiral Galaxy", icon: "", detailInfo: "Our closest major neighbor, hurtling towards us at 110 km/s for a collision in 4.5 billion years.", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ27RthjsFvCn7jtdxsJn3H_VPPEHrVIJGYrg&s" },
        { name: "Sombrero", type: "Lenticular Galaxy", icon: "", detailInfo: "Known for its bright nucleus and prominent dust lane, resembling a Mexican hat.", imageUrl: "https://science.nasa.gov/wp-content/uploads/2023/04/sombrero-galaxy-hubble-jpg.webp" },
        { name: "Whirlpool", type: "Spiral Galaxy", icon: "", detailInfo: "A classic spiral galaxy interacting with a smaller companion, creating stunning tidal streams.", imageUrl: "https://cdn.esahubble.org/archives/images/wallpaper2/heic0506a.jpg" },
        { name: "Pinwheel", type: "Spiral Galaxy", icon: "", detailInfo: "Face-on spiral galaxy with well-defined arms, one of the largest in our local group.", imageUrl: "https://cdn.esahubble.org/archives/images/wallpaper5/heic0602a.jpg" },
        { name: "Triangulum", type: "Spiral Galaxy", icon: "", detailInfo: "The third largest member of the Local Group, visible to the naked eye under dark skies.", imageUrl: "https://cdn.esahubble.org/archives/images/screen/heic1901a.jpg" },
        { name: "Centaurus A", type: "Elliptical Galaxy", icon: "", detailInfo: "A peculiar galaxy with a supermassive black hole and prominent dust lane.", imageUrl: "https://cdn.eso.org/images/screen/eso1519c.jpg" },
        { name: "Black Eye", type: "Spiral Galaxy", icon: "", detailInfo: "Named for its spectacular dark band of dust in front of the galaxy's bright nucleus.", imageUrl: "https://storage.noirlab.edu/media/archives/images/screen/noao-m64chadwell.jpg" },
        { name: "Cartwheel", type: "Ring Galaxy", icon: "", detailInfo: "A rare ring galaxy formed by a cosmic collision 200 million years ago.", imageUrl: "https://static01.nyt.com/images/2022/08/09/us/04sci-cartwheel-Hubble/04sci-cartwheel-Hubble-articleLarge.jpg?quality=75&auto=webp&disable=upscale" },
        { name: "Tadpole", type: "Disrupted Galaxy", icon: "", detailInfo: "A disrupted barred spiral with a massive tail of stars, gas and dust.", imageUrl: "https://static01.nyt.com/images/2015/04/22/science/hubble_tadpole/hubble_tadpole-blog427.jpg" }
    ],
    nebulae: [
        { name: "Orion Nebula", type: "Diffuse Nebula", icon: "✨", detailInfo: "Visible to naked eye, a stellar nursery." },
        { name: "Crab Nebula", type: "Supernova Remnant", icon: "🦀", detailInfo: "Result of a supernova in 1054 AD." }
    ],
    blackholes: [
        { 
          name: "Sagittarius A*", 
          type: "Supermassive", 
          icon: "⚫", 
          detailInfo: "The monster at the center of Milky Way. This supermassive black hole anchors our galaxy and has a mass of 4 million times that of our Sun.",
          image: "https://cdn.mos.cms.futurecdn.net/au3BAKRHQ3h7MRiHxLJ3o8.jpg",
          mass: "4 million solar masses",
          distance: "26,000 light-years",
          discovered: "1974 (confirmed 2002)",
          eventHorizon: "~24 million km diameter",
          facts: [
            "Located at the center of the Milky Way galaxy",
            "Mass equivalent to 4 million Suns",
            "Event horizon is 24 million km across",
            "Takes 240 years to orbit around it at light speed",
            "First image captured in 2022 by Event Horizon Telescope",
            "Surrounded by a cluster of stars orbiting at incredible speeds"
          ]
        },
        { 
          name: "M87*", 
          type: "Supermassive", 
          icon: "⚫", 
          detailInfo: "First black hole ever imaged. Located in the Messier 87 galaxy, this giant black hole made history in 2019 when scientists captured its shadow.",
          image: "https://www.eso.org/public/archives/images/large/eso1907a.jpg",
          mass: "6.5 billion solar masses",
          distance: "55 million light-years",
          discovered: "2019 (first image)",
          eventHorizon: "~40 billion km diameter",
          facts: [
            "First black hole ever photographed (2019)",
            "1,500 times more massive than Sagittarius A*",
            "Located in the center of galaxy M87",
            "Shoots a jet of plasma 5,000 light-years long",
            "Event horizon is larger than our entire solar system",
            "Image required 8 telescopes across the globe"
          ]
        },
        { 
          name: "Cygnus X-1", 
          type: "Stellar", 
          icon: "⚫", 
          detailInfo: "One of the first black holes discovered. This stellar-mass black hole is actively feeding on a companion star, creating powerful X-ray emissions.",
          image: "https://science.nasa.gov/wp-content/uploads/2023/09/cygx1_ill-jpg.webp",
          mass: "21 solar masses",
          distance: "6,070 light-years",
          discovered: "1964",
          eventHorizon: "~124 km diameter",
          facts: [
            "First black hole candidate ever discovered",
            "Part of a binary system with a blue supergiant star",
            "Emits powerful X-rays as it consumes matter",
            "Completes one orbit around its companion every 5.6 days",
            "Helped prove black holes actually exist",
            "Named after the constellation Cygnus (The Swan)"
          ]
        },
        { 
          name: "TON 618", 
          type: "Ultramassive", 
          icon: "⚫", 
          detailInfo: "One of the largest black holes ever discovered. This ultramassive black hole is so large it defies imagination, with a mass 66 billion times that of the Sun.",
          image: "https://science.nasa.gov/wp-content/uploads/2023/06/blackhole-jpg.webp",
          mass: "66 billion solar masses",
          distance: "10.4 billion light-years",
          discovered: "1957 (as quasar)",
          eventHorizon: "~390 billion km diameter",
          facts: [
            "One of the most massive black holes known",
            "66 billion times more massive than the Sun",
            "Event horizon is 1,300 times the distance from Earth to Sun",
            "Powers an extremely bright quasar",
            "So distant we see it as it was 10.4 billion years ago",
            "Could fit 11 of our solar systems across its event horizon"
          ]
        }
    ],
    stars: [
        { name: "The Sun", type: "Yellow Dwarf", icon: "☀️", detailInfo: "Center of our solar system." },
        { name: "Betelgeuse", type: "Red Supergiant", icon: "🔴", detailInfo: "Destined to explode soon." }
    ],
    meteorites: [
        { name: "Hoba", type: "Iron", icon: "🪨", detailInfo: "Largest known meteorite." },
        { name: "Chelyabinsk", type: "Chondrite", icon: "💥", detailInfo: "Exploded over Russia in 2013." }
    ]
  };

  // --- THREE JS BACKGROUND (HOME) ---
  useEffect(() => {
    if (currentSection !== 'home' || !mountRef.current) return;
    const container = mountRef.current;
    while(container.firstChild) container.removeChild(container.firstChild);

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(20, 10, 40); 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace; 
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 150;

    // Lights
    const sunLight = new THREE.PointLight(0xffffff, 2.0, 0); 
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 3.0); 
    scene.add(ambientLight);
    const fillLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    scene.add(fillLight);

    const loader = new THREE.TextureLoader();

    // Sun
    const sun = new THREE.Mesh(
        new THREE.SphereGeometry(8, 64, 64), 
        new THREE.MeshBasicMaterial({ 
            map: loader.load('https://upload.wikimedia.org/wikipedia/commons/9/99/Map_of_the_full_sun.jpg'),
            color: 0xffddaa 
        })
    );
    scene.add(sun);

    const createOrbitRing = (radius) => {
        const shape = new THREE.Shape();
        shape.absarc(0, 0, radius, 0, Math.PI * 2);
        const geo = new THREE.BufferGeometry().setFromPoints(shape.getSpacedPoints(128));
        const mat = new THREE.LineBasicMaterial({ color: 0x4444ff, transparent: true, opacity: 0.3 });
        const orbit = new THREE.LineLoop(geo, mat);
        orbit.rotation.x = Math.PI / 2;
        scene.add(orbit);
    };

    // Earth
    const earthOrbitSystem = new THREE.Object3D();
    scene.add(earthOrbitSystem);
    const earthGroup = new THREE.Group();
    earthGroup.position.x = 35; 
    earthOrbitSystem.add(earthGroup);
    createOrbitRing(35);

    const earth = new THREE.Mesh(
        new THREE.SphereGeometry(3.5, 64, 64), 
        new THREE.MeshStandardMaterial({
            map: loader.load('https://th.bing.com/th/id/R.9a5157fba87c60fa38e6ae3a4daa111b?rik=HsJ471UsIGJJSA&riu=http%3a%2f%2feoimages.gsfc.nasa.gov%2fimages%2fimagerecords%2f79000%2f79765%2fdnb_land_ocean_ice.2012.3600x1800.jpg&ehk=0tDHrlMn0XvT4cjKr90cnzDpaY2DttmXRvfE17a3B%2f8%3d&risl=&pid=ImgRaw&r=0'),
            roughness: 0.5, metalness: 0.1
        })
    );
    earthGroup.add(earth);
    const earthClouds = new THREE.Mesh(
        new THREE.SphereGeometry(3.55, 64, 64),
        new THREE.MeshStandardMaterial({
            map: loader.load('https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Blue_Marble_Clouds.png/800px-Blue_Marble_Clouds.png'),
            transparent: true, opacity: 0.4, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
        })
    );
    earthGroup.add(earthClouds);

    // Other Planets Helper
    const createPlanet = (size, texture, distance, speed, colorTint = 0xffffff) => {
        createOrbitRing(distance);
        const orbitSys = new THREE.Object3D();
        scene.add(orbitSys);
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(size, 64, 64), 
            new THREE.MeshStandardMaterial({ map: loader.load(texture), color: colorTint, roughness: 0.6, metalness: 0.0 })
        );
        mesh.position.x = distance;
        orbitSys.add(mesh);
        return { orbitSys, mesh, speed };
    };

    const mercury = createPlanet(2.0, 'https://tse4.mm.bing.net/th/id/OIP.m3w_E0fDCXaMH7wJTYX4NQHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', 15, 0.015, 0xaaaaaa);
    const venus = createPlanet(3.0, 'https://upload.wikimedia.org/wikipedia/commons/1/19/Cylindrical_Map_of_Venus.jpg', 24, 0.01, 0xffdd88);
    const mars = createPlanet(2.5, 'https://tse2.mm.bing.net/th/id/OIP.Jjl6f_9tEx67dioA1vNb9AHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', 50, 0.004, 0xff8866);
    const jupiter = createPlanet(7.0, 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg', 80, 0.001);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(6000 * 3);
    for(let i = 0; i < 6000 * 3; i++) posArray[i] = (Math.random() - 0.5) * 800;
    starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.2, color: 0xffffff, transparent: true, opacity: 0.8 }));
    scene.add(stars);

    // Animation
    let animationId;
    const animate = () => {
        animationId = requestAnimationFrame(animate);
        sun.rotation.y += 0.001;
        earthOrbitSystem.rotation.y += 0.005; 
        earth.rotation.y += 0.01; earthClouds.rotation.y += 0.012; 
        mercury.orbitSys.rotation.y += mercury.speed; mercury.mesh.rotation.y += 0.01;
        venus.orbitSys.rotation.y += venus.speed; venus.mesh.rotation.y -= 0.005; 
        mars.orbitSys.rotation.y += mars.speed; mars.mesh.rotation.y += 0.01;
        jupiter.orbitSys.rotation.y += jupiter.speed; jupiter.mesh.rotation.y += 0.02;
        stars.rotation.y -= 0.0001;
        controls.update();
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        if (container) while(container.firstChild) container.removeChild(container.firstChild);
        renderer.dispose();
    };
  }, [currentSection]);

  const handleLogout = () => { 
    logout(); 
    setCurrentSection('home'); 
  };
  
  const handleLogin = async (formData, isSignUp) => {
    if (isSignUp) {
      return await signup(formData.email, formData.password, formData.name);
    } else {
      return await login(formData.email, formData.password);
    }
  };
  
  const handleCosmosItemClick = (item) => setSelectedItem(item);
  const handleBackToCategories = () => setCosmosCategory(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur border-b border-blue-500">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer" onClick={() => setCurrentSection('home')}>COSMONET</div>
          
          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-6 items-center text-sm">
            <li><button onClick={() => setCurrentSection('home')} className={`hover:text-blue-400 transition-colors ${currentSection === 'home' ? 'text-blue-400 font-bold' : ''}`}>Home</button></li>
            <li><button onClick={() => { setCurrentSection('cosmos'); setCosmosCategory(null); }} className={`hover:text-blue-400 transition-colors ${currentSection === 'cosmos' ? 'text-blue-400 font-bold' : ''}`}>Explore Cosmos</button></li>
            <li><button onClick={() => setCurrentSection('scientists')} className={`hover:text-blue-400 transition-colors ${currentSection === 'scientists' ? 'text-blue-400 font-bold' : ''}`}>Scientist Lab</button></li>
            <li><button onClick={() => setCurrentSection('teachers')} className={`hover:text-blue-400 transition-colors ${currentSection === 'teachers' ? 'text-blue-400 font-bold' : ''}`}>Teacher Toolkit</button></li>
            <li><button onClick={() => setCurrentSection('missions')} className={`hover:text-blue-400 transition-colors ${currentSection === 'missions' ? 'text-blue-400 font-bold' : ''}`}>Mission Control</button></li>
            <li><button onClick={() => setCurrentSection('help')} className={`hover:text-blue-400 transition-colors ${currentSection === 'help' ? 'text-blue-400 font-bold' : ''}`}>Help Center</button></li>
            {isAuthenticated ? (
              <>
                <li className="text-cyan-400 text-xs">Welcome, {user?.name || user?.email}!</li>
                <li><button onClick={handleLogout} className="text-red-400 hover:text-red-300">Logout</button></li>
              </>
            ) : (
              <li><button onClick={() => setIsLoginOpen(true)} className="text-green-400">Login</button></li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white text-2xl"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-blue-500/30">
            <ul className="flex flex-col gap-4 p-6">
              <li><button onClick={() => { setCurrentSection('home'); setMobileMenuOpen(false); }} className={`hover:text-blue-400 transition-colors w-full text-left ${currentSection === 'home' ? 'text-blue-400 font-bold' : ''}`}>Home</button></li>
              <li><button onClick={() => { setCurrentSection('cosmos'); setCosmosCategory(null); setMobileMenuOpen(false); }} className={`hover:text-blue-400 transition-colors w-full text-left ${currentSection === 'cosmos' ? 'text-blue-400 font-bold' : ''}`}>Explore Cosmos</button></li>
              <li><button onClick={() => { setCurrentSection('scientists'); setMobileMenuOpen(false); }} className={`hover:text-blue-400 transition-colors w-full text-left ${currentSection === 'scientists' ? 'text-blue-400 font-bold' : ''}`}>Scientist Lab</button></li>
              <li><button onClick={() => { setCurrentSection('teachers'); setMobileMenuOpen(false); }} className={`hover:text-blue-400 transition-colors w-full text-left ${currentSection === 'teachers' ? 'text-blue-400 font-bold' : ''}`}>Teacher Toolkit</button></li>
              <li><button onClick={() => { setCurrentSection('missions'); setMobileMenuOpen(false); }} className={`hover:text-blue-400 transition-colors w-full text-left ${currentSection === 'missions' ? 'text-blue-400 font-bold' : ''}`}>Mission Control</button></li>
              <li><button onClick={() => { setCurrentSection('help'); setMobileMenuOpen(false); }} className={`hover:text-blue-400 transition-colors w-full text-left ${currentSection === 'help' ? 'text-blue-400 font-bold' : ''}`}>Help Center</button></li>
              {isAuthenticated ? (
                <>
                  <li className="text-cyan-400 text-sm">Welcome, {user?.name || user?.email}!</li>
                  <li><button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-red-400 hover:text-red-300 w-full text-left">Logout</button></li>
                </>
              ) : (
                <li><button onClick={() => { setIsLoginOpen(true); setMobileMenuOpen(false); }} className="text-green-400 w-full text-left">Login</button></li>
              )}
            </ul>
          </div>
        )}
      </nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
      <AnomalyModal item={selectedArtifact} onClose={() => setSelectedArtifact(null)} />
      
      {/* New Modern AI Assistant */}
      <SpaceAI />

      {/* --- RENDER LOGIC FOR COSMOS CATEGORIES --- */}
      {/* 1. PLANETS: Cinematic View */}
      {cosmosCategory === 'planets' && <CinematicPlanetView planets={cosmosData.planets} onBack={() => setCosmosCategory(null)} />}
      
      {/* 2. GALAXIES: New Carousel View (Syllabus) */}
      {cosmosCategory === 'galaxies' && <GalaxyCarousel data={cosmosData.galaxies} onBack={() => setCosmosCategory(null)} />}

      {/* 3. NEW: BLACK HOLES (VERTICAL SCROLL) */}
      {cosmosCategory === 'blackholes' && <BlackHoleArchive data={cosmosData.blackholes} onBack={() => setCosmosCategory(null)} />}

      {/* 4. MODAL (For other items like Nebulae, Stars, etc.) */}
      {selectedItem && !['planets', 'galaxies', 'blackholes'].includes(cosmosCategory) && <GeneralInfoModal item={selectedItem} onClose={() => setSelectedItem(null)} />}

      {/* HOME - SCROLL EXPERIENCE */}
      {currentSection === 'home' && (
        <ScrollHome 
          onExplore={() => { 
            setCurrentSection('cosmos'); 
            setCosmosCategory('planets'); 
          }}
          onOpenArtifact={(item) => setSelectedArtifact(item)}
          isAuthenticated={isAuthenticated}
          onLoginRequired={() => setIsLoginOpen(true)}
        />
      )}

      {/* EXPLORE COSMOS - MODERN SCROLLABLE VERSION */}
      {currentSection === 'cosmos' && !cosmosCategory && (
        <ModernExploreCosmos onCategorySelect={(categoryId) => setCosmosCategory(categoryId)} />
      )}

      {/* GRID VIEW (For items that are NOT Planets, NOT Galaxies, NOT Black Holes) */}
      {currentSection === 'cosmos' && cosmosCategory && !['planets', 'galaxies', 'blackholes'].includes(cosmosCategory) && (
        <div className="pt-32 px-12 min-h-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
            <div className="max-w-7xl mx-auto animate-fadeIn">
                <button onClick={handleBackToCategories} className="mb-8 flex items-center gap-2 text-blue-400 hover:text-white transition text-lg font-bold">← Back to Categories</button>
                <h2 className="text-5xl font-bold mb-12 capitalize border-b border-gray-700 pb-4">Exploring: <span className="text-blue-500">{cosmosCategory}</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cosmosData[cosmosCategory].map((item, idx) => (
                        <div key={idx} onClick={() => handleCosmosItemClick(item)} className="bg-gray-900 border border-gray-600 rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition cursor-pointer transform hover:scale-105">
                            <div className="h-48 bg-gray-800 flex items-center justify-center text-8xl relative overflow-hidden group">
                                <span className="z-10 relative">{item.icon}</span>
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-1 text-white">{item.name}</h3>
                                <p className="text-blue-400 text-sm mb-3">{item.type}</p>
                                <p className="text-gray-400 text-sm line-clamp-2">{item.detailInfo}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* SCIENTIST LAB - MODERN VERSION */}
      {currentSection === 'scientists' && (
        <ModernScientistLab />
      )}

      {/* TEACHER TOOLKIT - MODERN VERSION (Tools Protected) */}
      {currentSection === 'teachers' && (
        <div className="relative">
          <ModernTeacherToolkit 
            tools={teacherTools}
            onToolSelect={(tool) => {
              // Protect individual tools - require login
              if (!isAuthenticated) {
                setIsLoginOpen(true);
                return;
              }
              setSelectedTool(tool);
              setCurrentQuizStep('create');
              setQuizQuestions([]);
              setGeneratedLesson(null);
              setGeneratedAssignment(null);
            }}
            isAuthenticated={isAuthenticated}
            onLoginRequired={() => setIsLoginOpen(true)}
          />
        </div>
      )}

      {/* TEACHER TOOLKIT MODALS (Only show if authenticated) */}
      {currentSection === 'teachers' && isAuthenticated && (
        <div className="relative">
          
          {/* Modals for all tools */}
          {/* Lesson Planner Modal */}
             <AnimatePresence>
             {selectedTool && selectedTool.type === 'planner' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
                >
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: 'spring', damping: 20 }}
                      className="bg-gray-900 rounded-3xl border-2 border-green-500 max-w-3xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
                    >
                         <button onClick={() => setSelectedTool(null)} className="absolute top-4 right-4 text-white text-3xl hover:text-red-400 transition">×</button>
                         <div className="text-5xl mb-4">📝</div>
                         <h2 className="text-3xl font-bold text-green-400 mb-6">Lesson Planner</h2>
                         
                         {!generatedLesson ? (
                           <div className="space-y-4">
                             <div>
                               <label className="block text-green-400 font-bold mb-2">Lesson Title</label>
                               <input 
                                 type="text" 
                                 value={lessonTitle}
                                 onChange={(e) => setLessonTitle(e.target.value)}
                                 placeholder="e.g., Introduction to Black Holes"
                                 className="w-full bg-gray-800 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                               />
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                               <div>
                                 <label className="block text-green-400 font-bold mb-2">Grade Level</label>
                                 <select 
                                   value={lessonGrade}
                                   onChange={(e) => setLessonGrade(e.target.value)}
                                   className="w-full bg-gray-800 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                 >
                                   <option value="">Select grade...</option>
                                   <option value="6-8">Grades 6-8</option>
                                   <option value="9-10">Grades 9-10</option>
                                   <option value="11-12">Grades 11-12</option>
                                 </select>
                               </div>
                               <div>
                                 <label className="block text-green-400 font-bold mb-2">Duration</label>
                                 <select 
                                   value={lessonDuration}
                                   onChange={(e) => setLessonDuration(e.target.value)}
                                   className="w-full bg-gray-800 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                 >
                                   <option value="">Select...</option>
                                   <option value="30">30 minutes</option>
                                   <option value="45">45 minutes</option>
                                   <option value="60">60 minutes</option>
                                 </select>
                               </div>
                             </div>
                             <button 
                               onClick={() => {
                                 if (lessonTitle && lessonGrade && lessonDuration) {
                                   setGeneratedLesson({
                                     title: lessonTitle,
                                     grade: lessonGrade,
                                     duration: lessonDuration,
                                     objectives: [
                                       'Understand the formation of black holes',
                                       'Explain the concept of event horizon',
                                       'Describe the effects of extreme gravity'
                                     ],
                                     activities: [
                                       'Introduction video (10 min)',
                                       'Group discussion on gravity (15 min)',
                                       'Interactive simulation (20 min)',
                                       'Q&A and wrap-up (10 min)'
                                     ],
                                     materials: ['Projector', 'Computer', 'Worksheets', 'Online simulation access']
                                   });
                                 }
                               }}
                               disabled={!lessonTitle || !lessonGrade || !lessonDuration}
                               className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
                             >
                               Generate Lesson Plan
                             </button>
                           </div>
                         ) : (
                           <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                           >
                             <div className="bg-gray-800 rounded-lg p-6 mb-6">
                               <h3 className="text-2xl font-bold text-white mb-2">{generatedLesson.title}</h3>
                               <p className="text-gray-400">Grade: {generatedLesson.grade} • Duration: {generatedLesson.duration} min</p>
                             </div>
                             
                             <div className="space-y-6">
                               <div className="bg-gray-800 rounded-lg p-6">
                                 <h4 className="text-xl font-bold text-green-400 mb-3">Learning Objectives</h4>
                                 <ul className="list-disc list-inside text-gray-300 space-y-2">
                                   {generatedLesson.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                                 </ul>
                               </div>
                               
                               <div className="bg-gray-800 rounded-lg p-6">
                                 <h4 className="text-xl font-bold text-green-400 mb-3">Activities</h4>
                                 <ul className="space-y-2">
                                   {generatedLesson.activities.map((act, i) => (
                                     <li key={i} className="flex items-start gap-3 text-gray-300">
                                       <span className="text-green-400 font-bold">{i + 1}.</span>
                                       {act}
                                     </li>
                                   ))}
                                 </ul>
                               </div>
                               
                               <div className="bg-gray-800 rounded-lg p-6">
                                 <h4 className="text-xl font-bold text-green-400 mb-3">Materials Needed</h4>
                                 <div className="flex flex-wrap gap-2">
                                   {generatedLesson.materials.map((mat, i) => (
                                     <span key={i} className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm">
                                       {mat}
                                     </span>
                                   ))}
                                 </div>
                               </div>
                             </div>
                             
                             <div className="flex gap-4 mt-6">
                               <button 
                                 onClick={() => setGeneratedLesson(null)}
                                 className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
                               >
                                 Create New
                               </button>
                               <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition">
                                 Export PDF
                               </button>
                             </div>
                           </motion.div>
                         )}
                    </motion.div>
                </motion.div>
             )}
             </AnimatePresence>
             
             {/* Assignment Builder Modal */}
             <AnimatePresence>
             {selectedTool && selectedTool.type === 'assignment' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
                >
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: 'spring', damping: 20 }}
                      className="bg-gray-900 rounded-3xl border-2 border-green-500 max-w-3xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
                    >
                         <button onClick={() => setSelectedTool(null)} className="absolute top-4 right-4 text-white text-3xl hover:text-red-400 transition">×</button>
                         <div className="text-5xl mb-4">📋</div>
                         <h2 className="text-3xl font-bold text-green-400 mb-6">Assignment Builder</h2>
                         
                         {!generatedAssignment ? (
                           <div className="space-y-4">
                             <div>
                               <label className="block text-green-400 font-bold mb-2">Assignment Title</label>
                               <input 
                                 type="text" 
                                 value={assignmentTitle}
                                 onChange={(e) => setAssignmentTitle(e.target.value)}
                                 placeholder="e.g., Research Project on Mars"
                                 className="w-full bg-gray-800 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                               />
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                               <div>
                                 <label className="block text-green-400 font-bold mb-2">Type</label>
                                 <select 
                                   value={assignmentType}
                                   onChange={(e) => setAssignmentType(e.target.value)}
                                   className="w-full bg-gray-800 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                 >
                                   <option value="">Select type...</option>
                                   <option value="research">Research Project</option>
                                   <option value="presentation">Presentation</option>
                                   <option value="essay">Essay</option>
                                   <option value="lab">Lab Report</option>
                                 </select>
                               </div>
                               <div>
                                 <label className="block text-green-400 font-bold mb-2">Difficulty</label>
                                 <select 
                                   value={assignmentDifficulty}
                                   onChange={(e) => setAssignmentDifficulty(e.target.value)}
                                   className="w-full bg-gray-800 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                 >
                                   <option value="Easy">Easy</option>
                                   <option value="Medium">Medium</option>
                                   <option value="Hard">Hard</option>
                                 </select>
                               </div>
                             </div>
                             <div>
                               <label className="block text-green-400 font-bold mb-2">Due Date</label>
                               <input 
                                 type="date" 
                                 value={assignmentDueDate}
                                 onChange={(e) => setAssignmentDueDate(e.target.value)}
                                 className="w-full bg-gray-800 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                               />
                             </div>
                             <button 
                               onClick={() => {
                                 if (assignmentTitle && assignmentType && assignmentDueDate) {
                                   setGeneratedAssignment({
                                     title: assignmentTitle,
                                     type: assignmentType,
                                     difficulty: assignmentDifficulty,
                                     dueDate: assignmentDueDate,
                                     instructions: [
                                       'Research the topic using at least 3 credible sources',
                                       'Create a detailed outline before starting',
                                       'Include images, diagrams, or charts',
                                       'Cite all sources in MLA format'
                                     ],
                                     rubric: [
                                       { criteria: 'Content Quality', points: 40 },
                                       { criteria: 'Organization', points: 20 },
                                       { criteria: 'Research & Sources', points: 20 },
                                       { criteria: 'Presentation', points: 20 }
                                     ]
                                   });
                                 }
                               }}
                               disabled={!assignmentTitle || !assignmentType || !assignmentDueDate}
                               className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
                             >
                               Generate Assignment
                             </button>
                           </div>
                         ) : (
                           <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                           >
                             <div className="bg-gray-800 rounded-lg p-6 mb-6">
                               <h3 className="text-2xl font-bold text-white mb-2">{generatedAssignment.title}</h3>
                               <div className="flex gap-4 text-sm">
                                 <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full">{generatedAssignment.type}</span>
                                 <span className="bg-yellow-900 text-yellow-300 px-3 py-1 rounded-full">{generatedAssignment.difficulty}</span>
                                 <span className="bg-red-900 text-red-300 px-3 py-1 rounded-full">Due: {generatedAssignment.dueDate}</span>
                               </div>
                             </div>
                             
                             <div className="space-y-6">
                               <div className="bg-gray-800 rounded-lg p-6">
                                 <h4 className="text-xl font-bold text-green-400 mb-3">Instructions</h4>
                                 <ol className="space-y-2">
                                   {generatedAssignment.instructions.map((inst, i) => (
                                     <li key={i} className="flex items-start gap-3 text-gray-300">
                                       <span className="text-green-400 font-bold">{i + 1}.</span>
                                       {inst}
                                     </li>
                                   ))}
                                 </ol>
                               </div>
                               
                               <div className="bg-gray-800 rounded-lg p-6">
                                 <h4 className="text-xl font-bold text-green-400 mb-3">Grading Rubric</h4>
                                 <div className="space-y-3">
                                   {generatedAssignment.rubric.map((item, i) => (
                                     <div key={i} className="flex justify-between items-center bg-gray-900 p-3 rounded">
                                       <span className="text-gray-300">{item.criteria}</span>
                                       <span className="text-green-400 font-bold">{item.points} pts</span>
                                     </div>
                                   ))}
                                   <div className="flex justify-between items-center bg-green-900 p-3 rounded font-bold">
                                     <span className="text-white">Total</span>
                                     <span className="text-green-300">100 pts</span>
                                   </div>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="flex gap-4 mt-6">
                               <button 
                                 onClick={() => setGeneratedAssignment(null)}
                                 className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
                               >
                                 Create New
                               </button>
                               <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition">
                                 Send to Students
                               </button>
                             </div>
                           </motion.div>
                         )}
                    </motion.div>
                </motion.div>
             )}
             </AnimatePresence>
             
             {/* Progress Tracker Modal */}
             <AnimatePresence>
             {selectedTool && selectedTool.type === 'tracker' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
                >
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: 'spring', damping: 20 }}
                      className="bg-gray-900 rounded-3xl border-2 border-green-500 max-w-5xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
                    >
                         <button onClick={() => setSelectedTool(null)} className="absolute top-4 right-4 text-white text-3xl hover:text-red-400 transition">×</button>
                         <div className="text-5xl mb-4">📊</div>
                         <h2 className="text-3xl font-bold text-green-400 mb-6">Progress Tracker</h2>
                         
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                           <motion.div 
                             whileHover={{ scale: 1.05 }}
                             className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg p-6 text-center"
                           >
                             <div className="text-4xl font-bold text-white mb-2">{studentData.length}</div>
                             <div className="text-blue-200">Total Students</div>
                           </motion.div>
                           <motion.div 
                             whileHover={{ scale: 1.05 }}
                             className="bg-gradient-to-br from-green-900 to-green-700 rounded-lg p-6 text-center"
                           >
                             <div className="text-4xl font-bold text-white mb-2">
                               {Math.round(studentData.reduce((acc, s) => acc + s.score, 0) / studentData.length)}%
                             </div>
                             <div className="text-green-200">Class Average</div>
                           </motion.div>
                           <motion.div 
                             whileHover={{ scale: 1.05 }}
                             className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-lg p-6 text-center"
                           >
                             <div className="text-4xl font-bold text-white mb-2">
                               {studentData.reduce((acc, s) => acc + s.quizzes, 0)}
                             </div>
                             <div className="text-purple-200">Quizzes Completed</div>
                           </motion.div>
                         </div>
                         
                         <div className="bg-gray-800 rounded-lg p-6">
                           <h3 className="text-xl font-bold text-green-400 mb-4">Student Performance</h3>
                           <div className="space-y-4">
                             {studentData.map((student, i) => (
                               <motion.div 
                                 key={student.id}
                                 initial={{ opacity: 0, x: -20 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: i * 0.1 }}
                                 className="bg-gray-900 rounded-lg p-4"
                               >
                                 <div className="flex items-center justify-between mb-3">
                                   <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                       {student.name.charAt(0)}
                                     </div>
                                     <div>
                                       <div className="text-white font-bold">{student.name}</div>
                                       <div className="text-gray-400 text-sm">
                                         {student.quizzes} quizzes • {student.assignments} assignments
                                       </div>
                                     </div>
                                   </div>
                                   <div className="text-right">
                                     <div className="text-2xl font-bold text-green-400">{student.score}%</div>
                                   </div>
                                 </div>
                                 <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                                   <motion.div 
                                     initial={{ width: 0 }}
                                     animate={{ width: `${student.progress}%` }}
                                     transition={{ duration: 1, delay: i * 0.1 }}
                                     className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                                   />
                                 </div>
                               </motion.div>
                             ))}
                           </div>
                         </div>
                         
                         <button 
                           onClick={() => setSelectedTool(null)}
                           className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
                         >
                           Export Report
                         </button>
                    </motion.div>
                </motion.div>
             )}
             </AnimatePresence>
             
             {/* Quiz Maker Modal */}
             {selectedTool && selectedTool.type === 'quiz' && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-3xl border-2 border-green-500 max-w-4xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
                         <button onClick={() => { setSelectedTool(null); setQuizQuestions([]); setCurrentQuizStep('create'); }} className="absolute top-4 right-4 text-white text-3xl hover:text-red-400">×</button>
                         
                         {currentQuizStep === 'create' && (
                           <div>
                             <div className="text-5xl mb-4">❓</div>
                             <h2 className="text-3xl font-bold text-green-400 mb-6">Quiz Maker</h2>
                             
                             <div className="space-y-4 mb-6">
                               <div>
                                 <label className="block text-green-400 font-bold mb-2">Quiz Title</label>
                                 <input 
                                   type="text" 
                                   value={quizTitle}
                                   onChange={(e) => setQuizTitle(e.target.value)}
                                   placeholder="e.g., Solar System Quiz"
                                   className="w-full bg-gray-800 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                 />
                               </div>
                               
                               <div>
                                 <label className="block text-green-400 font-bold mb-2">Topic</label>
                                 <select 
                                   value={quizTopic}
                                   onChange={(e) => setQuizTopic(e.target.value)}
                                   className="w-full bg-gray-800 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                 >
                                   <option value="">Select a topic...</option>
                                   <option value="planets">Planets</option>
                                   <option value="galaxies">Galaxies</option>
                                   <option value="stars">Stars</option>
                                   <option value="blackholes">Black Holes</option>
                                   <option value="missions">Space Missions</option>
                                   <option value="scientists">Famous Scientists</option>
                                 </select>
                               </div>
                             </div>
                             
                             {/* Create Custom Question */}
                             <div className="bg-gray-800 rounded-lg p-6 mb-6">
                               <h3 className="text-xl font-bold text-green-400 mb-4">Create Custom Question</h3>
                               <div className="space-y-4">
                                 <div>
                                   <label className="block text-gray-300 mb-2">Question Type</label>
                                   <select 
                                     value={customType}
                                     onChange={(e) => {
                                       setCustomType(e.target.value);
                                       if (e.target.value === 'True/False') {
                                         setCustomAnswer('');
                                       }
                                       if (e.target.value === 'Multiple Choice') {
                                         setMcqOptions(['', '', '', '']);
                                       }
                                     }}
                                     className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                                   >
                                     <option value="Multiple Choice">Multiple Choice</option>
                                     <option value="True/False">True/False</option>
                                     <option value="Short Answer">Short Answer</option>
                                   </select>
                                 </div>
                                 
                                 <div>
                                   <label className="block text-gray-300 mb-2">Question</label>
                                   <input 
                                     type="text" 
                                     value={customQuestion}
                                     onChange={(e) => setCustomQuestion(e.target.value)}
                                     placeholder="Enter your question..."
                                     className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                                   />
                                 </div>
                                 
                                 {customType === 'Multiple Choice' && (
                                   <div>
                                     <label className="block text-gray-300 mb-2">Options (mark correct answer with *)</label>
                                     <div className="space-y-2">
                                       {mcqOptions.map((opt, idx) => (
                                         <div key={idx} className="flex items-center gap-2">
                                           <span className="text-gray-400 font-bold">{String.fromCharCode(65 + idx)}.</span>
                                           <input 
                                             type="text" 
                                             value={opt}
                                             onChange={(e) => {
                                               const newOpts = [...mcqOptions];
                                               newOpts[idx] = e.target.value;
                                               setMcqOptions(newOpts);
                                             }}
                                             placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                                             className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                                           />
                                           <button
                                             onClick={() => {
                                               setCustomAnswer(opt);
                                             }}
                                             className={`px-3 py-2 rounded ${customAnswer === opt ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'} hover:bg-green-700 transition`}
                                             title="Mark as correct"
                                           >
                                             ✓
                                           </button>
                                         </div>
                                       ))}
                                     </div>
                                     <p className="text-gray-400 text-sm mt-2">Click ✓ to mark the correct answer</p>
                                   </div>
                                 )}
                                 
                                 {customType === 'True/False' && (
                                   <div>
                                     <label className="block text-gray-300 mb-2">Correct Answer</label>
                                     <div className="flex gap-4">
                                       <button
                                         onClick={() => setCustomAnswer('True')}
                                         className={`flex-1 py-3 rounded-lg font-bold transition ${customAnswer === 'True' ? 'bg-green-600 text-white' : 'bg-gray-900 text-gray-400 border border-gray-700'}`}
                                       >
                                         True
                                       </button>
                                       <button
                                         onClick={() => setCustomAnswer('False')}
                                         className={`flex-1 py-3 rounded-lg font-bold transition ${customAnswer === 'False' ? 'bg-green-600 text-white' : 'bg-gray-900 text-gray-400 border border-gray-700'}`}
                                       >
                                         False
                                       </button>
                                     </div>
                                   </div>
                                 )}
                                 
                                 {customType === 'Short Answer' && (
                                   <div>
                                     <label className="block text-gray-300 mb-2">Correct Answer</label>
                                     <input 
                                       type="text" 
                                       value={customAnswer}
                                       onChange={(e) => setCustomAnswer(e.target.value)}
                                       placeholder="Enter the correct answer..."
                                       className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                                     />
                                   </div>
                                 )}
                                 
                                 <button 
                                   onClick={() => {
                                     if (customQuestion && customAnswer) {
                                       const newQuestion = { 
                                         q: customQuestion, 
                                         a: customAnswer, 
                                         type: customType 
                                       };
                                       if (customType === 'Multiple Choice') {
                                         newQuestion.options = mcqOptions.filter(o => o.trim() !== '');
                                       }
                                       setQuizQuestions([...quizQuestions, newQuestion]);
                                       setCustomQuestion('');
                                       setCustomAnswer('');
                                       setMcqOptions(['', '', '', '']);
                                     }
                                   }}
                                   disabled={!customQuestion || !customAnswer || (customType === 'Multiple Choice' && mcqOptions.filter(o => o.trim() !== '').length < 2)}
                                   className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition"
                                 >
                                   Add Custom Question
                                 </button>
                               </div>
                             </div>
                             
                             {/* Suggested Questions */}
                             <div className="bg-gray-800 rounded-lg p-6 mb-6">
                               <h3 className="text-xl font-bold text-green-400 mb-4">
                                 Suggested Questions {quizTopic && `- ${quizTopic.charAt(0).toUpperCase() + quizTopic.slice(1)}`}
                               </h3>
                               {!quizTopic ? (
                                 <p className="text-gray-400 text-center py-4">Select a topic above to see suggested questions</p>
                               ) : (
                                 <div className="space-y-3">
                                   {(suggestedQuestions[quizTopic] || []).map((sq, i) => (
                                     <div key={i} className="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-green-500 transition">
                                       <div className="flex justify-between items-start mb-2">
                                         <p className="text-white flex-1">{sq.q}</p>
                                         <button 
                                           onClick={() => setQuizQuestions([...quizQuestions, sq])}
                                           className="ml-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-shrink-0"
                                         >
                                           Add
                                         </button>
                                       </div>
                                       <p className="text-gray-400 text-sm">Answer: {sq.a}</p>
                                       <span className="inline-block mt-2 bg-green-900 text-green-300 px-2 py-1 rounded text-xs">{sq.type}</span>
                                     </div>
                                   ))}
                                 </div>
                               )}
                             </div>
                             
                             <div className="bg-gray-800 rounded-lg p-6 mb-6">
                               <h3 className="text-xl font-bold text-green-400 mb-4">Your Questions ({quizQuestions.length})</h3>
                               {quizQuestions.length === 0 ? (
                                 <p className="text-gray-400 text-center py-4">No questions added yet. Add from suggestions above or create custom ones.</p>
                               ) : (
                                 <div className="space-y-3">
                                   {quizQuestions.map((q, i) => (
                                     <div key={i} className="bg-gray-900 p-4 rounded-lg border border-green-500 flex justify-between items-start">
                                       <div className="flex-1">
                                         <p className="text-white mb-1">{i + 1}. {q.q}</p>
                                         <p className="text-gray-400 text-sm">Answer: {q.a}</p>
                                       </div>
                                       <button 
                                         onClick={() => setQuizQuestions(quizQuestions.filter((_, idx) => idx !== i))}
                                         className="ml-4 text-red-400 hover:text-red-300"
                                       >
                                         Remove
                                       </button>
                                     </div>
                                   ))}
                                 </div>
                               )}
                             </div>
                             
                             <div className="flex gap-4">
                               <button 
                                 onClick={() => setCurrentQuizStep('preview')}
                                 disabled={quizQuestions.length === 0 || !quizTitle}
                                 className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
                               >
                                 Preview Quiz
                               </button>
                             </div>
                           </div>
                         )}
                         
                         {currentQuizStep === 'preview' && (
                           <div>
                             <h2 className="text-3xl font-bold text-green-400 mb-2">{quizTitle}</h2>
                             <p className="text-gray-400 mb-6">Topic: {quizTopic || 'General'} • {quizQuestions.length} Questions</p>
                             
                             <div className="space-y-6 mb-6">
                               {quizQuestions.map((q, i) => (
                                 <div key={i} className="bg-gray-800 p-6 rounded-lg border border-green-500">
                                   <p className="text-white font-bold mb-3">Question {i + 1}: {q.q}</p>
                                   <div className="bg-gray-900 p-4 rounded">
                                     <p className="text-green-400">✓ Correct Answer: {q.a}</p>
                                   </div>
                                   <span className="inline-block mt-3 bg-green-900 text-green-300 px-3 py-1 rounded text-sm">{q.type}</span>
                                 </div>
                               ))}
                             </div>
                             
                             <div className="flex gap-4">
                               <button 
                                 onClick={() => setCurrentQuizStep('create')}
                                 className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
                               >
                                 ← Back to Edit
                               </button>
                               <button 
                                 onClick={() => setCurrentQuizStep('sent')}
                                 className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
                               >
                                 Send to Students 📤
                               </button>
                             </div>
                           </div>
                         )}
                         
                         {currentQuizStep === 'sent' && (
                           <div className="text-center py-12">
                             <div className="text-7xl mb-6">✅</div>
                             <h2 className="text-3xl font-bold text-green-400 mb-4">Quiz Sent Successfully!</h2>
                             <p className="text-gray-300 mb-2">"{quizTitle}" has been sent to your students.</p>
                             <p className="text-gray-400 mb-8">{quizQuestions.length} questions • Topic: {quizTopic || 'General'}</p>
                             <div className="bg-gray-800 rounded-lg p-6 mb-8 max-w-md mx-auto">
                               <h3 className="text-green-400 font-bold mb-3">Quiz Link (Demo)</h3>
                               <div className="bg-gray-900 p-3 rounded border border-green-500 text-green-300 font-mono text-sm break-all mb-4">
                                 https://space-edu.com/quiz/{generatedQuizLink || Math.random().toString(36).substr(2, 9)}
                               </div>
                               <button
                                 onClick={() => { 
                                   setCurrentQuizStep('student-view'); 
                                   setStudentAnswers({});
                                   setQuizSubmitted(false);
                                 }}
                                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                               >
                                 👁️ Preview Student View
                               </button>
                             </div>
                             <button 
                               onClick={() => { setCurrentQuizStep('create'); setQuizQuestions([]); setQuizTitle(''); setQuizTopic(''); }}
                               className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition"
                             >
                               Create Another Quiz
                             </button>
                           </div>
                         )}
                         
                         {currentQuizStep === 'student-view' && (
                           <div>
                             {!quizSubmitted ? (
                               <div>
                                 <div className="text-center mb-8">
                                   <h2 className="text-3xl font-bold text-green-400 mb-2">{quizTitle}</h2>
                                   <p className="text-gray-400">Topic: {quizTopic || 'General'} • {quizQuestions.length} Questions</p>
                                   <p className="text-yellow-400 text-sm mt-2">📝 Student View - Answer all questions and submit</p>
                                 </div>
                                 
                                 <div className="space-y-6 mb-8">
                                   {quizQuestions.map((q, i) => (
                                     <div key={i} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                                       <p className="text-white font-bold mb-4">Question {i + 1}: {q.q}</p>
                                       
                                       {q.type === 'Multiple Choice' && q.options && (
                                         <div className="space-y-2">
                                           {q.options.map((opt, optIdx) => (
                                             <button
                                               key={optIdx}
                                               onClick={() => setStudentAnswers({...studentAnswers, [i]: opt})}
                                               className={`w-full text-left p-3 rounded-lg border transition ${
                                                 studentAnswers[i] === opt 
                                                   ? 'bg-green-900 border-green-500 text-white' 
                                                   : 'bg-gray-900 border-gray-600 text-gray-300 hover:border-green-500'
                                               }`}
                                             >
                                               <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                                               {opt}
                                             </button>
                                           ))}
                                         </div>
                                       )}
                                       
                                       {q.type === 'True/False' && (
                                         <div className="flex gap-4">
                                           <button
                                             onClick={() => setStudentAnswers({...studentAnswers, [i]: 'True'})}
                                             className={`flex-1 py-3 rounded-lg font-bold transition ${
                                               studentAnswers[i] === 'True'
                                                 ? 'bg-green-900 border-2 border-green-500 text-white'
                                                 : 'bg-gray-900 border border-gray-600 text-gray-300 hover:border-green-500'
                                             }`}
                                           >
                                             True
                                           </button>
                                           <button
                                             onClick={() => setStudentAnswers({...studentAnswers, [i]: 'False'})}
                                             className={`flex-1 py-3 rounded-lg font-bold transition ${
                                               studentAnswers[i] === 'False'
                                                 ? 'bg-green-900 border-2 border-green-500 text-white'
                                                 : 'bg-gray-900 border border-gray-600 text-gray-300 hover:border-green-500'
                                             }`}
                                           >
                                             False
                                           </button>
                                         </div>
                                       )}
                                       
                                       {q.type === 'Short Answer' && (
                                         <input
                                           type="text"
                                           value={studentAnswers[i] || ''}
                                           onChange={(e) => setStudentAnswers({...studentAnswers, [i]: e.target.value})}
                                           placeholder="Type your answer here..."
                                           className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                         />
                                       )}
                                     </div>
                                   ))}
                                 </div>
                                 
                                 <div className="flex gap-4">
                                   <button
                                     onClick={() => setCurrentQuizStep('sent')}
                                     className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
                                   >
                                     ← Back
                                   </button>
                                   <button
                                     onClick={() => setQuizSubmitted(true)}
                                     disabled={Object.keys(studentAnswers).length < quizQuestions.length}
                                     className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
                                   >
                                     Submit Quiz
                                   </button>
                                 </div>
                               </div>
                             ) : (
                               <div>
                                 <div className="text-center mb-8">
                                   <div className="text-7xl mb-4">🎉</div>
                                   <h2 className="text-3xl font-bold text-green-400 mb-2">Quiz Submitted!</h2>
                                   <p className="text-gray-300 mb-6">Here are your results:</p>
                                 </div>
                                 
                                 <div className="space-y-6 mb-8">
                                   {quizQuestions.map((q, i) => {
                                     const isCorrect = studentAnswers[i] === q.a;
                                     return (
                                       <div key={i} className={`bg-gray-800 p-6 rounded-lg border-2 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                                         <div className="flex items-start justify-between mb-3">
                                           <p className="text-white font-bold flex-1">Question {i + 1}: {q.q}</p>
                                           <span className={`text-2xl ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                             {isCorrect ? '✓' : '✗'}
                                           </span>
                                         </div>
                                         <div className="bg-gray-900 p-4 rounded space-y-2">
                                           <p className="text-gray-300">
                                             <span className="font-bold">Your Answer:</span> {studentAnswers[i] || 'No answer'}
                                           </p>
                                           {!isCorrect && (
                                             <p className="text-green-400">
                                               <span className="font-bold">Correct Answer:</span> {q.a}
                                             </p>
                                           )}
                                         </div>
                                       </div>
                                     );
                                   })}
                                 </div>
                                 
                                 <div className="bg-green-900 border-2 border-green-500 rounded-lg p-6 text-center mb-6">
                                   <h3 className="text-2xl font-bold text-white mb-2">
                                     Score: {Object.keys(studentAnswers).filter((k) => studentAnswers[k] === quizQuestions[k].a).length} / {quizQuestions.length}
                                   </h3>
                                   <p className="text-green-300">
                                     {Math.round((Object.keys(studentAnswers).filter((k) => studentAnswers[k] === quizQuestions[k].a).length / quizQuestions.length) * 100)}%
                                   </p>
                                 </div>
                                 
                                 <button
                                   onClick={() => setCurrentQuizStep('sent')}
                                   className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
                                 >
                                   Back to Quiz Info
                                 </button>
                               </div>
                             )}
                           </div>
                         )}
                    </div>
                </div>
             )}
        </div>
      )}

      {/* MISSION CONTROL - MODERN VERSION */}
      {currentSection === 'missions' && (
        <ModernMissionControl />
      )}

      {/* HELP CENTER */}
      {currentSection === 'help' && (
        <HelpCenter onBack={() => setCurrentSection('home')} />
      )}
    </div>
  );
};

export default App;