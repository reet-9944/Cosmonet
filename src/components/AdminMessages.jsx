import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminMessages = ({ onBack }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api/contacts' : 'http://localhost:4000/api/contacts');
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.success) {
        setMessages(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? `/api/contact/${id}` : `http://localhost:4000/api/contact/${id}`);
      await fetch(apiUrl, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' })
      });
      fetchMessages();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-green-500';
      case 'read': return 'bg-blue-500';
      case 'replied': return 'bg-purple-500';
      case 'resolved': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 px-6 py-3 bg-blue-600/80 backdrop-blur-md rounded-full text-white font-bold hover:bg-blue-500 transition-all"
        >
          ← Back
        </button>

        <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Contact Messages
        </h1>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-400">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-400 text-xl">No messages yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {messages.map((msg) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => setSelectedMessage(msg)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{msg.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(msg.status)}`}>
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-blue-400 text-sm">{msg.email}</p>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className="inline-block bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-xs font-bold">
                    {msg.subject}
                  </span>
                </div>
                
                <p className="text-gray-300 line-clamp-2">{msg.message}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Message Detail Modal */}
        {selectedMessage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl max-w-3xl w-full p-8 border-2 border-blue-500/30"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedMessage.name}</h2>
                  <p className="text-blue-400">{selectedMessage.email}</p>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-white hover:text-red-400 text-3xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <span className="inline-block bg-purple-600/50 text-purple-200 px-4 py-2 rounded-full font-bold">
                  {selectedMessage.subject}
                </span>
              </div>

              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
                
                {selectedMessage.status === 'new' && (
                  <button
                    onClick={() => {
                      markAsRead(selectedMessage._id);
                      setSelectedMessage(null);
                    }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
