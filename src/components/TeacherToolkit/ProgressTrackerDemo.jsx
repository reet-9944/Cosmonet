import React from 'react';
import { motion } from 'framer-motion';

const ProgressTrackerDemo = ({ onBack }) => {
  // Mock student data
  const students = [
    { id: 1, name: 'Alice Johnson', quizAvg: 92, assignmentAvg: 88, overall: 90, completed: 12, total: 15 },
    { id: 2, name: 'Bob Smith', quizAvg: 78, assignmentAvg: 82, overall: 80, completed: 10, total: 15 },
    { id: 3, name: 'Carol Davis', quizAvg: 95, assignmentAvg: 93, overall: 94, completed: 15, total: 15 },
    { id: 4, name: 'David Wilson', quizAvg: 85, assignmentAvg: 87, overall: 86, completed: 13, total: 15 },
    { id: 5, name: 'Emma Brown', quizAvg: 88, assignmentAvg: 90, overall: 89, completed: 14, total: 15 }
  ];

  const classAverage = Math.round(students.reduce((sum, s) => sum + s.overall, 0) / students.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="text-green-400 hover:text-green-300 mb-4">← Back</button>
        <h1 className="text-5xl font-bold text-green-400 mb-2">📊 Progress Tracker</h1>
        <p className="text-gray-400 mb-8">Monitor student performance and progress</p>

        {/* Class Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-strong rounded-2xl p-6 border border-green-500/30">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-white">{students.length}</div>
            <div className="text-sm text-gray-400">Total Students</div>
          </div>
          <div className="glass-strong rounded-2xl p-6 border border-blue-500/30">
            <div className="text-4xl mb-2">📈</div>
            <div className="text-3xl font-bold text-white">{classAverage}%</div>
            <div className="text-sm text-gray-400">Class Average</div>
          </div>
          <div className="glass-strong rounded-2xl p-6 border border-purple-500/30">
            <div className="text-4xl mb-2">✅</div>
            <div className="text-3xl font-bold text-white">15</div>
            <div className="text-sm text-gray-400">Total Activities</div>
          </div>
          <div className="glass-strong rounded-2xl p-6 border border-yellow-500/30">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-white">3</div>
            <div className="text-sm text-gray-400">Top Performers</div>
          </div>
        </div>

        {/* Student List */}
        <div className="glass-strong rounded-2xl p-6 border border-green-500/30">
          <h2 className="text-2xl font-bold text-green-400 mb-6">Student Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-500/30">
                  <th className="text-left py-3 px-4 text-gray-400">Student</th>
                  <th className="text-center py-3 px-4 text-gray-400">Quiz Avg</th>
                  <th className="text-center py-3 px-4 text-gray-400">Assignment Avg</th>
                  <th className="text-center py-3 px-4 text-gray-400">Overall</th>
                  <th className="text-center py-3 px-4 text-gray-400">Progress</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-700 hover:bg-green-900/10 transition"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-semibold">{student.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={`font-bold ${student.quizAvg >= 90 ? 'text-green-400' : student.quizAvg >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {student.quizAvg}%
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={`font-bold ${student.assignmentAvg >= 90 ? 'text-green-400' : student.assignmentAvg >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {student.assignmentAvg}%
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={`font-bold text-lg ${student.overall >= 90 ? 'text-green-400' : student.overall >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {student.overall}%
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                            style={{ width: `${(student.completed / student.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{student.completed}/{student.total}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Future Features */}
        <div className="mt-8 glass-strong rounded-2xl p-6 border border-yellow-500/30 bg-yellow-900/10">
          <h3 className="text-xl font-bold text-yellow-400 mb-3">🚀 Coming in Full Version:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-gray-300 text-sm">
            <li>✓ Real-time data sync</li>
            <li>✓ Detailed analytics charts</li>
            <li>✓ Individual student reports</li>
            <li>✓ Export to PDF/CSV</li>
            <li>✓ Performance trends</li>
            <li>✓ Parent notifications</li>
            <li>✓ Attendance tracking</li>
            <li>✓ Grade predictions</li>
            <li>✓ Custom reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackerDemo;
