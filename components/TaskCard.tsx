
import React from 'react';
import { Task } from '../types';
import Button from './Button';
import { DollarSign, Clock, Zap, Star } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onStart: (task: Task) => void;
  highlight?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStart, highlight }) => {
  const getDifficultyLabel = (diff: string) => {
    switch(diff) {
      case 'Easy': return 'Mudah';
      case 'Medium': return 'Sedang';
      case 'Hard': return 'Sulit';
      default: return diff;
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-400';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-400';
      case 'Hard': return 'bg-red-500/10 text-red-400';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className={`relative flex flex-col bg-card rounded-xl p-5 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${highlight ? 'border-secondary ring-1 ring-secondary/50' : 'border-slate-700 hover:border-slate-500'}`}>
      {highlight && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
          <Zap size={10} fill="currentColor" /> TERBAIK
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 w-full">
          <div className="relative flex-shrink-0">
            <img src={task.image} alt={task.title} className="w-14 h-14 rounded-xl object-cover bg-slate-800 shadow-sm group-hover:scale-105 transition-transform" />
            <div className="absolute -bottom-1 -right-1 bg-dark rounded-full p-0.5">
               <div className="bg-slate-700 rounded-full p-0.5">
                  <Star size={10} className="text-yellow-400" fill="currentColor" />
               </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white leading-tight truncate pr-2" title={task.title}>{task.title}</h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${getDifficultyColor(task.difficulty)}`}>
                {getDifficultyLabel(task.difficulty)}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                <Clock size={10} /> {task.timeEstimate}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-slate-400 mb-4 line-clamp-2 min-h-[40px] leading-relaxed">
        {task.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
        <div className="flex flex-col">
           <span className="text-xs text-slate-500">Imbalan</span>
           <div className="text-emerald-400 font-bold text-lg flex items-center">
             Rp {task.reward.toLocaleString('id-ID')}
           </div>
        </div>
        <Button size="sm" onClick={() => onStart(task)} className="shadow-lg shadow-primary/20">
          Mulai
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
