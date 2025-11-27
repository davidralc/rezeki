
import React from 'react';
import { Trophy, Medal } from 'lucide-react';

const Leaderboard = () => {
  const leaders = [
    { rank: 1, name: 'CryptoKing', earnings: 18756750, country: 'US' },
    { rank: 2, name: 'SarahEarns', earnings: 14703000, country: 'GB' },
    { rank: 3, name: 'MikeDrop', earnings: 12750000, country: 'CA' },
    { rank: 4, name: 'TaskMaster99', earnings: 10800000, country: 'DE' },
    { rank: 5, name: 'MoneyMaker', earnings: 9750000, country: 'AU' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Penghasil Teratas</h1>
        <p className="text-slate-400">Lihat siapa yang menghasilkan paling banyak bulan ini di Rezeki.online.</p>
      </div>

      <div className="bg-card border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-12 bg-slate-900/50 p-4 border-b border-slate-800 text-slate-400 font-medium text-sm uppercase tracking-wider">
          <div className="col-span-2 text-center">Peringkat</div>
          <div className="col-span-6">Pengguna</div>
          <div className="col-span-4 text-right">Total Dihasilkan</div>
        </div>
        
        {leaders.map((user) => (
          <div key={user.rank} className="grid grid-cols-12 p-4 items-center hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 last:border-0">
            <div className="col-span-2 flex justify-center">
              {user.rank === 1 && <Trophy className="text-yellow-400" size={24} />}
              {user.rank === 2 && <Medal className="text-slate-300" size={24} />}
              {user.rank === 3 && <Medal className="text-amber-700" size={24} />}
              {user.rank > 3 && <span className="text-slate-500 font-bold text-lg">#{user.rank}</span>}
            </div>
            <div className="col-span-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <span className="text-white font-medium">{user.name}</span>
            </div>
            <div className="col-span-4 text-right">
              <span className="text-emerald-400 font-bold">Rp {user.earnings.toLocaleString('id-ID')}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-6 text-center">
        <h3 className="text-white font-semibold mb-2">Ingin berada di puncak?</h3>
        <p className="text-slate-400 text-sm mb-4">Selesaikan lebih banyak tugas dan undang teman untuk menaiki papan peringkat.</p>
      </div>
    </div>
  );
};

export default Leaderboard;
