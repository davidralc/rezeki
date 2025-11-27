import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { getTaskRecommendation } from '../services/geminiService';
import { Task } from '../types';

interface AiAssistantProps {
  tasks: Task[];
  onRecommend: (taskIds: string[]) => void;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ tasks, onRecommend }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Halo! Saya bisa membantu Anda menemukan tugas terbaik untuk memaksimalkan penghasilan Anda. Apa yang Anda cari?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const result = await getTaskRecommendation(userMsg, tasks);
    
    setMessages(prev => [...prev, { role: 'ai', text: result.recommendation }]);
    
    if (result.taskIds.length > 0) {
      onRecommend(result.taskIds);
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-gradient-to-r from-primary to-indigo-700 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-white font-medium">
              <Sparkles size={18} />
              Asisten AI
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-900/95">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-slate-700 text-slate-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 rounded-2xl rounded-bl-none px-4 py-2 flex items-center gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-slate-700 bg-slate-800 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Misal: tugas cepat, bayaran tinggi..."
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary placeholder-slate-500"
            />
            <button 
              type="submit" 
              disabled={loading || !query.trim()}
              className="bg-primary hover:bg-indigo-600 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-gradient-to-r from-primary to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-105 flex items-center justify-center group"
      >
        <Bot size={28} className={isOpen ? 'scale-0 absolute transition-transform' : 'scale-100 transition-transform'} />
        <X size={28} className={!isOpen ? 'scale-0 absolute transition-transform' : 'scale-100 transition-transform'} />
      </button>
    </div>
  );
};

export default AiAssistant;