import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AssignmentBuilderDemo = ({ onBack }) => {
  const [assignment, setAssignment] = useState({
    title: '',
    description: '',
    instructions: '',
    dueDate: '',
    totalPoints: ''
  });
  const [shareLink, setShareLink] = useState('');
  const [showLinkModal, setShowLinkModal] = useState(false);

  const generateShareLink = () => {
    const assignmentId = Math.random().toString(36).substring(7);
    const link = `${window.location.origin}/assignment/${assignmentId}`;
    setShareLink(link);
    setShowLinkModal(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('✅ Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <button onClick={onBack} className="text-green-400 hover:text-green-300 mb-4">← Back</button>
            <h1 className="text-5xl font-bold text-green-400 mb-2">📋 Assignment Builder</h1>
            <p className="text-gray-400">Create and share assignments with students</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={generateShareLink}
            className="glass-strong px-6 py-3 rounded-xl text-white font-bold border-2 border-green-500"
          >
            🔗 Generate Link
          </motion.button>
        </div>

        <div className="space-y-6">
          <div className="glass-strong rounded-2xl p-6 border border-green-500/30">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Assignment Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Title *</label>
                <input
                  type="text"
                  value={assignment.title}
                  onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                  placeholder="e.g., Solar System Research Project"
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  value={assignment.description}
                  onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
                  placeholder="Brief description of the assignment"
                  rows="3"
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Instructions</label>
                <textarea
                  value={assignment.instructions}
                  onChange={(e) => setAssignment({ ...assignment, instructions: e.target.value })}
                  placeholder="Detailed instructions for students"
                  rows="5"
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={assignment.dueDate}
                    onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Total Points</label>
                  <input
                    type="number"
                    value={assignment.totalPoints}
                    onChange={(e) => setAssignment({ ...assignment, totalPoints: e.target.value })}
                    placeholder="e.g., 100"
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-6 border border-yellow-500/30 bg-yellow-900/10">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">🚀 Coming in Full Version:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300 text-sm">
              <li>✓ File attachments</li>
              <li>✓ Student submissions</li>
              <li>✓ Grading interface</li>
              <li>✓ Feedback system</li>
              <li>✓ Submission tracking</li>
              <li>✓ Late submission alerts</li>
            </ul>
          </div>
        </div>
      </div>

      {showLinkModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-strong rounded-2xl p-8 max-w-2xl w-full border-2 border-green-500"
          >
            <h2 className="text-3xl font-bold text-green-400 mb-4">🎉 Assignment Link Generated!</h2>
            <div className="bg-black/50 border border-green-500/30 rounded-lg p-4 mb-6 flex items-center justify-between">
              <code className="text-green-400 text-sm break-all">{shareLink}</code>
              <button onClick={copyLink} className="ml-4 px-4 py-2 bg-green-600 rounded-lg font-bold">
                📋 Copy
              </button>
            </div>
            <button
              onClick={() => setShowLinkModal(false)}
              className="w-full px-6 py-3 bg-green-600 rounded-xl text-white font-bold"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AssignmentBuilderDemo;
