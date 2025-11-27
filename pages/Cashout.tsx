
import React from 'react';
import { MOCK_REWARDS } from '../constants';
import { Lock } from 'lucide-react';

const Cashout = ({ user }: { user: any }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white">Tarik Penghasilan</h1>
        <p className="text-slate-400">Tukarkan saldo Anda dengan kartu hadiah, kripto, atau uang tunai.</p>
      </div>

      <div className="bg-gradient-to-r from-emerald-900/40 to-slate-900 border border-emerald-500/20 p-6 rounded-xl flex items-center justify-between">
        <div>
           <p className="text-slate-400 text-sm mb-1">Saldo Tersedia</p>
           <h2 className="text-4xl font-bold text-emerald-400">Rp {user.balance.toLocaleString('id-ID')}</h2>
        </div>
        <div className="text-right hidden sm:block">
           <p className="text-slate-500 text-sm">Total Pendapatan</p>
           <p className="text-xl font-semibold text-white">Rp 2.182.500</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white pt-4">Pilih Metode Penarikan</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_REWARDS.map(reward => {
          const isLocked = user.balance < reward.minAmount;
          return (
            <div key={reward.id} className={`group relative bg-card border border-slate-700 rounded-xl overflow-hidden hover:border-slate-500 transition-all duration-300 ${isLocked ? 'opacity-75' : 'hover:-translate-y-1 hover:shadow-xl'}`}>
              <div className={`h-24 ${reward.color} opacity-80 flex items-center justify-center`}>
                 <span className="text-white font-bold text-2xl drop-shadow-md">{reward.name}</span>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400 text-sm">Min Penarikan</span>
                  <span className="text-white font-bold">Rp {reward.minAmount.toLocaleString('id-ID')}</span>
                </div>
                
                <button 
                  disabled={isLocked}
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    isLocked 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed flex items-center justify-center gap-2' 
                      : 'bg-primary text-white hover:bg-indigo-600'
                  }`}
                >
                  {isLocked ? <><Lock size={16} /> Saldo Kurang</> : 'Tukarkan'}
                </button>
              </div>

              {/* Progress bar for locked items */}
              {isLocked && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
                  <div 
                    className="h-full bg-emerald-500" 
                    style={{ width: `${(user.balance / reward.minAmount) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cashout;
