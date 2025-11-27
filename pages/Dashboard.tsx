
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_TRANSACTIONS } from '../constants';
import { TrendingUp, Users, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Sen', earn: 18000 },
  { name: 'Sel', earn: 37500 },
  { name: 'Rab', earn: 12000 },
  { name: 'Kam', earn: 63000 },
  { name: 'Jum', earn: 45000 },
  { name: 'Sab', earn: 22500 },
  { name: 'Min', earn: 75000 },
];

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-card border border-slate-800 p-6 rounded-xl flex items-center justify-between hover:border-slate-600 transition-colors">
    <div>
      <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
      <Icon className={color} size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dasbor</h1>
          <p className="text-slate-400">Selamat datang kembali! Berikut ringkasan penghasilan Anda.</p>
        </div>
        <Link to="/earn" className="bg-primary hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
           Mulai Hasilkan <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Saldo" value="Rp 187.500" icon={TrendingUp} color="text-emerald-400" />
        <StatCard title="Tugas Selesai" value="12" icon={Clock} color="text-blue-400" />
        <StatCard title="Referral" value="3" icon={Users} color="text-purple-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-card border border-slate-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-6">Riwayat Penghasilan (7 Hari Terakhir)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#334155', opacity: 0.2}}
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, 'Penghasilan']}
                />
                <Bar dataKey="earn" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-slate-800 p-6 rounded-xl flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 max-h-[300px] custom-scrollbar">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${tx.type === 'EARN' ? 'bg-emerald-400' : 'bg-orange-400'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{tx.description}</p>
                    <p className="text-xs text-slate-500">{tx.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${tx.type === 'EARN' ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {tx.type === 'EARN' ? '+' : ''}Rp {Math.abs(tx.amount).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-auto pt-4 text-center text-sm text-primary hover:text-indigo-400 font-medium">Lihat Semua Riwayat</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
