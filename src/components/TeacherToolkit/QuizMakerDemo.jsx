import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuizMakerDemo = ({ onBack }) => {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    timeLimit: '',
    passingScore: '',
    questions: [{ question: '', type: 'multiple-choice', options: ['', '', '', ''], correctAnswer: 0 }]
  });
  const [shareLink, setShareLink] = useState('');
  const [showLinkModal, setShowLinkModal] = useState(false);

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { question: '', type: 'multiple-choice', options: ['', '', '', ''], correctAnswer: 0 }]
    });
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const updateOption = (qIndex, oIndex, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const generateShareLink = () => {
    const quizId = Math.random().toString(36).substring(7);
    const link = `${window.location.origin}/quiz/${quizId}`;
    setShareLink(link);
    setShowLinkModal(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('✅ Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button onClick={onBack} className="text-green-400 hover:text-green-300 mb-4">← Back</button>
            <h1 className="text-5xl font-bold text-green-400 mb-2">📝 Quiz Maker</h1>
            <p className="text-gray-400">Create engaging quizzes and share with students</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateShareLink}
            className="glass-strong px-6 py-3 rounded-xl text-white font-bold border-2 border-green-500"
          >
            🔗 Generate Share Link
          </motion.button>
        </div>

        {/* Quiz Info */}
        <div className="glass-strong rounded-2xl p-6 border border-green-500/30 mb-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Quiz Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Quiz Title *</label>
              <input
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                placeholder="e.g., Solar System Quiz"
                className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea
                value={quiz.description}
                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                placeholder="Brief description of the quiz"
                rows="2"
                className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Time Limit (minutes)</label>
              <input
                type="number"
                value={quiz.timeLimit}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })}
                placeholder="e.g., 30"
                className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Passing Score (%)</label>
              <input
                type="number"
                value={quiz.passingScore}
                onChange={(e) => setQuiz({ ...quiz, passingScore: e.target.value })}
                placeholder="e.g., 70"
                className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {quiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="glass-strong rounded-2xl p-6 border border-green-500/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Question {qIndex + 1}</h3>
                <select
                  value={q.type}
                  onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                  className="bg-black/50 border border-green-500/30 rounded-lg px-4 py-2 text-white"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="short-answer">Short Answer</option>
                </select>
              </div>

              <input
                type="text"
                value={q.question}
                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                placeholder="Enter your question"
                className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white mb-4"
              />

              {q.type === 'multiple-choice' && (
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={q.correctAnswer === oIndex}
                        onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                        className="w-5 h-5"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                        placeholder={`Option ${oIndex + 1}`}
                        className="flex-1 bg-black/50 border border-green-500/30 rounded-lg px-4 py-2 text-white"
                      />
                      <span className="text-xs text-gray-400">{q.correctAnswer === oIndex && '✓ Correct'}</span>
                    </div>
                  ))}
                </div>
              )}

              {q.type === 'true-false' && (
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`tf-${qIndex}`}
                      checked={q.correctAnswer === 'true'}
                      onChange={() => updateQuestion(qIndex, 'correctAnswer', 'true')}
                      className="w-5 h-5"
                    />
                    <span>True</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`tf-${qIndex}`}
                      checked={q.correctAnswer === 'false'}
                      onChange={() => updateQuestion(qIndex, 'correctAnswer', 'false')}
                      className="w-5 h-5"
                    />
                    <span>False</span>
                  </label>
                </div>
              )}

              {q.type === 'short-answer' && (
                <input
                  type="text"
                  value={q.correctAnswer}
                  onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                  placeholder="Enter the correct answer"
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-2 text-white"
                />
              )}
            </div>
          ))}

          <button
            onClick={addQuestion}
            className="w-full glass-strong rounded-xl py-4 text-green-400 font-bold border-2 border-green-500/30 hover:border-green-500 transition"
          >
            + Add Question
          </button>
        </div>

        {/* Future Features Notice */}
        <div className="mt-8 glass-strong rounded-2xl p-6 border border-yellow-500/30 bg-yellow-900/10">
          <h3 className="text-xl font-bold text-yellow-400 mb-3">🚀 Coming Soon in Full Version:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
            <li>✓ Save quizzes to database</li>
            <li>✓ Real-time student responses</li>
            <li>✓ Automatic grading</li>
            <li>✓ Score analytics & reports</li>
            <li>✓ Question bank library</li>
            <li>✓ Timed quiz sessions</li>
          </ul>
        </div>
      </div>

      {/* Share Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-strong rounded-2xl p-8 max-w-2xl w-full border-2 border-green-500"
          >
            <button
              onClick={() => setShowLinkModal(false)}
              className="absolute top-4 right-4 text-white hover:text-red-400 text-3xl font-bold"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">✓</span>
              </div>
              <h2 className="text-3xl font-bold text-green-400 mb-2">Quiz Sent Successfully!</h2>
              <p className="text-gray-400">"{quiz.title || 'Untitled Quiz'}" has been sent to your students.</p>
              <p className="text-sm text-gray-500 mt-2">{quiz.questions.length} questions • Topic: {quiz.description || 'General'}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2 text-center">Quiz Link (Demo)</label>
              <div className="bg-black/50 border border-green-500/30 rounded-lg p-4 flex items-center justify-between">
                <code className="text-green-400 text-sm break-all">{shareLink}</code>
                <button
                  onClick={copyLink}
                  className="ml-4 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold whitespace-nowrap"
                >
                  📋 Copy
                </button>
              </div>
            </div>

            <div className="glass-green rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-300">
                <strong className="text-yellow-400">Note:</strong> In the full version, this link will:
              </p>
              <ul className="text-sm text-gray-300 mt-2 space-y-1">
                <li>• Allow students to access and take the quiz</li>
                <li>• Track all student responses in real-time</li>
                <li>• Automatically grade and show results</li>
                <li>• Store data in secure database</li>
              </ul>
            </div>

            <button
              onClick={() => setShowLinkModal(false)}
              className="w-full px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl text-white font-bold"
            >
              Create Another Quiz
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuizMakerDemo;
