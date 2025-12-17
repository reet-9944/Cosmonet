import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProtectedFeature from './ProtectedFeature';

const ToolCard = ({ tool, index, onClick, isAuthenticated, onLoginRequired }) => {
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
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="text-8xl"
          >
            {tool.icon}
          </motion.div>
          <h3 className="text-5xl font-bold text-white">{tool.title}</h3>
          <p className="text-xl text-gray-300 leading-relaxed">{tool.details}</p>
          <div className="flex flex-wrap gap-3">
            {tool.features.map((feature, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="glass-green px-4 py-2 rounded-full text-green-300 text-sm font-medium"
              >
                ✓ {feature}
              </motion.span>
            ))}
          </div>
          <ProtectedFeature
            onLoginRequired={onLoginRequired}
            showLockIcon={!isAuthenticated}
            lockMessage="🔒 Login Required to Use This Tool"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onClick(tool)}
              className="glass-strong px-8 py-4 rounded-2xl text-white font-bold text-lg hover:bg-green-600/20 transition-all duration-300 border-2 border-green-500 flex items-center gap-2"
            >
              <span>Launch {tool.title}</span>
              {!isAuthenticated && <span>🔒</span>}
              <span>→</span>
            </motion.button>
          </ProtectedFeature>
        </motion.div>

        {/* Visual Side */}
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
                  'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0"
            />
            
            {/* Content preview */}
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-6xl">{tool.icon}</div>
                <div className="glass px-4 py-2 rounded-full text-green-400 text-sm font-bold">
                  {tool.type.toUpperCase()}
                </div>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={inView ? { width: '100%' } : {}}
                    transition={{ duration: 1, delay: 0.8 + i * 0.2 }}
                    className="glass h-4 rounded-full overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="h-full w-1/3 bg-gradient-to-r from-transparent via-green-500 to-transparent"
                    />
                  </motion.div>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="glass aspect-square rounded-2xl flex items-center justify-center text-3xl"
                  >
                    {['📊', '✏️', '🎯'][i - 1]}
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

const ModernTeacherToolkit = ({ tools, onToolSelect, isAuthenticated, onLoginRequired }) => {
  const [headerRef, headerInView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%'
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
              '0 0 20px rgba(34, 197, 94, 0.5)',
              '0 0 40px rgba(34, 197, 94, 0.8)',
              '0 0 20px rgba(34, 197, 94, 0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 mb-6"
        >
          Teacher Toolkit
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-2xl text-gray-400 max-w-3xl mx-auto"
        >
          Empower your teaching with AI-powered tools designed for the modern classroom
        </motion.p>
      </motion.div>

      {/* Tool Cards */}
      <div className="relative z-10">
        {tools.map((tool, index) => (
          <ToolCard
            key={index}
            tool={tool}
            index={index}
            onClick={onToolSelect}
            isAuthenticated={isAuthenticated}
            onLoginRequired={onLoginRequired}
          />
        ))}
      </div>

      {/* Additional Sections */}
      <ExtraActivities />
    </div>
  );
};

const ExtraActivities = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = [
    { 
      icon: '🔬', 
      title: 'Virtual Lab', 
      desc: 'Interactive science experiments',
      fullDesc: 'Conduct safe, virtual science experiments exploring physics, chemistry, and astronomy. Students can manipulate variables, observe reactions, and learn through hands-on digital experiences.',
      features: [
        'Physics simulations (gravity, motion, forces)',
        'Chemistry experiments (reactions, elements)',
        'Astronomy observations (star life cycles)',
        'Safe environment for dangerous experiments',
        'Real-time data collection and analysis'
      ]
    },
    { 
      icon: '🎮', 
      title: 'Space Simulations', 
      desc: 'Explore the universe in 3D',
      fullDesc: 'Immersive 3D simulations let students explore planets, galaxies, and cosmic phenomena. Navigate through the solar system, witness black holes, and understand astronomical scales.',
      features: [
        'Interactive 3D solar system tour',
        'Black hole and galaxy visualizations',
        'Planetary surface exploration',
        'Scale demonstrations (Earth to universe)',
        'Real NASA data integration'
      ]
    },
    { 
      icon: '📚', 
      title: 'Resource Library', 
      desc: 'Curated teaching materials',
      fullDesc: 'Access thousands of curated teaching resources including lesson plans, worksheets, videos, and assessments. All materials are aligned with educational standards.',
      features: [
        'Lesson plans for all grade levels',
        'Printable worksheets and activities',
        'Educational videos and animations',
        'Assessment tools and quizzes',
        'Standards-aligned curriculum'
      ]
    },
    { 
      icon: '🏆', 
      title: 'Student Challenges', 
      desc: 'Gamified learning activities',
      fullDesc: 'Engage students with gamified challenges, competitions, and achievements. Track progress, earn badges, and compete with classmates in space-themed learning activities.',
      features: [
        'Weekly space trivia challenges',
        'Mission-based learning quests',
        'Achievement badges and rewards',
        'Leaderboards and class competitions',
        'Progress tracking and analytics'
      ]
    },
    { 
      icon: '🎨', 
      title: 'Creative Projects', 
      desc: 'Art meets astronomy',
      fullDesc: 'Combine creativity with science through art projects inspired by space. Students create constellation art, design spacecraft, and visualize cosmic phenomena.',
      features: [
        'Constellation art and mythology',
        'Spacecraft design challenges',
        'Planet poster projects',
        'Space photography editing',
        'Digital art tools and templates'
      ]
    },
    { 
      icon: '🌍', 
      title: 'Global Classroom', 
      desc: 'Connect with other schools',
      fullDesc: 'Connect your classroom with students worldwide. Collaborate on projects, share discoveries, and participate in global space education initiatives.',
      features: [
        'Connect with schools globally',
        'Collaborative space projects',
        'Virtual field trips together',
        'Cultural exchange programs',
        'Live expert Q&A sessions'
      ]
    }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="py-32 px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-6xl font-bold text-center text-white mb-20"
      >
        Extracurricular Activities
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, rotateY: -20 }}
            animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              boxShadow: '0 20px 60px rgba(34, 197, 94, 0.3)'
            }}
            onClick={() => setSelectedActivity(activity)}
            className="glass-strong rounded-3xl p-8 cursor-pointer group"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="text-6xl mb-4"
            >
              {activity.icon}
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
              {activity.title}
            </h3>
            <p className="text-gray-400">{activity.desc}</p>
            
            <motion.div
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-4"
            />
          </motion.div>
        ))}
      </div>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-y-auto border-2 border-green-500/30 shadow-2xl"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{selectedActivity.icon}</div>
                    <div>
                      <h3 className="text-4xl font-bold text-white">{selectedActivity.title}</h3>
                      <p className="text-green-400">{selectedActivity.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="text-white hover:text-red-400 text-3xl transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {selectedActivity.fullDesc}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xl font-bold text-white mb-4">Key Features:</h4>
                  {selectedActivity.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 glass-green p-4 rounded-xl"
                    >
                      <span className="text-green-400 text-xl">✓</span>
                      <span className="text-gray-200">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transition-all"
                >
                  Get Started with {selectedActivity.title} →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ModernTeacherToolkit;
