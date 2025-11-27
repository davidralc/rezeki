
import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_TRANSACTIONS } from '../constants';
import { User as UserIcon, Mail, Calendar, Settings, Shield, Bell, Award, Camera, LogOut, MapPin, CheckCircle, Wallet, Users, History, ArrowDownLeft, ArrowUpRight, Copy } from 'lucide-react';
import Button from '../components/Button';

interface UserProfileProps {
  user: User;
  logout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, logout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const nextLevelXp = user.level * 1000;
  const progress = (user.xp / nextLevelXp) * 100;

  // Format Date safely
  const formattedJoinDate = new Date(user.joinDate).toLocaleDateString('id-ID', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric' 
  });

  const tabs = [
    { id: 'overview', label: 'Ringkasan', icon: UserIcon },
    { id: 'tasks', label: 'Tugas Selesai', icon: CheckCircle },
    { id: 'transactions', label: 'Riwayat Saldo', icon: History },
    { id: 'withdrawals', label: 'Penarikan', icon: Wallet },
    { id: 'referrals', label: 'Referral', icon: Users },
  ];

  // Mock Referrals Data
  const mockReferrals = [
    { id: 1, user: 'BudiSantoso88', date: '2023-09-10', earning: 37500 },
    { id: 2, user: 'Siti_Aminah', date: '2023-09-12', earning: 18000 },
    { id: 3, user: 'GamerX_ID', date: '2023-10-01', earning: 12000 },
    { id: 4, user: 'RinaM', date: '2023-10-15', earning: 75000 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Info Column */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Stats Overview */}
              <div className="bg-card border border-slate-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Award className="text-secondary" /> Statistik
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <p className="text-slate-400 text-sm mb-1">Total Pendapatan</p>
                    <p className="text-2xl font-bold text-emerald-400">Rp {(user.balance * 3.5).toLocaleString('id-ID')}</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <p className="text-slate-400 text-sm mb-1">Tugas Selesai</p>
                    <p className="text-2xl font-bold text-blue-400">{user.completedTasks}</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <p className="text-slate-400 text-sm mb-1">Level Saat Ini</p>
                    <p className="text-2xl font-bold text-purple-400">{user.level}</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <p className="text-slate-400 text-sm mb-1">Total XP</p>
                    <p className="text-2xl font-bold text-orange-400">{user.xp.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Level Progress */}
              <div className="bg-card border border-slate-800 rounded-xl p-6">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">Progres Level {user.level}</h3>
                    <p className="text-sm text-slate-400">{user.xp} / {nextLevelXp} XP menuju Level {user.level + 1}</p>
                  </div>
                  <span className="text-xl font-bold text-primary">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-card border border-slate-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <UserIcon className="text-blue-400" /> Detail Pribadi
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-b border-slate-800">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Mail size={18} />
                      <span>Email</span>
                    </div>
                    <span className="text-white font-medium mt-1 sm:mt-0">{user.email}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-b border-slate-800">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Calendar size={18} />
                      <span>Tanggal Lahir</span>
                    </div>
                    <span className="text-white font-medium mt-1 sm:mt-0">12 Agustus 1995</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Shield size={18} />
                      <span>Status Akun</span>
                    </div>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-sm mt-1 sm:mt-0 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle size={12} /> Terverifikasi
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Settings Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border border-slate-800 rounded-xl p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Settings className="text-slate-400" size={20} /> Pengaturan
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Bell size={16} /> Notifikasi Email
                    </div>
                    <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Shield size={16} /> 2FA Aktif
                    </div>
                    <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-slate-400 rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-6">
                  Ubah Kata Sandi
                </Button>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 text-center shadow-inner">
                <p className="text-slate-400 text-sm mb-4">Butuh istirahat?</p>
                <Button variant="danger" onClick={logout} className="w-full flex items-center justify-center gap-2">
                  <LogOut size={16} /> Keluar
                </Button>
              </div>
            </div>
          </div>
        );

      case 'tasks':
        const finishedTasks = MOCK_TRANSACTIONS.filter(t => t.type === 'EARN');
        return (
          <div className="bg-card border border-slate-800 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="p-6 border-b border-slate-800">
               <h2 className="text-xl font-bold text-white">Tugas Selesai</h2>
               <p className="text-slate-400 text-sm">Daftar tugas yang telah Anda selesaikan dan dibayar.</p>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-slate-900/50 text-slate-400 text-sm uppercase">
                   <tr>
                     <th className="p-4 font-medium">Nama Tugas</th>
                     <th className="p-4 font-medium">Tanggal</th>
                     <th className="p-4 font-medium text-right">Imbalan</th>
                     <th className="p-4 font-medium text-center">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-800">
                   {finishedTasks.map(task => (
                     <tr key={task.id} className="hover:bg-slate-800/30 transition-colors">
                       <td className="p-4 font-medium text-white">{task.description}</td>
                       <td className="p-4 text-slate-400 text-sm">{task.date}</td>
                       <td className="p-4 text-emerald-400 font-bold text-right">+Rp {task.amount.toLocaleString('id-ID')}</td>
                       <td className="p-4 text-center">
                         <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs font-bold border border-emerald-500/20">SELESAI</span>
                       </td>
                     </tr>
                   ))}
                   {finishedTasks.length === 0 && (
                     <tr>
                       <td colSpan={4} className="p-8 text-center text-slate-500">Belum ada tugas yang diselesaikan.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        );

      case 'transactions':
        return (
          <div className="bg-card border border-slate-800 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="p-6 border-b border-slate-800 flex justify-between items-center">
               <div>
                  <h2 className="text-xl font-bold text-white">Riwayat Saldo</h2>
                  <p className="text-slate-400 text-sm">Semua pemasukan dan pengeluaran akun Anda.</p>
               </div>
               <div className="text-right">
                  <p className="text-slate-500 text-xs uppercase font-bold">Saldo Saat Ini</p>
                  <p className="text-2xl font-bold text-white">Rp {user.balance.toLocaleString('id-ID')}</p>
               </div>
             </div>
             <div className="divide-y divide-slate-800">
               {MOCK_TRANSACTIONS.map(tx => (
                 <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                   <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                       tx.type === 'EARN' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                     }`}>
                       {tx.type === 'EARN' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                     </div>
                     <div>
                       <p className="font-medium text-white">{tx.description}</p>
                       <p className="text-xs text-slate-500">{tx.date} • {tx.type === 'EARN' ? 'Pemasukan' : 'Penarikan'}</p>
                     </div>
                   </div>
                   <span className={`font-bold ${tx.type === 'EARN' ? 'text-emerald-400' : 'text-slate-200'}`}>
                     {tx.type === 'EARN' ? '+' : ''}Rp {Math.abs(tx.amount).toLocaleString('id-ID')}
                   </span>
                 </div>
               ))}
             </div>
          </div>
        );

      case 'withdrawals':
        const withdrawals = MOCK_TRANSACTIONS.filter(t => t.type === 'WITHDRAW');
        return (
          <div className="bg-card border border-slate-800 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="p-6 border-b border-slate-800">
               <h2 className="text-xl font-bold text-white">Riwayat Penarikan</h2>
               <p className="text-slate-400 text-sm">Status permintaan pembayaran Anda.</p>
             </div>
             <div className="p-6 grid gap-4">
                {withdrawals.map(tx => (
                  <div key={tx.id} className="border border-slate-700 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800/20 hover:bg-slate-800/50 transition-colors">
                     <div className="flex items-center gap-4">
                       <div className="bg-slate-800 p-3 rounded-lg text-slate-300 border border-slate-700">
                         <Wallet size={24} />
                       </div>
                       <div>
                         <h4 className="font-bold text-white text-lg">{tx.description}</h4>
                         <p className="text-slate-400 text-sm">ID: #{tx.id.toUpperCase()} • {tx.date}</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Jumlah</p>
                          <p className="font-bold text-white text-lg">Rp {Math.abs(tx.amount).toLocaleString('id-ID')}</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle size={12}/> BERHASIL
                        </span>
                     </div>
                  </div>
                ))}
                {withdrawals.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500 border border-slate-700">
                      <Wallet size={32} />
                    </div>
                    <p className="text-slate-400">Belum ada riwayat penarikan.</p>
                  </div>
                )}
             </div>
          </div>
        );

      case 'referrals':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Referral Stats */}
             <div className="md:col-span-1 space-y-6">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Users size={64} />
                   </div>
                   <h3 className="font-bold text-lg mb-1 relative z-10">Undang Teman</h3>
                   <p className="text-indigo-100 text-sm mb-6 relative z-10">Dapatkan 10% dari penghasilan mereka selamanya!</p>
                   
                   <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm mb-4 border border-white/20 relative z-10">
                     <p className="text-xs text-indigo-200 mb-1">Kode Referral Anda</p>
                     <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-xl tracking-wider text-white">ALEX99</span>
                        <button className="text-xs bg-white text-indigo-600 px-2 py-1 rounded font-bold hover:bg-indigo-50 flex items-center gap-1">
                           <Copy size={10} /> SALIN
                        </button>
                     </div>
                   </div>
                   <Button variant="secondary" className="w-full relative z-10 shadow-lg">Bagikan Link</Button>
                </div>

                <div className="bg-card border border-slate-800 rounded-xl p-6">
                   <h3 className="font-bold text-white mb-4">Statistik Referral</h3>
                   <div className="space-y-4">
                     <div className="flex justify-between">
                       <span className="text-slate-400">Total Teman</span>
                       <span className="text-white font-bold">4</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-slate-400">Total Komisi</span>
                       <span className="text-emerald-400 font-bold">Rp 142.500</span>
                     </div>
                     <div className="w-full h-px bg-slate-800 my-2"></div>
                     <div className="flex justify-between items-center">
                       <span className="text-slate-400 text-sm">Peringkat</span>
                       <span className="text-yellow-400 text-xs font-bold border border-yellow-400/30 bg-yellow-400/10 px-2 py-0.5 rounded flex items-center gap-1">
                         <Award size={12} /> GOLD
                       </span>
                     </div>
                   </div>
                </div>
             </div>

             {/* Referral List */}
             <div className="md:col-span-2 bg-card border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                   <h2 className="text-xl font-bold text-white">Teman yang Diundang</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-slate-400 text-sm uppercase">
                      <tr>
                        <th className="p-4 font-medium">Pengguna</th>
                        <th className="p-4 font-medium">Bergabung</th>
                        <th className="p-4 font-medium text-right">Komisi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {mockReferrals.map(ref => (
                        <tr key={ref.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-bold ring-2 ring-slate-800">
                               {ref.user.charAt(0)}
                             </div>
                             <span className="text-white font-medium">{ref.user}</span>
                          </td>
                          <td className="p-4 text-slate-400 text-sm">{ref.date}</td>
                          <td className="p-4 text-emerald-400 font-bold text-right">+Rp {ref.earning.toLocaleString('id-ID')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Profile Header Card */}
      <div className="bg-card border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Banner with Pattern */}
        <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute inset-0 bg-black/10"></div>
          
          <button className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-lg text-white/80 hover:text-white transition-colors">
            <Camera size={18} />
          </button>
        </div>
        
        {/* Content Wrapper */}
        <div className="px-6 pb-8 relative">
          
          <div className="flex flex-col md:flex-row items-center md:items-start -mt-16 mb-4 md:mb-0 gap-6">
            {/* Avatar */}
            <div className="relative shrink-0 group">
              <div className="w-32 h-32 rounded-full border-4 border-card bg-slate-800 overflow-hidden shadow-2xl relative z-10">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-900 text-white text-4xl font-bold">
                    {user.username.charAt(0)}
                  </div>
                )}
              </div>
              {/* Online Indicator */}
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-card rounded-full z-20" title="Online"></div>
            </div>

            {/* User Info - Integrated into the card */}
            <div className="flex-1 text-center md:text-left pt-2 md:pt-16 min-w-0">
               <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                   <h1 className="text-3xl font-bold text-white tracking-tight truncate">{user.username}</h1>
                   <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 text-xs font-bold w-fit mx-auto md:mx-0">
                     <CheckCircle size={12} fill="currentColor" className="text-blue-500" /> TERVERIFIKASI
                   </div>
                   <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 text-xs font-bold w-fit mx-auto md:mx-0">
                     <Award size={12} /> LEVEL {user.level}
                   </div>
               </div>
               
               <p className="text-slate-400 text-base mb-4 max-w-lg mx-auto md:mx-0 leading-relaxed font-light">
                 {user.bio || 'Pengguna Rezeki.online • Pencari Cuan Digital'}
               </p>
               
               <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/50 hover:bg-slate-800 transition-colors">
                    <Calendar size={14} className="text-indigo-400"/> 
                    <span>Bergabung {formattedJoinDate}</span>
                  </div>
                  {user.location && (
                    <div className="flex items-center gap-2 text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/50 hover:bg-slate-800 transition-colors">
                      <MapPin size={14} className="text-emerald-400"/> 
                      <span>{user.location}</span>
                    </div>
                  )}
               </div>
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden md:flex pt-16 gap-3">
               <Button size="sm" variant="outline" className="gap-2 bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800">
                 <Settings size={16}/> Edit Profil
               </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="px-4 sm:px-0 sticky top-[64px] z-20 bg-dark/95 backdrop-blur-md pt-2 -mx-4 sm:mx-0 px-4 sm:px-0 sm:static sm:bg-transparent sm:pt-0">
        <div className="flex overflow-x-auto pb-2 sm:pb-4 gap-2 scrollbar-hide border-b border-slate-800 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <tab.icon size={16} className={activeTab === tab.id ? 'text-white' : 'text-slate-500'} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
        
      {/* Tab Content */}
      <div className="min-h-[400px]">
         {renderContent()}
      </div>

    </div>
  );
};

export default UserProfile;
