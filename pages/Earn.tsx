
import React, { useState, useEffect } from 'react';
import { MOCK_TASKS } from '../constants';
import { Task, TaskType } from '../types';
import TaskCard from '../components/TaskCard';
import { Filter, Search, Star, Zap, ArrowUpDown } from 'lucide-react';

const Earn = () => {
  const [filter, setFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('RECOMMENDED');
  const [search, setSearch] = useState('');
  const [recommendedIds, setRecommendedIds] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleRecommendation = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      setRecommendedIds(customEvent.detail);
      setFilter('ALL'); // Reset filter to show recommendations clearly
      setSortBy('RECOMMENDED'); // Reset sort to show recommendations
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
      
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('task-recommendation', handleRecommendation);
    return () => window.removeEventListener('task-recommendation', handleRecommendation);
  }, []);

  // Helper to parse time string to minutes for sorting
  const parseTime = (timeStr: string) => {
    const value = parseInt(timeStr.replace(/\D/g, '') || '0');
    if (timeStr.toLowerCase().includes('hari')) return value * 24 * 60;
    if (timeStr.toLowerCase().includes('jam')) return value * 60;
    return value; // Default to minutes
  };

  const getDifficultyScore = (diff: string) => {
    switch (diff) {
      case 'Easy': return 1;
      case 'Medium': return 2;
      case 'Hard': return 3;
      default: return 2;
    }
  };

  const filteredTasks = MOCK_TASKS.filter(task => {
    const matchesFilter = filter === 'ALL' || task.type === filter;
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    // If specifically sorting by Recommended, prioritize recommended IDs
    if (sortBy === 'RECOMMENDED') {
      const aRec = recommendedIds.includes(a.id);
      const bRec = recommendedIds.includes(b.id);
      if (aRec && !bRec) return -1;
      if (!aRec && bRec) return 1;
      return 0; // Keep default order otherwise
    }

    switch (sortBy) {
      case 'REWARD_DESC':
        return b.reward - a.reward;
      case 'REWARD_ASC':
        return a.reward - b.reward;
      case 'TIME_ASC':
        return parseTime(a.timeEstimate) - parseTime(b.timeEstimate);
      case 'DIFFICULTY_ASC':
        return getDifficultyScore(a.difficulty) - getDifficultyScore(b.difficulty);
      default:
        return 0;
    }
  });

  // Featured tasks > 150000 IDR
  const featuredTasks = MOCK_TASKS.filter(t => t.reward > 150000).slice(0, 3);

  const categories = [
    { label: 'Semua Tugas', value: 'ALL' },
    { label: 'Survei', value: TaskType.SURVEY },
    { label: 'Game', value: TaskType.GAME },
    { label: 'Aplikasi', value: TaskType.APP_DOWNLOAD },
    { label: 'Video', value: TaskType.VIDEO },
  ];

  const handleStartTask = (task: Task) => {
    alert(`Memulai tugas: ${task.title}. Di aplikasi nyata, ini akan mengarahkan ke penyedia penawaran.`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Hasilkan Koin</h1>
          <p className="text-slate-400">Selesaikan tugas untuk mendapatkan uang nyata.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Sorting Dropdown */}
          <div className="relative min-w-[180px]">
            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-card border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-primary appearance-none cursor-pointer"
            >
              <option value="RECOMMENDED">Rekomendasi</option>
              <option value="REWARD_DESC">Bayaran Tertinggi</option>
              <option value="REWARD_ASC">Bayaran Terendah</option>
              <option value="TIME_ASC">Waktu Tercepat</option>
              <option value="DIFFICULTY_ASC">Paling Mudah</option>
            </select>
            {/* Custom Arrow for Select */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Cari tugas..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-card border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-primary w-full"
            />
          </div>
        </div>
      </div>

      {/* Featured Section */}
      {filter === 'ALL' && !search && sortBy === 'RECOMMENDED' && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-400" fill="currentColor" size={20} />
            <h2 className="text-xl font-bold text-white">Penawaran Unggulan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTasks.map(task => (
              <TaskCard key={task.id} task={task} onStart={handleStartTask} highlight={true} />
            ))}
          </div>
        </div>
      )}

      {/* Recommendations Banner */}
      {recommendedIds.length > 0 && (
        <div className={`bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 p-4 rounded-xl flex items-center gap-3 transition-opacity duration-500 ${isAnimating ? 'animate-pulse' : ''}`}>
           <div className="bg-indigo-500 p-2 rounded-lg">
             <Zap size={20} className="text-white" />
           </div>
           <div>
             <h3 className="font-bold text-white">Rekomendasi AI untuk Anda</h3>
             <p className="text-sm text-indigo-200">Berdasarkan preferensi Anda, tugas-tugas ini adalah yang paling cocok.</p>
           </div>
           <button 
             onClick={() => setRecommendedIds([])}
             className="ml-auto text-sm text-slate-400 hover:text-white px-3 py-1 rounded hover:bg-slate-700/50"
            >
             Tutup
           </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="border-b border-slate-700">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
           {categories.map(cat => (
             <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`whitespace-nowrap pb-2 px-1 text-sm font-medium transition-all border-b-2 ${
                filter === cat.value 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
             >
               {cat.label}
             </button>
           ))}
        </div>
      </div>

      {/* Main Grid */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-white">
            {filter === 'ALL' ? 'Semua Tugas' : categories.find(c => c.value === filter)?.label}
          </h2>
          <span className="text-xs text-slate-500">{filteredTasks.length} tugas ditemukan</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onStart={handleStartTask} 
              highlight={sortBy === 'RECOMMENDED' && recommendedIds.includes(task.id)}
            />
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-20 bg-card rounded-xl border border-slate-800 border-dashed">
          <p className="text-slate-500 text-lg">Tidak ada tugas yang ditemukan sesuai kriteria Anda.</p>
          <button onClick={() => {setFilter('ALL'); setSearch(''); setSortBy('RECOMMENDED');}} className="text-primary mt-2 hover:underline font-medium">Hapus filter</button>
        </div>
      )}
    </div>
  );
};

export default Earn;
