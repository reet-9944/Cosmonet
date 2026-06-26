import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpaceAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Real AI using multiple APIs with fallback
  const getAIResponse = async (userInput) => {
    // Try Cohere Coral (Command R) API
    try {
      const apiKey = import.meta.env.VITE_COHERE_API_KEY;
      if (apiKey) {
        const response = await fetch("https://api.cohere.ai/v1/chat", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            message: userInput,
            model: "command-r",
            preamble: "You are a knowledgeable and friendly space expert AI assistant. Provide accurate, engaging information about space, astronomy, planets, stars, galaxies, and the universe. Keep responses concise (2-3 sentences) and educational."
          })
        });

        if (response.ok) {
          const data = await response.json();
          return data.text || fallbackResponse(userInput);
        } else {
          console.error("Cohere API Error:", await response.text());
        }
      } else {
        console.warn("No VITE_COHERE_API_KEY found, using local fallback");
      }
    } catch (error) {
      console.log("Cohere Coral failed, using fallback");
    }

    // Fallback to local knowledge base
    return fallbackResponse(userInput);
  };

  const fallbackResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Earth
    if (input.includes('earth')) {
      return "Earth is our home planet! It's the only known planet with life, has 71% water coverage, and is protected by a magnetic field. Earth orbits the Sun at 107,000 km/h and completes one rotation every 24 hours. 🌍";
    }
    
    // Planets
    if (input.includes('mercury')) return "Mercury is the smallest planet and closest to the Sun! It has extreme temperature swings from 430°C during day to -180°C at night. One day on Mercury lasts 59 Earth days! ☄️";
    if (input.includes('venus')) return "Venus is the hottest planet with surface temperatures of 465°C! Its thick atmosphere creates a runaway greenhouse effect. Venus rotates backwards compared to other planets! 🔥";
    if (input.includes('mars')) return "Mars is the Red Planet due to iron oxide (rust) on its surface! It has the largest volcano (Olympus Mons) and canyon (Valles Marineris) in the solar system. NASA is planning human missions to Mars! 🔴";
    if (input.includes('jupiter')) return "Jupiter is the largest planet, so big that 1,300 Earths could fit inside! Its Great Red Spot is a storm larger than Earth that's been raging for 400+ years. Jupiter has 95 known moons! 🪐";
    if (input.includes('saturn')) return "Saturn is famous for its stunning ring system made of ice and rock! It's the least dense planet - it would float in water! Saturn has 146 known moons, including Titan which has lakes of liquid methane! 💫";
    if (input.includes('uranus')) return "Uranus is an ice giant that rotates on its side! It appears blue-green due to methane in its atmosphere. Uranus has 13 faint rings and 27 known moons! ❄️";
    if (input.includes('neptune')) return "Neptune is the windiest planet with speeds up to 2,100 km/h! It's the farthest planet from the Sun and appears deep blue. Neptune has a Great Dark Spot similar to Jupiter's Great Red Spot! 🌊";
    if (input.includes('pluto')) return "Pluto is a dwarf planet in the Kuiper Belt! It has a heart-shaped glacier and five moons. New Horizons spacecraft revealed Pluto has blue skies and water ice mountains! 💙";
    
    // General topics
    if (input.includes('planet')) return "Our solar system has 8 planets! Mercury, Venus, Earth, Mars (rocky planets), Jupiter, Saturn, Uranus, Neptune (gas/ice giants). Each has unique characteristics like Jupiter's Great Red Spot or Saturn's rings! 🪐";
    if (input.includes('sun')) return "The Sun is a medium-sized star that's 4.6 billion years old! It's so large that 1.3 million Earths could fit inside. The Sun's core temperature is 15 million°C, and it converts 4 million tons of matter into energy every second! ☀️";
    if (input.includes('star')) return "Stars are massive balls of burning gas powered by nuclear fusion! Our Sun is a medium-sized star. The largest stars can be 1,000 times bigger! Stars are born in nebulae and eventually die, sometimes exploding as supernovas. ⭐";
    if (input.includes('black hole')) return "Black holes have gravity so strong that nothing, not even light, can escape! They form when massive stars collapse. The closest black hole to Earth is about 1,000 light-years away. The largest black holes are billions of times the Sun's mass! 🕳️";
    if (input.includes('galaxy')) return "A galaxy is a huge collection of stars, gas, and dust held together by gravity. Our Milky Way galaxy contains over 200 billion stars! The nearest major galaxy is Andromeda, 2.5 million light-years away and approaching us! 🌌";
    if (input.includes('moon')) return "The Moon is Earth's only natural satellite, about 384,400 km away! It takes 27.3 days to orbit Earth. The same side always faces us due to tidal locking. Humans first landed on the Moon in 1969 during Apollo 11! 🌙";
    if (input.includes('comet')) return "Comets are icy bodies that release gas and dust, forming beautiful tails when near the Sun! Halley's Comet visits Earth every 75-76 years. They're like cosmic snowballs traveling through space from the outer solar system! ☄️";
    if (input.includes('asteroid')) return "Asteroids are rocky objects orbiting the Sun, mostly found in the asteroid belt between Mars and Jupiter! Some are as small as pebbles, others as large as mountains. About 65 million years ago, an asteroid impact caused the dinosaur extinction! 🪨";
    if (input.includes('universe')) return "The universe is everything that exists - all matter, energy, space, and time! It's about 13.8 billion years old and constantly expanding. It contains billions of galaxies, each with billions of stars! The observable universe is 93 billion light-years across! 🌠";
    if (input.includes('space station') || input.includes('iss')) return "The International Space Station (ISS) orbits Earth at 408 km altitude, traveling at 28,000 km/h! It completes one orbit every 90 minutes. Astronauts have continuously lived on the ISS since 2000! 🛰️";
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) return "Hello! I'm your Space AI Assistant! 👋 Ask me anything about planets, stars, galaxies, black holes, or the universe!";
    if (input.includes('help') || input.includes('what can you')) return "I can tell you about: planets (Mercury to Neptune), stars, black holes, galaxies, the Moon, Mars, comets, asteroids, the Sun, and the universe! Just ask me anything about space! 🚀";
    
    return `Great question about "${userInput}"! 🌟 I'm here to help you explore space! Try asking me about specific planets (like Mars or Jupiter), stars, black holes, galaxies, or the universe!`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await getAIResponse(input);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-8 z-50 w-96 h-[500px] bg-slate-900/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 flex flex-col overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 58, 138, 0.5) 50%, rgba(15, 23, 42, 0.7) 100%)',
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-md p-4 flex items-center gap-3 border-b border-white/10">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm border border-white/30">
                🤖
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Space AI</h3>
                <p className="text-blue-100 text-xs">Your Personal Assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-transparent">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-8">
                  <p className="text-4xl mb-2">🚀</p>
                  <p className="text-sm">Ask me anything about space!</p>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl backdrop-blur-md ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-white border border-white/20' 
                      : 'bg-slate-800/60 text-gray-100 border border-white/20'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/60 backdrop-blur-md border border-white/20 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-900/60 backdrop-blur-xl border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about the universe..."
                  className="flex-1 bg-slate-800/50 backdrop-blur-md text-white px-4 py-3 rounded-full border border-white/20 focus:outline-none focus:border-blue-400 focus:bg-slate-800/70 placeholder-gray-400 transition-all"
                />
                <button
                  onClick={handleSend}
                  className="bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 hover:from-blue-500 hover:to-purple-500 transition-all border border-white/20"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpaceAI;
