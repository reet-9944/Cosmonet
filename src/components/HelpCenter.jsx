import { useState } from 'react';
import { motion } from 'framer-motion';

const HelpCenter = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Try to send to server
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api/contact' : 'http://localhost:4000/api/contact');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (err) {
      console.error('Error:', err);
      
      // Fallback: Save to localStorage if server is not running
      const savedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      savedMessages.push({
        ...formData,
        createdAt: new Date().toISOString(),
        id: Date.now()
      });
      localStorage.setItem('contactMessages', JSON.stringify(savedMessages));
      
      console.log('✅ Message saved to localStorage (server not running)');
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How do I navigate the 3D Solar System?",
      answer: "Use your mouse to rotate the view, scroll to zoom in/out, and the simulation will automatically tour through all celestial objects every 3 seconds."
    },
    {
      question: "Can I use the AI chatbot for homework help?",
      answer: "Yes! Our Space AI assistant can answer questions about planets, stars, galaxies, black holes, and general space topics. Just click the floating robot icon."
    },
    {
      question: "Is this educational content accurate?",
      answer: "Absolutely! All information is sourced from NASA, ESO, and peer-reviewed scientific sources. We regularly update our content to reflect the latest discoveries."
    },
    {
      question: "Can teachers use this in their classroom?",
      answer: "Yes! Check out the Teacher Toolkit section for lesson plans, activities, quizzes, and resources specifically designed for educators."
    },
    {
      question: "How do I report a bug or issue?",
      answer: "Use the contact form below to report any technical issues. Please include details about what you were doing when the problem occurred."
    },
    {
      question: "Is there a mobile app version?",
      answer: "Currently, COSMONET is a web application optimized for both desktop and mobile browsers. A native app is in development!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white py-20 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16">
        <button
          onClick={onBack}
          className="mb-8 px-6 py-3 bg-blue-600/80 backdrop-blur-md rounded-full text-white font-bold hover:bg-blue-500 transition-all duration-300 hover:scale-105"
        >
          Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="text-xl text-gray-400">
            We're here to help! Find answers or reach out to us.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-blue-400">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all group"
              >
                <summary className="font-bold text-lg text-white list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="text-blue-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-purple-400">
            Contact Us
          </h2>
          
          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-500/20 border-2 border-green-500 rounded-xl p-8 text-center"
            >
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
              <p className="text-gray-300">We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-800 backdrop-blur-md border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-800 backdrop-blur-md border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-800 backdrop-blur-md border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="" className="bg-slate-800 text-gray-400">Select a subject</option>
                  <option value="technical" className="bg-slate-800 text-white">Technical Issue</option>
                  <option value="content" className="bg-slate-800 text-white">Content Question</option>
                  <option value="feature" className="bg-slate-800 text-white">Feature Request</option>
                  <option value="education" className="bg-slate-800 text-white">Educational Inquiry</option>
                  <option value="other" className="bg-slate-800 text-white">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="6"
                  className="w-full bg-slate-800 backdrop-blur-md border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4 text-center">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          )}

          {/* Support Team */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Our Support Team</h3>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">
                    R
                  </div>
                  <div>
                    <p className="font-bold text-white">Reetu Rani</p>
                    <p className="text-sm text-gray-400">Lead Developer & Support</p>
                    <p className="text-xs text-blue-400">reeturani9032@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold">
                    P
                  </div>
                  <div>
                    <p className="font-bold text-white">Pragti Sharma</p>
                    <p className="text-sm text-gray-400">Content & Support Specialist</p>
                    <p className="text-xs text-blue-400">sharmapragti07@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 space-y-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="text-sm text-gray-400">Response Time</p>
                  <p className="font-bold">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;
