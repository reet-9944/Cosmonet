import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LessonPlannerDemo = ({ onBack }) => {
  const [lessonPlan, setLessonPlan] = useState({
    title: '',
    subject: '',
    gradeLevel: '',
    duration: '',
    objectives: [''],
    materials: [''],
    activities: [{ name: '', duration: '', description: '' }],
    assessment: '',
    homework: ''
  });
  const [showPreview, setShowPreview] = useState(false);

  const addObjective = () => {
    setLessonPlan({ ...lessonPlan, objectives: [...lessonPlan.objectives, ''] });
  };

  const addMaterial = () => {
    setLessonPlan({ ...lessonPlan, materials: [...lessonPlan.materials, ''] });
  };

  const addActivity = () => {
    setLessonPlan({ 
      ...lessonPlan, 
      activities: [...lessonPlan.activities, { name: '', duration: '', description: '' }] 
    });
  };

  const updateObjective = (index, value) => {
    const newObjectives = [...lessonPlan.objectives];
    newObjectives[index] = value;
    setLessonPlan({ ...lessonPlan, objectives: newObjectives });
  };

  const updateMaterial = (index, value) => {
    const newMaterials = [...lessonPlan.materials];
    newMaterials[index] = value;
    setLessonPlan({ ...lessonPlan, materials: newMaterials });
  };

  const updateActivity = (index, field, value) => {
    const newActivities = [...lessonPlan.activities];
    newActivities[index][field] = value;
    setLessonPlan({ ...lessonPlan, activities: newActivities });
  };

  const generatePDF = () => {
    alert('🎉 PDF Export Feature!\n\nIn the full version, this will:\n✓ Generate a professional PDF\n✓ Include all lesson details\n✓ Download automatically\n\n📌 Coming in future updates!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button onClick={onBack} className="text-green-400 hover:text-green-300 mb-4">← Back</button>
            <h1 className="text-5xl font-bold text-green-400 mb-2">📚 Lesson Planner</h1>
            <p className="text-gray-400">Create comprehensive lesson plans with ease</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPreview(!showPreview)}
              className="glass-strong px-6 py-3 rounded-xl text-white font-bold border-2 border-blue-500"
            >
              {showPreview ? 'Edit' : 'Preview'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generatePDF}
              className="glass-strong px-6 py-3 rounded-xl text-white font-bold border-2 border-green-500"
            >
              📄 Export PDF
            </motion.button>
          </div>
        </div>

        {!showPreview ? (
          /* Edit Mode */
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="glass-strong rounded-2xl p-6 border border-green-500/30">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Lesson Title *</label>
                  <input
                    type="text"
                    value={lessonPlan.title}
                    onChange={(e) => setLessonPlan({ ...lessonPlan, title: e.target.value })}
                    placeholder="e.g., Introduction to Solar System"
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={lessonPlan.subject}
                    onChange={(e) => setLessonPlan({ ...lessonPlan, subject: e.target.value })}
                    placeholder="e.g., Science"
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Grade Level *</label>
                  <input
                    type="text"
                    value={lessonPlan.gradeLevel}
                    onChange={(e) => setLessonPlan({ ...lessonPlan, gradeLevel: e.target.value })}
                    placeholder="e.g., 6th Grade"
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Duration (minutes) *</label>
                  <input
                    type="number"
                    value={lessonPlan.duration}
                    onChange={(e) => setLessonPlan({ ...lessonPlan, duration: e.target.value })}
                    placeholder="e.g., 45"
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="glass-strong rounded-2xl p-6 border border-green-500/30">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-400">Learning Objectives</h2>
                <button onClick={addObjective} className="text-green-400 hover:text-green-300">+ Add</button>
              </div>
              {lessonPlan.objectives.map((obj, index) => (
                <input
                  key={index}
                  type="text"
                  value={obj}
                  onChange={(e) => updateObjective(index, e.target.value)}
                  placeholder={`Objective ${index + 1}`}
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white mb-3"
                />
              ))}
            </div>

            {/* Materials */}
            <div className="glass-strong rounded-2xl p-6 border border-green-500/30">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-400">Materials Needed</h2>
                <button onClick={addMaterial} className="text-green-400 hover:text-green-300">+ Add</button>
              </div>
              {lessonPlan.materials.map((material, index) => (
                <input
                  key={index}
                  type="text"
                  value={material}
                  onChange={(e) => updateMaterial(index, e.target.value)}
                  placeholder={`Material ${index + 1}`}
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white mb-3"
                />
              ))}
            </div>

            {/* Activities */}
            <div className="glass-strong rounded-2xl p-6 border border-green-500/30">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-400">Activities</h2>
                <button onClick={addActivity} className="text-green-400 hover:text-green-300">+ Add Activity</button>
              </div>
              {lessonPlan.activities.map((activity, index) => (
                <div key={index} className="mb-4 p-4 bg-black/30 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={activity.name}
                      onChange={(e) => updateActivity(index, 'name', e.target.value)}
                      placeholder="Activity Name"
                      className="bg-black/50 border border-green-500/30 rounded-lg px-4 py-2 text-white"
                    />
                    <input
                      type="number"
                      value={activity.duration}
                      onChange={(e) => updateActivity(index, 'duration', e.target.value)}
                      placeholder="Duration (min)"
                      className="bg-black/50 border border-green-500/30 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <textarea
                    value={activity.description}
                    onChange={(e) => updateActivity(index, 'description', e.target.value)}
                    placeholder="Activity Description"
                    rows="3"
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              ))}
            </div>

            {/* Assessment & Homework */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-strong rounded-2xl p-6 border border-green-500/30">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Assessment</h2>
                <textarea
                  value={lessonPlan.assessment}
                  onChange={(e) => setLessonPlan({ ...lessonPlan, assessment: e.target.value })}
                  placeholder="How will you assess student learning?"
                  rows="4"
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div className="glass-strong rounded-2xl p-6 border border-green-500/30">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Homework</h2>
                <textarea
                  value={lessonPlan.homework}
                  onChange={(e) => setLessonPlan({ ...lessonPlan, homework: e.target.value })}
                  placeholder="Homework assignment (optional)"
                  rows="4"
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="glass-strong rounded-2xl p-8 border border-green-500/30">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">{lessonPlan.title || 'Untitled Lesson'}</h1>
              <div className="flex justify-center gap-6 text-gray-400">
                <span>📚 {lessonPlan.subject || 'Subject'}</span>
                <span>🎓 {lessonPlan.gradeLevel || 'Grade'}</span>
                <span>⏱️ {lessonPlan.duration || '0'} minutes</span>
              </div>
            </div>

            {lessonPlan.objectives.filter(o => o).length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-green-400 mb-3">Learning Objectives</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {lessonPlan.objectives.filter(o => o).map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>
            )}

            {lessonPlan.materials.filter(m => m).length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-green-400 mb-3">Materials Needed</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {lessonPlan.materials.filter(m => m).map((material, i) => (
                    <li key={i}>{material}</li>
                  ))}
                </ul>
              </div>
            )}

            {lessonPlan.activities.filter(a => a.name).length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-green-400 mb-3">Activities</h2>
                {lessonPlan.activities.filter(a => a.name).map((activity, i) => (
                  <div key={i} className="mb-4 p-4 bg-black/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-white">{activity.name}</h3>
                      <span className="text-green-400">{activity.duration} min</span>
                    </div>
                    <p className="text-gray-300">{activity.description}</p>
                  </div>
                ))}
              </div>
            )}

            {lessonPlan.assessment && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-green-400 mb-3">Assessment</h2>
                <p className="text-gray-300">{lessonPlan.assessment}</p>
              </div>
            )}

            {lessonPlan.homework && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-green-400 mb-3">Homework</h2>
                <p className="text-gray-300">{lessonPlan.homework}</p>
              </div>
            )}
          </div>
        )}

        {/* Future Features Notice */}
        <div className="mt-8 glass-strong rounded-2xl p-6 border border-yellow-500/30 bg-yellow-900/10">
          <h3 className="text-xl font-bold text-yellow-400 mb-3">🚀 Coming Soon in Full Version:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
            <li>✓ Save lesson plans to database</li>
            <li>✓ Professional PDF export</li>
            <li>✓ Reusable templates</li>
            <li>✓ Share with colleagues</li>
            <li>✓ Standards alignment</li>
            <li>✓ Lesson plan library</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LessonPlannerDemo;
